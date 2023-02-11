
import { Error,Loader,SongCard } from "../components";
import { useState,useEffect } from "react";
import { fetchFromApi } from "../redux/service/sportify";
import { useSelector,useDispatch } from "react-redux";
import { songAction } from "../redux/features/songSlice";
import { useParams } from "react-router-dom";


const Search = () => {
   const[loading,setLoading] = useState(true);
   const[songs,setSongs] = useState({})
   const dispatch = useDispatch();
   const [error , setError] = useState(null)
   const {activeSong,isPlaying} = useSelector((state)=>state.player)
   const { searchTerm } = useParams();

 
   useEffect(()=>{
      setLoading(true)
      fetchFromApi(`search?term=${searchTerm}`)
      .then((data)=>{
         setSongs(data)
         setLoading(false)
      })
      .catch((err)=> {
         setError(err.message)
         setLoading(false)
         dispatch(songAction.setErrorMessage(err.message))
       })

   },[searchTerm])
   
   console.log('from search term')

   if(error ) return <Error message={error}/>
   if(loading) return(<Loader title={`Searching for : ${searchTerm}`}/>)
   if(!songs.tracks) return <Error message="Sorry Nothing Found To Related Search .! Plz Try SomeThing Else"/>

   return(
    <div className=" h-screen w-full ">
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

export default Search;

