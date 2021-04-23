const formatBody = ({ body, bodyTransform }) => typeof bodyTransform === 'function'
  ? bodyTransform(body)
  : body;

module.exports = formatBody;
