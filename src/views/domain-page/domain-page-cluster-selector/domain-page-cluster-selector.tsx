'use client';
import React from 'react';
import { Select, SIZE } from 'baseui/select';
import { useRouter, usePathname } from 'next/navigation';

import { overrides, styled } from './domain-page-cluster-selector.styles';
import { Props } from './domain-page-cluster-selector.types';

export default function DomainPageClusterSelector(props: Props) {
  const router = useRouter();
  const currentPath = usePathname();

  if (props.availableClusters?.length === 1) {
    return <styled.ItemLabel>{props.selectedCluster}</styled.ItemLabel>;
  }

  return (
    <Select
      options={props.availableClusters.map((cluster) => ({
        id: cluster.clusterName,
        label: cluster.clusterName,
      }))}
      value={[
        {
          id: props.selectedCluster,
          label: props.selectedCluster,
        },
      ]}
      onChange={({ option }) => {
        if (option && option.id !== props.selectedCluster) {
          const newPath = currentPath.replace(
            `/${props.selectedCluster}/`,
            `/${option.id}/`
          );
          router.push(newPath);
        }
      }}
      placeholder=""
      size={SIZE.mini}
      backspaceRemoves={false}
      clearable={false}
      deleteRemoves={false}
      escapeClearsValue={false}
      overrides={overrides.select}
    />
  );
}
