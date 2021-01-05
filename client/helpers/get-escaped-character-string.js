import getEscapedForwardSlashString from './get-escaped-forward-slash-string';
import getEscapedHashString from './get-escaped-hash-string';

const getEscapedCharacterString = str => getEscapedHashString(getEscapedForwardSlashString(str));

export default getEscapedCharacterString;
