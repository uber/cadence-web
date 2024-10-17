import {
  type WorkflowHistoryEventDetailsGroupEntry,
  type WorkflowHistoryEventDetailsEntry,
} from '../../../workflow-history-event-details/workflow-history-event-details.types';
import getDetailsFieldLabel from '../get-details-field-label';

const singleEntry: WorkflowHistoryEventDetailsEntry = {
  key: 'testKey',
  path: 'testPath',
  label: 'defaultLabel',
  isGroup: false,
  value: 'testValue',
  renderConfig: {
    name: 'Mock render config without custom label',
    customMatcher: () => true,
  },
};

const groupEntry: WorkflowHistoryEventDetailsGroupEntry = {
  key: 'testKey',
  path: 'testPath',
  label: 'defaultLabel',
  isGroup: true,
  groupEntries: [
    {
      key: 'testKey1',
      path: 'testKey.testPath1',
      label: 'defaultLabel1',
      isGroup: false,
      value: 'testValue1',
      renderConfig: null,
    },
    {
      key: 'testKey2',
      path: 'testKey.testPath2',
      label: 'defaultLabel2',
      isGroup: false,
      value: 'testValue2',
      renderConfig: null,
    },
  ],
  renderConfig: {
    name: 'Mock render config without custom label',
    customMatcher: () => true,
  },
};

describe('getDetailsFieldLabel', () => {
  it('should return the label from renderConfig if getLabel is defined', () => {
    const mockGetLabel = jest.fn().mockReturnValue('Custom Label');

    expect(
      getDetailsFieldLabel({
        ...singleEntry,
        renderConfig: {
          name: 'Mock render config with custom label',
          customMatcher: () => true,
          getLabel: mockGetLabel,
        },
      })
    ).toBe('Custom Label');

    expect(mockGetLabel).toHaveBeenCalledWith({
      key: 'testKey',
      path: 'testPath',
      value: 'testValue',
    });
  });

  it('should return the default label if renderConfig.getLabel is not defined', () => {
    expect(getDetailsFieldLabel(singleEntry)).toBe('defaultLabel');
  });

  it('should append the number of entries to label for group entries', () => {
    expect(
      getDetailsFieldLabel({
        ...groupEntry,
        renderConfig: {
          name: 'Mock render config with custom label',
          customMatcher: () => true,
          getLabel: jest.fn().mockReturnValue('Custom Label'),
        },
      })
    ).toBe('Custom Label (2)');
  });

  it('should append the number of entries to default label for group entries', () => {
    expect(getDetailsFieldLabel(groupEntry)).toBe('defaultLabel (2)');
  });
});
