export const utcToKrTime = (utc) => {
  const utcDate = new Date(utc)
  const koreaOffset = 9 * 60
  const koreaDate = new Date(utcDate.getTime() + koreaOffset * 60 * 1000)

  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    hourCycle: 'h12',
  }

  return koreaDate
    .toLocaleString('en-US', options)
    .replace(',', '')
    .replace(/\//g, '.')
}
