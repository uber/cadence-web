import {
  ROUTE_PUSH,
  ROUTE_REPLACE,
  ROUTE_UPDATE_QUERY,
} from './action-types';
import { ROUTE_QUERY } from './getter-types';

const actionCreator = (router) => ({
  [ROUTE_PUSH]: (_, args) => router.push(args),
  [ROUTE_REPLACE]: (_, args) => router.replace(args),
  [ROUTE_UPDATE_QUERY]: ({ getters }, args) => {
    const query = getters[ROUTE_QUERY];
    router.replace({
      query: {
        ...query,
        ...args,
      },
    });
  },
});

export default actionCreator;
