import { ROUTE_PARAMS, ROUTE_QUERY } from './getter-types';
import { get } from 'lodash-es';

const getters = {
  [ROUTE_PARAMS]: (state) => get(state, 'route.params', {}),
  [ROUTE_QUERY]: (state) => get(state, 'route.query', {}),
};

export default getters;
