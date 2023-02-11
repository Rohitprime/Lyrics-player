
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../redux/service/sportify";
import { useDispatch, useSelector } from "react-redux";
import { songAction } from "../redux/features/songSlice";
import { Loader,RelatedSongs } from "../components";
import loadingTurtle from '../assets/images/loadingTurtle.jpg'

const ArtistDetails = () => {
  
const {id} = useParams()
const dispatch = useDispatch();
const loading = useSelector((state)=>(state.song.loading))
const [artist,setArtist] = useState({artwork:{url:loadingTurtle}})
const [topSongs,setTopSongs] = useState([])
const [latestSongs,setLatestSongs] = useState([])
const error = useSelector((state)=> state.song.error);
const errorMessage  = useSelector((state)=>state.song.errorMessage)


  useEffect(()=>{

    dispatch(songAction.setLoading(true))
       fetchFromApi(`artists/get-details?id=${id}`)
       .then((data)=>{
         setArtist(data.data[0]?.attributes)
       })
       .catch((err)=> {
        dispatch(songAction.setError(true))
        dispatch(songAction.setErrorMessage(err.message))
      }) 
    
      fetchFromApi(`artists/get-latest-release?id=${id}`)
      .then((data)=>{
          setLatestSongs(data.data)
      })

      fetchFromApi(`artists/get-top-songs?id=${id}`)
      .then((data)=>{
        setTopSongs(data.data)
        dispatch(songAction.setLoading(false))

      })
      .catch((err)=> {
        dispatch(songAction.setError(true))
        dispatch(songAction.setErrorMessage(err.message))
      }) 



  },[id])

  // if(error ) return <Error message={errorMessage}/>
  if(loading && !error) return(<Loader title={`Artist Detail Loading...`}/>)

  const imgurl = artist?.artwork.url;
  const newImg = imgurl.substring(0,imgurl.lastIndexOf('/')+1)+'1825x1825bb.jpg'

  return(
    <div className="sm:p-6 animate-slideup">
    <div className=" w-full">
        <img src={`${newImg? newImg:loadingTurtle}`} 
        className='w-full h-96 shadow-xl shadow-blue-800/60' alt={`${artist?.name} image`}/> 
    </div>
    <div className="w-full h-screen flex flex-col relative" >
      <div className="absolute z-30 w-full h-full  ">
          <div className="flex flex-col w-full sm:h-56 justify-center p-4 sm:mb-0">
            <h1 className="text-white text-6xl sm:text-9xl font-bold font-serif">{artist?.name}</h1>
          </div>
          <RelatedSongs topSongs={topSongs} latestSongs={latestSongs}/>  
       </div>
    </div>
    </div>
  )
}

export default ArtistDetails;
