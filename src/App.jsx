import Navbar from "./components/navbar";
import Transcript from "./components/transcript";
import UserInput from "./components/user-input";

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
        <div className="flex justify-center">
          <video className="w-[35vw]" controls>
            <source src="https://media.geeksforgeeks.org/wp-content/uploads/20231020155223/Full-Stack-Development-_-LIVE-Classes-_-GeeksforGeeks.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="flex-1">
        <Transcript />
      </div>
    </div>
  );
}

export default App;
