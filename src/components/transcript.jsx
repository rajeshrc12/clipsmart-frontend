import { useSelector } from "react-redux";

const Transcript = () => {
  const transcription = useSelector((state) => state.video.transcription);
  return (
    <div className="bg-white rounded shadow-lg h-screen overflow-y-scroll">
      {transcription.length > 0 ? (
        transcription.map((video, index) => (
          <div key={video.id}>
            <div className="font-bold border p-2 sticky top-0 left-0 bg-gray-50">
              {index + 1}. {video.title}
            </div>
            <div className="">
              {video.filtered_transcript.map((transcript) => (
                <div className="border-b p-2" key={transcript.start_time}>
                  <div className="font-bold">
                    {transcript.start_time} - {transcript.end_time}
                  </div>
                  <div>{transcript.text}</div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>Transcription not available</div>
      )}
    </div>
  );
};

export default Transcript;
