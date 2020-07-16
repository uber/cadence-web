import { getQueryStringFromObject, http } from '~helpers';

const URL_BASE = '/api/feature-flags/';

class FeatureFlagService {
  async isFeatureFlagEnabled({ name = '', params = {} }) {
    const queryParams = getQueryStringFromObject(params);
    const url = [URL_BASE, name, queryParams].join('');
    return (await http(window.fetch, url)).value;
  }
};

export default FeatureFlagService;
