import { useSelector} from "react-redux";
import {TopChart} from './index'
import 'swiper/css'
import 'swiper/css/free-mode'
import { Link } from "react-router-dom";

const TopPlay = () => {
 
  const topChart = useSelector((state)=>state.song.topChart)
  const {isPlaying,activeSong} = useSelector((state)=> state.player)
   



  return(
    <div className="w-screen sm:w-[420px] h-full mb-5" >

      <div className="w-full h-[450px] overflow-hidden overflow-y-scroll animate-slideright slide">
        <div className="flex flex-row justify-between m-2 h-10">
          <h1 className="text-white font-serif text-2xl mx-4 font-bold">Top Chart</h1>
          <Link to='/top-charts'>
             <h1 className="text-white/70 font-serif text-lg mx-4 font-bold hover:mb-2 active:p-1">See More</h1>
          </Link>
        </div>
        <div className="flex flex-col">
            {
              topChart.slice(0,10).map((song,i)=>(
                <TopChart 
                   song={song}
                   key={i}
                   i={i}
                   data={topChart}
                   isPlaying={isPlaying}
                   activeSong={activeSong}
                />
              ))
            }
        </div>
      </div>
      
      <div className="h-[2px] w-full bg-gradient-to-r from-white/75 to-blue-600 drop-shadow-lg opacity-25"></div>
      
    </div>
  )

}

export default TopPlay;
