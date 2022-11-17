// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { shortName } from '~helpers';

const workflowLink = ({ clusterName, eventDetails, short }) => {
  const text = [
    eventDetails.workflowType ? shortName(eventDetails.workflowType.name) : '',
    short ? '' : eventDetails.workflowExecution.workflowId,
  ]
    .filter(x => x)
    .join(' - ');

  return {
    routeLink: {
      name: 'workflow/summary',
      params: {
        clusterName,
        domain: eventDetails.domain,
        workflowId: eventDetails.workflowExecution.workflowId,
        runId: eventDetails.workflowExecution.runId,
      },
    },
    text,
  };
};

export default workflowLink;
