"use client";
import React from "react";
import Link from "next/link";
import { RiFileCopyLine } from "react-icons/ri";
import { toast } from "sonner";
import { useLLMResponseStore } from "../Store/store.llmResponse";
import { ProfileData } from "../Types/types.Store";
import Loader from "@/components/Loader";
import Markdown from "react-markdown";
import { useRouter } from 'next/navigation';
import Section from "@/components/Section";
import { TbArrowBackUp } from "react-icons/tb";

export default function ImproveProfilePage() {
  const router = useRouter();
  const { data } = useLLMResponseStore();

  const isProfileData = (d: any): d is ProfileData => {
    return d && typeof d === 'object' && !Array.isArray(d);
  };

  const profile: ProfileData = isProfileData(data) ? data : {};

  const handleCopy = async (text?: string) => {
    if (!text || text.trim() === "") {
      return toast.error("No content available to copy!");
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard! 📋");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy to clipboard.");
    }
  };

  React.useEffect(() => {
    if (isProfileData(data) && data.message) {
      // If we have a message but it's just the initial state or an error, handle accordingly
      // But in this logic, data.message usually means we haven't got the profile yet
    }
  }, [data, router]);

  if (isProfileData(data) && data.message) {
    return (
      <Section className={'h-screen'}>
        <div className='w-full h-full'>
          <div className='absolute left-4 sm:left-8 mt-4'>
            <button onClick={() => router.back()} className='hidden md:flex items-center text-sm gap-2 hover:bg-[#ff2f00] border border-[#ff3f00] rounded-full px-3 py-1 transition-all'><TbArrowBackUp /> Go Back</button>
          </div>
          <div className="h-full w-full flex flex-col gap-4 justify-center items-center">
            <Loader />
            <span className="text-white/70">{data.message}</span>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section withSun={true} className="!p-0">
      <div className="min-h-screen w-full relative pb-20 pt-24 text-white">
        {/* Hanging Hint Tag */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-24 md:right-8 md:left-auto bg-[#ff2f00] text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce cursor-default text-sm font-bold flex items-center gap-2">
          <span>Click content to copy 📋</span>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Profile Layout */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-sm border border-[#ff3f00]/30 overflow-hidden mb-6 relative">
            {/* Banner */}
            <div 
              onClick={() => handleCopy(profile.banner)}
              className="h-32 sm:h-48 bg-gray-800/50 relative group cursor-pointer"
            >
              <div className="w-full h-full flex justify-center items-center bg-gradient-to-r from-gray-900 to-[#1a0a05]">
                <p className="focus:outline-none w-fit max-w-140 text-center text-xs sm:text-sm text-white/90 px-6 line-clamp-3 sm:line-clamp-none">
                  {profile.banner ? profile.banner : "Banner should look clean and focused."}
                </p>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <RiFileCopyLine className="text-white opacity-0 group-hover:opacity-100 transition-opacity size-6 sm:size-8" />
                </div>
              </div>
            </div>

            {/* Profile Picture & Heading */}
            <div className="px-6 pb-6 relative">
              <div className="relative -mt-16 sm:-mt-24 mb-4">
                {/* Avatar Placeholder */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#ff2f00]/20 bg-gray-800 overflow-hidden shadow-xl">
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white/40">{profile.profilePicture || "PFP"}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div 
                  onClick={() => handleCopy(profile.bio)}
                  className="flex-1 group relative cursor-pointer p-2 -m-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  <h1 className="text-lg sm:text-3xl font-bold flex items-center gap-2 text-white">
                    Your Name
                  </h1>
                  <p className="text-sm sm:text-lg mt-1 text-gray-300 max-w-2xl pr-8">
                    {profile.bio ? profile.bio : "Bio details will be here."}
                  </p>
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#ff2f00] p-2">
                    <RiFileCopyLine size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div 
            onClick={() => handleCopy(profile.about)}
            className="bg-black/40 backdrop-blur-xl rounded-lg shadow-sm border border-[#ff2f00]/30 p-6 mb-6 group relative cursor-pointer"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">About</h2>
              <RiFileCopyLine size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ff2f00]" />
            </div>
            <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
              {profile.about
                ? profile.about
                : `I am a passionate individual focused on building impactful solutions through technology. I enjoy solving real-world problems, learning new tools, and continuously improving my skills.`}
            </p>
          </div>

          {/* Experience Section */}
          <div className="bg-black/40 backdrop-blur-xl rounded-lg shadow-sm border border-[#ff2f00]/30 p-6 group relative">
            <div className="flex flex-col mb-4">
              <h2 className="text-xl font-bold text-white">Featured</h2>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                (suggested posts based on your profile.)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="hidden sm:block w-12 h-12 bg-gray-800 rounded-md shrink-0 border border-white/10"></div>
              <div className="flex-1 text-gray-300 prose prose-invert max-w-none prose-sm">
                {profile.posts
                  ? profile.posts.map((item: string, idx: number) => (
                    <div 
                      key={idx} 
                      onClick={() => handleCopy(item)}
                      className="mb-4 last:mb-0 p-3 rounded-lg border border-transparent hover:border-[#ff2f00]/30 hover:bg-white/5 transition-all cursor-pointer group/item relative"
                    >
                      <RiFileCopyLine className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity text-[#ff2f00]" size={16} />
                      <Markdown>{item}</Markdown>
                    </div>
                  ))
                  : <Markdown>`**Heading** \n\n Subheading \n\n - points to mention`</Markdown>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
