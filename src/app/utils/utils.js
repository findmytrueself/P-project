export const utcToKrTime = (utc) => {
  const utcDate = new Date(utc)
  const koreaOffset = 9 * 60
  const koreaDate = new Date(utcDate.getTime() + koreaOffset * 60 * 1000)

  return koreaDate.toLocaleString('ko-KR')
}
