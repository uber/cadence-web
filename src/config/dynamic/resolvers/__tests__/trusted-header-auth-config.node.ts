import parseTrustedHeaderGrpcMetadataMap from '@/utils/auth/strategies/trusted-header/parse-trusted-header-grpc-metadata-map';
import { TRUSTED_HEADER_GRPC_METADATA_ENV } from '@/utils/auth/strategies/trusted-header/parse-trusted-header-grpc-metadata-map.constants';

import trustedHeaderAuthConfig from '../trusted-header-auth-config';

jest.mock(
  '@/utils/auth/strategies/trusted-header/parse-trusted-header-grpc-metadata-map',
  () => jest.fn(() => [{ inboundHeader: 'x-user', outboundKey: 'user' }])
);

const mockParse = parseTrustedHeaderGrpcMetadataMap as jest.Mock;

const AUTH_STRATEGY_ENV = 'CADENCE_WEB_AUTH_STRATEGY';

const ENV_KEYS = [AUTH_STRATEGY_ENV, TRUSTED_HEADER_GRPC_METADATA_ENV] as const;

describe(trustedHeaderAuthConfig.name, () => {
  const originalEnv = Object.fromEntries(
    ENV_KEYS.map((key) => [key, process.env[key]])
  );

  beforeEach(() => {
    jest.clearAllMocks();
    ENV_KEYS.forEach((key) => delete process.env[key]);
    process.env[AUTH_STRATEGY_ENV] = 'trusted-header';
    mockParse.mockReturnValue([
      { inboundHeader: 'x-user', outboundKey: 'user' },
    ]);
  });

  afterEach(() => {
    ENV_KEYS.forEach((key) => {
      const value = originalEnv[key];
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    });
  });

  it('returns null when the strategy is not trusted-header', () => {
    process.env[AUTH_STRATEGY_ENV] = 'jwt';

    expect(trustedHeaderAuthConfig()).toBeNull();
    expect(mockParse).not.toHaveBeenCalled();
  });

  it('parses the trusted-header gRPC metadata env when strategy matches', () => {
    process.env[TRUSTED_HEADER_GRPC_METADATA_ENV] = 'x-user:user';

    expect(trustedHeaderAuthConfig()).toEqual([
      { inboundHeader: 'x-user', outboundKey: 'user' },
    ]);
    expect(mockParse).toHaveBeenCalledWith('x-user:user');
  });
});
