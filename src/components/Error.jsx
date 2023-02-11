import React from 'react';
import alienCow from '../assets/images/alienCow.jpg'

const coords = {x:0,y:0}


const Error = ({ message = 'This Is Probably Not What You Were Searching For', custom }) => {
  return (
    <div className='w-full flex flex-col justify-center items-center relative'>
      <div className='w-full h-full rounded-full sm:p-4'>
        <img src={alienCow} className='' alt='cow' />
      </div>
      <div className='w-full sm:h-[520px] h-[240px] absolute top-0 flex justify-center items-center'>
        <div id='a' className={`w-[50px] h-[50px] rounded-full border border-[#b2b6e8] sm:mr-[270px] mt-24 sm:mt-44 mr-[150px]
        backdrop-blur-xl animate-ping  absolute`}></div>
      </div>
      <div className='w-full flex justify-center items-center backdrop-blur-lg sm:p-4'>
        <div className='w-full h-[150px] rounded-xl opacity-80 backdrop-blur-sm animate-bounce bg-gradient-to-b from-[#726d9d]'>
          <h1 className='text-bold text-white font-serif text-4xl mt-2 text-center '>{ }</h1>
          <h1 className='text-bold text-white font-serif sm:text-4xl text-2xl mt-2 text-center '>
            {message === 'Request failed with status code 429' ? custom : message}
          </h1>
        </div>
      </div>

    </div>
  )

}

export default Error;
