import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store"; // Import the Redux store
import "./index.css";
import App from "./App.jsx";
// import Login from "./pages/login";

// Initialize the app with Redux store and Google OAuth provider
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  </Provider>
);
