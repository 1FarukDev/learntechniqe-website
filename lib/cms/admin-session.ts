import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const CMS_ADMIN_COOKIE_NAME = "lt_cms_admin";
export const CMS_ADMIN_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8;

export interface CmsAdminSessionClaims extends JWTPayload {
  role: "cms-content-admin";
}

function getCmsAdminSecretBytes(): Uint8Array {
  const s =
    process.env.CMS_ADMIN_JWT_SECRET || process.env.ELEARNING_JWT_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "Set CMS_ADMIN_JWT_SECRET (or ELEARNING_JWT_SECRET) to at least 16 characters for CMS admin sessions.",
    );
  }
  return new TextEncoder().encode(s);
}

export async function signCmsAdminSessionToken(): Promise<string> {
  return new SignJWT({ role: "cms-content-admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setSubject("cms-admin")
    .setIssuer("learntechnique-cms")
    .setAudience("cms-content-admin")
    .setExpirationTime(`${CMS_ADMIN_COOKIE_MAX_AGE_SECONDS}s`)
    .sign(getCmsAdminSecretBytes());
}

export async function verifyCmsAdminSessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getCmsAdminSecretBytes(), {
      issuer: "learntechnique-cms",
      audience: "cms-content-admin",
    });
    return payload.role === "cms-content-admin";
  } catch {
    return false;
  }
}

export function cmsAdminCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProd,
    path: "/",
    maxAge: CMS_ADMIN_COOKIE_MAX_AGE_SECONDS,
  };
}
