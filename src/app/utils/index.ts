export const formatLeadingZero = (targetNumber: number) =>
  targetNumber < 10 && targetNumber >= 0 ? '0' + targetNumber : targetNumber
