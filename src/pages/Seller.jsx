import { Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import AdvertisementRepository from "../repositories/AdvertisementRepository";
export default function Seller(props) {
  const { sellerId } = useParams();
  const advertisements = AdvertisementRepository.listBySellerId(sellerId);
  return (
    <>
      <Box>Seller {sellerId}</Box>
      <Stack>
        {advertisements.map((advertisement) => {
          return (
            <>
              {advertisement.platformName} {advertisement.platformId}{" "}
              {advertisement.title}
            </>
          );
        })}
      </Stack>
    </>
  );
}
