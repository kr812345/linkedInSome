"use client";
import React from "react";
import Section from "@/components/Section";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useLLMResponseStore } from "../Store/store.llmResponse";
import Loader from "@/components/Loader";
import Link from "next/link";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const userNichePage = () => {
  const router = useRouter();
  const { data, setData } = useLLMResponseStore();
  const [formData_, setFormData_] = React.useState<{
    goal?: string;
    resume?: File;
    model?: string;
  }>({});
  const [isDisabled, setIsDisabled] = React.useState<boolean | null>(true);
  const [isLoading, setIsLoading] = React.useState<boolean | null>(false);
  const [error, setError] = React.useState<string | null>(null);

  const formLabels = [
    {
      h: "Goal",
      sh: "What do you want to do ?",
      labelName: "goal",
      type: "text",
      accept: "text",
    },
    // {h:"You want to call yourself ?", sh:"Eg: Software Engineer, devops Engineer, Assitant Prof.", labelName:"callYourself", type: 'text'},
    {
      h: "Resume",
      sh: "To know your skillset.",
      labelName: "resume",
      type: "file",
      accept: "application/pdf",
    },
  ];

  const models = [
    { idx: 0, option: "select model" },
    { idx: 1, option: "gemini 2.0 flash" },
  ];

  const handleFormData = async (
    name: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    let value: string | File | undefined;

    if (name == 'resume') {
      const files = (event.target as HTMLInputElement).files;
      value = files && files[0] ? files[0] : undefined;
    } else {
      value = event.target.value;
    }

    setFormData_((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    // if (name === "goal") {
    //   setFormData_((prev) => ({
    //     ...prev,
    //     name: event.target.value,
    //   }));
    // }
    // if (name === "resume") {
    //   setFormData_((prev) => ({
    //     ...prev,
    //     name: event.target.files[0],
    //   }));
    // }
    // if (name === "model") {
    //   setFormData_((prev) => ({
    //     ...prev,
    //     name: event.target.value,
    //   }));
    // }
  };
  
  React.useEffect(()=>{
    console.log(formData_);
    setIsDisabled(!(formData_['goal'] && formData_['resume'] && formData_['model']));
  },[formData_])

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isDisabled) {
      toast('Please fill all details');
      return;
    };

    setIsLoading(true);
    const formData = new FormData();
    formData.append("resume", formData_["resume"] as File);
    formData.append("goal", formData_["goal"] as string);
    formData.append("model", formData_["model"] as string);

    if (formData_["goal"]) {
      const serverUrl = SERVER_URL || "http://localhost:5000";
      const response = await fetch(`${serverUrl}/v1/api/improve`, {
        method: "POST",
        body: formData,
      });

      setIsLoading(false);
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.error || `Error ${response.status}: Failed to get improvement`);
        return;
      }
      
      console.log("Improvement Response:", resData);

      if (resData.data) {
        setData(resData.data);
        router.push("/improve");
      }
    }
  };

  // React.useEffect(()=>{

  //     if (!data.message) {
  //         return (
  //             <>
  //             <Improve/>
  //             </>
  //         )
  //     }
  // }
  // ,[data])

  return (
    <>
      <Section withSun={true}>
        <Toaster />
        {!isLoading ? (
          <div className="flex flex-col items-center w-full max-w-xl gap-8 relative z-10">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-white text-shadow-md text-shadow-[#ff2f00]">
                Refine Your Profile
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
                Enter details to get your improved Linkedin Profile
              </p>
            </div>
            
            <div className="p-8 border border-[#ff2f00]/30 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col gap-6 w-full">
              <form onSubmit={e=>handleFormSubmit(e)}>
                {formLabels.map((item, idx) => (
                  <div
                    key={idx}
                    className="md:flex md:space-y-2 pb-4 md:pb-1 space-y-1"
                  >
                    <div className="w-full">
                      <h1 className="font-semibold text-md text-nowrap">
                        {item.h}
                      </h1>
                      <h2 className="text-[12px] text-[#ffffffa7] font-thin">
                        {item.sh}
                      </h2>
                    </div>
                    <input
                      className="text-sm border border-[#ff2f00] rounded-md h-fit !w-full px-2 py-1"
                      id={item.labelName}
                      name={item.labelName}
                      type={item.type}
                      accept={item.accept}
                      onChange={(e) => handleFormData(item.labelName, e)}
                      placeholder="Enter your details here.."
                      required
                    />
                  </div>
                ))}
                <div
                  // key={idx}
                  className="md:flex md:space-y-2 pb-4 md:pb-1 space-y-1"
                >
                  <div className="w-full">
                    <h1 className="font-semibold text-md text-nowrap">
                      {/* {item.h} */} Model
                    </h1>
                    <h2 className="text-[12px] text-[#ffffffa7] font-thin">
                      {/* {item.sh} */} Choose Model
                    </h2>
                  </div>
                  <select
                    name="model"
                    id="model"
                    onChange={(e) => handleFormData("model", e)}
                    className="focus:outline-none border border-[#ff2f00] rounded-md h-fit !w-full px-2 py-1 text-sm"
                    required
                    defaultValue="select model"
                  >
                    {models.map((item, idx) => (
                      <option
                        key={item.idx}
                        value={item.option}
                        className="bg-black border border-[#ff2f00]"
                      >
                        {item.option}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  // onClick={(e) => handleFormSubmit(e)}
                  className="py-2 bg-[#ff2f00] rounded-md w-full disabled:bg-[#ff2f0088] hover:bg-[#ff3f00]"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Section>
    </>
  );
};

export default userNichePage;
