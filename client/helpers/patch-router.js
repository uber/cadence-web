
export default (router) => {
  Object.getPrototypeOf(router).replaceQueryParam = function replaceQueryParam(
    prop,
    val
  ) {
    const newQuery = {
      ...this.currentRoute.query,
      [prop]: val,
    };

    if (!newQuery[prop]) {
      delete newQuery[prop];
    }

    this.replace({ query: newQuery });
  };
};
