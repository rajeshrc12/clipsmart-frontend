export function secondsToHHMMSS(totalSeconds) {
  totalSeconds = Math.max(0, totalSeconds); // Ensure non-negative values

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours.toString().padStart(2, "0"), minutes.toString().padStart(2, "0"), seconds.toString().padStart(2, "0")].join(":");
}
