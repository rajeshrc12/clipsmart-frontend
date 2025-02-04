import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prompt: "",
  transcription: [
    {
      title: "React in 100 seconds",
      video_url: "",
      transcription: [
        { start_time: "00:00:00", end_time: "00:00:10", text: "this is react" },
        { start_time: "00:00:00", end_time: "00:00:10", text: "this is react" },
      ],
    },
    {
      title: "React in 200 seconds",
      video_url: "",
      transcription: [
        { start_time: "00:00:00", end_time: "00:00:10", text: "this is react" },
        { start_time: "00:00:00", end_time: "00:00:10", text: "this is react" },
      ],
    },
  ],
  prompt_link: "", // Keep prompt_link
  edited_link: "", // Keep edited_link
  isLoading: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setPrompt(state, action) {
      state.prompt = action.payload;
    },
    addTranscription(state, action) {
      state.transcription.push(action.payload);
    },
    setTranscription(state, action) {
      state.transcription = action.payload;
    },
    setPromptLink(state, action) {
      state.prompt_link = action.payload;
    },
    setEditedLink(state, action) {
      state.edited_link = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    resetVideo(state) {
      state.prompt = "";
      state.transcription = [];
      state.prompt_link = ""; // Reset prompt_link
      state.edited_link = ""; // Reset edited_link
      state.isLoading = false;
    },
  },
});

export const { setPrompt, addTranscription, setPromptLink, setEditedLink, setLoading, resetVideo, setTranscription } = videoSlice.actions;

export default videoSlice.reducer;
