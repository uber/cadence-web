import { ROUTE_PARAMS } from './getter-types';
import { get } from 'lodash-es';

const getters = {
  [ROUTE_PARAMS]: (state) => get(state, 'route.params', {}),
};

export default getters;
