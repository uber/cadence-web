import { WORKFLOW_EVENT_TYPE } from '~constants';

export const eventFullTransforms = {
  [WORKFLOW_EVENT_TYPE.MarkerRecorded]: d => {
    if (d.markerName === 'SideEffect') {
      return {
        sideEffectID: d.details[0],
        data: JSON.tryParse(atob(d.details[1])) || d.details[1],
        decisionTaskCompletedEventId: d.decisionTaskCompletedEventId,
      };
    }

    return d;
  },
};
