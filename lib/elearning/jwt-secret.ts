/** Shared HS256 secret for learner + admin JWT cookies. */

const DEV_JWT_FALLBACK =
  "__DEV_ONLY_ELEARNING_JWT_SECRET_SET_ELEARNING_JWT_SECRET_IN_ENV__";

export function getElearningJwtSecretBytes(): Uint8Array {
  let raw = process.env.ELEARNING_JWT_SECRET?.trim();
  if (!raw || raw.length < 32) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[elearning] ELEARNING_JWT_SECRET is missing or shorter than 32 characters. " +
          "Using a fixed dev-only secret — set ELEARNING_JWT_SECRET before production."
      );
      raw = DEV_JWT_FALLBACK;
    }
  }
  if (!raw || raw.length < 32) {
    throw new Error(
      "ELEARNING_JWT_SECRET is missing or too short (min 32 chars). See .env.example."
    );
  }
  return new TextEncoder().encode(raw);
}
