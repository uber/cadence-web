export type MetadataTableItem<T extends object> = {
  key: string;
  label: string;
  renderValue: React.ComponentType<T> | ((props: T) => React.ReactNode);
};

export type Props<T extends object> = {
  metadataObj: T;
  metadataTableConfig: Array<MetadataTableItem<T>>;
};
