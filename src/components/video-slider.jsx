import { useState, useRef } from "react";

const VideoClipper = () => {
  const videoRef = useRef(null);
  const [startTime, setStartTime] = useState(10);
  const [endTime, setEndTime] = useState(20);
  const [videoDuration, setVideoDuration] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Toggle Play/Pause
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  // Ensure video stays within the selected range
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video.currentTime < startTime || video.currentTime > endTime) {
      video.currentTime = startTime;
    }
  };

  // Capture video duration
  const handleLoadedMetadata = () => {
    setVideoDuration(videoRef.current.duration);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      {/* Video Player */}
      <video ref={videoRef} width="100%" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata}>
        <source
          src="https://clipsmart.s3.us-east-1.amazonaws.com/test1.mp4?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIEY3dwdsh%2Blu1IsUBE9zoVbKp4ADnLPIOh3u13Hb3Qf3AiBitsu%2B4I782o5iifl%2BVHVnbIU9MZMq7Rp8wPMmTJv3virUAwj1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDk5MjM4MjY4Njk3NSIMIVOkCGwYApzwomOXKqgD0dKRW1fh%2Fwf3DRsk3MhQn0nLGH3Re8XOIe%2F95LEg3xNEEkjHewqyGBXcqyHa8D1Cfs4FYLQS6ScZOmyj5onH%2BHw770nkU4%2FgrMmdf4g%2FzkruByuxjHJGjdyZT5AnjvxLQe6MGXl%2BzON4zODfPPerZw1k19aepG9nJZuz0PgMkQ9zAcO1CkcobM%2BuqiJ5KGgo8ZlDL4WiWcnt%2Byb6iNORJC8Nc4QQNPJwwDbIAAgsdvDcBt5Vkbcx7msXBGVW9Gl08BCRfBMK5AZLW4lwbrYWCRRMYsy9n%2BbHSYQy981ZRwD6lVWerXXOUDwrXYy4swq%2BB%2FvFBNwkR1Ej6XNXx%2BaPvXouWwaWQ7y4%2FF0%2B3EzV%2FEQDxd2qPFv9rlPs9kbUwd07bTqqfAj8Vt57FbQWRyxazA85zo3aujls8fHel%2BYlyvwo6obxqtct%2BGD4lCzHsIUhzEQaE9%2FDso%2FXKs2gunl4Jx3rcNyu3s11XggO1Q5NnFW0AaxJs6jh5uNzgFyNNSVg9QFjHrGuvrBN92b%2F7iA2aHaO9aq5niMS960wsbyuGCSu4NRfnPvIhjCmrf28BjrlAgqdDUb9WZ7wV7zW%2BhYKxwqlVq49o8TYW961zrqj2Li57damQeUxO%2FOdFbwY%2BtaG5c6Dp49KNqdX0cE8L%2BoNVm9R1VM9eGv%2BhXB5h1ySn%2FDugwZrWzimiaD%2FULBo5kmUW2%2FjKe2LhqCKdSnPxB6qaOfa3qBAs%2FFz7RCVqlhuX9VIyLk6zaOE7IRtalWxzUiI8H24kGqJXOQkHya%2Bj9PQTBjtrYAl5%2B%2Bjzqxqalh2BI1AERX%2FsDY%2FuzYp9vemedEPDVPfEeHA6DSRyLBOEkX77HpLtNbdNkSS9bfhQyjd%2Fo%2Fxw7qaW47Z7zwhdSPf2hpeS2CT4oLhFpHoib6DsrDv8%2FJuWNPgux5eF%2BtQDA8hJBsf90EuxOzXJ4eNDzbDn2fNhMJx3LuYqy6YD1j9bNzl1NXo%2Bvv%2Bp6vqT82KZG9feBMFtiDVZHMTJrbECKUx%2BGozzWtKHY43XwBSjdcJYWP3wOs03Sf6Qg%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6ODU6C37U37RW7PZ%2F20250202%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250202T201153Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0ebf69ad508eecda0a405c5093dd3a719cc4390540c8319a8434e27cb4d63484"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Play/Pause Button */}
      <button onClick={togglePlayPause} style={{ marginTop: "10px" }}>
        {playing ? "Pause" : "Play"}
      </button>

      {/* Start and End Time Inputs */}
      <div style={{ marginTop: "10px" }}>
        <label>Start Time (s): </label>
        <input type="number" value={startTime} onChange={(e) => setStartTime(Math.max(0, parseFloat(e.target.value)))} min="0" max={endTime - 1} step="1" />
        <br />
        <label>End Time (s): </label>
        <input type="number" value={endTime} onChange={(e) => setEndTime(Math.min(videoDuration, parseFloat(e.target.value)))} min={startTime + 1} max={videoDuration} step="1" />
      </div>
    </div>
  );
};

export default VideoClipper;
