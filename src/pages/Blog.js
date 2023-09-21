import React, { useContext, useState } from 'react';
import { ThemeContext } from "../App";


const Blog = () => {
  const [state, setState] = useState(true)
  const { hebrew } = useContext(ThemeContext)

  const posts = [
    {
        title: "What is SaaS? Software as a Service Explained",
        desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people what they did for their anxiety, and some",
        img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        authorLogo: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
        authorName: "Sidi dev",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "A Quick Guide to WordPress Hosting",
        desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations about Whittington will be featured in the film",
        img: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        authorLogo: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg",
        authorName: "Micheal",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "7 Promising VS Code Extensions Introduced in 2022",
        desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks. I realized today that I have all this stuff that",
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
        authorName: "Luis",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
        desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",
        img: "https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        authorLogo: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg",
        authorName: "Lourin",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    }
]

  return (
    <>
    {hebrew ? (
      <>
     {state ? (
      <>
       <div class="text-gray-900 mt-14 pt-12 pr-0 pb-14 pl-0 bg-white airx:ml-64 ">
      <div class="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16
          max-w-7xl">
        <div class="flex flex-col items-center sm:px-5 md:flex-row">
          <div class="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
            <div class="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
                md:space-y-5">
              <div class="bg-green-500 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2
                  uppercase inline-block">
                <p class="inline">
                  <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                      00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                      1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1
                      0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </p>
                <p class="inline text-xs font-medium">New</p>
              </div>
              <a class="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">Write anything. Be creative.</a>
              <div class="pt-2 pr-0 pb-0 pl-0">
                <p class="text-sm font-medium inline">author:</p>
                <a class="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1 underline">Jack Sparrow</a>
                <p class="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, April 2021 ·</p>
                <p class="text-gray-200 text-sm font-medium inline mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2">
            <div class="block">
              <img
                  src="https://images.unsplash.com/photo-1626314928277-1d373ddb6428?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mzd8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" class="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full"/>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">
          <div class="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4" onClick={()=> setState(!state)}>
            <img
                src="https://images.unsplash.com/photo-1626318305863-bb23d0297c0b?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" class="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm h-44"/>
            <p class="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3
                rounded-full uppercase inline-block">Entertainment</p>
            <a class="text-lg font-bold sm:text-xl md:text-2xl">Improving your day to the MAX</a>
            <p class="text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
            <div class="pt-2 pr-0 pb-0 pl-0">
              <a class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Jack Sparrow</a>
              <p class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, March 2021 ·</p>
              <p class="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
            </div>
          </div>
          <div class="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4" onClick={()=> setState(!state)}>
            <img
                src="https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" class="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm h-44 "/>
            <p class="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3
                rounded-full uppercase inline-block">Entertainment</p>
            <a class="text-lg font-bold sm:text-xl md:text-2xl">Improving your day to the MAX</a>
            <p class="text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
            <div class="pt-2 pr-0 pb-0 pl-0">
              <a class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Jack Sparrow</a>
              <p class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, March 2021 ·</p>
              <p class="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
            </div>
          </div>
          <div class="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4" onClick={()=> setState(!state)}>
            <img
                src="https://images.unsplash.com/photo-1626197031507-c17099753214?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzR8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" class="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm h-44"/>
            <p class="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3
                rounded-full uppercase inline-block">Entertainment</p>
            <a class="text-lg font-bold sm:text-xl md:text-2xl">Improving your day to the MAX</a>
            <p class="text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
            <div class="pt-2 pr-0 pb-0 pl-0">
              <a class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Jack Sparrow</a>
              <p class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, March 2021 ·</p>
              <p class="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className={`grid justify-center grid-cols-1 gap-6 px-8 mt-4 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} sm:grid-cols-2 lg:grid-cols-3`}>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?1" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 21, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?2" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 22, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?3" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 23, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50 hidden sm:block" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?4" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 24, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50 hidden sm:block" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?5" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 25, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50 hidden sm:block" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?6" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 26, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
		</div>
      </>
     ) : (
      <>
      <div class="max-w-5xl airx:ml-64 px-4 sm:px-6 lg:px-8 mx-auto mt-16 airx:mt-12" onClick={()=> setState(!state)}>
  <div class="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-4 ">
    
    
<div class="max-w-3xl px-4 pt-6 lg:pt-10 pb-2 lg:pb-12 sm:px-6 lg:px-8 mx-auto lg:col-span-2" onClick={()=> setState(!state)}>
  <div class="max-w-2xl">
   
    <div class="flex justify-between items-center mb-4 lg:mb-6">
      <div class="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
        <div class="flex-shrink-0">
          <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Image Description" />
        </div>

        <div class="grow">
          <div class="grid sm:flex sm:justify-between sm:items-center gap-2">
            <div>
             
              <div class="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                <div class="hs-tooltip-toggle sm:mb-1 block text-left cursor-pointer">
                  <span class="font-semibold text-gray-800 dark:text-gray-200">
                    Leyla Ludic
                  </span>

                  
                  <div class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 max-w-xs cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl dark:bg-black" role="tooltip">
                    
                    <div class="p-4 sm:p-5">
                      <div class="mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                        <div class="flex-shrink-0">
                          <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Image Description" />
                        </div>

                        <div class="grow">
                          <p class="text-lg font-semibold text-gray-200">
                            Leyla Ludic
                          </p>
                        </div>
                      </div>
                      <p class="text-sm text-gray-400">
                        Leyla is a Customer Success Specialist at Preline and spends her time speaking to in-house recruiters all over the world.
                      </p>
                    </div>
                   
                    
                    <div class="flex justify-between items-center px-4 py-3 sm:px-5">
                      <ul class="text-xs space-x-3">
                        <li class="inline-block">
                          <span class="font-semibold text-gray-200">56</span>
                          <span class="text-gray-400">articles</span>
                        </li>
                        <li class="inline-block">
                          <span class="font-semibold text-gray-200">1k+</span>
                          <span class="text-gray-400">followers</span>
                        </li>
                      </ul>

                      <div>
                        <button type="button" class="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-xs">
                          <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                          </svg>
                          Follow
                        </button>
                      </div>
                    </div>
                  
                  </div>
                 
                </div>
              </div>
        

              <ul class="text-xs text-gray-500">
                <li class="inline-block relative pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                  Jan 18
                </li>
                <li class="inline-block relative pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                  8 min read
                </li>
              </ul>
            </div>

        
            <div>
              <button type="button" class="py-1.5 px-2.5 sm:py-2 sm:px-3 inline-flex justify-center items-center gap-x-1.5 sm:gap-x-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-xs sm:text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
                Tweet
              </button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  

    
    <div class="space-y-5 md:space-y-8">
      <div class="space-y-3">
        <h2 class="text-2xl font-bold md:text-3xl dark:text-white">Announcing a free plan for small teams</h2>

        <p class="text-lg text-gray-800 dark:text-gray-200">At preline, our mission has always been focused on bringing openness and transparency to the design process. We've always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow.</p>
      </div>

      <p class="text-lg text-gray-800 dark:text-gray-200">We're proud to be a part of creating a more open culture and to continue building a product that supports this vision.</p>

      <figure>
        <img class="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Image Description" />
        <figcaption class="mt-3 text-sm text-center text-gray-500">
          A woman sitting at a table.
        </figcaption>
      </figure>

      <p class="text-lg text-gray-800 dark:text-gray-200">As we've grown, we've seen how Preline has helped companies such as Spotify, Microsoft, Airbnb, Facebook, and Intercom bring their designers closer together to create amazing things. We've also learned that when the culture of sharing is brought in earlier, the better teams adapt and communicate with one another.</p>

      <p class="text-lg text-gray-800 dark:text-gray-200">That's why we are excited to share that we now have a <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">free version of Preline</a>, which will allow individual designers, startups and other small teams a chance to create a culture of openness early on.</p>

      <blockquote class="text-center p-4 sm:px-7">
        <p class="text-xl font-medium text-gray-800 md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal dark:text-gray-200">
          To say that switching to Preline has been life-changing is an understatement. My business has tripled and I got my life back.
        </p>
        <p class="mt-5 text-gray-800 dark:text-gray-200">
          Nicole Grazioso
        </p>
      </blockquote>

      <figure>
        <img class="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1670272498380-eb330b61f3cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Image Description" />
        <figcaption class="mt-3 text-sm text-center text-gray-500">
          A man and a woman looking at a cell phone.
        </figcaption>
      </figure>

      <div class="space-y-3">
        <h3 class="text-2xl font-semibold dark:text-white">Bringing the culture of sharing to everyone</h3>

        <p class="text-lg text-gray-800 dark:text-gray-200">We know the power of sharing is real, and we want to create an opportunity for everyone to try Preline and explore how transformative open communication can be. Now you can have a team of one or two designers and unlimited spectators (think PMs, management, marketing, etc.) share work and explore the design process earlier.</p>
      </div>

      <ul class="list-disc list-outside space-y-5 pl-5 text-lg text-gray-800 dark:text-gray-200">
        <li class="pl-2">Preline allows us to collaborate in real time and is a really great way for leadership on the team to stay up-to-date with what everybody is working on," <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">said</a> Stewart Scott-Curran, Intercom's Director of Brand Design.</li>
        <li class="pl-2">Preline opened a new way of sharing. It's a persistent way for everyone to see and absorb each other's work," said David Scott, Creative Director at <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">Eventbrite</a>.</li>
      </ul>

      <p class="text-lg text-gray-800 dark:text-gray-200">Small teams and individual designers need a space where they can watch the design process unfold, both for themselves and for the people they work with – no matter if it's a fellow designer, product manager, developer or client. Preline allows you to invite more people into the process, creating a central place for conversation around design. As those teams grow, transparency and collaboration becomes integrated in how they communicate and work together.</p>

      <div>
        <a class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" href="#">
          Plan
        </a>
        <a class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" href="#">
          Web development
        </a>
        <a class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" href="#">
          Free
        </a>
        <a class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" href="#">
          Team
        </a>
      </div>
    </div>

  </div>
</div>


  <div class="lg:col-span-1 lg:w-full lg:h-full mt-4 lg:bg-gradient-to-r lg:from-gray-50 lg:via-transparent lg:to-transparent dark:from-slate-800">
      <div class="sticky top-16 left-0 py-8 lg:pl-8">
      
        <div class="group flex items-center gap-x-3 border-b border-gray-200 pb-8 mb-8 dark:border-gray-700">
          <a class="block flex-shrink-0" href="#">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Image Description"/>
          </a>

          <a class="group grow block" href="">
            <h5 class="group-hover:text-gray-600 text-sm font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
              Leyla Ludic
            </h5>
            <p class="text-sm text-gray-500">
              UI/UX enthusiast
            </p>
          </a>

          <div class="grow">
            <div class="flex justify-end">
              <button type="button" class="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-full border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-xs">
                <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
                Follow
              </button>
            </div>
          </div>
        </div>
        

        <div class="space-y-6">
         
          <a class="group flex items-center gap-x-6" href="#">
            <div class="grow">
              <span class="text-sm font-bold text-gray-800 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-500">
                5 Reasons to Not start a UX Designer Career in 2022/2023
              </span>
            </div>

            <div class="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
              <img class="w-full h-full absolute top-0 left-0 object-cover rounded-lg" src="https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="Image Description"/>
            </div>
          </a>
          

      
          <a class="group flex items-center gap-x-6" href="#">
            <div class="grow">
              <span class="text-sm font-bold text-gray-800 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-500">
                If your UX Portfolio has this 20% Well Done, it Will Give You an 80% Result
              </span>
            </div>

            <div class="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
              <img class="w-full h-full absolute top-0 left-0 object-cover rounded-lg" src="https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="Image Description"/>
            </div>
          </a>
          

         
          <a class="group flex items-center gap-x-6" href="#">
            <div class="grow">
              <span class="text-sm font-bold text-gray-800 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-500">
                7 Principles of Icon Design
              </span>
            </div>

            <div class="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
              <img class="w-full h-full absolute top-0 left-0 object-cover rounded-lg" src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="Image Description"/>
            </div>
          </a>
         
        </div>
      </div>
    </div>
</div>
    

  </div>

      </>
     )}
      </>
    ) : (
      <>
     {state ? (
      <>
       <div class="text-gray-900 mt-14 pt-12 pr-0 pb-14 pl-0 bg-white airx:mr-64">
  <div class="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16
      max-w-7xl">
    <div class="flex flex-col items-center sm:px-5 md:flex-row">
      <div class="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
        <div class="flex flex-col items-end justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
            md:space-y-5">
          <div class="bg-green-500 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2
              uppercase inline-block">
            <p class="inline">
              <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                  00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                  1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1
                  0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </p>
            <p class="inline text-xs font-medium">New</p>
          </div>
          <a class="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl text-right">Write anything. Be creative.</a>
          <div class="pt-2 pr-0 pb-0 pl-0">
            <p class="text-sm font-medium inline">author:</p>
            <a class="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1 underline">Jack Sparrow</a>
            <p class="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, April 2021 ·</p>
            <p class="text-gray-200 text-sm font-medium inline mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="block">
          <img
              src="https://images.unsplash.com/photo-1626314928277-1d373ddb6428?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mzd8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" class="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full"/>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">
      <div class="flex flex-col items-end justify-end col-span-12 space-y-3 sm:col-span-6 xl:col-span-4" onClick={()=> setState(!state)}>
        <img
            src="https://images.unsplash.com/photo-1626318305863-bb23d0297c0b?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" class="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm h-44"/>
        <p class="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3
            rounded-full uppercase inline-block">Entertainment</p>
        <a class="text-lg font-bold sm:text-xl md:text-2xl text-right">Improving your day to the MAX</a>
        <p class="text-sm text-black text-right">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
        <div class="pt-2 pr-0 pb-0 pl-0">
          <a class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Jack Sparrow</a>
          <p class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, March 2021 ·</p>
          <p class="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
        </div>
      </div>
      <div class="flex flex-col items-end justify-end col-span-12 space-y-3 sm:col-span-6 xl:col-span-4" onClick={()=> setState(!state)}>
        <img
            src="https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" class="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm h-44 "/>
        <p class="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3
            rounded-full uppercase inline-block">Entertainment</p>
        <a class="text-lg font-bold sm:text-xl md:text-2xl text-right">Improving your day to the MAX</a>
        <p class="text-sm text-black text-right">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
        <div class="pt-2 pr-0 pb-0 pl-0">
          <a class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Jack Sparrow</a>
          <p class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, March 2021 ·</p>
          <p class="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
        </div>
      </div>
      <div class="flex flex-col items-end justify-end col-span-12 space-y-3 sm:col-span-6 xl:col-span-4" onClick={()=> setState(!state)}>
        <img
            src="https://images.unsplash.com/photo-1626197031507-c17099753214?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzR8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" class="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm h-44"/>
        <p class="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3
            rounded-full uppercase inline-block">Entertainment</p>
        <a class="text-lg font-bold sm:text-xl md:text-2xl text-right">Improving your day to the MAX</a>
        <p class="text-sm text-black text-right">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
        <div class="pt-2 pr-0 pb-0 pl-0">
          <a class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Jack Sparrow</a>
          <p class="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, March 2021 ·</p>
          <p class="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div className={`grid justify-center grid-cols-1 gap-6 px-8 mt-4 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} sm:grid-cols-2 lg:grid-cols-3`}>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?1" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 21, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?2" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 22, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?3" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 23, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50 hidden sm:block" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?4" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 24, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50 hidden sm:block" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?5" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 25, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50 hidden sm:block" onClick={()=> setState(!state)}>
				<img role="presentation" className="object-cover w-full rounded h-44 bg-gray-500" src="https://source.unsplash.com/random/480x360?6" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs text-gray-600">January 26, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
		</div>
      </>
     ) : (
      <>
      <div class="max-w-5xl airx:mr-64 px-4 sm:px-6 lg:px-8 mx-auto mt-16" onClick={()=> setState(!state)}>
  <div class="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-4 ">
    
    
<div class="max-w-3xl px-4 pt-6 lg:pt-10 pb-2 lg:pb-12 sm:px-6 lg:px-8 mx-auto lg:col-span-2" onClick={()=> setState(!state)}>
  <div class="max-w-2xl">
   
    <div class="flex justify-between items-center mb-4 lg:mb-6">
      <div class="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
        <div class="flex-shrink-0">
          <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Image Description" />
        </div>

        <div class="grow">
          <div class="grid sm:flex sm:justify-between sm:items-center gap-2">
            <div>
             
              <div class="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                <div class="hs-tooltip-toggle sm:mb-1 block text-left cursor-pointer">
                  <span class="font-semibold text-gray-800 dark:text-gray-200">
                    Leyla Ludic
                  </span>

                  
                  <div class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 max-w-xs cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl dark:bg-black" role="tooltip">
                    
                    <div class="p-4 sm:p-5">
                      <div class="mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                        <div class="flex-shrink-0">
                          <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Image Description" />
                        </div>

                        <div class="grow">
                          <p class="text-lg font-semibold text-gray-200">
                            Leyla Ludic
                          </p>
                        </div>
                      </div>
                      <p class="text-sm text-gray-400">
                        Leyla is a Customer Success Specialist at Preline and spends her time speaking to in-house recruiters all over the world.
                      </p>
                    </div>
                   
                    
                    <div class="flex justify-between items-center px-4 py-3 sm:px-5">
                      <ul class="text-xs space-x-3">
                        <li class="inline-block">
                          <span class="font-semibold text-gray-200">56</span>
                          <span class="text-gray-400">articles</span>
                        </li>
                        <li class="inline-block">
                          <span class="font-semibold text-gray-200">1k+</span>
                          <span class="text-gray-400">followers</span>
                        </li>
                      </ul>

                      <div>
                        <button type="button" class="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-xs">
                          <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                          </svg>
                          Follow
                        </button>
                      </div>
                    </div>
                  
                  </div>
                 
                </div>
              </div>
        

              <ul class="text-xs text-gray-500">
                <li class="inline-block relative pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                  Jan 18
                </li>
                <li class="inline-block relative pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                  8 min read
                </li>
              </ul>
            </div>

        
            <div>
              <button type="button" class="py-1.5 px-2.5 sm:py-2 sm:px-3 inline-flex justify-center items-center gap-x-1.5 sm:gap-x-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-xs sm:text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
                Tweet
              </button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  

    
    <div class="space-y-5 md:space-y-8">
      <div class="space-y-3">
        <h2 class="text-2xl font-bold md:text-3xl dark:text-white">Announcing a free plan for small teams</h2>

        <p class="text-lg text-gray-800 dark:text-gray-200">At preline, our mission has always been focused on bringing openness and transparency to the design process. We've always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow.</p>
      </div>

      <p class="text-lg text-gray-800 dark:text-gray-200">We're proud to be a part of creating a more open culture and to continue building a product that supports this vision.</p>

      <figure>
        <img class="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Image Description" />
        <figcaption class="mt-3 text-sm text-center text-gray-500">
          A woman sitting at a table.
        </figcaption>
      </figure>

      <p class="text-lg text-gray-800 dark:text-gray-200">As we've grown, we've seen how Preline has helped companies such as Spotify, Microsoft, Airbnb, Facebook, and Intercom bring their designers closer together to create amazing things. We've also learned that when the culture of sharing is brought in earlier, the better teams adapt and communicate with one another.</p>

      <p class="text-lg text-gray-800 dark:text-gray-200">That's why we are excited to share that we now have a <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">free version of Preline</a>, which will allow individual designers, startups and other small teams a chance to create a culture of openness early on.</p>

      <blockquote class="text-center p-4 sm:px-7">
        <p class="text-xl font-medium text-gray-800 md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal dark:text-gray-200">
          To say that switching to Preline has been life-changing is an understatement. My business has tripled and I got my life back.
        </p>
        <p class="mt-5 text-gray-800 dark:text-gray-200">
          Nicole Grazioso
        </p>
      </blockquote>

      <figure>
        <img class="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1670272498380-eb330b61f3cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Image Description" />
        <figcaption class="mt-3 text-sm text-center text-gray-500">
          A man and a woman looking at a cell phone.
        </figcaption>
      </figure>

      <div class="space-y-3">
        <h3 class="text-2xl font-semibold dark:text-white">Bringing the culture of sharing to everyone</h3>

        <p class="text-lg text-gray-800 dark:text-gray-200">We know the power of sharing is real, and we want to create an opportunity for everyone to try Preline and explore how transformative open communication can be. Now you can have a team of one or two designers and unlimited spectators (think PMs, management, marketing, etc.) share work and explore the design process earlier.</p>
      </div>

      <ul class="list-disc list-outside space-y-5 pl-5 text-lg text-gray-800 dark:text-gray-200">
        <li class="pl-2">Preline allows us to collaborate in real time and is a really great way for leadership on the team to stay up-to-date with what everybody is working on," <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">said</a> Stewart Scott-Curran, Intercom's Director of Brand Design.</li>
        <li class="pl-2">Preline opened a new way of sharing. It's a persistent way for everyone to see and absorb each other's work," said David Scott, Creative Director at <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">Eventbrite</a>.</li>
      </ul>

      <p class="text-lg text-gray-800 dark:text-gray-200">Small teams and individual designers need a space where they can watch the design process unfold, both for themselves and for the people they work with – no matter if it's a fellow designer, product manager, developer or client. Preline allows you to invite more people into the process, creating a central place for conversation around design. As those teams grow, transparency and collaboration becomes integrated in how they communicate and work together.</p>

      <div>
        <a class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" href="#">
          Plan
        </a>
        <a class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" href="#">
          Web development
        </a>
        <a class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" href="#">
          Free
        </a>
        <a class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" href="#">
          Team
        </a>
      </div>
    </div>

  </div>
</div>


  <div class="lg:col-span-1 lg:w-full lg:h-full mt-4 lg:bg-gradient-to-r lg:from-gray-50 lg:via-transparent lg:to-transparent dark:from-slate-800">
      <div class="sticky top-16 left-0 py-8 lg:pl-8">
      
        <div class="group flex items-center gap-x-3 border-b border-gray-200 pb-8 mb-8 dark:border-gray-700">
          <a class="block flex-shrink-0" href="#">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Image Description"/>
          </a>

          <a class="group grow block" href="">
            <h5 class="group-hover:text-gray-600 text-sm font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
              Leyla Ludic
            </h5>
            <p class="text-sm text-gray-500">
              UI/UX enthusiast
            </p>
          </a>

          <div class="grow">
            <div class="flex justify-end">
              <button type="button" class="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-full border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-xs">
                <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
                Follow
              </button>
            </div>
          </div>
        </div>
        

        <div class="space-y-6">
         
          <a class="group flex items-center gap-x-6" href="#">
            <div class="grow">
              <span class="text-sm font-bold text-gray-800 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-500">
                5 Reasons to Not start a UX Designer Career in 2022/2023
              </span>
            </div>

            <div class="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
              <img class="w-full h-full absolute top-0 left-0 object-cover rounded-lg" src="https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="Image Description"/>
            </div>
          </a>
          

      
          <a class="group flex items-center gap-x-6" href="#">
            <div class="grow">
              <span class="text-sm font-bold text-gray-800 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-500">
                If your UX Portfolio has this 20% Well Done, it Will Give You an 80% Result
              </span>
            </div>

            <div class="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
              <img class="w-full h-full absolute top-0 left-0 object-cover rounded-lg" src="https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="Image Description"/>
            </div>
          </a>
          

         
          <a class="group flex items-center gap-x-6" href="#">
            <div class="grow">
              <span class="text-sm font-bold text-gray-800 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-500">
                7 Principles of Icon Design
              </span>
            </div>

            <div class="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
              <img class="w-full h-full absolute top-0 left-0 object-cover rounded-lg" src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="Image Description"/>
            </div>
          </a>
         
        </div>
      </div>
    </div>
</div>
    

  </div>

      </>
     )}
      </>
    )}

    {hebrew ? (
      <section className={`mt-12 mx-auto px-4 max-w-screen-xl md:px-8 airx:ml-64`}>
      <div className="text-center">
          <h1 className="text-3xl text-gray-800 font-semibold">
              Blog
          </h1>
          <p className="mt-3 text-gray-500">
              Blogs that are loved by the community. Updated every hour.
          </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {
              posts.map((items, key) => (
                  <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={key}>
                      <a href={items.href}>
                          <img src={items.img} loading="lazy" alt={items.title}  className="w-full h-48 rounded-t-md" />
                          <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                              <div className="flex-none w-10 h-10 rounded-full">
                                  <img src={items.authorLogo} className="w-full h-full rounded-full" alt={items.authorName} />
                              </div>
                              <div className="ml-3">
                                  <span className="block text-gray-900">{items.authorName}</span>
                                  <span className="block text-gray-400 text-sm">{items.date}</span>
                              </div>
                          </div>
                          <div className="pt-3 ml-4 mr-2 mb-3">
                              <h3 className="text-xl text-gray-900">
                                  {items.title}
                              </h3>
                              <p className="text-gray-400 text-sm mt-1">{items.desc}</p>
                          </div>
                      </a>
                  </article>
              ))
          }
      </div>
  </section>
    ) : ( 
      <section className={`mt-12 mx-auto px-4 max-w-screen-xl md:px-8 mr-64`}>
            <div className="text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    Blog
                </h1>
                <p className="mt-3 text-gray-500">
                    Blogs that are loved by the community. Updated every hour.
                </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                    posts.map((items, key) => (
                        <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={key}>
                            <a href={items.href}>
                                <img src={items.img} loading="lazy" alt={items.title}  className="w-full h-48 rounded-t-md" />
                                <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                                    <div className="flex-none w-10 h-10 rounded-full">
                                        <img src={items.authorLogo} className="w-full h-full rounded-full" alt={items.authorName} />
                                    </div>
                                    <div className="ml-3">
                                        <span className="block text-gray-900">{items.authorName}</span>
                                        <span className="block text-gray-400 text-sm">{items.date}</span>
                                    </div>
                                </div>
                                <div className="pt-3 ml-4 mr-2 mb-3">
                                    <h3 className="text-xl text-gray-900">
                                        {items.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">{items.desc}</p>
                                </div>
                            </a>
                        </article>
                    ))
                }
            </div>
        </section>
    )}
    </>
  )
}

export default Blog