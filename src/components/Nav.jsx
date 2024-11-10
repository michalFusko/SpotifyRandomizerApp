import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import "../styles/components/nav.css";

export default function Nav({
  setPreferenceType,
  Albums,
  Playlists,
  Podcasts,
  Artists,
}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      className="drawer-container"
      sx={{}}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <h1 className="drawer-heading">My library</h1>
      <List>
        {[
          { name: "Albums", icon: faCompactDisc, type: Albums },
          { name: "Playlists", icon: faHeadphones, type: Playlists },
          { name: "Podcasts", icon: faMicrophone, type: Podcasts },
          { name: "Artists", icon: faPerson, type: Artists },
        ].map((preference, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                setPreferenceType(preference.type);
              }}
            >
              <ListItemIcon>
                <FontAwesomeIcon
                  icon={preference.icon}
                  size="lg"
                  className="drawer-icon"
                ></FontAwesomeIcon>
              </ListItemIcon>
              <ListItemText
                primary={preference.name}
                className="drawer-li-text"
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider className="drawer-divider" />
      <h1 className="drawer-heading">I am feeling lucky</h1>
      <List>
        {[
          { name: "Albums", icon: faCompactDisc, secondaryIcon: faDice },
          { name: "Playlists", icon: faHeadphones, secondaryIcon: faDice },
          { name: "Artists", icon: faPerson, secondaryIcon: faDice },
          { name: "Podcasts", icon: faMicrophone, secondaryIcon: faDice },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FontAwesomeIcon
                  icon={item.secondaryIcon}
                  size="lg"
                  className="drawer-icon-secondary"
                ></FontAwesomeIcon>
              </ListItemIcon>

              <ListItemText primary={item.name} className="drawer-li-text" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div className="drawer-disclaimer">
        <h1 className="drawer-disclaimer-h1">Remember!</h1>
        <p>
          For the APP to work properly, you need to have saved
          ALBUMS/PLAYLISTS/PODCASTS/
          <br />
          ARTIST.
          <br />
          Otherwise you just might have to feel lucky?
        </p>
      </div>
    </Box>
  );

  return (
    <div className="nav-container">
      <Button className="nav-btn" onClick={toggleDrawer(true)}>
        <FontAwesomeIcon
          icon={faAngleDown}
          className="nav-btn-icon"
          size="lg"
        />
        I want to choose from...
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <img src="/spotify.png" className="nav-img" />
    </div>
  );
}
