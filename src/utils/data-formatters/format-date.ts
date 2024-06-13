import { format } from 'date-fns';

export default function formatDate(timestampNs: number) {
  return format(new Date(timestampNs / 1e6), 'dd MMM yyyy, HH:mm:ss z');
}
