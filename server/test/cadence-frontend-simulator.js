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

const supertest = require('supertest');
const Long = require('long');
const moment = require('moment');
const mockGRPC = require('./mock-grpc');
const mockTChannel = require('./mock-tchannel');

let app;
let closeClient;
let closeServer;
let setCurrentTest;

global.should = require('chai').should();

global.dateToLong = d => Long.fromValue(Number(new Date(d))).mul(1000000);

global.dateToTimestamp = d => ({
  seconds: moment(d).unix(),
});

before(function(done) {
  process.env.CADENCE_TCHANNEL_PEERS = '127.0.0.1:11343';
  process.env.TRANSPORT_CLIENT_TYPE = 'tchannel';

  switch (process.env.TRANSPORT_CLIENT_TYPE) {
    case 'tchannel': {
      mocks = mockTChannel(done);
      closeClient = mocks.closeClient;
      closeServer = mocks.closeServer;
      setCurrentTest = mocks.setCurrentTest;
      break;
    }
    case 'grpc': {
      mocks = mockGRPC(done);
      closeClient = mocks.closeClient;
      closeServer = mocks.closeServer;
      setCurrentTest = mocks.setCurrentTest;
      break;
    }
    default: {
      throw new Error(
        `Unsupported client type: "${process.env.TRANSPORT_CLIENT_TYPE}". Only support 'tchannel' or 'grpc'.`
      );
    }
  }

  app = require('../')
    .init({ useWebpack: false, logErrors: false })
    .listen();
  global.request = supertest.bind(supertest, app);
});

after(function() {
  app.close();
  closeClient();
  closeServer();
});

beforeEach(function() {
  setCurrentTest(this.currentTest);
});
