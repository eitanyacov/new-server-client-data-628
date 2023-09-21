import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { ThemeContext } from "../App";
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Card from '../components/Card';
import CircularProgress from '@mui/material/CircularProgress';
import { Fragment } from 'react'
import image2 from '../assets/customers.jpg'



import axios from "axios";



const CustomerCard = () => {
    // const [customer, setCustomer] = useState({})
    const { hebrew } = useContext(ThemeContext)
    const [roll, setRoll] = useState(false)

    const navigate = useNavigate()


    const { customerid } = useParams() 

    const customerInfo = () => {

        return axios.get(`https://nartina.com/api/user/customer-by-id/${customerid}`)
      }
      
      const {data: customer} = useQuery('the-customer-info', ()=> customerInfo(),
        {
         
          refetchOnMount: true,
          refetchOnWindowFocus: false
        })

        useEffect(()=> {
            setTimeout(()=> {
              setRoll(true)
            }, 500)
        }, [roll])
        
    // useEffect(()=> {
    //     getCustomerInfo()
    // }, [])

    // const getCustomerInfo = async () => {
    //     const res = await fetch(`https://nartina.com/api/user/customer-by-id/${customerid}`);
    //     const result = await res.json();
    //     setCustomer(result)
    // }

    const solutions = [
        {
          name: 'חשבוניות לקוח',
          path: '/customers/',
          description: 'כל רשימת החשבוניות שהוצאו ללקוח',
          href: '##',
          icon: IconOne,
        },
        {
          name: 'הצעות מחיר',
          path: '/customer-quotes/',
          description: 'כל הצעות המחיר שהוצאו ללקוח',
          href: '##',
          icon: IconTwo,
        },
        {
          name: 'אימיילים',
          path: '/customer-emails/',
          description: 'רשימת תכתובות האימיילים שנשלחו ללקוח מהמערכת',
          href: '##',
          icon: IconThree,
        },
        {
          name: 'כרטסת לקוח',
          path: '/customer-reports/',
          description: 'כרטסת לקוח עם כל הנתונים השנתיים',
          href: '##',
          icon: IconFour,
        },
        {
            name: 'קבלות לקוח',
            path: '/kabalot/',
            description: 'טבלת כל הקבלות שהוצאו ללקוח',
            href: '##',
            icon: IconTwo,
          },
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


    const image = "https://thumbs.dreamstime.com/b/customer-relationship-management-vector-flat-style-concept-banner-icons-phrases-explaining-concept-customer-relationship-118132884.jpg"



  return (
    <div className={`max-w-[1740px] min-h-screen mt-14 ${hebrew ? "mr-0 airx:ml-64" : "mr-0 airx:mr-64"}`}>
      <Card extra={"items-center flex-col w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover bg-center"
        // className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover bg-gradient-to-r from-cyan-500 to-blue-500"
        style={{ backgroundImage: `url(${image2})` }}
      >
        <div className={`dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] bg-green-700 border-white`}>
          <span class={`top-0 right-2 absolute  w-3.5 h-3.5 ${customer?.data.active ? "bg-green-500" : "bg-red-500"} border-2 border-white dark:border-gray-800 rounded-full`}></span>
          <h1 className='font-mono text-white text-4xl font-semibold'>{customer?.data.name.substring(0, 1)}</h1>
        </div>

      </div>
 
      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-[#373D3F] text-3xl font-bold dark:text-white">
        {customer?.data.name}
        </h4>
        <p class="flex items-center text-sm text-gray-400">
            <svg width="10" height="10" fill="currentColor" class="w-4 h-4 mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">d
                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                </path>
            </svg>
            ערוך
        </p>
        {/* <h5 className="text-lg font-normal text-gray-500">{supplier?.data.type}</h5> */}
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

      <div className="flex flex-col items-end px-4 sm:px-8">
        <h3 className="text-base font-semibold leading-7 text-gray-900">פרטי לקוח</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">.ניתן לערוך את הפרטים מעמוד הלקוחות</p>
      </div>

      <div className="mt-6 border-t border-gray-100 p-8" dir="rtl">
  <dl className="divide-y divide-gray-100 justify-end">
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">שם לקוח</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{customer?.data.name}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">כתובת</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{customer?.data.address}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">כתובת אימייל</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{customer?.data.email}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">מספר טלפון</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{customer?.data.phoneNumber}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">טלפון איש קשר</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">{customer?.data.contactNumber}</dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">מס' חברה</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
      {customer?.data.description}
      </dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">תיאור קצר</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
      {customer?.data.shortDescription}
      </dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">פעיל ?</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
      {roll ? <h1 className={`${customer?.data.active ? "text-green-600" : "text-red-600"} text-xl font-mono font-semibold`}>{customer?.data.active && !hebrew ? "פעיל" : !customer?.data.active && !hebrew ? "לא פעיל" : customer?.data.active && hebrew ? "active" : !customer?.data.active && hebrew ? "not active" : ""}</h1> : <CircularProgress color="success" size={15}/>}
      </dd>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900 text-right">פרטים</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
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
      {/* <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>תפריט</span>
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
      </Popover> */}
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
                      onClick={()=> navigate(item?.path + customerid)}>
                        
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
    </div>
  )
}

export default CustomerCard