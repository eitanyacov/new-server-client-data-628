import React, { useState, useEffect, useContext } from 'react'
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from "../App";
import axios from 'axios';
import { useQuery } from 'react-query'



const UnderTopBoxes = () => {

    const [tooltipStatus, setTooltipStatus] = useState(0);
    const [tooltipStatus2, setTooltipStatus2] = useState(0);
    // const [isSSR, setIsSSR] = useState(true);
    const navigate = useNavigate()
    const { globalTheme, hebrew } = useContext(ThemeContext)

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const paymentMethodIncome = "creditCard"
    const income = localStorage.getItem("income")

    const realCurrentMonth = new Date().getMonth() + 1;

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)
    

    // useEffect(()=> {
    //     const res = localStorage.getItem("user")
    //     const result = JSON.parse(res)
    //     setUser(result)
    //   }, [])


    // credit card current month
    const creditCardMonth = () => {

        return axios.get("https://nartina.com/api/user/get-daily-income-report/" + result?.id + "/" + realCurrentMonth + "/" + currentYear + "/" + paymentMethodIncome)
      }
      
      const {data: creditCard} = useQuery('credit-cards', ()=> creditCardMonth(),
        {
          refetchOnMount: income,
          refetchOnWindowFocus: false
        })

    // all money out
    const getDataAmount = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/deferralPayments-total-amount-no-limit/${id}`)
    }
    
    const {data: allTotalMoneyOut} = useQuery('defrreal-payments-total-amount', ()=> getDataAmount(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: true,
        // refetchOnMount: deffrrealPayments,
        refetchOnWindowFocus:false
   
      }) 

      //all money out until end of current month
      const getTotalDeferralPaymentsMonthly = () => {
        // const id = result?.id
        return axios.get("https://nartina.com/api/user/deferralPayments-total-amount-by-month/" + result?.id + "/" + currentMonth + "/" + currentYear)
      }
      
      const {data: totalDeferralPaymentsMonthly, refetch: ref2} = useQuery('totalDeferralPaymentsMonthly', ()=> getTotalDeferralPaymentsMonthly(),
        {
          // enabled: !!supplier?.name,
          // staleTime: 300000
          refetchOnMount: true,
          refetchOnWindowFocus: false
        }) 

         //all money out until end of current year
        const getTotalDeferralPaymentsYearly = () => {
          // const id = result?.id
          return axios.get("https://nartina.com/api/user/deferralPayments-total-amount/" + result?.id + "/" + currentYear)
        }
        
        const {data: totalDeferralPaymentsYearly, refetch: ref1} = useQuery('totalDeferralPaymentsYearly', ()=> getTotalDeferralPaymentsYearly(),
          {
            // enabled: !!supplier?.name,
            // staleTime: 300000
            refetchOnMount: true,
            refetchOnWindowFocus: false
          }) 



          //all money to get in no limit
        const getTotalUpcomingPayments = () => {
          const id = result?.id
          return axios.get(`https://nartina.com/api/user/coming-payments-total-amount-no-limit/${id}`)
        }
        
        const {data: totalUpcomingPayments} = useQuery('totalUpcomingPayments', ()=> getTotalUpcomingPayments(),
          {
            // enabled: !!supplier?.name,
            // staleTime: 300000
            refetchOnMount: true,
            refetchOnWindowFocus: false
          }) 

           //all money to get in until end of current month
        const getUpcomingPaymentsMonthly = () => {
          const id = result?.id
          return axios.get(`https://nartina.com/api/user/upcoming-payments-by-month/${id}`)
        }
        
        const {data: upcomingPaymentsMonth} = useQuery('upcomingPaymentsMonth', ()=> getUpcomingPaymentsMonthly(),
          {
            // enabled: !!supplier?.name,
            // staleTime: 300000
            refetchOnMount: true,
            refetchOnWindowFocus: false
          }) 

             //all money to get in until end of current year
        const getUpcomingPaymentsYear = () => {
          const id = result?.id
          return axios.get(`https://nartina.com/api/user/upcoming-payments-by-year/${id}`)
        }
        
        const {data: upcomingPaymentsYear} = useQuery('upcomingPaymentsYear', ()=> getUpcomingPaymentsYear(),
          {
            // enabled: !!supplier?.name,
            // staleTime: 300000
            refetchOnMount: true,
            refetchOnWindowFocus: false
          }) 


         

      const getMonthInHebrew = () => {
        let month = "";
          switch (new Date().getMonth() + 1) {
            case 1:
              month = "ינואר"
              break;
              case 2:
                month = "פברואר"
                break;
                case 3:
                  month = "מרץ"
                  break;
                  case 4:
                    month = "אפריל"
                    break;
                    case 5:
                      month = "מאי"
                    break;
                    case 6:
                      month = "יוני"
                    break;
                    case 7:
                      month = "יולי"
                    break;
                    case 8:
                      month = "אוגוסט"
                    break;
                    case 9:
                      month = "ספטמבר"
                    break;
                    case 10:
                      month = "אוקטובר"
                    break;
                    case 11:
                      month = "נובמבר"
                    break;
                    case 12:
                      month = "דצמבר"
                    break;
            default:
              month = new Date().getMonth().toLocaleString()
              break;
          }
          return month;
    }
    
    const month = getMonthInHebrew()
    
  return (
    <div className={`w-full max-w-[1880px] ${globalTheme != "light" && 'dark'} mx-auto mb-4 mt-1`}>
      {hebrew ? (
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
    
<div class="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-800">
    <p class="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white">
        Project Reffered
    </p>
    <div class="flex items-end my-6 space-x-2">
        <p class="text-5xl font-bold text-black dark:text-white">
            12
        </p>
        <span class="flex items-center text-xl font-bold text-green-500">
            <svg width="20" fill="currentColor" height="20" class="h-3" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                </path>
            </svg>
            22%
        </span>
    </div>
    <div class="dark:text-white">
        <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <p>
                Unique refferal URL
            </p>
            <div class="flex items-end text-xs">
                34
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    22%
                </span>
            </div>
        </div>
        <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <p>
                Embedded form
            </p>
            <div class="flex items-end text-xs">
                13
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    12%
                </span>
            </div>
        </div>
        <div class="flex items-center justify-between space-x-12 text-sm md:space-x-24">
            <p>
                New visitor
            </p>
            <div class="flex items-end text-xs">
                45
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    41%
                </span>
            </div>
        </div>
    </div>
</div>

<div class="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-800">
    <p class="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white">
        Project Reffered
    </p>
    <div class="flex items-end my-6 space-x-2">
        <p class="text-5xl font-bold text-black dark:text-white">
            12
        </p>
        <span class="flex items-center text-xl font-bold text-green-500">
            <svg width="20" fill="currentColor" height="20" class="h-3" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                </path>
            </svg>
            22%
        </span>
    </div>
    <div class="dark:text-white">
        <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <p>
                Unique refferal URL
            </p>
            <div class="flex items-end text-xs">
                34
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    22%
                </span>
            </div>
        </div>
        <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <p>
                Embedded form
            </p>
            <div class="flex items-end text-xs">
                13
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    12%
                </span>
            </div>
        </div>
        <div class="flex items-center justify-between space-x-12 text-sm md:space-x-24">
            <p>
                New visitor
            </p>
            <div class="flex items-end text-xs">
                45
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    41%
                </span>
            </div>
        </div>
    </div>
</div>

    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
    
    <div class="relative w-full px-4 pt-4 pb-2 bg-white shadow dark:bg-gray-800 rounded-xl">
    <div className='flex justify-between w-full'>
    <button className='bg-blue-700 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-sm rounded px-3 text-white tracking-wide' onClick={()=> navigate("/payments")}>דו"חות</button>
    <div className='flex items-center justify-end'>
    <button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 relative top-[1px] right-[1px]">
        <div onMouseOver={() => setTooltipStatus(1)} onMouseOut={() => setTooltipStatus(0)}>
        <InformationCircleIcon 
        strokeWidth={2} 
        className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
      />
        </div>
      {tooltipStatus == 1 && (
                        <div role="tooltip" className="z-50 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow bg-white p-4 rounded">
                            <p className="text-sm font-bold text-gray-800 pb-1">Keep track of follow ups</p>
                            <p className="text-xs leading-4 text-gray-600 pb-3">Reach out to more prospects at the right moment.</p>
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <span className="text-xs font-bold text-indigo-700">Step 1 of 4</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs text-gray-600 underline mr-2 cursor-pointer">Skip Tour</span>
                                    <button className="focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-5 py-1 text-xs">Next</button>
                                </div>
                            </div>
                        </div>
                    )}
        </button>
    <p class="text-xl font-bold text-gray-700 tracking-wide flex justify-end dark:text-[#ccc]">
        תשלומים נכנסים
    </p>
    </div>
    </div>
    <div className='h-[0.3px] w-32 bg-gray-200 ml-auto relative top-[1px]'/>
    <div class="flex items-end my-6 space-x-2">
        <p class="text-5xl font-bold text-black dark:text-white">
        <span className='text-2xl font-sans'>₪</span>{Number(isFinite(totalUpcomingPayments?.data) ? totalUpcomingPayments?.data : 0).toLocaleString()}
        </p>
        <span class="flex items-center text-xl font-bold text-green-500">
            <svg width="20" fill="currentColor" height="20" class="h-3" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                </path>
            </svg>
            22%
        </span>
    </div>
    <div class="dark:text-white relative bottom-3">
        <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <div class="flex items-end">
            <span className='text-xs font-sans'>₪</span>{Number(isFinite(upcomingPaymentsMonth?.data) ? upcomingPaymentsMonth?.data : 0).toLocaleString()}
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    22%
                </span>
                <span class="rounded-lg relative top-2 left-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" class="rounded" viewBox="0 0 192.756 192.756">
                <g fill-rule="evenodd" clip-rule="evenodd">
                    {/* <path fill="#fff" d="M0 0h192.756v192.756H0V0z" >
                    </path> */}
                    <path d="M189.922 50.809c0-8.986-4.67-13.444-13.729-13.444H16.562c-4.528 0-7.854 1.203-10.048 3.679-2.476 2.477-3.68 5.661-3.68 9.765v91.138c0 4.104 1.204 7.217 3.68 9.764 2.548 2.477 5.803 3.68 10.048 3.68h159.631c9.059 0 13.729-4.527 13.729-13.443V50.809zm-13.729-11.321c7.5 0 11.322 3.821 11.322 11.321v91.138c0 7.57-3.822 11.32-11.322 11.32H16.562c-3.609 0-6.368-1.061-8.42-3.184-2.123-2.053-3.184-4.883-3.184-8.137V50.809c0-7.5 3.75-11.321 11.604-11.321h159.631z" fill="#315881">
                    </path>
                    <path d="M17.835 44.724c-3.042 0-4.953.495-6.014 1.557-.92 1.203-1.344 3.184-1.344 6.085v19.741h171.802V52.366c0-5.165-2.549-7.642-7.643-7.642H17.835z" fill="#315881">
                    </path>
                    <path d="M10.477 140.107c0 5.234 2.476 7.924 7.358 7.924h156.801c5.094 0 7.643-2.689 7.643-7.924v-19.742H10.477v19.742z" fill="#dfa43b">
                    </path>
                    <path d="M67.367 80.528c0 .92-.142 1.627-.495 2.123l-12.383 21.582-.779-26.323H33.898l6.651 3.184c1.91 1.203 2.901 2.759 2.901 4.741l1.839 27.951h9.694l23.21-35.876H66.306c.707.637 1.061 1.627 1.061 2.618zM147.467 78.971l.777-1.062h-12.1c.424.424.566.637.566.778-.143.565-.426.92-.566 1.344l-17.619 32.124c-.424.566-.85 1.062-1.344 1.629h9.977l-.496-1.062c0-.92.496-2.617 1.557-5.023l2.123-3.963h10.26c.426 3.326.709 6.086.85 8.139l-.85 1.91h12.383l-1.84-2.689-3.678-32.125zm-7.36 19.742h-7.359l6.297-12.1 1.062 12.1zM109.539 76.07c-3.82 0-7.076 1.062-9.977 3.184-3.185 1.84-4.741 4.175-4.741 7.077 0 3.326 1.132 6.227 3.396 8.42l6.865 4.74c2.477 1.77 3.68 3.326 3.68 4.742 0 1.344-.639 2.547-1.84 3.467-1.203.92-2.549 1.344-4.246 1.344-2.477 0-6.722-1.768-12.595-5.023v6.58c4.599 2.76 9.058 4.176 13.373 4.176 4.105 0 7.572-1.133 10.545-3.68 3.184-2.336 4.74-5.094 4.74-8.137 0-2.549-1.133-4.883-3.68-7.36l-6.582-4.741c-2.191-1.769-3.395-3.326-3.395-4.528 0-2.759 1.627-4.175 4.953-4.175 2.264 0 5.59 1.274 10.047 3.963l1.346-6.864c-3.752-2.124-7.643-3.185-11.889-3.185zM83.217 113.785c-.142-1.486-.425-2.83-.567-4.246l8.987-29.011 2.123-2.618H80.811c.142.637.283 1.486.425 2.123 0 .637 0 1.416-.142 2.123l-8.986 28.728-1.84 2.902h12.949v-.001z" fill="#315881">
                    </path>
                </g>
            </svg>
        </span>
            </div>
            <h1 className="text-sm uppercase relative top-2 font-medium text-[#333] dark:text-neutral-300">{new Date().toLocaleDateString()} - עד סוף <span className='font-bold text-[#333] dark:text-white'>{month}</span></h1>

        </div>
        <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <div class="flex items-end">
            <span className='text-xs font-sans'>₪</span>{Number(isFinite(upcomingPaymentsYear?.data) ? upcomingPaymentsYear?.data : 0).toLocaleString()}
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    12%
                </span>
            </div>
            <h1 className="text-sm uppercase font-medium text-[#333] dark:text-neutral-300">{new Date().toLocaleDateString()} - עד סוף <span className='font-bold text-[#333] dark:text-white'>{new Date().getFullYear()}</span></h1>

        </div>
        <div class="flex items-center justify-between space-x-12 text-sm md:space-x-24">
            <div class="flex items-end text-lg">
            <span className='text-sm font-sans relative bottom-0.5'>₪</span>{Number(isFinite(creditCard?.data) ? creditCard?.data : 0).toLocaleString()}
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    41%
                </span>
            </div>
            <p>
                כרטיסי אשראי החודש 
            </p>
        </div>
    </div>
</div>


<div class="relative w-full px-4 py-4 bg-white shadow dark:bg-gray-800 rounded-xl">
<div className='flex justify-between w-full'>
      <button className='bg-blue-700 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-sm rounded px-3 text-white tracking-wide' onClick={()=> navigate("/reports")}>דו"חות</button>
    <div className='flex items-center justify-end'>
    <button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 relative top-[1px] right-[1px]">
        <div onMouseOver={() => setTooltipStatus2(1)} onMouseOut={() => setTooltipStatus2(0)}>
        <InformationCircleIcon 
        strokeWidth={2} 
        className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
      />
        </div>
      {tooltipStatus2 == 1 && (
                        <div role="tooltip" className="z-50 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow bg-white p-4 rounded">
                            <p className="text-sm font-bold text-gray-800 pb-1">Keep track of follow ups</p>
                            <p className="text-xs leading-4 text-gray-600 pb-3">Reach out to more prospects at the right moment.</p>
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <span className="text-xs font-bold text-indigo-700">Step 1 of 4</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs text-gray-600 underline mr-2 cursor-pointer">Skip Tour</span>
                                    <button className="focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-5 py-1 text-xs">Next</button>
                                </div>
                            </div>
                        </div>
                    )}
        </button>
    <p class="text-xl font-bold text-gray-700 tracking-wide flex justify-end dark:text-[#ccc]">
        תשלומים יוצאים
    </p>
    </div>
    </div>
    <div className='h-[0.3px] w-32 bg-gray-200 ml-auto relative top-[1px]'/>
    <div class="flex items-end my-6 space-x-2">
        <p class="text-5xl font-bold text-black dark:text-white">
        <span className='text-2xl font-sans'>₪</span>{Number(isFinite(allTotalMoneyOut?.data) ? allTotalMoneyOut?.data : 0).toLocaleString()}
        </p>
        <span class="flex items-center text-xl font-bold text-green-500">
            <svg width="20" fill="currentColor" height="20" class="h-3" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                </path>
            </svg>
            68%
        </span>
    </div>
    <div class="dark:text-white">
        <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <div class="flex items-end">
            <span className='text-xs font-sans'>₪</span>{Number(isFinite(totalDeferralPaymentsMonthly?.data) ? totalDeferralPaymentsMonthly?.data : 0).toLocaleString()}
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    22%
                </span>
            </div>
            <h1 className="text-sm uppercase font-medium text-[#333] dark:text-neutral-300">{new Date().toLocaleDateString()} - עד סוף <span className='font-bold text-[#333] dark:text-white'>{month}</span></h1>

        </div>
        <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <div class="flex items-end">
            <span className='text-xs font-sans'>₪</span>{Number(isFinite(totalDeferralPaymentsYearly?.data) ? totalDeferralPaymentsYearly?.data : 0).toLocaleString()}
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    12%
                </span>
            </div>
            <h1 className="text-sm uppercase font-medium text-[#333] dark:text-neutral-300">{new Date().toLocaleDateString()} - עד סוף <span className='font-bold text-[#333] dark:text-white'>{new Date().getFullYear()}</span></h1>

        </div>
        <div class="flex items-center justify-between space-x-12 text-sm md:space-x-24">
            <div class="flex items-end text-xs">
                45
                <span class="flex items-center">
                    <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                        </path>
                    </svg>
                    41%
                </span>
            </div>
            <p>
                New visitor
            </p>
        </div>
    </div>
</div>

    </div>
  )}
    
    </div>
  )
}

export default UnderTopBoxes