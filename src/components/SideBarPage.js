import React, { useState, useEffect, useContext, useRef } from "react";
import Switch from '@mui/material/Switch';
// import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ContactsIcon from '@mui/icons-material/Contacts';
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import FileCopyIcon from '@mui/icons-material/FileCopy';
// import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AssignmentIcon from '@mui/icons-material/Assignment';
// import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCardIcon from '@mui/icons-material/AddCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import CreditScoreIcon from '@mui/icons-material/CreditScore';
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom'
import { ThemeContext } from "../App";
// import { CircularProgressbar } from "react-circular-progressbar";
import { useQuery } from 'react-query'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';



const SideBarPage = () => {
  const [arrow, setArrow] = useState(true)
  const [arrow1, setArrow1] = useState(true)
  // const [arrow2, setArrow2] = useState(false)
  // const [user, setUser] = useState({})
  const [spin, setSpin] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [scroll, setScroll] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [toggle1, setToggle1] = useState(false)
  // const [sun, setSun] = useState(false)
  const [mode, setMode] = useState("moon")

  
  // const [numsOfSchedulers, setNumsOfSchedulers] = useState()  // all the schedulars, even those in the past(not always we delete the past schedulers)
  const { reload, setReload, hebrew, setHebrew, toogleMenu, setToogleMenu, color, menu, setMenu, dashMode, setDashMode, globalTheme } = useContext(ThemeContext) 
  const location = useLocation()
  const navigate = useNavigate()

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)
  const sub = JSON.parse(localStorage.getItem('sub'));
  const ref = useRef()

  // let icon1 = "small"
  // let icon2 = "large"
  
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setArrow1(true)
            setToggle1(false)
            // setArrow(true)
            // setToggle(false)
            
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [ref]);

  useEffect(() => {
    resizeWindow();
    console.log(window.innerHeight)
    console.log(window.innerWidth)
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);  
  }, [windowHeight, window.innerHeight]);

  // useEffect(()=> {
  //   const res = localStorage.getItem("user")
  //   const result = JSON.parse(res)
  //   setUser(result)
    
  // }, [])


useEffect(()=> {
  if(reload) {
    // getSchedulars() 
    setReload(false)
  }
}, [reload])


useEffect(()=> {
  if(reload) {
    // getSchedulars() 
    setReload(false)
  }
}, [reload])



const getShedulers = () => {
  const id = result?.id
  return axios.get( "https://nartina.com/api/user/schedulers-list/" + id)
}

const {data: data2, refetch: x1} = useQuery('schedulers-mini', getShedulers,
  {
    enabled: false,
   
  })

  const getPayments = () => {
    const id = result?.id
    return axios.get("https://nartina.com/api/user/incomePayments-list/" + id)
  }
  
  const {data: data3, refetch: x2} = useQuery('coming-payments-mini', getPayments,
    {
      enabled: false,
     
    })

    const getPaymentsDeffreal = () => {
      const id = result?.id
      return axios.get("https://nartina.com/api/user/deferralPayments-list/" + id)
    }
    
    const {data: data, refetch: x4} = useQuery('deffreal-payments-mini', getPaymentsDeffreal,
      {
        enabled: false,
       
      })

    const getTasks = () => {
      const id = result?.id
      return axios.get("https://nartina.com/api/user/user-task-statuses/" + id)
    }
    
    const {data: data4, refetch: x3} = useQuery('tasks-mini', getTasks,
      {
        enabled: false,
       
      })

useEffect(()=> {
  if(reload) {
    // getSchedulars() 
    kkk()
    setReload(false)
  }
}, [reload])

  const getColor = () => {
    switch(color) {
      case "blue":
        return "bg-blue-500 pr-1"
        break;
      case "purple":
        return "bg-indigo-500 pr-1"
        break;
        case "green":
        return "bg-green-600 pr-1"
        break;
        case "red":
        return "bg-violet-500 pr-1"
        break;
        case "light":
        return "bg-[#3F6AD8] pr-1"
        break;
        case "orange":
        return "bg-yellow-500 pr-1"
        break;
      default:
        return "bg-indigo-500 pr-1"
    }
    
  }

  const getColor2 = () => {
    if(location.pathname == '/scheduler'){
      return "bg-blue-400"
    }else {
      switch(color) {
        case "blue":
          return "bg-blue-500"
          break;
        case "purple":
          return "bg-indigo-500"
          break;
          case "green":
          return "bg-green-600"
          break;
          case "red":
          return "bg-violet-500"
          break;
          case "light":
          return "bg-[#3F6AD8]"
          break;
          case "orange":
          return "bg-yellow-500"
          break;
        default:
          return "bg-indigo-500"
    }
    }
    
  }

  const getNumsOfSchedulers = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/schedulers-by-user-from-today-and-above/${id}`)
  }
  
  const {data: numsOfSchedulers, refetch: kkk} = useQuery('numsOfSchedulers', ()=> getNumsOfSchedulers(),
    {
     
      // refetchOnMount: xxx,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    })

    const changeName = (name) => {
      if (name == "Backlog") {
        return "התחלה";
      } else if (name == "In Progress") {
        return "בתהליך";
      } else if (name == "Review") {
        return "בדיקה";
      } else {
        return "הסתיים";
      }
    };
  
  
  const handleChange2 = () => {
    setHebrew(!hebrew)
    console.log("hebrew : " + hebrew)

  }

  const handleChange3 = () => {
    setMenu(!menu)
    
  }

  const refetchAll = () =>{
    x1()
    x2()
    x3()
    x4()
  }

  const fixMenu = () => {
    setSpin(true)
    refetchAll()
    setMenu(!menu)
    setTimeout(()=> {
      setSpin(false)
    }, 450)
  }

  

  return (
    <div className={`flex ${hebrew ? "justify-start" : "justify-end"} ${globalTheme != "light" && "dark"}`}>
      {menu && location.pathname == "/" ? (
        <>
        <div className="bg-slate-700 hidden duration-500 airx:inline md:w-[50px] px-2 fixed min-h-screen">
          <div className="flex flex-col items-center justify-between pt-2 pb-1 px-2 h-screen">
          <ExitToAppIcon className={`${spin && 'animate-spin'} cursor-pointer text-gray-400 hover:text-gray-500`} onClick={fixMenu}/>
            <div onClick={()=> navigate('/suppliers')} className="flex justify-center items-center w-9 h-9 cursor-pointer hover:scale-110 ease-out transition-all duration-125 rounded-full bg-slate-600">
            <PeopleAltIcon className="text-[#0369a1]"/>
            </div>
            <div onClick={()=> navigate('/customers')} className="flex justify-center items-center w-9 h-9 cursor-pointer hover:scale-110 ease-out transition-all duration-125 rounded-full bg-slate-600">
            <ContactsIcon  className="text-[#0369a1]"/>
            </div>
            <div onClick={()=> navigate('/daily-income')} className="flex justify-center items-center w-9 h-9 cursor-pointer hover:scale-110 ease-out transition-all duration-125 rounded-full bg-slate-600">
            <MonetizationOnIcon className="text-[#0369a1]"/>
            </div>
            <div onClick={()=> navigate('/invoices')} className="flex justify-center items-center w-9 h-9 cursor-pointer hover:scale-110 ease-out transition-all duration-125 rounded-full bg-slate-600">
            <DescriptionIcon className="text-[#0369a1]"/>
            </div>
            <div onClick={()=> navigate('/workers')} className="flex justify-center items-center w-9 h-9 cursor-pointer hover:scale-110 ease-out transition-all duration-125 rounded-full bg-slate-600">
            <PeopleOutlineIcon className="text-[#0369a1]"/>
            </div>
            <div onClick={()=> navigate('/pdf')} className="flex justify-center items-center w-9 h-9 cursor-pointer hover:scale-110 ease-out transition-all duration-125 rounded-full bg-slate-600">
            <AppRegistrationIcon className="text-[#0369a1]"/>
            </div>
            <div onClick={()=> navigate('/scheduler')} className="flex justify-center items-center w-9 h-9 cursor-pointer hover:scale-110 ease-out transition-all duration-125 rounded-full bg-slate-600">
            <CalendarMonthIcon className="text-[#0369a1]"/>
            </div>
            <div onClick={()=> navigate('/tasks')} className="flex justify-center items-center w-9 h-9 cursor-pointer hover:scale-110 ease-out transition-all duration-125 rounded-full bg-slate-600">
            <AssignmentIcon className="text-[#0369a1]"/>
            </div>
            <div onClick={()=> navigate('/reports')} className="flex justify-center items-center w-9 h-9 cursor-pointer hover:scale-110 ease-out transition-all duration-125 rounded-full bg-slate-600">
            <AddCardIcon className="text-[#0369a1]"/>
            </div>
            <div onClick={()=> navigate('/yearly-reports')} className="flex justify-center items-center w-9 h-9 cursor-pointer hover:scale-110 ease-out transition-all duration-125 rounded-full bg-slate-600">
            <FileCopyIcon className="text-[#0369a1]"/>
            </div>
            <a href="/login">
            <div onClick={()=> {localStorage.removeItem("user")}} className="flex justify-center items-center w-9 h-9 cursor-pointer hover:scale-110 ease-out transition-all duration-125 rounded-full bg-slate-600">
            <LogoutIcon className="text-[#0369a1]"/>
            </div>
            </a>
            <Switch
          checked={dashMode}
          onChange={()=> setDashMode(!dashMode)}
          size='small'
          inputProps={{ 'aria-label': 'controlled' }}/>
            <div className="flex flex-col justify-center items-center relative -top-9 2xl:-top-10 5xl:-top-11 space-y-2 2xl:space-y-3 5xl:space-y-5 p-2">
          
          </div>
          </div>
        </div>
        <div className={`blue-glassmorphism dark:bg-slate-600 shadow-lg rounded-2xl hidden airx:inline md:w-[195px] ${hebrew ? "ml-[55px]" : "mr-[55px]"} ${scroll ? 'scrollbar' : 'scrollbar-none'} overflow-x-hidden overflow-y-auto px-3 h-[99%] fixed`} onMouseOver={()=> setScroll(true)} onMouseOut={()=> setScroll(false)}>
          <div className="flex flex-col justify-center items-center space-y-2 relative py-4 pl-0 pr-[2px] min-h-fit" >
         
            <div className="flex flex-col justify-center items-center -space-y-1 w-full h-8 mb-8 rounded-md cursor-pointer hover:bg-sky-500 bg-sky-600">
              <h1 className={`text-white font-semibold font-mono ${hebrew ? "text-xs" : "text-sm"}`}>{hebrew ? "appointments" : "פגישות"}</h1>
            </div>

            <ol class={`${hebrew ? 'border-l-2' : 'border-r-2'} border-blue-500 dark:border-primary-500 relative left-[2px] `} dir="rtl">
              {data2?.data.map((report, index)=> (
            <li key={index} className="-mt-5">
            <div class="flex-start flex items-center">
<span class={`absolute flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full ${hebrew ? '-left-[11.5px]' : '-right-[11.5px]'} dark:ring-gray-900 dark:bg-blue-600`}>
<svg aria-hidden="true" class="w-3 h-3 text-blue-300 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
</span>
<h4 class="-mt-2 text-xl mr-3 font-semibold text-[#373D3F] dark:text-gray-100 relative top-1">{report?.title.substring(0, 11)}</h4>
</div>
<div class="mb-6 mr-5 pb-6">
<a
href="#!"
class="text-sm text-blue-600 transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 dark:focus:text-blue-500 dark:active:text-blue-600"
>{report?.startDate.substring(0, 10)}
</a>

<p class="mb-4 mt-2 text-sm text-neutral-800 dark:text-neutral-300">
{report?.notes && report?.notes.substring(0, 40)}
</p>
<button
type="button"
class="inline-block rounded bg-blue-500 px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
data-te-ripple-init
data-te-ripple-color="light" onClick={()=> navigate("/scheduler")}>
{hebrew ? 'Meeting' : 'פגישות'}
</button>
</div>
          </li>
            
            ))}
            </ol>
             <div className="flex flex-col justify-center items-center -space-y-1 w-full h-8 rounded-md cursor-pointer hover:bg-sky-500 bg-sky-600">
              <h1 className="text-white font-semibold font-mono text-xs">{hebrew ? "Tasks" : "משימות"}</h1>
             </div>
             {data4?.data.slice(0)
          .reverse().map(section => (
              <div key={section?.id} className='space-y-1'>
                <ol class={`${hebrew ? 'border-l-2' : 'border-r-2'} border-blue-500 dark:border-primary-500 mt-10 relative left-[2px]`} dir="rtl">
                 {hebrew ? (
                  <h1 className="relative bottom-8 text-lg text-center font-bold text-sky-700 dark:text-blue-500 uppercase">{section.name}</h1>
                 ) : (
                  <h1 className="relative bottom-8 right-3 text-2xl text-right font-bold text-sky-700 dark:text-blue-500">{changeName(section.name)}</h1>
                 )}
                {section?.tasks?.map((task, index) => {
                    return (
                    <li key={index} className="-mt-5">
                      <div class="flex-start flex items-center">
      <span class={`absolute flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full ${hebrew ? '-left-[11.5px]' : '-right-[11.5px]'} dark:ring-gray-900 dark:bg-blue-600`}>
        <svg aria-hidden="true" class="w-3 h-3 text-blue-300 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
      </span>
      <h4 class={`-mt-2 text-xl mr-3 font-semibold text-[#373D3F] dark:text-gray-100 ${hebrew && 'text-left left-1'} relative top-1`}>{task?.description.substring(0, 12)}</h4>
    </div>
    <div class="mb-6 mr-5 pb-6">
      <div className="flex items-center justify-between w-full mt-1">
      {hebrew ? (
        <>
      {task.urgent ? (
        <div className="bg-red-500 h-3 w-3 rounded-full animate-pulse relative left-3 bottom-[0.5px]"/>
      ) : (
        <div className="h-3 w-3"></div>
      )}
       <a
        href="#!"
        class="text-xs text-blue-600 relative left-2 transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 dark:focus:text-blue-500 dark:active:text-blue-600"
        >{task?.date}
      </a>
        </>
      ) : (
        <>
        <a
        href="#!"
        class="text-xs text-blue-600 transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 dark:focus:text-blue-500 dark:active:text-blue-600"
        >{task?.date}
      </a>
      {task.urgent ? (
        <div className={`bg-red-500 h-3 w-3 rounded-full animate-pulse ${hebrew && 'relative left-2 bottom-[0.5px]'}`}/>
      ) : (
        <div className="h-3 w-3"></div>
      )}
        </>
      )}
      </div>
      
      <p class={`mb-4 mt-2 text-sm text-neutral-800 dark:text-neutral-300 ${hebrew && 'text-left relative left-3'}`}>
      {task?.description.substring(0, 40)}
      </p>
      <button
        type="button"
        class="inline-block rounded bg-blue-500 px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init
        data-te-ripple-color="light" onClick={()=> navigate("/tasks")}>
        {hebrew ? 'Read more' : 'משימות'}
      </button>
    </div>
                    </li>
                    )
                  
                   })}
                   </ol>
              </div>
            ))}
           

            <div className="flex flex-col justify-center items-center -space-y-1 w-full h-8 rounded-md cursor-pointer hover:bg-sky-500 bg-sky-600">
              <h1 className="text-white font-semibold font-mono text-xs">{hebrew ? "deferred" : "תשלומים"}</h1>
              <h1 className="text-white font-semibold font-mono text-xs">{hebrew ? "payments" : "דחויים"}</h1> 
            </div>
            {data?.data.map((report, index)=> (
               <div onClick={()=> navigate("/reports")} key={index} className="flex flex-col -space-y-1 justify-center items-center border-[2px] border-gray-300 hover:border-sky-300 w-full h-12 rounded-md cursor-pointer hover:scale-110 ease-out transition-all duration-125 bg-blue-100">
               <h1 className="text-sky-700 font-semibold font-mono text-sm">{report?.endDate.substring(0, 10)}</h1>
               <h1 className="text-sky-700 font-semibold font-mono">{Number(report?.title).toLocaleString()}</h1>
             </div>
            ))}

            <div className="flex flex-col justify-center items-center -space-y-1 w-full h-8 rounded-md cursor-pointer hover:bg-sky-500 bg-sky-600">
              <h1 className="text-white font-semibold font-mono text-xs">{hebrew ? "incoming" : "תשלומים"}</h1>
              <h1 className="text-white font-semibold font-mono text-xs">{hebrew ? "payments" : "נכנסים"}</h1>
            </div>
            {data3?.data.map((report, index)=> (
               <div onClick={()=> navigate("/payments")} key={index} className="flex flex-col -space-y-1 justify-center items-center border-[2px] border-gray-300 hover:border-sky-300 w-full h-12 rounded-md cursor-pointer hover:scale-110 ease-out transition-all duration-125 bg-blue-100">
               <h1 className="text-sky-700 font-semibold font-mono text-sm">{report?.endDate.substring(0, 10)}</h1>
               <h1 className="text-sky-700 font-semibold font-mono">{Number(report?.title).toLocaleString()}</h1>
             </div>
            ))}

          
          </div>
        </div>
        </>
      ) : (
        <>
        <div className={`z-50 ${!toogleMenu && 'hidden'} ${location.pathname == '/dashboard' || location.pathname == '/workers-page' || location.pathname == '/workers-rosters' || result?.role == "ROLE_WORKER" ? 'hidden' : 'airx:inline'} px-2 fixed min-h-screen overflow-y-hidden`}>
        {/* <div className="bg-white shadow-md hidden airx:inline md:w-[180px] px-2 fixed min-h-screen overflow-y-scroll scrollbar"> */}
          <div className="flex flex-col justify pt-2 justify-around pb-14 h-screen overflow-y-hidden">
              {hebrew ? (
        <>
<div>

  <div class="block navbar-menu relative ">
    <div class="navbar-backdrop fixed lg:hidden inset-0 bg-gray-800 opacity-10"></div>
    {/* <nav class="fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-60 sm:max-w-xs pt-6 pb-8 bg-gray-800 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"> */}
    <nav class={`fixed ${toogleMenu ? 'top-14 airx:top-0' : 'top-0'} left-0 bottom-0 flex flex-col w-64 mmu:w-60 airx:w-64 sm:max-w-xs pt-6 pb-8 bg-gray-800 overflow-y-scroll scrollbar-thin`}>
      <div class="flex w-full items-center h-14 px-6 pb-6 mb-6 border-b border-gray-700">
         
 <div className="flex items-center p-2 space-x-2 justify-self-end cursor-pointer">
		<img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-10 h-10 rounded-lg dark:bg-gray-500" />
		<div>
			<h2 className="text-sm font-semibold text-gray-400">{result?.companyName}</h2>
			<span className="flex items-center space-x-1">
				<a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">{result?.email.substring(0, 30)}</a>
			</span>
		</div>
	</div>
      </div>
      <div class="px-4 pb-6">
      <div className="flex items-center justify-between px-1">
      <h3 class="mb-2 text-xs uppercase text-gray-500 font-medium">Main</h3>
          {location.pathname == "/" && (
            <div className='hidden airx:inline'>
               <ExitToAppIcon className={`${spin && 'animate-spin'} hidden airx:inline relative bottom-[3.5px] cursor-pointer text-gray-600 hover:text-gray-500`} onClick={fixMenu}/>
            </div>
          )}
        </div>
        <ul class="mb-8 text-sm font-medium">
          <li>
            <a class="flex items-center pl-3 py-3 pr-4 text-gray-50 bg-indigo-500 rounded" href="#">
              <span class="inline-block mr-3">
                <svg class="text-indigo-100 w-5 h-5" viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.9831 6.64169C18.9047 6.545 18.8056 6.46712 18.6931 6.41376C18.5806 6.36041 18.4576 6.33293 18.3331 6.33335H16.6665V5.50002C16.6665 4.83698 16.4031 4.20109 15.9342 3.73225C15.4654 3.26341 14.8295 3.00002 14.1665 3.00002H8.93313L8.66646 2.16669C8.49359 1.67771 8.17292 1.2546 7.74888 0.955986C7.32484 0.657367 6.81843 0.498019 6.2998 0.500019H3.33313C2.67009 0.500019 2.0342 0.763411 1.56536 1.23225C1.09652 1.70109 0.83313 2.33698 0.83313 3.00002V13C0.83313 13.6631 1.09652 14.2989 1.56536 14.7678C2.0342 15.2366 2.67009 15.5 3.33313 15.5H15.3331C15.9008 15.4984 16.451 15.3036 16.8933 14.9476C17.3355 14.5917 17.6435 14.0959 17.7665 13.5417L19.1665 7.35002C19.1918 7.22578 19.1885 7.0974 19.1567 6.97466C19.1249 6.85191 19.0656 6.73803 18.9831 6.64169ZM4.4748 13.1834C4.43246 13.3713 4.32629 13.5388 4.17435 13.6574C4.02241 13.7759 3.8341 13.8381 3.64146 13.8334H3.33313C3.11212 13.8334 2.90015 13.7456 2.74387 13.5893C2.58759 13.433 2.4998 13.221 2.4998 13V3.00002C2.4998 2.779 2.58759 2.56704 2.74387 2.41076C2.90015 2.25448 3.11212 2.16669 3.33313 2.16669H6.2998C6.48152 2.1572 6.66135 2.20746 6.81183 2.30978C6.9623 2.4121 7.07515 2.56087 7.13313 2.73335L7.58313 4.10002C7.6366 4.25897 7.7368 4.39809 7.8706 4.49919C8.00441 4.60029 8.16561 4.65867 8.33313 4.66669H14.1665C14.3875 4.66669 14.5994 4.75448 14.7557 4.91076C14.912 5.06704 14.9998 5.27901 14.9998 5.50002V6.33335H6.66646C6.47383 6.32864 6.28551 6.39084 6.13358 6.50935C5.98164 6.62786 5.87546 6.79537 5.83313 6.98335L4.4748 13.1834ZM16.1415 13.1834C16.0991 13.3713 15.993 13.5388 15.841 13.6574C15.6891 13.7759 15.5008 13.8381 15.3081 13.8334H6.00813C6.05117 13.7405 6.08198 13.6425 6.0998 13.5417L7.33313 8.00002H17.3331L16.1415 13.1834Z" fill="currentColor"></path>
                </svg>
              </span>
              <span>Dashboard</span>
              <span class="inline-block ml-auto">
                <svg class="text-gray-400 w-3 h-3" viewbox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z" fill="currentColor"></path>
                </svg>
              </span>
            </a>
          </li>
          <li>
            <a class="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded" href="#">
              <span class="inline-block mr-3">
                <svg class="text-gray-600 w-5 h-5" viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.0002 0.666626C4.41687 0.666626 0.66687 4.41663 0.66687 8.99996C0.66687 13.5833 4.41687 17.3333 9.0002 17.3333C13.5835 17.3333 17.3335 13.5833 17.3335 8.99996C17.3335 4.41663 13.5835 0.666626 9.0002 0.666626ZM2.58354 10.6666C2.41687 10.0833 2.33354 9.58329 2.33354 8.99996C2.33354 8.41663 2.41687 7.91663 2.58354 7.33329H4.16687C4.0002 8.41663 4.0002 9.58329 4.16687 10.6666H2.58354ZM3.2502 12.3333H4.41687C4.58354 13.0833 4.83354 13.8333 5.2502 14.5C4.41687 13.9166 3.7502 13.1666 3.2502 12.3333ZM4.41687 5.66663H3.2502C3.7502 4.83329 4.41687 4.08329 5.2502 3.49996C4.83354 4.16663 4.58354 4.91663 4.41687 5.66663ZM8.16687 15.4166C7.16687 14.6666 6.41687 13.5833 6.16687 12.3333H8.16687V15.4166ZM8.16687 10.6666H5.7502C5.66687 10.0833 5.66687 9.58329 5.66687 8.99996C5.66687 8.41663 5.66687 7.91663 5.7502 7.33329H8.16687V10.6666ZM8.16687 5.66663H6.16687C6.41687 4.41663 7.16687 3.33329 8.16687 2.58329V5.66663ZM14.7502 5.66663H13.5835C13.4169 4.91663 13.1669 4.16663 12.7502 3.49996C13.5835 4.08329 14.2502 4.83329 14.7502 5.66663ZM9.83354 2.58329C10.8335 3.33329 11.5835 4.41663 11.8335 5.66663H9.83354V2.58329ZM9.83354 15.4166V12.3333H11.8335C11.5835 13.5833 10.8335 14.6666 9.83354 15.4166ZM12.2502 10.6666H9.83354V7.33329H12.2502C12.3335 8.41663 12.3335 9.58329 12.2502 10.6666ZM12.8335 14.5C13.1669 13.8333 13.4169 13.0833 13.6669 12.3333H14.8335C14.2502 13.1666 13.5835 13.9166 12.8335 14.5ZM13.9169 10.6666C14.0835 9.58329 14.0835 8.41663 13.9169 7.33329H15.5002C15.8335 8.41663 15.8335 9.58329 15.5002 10.6666H13.9169Z" fill="currentColor"></path>
                </svg>
              </span>
              <span>Discover</span>
              <span class="flex justify-center items-center ml-auto bg-indigo-500 w-6 h-6 text-xs rounded-full">4</span>
            </a>
          </li>
          <li>
            <a class="flex items-center pl-3 py-3 pr-4 text-gray-50 hover:bg-gray-900 rounded" href="#">
              <span class="inline-block mr-3">
                <svg class="text-gray-600 w-5 h-5" viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.3414 9.23329C11.8689 8.66683 12.166 7.92394 12.1747 7.14996C12.1747 6.31453 11.8428 5.51331 11.2521 4.92257C10.6614 4.33183 9.86015 3.99996 9.02472 3.99996C8.18928 3.99996 7.38807 4.33183 6.79733 4.92257C6.20659 5.51331 5.87472 6.31453 5.87472 7.14996C5.88341 7.92394 6.18057 8.66683 6.70805 9.23329C5.97359 9.59902 5.34157 10.1416 4.86881 10.8122C4.39606 11.4827 4.0974 12.2603 3.99972 13.075C3.9754 13.296 4.03989 13.5176 4.17897 13.6911C4.31806 13.8645 4.52037 13.9756 4.74138 14C4.9624 14.0243 5.18401 13.9598 5.35749 13.8207C5.53096 13.6816 5.64207 13.4793 5.66638 13.2583C5.76583 12.4509 6.15709 11.7078 6.76645 11.1688C7.37582 10.6299 8.16123 10.3324 8.97472 10.3324C9.7882 10.3324 10.5736 10.6299 11.183 11.1688C11.7923 11.7078 12.1836 12.4509 12.283 13.2583C12.3062 13.472 12.4111 13.6684 12.5757 13.8066C12.7403 13.9448 12.9519 14.0141 13.1664 14H13.258C13.4765 13.9748 13.6762 13.8644 13.8135 13.6927C13.9509 13.521 14.0148 13.3019 13.9914 13.0833C13.9009 12.2729 13.6117 11.4975 13.1494 10.8258C12.6871 10.1542 12.066 9.60713 11.3414 9.23329ZM8.99972 8.63329C8.70634 8.63329 8.41955 8.5463 8.17562 8.38331C7.93169 8.22031 7.74156 7.98865 7.62929 7.71761C7.51702 7.44656 7.48765 7.14831 7.54488 6.86058C7.60212 6.57284 7.74339 6.30853 7.95084 6.10108C8.15829 5.89364 8.42259 5.75236 8.71033 5.69513C8.99807 5.63789 9.29632 5.66727 9.56736 5.77954C9.83841 5.89181 10.0701 6.08193 10.2331 6.32586C10.3961 6.5698 10.483 6.85658 10.483 7.14996C10.483 7.54336 10.3268 7.92066 10.0486 8.19883C9.77041 8.47701 9.39312 8.63329 8.99972 8.63329ZM14.833 0.666626H3.16638C2.50334 0.666626 1.86746 0.930018 1.39862 1.39886C0.929774 1.8677 0.666382 2.50358 0.666382 3.16663V14.8333C0.666382 15.4963 0.929774 16.1322 1.39862 16.6011C1.86746 17.0699 2.50334 17.3333 3.16638 17.3333H14.833C15.4961 17.3333 16.132 17.0699 16.6008 16.6011C17.0697 16.1322 17.333 15.4963 17.333 14.8333V3.16663C17.333 2.50358 17.0697 1.8677 16.6008 1.39886C16.132 0.930018 15.4961 0.666626 14.833 0.666626ZM15.6664 14.8333C15.6664 15.0543 15.5786 15.2663 15.4223 15.4225C15.266 15.5788 15.0541 15.6666 14.833 15.6666H3.16638C2.94537 15.6666 2.73341 15.5788 2.57713 15.4225C2.42085 15.2663 2.33305 15.0543 2.33305 14.8333V3.16663C2.33305 2.94561 2.42085 2.73365 2.57713 2.57737C2.73341 2.42109 2.94537 2.33329 3.16638 2.33329H14.833C15.0541 2.33329 15.266 2.42109 15.4223 2.57737C15.5786 2.73365 15.6664 2.94561 15.6664 3.16663V14.8333Z" fill="currentColor"></path>
                </svg>
              </span>
              <span>Users</span>
              <span class="inline-block ml-auto">
                <svg class="text-gray-400 w-3 h-3" viewbox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z" fill="currentColor"></path>
                </svg>
              </span>
            </a>
          </li>
          <li>
            <a class="flex items-center pl-3 py-3 pr-4 text-gray-50 hover:bg-gray-900 rounded" href="#">
              <span class="inline-block mr-3">
                <svg class="text-gray-600 w-5 h-5" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.9831 6.64169C18.9047 6.545 18.8056 6.46712 18.6931 6.41376C18.5806 6.36041 18.4576 6.33293 18.3331 6.33335H16.6665V5.50002C16.6665 4.83698 16.4031 4.20109 15.9342 3.73225C15.4654 3.26341 14.8295 3.00002 14.1665 3.00002H8.93313L8.66646 2.16669C8.49359 1.67771 8.17292 1.2546 7.74888 0.955986C7.32484 0.657367 6.81843 0.498019 6.2998 0.500019H3.33313C2.67009 0.500019 2.0342 0.763411 1.56536 1.23225C1.09652 1.70109 0.83313 2.33698 0.83313 3.00002V13C0.83313 13.6631 1.09652 14.2989 1.56536 14.7678C2.0342 15.2366 2.67009 15.5 3.33313 15.5H15.3331C15.9008 15.4984 16.451 15.3036 16.8933 14.9476C17.3355 14.5917 17.6435 14.0959 17.7665 13.5417L19.1665 7.35002C19.1918 7.22578 19.1885 7.0974 19.1567 6.97466C19.1249 6.85191 19.0656 6.73803 18.9831 6.64169ZM4.4748 13.1834C4.43246 13.3713 4.32629 13.5388 4.17435 13.6574C4.02241 13.7759 3.8341 13.8381 3.64146 13.8334H3.33313C3.11212 13.8334 2.90015 13.7456 2.74387 13.5893C2.58759 13.433 2.4998 13.221 2.4998 13V3.00002C2.4998 2.779 2.58759 2.56704 2.74387 2.41076C2.90015 2.25448 3.11212 2.16669 3.33313 2.16669H6.2998C6.48152 2.1572 6.66135 2.20746 6.81183 2.30978C6.9623 2.4121 7.07515 2.56087 7.13313 2.73335L7.58313 4.10002C7.6366 4.25897 7.7368 4.39809 7.8706 4.49919C8.00441 4.60029 8.16561 4.65867 8.33313 4.66669H14.1665C14.3875 4.66669 14.5994 4.75448 14.7557 4.91076C14.912 5.06704 14.9998 5.27901 14.9998 5.50002V6.33335H6.66646C6.47383 6.32864 6.28551 6.39084 6.13358 6.50935C5.98164 6.62786 5.87546 6.79537 5.83313 6.98335L4.4748 13.1834ZM16.1415 13.1834C16.0991 13.3713 15.993 13.5388 15.841 13.6574C15.6891 13.7759 15.5008 13.8381 15.3081 13.8334H6.00813C6.05117 13.7405 6.08198 13.6425 6.0998 13.5417L7.33313 8.00002H17.3331L16.1415 13.1834Z" fill="currentColor"></path>
                </svg>
              </span>
              <span>Documents</span>
              <span class="inline-block ml-auto">
                <svg class="text-gray-400 w-3 h-3" viewbox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z" fill="currentColor"></path>
                </svg>
              </span>
            </a>
          </li>
          <li>
            <a class="flex items-center pl-3 py-3 pr-4 text-gray-50 hover:bg-gray-900 rounded" href="#">
              <span class="inline-block mr-3">
                <svg class="text-gray-600 w-5 h-5" viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.33329 9.83329H1.49996C1.27895 9.83329 1.06698 9.92109 0.910704 10.0774C0.754423 10.2337 0.666626 10.4456 0.666626 10.6666V16.5C0.666626 16.721 0.754423 16.9329 0.910704 17.0892C1.06698 17.2455 1.27895 17.3333 1.49996 17.3333H7.33329C7.55431 17.3333 7.76627 17.2455 7.92255 17.0892C8.07883 16.9329 8.16663 16.721 8.16663 16.5V10.6666C8.16663 10.4456 8.07883 10.2337 7.92255 10.0774C7.76627 9.92109 7.55431 9.83329 7.33329 9.83329ZM6.49996 15.6666H2.33329V11.5H6.49996V15.6666ZM16.5 0.666626H10.6666C10.4456 0.666626 10.2337 0.754423 10.0774 0.910704C9.92109 1.06698 9.83329 1.27895 9.83329 1.49996V7.33329C9.83329 7.55431 9.92109 7.76627 10.0774 7.92255C10.2337 8.07883 10.4456 8.16663 10.6666 8.16663H16.5C16.721 8.16663 16.9329 8.07883 17.0892 7.92255C17.2455 7.76627 17.3333 7.55431 17.3333 7.33329V1.49996C17.3333 1.27895 17.2455 1.06698 17.0892 0.910704C16.9329 0.754423 16.721 0.666626 16.5 0.666626ZM15.6666 6.49996H11.5V2.33329H15.6666V6.49996ZM16.5 9.83329H10.6666C10.4456 9.83329 10.2337 9.92109 10.0774 10.0774C9.92109 10.2337 9.83329 10.4456 9.83329 10.6666V16.5C9.83329 16.721 9.92109 16.9329 10.0774 17.0892C10.2337 17.2455 10.4456 17.3333 10.6666 17.3333H16.5C16.721 17.3333 16.9329 17.2455 17.0892 17.0892C17.2455 16.9329 17.3333 16.721 17.3333 16.5V10.6666C17.3333 10.4456 17.2455 10.2337 17.0892 10.0774C16.9329 9.92109 16.721 9.83329 16.5 9.83329ZM15.6666 15.6666H11.5V11.5H15.6666V15.6666ZM7.33329 0.666626H1.49996C1.27895 0.666626 1.06698 0.754423 0.910704 0.910704C0.754423 1.06698 0.666626 1.27895 0.666626 1.49996V7.33329C0.666626 7.55431 0.754423 7.76627 0.910704 7.92255C1.06698 8.07883 1.27895 8.16663 1.49996 8.16663H7.33329C7.55431 8.16663 7.76627 8.07883 7.92255 7.92255C8.07883 7.76627 8.16663 7.55431 8.16663 7.33329V1.49996C8.16663 1.27895 8.07883 1.06698 7.92255 0.910704C7.76627 0.754423 7.55431 0.666626 7.33329 0.666626ZM6.49996 6.49996H2.33329V2.33329H6.49996V6.49996Z" fill="currentColor"></path>
                </svg>
              </span>
              <span>Applications</span>
              <span class="inline-block ml-auto">
                <svg class="text-gray-400 w-3 h-3" viewbox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z" fill="currentColor"></path>
                </svg>
              </span>
            </a>
          </li>
          <li>
            <a class="flex items-center pl-3 py-3 pr-4 text-gray-50 hover:bg-gray-900 rounded" href="#">
              <span class="inline-block mr-3">
                <svg class="text-gray-600 w-5 h-5" viewbox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.6665 6.44996C13.6578 6.3734 13.641 6.29799 13.6165 6.22496V6.14996C13.5764 6.06428 13.5229 5.98551 13.4581 5.91663L8.45813 0.916626C8.38924 0.851806 8.31048 0.79836 8.2248 0.758293H8.1498C8.06514 0.709744 7.97165 0.678579 7.8748 0.666626H2.83313C2.17009 0.666626 1.5342 0.930018 1.06536 1.39886C0.596522 1.8677 0.33313 2.50358 0.33313 3.16663V14.8333C0.33313 15.4963 0.596522 16.1322 1.06536 16.6011C1.5342 17.0699 2.17009 17.3333 2.83313 17.3333H11.1665C11.8295 17.3333 12.4654 17.0699 12.9342 16.6011C13.4031 16.1322 13.6665 15.4963 13.6665 14.8333V6.49996C13.6665 6.49996 13.6665 6.49996 13.6665 6.44996ZM8.66646 3.50829L10.8248 5.66663H9.49979C9.27878 5.66663 9.06682 5.57883 8.91054 5.42255C8.75426 5.26627 8.66646 5.05431 8.66646 4.83329V3.50829ZM11.9998 14.8333C11.9998 15.0543 11.912 15.2663 11.7557 15.4225C11.5994 15.5788 11.3875 15.6666 11.1665 15.6666H2.83313C2.61212 15.6666 2.40015 15.5788 2.24387 15.4225C2.08759 15.2663 1.9998 15.0543 1.9998 14.8333V3.16663C1.9998 2.94561 2.08759 2.73365 2.24387 2.57737C2.40015 2.42109 2.61212 2.33329 2.83313 2.33329H6.9998V4.83329C6.9998 5.49633 7.26319 6.13222 7.73203 6.60106C8.20087 7.0699 8.83675 7.33329 9.49979 7.33329H11.9998V14.8333Z" fill="currentColor"></path>
                </svg>
              </span>
              <span>Pages</span>
              <span class="inline-block ml-auto">
                <svg class="text-gray-400 w-3 h-3" viewbox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z" fill="currentColor"></path>
                </svg>
              </span>
            </a>
          </li>
        </ul>
        <h3 class="mb-2 text-xs uppercase text-gray-500 font-medium">Secondary</h3>
        <ul class="text-sm font-medium">
          <li>
            <a class="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded" href="#">
              <span class="inline-block mr-3">
                <svg class="text-gray-600 w-5 h-5" viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.9831 6.64169C18.9047 6.545 18.8056 6.46712 18.6931 6.41376C18.5806 6.36041 18.4576 6.33293 18.3331 6.33335H16.6665V5.50002C16.6665 4.83698 16.4031 4.20109 15.9342 3.73225C15.4654 3.26341 14.8295 3.00002 14.1665 3.00002H8.93313L8.66646 2.16669C8.49359 1.67771 8.17292 1.2546 7.74888 0.955986C7.32484 0.657367 6.81843 0.498019 6.2998 0.500019H3.33313C2.67009 0.500019 2.0342 0.763411 1.56536 1.23225C1.09652 1.70109 0.83313 2.33698 0.83313 3.00002V13C0.83313 13.6631 1.09652 14.2989 1.56536 14.7678C2.0342 15.2366 2.67009 15.5 3.33313 15.5H15.3331C15.9008 15.4984 16.451 15.3036 16.8933 14.9476C17.3355 14.5917 17.6435 14.0959 17.7665 13.5417L19.1665 7.35002C19.1918 7.22578 19.1885 7.0974 19.1567 6.97466C19.1249 6.85191 19.0656 6.73803 18.9831 6.64169ZM4.4748 13.1834C4.43246 13.3713 4.32629 13.5388 4.17435 13.6574C4.02241 13.7759 3.8341 13.8381 3.64146 13.8334H3.33313C3.11212 13.8334 2.90015 13.7456 2.74387 13.5893C2.58759 13.433 2.4998 13.221 2.4998 13V3.00002C2.4998 2.779 2.58759 2.56704 2.74387 2.41076C2.90015 2.25448 3.11212 2.16669 3.33313 2.16669H6.2998C6.48152 2.1572 6.66135 2.20746 6.81183 2.30978C6.9623 2.4121 7.07515 2.56087 7.13313 2.73335L7.58313 4.10002C7.6366 4.25897 7.7368 4.39809 7.8706 4.49919C8.00441 4.60029 8.16561 4.65867 8.33313 4.66669H14.1665C14.3875 4.66669 14.5994 4.75448 14.7557 4.91076C14.912 5.06704 14.9998 5.27901 14.9998 5.50002V6.33335H6.66646C6.47383 6.32864 6.28551 6.39084 6.13358 6.50935C5.98164 6.62786 5.87546 6.79537 5.83313 6.98335L4.4748 13.1834ZM16.1415 13.1834C16.0991 13.3713 15.993 13.5388 15.841 13.6574C15.6891 13.7759 15.5008 13.8381 15.3081 13.8334H6.00813C6.05117 13.7405 6.08198 13.6425 6.0998 13.5417L7.33313 8.00002H17.3331L16.1415 13.1834Z" fill="currentColor"></path>
                </svg>
              </span>
              <span>Support Center</span>
            </a>
          </li>
          <li>
            <a class="flex items-center pl-3 py-3 pr-4 text-gray-50 hover:bg-gray-900 rounded" href="#">
              <span class="inline-block mr-3">
                <svg class="text-gray-600 w-5 h-5" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8802 1.66663H4.2135C3.55068 1.66735 2.91522 1.93097 2.44653 2.39966C1.97785 2.86834 1.71422 3.50381 1.7135 4.16663V15.8333C1.71422 16.4961 1.97785 17.1316 2.44653 17.6003C2.91522 18.0689 3.55068 18.3326 4.2135 18.3333H15.8802C16.543 18.3326 17.1785 18.0689 17.6471 17.6003C18.1158 17.1316 18.3794 16.4961 18.3802 15.8333V4.16663C18.3794 3.50381 18.1158 2.86834 17.6471 2.39966C17.1785 1.93097 16.543 1.66735 15.8802 1.66663ZM4.2135 3.33329H15.8802C16.1011 3.33351 16.3129 3.42138 16.4692 3.57761C16.6254 3.73385 16.7133 3.94568 16.7135 4.16663V10.8333H14.6595C14.385 10.8331 14.1148 10.9007 13.8729 11.0302C13.6309 11.1597 13.4248 11.347 13.2728 11.5755L12.1009 13.3333H7.9928L6.82093 11.5755C6.6689 11.347 6.46273 11.1597 6.22079 11.0302C5.97884 10.9007 5.70863 10.8331 5.43421 10.8333H3.38017V4.16663C3.38039 3.94568 3.46826 3.73385 3.62449 3.57761C3.78072 3.42138 3.99255 3.33351 4.2135 3.33329ZM15.8802 16.6666H4.2135C3.99255 16.6664 3.78072 16.5785 3.62449 16.4223C3.46826 16.2661 3.38039 16.0542 3.38017 15.8333V12.5H5.43421L6.60608 14.2578C6.75811 14.4862 6.96428 14.6736 7.20622 14.803C7.44817 14.9325 7.71838 15.0002 7.9928 15H12.1009C12.3753 15.0002 12.6455 14.9325 12.8875 14.803C13.1294 14.6736 13.3356 14.4862 13.4876 14.2578L14.6595 12.5H16.7135V15.8333C16.7133 16.0542 16.6254 16.2661 16.4692 16.4223C16.3129 16.5785 16.1011 16.6664 15.8802 16.6666Z" fill="currentColor"></path>
                </svg>
              </span>
              <span>Inbox</span>
            </a>
          </li>
          <li>
            <a class="flex items-center pl-3 py-3 pr-4 text-gray-50 hover:bg-gray-900 rounded" href="#">
              <span class="inline-block mr-3">
                <svg class="text-gray-600 w-5 h-5" viewbox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.9831 6.64169C18.9047 6.545 18.8056 6.46712 18.6931 6.41376C18.5806 6.36041 18.4576 6.33293 18.3331 6.33335H16.6665V5.50002C16.6665 4.83698 16.4031 4.20109 15.9342 3.73225C15.4654 3.26341 14.8295 3.00002 14.1665 3.00002H8.93313L8.66646 2.16669C8.49359 1.67771 8.17292 1.2546 7.74888 0.955986C7.32484 0.657367 6.81843 0.498019 6.2998 0.500019H3.33313C2.67009 0.500019 2.0342 0.763411 1.56536 1.23225C1.09652 1.70109 0.83313 2.33698 0.83313 3.00002V13C0.83313 13.6631 1.09652 14.2989 1.56536 14.7678C2.0342 15.2366 2.67009 15.5 3.33313 15.5H15.3331C15.9008 15.4984 16.451 15.3036 16.8933 14.9476C17.3355 14.5917 17.6435 14.0959 17.7665 13.5417L19.1665 7.35002C19.1918 7.22578 19.1885 7.0974 19.1567 6.97466C19.1249 6.85191 19.0656 6.73803 18.9831 6.64169ZM4.4748 13.1834C4.43246 13.3713 4.32629 13.5388 4.17435 13.6574C4.02241 13.7759 3.8341 13.8381 3.64146 13.8334H3.33313C3.11212 13.8334 2.90015 13.7456 2.74387 13.5893C2.58759 13.433 2.4998 13.221 2.4998 13V3.00002C2.4998 2.779 2.58759 2.56704 2.74387 2.41076C2.90015 2.25448 3.11212 2.16669 3.33313 2.16669H6.2998C6.48152 2.1572 6.66135 2.20746 6.81183 2.30978C6.9623 2.4121 7.07515 2.56087 7.13313 2.73335L7.58313 4.10002C7.6366 4.25897 7.7368 4.39809 7.8706 4.49919C8.00441 4.60029 8.16561 4.65867 8.33313 4.66669H14.1665C14.3875 4.66669 14.5994 4.75448 14.7557 4.91076C14.912 5.06704 14.9998 5.27901 14.9998 5.50002V6.33335H6.66646C6.47383 6.32864 6.28551 6.39084 6.13358 6.50935C5.98164 6.62786 5.87546 6.79537 5.83313 6.98335L4.4748 13.1834ZM16.1415 13.1834C16.0991 13.3713 15.993 13.5388 15.841 13.6574C15.6891 13.7759 15.5008 13.8381 15.3081 13.8334H6.00813C6.05117 13.7405 6.08198 13.6425 6.0998 13.5417L7.33313 8.00002H17.3331L16.1415 13.1834Z" fill="currentColor"></path>
                </svg>
              </span>
              <span>File Manager</span>
            </a>
          </li>
          <li>
            <a class="flex items-center pl-3 py-3 pr-4 text-gray-50 hover:bg-gray-900 rounded" href="#">
              <span class="inline-block mr-3">
                <svg class="text-gray-600 w-5 h-5" viewbox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.9831 6.64169C18.9047 6.545 18.8056 6.46712 18.6931 6.41376C18.5806 6.36041 18.4576 6.33293 18.3331 6.33335H16.6665V5.50002C16.6665 4.83698 16.4031 4.20109 15.9342 3.73225C15.4654 3.26341 14.8295 3.00002 14.1665 3.00002H8.93313L8.66646 2.16669C8.49359 1.67771 8.17292 1.2546 7.74888 0.955986C7.32484 0.657367 6.81843 0.498019 6.2998 0.500019H3.33313C2.67009 0.500019 2.0342 0.763411 1.56536 1.23225C1.09652 1.70109 0.83313 2.33698 0.83313 3.00002V13C0.83313 13.6631 1.09652 14.2989 1.56536 14.7678C2.0342 15.2366 2.67009 15.5 3.33313 15.5H15.3331C15.9008 15.4984 16.451 15.3036 16.8933 14.9476C17.3355 14.5917 17.6435 14.0959 17.7665 13.5417L19.1665 7.35002C19.1918 7.22578 19.1885 7.0974 19.1567 6.97466C19.1249 6.85191 19.0656 6.73803 18.9831 6.64169ZM4.4748 13.1834C4.43246 13.3713 4.32629 13.5388 4.17435 13.6574C4.02241 13.7759 3.8341 13.8381 3.64146 13.8334H3.33313C3.11212 13.8334 2.90015 13.7456 2.74387 13.5893C2.58759 13.433 2.4998 13.221 2.4998 13V3.00002C2.4998 2.779 2.58759 2.56704 2.74387 2.41076C2.90015 2.25448 3.11212 2.16669 3.33313 2.16669H6.2998C6.48152 2.1572 6.66135 2.20746 6.81183 2.30978C6.9623 2.4121 7.07515 2.56087 7.13313 2.73335L7.58313 4.10002C7.6366 4.25897 7.7368 4.39809 7.8706 4.49919C8.00441 4.60029 8.16561 4.65867 8.33313 4.66669H14.1665C14.3875 4.66669 14.5994 4.75448 14.7557 4.91076C14.912 5.06704 14.9998 5.27901 14.9998 5.50002V6.33335H6.66646C6.47383 6.32864 6.28551 6.39084 6.13358 6.50935C5.98164 6.62786 5.87546 6.79537 5.83313 6.98335L4.4748 13.1834ZM16.1415 13.1834C16.0991 13.3713 15.993 13.5388 15.841 13.6574C15.6891 13.7759 15.5008 13.8381 15.3081 13.8334H6.00813C6.05117 13.7405 6.08198 13.6425 6.0998 13.5417L7.33313 8.00002H17.3331L16.1415 13.1834Z" fill="currentColor"></path>
                </svg>
              </span>
              <span>Data List</span>
            </a>
          </li>
        </ul>
        <div class="pt-8">
          <a class="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded" href="#">
            <span class="inline-block mr-4">
              <svg class="text-gray-600 w-5 h-5" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9831 6.64169C18.9047 6.545 18.8056 6.46712 18.6931 6.41376C18.5806 6.36041 18.4576 6.33293 18.3331 6.33335H16.6665V5.50002C16.6665 4.83698 16.4031 4.20109 15.9342 3.73225C15.4654 3.26341 14.8295 3.00002 14.1665 3.00002H8.93313L8.66646 2.16669C8.49359 1.67771 8.17292 1.2546 7.74888 0.955986C7.32484 0.657367 6.81843 0.498019 6.2998 0.500019H3.33313C2.67009 0.500019 2.0342 0.763411 1.56536 1.23225C1.09652 1.70109 0.83313 2.33698 0.83313 3.00002V13C0.83313 13.6631 1.09652 14.2989 1.56536 14.7678C2.0342 15.2366 2.67009 15.5 3.33313 15.5H15.3331C15.9008 15.4984 16.451 15.3036 16.8933 14.9476C17.3355 14.5917 17.6435 14.0959 17.7665 13.5417L19.1665 7.35002C19.1918 7.22578 19.1885 7.0974 19.1567 6.97466C19.1249 6.85191 19.0656 6.73803 18.9831 6.64169ZM4.4748 13.1834C4.43246 13.3713 4.32629 13.5388 4.17435 13.6574C4.02241 13.7759 3.8341 13.8381 3.64146 13.8334H3.33313C3.11212 13.8334 2.90015 13.7456 2.74387 13.5893C2.58759 13.433 2.4998 13.221 2.4998 13V3.00002C2.4998 2.779 2.58759 2.56704 2.74387 2.41076C2.90015 2.25448 3.11212 2.16669 3.33313 2.16669H6.2998C6.48152 2.1572 6.66135 2.20746 6.81183 2.30978C6.9623 2.4121 7.07515 2.56087 7.13313 2.73335L7.58313 4.10002C7.6366 4.25897 7.7368 4.39809 7.8706 4.49919C8.00441 4.60029 8.16561 4.65867 8.33313 4.66669H14.1665C14.3875 4.66669 14.5994 4.75448 14.7557 4.91076C14.912 5.06704 14.9998 5.27901 14.9998 5.50002V6.33335H6.66646C6.47383 6.32864 6.28551 6.39084 6.13358 6.50935C5.98164 6.62786 5.87546 6.79537 5.83313 6.98335L4.4748 13.1834ZM16.1415 13.1834C16.0991 13.3713 15.993 13.5388 15.841 13.6574C15.6891 13.7759 15.5008 13.8381 15.3081 13.8334H6.00813C6.05117 13.7405 6.08198 13.6425 6.0998 13.5417L7.33313 8.00002H17.3331L16.1415 13.1834Z" fill="currentColor"></path>
              </svg>
            </span>
            <span>Settings</span>
          </a>
          <a class="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded" href="#">
            <span class="inline-block mr-4">
              <svg class="text-gray-600 w-5 h-5" viewbox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9831 6.64169C18.9047 6.545 18.8056 6.46712 18.6931 6.41376C18.5806 6.36041 18.4576 6.33293 18.3331 6.33335H16.6665V5.50002C16.6665 4.83698 16.4031 4.20109 15.9342 3.73225C15.4654 3.26341 14.8295 3.00002 14.1665 3.00002H8.93313L8.66646 2.16669C8.49359 1.67771 8.17292 1.2546 7.74888 0.955986C7.32484 0.657367 6.81843 0.498019 6.2998 0.500019H3.33313C2.67009 0.500019 2.0342 0.763411 1.56536 1.23225C1.09652 1.70109 0.83313 2.33698 0.83313 3.00002V13C0.83313 13.6631 1.09652 14.2989 1.56536 14.7678C2.0342 15.2366 2.67009 15.5 3.33313 15.5H15.3331C15.9008 15.4984 16.451 15.3036 16.8933 14.9476C17.3355 14.5917 17.6435 14.0959 17.7665 13.5417L19.1665 7.35002C19.1918 7.22578 19.1885 7.0974 19.1567 6.97466C19.1249 6.85191 19.0656 6.73803 18.9831 6.64169ZM4.4748 13.1834C4.43246 13.3713 4.32629 13.5388 4.17435 13.6574C4.02241 13.7759 3.8341 13.8381 3.64146 13.8334H3.33313C3.11212 13.8334 2.90015 13.7456 2.74387 13.5893C2.58759 13.433 2.4998 13.221 2.4998 13V3.00002C2.4998 2.779 2.58759 2.56704 2.74387 2.41076C2.90015 2.25448 3.11212 2.16669 3.33313 2.16669H6.2998C6.48152 2.1572 6.66135 2.20746 6.81183 2.30978C6.9623 2.4121 7.07515 2.56087 7.13313 2.73335L7.58313 4.10002C7.6366 4.25897 7.7368 4.39809 7.8706 4.49919C8.00441 4.60029 8.16561 4.65867 8.33313 4.66669H14.1665C14.3875 4.66669 14.5994 4.75448 14.7557 4.91076C14.912 5.06704 14.9998 5.27901 14.9998 5.50002V6.33335H6.66646C6.47383 6.32864 6.28551 6.39084 6.13358 6.50935C5.98164 6.62786 5.87546 6.79537 5.83313 6.98335L4.4748 13.1834ZM16.1415 13.1834C16.0991 13.3713 15.993 13.5388 15.841 13.6574C15.6891 13.7759 15.5008 13.8381 15.3081 13.8334H6.00813C6.05117 13.7405 6.08198 13.6425 6.0998 13.5417L7.33313 8.00002H17.3331L16.1415 13.1834Z" fill="currentColor"></path>
              </svg>
            </span>
            <span>Log Out</span>
          </a>
        </div>
      </div>
      
      <div className="flex items-center p-2 mt-4 space-x-4 justify-self-end cursor-pointer">
		<img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500" />
		<div>
			<h2 className="text-sm font-semibold text-gray-400">Leroy Jenkins</h2>
			<span className="flex items-center space-x-1">
				<a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">View profile</a>
			</span>
		</div>
	</div>
    </nav>
    
  </div>
  
  {/* <div class="mx-auto lg:ml-80"></div> */}
</div>

    </>
    ) : (
  <>    
<div>
 
  <div class={`block navbar-menu relative `}>
    <div class=" fixed lg:hidden inset-0 bg-gray-800 opacity-10"></div>
    {/* <nav class="fixed top-0 right-0 bottom-0 flex flex-col w-3/4 airx:w-56 xlu:w-64 2xl:w-72 3xl:w-80 sm:max-w-xs pt-6 pb-8 bg-gray-800 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"> */}
    <nav class={`fixed ${toogleMenu ? 'top-14 airx:top-0' : 'top-0'} right-0 bottom-0 flex flex-col w-64 mmu:w-60 airx:w-64 sm:max-w-xs pt-6 pb-8 px-2 ${(mode != "moon" && globalTheme == "light") ? 'bg-white shadow' : 'bg-gray-800'} overflow-y-auto scrollbar-thin`}>
      <div class="flex w-full items-center justify-end h-14 px-6 pb-6 mb-6 border-b border-gray-500 dark:border-gray-700">
         
  <div className="flex items-center p-2 space-x-2 justify-start cursor-pointer">
		<div className="flex flex-col items-end justify-center flex-1">
			<h2 className={`text-sm font-semibold text-right ${mode != "moon" && globalTheme == "light" ? 'text-gray-600' : 'text-gray-400'}`}>{result?.companyName}</h2>
				<h1 className={`text-xs hover:underline text-right ${mode != "moon" && globalTheme == "light" ? 'text-gray-600' : 'text-gray-400'}`}>{result?.email.substring(0, 30)}</h1>
		</div>
    <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-10 h-10 rounded-lg dark:bg-gray-500" />
	</div>
      </div>
      <div class="px-4 pb-6 relative bottom-[5px]">
        {location.pathname == "/" ? (
          <div className="flex items-center justify-between px-1">
            <div className="hidden airx:inline">
              <ExitToAppIcon className={`${spin && 'animate-spin'} relative bottom-[3.5px] cursor-pointer text-gray-600 hover:text-gray-500`} onClick={fixMenu}/>
            </div>
            <div className="inline airx:hidden" />
          <h3 class={`mb-2 text-[1rem] text-gray-500 font-extralight text-right mr-1`}>ראשי</h3>
        </div>
        ) : (
          <h3 class={`mb-2 text-[1rem] text-gray-500 font-extralight text-right mr-1`}>ראשי</h3>
        )}
        <ul class="mb-8 text-sm font-medium">
        <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/' && getColor()}`} onClick={()=> {navigate('/')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>דף הבית</h1>
               <svg class={`w-5 h-5 ${location.pathname == '/' ? "text-indigo-100" : "text-gray-600"}`} viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.33329 9.83329H1.49996C1.27895 9.83329 1.06698 9.92109 0.910704 10.0774C0.754423 10.2337 0.666626 10.4456 0.666626 10.6666V16.5C0.666626 16.721 0.754423 16.9329 0.910704 17.0892C1.06698 17.2455 1.27895 17.3333 1.49996 17.3333H7.33329C7.55431 17.3333 7.76627 17.2455 7.92255 17.0892C8.07883 16.9329 8.16663 16.721 8.16663 16.5V10.6666C8.16663 10.4456 8.07883 10.2337 7.92255 10.0774C7.76627 9.92109 7.55431 9.83329 7.33329 9.83329ZM6.49996 15.6666H2.33329V11.5H6.49996V15.6666ZM16.5 0.666626H10.6666C10.4456 0.666626 10.2337 0.754423 10.0774 0.910704C9.92109 1.06698 9.83329 1.27895 9.83329 1.49996V7.33329C9.83329 7.55431 9.92109 7.76627 10.0774 7.92255C10.2337 8.07883 10.4456 8.16663 10.6666 8.16663H16.5C16.721 8.16663 16.9329 8.07883 17.0892 7.92255C17.2455 7.76627 17.3333 7.55431 17.3333 7.33329V1.49996C17.3333 1.27895 17.2455 1.06698 17.0892 0.910704C16.9329 0.754423 16.721 0.666626 16.5 0.666626ZM15.6666 6.49996H11.5V2.33329H15.6666V6.49996ZM16.5 9.83329H10.6666C10.4456 9.83329 10.2337 9.92109 10.0774 10.0774C9.92109 10.2337 9.83329 10.4456 9.83329 10.6666V16.5C9.83329 16.721 9.92109 16.9329 10.0774 17.0892C10.2337 17.2455 10.4456 17.3333 10.6666 17.3333H16.5C16.721 17.3333 16.9329 17.2455 17.0892 17.0892C17.2455 16.9329 17.3333 16.721 17.3333 16.5V10.6666C17.3333 10.4456 17.2455 10.2337 17.0892 10.0774C16.9329 9.92109 16.721 9.83329 16.5 9.83329ZM15.6666 15.6666H11.5V11.5H15.6666V15.6666ZM7.33329 0.666626H1.49996C1.27895 0.666626 1.06698 0.754423 0.910704 0.910704C0.754423 1.06698 0.666626 1.27895 0.666626 1.49996V7.33329C0.666626 7.55431 0.754423 7.76627 0.910704 7.92255C1.06698 8.07883 1.27895 8.16663 1.49996 8.16663H7.33329C7.55431 8.16663 7.76627 8.07883 7.92255 7.92255C8.07883 7.76627 8.16663 7.55431 8.16663 7.33329V1.49996C8.16663 1.27895 8.07883 1.06698 7.92255 0.910704C7.76627 0.754423 7.55431 0.666626 7.33329 0.666626ZM6.49996 6.49996H2.33329V2.33329H6.49996V6.49996Z" fill="currentColor"></path>
                </svg>
              </div>    
         </div>
         </li>
        
          
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/suppliers') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/suppliers' && getColor()}`} onClick={()=> {navigate('/suppliers')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/suppliers') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>ספקים</h1>
              <svg class={`w-5 h-5 ${location.pathname == '/suppliers' ? "text-indigo-100" : "text-gray-600"}`} viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3414 9.23329C11.8689 8.66683 12.166 7.92394 12.1747 7.14996C12.1747 6.31453 11.8428 5.51331 11.2521 4.92257C10.6614 4.33183 9.86015 3.99996 9.02472 3.99996C8.18928 3.99996 7.38807 4.33183 6.79733 4.92257C6.20659 5.51331 5.87472 6.31453 5.87472 7.14996C5.88341 7.92394 6.18057 8.66683 6.70805 9.23329C5.97359 9.59902 5.34157 10.1416 4.86881 10.8122C4.39606 11.4827 4.0974 12.2603 3.99972 13.075C3.9754 13.296 4.03989 13.5176 4.17897 13.6911C4.31806 13.8645 4.52037 13.9756 4.74138 14C4.9624 14.0243 5.18401 13.9598 5.35749 13.8207C5.53096 13.6816 5.64207 13.4793 5.66638 13.2583C5.76583 12.4509 6.15709 11.7078 6.76645 11.1688C7.37582 10.6299 8.16123 10.3324 8.97472 10.3324C9.7882 10.3324 10.5736 10.6299 11.183 11.1688C11.7923 11.7078 12.1836 12.4509 12.283 13.2583C12.3062 13.472 12.4111 13.6684 12.5757 13.8066C12.7403 13.9448 12.9519 14.0141 13.1664 14H13.258C13.4765 13.9748 13.6762 13.8644 13.8135 13.6927C13.9509 13.521 14.0148 13.3019 13.9914 13.0833C13.9009 12.2729 13.6117 11.4975 13.1494 10.8258C12.6871 10.1542 12.066 9.60713 11.3414 9.23329ZM8.99972 8.63329C8.70634 8.63329 8.41955 8.5463 8.17562 8.38331C7.93169 8.22031 7.74156 7.98865 7.62929 7.71761C7.51702 7.44656 7.48765 7.14831 7.54488 6.86058C7.60212 6.57284 7.74339 6.30853 7.95084 6.10108C8.15829 5.89364 8.42259 5.75236 8.71033 5.69513C8.99807 5.63789 9.29632 5.66727 9.56736 5.77954C9.83841 5.89181 10.0701 6.08193 10.2331 6.32586C10.3961 6.5698 10.483 6.85658 10.483 7.14996C10.483 7.54336 10.3268 7.92066 10.0486 8.19883C9.77041 8.47701 9.39312 8.63329 8.99972 8.63329ZM14.833 0.666626H3.16638C2.50334 0.666626 1.86746 0.930018 1.39862 1.39886C0.929774 1.8677 0.666382 2.50358 0.666382 3.16663V14.8333C0.666382 15.4963 0.929774 16.1322 1.39862 16.6011C1.86746 17.0699 2.50334 17.3333 3.16638 17.3333H14.833C15.4961 17.3333 16.132 17.0699 16.6008 16.6011C17.0697 16.1322 17.333 15.4963 17.333 14.8333V3.16663C17.333 2.50358 17.0697 1.8677 16.6008 1.39886C16.132 0.930018 15.4961 0.666626 14.833 0.666626ZM15.6664 14.8333C15.6664 15.0543 15.5786 15.2663 15.4223 15.4225C15.266 15.5788 15.0541 15.6666 14.833 15.6666H3.16638C2.94537 15.6666 2.73341 15.5788 2.57713 15.4225C2.42085 15.2663 2.33305 15.0543 2.33305 14.8333V3.16663C2.33305 2.94561 2.42085 2.73365 2.57713 2.57737C2.73341 2.42109 2.94537 2.33329 3.16638 2.33329H14.833C15.0541 2.33329 15.266 2.42109 15.4223 2.57737C15.5786 2.73365 15.6664 2.94561 15.6664 3.16663V14.8333Z" fill="currentColor"></path>
              </svg>     
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/daily-income') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/daily-income' && getColor()}`} onClick={()=> {navigate('/daily-income')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/daily-income') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>דו"ח יומי</h1>
              
                <ReceiptLongOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/daily-income' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/invoices') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/invoices' && getColor()}`} onClick={()=> {navigate('/invoices')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/invoices') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>חשבוניות ספקים</h1>
              
              <DescriptionOutlinedIcon fontSize="small" className={location.pathname == '/invoices' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/workers') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/workers' && getColor()}`} onClick={()=> {navigate('/workers')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/workers') ? 'text-[#333]' : 'text-gray-50 '} tracking-wide ml-2`}>עובדים</h1>
              
              <PermContactCalendarOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/workers' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/salaries') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/salaries' && getColor()}`} onClick={()=> {navigate('/salaries')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/salaries') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>משכורות</h1>
              
                  <RequestQuoteOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/salaries' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
            <div className={`flex justify-end items-center space-x-3 pr-3 pl-5 cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/scheduler') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/scheduler' && getColor()}`} onClick={()=> {navigate('/scheduler')
          setToogleMenu(false)}}>
              {numsOfSchedulers?.data > 0 && (
                <div className="flex-1 relative right-4">
                  <span class={`inline-flex items-center justify-center w-6 h-6 p-4 mr-5 font-medium text-white ${getColor2()} animate-pulse rounded-full`}>{numsOfSchedulers?.data}</span>
                </div>
              )}
              <h1 className={`font-sans text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/scheduler') ? 'text-[#333]' : 'text-gray-50 '}`}>פגישות</h1>
             
                <CalendarMonthOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/scheduler' ? "text-indigo-100" : "text-gray-600"}/>
            </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/customers') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/customers' && getColor()}`} onClick={()=> {navigate('/customers')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/customers') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>לקוחות</h1>
              
               <ContactsOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/customers' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/receipts') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/receipts' && getColor()}`} onClick={()=> {navigate('/receipts')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/receipts') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>חשבוניות לקוחות</h1>
              
               <ContactsOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/receipts' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/quotes') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/quotes' && getColor()}`} onClick={()=> {navigate('/quotes')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/quotes') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>הצעות מחיר</h1>
              {/* <svg class={`w-5 h-5 relative left-[1.5px] ${location.pathname == '/customers' ? "text-indigo-100" : "text-gray-600"}`} viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.6665 6.44996C13.6578 6.3734 13.641 6.29799 13.6165 6.22496V6.14996C13.5764 6.06428 13.5229 5.98551 13.4581 5.91663L8.45813 0.916626C8.38924 0.851806 8.31048 0.79836 8.2248 0.758293H8.1498C8.06514 0.709744 7.97165 0.678579 7.8748 0.666626H2.83313C2.17009 0.666626 1.5342 0.930018 1.06536 1.39886C0.596522 1.8677 0.33313 2.50358 0.33313 3.16663V14.8333C0.33313 15.4963 0.596522 16.1322 1.06536 16.6011C1.5342 17.0699 2.17009 17.3333 2.83313 17.3333H11.1665C11.8295 17.3333 12.4654 17.0699 12.9342 16.6011C13.4031 16.1322 13.6665 15.4963 13.6665 14.8333V6.49996C13.6665 6.49996 13.6665 6.49996 13.6665 6.44996ZM8.66646 3.50829L10.8248 5.66663H9.49979C9.27878 5.66663 9.06682 5.57883 8.91054 5.42255C8.75426 5.26627 8.66646 5.05431 8.66646 4.83329V3.50829ZM11.9998 14.8333C11.9998 15.0543 11.912 15.2663 11.7557 15.4225C11.5994 15.5788 11.3875 15.6666 11.1665 15.6666H2.83313C2.61212 15.6666 2.40015 15.5788 2.24387 15.4225C2.08759 15.2663 1.9998 15.0543 1.9998 14.8333V3.16663C1.9998 2.94561 2.08759 2.73365 2.24387 2.57737C2.40015 2.42109 2.61212 2.33329 2.83313 2.33329H6.9998V4.83329C6.9998 5.49633 7.26319 6.13222 7.73203 6.60106C8.20087 7.0699 8.83675 7.33329 9.49979 7.33329H11.9998V14.8333Z" fill="currentColor"></path>
              </svg>      */}
               <ContactsOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/quotes' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/inventory') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/inventory' && getColor()}`} onClick={()=> {navigate('/inventory')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/inventory') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>מלאי</h1>
              <svg class={`w-5 h-5 relative left-[1.5px] ${location.pathname == '/inventory' ? "text-indigo-100" : "text-gray-600"}`} viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.6665 6.44996C13.6578 6.3734 13.641 6.29799 13.6165 6.22496V6.14996C13.5764 6.06428 13.5229 5.98551 13.4581 5.91663L8.45813 0.916626C8.38924 0.851806 8.31048 0.79836 8.2248 0.758293H8.1498C8.06514 0.709744 7.97165 0.678579 7.8748 0.666626H2.83313C2.17009 0.666626 1.5342 0.930018 1.06536 1.39886C0.596522 1.8677 0.33313 2.50358 0.33313 3.16663V14.8333C0.33313 15.4963 0.596522 16.1322 1.06536 16.6011C1.5342 17.0699 2.17009 17.3333 2.83313 17.3333H11.1665C11.8295 17.3333 12.4654 17.0699 12.9342 16.6011C13.4031 16.1322 13.6665 15.4963 13.6665 14.8333V6.49996C13.6665 6.49996 13.6665 6.49996 13.6665 6.44996ZM8.66646 3.50829L10.8248 5.66663H9.49979C9.27878 5.66663 9.06682 5.57883 8.91054 5.42255C8.75426 5.26627 8.66646 5.05431 8.66646 4.83329V3.50829ZM11.9998 14.8333C11.9998 15.0543 11.912 15.2663 11.7557 15.4225C11.5994 15.5788 11.3875 15.6666 11.1665 15.6666H2.83313C2.61212 15.6666 2.40015 15.5788 2.24387 15.4225C2.08759 15.2663 1.9998 15.0543 1.9998 14.8333V3.16663C1.9998 2.94561 2.08759 2.73365 2.24387 2.57737C2.40015 2.42109 2.61212 2.33329 2.83313 2.33329H6.9998V4.83329C6.9998 5.49633 7.26319 6.13222 7.73203 6.60106C8.20087 7.0699 8.83675 7.33329 9.49979 7.33329H11.9998V14.8333Z" fill="currentColor"></path>
              </svg>     
              </div>    
         </div>
         </li>
         
            <li>
            
            <div className={`flex justify-end items-center space-x-3 pr-3 cursor-pointer ${mode != "moon" && globalTheme == "light" ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 `} onClick={()=> {setToggle(!toggle)
            setArrow(!arrow)}}>
           <svg class={`text-gray-400 w-3 h-3 flex-grow relative left-[8px] top-[1px] ${!arrow && 'rotate-180 transition-all duration-300 ease-in-out relative right-4'}`} viewbox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z" fill="currentColor"></path>
                </svg>
              <h1 className={`font-sans font-medium text-[1rem] ml-2 ${mode != "moon" && globalTheme == "light" ? 'text-[#333]' : 'text-gray-50 '}`}>רשימות</h1>
              <svg class="text-gray-600 w-5 h-5" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.9831 6.64169C18.9047 6.545 18.8056 6.46712 18.6931 6.41376C18.5806 6.36041 18.4576 6.33293 18.3331 6.33335H16.6665V5.50002C16.6665 4.83698 16.4031 4.20109 15.9342 3.73225C15.4654 3.26341 14.8295 3.00002 14.1665 3.00002H8.93313L8.66646 2.16669C8.49359 1.67771 8.17292 1.2546 7.74888 0.955986C7.32484 0.657367 6.81843 0.498019 6.2998 0.500019H3.33313C2.67009 0.500019 2.0342 0.763411 1.56536 1.23225C1.09652 1.70109 0.83313 2.33698 0.83313 3.00002V13C0.83313 13.6631 1.09652 14.2989 1.56536 14.7678C2.0342 15.2366 2.67009 15.5 3.33313 15.5H15.3331C15.9008 15.4984 16.451 15.3036 16.8933 14.9476C17.3355 14.5917 17.6435 14.0959 17.7665 13.5417L19.1665 7.35002C19.1918 7.22578 19.1885 7.0974 19.1567 6.97466C19.1249 6.85191 19.0656 6.73803 18.9831 6.64169ZM4.4748 13.1834C4.43246 13.3713 4.32629 13.5388 4.17435 13.6574C4.02241 13.7759 3.8341 13.8381 3.64146 13.8334H3.33313C3.11212 13.8334 2.90015 13.7456 2.74387 13.5893C2.58759 13.433 2.4998 13.221 2.4998 13V3.00002C2.4998 2.779 2.58759 2.56704 2.74387 2.41076C2.90015 2.25448 3.11212 2.16669 3.33313 2.16669H6.2998C6.48152 2.1572 6.66135 2.20746 6.81183 2.30978C6.9623 2.4121 7.07515 2.56087 7.13313 2.73335L7.58313 4.10002C7.6366 4.25897 7.7368 4.39809 7.8706 4.49919C8.00441 4.60029 8.16561 4.65867 8.33313 4.66669H14.1665C14.3875 4.66669 14.5994 4.75448 14.7557 4.91076C14.912 5.06704 14.9998 5.27901 14.9998 5.50002V6.33335H6.66646C6.47383 6.32864 6.28551 6.39084 6.13358 6.50935C5.98164 6.62786 5.87546 6.79537 5.83313 6.98335L4.4748 13.1834ZM16.1415 13.1834C16.0991 13.3713 15.993 13.5388 15.841 13.6574C15.6891 13.7759 15.5008 13.8381 15.3081 13.8334H6.00813C6.05117 13.7405 6.08198 13.6425 6.0998 13.5417L7.33313 8.00002H17.3331L16.1415 13.1834Z" fill="currentColor"></path>
              </svg>
              </div>
            <ul class={`${!toggle && 'hidden'} py-1 space-y-2  ${mode != "moon" && globalTheme == "light" ? 'bg-white text-lg text-[#333]' : 'bg-gray-800'} rounded-lg mt-1 pr-2 pl-2`}>
                  <li onClick={()=> {navigate('/restaurant')
                setToggle(false)
                setToogleMenu(false)
                setArrow(true)}}>
                     <div class={`flex items-center w-full cursor-pointer p-2 ${mode != "moon" && globalTheme == "light" ? 'text-gray-800 hover:text-[#ccc] hover:font-semibold' : 'text-[#B1B7BB]'} transition duration-75 rounded-lg justify-end text-sm relative right-2 group hover:bg-slate-500 dark:text-white dark:hover:bg-gray-700 text-right font-mono`} >דו"ח מסעדות</div>
                  </li>
                  <li onClick={()=> {navigate('/inventory')
                setToggle(false)
                setToogleMenu(false)
                setArrow(true)}}>
                     <div class={`flex items-center w-full cursor-pointer p-2 ${mode != "moon" && globalTheme == "light" ? 'text-gray-800 hover:text-[#ccc] hover:font-semibold' : 'text-[#B1B7BB]'} transition duration-75 rounded-lg justify-end text-sm relative right-2 group hover:bg-slate-500 dark:text-white dark:hover:bg-gray-700 text-right font-mono`}>ספירת מלאי</div>
                  </li>
                  <li onClick={()=> {navigate('/way-bills')
                setToggle(false)
                setToogleMenu(false)
                setArrow(true)}}>
                     <div class={`flex items-center w-full cursor-pointer p-2  ${mode != "moon" && globalTheme == "light" ? 'text-gray-800 hover:text-[#ccc] hover:font-semibold' : 'text-[#B1B7BB]'} transition duration-75 rounded-lg justify-end text-sm relative right-2 group hover:bg-slate-500 dark:text-white dark:hover:bg-gray-700 text-right font-mono`} >תעודות משלוח</div>
                  </li>
                  <li onClick={()=> {navigate('/all-receipts')
                setToggle(false)
                setToogleMenu(false)
                setArrow(true)}}>
                     <div class={`flex items-center w-full cursor-pointer p-2  ${mode != "moon" && globalTheme == "light" ? 'text-gray-800 hover:text-[#ccc] hover:font-semibold' : 'text-[#B1B7BB]'} transition duration-75 rounded-lg justify-end text-sm relative right-2 group hover:bg-slate-500 dark:text-white dark:hover:bg-gray-700 text-right font-mono`}>קבלות</div>
                  </li>
                  {/* <li>
                     <a href="/way-bills" class={`flex items-center w-full p-2 ${dashMode ? 'text-[#B1B7BB]' : 'text-gray-800'} transition duration-75 rounded-lg justify-end text-xs relative right-2 group hover:bg-slate-500 dark:text-white dark:hover:bg-gray-700 text-right font-mono`}>תעודות משלוח</a>
                  </li> */}
            </ul>
         </li>
         
         
         
        </ul>
        <h3 class="mb-2 text-[1rem] text-gray-500 font-thin text-right mr-1">שירותים</h3>
        <ul class="text-sm font-medium">
        <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/tasks') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/tasks' && getColor()}`} onClick={()=> {navigate('/tasks')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/tasks') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>משימות</h1>
             
              <AssignmentOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/tasks' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/workers-tasks') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/workers-tasks' && getColor()}`} onClick={()=> {navigate('/workers-tasks')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/workers-tasks') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>משימות עובדים</h1>
              
                  <AssignmentIndOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/workers-tasks' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
          
          <li>
            
            <div className={`flex justify-end items-center space-x-3 pr-3 cursor-pointer ${mode != "moon" && globalTheme == "light" ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 `} onClick={()=> {setToggle1(!toggle1)
            setArrow1(!arrow1)}}>
            <svg class={`text-gray-400 w-3 h-3 flex-grow relative left-[8px] top-[1px] ${!arrow1 && 'rotate-180 transition-all duration-300 ease-in-out relative right-4'}`} viewbox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z" fill="currentColor"></path>
                </svg>
              <h1 className={`font-sans font-medium text-[1rem] ml-2 ${mode != "moon" && globalTheme == "light" ? 'text-[#333]' : 'text-gray-50 '}`}>תשלומים</h1>
              <svg class="text-gray-600 w-5 h-5" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.9831 6.64169C18.9047 6.545 18.8056 6.46712 18.6931 6.41376C18.5806 6.36041 18.4576 6.33293 18.3331 6.33335H16.6665V5.50002C16.6665 4.83698 16.4031 4.20109 15.9342 3.73225C15.4654 3.26341 14.8295 3.00002 14.1665 3.00002H8.93313L8.66646 2.16669C8.49359 1.67771 8.17292 1.2546 7.74888 0.955986C7.32484 0.657367 6.81843 0.498019 6.2998 0.500019H3.33313C2.67009 0.500019 2.0342 0.763411 1.56536 1.23225C1.09652 1.70109 0.83313 2.33698 0.83313 3.00002V13C0.83313 13.6631 1.09652 14.2989 1.56536 14.7678C2.0342 15.2366 2.67009 15.5 3.33313 15.5H15.3331C15.9008 15.4984 16.451 15.3036 16.8933 14.9476C17.3355 14.5917 17.6435 14.0959 17.7665 13.5417L19.1665 7.35002C19.1918 7.22578 19.1885 7.0974 19.1567 6.97466C19.1249 6.85191 19.0656 6.73803 18.9831 6.64169ZM4.4748 13.1834C4.43246 13.3713 4.32629 13.5388 4.17435 13.6574C4.02241 13.7759 3.8341 13.8381 3.64146 13.8334H3.33313C3.11212 13.8334 2.90015 13.7456 2.74387 13.5893C2.58759 13.433 2.4998 13.221 2.4998 13V3.00002C2.4998 2.779 2.58759 2.56704 2.74387 2.41076C2.90015 2.25448 3.11212 2.16669 3.33313 2.16669H6.2998C6.48152 2.1572 6.66135 2.20746 6.81183 2.30978C6.9623 2.4121 7.07515 2.56087 7.13313 2.73335L7.58313 4.10002C7.6366 4.25897 7.7368 4.39809 7.8706 4.49919C8.00441 4.60029 8.16561 4.65867 8.33313 4.66669H14.1665C14.3875 4.66669 14.5994 4.75448 14.7557 4.91076C14.912 5.06704 14.9998 5.27901 14.9998 5.50002V6.33335H6.66646C6.47383 6.32864 6.28551 6.39084 6.13358 6.50935C5.98164 6.62786 5.87546 6.79537 5.83313 6.98335L4.4748 13.1834ZM16.1415 13.1834C16.0991 13.3713 15.993 13.5388 15.841 13.6574C15.6891 13.7759 15.5008 13.8381 15.3081 13.8334H6.00813C6.05117 13.7405 6.08198 13.6425 6.0998 13.5417L7.33313 8.00002H17.3331L16.1415 13.1834Z" fill="currentColor"></path>
              </svg>
              </div>
            <ul ref={ref} id="dropdown-example" class={`${!toggle1 && 'hidden'} py-1 space-y-2 ${mode != "moon" && globalTheme == "light" ? 'bg-white' : 'bg-gray-800'} rounded-lg mt-1 pr-2 pl-2`}>
                  <li onClick={()=> {navigate('/reports')
                setToggle1(false)
                setToogleMenu(false)
                setArrow1(true)}}>
                     <div class={`flex items-center w-full cursor-pointer p-2 ${mode != "moon" && globalTheme == "light" ? 'text-gray-800 hover:text-[#ccc] hover:font-semibold' : 'text-[#B1B7BB]'} transition duration-75 rounded-lg justify-end text-sm relative right-2 group hover:bg-slate-500 dark:text-white dark:hover:bg-gray-700 text-right font-mono`} >תשלומים יוצאים</div>
                  </li>
                  <li onClick={()=> {navigate('/payments')
                setToggle1(false)
                setToogleMenu(false)
                setArrow1(true)}}>
                     <div class={`flex items-center w-full cursor-pointer p-2 ${mode != "moon" && globalTheme == "light" ? 'text-gray-800 hover:text-[#ccc] hover:font-semibold' : 'text-[#B1B7BB]'} transition duration-75 rounded-lg justify-end text-sm relative right-2 group hover:bg-slate-500 dark:text-white dark:hover:bg-gray-700 text-right font-mono`}>תשלומים נכנסים</div>
                  </li>
                  
            </ul>
         </li>
         <li>
            <div className={`flex justify-end items-center space-x-3 pr-3 pl-5 cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/dnd') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/dnd' && getColor()}`} onClick={()=> {navigate('/dnd')
          setToogleMenu(false)}}>
                <div className="flex-1 relative right-4">
                  <span class="inline-flex items-center justify-center w-10 h-5 px-3 py-1 mr-5 text-sm font-medium text-white bg-red-400 rounded-full relative left-1">חדש</span>
                </div>
              <h1 className={`font-sans text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/dnd') ? 'text-[#333]' : 'text-gray-50 '}`}>משימות</h1>
              
                <AssignmentOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/dnd' ? "text-indigo-100" : "text-gray-600"}/>
            </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/editor') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/editor' && getColor()}`} onClick={()=> {navigate('/editor')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/editor') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>עורך טקסט</h1>
              <ListAltIcon style={{fontSize: '22px'}} className={location.pathname == '/editor' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/roster') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/roster' && getColor()}`} onClick={()=> {navigate('/roster')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/roster') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>סידור עבודה</h1>
              <ListAltIcon style={{fontSize: '22px'}} className={location.pathname == '/roster' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/clock-in') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/clock-in' && getColor()}`} onClick={()=> {navigate('/clock-in')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/clock-in') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>שעות עובדים</h1>
              <ListAltIcon style={{fontSize: '22px'}} className={location.pathname == '/clock-in' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/blog') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/blog' && getColor()}`} onClick={()=> {navigate('/blog')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/blog') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>בלוג עסקים</h1>
              <LibraryBooksOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/blog' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/open-ai') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/open-ai' && getColor()}`} onClick={()=> {navigate('/open-ai')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/open-ai') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>צ'אט העתיד</h1>
              <QuestionAnswerOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/open-ai' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/yearly-reports') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/yearly-reports' && getColor()}`} onClick={()=> {navigate('/yearly-reports')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/yearly-reports') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>דו"ח שנתי</h1>
              <ListAltIcon style={{fontSize: '22px'}} className={location.pathname == '/yearly-reports' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${(mode != "moon" && globalTheme == "light" && location.pathname != '/contact') ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 ${location.pathname == '/contact' && getColor()}`} onClick={()=> {navigate('/contact')
        setToogleMenu(false)}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${(mode != "moon" && globalTheme == "light" && location.pathname != '/contact') ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>צור קשר</h1>
              
              <SpeakerNotesOutlinedIcon style={{fontSize: '22px'}} className={location.pathname == '/contact' ? "text-indigo-100" : "text-gray-600"}/>
              </div>    
         </div>
         </li>
         <li>
         <a href="/login">
         <div className={`flex justify-end items-center pr-3 space-x-[6px] cursor-pointer ${mode != "moon" && globalTheme == "light" ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} rounded py-3 `} onClick={()=> {localStorage.removeItem("user")}}>
              <div className="flex items-center justify-center space-x-3 relative left-[1px]">
              <h1 className={`font-sans font-medium text-[1rem] ${mode != "moon" && globalTheme == "light" ? 'text-[#333]' : 'text-gray-50 '} ml-2`}>יציאה</h1>
              
               <ExitToAppIcon style={{fontSize: '22px'}} className="text-gray-600"/>
              </div>    
         </div>
         </a>
         </li>

        {(result?.sub || sub) ? (
            <div className={` relative top-5`}>
            <div class="relative mx-auto bg-gray-700 dark:bg-gray-700 rounded-t-[2.5rem] h-[63px] max-w-[133px]"></div>
            <div class="relative mx-auto border-gray-900 dark:bg-gray-800 dark:border-gray-800 border-[10px] rounded-[2.5rem] h-[213px] w-[208px]">
                <div class="h-[41px] w-[6px] bg-gray-900 dark:bg-gray-700 absolute -right-[16px] dark:-right-[10px] top-[40px] rounded-r-lg"></div>
                <div class="h-[32px] w-[6px] bg-gray-900 dark:bg-gray-700 absolute -right-[16px] dark:-right-[10px] top-[88px] rounded-r-lg"></div>
                <div class="rounded-[2rem] overflow-hidden h-[193px] w-[188px]">
                    <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/watch-screen-image.png" class="dark:hidden h-[193px] w-[188px" alt=""/>
                    <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/watch-screen-image-dark.png" class="hidden dark:block h-[193px] w-[188px]" alt=""/>
                </div>
            </div>
            <div class="relative mx-auto bg-gray-700 dark:bg-gray-700 rounded-b-[2.5rem] h-[63px] max-w-[133px]"></div>
            </div>
        ) : (
          <div class={`relative top-8 left-1 w-full p-6 pb-8 overflow-hidden blue-glassmorphism dark:bg-gray-900 shadow-lg rounded-xl`}>
           <p class="text-xl text-white text-right">
               הכנס משתמש
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
               <span class="p-2 bg-gray-800 rounded-lg">
                   <svg className="text-blue-600" width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                       <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                       </path>
                   </svg>
               </span>
           </div>
           <div class="flex items-center justify-between text-blue-500 rounded">
               <div class="flex flex-col items-end w-full space-y-1 mr-2 justify-evenly">
                   <p class="text-sm text-white">
                     ניהול משתמשים
                   </p>
                   {/* <p class="text-sm text-blue-200">
                       הכנסת מסמכים
                   </p> */}
                   <div class="flex -space-x-2">
         <div
           class="relative flex h-5 w-5 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase text-gray-800 ring-1 ring-white">
           <img
             class="h-full w-full rounded-full object-cover object-center"
             src={`https://source.unsplash.com/100x100/?portrait?${Math.floor(Math.random() * 100) + 1}`} />
         </div>
         <div
           class="relative flex h-5 w-5 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase text-gray-800 ring-1 ring-white">
           <img
             class="h-full w-full rounded-full object-cover object-center"
             src={`https://source.unsplash.com/100x100/?portrait?${Math.floor(Math.random() * 100) + 1}`} />
         </div>
         <div
           class="relative flex h-5 w-5 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase text-gray-800 ring-1 ring-white">
           <img
             class="h-full w-full rounded-full object-cover object-center"
             src={`https://source.unsplash.com/100x100/?portrait?${Math.floor(Math.random() * 100) + 1}`} />
         </div>
         <div
           class="relative flex h-5 w-5 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase text-gray-800 ring-1 ring-white">
           <img
             class="h-full w-full rounded-full object-cover object-center"
             src={`https://source.unsplash.com/100x100/?portrait?${Math.floor(Math.random() * 100) + 1}`} />
         </div>
         <div
           class="relative flex h-5 w-5 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase text-gray-800 ring-1 ring-white">
           <img
             class="h-full w-full rounded-full object-cover object-center"
             src={`https://source.unsplash.com/100x100/?portrait?${Math.floor(Math.random() * 100) + 1}`} />
         </div>
       </div>
               </div>
               <span class="p-2 bg-gray-800 rounded-lg">
                   <svg className="text-blue-600" width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                       <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                       </path>
                   </svg>
               </span>
           </div>
       
           <div className="relative top-3.5">
           <div className="flex items-center justify-center space-x-1.5 relative top-2">
                     <div className="bg-green-100 text-green-600 text-xs font-semibold rounded px-2 py-[2px]">
                       עובד
                     </div>
                     <div className="bg-red-100 text-red-600 text-xs font-semibold rounded px-2 py-[2px]">
                       אחראי
                     </div>
                     <div className="bg-yellow-500 text-xs font-semibold text-gray-900 rounded px-2 py-[2px]">
                       מנהל
                     </div>
                   </div>
           <div class="mt-4">
               <button type="button" class="w-full px-4 py-2 text-base relative top-[2px] tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> navigate("/new-user")}>
                   הכנס
               </button>
           </div>
           </div>
       </div>
         
        )}



         <div className="flex items-center justify-center relative top-14 left-1 mb-4">
<div class="flex flex-row justify-between items-center rounded-full w-[210px] p-2 mb-1 text-sm bg-slate-100 text-[#333] dark:text-white dark:bg-slate-700">
    <div class={`flex flex-1 items-center justify-center px-2 py-3 ${mode == "sun" && 'bg-white shadow-sm dark:bg-slate-600'} rounded-full h-full cursor-pointer`} onClick={()=> setMode("sun")}><svg
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path
          d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z">
        </path>
      </svg></div><div
      class={`flex flex-1 items-center justify-center px-2 py-3 rounded-full h-full ${mode == "moon" && 'bg-white shadow-sm dark:bg-slate-600'} dark:text-white cursor-pointer`} onClick={()=> setMode("moon")}><svg
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path fill-rule="evenodd"
          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
          clip-rule="evenodd"></path>
      </svg></div><div class="flex flex-1 items-center justify-center px-2 py-3 rounded-full h-full"><svg
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path
          d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z">
        </path>
      </svg></div>
      </div>
</div>

        </ul>
       
      </div>
     

    </nav>
  </div>
  {/* <div class="mx-auto lg:ml-80"></div> */}
</div>
                </>
              )}
          </div>
          </div>
        </>
      )}
    </div>
    
  );
};

export default SideBarPage;
