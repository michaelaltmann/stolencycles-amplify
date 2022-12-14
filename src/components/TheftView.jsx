import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Icon,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";
import { MatchStatus, TheftPlatform, TheftStatus } from "../models";
import { colors } from "../Colors";
import TheftRepository from "../repositories/TheftRepository";
import { ColorSelector } from "./ColorSelector";
import API from "@aws-amplify/api";
import { brands, guessBrand } from "../Brands";
import { matchFilterAtom } from "../recoil/match";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { packId, unpackId } from "../repositories/utils";
import { Delete, DeleteOutline } from "@mui/icons-material";

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
  const original = props.item || {};
  const [theft, setTheft] = useState(original);
  const [modified, setModified] = useState(false);
  const [matchFilter, setMatchFilter] = useRecoilState(matchFilterAtom);
  const navigate = useNavigate();

  const {
    id,
    title,
    url,
    description,
    model,
    color,
    images,
    postDate,
    status,
  } = theft;
  const brand =
    theft.brand || guessBrand((title || "") + " " + (description || " "));
  const imageUrl = getImageUrl(images);
  const postDateText = postDate
    ? new Date(Date.parse(postDate)).toDateString()
    : "";
  const [platformName, platformId] = unpackId(id);

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
      setTheft({ ...theft, url, id: packId(platformName, platformId) });
      setModified(true);
    } else {
      matches = bikeIndexPattern.exec(url);
      if (matches) {
        const platformName = TheftPlatform.BIKEINDEX;
        const platformId = matches[1];
        setTheft({ ...theft, url, id: packId(platformName, platformId) });
        setModified(true);
      } else {
        setTheft({ ...theft, url, id: packId(platformName, platformId) });
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
    setTheft(original);
    setModified(false);
  }

  function setStatus(status) {
    if (status === theft.status) {
      setTheft({ ...theft, status: original.status || TheftStatus.UNREVIEWED });
    } else {
      setTheft({ ...theft, status: status });
    }
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
    if (original.id) {
      item = await TheftRepository.update({
        ...theft,
        postDate: new Date().toISOString(),
      });
    } else {
      item = await TheftRepository.create({
        ...theft,
        postDate: new Date().toISOString(),
      });
    }
    await API.get("matches", "/check/theft/" + item.id);
    setTheft(item);
    setModified(false);
  }

  function handleSearch() {
    setMatchFilter({
      status: MatchStatus.UNREVIEWED,
      advertisementId: null,
      theftId: theft.id,
      currentToken: null,
    });
    navigate("/matches");
  }

  return (
    <Card sx={cardClass} key={id}>
      <CardActionArea onClick={handleViewTheft}>
        <Box
          sx={{
            fontSize: "1rem",
            fontStyle: "italic",
            color: "gray",
          }}
        >
          {platformName} {postDateText}
        </Box>
        {url ? (
          <CardMedia
            sx={{
              height: 200,
            }}
            image={imageUrl || "/images/bicycle-placeholder.svg"}
          />
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
      </CardActionArea>

      <CardContent
        sx={{
          alignSelf: "end",
          padding: "6px",
        }}
      >
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
              width: "100%",
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
          maxRows={3}
          multiline={true}
          fullWidth
          value={description || ""}
          onChange={handleChange}
          variant="standard"
        ></TextField>
        <ColorSelector color={color} handleColorChanged={handleColorChanged} />
        <Autocomplete
          sx={{ marginTop: "8px", marginBottom: "8px" }}
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
          <span>
            <Button
              onClick={handleSubmit}
              sx={classes.button}
              disabled={!modified}
              size="small"
            >
              <Icon sx={{ color: modified ? "green" : "gray" }}>
                check_icon
              </Icon>
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="Matches" sx={classes.button}>
          <span>
            <Button
              size="small"
              sx={{ color: "black" }}
              disabled={!brand}
              onClick={handleSearch}
            >
              <Icon>search_icon</Icon>
            </Button>
          </span>
        </Tooltip>

        <Tooltip title="Recovered" sx={classes.button}>
          <IconButton
            sx={{ color: "blue" }}
            size="small"
            onClick={() => setStatus(TheftStatus.RECOVERED)}
          >
            {status === TheftStatus.RECOVERED ? <Delete /> : <DeleteOutline />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Undo" sx={classes.button}>
          <Button sx={classes.button} size="small" onClick={() => revert()}>
            <Icon
              sx={{
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
