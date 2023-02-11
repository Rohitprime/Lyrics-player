
import {useSelector } from 'react-redux';
import {SongCard } from '../components';


const TopCharts = () =>
{

 const topChart = useSelector((state)=>state.song.topChart)
 const {isPlaying,activeSong} = useSelector(state=>state.player)

  return(
    <div className=" h-screen w-full ">
    <div className=" w-full p-3  flex  flex-col sm:flex-row justify-center items-center">
     <h1 className='text-4xl text-white font-bold font-serif'>Top Chart</h1>
    </div>
    <div className="flex flex-wrap mx-6 sm:mx-3 justify-center">
       {topChart.map((song,i)=>(
         <SongCard
          key={i}
          song={{track:song}} 
          i={i}
          isPlaying={isPlaying}
          activeSong={activeSong}
          data={topChart}/>
       ))}
    </div>
 </div>
)};

export default TopCharts;


