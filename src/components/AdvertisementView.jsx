import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Icon,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";
import { CirclePicker } from "react-color";
import { Advertisement, Platform } from "../models";
import { DataStore } from "@aws-amplify/datastore";

const classes = {
  card: {
    maxWidth: 325,
    margin: 5,
    position: "relative",
    height: 550,
  },
  reviewed: {
    maxWidth: 325,
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

const AdvertisementView = (props) => {
  const [advertisement, setAdvertisement] = useState(props.item);
  const {
    id,
    title,
    description,
    price,
    modelName,
    color,
    images,
    platformName,
    platformId,
    postDate,
    seller,
    status,
    aliasId,
  } = advertisement;
  const brand = guessBrand();
  const imageUrl = images && images.length > 0 ? images[0] : null;
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
  const [modified, setModified] = useState(false);
  const cardClass =
    brand && color && !modified ? classes.reviewed : classes.card;
  const colors = [
    { name: "Blue", rgb: "#0000FF" },
    { name: "Green", rgb: "#008000" },
    { name: "Orange", rgb: "#FFA500" },
    { name: "Red", rgb: "#FF0000" },
    { name: "Black", rgb: "#000000" },
    { name: "Purple", rgb: "#A000A0" },
    { name: "Silver", rgb: "#A0A0A0" },
    { name: "Yellow", rgb: "#FFFF00" },
    { name: "White", rgb: "#FFFFFF" },
  ];
  const notificationRef = React.createRef();

  function platformUrl() {
    console.log(platformName);
    switch (platformName) {
      case Platform.OFFERUP:
        return "https://offerup.com/item/detail/" + platformId;
      case Platform.MARKETPLACE:
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
      ];
      brands.forEach((b) => {
        brandMap[b.toLowerCase()] = b;
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
    const url = platformUrl();
    window.open(url, "_blank", "width=800,height=600");
  }

  function handleChange(e) {
    var { name, value } = e.target;
    setAdvertisement(
      Advertisement.copyOf(advertisement, (draft) => {
        draft[name] = value;
      })
    );
    setModified(true);
  }
  function handleAutoCompleteChange(name, value) {
    setAdvertisement(
      Advertisement.copyOf(advertisement, (draft) => {
        draft[name] = value;
      })
    );
    setModified(true);
  }

  function handleSearch() {}

  async function handleSubmit() {
    await DataStore.save(advertisement);
    setModified(false);
  }

  function handleUpdate() {}
  function setStatus(status) {
    setAdvertisement(
      Advertisement.copyOf(advertisement, (draft) => {
        draft.status = status;
      })
    );
    setModified(true);
  }
  function handleBookmark() {}
  function handleColorChanged(color, e) {
    const selectedColor = color
      ? colors.find((c) => c.rgb.toLowerCase() === color.hex).name
      : undefined;
    setAdvertisement(
      Advertisement.copyOf(advertisement, (draft) => {
        draft.color = selectedColor;
      })
    );
    setModified(true);
  }

  function renderColorSelect() {
    const fullColor = colors.find((c) => c.name === color);
    const rgb = fullColor ? fullColor.rgb.toLowerCase() : undefined;
    const colorHexes = colors.map((c) => {
      return c.rgb.toLowerCase();
    });
    return (
      <Container
        sx={{
          backgroundColor: "rgb(220,220,220)",
          padding: "5px",
          marginTop: "2px",
          marginBottom: "2px",
        }}
      >
        <CirclePicker
          color={rgb}
          colors={colorHexes}
          width="330px"
          triangle="hide"
          circleSpacing={2}
          onChangeComplete={handleColorChanged}
        />
      </Container>
    );
  }
  return (
    <Card sx={cardClass} key={id}>
      {imageUrl && (
        <CardActionArea onClick={handleViewAdvertisement}>
          <CardMedia
            sx={{
              height: 200,
            }}
            image={imageUrl}
          />
        </CardActionArea>
      )}
      <CardContent
        sx={{
          alignSelf: "end",
        }}
      >
        <form id={"advertisement-form-" + id}>
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
              fontSize: "1.2rem",
              textAlign: "left",
            }}
          >
            {title ? title.substring(0, Math.min(title.length, 24)) : ""} $
            {price}
          </Box>
          <Box
            sx={{
              fontSize: "12px",
              textAlign: "left",
            }}
          >
            {description
              ? description.substring(0, Math.min(description.length, 220))
              : ""}
          </Box>

          {renderColorSelect()}
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
            value={modelName || ""}
            options={[]}
            name="modelName"
            fullWidth
            onChange={handleChange}
          />
        </form>
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
        {false && (
          <Tooltip title="Shady" sx={classes.button}>
            <Button
              sx={classes.button}
              size="small"
              onClick={() => setStatus("Dirty")}
            >
              <Icon
                style={{
                  color: status === "Dirty" ? "gray" : "red",
                  borderStyle: "solid",
                  borderWidth: status === "Dirty" ? 1 : 0,
                }}
              >
                sentiment_very_dissatisfied_icon
              </Icon>
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Legit" sx={classes.button}>
          <Button
            sx={classes.button}
            size="small"
            onClick={() => setStatus("Clean")}
          >
            <Icon
              style={{
                color: status === "Clean" ? "gray" : "green",
                borderStyle: "solid",
                borderWidth: status === "Clean" ? 1 : 0,
              }}
            >
              thumb_up_icon
            </Icon>
          </Button>
        </Tooltip>

        <Tooltip title="Not of Interest" sx={classes.button}>
          <Button
            sx={classes.button}
            size="small"
            onClick={() => setStatus("Junk")}
          >
            <Icon
              style={{
                color: status === "Junk" ? "gray" : "blue",
                borderStyle: "solid",
                borderWidth: status === "Junk" ? 1 : 0,
              }}
            >
              toys_icon
            </Icon>
          </Button>
        </Tooltip>

        <Tooltip title="Sold" sx={classes.button}>
          <Button
            sx={classes.button}
            size="small"
            onClick={() => setStatus("Sold")}
          >
            <Icon
              style={{
                color: status === "Sold" ? "gray" : "blue",
                borderStyle: "solid",
                borderWidth: status === "Sold" ? 1 : 0,
              }}
            >
              shopping_cart_icon
            </Icon>
          </Button>
        </Tooltip>
        <Tooltip title="Undo" sx={classes.button}>
          <Button
            sx={classes.button}
            size="small"
            onClick={() => setStatus("NeedsReview")}
          >
            <Icon
              style={{
                color: status === "NeedsReview" ? "gray" : "blue",
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
};

export default AdvertisementView;
