'use client'
import react from 'react';
import Section from '@/components/Section';


const userNichePage = () => {
    const [Image, setImage] = react.useState<string | null>(null);
    const [isFilled, setIsFilled] = react.useState<boolean|null>(false);
    
    const formLabels = [{h:"Goal", sh:"What do you want to do ?", labelName:"goal", type: 'text', accept: 'text'}, 
                        // {h:"You want to call yourself ?", sh:"Eg: Software Engineer, devops Engineer, Assitant Prof.", labelName:"callYourself", type: 'text'}, 
                        {h:"Resume (Optional)", sh:"To know your skillset.", labelName:"resume", type: 'file', accept: 'application/pdf'}];
    
    const handleFormData = (formData: FormData) => {
        let data:Object = {};
        data['goal'] = formData.get('goal');
        // data['callYourself'] = formData.get('callYourself');
        data['resume'] = formData.get('resume');
        alert(`${data['resume']}`)
        console.log(data);
        
        const response =  await fetch(`${SERVER_URL}`,{
            method: 'POST',
            // headers: {'Content-Type': 'application/json'},
            body: data
        })

        if (!response.ok) { throw new Error("Please Try again, There is some Issue")}

        const resData = response.json();
        console.log('This is the json response, we get: ',resData);
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