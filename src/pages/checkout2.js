import React, { useState, useRef } from 'react'
import Footer from '../LandingPage/Footer'
import Navbar from '../LandingPage/Navbar'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'


const Checkout2 = () => {
  const [state1, setState1] = useState(true)
  const [state2, setState2] = useState(false)
  const [passwordMode, setPasswordMode] = useState(false)


  return (
    <div className='overflow-x-hidden min-h-screen'>
        <Navbar/>
        <ol class="flex items-center w-full h-20 mt-20 opacity-90 bg-white rounded px-8 fixed top-0 z-50 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
    <li class={`flex md:w-full cursor-pointer items-center ${state1 ? 'text-blue-600' : 'text-gray-600'} dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`} onClick={()=> {setState2(false)
    setState1(true)}}>
        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            {state1 ? (
                <svg aria-hidden="true" class="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            ) : (
                <span class="mr-2">1</span>
            )}
            Personal <span class="hidden sm:inline-flex sm:ml-2">Info</span>
        </span>
    </li>
    <li class={`flex md:w-full cursor-pointer items-center ${state2 ? 'text-blue-600' : 'text-gray-600'} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`} onClick={()=> {setState1(false)
    setState2(true)}}>
        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
        {state2 ? (
                <svg aria-hidden="true" class="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            ) : (
                <span class="mr-2">2</span>
            )}
            Account <span class="hidden sm:inline-flex sm:ml-2">Info</span>
        </span>
    </li>
    <li class="flex items-center cursor-pointer">
        <span class="mr-2">3</span>
        Confirmation
    </li>
</ol>
        {state1 && (
          <>
          <div class="relative mx-auto w-full bg-white h-screen mt-32 md:mt-14 ">
  <div class="grid min-h-screen grid-cols-10 w-full md:ml-4 lg:ml-10">
  
    <div class="relative col-span-full flex flex-col mt-8 md:mt-[101px] max-h-[570px] py-6 pl-8 pr-4 sm:py-12 md:col-span-4 md:py-24 order-2 md:order-1">
      <h2 class="sr-only">Order summary</h2>
      <div>
        <img src="https://quickchart.io/images/bar_chart_logo.svg" alt="" class="absolute inset-0 h-full p-4 w-full object-cover" />
        <div class="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-90"></div>
      </div>
      <div class="relative ">
        <ul class="space-y-5 relative bottom-5">
          <li class="flex justify-between">
          <p class="text-sm font-semibold text-white">$149.00</p>

            <div class="inline-flex">
              <div class="mr-3 flex flex-col items-end">
                <p class="text-base font-semibold text-white text-right">חבילת פרו לניהול העסק</p>
                <p class="text-sm font-medium text-white text-opacity-80 text-right">תשלום חודשי</p>
              </div>
              <img src="https://www.onlc.com/blog/wp-content/uploads/2017/10/ONLC-2017.png" alt="" class="max-h-16" />

            </div>
          </li>
          <li class="flex justify-between">
          <p class="text-sm font-semibold text-white">$19.00</p>

            <div class="inline-flex">
              <div class="mr-3 flex flex-col items-end">
                <p class="text-base font-semibold text-white text-right">תמיכה טכנית בצ'אט</p>
                <p class="text-sm font-medium text-white text-opacity-80 text-right">שעות פעילות 9:00 - 19:00</p>
              </div>
              <img src="https://h5p.org/sites/default/files/styles/medium-logo/public/logos/chart-icon-color.png" alt="" class="max-h-16" />

            </div>
          </li>
        </ul>
        <div class="my-5 h-0.5 w-full bg-white bg-opacity-30 relative bottom-4"></div>
        <div class="space-y-2 relative bottom-1">
          <p class="flex justify-between text-lg font-bold text-white"><span>$196.56</span><span>:סכום לחיוב</span></p>
          <p class="flex justify-between text-sm font-medium text-white"><span>$28.56</span><span>מע"מ: 17%</span></p>
        </div>
      </div>
      <div class="relative mt-7 flex flex-col items-end text-white">
        <h3 class="mb-5 text-lg font-bold">תמיכה טכנית</h3>
        <p class="text-sm font-semibold">+01 653 235 211 <span class="font-light">(International)</span></p>
        <p class="mt-1 text-sm font-semibold">support@nanohair.com <span class="font-light">(Email)</span></p>
        <p class="mt-2 text-xs font-medium">Call us now for payment related issues</p>
      </div>
      <div class="relative mt-5 flex flex-col items-end">
        <p class="flex flex-col"><span class="text-sm font-bold text-white">Money Back Guarantee</span><span class="text-xs font-medium text-white text-right">within 30 days of purchase</span></p>
      </div>
    </div>
    <div class="col-span-full py-6 px-4 sm:py-12 md:col-span-6 md:py-24 order-1 md:order-2">
      <div class="mx-auto w-full max-w-lg">
        <h1 class="relative text-2xl font-medium text-gray-700 sm:text-3xl text-right mb-2">טופס מאובטח<span class="mt-2 block h-1 w-10 absolute right-0 bg-teal-600 sm:w-20"></span></h1>
        <form action="" class="mt-10 flex flex-col space-y-4">
          <div>
            <h1 for="email" class="text-xs font-semibold text-gray-500 text-right">כתובת אימייל</h1>
            <input type="email" id="email" name="email" placeholder="john.capler@fang.com" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
            </div>
          <div class="relative"><h1 for="card-number" class="text-xs font-semibold text-gray-500 text-right">מספר כרטיס</h1><input type="text" id="card-number" name="card-number" placeholder="1234-5678-XXXX-XXXX" class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4" /></div>
          <div>
            <p class="text-xs font-semibold text-gray-500 text-right">תאריך תפוגה</p>
            <div class="flex space-x-2 justify-end">
            <div class="relative bottom-3">
              <h1 for="security-code" class="text-xs font-semibold text-gray-500 text-right">CSV קוד</h1>
              <input type="text" id="security-code" name="security-code" placeholder="Security code" class="block w-36 rounded border-gray-300 bg-gray-50 py-[11px] px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
            </div>

              <div class="my-1">
                <label for="month" class="sr-only">Select expiration month</label>
               <select name="month" id="month" class="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
                  <option value="">Month</option>
                </select>
              </div>
              <div class="my-1 ml-3 mr-6">
                <label for="year" class="sr-only">Select expiration year</label>
                <select name="year" id="year" class="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
                  <option value="">Year</option>
                </select>
              </div>
              {/* <div class="relative my-1"><label for="security-code" class="sr-only">Security code</label><input type="text" id="security-code" name="security-code" placeholder="Security code" class="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div> */}
            </div>
          </div>
          <div>
            <h1 for="email" class="text-xs font-semibold text-gray-500 text-right">שם על הכרטיס</h1>
            <input type="text" id="card-name" name="card-name" placeholder="Name on the card" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
            </div>
        </form>
        <p class="mt-10 text-center text-sm font-semibold text-gray-500">By placing this order you agree to the <a href="#" class="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</a></p>
        <button type="submit" class="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 hover:bg-teal-500 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</button>
      </div>
    </div>
  </div>
</div>
          </>
        )}
        {state2 && (
          <>
          <form className='px-10 pt-8 pb-14 mt-[120px]'>
<div className="space-y-12">
<div className="border-b border-gray-900/10 pb-12">
<h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
<p className="mt-1 text-sm leading-6 text-gray-600">
  This information will be displayed publicly so be careful what you share.
</p>

<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
  <div className="sm:col-span-4">
    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
      Username
    </label>
    <div className="mt-2">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="janesmith"
        />
      </div>
    </div>
  </div>

  <div className="col-span-full">
    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
      About
    </label>
    <div className="mt-2">
      <textarea
        id="about"
        name="about"
        rows={3}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={''}
      />
    </div>
    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
  </div>

  <div className="col-span-full">
    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
      Photo
    </label>
    <div className="mt-2 flex items-center gap-x-3">
      <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
      <button
        type="button"
        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Change
      </button>
    </div>
  </div>

  <div className="col-span-full">
    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
      Cover photo
    </label>
    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
      <div className="text-center">
        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  </div>
</div>
</div>

<div className="border-b border-gray-900/10 pb-12">
<h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
<p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
  <div className="sm:col-span-3">
    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
      First name
    </label>
    <div className="mt-2">
      <input
        type="text"
        name="first-name"
        id="first-name"
        autoComplete="given-name"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>

  <div className="sm:col-span-3">
    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
      Last name
    </label>
    <div className="mt-2">
      <input
        type="text"
        name="last-name"
        id="last-name"
        autoComplete="family-name"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>

  <div className="sm:col-span-4">
    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
      Email address
    </label>
    <div className="mt-2">
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>

  <div className="sm:col-span-3">
    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
      Country
    </label>
    <div className="mt-2">
      <select
        id="country"
        name="country"
        autoComplete="country-name"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
      >
        <option>United States</option>
        <option>Canada</option>
        <option>Mexico</option>
      </select>
    </div>
  </div>

  <div className="col-span-full">
    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
      Street address
    </label>
    <div className="mt-2">
      <input
        type="text"
        name="street-address"
        id="street-address"
        autoComplete="street-address"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>

  <div className="sm:col-span-2 sm:col-start-1">
    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
      City
    </label>
    <div className="mt-2">
      <input
        type="text"
        name="city"
        id="city"
        autoComplete="address-level2"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>

  <div className="sm:col-span-2">
    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
      State / Province
    </label>
    <div className="mt-2">
      <input
        type="text"
        name="region"
        id="region"
        autoComplete="address-level1"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>

  <div className="sm:col-span-2">
    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
      ZIP / Postal code
    </label>
    <div className="mt-2">
      <input
        type="text"
        name="postal-code"
        id="postal-code"
        autoComplete="postal-code"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
</div>
</div>

<div className="border-b border-gray-900/10 pb-12">
<h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
<p className="mt-1 text-sm leading-6 text-gray-600">
  We'll always let you know about important changes, but you pick what else you want to hear about.
</p>

<div className="mt-10 space-y-10">
  <fieldset>
    <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
    <div className="mt-6 space-y-6">
      <div className="relative flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor="comments" className="font-medium text-gray-900">
            Comments
          </label>
          <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
        </div>
      </div>
      <div className="relative flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id="candidates"
            name="candidates"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor="candidates" className="font-medium text-gray-900">
            Candidates
          </label>
          <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
        </div>
      </div>
      <div className="relative flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id="offers"
            name="offers"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor="offers" className="font-medium text-gray-900">
            Offers
          </label>
          <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
        </div>
      </div>
    </div>
  </fieldset>
  <fieldset>
    <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
    <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
    <div className="mt-6 space-y-6">
      <div className="flex items-center gap-x-3">
        <input
          id="push-everything"
          name="push-notifications"
          type="radio"
          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
          Everything
        </label>
      </div>
      <div className="flex items-center gap-x-3">
        <input
          id="push-email"
          name="push-notifications"
          type="radio"
          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
          Same as email
        </label>
      </div>
      <div className="flex items-center gap-x-3">
        <input
          id="push-nothing"
          name="push-notifications"
          type="radio"
          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
          No push notifications
        </label>
      </div>
    </div>
    <button
        type="button"
        className="rounded-md relative top-6 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={()=> setPasswordMode(true)}
      >
        Change Password
      </button>
  </fieldset>
</div>
</div>
</div>

<div className="mt-6 flex items-center justify-end gap-x-6 pr-5">
<button type="button" className="text-sm font-semibold leading-6 text-gray-900">
Cancel
</button>
<button
type="submit"
className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
Save
</button>
</div>
</form>
          {/* <div class="flex flex-col items-center justify-center min-h-screen flex-auto flex-shrink-0">
<div class="relative h-56 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg w-96 overflow-hidden">
<svg viewBox="0 0 220 192" width="220" height="192" fill="none" class="absolute -left-10 -top-16 text-blue-900 opacity-50">
<defs>
<pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
<rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
</pattern>
</defs>
<rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
</svg>
<svg viewBox="0 0 220 192" width="220" height="192" fill="none" class="absolute -right-20 -bottom-32 text-blue-900 opacity-50">
<defs>
<pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
<rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
</pattern>
</defs>
<rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
</svg>
<img src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png" alt="" srcset="" class="absolute right-4 bottom-2 h-24"/>
<div class="absolute top-10 left-8 h-12 w-16 bg-gradient-to-r from-yellow-400 to-yellow-200 opacity-90 rounded-lg overflow-hidden">
<span class="flex absolute top-1/2 left-1 h-full w-10 bg-opacity-50 rounded-lg transform -translate-y-1/2 -translate-x-1/2 border border-gray-400"></span>
<span class="flex absolute top-1/2 right-1 h-full w-10 bg-opacity-50 rounded-lg transform -translate-y-1/2 translate-x-1/2 border border-gray-400"></span>
<span class="flex absolute top-1.5 right-0 w-full h-5 bg-opacity-50 rounded-full transform -translate-y-1/2 border border-gray-400"></span>
<span class="flex absolute bottom-1.5 right-0 w-full h-5 bg-opacity-50 rounded-full transform translate-y-1/2 border border-gray-400"></span>
</div>
<div class="absolute bottom-20 left-8 text-white font-semibold text-2xl space-x-1.5">
<span>****</span>
<span>****</span>
<span>****</span>
<span>8237</span>
</div>
<div class="absolute bottom-16 left-8 text-gray-200 font-semibold text-base">
<span>10</span>
<span>/</span>
<span>22</span>
</div>
<div class="absolute bottom-6 left-8 text-gray-200 font-semibold text-xl uppercase">
<span>John Doe</span>
</div>
</div>
</div> */}



          </>
        )}
        <div className='hidden md:block'>
        <Footer/>
        </div>
    </div>
  )
}

export default Checkout2