import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { ThemeContext } from "../App";
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Card from '../components/Card';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog } from '@mui/material'
import { Fragment } from 'react'
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import image from '../assets/workers.jpg'
import image2 from '../assets/workers2.jpg'
import axios from "axios";

const WorkerCard = () => {
    const { hebrew } = useContext(ThemeContext)
    const [roll, setRoll] = useState(false)
    const [stars, setStars] = useState(false)


    const theme = createTheme({
        direction: 'rtl',
      });

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const navigate = useNavigate()

    const { workerid } = useParams() 

    const workerInfo = () => {

        return axios.get(`https://nartina.com/api/user/get-worker-by-id/${workerid}`)
      }
      
      const {data: worker} = useQuery('the-worker-info', ()=> workerInfo(),
        {
          refetchOnMount: true,
          refetchOnWindowFocus: false
        })

        // const workerSal = () => {

        //   return axios.get(`https://nartina.com/api/user/sum-by-worker-month/${workerid}`)
        // }
        
        // const {data: salary} = useQuery('the-worker-sal', ()=> workerSal(),
        //   {
        //     refetchOnMount: true,
        //     refetchOnWindowFocus: false
        //   })

        const workerSal = () => {

          return axios.get(`https://nartina.com/api/user/sum-by-worker-month-2/${workerid}`)
        }
        
        const {data: salary} = useQuery('the-worker-sal', ()=> workerSal(),
          {
            refetchOnMount: true,
            refetchOnWindowFocus: false
          })

          const workerHours = () => {

            return axios.get(`https://nartina.com/api/user/parse-sum/${workerid}`)
          }
          
          const {data: hours} = useQuery('the-worker-hours', ()=> workerHours(),
            {
              refetchOnMount: true,
              refetchOnWindowFocus: false
            })  


          // const totalHours = (e) => {
          //   e.preventDefault();
          //   axios.get(`https://nartina.com/api/user/parse-sum/${workerId}`)
          //   .then(res => {setTotal(res.data)
          //   //   setOpenDialog2(false)
          //   //   setWorkerFullName("")
          //     setTotalAlert(true)
          //   console.log(res.data)})
          //   .catch(err => console.log(err))
          //   // .finally(setOpenDialog2(false))
          //   // setWorkerFullName("")
    
            
          // }

        useEffect(()=> {
            setTimeout(()=> {
              setRoll(true)
            }, 500)
        }, [roll])

        const solutions = [
            // {
            //   name: 'חשבוניות לקוח',
            //   path: '/customers/',
            //   description: 'כל רשימת החשבוניות שהוצאו ללקוח',
            //   href: '##',
            //   icon: IconOne,
            // },
            {
              name: 'משימות עובד',
              path: '/workers-tasks/',
              description: 'רשימת המשימות שהוצמדו לעובד',
              href: '##',
              icon: IconTwo,
            },
            {
              name: 'משכורות עובד',
              path: '/workers/',
              description: 'רשימת כל המשכורות שהוצאו לעובד',
              href: '##',
              icon: IconThree,
            },
            {
              name: 'שעון נוכחות עובד',
              path: '/worker-clock/',
              description: 'כל השעות העבודה שהחתים העובד',
              href: '##',
              icon: IconFour,
            },
            {
              name: 'סידור עבודה עובד',
              path: '/worker-roster/',
              description: 'כל סידורי העבודה שהוצאו לעובד',
              href: '##',
              icon: IconOne,
            },
            {
              name: 'אימיילים',
              path: '/worker-emails/',
              description: 'רשימת תכתובות האימיילים שנשלחו לספק מהמערכת',
              href: '##',
              icon: IconThree,
            },
            // {
            //   name: 'כרטיס לקוח',
            //   path: '/customer-reports/',
            //   description: 'כרטסת לקוח עם כל הנתונים השנתיים',
            //   href: '##',
            //   icon: IconFour,
            // },
            // {
            //     name: 'קבלות לקוח',
            //     path: '/kabalot/',
            //     description: 'כל הקבלות שהוצאו ללקוח',
            //     href: '##',
            //     icon: IconTwo,
            //   },
          ]
          
          function IconOne() {
            return (
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="8" fill="#FFEDD5" />
                <path
                  d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
                  stroke="#FB923C"
                  strokeWidth="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
                  stroke="#FDBA74"
                  strokeWidth="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
                  stroke="#FDBA74"
                  strokeWidth="2"
                />
              </svg>
            )
          }
          
          function IconTwo() {
            return (
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="8" fill="#FFEDD5" />
                <path
                  d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
                  stroke="#FB923C"
                  strokeWidth="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
                  stroke="#FDBA74"
                  strokeWidth="2"
                />
              </svg>
            )
          }
          
          function IconThree() {
            return (
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="8" fill="#FFEDD5" />
                <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
                <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
                <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
                <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
                <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
                <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
              </svg>
            )
          }
      
          function IconFour() {
            return (
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="8" fill="#FFEDD5" />
                <path
                  d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
                  stroke="#FB923C"
                  strokeWidth="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
                  stroke="#FDBA74"
                  strokeWidth="2"
                />
              </svg>
            )
          }
          var y = Math.random();
    
        // const image = "https://img.freepik.com/premium-vector/flat-design-business-facebook-cover_23-2149728797.jpg?w=1000"

  return (
    <div className={`max-w-[1740px] min-h-screen mt-14 ${hebrew ? "mr-0 airx:ml-64" : "mr-0 airx:mr-64"}`}>
      <Card extra={"items-center flex-col w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover bg-center"
        // className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover bg-gradient-to-r from-cyan-500 to-blue-500"
        // style={{ backgroundImage: `url(${y < 0.5 ? image : image2})` }}
        style={{ backgroundImage: `url(${image2})`}}
      >
        <div className={`dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] bg-green-700 border-white`}>
          <span class={`top-0 right-2 absolute  w-3.5 h-3.5 ${worker?.data.active ? "bg-green-500" : "bg-red-500"} border-2 border-white dark:border-gray-800 rounded-full`}></span>
          <h1 className='font-mono text-white text-4xl font-semibold'>{worker?.data.firstName.substring(0, 1)}</h1>
        </div>

      </div>
 
      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-[#373D3F] text-3xl font-bold dark:text-white">
        {worker?.data.fullName}
        </h4>
        <p class="flex items-center text-sm text-gray-400">
            <svg width="10" height="10" fill="currentColor" class="w-4 h-4 mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">d
                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                </path>
            </svg>
            ערוך
        </p>
        {/* <h5 className="text-lg font-normal text-gray-500">{supplier?.data.type}</h5> */}
        {/* {roll ? <h1 className={`${supplier?.data.active ? "text-green-600" : "text-red-600"} text-xl font-mono font-semibold`}>{supplier?.data.active && !hebrew ? "פעיל" : !supplier?.data.active && !hebrew ? "לא פעיל" : supplier?.data.active && hebrew ? "active" : !supplier?.data.active && hebrew ? "not active" : ""}</h1> : <CircularProgress color="success" size={15}/>} */}
      </div>
 
    </Card>
    <div>
      {hebrew ? (
        <>
        <div className="px-4 sm:px-8">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <div className="mt-6 border-t border-gray-100 p-8">
      <dl className="divide-y divide-gray-100 justify-start">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Application for</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
              qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
              pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <LocalPrintshopIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <LocalPrintshopIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
        </>
      ) : (
        <>
      {/* <div className='flex justify-between relative'> */}
        {/* {menu ? (
            <MenuIcon fontSize='large' className='text-gray-500 mx-4 cursor-pointer' onClick={()=> {setMenu(!menu)
            setSettings(!settings)}}/>
        ) : (
            <CloseIcon fontSize='large' className='text-gray-500 mx-4 cursor-pointer' onClick={()=> {setMenu(!menu)
            setSettings(!settings)}}/>
        )} */}
        {/* <div role="menu" aria-labelledby="tk-dropdown-layouts-user" class={`${!settings && 'hidden'} z-50 absolute left-0 top-11 origin-top-right w-48 shadow-xl rounded-lg dark:shadow-gray-900`}>
              <div class="bg-white ring-1 ring-black ring-opacity-5 rounded-lg divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700 dark:ring-gray-700">
                <div class="p-2.5 space-y-1">
                <div role="menuitem" href="javascript:void(0)" class="group cursor-pointer text-sm font-medium flex items-center justify-end space-x-2 px-2.5 py-2 rounded-lg text-gray-700 border border-transparent hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-300 dark:hover:text-blue-100 dark:hover:bg-blue-500 dark:hover:bg-opacity-20 dark:active:border-blue-500 dark:active:border-opacity-25" onClick={()=> navigate("/suppliers/"+ suppid)}>
                    <span class="">חשבוניות ספק</span>
                    <svg class="flex-none hi-mini hi-user-circle inline-block w-5 h-5 opacity-25 group-hover:opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clip-rule="evenodd"/></svg>
                  </div>
                  <div role="menuitem" href="javascript:void(0)" class="group cursor-pointer text-sm font-medium flex items-center justify-end space-x-2 px-2.5 py-2 rounded-lg text-gray-700 border border-transparent hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-300 dark:hover:text-blue-100 dark:hover:bg-blue-500 dark:hover:bg-opacity-20 dark:active:border-blue-500 dark:active:border-opacity-25" onClick={()=> navigate("/supplier-quotes/"+ suppid)}>
                    <span class="">הצעות מחיר</span>
                    <svg class="flex-none hi-mini hi-user-circle inline-block w-5 h-5 opacity-25 group-hover:opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clip-rule="evenodd"/></svg>
                  </div>
                </div>
                <div class="p-2.5 space-y-1">
                  <div role="menuitem" href="javascript:void(0)" class="group cursor-pointer text-sm font-medium flex items-center justify-end space-x-2 px-2.5 py-2 rounded-lg text-gray-700 border border-transparent hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-300 dark:hover:text-blue-100 dark:hover:bg-blue-500 dark:hover:bg-opacity-20 dark:active:border-blue-500 dark:active:border-opacity-25" onClick={()=> navigate("/supplier-emails/"+ suppid)}>
                    <span class="">אימיילים ספק</span>
                    <svg class="flex-none hi-mini hi-user-circle inline-block w-5 h-5 opacity-25 group-hover:opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clip-rule="evenodd"/></svg>
                  </div>
                  <div role="menuitem" href="javascript:void(0)" class="group cursor-pointer text-sm font-medium flex items-center justify-end space-x-2 px-2.5 py-2 rounded-lg text-gray-700 border border-transparent hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-300 dark:hover:text-blue-100 dark:hover:bg-blue-500 dark:hover:bg-opacity-20 dark:active:border-blue-500 dark:active:border-opacity-25" onClick={()=> navigate("/supplier-reports/"+ suppid)}>
                    <span class="">כרטיס ספק</span>
                    <svg class="flex-none hi-mini hi-user-circle inline-block w-5 h-5 opacity-25 group-hover:opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clip-rule="evenodd"/></svg>
                  </div>
                </div>
                <div class="p-2.5 space-y-1">
                  <form onsubmit="return false;">
                    <button type="submit" role="menuitem" class="w-full text-left group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg text-gray-700 border border-transparent hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-300 dark:hover:text-blue-100 dark:hover:bg-blue-500 dark:hover:bg-opacity-20 dark:active:border-blue-500 dark:active:border-opacity-25">
                      <svg class="flex-none hi-mini hi-lock-closed inline-block w-5 h-5 opacity-25 group-hover:opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd"/></svg>
                      <span class="grow">Sign out</span>
                    </button>
                  </form>
                </div>
              </div>
            </div> */}
      <div className="flex flex-col items-end px-4 sm:px-8">
        <h3 className="text-base font-semibold leading-7 text-gray-900">פרטי עובד</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">.ניתן לערוך את הפרטים מעמוד העובדים</p>
      </div>
      {/* </div> */}
      <div className="mt-6 border-t border-gray-100 p-8" dir="rtl">
  <dl className="divide-y divide-gray-100 justify-end">
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">שם עובד</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{worker?.data.fullName}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">כתובת</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{worker?.data.address}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">כתובת אימייל</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{worker?.data.email}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">מספר טלפון</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{worker?.data.phoneNumber}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">ת.ז</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{worker?.data.idNumber}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">תאריך לידה</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{worker?.data.dob}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">שכר שעתי</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{worker?.data.salaryPerHour}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">מספר שעות החודש</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{hours?.data}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">משכורת החודש <span className='text-xs text-blue-600'>(מתעדכן לפי החתמת שעות)</span></dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{Number(isFinite(salary?.data) ? salary?.data.toFixed(2) : 0).toLocaleString()} ₪ </dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">התחלת עבודה</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
      {worker?.data.startedAt}
      </dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">דירוג עובד <span><EditIcon fontSize='small' className='text-blue-500 relative bottom-[2px] right-[2px] cursor-pointer hover:text-blue-400 hover:scale-105 transition-all duration-300 ease-in-out' onClick={()=> setStars(true)}/></span></dt>
      <dd className="px-6 py-3 text-center whitespace-nowrap">
      <ul class="flex relative left-7">
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="mr-1 h-4 w-4 text-yellow-500">
      <path
        fill-rule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clip-rule="evenodd" />
    </svg>
  </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="mr-1 h-4 w-4 text-yellow-500">
      <path
        fill-rule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clip-rule="evenodd" />
    </svg>
  </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="mr-1 h-4 w-4 text-yellow-500">
      <path
        fill-rule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clip-rule="evenodd" />
    </svg>
  </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="mr-1 h-4 w-4 text-yellow-500">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="mr-1 h-4 w-4 text-yellow-500">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </li>
</ul>    
      </dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">פעיל ?</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
      {roll ? <h1 className={`${worker?.data.active ? "text-green-600" : "text-red-600"} text-xl font-mono font-semibold`}>{worker?.data.active && !hebrew ? "פעיל" : !worker?.data.active && !hebrew ? "לא פעיל" : worker?.data.active && hebrew ? "active" : !worker?.data.active && hebrew ? "not active" : ""}</h1> : <CircularProgress color="success" size={15}/>}
      </dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">פרטים</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
        {/* Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
        qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
        pariatur mollit ad adipisicing reprehenderit deserunt qui eu. */}
        {worker?.data.description}
      </dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <LocalPrintshopIcon className="h-5 w-5 flex-shrink-0 ml-1 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      הדפס חשבוניות
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <LocalPrintshopIcon className="h-5 w-5 flex-shrink-0 ml-1 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    הדפס חשבוניות
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
    </dl>
    </div>
        </>
      )}
   
     
    </div>
    {hebrew ? (
      <div className="fixed top-[4.4rem] w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Solutions</span>
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {/* <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"> */}
              <Popover.Panel className="absolute left-40 z-10 mt-3 w-[300px] -translate-x-1/2 transform px-4 sm:px-0 ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4">
                    <a
                      href="##"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Documentation
                        </span>
                      </span>
                      <span className="block text-sm text-gray-500">
                        Start integrating products and tools
                      </span>
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
    ) : (
      <div className="fixed top-[4rem] w-full max-w-sm px-4">
    
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center border-2 border-white rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>תפריט</span>
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  mr-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {/* <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"> */}
              <Popover.Panel className="absolute right-52 z-10 mt-3 w-[275px] translate-x-1/2 transform px-0 ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                    {solutions?.map((item) => (
                      <div
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center cursor-pointer rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={()=> navigate(item?.path + workerid)}>
                        
                        <div className="mr-4 relative left-5">
                          <p className="text-sm font-medium text-gray-900 text-right">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 text-right">
                            {item.description}
                          </p>
                        </div>
                        <div className="h-10 w-10 shrink-0 ml-8 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4">
                    <a
                      href="##"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      {/* <span className="flex items-end"> */}
                        <span className="block text-sm font-medium text-gray-900 text-right">
                          המסמכים
                        </span>
                      {/* </span> */}
                      <span className="block text-sm text-gray-500 text-right">
                        התחל לשלב מוצרים וכלים
                      </span>
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
    )}

    <Dialog open={stars} aria-labelledby="responsive-dialog-title">
    <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 bg-gray-50 text-gray-800">
	<div className="flex flex-col items-center w-full">
		<h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
		<div className="flex flex-col items-center py-6 space-y-3">
			<span className="text-center">How was your experience?</span>
			<div className="flex space-x-3">
				<button type="button" title="Rate 1 stars" aria-label="Rate 1 stars">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-yellow-500">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
					</svg>
				</button>
				<button type="button" title="Rate 2 stars" aria-label="Rate 2 stars">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-yellow-500">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
					</svg>
				</button>
				<button type="button" title="Rate 3 stars" aria-label="Rate 3 stars">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-yellow-500">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
					</svg>
				</button>
				<button type="button" title="Rate 4 stars" aria-label="Rate 4 stars">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-yellow-500">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
					</svg>
				</button>
				<button type="button" title="Rate 5 stars" aria-label="Rate 5 stars">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-gray-400">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
					</svg>
				</button>
			</div>
		</div>
		<div className="flex flex-col w-full">
			<textarea rows="3" placeholder="Message..." className="p-4 rounded-md resize-none text-gray-800 bg-gray-50"></textarea>
			<button type="button" className="py-4 my-8 font-semibold rounded-md text-gray-50 bg-blue-600">Leave feedback</button>
		</div>
	</div>
	<div className="flex flex-col items-center justify-center">
		<a rel="noopener noreferrer" href="#" className="text-sm text-gray-600">Maybe later</a>
        <a rel="noopener noreferrer" href="#" className="text-sm text-gray-600" onClick={()=> setStars(false)}>סגור דירוג</a>
	</div>
</div>
       
    </Dialog>
    </div>
  )
}

export default WorkerCard