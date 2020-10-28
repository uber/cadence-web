import getQueryParams from './get-query-params';

describe('getQueryParams', () => {
  describe('When startTime = undefined, endTime = "2020-03-30T00:00:00Z", date range and close statue filters are permitted', () => {
    it('should return null.', () => {
      const startTime = undefined;
      const endTime = '2020-03-30T00:00:00Z';
      const isDateRangeFilterSupported = true;
      const isCloseStatusFilterSupported = true;
      const output = getQueryParams({
        endTime,
        startTime,
        isDateRangeFilterSupported,
        isCloseStatusFilterSupported,
      });

      expect(output).toEqual(null);
    });
  });

  describe('When startTime = "2020-03-01T00:00:00Z", endTime = undefined, date range and close statue filters are permitted', () => {
    it('should return null.', () => {
      const startTime = '2020-03-01T00:00:00Z';
      const endTime = undefined;
      const isDateRangeFilterSupported = true;
      const isCloseStatusFilterSupported = true;
      const output = getQueryParams({
        endTime,
        startTime,
        isDateRangeFilterSupported,
        isCloseStatusFilterSupported,
      });

      expect(output).toEqual(null);
    });
  });

  describe('When startTime = undefined, endTime = undefined, date range and close statue filters are not permitted', () => {
    it('should return null.', () => {
      const startTime = undefined;
      const endTime = undefined;
      const isDateRangeFilterSupported = false;
      const isCloseStatusFilterSupported = false;
      const output = getQueryParams({
        endTime,
        startTime,
        isDateRangeFilterSupported,
        isCloseStatusFilterSupported,
      });

      expect(output).toEqual(null);
    });
  });

  describe('When date range filer is not permitted', () => {
    let isDateRangeFilterSupported;

    beforeEach(() => {
      isDateRangeFilterSupported = false;
    });

    describe('and close statue filters is permitted and statusValue = "-1"', () => {
      it('should not include status.', () => {
        const isCloseStatusFilterSupported = true;
        const statusValue = '-1';
        const workflowId = 'abcd';
        const output = getQueryParams({
          statusValue,
          workflowId,
          isDateRangeFilterSupported,
          isCloseStatusFilterSupported,
        });

        expect(output.status).toEqual(undefined);
      });
    });

    describe('and close statue filters is permitted and statusValue = "0"', () => {
      it('should return status = "0".', () => {
        const isCloseStatusFilterSupported = true;
        const statusValue = '0';
        const output = getQueryParams({
          statusValue,
          isDateRangeFilterSupported,
          isCloseStatusFilterSupported,
        });

        expect(output.status).toEqual('0');
      });
    });

    describe('and close statue filters is not permitted and workflowId = "abcd"', () => {
      it('should return workflowId = "abcd".', () => {
        const isCloseStatusFilterSupported = false;
        const workflowId = 'abcd';
        const statusValue = '-1';
        const output = getQueryParams({
          statusValue,
          workflowId,
          isDateRangeFilterSupported,
          isCloseStatusFilterSupported,
        });

        expect(output.workflowId).toEqual('abcd');
        expect(output.status).toEqual(undefined);
      });
    });

    describe('and close statue filters is not permitted and and workflowName = "workflow.name"', () => {
      it('should return workflowName = "workflow.name".', () => {
        const isCloseStatusFilterSupported = false;
        const workflowName = 'workflow.name';
        const output = getQueryParams({
          workflowName,
          isDateRangeFilterSupported,
          isCloseStatusFilterSupported,
        });

        expect(output.workflowName).toEqual('workflow.name');
      });
    });
  });

  describe('When startTime = undefined, endTime = undefined, date range filer is not permitted and close statue filters is not permitted', () => {
    it('should not return null.', () => {
      const startTime = undefined;
      const endTime = undefined;
      const isDateRangeFilterSupported = false;
      const isCloseStatusFilterSupported = true;
      const output = getQueryParams({
        endTime,
        startTime,
        isDateRangeFilterSupported,
        isCloseStatusFilterSupported,
      });

      expect(output).not.toEqual(null);
    });
  });

  describe('When startTime = "2020-03-01T00:00:00Z" and endTime = "2020-03-30T00:00:00Z"', () => {
    let startTime;
    let endTime;
    let isDateRangeFilterSupported;
    let isCloseStatusFilterSupported;

    beforeEach(() => {
      startTime = '2020-03-01T00:00:00Z';
      endTime = '2020-03-30T00:00:00Z';
      isDateRangeFilterSupported = true;
      isCloseStatusFilterSupported = true;
    });

    it('should return startTime.', () => {
      const output = getQueryParams({
        endTime,
        startTime,
        isDateRangeFilterSupported,
        isCloseStatusFilterSupported,
      });

      expect(output.startTime).toEqual(startTime);
    });

    it('should return endTime.', () => {
      const output = getQueryParams({
        endTime,
        startTime,
        isDateRangeFilterSupported,
        isCloseStatusFilterSupported,
      });

      expect(output.endTime).toEqual(endTime);
    });

    describe('and statusValue = "-1"', () => {
      it('should not include status.', () => {
        const statusValue = '-1';
        const output = getQueryParams({
          endTime,
          startTime,
          statusValue,
          isDateRangeFilterSupported,
          isCloseStatusFilterSupported,
        });

        expect(output.status).toEqual(undefined);
      });
    });

    describe('and statusValue = "0"', () => {
      it('should return status = "0".', () => {
        const statusValue = '0';
        const output = getQueryParams({
          endTime,
          startTime,
          statusValue,
          isDateRangeFilterSupported,
          isCloseStatusFilterSupported,
        });

        expect(output.status).toEqual('0');
      });
    });

    describe('and workflowId = "abcd"', () => {
      it('should return workflowId = "abcd".', () => {
        const workflowId = 'abcd';
        const output = getQueryParams({
          endTime,
          startTime,
          workflowId,
          isDateRangeFilterSupported,
          isCloseStatusFilterSupported,
        });

        expect(output.workflowId).toEqual('abcd');
      });
    });

    describe('and workflowName = "workflow.name"', () => {
      it('should return workflowName = "workflow.name".', () => {
        const workflowName = 'workflow.name';
        const output = getQueryParams({
          endTime,
          startTime,
          workflowName,
          isDateRangeFilterSupported,
          isCloseStatusFilterSupported,
        });

        expect(output.workflowName).toEqual('workflow.name');
      });
    });
  });
});
