import type { DomainPageTabsContentMap } from '../domain-page-content/domain-page-content.types';
import DomainPageMetadata from '../domain-page-metadata/domain-page-metadata';
import DomainPageSettings from '../domain-page-settings/domain-page-settings';
import DomainPageWorkflows from '../domain-page-workflows/domain-page-workflows';

export const domainPageTabsContentConfig = {
  workflows: DomainPageWorkflows,
  metadata: DomainPageMetadata,
  settings: DomainPageSettings,
} as const satisfies DomainPageTabsContentMap;
