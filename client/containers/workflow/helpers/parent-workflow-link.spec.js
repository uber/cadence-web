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

import parentWorkflowLink from './parent-workflow-link';

describe('parentWorkflowLink', () => {
  describe('When passed wfStartDetails.parentWorkflowExecution', () => {
    let eventDetails;

    beforeEach(() => {
      eventDetails = {
        parentWorkflowDomain: 'parentWorkflowDomainValue',
        parentWorkflowExecution: {
          workflowId: 'workflowIdValue',
          runId: 'runIdValue',
        },
      };
    });

    it('should return an object with to.name.', () => {
      const output = parentWorkflowLink({ eventDetails });

      expect(output.to.name).toEqual('workflow/summary');
    });

    it('should return an object with to.params.domain.', () => {
      const output = parentWorkflowLink({ eventDetails });

      expect(output.to.params.domain).toEqual('parentWorkflowDomainValue');
    });

    it('should return an object with to.params.workflowId.', () => {
      const output = parentWorkflowLink({ eventDetails });

      expect(output.to.params.workflowId).toEqual('workflowIdValue');
    });

    it('should return an object with to.params.runId.', () => {
      const output = parentWorkflowLink({ eventDetails });

      expect(output.to.params.runId).toEqual('runIdValue');
    });

    it('should return an object with text.', () => {
      const output = parentWorkflowLink({ eventDetails });

      expect(output.text).toEqual('workflowIdValue');
    });
  });
});
