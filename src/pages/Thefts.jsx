import React, { useState, useEffect } from "react";
import { TheftStatus } from "../models";
import { Button, Grid, Stack } from "@mui/material";
import API, { graphqlOperation } from "@aws-amplify/api";

import { onCreateTheft } from "../graphql/subscriptions";
import TheftRepository from "../repositories/TheftRepository";
import { TheftView } from "../components/TheftView";
export default function Thefts() {
  const [filter, setFilter] = useState({
    status: TheftStatus.UNREVIEWED,
  });
  const [currentToken, setCurrentToken] = useState(null);
  const [thefts, setThefts] = useState(null);
  useEffect(() => {
    const getData = async () => {
      await fetchThefts();
    };
    if (!thefts) getData();

    const subscription = API.graphql(graphqlOperation(onCreateTheft)).subscribe(
      {
        next: ({ provider, value }) => {
          const newTheft = value.data.onCreateTheft;
          setThefts((list) => {
            return [newTheft].concat(list || []);
          });
        },
        error: (error) => console.warn(error),
      }
    );
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  async function fetchThefts() {
    if (filter.status) {
      await fetchByStatus(filter.status);
    } else {
      await fetchAll();
    }
  }
  async function fetchAll() {
    const { list, nextToken } = await TheftRepository.list(currentToken);
    setCurrentToken(nextToken);
    setThefts((thefts || []).concat(list));
  }

  async function fetchByStatus(status) {
    const { list, nextToken } = await TheftRepository.listByStatus(
      status,
      currentToken
    );
    setCurrentToken(nextToken);
    setThefts((thefts || []).concat(list));
  }

  return (
    <Stack spacing={2}>
      <Grid container direction="row">
        {thefts &&
          thefts.map((theft) => {
            return <TheftView item={theft} key={theft.id} />;
          })}
      </Grid>
      <Stack direction="row">
        <Button onClick={() => fetchThefts()} disabled={!currentToken}>
          More
        </Button>
      </Stack>
    </Stack>
  );
}
