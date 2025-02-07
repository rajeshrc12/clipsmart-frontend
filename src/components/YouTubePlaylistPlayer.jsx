import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
let id;
const YouTubePlaylistPlayer = () => {
  const videos = useSelector((state) => state.video.transcription);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTranscriptionIndex, setCurrentTranscriptionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  // const parseISO8601Duration = (duration) => {
  //   const [hours, minutes, seconds] = duration.split(":");
  //   return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  // };

  const loadVideo = () => {
    const video = videos[currentVideoIndex];
    const transcription = video.transcription[currentTranscriptionIndex];
    const start_time_seconds = transcription.start;
    const end_time_seconds = transcription.start + transcription.duration;

    playerRef.current.loadVideoById({
      videoId: video.id,
      startSeconds: start_time_seconds,
      endSeconds: end_time_seconds,
    });

    id = setTimeout(() => {
      if (currentTranscriptionIndex < video.transcription.length - 1) {
        setCurrentTranscriptionIndex(currentTranscriptionIndex + 1);
      } else {
        playNextVideo();
      }
    }, Math.ceil(end_time_seconds - start_time_seconds) * 1000);
  };

  const playNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setCurrentTranscriptionIndex(0);
    } else {
      stopVideo();
    }
  };
  const stopVideo = () => {
    playerRef.current.stopVideo();
    clearTimeout(id);
  };
  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "360",
        width: "640",
        playerVars: {
          controls: 0, // Disable all controls
          rel: 0, // Disable related videos at the end
          showinfo: 0, // Disable video info
          modestbranding: 0, // Disable YouTube logo
          iv_load_policy: 0, // Disable annotations
        },
      });
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);
  console.log(videos);
  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) loadVideo();
      else {
        stopVideo();
      }
    }
  }, [currentVideoIndex, currentTranscriptionIndex, isPlaying]);
  return (
    <div className="container flex justify-center">
      <div className="relative h-[300px] w-full">
        <div id="player" className="absolute top-0 left-0 h-full w-full"></div>
        <div
          className="absolute top-0 left-0 h-full w-full flex justify-center items-center cursor-pointer"
          onClick={() => {
            if (videos.length) setIsPlaying(!isPlaying);
          }}
        ></div>
      </div>
    </div>
  );
};

export default YouTubePlaylistPlayer;
