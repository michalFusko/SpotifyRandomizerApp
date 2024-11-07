import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/components/play-button.css";

const PlayButton = ({ randomItem }) => {
  const albumLink = `https://open.spotify.com/album/${randomItem.id}`;
  return (
    <a href={albumLink} target="_blank">
      <div className="play-btn-container">
        <FontAwesomeIcon className="play-btn-icon" icon={faCirclePlay} />
        <div
          className="play-btn-backround"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            width: "80%",
            height: "80%",
            backgroundColor: "#191414",
            borderRadius: "50%",
            zIndex: 1,
          }}
        ></div>
      </div>
    </a>
  );
};

export default PlayButton;
