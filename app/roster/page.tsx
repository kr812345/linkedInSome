"use client";
import { useEffect, useState, useRef } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import Loader from "@/components/Loader";
import { motion } from "motion/react";
import { toast } from "sonner";
import Link from "next/link";
import { llmResponse } from "@/types/llmResponse";
import RosterOutput from "@/components/RosterOutput";
import Section from "@/components/Section";

const RosterPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<llmResponse | null>(null);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(false);
  const roastRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile == null) {
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      return toast.error("Please upload an image file (PNG, JPG, etc.)");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setFile(selectedFile);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const filedrop = e.dataTransfer.files[0];

    if (filedrop == null) {
      return;
    }

    if (!filedrop.type.startsWith('image/')) {
      return toast.error("Please drop an image file.");
    }

    setFile(filedrop);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(()=>{
    console.log(file);
  },[file])

  const handleClose = () => {
    setImage(null);
    setFile(null);
    setData(null);
    setIsLoading(false);
    setIsDisable(false);
  };

  const handleRoster = async () => {
    if (isDisable) {
      return toast("Bhai rujka, pehle cross pr maar.");
    }
    setIsDisable(true);
    setIsLoading(true);
    setError(null);
    setData(null);
    roastRef.current?.scrollIntoView({ behavior: "smooth" });

    if (file) {
      try {
        const filedata = new FormData();
        filedata.append("file", file);
        
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        const response = await fetch(`${serverUrl}/v1/api/roast`, {
          method: "POST",
          body: filedata,
        });

        const resJson = await response.json();

        if (!response.ok) {
           throw new Error(resJson.message || resJson.error || `Error ${response.status}: Failed to get roast`);
        }

        const resData = resJson?.data;

        if (resData?.error) {
           toast(resData.error);
           setError(resData.error);
        } else {
           setData(resData);
        }
      } catch (err: any) {
        console.error(err);
        toast(err.message || "An unexpected error occurred");
        setError(err.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
        setIsDisable(false);
      }
    } else {
      setIsLoading(false);
      setIsDisable(false);
      toast("Please upload an image first.");
    }
  };

  return (
    <Section withSun={true} className="!p-0">
      <div className="min-h-screen w-full relative p-4 sm:p-8 pt-24 sm:pt-32 flex flex-col items-center gap-8 text-white">
        <div className="flex flex-col items-center text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-white text-shadow-md text-shadow-[#ff2f00]">
            LinkedIn Profile Reviewer
          </h1>
          <p className="mb-6 text-gray-400 text-sm sm:text-base max-w-xl">
            Upload your LinkedIn Profile Screenshot to get the Roasted Feedback.
          </p>
        </div>

        <div className={`relative w-full ${image ? 'max-w-7xl lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start' : 'max-w-4xl flex flex-col'} items-center justify-center m-auto z-10 gap-8 transition-all duration-500`}>
          {/* Main Area */}
          <div className="flex flex-col items-center justify-center w-full">
            {image && (
              <div className="relative mb-8 flex w-full flex-col items-center px-4">
                <div className="relative group">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="max-w-full mx-auto h-auto max-h-[70vh] z-0 rounded-lg object-contain shadow-2xl border border-white/10"
                  />
                  <div className="absolute -right-10 top-0 hover:cursor-pointer text-white p-2">
                    <RiCloseLargeLine className="size-6" onClick={handleClose} />
                  </div>
                </div>
                <motion.button
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  onClick={handleRoster}
                  type="button"
                  disabled={isDisable}
                  className={`mt-8 px-8 py-3 w-fit h-fit rounded-full bg-[#ff2f00] font-bold text-sm sm:text-base text-white ${isDisable ? "bg-[#ff2f0099]" : "hover:cursor-pointer hover:shadow-[0_0_20px_2px_#ff2f00]"}`}
                >
                  Feed it to Roster
                </motion.button>
              </div>
            )}
            
            {!image && (
              <div
                className="w-full max-w-lg border-2 border-dashed rounded-2xl flex items-center justify-center text-center p-12 transition-all border-[#ff2f00]/30 text-gray-400 bg-black/40 backdrop-blur-md hover:border-[#ff2f00]/60 hover:bg-black/50"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="flex flex-col items-center gap-4">
                  <p className="text-lg">Drag & drop an Image</p>
                  <p className="text-sm opacity-50">or</p>
                  <label className="cursor-pointer px-8 py-3 rounded-full transition-all bg-[#ff2f00] text-white font-semibold hover:bg-[#ff3f00] shadow-lg">
                    Browse Files
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div ref={roastRef} className="w-full lg:sticky lg:top-32">
            {isLoading ? <div className="h-60 flex items-center justify-center"><Loader /></div> : <RosterOutput data={data} error={error} />}
          </div>
        </div>

        {/* Improve Option */}
        <div className="bottom-0 left-0 right-0 p-4 mt-4 sm:mt-8 flex justify-center z-10">
          <Link
            href="/userNiche"
            className="inline-block border-2 border-[#ff2f00] hover:rounded-md px-6 py-2 bg-black/40 backdrop-blur-md text-white rounded-full text-sm sm:text-base hover:shadow-[0_0_10px_2px_#ff2f00] transition-all"
          >
            Improve your Profile
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default RosterPage;
