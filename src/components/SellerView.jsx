import {
  Button,
  Box,
  Stack,
  TextField,
  Link,
  Grid,
  Tooltip,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { AdvertisementThumbnail } from "./AdvertisementThumbnail";
import { AdvertisementPlatform } from "../models";
import SellerRepository from "../repositories/SellerRepository";
import { unpackId } from "../repositories/utils";
import AdvertisementRepository from "../repositories/AdvertisementRepository";
import { Check, Flag } from "@mui/icons-material";
export default function SellerView(props) {
  const sellerId = props.sellerId || props.seller?.id;
  const [seller, setSeller] = useState(props.seller);
  const [modified, setModified] = useState(false);
  const url = buildUrl();
  const advertisements = seller?.advertisements
    ? seller.advertisements.items
    : [];
  const { flagged } = seller;
  function buildUrl() {
    const [platformName, platformId] = unpackId(sellerId);
    if (platformName === AdvertisementPlatform.MARKETPLACE) {
      return "https://www.facebook.com/profile.php?id=" + platformId;
    } else if (platformName === AdvertisementPlatform.OFFERUP) {
      return "https://offerup.com/p/" + platformId;
    } else {
      return null;
    }
  }

  React.useEffect(() => {
    async function getData() {
      const item = await SellerRepository.get(sellerId);
      if (!item) {
        const { items } = await AdvertisementRepository.listBySellerId(
          sellerId
        );
        setSeller({ advertisements: { items } });
      } else {
        setSeller(item);
      }
    }
    if (!seller) getData();
  }, [sellerId]);

  function names() {
    const list = advertisements
      ? advertisements.map((ad) => ad.sellerName)
      : [];
    return [...new Set(list)].sort().join(", ");
  }

  function handleChange(e) {
    var { name, value } = e.target;
    let draft = { ...seller };
    draft[name] = value;
    setSeller(draft);
    setModified(true);
  }
  function toggleFlagged() {
    const draft = { ...seller, flagged: !seller.flagged };
    setSeller(draft);
    setModified(true);
  }
  async function save() {
    if (seller.id) {
      const newSeller = await SellerRepository.update(seller);
      setSeller(newSeller);
      setModified(false);
    } else {
      const newSeller = await SellerRepository.create({
        ...seller,
        id: sellerId,
      });
      setSeller(newSeller);
      setModified(false);
    }
  }

  return (
    <Box
      sx={{
        border: "2px",
        borderColor: "black",
        borderStyle: "solid",
      }}
    >
      <Box>
        <Link href={url} target="_blank">
          {sellerId} {names()}{" "}
        </Link>
      </Box>

      <Grid container direction="row">
        {advertisements &&
          advertisements.map((advertisement) => {
            return (
              <Grid item key={advertisement.id}>
                <AdvertisementThumbnail
                  item={advertisement}
                ></AdvertisementThumbnail>
              </Grid>
            );
          })}
      </Grid>
      <TextField
        name="notes"
        label="Notes"
        variant="filled"
        sx={{
          fontSize: "1.2rem",
          textAlign: "left",
          width: "90%",
        }}
        maxRows={4}
        multiline={true}
        value={seller?.notes || ""}
        onChange={handleChange}
      ></TextField>

      <Stack direction="row">
        <Tooltip title="Save">
          <IconButton
            sx={{ color: modified ? "green" : "gray" }}
            size="small"
            disabled={seller?.id && !modified}
            onClick={save}
          >
            <Check />
          </IconButton>
        </Tooltip>
        <Tooltip title="Flag">
          <IconButton
            sx={{ color: flagged ? "red" : "gray" }}
            size="small"
            onClick={toggleFlagged}
          >
            <Flag />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}
