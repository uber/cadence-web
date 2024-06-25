type MetadataTableValueProps<T extends object> = {
  metadataObj: T;
};

export type MetadataTableItem<T extends object> = {
  key: string;
  label: string;
  renderValue:
    | React.ComponentType<MetadataTableValueProps<T>>
    | ((props: MetadataTableValueProps<T>) => React.ReactNode);
};

export type Props<T extends object> = {
  metadataObj: T;
  metadataTableConfig: Array<MetadataTableItem<T>>;
};
