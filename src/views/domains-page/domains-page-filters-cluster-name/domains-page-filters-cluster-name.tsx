'use client';
import React from 'react';
import useStyletronClasses from '@/hooks/use-styletron-classes';
import {
  cssStyles,
  overrides,
} from './domains-page-filters-cluster-name.styles';
import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';
import CLUSTERS_CONFIGS from '@/config/clusters/clusters.config';
import { PageFilterComponentProps } from '@/components/page-filters/page-filters.types';
import domainsPageQueryParamsConfig from '../config/domains-page-query-params.config';
import usePageQueryParams from '@/hooks/use-page-query-params/use-page-query-params';

const clustersOptions = CLUSTERS_CONFIGS.map(({ clusterName }) => ({
  label: clusterName,
  id: clusterName,
}));

function DomainsPageFiltersClusterName({
  pageQueryParamsConfig,
}: PageFilterComponentProps<typeof domainsPageQueryParamsConfig>) {
  const { cls } = useStyletronClasses(cssStyles);
  const [queryParams, setQueryParams] = usePageQueryParams(
    pageQueryParamsConfig,
    { pageRerender: false }
  );

  const clusterValue = clustersOptions.filter(
    ({ id }) => id === queryParams.clusterName
  );

  return (
    <div className={cls.selectFilterContainer}>
      <FormControl overrides={overrides.selectFormControl} label="Clusters">
        <Select
          size="compact"
          value={clusterValue}
          options={clustersOptions}
          onChange={(params) => {
            const newValue =
              typeof params.value[0]?.id === 'undefined'
                ? undefined
                : String(params.value[0]?.id);
            setQueryParams({ clusterName: newValue });
          }}
        />
      </FormControl>
    </div>
  );
}

export default DomainsPageFiltersClusterName;
