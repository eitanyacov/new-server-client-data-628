import React, { useState, useRef } from 'react'
import Footer from '../LandingPage/Footer'
import Navbar from '../LandingPage/Navbar'

const Checkout3 = () => {
    const [state1, setState1] = useState(true)
    const [state2, setState2] = useState(false)

    let form = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const form_data = new FormData(form.current);
        let payload = {};
        form_data.forEach(function (value, key) {
            payload[key] = value;
        });
        // console.log("payload", payload);
        // Place your API call here to submit your payload.
    };
    
  return (
    <div>
      <Navbar/>
      <ol class="flex items-center w-full h-40 mt-10 px-8 z-50 fixed top-0 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
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
    <div class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto h-screen mt-20">
  {/* <!-- Card --> */}
  <div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
        Profile
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Manage your name, password and account settings.
      </p>
    </div>

    <form>
      {/* <!-- Grid --> */}
      <div class="grid grid-cols-12 gap-4 sm:gap-6">
        <div class="col-span-3">
          <label class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            Profile photo
          </label>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-9">
          <div class="flex items-center gap-5">
            <img class="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="Image Description"/>
            <div class="flex gap-x-2">
              <div>
                <button type="button" class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                  <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                  </svg>
                  Upload photo
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-3">
          <label for="af-account-full-name" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            Full name
          </label>
          <div class="hs-tooltip inline-block">
            <button type="button" class="hs-tooltip-toggle ml-1">
              <svg class="inline-block w-3 h-3 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
            </button>
            <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700" role="tooltip">
              Displayed on public forums, such as Preline
            </span>
          </div>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-9">
          <div class="sm:flex">
            <input id="af-account-full-name" type="text" class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Maria"/>
            <input type="text" class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Boone"/>
          </div>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-3">
          <label for="af-account-email" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            Email
          </label>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-9">
          <input id="af-account-email" type="email" class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="maria@site.com"/>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-3">
          <label for="af-account-password" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            Password
          </label>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-9">
          <div class="space-y-2">
            <input id="af-account-password" type="text" class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Enter current password"/>
            <input type="text" class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Enter new password"/>
          </div>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-3">
          <div class="inline-block">
            <label for="af-account-phone" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
              Phone
            </label>
            <span class="text-sm text-gray-400 dark:text-gray-600">
              (Optional)
            </span>
          </div>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-9">
          <div class="sm:flex">
            <input id="af-account-phone" type="text" class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="+x(xxx)xxx-xx-xx"/>
            <select class="py-2 px-3 pr-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
              <option selected>Mobile</option>
              <option>Home</option>
              <option>Work</option>
              <option>Fax</option>
            </select>
          </div>

          <p class="mt-3">
            <a class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../docs/index.html">
              <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              Add phone
            </a>
          </p>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-3">
          <label for="af-account-gender-checkbox" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            Gender
          </label>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-9">
          <div class="sm:flex">
            <label for="af-account-gender-checkbox" class="flex py-2 px-3 block w-full border border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
              <input type="radio" name="af-account-gender-checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="af-account-gender-checkbox" checked/>
              <span class="text-sm text-gray-500 ml-3 dark:text-gray-400">Male</span>
            </label>

            <label for="af-account-gender-checkbox-female" class="flex py-2 px-3 block w-full border border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
              <input type="radio" name="af-account-gender-checkbox-female" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="af-account-gender-checkbox-female"/>
              <span class="text-sm text-gray-500 ml-3 dark:text-gray-400">Female</span>
            </label>

            <label for="af-account-gender-checkbox-other" class="flex py-2 px-3 block w-full border border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
              <input type="radio" name="af-account-gender-checkbox-other" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="af-account-gender-checkbox-other"/>
              <span class="text-sm text-gray-500 ml-3 dark:text-gray-400">Other</span>
            </label>
          </div>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-3">
          <label for="af-account-bio" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            BIO
          </label>
        </div>
        {/* <!-- End Col --> */}

        <div class="col-span-9">
          <textarea id="af-account-bio" class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" rows="6" placeholder="Type your message..."></textarea>
        </div>
        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Grid --> */}

      <div class="mt-5 flex justify-end gap-x-2">
        <button type="button" class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
          Cancel
        </button>
        <button type="button" class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
          Save changes
        </button>
      </div>
    </form>
  </div>
  {/* <!-- End Card --> */}
</div>
    </>
)}

{state2 && (
    <>
   <form id="login" onSubmit={handleSubmit}>
            <div className="bg-white dark:bg-gray-800 px-8 pb-8 mt-32">
                <div className="container mx-auto bg-white dark:bg-gray-800 rounded">
                    <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
                        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Profile</p>
                            <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <div className="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
                            <div className="rounded relative mt-8 h-48">
                                <img src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg" alt className="w-full h-full object-cover rounded absolute shadow" />
                                <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                                <div className="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
                                    <p className="text-xs text-gray-100">Change Cover Photo</p>
                                    <div className="ml-2 text-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                            <line x1={16} y1={5} x2={19} y2={8} />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                                    <img src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg" alt className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0" />
                                    <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                                    <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                            <line x1={16} y1={5} x2={19} y2={8} />
                                        </svg>
                                        <p className="text-xs text-gray-100">Edit Picture</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-16 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
                                <label htmlFor="username" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Username
                                </label>
                                <input type="text" id="username" name="username" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="@example" />
                            </div>
                            <div className="mt-8 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full">
                                <label htmlFor="about" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    About
                                </label>
                                <textarea id="about" name="about" required className="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Let the world know who you are" rows={5} defaultValue={""} />
                                <p className="w-full text-right text-xs pt-1 text-gray-500 dark:text-gray-400">Character Limit: 200</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
                    <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Personal Information</p>
                            <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto pt-4">
                        <div className="container mx-auto">
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    First Name
                                </label>
                                <input type="text" id="FirstName" name="firstName" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Last Name
                                </label>
                                <input type="text" id="LastName" name="lastName" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="Email" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Email
                                </label>
                                <div className="border border-green-400 shadow-sm rounded flex">
                                    <div className="px-4 py-3 dark:text-gray-100 flex items-center border-r border-green-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <rect x={3} y={5} width={18} height={14} rx={2} />
                                            <polyline points="3 7 12 13 21 7" />
                                        </svg>
                                    </div>
                                    <input type="text" id="Email" name="email" required className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400" placeholder="example@gmail.com" />
                                </div>
                                <div className="flex justify-between items-center pt-1 text-green-400">
                                    <p className="text-xs">Email submission success!</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                        <path
                                            className="heroicon-ui"
                                            d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0
                              0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                                            stroke="currentColor"
                                            strokeWidth="0.25"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Street Address
                                </label>
                                <input type="text" id="StreetAddress" name="streetAddress" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="City" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    City
                                </label>
                                <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex">
                                    <input type="text" id="City" name="city" required className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-indigo-700 bg-transparent rounded placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Los Angeles" />
                                    <div className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <polyline points="6 15 12 9 18 15" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="State/Province" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    State/Province
                                </label>
                                <input type="text" id="State/Province" name="state" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="California" />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="Country" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Country
                                </label>
                                <input type="text" id="Country" name="country" required className="border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="United States" />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <div className="flex items-center pb-2">
                                    <label htmlFor="ZIP" className="text-sm font-bold text-gray-800 dark:text-gray-100">
                                        ZIP/Postal Code
                                    </label>
                                    <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                            <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                                <input type="text" name="zip" required id="ZIP" className="bg-transparent border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder={86745} />
                                <div className="flex justify-between items-center pt-1 text-red-400">
                                    <p className="text-xs">Incorrect Zip Code</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                                        <circle cx={12} cy={12} r={10} />
                                        <line x1={15} y1={9} x2={9} y2={15} />
                                        <line x1={9} y1={9} x2={15} y2={15} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto mt-10 rounded bg-gray-100 dark:bg-gray-700 w-11/12 xl:w-full">
                    <div className="xl:w-full py-5 px-8">
                        <div className="flex items-center mx-auto">
                            <div className="container mx-auto">
                                <div className="mx-auto xl:w-full">
                                    <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Alerts</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 pt-1">Get updates of any new activity or features. Turn on/off your preferences</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto pb-6">
                        <div className="flex items-center pb-4 border-b border-gray-300 dark:border-gray-700 px-8 text-gray-800 dark:text-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect x={3} y={5} width={18} height={14} rx={2} />
                                <polyline points="3 7 12 13 21 7" />
                            </svg>
                            <p className="text-sm font-bold ml-2 text-gray-800 dark:text-gray-100">Via Email</p>
                        </div>
                        <div className="px-8">
                            <div className="flex justify-between items-center mb-8 mt-4">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Comments</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a post or comment is made</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="email_comments" id="toggle1" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle1" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Job Applications</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a candidate applies to a job posting</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="email_job_application" id="toggle2" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle2" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Product Updates</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notifitied when there is a new product feature or upgrades</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="email_product_update" id="toggle3" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle3" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                        <div className="pb-4 border-b border-gray-300 dark:border-gray-700 px-8">
                            <div className="flex items-center text-gray-800 dark:text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                </svg>
                                <p className="text-sm font-bold ml-2 text-gray-800 dark:text-gray-100">Push Notifications</p>
                            </div>
                        </div>
                        <div className="px-8">
                            <div className="flex justify-between items-center mb-8 mt-4">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Comments</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a post or comment is made</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="notification_comment" id="toggle4" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle4" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Job Applications</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a candidate applies to a job posting</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="notification_application" id="toggle5" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle5" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Product Updates</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notifitied when there is a new product feature or upgrades</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="notification_updates" id="toggle6" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle6" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto w-11/12 xl:w-full">
                    <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
                        <button className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4">Cancel</button>
                        <button className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm" type="submit">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </>
)}

      
      {/* <div className='absolute bottom-0'>
      <Footer/>
      </div> */}
    </div>
  )
}

export default Checkout3