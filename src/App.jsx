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
  const [preferenceType, setPreferenceType] = useState(Albums);
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
    setPreferenceType(Albums);
  }, [Albums]);

  useEffect(() => {
    if (preferenceType?.items && preferenceType.items.length > 0) {
      const randomItem =
        preferenceType.items[
          Math.floor(Math.random() * preferenceType.items.length)
        ];

      if (preferenceType === Albums) {
        setRandomItem(randomItem.album);
      } else if (preferenceType === Playlists) {
        setRandomItem(randomItem);
      } else if (preferenceType === Podcasts) {
        setRandomItem(randomItem);
      }
    } else {
      setRandomItem(null);
    }
    setOffset(0);
  }, [preferenceType]);

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
        setPreferenceType={setPreferenceType}
      ></Nav>
      <ItemsDisplay
        Albums={Albums}
        Playlists={Playlists}
        Podcasts={Podcasts}
        Artists={Artists}
        setOffset={setOffset}
        preferenceType={preferenceType}
        randomItem={randomItem}
        setRandomItem={setRandomItem}
      ></ItemsDisplay>
    </>
  );
};

export default App;
