import { Button, Box, Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AdvertisementView } from "../components/AdvertisementView";
import AdvertisementRepository from "../repositories/AdvertisementRepository";
import SellerRepository from "../repositories/SellerRepository";
export default function Seller(props) {
  const { sellerId } = useParams();
  const [advertisements, setAdvertisements] = useState(null);
  const [seller, setSeller] = useState(null);
  const [modified, setModified] = useState(false);

  React.useEffect(() => {
    async function getData() {
      const { items } = await AdvertisementRepository.listBySellerId(sellerId);
      setAdvertisements(items);
    }
    if (!advertisements) getData();
  }, [sellerId]);

  React.useEffect(() => {
    async function getData() {
      const item = await SellerRepository.get(sellerId);
      setSeller(item || {});
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
    console.log(draft);
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
        Seller {sellerId} {names()}
      </Box>
      <TextField
        name="notes"
        sx={{
          fontSize: "1.2rem",
          textAlign: "left",
        }}
        maxRows={4}
        multiline={true}
        fullWidth
        value={seller?.notes || ""}
        onChange={handleChange}
        variant="standard"
      ></TextField>

      <Stack direction="row">
        <Button disabled={!modified} onClick={save}>
          Save
        </Button>
      </Stack>

      <Stack direction="row">
        {advertisements &&
          advertisements.map((advertisement) => {
            return (
              <AdvertisementView
                key={advertisement.id}
                item={advertisement}
              ></AdvertisementView>
            );
          })}
      </Stack>
    </>
  );
}
