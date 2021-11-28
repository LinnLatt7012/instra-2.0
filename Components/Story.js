function Story(props) {
    const {img,username} = props
    return ( 
        <div >
            <img 
            src={img}
            alt="profile pic" 
            className="h-14 w-14 rounded-full cursor-pointer p-[1.5px] 
            border-red-500 border-2 object-contain
            hover:scale-110 transition transform duration-200 ease-out"
            /> 
            <p className="text-xs w-14 truncate
            text-center">{username}</p>
        </div>
    )
}

export default Story
