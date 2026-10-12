import { TRUSTED_HEADER_GRPC_METADATA_ENV } from '@/utils/auth/strategies/trusted-header/parse-trusted-header-grpc-metadata-map.constants';
import parseTrustedHeaderGrpcMetadataMap from '@/utils/auth/strategies/trusted-header/parse-trusted-header-grpc-metadata-map';

import authStrategy from '../auth-strategy';
import trustedHeaderAuthConfig from '../trusted-header-auth-config';

jest.mock('../auth-strategy', () => jest.fn(() => 'trusted-header'));
jest.mock(
  '@/utils/auth/strategies/trusted-header/parse-trusted-header-grpc-metadata-map',
  () => jest.fn(() => [{ inboundHeader: 'x-user', outboundKey: 'user' }])
);

const mockAuthStrategy = authStrategy as jest.Mock;
const mockParse = parseTrustedHeaderGrpcMetadataMap as jest.Mock;

describe(trustedHeaderAuthConfig.name, () => {
  const originalEnv = process.env[TRUSTED_HEADER_GRPC_METADATA_ENV];

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env[TRUSTED_HEADER_GRPC_METADATA_ENV];
    mockAuthStrategy.mockReturnValue('trusted-header');
    mockParse.mockReturnValue([
      { inboundHeader: 'x-user', outboundKey: 'user' },
    ]);
  });

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env[TRUSTED_HEADER_GRPC_METADATA_ENV];
    } else {
      process.env[TRUSTED_HEADER_GRPC_METADATA_ENV] = originalEnv;
    }
  });

  it('returns null when the strategy is not trusted-header', () => {
    mockAuthStrategy.mockReturnValue('jwt');

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
