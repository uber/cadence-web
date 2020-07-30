const getState = ({ statusName }) => !statusName || statusName === 'OPEN' ? 'open' : 'closed';
export default getState;
