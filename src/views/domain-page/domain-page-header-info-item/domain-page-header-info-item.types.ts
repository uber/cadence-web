import type { ReactNode } from 'react';

type LoadingProps = {
  loading: true;
  title: string;
}

type LoadedProps = {
  loading: false;
  title: string;
  content: string | ReactNode;
};

export type Props = LoadingProps | LoadedProps
