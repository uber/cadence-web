// Copyright (c) 2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { connect } from 'vuex-connect';
import { DOMAIN_IS_READY } from '../domain/getter-types';
import { CROSS_REGION } from '../cross-region/getter-types';
import {
  ACTIVE_STATUS_CLUSTER,
  ACTIVE_STATUS_SELECT_LIST,
  ACTIVE_STATUS_CLASSNAME,
  ACTIVE_STATUS_LABEL,
  ACTIVE_STATUS_TAG,
} from './getter-types';

const gettersToProps = {
  classname: ACTIVE_STATUS_CLASSNAME,
  cluster: ACTIVE_STATUS_CLUSTER,
  crossRegion: CROSS_REGION,
  selectList: ACTIVE_STATUS_SELECT_LIST,
  isReady: DOMAIN_IS_READY,
  label: ACTIVE_STATUS_LABEL,
  tag: ACTIVE_STATUS_TAG,
};

export default connect({
  gettersToProps,
});
