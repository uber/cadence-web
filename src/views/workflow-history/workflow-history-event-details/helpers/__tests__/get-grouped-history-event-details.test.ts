import { createElement } from 'react';

import getGroupedHistoryEventDetails from '../get-grouped-history-event-details';
import getHistoryEventFieldRenderConfig from '../get-history-event-field-render-config';

jest.mock('../get-history-event-field-render-config', () => jest.fn());

const mockedGetHistoryEventFieldRenderConfig =
  getHistoryEventFieldRenderConfig as jest.Mock;

describe('getGroupedHistoryEventDetails', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedGetHistoryEventFieldRenderConfig.mockReturnValue({
      name: 'Mock render config',
      customMatcher: () => false,
    });
  });

  it('should return an empty object when details is empty, null or undefined', () => {
    expect(getGroupedHistoryEventDetails({ details: {} })).toEqual({});
    // @ts-expect-error testing null
    expect(getGroupedHistoryEventDetails({ details: null })).toEqual({});
    // @ts-expect-error testing undefined
    expect(getGroupedHistoryEventDetails({ details: undefined })).toEqual({});
  });

  it('should group nested object details correctly', () => {
    const details = {
      event1: {
        subEvent1: { data: 'value1' },
        subEvent2: { data: 'value2' },
      },
      event2: 'value3',
    };

    const expected = {
      event1: {
        'subEvent1.data': 'value1',
        'subEvent2.data': 'value2',
      },
      event2: 'value3',
    };

    const result = getGroupedHistoryEventDetails({ details });
    expect(result).toEqual(expected);
  });

  it('should group array details correctly', () => {
    const details = {
      metadata: {
        events: ['event1', 'event2', 'event3'],
      },
    };

    // TODO @adhitya.mamallan - we may need to revisit how we handle arrays
    const expected = {
      'metadata.events': {
        '0': 'event1',
        '1': 'event2',
        '2': 'event3',
      },
    };

    const result = getGroupedHistoryEventDetails({ details });
    expect(result).toEqual(expected);
  });

  it('should handle single nested object correctly', () => {
    const details = {
      event1: {
        subEvent1: {
          subSubEvent1: 'value1',
        },
      },
    };

    const expected = {
      'event1.subEvent1.subSubEvent1': 'value1',
    };

    const result = getGroupedHistoryEventDetails({ details });
    expect(result).toEqual(expected);
  });

  it('should respect renderConfig hide function', () => {
    mockedGetHistoryEventFieldRenderConfig.mockReturnValue({
      name: 'Mock render config that always matches and hides',
      customMatcher: () => true,
      hide: () => true,
    });

    const details = {
      event1: 'value1',
    };

    const result = getGroupedHistoryEventDetails({ details });
    expect(result).toEqual({});
  });

  it('should leave the object untouched if renderConfig has a value component', () => {
    mockedGetHistoryEventFieldRenderConfig.mockReturnValue({
      name: 'Mock render config with value component that always matches',
      customMatcher: () => true,
      valueComponent: (args: any) => createElement('div', {}, args),
    });

    const details = {
      event1: {
        subEvent1: {
          subSubEvent1: 'value1',
        },
      },
    };

    const expected = {
      event1: {
        subEvent1: {
          subSubEvent1: 'value1',
        },
      },
    };

    const result = getGroupedHistoryEventDetails({ details });
    expect(result).toEqual(expected);
  });
});
