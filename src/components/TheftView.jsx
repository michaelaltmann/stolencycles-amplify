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
import { TheftPlatform, TheftStatus } from "../models";
import { colors } from "../Colors";
import TheftRepository from "../repositories/TheftRepository";
import { ColorSelector } from "./ColorSelector";
import API from "@aws-amplify/api";

const classes = {
  card: {
    width: 290,
    margin: "5px",
    position: "relative",
    height: 550,
  },
  reviewed: {
    width: 290,
    margin: "3px",
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

export function TheftView(props) {
  const [theft, setTheft] = useState(props.item);
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
  } = theft;
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
    brand && color && !modified ? classes.reviewed : classes.card;
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
      case TheftPlatform.OFFERUP:
        return "https://www.bikeindex.org/bikes/" + platformId;
      case TheftPlatform.FACEBOOK:
        return (
          "https://www.facebook.com/groups/TwinCitiesStolenBikes/posts/" +
          platformId
        );
    }
    return null;
  }

  function guessBrand() {
    const brand = theft.brand;
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
  function handleViewTheft() {
    window.open(listingUrl, "_blank", "width=800,height=600");
  }

  // Changes
  function checkReviewStatus(draft) {
    if (draft.status === TheftStatus.UNREVIEWED || !draft.status) {
      if (draft.brand && draft.color) {
        return { ...draft, status: TheftStatus.REVIEWED };
      } else {
        return { ...draft, status: TheftStatus.UNREVIEWED };
      }
    } else if (draft.status === TheftStatus.REVIEWED || !draft.status) {
      if (draft.brand && draft.color) {
        return { ...draft, status: TheftStatus.REVIEWED };
      } else {
        return { ...draft, status: TheftStatus.UNREVIEWED };
      }
    } else {
      return draft;
    }
  }

  function handleChange(e) {
    var { name, value } = e.target;
    let draft = { ...theft };
    draft[name] = value;
    const update = checkReviewStatus(draft);
    setTheft(update);
    setModified(true);
  }
  function handleAutoCompleteChange(name, value) {
    let draft = { ...theft };
    draft[name] = value;
    setTheft(checkReviewStatus(draft));
    setModified(true);
  }

  function handleUrlChange(e) {
    const { value: url } = e.target;
    const marketplacePattern =
      /https:\/\/www.facebook.com\/groups\/TwinCitiesStolenBikes\/post\/(\d+).*/;
    const bikeIndexPattern = /https:\/\/bikeindex.org\/bikes\/([-A-z0-9]+).*/;
    let matches;
    matches = marketplacePattern.exec(url);
    if (matches) {
      const platformName = TheftPlatform.FACEBOOK;
      const platformId = matches[1];
      setTheft({ ...theft, url, platformName, platformId });
      setModified(true);
    } else {
      matches = bikeIndexPattern.exec(url);
      if (matches) {
        const platformName = TheftPlatform.BIKEINDEX;
        const platformId = matches[1];
        setTheft({ ...theft, url, platformName, platformId });
        setModified(true);
      } else {
        setTheft({ ...theft, url, platformName, platformId });
        setModified(true);
      }
    }
  }
  function handleImageUrlChange(e) {
    const { value } = e.target;
    var newImages = images ? [...images, value] : [value];
    setTheft({ ...theft, images: JSON.stringify(newImages) });
    setModified(true);
  }
  function revert() {
    setTheft(props.item);
    setModified(false);
  }
  function handleSearch() {}

  function setStatus(status) {
    setTheft({ ...theft, status: status });
    setModified(true);
  }
  function handleColorChanged(selectedColor, e) {
    const color = selectedColor
      ? colors.find((c) => c.rgb.toLowerCase() === selectedColor.hex).name
      : null;
    setTheft({ ...theft, color: color });
    setModified(true);
  }

  /**
   * Save to the server
   */
  async function handleSubmit() {
    let item;
    if (id) {
      const { createdAt, updatedAt, _lastChangedAt, _deleted, ...rest } = {
        ...theft,
        postDate: new Date().toISOString(),
      };

      item = await TheftRepository.update(rest);
    } else {
      const { createdAt, updatedAt, _lastChangedAt, _deleted, ...rest } = {
        ...theft,
        postDate: new Date().toISOString(),
        id: id,
      };
      item = await TheftRepository.create(rest);
    }
    await API.get("matches", "/check/theft/" + item.id);
    setTheft(item);
    setModified(false);
  }

  return (
    <Card sx={cardClass} key={id}>
      {url ? (
        imageUrl && (
          <CardActionArea onClick={handleViewTheft}>
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
          padding: "6px",
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
            value={title ? title.substring(0, Math.min(title.length, 34)) : ""}
            variant="standard"
            onChange={handleChange}
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

        <Tooltip title="Recovered" sx={classes.button}>
          <Button
            sx={classes.button}
            size="small"
            onClick={() => setStatus(TheftStatus.RECOVERED)}
          >
            <Icon
              style={{
                color: status === TheftStatus.RECOVERED ? "gray" : "blue",
                borderStyle: "solid",
                borderWidth: status === TheftStatus.RECOVERED ? 1 : 0,
              }}
            >
              delete_icon
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
