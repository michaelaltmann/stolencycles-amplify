import { Button, Box, Stack, TextField, Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AdvertisementThumbnail } from "../components/AdvertisementThumbnail";
import SellerView from "../components/SellerView";
export default function Seller(props) {
  const { sellerId } = useParams();

  return <SellerView sellerId={sellerId} />;
}
