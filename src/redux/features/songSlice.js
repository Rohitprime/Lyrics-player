import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    artists:[],
    songs:{},
    loading:false,
    error:false,
    errorMessage:"",
    topChart:[]
}

const songSlice = createSlice({
    name:'songSlice',
    initialState,
    reducers:{
        setArtists:(state,action)=>{state.artists = action.payload},
        setSongs:(state,action)=>{state.songs = action.payload},
        setLoading:(state,action)=>{state.loading = action.payload},
        setError:(state,action)=>{state.error=action.payload},
        setErrorMessage:(state,action)=>{state.errorMessage = action.payload},
        setTopChart:(state,action)=>{state.topChart = action.payload}
    }
})

export default  songSlice.reducer
export const songAction = songSlice.actions