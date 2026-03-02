import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-heading font-bold text-[120px] sm:text-[160px] md:text-[200px] leading-none text-[#01636B]/20 select-none">
          404
        </h1>
        <h2 className="font-heading font-semibold text-[28px] sm:text-[36px] md:text-[44px] text-black -mt-8 sm:-mt-12 md:-mt-16 mb-4">
          Page not found
        </h2>
        <p className="text-black/70 text-base sm:text-lg mb-10 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="px-12 py-7 bg-[#01636B] text-[#F5F5F5] rounded-md uppercase"
          >
            <Link href="/">Back to home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="px-12 py-7 rounded-md uppercase border-2 border-[#01636B] text-[#01636B] hover:bg-[#01636B]/5"
          >
            <Link href="/courses">Browse courses</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
