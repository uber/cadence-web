import { type ReactNode } from 'react';

export type Props = {
  params: { domain: string; cluster: string };
  children: ReactNode;
};
