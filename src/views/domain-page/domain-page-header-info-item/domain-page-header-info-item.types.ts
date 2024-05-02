import type { ReactNode } from 'react';

type LoadingProps = {
  loading: true;
  placeholderSize: string;
};

type LoadedProps = {
  loading: false;
  content: string | ReactNode;
};

export type Props = (LoadingProps | LoadedProps) & {
  title: string;
};
