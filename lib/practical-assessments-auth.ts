export const PRACTICAL_COOKIE_NAME = "lt_practical_access";
const PRACTICAL_COOKIE_VALUE = "granted";
const PRACTICAL_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function getConfiguredPracticalPassword(): string | null {
  const fromEnv = process.env.PRACTICAL_ASSESSMENTS_PASSWORD;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv;
  }
  return null;
}

export function hasPracticalPasswordConfigured(): boolean {
  return getConfiguredPracticalPassword() !== null;
}

export function isPracticalPasswordValid(input: string): boolean {
  const expected = getConfiguredPracticalPassword();
  if (!expected) {
    return false;
  }
  return input === expected;
}

export function practicalCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProd,
    path: "/",
    maxAge: PRACTICAL_COOKIE_MAX_AGE_SECONDS,
  };
}

export function practicalAccessCookieValue(): string {
  return PRACTICAL_COOKIE_VALUE;
}
