const getTimeStampDisplay = ({ timestamp }, index) =>
  !timestamp || index === -1 ? '' : timestamp.format('MMM Do h:mm:ss a');

export default getTimeStampDisplay;
