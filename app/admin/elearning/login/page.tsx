import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { AdminLoginForm } from "./AdminLoginForm";

export const dynamic = "force-dynamic";

function LoginFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-500 gap-2">
      <Loader2 className="animate-spin size-5" />
      Loading…
    </div>
  );
}

export default function AdminElearningLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AdminLoginForm />
    </Suspense>
  );
}
