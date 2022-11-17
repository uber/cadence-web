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

import { eventFullTransforms } from './event-full-transforms';

describe('eventFullTransforms', () => {
  describe('MarkerRecorded', () => {
    describe('When passed event.markerName === "SideEffect" from Go Client', () => {
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

    describe('When passed event.markerName === "SideEffect" from Java Client', () => {
      let event;

      beforeEach(() => {
        event = {
          decisionTaskCompletedEventId: 'decisionTaskCompletedEventIdValue',
          details: true,
          header: null,
          markerName: 'SideEffect',
        };
      });

      it('should return true with property data.', () => {
        const output = eventFullTransforms.MarkerRecorded(event);

        expect(output.data).toEqual(true);
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
