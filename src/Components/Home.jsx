import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../Redux/pasteSlice";
const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);
  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(10),
      createdAt: new Date().toISOString(),
    };
    pasteId ? dispatch(updateToPaste(paste)) : dispatch(addToPaste(paste));
    //after updation and creation
    setSearchParams({});
    setTitle("");
    setValue("");
  };
  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);
  return (
    <>
      <div className="max-w-xl mx-auto bg-gray-900 p-4 rounded-md shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write title here....."
            className="flex-grow p-2 rounded-md bg-gray-300 text-black placeholder-gray-600 mr-2"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={createPaste}
          >
            {pasteId ? "update my paste" : "cerate my paste"}
          </button>
        </div>
        <textarea
          placeholder="Enter your content here...."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          className="w-full h-40 p-2 bg-gray-300 text-black rounded-md placeholder-gray-600 resize-none"
        ></textarea>
      </div>
    </>
  );
};

export default Home;
