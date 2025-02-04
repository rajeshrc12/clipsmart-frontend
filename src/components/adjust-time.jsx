import { useState } from "react";
import YoutubePlayer from "./youtube-player";
import { useSelector } from "react-redux";
import Accordion from "./accordion";

export const AdjustTime = () => {
  const video = useSelector((state) => state.video);
  return (
    <div className="flex flex-col h-[60vh] gap-2 w-[600px] overflow-y-scroll px-2">
      {video.transcription.map((item, index) => (
        <Accordion item={item} key={index} />
      ))}
      {video.transcription.map((item, index) => (
        <Accordion item={item} key={index} />
      ))}
      {video.transcription.map((item, index) => (
        <Accordion item={item} key={index} />
      ))}
      {video.transcription.map((item, index) => (
        <Accordion item={item} key={index} />
      ))}
      {video.transcription.map((item, index) => (
        <Accordion item={item} key={index} />
      ))}
    </div>
  );
};
