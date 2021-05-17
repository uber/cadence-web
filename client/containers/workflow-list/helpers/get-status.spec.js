import {
  STATUS_ALL,
  STATUS_CANCELED,
  STATUS_CLOSED,
  STATUS_COMPLETED,
  STATUS_CONTINUED_AS_NEW,
  STATUS_FAILED,
  STATUS_OPEN,
  STATUS_TERMINATED,
  STATUS_TIMED_OUT,
} from '../constants';
import getStatus from './get-status';

describe('getStatus', () => {
  describe('when calling getStatus with status = STATUS_ALL', () => {
    const status = STATUS_ALL;

    it('should return { value: STATUS_ALL, label: "All" }.', () => {
      const output = getStatus(status);
      expect(output.label).toEqual('All');
      expect(output.value).toEqual(STATUS_ALL);
    });
  });

  describe('when calling getStatus with status = STATUS_CANCELED', () => {
    const status = STATUS_CANCELED;

    it('should return { value: STATUS_CANCELED, label: "Cancelled" }.', () => {
      const output = getStatus(status);
      expect(output.label).toEqual('Cancelled');
      expect(output.value).toEqual(STATUS_CANCELED);
    });
  });

  describe('when calling getStatus with status = STATUS_CLOSED', () => {
    const status = STATUS_CLOSED;

    it('should return { value: STATUS_CANCELED, label: "Closed" }.', () => {
      const output = getStatus(status);
      expect(output.label).toEqual('Closed');
      expect(output.value).toEqual(STATUS_CLOSED);
    });
  });

  describe('when calling getStatus with status = STATUS_COMPLETED', () => {
    const status = STATUS_COMPLETED;

    it('should return { value: STATUS_COMPLETED, label: "Completed" }.', () => {
      const output = getStatus(status);
      expect(output.label).toEqual('Completed');
      expect(output.value).toEqual(STATUS_COMPLETED);
    });
  });

  describe('when calling getStatus with status = STATUS_CONTINUED_AS_NEW', () => {
    const status = STATUS_CONTINUED_AS_NEW;

    it('should return { value: STATUS_CONTINUED_AS_NEW, label: "Continued As New" }.', () => {
      const output = getStatus(status);
      expect(output.label).toEqual('Continued As New');
      expect(output.value).toEqual(STATUS_CONTINUED_AS_NEW);
    });
  });

  describe('when calling getStatus with status = STATUS_FAILED', () => {
    const status = STATUS_FAILED;

    it('should return { value: STATUS_FAILED, label: "Failed" }.', () => {
      const output = getStatus(status);
      expect(output.label).toEqual('Failed');
      expect(output.value).toEqual(STATUS_FAILED);
    });
  });

  describe('when calling getStatus with status = STATUS_OPEN', () => {
    const status = STATUS_OPEN;

    it('should return { value: STATUS_OPEN, label: "Open" }.', () => {
      const output = getStatus(status);
      expect(output.label).toEqual('Open');
      expect(output.value).toEqual(STATUS_OPEN);
    });
  });

  describe('when calling getStatus with status = STATUS_TERMINATED', () => {
    const status = STATUS_TERMINATED;

    it('should return { value: STATUS_TERMINATED, label: "Terminated" }.', () => {
      const output = getStatus(status);
      expect(output.label).toEqual('Terminated');
      expect(output.value).toEqual(STATUS_TERMINATED);
    });
  });

  describe('when calling getStatus with status = STATUS_TIMED_OUT', () => {
    const status = STATUS_TIMED_OUT;

    it('should return { value: STATUS_TIMED_OUT, label: "Timed Out" }.', () => {
      const output = getStatus(status);
      expect(output.label).toEqual('Timed Out');
      expect(output.value).toEqual(STATUS_TIMED_OUT);
    });
  });

  describe('when calling getStatus with status = ""', () => {
    const status = '';

    it('should return { value: STATUS_ALL, label: "All" }.', () => {
      const output = getStatus(status);
      expect(output.label).toEqual('All');
      expect(output.value).toEqual(STATUS_ALL);
    });
  });
});
