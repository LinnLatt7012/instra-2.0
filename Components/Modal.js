import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore"
import {db,storage} from "../firebase"
import {
    PlusCircleIcon,
} from "@heroicons/react/outline"
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
function Modal() {
    const {data:session} = useSession();
    const [open, setOpen] = useRecoilState(modalState); 
    const fileInput = useRef()
    const capInput = useRef()
    const [selectedFile, setSelectedFile] = useState();
	const [isloading, setIsloading] = useState(false);
    const changeHandler = async(event) => {
        // console.log(event.target.files)
        const reader = new FileReader();
        if(event.target.files[0]){
            reader.readAsDataURL(event.target.files[0])
        }
        reader.onload=(rE) =>{
            setSelectedFile(rE.target.result)
            // console.log(rE.target.result)
        }
	}
    const uploadPost = async() =>{
        if(isloading) {return}
        setIsloading(true)
        const docRef = await addDoc(collection(db,'posts'),{
            username: session.user.username,
            userImg: session.user.image,
            caption: capInput.current.value,
            timestamps: serverTimestamp()
        })
        console.log("new doc added",docRef.id)
        const imageRef = ref(storage,`posts/${docRef.id}/image`);
        await uploadString(imageRef,selectedFile,"data_url").then(
            async (snapshot) =>{
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db,'posts', docRef.id),{
                image:downloadURL
            })
        })
        setSelectedFile(null)
        setOpen(false)
        setIsloading(false)

    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog 
              as='div'
              className='fixed z-10 inset-0 overflow-y-auto'
              onClose={setOpen}
            >
                <div className='flex items-end justify-center min-h-[800px] 
                sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                     <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0"
                     enterTo="opacity-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100"
                     leaveTo="opacity-0"
                     >
                         <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "/>
                     </Transition.Child>
                     <span
                      className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                     >
                         &#8203;
                     </span>
                     <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0"
                     enterTo="opacity-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100"
                     leaveTo="opacity-0"
                     >
                        <div className="inline-block align-bottom
                         bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden
                         shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                             { selectedFile? (<img
                                            src={selectedFile}
                                            className="w-full object-contain cursor-pointer"
                                            onClick={()=>setSelectedFile(null)}
                                        />) : 
                                        (<div className="flex justify-center max-w-6xl mx-auto h-12 w-12 rounded-full 
                                            bg-red-180 cursor-pointer">
                                            <PlusCircleIcon onClick={()=>{fileInput.current.click()}} className="w-12 mx-auto" />     
                                        </div>)}
                            
                            <div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title className="text-lg leading-6 font-medium text-grey-900">
                                        {isloading? 'loading...... '  :  "Upload a photo"}
                                    </Dialog.Title>
                                    <div>
                                    <input 
                                            className=""
                                            type="file"
                                            hidden
                                            ref={fileInput}
                                            onChange={changeHandler}
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            className="border-none focus:ring-0 w-full text-center"
                                            type="text"
                                            placeholder="please enter a captions..."
                                            ref={capInput}
                                        />
                                    </div>
                                
                                </div>
                                <button class="group relative w-full flex justify-center py-2
                                px-4 border border-transparent text-sm font-medium rounded-md 
                                text-white bg-indigo-600 hover:bg-indigo-700 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 
                                focus:ring-indigo-500 hover:disabled:bg-gray-600"
                                disabled={!selectedFile}
                                onClick={uploadPost}>
                                {isloading? 'Uploading...... '  :  "Upload a photo"}
                                </button>
                            </div>
                         </div>
                     </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
