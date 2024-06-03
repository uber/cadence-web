export default function parseGrpcTimestamp(time: {
  seconds: number;
  nanos: number;
}): number {
  return time.seconds * 1000 + time.nanos / 1000000;
}
