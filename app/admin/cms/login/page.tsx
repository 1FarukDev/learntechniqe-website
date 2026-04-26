import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { AdminCmsLoginForm } from "./AdminCmsLoginForm";

function LoginFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-500 gap-2">
      <Loader2 className="animate-spin size-5" />
      Loading…
    </div>
  );
}

export default function AdminCmsLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AdminCmsLoginForm />
    </Suspense>
  );
}
