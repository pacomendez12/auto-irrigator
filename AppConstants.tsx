const BASE = 0x1;

export const NONE = 0x0;
export const SUNDAY = BASE << 0;
export const MONDAY = BASE << 1;
export const TUESDAY = BASE << 2;
export const WENDNESDAY = BASE << 3;
export const THURSDAY = BASE << 4;
export const FRIDAY = BASE << 5;
export const SATURDAY = BASE << 6;

export const ONE_TIME_EVENT = 0x0;
export const REPEAT_WEEK = 0x1;
export const REPEAT_BIWEEK = 0x2;
export const REPEAT_MONTH = 0x3;
