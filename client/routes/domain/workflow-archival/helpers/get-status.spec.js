import getStatus from './get-status';

describe('getStatus', () => {
  describe('When statusList = [{ value: "-1" }, { value: "0" }]', () => {
    const statusList = [{ value: '-1' }, { value: '0' }];

    describe('and statusValue = undefined', () => {
      it('should return value = "-1" }.', () => {
        const statusValue = undefined;
        const output = getStatus({ statusList, statusValue });

        expect(output.value).toEqual('-1');
      });
    });

    describe('and statusValue = "0"', () => {
      it('should return value = "0" }.', () => {
        const statusValue = '0';
        const output = getStatus({ statusList, statusValue });

        expect(output.value).toEqual('0');
      });
    });
  });
});
