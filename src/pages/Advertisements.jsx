import React, { useState, useEffect } from "react";
import { AdvertisementStatus } from "../models";
import { AdvertisementView } from "../components/AdvertisementView";
import { Button, Grid, Stack } from "@mui/material";
import API, { graphqlOperation } from "@aws-amplify/api";

import { onCreateAdvertisement } from "../graphql/subscriptions";
import AdvertisementRepository from "../repositories/AdvertisementRepository";
import { AdvertisementForm } from "../components/AdvertisementForm";
export default function Advertisements() {
  const [displayForm, setDisplayForm] = useState(false);
  const [filter, setFilter] = useState({
    status: AdvertisementStatus.UNREVIEWED,
  });
  const [currentToken, setCurrentToken] = useState(null);
  const [advertisements, setAdvertisements] = useState(null);
  useEffect(() => {
    const getData = async () => {
      await fetchAdvertisements();
    };
    if (!advertisements) getData();

    const subscription = API.graphql(
      graphqlOperation(onCreateAdvertisement)
    ).subscribe({
      next: ({ provider, value }) => {
        const newAdvertisement = value.data.onCreateAdvertisement;
        setAdvertisements((ads) => {
          return [newAdvertisement].concat(ads || []);
        });
      },
      error: (error) => console.warn(error),
    });
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  async function fetchAdvertisements() {
    if (filter.status) {
      await fetchByStatus(filter.status);
    } else {
      await fetchAll();
    }
  }
  async function fetchAll() {
    const { list, nextToken } = await AdvertisementRepository.list(
      currentToken
    );
    setCurrentToken(nextToken);
    setAdvertisements((advertisements || []).concat(list));
  }

  async function fetchByStatus(status) {
    const { list, nextToken } = await AdvertisementRepository.listByStatus(
      status,
      currentToken
    );
    setCurrentToken(nextToken);
    setAdvertisements((advertisements || []).concat(list));
  }

  async function scrape() {
    console.log(advertisements);
    await API.post("scrape", "/marketplace");
  }

  return (
    <Stack spacing={2}>
      <AdvertisementForm
        item={{}}
        open={displayForm}
        onClose={() => setDisplayForm(false)}
      />
      <Grid container direction="row">
        {advertisements &&
          advertisements.map((advertisement) => {
            return (
              <AdvertisementView item={advertisement} key={advertisement.id} />
            );
          })}
      </Grid>
      <Stack direction="row">
        <Button
          onClick={() => setAdvertisements([{}].concat(advertisements || []))}
        >
          New
        </Button>
        <Button onClick={() => scrape()}>Scrape</Button>
        <Button onClick={() => fetchAdvertisements()} disabled={!currentToken}>
          More
        </Button>
      </Stack>
    </Stack>
  );
}
