/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { formatTime, parseISO8601Duration } from "@/utils/common";
import { Button } from "./ui/button";
import { setEdit, setTranscription } from "@/features/videoSlice";
let id;
const YoutubeEditPlaylistPlayer = () => {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.video.edit);
  const transcription = useSelector((state) => state.video.transcription);
  const [range, setRange] = useState([parseISO8601Duration(edit.transcript.start_time), parseISO8601Duration(edit.transcript.end_time)]); // [start, end]
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(parseISO8601Duration(edit.transcript.start_time));
  const [isPlaying, setIsPlaying] = useState(true);
  const [text, setText] = useState("");
  const rangeRef = useRef(range); // Ref to always store latest range value

  useEffect(() => {
    rangeRef.current = range; // Keep the ref updated with latest range
  }, [range]);

  const debouncedSetRange = useRef(null);

  useEffect(() => {
    const initializePlayer = () => {
      if (!playerRef.current && window.YT) {
        playerRef.current = new window.YT.Player("youtube-player-2", {
          height: "360",
          width: "640",
          playerVars: {
            controls: 0,
            rel: 0,
            showinfo: 0,
            modestbranding: 0,
            iv_load_policy: 0,
          },
          events: {
            onReady: () => {
              playerRef.current.loadVideoById({
                videoId: edit.id,
                startSeconds: range[0],
                endSeconds: range[1],
              });
              if (id) clearInterval(id);
              id = setInterval(() => {
                setCurrentTime((prev) => prev + 1);
                console.log("YoutubeEditPlaylistPlayer 1");
              }, 1000);
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                clearInterval(id);
                setCurrentTime(rangeRef.current[0]);
                playerRef.current.seekTo(rangeRef.current[0]); // Restart video at start range
                playerRef.current.stopVideo();
              }
            },
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

  const filterText = (lowerRange, higherRange) => {
    const filtered_text = transcription[edit.videoIndex].all_transcription.filter((transcript) => transcript.start > lowerRange - 1 && transcript.start < higherRange - 1);
    setText(filtered_text.map((transcript) => transcript.text).join(" "));
  };
  // Debounce function to update the range
  useEffect(() => {
    if (!debouncedSetRange.current) {
      debouncedSetRange.current = debounce((newRange) => {
        if (playerRef?.current && edit?.id && playerRef?.current?.loadVideoById) {
          clearInterval(id);
          setCurrentTime(newRange[0]);
          id = setInterval(() => {
            setCurrentTime((prev) => prev + 1);
            console.log("YoutubeEditPlaylistPlayer 2");
          }, 1000);
          playerRef.current.loadVideoById({
            videoId: edit.id,
            startSeconds: newRange[0],
            endSeconds: newRange[1],
          });
          filterText(newRange[0], newRange[1]);
        }
      }, 500);
    }

    debouncedSetRange.current(range);

    return () => {
      debouncedSetRange.current.cancel();
    };
  }, [range, edit.id]);

  if (edit)
    return (
      <div className="flex flex-col gap-3">
        <div className="font-bold text-xl text-white">{edit.title}</div>
        <div className="relative h-[300px] w-full">
          <div id="youtube-player-2" className="absolute top-0 left-0 h-full w-full"></div>
          <div
            className="absolute top-0 left-0 h-full w-full flex justify-center items-center cursor-pointer"
            onClick={() => {
              if (isPlaying) {
                clearInterval(id);
                playerRef.current.stopVideo(); // Restart video at start range
              } else {
                playerRef.current.loadVideoById({
                  videoId: edit.id,
                  startSeconds: currentTime,
                  endSeconds: range[1],
                });
                clearInterval(id);
                id = setInterval(() => {
                  setCurrentTime((prev) => prev + 1);
                  console.log("YoutubeEditPlaylistPlayer 3");
                }, 1000);
              }
              setIsPlaying(!isPlaying);
            }}
          ></div>
        </div>
        <div className="text-white">Current time: {formatTime(currentTime || range[0] || 0)}</div>
        <div className="flex gap-2 justify-center items-center">
          <div className="flex gap-1 text-white cursor-pointer text-xl">
            <span
              onClick={() => {
                if (range[0] - 1 >= 0) setRange([range[0] - 1, range[1]]);
              }}
            >
              -
            </span>
            <span
              onClick={() => {
                setRange([range[0] + 1, range[1]]);
              }}
            >
              +
            </span>
          </div>
          <div>
            {formatTime(range[0])} - {formatTime(range[1])}
          </div>
          <div className="flex gap-1 text-white cursor-pointer text-xl">
            <span
              onClick={() => {
                if (range[1] - 1 >= 0) setRange([range[0], range[1] - 1]);
              }}
            >
              -
            </span>
            <span
              onClick={() => {
                setRange([range[0], range[1] + 1]);
              }}
            >
              +
            </span>
          </div>
        </div>
        <div className="max-h-20 overflow-y-scroll">{text || edit.transcript.text}</div>
        <RangeSlider
          min={0}
          max={parseISO8601Duration(edit.duration)}
          value={range}
          step={1}
          onInput={setRange} // Throttled update
          id="range-slider"
        />
        <div className="flex justify-end gap-2">
          <Button onClick={() => dispatch(setEdit(false))}>Cancel</Button>
          <Button
            onClick={() => {
              const transcriptionCopy = JSON.parse(JSON.stringify(transcription));
              transcriptionCopy[edit.videoIndex].transcription[edit.transcriptIndex].start_time = formatTime(range[0]);
              transcriptionCopy[edit.videoIndex].transcription[edit.transcriptIndex].end_time = formatTime(range[1]);
              if (text) transcriptionCopy[edit.videoIndex].transcription[edit.transcriptIndex].text = text;
              dispatch(setTranscription(transcriptionCopy));
              dispatch(setEdit(false));
              clearInterval(id);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    );
  else return <div>No data found</div>;
};

export default YoutubeEditPlaylistPlayer;
