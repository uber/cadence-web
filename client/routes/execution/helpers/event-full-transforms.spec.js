import { eventFullTransforms } from './event-full-transforms';

describe('eventFullTransforms', () => {
  describe('MarkerRecorded', () => {
    describe('When passed event.markerName === "SideEffect"', () => {
      let event;

      beforeEach(() => {
        event = {
          decisionTaskCompletedEventId: 'decisionTaskCompletedEventIdValue',
          details: [
            'sideEffectIdValue',
            'eyAiaGVsbG8iOiAid29ybGQiIH0', // { "hello": "world" }
          ],
          markerName: 'SideEffect',
        };
      });

      it('should return an object with property sideEffectID.', () => {
        const output = eventFullTransforms.MarkerRecorded(event);

        expect(output.sideEffectID).toEqual('sideEffectIdValue');
      });

      it('should return an object with property data.', () => {
        const output = eventFullTransforms.MarkerRecorded(event);

        expect(output.data).toEqual({ hello: 'world' });
      });

      it('should return an object with property decisionTaskCompletedEventId.', () => {
        const output = eventFullTransforms.MarkerRecorded(event);

        expect(output.decisionTaskCompletedEventId).toEqual(
          'decisionTaskCompletedEventIdValue'
        );
      });
    });
  });

  describe('When passed event.markerName !== "SideEffect"', () => {
    let event;

    beforeEach(() => {
      event = {
        decisionTaskCompletedEventId: 'decisionTaskCompletedEventIdValue',
        details: [
          'sideEffectIdValue',
          'eyAiaGVsbG8iOiAid29ybGQiIH0', // { "hello": "world" }
        ],
        markerName: 'NotSideEffect',
      };
    });

    it('should return original event object.', () => {
      const output = eventFullTransforms.MarkerRecorded(event);

      expect(output).toEqual(event);
    });
  });
});
