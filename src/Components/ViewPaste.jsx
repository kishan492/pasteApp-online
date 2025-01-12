import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPaste } from '../Redux/pasteSlice';

const ViewPaste = () => {
  const {id}=useParams();
  const allPaste = useSelector((state)=>state.paste.pastes)
  const paste = allPaste.filter((p)=>p._id===id)[0]
  //console.log("final paste",paste)
  return (
    <>
    <div className='flex flex-row gap-7 place-content-between'>
      <input 
      className='mt-2 rounded-2xl p-1 ps-2 w-4/5'
      placeholder='Enter your title here...'
      type='text'
      disabled
      value={paste.title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      {/* <button className = 'mt-2 rounded-2xl p-1 ps-2'
      onClick={createPaste}>
        {
          pasteId ? 'update my paste' : 'cerate my paste'
        }
      </button> */}
    
    
    </div>
    <div className='mt-4 '>
      <textarea
      className='rounded-2xl min-w-[500px] p-4'
      placeholder='Enter your content here...'
      value={paste.content}
      disabled
      onChange={(e)=>setValue(e.target.value)}
      rows={20}
      />
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
    </>
  )
}

export default ViewPaste
