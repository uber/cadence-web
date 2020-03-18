// polyfills for web browser to node
import atob from 'atob';
import { injectMomentDurationFormat, jsonTryParse } from '~helpers';

global.atob = atob;
global.JSON.tryParse = jsonTryParse;
injectMomentDurationFormat();
