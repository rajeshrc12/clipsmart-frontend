/* eslint-disable react/prop-types */
import { secondsToHHMMSS } from "@/utils/common";
import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";

const YoutubePlayerTimer = ({ timeKey, time, setTime = () => {} }) => {
  return (
    <div className="border border-black flex rounded-lg gap-2">
      <Button
        variant="ghost"
        onClick={() => {
          if (time[timeKey] > 0) setTime({ ...time, [timeKey]: time[timeKey] - 1 });
        }}
        className="border-r border-black cursor-pointer h-5 p-0 m-0"
      >
        <Minus size={20} />
      </Button>
      <div className="select-none">{secondsToHHMMSS(time[timeKey])}</div>
      <Button
        variant="ghost"
        onClick={() => {
          setTime({ ...time, [timeKey]: time[timeKey] + 1 });
        }}
        className="border-l border-black cursor-pointer h-5 p-0 m-0"
      >
        <Plus size={20} />
      </Button>
    </div>
  );
};

export default YoutubePlayerTimer;
