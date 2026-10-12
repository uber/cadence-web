export type TrustedHeaderGrpcMetadataMapping = {
  /** Request header name, matched case-insensitively. */
  inboundHeader: string;
  /** gRPC metadata key the value is forwarded under. */
  outboundKey: string;
};

export type TrustedHeaderAuthConfig = TrustedHeaderGrpcMetadataMapping[];
