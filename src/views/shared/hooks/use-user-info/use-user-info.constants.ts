export const EXPIRED_TOKEN_RECHECK_INTERVAL_MS = 30_000;

// Max signed 32-bit int (2^31 - 1); browsers clamp setTimeout delays to this
// (~24.8 days). See https://en.wikipedia.org/wiki/2,147,483,647#In_computing
export const MAX_TIMER_DELAY_MS = 2_147_483_647;
