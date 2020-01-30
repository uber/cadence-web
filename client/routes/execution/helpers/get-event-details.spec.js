import getEventDetails from './get-event-details';

jest.mock('../../../helpers');

describe('getEventDetails', () => {
  describe('When passed an event', () => {
    let event;

    beforeEach(() => {
      event = {
        details: {
          key: 'value',
        },
        eventId: 'eventIdValue',
        eventType: 'eventTypeValue',
      };
    });

    it('should return an object with a copy of details.', () => {
      const output = getEventDetails(event);

      expect(output.key).toEqual('value');
    });

    it('should return an object with eventId.', () => {
      const output = getEventDetails(event);

      expect(output.eventId).toEqual('eventIdValue');
    });

    it('should return an object with eventType.', () => {
      const output = getEventDetails(event);

      expect(output.eventType).toEqual('eventTypeValue');
    });

    it('should return an object with kvps.', () => {
      const output = getEventDetails(event);

      expect(output.kvps).toEqual('kvpsMock');
    });
  });
});
