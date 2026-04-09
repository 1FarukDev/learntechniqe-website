"use client";

import Link from "next/link";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

export const PRIVACY_CONSENT_FIELD = "privacy_consent" as const;

export function FormPrivacyConsent({
  className,
  linkClassName,
}: {
  className?: string;
  linkClassName?: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[PRIVACY_CONSENT_FIELD]?.message as string | undefined;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          {...register(PRIVACY_CONSENT_FIELD, {
            required: "You must agree to the privacy policy",
          })}
          className="mt-1 rounded border-gray-300 shrink-0"
        />
        <span className="text-sm text-gray-600">
          By clicking this box, I agree to your{" "}
          <Link
            href="/privacy-policy"
            className={cn("text-[#016068] underline", linkClassName)}
          >
            privacy policy
          </Link>
        </span>
      </label>
      {error && (
        <p className="text-xs font-satoshi text-destructive">{error}</p>
      )}
    </div>
  );
}

type StandalonePrivacyConsentProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export function StandalonePrivacyConsent({
  id,
  checked,
  onChange,
  className,
}: StandalonePrivacyConsentProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="flex items-start gap-2 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 rounded border-gray-300 shrink-0"
        />
        <span className="text-sm text-gray-600">
          By clicking this box, I agree to your{" "}
          <Link href="/privacy-policy" className="text-[#016068] underline">
            privacy policy
          </Link>
        </span>
      </label>
    </div>
  );
}
