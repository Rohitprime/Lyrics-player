
import { Error,Loader,SongCard } from "../components";
import {genres} from '../assets/constants'
import { useState,useEffect } from "react";
import { fetchFromApi } from "../redux/service/sportify";
import { useSelector,useDispatch } from "react-redux";
import { songAction } from "../redux/features/songSlice";

const Discover = () => {
   const[genraTitle ,setGenraTitle] = useState('Pop')
   const[loading,setLoading] = useState(true);
   const songs = useSelector((state)=> state.song.songs)
   const dispatch = useDispatch();
   const error = useSelector((state)=> state.song.error);
   const errorMessage  = useSelector((state)=>state.song.errorMessage)
   const {activeSong,isPlaying} = useSelector((state)=>state.player)

   const optionhandler = (e)=>{
      setGenraTitle(e.target.value)
   }

   useEffect(()=>{
      setLoading(true)
      fetchFromApi(`search?term=${genraTitle}&limit=22`)
      .then((data)=>{
         dispatch(songAction.setSongs(data))
         setLoading(false)
      })
      .catch((err)=> {
         dispatch(songAction.setError(true))
         dispatch(songAction.setErrorMessage(err.message))
       })

   },[genraTitle])



   if(error ) return <Error message={errorMessage} custom='Somthing Went Wrong ! Try Again'/>
   if(loading && !error) return(<Loader title={`${genraTitle} Song Loading...`}/>)
   
   // console.log(songs)

   return(
    <div className=" h-screen w-full ">
       <div className=" w-full p-3  flex sm:justify-between flex-col sm:flex-row justify-center items-center">
        <h1 className="sm:mx-2 text-white font-serif font-bold text-3xl ">Discover  {genraTitle}</h1>
        <select className="mx-4 my-2 sm:my-0 outline-none px-2 py-1 rounded-lg bg-white/60"
        onChange={optionhandler}
        value={genraTitle}>
         {genres.map((genre)=>(
            <option key={genre.title}>{genre.title}</option>
         ))}
        </select>
       </div>
       <div className="flex flex-wrap mx-6 sm:mx-3 justify-center">
          {songs?.tracks?.hits.map((song,i)=>(
            <SongCard
             key={i}
             song={song} 
             i={i}
             isPlaying={isPlaying}
             activeSong={activeSong}
             data={songs}/>
          ))}
       </div>
       <div></div>
    </div>
   )
}

export default Discover;
