import React, { useState, useEffect } from "react";
import { MatchStatus } from "../models";
import { Button, Divider, Grid, Stack } from "@mui/material";
import API, { graphqlOperation } from "@aws-amplify/api";

import { onCreateMatch, onDeleteMatch } from "../graphql/subscriptions";
import MatchRepository from "../repositories/MatchRepository";
import { MatchView } from "../components/MatchView";
import { matchFilterAtom } from "../recoil/match";
import { useRecoilState } from "recoil";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Matches() {
  const [matches, setMatches] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);

  const [matchFilter, setMatchFilter] = useRecoilState(matchFilterAtom);
  useEffect(() => {
    const getData = async () => {
      await fetchMatchs();
    };
    if (!matches) getData();

    const createSubscription = API.graphql(
      graphqlOperation(onCreateMatch)
    ).subscribe({
      next: ({ provider, value }) => {
        const newMatch = value.data.onCreateMatch;
        setMatches((list) => {
          return [newMatch].concat(list || []);
        });
      },
      error: (error) => console.warn(error),
    });
    const deleteSubscription = API.graphql(
      graphqlOperation(onDeleteMatch)
    ).subscribe({
      next: ({ provider, value }) => {
        const item = value.data.onDeleteMatch;
        setMatches((list) => {
          const array = list || [];
          var index = array.indexOf(item);
          if (index !== -1) {
            return array.splice(index, 1);
          } else {
            return array;
          }
        });
      },
      error: (error) => console.warn(error),
    });
    return () => {
      if (createSubscription) createSubscription.unsubscribe();
      if (deleteSubscription) deleteSubscription.unsubscribe();
    };
  }, []);

  async function fetchMatchs() {
    if (matchFilter.advertisementId) {
      await listByStatusAdvertisement(
        matchFilter.status,
        matchFilter.advertisementId
      );
    } else if (matchFilter.theftId) {
      await listByStatusTheft(matchFilter.status, matchFilter.theftId);
    } else {
      await listByStatusAdvertisement(MatchStatus.UNREVIEWED, null);
    }
  }

  async function listByStatusAdvertisement(status, advertisementId) {
    const { items, nextToken } =
      await MatchRepository.listByStatusAdvertisement(
        status,
        advertisementId,
        currentToken,
        6
      );
    setCurrentToken(nextToken);
    const newMatches = (matches || []).concat(items);
    setMatches(newMatches);
  }

  async function listByStatusTheft(status, theftId) {
    const { items, nextToken } =
      await MatchRepository.listByStatusAdvertisement(
        status,
        theftId,
        currentToken,
        6
      );
    setCurrentToken(nextToken);
    setMatches((matches || []).concat(items));
  }

  return (
    <>
      {matches && (
        <InfiniteScroll
          dataLength={matches ? matches.length : 0}
          next={fetchMatchs}
          hasMore={currentToken != null}
        >
          <Grid container>
            {matches.map((match) => {
              return (
                <Grid
                  item
                  key={match.id}
                  sx={{
                    width: "612px",
                    border: "solid",
                    borderWidth: "2px",
                    margin: "4px",
                    padding: "2px",
                  }}
                >
                  <MatchView item={match} />
                </Grid>
              );
            })}
          </Grid>
        </InfiniteScroll>
      )}
    </>
  );
}
