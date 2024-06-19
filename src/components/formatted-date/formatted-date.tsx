import formatDate from '@/utils/data-formatters/format-date';

import NoSSR from '../no-ssr/no-ssr';

import { styled } from './formatted-date.styles';
import { type Props } from './formatted-date.types';

export default function FormattedDate({
  timestampMs,
  placeholderText = 'Ongoing',
}: Props) {
  if (!timestampMs) {
    return <styled.GrayText>{placeholderText}</styled.GrayText>;
  }

  return <NoSSR>{formatDate(timestampMs)}</NoSSR>;
}
