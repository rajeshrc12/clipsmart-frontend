import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import videoReducer from "../features/videoSlice";
import { videoApi } from "../services/videoApi"; // Import the RTK Query API slice

const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
    [videoApi.reducerPath]: videoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(videoApi.middleware), // Adding RTK Query middleware
});

export default store;
