### OIDC
When enabled, Cadence WEB will check if auth token is set in session, if not, user will be redirected to login page to aquire new token. Then token will be attached to all requests sent to Cadence server. Cadence server has to be configured to check and validate those tokens. If OAuth is not enabled on Cadence server side, no tokens sent by Cadence WEB will be validated. 

### Configuration

OIDC can be configured using `server/config/oidc.js` or providing environment variables with values.

| oidc.js variable| Environment Key| Description |
|--|--|--|
| clientID| OPENID_CLIENT_ID | The client ID provided by your OpenID Connect provider. |
| clientSecret | OPENID_CLIENT_SECRET | The client secret provided by your OpenID Connect provider. |
| callbackURL | OPENID_CALLBACK_URL | The callback URL that your OpenID provider will redirect to after authentication.|
| discoverURL | OPENID_DISCOVER_URL | The discovery URL of your OpenID provider, used to retrieve metadata (issuer, token endpoints, etc.)|

