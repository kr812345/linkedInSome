'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { RiCloseLargeLine } from 'react-icons/ri';
import Notify from '../helper/notify';
import Loader from '@/components/Loader';
import { motion } from 'motion/react';
import { toast, Toaster } from 'sonner';

const RosterPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [bannerReview, setBannerReview] = useState<string | null>("fkjflskdf");
  const [profilePicReview, setProfilePicReview] = useState<string | null>("sskfjadf");
  const [bio, setBio] = useState<string | null>("**heheh**fkjdldk");
  const [about, setAbout] = useState<string | null>(null);
  const [featured, setFeatured] = useState<any>(null);
  const [isDisable, setIsDisable] = useState<boolean>(false); 
  const [count, setCount] = useState<number>(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile == null) {
      return;
    }

    // if (selectedFile.size > 5) {
    //   return "Please upload image size less than 5MB";
    // }

    const reader = new FileReader();
    reader.onload = (event) => {
        setImage(event.target?.result as string);
        setFile(selectedFile);
      };
        reader.readAsDataURL(selectedFile);
    }
  ;

  useEffect(()=>{
    if (file){
      if (count > 0) {
        setIsDisable(true);
      }
    } else if (!file) {
      setIsDisable(false);
      setCount(0);
    }
  },[file, count])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const filedrop = e.dataTransfer.files[0];

    if (filedrop == null) {
      return;
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

  const handleClose = () => {
    setImage(null);
    setFile(null);
  };
  
  const filedata = new FormData();
  const handleRoster = async () => {
    if (file) {
      filedata.append('file', file);
      // Call the roster function with the image data
        await fetch('http://localhost:5000/api/v1/upload',{
          method: 'POST',
          body: filedata,
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          toast(data.message);
          // setBannerReview(data.banner);
          // setProfilePicReview(data.profilePicture);
          // setBio(data.bio);
          // setAbout(data.about);
          // setFeatured(data.featured);
    })
    .catch(error => {
     console.error(error);
     toast(error.message)
    })
    .finally(()=>{setCount((p:number)=>p = p + 1)})
    }
  };

  return (
    <div className=" h-screen p-8 pt-32 flex-1 gap-8">
      {/* Left Side */}
      <div className="md:col-span-1 flex flex-col bg-background">
        <h1 className="text-3xl font-bold mb-4 text-text text-shadow-md text-shadow-[#ff2f00]">LinkedIn Profile Reviewer</h1>
        <p className="mb-6 text-text-secondary">Upload your LinkedIn Profile Screenshot to get the feedback.</p>
        {image && (
          <div className="relative mb-4 flex w-fit self-center flex-col items-center">
            <div className='fixed px-2 py-2 hover:cursor-pointer'><RiCloseLargeLine className='' onClick={handleClose}/></div>
            <div className=''>
            <img src={image} alt="Uploaded" className="max-w-full mx-auto h-120 z-0 rounded-lg" />
            </div>
            <motion.button
              animate={{}}
              transition={{ease: "linear", duration: 3}}
              onClick={handleRoster}
              type="button"
              disabled={isDisable}
              className={`mt-4 px-4 py-2 w-fit h-fit rounded-md bg-[#ff2f00]  p-2 ${isDisable ? 'bg-[#ff2f0099]' : 'hover:cursor-pointer hover:shadow-[0_0_10px_2px_#ff2f00]'}`}
            >
              Feed it to Roster
            </motion.button>
          </div>
        )}
        <div
          className="flex-grow self-center border-2 border-dashed rounded-lg flex items-center justify-center text-center p-4 transition-all border-bg-elevated text-text-secondary"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div>
            <p className="mb-2">Drag & drop an Image</p>
            <p className="my-2 text-sm">or</p>
            <label className="cursor-pointer px-4 py-2 rounded-md transition-all bg-primary text-text-primary">
              Browse Files
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                accept="image/jpeg, image/png, image/jpg"
              />
            </label>
          </div>
        </div>
      </div>



      {/* Right Side */}
      <div className="hidden md:col-span-2 h-full overflow-y-auto pl-8">
        <div className="p-6 rounded-lg shadow-md bg-bg-surface">
          <div className="space-y-6">
            {/* Banner Review */}
            {bannerReview && <div className="prose border border-gray-900 rounded-lg p-4 border-bg-elevated">
              <ReactMarkdown>{bannerReview}</ReactMarkdown>
            </div>}

            {/* Profile Picture Review */}
            {profilePicReview && <div className="prose border rounded-lg p-4 border-bg-elevated">
              <ReactMarkdown>{profilePicReview}</ReactMarkdown>
            </div>}

            {/* Bio */}
            {bio && <div className="prose border rounded-lg p-4 border-bg-elevated">
              <ReactMarkdown>{bio}</ReactMarkdown>
            </div>}

            {/* About */}
            {about && <div className="prose border rounded-lg p-4 border-bg-elevated">
              <ReactMarkdown>{about}</ReactMarkdown>
            </div>}

            {/* Featured */}
            {featured && <div className="prose border rounded-lg p-4 border-bg-elevated">
              <h3>Featured</h3>
              <ReactMarkdown>{featured}</ReactMarkdown>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RosterPage;