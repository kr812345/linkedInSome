"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { toast } from "sonner";
import { RiCloseLargeLine } from "react-icons/ri";
import Loader from "@/components/Loader";
import Section from "@/components/Section";
import EmailGate from "@/components/EmailGate";
import RoastResult from "@/components/RoastResult";
import { RoastFull, RoastMode, RoastStartResponse, RoastTeaser } from "@/types/roast";

type Preview = { file: File; url: string };

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const RosterPage = () => {
  const [mode, setMode] = useState<RoastMode>("profile");
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [postsText, setPostsText] = useState("");
  const [teaser, setTeaser] = useState<RoastTeaser | null>(null);
  const [roastId, setRoastId] = useState<string | null>(null);
  const [roast, setRoast] = useState<RoastFull | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("mode");
    if (requested === "posts" || requested === "profile") {
      setMode(requested);
    }
  }, []);

  const clearResult = () => {
    setTeaser(null);
    setRoastId(null);
    setRoast(null);
    setError(null);
  };

  const switchMode = (next: RoastMode) => {
    if (next === mode) return;
    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    setPreviews([]);
    setPostsText("");
    clearResult();
    setMode(next);
  };

  const addFiles = (list: FileList | File[]) => {
    const incoming = Array.from(list).filter((file) => file.type.startsWith("image/"));
    if (incoming.length === 0) {
      toast.error("Please upload an image file (PNG, JPG, etc.).");
      return;
    }

    const limit = mode === "profile" ? 1 : 5;
    setPreviews((current) => {
      const next = mode === "profile" ? [] : [...current];
      if (mode === "profile") {
        current.forEach((preview) => URL.revokeObjectURL(preview.url));
      }
      for (const file of incoming) {
        if (next.length >= limit) break;
        next.push({ file, url: URL.createObjectURL(file) });
      }
      if (mode === "posts" && current.length + incoming.length > limit) {
        toast("Up to 5 post screenshots. Extra files were left out.");
      }
      return next;
    });
    clearResult();
  };

  const removePreview = (url: string) => {
    setPreviews((current) => {
      const target = current.find((preview) => preview.url === url);
      if (target) URL.revokeObjectURL(target.url);
      return current.filter((preview) => preview.url !== url);
    });
    clearResult();
  };

  const scrollToResult = () => {
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleRoast = async () => {
    const hasImage = previews.length > 0;
    const hasText = postsText.trim().length >= 20;

    if (mode === "profile" && !hasImage) {
      toast("Upload a profile screenshot first.");
      return;
    }
    if (mode === "posts" && !hasImage && !hasText) {
      toast("Add post screenshots or paste the post text.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRoast(null);
    setTeaser(null);
    scrollToResult();

    try {
      const body = new FormData();
      let endpoint = "/v1/api/roast";

      if (mode === "profile") {
        body.append("file", previews[0].file);
      } else {
        endpoint = "/v1/api/roast-posts";
        previews.forEach((preview) => body.append("files", preview.file));
        body.append("postsText", postsText);
      }

      const response = await fetch(`${SERVER_URL}${endpoint}`, { method: "POST", body });
      const payload = (await response.json()) as RoastStartResponse;

      if (!response.ok || !payload.teaser || !payload.roastId) {
        throw new Error(payload.message || "Could not roast that.");
      }

      setRoastId(payload.roastId);
      setTeaser(payload.teaser);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not roast that.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = async (name: string, email: string) => {
    if (!roastId) return;
    setIsUnlocking(true);
    setError(null);
    try {
      const response = await fetch(`${SERVER_URL}/v1/api/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roastId, name, email, consent: true }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.data) {
        throw new Error(payload.message || "Could not unlock the roast.");
      }
      setRoast(payload.data as RoastFull);
      setTeaser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not unlock the roast.";
      setError(message);
      toast.error(message);
    } finally {
      setIsUnlocking(false);
    }
  };

  const canSubmit = mode === "profile"
    ? previews.length === 1
    : previews.length > 0 || postsText.trim().length >= 20;

  return (
    <Section withSun={true} className="!p-0">
      <div className="min-h-screen w-full relative p-4 sm:p-8 pt-24 sm:pt-32 flex flex-col items-center gap-8 text-white">
        <div className="flex flex-col items-center text-center relative z-10 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold mb-3 text-white">
            Is your LinkedIn bringing you clients?
          </h1>
          <p className="mb-6 text-gray-400 text-sm sm:text-base">
            Roast the profile, or roast the posts. Same free pass, no login. You get a score and the sharpest notes first.
          </p>
          <div data-testid="mode-picker" className="flex p-1 rounded-full border border-[#ff2f00]/50 bg-black/60" role="tablist" aria-label="Roast mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "profile"}
              onClick={() => switchMode("profile")}
              className={`rounded-full px-5 py-2 text-sm sm:text-base font-medium transition-colors ${mode === "profile" ? "bg-[#ff2f00] text-white" : "text-gray-300 hover:text-white"}`}
            >
              Profile roast
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "posts"}
              onClick={() => switchMode("posts")}
              className={`rounded-full px-5 py-2 text-sm sm:text-base font-medium transition-colors ${mode === "posts" ? "bg-[#ff2f00] text-white" : "text-gray-300 hover:text-white"}`}
            >
              Posts roast
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-5xl grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col items-center w-full">
            {mode === "posts" && (
              <p className="mb-4 text-sm text-gray-400 text-center max-w-md">
                Upload screenshots of up to five recent posts, paste the text, or do both. We look at the hook, who you help, consistency, proof, the CTA, and whether a buyer would bite.
              </p>
            )}
            {mode === "profile" && (
              <p className="mb-4 text-sm text-gray-400 text-center max-w-md">
                Upload one LinkedIn profile screenshot. We read the banner, headline, about, and whether a buyer would book.
              </p>
            )}

            {previews.length > 0 && (
              <div className={`mb-6 w-full ${mode === "posts" ? "grid grid-cols-2 gap-3" : "flex justify-center"}`}>
                {previews.map((preview) => (
                  <div key={preview.url} className="relative">
                    <img
                      src={preview.url}
                      alt="Upload preview"
                      className="max-h-64 w-full rounded-lg border border-white/10 object-contain bg-black/40"
                    />
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => removePreview(preview.url)}
                      className="absolute -right-2 -top-2 rounded-full bg-black/80 p-1 border border-white/20"
                    >
                      <RiCloseLargeLine className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {(mode === "posts" || previews.length === 0) && previews.length < (mode === "profile" ? 1 : 5) && (
              <div
                className="w-full max-w-lg border-2 border-dashed rounded-2xl flex items-center justify-center text-center p-8 sm:p-12 transition-all border-[#ff2f00]/30 text-gray-400 bg-black/40 backdrop-blur-md hover:border-[#ff2f00]/60"
                onDrop={(event) => {
                  event.preventDefault();
                  if (event.dataTransfer.files.length) addFiles(event.dataTransfer.files);
                }}
                onDragOver={(event) => event.preventDefault()}
              >
                <div className="flex flex-col items-center gap-3">
                  <p className="text-lg text-white">
                    {mode === "profile" ? "Drop a profile screenshot" : `Drop post screenshots (${previews.length}/5)`}
                  </p>
                  <p className="text-sm opacity-60">PNG or JPG</p>
                  <label className="cursor-pointer px-8 py-3 rounded-full bg-[#ff2f00] text-white font-semibold hover:bg-[#ff3f00]">
                    Browse files
                    <input
                      type="file"
                      accept="image/*"
                      multiple={mode === "posts"}
                      className="hidden"
                      onChange={(event) => {
                        if (event.target.files?.length) addFiles(event.target.files);
                        event.target.value = "";
                      }}
                    />
                  </label>
                </div>
              </div>
            )}

            {mode === "posts" && (
              <label className="mt-6 w-full max-w-lg text-left text-sm">
                <span className="text-gray-300">Or paste recent posts</span>
                <textarea
                  value={postsText}
                  onChange={(event) => {
                    setPostsText(event.target.value);
                    clearResult();
                  }}
                  rows={8}
                  placeholder={"Paste up to five posts. Leave a blank line between them.\n\nThe first line is the hook. The last line should be the ask."}
                  className="mt-2 w-full rounded-xl border border-[#ff2f00]/40 bg-black/40 px-3 py-3 text-white outline-none focus:border-[#ff2f00]"
                />
              </label>
            )}

            {canSubmit && (
              <motion.button
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                type="button"
                onClick={handleRoast}
                disabled={isLoading}
                className="mt-8 rounded-full bg-[#ff2f00] px-8 py-3 font-bold text-white disabled:opacity-60 hover:shadow-[0_0_20px_2px_#ff2f00]"
              >
                {isLoading ? "Roasting…" : mode === "posts" ? "Roast these posts" : "Roast this profile"}
              </motion.button>
            )}
          </div>

          <div ref={resultRef} className="w-full lg:sticky lg:top-28">
            {isLoading && (
              <div className="flex h-60 items-center justify-center">
                <Loader />
              </div>
            )}
            {!isLoading && teaser && (
              <EmailGate
                mode={mode}
                teaser={teaser}
                submitting={isUnlocking}
                error={error}
                onUnlock={handleUnlock}
              />
            )}
            {!isLoading && roast && <RoastResult roast={roast} />}
            {!isLoading && !teaser && !roast && error && (
              <p className="rounded-xl border border-[#ff2f00]/40 p-4 text-sm text-[#ffb4a2]">{error}</p>
            )}
          </div>
        </div>

        <div className="relative z-10 mt-4">
          <Link
            href="/userNiche"
            className="inline-block rounded-full border-2 border-[#ff2f00] bg-black/40 px-6 py-2 text-sm sm:text-base hover:shadow-[0_0_10px_2px_#ff2f00]"
          >
            Rewrite the profile from a resume
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default RosterPage;
