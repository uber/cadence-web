import { type TrustedHeaderGrpcMetadataMapping } from '@/utils/auth/strategies/trusted-header/parse-trusted-header-grpc-metadata-map.types';

export type { TrustedHeaderGrpcMetadataMapping };

export type TrustedHeaderAuthConfig = TrustedHeaderGrpcMetadataMapping[];
