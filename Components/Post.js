
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline";

import {
    HeartIcon as HeartIconFilled
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "@firebase/firestore"
import { db } from "../firebase"
import Moment  from "react-moment";
function Post({id, username,userImg,img,caption}) {
    const {data:session} = useSession()
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    useEffect(() => onSnapshot(
        query(
            collection(db,"posts",id,"comments"),orderBy('timestamp','desc')),
        snapshot => setComments(snapshot.docs)
    ), [db,id])
    
    useEffect(() => onSnapshot(
            collection(db,"posts",id,"likes"),
        snapshot => setLikes(snapshot.docs)
    ), [db,id])
    
    useEffect(() => 
        setHasLiked(
            likes.findIndex((like)=>like.id=== session?.user.uid) !== -1
        )
    , [likes])
    

    const likePost = async () => {
        if(hasLiked){
            await deleteDoc(doc(db,'posts',id,'likes',session?.user.uid))
        }else{
            await setDoc(doc(db,'posts',id,'likes',session?.user.uid),{
                username:session.user.username
            })
        }
    }

    const sentComment = async (e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment("");
        await addDoc(collection(db, "posts", id, "comments"),{
            comment: commentToSend,
            username: session?.user.username,
            userImage: session?.user.image,
            timestamp: serverTimestamp(),
        })
    }
    return (
        <div className="bg-white my-7 border rounded-sm">
            {/* header */}
            <div className="flex items-center p-5 ">
                <img 
                src={userImg}
                className="rounded-full h-12 w-12
                object-contain border p1 mr-3"
                alt=""
                />
                <p className="flex-1 font-bold">{username}</p>
                <DotsHorizontalIcon  className="h-5"/>
            </div>
            {/* img */}
            <img src={img} className="object-cover
            w-full" />
            {/* Button */}
            {session && 
            <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4 ">
                    {
                        hasLiked?
                        <HeartIconFilled  className="btn text-red-500 " onClick={likePost}/>
                        :
                        <HeartIcon  className="btn" onClick={likePost}/>
                    }
                    <ChatIcon className="btn" />
                    <PaperAirplaneIcon  className="btn"/> 
                </div>
                <BookmarkIcon className="btn" />
                
            </div>
            }
            
            {/* caption */}
            <p className="p-5 pb-2 truncate">
                {likes.length > 0?
                <p className="font-bold mb-l"> {likes.length} {likes.length >1? "likes":"like"}</p>:
                null
                }
                <span className="font-bold mt-1 mr-2">{username}</span>
                {caption} 
            </p>
            {/* comments */}
            {comments.length > 0 && (
                <>
                {comments.length > 0?
                        <p className="font-bold ml-2 pl-3"> {comments.length} {comments.length >1? "comments":"comment"}</p>:
                        null
                    }
                <div className="ml-10 h-20 overflow-y-scroll 
                scrollbar-thumb-black scrollbar-thin">
                    
                    {comments.map((comment)=>(
                        <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                            <img src={comment.data().userImage} 
                             alt="" 
                             className="h-8 rounded-full"/>
                            <p className="text-sm flex-1"><span className="font-bold mt-1 mr-2">{comment.data().username}</span>{comment.data().comment}</p>
                            <Moment fromNow className="pr -5 text-xs">{comment.data().timestamp?.toDate()}</Moment>
                        </div>
                    )) }
                </div>
                </>
            )  
            }
            {/* input box */}
            {session &&  
            <form className="flex items-center p-4">
                <EmojiHappyIcon className='h-7' />
                <input type='text'
                name="comment"
                onChange={e=>setComment(e.target.value)}
                value={comment}
                placeholder="Add a comment..."
                className="border-none flex-1 focus:ring-0 outline-none" 
                />
                <button 
                 type="submit" 
                 className="font-semibold text-blue-400"
                 disabled={!comment}
                 onClick={sentComment}
                 > Post 
                </button>
            </form>
            }
        </div>
    )
}

export default Post
