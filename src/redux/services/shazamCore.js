import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY
      );
      headers.set("X-RapidAPI-Host", "shazam-core.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "v1/charts/world?country_code=DZ",
    }),
    getSongsByGenre: builder.query({
      query: (genre) =>
        `v1/charts/genre-world?genre_code=${genre}&country_code=DZ`,
    }),
    getSongDetails: builder.query({
      query: (songid) => `v2/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: (songid) => `v1/tracks/related?track_id=554591360&offset=0`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
} = shazamCoreApi;
