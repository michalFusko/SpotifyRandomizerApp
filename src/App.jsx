import Login from "./components/Login";
import Nav from "./components/Nav";
import {
  useGetUserAlbumsQuery,
  useGetUserPlaylistsQuery,
  useGetUserPodcastsQuery,
  useLazyGetUserArtistsQuery,
} from "./api/api";
import { useState, useEffect } from "react";
import ItemsDisplay from "./components/ItemsDisplay";

const App = () => {
  const [offset, setOffset] = useState(0);
  const [randomItem, setRandomItem] = useState(null);
  const {
    data: Albums,
    error: errorAlbums,
    isLoading: isLoadingAlbums,
  } = useGetUserAlbumsQuery({ limit: 50, offset });
  const [preferenceType, setPreferenceType] = useState("");
  const [preferenceTypeRes, setPreferenceTypeRes] = useState(); // might need to use useRef for reloadItems() in ItemsDisplay to not trigger to rerender the component, the components rerender on randomItem change so its safe
  //second option is to find out solution to remove useffect with albums dependency to setpreference to albums
  //third option is to create a new state where i store the response from api instead of prefence type, then i could only pass strings to preference type and work with the response alone until i pass the random item
  //also when i change the prefence type in nav dropdown i dont get the console log of prefference type (in this case api response) might look deeper into that
  //when i console log preference type onclin in nav dropdown i can see the preference type changes on next click
  const {
    data: Playlists,
    error: errorPlaylists,
    isLoading: isLoadingPlaylists,
  } = useGetUserPlaylistsQuery({ limit: 50, offset });
  const {
    data: Podcasts,
    error: errorPodcasts,
    isLoading: isLoadingPodcasts,
  } = useGetUserPodcastsQuery({ limit: 50, offset });
  const {
    data: Artists,
    error: errorArtists,
    isLoading: isLoadingArtists,
  } = useLazyGetUserArtistsQuery({ limit: 50, offset }); // XXX endpoint doesnt support offset, but with "after" i can paginate XXX

  useEffect(() => {
    setPreferenceTypeRes(Albums);
  }, [Albums]);

  useEffect(() => {
    if (preferenceTypeRes?.items && preferenceTypeRes.items.length > 0) {
      const randomItem =
        preferenceTypeRes.items[
          Math.floor(Math.random() * preferenceTypeRes.items.length)
        ];

      if (preferenceTypeRes === Albums) {
        setRandomItem(randomItem.album);
      } else if (preferenceTypeRes === Playlists) {
        setRandomItem(randomItem);
      } else if (preferenceTypeRes === Podcasts) {
        setRandomItem(randomItem);
      }
    } else {
      setRandomItem(null);
    }
    //setOffset(0) causes bug where offset is always 0, might
    console.log(offset);
  }, [preferenceTypeRes]);

  if (errorAlbums || errorPlaylists || errorPodcasts || errorArtists)
    return <Login className="login"></Login>;
  if (
    isLoadingAlbums ||
    isLoadingPlaylists ||
    isLoadingPodcasts ||
    isLoadingArtists
  )
    return <p className="loading">loading...</p>;

  return (
    <>
      <Nav
        Albums={Albums}
        Playlists={Playlists}
        Podcasts={Podcasts}
        Artists={Artists}
        preferenceTypeRes={preferenceTypeRes}
        setPreferenceTypeRes={setPreferenceTypeRes}
        setOffset={setOffset}
      ></Nav>
      <ItemsDisplay
        isLoadingAlbums={isLoadingAlbums}
        Albums={Albums}
        Playlists={Playlists}
        Podcasts={Podcasts}
        Artists={Artists}
        setOffset={setOffset}
        preferenceTypeRes={preferenceTypeRes}
        randomItem={randomItem}
        setRandomItem={setRandomItem}
      ></ItemsDisplay>
    </>
  );
};

export default App;
