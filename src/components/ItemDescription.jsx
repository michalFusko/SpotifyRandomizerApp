import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../styles/components/item-description.css";

export default function ItemDescription({
  preferenceType,
  response,
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
    if (response && preferenceType === "Albums") {
      return albumLength;
    } else if (
      response &&
      preferenceType === "Playlists" &&
      randomItem.tracks
    ) {
      return randomItem.tracks.total;
    } else if (response && preferenceType === "Podcasts") {
      return;
    }
  };

  const itemContent = () => {
    if (response && preferenceType === "Albums") {
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
    } else if (response && preferenceType === "Playlists") {
      return (
        <p>
          <strong>Number of tracks:</strong> {itemsArrayLength()} <br></br>
        </p>
      );
    } else if (response && preferenceType === "Podcasts") {
      return (
        <p className="desription-content-podcasts">
          {randomItem?.show?.description}
        </p>
      );
    } else if (response && preferenceType === "Artists") {
      return (
        <div>
          <p>
            <strong>Popularity:</strong> {randomItem.popularity}/100
          </p>
          <p>
            <strong>Followers:</strong> {randomItem.followers?.total}
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {randomItem.genres?.length > 0 ? (
              randomItem.genres.map((genre, index) => {
                return (
                  <span key={index}>
                    {genre}
                    {index < randomItem.genres?.length - 1 && (
                      <strong>, </strong>
                    )}
                  </span>
                );
              })
            ) : (
              <span>undefined</span>
            )}
          </p>
        </div>
      );
    }
  };

  return (
    <Card className="description-container">
      <CardContent>
        <Typography className="description-heading">
          {preferenceType === "Albums" ||
          preferenceType === "Playlists" ||
          preferenceType === "Artists"
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
