

import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { playPause,setActiveSong } from "../redux/features/playerSlice";
import PlayPause from './PlayPause';

const TopChart = ({song,i,isPlaying,activeSong,data})=>{

    const dispatch = useDispatch();

    const handlePauseClick =()=>{
        dispatch(playPause(false))
    }
  
    const handlePlayClick = ()=>{
       dispatch(setActiveSong({song,data,i}))
       dispatch(playPause(true))
    }

    return (
     <div className="flex flex-row h-20 items-center pr-4
      hover:bg-gray-900 backdrop-blur-sm animate-slideup">
        <p className="mx-2 text-white font-bold">{i+1}</p>
        <img 
        src={`${song?.images?.coverart}`} 
        className='h-16 w-16 rounded-md'/>
        <div className="mx-3">
        <Link to={`/songs/${song?.key}`}>
          <h1 className="text-white font-serif font-bold truncate text-lg">{song?.title.slice(0,25)}</h1>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <h1 className="text-white/50 font-serif truncate">{song?.subtitle.slice(0,20)}</h1>
        </Link>
        </div>
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

export default TopChart