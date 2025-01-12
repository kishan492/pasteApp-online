import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../Redux/pasteSlice';
import { Link } from 'react-router-dom';

const Paste = () => {
  // const fullState = useSelector((state) => state);
  // console.log('Full State:', fullState);
  const pastes = useSelector((state)=>state.paste.pastes);   //state mai se state.paste ki value(.pastes ) nikalkar do
  //console.log("pastes",pastes)
  const dispatch =useDispatch();
  const [searchTerm,setSearchTerm]=useState('');
  const filteredData = pastes.filter((paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDelete=(pasteId)=>{
    dispatch(removeFromPaste(pasteId))
  }
  
  return (
    <div className="p-4 max-w-4xl mx-auto">
      
      <input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      
      <div className="mt-4  grid gap-4 ">
        {filteredData.length>0 && filteredData.map(paste => (
          <div
            key={paste?._id}
            className="  border border-gray-200 rounded-md p-4 shadow-sm bg-white max-w-4xl "
          >
            
            
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800 p-2 ">{paste.title}</h2>
              <div className="space-x-1 ">
                <button className="text-blue-500 hover:underline  text-sm items-center justify-center"><Link to={`/?pasteId=${paste?._id}`}>Edit</Link></button>
                <button className="text-green-500 hover:underline  text-sm  items-center justify-center"><Link to={`/pastes/${paste?._id}`}>View</Link></button>
                <button className="text-red-500 hover:underline  text-sm  items-center justify-center" onClick={()=>handleDelete(paste?._id)}>Delete</button>
                <button className="text-gray-500 hover:underline  text-sm  items-center justify-center" onClick={() => {navigator.clipboard.writeText(paste?.content); toast.success('copied to clipboard')}}>Copy</button>
                <button className="text-purple-500 hover:underline  text-sm flex-row items-center justify-center" onClick={()=>{navigator.clipboard.writeText(`${window.location.origin}/pastes/${paste._id}` );alert('Link copied to clipboard!')}}>Share</button>
              </div>
            </div>

            
            <p className="text-gray-600 mt-2 line-clamp-2 text-ellipsis justify-self-start overflow-hidden break-words">{paste.content}</p>

            
            <p className="text-sm text-gray-500 mt-2 justify-self-end ">Created on: {new Date(paste.createdAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
          </div>
        ))}
      </div>
      <footer className="mt-8 text-center">
        <p className="text-white">
          View this project on{" "}
          <a
            href="https://github.com/kishan492/pasteApp-online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Paste
