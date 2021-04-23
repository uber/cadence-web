const formatBody = require('./format-body');
const formatMethod = require('./format-method');
const formatRequestName = require('./format-request-name');
const uiTransform = require('./ui-transform');
const {
  REQUEST_CONFIG,
} = require('../constants');

const makeRequest = ({
  authTokenHeaders,
  channel,
  ctx,
}) => ({
  method,
  requestName,
  bodyTransform,
  responseTransform,
}) => body => new Promise((resolve, reject) => {
  try {
    channel
      .request(REQUEST_CONFIG)
      .send(
        formatMethod(method),
        {
          ...authTokenHeaders,
        },
        {
          [formatRequestName(requestName)]: formatBody({ body, bodyTransform }),
        },
        (error, response) => {
          try {
            if (error) {
              reject(error);
            } else if (response.ok) {
              resolve((responseTransform || uiTransform)(response.body));
            } else {
              ctx.throw(
                response.typeName === 'entityNotExistError' ? 404 : 400,
                null,
                response.body || response
              );
            }
          } catch (error) {
            reject(error);
          }
        }
      );
  } catch (error) {
    reject(error);
  }
});

module.exports = makeRequest;
