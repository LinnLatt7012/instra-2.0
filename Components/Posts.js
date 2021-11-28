import { useEffect, useState } from "react"
import Post from "./Post"
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"
import { db} from "../firebase"
// const posts =[
//     {
//         id: 1,
//         username: "Linn Latt",
//         userImg: "https://asianwiki.com/images/7/7c/Nam_Joo-Hyuk-PR002.jpg",
//         img: "https://asianwiki.com/images/7/7c/Nam_Joo-Hyuk-PR002.jpg",
//         caption: "SUBSCRIBE AND DESTORY THE LIKE BUTTON for the YT algorithm!",
//     },
//     {
//         id: 2,
//         username: "Linn Latt",
//         userImg: "https://asianwiki.com/images/4/45/Start_Up-Nam_Joo_Hyuk.jpg",
//         img: "https://asianwiki.com/images/4/45/Start_Up-Nam_Joo_Hyuk.jpg",
//         caption: "SUBSCRIBE AND DESTORY THE LIKE BUTTON for the YT algorithm!",
//     },
//     {
//         id: 3,
//         username: "Linn Latt",
//         userImg: "https://wallpaperaccess.com/full/2051015.jpg",
//         img: "https://wallpaperaccess.com/full/2051015.jpg",
//         caption: "SUBSCRIBE AND DESTORY THE LIKE BUTTON for the YT algorithm!",
//     },
// ]
function Posts() {
    const [posts, setPosts] = useState([])
    useEffect(() => 
        onSnapshot(
            query(collection(db,'posts'),orderBy('timestamps','desc')),
            snapshot =>{
               setPosts(snapshot.docs)
            }
        )
    , [db]
    );
    return (
        <div>
            {posts.map((post)=>(
                <Post 
                key={post.id} 
                id={post.id}
                username={post.data().username}
                userImg={post.data().userImg}
                img={post.data().image}
                caption={post.data().caption}
                />
            ))}
        </div>
    )
}

export default Posts
