export function msToMinutesSeconds(milliseconds) {
  // Calculate total seconds (rounding can be adjusted based on desired precision)
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate minutes (using modulo 60 to reset after each hour if needed, though not strictly required for just minutes/seconds)
  const minutes = Math.floor(totalSeconds / 60);

  // Calculate remaining seconds using the modulo operator
  const seconds = totalSeconds % 60;

  // Format seconds to always be two digits (e.g., '05' instead of '5')
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${minutes}:${formattedSeconds}`;
}
