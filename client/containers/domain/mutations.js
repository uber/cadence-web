// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  DOMAIN_RESET_STATE,
  DOMAIN_SET_DOMAIN,
  DOMAIN_SET_ERROR,
} from './mutation-types';

const mutations = {
  [DOMAIN_RESET_STATE]: (state, domainName) => {
    state.domain.domainHash = {
      ...state.domain.domainHash,
      [domainName]: {},
    };
  },
  [DOMAIN_SET_DOMAIN]: (state, domain) => {
    const {
      domainInfo: { name: domainName },
      isGlobalDomain,
      replicationConfiguration: { activeClusterName },
    } = domain;

    if (isGlobalDomain) {
      return (state.domain.domainHash = {
        ...state.domain.domainHash,
        [domainName]: {
          global: domain,
        },
      });
    }

    if (!state.domain.domainHash[domainName].local) {
      return (state.domain.domainHash = {
        ...state.domain.domainHash,
        [domainName]: {
          local: [domain],
        },
      });
    }

    const matchIndex = state.domain.domainHash[domainName].local.findIndex(
      ({
        replicationConfiguration: { activeClusterName: matchActiveClusterName },
      }) => matchActiveClusterName === activeClusterName
    );

    if (matchIndex === -1) {
      return (state.domain.domainHash = {
        ...state.domain.domainHash,
        [domainName]: {
          local: [...state.domain.domainHash[domainName].local, domain],
        },
      });
    }

    state.domain.domainHash[domainName].local.splice(matchIndex, 1, domain);

    state.domain.domainHash = {
      ...state.domain.domainHash,
      [domainName]: {
        local: [...state.domain.domainHash[domainName].local],
      },
    };
  },
  [DOMAIN_SET_ERROR]: (state, { domainName, error }) => {
    state.domain.domainHash = {
      ...state.domain.domainHash,
      [domainName]: {
        error,
      },
    };
  },
};

export default mutations;
