import Navbar from "./components/navbar";
import Transcript from "./components/transcript";
import UserInput from "./components/user-input";
import { setAlert } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "./components/ui/button";
import { AlertCircle } from "lucide-react";
import YouTubePlaylistPlayer from "./components/YouTubePlaylistPlayer";
import YoutubeEditPlaylistPlayer from "./components/YoutubeEditPlaylistPlayer";

//App
function App() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.user.alert);
  const edit = useSelector((state) => state.video.edit);
  return (
    <div className="h-screen w-full flex">
      <div className="flex-0 h-full">
        <Navbar />
      </div>
      <div className="flex-1 h-full">
        <div className="p-3 h-[45%]">
          <UserInput />
        </div>
        <div className="flex h-[40%] mt-8 justify-center items-center px-6">
          <YouTubePlaylistPlayer />
        </div>
      </div>
      <div className="flex-1">
        <Transcript />
      </div>
      {!!alert && (
        <AlertDialog open={!!alert}>
          <AlertDialogContent className="w-96 h-72 bg-inherit border-none">
            <AlertDialogHeader className={"!text-center"}>
              <AlertDialogTitle className="!text-4xl !flex flex-col items-center gap-3">
                <div>
                  <AlertCircle size={50} />
                </div>
                <div>{alert.title.toUpperCase()}!</div>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-lg  font-semibold">{alert.message}</AlertDialogDescription>
              <div className="font-thin">Please try again with different url or prompt</div>
            </AlertDialogHeader>
            <AlertDialogFooter className={"!flex !justify-center"}>
              <Button className=" " onClick={() => dispatch(setAlert(false))}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {!!edit && (
        <AlertDialog open={!!edit}>
          <AlertDialogContent className="bg-inherit border-none !max-w-[50vw]">
            <AlertDialogHeader className={"!text-center"}>
              <AlertDialogTitle className="!text-4xl !flex flex-col gap-3"></AlertDialogTitle>
              <AlertDialogDescription className="">
                <div className="w-full h-full">
                  <YoutubeEditPlaylistPlayer />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default App;
