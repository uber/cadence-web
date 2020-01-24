function jsonTryParse() {
  try {
    return JSON.parse.apply(this, arguments);
  } catch (e) { }
}

export default jsonTryParse;
