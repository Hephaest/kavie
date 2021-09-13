const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = 60 * 1000;

const formatTime = (time) => {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const formatDuration = (time) => {
  const minutes = Math.floor(time / MILLISECONDS_IN_MINUTE);
  const seconds = Math.floor((time % MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND);

  return { minutes, seconds };
};

const formatFullDate = (date) => {
  const [year, month, day] = date.split('-');
  return { year: +year, month: +month, day: +day };
};

export {
  formatTime,
  formatDuration,
  formatFullDate,
};
