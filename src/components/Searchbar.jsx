import { useState } from "react";
import {FaSearch} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

const Searchbar = () => {

  const [search,setSearch] = useState('');
  const [error ,setError] = useState(false)
  const navigate = useNavigate();

  const changeHandler = (e)=>{
    setSearch(e.target.value);
  }

  const summitHandler = ()=>{
      
      if(search === ''){
        setError(true)
        return;
      }
       return navigate(`/search/${search}`)
  }



  return(
    <div className="text-bold font-serif flex my-2">
     <div className="h-full flex flex-row w-full border-b-2 sm:border-b-0 p-2">
        <input type='text' 
        className={`rounded-md w-3/6 bg-white/30 text-white 
        font-bold font-serif h-10 ml-16 sm:ml-24 rounded-r-none ${error && 'border border-rose-800'}`}
        placeholder={`${error?'Plz Enter Song Or Artist Name':'search..'}`}
        value={search} 
        onChange={changeHandler}/>
        <div className="w-[50px] h-10 flex justify-center items-center bg-white/40 rounded rounded-l-none cursor-pointer"
        onClick={summitHandler}> 
        <FaSearch className='text-white w-6 h-6 hover:mb-1 active:p-1'/>
        </div>
     </div>
    </div>
  )
}


export default Searchbar;
