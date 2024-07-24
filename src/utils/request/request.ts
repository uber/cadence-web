import { RequestError } from './request-error';

export default function request(
  url: string,
  options?: RequestInit
): Promise<Response> {
  let absoluteUrl = url;
  const isRelativeUrl = url.startsWith('/');
  const isOnServer = typeof window === 'undefined';
  if (isOnServer && isRelativeUrl) {
    absoluteUrl = `http://127.0.0.1:${process.env.CADENCE_WEB_PORT || 3000}${url}`;
  }
  return fetch(absoluteUrl, { cache: 'no-cache', ...(options || {}) }).then(
    async (res) => {
      if (!res.ok) {
        const message = await res.text();
        throw new RequestError(message, res.status);
      }
      return res;
    }
  );
}
