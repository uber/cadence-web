import React from 'react';

import dynamic from 'next/dynamic';

import { type Props } from './no-ssr.types';

const NoSSR = (props: Props) => (
  <React.Fragment>{props.children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
