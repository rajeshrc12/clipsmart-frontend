import { useSelector } from "react-redux";
import { Skeleton } from "./ui/skeleton";

const VideoPlayer = () => {
  const { edited_link, isLoading } = useSelector((state) => state.video);
  console.log({ edited_link, isLoading });
  if (isLoading)
    return (
      <div className="flex flex-col space-y-3 w-full px-5">
        <Skeleton className="h-[40vh] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  return (
    <div>
      {edited_link ? (
        <video className="w-[35vw]" controls>
          <source src={edited_link} type="video/mp4" />
        </video>
      ) : (
        <div>Video link not available</div>
      )}
    </div>
  );
};

export default VideoPlayer;
