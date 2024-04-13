import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc"; // UTC 플러그인 추가
import timezonePlugin from "dayjs/plugin/timezone"; // 타임존 플러그인 추가

dayjs.extend(utcPlugin); // UTC 플러그인 활성화
dayjs.extend(timezonePlugin); // 타임존 플러그인 활성화

export const utcToKrTime = (utc) => {
  const KR_TIME_ZONE = "Asia/Seoul"; // 한국 시간대
  const krTime = dayjs.utc(utc).tz(KR_TIME_ZONE); // UTC 시간을 한국 시간으로 변환

  return krTime.format("YY.MM.DD h:mm A");
};
