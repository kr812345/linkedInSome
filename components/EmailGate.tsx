"use client";

import { FormEvent, useState } from "react";
import { Lock } from "lucide-react";
import { RoastMode, RoastTeaser } from "@/types/roast";

interface EmailGateProps {
  mode: RoastMode;
  teaser: RoastTeaser;
  submitting: boolean;
  error: string | null;
  onUnlock: (name: string, email: string) => void;
}

const EmailGate = ({ mode, teaser, submitting, error, onUnlock }: EmailGateProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!consent) return;
    onUnlock(name.trim(), email.trim());
  };

  return (
    <div data-testid="email-gate" className="w-full rounded-2xl border border-[#ff2f00]/40 bg-black/50 backdrop-blur-md p-5 sm:p-7 shadow-[0_0_24px_rgba(255,47,0,0.12)]">
      <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
        {mode === "posts" ? "Posts roast" : "Profile roast"} · free teaser
      </p>
      <div className="mt-4 flex items-end gap-2">
        <span className="text-6xl font-serif font-bold leading-none text-[#ff2f00]">
          {teaser.score ?? "—"}
        </span>
        <span className="mb-1 text-gray-400">/100</span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">Client magnet score</p>
      <p className="mt-4 text-base sm:text-lg text-white">{teaser.verdict}</p>
      <ul className="mt-4 space-y-2">
        {teaser.highlights.map((point) => (
          <li key={point} className="text-sm text-gray-200 border-l-2 border-[#ff2f00] pl-3">
            {point}
          </li>
        ))}
      </ul>
      {teaser.lockedCount > 0 && (
        <p className="mt-4 flex items-center gap-2 text-sm text-gray-400">
          <Lock className="size-4 text-[#ff2f00]" />
          {teaser.lockedCount} more notes and rewrites are locked
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <p className="text-sm text-gray-300">
          The full roast — section by section, plus line rewrites — unlocks with your name and email. No account.
        </p>
        <label className="block text-sm">
          <span className="text-gray-400">Name</span>
          <input
            name="name"
            required
            minLength={2}
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-[#ff2f00]/50 bg-black/40 px-3 py-2 text-white outline-none focus:border-[#ff2f00]"
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-400">Email</span>
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-[#ff2f00]/50 bg-black/40 px-3 py-2 text-white outline-none focus:border-[#ff2f00]"
            placeholder="you@company.com"
          />
        </label>
        <label className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
          <input
            type="checkbox"
            className="mt-0.5 accent-[#ff2f00]"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            required
          />
          <span>
            I agree to receive this roast and occasional emails about LinkedIn content for founders. No account. I can unsubscribe anytime.
          </span>
        </label>
        {error && <p className="text-sm text-[#ffb4a2]">{error}</p>}
        <button
          type="submit"
          disabled={submitting || !consent}
          className="w-full rounded-full bg-[#ff2f00] py-3 font-semibold text-white disabled:opacity-50 hover:shadow-[0_0_16px_2px_#ff2f00] transition-shadow"
        >
          {submitting ? "Unlocking…" : "Unlock the full roast"}
        </button>
      </form>
    </div>
  );
};

export default EmailGate;
