import React, { useState, useEffect } from "react";
import { AdvertisementStatus } from "../models";
import { AdvertisementView } from "../components/AdvertisementView";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import API, { graphqlOperation } from "@aws-amplify/api";
import InfiniteScroll from "react-infinite-scroll-component";

import { onCreateAdvertisement } from "../graphql/subscriptions";
import AdvertisementRepository from "../repositories/AdvertisementRepository";
import { ExpandMore } from "@mui/icons-material";
import { brands } from "../Brands";

export default function Advertisements() {
  const [filter, setFilter] = useState({
    status: AdvertisementStatus.UNREVIEWED,
  });
  const [currentToken, setCurrentToken] = useState(null);
  const [advertisements, setAdvertisements] = useState(null);
  useEffect(() => {
    const getData = async () => {
      await fetchAdvertisements();
    };
    getData();

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
  }, [filter]);

  async function fetchAdvertisements() {
    if (filter.brand || filter.color) {
      await fetchByBrandColor(filter.brand, filter.color);
    } else {
      if (filter.status) {
        await fetchByStatus(filter.status);
      } else {
        await fetchAll();
      }
    }
  }
  async function fetchAll() {
    const { items, nextToken } = await AdvertisementRepository.list(
      currentToken,
      20
    );
    setCurrentToken(nextToken);
    setAdvertisements((advertisements || []).concat(items));
  }

  async function fetchByStatus(status) {
    const { items, nextToken } = await AdvertisementRepository.listByStatus(
      status,
      currentToken,
      20
    );
    setCurrentToken(nextToken);
    setAdvertisements((advertisements || []).concat(items));
  }

  async function fetchByBrandColor(brand, color) {
    const { items, nextToken } = await AdvertisementRepository.listByBrandColor(
      brand,
      color,
      currentToken,
      3
    );
    setCurrentToken(nextToken);
    setAdvertisements((advertisements || []).concat(items));
  }

  async function scrape() {
    console.log(advertisements);
    await API.post("scrape", "/marketplace");
  }
  function handleStatusFilterChanged(e) {
    setCurrentToken(null);
    setAdvertisements([]);
    setFilter({
      ...filter,
      status:
        filter.status === AdvertisementStatus.REVIEWED
          ? AdvertisementStatus.UNREVIEWED
          : AdvertisementStatus.REVIEWED,
    });
  }

  function handleBrandFilterChanged(brand) {
    setCurrentToken(null);
    setAdvertisements([]);
    setFilter({
      ...filter,
      brand: brand,
    });
  }
  const [expandFilter, setExpandFilter] = useState(false);
  return (
    <Stack spacing={2}>
      <Accordion
        expanded={expandFilter}
        onChange={() => setExpandFilter(!expandFilter)}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ flexShrink: 0 }}>Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={"row"}>
            <FormControlLabel
              control={<Switch onChange={handleStatusFilterChanged} />}
              label="Reviewed"
            />
            <Autocomplete
              sx={{ marginTop: "6px", marginBottom: "2px", width: "200px" }}
              freeSolo
              label="Brand"
              value={filter.brand || ""}
              options={brands}
              name="brand"
              onChange={(e, value) => handleBrandFilterChanged(value)}
              renderInput={(params) => <TextField {...params} label="Brand" />}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {advertisements && (
        <InfiniteScroll
          dataLength={advertisements ? advertisements.length : 0}
          next={fetchAdvertisements}
          hasMore={currentToken != null}
        >
          <Grid container direction="row">
            {advertisements.map((advertisement) => {
              return (
                <Grid item key={advertisement.id}>
                  {" "}
                  <AdvertisementView item={advertisement} />
                </Grid>
              );
            })}
          </Grid>
        </InfiniteScroll>
      )}
      <Stack direction="row">
        <Button
          onClick={() => setAdvertisements([{}].concat(advertisements || []))}
        >
          New
        </Button>
        <Button onClick={() => scrape()}>Scrape</Button>
      </Stack>
    </Stack>
  );
}
