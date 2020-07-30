const getFilterBy = (status) => status === 'OPEN' ? 'StartTime' : 'CloseTime';
export default getFilterBy;
