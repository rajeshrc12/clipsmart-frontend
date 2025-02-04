/* eslint-disable react/prop-types */
import { useRef } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const YoutubePlayer = ({ startTime = 10 }) => {
  const playerRef = useRef(null);
  const video = useSelector((state) => state.video);
  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={video.prompt_link} // YouTube URL
        controls
        onStart={() => playerRef.current.seekTo(startTime)} // Seek to start time on start
        width="200px"
        height={"200px"}
      />
    </div>
  );
};

export default YoutubePlayer;
