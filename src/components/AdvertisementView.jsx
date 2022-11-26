import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Icon,
  IconButton,
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
import {
  Check,
  Delete,
  DeleteOutline,
  Flag,
  FlagOutlined,
  Search,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Carousel from "./Carousel";

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

export function AdvertisementView(props) {
  const original = props.item || {};
  const [advertisement, setAdvertisement] = useState(original);
  const [modified, setModified] = useState(false);
  const [matchFilter, setMatchFilter] = useRecoilState(matchFilterAtom);
  const [editSeller, setEditSeller] = useState(false);
  const navigate = useNavigate();

  const {
    id,
    title,
    url,
    description,
    price,
    model,
    color,
    images: imagesString,
    flagged,
    postDate,
    sellerId,
    sellerName,
    sellerImage,
    status,
  } = advertisement;
  const [platformName, platformId] = unpackId(id);
  const brand =
    advertisement.brand ||
    guessBrand((title || "") + " " + (description || " "));

  const images = getImages(imagesString);
  const postDateText = postDate
    ? new Date(Date.parse(postDate)).toDateString()
    : "";

  const cardClass =
    status === AdvertisementStatus.UNREVIEWED || modified
      ? classes.card
      : classes.reviewed;

  const listingUrl = url ? url : platformUrl();
  const notificationRef = React.createRef();

  function getImages(imagesString) {
    if (imagesString) {
      const images = JSON.parse(imagesString);
      return images && images.length > 0 ? images : [];
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

  function guessBrand() {
    const brand = advertisement.brand;
    if (brand) {
      return brand;
    } else {
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
    if (listingUrl) {
      window.open(listingUrl, "_blank", "width=800,height=600");
    }
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
  function toggleFlagged() {
    const draft = { ...advertisement, flagged: !advertisement.flagged };
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
      setAdvertisement({
        ...advertisement,
        url,
        id: packId(platformName, platformId),
      });
      setModified(true);
    } else {
      matches = offerupPattern.exec(url);
      if (matches) {
        const platformName = AdvertisementPlatform.OFFERUP;
        const platformId = matches[1];
        setAdvertisement({
          ...advertisement,
          url,
          id: packId(platformName, platformId),
        });
        setModified(true);
      } else {
        setAdvertisement({
          ...advertisement,
          url,
        });
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
    if (status === advertisement.status) {
      setAdvertisement({
        ...advertisement,
        status: original.status || AdvertisementStatus.UNREVIEWED,
      });
    } else {
      setAdvertisement({ ...advertisement, status: status });
    }
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
    setAdvertisement(original);
    setModified(false);
  }
  function handleSearch() {
    setMatchFilter({
      status: MatchStatus.UNREVIEWED,
      advertisementId: advertisement.id,
      theftId: null,
      currentToken: null,
    });
    navigate("/matches");
  }
  function handleSeller() {
    navigate("/seller/" + sellerId);
  }

  /**
   * Save to the server
   */
  async function handleSubmit() {
    let item;
    if (original.id) {
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
  function buildImageDisplay() {
    if (images?.length > 1) {
      const imageList = images.map((s) => {
        return { imgPath: s };
      });
      return <Carousel images={imageList} />;
    } else if (images?.length == 1 && images[0]) {
      return (
        <CardMedia
          sx={{
            height: 200,
          }}
          image={images[0]}
        />
      );
    } else {
      return (
        <TextField
          name="imageUrl"
          variant="standard"
          helperText="Image URL"
          onBlur={handleImageUrlChange}
          fullWidth
        />
      );
    }
  }
  return (
    <Card sx={cardClass} key={id}>
      <Dialog open={editSeller} onClose={() => setEditSeller(false)}>
        <TextField
          name="sellerId"
          variant="standard"
          value={sellerId || ""}
          helperText="Seller ID"
          sx={{
            width: "300px",
          }}
          onChange={handleChange}
        />
        <TextField
          name="sellerName"
          variant="standard"
          value={sellerName || ""}
          helperText="Seller Name"
          sx={{
            width: "300px",
          }}
          onChange={handleChange}
        />
      </Dialog>
      <CardActionArea>
        <Box
          onClick={listingUrl && handleViewAdvertisement}
          sx={{
            fontSize: "1rem",
            fontStyle: "italic",
            color: "gray",
          }}
        >
          {platformName} {postDateText}
        </Box>{" "}
        {url ? (
          buildImageDisplay()
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
            textAlign: "left",
            alignContent: "space-between",
          }}
        >
          <TextField
            name="title"
            sx={{
              fontSize: "1.2rem",
              textAlign: "left",
              width: "10em",
            }}
            value={title ? title.substring(0, Math.min(title.length, 25)) : ""}
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
          margin: "2px",
        }}
      >
        <Tooltip title="Save" sx={classes.button}>
          <span>
            <IconButton
              onClick={handleSubmit}
              sx={classes.button}
              size="small"
              disabled={!modified}
            >
              <Check
                style={modified ? { color: "green" } : { color: "lightGray" }}
              />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Search" sx={classes.button}>
          <span>
            <IconButton
              sx={classes.button}
              size="small"
              color="primary"
              disabled={!brand}
              onClick={handleSearch}
            >
              <Search />
            </IconButton>
          </span>
        </Tooltip>

        {sellerId ? (
          <Tooltip
            title={sellerId ? sellerName || "" : "Seller"}
            sx={classes.button}
          >
            <Button onClick={handleSeller} sx={classes.button} size="small">
              {" "}
              {sellerImage ? (
                <img
                  alt={sellerName || ""}
                  src={sellerImage}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Icon style={{ color: "black" }}>person_icon</Icon>
              )}
            </Button>
          </Tooltip>
        ) : (
          <Button
            onClick={() => setEditSeller(true)}
            sx={classes.button}
            size="small"
          >
            <Icon style={{ color: "lightgray" }}>person_icon</Icon>
          </Button>
        )}
        <Tooltip title="Flagged" sx={classes.button}>
          <IconButton
            sx={{ color: "red" }}
            size="small"
            onClick={toggleFlagged}
          >
            {flagged ? <Flag /> : <FlagOutlined />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Not of Interest" sx={classes.button}>
          <IconButton
            sx={{ color: "blue" }}
            size="small"
            onClick={() => setStatus(AdvertisementStatus.JUNK)}
          >
            {status === AdvertisementStatus.JUNK ? (
              <Delete />
            ) : (
              <DeleteOutline />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Sold" sx={classes.button}>
          <IconButton
            sx={{ color: "blue" }}
            size="small"
            onClick={() => setStatus(AdvertisementStatus.SOLD)}
          >
            {status === AdvertisementStatus.SOLD ? (
              <ShoppingCart />
            ) : (
              <ShoppingCartOutlined />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Undo" sx={classes.button}>
          <span>
            <Button
              sx={classes.button}
              size="small"
              disabled={!modified}
              onClick={() => revert()}
            >
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
          </span>
        </Tooltip>
        <Snackbar message="" ref={notificationRef} />
      </CardActions>
    </Card>
  );
}
