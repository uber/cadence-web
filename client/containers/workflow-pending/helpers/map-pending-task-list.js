import { getKeyValuePairs } from '~helpers';
import {
  PENDING_TASK_KVPS_EXCLUDE_KEYS,
} from '../constants';

const mapWithKvps = item => {
  const kvps = getKeyValuePairs({
    excludes: PENDING_TASK_KVPS_EXCLUDE_KEYS,
    item,
  });

  return {
    ...item,
    kvps,
  };
};

const mapPendingTaskList = (pendingTaskList) => pendingTaskList.map(mapWithKvps);

export default mapPendingTaskList;
