import React, { useContext, useState } from "react";
import { ThemeContext } from "../App";

const Chat3 = () => {
  const [scroll, setScroll] = useState(false)
  const { hebrew } = useContext(ThemeContext)

  return (
    <div class="container mx-auto max-h-screen">
    <div class={`max-w-full border rounded lg:grid lg:grid-cols-3 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} max-h-screen`}>
      <div class="border-r border-gray-300 lg:col-span-1 fixed top-14 w-72" onMouseOver={()=> setScroll(true)} onMouseOut={()=> setScroll(false)}>
        <div class="mx-3 my-3">
          <div class="relative text-gray-600">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                viewBox="0 0 24 24" class="w-6 h-6 text-gray-300">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input type="search" class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
              placeholder="Search" required />
          </div>
        </div>

        <ul class={`overflow-auto ${scroll ? 'scrollbar' : 'scrollbar-none'} h-[32rem]`}>
          <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
          <li>
            <a
              class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
              <img class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username" />
              <div class="w-full pb-2">
                <div class="flex justify-between">
                  <span class="block ml-2 font-semibold text-gray-600">Jhon Don</span>
                  <span class="block ml-2 text-sm text-gray-600">25 minutes</span>
                </div>
                <span class="block ml-2 text-sm text-gray-600">bye</span>
              </div>
            </a>
            <a
              class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-100 border-b border-gray-300 cursor-pointer focus:outline-none">
              <img class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png" alt="username" />
              <div class="w-full pb-2">
                <div class="flex justify-between">
                  <span class="block ml-2 font-semibold text-gray-600">Same</span>
                  <span class="block ml-2 text-sm text-gray-600">50 minutes</span>
                </div>
                <span class="block ml-2 text-sm text-gray-600">Good night</span>
              </div>
            </a>
            <a
              class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
              <img class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
              <div class="w-full pb-2">
                <div class="flex justify-between">
                  <span class="block ml-2 font-semibold text-gray-600">Emma</span>
                  <span class="block ml-2 text-sm text-gray-600">6 hour</span>
                </div>
                <span class="block ml-2 text-sm text-gray-600">Good Morning</span>
              </div>
            </a>
          </li>
          <section class="flex flex-col justify-center w-fit antialiased bg-gray-50 text-gray-600 min-h-screen p-4">
    <div class="h-full">

        <div class="relative w-fit mx-auto bg-white shadow-lg rounded-lg">

            <header class="pt-6 pb-4 px-5 border-b border-gray-200">
                <div class="flex justify-between items-center mb-3">

                    <div class="flex items-center">
                        <a class="inline-flex items-start mr-3" href="#0">
                            <img class="rounded-full" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg" width="48" height="48" alt="Lauren Marsano" />
                        </a>
                        <div class="pr-1">
                            <a class="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                                <h2 class="text-xl leading-snug font-bold">Lauren Marsano</h2>
                            </a>
                            <a class="block text-sm font-medium hover:text-indigo-500" href="#0">@lauren.mars</a>
                        </div>
                    </div>

                    <div class="relative inline-flex flex-shrink-0">
                        <button class="text-gray-400 hover:text-gray-500 rounded-full focus:ring-0 outline-none focus:outline-none">
                            <span class="sr-only">Settings</span>
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                <path d="m15.621 7.015-1.8-.451A5.992 5.992 0 0 0 13.13 4.9l.956-1.593a.5.5 0 0 0-.075-.611l-.711-.707a.5.5 0 0 0-.611-.075L11.1 2.87a5.99 5.99 0 0 0-1.664-.69L8.985.379A.5.5 0 0 0 8.5 0h-1a.5.5 0 0 0-.485.379l-.451 1.8A5.992 5.992 0 0 0 4.9 2.87l-1.593-.956a.5.5 0 0 0-.611.075l-.707.711a.5.5 0 0 0-.075.611L2.87 4.9a5.99 5.99 0 0 0-.69 1.664l-1.8.451A.5.5 0 0 0 0 7.5v1a.5.5 0 0 0 .379.485l1.8.451c.145.586.378 1.147.691 1.664l-.956 1.593a.5.5 0 0 0 .075.611l.707.707a.5.5 0 0 0 .611.075L4.9 13.13a5.99 5.99 0 0 0 1.664.69l.451 1.8A.5.5 0 0 0 7.5 16h1a.5.5 0 0 0 .485-.379l.451-1.8a5.99 5.99 0 0 0 1.664-.69l1.593.956a.5.5 0 0 0 .611-.075l.707-.707a.5.5 0 0 0 .075-.611L13.13 11.1a5.99 5.99 0 0 0 .69-1.664l1.8-.451A.5.5 0 0 0 16 8.5v-1a.5.5 0 0 0-.379-.485ZM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="flex flex-wrap justify-center sm:justify-start space-x-4">
                    <div class="flex items-center">
                        <svg class="w-4 h-4 fill-current flex-shrink-0 text-gray-400" viewBox="0 0 16 16">
                            <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z" />
                        </svg>
                        <span class="text-sm whitespace-nowrap ml-2">Milan, IT</span>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-4 h-4 fill-current flex-shrink-0 text-gray-400" viewBox="0 0 16 16">
                            <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
                        </svg>
                        <a class="text-sm font-medium whitespace-nowrap text-indigo-500 hover:text-indigo-600 ml-2" href="#0">carolinmcneail.com</a>
                    </div>
                </div>
            </header>

            <div class="py-3 px-5">
                <h3 class="text-xs font-semibold uppercase text-gray-400 mb-1">Chats</h3>

                <div class="divide-y divide-gray-200">
                    
                    <button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                        <div class="flex items-center">
                            <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg" width="32" height="32" alt="Marie Zulfikar" />
                            <div>
                                <h4 class="text-sm font-semibold text-gray-900">Marie Zulfikar</h4>
                                <div class="text-[13px]">The video chat ended · 2hrs</div>
                            </div>
                        </div>
                    </button>

                    <button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                        <div class="flex items-center">
                            <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-02_vll8uv.jpg" width="32" height="32" alt="Nhu Cassel" />
                            <div>
                                <h4 class="text-sm font-semibold text-gray-900">Nhu Cassel</h4>
                                <div class="text-[13px]">Hello Lauren 👋, · 24 Mar</div>
                            </div>
                        </div>
                    </button>

                    <button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                        <div class="flex items-center">
                            <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-03_uzwykl.jpg" width="32" height="32" alt="Patrick Friedman" />
                            <div>
                                <h4 class="text-sm font-semibold text-gray-900">Patrick Friedman</h4>
                                <div class="text-[13px]">Yes, you’re right but… · 14 Mar</div>
                            </div>
                        </div>
                    </button>

                    <button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                        <div class="flex items-center">
                            <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-04_ttlftd.jpg" width="32" height="32" alt="Byrne McKenzie" />
                            <div>
                                <h4 class="text-sm font-semibold text-gray-900">Byrne McKenzie</h4>
                                <div class="text-[13px]">Hey Lauren ✨, first of all… · 14 Mar</div>
                            </div>
                        </div>
                    </button>

                    <button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                        <div class="flex items-center">
                            <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-05_bktgmb.jpg" width="32" height="32" alt="Scott Micheal" />
                            <div>
                                <h4 class="text-sm font-semibold text-gray-900">Scott Micheal</h4>
                                <div class="text-[13px]">No way 🤙! · 11 Mar</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <button class="fixed bottom-20 right-64 cursor-pointer inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
                <svg class="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
                    <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
                </svg>
                <span>New Chat</span>
            </button>
        </div>
    </div>
</section>

{/* <div x-show="open" class="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60" x-data="{ open: true }">
    <div class="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
        <div>👉 <a class="hover:underline ml-1" href="https://cruip.com/?ref=codepen-cruip-snippet-6" target="_blank">More components on Cruip.com</a></div>
        <button class="text-gray-500 hover:text-gray-400 ml-5">
            <span class="sr-only">Close</span>
            <svg class="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 16 16">
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
            </svg>
        </button>
    </div>
</div> */}
        </ul>
        {/* <section class="flex flex-col justify-center antialiased bg-gray-50 text-gray-600 min-h-screen p-4">
    <div class="h-full">

        <div class="relative max-w-[340px] mx-auto bg-white shadow-lg rounded-lg">

            <header class="pt-6 pb-4 px-5 border-b border-gray-200">
                <div class="flex justify-between items-center mb-3">

                    <div class="flex items-center">
                        <a class="inline-flex items-start mr-3" href="#0">
                            <img class="rounded-full" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg" width="48" height="48" alt="Lauren Marsano" />
                        </a>
                        <div class="pr-1">
                            <a class="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                                <h2 class="text-xl leading-snug font-bold">Lauren Marsano</h2>
                            </a>
                            <a class="block text-sm font-medium hover:text-indigo-500" href="#0">@lauren.mars</a>
                        </div>
                    </div>

                    <div class="relative inline-flex flex-shrink-0">
                        <button class="text-gray-400 hover:text-gray-500 rounded-full focus:ring-0 outline-none focus:outline-none">
                            <span class="sr-only">Settings</span>
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                <path d="m15.621 7.015-1.8-.451A5.992 5.992 0 0 0 13.13 4.9l.956-1.593a.5.5 0 0 0-.075-.611l-.711-.707a.5.5 0 0 0-.611-.075L11.1 2.87a5.99 5.99 0 0 0-1.664-.69L8.985.379A.5.5 0 0 0 8.5 0h-1a.5.5 0 0 0-.485.379l-.451 1.8A5.992 5.992 0 0 0 4.9 2.87l-1.593-.956a.5.5 0 0 0-.611.075l-.707.711a.5.5 0 0 0-.075.611L2.87 4.9a5.99 5.99 0 0 0-.69 1.664l-1.8.451A.5.5 0 0 0 0 7.5v1a.5.5 0 0 0 .379.485l1.8.451c.145.586.378 1.147.691 1.664l-.956 1.593a.5.5 0 0 0 .075.611l.707.707a.5.5 0 0 0 .611.075L4.9 13.13a5.99 5.99 0 0 0 1.664.69l.451 1.8A.5.5 0 0 0 7.5 16h1a.5.5 0 0 0 .485-.379l.451-1.8a5.99 5.99 0 0 0 1.664-.69l1.593.956a.5.5 0 0 0 .611-.075l.707-.707a.5.5 0 0 0 .075-.611L13.13 11.1a5.99 5.99 0 0 0 .69-1.664l1.8-.451A.5.5 0 0 0 16 8.5v-1a.5.5 0 0 0-.379-.485ZM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="flex flex-wrap justify-center sm:justify-start space-x-4">
                    <div class="flex items-center">
                        <svg class="w-4 h-4 fill-current flex-shrink-0 text-gray-400" viewBox="0 0 16 16">
                            <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z" />
                        </svg>
                        <span class="text-sm whitespace-nowrap ml-2">Milan, IT</span>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-4 h-4 fill-current flex-shrink-0 text-gray-400" viewBox="0 0 16 16">
                            <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
                        </svg>
                        <a class="text-sm font-medium whitespace-nowrap text-indigo-500 hover:text-indigo-600 ml-2" href="#0">carolinmcneail.com</a>
                    </div>
                </div>
            </header>

            <div class="py-3 px-5">
                <h3 class="text-xs font-semibold uppercase text-gray-400 mb-1">Chats</h3>

                <div class="divide-y divide-gray-200">
                    
                    <button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                        <div class="flex items-center">
                            <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg" width="32" height="32" alt="Marie Zulfikar" />
                            <div>
                                <h4 class="text-sm font-semibold text-gray-900">Marie Zulfikar</h4>
                                <div class="text-[13px]">The video chat ended · 2hrs</div>
                            </div>
                        </div>
                    </button>

                    <button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                        <div class="flex items-center">
                            <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-02_vll8uv.jpg" width="32" height="32" alt="Nhu Cassel" />
                            <div>
                                <h4 class="text-sm font-semibold text-gray-900">Nhu Cassel</h4>
                                <div class="text-[13px]">Hello Lauren 👋, · 24 Mar</div>
                            </div>
                        </div>
                    </button>

                    <button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                        <div class="flex items-center">
                            <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-03_uzwykl.jpg" width="32" height="32" alt="Patrick Friedman" />
                            <div>
                                <h4 class="text-sm font-semibold text-gray-900">Patrick Friedman</h4>
                                <div class="text-[13px]">Yes, you’re right but… · 14 Mar</div>
                            </div>
                        </div>
                    </button>

                    <button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                        <div class="flex items-center">
                            <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-04_ttlftd.jpg" width="32" height="32" alt="Byrne McKenzie" />
                            <div>
                                <h4 class="text-sm font-semibold text-gray-900">Byrne McKenzie</h4>
                                <div class="text-[13px]">Hey Lauren ✨, first of all… · 14 Mar</div>
                            </div>
                        </div>
                    </button>

                    <button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                        <div class="flex items-center">
                            <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-05_bktgmb.jpg" width="32" height="32" alt="Scott Micheal" />
                            <div>
                                <h4 class="text-sm font-semibold text-gray-900">Scott Micheal</h4>
                                <div class="text-[13px]">No way 🤙! · 11 Mar</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <button class="absolute bottom-5 right-5 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
                <svg class="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
                    <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
                </svg>
                <span>New Chat</span>
            </button>
        </div>
    </div>
</section>

<div x-show="open" class="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60" x-data="{ open: true }">
    <div class="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
        <div>👉 <a class="hover:underline ml-1" href="https://cruip.com/?ref=codepen-cruip-snippet-6" target="_blank">More components on Cruip.com</a></div>
        <button class="text-gray-500 hover:text-gray-400 ml-5">
            <span class="sr-only">Close</span>
            <svg class="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 16 16">
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
            </svg>
        </button>
    </div>
</div> */}

{/* end */}
      </div>
      <div class="lg:col-span-2 lg:block ml-72 w-full">
        <div class="w-full">
          <div class="flex items-center sticky top-14 bg-white bg-opacity-70 z-10 p-3 border-b border-gray-300">
            <img class="object-cover w-10 h-10 rounded-full"
              src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
            <span class="block ml-2 font-bold text-gray-600">Emma</span>
            <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
            </span>
          </div>
          <div class="relative w-full p-6 overflow-y-auto h-[40rem] mt-12">
            <ul class="space-y-2">
              <li class="flex justify-start">
                <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                  <span class="block">Hi</span>
                </div>
              </li>
              <li class="flex justify-end">
                <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                  <span class="block">Hiiii</span>
                </div>
              </li>
              <li class="flex justify-end">
                <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                  <span class="block">how are you?</span>
                </div>
              </li>
              <li class="flex justify-start">
                <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                  <span class="block">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex items-center justify-between fixed bottom-0 w-[55%] p-3 border-t border-gray-300">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            <input type="text" placeholder="Message"
              class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
              name="message" required />
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <button type="submit">
              <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Chat3