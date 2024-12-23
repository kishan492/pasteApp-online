import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'



const initialState= {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse( localStorage.getItem("pastes"))
  : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state,action) => {
      const paste = action.payload;
      // Check if a paste with the same title already exists
      const isDuplicate = state.pastes.some(existingPaste => existingPaste._id === paste._id);

      if (isDuplicate) {
        toast.error("A paste with this title already exists!");
      } else {
        state.pastes.push(paste);

        // Save to localStorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        // Show toast notification
        toast.success("Paste created successfully");
        
      }
    },
    updateToPaste: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=>item._id === paste._id)
      if(index >= 0){
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes))
        toast.success("Your paste updated successfully")
      }else{
        toast.error("your paste doesn't exist")
      }
    },
    resetAllPaste: (state, action) => {
      state.paste=[];
      localStorage.removeItem('pastes')
    },
    removeFromPaste: (state,action)=>{
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item)=>item._id===pasteId)
      if (index>=0){
        state.pastes.splice(index,1)
        localStorage.setItem('pastes',JSON.stringify(state.pastes))
        toast.success('paste deleted successfully')
      }else{toast.error('paste not found')}
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste,removeFromPaste, resetAllPaste } = pasteSlice.actions

export default pasteSlice.reducer