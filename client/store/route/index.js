import getters from './getters';
import { ROUTE_PUSH, ROUTE_REPLACE } from './action-types';
import { ROUTE_PARAMS, ROUTE_QUERY } from './getter-types';

const actionTypes = {
  ROUTE_PUSH,
  ROUTE_REPLACE,
};

const getterTypes = {
  ROUTE_PARAMS,
  ROUTE_QUERY,
};

export {
  actionTypes,
  getters,
  getterTypes,
};
