// polyfills for web browser to node
import atob from 'atob';
import { jsonTryParse } from '../client/helpers';

global.atob = atob;
global.JSON.tryParse = jsonTryParse;