import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/components/play-button.css";

const PlayButton = ({ randomItem, preferenceType }) => {
  const routeOptions = () => {
    const baseUrl = "https://open.spotify.com/";
    if (preferenceType === "Albums") {
      return `${baseUrl}album/${randomItem.id}`;
    } else if (preferenceType === "Playlists") {
      return `${baseUrl}playlist/${randomItem.id}`;
    } else if (preferenceType === "Podcasts") {
      return `${baseUrl}show/${randomItem.id}`;
    } else if (preferenceType === "Artists") {
      return `${baseUrl}artist/${randomItem.id}`;
    }
  };

  return (
    <a href={routeOptions()} target="_blank">
      <div className="play-btn-container">
        <FontAwesomeIcon className="play-btn-icon" icon={faCirclePlay} />
        <div className="play-btn-backround"></div>
      </div>
    </a>
  );
};

export default PlayButton;
