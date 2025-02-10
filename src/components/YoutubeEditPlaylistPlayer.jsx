/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { formatTime, parseISO8601Duration } from "@/utils/common";
import { Button } from "./ui/button";
import { setEdit } from "@/features/videoSlice";
let id;
const YoutubeEditPlaylistPlayer = () => {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.video.edit);
  const [range, setRange] = useState([parseISO8601Duration(edit.transcript.start_time), parseISO8601Duration(edit.transcript.end_time)]); // [start, end]
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(parseISO8601Duration(edit.transcript.start_time));
  const [isPlaying, setIsPlaying] = useState(true);

  const debouncedSetRange = useRef(null);

  useEffect(() => {
    // Ensure script is not added multiple times
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) {
        playerRef.current = new window.YT.Player("edit-player", {
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
              id = setInterval(() => {
                setCurrentTime((prev) => prev + 1);
              }, 1000);
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                clearInterval(id);
                playerRef.current.seekTo(range[0]); // Restart video at start range
                playerRef.current.stopVideo(); // Restart video at start range
              }
            },
          },
        });
      }
    };
    return () => {
      // Do not remove window.onYouTubeIframeAPIReady globally
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  // Debounce function to update the range
  useEffect(() => {
    if (!debouncedSetRange.current) {
      debouncedSetRange.current = debounce((newRange) => {
        if (playerRef.current && edit.id) {
          setCurrentTime(newRange[0] - 1);
          playerRef.current.loadVideoById({
            videoId: edit.id,
            startSeconds: newRange[0],
            endSeconds: newRange[1],
          });
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
        <div>{edit.title}</div>
        <div className="relative h-[300px] w-full">
          <div id="edit-player" className="absolute top-0 left-0 h-full w-full"></div>
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
                id = setInterval(() => {
                  setCurrentTime((prev) => prev + 1);
                }, 1000);
              }
              setIsPlaying(!isPlaying);
            }}
          ></div>
        </div>
        <div>Current time: {formatTime(currentTime || range[0] || 0)}</div>
        <div>
          {formatTime(range[0])} - {formatTime(range[1])}
        </div>
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
          <Button onClick={() => console.log(edit, range)}>Save</Button>
        </div>
      </div>
    );
  else return <div>No data found</div>;
};

export default YoutubeEditPlaylistPlayer;
