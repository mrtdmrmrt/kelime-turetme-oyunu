/**
 * Get date
 * @returns new Date object
 */
export const getNow = () => {
  return new Date();
};

export const addMinutesToDate = (date, minutes) => {
  const dateTimestamp = date.getTime();
  const minutesTimestamp = minutes * 60000;
  return new Date(dateTimestamp + minutesTimestamp);
};
/**
 * getRemainingDate
 * @param {Object} date Date
 * @returns Return a object consist given object total elapsed time, seconds and minutes
 */
export const getRemainingDate = (date) => {
  // Total elapsed time
  const total = Date.parse(date) - Date.parse(getNow());
  // Seconds
  const seconds = Math.floor((total / 1000) % 60);
  // Minutes
  const minutes = Math.floor((total / 1000 / 60) % 60);
  return { total, seconds, minutes };
};
