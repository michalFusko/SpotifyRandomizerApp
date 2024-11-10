import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../styles/components/item-description.css";

export default function ItemDescription({
  Albums,
  Playlists,
  Podcasts,
  Artists,
  preferenceTypeRes,
  randomItem,
}) {
  const albumLength = randomItem?.tracks?.items?.length || 0;
  let albumDuriationMs = 0;
  if (randomItem?.tracks?.items) {
    for (let i = 0; i < albumLength; i++) {
      albumDuriationMs += randomItem.tracks.items[i].duration_ms;
    }
  }

  const albumDuration = () => {
    const albumTime = new Date(albumDuriationMs - 3600000);
    return albumTime.toTimeString().split(" ")[0];
  };

  const itemsArrayLength = () => {
    if (preferenceTypeRes && preferenceTypeRes === Albums) {
      return albumLength;
    } else if (
      preferenceTypeRes &&
      preferenceTypeRes == Playlists &&
      randomItem.tracks
    ) {
      return randomItem.tracks.total;
    } else if (preferenceTypeRes && preferenceTypeRes === Podcasts) {
      return;
    }
  };

  const itemContent = () => {
    if (preferenceTypeRes && preferenceTypeRes === Albums) {
      return (
        <div>
          <p>
            <strong>Duration:</strong> {albumDuration()} <br></br>
          </p>
          <p>
            <strong>Release date:</strong> {randomItem.release_date} <br></br>
          </p>
          <p>
            <strong>Label:</strong> {randomItem.label} <br></br>
          </p>
          <p>
            <strong>Number of tracks:</strong> {itemsArrayLength()} <br></br>
          </p>
        </div>
      );
    } else if (preferenceTypeRes && preferenceTypeRes === Playlists) {
      return (
        <p>
          <strong>Number of tracks:</strong> {itemsArrayLength()} <br></br>
        </p>
      );
    } else if (preferenceTypeRes && preferenceTypeRes === Podcasts) {
      return (
        <p className="desription-content-podcasts">
          {randomItem?.show?.description}
        </p>
      );
    }
  };

  return (
    <Card className="description-container">
      <CardContent>
        <Typography className="description-heading">
          {preferenceTypeRes === Albums || preferenceTypeRes === Playlists
            ? "Details"
            : "Description"}
        </Typography>
        <Typography className="description-content" component="div">
          {itemContent()}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
