import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    token: null,
    userId: null,
    news : [],
  },
  reducers: {
    addToken: (state, action) => {      
      state.token = action.payload;
    },
    deleteToken : (state) => {
      state.token = null;
    },
    addNews : (state, action) => {
      state.news = action.payload
    },   
  },
})

// Action creators are generated for each case reducer function
export const { addToken, deleteToken, addNews } = dataSlice.actions
export default dataSlice.reducer