import getQueryParams from './get-query-params';

describe('getQueryParams', () => {
  describe('When startTime = undefined and endTime = "2020-03-30T00:00:00Z"', () => {
    it('should return null.', () => {
      const startTime = undefined;
      const endTime = '2020-03-30T00:00:00Z';
      const output = getQueryParams({ endTime, startTime });

      expect(output).toEqual(null);
    });
  });

  describe('When startTime = "2020-03-01T00:00:00Z" and endTime = undefined', () => {
    it('should return null.', () => {
      const startTime = '2020-03-01T00:00:00Z';
      const endTime = undefined;
      const output = getQueryParams({ endTime, startTime });

      expect(output).toEqual(null);
    });
  });

  describe('When startTime = "2020-03-01T00:00:00Z" and endTime = "2020-03-30T00:00:00Z"', () => {
    let startTime;
    let endTime;

    beforeEach(() => {
      startTime = '2020-03-01T00:00:00Z';
      endTime = '2020-03-30T00:00:00Z';
    });

    it('should return startTime.', () => {
      const output = getQueryParams({ endTime, startTime });

      expect(output.startTime).toEqual(startTime);
    });

    it('should return endTime.', () => {
      const output = getQueryParams({ endTime, startTime });

      expect(output.endTime).toEqual(endTime);
    });

    describe('and statusValue = "-1"', () => {
      it('should not include status.', () => {
        const statusValue = '-1';
        const output = getQueryParams({ endTime, startTime, statusValue });

        expect(output.status).toEqual(undefined);
      });
    });

    describe('and statusValue = "0"', () => {
      it('should return status = "0".', () => {
        const statusValue = '0';
        const output = getQueryParams({ endTime, startTime, statusValue });

        expect(output.status).toEqual('0');
      });
    });

    describe('and workflowId = "abcd"', () => {
      it('should return workflowId = "abcd".', () => {
        const workflowId = 'abcd';
        const output = getQueryParams({ endTime, startTime, workflowId });

        expect(output.workflowId).toEqual('abcd');
      });
    });

    describe('and workflowName = "workflow.name"', () => {
      it('should return workflowName = "workflow.name".', () => {
        const workflowName = 'workflow.name';
        const output = getQueryParams({ endTime, startTime, workflowName });

        expect(output.workflowName).toEqual('workflow.name');
      });
    });
  });
});
