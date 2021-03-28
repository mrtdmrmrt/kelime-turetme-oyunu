import { getRemainingDate } from './date';
import { $timer } from './constant';

let currentTime = null;
/**
 * Get deadline
 * @returns new Deadline object
 */
export function countdown(deadline) {
  setInterval(() => {
    const remainingTime = getRemainingDate(deadline);
    const { total, minutes, seconds } = remainingTime;
    if (total > 0) {
      currentTime = {
        total: total,
        minutes: minutes,
        seconds: seconds,
      };
      currentTime = `${minutes} : ${seconds}`;
      $timer.innerHTML = currentTime;
    } else {
      currentTime = null;
    }
  }, 1000);
}
