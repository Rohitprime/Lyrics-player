import {FaPauseCircle,FaPlayCircle} from 'react-icons/fa'

const PlayPause = ({isPlaying,activeSong,song,handlePause,handlePlay}) => (

  isPlaying && (activeSong?.title || activeSong?.attributes?.name)  === (song.title || song?.attributes?.name)? 
  (<FaPauseCircle  size={35} 
    className='text-gray-300 cursor-pointer hover:mb-1 hover:animation-ease active:p-1' onClick={handlePause} />
  ):(<FaPlayCircle size={35} 
    className='text-gray-300 cursor-pointer hover:mb-1 hover:animation-ease active:p-1' onClick={handlePlay} />)
)
  


export default PlayPause;
