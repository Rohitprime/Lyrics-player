
import { useDispatch } from "react-redux"
import { playPause,setActiveSong } from "../redux/features/playerSlice";
import PlayPause from './PlayPause';
import { Link } from "react-router-dom";

const TopSongOfArtist = ({song,i,isPlaying,activeSong,topSongs:data})=>{

    const dispatch = useDispatch();

    const handlePauseClick =()=>{
        dispatch(playPause(false))
    }
  
    const handlePlayClick = ()=>{
       dispatch(setActiveSong({song,data,i}))
       dispatch(playPause(true))
    }

    return (
        <div className="flex flex-row h-15 items-center hover:bg-gray-900 backdrop-blur-sm animate-slideup pr-4">
        <p className="mx-2 text-white">{i+1}</p>
        <img 
        src={`${song.attributes?.artwork?.url.substring(0,song.attributes?.artwork?.url.lastIndexOf('/')+1)+'3000x3000bb.jpg'}`} 
        className='h-12 w-12'/>
       
            <h1 className="text-white font-serif mx-3 font-bold">{song?.attributes?.name}</h1> 
        
        <div className='ml-auto self-center'>
        <PlayPause 
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
            />
        </div>
      </div>
    )
}

export default TopSongOfArtist