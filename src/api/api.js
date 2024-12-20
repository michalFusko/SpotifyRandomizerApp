import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const getToken = () => {
//   if (window?.location?.hash) {
//     const stringSplit = window.location.hash.split("=");
//     const accessToken = stringSplit[1].split("&");
//     return accessToken;
//   } else {
//     return undefined;
//   }
// };
const getToken = () => {
  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  return urlParams.get("access_token");
};

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1/me",
    headers: { Authorization: `Bearer ${getToken()}` },
  }),
  endpoints: (builder) => ({
    getUserAlbums: builder.query({
      query: ({ limit = 50, offset = 0 }) =>
        `albums?limit=${limit}&offset=${offset}`,
    }),
    getUserPlaylists: builder.query({
      query: ({ limit = 50, offset = 0 }) =>
        `playlists?limit=${limit}&offset=${offset}`,
    }),
    getUserPodcasts: builder.query({
      query: ({ limit = 50, offset = 0 }) =>
        `shows?limit=${limit}&offset=${offset}`,
    }),
    getUserArtists: builder.query({
      query: ({ limit = 50, id = "" }) =>
        `following?type=artist&limit=${limit}&after=${id}`,
    }),
  }),
});

export const {
  useGetUserAlbumsQuery,
  useGetUserPlaylistsQuery,
  useGetUserPodcastsQuery,
  useLazyGetUserArtistsQuery,
} = Api;
