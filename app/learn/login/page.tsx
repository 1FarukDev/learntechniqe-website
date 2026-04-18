import { redirect } from "next/navigation";
import { readLearnerSession } from "@/lib/elearning/session";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LearnerLoginPage({ searchParams }: PageProps) {
  const session = await readLearnerSession();
  const { next } = await searchParams;
  const safeNext = typeof next === "string" && next.startsWith("/learn/") ? next : "/learn/dashboard";

  if (session) {
    redirect(safeNext);
  }

  return (
    <main className="min-h-screen flex items-stretch">
      <section className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-[#013338] via-[#016068] to-[#038187] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_55%)]" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_80%,white,transparent_45%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              Learn Technique
            </p>
            <h1 className="mt-6 font-heading text-4xl lg:text-5xl leading-[1.1] tracking-tight">
              Welcome back to your <br /> free e-learning course.
            </h1>
            <p className="mt-5 text-base text-white/80 max-w-md leading-relaxed">
              Sign in with the email you registered with and the temporary
              password we emailed you. Your course takes about half an hour —
              finish it today and download your certificate.
            </p>
          </div>

          <ul className="grid gap-3 text-sm text-white/85">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 size-1.5 rounded-full bg-[#E99E20]" />
              Industry-recognised training from UK instructors
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 size-1.5 rounded-full bg-[#E99E20]" />
              City &amp; Guilds and EAL accredited centre
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 size-1.5 rounded-full bg-[#E99E20]" />
              Downloadable certificate on completion
            </li>
          </ul>
        </div>
      </section>

      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#016068]">
              Learn Technique
            </p>
            <h1 className="mt-4 font-heading text-3xl tracking-tight text-zinc-900">
              Sign in to your course
            </h1>
          </div>
          <div className="hidden md:block mb-10">
            <h2 className="font-heading text-3xl tracking-tight text-zinc-900">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Enter your details below to access your dashboard.
            </p>
          </div>
          <LoginForm nextPath={safeNext} />
          <p className="mt-10 text-xs text-zinc-500 text-center leading-relaxed">
            Trouble signing in? Email{" "}
            <a
              href="mailto:info@learntechnique.com"
              className="font-semibold text-[#016068] hover:underline"
            >
              info@learntechnique.com
            </a>{" "}
            and we&rsquo;ll help straight away.
          </p>
        </div>
      </section>
    </main>
  );
}
