// Valid HTTP header name characters (RFC 9110 §5.1 / §5.6.2).
// https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.2
export const HTTP_HEADER_NAME_PATTERN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

// Valid grpc-js metadata key characters.
// https://github.com/grpc/grpc-node/blob/master/packages/grpc-js/src/metadata.ts
export const GRPC_METADATA_KEY_PATTERN = /^[0-9a-z_.-]+$/i;

export const TRUSTED_HEADER_GRPC_METADATA_ENV =
  'CADENCE_WEB_TRUSTED_HEADER_GRPC_METADATA';
