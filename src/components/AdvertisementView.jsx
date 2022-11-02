import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Icon,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";
import { AdvertisementPlatform, AdvertisementStatus } from "../models";
import { colors } from "../Colors";
import AdvertisementRepository from "../repositories/AdvertisementRepository";
import { ColorSelector } from "./ColorSelector";
const classes = {
  card: {
    maxWidth: 290,
    margin: 5,
    position: "relative",
    height: 550,
  },
  reviewed: {
    maxWidth: 290,
    margin: 3,
    position: "relative",
    height: 550,
    borderStyle: "solid",
    borderWidth: "thin",
    border: "black",
    backgroundColor: "#f0f3f3",
  },
  button: {
    minWidth: 30,
  },
};

export function AdvertisementView(props) {
  const [advertisement, setAdvertisement] = useState(props.item);
  const [modified, setModified] = useState(false);

  const {
    id,
    title,
    url,
    platformName,
    platformId,
    description,
    price,
    model,
    color,
    images,
    postDate,
    seller,
    status,
    aliasId,
  } = advertisement;
  const brand = guessBrand();
  const imageUrl = getImageUrl(images);
  const postDateText = postDate
    ? new Date(Date.parse(postDate)).toDateString()
    : "";
  const [brands, setBrands] = useState([
    "Cannondale",
    "Bianchi",
    "Diamondback",
    "Fuji",
    "Giant",
    "Jamis",
    "Liv",
    "Marin",
    "Raleigh",
    "Salsa",
    "Schwinn",
    "Specialized",
    "Surly",
    "Trek",
    "Yuba",
  ]);
  const cardClass =
    status === AdvertisementStatus.UNREVIEWED || modified
      ? classes.card
      : classes.reviewed;
  const listingUrl = url ? url : platformUrl();
  const notificationRef = React.createRef();

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
    }
    return null;
  }

  function guessBrand() {
    const brand = advertisement.brand;
    if (brand) {
      return brand;
    } else {
      var brandMap = {};
      const brands = [
        "Bianchi",
        "Cannondale",
        "Diamondback",
        "Fuji",
        "Giant",
        "Jamis",
        "Liv",
        "Marin",
        "Masi",
        "Mongoose",
        "RadPower",
        "Raleigh",
        "Salsa",
        "Schwinn",
        "Specialized",
        "Surly",
        "Trek",
        "Yeti",
        "Yuba",
      ];
      brands.forEach((b) => {
        brandMap[b.toLowerCase().split(/s/)[0]] = b;
      });
      const words = (title || "")
        .split(/\s/)
        .concat((description || "").split(/\s/));
      var matchingBrands = [];
      words.forEach((word) => {
        const b = brandMap[word.toLowerCase()];
        if (b) {
          matchingBrands.push(b);
        }
      });
      if (matchingBrands.length === 1) {
        return matchingBrands[0];
      }
    }
    return null;
  }
  function handleViewAdvertisement() {
    window.open(listingUrl, "_blank", "width=800,height=600");
  }

  /* Changes */

  function checkReviewStatus(draft) {
    if (draft.status === AdvertisementStatus.UNREVIEWED || !draft.status) {
      if (draft.brand && draft.color) {
        return { ...draft, status: AdvertisementStatus.REVIEWED };
      } else {
        return { ...draft, status: AdvertisementStatus.UNREVIEWED };
      }
    } else if (draft.status === AdvertisementStatus.REVIEWED || !draft.status) {
      if (draft.brand && draft.color) {
        return { ...draft, status: AdvertisementStatus.REVIEWED };
      } else {
        return { ...draft, status: AdvertisementStatus.UNREVIEWED };
      }
    } else {
      return draft;
    }
  }

  function handleChange(e) {
    var { name, value } = e.target;
    let draft = { ...advertisement };
    draft[name] = value;
    setAdvertisement(checkReviewStatus(draft));
    setModified(true);
  }
  function handleAutoCompleteChange(name, value) {
    let draft = { ...advertisement };
    draft[name] = value;
    setAdvertisement(checkReviewStatus(draft));
    setModified(true);
  }

  function handleUrlChange(e) {
    const { value: url } = e.target;
    const marketplacePattern =
      /https:\/\/www.facebook.com\/marketplace\/item\/(\d+).*/;
    const offerupPattern =
      /https:\/\/offerup.com\/item\/detail\/([-A-z0-9]+).*/;
    let matches;
    matches = marketplacePattern.exec(url);
    if (matches) {
      const platformName = AdvertisementPlatform.MARKETPLACE;
      const platformId = matches[1];
      setAdvertisement({ ...advertisement, url, platformName, platformId });
      setModified(true);
    } else {
      matches = offerupPattern.exec(url);
      if (matches) {
        const platformName = AdvertisementPlatform.OFFERUP;
        const platformId = matches[1];
        setAdvertisement({ ...advertisement, url, platformName, platformId });
        setModified(true);
      } else {
        setAdvertisement({ ...advertisement, url, platformName, platformId });
        setModified(true);
      }
    }
  }
  function handleImageUrlChange(e) {
    const { value } = e.target;
    var newImages = images ? [...images, value] : [value];
    setAdvertisement({ ...advertisement, images: JSON.stringify(newImages) });
    setModified(true);
  }

  function setStatus(status) {
    setAdvertisement({ ...advertisement, status: status });
    setModified(true);
  }
  function handleColorChanged(selectedColor, e) {
    const color = selectedColor
      ? colors.find((c) => c.rgb.toLowerCase() === selectedColor.hex).name
      : null;
    const draft = checkReviewStatus(advertisement);
    setAdvertisement({ ...draft, color: color });
    setModified(true);
  }

  function revert() {
    setAdvertisement(props.item);
    setModified(false);
  }
  function handleSearch() {}

  /**
   * Save to the server
   */
  async function handleSubmit() {
    let item;
    if (id) {
      item = await AdvertisementRepository.update({
        ...advertisement,
        postDate: new Date().toISOString(),
      });
    } else {
      item = await AdvertisementRepository.create({
        ...advertisement,
        postDate: new Date().toISOString(),
      });
    }
    setAdvertisement(item);
    setModified(false);
  }

  return (
    <Card sx={cardClass} key={id}>
      {url ? (
        imageUrl && (
          <CardActionArea onClick={handleViewAdvertisement}>
            <CardMedia
              sx={{
                height: 200,
              }}
              image={imageUrl}
            />
          </CardActionArea>
        )
      ) : (
        <>
          <TextField
            name="url"
            variant="standard"
            value={url || ""}
            helperText="URL"
            onChange={handleUrlChange}
            fullWidth
          />
          <TextField
            name="imageUrl"
            variant="standard"
            value={imageUrl || ""}
            helperText="Image URL"
            onChange={handleImageUrlChange}
            fullWidth
          />
        </>
      )}
      <CardContent
        sx={{
          alignSelf: "end",
        }}
      >
        <Box
          sx={{
            fontSize: "1rem",
            fontStyle: "italic",
            color: "gray",
          }}
        >
          {platformName} {postDateText}
        </Box>
        <Box
          sx={{
            alignContent: "space-between",
          }}
        >
          <TextField
            name="title"
            sx={{
              fontSize: "1.2rem",
              textAlign: "left",
            }}
            value={title ? title.substring(0, Math.min(title.length, 24)) : ""}
            variant="standard"
            onChange={handleChange}
          ></TextField>
          $
          <TextField
            name="price"
            sx={{
              fontSize: "1.2rem",
              textAlign: "left",
              width: "3em",
            }}
            type="number"
            value={price || ""}
            onChange={handleChange}
            variant="standard"
          ></TextField>
        </Box>
        <TextField
          name="description"
          sx={{
            fontSize: "1.2rem",
            textAlign: "left",
          }}
          fullWidth
          value={
            description
              ? description.substring(0, Math.min(description.length, 220))
              : ""
          }
          onChange={handleChange}
          variant="standard"
        ></TextField>
        <ColorSelector color={color} handleColorChanged={handleColorChanged} />
        <Autocomplete
          sx={{ marginTop: "6px", marginBottom: "2px" }}
          freeSolo
          label="Brand"
          value={brand || ""}
          options={brands}
          name="brand"
          onChange={(e, value) => handleAutoCompleteChange("brand", value)}
          renderInput={(params) => <TextField {...params} label="Brand" />}
        />
        <TextField
          label="Model"
          value={model || ""}
          options={[]}
          name="model"
          fullWidth
          onChange={handleChange}
        />
      </CardContent>
      <CardActions
        sx={{
          maxWidth: 325,
          position: "absolute",
          bottom: "0px",
          margin: "5px",
        }}
      >
        <Tooltip title="Save" sx={classes.button}>
          <div>
            <Button
              onClick={handleSubmit}
              disabled={!modified}
              sx={classes.button}
              size="small"
            >
              <Icon
                style={modified ? { color: "green" } : { color: "lightGray" }}
              >
                check_icon
              </Icon>
            </Button>
          </div>
        </Tooltip>
        <Tooltip title="Search" sx={classes.button}>
          <div>
            <Button
              sx={classes.button}
              size="small"
              color="primary"
              onClick={handleSearch}
              disabled={!brand}
            >
              <Icon>search_icon</Icon>
            </Button>
          </div>
        </Tooltip>
        {aliasId ? (
          <Tooltip
            title={
              seller
                ? (seller.firstName || "") + " " + (seller.lastName || "")
                : "Seller"
            }
            sx={classes.button}
          >
            <Button
              href={"/sellerByAlias/" + aliasId}
              target="_seller"
              sx={classes.button}
              size="small"
            >
              {" "}
              {seller && seller.images && seller.images[0].sourceUrl ? (
                <img
                  alt={(seller.firstName || "") + " " + (seller.lastName || "")}
                  src={seller.images[0].sourceUrl}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Icon style={{ color: "black" }}>person_icon</Icon>
              )}
            </Button>
          </Tooltip>
        ) : (
          <Icon style={{ color: "lightgray" }}>person_icon</Icon>
        )}
        <Tooltip title="Flagged" sx={classes.button}>
          <Button
            sx={classes.button}
            size="small"
            onClick={() => setStatus(AdvertisementStatus.FLAGGED)}
          >
            <Icon
              style={{
                color: status === AdvertisementStatus.FLAGGED ? "gray" : "red",
                borderStyle: "solid",
                borderWidth: status === "Dirty" ? 1 : 0,
              }}
            >
              flag_icon
            </Icon>
          </Button>
        </Tooltip>

        <Tooltip title="Not of Interest" sx={classes.button}>
          <Button
            sx={classes.button}
            size="small"
            onClick={() => setStatus(AdvertisementStatus.JUNK)}
          >
            <Icon
              style={{
                color: status === AdvertisementStatus.JUNK ? "gray" : "blue",
                borderStyle: "solid",
                borderWidth: status === AdvertisementStatus.JUNK ? 1 : 0,
              }}
            >
              delete_icon
            </Icon>
          </Button>
        </Tooltip>
        <Tooltip title="Sold" sx={classes.button}>
          <Button
            sx={classes.button}
            size="small"
            onClick={() => setStatus(AdvertisementStatus.SOLD)}
          >
            <Icon
              style={{
                color: status === AdvertisementStatus.SOLD ? "gray" : "blue",
                borderStyle: "solid",
                borderWidth: status === AdvertisementStatus.SOLD ? 1 : 0,
              }}
            >
              shopping_cart_icon
            </Icon>
          </Button>
        </Tooltip>
        <Tooltip title="Undo" sx={classes.button}>
          <Button sx={classes.button} size="small" onClick={() => revert()}>
            <Icon
              style={{
                color: !modified ? "gray" : "blue",
                borderStyle: "solid",
                borderWidth: 0,
              }}
            >
              undo_icon
            </Icon>
          </Button>
        </Tooltip>
        <Snackbar message="" ref={notificationRef} />
      </CardActions>
    </Card>
  );
}
