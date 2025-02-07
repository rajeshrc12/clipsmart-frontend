export function formatTime(seconds) {
    const date = new Date(seconds * 1000); // Convert to milliseconds
    return date.toISOString().slice(11, 19); // Extract HH:MM:SS
}