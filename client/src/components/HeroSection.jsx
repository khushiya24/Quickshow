import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <div className='relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 
      bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>

      {/* Optional dark overlay for text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10">
        {/* Marvel Logo */}
        <img 
          src={assets.marvelLogo} 
          alt="marvel-logo" 
          className="max-h-11 lg:h-11 mt-20"
        />

        {/* Title */}
        <h1 className='text-5xl md:text-[70px] md:leading-[1.1] font-semibold max-w-[500px]'>
          Guardians <br/> of the Galaxy
        </h1>

        {/* Movie Info */}
        <div className='flex items-center gap-6 text-gray-300 mt-2'>
          <span>Action | Adventure | Sci-fi</span>

          <div className="flex items-center gap-1">
            <CalendarIcon className='w-[18px] h-[18px]' /> 2018
          </div>

          <div className="flex items-center gap-1">
            <ClockIcon className='w-[18px] h-[18px]' /> 2h 8m
          </div>
        </div>
        <p className='max-w-md text-grey-300'>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, to people meet in London and try to stop a conspirancy.</p>
        <button onClick={() => navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover-bg-primary-dull transition rounded-full font-medium cursor-pointer'>
            Explore Movies
            <ArrowRight className='w-5 h-5'/>
        </button>
      </div>
    </div>
  )
}

export default HeroSection

