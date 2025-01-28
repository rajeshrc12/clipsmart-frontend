import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/");
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello from React!</h1>
      <p>Backend Message: {message}</p>
    </div>
  );
}

export default App;
