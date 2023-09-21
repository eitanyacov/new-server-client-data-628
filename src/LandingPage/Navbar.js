import React, { useState } from 'react';
import { Link, animateScroll as scroll, } from 'react-scroll'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'



// import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    const handleClose =()=> setNav(!nav)

    const navigate = useNavigate()

  return (
    <div className='w-screen h-16 z-10 bg-indigo-500 fixed top-0'>
      <div className='flex justify-between items-center w-full h-full px-8'>
        <div className='flex items-center'>
        <div className='flex items-center justify-center group space-x-1 w-28 mt-0 cursor-pointer'>
           <img 
          src="https://upload.wikimedia.org/wikipedia/en/c/c5/Logo_of_Garena_Free_Fire.png"
          // width={180}
          // height={150}
          />
          
           </div>
          {/* <ul className='hidden md:flex'>
          <li><Link to="home" smooth={true} duration={500}>Home</Link></li>
          <li><Link to="about" smooth={true} offset={-200} duration={500}>About</Link></li>
          <li><Link to="support" smooth={true} offset={-50} duration={500}>Support</Link></li>
          <li><Link to="platforms" smooth={true} offset={-100} duration={500}>Platforms</Link></li>
          <li><Link to="pricing" smooth={true} offset={-50} duration={500}>Pricing</Link></li>
          </ul> */}
        </div>
        <ul className='hidden md:flex space-x-8 cursor-pointer'>
          <li><Link to="home" className='text-white text-lg tracking-wide' smooth={true} duration={500}>מחירון</Link></li>
          <li><Link to="about" className='text-white text-lg tracking-wide' smooth={true} offset={-200} duration={500}>עלינו</Link></li>
          <li><Link to="support" className='text-white text-lg tracking-wide' smooth={true} offset={-50} duration={500}>תמיכה טכנית</Link></li>
          <li><Link to="platforms" className='text-white text-lg tracking-wide' smooth={true} offset={-100} duration={500}>פלטפורמות</Link></li>
          <li><Link to="pricing" className='text-white text-lg tracking-wide' smooth={true} offset={-50} duration={500}>דף הבית</Link></li>
        </ul>
        <div className='hidden md:flex pr-4'>
          <button className='border-none bg-transparent text-gray-200 mr-4 text-lg tracking-wide hover:text-white'>
              הרשמה  
          </button>
          {/* <a href='https://nartina.com/login'> */}
           <button className='px-8 py-2 bg-indigo-400 hover:bg-indigo-600 hover:text-gray-200 hover:border-indigo-600 rounded text-gray-100 tracking-wide text-lg' onClick={()=> navigate('/login')}>כניסה</button>
          {/* </a> */}
        </div>
        <div className='md:hidden mr-4' onClick={handleClick}>
            {!nav ? <MenuIcon className='w-5 cursor-pointer' /> : <CloseIcon className='w-5 cursor-pointer' />}
          
        </div>
      </div>

      <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
          <li className='border-b-2 border-zinc-300 w-full cursor-pointer'><Link onClick={handleClose} to="pricing" smooth={true} duration={500}>Home</Link></li>
          <li className='border-b-2 border-zinc-300 w-full cursor-pointer'><Link onClick={handleClose} to="about" smooth={true} offset={-200} duration={500}>About</Link></li>
          <li className='border-b-2 border-zinc-300 w-full cursor-pointer'><Link onClick={handleClose} to="support" smooth={true} offset={-50} duration={500}>Support</Link></li>
          <li className='border-b-2 border-zinc-300 w-full cursor-pointer'><Link onClick={handleClose} to="platforms" smooth={true} offset={-100} duration={500}>Platforms</Link></li>
          <li className='border-b-2 border-zinc-300 w-full cursor-pointer'><Link onClick={handleClose} to="home" smooth={true} offset={-50} duration={500}>Pricing</Link></li>

        <div className='flex flex-col my-4'>
            <button className='bg-transparent text-indigo-600 px-8 py-3 mb-4'>הרשמה</button>
            <button className='px-8 py-3' onClick={()=> navigate('/login')}>כניסה</button>
        </div>
      </ul>
    </div>
  );
}

export default Navbar