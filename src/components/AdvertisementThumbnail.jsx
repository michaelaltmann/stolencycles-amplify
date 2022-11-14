import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Icon,
  Link,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";
import {
  AdvertisementPlatform,
  AdvertisementStatus,
  MatchStatus,
} from "../models";
import { colors } from "../Colors";
import { brands, brandMap } from "../Brands";
import AdvertisementRepository from "../repositories/AdvertisementRepository";
import { ColorSelector } from "./ColorSelector";
import { matchFilterAtom } from "../recoil/match";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { packId, unpackId } from "../repositories/utils";

const classes = {
  card: {
    width: 290,
    margin: "5px",
    position: "relative",
    height: 224,
  },
  reviewed: {
    width: 290,
    margin: "3px",
    position: "relative",
    height: 224,
    borderStyle: "solid",
    borderWidth: "thin",
    border: "black",
    backgroundColor: "#f0f3f3",
  },
  button: {
    minWidth: 30,
  },
};

export function AdvertisementThumbnail(props) {
  const [advertisement, setAdvertisement] = useState(props.item || {});
  const [modified, setModified] = useState(false);
  const [matchFilter, setMatchFilter] = useRecoilState(matchFilterAtom);
  const navigate = useNavigate();

  const { id, url, images, postDate, status } = advertisement;
  const [platformName, platformId] = unpackId(id);

  const imageUrl = getImageUrl(images);
  const postDateText = postDate
    ? new Date(Date.parse(postDate)).toDateString()
    : "";

  const cardClass =
    status === AdvertisementStatus.UNREVIEWED || modified
      ? classes.card
      : classes.reviewed;
  const listingUrl = url ? url : platformUrl();

  function getImageUrl(imagesString) {
    if (!imagesString) {
      return "/images/bicycle-drawing.png";
    } else {
      const images = JSON.parse(imagesString);
      return images && images.length > 0
        ? images[0]
        : "/images/bicycle-drawing.png";
    }
  }
  function platformUrl() {
    switch (platformName) {
      case AdvertisementPlatform.OFFERUP:
        return "https://offerup.com/item/detail/" + platformId;
      case AdvertisementPlatform.MARKETPLACE:
        return "https://www.facebook.com/marketplace/item/" + platformId;
      default:
        return null;
    }
  }

  function handleViewAdvertisement() {
    window.open(listingUrl, "_blank", "width=800,height=600");
  }

  return (
    <Card sx={cardClass} key={id}>
      <CardActionArea onClick={handleViewAdvertisement}>
        <Box
          sx={{
            fontSize: "1rem",
            fontStyle: "italic",
            color: "gray",
          }}
        >
          {platformName} {postDateText}
        </Box>{" "}
        {url ? (
          imageUrl && (
            <CardMedia
              sx={{
                height: 200,
              }}
              image={imageUrl}
            />
          )
        ) : (
          <></>
        )}
      </CardActionArea>
    </Card>
  );
}
