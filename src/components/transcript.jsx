import { useSelector } from "react-redux";
import { Skeleton } from "./ui/skeleton";

const Transcript = () => {
  const { transcription, isLoading } = useSelector((state) => state.video);
  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        {/* Skeleton for title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* Skeleton for transcript list */}
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  } else
    return (
      <div className="bg-white rounded shadow-lg h-screen overflow-y-scroll">
        {transcription.length > 0 ? (
          transcription.map((video, index) => (
            <div key={video.id}>
              <div className="font-bold border p-2 sticky top-0 left-0 bg-gray-50">
                {index + 1}. {video.title}
              </div>
              <div className="">
                {video.filtered_transcript.length>0?video.filtered_transcript.map((transcript) => (
                  <div className="border-b p-2" key={transcript.start_time}>
                    <div className="font-bold">
                      {transcript.start_time} - {transcript.end_time}
                    </div>
                    <div>{transcript.text}</div>
                  </div>
                )):"No transcription available"}
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
