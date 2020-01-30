import getEventFullDetails from './get-event-full-details';

jest.mock('../../../helpers');

describe('getEventFullDetails', () => {
  describe('When passed no event', () => {
    it('should return what was passed.', () => {
      const output = getEventFullDetails(false);

      expect(output).toEqual(false);
    });
  });

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
      const output = getEventFullDetails(event);

      expect(output.key).toEqual('value');
    });

    it('should return an object with eventId.', () => {
      const output = getEventFullDetails(event);

      expect(output.eventId).toEqual('eventIdValue');
    });

    it('should return an object with eventType.', () => {
      const output = getEventFullDetails(event);

      expect(output.eventType).toEqual('eventTypeValue');
    });

    it('should return an object with kvps.', () => {
      const output = getEventFullDetails(event);

      expect(output.kvps).toEqual('kvpsMock');
    });
  });
});
