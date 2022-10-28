import React, { useState, useEffect } from "react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Advertisement, AdvertisementStatus } from "../models";
import AdvertisementView from "../components/AdvertisementView";
import { Button, Dialog, Grid, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
import API, { graphqlOperation } from "@aws-amplify/api";
import {
  advertisementsByStatusPostDateId,
  listAdvertisements,
} from "../graphql/queries";
import {
  onCreateAccount,
  onCreateAdvertisement,
} from "../graphql/subscriptions";
import AdvertisementRepository from "../repositories/AdvertisementRepository";
function AdvertisementForm(props) {
  const { item, open } = props;
  const initialState = { title: "", status: AdvertisementStatus.UNREVIEWED };

  const [formState, setFormState] = useState({ initialState, ...item });
  const [isOpen, setOpen] = useState(open);

  function cancelEdit() {
    setFormState(initialState);
    setOpen(false);
  }
  return (
    <Dialog open={isOpen} onClose={cancelEdit}>
      <Container style={{ backgroundColor: "white" }}>
        <Stack>
          <TextField
            label="platformName"
            value={formState.platformName}
            onChange={(e) =>
              setFormState({ ...formState, platformName: e.target.value })
            }
          ></TextField>
          <TextField
            label="platformId"
            value={formState.platformId}
            onChange={(e) =>
              setFormState({ ...formState, platformId: e.target.value })
            }
          ></TextField>
          <TextField
            label="title"
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
          ></TextField>
          <TextField
            label="description"
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
          ></TextField>
          <TextField
            label="imageUrl"
            value={formState.imageUrl}
            onChange={(e) =>
              setFormState({ ...formState, imageUrl: e.target.value })
            }
          ></TextField>
          <Button onClick={cancelEdit}>Cancel</Button>
          <Button onClick={create}>Create</Button>
        </Stack>
      </Container>
    </Dialog>
  );
  async function create() {
    if (formState.title) {
      await DataStore.save(
        new Advertisement({
          ...formState,
          imageUrl: null,
          images: JSON.stringify(formState.imageUrl.split(/[\s,]+/)),
        })
      );
      setFormState(initialState);
    }
  }
}
export default function Advertisements() {
  const [displayForm, setDisplayForm] = useState(false);
  const [currentToken, setCurrentToken] = useState(null);
  const [advertisements, setAdvertisements] = useState(null);
  useEffect(() => {
    console.log("UseEffect");
    let subscription;
    const getData = async () => {
      fetchAdvertisements();
      subscription = await API.graphql(
        graphqlOperation(onCreateAdvertisement)
      ).subscribe({
        next: ({ provider, value }) => {
          const newAdvertisement = value.data.onCreateAdvertisement;
          handleNewAdvertisement(newAdvertisement);
        },
        error: (error) => console.warn(error),
      });
      return () => {
        subscription.unsubscribe();
      };
    };
    if (!advertisements) getData();
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  function handleNewAdvertisement(newAdvertisement) {
    console.log(advertisements);
    const newList = [newAdvertisement].concat(advertisements || []);
    setAdvertisements(newList);
  }

  async function fetchAdvertisements() {
    await fetchUnreviewed();
  }
  async function fetchAll() {
    const { list, nextToken } = await AdvertisementRepository.list(
      currentToken
    );
    setCurrentToken(nextToken);
    setAdvertisements((advertisements || []).concat(list));
  }

  async function fetchUnreviewed() {
    const { list, nextToken } = await AdvertisementRepository.listByStatus(
      AdvertisementStatus.UNREVIEWED,
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
      <AdvertisementForm item={{}} open={displayForm} />
      <Grid container direction="row">
        {advertisements &&
          advertisements.map((advertisement) => {
            return (
              <AdvertisementView item={advertisement} key={advertisement.id} />
            );
          })}
      </Grid>
      <Stack direction="row">
        <Button onClick={() => setDisplayForm(true)}>New</Button>
        <Button onClick={() => scrape()}>Scrape</Button>
        <Button onClick={() => fetchAdvertisements()} disabled={!currentToken}>
          More
        </Button>
      </Stack>
    </Stack>
  );
}
