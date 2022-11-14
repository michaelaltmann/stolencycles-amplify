import React, { useState, useEffect } from "react";
import { Button, Box, Stack, TextField } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

import SellerRepository from "../repositories/SellerRepository";
export default function Sellers(props) {
  const [currentToken, setCurrentToken] = useState(null);
  const [sellers, setSellers] = useState(null);
  async function getData() {
    const { items, nextToken } = await SellerRepository.list(currentToken, 20);
    setSellers(items);
    setCurrentToken(nextToken);
  }
  React.useEffect(() => {
    if (!sellers) {
      getData();
    }
  });

  return (
    <Stack>
      <Box>Sellers</Box>
      {sellers && (
        <InfiniteScroll
          dataLength={sellers ? sellers.length : 0}
          next={getData}
          hasMore={currentToken != null}
        >
          {" "}
          {sellers.map((seller) => {
            return <Box key={seller.id}>{seller.id}</Box>;
          })}
        </InfiniteScroll>
      )}
    </Stack>
  );
}
