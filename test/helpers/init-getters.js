import initStore from './init-store';

const initGetters = ({ getterFns, state }) => initStore({ getters: getterFns, state }).getters;

export default initGetters;
