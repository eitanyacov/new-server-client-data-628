import React from 'react'
import table from '../assets/VNU_M737_6.svg'
import tasks from '../assets/tasks.jpg'
import reports from '../assets/reports.jpg'
import workers from '../assets/workerstasks.jpg'
import gold from '../assets/gold.jpg'


const About = () => {
  return (
    <div name='about' className='w-full my-20 md:my-28 px-8'>
    <div className='max-w-[1240px] mx-auto'>
        <div className='text-center'>
            <h2 className='text-5xl font-bold'>יתרונות המרכזיים בתוכנה לניהול עסק</h2>
            <p className='text-3xl py-6 text-gray-500'>תוכנה חכמה ומתקדמת לניהול העסק מבטיחה יתרונות רבים ומגוונים. היתרונות המרכזיים של התכנה הם</p>
        </div>
        
        {/* <div className='grid md:grid-cols-3 gap-1 px-2 text-center'>
            <div className='border py-8 rounded-xl shadow-xl' >
                <p className='text-6xl font-bold text-indigo-600'>100%</p>
                <p className='text-gray-400 mt-2'>Completion</p>
            </div>
            <div  className='border py-8 rounded-xl shadow-xl' >
                <p className='text-6xl font-bold text-indigo-600'>24/7</p>
                <p className='text-gray-400 mt-2'>Delivery</p>
            </div>
            <div className='border py-8 rounded-xl shadow-xl' >
                <p className='text-6xl font-bold text-indigo-600'>100K</p>
                <p className='text-gray-400 mt-2'>Transactions</p>
            </div>
        </div> */}
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
{/* <!-- Card --> */}
<div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
  <div class="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
    
    <img src={reports} width='100%' height={80} className='rounded-t-xl'/>
  </div>
  <div class="p-4 md:p-6 flex flex-col items-end">
    <span class="block mb-1 text-xl font-semibold uppercase text-blue-600 dark:text-blue-500">
      שליטה מלאה
    </span>
    <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
      Atlassian
    </h3>
    <p class="mt-3 text-gray-500 text-right">
      A software that develops products for software developers and developments.
    </p>
  </div>
  <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-bl-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View sample
    </a>
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View API
    </a>
  </div>
</div>
{/* <!-- End Card --> */}

{/* <!-- Card --> */}
<div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
  <div class="h-52 flex flex-col justify-center items-center bg-rose-500 rounded-t-xl">
    
    <img src={table} width='100%' height={80} className='rounded-t-xl'/>
  </div>
  <div class="p-4 md:p-6 flex flex-col items-end">
    <span class="block mb-1 text-lg font-semibold uppercase text-rose-600 dark:text-rose-500">
      OpenAI
    </span>
    <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
      Asana
    </h3>
    <p class="mt-3 text-gray-500 text-right">
      Track tasks and projects, use agile boards, measure progress.
    </p>
  </div>
  <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-bl-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View sample
    </a>
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View API
    </a>
  </div>
</div>
{/* <!-- End Card --> */}

{/* <!-- Card --> */}
<div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
  <div class="h-52 flex flex-col justify-center items-center bg-amber-500 rounded-t-xl">
    
    <img src={tasks} width='80%' height={60} className='rounded-t-xl'/>
  </div>
  <div class="p-4 md:p-6 flex flex-col items-end">
    <span class="block mb-1 text-xl font-semibold uppercase text-amber-500">
        ניהול משימות
    </span>
    <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
      Slack
    </h3>
    <p class="mt-3 text-gray-500 text-right">
      Email collaboration and email service desk made easy.
    </p>
  </div>
  <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-bl-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View sample
    </a>
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View API
    </a>
  </div>
</div>
{/* <!-- End Card --> */}
{/* <!-- Card --> */}
<div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
  <div class="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
    
    <img src={gold} width='100%' height={80} className='rounded-t-xl'/>
  </div>
  <div class="p-4 md:p-6 flex flex-col items-end">
    <span class="block mb-1 text-xl font-semibold uppercase text-blue-600 dark:text-blue-500">
      דו"חות שנתיים
    </span>
    <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
      Atlassian
    </h3>
    <p class="mt-3 text-gray-500 text-right">
      A software that develops products for software developers and developments.
    </p>
  </div>
  <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-bl-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View sample
    </a>
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View API
    </a>
  </div>
</div>
{/* <!-- End Card --> */}

{/* <!-- Card --> */}
<div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
  <div class="h-52 flex flex-col justify-center items-center bg-emerald-400 rounded-t-xl">
    
    <img src={workers} width='80%' className=''/>
  </div>
  <div class="p-4 md:p-6 flex flex-col items-end">
    <span class="block mb-1 text-xl font-semibold uppercase text-rose-600 dark:text-rose-500">
      משימות עובדים
    </span>
    <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
      Asana
    </h3>
    <p class="mt-3 text-gray-500 text-right">
      Track tasks and projects, use agile boards, measure progress.
    </p>
  </div>
  <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-bl-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View sample
    </a>
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View API
    </a>
  </div>
</div>
{/* <!-- End Card --> */}

{/* <!-- Card --> */}
<div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
  <div class="h-52 flex flex-col justify-center items-center bg-amber-500 rounded-t-xl">
    
    <img src={tasks} width='80%' height={60} className='rounded-t-xl'/>
  </div>
  <div class="p-4 md:p-6 flex flex-col items-end">
    <span class="block mb-1 font-semibold uppercase text-amber-500">
      Slack API
    </span>
    <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
      Slack
    </h3>
    <p class="mt-3 text-gray-500 text-right">
      Email collaboration and email service desk made easy.
    </p>
  </div>
  <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-bl-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View sample
    </a>
    <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
      View API
    </a>
  </div>
</div>
{/* <!-- End Card --> */}
</div>
    </div>
</div>
  )
}

export default About