function jsonTryParse(...args) {
  try {
    return JSON.parse.apply(this, args);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('JSON.parse failed for args:', args);
  }

  return undefined;
}

export default jsonTryParse;
