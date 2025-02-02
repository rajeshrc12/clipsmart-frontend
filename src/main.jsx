import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store"; // Import the Redux store
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AdjustTime } from "./components/adjust-time";
import UserInput from "./components/user-input";

// Initialize the app with Redux store and Google OAuth provider
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<UserInput />} />
            <Route path="/adjust-time" element={<AdjustTime />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
