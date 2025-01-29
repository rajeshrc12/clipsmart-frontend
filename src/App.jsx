import Navbar from "./components/navbar";
import Transcript from "./components/transcript";
import UserInput from "./components/user-input";
import VideoPlayer from "./components/video-player";
//App
function App() {
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
    </div>
  );
}

export default App;
