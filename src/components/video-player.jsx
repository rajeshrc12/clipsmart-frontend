import { useSelector } from "react-redux";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import { Button } from "./ui/button";

const VideoPlayer = () => {
  const { edited_link, isLoading } = useSelector((state) => state.video);
  const [error, setError] = useState(false);

  const handleDownload = () => {
    if (edited_link) {
      const a = document.createElement("a");
      a.href = edited_link;
      a.download = "edited_video.mp4";
      a.click();
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-3">
      {isLoading ? (
        <div className="flex flex-col space-y-3 w-full">
          <Skeleton className="h-[40vh] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : edited_link && !error ? (
        <div className="w-full">
          <video controls className="w-full h-[45vh] rounded-xl mb-3" onError={() => setError(true)}>
            <source src={edited_link} type="video/mp4" />
          </video>
          <div className="flex justify-between mt-3">
            <Button variant="outline" className="px-4 py-2 rounded-md w-full " onClick={handleDownload}>
              Download
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">{error ? <p>Error loading video. Please try again.</p> : <p>Your generated video will appear here.</p>}</div>
      )}
    </div>
  );
};

export default VideoPlayer;
