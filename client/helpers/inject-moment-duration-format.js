import moment from 'moment';

const injectMomentDurationFormat = () => {
  Object.getPrototypeOf(
    moment.duration(2, 'seconds')
  ).format = function format() {
    return this.toString()
      .toLowerCase()
      .replace(/[pt]/g, '')
      .replace(/([hmd])/g, '$1 ')
      .replace(/\.\d{1,3}s/, 's')
      .replace('0d ', '')
      .trim();
  };
};

export default injectMomentDurationFormat;
