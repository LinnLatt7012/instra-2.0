import faker from "faker";
import { useEffect, useState } from "react";
import Suggestion from "./Suggestion";

function Suggestions() {
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        const suggestions = [...Array(5)].map((_,i)=>({
            ...faker.helpers.contextualCard(),
            id: i
        }));
        setSuggestions(suggestions)
        return () => {
            
        }
    }, [])
    
    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between text-sm mb-5">  
                <h3 className="text-sm font-bold text-gray-400"> Suggestions for you</h3>
                <button className='text-gray-600 font-semibold' >See All</button>
            </div>
            {suggestions.map(profile => (
                <Suggestion 
                key={profile.id} 
                img='https://asianwiki.com/images/4/45/Start_Up-Nam_Joo_Hyuk.jpg'
                username={profile.username}
                company={profile.company.name} />
            ))}
        </div>
    )
}

export default Suggestions



