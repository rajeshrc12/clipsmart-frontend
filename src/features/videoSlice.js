import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prompt: "",
  transcription: [],
  prompt_link: "", // Keep prompt_link
  edited_link: "", // Keep edited_link
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
    setPromptLink(state, action) {
      state.prompt_link = action.payload;
    },
    setEditedLink(state, action) {
      state.edited_link = action.payload;
    },
    resetVideo(state) {
      state.prompt = "";
      state.transcription = [];
      state.prompt_link = ""; // Reset prompt_link
      state.edited_link = ""; // Reset edited_link
    },
  },
});

export const { setPrompt, addTranscription, setPromptLink, setEditedLink, resetVideo } = videoSlice.actions;

export default videoSlice.reducer;
