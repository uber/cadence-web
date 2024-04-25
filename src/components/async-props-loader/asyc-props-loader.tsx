import { AsyncLoaderComponent, Props } from './asyc-props-loader.types';

export default async function AsyncPropsLoader<C extends AsyncLoaderComponent>({
  component,
  getAsyncProps,
}: Props<C>) {
  const asyncProps = await getAsyncProps();
  const Component = component;
  return <Component {...asyncProps} />;
}
