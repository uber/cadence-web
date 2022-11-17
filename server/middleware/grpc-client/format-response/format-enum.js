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

const lowerCase = require('lodash.lowercase');
const snakeCase = require('lodash.snakecase');
const startCase = require('lodash.startcase');
const { combine } = require('../../../helpers');

const convertToUpper = value => value.toUpperCase();

const upperSnakeCase = combine(snakeCase, convertToUpper);

const removeWhiteSpace = value => value.replace(/\s/g, '');

const pascalCase = combine(lowerCase, startCase, removeWhiteSpace);

const caseFormatterMap = {
  snake: upperSnakeCase,
  pascal: pascalCase,
};

const formatEnum = (value, prefix, caseFormat = 'snake') => {
  if (!value || value.includes('INVALID')) {
    return null;
  }

  const valueRemovedPrefix = value.replace(`${prefix}_`, '');
  const caseFormatter = caseFormatterMap[caseFormat];

  return caseFormatter(valueRemovedPrefix);
};

module.exports = formatEnum;
