import react from 'react';
import Section from '@/components/Section';

const userNichePage = () => {
    
    const formLabels = [{h:"Goal", sh:"What do you want to do ?"}, 
                        {h:"What do You call youself ?", sh:"Eg: Software Engineer, devops Engineer, Assitant Prof."}, 
                        {h:"Resume (Optional)", sh:"to get better output"}];
    
    return (<>
        <Section>
            <div className='p-4 border border-[#ff2f00] rounded-lg flex flex-col gap-4 '>
                {formLabels.map((item,idx)=>(
                    <div key={idx} className='md:flex space-y-2'>
                        <div className='w-full'>
                        <h1 className='font-semibold text-md'>{item.h}</h1>
                        <h2 className='text-[12px]'>{item.sh}</h2>
                        </div>
                        <input className='text-sm border border-[#ff2f00] rounded-md w-full px-2 py-1' type="text" Placeholder='Enter your details here..'/>
                    </div>
                ))
                }
            </div>
        </Section>
    </>)
}

export default userNichePage;