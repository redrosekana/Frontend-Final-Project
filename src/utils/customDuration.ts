export const customDuration = (time: number): string => {
  const hour = Math.floor(time / 60);
  const minute = time % 60;

  if (time <= 60) return `${minute} นาที`;
  return `${hour} ชั่วโมง ${minute} นาที`;
};
