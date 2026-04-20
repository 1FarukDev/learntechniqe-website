import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { getElearningJwtSecretBytes } from "./jwt-secret";

export const ADMIN_COOKIE_NAME = "lt_eadmin";
export const ADMIN_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

export interface AdminSessionClaims extends JWTPayload {
  role: "elearning-admin";
}

export async function signAdminSessionToken(): Promise<string> {
  return new SignJWT({ role: "elearning-admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setSubject("admin")
    .setIssuer("learntechnique-elearning")
    .setAudience("elearning-admin")
    .setExpirationTime(`${ADMIN_COOKIE_MAX_AGE_SECONDS}s`)
    .sign(getElearningJwtSecretBytes());
}

export async function verifyAdminSessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getElearningJwtSecretBytes(), {
      issuer: "learntechnique-elearning",
      audience: "elearning-admin",
    });
    return payload.role === "elearning-admin";
  } catch {
    return false;
  }
}

export function adminCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProd,
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE_SECONDS,
  };
}
