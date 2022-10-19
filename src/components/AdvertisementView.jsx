import {
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
import { Platform } from "../models";

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
  const advertisement = props.item;
  const {
    id,
    title,
    description,
    price,
    modelName,
    color,
    imageUrl,
    platformName,
    platformId,
    postDate,
    seller,
    status,
    aliasId,
  } = advertisement;
  const brand = guessBrand();
  const postDateText = postDate
    ? new Date(Date.parse(postDate)).toDateString()
    : "";
  const [brands, setBrands] = useState([
    "Bianchi",
    "Cervelo",
    "Diamondback",
    "Schwinn",
    "Trek",
  ]);
  const [modified, setModified] = useState(false);
  const bookmarked = false;
  const cardClass =
    brand && color && !modified ? classes.reviewed : classes.card;
  const colors = [
    { name: "Blue", rgb: "#0000FF" },
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
        "Schwinn",
        "Specialized",
        "Surly",
        "Trek",
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

  function handleChange() {}

  function handleSearch() {}
  function handleSubmit() {}
  function handleUpdate() {}
  function setStatus(newStatus) {}
  function handleBookmark() {}
  function handleColorChanged(e) {}

  function renderColorSelect() {
    const fullColor = colors.find((c) => c.name === color);
    const rgb = fullColor ? fullColor.rgb.toLowerCase() : undefined;
    const colorHexes = colors.map((c) => {
      return c.rgb.toLowerCase();
    });
    return (
      <Container sx={{ backgroundColor: "rgb(220,220,220)", padding: 5 }}>
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
    <Card className={cardClass} key={id}>
      {imageUrl && (
        <CardActionArea onClick={handleViewAdvertisement}>
          {false && (
            <Button
              size="small"
              color="primary"
              sx={{
                width: 24,
                position: "absolute",
                top: 0,
                left: 280,
              }}
              onClick={handleBookmark}
            >
              <Icon>
                {bookmarked ? "bookmark_icon" : "bookmark_border_icon"}
              </Icon>
            </Button>
          )}
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
          <div
            sx={{
              fontStyle: "italic",
              color: "gray",
            }}
          >
            {platformName} {postDateText}
          </div>
          <div
            sx={{
              fontSize: "1.2rem",
            }}
          >
            {title.substring(0, Math.min(title.length, 24))} ${price}
          </div>
          <div
            sx={{
              fontSize: "12px",
            }}
          >
            {description}
          </div>

          <Autocomplete
            freeSolo
            label="Brand"
            value={brand}
            options={brands}
            name="brand"
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Brand" />}
          />
          {renderColorSelect()}
          <Autocomplete
            freeSolo
            label="Model"
            value={modelName}
            options={[]}
            name="modelName"
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Model" />}
          />
        </form>
      </CardContent>
      <CardActions
        sx={{
          maxWidth: 325,
          position: "absolute",
          bottom: "0px",
          margin: 5,
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
              onClick={setStatus.bind("Dirty")}
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
            onClick={setStatus.bind("Clean")}
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
            onClick={setStatus.bind("Junk")}
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
            onClick={setStatus.bind("Sold")}
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
            onClick={setStatus.bind("NeedsReview")}
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
