import React, { useState } from "react";
import { AdvertisementPlatform, AdvertisementStatus } from "../models";
import { Button, Dialog, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
import AdvertisementRepository from "../repositories/AdvertisementRepository";
import { packId } from "../repositories/utils";

export function AdvertisementForm(props) {
  const { item, open, onClose } = props;
  const initialState = { title: "", status: AdvertisementStatus.UNREVIEWED };

  const [formState, setFormState] = useState({ ...initialState, ...item });

  function cancelEdit() {
    setFormState(initialState);
    onClose();
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
