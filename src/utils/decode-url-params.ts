export default function decodeURLParams(params: { [k: string]: string }) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      decodeURIComponent(value),
    ])
  );
}
