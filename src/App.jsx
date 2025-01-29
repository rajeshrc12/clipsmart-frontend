import { useEffect } from "react";
import Navbar from "./components/navbar";
import Transcript from "./components/transcript";
import UserInput from "./components/user-input";
import VideoPlayer from "./components/video-player";
import { useNavigate } from "react-router";
import { setUser } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
//App
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    } else navigate("/login");
  }, []);
  return (
    <div className="h-screen w-full flex">
      <div className="flex-0 h-full">
        <Navbar />
      </div>
      <div className="flex-1">
        <div className="p-3">
          <UserInput />
        </div>
        <div className="flex justify-center items-center">
          <VideoPlayer />
        </div>
      </div>
      <div className="flex-1">
        <Transcript />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
