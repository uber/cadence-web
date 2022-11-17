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

const atob = require('atob');

const formatPayload = payload => {
  const data = payload?.data;

  if (!data) {
    return null;
  }

  const parsedData = atob(data);

  // try parsing as JSON
  try {
    return JSON.parse(parsedData);
  } catch (e) {
    // remove double quotes from the string
    const formattedString = parsedData.replace(/"/g, '');

    // check if it is in an Array format
    if (formattedString.includes('\n')) {
      return formattedString.split('\n').filter(Boolean);
    }

    // otherwise return as a String
    return formattedString;
  }
};

module.exports = formatPayload;
