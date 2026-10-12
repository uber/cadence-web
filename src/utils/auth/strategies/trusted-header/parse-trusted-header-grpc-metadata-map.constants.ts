// RFC 9110 token — a valid HTTP header name. Invalid names throw per request
// in Headers.get; boot validation turns that into a boot failure.
export const HTTP_HEADER_NAME_PATTERN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

// grpc-js metadata keys. -bin keys require Buffer values, which a
// string-only mapping cannot produce — grpc-js throws per call on both.
export const GRPC_METADATA_KEY_PATTERN = /^[0-9a-z_.-]+$/i;

export const TRUSTED_HEADER_GRPC_METADATA_ENV =
  'CADENCE_WEB_TRUSTED_HEADER_GRPC_METADATA';
