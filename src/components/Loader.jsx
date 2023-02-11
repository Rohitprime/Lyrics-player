import {loader} from '../assets'
import loadingTurle from '../assets/images/loadingTurtle.jpg'

const Loader = ({title}) => (

  <div className='w-full flex flex-col justify-center items-center relative animate-pulse mt-4'>
    <img src={loadingTurle} className='w-[380px] h-[200px] sm:w-[600px] sm:h-[300px] 
    rounded-xl shadow-xl shadow-blue-500/50 '/>
    <img src={loader} className='w-2/12 h-2/12 sm:w-1/12 sm:h-1/12 absolute top-0 ml-52 sm:ml-72 mb-3'/>
    <h1 className='text-bold text-white font-serif text-2xl mt-2 absolute bottom-2'></h1>
  </div>
);

export default Loader;
