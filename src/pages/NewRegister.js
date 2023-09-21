import React, { useState } from "react";
import { CheckIcon } from '@heroicons/react/20/solid'

const NewRegister = () => {
  const [mode, setMode] = useState(true)
    const includedFeatures = [
        'Private forum access',
        'Member resources',
        'Entry to annual conference',
        'Official member t-shirt',
      ]
      
  return (
    <>
    {mode ? (
      // <div className="bg-white py-24 dark sm:py-32 relative bottom-7 h-screen">
      <div className="bg-white py-24 sm:py-32 relative bottom-7 h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center relative bottom-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas
            in. Explicabo id ut laborum.
          </p>
        </div>
        <div className="mx-auto relative bottom-1 sm:bottom-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
              repellendus etur quidem assumenda.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <a
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                 onClick={()=> setMode(false)}>
                  Get access
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
          <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
      </div>
      <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0" dir='rtl'>
          {/* <!-- Pricing Card --> */}
          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">Starter</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next project.</p>
              {/* <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">$29</span>
                  <span class="text-gray-500 dark:text-gray-400">/month</span>
              </div> */}
              <div class="flex justify-center items-baseline my-8 space-x-1">
                {/* <span class="text-gray-500 dark:text-gray-400">חודש/ </span> */}
                    <span class="mr-2 text-5xl font-extrabold">₪290</span>
                    <span class="text-gray-500 dark:text-gray-400">/חודש</span>
                </div>
              {/* <!-- List --> */}
              <ul role="list" class="mb-8 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Individual configuration</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Team size: <span class="font-semibold">1 developer</span></span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Premium support: <span class="font-semibold">6 months</span></span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Free updates: <span class="font-semibold">6 months</span></span>
                  </li>
              </ul>
              <a href="https://v.cardcom.solutions/EA5/R08Ub0N6YEetUb5nAxiLKA/Order" class="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-indigo-800">Get started</a>
          </div>
          {/* <!-- Pricing Card --> */}
          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">Company</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
              {/* <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">$99</span>
                  <span class="text-gray-500 dark:text-gray-400" >/month</span>
              </div> */}
              <div class="flex justify-center items-baseline my-8 space-x-1">
                {/* <span class="text-gray-500 dark:text-gray-400">חודש/ </span> */}
                    <span class="mr-2 text-5xl font-extrabold">₪390</span>
                    <span class="text-gray-500 dark:text-gray-400">/חודש</span>
                </div>
              {/* <!-- List --> */}
              <ul role="list" class="mb-8 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Individual configuration</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Team size: <span class="font-semibold">10 developers</span></span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Premium support: <span class="font-semibold">24 months</span></span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Free updates: <span class="font-semibold">24 months</span></span>
                  </li>
              </ul>
              <a href="https://v.cardcom.solutions/EA5/wV88uvYdhU6alBU0jsEd8w/Order" class="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-indigo-800">Get started</a>
          </div>
          {/* <!-- Pricing Card --> */}
          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">Enterprise</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
              {/* <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">$499</span>
                  <span class="text-gray-500 dark:text-gray-400">/month</span>
              </div> */}
              <div class="flex justify-center items-baseline my-8 space-x-1">
                {/* <span class="text-gray-500 dark:text-gray-400">חודש/ </span> */}
                    <span class="mr-2 text-5xl font-extrabold">₪450</span>
                    <span class="text-gray-500 dark:text-gray-400">/חודש</span>
                </div>
              {/* <!-- List --> */}
              <ul role="list" class="mb-8 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Individual configuration</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Team size: <span class="font-semibold">100+ developers</span></span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Premium support: <span class="font-semibold">36 months</span></span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Free updates: <span class="font-semibold">36 months</span></span>
                  </li>
              </ul>
              <a href="https://v.cardcom.solutions/EA5/WBILvFo7UKziZJ5xaipfQ/Order" class="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-indigo-800">Get started</a>
          </div>
      </div>
  </div>
</section>
      
  
  <section class="mb-32 text-gray-800 px-12 pb-2 mt-10">
      <div class="flex justify-center">
        <div class="text-center max-w-[700px]">
          <h2 class="text-3xl font-bold mb-1">Why is it so great?</h2>
          <p class="text-gray-500 mb-12">
            Nunc tincidunt vulputate elit. Mauris varius purus malesuada neque iaculis malesuada.
            Aenean gravida magna orci, non efficitur est porta id. Donec magna diam.
          </p>
        </div>
      </div>
  
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 xl:gap-x-12">
        <div class="mb-12">
          <div class="flex">
            <div class="shrink-0 mt-1">
              <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                </path>
              </svg>
            </div>
            <div class="grow ml-4">
              <p class="font-bold mb-1">Support 24/7</p>
              <p class="text-gray-500">Pellentesque mollis, metus nec fringilla aliquam</p>
            </div>
          </div>
        </div>
  
        <div class="mb-12">
          <div class="flex">
            <div class="shrink-0 mt-1">
              <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                </path>
              </svg>
            </div>
            <div class="grow ml-4">
              <p class="font-bold mb-1">Tracking</p>
              <p class="text-gray-500">Magna lacus iaculis elit, quis pharetra varius.</p>
            </div>
          </div>
        </div>
  
        <div class="mb-12">
          <div class="flex">
            <div class="shrink-0 mt-1">
              <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                </path>
              </svg>
            </div>
            <div class="grow ml-4">
              <p class="font-bold mb-1">Reporting</p>
              <p class="text-gray-500">Pellentesque varius ex vel consequat quis.</p>
            </div>
          </div>
        </div>
  
        <div class="mb-12">
          <div class="flex">
            <div class="shrink-0 mt-1">
              <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                </path>
              </svg>
            </div>
            <div class="grow ml-4">
              <p class="font-bold mb-1">Analytics</p>
              <p class="text-gray-500">Vestibulum gravida iaculis nisl, vel lobortis eros.</p>
            </div>
          </div>
        </div>
  
        <div class="mb-12">
          <div class="flex">
            <div class="shrink-0 mt-1">
              <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                </path>
              </svg>
            </div>
            <div class="grow ml-4">
              <p class="font-bold mb-1">Huge community</p>
              <p class="text-gray-500">Praesent vulputate lacus bibendum augue .</p>
            </div>
          </div>
        </div>
  
        <div class="mb-12">
          <div class="flex">
            <div class="shrink-0 mt-1">
              <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                </path>
              </svg>
            </div>
            <div class="grow ml-4">
              <p class="font-bold mb-1">Easy to use</p>
              <p class="text-gray-500">Sed mauris ex, imperdiet sit amet nisl ac, ultrices.</p>
            </div>
          </div>
        </div>
  
        <div class="mb-12">
          <div class="flex">
            <div class="shrink-0 mt-1">
              <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                </path>
              </svg>
            </div>
            <div class="grow ml-4">
              <p class="font-bold mb-1">Frequent updates</p>
              <p class="text-gray-500">Aenean lectus ex, placerat id tellus in eros.</p>
            </div>
          </div>
        </div>
  
        <div class="mb-12">
          <div class="flex">
            <div class="shrink-0 mt-1">
              <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                </path>
              </svg>
            </div>
            <div class="grow ml-4">
              <p class="font-bold mb-1">Responsive</p>
              <p class="text-gray-500">Donec consequat orci quis volutpat imperdiet.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <div class="relative bottom-28 max-w-screen-xl p-10 mx-8 bg-white dark:bg-gray-800 sm:px-6 lg:px-8 py-8 lg:mt-10">
      <div class="relative">
          <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div class="ml-auto lg:col-start-2 lg:max-w-2xl">
                  <p class="text-base font-semibold leading-6 text-indigo-500 uppercase">
                      Interactive
                  </p>
                  <h4 class="mt-2 text-2xl font-extrabold leading-8 text-gray-900 dark:text-white sm:text-3xl sm:leading-9">
                      Interactivity between team members is the key of the success.
                  </h4>
                  <p class="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
                      Build a simply and powered collaborative space for all your team. Track, share, measure, you have a fully control, it&#x27;s never be simply and efficient.
                  </p>
                  <ul class="gap-6 mt-8 md:grid md:grid-cols-2">
                      <li class="mt-6 lg:mt-0">
                          <div class="flex">
                              <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full dark:text-green-500 drark:bg-transparent">
                                  <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                                      </path>
                                  </svg>
                              </span>
                              <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                                  Live modifications
                              </span>
                          </div>
                      </li>
                      <li class="mt-6 lg:mt-0">
                          <div class="flex">
                              <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full dark:text-green-500 drark:bg-transparent">
                                  <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                                      </path>
                                  </svg>
                              </span>
                              <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                                  Data tracker
                              </span>
                          </div>
                      </li>
                      <li class="mt-6 lg:mt-0">
                          <div class="flex">
                              <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full dark:text-green-500 drark:bg-transparent">
                                  <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                                      </path>
                                  </svg>
                              </span>
                              <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                                  24/24 support
                              </span>
                          </div>
                      </li>
                      <li class="mt-6 lg:mt-0">
                          <div class="flex">
                              <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full dark:text-green-500 drark:bg-transparent">
                                  <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                                      </path>
                                  </svg>
                              </span>
                              <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                                  Free tips to improve work time
                              </span>
                          </div>
                      </li>
                  </ul>
              </div>
              <div class="relative mt-10 lg:-mx-4 relative-20 lg:mt-0 lg:col-start-1">
                  <div class="relative space-y-4">
                      <div class="flex items-end justify-center space-x-4 lg:justify-start">
                          <img class="w-32 rounded-lg shadow-lg md:w-56" width="200" src="https://docs.appian.com/suite/help/20.2/images/Quick_Apps/reportsTab.png" alt="1"/>
                          <img class="w-40 rounded-lg shadow-lg md:w-64" width="260" src="https://www.microsoft.com/en-us/microsoft-365/blog/wp-content/uploads/sites/2/2012/06/Excel-charts-11.png" alt="2"/>
                      </div>
                      <div class="flex items-start justify-center ml-12 space-x-4 lg:justify-start">
                          <img class="w-24 rounded-lg shadow-lg md:w-40" width="170" src="https://docs.appian.com/suite/help/21.4/images/ux_pages/color_DONT_multipleSchemes.png" alt="3"/>
                          <img class="w-32 rounded-lg shadow-lg md:w-56" width="200" src="https://docs.appian.com/suite/help/21.4/images/ux_pages/charts_dashboard.png" alt="4"/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  
    </div>
    ) : (
      <>
       <div class="flex items-center justify-center min-h-screen p-5 bg-gray-600 min-w-screen">
            <div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                <h3 class="text-2xl">Thanks for signing up for nartina.com!</h3>
                <div class="flex justify-center">
                    <svg class="w-32 h-32" viewBox="0 0 50 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M42.2285 0C40.3812 4.92e-05 38.7061 0.741775 37.4785 1.94141H18.4102C18.3787 1.94141 18.3493 1.94909 18.3184 1.95117C18.1298 1.94236 17.9327 1.91521 17.6641 1.97656C17.5086 2.01156 17.3074 2.10876 17.1797 2.28516C17.052 2.46106 17.0156 2.66417 17.0156 2.85547V3.20898C17.0101 3.25944 17 3.30955 17 3.36133V4.11719L17.0156 4.12695V19.9551C17.0156 20.1414 17.0477 20.3306 17.1484 20.502C17.2492 20.6734 17.4182 20.7996 17.5723 20.8613C17.8803 20.9847 18.1304 20.9551 18.3789 20.9551H45.6523C46.0097 20.9551 46.3585 20.8387 46.6152 20.5977C46.872 20.3565 47.0156 19.9997 47.0156 19.627V11.6309C48.2595 10.3975 49.0312 8.69075 49.0312 6.80469C49.0313 3.05339 45.9798 0 42.2285 0ZM42.2285 1C45.4394 1 48.0313 3.59389 48.0312 6.80469C48.0312 10.0156 45.4394 12.6074 42.2285 12.6074C39.0177 12.6074 36.4238 10.0156 36.4238 6.80469C36.4238 3.59389 39.0176 1.0001 42.2285 1ZM42.2285 1.91992C39.5376 1.91992 37.3457 4.11389 37.3457 6.80469C37.3457 9.49559 39.5377 11.6874 42.2285 11.6875C44.9194 11.6875 47.1113 9.49559 47.1113 6.80469C47.1114 4.11389 44.9194 1.91992 42.2285 1.91992ZM42.2285 2.91992C44.379 2.91992 46.1113 4.65429 46.1113 6.80469C46.1113 8.95509 44.3789 10.6875 42.2285 10.6875C40.0781 10.6874 38.3457 8.95509 38.3457 6.80469C38.3457 4.65429 40.0781 2.91992 42.2285 2.91992ZM18.3496 2.95312C18.3775 2.9531 18.3771 2.95312 18.4102 2.95312H36.625C35.8693 4.04923 35.4238 5.37598 35.4238 6.80469C35.4238 8.17802 35.8362 9.45503 36.5391 10.5254L32.2715 13.6211L32.2539 13.6387C32.1417 13.7387 32.0985 13.7439 32.0605 13.7441C32.0226 13.7443 31.9342 13.7282 31.7715 13.6094L18.043 3.61328L18.0156 3.5957V3.27734C18.0495 3.10235 18.1792 2.97857 18.3496 2.95312ZM44.6426 4.63672C44.513 4.63827 44.389 4.69009 44.2969 4.78125L41.1934 7.77148L40.1602 6.77539C40.1131 6.72883 40.0574 6.69206 39.996 6.66721C39.9347 6.64236 39.8691 6.62993 39.8029 6.63064C39.7368 6.63134 39.6714 6.64517 39.6106 6.67132C39.5498 6.69747 39.4949 6.73542 39.4489 6.78298C39.4028 6.83053 39.3667 6.88674 39.3426 6.94835C39.3185 7.00996 39.3068 7.07575 39.3083 7.1419C39.3098 7.20805 39.3244 7.27324 39.3513 7.33371C39.3782 7.39417 39.4167 7.4487 39.4648 7.49414L40.8457 8.82617C40.9389 8.91579 41.0631 8.96586 41.1924 8.96586C41.3217 8.96586 41.4459 8.91579 41.5391 8.82617L44.9902 5.5C45.0632 5.43099 45.1137 5.34161 45.1351 5.2435C45.1565 5.14539 45.1479 5.04311 45.1104 4.94995C45.0729 4.8568 45.0082 4.7771 44.9248 4.72124C44.8413 4.66537 44.743 4.63592 44.6426 4.63672V4.63672ZM18.0156 4.83203L31.1836 14.418C31.4501 14.6121 31.7434 14.7459 32.0664 14.7441C32.3894 14.7441 32.6876 14.5913 32.918 14.3867L37.1523 11.3164C38.3998 12.7173 40.2098 13.6074 42.2285 13.6074C43.6296 13.6074 44.9323 13.18 46.0156 12.4512V19.627C46.0156 19.7646 45.9788 19.8212 45.9297 19.8672C45.8806 19.9132 45.7986 19.9551 45.6523 19.9551H18.3789C18.1652 19.9551 18.0614 19.9415 18.0156 19.9375V4.83203Z"
                            fill="url(#paint0_linear)" />
                        <rect y="5" width="15" height="2" rx="1" fill="#3BB54A" />
                        <rect y="11" width="15" height="2" rx="1" fill="#3BB54A" />
                        <rect y="8" width="6" height="2" rx="1" fill="#3BB54A" />
                        <rect y="15" width="6" height="2" rx="1" fill="#3BB54A" />
                        <rect x="8" y="8" width="6" height="2" rx="1" fill="#3BB54A" />
                        <rect x="8" y="15" width="6" height="2" rx="1" fill="#3BB54A" />
                        <defs>
                            <linearGradient id="paint0_linear" x1="16.9996" y1="10.4791" x2="47.0156" y2="10.4791"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#009217" />
                                <stop offset="1" stop-color="#00FF29" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <p>We're happy you're here. Let's get your email address verified:</p>
                <div class="mt-4">
                    <button class="px-2 py-2 text-blue-200 bg-blue-600 rounded" onClick={()=> setMode(true)}>Click to Verify Email</button>
                    <p class="mt-4 text-sm">If you’re having trouble clicking the "Verify Email Address" button, copy
                        and
                        paste
                        the URL below
                        into your web browser:
                        <a href="" class="text-blue-600">https://nartina/email/verify/3/1ab7a09a3</a>
                    </p>
                </div>
            </div>
        </div>
      </>
    )}
    </>
  
  )
}

export default NewRegister