import { Calendar } from "lucide-react";
import { bookingOpensNewTab, getBookingUrl } from "@/lib/booking";

const OfferBlock = () => {
  const href = getBookingUrl();
  const external = bookingOpensNewTab();

  return (
    <div data-testid="offer-block" className="relative overflow-hidden rounded-2xl border border-[#ff2f00] bg-black/60 p-6 sm:p-8 shadow-[0_0_24px_rgba(255,47,0,0.18)]">
      <div className="absolute -top-8 right-8 h-24 w-24 rounded-full bg-[#ff2f00]/30 blur-2xl" />
      <p className="text-xs uppercase tracking-[0.2em] text-[#ff2f00] font-semibold">Founder Content Engine</p>
      <h3 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
        Want your next 30 days of posts written in your voice?
      </h3>
      <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-xl">
        Get a free sample post. If it sounds like you, book a call and we will talk through whether a done-with-you LinkedIn system fits the business.
      </p>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff2f00] px-5 py-3 text-sm sm:text-base font-semibold text-white hover:shadow-[0_0_18px_2px_#ff2f00] transition-shadow"
      >
        <Calendar className="size-4" />
        Book a call
      </a>
      <p className="mt-3 text-xs text-gray-500">A conversation first. Nothing to buy on this page.</p>
    </div>
  );
};

export default OfferBlock;
