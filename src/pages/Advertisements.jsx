import React, { useState, useEffect } from "react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Advertisement, AdvertisementStatus } from "../models";
import AdvertisementView from "../components/AdvertisementView";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
import API from "@aws-amplify/api";
import { listAdvertisements } from "../graphql/queries";
function AdvertisementForm(props) {
  const { item } = props;
  const initialState = { title: "", status: AdvertisementStatus.UNREVIEWED };

  const [formState, setFormState] = useState({ initialState, ...item });
  return (
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
        <Button onClick={() => create()}>Create</Button>
      </Stack>
    </Container>
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
  const [showCreate, setShowCreate] = useState(true);
  const [currentToken, setCurrentToken] = useState(null);
  const [advertisements, setAdvertisements] = useState([]);
  useEffect(() => {
    const getData = async () => {
      fetchAdvertisements();
      const subscription = DataStore.observe(Advertisement).subscribe(() =>
        fetchAdvertisements()
      );
      return () => subscription.unsubscribe();
    };
    if (!advertisements) getData();
  }, [currentToken, advertisements]);
  async function fetchAdvertisements() {
    const {
      data: {
        listAdvertisements: { items: list, nextToken },
      },
    } = await API.graphql({
      query: listAdvertisements,
      variables: { limit: 1, nextToken: currentToken },
    });
    setCurrentToken(nextToken);
    setAdvertisements(advertisements.concat(list));
  }

  return (
    <Stack spacing={2}>
      <AdvertisementForm item={{}} />
      <h3>Advertisements</h3>
      <Grid container direction="row">
        {advertisements.map((advertisement) => {
          return (
            <AdvertisementView item={advertisement} key={advertisement.id} />
          );
        })}
      </Grid>
      <Button onClick={() => fetchAdvertisements()}>More</Button>
    </Stack>
  );
}
