'use client'
import react from 'react';
import Section from '@/components/Section';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const userNichePage = () => {
    const [Image, setImage] = react.useState<string | null>(null);
    const [isFilled, setIsFilled] = react.useState<boolean|null>(false);
    
    const formLabels = [{h:"Goal", sh:"What do you want to do ?", labelName:"goal", type: 'text', accept: 'text'}, 
                        // {h:"You want to call yourself ?", sh:"Eg: Software Engineer, devops Engineer, Assitant Prof.", labelName:"callYourself", type: 'text'}, 
                        {h:"Resume (Optional)", sh:"To know your skillset.", labelName:"resume", type: 'file', accept: 'application/pdf'}];
    
    const handleFormData = async (formData: FormData) => {
        
        const response =  await fetch(`http://localhost:5000/v1/api/improve`,{
            method: 'POST',
            body: formData
        })

        if (!response) { throw new Error("Please Try again, There is some Issue")};

        const resData = await response.json();
        console.log('This is the json response, we get: ', resData);
    }

    const handleFilled = () => {
        setIsFilled(true);
    }

    return (<>
        <Section>
            <div className='p-4 border border-[#ff2f00] rounded-lg flex flex-col gap-4 '>
                <form action={handleFormData}>
                    {formLabels.map((item,idx)=>(
                        <div key={idx} className='md:flex md:space-y-2 pb-4 md:pb-1 space-y-1'>
                            <div className='w-full'>
                            <h1 className='font-semibold text-md text-nowrap'>{item.h}</h1>
                            <h2 className='text-[12px] text-[#ffffffa7] font-thin'>{item.sh}</h2>
                            </div>
                            <input className='text-sm border border-[#ff2f00] rounded-md h-fit !w-full px-2 py-1'  name={item.labelName} type={item.type} accept={item.accept} placeholder='Enter your details here..'/>
                        </div>
                    ))
                }
                    {isFilled && <p className='py-2 text-[12px] text-[#f00000] text-center'>Please fill the required inputs</p>}
                    <button type='submit' className='py-2 bg-[#ff2f00] rounded-md w-full'>Submit</button>
                </form>
            </div>
        </Section>
    </>)
}

export default userNichePage;