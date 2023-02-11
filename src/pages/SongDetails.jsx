import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFromApi } from "../redux/service/sportify";
import { Loader,SongCard,Error } from "../components";
import PlayPause from "../components/PlayPause";
import { useSelector,useDispatch } from "react-redux";
import { playPause,setActiveSong } from "../redux/features/playerSlice";
import ReactPlayer from "react-player";

const SongDetails = () => {
    const {songid} = useParams()
    const [error , setError] = useState(null)
    const[loading,setLoading] = useState(true);
    const [song,setSong] = useState(null)
    const {isPlaying,activeSong} = useSelector(state => state.player)
    const dispatch = useDispatch()

    useEffect(()=>{
        setLoading(true)
        // fetchFromApi(`track_lyrics/?id=${songid}`).
        // then((data)=>(
        //     setSongLyric(data?.lyrics?.lines)
        //   ))
        
        fetchFromApi(`songs/get-details?key=${songid}`)
        .then((data)=>{
          
            setSong(data)
            setLoading(false)
        })
        .catch((e)=>{
            setError(e.message)
        })


    },[songid])
 
    if(error ) return(<Error custom={`Sorry Could Not Load The song Detail`} message={error}/>)
    if(loading) return(<Loader title={'Loading Song Details'}/>)
 
    const data = {};
    const i=1;

    const handlePauseClick =()=>{
        dispatch(playPause(false))
    }
  
    const handlePlayClick = ()=>{
       dispatch(setActiveSong({song,data,i}))
       dispatch(playPause(true))
    }
  
    let youtubeUrl = 'Mx_OexsUI2M'
    let lyric = []

    song?.sections?.forEach((element)=>{
         
        if(element.type==='VIDEO'){
            youtubeUrl = element.youtubeurl?.actions[0]?.uri.slice(17,28)
        }
        if(element.type === 'LYRICS'){
            lyric = element.text;
        }
    })

    return(
        <div className="w-full h-full my-5 animate-slideup">
            <div className="flex flex-row mx-0 items-center bg-gradient-to-r from-[#6752ef] sm:h-60">
               <div className="rounded-full ml-4">
                  <img src={`${song?.images?.coverart}`}
                   className='rounded-full h-20 w-20 sm:h-40 sm:w-40'  />
               </div>
               <div className="flex flex-col mx-8 mt-1">
                   <h1 className="text-white font-bold font-serif text-xl sm:text-5xl truncate ">{song?.title?.slice(0,20)}</h1>
                <h1 className="text-white/60 font-bold font-serif">genere - {song?.genres?.primary}</h1>
                <div className="flex flex-row my-2"> 
                   <Link to={`/artists/${song?.artists[0].adamid}`}>
                     <h1 className="text-white/60 font-bold font-serif mt-1 mx-3">{song?.subtitle}</h1>
                   </Link>
                   <div >
                    <PlayPause 
                       song={song}
                       handlePause={handlePauseClick}
                       handlePlay={handlePlayClick}
                       isPlaying={isPlaying}
                       activeSong={activeSong}
                       className="mx-3 w-16 h-16 hover:w-20 hover:h-20"
                    />
                   </div>
                </div>
               </div>
            </div>
            <div className="w-full sm:h-full mt-2 ml-1 sm:mx-8 flex-wrap p-2 flex-col-reverse sm:flex-col">
                <div className="flex flex-col items-center justify-center
                 w-[400px] h-[500px] sm:mr-10 p-4 sm:w-full sm:h-full">
                    <h1 className="text-white text-2xl font-serif font-bold text-center my-2">Video</h1>
                    {/* <iframe class="w-full aspect-video" src={`https://www.youtube.com/watch?v=${youtubeUrl}`}></iframe> */}
                        <ReactPlayer 
                        url={`https://www.youtube.com/watch?v=${youtubeUrl}`} 
                        className='react-player shadow-2xl shadow-blue-500/50 sm:mr-10 ' 
                        controls/>
                </div>
             <div className="">
                {lyric.length && 
                <div 
                className="w-full sm:h-full mt-5 sm:mt-2 ml-1 sm:mx-8 flex-wrap overflow-hidden overflow-x-scroll">
                    <h1 className="text-white text-3xl font-serif font-bold text-start my-3">Lyrics</h1>
                    {lyric.map((e)=>(

                      <h1 className="text-white font-serif font-bold text-start">{e}</h1>
                    ))}
                    </div>
                  }
             </div>
            </div>
        </div>
    )
};

export default SongDetails;
