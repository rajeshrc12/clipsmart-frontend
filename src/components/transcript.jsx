import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "./ui/skeleton";
import { Pencil, Play } from "lucide-react";
import { setEdit } from "@/features/videoSlice";
// import { formatTime } from "@/utils/common";

const Transcript = () => {
  const { transcription, isLoading } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        {/* Skeleton for title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4 bg-[#3A3434]" />
        </div>

        {/* Skeleton for transcript list */}
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-5 w-full bg-[#3A3434]" />
              <Skeleton className="h-4 w-1/3 bg-[#3A3434]" />
            </div>
          ))}
        </div>
      </div>
    );
  } else
    return (
      <div className="h-screen overflow-y-scroll">
        {transcription.length > 0 ? (
          transcription.map((video, videoIndex) => (
            <div key={video.id}>
              <div className="font-bold border border-[#808080] p-2 sticky top-0 left-0 bg-[#201c1c]">
                {videoIndex + 1}. {video.title}
              </div>
              <div>
                {video.transcription.length > 0
                  ? video.transcription.map((transcript, transcriptIndex) => (
                      <div className="border-b border-[#808080] border-l p-2" key={transcript.start_time}>
                        <div className="font-semibold flex justify-between">
                          <div>
                            {transcript.start_time} - {transcript.end_time}
                          </div>
                          <div className="flex gap-3 items-center">
                            <Play size={17} />
                            <Pencil size={17} onClick={() => dispatch(setEdit({ title: video.title, duration: video.duration, id: video.id, videoIndex, transcriptIndex, transcript }))} />
                          </div>
                        </div>
                        <div className="text-sm">{transcript.text}</div>
                      </div>
                    ))
                  : "No transcription available"}
              </div>
            </div>
          ))
        ) : (
          <div className="p-5 text-gray-500">Transcription will apear here</div>
        )}
      </div>
    );
};

export default Transcript;
