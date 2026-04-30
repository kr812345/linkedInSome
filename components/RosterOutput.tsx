import React, { FormEvent, MouseEvent, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { llmResponse } from "@/types/llmResponse";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { Share2, Copy } from "lucide-react";
import { useState } from "react";

interface dataProps {
  data: llmResponse | null;
  error: string | null;
}

const RosterOutput = ({data, error}: dataProps) => {

  // while(1) {
  //   toast("hello i am working")
  // }

  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!data) return;
    
    setIsSharing(true);
    const toastId = toast.loading('Generating shareable image...');

    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const response = await fetch(`${serverUrl}/v1/api/shareRoast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data }),
      });

      if (!response.ok) throw new Error("Failed to generate image");

      const blob = await response.blob();
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);

      toast.success('Roast image copied to clipboard!', { id: toastId });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to share roast', { id: toastId });
    } finally {
      setIsSharing(false);
    }
  }

  const handleToast = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Hello, i am working..')
  }

  return (<>
    {(data || error) && <div className="not-md:col-span-2 h-full w-full overflow-y-auto scrollbar-hide px-4 sm:pl-8 mt-6 md:mt-0">
      <div className="relative h-180 sm:p-6 rounded-lg shadow-md bg-bg-surface">
          
        <div className="relative space-y-4  scrollbar-hide h-full sm:space-y-6">
          {/* Share Button */}
          {data && (
            <div className="flex justify-end mb-4">
              <button 
                onClick={handleShare}
                disabled={isSharing}
                className="flex items-center gap-2 px-4 py-2 bg-[#ff2f00] text-white rounded-full text-sm font-semibold hover:bg-[#ff3f00] transition-all shadow-lg disabled:opacity-50"
              >
                <Share2 size={16} />
                {isSharing ? 'Generating...' : 'Share Roast'}
              </button>
            </div>
          )}
          {/* Banner Review */}
          {data && Object.entries(data).map(([key, value]) => (
            <div 
              key={key} 
              onClick={() => {
                navigator.clipboard.writeText(String(value));
                toast.success(`Copied ${key} to clipboard! 📋`);
              }}
              className="prose group relative cursor-pointer border border-[#ff2f0055] hover:border-[#ff2f00] hover:bg-white/5 transition-all rounded-lg p-4 sm:p-4 border-bg-elevated"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#ff2f00]">
                <Copy size={16} />
              </div>
              <h2 className="font-semibold text-shadow-sm text-shadow-[#ff2f00] text-lg ">
                <span className="uppercase">{key[0]}</span>{key.slice(1)}
              </h2>
              <ReactMarkdown>{String(value)}</ReactMarkdown>
            </div>
          ))}

          {error && <div className="prose border border-[#ff2f0055] rounded-lg p-4 sm:p-4 border-bg-elevated">
            <h2 className="font-semibold text-shadow-sm text-shadow-[#ff2f00] text-lg ">Error</h2>
            <ReactMarkdown>{`${error}`}</ReactMarkdown>
          </div>}
        </div>
        
      </div>  
    </div>}
  </>)

}


export default RosterOutput;