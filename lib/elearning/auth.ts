import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const LEARNER_COOKIE_NAME = "lt_learner";
export const LEARNER_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export interface LearnerSessionClaims extends JWTPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  courseSlug: string;
}

function getSecret(): Uint8Array {
  const raw = process.env.ELEARNING_JWT_SECRET;
  if (!raw || raw.length < 32) {
    throw new Error(
      "ELEARNING_JWT_SECRET is missing or too short (min 32 chars). See .env.example."
    );
  }
  return new TextEncoder().encode(raw);
}

export async function signLearnerToken(
  claims: Omit<LearnerSessionClaims, "iat" | "exp">
): Promise<string> {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("learntechnique-elearning")
    .setAudience("learner")
    .setExpirationTime(`${LEARNER_COOKIE_MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

export async function verifyLearnerToken(
  token: string | undefined | null
): Promise<LearnerSessionClaims | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: "learntechnique-elearning",
      audience: "learner",
    });
    if (
      typeof payload.sub === "string" &&
      typeof payload.email === "string" &&
      typeof payload.courseSlug === "string"
    ) {
      return payload as LearnerSessionClaims;
    }
    return null;
  } catch {
    return null;
  }
}

export function learnerCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProd,
    path: "/",
    maxAge: LEARNER_COOKIE_MAX_AGE_SECONDS,
  };
}
