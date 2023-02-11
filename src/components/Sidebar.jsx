
import {logo} from '../assets'
import { Link } from 'react-router-dom';
import { links } from '../assets/constants';
import { useState } from 'react';
import {RiCloseLine} from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi';

const Sidebar = () => {
const [open,setOpen] = useState(false)

const openHandler = (e)=>{
  setOpen((prevState)=>{
       return !prevState
  })
}

  return(
<>
  {!open &&  <HiOutlineMenu onClick={openHandler}
  className='sm:hidden absolute z-[52] top-0 right-0 h-8 w-8 text-white' />}
   {open && <RiCloseLine onClick={openHandler}
   className='sm:hidden absolute z-[52] top-0 right-0 h-8 w-8 text-white'/>}
<div className={`w-0 sm:w-2/12 sm:bg-[#020a24] h-screen ${open && 'w-screen h-screen absolute top-0 z-[51]' }`}>
  <div className={`${open && 'w-8/12 h-full bg-gradient-to-r from-[#110d2e] backdrop-blur-lg smooth-transition'}`}>
    <div className="flex justify-center pt-6 ">
      <img src={logo} className='h-2/12 w-3/12'></img>
    </div>
    <div className='flex flex-col items-start mt-12 p-2 '>
      {
        links.map((link)=>(
          <Link to={`${link.to}`} key={link.name}>
              <div className='flex flex-row my-2'>
                    <link.icon className='text-white/70 mx-3 h-6 w-6 hover:text-blue-500'/>
                    <h1 className='text-white/50 text-xl font-serif font-bold hover:text-blue-500'>{link.name}</h1>
              </div>
          </Link>
        ))
      }
    </div>
  </div>
</div>
</>
  )
}


export default Sidebar;
