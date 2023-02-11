import { useSelector ,useDispatch} from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {BsMusicPlayer} from 'react-icons/bs'
import {IoIosCloseCircle} from 'react-icons/io'
import { setOpen } from './redux/features/playerSlice';
import { fetchFromApi } from './redux/service/sportify';
import { songAction } from './redux/features/songSlice';
import { useEffect } from 'react';



import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, Discover, Search, SongDetails, TopCharts } from './pages';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const open = useSelector(state => state.player.open)
  const dispatch = useDispatch()


  const openHandler = ()=>{
    dispatch(setOpen())
  }

  useEffect(()=>{
    console.log('from app component in useEffect')
    fetchFromApi(`charts/track`)
    .then((data)=>{
       dispatch(songAction.setTopChart(data.tracks))
      
    })
    .catch((err)=> {
      dispatch(songAction.setError(true))
      dispatch(songAction.setErrorMessage(err.message))
    })  
 },[])

  console.log('from app component')

  return (

       
    <div className="relative flex">
     
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px h-[calc(100vh-75px)] overflow-hidden overflow-y-scroll flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40 sm:w-8/12">
            <Routes>
              <Route exact path="/" element={<Discover />} />
              <Route exact path="/:id" element={<Discover />} />
              {/* <Route path="/top-artists" element={<TopArtists />} /> */}
              <Route path="/top-charts" element={<TopCharts />} />
              {/* <Route path="/around-you" element={<AroundYou />} /> */}
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit  md:4/12">
            <TopPlay />
          </div>
        </div>
      </div>
      {!open && <BsMusicPlayer  onClick={openHandler}
      className='absolute z-50 bottom-0 right-0 font-bold text-white/70 cursor-pointer opacity-50 backdrop-blur-2xl w-10 h-10 hover:mb-1 active:p-1'/>}
      {open && <IoIosCloseCircle onClick={openHandler}
      className='absolute z-50 bottom-[92px] right-0 font-bold w-10 h-10 cursor-pointer  text-white/90 opacity-50 backdrop-blur-lg animate-slideup hover:mb-1 active:p-1'/>}
      {open && (activeSong?.title || activeSong?.attributes?.name )&& (
      <div className="absolute h-24 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-50">
         
          <MusicPlayer />
       </div>
      )}
    </div>
  );
};

export default App;
