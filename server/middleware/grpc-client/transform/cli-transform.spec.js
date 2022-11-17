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

const btoa = require('btoa');
const Long = require('long');
const cliTransform = require('./cli-transform');

describe('cliTransform', () => {
  it('should return null when passed null.', () => {
    const output = cliTransform(null);

    expect(output).toEqual(null);
  });

  it('should return a string when passed a string.', () => {
    const output = cliTransform('hello world');

    expect(output).toEqual('hello world');
  });

  it('should convert an object with a key "input" to base64 string.', () => {
    const expectedOutput = {
      input:
        'eyJlbWFpbHMiOlsiamFuZUBleGFtcGxlLmNvbSIsImJvYkBleGFtcGxlLmNvbSJdLCJpbmNsdWRlRm9vdGVyIjp0cnVlfQ==',
    };
    const input = {
      input: btoa(
        JSON.stringify({
          emails: ['jane@example.com', 'bob@example.com'],
          includeFooter: true,
        })
      ),
    };
    const output = cliTransform(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should convert an object with value type of long to lossless number.', () => {
    const expectedOutput = {
      timestamp: {
        isLosslessNumber: true,
        type: 'LosslessNumber',
        value: '1510701867531262273',
      },
    };
    const input = {
      timestamp: new Long(800610625, 351737688, false),
    };
    const output = cliTransform(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should convert an object with value of Buffer to base64 string.', () => {
    const expectedOutput = {
      buffer:
        'eyJlbWFpbHMiOlsiamFuZUBleGFtcGxlLmNvbSIsImJvYkBleGFtcGxlLmNvbSJdLCJpbmNsdWRlRm9vdGVyIjp0cnVlfQ==',
    };
    const input = {
      buffer: Buffer.from(
        JSON.stringify({
          emails: ['jane@example.com', 'bob@example.com'],
          includeFooter: true,
        })
      ),
    };
    const output = cliTransform(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should parse an array of an object.', () => {
    const expectedOutput = {
      innerArray: [
        {
          input:
            'eyJlbWFpbHMiOlsiamFuZUBleGFtcGxlLmNvbSIsImJvYkBleGFtcGxlLmNvbSJdLCJpbmNsdWRlRm9vdGVyIjp0cnVlfQ==',
        },
      ],
    };
    const input = {
      innerArray: [
        {
          input: btoa(
            JSON.stringify({
              emails: ['jane@example.com', 'bob@example.com'],
              includeFooter: true,
            })
          ),
        },
      ],
    };
    const output = cliTransform(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should parse sub objects of an object.', () => {
    const expectedOutput = {
      innerObject: {
        input:
          'eyJlbWFpbHMiOlsiamFuZUBleGFtcGxlLmNvbSIsImJvYkBleGFtcGxlLmNvbSJdLCJpbmNsdWRlRm9vdGVyIjp0cnVlfQ==',
      },
    };
    const input = {
      innerObject: {
        input: btoa(
          JSON.stringify({
            emails: ['jane@example.com', 'bob@example.com'],
            includeFooter: true,
          })
        ),
      },
    };
    const output = cliTransform(input);

    expect(output).toEqual(expectedOutput);
  });

  it("should remove a key from an object if it's value is null.", () => {
    const expectedOutput = {};
    const input = {
      deletedParam: null,
    };
    const output = cliTransform(input);

    expect(output).toEqual(expectedOutput);
  });
});
