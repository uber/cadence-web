import 'server-only';

import { type AuthContext, type AuthRequest } from '@/utils/auth/auth.types';
import getAuthenticatedUserInfo from '@/utils/auth/get-authenticated-user-info';

const UNAUTHENTICATED_CONTEXT: AuthContext = {
  authEnabled: true,
  auth: { isValidToken: false, canRefresh: false },
  isAdmin: false,
  groups: [],
};

/**
 * Build auth context from the identity adapter (the seam for Cadence WhoAmI),
 * not headers. The perimeter must strip client-supplied trusted headers; the
 * web tier only forwards them when this context is valid.
 */
export default async function resolveTrustedHeaderAuthContext(
  request: AuthRequest
): Promise<AuthContext> {
  const info = await getAuthenticatedUserInfo(request);
  if (!info) {
    return UNAUTHENTICATED_CONTEXT;
  }

  return {
    authEnabled: true,
    auth: { isValidToken: true, canRefresh: false },
    isAdmin: info.isAdmin,
    groups: [],
    id: info.id,
    userName: info.userName,
    email: info.email,
    pictureUrl: info.pictureUrl,
  };
}
