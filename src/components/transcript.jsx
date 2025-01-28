const Transcript = () => {
  const data = [
    {
      id: "LOH1l-MP_9k",
      title: "ALL React Hooks Explained in 12 Minutes",
      filtered_transcript: [
        {
          text: "effect hooks to perform side effects",
          start_time: "0:00:40",
          end_time: "0:00:42",
        },
        {
          text: "a side effect it's a way to reach out",
          start_time: "0:03:40",
          end_time: "0:03:42",
        },
        {
          text: "side react and synchronize with an",
          start_time: "0:03:42",
          end_time: "0:03:44",
        },
      ],
    },
    {
      id: "LOH1l-MP_9k",
      title: "ALL React Hooks Explained in 12 Minutes",
      filtered_transcript: [
        {
          text: "effect hooks to perform side effects",
          start_time: "0:00:40",
          end_time: "0:00:42",
        },
        {
          text: "a side effect it's a way to reach out",
          start_time: "0:03:40",
          end_time: "0:03:42",
        },
        {
          text: "side react and synchronize with an",
          start_time: "0:03:42",
          end_time: "0:03:44",
        },
      ],
    },
    {
      id: "LOH1l-MP_9k",
      title: "ALL React Hooks Explained in 12 Minutes",
      filtered_transcript: [
        {
          text: "effect hooks to perform side effects",
          start_time: "0:00:40",
          end_time: "0:00:42",
        },
        {
          text: "a side effect it's a way to reach out",
          start_time: "0:03:40",
          end_time: "0:03:42",
        },
        {
          text: "side react and synchronize with an",
          start_time: "0:03:42",
          end_time: "0:03:44",
        },
      ],
    },
  ];
  return (
    <div className="bg-white rounded shadow-lg h-screen overflow-y-scroll">
      {data.map((video, index) => (
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
      ))}
    </div>
  );
};

export default Transcript;
