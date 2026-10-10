"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { RoastFull } from "@/types/roast";
import OfferBlock from "./OfferBlock";

function labelize(key: string) {
  const spaced = key.replace(/([A-Z])/g, " $1");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

const RoastResult = ({ roast }: { roast: RoastFull }) => {
  const [isSharing, setIsSharing] = useState(false);

  const copyText = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error("Could not copy that.");
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    const toastId = toast.loading("Generating shareable image…");
    try {
      const flat: Record<string, string> = {
        score: roast.score == null ? "" : `${roast.score}/100`,
        verdict: roast.verdict,
        ...roast.sections,
      };
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const response = await fetch(`${serverUrl}/v1/api/shareRoast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: flat }),
      });
      if (!response.ok) throw new Error("Could not generate the image.");
      const blob = await response.blob();
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      toast.success("Roast image copied to clipboard.", { id: toastId });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not share the roast.";
      toast.error(message, { id: toastId });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="rounded-2xl border border-[#ff2f00]/40 bg-black/50 p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
              {roast.mode === "posts" ? "Posts roast" : "Profile roast"}
            </p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-6xl font-serif font-bold leading-none text-[#ff2f00]">
                {roast.score ?? "—"}
              </span>
              <span className="mb-1 text-gray-400">/100</span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">Client magnet score</p>
          </div>
          <button
            type="button"
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center gap-2 rounded-full bg-[#ff2f00] px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            <Share2 size={16} />
            {isSharing ? "Generating…" : "Share roast"}
          </button>
        </div>
        <p className="mt-4 text-lg text-white">{roast.verdict}</p>
        <ul className="mt-4 space-y-2">
          {roast.highlights.map((point) => (
            <li key={point} className="text-sm text-gray-200 border-l-2 border-[#ff2f00] pl-3">
              {point}
            </li>
          ))}
        </ul>
      </div>

      {Object.entries(roast.sections).map(([key, value]) => (
        <button
          type="button"
          key={key}
          onClick={() => copyText(labelize(key), value)}
          className="group relative w-full rounded-xl border border-[#ff2f00]/40 bg-black/40 p-4 text-left hover:border-[#ff2f00] hover:bg-white/5 transition-colors"
        >
          <Copy size={16} className="absolute top-4 right-4 text-[#ff2f00] opacity-0 group-hover:opacity-100" />
          <h3 className="font-semibold text-white">{labelize(key)}</h3>
          <div className="prose prose-invert prose-sm mt-2 max-w-none text-gray-200">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        </button>
      ))}

      {roast.rewrites.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Rewrites you can paste</h3>
          {roast.rewrites.map((rewrite) => (
            <button
              type="button"
              key={`${rewrite.label}-${rewrite.text.slice(0, 24)}`}
              onClick={() => copyText(rewrite.label, rewrite.text)}
              className="group relative w-full rounded-xl border border-white/10 bg-[#140800] p-4 text-left hover:border-[#ff2f00]"
            >
              <Copy size={16} className="absolute top-4 right-4 text-[#ff2f00] opacity-0 group-hover:opacity-100" />
              <p className="text-xs uppercase tracking-widest text-[#ff2f00]">{rewrite.label}</p>
              <p className="mt-2 text-sm sm:text-base text-white whitespace-pre-wrap">{rewrite.text}</p>
            </button>
          ))}
        </div>
      )}

      <OfferBlock />
    </div>
  );
};

export default RoastResult;
