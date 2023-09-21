import React, { useState, useEffect, useContext, useRef } from 'react';
import SwitchTheme2 from '../components/SwitchTheme2';
import { ThemeContext } from "../App";
import { useNavigate, useLocation } from 'react-router-dom'


const WorkersReports = () => {
    const { hebrew, globalTheme } = useContext(ThemeContext)
    const navigate = useNavigate()



  return (
    <>
    <header className={`${globalTheme != "light" && "dark"}`}>
    <nav class="bg-gray-800 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap font-mono tracking-wide text-white">NARTINA</span>
            </a>
            <div class="flex items-center lg:order-2">
            <div className='relative right-5'>
                  <SwitchTheme2 />
                </div>
                <a href="#" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">הרשמה</a>
                <a href="/login" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <div onClick={()=> {localStorage.removeItem("user")}}>
                התנתקות
                </div>
                </a>                <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        {/* <a href="#" class="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white" aria-current="page">Home</a> */}
                    </li>
                    <li>
                        <div class="block cursor-pointer py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">יציאה</div>
                    </li>
                    <li>
                        <div class="block cursor-pointer py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">משימות עובדים</div>
                    </li>
                    <li>
                        <div onClick={()=> navigate("/workers-reports")} class="block cursor-pointer py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">דו"חות</div>
                    </li>
                    <li>
                        <div onClick={()=> navigate("/workers-rosters")} class="block cursor-pointer py-2 pr-4 pl-3 text-white dark:text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">סידור עבודה</div>
                    </li>
                    <li>
                        <div onClick={()=> navigate("/workers-page")} class="block cursor-pointer py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">שעון נוכחות</div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>

<main class={`p-4 h-screen pt-3 bg-gray-100 dark:bg-gray-700 ${globalTheme != "light" && 'dark bg-gray-700'}`}>
    {hebrew ? (
         <div class={`flex items-center justify-between bg-white mb-2 dark:bg-gray-600 rounded-lg shadow px-8 py-2 relative bottom-1`} >
           
          <div class="flex flex-col items-start justify-start ">
            <h1 class="text-sm font-medium text-gray-900 dark:text-gray-100">Hi David</h1>
            <h1 class="text-sm text-gray-500 dark:text-neutral-300">welcome to the system, have a nice day!🚀</h1>
          </div>
         <div className="flex items-center justify-center space-x-14">
         <h1 class="hidden sm:inline px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-300">April 5, 2023</h1>
         <h1 class="px-2 text-xs font-semibold rounded-full py-[3px] bg-yellow-500 cursor-pointer hover:bg-yellow-400" onClick={()=> navigate('/chat')}>
         Success
         </h1>
         </div>
    
         </div>
       ) : (
        <div class={`flex items-center justify-between bg-white mb-2 dark:bg-gray-600 shadow px-8 py-2 rounded-lg relative bottom-1`} >
        <div className="flex items-center justify-center space-x-14">
        <h1 class="px-4 text-xs font-semibold rounded-full py-[3px] bg-yellow-500 cursor-pointer hover:bg-yellow-400" onClick={()=> navigate('/chat')}>
        כניסה
        {/* {windowWidth} */}
        </h1>
        <div></div>
        <h1 class="hidden sm:inline py-4 whitespace-nowrap text-sm text-gray-500 relative right-10 dark:text-neutral-300">April 5, 2023</h1>
        </div>
        <div class="flex flex-col items-end justify-end relative xlu:right-7 uuu:right-0">
            <h1 class="text-sm font-medium text-[#373D3F] tracking-wide dark:text-gray-100">!ברוכים הבאים <span className="font-bold text-gray-800 dark:text-neutral-300">אמג'ד</span></h1>
            <h1 class="text-xs md:text-sm text-gray-500 dark:text-neutral-300 text-right">🚀. שיהיה לך יום קסום</h1>
          </div>
         
        </div>
       )}
      <div class="grid grid-cols-1 sm:grid-cols-2 mdx:grid-cols-4 gap-4 mb-8">
      <div class="w-full p-6 overflow-hidden bg-blue-500 dark:bg-gray-800 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס ספק חדש
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                  עידכון 
            </p>
            <p class="text-sm text-blue-200">
                עידכון פרטי ספק
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> alert(true)}>
            הכנס
        </button>
    </div>
</div>
<div class="w-full p-6 overflow-hidden bg-blue-500 dark:bg-gray-800 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס דו"ח יומי
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                 עידכון  
            </p>
            <p class="text-sm text-blue-200">
            עידכון דו"ח
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> alert(true)}>
            הכנס
        </button>
    </div>
</div>
<div class="w-full p-6 overflow-hidden bg-blue-500 dark:bg-gray-800 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס דו"ח מסעדות
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                עידכון
            </p>
            <p class="text-sm text-blue-200">
                עידכון דו"ח 
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> alert(true)}>
            הכנס
        </button>
    </div>
</div>
<div class="w-full p-6 overflow-hidden bg-blue-500 dark:bg-gray-800 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס חשבונית
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                    עידכון    
            </p>
            <p class="text-sm text-blue-200">
                 עידכון חשבונית
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> alert(true)}>
            הכנס
        </button>
    </div>
</div>
</div>

{hebrew ? (
        <div class="rounded-lg h-96 overflow-auto scrollbar-none" >
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-900/50 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Color
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">
                        Silver
                    </td>
                    <td class="px-6 py-4">
                        Laptop
                    </td>
                    <td class="px-6 py-4">
                        $2999
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Microsoft Surface Pro
                    </th>
                    <td class="px-6 py-4">
                        White
                    </td>
                    <td class="px-6 py-4">
                        Laptop PC
                    </td>
                    <td class="px-6 py-4">
                        $1999
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Magic Mouse 2
                    </th>
                    <td class="px-6 py-4">
                        Black
                    </td>
                    <td class="px-6 py-4">
                        Accessories
                    </td>
                    <td class="px-6 py-4">
                        $99
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">
                        Silver
                    </td>
                    <td class="px-6 py-4">
                        Laptop
                    </td>
                    <td class="px-6 py-4">
                        $2999
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Microsoft Surface Pro
                    </th>
                    <td class="px-6 py-4">
                        White
                    </td>
                    <td class="px-6 py-4">
                        Laptop PC
                    </td>
                    <td class="px-6 py-4">
                        $1999
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Magic Mouse 2
                    </th>
                    <td class="px-6 py-4">
                        Black
                    </td>
                    <td class="px-6 py-4">
                        Accessories
                    </td>
                    <td class="px-6 py-4">
                        $99
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
    
         </div>
      ) : (
        <div class="rounded-lg h-96 overflow-auto scrollbar-none mb-4" >
    <table class="w-full text-sm text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-900 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 text-md sm:text-lg">
                    ערוך
                </th>
                <th scope="col" class="px-6 py-3 text-md sm:text-lg">
                    סכום  
                </th>
                <th scope="col" class="px-6 py-3 text-md sm:text-lg">
                    שם ספק
                </th>
                <th scope="col" class="px-6 py-3 text-md sm:text-lg">
                    תאריך
                </th>
                <th scope="col" class="px-6 py-3 text-md sm:text-lg">
                    סוג דו"ח
                </th>
                <th scope="col" class="px-6 py-3 text-md sm:text-lg">
                    מספר דו"ח
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   3,788
                </th>
                <td class="px-6 py-4">
                אריזות ירושלים
                </td>
                <td class="px-6 py-4">
                17/2/2023
                </td>
                <td class="px-6 py-4">
                   דו"ח יומי
                </td>
                <td class="px-6 py-4">
                   1587#
                </td>
                
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    2,389
                </th>
                <td class="px-6 py-4">
                    קופילנד
                </td>
                <td class="px-6 py-4">
                15/2/2023
                </td>
                <td class="px-6 py-4">
                   דו"ח מסעדות
                </td>
                <td class="px-6 py-4">
                    2546#
                </td>
               
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1,247
                </th>
                <td class="px-6 py-4">
                    פעמית
                </td>
                <td class="px-6 py-4">
                19/2/2023
                </td>
                <td class="px-6 py-4">
                   חשבונית ספקים
                </td>
                <td class="px-6 py-4">
                   4738#
                </td>
                
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    877
                </th>
                <td class="px-6 py-4">
                    תנובה
                </td>
                <td class="px-6 py-4">
                11/2/2023
                </td>
                <td class="px-6 py-4">
                   חשבונית ספקים
                </td>
                <td class="px-6 py-4">
                    1347#
                </td>
               
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1,760
                </th>
                <td class="px-6 py-4">
                    קוקה קולה
                </td>
                <td class="px-6 py-4">
                26/2/2023
                </td>
                <td class="px-6 py-4">
                   דו"ח יומי
                </td>
                <td class="px-6 py-4">
                    4352#
                </td>
                
            </tr>
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    540
                </th>
                <td class="px-6 py-4">
                    טרה
                </td>
                <td class="px-6 py-4">
                8/2/2023
                </td>
                <td class="px-6 py-4">
                   דו"ח יומי
                </td>
                <td class="px-6 py-4">
                   1632#
                </td>
                
            </tr>
        </tbody>
    </table>

     </div>
      )}
</main>


    </>
  )
}

export default WorkersReports