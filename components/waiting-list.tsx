import react, { MouseEvent, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Play, CircleCheckBig } from 'lucide-react';
import axios from 'axios';
import Loader from './Loader';

const emailFormat = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

const WaitingList = () => {
    const [email, setEmail] = useState<string>('');
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleJoinWaitingList = async (e: MouseEvent) => {

        if (email.length > 3) {
            setIsLoading(true);
            e.preventDefault()
            await axios.post('https://linkroast.vercel.app/api/v1/waitinglist', {email})
            .then(res => {
                setResponse(res.data)
                setIsLoading(false);
            })
            .catch(err => setError(err));
        } 
    }

    if (response) {
        return (<>
            <div className='py-3 px-6 bg-stone-900 flex gap-2 rounded-md'>
                Thanks for Joining<span className='text-[#ff2f00]'><CircleCheckBig/></span>
            </div>
        </>)
    }

    if (isLoading) {
        return (<>
                <Loader/>
                </>)
    }
        
    return (
    <>
        <div className='flex gap-4 mt-8 sm:mt-10 flex flex-col items-start sm:flex-row'>          
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='focus:border-none outline-none w-80 h-fit py-3 px-2 bg-stone-900 rounded-xl' />
            <button onClick={(e) => handleJoinWaitingList(e)} className='border border-[#ff2f00ff] tracking-tight hover:shadow-[0_0_2px_2px_#ff2f00] bg-orange-700 font-medium rounded-full px-4 py-3 flex text-sm sm:text-base'>Join Waiting List <Play className='size-4 sm:size-5 ml-1' /></button>
        </div>
    </>
)}

export default WaitingList;