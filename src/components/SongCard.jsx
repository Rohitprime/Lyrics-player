import {Link } from 'react-router-dom'
import PlayPause from './PlayPause';
import { playPause,setActiveSong } from '../redux/features/playerSlice';
import { useDispatch } from 'react-redux';

const SongCard = ({song:{track},i,isPlaying,activeSong,data}) =>
{
 const song=track;
const dispatch = useDispatch()

  const handlePauseClick =()=>{
      dispatch(playPause(false))
  }

  const handlePlayClick = ()=>{
     dispatch(setActiveSong({song,data,i}))
     dispatch(playPause(true))
  }

  return(
  <div className="sm:w-[240px] w-[139px]  rounded-md p-2 m-3 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup cursor-pointer">
  <div className='relative w-full h-38 sm:h-56 group'>
    <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50
    group-hover:flex ${activeSong?.title === track.title ? 'flex bg-black bg-opacity-70':'hidden'} `}>
      <PlayPause 
      song={track}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
      isPlaying={isPlaying}
      activeSong={activeSong}/>
    </div>
    <img className='rounded-md h-full' src={track?.images?.coverart}/>
  </div>

   <div className='mt-4 flex flex-col'>
      <Link to={`/songs/${track?.key}`}>
        <h1 className="text-white font-serif font-bold text-xl truncate">{track?.title}</h1>
      </Link>
  
      <Link to={`/artists/${track?.artists ? track?.artists[0].adamid : '670534462'}`}>
            <h1 className="text-white/50 font-robot  ">{track?.subtitle}</h1>
          </Link>
            
    
    
   </div>
  </div>
)};

export default SongCard;
