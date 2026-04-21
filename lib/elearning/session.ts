import { cookies } from "next/headers";
import {
  LEARNER_COOKIE_NAME,
  learnerCookieOptions,
  signLearnerToken,
  verifyLearnerToken,
  type LearnerSessionClaims,
} from "./auth";
import { findLearnerById, type Learner } from "./learners";

export async function readLearnerSession(): Promise<LearnerSessionClaims | null> {
  const store = await cookies();
  const token = store.get(LEARNER_COOKIE_NAME)?.value;
  return verifyLearnerToken(token);
}

export async function requireLearnerSession(): Promise<LearnerSessionClaims> {
  const session = await readLearnerSession();
  if (!session) throw new Error("UNAUTHENTICATED");
  return session;
}

export async function getCurrentLearner(): Promise<Learner | null> {
  const session = await readLearnerSession();
  if (!session) return null;
  const id = Number(session.sub);
  if (!Number.isFinite(id)) return null;
  return findLearnerById(id);
}

export async function setLearnerSessionCookie(learner: Learner): Promise<void> {
  const token = await signLearnerToken({
    sub: String(learner.id),
    email: learner.email,
    firstName: learner.firstName,
    lastName: learner.lastName,
    courseSlug: learner.courseSlug,
  });
  const store = await cookies();
  store.set(LEARNER_COOKIE_NAME, token, learnerCookieOptions());
}

export async function clearLearnerSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(LEARNER_COOKIE_NAME, "", {
    ...learnerCookieOptions(),
    maxAge: 0,
  });
}
