export function formatTime(seconds) {
  const date = new Date(seconds * 1000); // Convert to milliseconds
  return date.toISOString().slice(11, 19); // Extract HH:MM:SS
}
export const parseISO8601Duration = (duration) => {
  const [hours, minutes, seconds] = duration.split(":");
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
};
