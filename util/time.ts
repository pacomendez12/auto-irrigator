export const getTimeFromSeconds = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds} segundos`;
  }
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  if (minutes < 60) {
    const minutesString = `${minutes} ${minutes > 1 ? "minutos" : "minuto"}`;
    if (seconds === 0) {
      return minutesString;
    }
    return `${minutesString} y ${seconds} segundos`;
  }
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${hours} ${hours > 1 ? "horas" : "hora"} ${
    minutes > 0 ? `y ${minutes} minutos` : ""
  } `;
};
