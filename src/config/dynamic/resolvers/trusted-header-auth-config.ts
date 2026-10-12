import authStrategy from './auth-strategy';
import {
  type TrustedHeaderAuthConfig,
  type TrustedHeaderGrpcMetadataMapping,
} from './trusted-header-auth-config.types';

function parseGrpcMetadataMap(
  raw: string | undefined
): TrustedHeaderGrpcMetadataMapping[] {
  if (!raw?.trim()) {
    return [];
  }

  return raw.split(',').map((pair) => {
    const [inboundHeader, outboundKey] = pair.split(':').map((s) => s.trim());
    if (!inboundHeader || !outboundKey) {
      throw new Error(
        `CADENCE_WEB_TRUSTED_HEADER_GRPC_METADATA entry "${pair}" must be "inbound-header:outbound-key"`
      );
    }
    return { inboundHeader, outboundKey };
  });
}

/**
 * Parse trusted-header env at serverStart. Null when strategy ≠ trusted-header.
 *
 * Only map headers the proxy overwrites. Node `headers.get` joins duplicates
 * with ", ", so if the proxy appends, a client-supplied prefix reaches gRPC
 * metadata (e.g. client `X-User-Id: evil` + proxy append → `"evil, real"`).
 */
export default function trustedHeaderAuthConfig(): TrustedHeaderAuthConfig | null {
  // cast to string:trusted-header is not registered yet.
  // TODO: remove cast once trusted-header is registered.
  const strategy: string = authStrategy();
  if (strategy !== 'trusted-header') {
    return null;
  }

  return parseGrpcMetadataMap(
    process.env.CADENCE_WEB_TRUSTED_HEADER_GRPC_METADATA
  );
}
