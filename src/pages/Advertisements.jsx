import React, { useState, useEffect } from "react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import {
  Advertisement,
  AdvertisementPlatform,
  AdvertisementStatus,
} from "../models";
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
import { CommentsDisabledOutlined } from "@mui/icons-material";
function AdvertisementForm(props) {
  const { item, open, onClose } = props;
  const initialState = { title: "", status: AdvertisementStatus.UNREVIEWED };

  const [formState, setFormState] = useState({ ...initialState, ...item });

  function cancelEdit() {
    setFormState(initialState);
    onClose();
  }
  function packId(platformName, platformId) {
    return platformName + "#" + platformId;
  }
  function handleUrl(url) {
    const marketplacePattern =
      /https:\/\/www.facebook.com\/marketplace\/item\/(\d+).*/;
    const offerupPattern =
      /https:\/\/offerup.com\/item\/detail\/([-A-z0-9]+).*/;
    let matches;
    matches = marketplacePattern.exec(url);
    if (matches) {
      const plattformName = AdvertisementPlatform.MARKETPLACE;
      const platformId = matches[1];
      const id = packId(plattformName, platformId);
      setFormState({ ...formState, id: id });
    } else {
      matches = offerupPattern.exec(url);
      if (matches) {
        const plattformName = AdvertisementPlatform.OFFERUP;
        const platformId = matches[1];
        const id = packId(plattformName, platformId);
        setFormState({ ...formState, id: id, url: url });
      } else {
        setFormState({ ...formState, url: url });
      }
    }
  }
  return (
    <Dialog open={open} onClose={cancelEdit}>
      <Container style={{ backgroundColor: "white" }}>
        <Stack>
          <TextField
            label="url"
            value={formState.url || ""}
            onChange={(e) => handleUrl(e.target.value)}
          ></TextField>

          <TextField
            label="title"
            value={formState.title || ""}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
          ></TextField>
          <TextField
            label="description"
            value={formState.description || ""}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
          ></TextField>
          <TextField
            label="imageUrl"
            value={formState.imageUrl || ""}
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
    await AdvertisementRepository.create({
      id: formState.id,
      url: formState.url,
      title: formState.title,
      description: formState.description,
      postDate: new Date().toISOString(),
      images: JSON.stringify(formState.imageUrl.split(/[\s,]+/)),
    });
    setFormState(initialState);
  }
}
export default function Advertisements() {
  const [displayForm, setDisplayForm] = useState(false);
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
        <Button onClick={() => setDisplayForm(true)}>New</Button>
        <Button onClick={() => scrape()}>Scrape</Button>
        <Button onClick={() => fetchAdvertisements()} disabled={!currentToken}>
          More
        </Button>
      </Stack>
    </Stack>
  );
}
