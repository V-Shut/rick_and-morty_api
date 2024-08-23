import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const charactersAPI = createApi({
  reducerPath: "api.characters",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api/",
  }),
  endpoints: (build) => ({
    getChars: build.query<CharactersResponse, number>({
      query: (page) => `character?page=${page}`,
    }),
  }),
});

export const { useGetCharsQuery } = charactersAPI;
