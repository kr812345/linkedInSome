const FALLBACK_EMAIL = "krishnay812345@gmail.com";

/** Booking link for the post-roast offer. Falls back to a prefilled email. */
export function getBookingUrl() {
  const configured = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  if (configured) return configured;

  const subject = encodeURIComponent("Free sample post — Founder Content Engine");
  const body = encodeURIComponent(
    "Hi Krishna,\n\nI just roasted my LinkedIn on LinkRoast and I want a free sample post written in my voice.\n\n",
  );
  return `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
}

export function bookingOpensNewTab() {
  const configured = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  return Boolean(configured && !configured.toLowerCase().startsWith("mailto:"));
}
