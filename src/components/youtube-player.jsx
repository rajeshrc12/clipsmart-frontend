import { useState } from "react";
import YoutubePlayerTimer from "./youtube-player-timer";

const YoutubePlayer = () => {
  const [time, setTime] = useState({
    start_time: 0,
    end_time: 0,
  });
  console.log(time);
  return (
    <div className="col-span-6 flex flex-col text-sm">
      <iframe className="w-full rounded-lg flex-1" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
      <div className="flex justify-evenly py-5">
        <div className="flex gap-3">
          <YoutubePlayerTimer time={time} setTime={setTime} timeKey={"start_time"} />-
          <YoutubePlayerTimer time={time} setTime={setTime} timeKey={"end_time"} />
        </div>
      </div>
    </div>
  );
};

export default YoutubePlayer;
