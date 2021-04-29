import { FILTER_MODE_ADVANCED, FILTER_MODE_BASIC } from '../constants';

const toggleFilterMode = filterMode => filterMode === FILTER_MODE_ADVANCED ? FILTER_MODE_BASIC : FILTER_MODE_ADVANCED;

export default toggleFilterMode;
