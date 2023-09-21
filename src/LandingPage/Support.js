import React from 'react'
// import { PhoneIcon, ArrowSmRightIcon } from '@heroicons/react/outline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MemoryIcon from '@mui/icons-material/Memory';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EastIcon from '@mui/icons-material/East';
// import {ChipIcon, SupportIcon} from '@heroicons/react/solid'

import supportImg from '../assets/support.jpg'


const Support = () => {
  return (
    <div name='support' className='w-full mt-24'>
      <div className='w-full h-[700px] bg-gray-900/90 absolute'>
        <img className='w-full h-full object-cover mix-blend-overlay' src={supportImg} alt="/" />
      </div>
      
      <div className='max-w-[1240px] mx-auto text-white relative'>
          <div className='px-4 py-12'>
              <h2 className='text-4xl pt-8 text-slate-300 uppercase text-center'>תמיכה טכנית</h2>
              <h3 className='text-5xl font-bold py-6 text-center'>תוכנה חכמה ומתקדמת לניהול</h3>
              <p className='py-4 text-3xl text-slate-300 text-center'>עד לאחרונה, רק עסקים גדולים השקיעו בתוכנות מתקדמות לניהול עסק, ועם הזמן החלו לצוץ תוכנות מדף לניהול עסקים המתאימות גם לעסקים הקטנים והבינוניים. המעבר לתוכנת ניהול עסק בענן מתאימה לכל העסקים, בכל התחומים ובכל סדר גודל</p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black'>
              <div className='bg-white flex flex-col items-end rounded-xl shadow-2xl'>
                  <div className='p-8 flex flex-col items-end'>
                      <div className='flex items-center justify-center w-14 h-14 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]'>
                        <LocalPhoneIcon fontSize='large' className='text-white'/>
                      </div>                      
                      <h3 className='font-bold text-2xl my-6'>Sales</h3>
                      <p className='text-gray-600 text-xl text-right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem.</p>
                  </div>
                  <div className='bg-slate-100 pl-8 py-4 pr-8 cursor-pointer group'>
                      <p className='flex items-center text-indigo-600'><EastIcon className='w-5 mr-2 group-hover:-translate-x-1 transition-all duration-300' /> עוד פרטים</p>
                  </div>
              </div>
              <div className='bg-white flex flex-col items-end rounded-xl shadow-2xl'>
                      <div className='p-8 flex flex-col items-end'>                      
                      <div className='flex items-center justify-center w-14 h-14 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]'>
                        <SupportAgentIcon fontSize='large' className='text-white'/>
                      </div>                      
                      <h3 className='font-bold text-2xl my-6'>Technical Support</h3>
                      <p className='text-gray-600 text-xl text-right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem.</p>
                  </div>
                  <div className='bg-slate-100 pl-8 py-4 pr-8 cursor-pointer group'>
                      <p className='flex items-center text-indigo-600 '><EastIcon className='w-5 mr-2 group-hover:-translate-x-1 transition-all duration-300' /> עוד פרטים</p>
                  </div>
              </div>
              <div className='bg-white flex flex-col items-end rounded-xl shadow-2xl'>
                      <div className='p-8 flex flex-col items-end'>                      
                      <div className='flex items-center justify-center w-14 h-14 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]'>
                      <MemoryIcon fontSize='large' className='text-white'/>
                      </div>
                      <h3 className='font-bold text-2xl my-6'>Media Inquiries</h3>
                      <p className='text-gray-600 text-xl text-right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem.</p>
                  </div>
                  <div className='bg-slate-100 pl-8 py-4 pr-8 cursor-pointer group'>
                      <p className='flex items-center text-indigo-600'><EastIcon className='w-5 mr-2 group-hover:-translate-x-1 transition-all duration-300' /> עוד פרטים</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}

export default Support