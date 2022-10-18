import { Card, CardMedia, CardActionArea, CardContent } from "@mui/material";
import { Advertisement, Platform } from "../models";

const AdvertisementView = (props) => {
  const advertisement = props.item;
  const { id, title, description, price, imageUrl, platformName, platformId } =
    advertisement;
  function platformUrl() {
    switch (platformName) {
      case Platform.OFFERUP:
        return "https://offerup.com/item/detail/" + platformId;
      case Platform.MARKETPLACE:
        return "https://www.facebook.com/marketplace/item/" + platformId;
    }
    return null;
  }
  function handleViewAdvertisement() {
    const url = platformUrl();
    window.open(url, "_blank", "width=800,height=600");
  }
  return (
    <Card>
      {imageUrl && (
        <CardActionArea onClick={handleViewAdvertisement}>
          <CardMedia image={imageUrl || ""} />
        </CardActionArea>
      )}
      <CardContent>
        <div>
          {id} {title || ""} ${price || "UNK"}
        </div>
        <div>{description || ""}</div>
      </CardContent>
    </Card>
  );
};

export default AdvertisementView;
