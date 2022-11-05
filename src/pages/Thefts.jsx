import React, { useState, useEffect } from "react";
import { TheftStatus } from "../models";
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

import { onCreateTheft } from "../graphql/subscriptions";
import TheftRepository from "../repositories/TheftRepository";
import { TheftView } from "../components/TheftView";
import { ExpandMore } from "@mui/icons-material";
import { brands } from "../Brands";
import { width } from "@mui/system";

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
    getData();

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
  }, [filter]);

  async function fetchThefts() {
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
    const { items, nextToken } = await TheftRepository.list(currentToken, 3);
    setCurrentToken(nextToken);
    setThefts((thefts || []).concat(items));
  }

  async function fetchByStatus(status) {
    const { items, nextToken } = await TheftRepository.listByStatus(
      status,
      currentToken,
      3
    );
    setCurrentToken(nextToken);
    setThefts((thefts || []).concat(items));
  }
  async function fetchByBrandColor(brand, color) {
    const { items, nextToken } = await TheftRepository.listByBrandColor(
      brand,
      color,
      currentToken,
      3
    );
    setCurrentToken(nextToken);
    setThefts((thefts || []).concat(items));
  }
  async function scrapeBikeIndex() {
    const response = API.get("scrape", "/bikeindex");
    console.log(response);
  }
  function handleStatusFilterChanged(e) {
    setCurrentToken(null);
    setThefts([]);
    setFilter({
      ...filter,
      status:
        filter.status === TheftStatus.REVIEWED
          ? TheftStatus.UNREVIEWED
          : TheftStatus.REVIEWED,
    });
    console.log("Filter changed to " + JSON.stringify(filter));
  }
  function handleBrandFilterChanged(brand) {
    setCurrentToken(null);
    setThefts([]);
    setFilter({
      ...filter,
      brand: brand,
    });
    console.log("Filter changed to " + JSON.stringify(filter));
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
      <Grid container direction="row">
        {thefts &&
          thefts.map((theft) => {
            return <TheftView item={theft} key={theft.id} />;
          })}
      </Grid>
      <Stack direction="row">
        <Button onClick={() => setThefts([{}].concat(thefts || []))}>
          New
        </Button>
        <Button onClick={scrapeBikeIndex}>BikeIndex</Button>
        <Button onClick={() => fetchThefts()} disabled={!currentToken}>
          More
        </Button>
      </Stack>
    </Stack>
  );
}
