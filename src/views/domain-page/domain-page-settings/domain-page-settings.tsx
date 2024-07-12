'use client';
import React from 'react';

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import Form from '@/components/form/form';
import PageSection from '@/components/page-section/page-section';
import updateDomain from '@/server-actions/update-domain/update-domain';
import request from '@/utils/request';

import {
  settingsFormConfig,
  settingsFormSchema,
} from '../config/domain-page-settings-form.config';
import { type DomainPageTabContentProps } from '../domain-page-content/domain-page-content.types';
import { type DomainInfo } from '../domain-page.types';

import { styled } from './domain-page-settings.styles';

export default function DomainPageSettings(props: DomainPageTabContentProps) {
  const queryClient = useQueryClient();

  const { data: domainInfo } = useSuspenseQuery<DomainInfo>({
    queryKey: ['describeDomain', props],
    queryFn: () =>
      request(`/api/domains/${props.domain}/${props.cluster}`).then((res) =>
        res.json()
      ),
  });

  return (
    <PageSection>
      <styled.SettingsContainer>
        <Form
          data={domainInfo}
          zodSchema={settingsFormSchema}
          formConfig={settingsFormConfig}
          onSubmit={async (data) => {
            await updateDomain({
              cluster: props.cluster,
              domain: props.domain,
              values: {
                description: data.description,
                historyArchivalStatus: data.historyArchival
                  ? 'ARCHIVAL_STATUS_ENABLED'
                  : 'ARCHIVAL_STATUS_DISABLED',
                visibilityArchivalStatus: data.visibilityArchival
                  ? 'ARCHIVAL_STATUS_ENABLED'
                  : 'ARCHIVAL_STATUS_DISABLED',
                workflowExecutionRetentionPeriod: {
                  seconds: data.retentionPeriodDays * 86400,
                },
              },
            }).then(
              (domain) => {
                queryClient.setQueryData(['describeDomain', props], domain);
              },
              (error) => {
                console.log(error);
              }
            );
          }}
          submitButtonText="Save settings"
        />
      </styled.SettingsContainer>
    </PageSection>
  );
}
