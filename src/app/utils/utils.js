export const utcToKrTime = (utc) => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);

  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = kr_curr.toLocaleDateString("en-US", options);
  const formattedTime = kr_curr.toLocaleTimeString("en-US", options);

  return `${formattedDate} ${formattedTime}`;
};
