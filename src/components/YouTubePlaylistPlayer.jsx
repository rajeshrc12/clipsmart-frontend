import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Download, FastForward, Rewind, RotateCcw } from "lucide-react";
import { useDownloadVideoMutation } from "@/services/videoApi";
import { setEditedLink } from "@/features/videoSlice";
let id;
const YouTubePlaylistPlayer = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video.transcription);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTranscriptionIndex, setCurrentTranscriptionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const parseISO8601Duration = (duration) => {
    const [hours, minutes, seconds] = duration.split(":");
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  };
  const [downloadVideo] = useDownloadVideoMutation();
  const handleDownloadVideo = async () => {
    try {
      if (videos.length > 0) {
        const vidoesFiltered = videos.map((video) => ({ id: video.id, transcription: video.transcription, title: video.title }));
        console.log(vidoesFiltered);
        dispatch(setEditedLink({ title: "In Progress", message: "Your video link is getting prepared, please wait..." }));
        const response = await downloadVideo(vidoesFiltered).unwrap();
        if (response.video_link) {
          dispatch(setEditedLink({ title: "Success", message: "Your link is generated", link: response.video_link }));
        }

        console.log("Download response:", response);
      }
    } catch (err) {
      console.error("Download error:", err);
    }
  };
  const loadVideo = () => {
    if (videos[currentVideoIndex]?.transcription.length > 0) {
      const video = videos[currentVideoIndex];
      const transcription = video.transcription[currentTranscriptionIndex];
      const start_time_seconds = parseISO8601Duration(transcription.start_time);
      const end_time_seconds = parseISO8601Duration(transcription.end_time) + 1;

      playerRef.current.loadVideoById({
        videoId: video.id,
        startSeconds: start_time_seconds,
        endSeconds: end_time_seconds,
      });
      if (id) clearTimeout(id);
      id = setTimeout(() => {
        if (currentTranscriptionIndex < video.transcription.length - 1) {
          setCurrentTranscriptionIndex(currentTranscriptionIndex + 1);
        } else {
          playNextVideo();
        }
        console.log("YouTubePlaylistPlayer 1");
      }, Math.ceil(end_time_seconds - start_time_seconds) * 1000);
    } else {
      playNextVideo();
    }
  };

  const playNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setCurrentTranscriptionIndex(0);
    } else {
      setCurrentVideoIndex(0);
      setCurrentTranscriptionIndex(0);
    }
  };
  const stopVideo = () => {
    if (playerRef?.current?.stopVideo) {
      playerRef.current.stopVideo();
      clearTimeout(id);
    }
  };

  useEffect(() => {
    const initializePlayer = () => {
      if (!playerRef.current && window.YT) {
        playerRef.current = new window.YT.Player("youtube-player-1", {
          height: "360",
          width: "640",
          playerVars: {
            controls: 0,
            rel: 0,
            showinfo: 0,
            modestbranding: 0,
            iv_load_policy: 0,
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      window.addEventListener("youtubeIframeAPIReady", initializePlayer);
    }

    return () => {
      window.removeEventListener("youtubeIframeAPIReady", initializePlayer);
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
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
    <div className="container flex flex-col justify-center">
      <div className="relative h-[300px] w-full">
        <div id="youtube-player-1" className="absolute top-0 left-0 h-full w-full"></div>
        <div
          className="absolute top-0 left-0 h-full w-full flex justify-center items-center cursor-pointer"
          onClick={() => {
            if (videos.length) setIsPlaying(!isPlaying);
          }}
        ></div>
      </div>
      <div className="flex gap-2 justify-center pt-2">
        <Rewind
          onClick={() => {
            if (videos.length > 0) {
              setCurrentVideoIndex((prev) => (prev - 1 <= 0 ? 0 : prev - 1));
              setCurrentTranscriptionIndex((prev) => (prev - 1 <= 0 ? 0 : prev - 1));
              clearTimeout(id);
              if (!isPlaying) setIsPlaying(true);
            }
          }}
        />
        <RotateCcw
          onClick={() => {
            if (videos.length > 0) {
              setCurrentVideoIndex(0);
              setCurrentTranscriptionIndex(0);
              clearTimeout(id);
              if (!isPlaying) setIsPlaying(true);
            }
          }}
        />
        <FastForward
          onClick={() => {
            if (videos.length > 0) {
              playNextVideo();
            }
          }}
        />
        <Download onClick={handleDownloadVideo} />
      </div>
    </div>
  );
};

export default YouTubePlaylistPlayer;
