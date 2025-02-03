import { useEffect } from "react";
import Navbar from "./components/navbar";
import Transcript from "./components/transcript";
import UserInput from "./components/user-input";
import VideoPlayer from "./components/video-player";
import { useNavigate } from "react-router";
import { setAlert, setUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "./components/ui/button";
import { AlertCircle } from "lucide-react";

//App
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useSelector((state) => state.user.alert);
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
      <div className="flex-1 h-full">
        <div className="p-3 h-[45%]">
          <UserInput />
        </div>
        <div className="flex h-[50%] mt-8 justify-center items-center">
          <VideoPlayer />
        </div>
      </div>
      <div className="flex-1">
        <Transcript />
      </div>
      {!!alert && (
        <AlertDialog open={!!alert}>
          <AlertDialogContent className="w-96 h-72">
            <AlertDialogHeader className={"!text-center"}>
              <AlertDialogTitle className="!text-4xl !flex flex-col items-center gap-3">
                <div>
                  <AlertCircle size={50} />
                </div>
                <div>{alert.title.toUpperCase()}!</div>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xl text-black font-semibold">{alert.message}</AlertDialogDescription>
              <div className="text-black font-thin">Please try again with different url or prompt</div>
            </AlertDialogHeader>
            <AlertDialogFooter className={"!flex !justify-center"}>
              <Button className=" text-white" onClick={() => dispatch(setAlert(false))}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default App;
