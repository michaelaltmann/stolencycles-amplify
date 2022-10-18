import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Advertisement, AdvertisementStatus } from "../models";
import AdvertisementView from "../components/AdvertisementView";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
function AdvertisementForm(props) {
  const { item } = props;
  const initialState = { title: "", status: AdvertisementStatus.UNREVIEWED };

  const [formState, setFormState] = useState({ initialState, ...item });
  return (
    <Container style={{ backgroundColor: "white" }}>
      <Stack>
        <TextField
          label="imageUrl"
          value={formState.imageUrl}
          onChange={(e) =>
            setFormState({ ...formState, imageUrl: e.target.value })
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
        <Button onClick={() => create()}>Create</Button>
      </Stack>
    </Container>
  );
  async function create() {
    if (formState.title) {
      await DataStore.save(new Advertisement({ ...formState }));
      setFormState(initialState);
    }
  }
}
export default function Advertisements() {
  const [showCreate, setShowCreate] = useState(true);
  const [advertisements, setAdvertisement] = useState([]);
  useEffect(() => {
    fetchAdvertisements();
    const subscription = DataStore.observe(Advertisement).subscribe(() =>
      fetchAdvertisements()
    );
    return () => subscription.unsubscribe();
  });
  async function fetchAdvertisements() {
    const list = await DataStore.query(Advertisement);
    setAdvertisement(list);
  }

  return (
    <Stack spacing={2}>
      <AdvertisementForm item={{}} />
      <h3>Advertisements</h3>
      <Stack spacing={2}>
        {advertisements.map((advertisement) => {
          return (
            <AdvertisementView item={advertisement} key={advertisement.id} />
          );
        })}
      </Stack>
    </Stack>
  );
}
