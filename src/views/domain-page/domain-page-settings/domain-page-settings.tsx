'use client';
import React from 'react';

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

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
import { type SettingsValues } from './domain-page-settings.types';

export default function DomainPageSettings(props: DomainPageTabContentProps) {
  const queryClient = useQueryClient();

  const { data: domainInfo } = useSuspenseQuery<DomainInfo>(
    {
      queryKey: ['describeDomain', props],
      queryFn: () =>
        request(`/api/domains/${props.domain}/${props.cluster}`).then((res) =>
          res.json()
        ),
    },
    queryClient
  );

  const saveSettings = useMutation(
    {
      mutationFn: (data: SettingsValues): Promise<DomainInfo> => {
        return updateDomain({
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
              seconds: data.retentionPeriodSeconds,
            },
          },
        });
      },
    },
    queryClient
  );

  return (
    <PageSection>
      <styled.SettingsContainer>
        <Form
          data={domainInfo}
          zodSchema={settingsFormSchema}
          formConfig={settingsFormConfig}
          onSubmit={async (data) =>
            await saveSettings.mutateAsync(data).then(() => {
              queryClient.invalidateQueries({
                queryKey: ['describeDomain', props],
              });
            })
          }
          submitButtonText="Save settings"
          // TODO @adhitya.mamallan - Add logic for an error banner/toast
          onSubmitError={(e) => console.error(e)}
        />
      </styled.SettingsContainer>
    </PageSection>
  );
}
