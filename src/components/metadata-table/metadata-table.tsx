import React from 'react';

import { styled } from './metadata-table.styles';
import type { Props } from './metadata-table.types';

// Probably rename this to avoid semantic collisions with Metadata
export default function MetadataTable<T extends object>(props: Props<T>) {
  return (
    <div>
      {props.metadataTableConfig.map((tableItem) => (
        <styled.MetadataRow key={tableItem.key}>
          <styled.MetadataItemLabel>{tableItem.label}</styled.MetadataItemLabel>
          <styled.MetadataItemValue>
            <tableItem.renderValue {...props.metadataObj} />
          </styled.MetadataItemValue>
        </styled.MetadataRow>
      ))}
    </div>
  );
}
