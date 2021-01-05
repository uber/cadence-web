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

import getEscapedHashString from './get-escaped-hash-string';

describe('getEscapedHashString', () => {
  it('should escape one hash and convert to %23.', () => {
    const input = '#';
    const output = getEscapedHashString(input);

    expect(output).toEqual('%23');
  });

  it('should escape many hashes and convert each to %23.', () => {
    const input = '###';
    const output = getEscapedHashString(input);

    expect(output).toEqual('%23%23%23');
  });

  it('should convert hashes in a string containing other characters with hash.', () => {
    const input = 'hello#world';
    const output = getEscapedHashString(input);

    expect(output).toEqual('hello%23world');
  });

  it('should not do anything if string does not contain hash.', () => {
    const input = 'helloworld';
    const output = getEscapedHashString(input);

    expect(output).toEqual('helloworld');
  });
});
