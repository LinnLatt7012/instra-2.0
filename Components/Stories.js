import faker from "faker";
import { useEffect, useState } from "react";
import Story from "./Story";

function Stories({img=null,username=null}) {
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        const suggestions = [...Array(20)].map((_,i)=>({
            ...faker.helpers.contextualCard(),
            id: i
        }));
        setSuggestions(suggestions)
        return () => {
            
        }
    }, [])
    

    return ( 
        <div className="flex space-x-2 p-2 md-p-6 bg-white 
        mt-4 md:mt-8 border-gray-200 rounded-sm 
        overflow-x-scroll scrollbar-thin
        scrollbar-thumb-black scrollbar-hide md:scrollbar-default">
            {img && <Story 
                img={img}
                username={username} />}
            {suggestions.map(profile => (
                <Story 
                key={profile.id} 
                img={profile.avatar}
                username={profile.username} />
            ))}
        </div>
    )
}

export default Stories
