import getErrorMessage from './get-error-message';
import { NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT } from '~constants';

describe('getErrorMessage', () => {
  describe('When passing error.json.message', () => {
    it('should return error.json.message', () => {
      const error = {
        json: {
          message: 'error.json.message value',
        },
      };
      const output = getErrorMessage(error);

      expect(output).toEqual('error.json.message value');
    });
  });

  describe('When passing error.status', () => {
    it('should return error.status', () => {
      const error = {
        status: 'error.status value',
      };
      const output = getErrorMessage(error);

      expect(output).toEqual('error.status value');
    });
  });

  describe('When passing error.message', () => {
    it('should return error.message', () => {
      const error = {
        message: 'error.message value',
      };
      const output = getErrorMessage(error);

      expect(output).toEqual('error.message value');
    });
  });

  describe('When passing no error', () => {
    it('should return NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT', () => {
      const error = undefined;
      const output = getErrorMessage(error);

      expect(output).toEqual(NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT);
    });
  });
});
