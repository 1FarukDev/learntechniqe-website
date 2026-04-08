import Image from "next/image";

const PAYMENT_METHODS = [
  { src: "/payments/mastercard.svg", label: "Mastercard" },
  { src: "/payments/visa.svg", label: "Visa" },
  { src: "/payments/google-pay.svg", label: "Google Pay" },
  { src: "/payments/amex.svg", label: "American Express" },
  { src: "/payments/klarna.svg", label: "Klarna" },
  { src: "/payments/apple-pay.svg", label: "Apple Pay" },
] as const;

function PaymentMarkCard({ src, label }: { src: string; label: string }) {
  return (
    <div
      className="flex h-9 w-[4.25rem] shrink-0 items-center justify-center rounded-md bg-white px-1.5 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] sm:h-10 sm:w-[4.75rem] sm:px-2 sm:py-1.5"
      title={label}
    >
      <Image
        src={src}
        alt=""
        width={64}
        height={26}
        unoptimized
        className="h-5 w-full max-w-[3.25rem] object-contain object-center sm:h-[22px] sm:max-w-[3.75rem]"
      />
    </div>
  );
}

/**
 * Full-colour payment marks in uniform white cards (SVGs in /public/payments).
 */
export function PaymentMethodLogos() {
  return (
    <div
      className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2"
      role="group"
      aria-label="Accepted payment methods: Mastercard, Visa, Google Pay, American Express, Klarna, Apple Pay"
    >
      {PAYMENT_METHODS.map(({ src, label }) => (
        <PaymentMarkCard key={src} src={src} label={label} />
      ))}
    </div>
  );
}
