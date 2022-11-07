import React, { useState, useEffect } from "react";
import { MatchStatus } from "../models";
import { Button, Divider, Grid, Stack } from "@mui/material";
import API, { graphqlOperation } from "@aws-amplify/api";

import { onCreateMatch, onDeleteMatch } from "../graphql/subscriptions";
import MatchRepository from "../repositories/MatchRepository";
import { MatchView } from "../components/MatchView";
import { matchFilterAtom } from "../recoil/match";
import { useRecoilState } from "recoil";

export default function Matchs() {
  const [matchs, setMatchs] = useState(null);
  const [matchFilter, setMatchFilter] = useRecoilState(matchFilterAtom);
  useEffect(() => {
    const getData = async () => {
      await fetchMatchs();
    };
    if (!matchs) getData();

    const createSubscription = API.graphql(
      graphqlOperation(onCreateMatch)
    ).subscribe({
      next: ({ provider, value }) => {
        const newMatch = value.data.onCreateMatch;
        setMatchs((list) => {
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
        setMatchs((list) => {
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
        matchFilter.currentToken,
        1
      );
    setMatchFilter({ ...matchFilter, currentToken: nextToken });
    setMatchs((matchs || []).concat(items));
  }

  async function listByStatusTheft(status, theftId) {
    const { items, nextToken } =
      await MatchRepository.listByStatusAdvertisement(
        status,
        theftId,
        matchFilter.currentToken,
        1
      );
    setMatchFilter({ ...matchFilter, currentToken: nextToken });
    setMatchs((matchs || []).concat(items));
  }

  return (
    <Stack spacing={2}>
      {matchs &&
        matchs.map((match) => {
          return <MatchView item={match} key={match.id} />;
        })}
      <Stack direction="row">
        <Button
          onClick={() => fetchMatchs()}
          disabled={!matchFilter.currentToken}
        >
          More
        </Button>
      </Stack>
    </Stack>
  );
}
