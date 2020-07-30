const getFetchUrl = ({ domain, queryString, state }) => {
  if (queryString) {
    return `/api/domains/${domain}/workflows/list`;
  }

  return `/api/domains/${domain}/workflows/${state}`;
};

export default getFetchUrl;
