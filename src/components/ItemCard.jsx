import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/components/item-card.css";

export default function ItemCard({
  preferenceType,
  response,
  randomItem,
  reloadItems,
}) {
  const nameOfCreator = () => {
    if (response && preferenceType === "Albums" && randomItem?.artists?.[0]) {
      return randomItem.artists[0].name;
    } else if (response && preferenceType === "Playlists") {
      return `Created by: ${randomItem.owner?.display_name}`;
    } else if (response && preferenceType == "Podcasts" && randomItem.show) {
      return randomItem.show.publisher;
    } else if (response && preferenceType === "Artists") {
      return; // due to styles name is displayed in item name in artists case
    }
  };

  const itemImage = () => {
    if (randomItem?.images?.[0]) {
      return randomItem.images[0].url;
    } else if (randomItem?.show?.images?.[0]) {
      return randomItem.show.images[2].url;
    }
  };
  const itemName = () => {
    if (randomItem?.name) {
      return randomItem.name;
    } else if (randomItem?.show?.name) {
      return randomItem.show.name;
    }
  };

  return (
    <Card className="card-container">
      <CardMedia
        className="card-image"
        component="img"
        image={itemImage()}
        alt="Cover"
      />
      <Box className="card-content-container">
        <CardContent className="card-content">
          <Typography className="card-typography" component="div">
            {itemName()}
          </Typography>
          <Typography
            className="card-typography"
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {nameOfCreator()}
          </Typography>
        </CardContent>
        <Box className="card-icon-container">
          <IconButton onClick={reloadItems} aria-label="reload">
            <FontAwesomeIcon className="card-icon" icon={faRotateRight} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
