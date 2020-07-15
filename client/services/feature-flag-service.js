import { http } from '~helpers';

const URL_BASE = '/api/feature-flags/';

class FeatureFlagService {
  async isFeatureFlagEnabled({ name = '', params = {} }) {
    const queryParams = Object
      .keys(params)
      .map((queryName) =>
        encodeURIComponent(queryName) + '=' + encodeURIComponent(params[queryName])
      )
      .join('&') || '';

    const url = [URL_BASE, name, queryParams && '?', queryParams].join('');
    return (await http(window.fetch, url)).value;
  }
};

export default FeatureFlagService;
