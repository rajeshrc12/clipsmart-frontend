import { useState } from "react";
import { Input } from "./ui/input";
import YoutubePlayer from "./youtube-player";

export const AdjustTime = () => {
  const transcription = new Array(30).fill(0).map((a) => ({ text: "Hi how are you", start_time: "00:00:01", end_time: "00:00:10" }));
  const [active, setActive] = useState(0);
  return (
    <div className="w-full grid grid-cols-12 h-[60vh]">
      <YoutubePlayer />
      <div className="col-span-6 pl-3 flex flex-col gap-2 px-2 overflow-y-scroll">
        {transcription.map((item, index) => (
          <div
            onClick={() => setActive(index)}
            key={item.start_time}
            className={`cursor-pointer flex justify-between border rounded-lg text-sm p-2 ${active === index ? "border-black" : "border-gray"}`}
          >
            <div>
              <div className="font-semibold">
                {item.start_time}-{item.end_time}
              </div>
              <div>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
