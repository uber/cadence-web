import { type WorkflowHistoryEventDetailsEntry } from '../../../workflow-history-event-details/workflow-history-event-details.types';
import getDetailsFieldLabel from '../get-details-field-label';

describe('getDetailsFieldLabel', () => {
  it('should return the label from renderConfig if getLabel is defined', () => {
    const entry: WorkflowHistoryEventDetailsEntry = {
      key: 'testKey',
      path: 'testPath',
      value: 'testValue',
      renderConfig: {
        name: 'Mock render config with custom label',
        customMatcher: () => true,
        getLabel: jest.fn().mockReturnValue('Custom Label'),
      },
    };

    const result = getDetailsFieldLabel({ entry, isGenericObject: false });
    expect(result).toBe('Custom Label');
    expect(entry.renderConfig?.getLabel).toHaveBeenCalledWith({
      key: 'testKey',
      path: 'testPath',
      value: 'testValue',
    });
  });

  it('should return the key if renderConfig.getLabel is not defined', () => {
    const entry: WorkflowHistoryEventDetailsEntry = {
      key: 'testKey',
      path: 'testPath',
      value: 'testValue',
      renderConfig: {
        name: 'Mock render config without custom label',
        customMatcher: () => true,
      },
    };

    const result = getDetailsFieldLabel({ entry, isGenericObject: false });
    expect(result).toBe('testKey');
  });

  it('should append the number of entries to label if isGenericObject is true', () => {
    const entry: WorkflowHistoryEventDetailsEntry = {
      key: 'testKey',
      path: 'testPath',
      value: { a: 1, b: 2 },
      renderConfig: {
        name: 'Mock render config with custom label',
        customMatcher: () => true,
        getLabel: jest.fn().mockReturnValue('Custom Label'),
      },
    };

    const result = getDetailsFieldLabel({ entry, isGenericObject: true });
    expect(result).toBe('Custom Label (2)');
  });

  it('should append the number of entries to key if isGenericObject is true', () => {
    const entry: WorkflowHistoryEventDetailsEntry = {
      key: 'testKey',
      path: 'testPath',
      value: { a: 1, b: 2 },
      renderConfig: {
        name: 'Mock render config without custom label',
        customMatcher: () => true,
      },
    };

    const result = getDetailsFieldLabel({ entry, isGenericObject: true });
    expect(result).toBe('testKey (2)');
  });
});
