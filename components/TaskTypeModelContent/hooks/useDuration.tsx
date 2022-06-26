import React, { useState } from "react";

const seconds = [60, 120, 300, 600, 900, 1800, 3600, 5400, 7200, 9000];

export default function useDuration(
  initialDuration: number
): [
  { duration: number; durationIndex: number },
  (value: number | Array<number>) => void
] {
  const [durationIndex, setDurationIndex] = useState<number>(
    getIndexFromSeconds(initialDuration)
  );

  const setDuration = (value: number | Array<number>): void => {
    if (Array.isArray(value)) value = value[0];
    setDurationIndex(value);
  };

  return [
    { duration: seconds[durationIndex], durationIndex: durationIndex },
    setDuration,
  ];
}

export const TOTAL_DURATION_STEPS = seconds.length - 1;

function getIndexFromSeconds(s: number) {
  const idx = seconds.indexOf(s);
  return idx === -1 ? 0 : idx;
}
