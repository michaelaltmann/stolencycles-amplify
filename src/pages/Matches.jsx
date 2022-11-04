import React, { useState, useEffect } from "react";
import { MatchStatus } from "../models";
import { Button, Divider, Grid, Stack } from "@mui/material";
import API, { graphqlOperation } from "@aws-amplify/api";

import { onCreateMatch, onDeleteMatch } from "../graphql/subscriptions";
import MatchRepository from "../repositories/MatchRepository";
import { MatchView } from "../components/MatchView";
export default function Matchs() {
  const [filter, setFilter] = useState({
    status: MatchStatus.UNREVIEWED,
  });
  const [currentToken, setCurrentToken] = useState(null);
  const [matchs, setMatchs] = useState(null);
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
    if (filter.status) {
      await fetchByStatus(filter.status);
    } else {
      await fetchAll();
    }
  }
  async function fetchAll() {
    const { items, nextToken } = await MatchRepository.list(currentToken, 1);
    setCurrentToken(nextToken);
    setMatchs((matchs || []).concat(items));
  }

  async function fetchByStatus(status) {
    const { items, nextToken } = await MatchRepository.listByStatus(
      status,
      currentToken,
      1
    );
    setCurrentToken(nextToken);
    setMatchs((matchs || []).concat(items));
  }

  return (
    <Stack spacing={2}>
      <Grid container direction="row">
        {matchs &&
          matchs.map((match) => {
            return (
              <Grid item>
                <MatchView item={match} key={match.id} />{" "}
              </Grid>
            );
          })}
      </Grid>
      <Stack direction="row">
        <Button onClick={() => fetchMatchs()} disabled={!currentToken}>
          More
        </Button>
      </Stack>
    </Stack>
  );
}
