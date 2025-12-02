// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import { ArrowRight } from "lucide-react";   // <-- FIXED
// import BlurCircle from './BlurCircle';

// const FeaturedSection = () => {

//     const navigate = useNavigate();

//     return (
//         <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>

//             <div className='flex items-center justify-between'>
//                 <BlurCircle top='0' right='-80px'/>
//                 <p className='text-gray-300 font-medium text-lg'>Now Showing</p>

//                 <button 
//                     onClick={() => navigate('/movies')} 
//                     className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'
//                 >
//                     View All
//                     <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5' />
//                 </button>
//             </div>

//             <div></div>
//             <div className='flex justify-center mt-20'>
//                 <button onClick={() => {navigate('/movies'); scrollTo(0,0)}}
//                 className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>

//             </div>
        
//         </div>
//     )
// }

// export default FeaturedSection

import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from "lucide-react";
import BlurCircle from './BlurCircle';

// ✅ IMPORT THESE
import { dummyShowsData } from "../assets/assets";   // <-- fix the path if needed
import MovieCards from './MovieCards';               // <-- fix path if needed

const FeaturedSection = () => {

  const navigate = useNavigate();

  return (
    <div className='relative px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>

      <div className='flex items-center justify-between'>
        
        {/* Glowing background blur */}
        <BlurCircle top='-50px' right='-120px' />

        <p className='text-gray-300 font-medium text-lg'>Now Showing</p>

        <button 
          onClick={() => navigate('/movies')} 
          className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'
        >
          View All
          <ArrowRight className='group-hover:translate-x-0.5 transition w-4 h-4' />
        </button>
      </div>

      {/* Coming movies will go here */}
      <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>
        {dummyShowsData.slice(0,4).map((show) => (
            <MovieCards key={show._id} movie={show} />
        ))}
      </div>

      <div className='flex justify-center mt-20'>
        <button 
          onClick={() => { navigate('/movies'); scrollTo(0, 0); }}
          className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'
        >
          Show more
        </button>
      </div>

    </div>
  )
}

export default FeaturedSection


