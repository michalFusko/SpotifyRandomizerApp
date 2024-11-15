import Login from "./components/Login";
import Nav from "./components/Nav";
import {
  useGetUserAlbumsQuery,
  useLazyGetUserArtistsQuery,
  useGetUserPlaylistsQuery,
  useGetUserPodcastsQuery,
} from "./api/api";
import { useState, useEffect } from "react";
import ItemsDisplay from "./components/ItemsDisplay";

const App = () => {
  const [offset, setOffset] = useState(0);
  const [randomItem, setRandomItem] = useState(null);
  const [preferenceType, setPreferenceType] = useState("Albums");
  const [response, setResponse] = useState();
  const [artistsResponse, setArtistsResponse] = useState([]);
  const limit = 50;
  const {
    data: Albums,
    error: errorAlbums,
    isLoading: isLoadingAlbums,
  } = useGetUserAlbumsQuery({ limit, offset });
  const {
    data: Playlists,
    error: errorPlaylists,
    isLoading: isLoadingPlaylists,
  } = useGetUserPlaylistsQuery({ limit, offset });
  const {
    data: Podcasts,
    error: errorPodcasts,
    isLoading: isLoadingPodcasts,
  } = useGetUserPodcastsQuery({ limit, offset });
  const [
    fetchArtists,
    { data: Artists, error: errorArtists, isLoading: isLoadingArtists },
  ] = useLazyGetUserArtistsQuery();

  //function to make an array of all artists to randomize from because endpoint is designed to paginate
  const fetchAllArtists = async () => {
    let allArtists = [];
    let lastArtistId = "";
    let moreArtists = true;

    while (moreArtists) {
      const artistsData = await fetchArtists({
        limit,
        id: lastArtistId,
      }).unwrap();

      if (moreArtists) {
        allArtists = [...allArtists, ...artistsData.artists.items];
        lastArtistId =
          artistsData.artists.items[artistsData.artists.items.length - 1].id;
        moreArtists = artistsData.artists.items.length === limit;
      } else {
        moreArtists = false;
      }
    }
    setArtistsResponse(allArtists);
  };
  //calling function to create array of artists
  useEffect(() => {
    fetchAllArtists();
  }, []);

  useEffect(() => {
    switch (preferenceType) {
      case "Albums":
        setResponse(Albums);
        break;
      case "Playlists":
        setResponse(Playlists);
        break;
      case "Podcasts":
        setResponse(Podcasts);
        break;
      case "Artists":
        setResponse(artistsResponse);
        break;
      default:
        setResponse(null);
    }
  }, [preferenceType, Albums, Playlists, Podcasts, Artists]);

  //initial random item on swtich or load
  useEffect(() => {
    if (
      response &&
      preferenceType !== "Artists" &&
      response?.items.length > 0
    ) {
      const randomItem =
        response.items[Math.floor(Math.random() * response.items.length)];

      if (preferenceType === "Albums") {
        setRandomItem(randomItem.album);
      } else if (preferenceType === "Playlists") {
        setRandomItem(randomItem);
      } else if (preferenceType === "Podcasts") {
        setRandomItem(randomItem);
      } //bro i swear i updated the artists case condition 3 times today if this comment is not here next time im being robbed
    } else if (
      response &&
      preferenceType === "Artists" &&
      response.length > 0
    ) {
      const randomItem =
        response[Math.floor(Math.random() * artistsResponse.length)];
      setRandomItem(randomItem);
    } else {
      setRandomItem(null);
    }
  }, [response]);
  console.log(Podcasts);

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
      <Nav setOffset={setOffset} setPreferenceType={setPreferenceType}></Nav>
      <ItemsDisplay
        setOffset={setOffset}
        preferenceType={preferenceType}
        setPreferenceType={setPreferenceType}
        response={response}
        randomItem={randomItem}
        setRandomItem={setRandomItem}
        artistsResponse={artistsResponse}
      ></ItemsDisplay>
    </>
  );
};

export default App;
