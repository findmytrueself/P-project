import dayjs from "dayjs";

export const utcToKrTime = (utc) => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const krTime = dayjs.utc(utc).add(KR_TIME_DIFF, "millisecond");

  return krTime.format("YY.MM.DD h:mm A");
};
