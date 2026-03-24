import React, { FormEvent, MouseEvent, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { llmResponse } from "@/types/llmResponse";
import { Toaster, toast } from "sonner";
import Link from "next/link";

interface dataProps {
  data: llmResponse | null;
  error: string | null;
}

const RosterOutput = ({data, error}: dataProps) => {

  // while(1) {
  //   toast("hello i am working")
  // }

  const handleToast = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Hello, i am working..')
  }

  return (<>
    {data && <div className="not-md:col-span-2 h-full w-full overflow-y-auto scrollbar-hide px-4 sm:pl-8 mt-6 md:mt-0">
      <div className="relative h-180 sm:p-6 rounded-lg shadow-md bg-bg-surface">
          
        <div className="relative space-y-4  scrollbar-hide h-full sm:space-y-6">
          {/* Banner Review */}
          {Object.entries(data).map(([key, value]) => (
            <div onClick={handleToast} key={key} className="prose border border-[#ff2f0055] rounded-lg p-4 sm:p-4 border-bg-elevated">
              <h2 className="font-semibold text-shadow-sm text-shadow-[#ff2f00] text-lg "><span className="uppercase">{`${key[0]}`}</span>{`${key.slice(1)}`}</h2>
              <ReactMarkdown>{`${value}`}</ReactMarkdown>
            </div>
          ))}
          {/* {error && <div className="prose border border-gray-900 rounded-lg p-3 sm:p-4 border-bg-elevated">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Error</h2>
            <ReactMarkdown>{`${error}`}</ReactMarkdown> */}
          {/* </div>} */}
        </div>
        
      </div>  
    </div>}
  </>)

}


export default RosterOutput;