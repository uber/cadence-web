'use client';
import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import Form from '@/components/form/form';
import PageSection from '@/components/page-section/page-section';
import request from '@/utils/request';

import {
  settingsFieldsConfig,
  settingsValuesConfig,
} from '../config/domain-page-settings-form.config';
import { type DomainPageTabContentProps } from '../domain-page-content/domain-page-content.types';
import { type DomainInfo } from '../domain-page.types';

import { styled } from './domain-page-settings.styles';

export default function DomainPageSettings(props: DomainPageTabContentProps) {
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
          zodSchema={settingsValuesConfig}
          formConfig={settingsFieldsConfig}
          // TODO @adhitya.mamallan: Update this with the domain update server action
          onSubmit={(data) => console.log('Submitted values', data)}
        />
      </styled.SettingsContainer>
    </PageSection>
  );
}
