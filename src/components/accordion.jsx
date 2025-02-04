import { useState } from "react";
import YoutubePlayer from "./youtube-player";

/* eslint-disable react/prop-types */
const Accordion = ({ item = { title: "", transcription: [] } }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`cursor-pointer bg-white flex flex-col border rounded-lg`}>
      <div className="flex justify-between p-2" onClick={() => setIsOpen(!isOpen)}>
        <div>{item.title}</div>
        <div>{isOpen ? "-" : "+"}</div>
      </div>

      {isOpen && (
        <div className="flex flex-col py-1 border-t gap-1">
          <div className="flex">
            <div className="p-2">
              <YoutubePlayer />
            </div>
            <div className="flex-1 flex flex-col gap-2 h-[220px] p-2 overflow-y-scroll">
              {item.transcription.map((item, index) => (
                <div key={index} className="px-2">
                  <div className="font-bold text-sm">
                    {item.start_time}-{item.end_time}
                  </div>
                  <div className="text-sm">{item.text}</div>
                </div>
              ))}
              {item.transcription.map((item, index) => (
                <div key={index} className="px-2">
                  <div className="font-bold text-sm">
                    {item.start_time}-{item.end_time}
                  </div>
                  <div className="text-sm">{item.text}</div>
                </div>
              ))}
              {item.transcription.map((item, index) => (
                <div key={index} className="px-2">
                  <div className="font-bold text-sm">
                    {item.start_time}-{item.end_time}
                  </div>
                  <div className="text-sm">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
          {/* <div>Buttons</div> */}
        </div>
      )}
    </div>
  );
};

export default Accordion;
