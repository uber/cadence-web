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

import updateVisitedDomainList from './update-visited-domain-list';

describe('updateVisitedDomainList', () => {
  const getVisitedDomainList = () => [
    'domainString',
    {
      domainInfo: {
        uuid: 2,
        name: 'domainObject',
      },
    },
  ];

  describe('when value does not exist in visitedDomainList', () => {
    it('should be added to the visitedDomainList.', () => {
      const value = {
        domainInfo: {
          uuid: 3,
          name: 'domainA',
        },
      };
      const visitedDomainList = getVisitedDomainList();
      const output = updateVisitedDomainList({ value, visitedDomainList });

      expect(output).toEqual([
        'domainString',
        {
          domainInfo: {
            uuid: 2,
            name: 'domainObject',
          },
        },
        {
          domainInfo: {
            uuid: 3,
            name: 'domainA',
          },
        },
      ]);
    });
  });

  describe('when value does exist in visitedDomainList', () => {
    describe('and value is a string', () => {
      it('should return null (implies no update)', () => {
        const value = 'domainString';
        const visitedDomainList = getVisitedDomainList();
        const output = updateVisitedDomainList({ value, visitedDomainList });

        expect(output).toEqual(null);
      });
    });

    describe('and value is an object', () => {
      describe('and the matchedDomain is an object', () => {
        it('should return null (implies no update)', () => {
          const value = {
            domainInfo: {
              uuid: 2,
              name: 'domainObject',
            },
          };
          const visitedDomainList = getVisitedDomainList();
          const output = updateVisitedDomainList({ value, visitedDomainList });

          expect(output).toEqual(null);
        });
      });

      describe('and the matchedDomain is a string', () => {
        it('should update the matchedDomain in visitedDomainList with the value object.', () => {
          const value = {
            domainInfo: {
              uuid: 1,
              name: 'domainString',
            },
          };
          const visitedDomainList = getVisitedDomainList();
          const output = updateVisitedDomainList({ value, visitedDomainList });

          expect(output).toEqual([
            {
              domainInfo: {
                uuid: 1,
                name: 'domainString',
              },
            },
            {
              domainInfo: {
                uuid: 2,
                name: 'domainObject',
              },
            },
          ]);
        });
      });
    });
  });
});
