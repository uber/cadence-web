import type {
  PageQueryParamKeys,
  PageQueryParamValues,
} from '@/hooks/use-page-query-params/use-page-query-params.types';
import domainsPageQueryParamsConfig from '@/views/domains-page/config/domains-page-query-params.config';
import { DomainData } from '../domains-page.types';
import { PageFilterConfig } from '@/components/page-filters/page-filters.types';

interface DomainsPageFilterConfig
  extends PageFilterConfig<typeof domainsPageQueryParamsConfig> {
  filterFunc: (
    d: DomainData,
    queryParams: PageQueryParamValues<typeof domainsPageQueryParamsConfig>
  ) => boolean;
}

export type DomainsPageFiltersConfig = Array<DomainsPageFilterConfig>;
