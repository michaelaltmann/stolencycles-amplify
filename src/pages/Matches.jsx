import React, { useState, useEffect } from "react";
import { MatchStatus } from "../models";
import { Button, Grid, Stack } from "@mui/material";
import API, { graphqlOperation } from "@aws-amplify/api";

import { onCreateMatch } from "../graphql/subscriptions";
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

    const subscription = API.graphql(graphqlOperation(onCreateMatch)).subscribe(
      {
        next: ({ provider, value }) => {
          const newMatch = value.data.onCreateMatch;
          setMatchs((list) => {
            return [newMatch].concat(list || []);
          });
        },
        error: (error) => console.warn(error),
      }
    );
    return () => {
      if (subscription) subscription.unsubscribe();
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
    const { list, nextToken } = await MatchRepository.list(currentToken);
    setCurrentToken(nextToken);
    setMatchs((matchs || []).concat(list));
  }

  async function fetchByStatus(status) {
    const { list, nextToken } = await MatchRepository.listByStatus(
      status,
      currentToken
    );
    setCurrentToken(nextToken);
    setMatchs((matchs || []).concat(list));
  }

  return (
    <Stack spacing={2}>
      <Grid container direction="row">
        {matchs &&
          matchs.map((match) => {
            return <MatchView item={match} key={match.id} />;
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
