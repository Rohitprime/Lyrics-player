import TopSongOfArtist from "./TopSongOfArtist";
import { useSelector } from "react-redux";


const RelatedSongs = ({topSongs,latestSongs}) => {
 
  const {isPlaying,activeSong} = useSelector((state)=> state.player)

  return (
  <div className=" absolute  w-full">

    <h1 className="text-2xl text-white font-bold"> Popular</h1>
    <div className="w-full h-[250px] flex flex-col gap-3 overflow-hidden overflow-y-scroll p-2 mt-2">
       {
        topSongs.map((song,i)=>(
          <TopSongOfArtist 
            key={i}
            i={i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            topSongs={topSongs}
          />
        ))
       }
    </div> 

    {latestSongs.length &&<h1 className="text-2xl text-white font-bold mt-4">Latest Releases</h1>}
    <div className="flex flex-wrap mt-2 sm:mx-3 justify-center overflow-y-scroll 
    h-72 sm:h-auto ">
      {
        latestSongs?.map((single)=>(
          
          <div key={single.attributes.name} className="w-[250px] rounded-md p-2 m-3 bg-white/5 bg-opacity-50 backdrop-blur-sm animate-slideup cursor-pointer">
              <img className='rounded-md' src={`${single.attributes?.artwork?.url.substring(0,single.attributes?.artwork?.url.lastIndexOf('/')+1)+'3000x3000bb.jpg'}`}/>
            <h1 className="text-white font-serif font-bold text-xl">{single?.attributes?.name}</h1>
            <p className="text-white/60">{single?.attributes?.releaseDate}</p>
          </div>
        ))
      }
    </div>

  </div>
  )
}

export default RelatedSongs;
