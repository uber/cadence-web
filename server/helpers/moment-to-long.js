import Long from 'long';

const momentToLong = m => Long.fromValue(m.unix()).mul(1000000000);

export default momentToLong;
