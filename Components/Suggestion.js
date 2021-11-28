import { Profiler } from "react";
import {  useSession } from 'next-auth/react'
export default function Suggestion({img,username,company}) {
    const {data:session} = useSession();
    return (
        <div
        className="flex items-center justify-between mt-3">
            <img className="w-10 h-10 rounded-full border p-2x" 
            src={img}
            alt=""
            />   
            <div className="flex-1 ml-4">
                <h2 className="font-semibold text-sm">
                    {username}
                </h2>
                <h3 className="text-xs text-gray-400">
                    Works at {company}
                </h3>
            </div> 
            {session? <button className='text-blue-400
            text-xs'> Follow</button>: null}
            
        </div>
    )
} 
