import { Button, Box, Stack, TextField, Link, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AdvertisementThumbnail } from "./AdvertisementThumbnail";
import { AdvertisementPlatform } from "../models";
import SellerRepository from "../repositories/SellerRepository";
import { unpackId } from "../repositories/utils";
import AdvertisementRepository from "../repositories/AdvertisementRepository";
export default function SellerView(props) {
  const sellerId = props.sellerId || props.seller?.id;
  const [seller, setSeller] = useState(props.seller);
  const [modified, setModified] = useState(false);
  const url = buildUrl();
  const advertisements = seller?.advertisements
    ? seller.advertisements.items
    : [];
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

  async function save() {
    if (seller.id) {
      await SellerRepository.update(seller);
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
    <>
      <Box>
        <Link href={url} target="_blank">
          {sellerId} {names()}{" "}
        </Link>
      </Box>
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
        <Button disabled={seller?.id && !modified} onClick={save}>
          Save
        </Button>
      </Stack>

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
    </>
  );
}
