// src/services/videoApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/" }),
  endpoints: (builder) => ({
    sendVideoData: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useSendVideoDataMutation } = videoApi;
