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

const Long = require('long');
const moment = require('moment');

const uiTransform = item => {
  if (!item || typeof item !== 'object') {
    return item;
  }

  Object.entries(item).forEach(([subkey, subvalue]) => {
    if (subvalue && typeof subvalue.unsigned === 'boolean') {
      item[subkey] = Long.fromValue(subvalue).toNumber();
      const m = moment(item[subkey] / 1000000);

      if (m.isValid() && m.isAfter('2017-01-01')) {
        item[subkey] = m.toISOString();
      }
    } else if (Buffer.isBuffer(subvalue)) {
      if (subkey === 'nextPageToken') {
        item.nextPageToken = subvalue.toString('base64');

        return;
      }

      const stringval = subvalue.toString('utf8');

      try {
        // most of Cadence's uses of buffer is just line-delimited JSON.
        item[subkey] = stringval
          .split('\n')
          .filter(x => x)
          .map(JSON.parse);

        if (item[subkey].length === 1) {
          item[subkey] = item[subkey][0];
        }
      } catch (e) {
        item[`${subkey}_base64`] = subvalue.toString('base64');
        item[subkey] = stringval;
      }
    } else if (Array.isArray(subvalue)) {
      subvalue.forEach(uiTransform);
    } else if (subvalue && typeof subvalue === 'object') {
      uiTransform(subvalue);
    }
  });

  return item;
};

module.exports = uiTransform;
