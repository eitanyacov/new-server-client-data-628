import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import LinearProgress from '@mui/material/LinearProgress';
import { Dialog, DialogContent, TextField, Typography, InputLabel, Select, MenuItem } from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { PaginationItem } from '@mui/material';
// import { styled } from '@mui/material/styles';
import { ThemeContext } from "../App";
import axios from 'axios';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useQuery } from 'react-query'
import ReactToPrint  from 'react-to-print';
// import useMediaQuery from '@mui/material/useMediaQuery';



// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});


const WorkerClock = () => {
    const [clocks, setClocks] = useState([])
    const [isSSRE, setIsSSRE] = useState(true);
    const [isSSR, setIsSSR] = useState(true);
    const [quotes, setQuotes] = useState([])
    const [quote, setQuote] = useState({})
    const [open, setIsOpen] = useState(false)
    const [deleteAlert, setDeleteAlert] = useState(false)
    const [openUpdate, setIsOpenUpdate] = useState(false)
    const [item, setItem] = useState("")
    const [price, setPrice] = useState("")
    const [notes, setNotes] = useState("")
    const [ide, setIde] = useState();
    const [updateAlert, setUpdateAlert] = useState(false)
    const [error, setError] = useState("")
    const [errorMode, setErrorMode] = useState(false)
    const [windowHeight, setWindowHeight] = useState(0);
    const [flag, setFlag] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [errors, setErrors] = useState()
    const [openAddSupplierQuote, setOpenAddSupplierQuote] = useState(false)
    const [errorRes, setErrorRes] = useState([]);
    const [itemQuoteAlert, setItemQuoteAlert] = useState(false);
    const [action, setAction] = useState(false);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false)
    const [alert2, setAlert2] = useState(false)
    const [alert1, setAlert1] = useState(false)
    const [total, setTotal] = useState();
    const [totalAlert, setTotalAlert] = useState(false);
    const [alert, setAlert] = useState(false)
    const [noteAlert, setNoteAlert] = useState(false)
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [monthNumber, setMonthNumber] = useState(0);
    const [sum, setSum] = useState("");
    const [regular, setRegular] = useState("");
    const [extra, setExtra] = useState("");


    const { workerId } = useParams()
    // const navigate = useNavigate()
    // const screen = window.screen.availWidth
    // const screenHeight = window.screen.availHeight
    const componentRef = useRef();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
    const currentYear = new Date().getFullYear()
    const lastYear = new Date().getFullYear() -1
    const lastTwoYear = new Date().getFullYear() -2
  
    const years = [currentYear, lastYear, lastTwoYear] 

    const { hebrew, globalTheme } = useContext(ThemeContext)

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

 
    useEffect(() => {
      setTimeout(() => {
        setIsSSR(false);
      }, 200)
      
    }, []);

    useEffect(() => {
      if(error != "") {
       setAlert(true)
      }
       
     }, [error]);
  
    useEffect(() => {
      resizeWindow();
      console.log(window.innerHeight)
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);  
    }, [windowHeight, window.innerHeight, windowWidth, window.innerWidth]);


    const getWorkerClocks = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/clocks-paging-by-worker/${workerId}/${page}/10/date`)
    }
    
    const {data, refetch} = useQuery('worker-clocks', ()=> getWorkerClocks(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: true,
        refetchOnWindowFocus:false
   
      }) 

      const endShift = (id) => {
        setLoading(true)
        axios.post(`https://nartina.com/api/user/end-shift/${id}`, {

        }, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        })
        .then(res => {console.log(res.data)
          setAlert2(true)
          localStorage.setItem('clocks', true)
          refetch()})
        .catch(err => console.log(err))
        .finally(setLoading(false))

      }


    
    //   useEffect(()=> {
    //     setQuotes(data?.data)
    // }, [data?.data])
  
    useEffect(() => {
        setTimeout(() => {
          setIsSSRE(false);
        }, 1200)
        
      }, [isSSRE]);

      useEffect(() => {
        if(error == 403) {
          setErrorMode(true)
        }
        
      }, [errorMode, error]);


     
      const getQuotes = () => {
        axios.get('https://nartina.com/api/user/supplier-quotes/' + workerId)
        .then(res => setQuotes(res.data))
        .catch(err => console.log(err))
      }


    const getQuote = async (id) => {
      const res = await fetch(`https://nartina.com/api/user/get-supplier-quote/${id}`);
      const result = await res.json();
      setQuote(result)
      setIsOpenUpdate(true)
      
  }

    const deleteQuote = () => {
      axios.delete("https://nartina.com/api/user/delete-supplier-quote/" + ide, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
      .then(res => {
        // getQuotes()
        refetch()
        setDeleteAlert(true)})
      .catch(err => {console.log(err.response.data)
        setError(err.response.status)})
        setIsOpen(false)
        // getQuotes()
      // setIsOpenAlertIncomeDelete(true)
    }

    const handleDeleteAlert = () => {
      setDeleteAlert(false)
    }

    const handleClose = () => {
      setAlert(false)
    }

    const handleUpdateAlert = () => {
      setUpdateAlert(false)
    }

    const handleClose2 = () => {
      setErrorMode(false)
      setError("")
    }

    const handleClose3 = () => {
        setTotalAlert(false)
       
      }

    const printValues = (e)=> {
      e.preventDefault()
      axios.post("https://nartina.com/api/user/update-supplier-quote/" + ide, {
        item: item != "" ? item : quote.item,
        price: price != null ? price : quote.price,
        notes: notes != "" ? notes : quote.notes, 
        
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {
         setIsOpenUpdate(false)
         refetch()
          // getQuotes()
          setUpdateAlert(true)})
      .catch(err => {console.log(err)
        setError(err.response.status)})
      // getQuotes()
    }

    const startShift = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post(`https://nartina.com/api/user/start-shift/${result?.id}/${workerId}`, {

        }, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        })
        .then(res => {console.log(res.data)
          setAlert1(true)
        //   setWorkerFullName("")
          refetch()})
        .catch(err => {console.log(err)
          setError(err.response.data)})
        .finally(setLoading(false))

      }

    const postSupplierQuote = (e) => {
      e.preventDefault();
      axios.post("https://nartina.com/api/user/add-supplier-quote/" + workerId, {
       item,
       price,
       notes
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {
        refetch(true)
        setOpenAddSupplierQuote(false)
        setItemQuoteAlert(true)
        // allSupplierQuotes()
      // setOpenIncomeAlert(true)
      setItem("")
      setPrice("")
      setNotes("")
      // navigate(-1)
    
      })
      .catch(error => {setErrorRes(error.response.data)
        setErrors(error.response.status)})
    }

    const totalHours = (e) => {
        e.preventDefault();
        axios.get(`https://nartina.com/api/user/parse-sum/${workerId}`)
        .then(res => {setTotal(res.data)
        //   setOpenDialog2(false)
        //   setWorkerFullName("")
          setTotalAlert(true)
        console.log(res.data)})
        .catch(err => console.log(err))
        // .finally(setOpenDialog2(false))
        // setWorkerFullName("")

        
      }

      const totalHours2 = () => {
        axios.get(`https://nartina.com/api/user/parse-sum/${workerId}`)
        .then(res => {setTotal(res.data)
          console.log(res.data)})
        .catch(err => console.log(err))
        .finally(setFlag(!flag))

      }

      const clocksByMonth = (e) => {
        e.preventDefault();
        axios.get(`https://nartina.com/api/user/clocks-by-worker/${workerId}/${monthNumber}/${year}`)
        .then(res => {setFlag(true)
          setOpenDialog(false)
          setClocks(res.data.clockIns)
          setSum(res.data.sum)
          setRegular(res.data.regular)
          setExtra(res.data.extra)
          console.log(res.data)
          setMonth("")
          setYear("")})
        .catch(err => console.log(err))
        // .finally()

      }

    const handleClose1 = () => {
        setAlert1(false)
    }



      const editQuote = (id) => {
        setIde(id)
        getQuote(id)
      }

      const deleteTheQuote = (id) => {
        setIde(id)
        setIsOpen(true)
      }


      const closeAddSupplierQute = () => {
        setOpenAddSupplierQuote(false)
        setItem("")
        setPrice("")
        setNotes("")
        setErrorRes("")
       
      }


      const handleClose18 = () => {
        setItemQuoteAlert(false)
      }

      const handlePrevClick = () => {
        setPage((prevPage) => prevPage - 1);
        setTimeout(()=> {
            refetch()
        }, 250)
      };
      
      const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);
        setTimeout(()=> {
            refetch()
        }, 250)
      };

      const reports = (bool) => {
        if(bool) {
          setNoteAlert(true)
        }
     }

     const handleYears = (e) => {
      setYear(e.target.value)
      }
  
    const handleMonths = (e) => {
      setMonth(e.target.value)
      getMonthInHebrew(e.target.value)
    }

    const closeDialog = () => {
      setMonth("")
      setYear("")
      setOpenDialog(false)
    }
    
    const getMonthInHebrew = (e) => {
      let monthNum = 0;
        switch (e) {
          case "ינואר":
              monthNum = 1
            break;
            case "פברואר":
              monthNum = 2
              break;
              case "מרץ":
                  monthNum = 3
                break;
                case "אפריל":
                  monthNum = 4
                  break;
                  case "מאי":
                      monthNum = 5
                  break;
                  case "יוני":
                      monthNum = 6
                  break;
                  case "יולי":
                    monthNum = 7
                  break;
                  case "אוגוסט":
                      monthNum = 8
                  break;
                  case "ספטמבר":
                      monthNum = 9
                  break;
                  case "אוקטובר":
                    monthNum = 10
                  break;
                  case "נובמבר":
                      monthNum = 11
                  break;
                  case "דצמבר":
                      monthNum = 12
                  break;
          // default:
          //   month = new Date().getMonth().toLocaleString()
          //   break;
        }
        setMonthNumber(monthNum)
      //   return monthNum;
    }

  return (
    <section class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${globalTheme != "light" && "bg-gray-700 dark"}`}>

      {flag && (
        <>
        <div className='flex justify-between items-center px-6 py-1'>
        <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={()=> setFlag(false)}>
            <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600'/>
          </div>
         <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">
                    <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center space-x-1 bg-blue-700 hover:bg-blue-600 rounded-md px-2 py-[2px] w-fit" onClick={()=> setFlag(false)}>
                    <h1 className="font-mono text-white font-semibold">{hebrew ? "Print" : "הדפס"}</h1>
                    <LocalPrintshopIcon className='text-white cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-4'/> 
                    </div>
                    </div>
            </a>;
          }}
          content={() => componentRef.current}
          documentTitle='הצעת מחיר'
        />
       
          </div>
        <div ref={componentRef} className='overflow-y-scroll scrollbar scrollbar-none max-h-full'>
        <table className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
           <tr>
    {/* <th scope="col" className="px-4 text-center py-2">יציאה</th> */}
    <th scope="col" className="px-4 text-center py-2">הערות</th>
    <th scope="col" className="px-4 text-center py-2">סה"כ</th>
    <th scope="col" className="px-4 text-center py-2">נוספות</th>
    <th scope="col" className="px-4 text-center py-2">רגילות</th>
    <th scope="col" className="px-4 text-center py-2">יציאה</th>
    <th scope="col" className="px-4 text-center py-2">כניסה</th>
    <th scope="col" className="px-4 text-center py-2">ת.ז</th>
    <th scope="col" className="px-4 text-center py-2">שם עובד</th>
    <th scope="col" className="px-4 text-center py-2">תאריך</th>
                       </tr>
                   </thead>
                   <tbody>
             {clocks.map((report, index) => (
   <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        {/* <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> reports(report.forget)}>
        <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.forget ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `} />
        </div> */}
       <h1 className='text-gray-800'>{report.forget ? "שכח לעשות יציאה" : "-"}</h1>
    </td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.total}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.extraHours}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.regularHours}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.end}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.start}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.idNumber}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.name}</td>
    <th scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.date.substring(0, 10)}</th>
    </tr>
  ))}
  </tbody>
    </table>
    {sum != "" && <h1 className='text-right pr-8 pt-2 dark:text-[#ccc]'><span className='font-mono relative right-1 text-lg'>{sum}</span>  סה"כ שעות </h1>}
    {regular != "" && <h1 className='text-right pr-8 pt-2 dark:text-[#ccc]'><span className='font-mono relative right-1 text-lg'>{regular}</span>  שעות רגילות </h1>}
    {extra != "" && <h1 className='text-right pr-8 pt-2 dark:text-[#ccc]'><span className='font-mono relative right-1 text-lg'>{extra}</span>  שעות נוספות </h1>}
    </div>
        </>
      )}
        {isSSR ? (
          <LinearProgress />
        ) : (
          <div className={`${flag && 'hidden'}`}>
        {hebrew ? (
            <>
            <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">
        {/* <!-- Start coding here --> */}
        <div class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                        </div>
                    </form>
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 relative right-4">
                <div className='relative top-1 right-2' onClick={()=> {setFlag(!flag)
                        getQuotes()}}>
                    <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-5 -mt-2'/>
                </div>
                    <div class="flex items-center space-x-3 w-full md:w-auto">
                        <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                            <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                            Actions
                        </button>
                        <div id="actionsDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                <li>
                                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                </li>
                            </ul>
                            <div class="py-1">
                                <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                            </div>
                        </div>
                        <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                            </svg>
                            Filter
                            <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </button>
                        <div id="filterDropdown" class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                            <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                <li class="flex items-center">
                                    <input id="apple" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="fitbit" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="razor" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label for="razor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="nikon" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label for="nikon" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="benq" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label for="benq" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> setOpenAddSupplierQuote(true)}>
                        {/* <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg> */}
                        Add product
                    </button>
                </div>
                
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
              <th scope="col" className="px-4 text-center py-2">product</th>
              <th scope="col" className="px-4 text-center py-2">unit price</th>
              <th scope="col" className="px-4 text-center py-2">notes</th>
              <th scope="col" className="px-4 text-center py-2">edit</th>
              <th scope="col" className="px-4 text-center py-2">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data?.content.map((report, index) => (
         <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
             
          <th scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.item}</th>
          <td scope="col" className="px-4 text-center py-2">{report.price}</td>
          <td scope="col" className="px-4 text-center py-2">{report.notes}</td>
          <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 hover:bg-blue-300 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> editQuote(report.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
          <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 hover:bg-red-300 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> deleteTheQuote(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
          </tr>
        ))}
                    </tbody>
                </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
           <div className='hidden xru:flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
          
              <h1 className='font-mono '>record numbers {data?.data.totalElements}</h1>
           </div>
        <Pagination
          count={data?.data.totalPages}
          page={page + 1}
          onChange={(event, value) => {setPage(value - 1)
          setTimeout(()=> {
              refetch()
          }, 250)}}
          color="primary"
          variant="outlined"
          size='medium'
          shape="rounded"
          disabled={data?.data.totalPages === 1}
          sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}
          renderItem={(item) => {
            switch (item.type) {
              case 'previous':
                return (
                  <PaginationItem
                    {...item}
                    onClick={handlePrevClick}
                    disabled={page + 1 === 1}
                    style={{ backgroundColor: globalTheme == "light" ? 'white' : '#3b82f6', color: globalTheme == "light" ? 'gray' : 'white' }}

                  />
                );
              case 'next':
                return (
                  <PaginationItem
                    {...item}
                    onClick={handleNextClick}
                    disabled={page + 1 === data?.data.totalPages}
                    style={{ backgroundColor: globalTheme == "light" ? 'white' : '#3b82f6', color: globalTheme == "light" ? 'gray' : 'white' }}

                  />
                );
              default:
                return <PaginationItem {...item} />;
            }
          }}
        />
               
           </nav>
        </div>
    </div>
            </>
      ) : (
        <>
        <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">
       
       <div class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
           <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
               
               <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={startShift}>
                         כניסה
                   </button>
                   <div class="flex items-center space-x-3 w-full md:w-auto relative">
                       <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                           <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                           אפשרויות
                       </button>
                       <div class={`${!action && 'hidden'} p-4 z-10 w-44 absolute top-10 flex flex-col space-y-1 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                            {/* <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setFlag(!flag)}>
                              <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                              <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Print</h1>
                            </div>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setOpenDailyIncomeReport(true)}>
                             <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                             <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
                           </div> */}
                       </div>
                       <button className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                           <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                               <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                           </svg>
                           פילטר
                           <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                       </button>
                       <div class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                           <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                           <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                               <li class="flex items-center">
                                   <input id="apple" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                   <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                               </li>
                               <li class="flex items-center">
                                   <input id="fitbit" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                   <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                               </li>
                               <li class="flex items-center">
                                   <input id="razor" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                   <label for="razor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                               </li>
                               <li class="flex items-center">
                                   <input id="nikon" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                   <label for="nikon" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                               </li>
                               <li class="flex items-center">
                                   <input id="benq" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                   <label for="benq" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                               </li>
                           </ul>
                       </div>

                       <div className='relative top-1 right-2' onClick={()=> setOpenDialog(true)}>
                         <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-5 -mt-2'/>
                       </div>
                       <CalendarMonthIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 relative top-[1px] right-2' onClick={totalHours}/>
                   </div>
               </div>
               <div class="w-full md:w-1/2">
                   <form class="flex items-center">
                       <label for="simple-search" class="sr-only">Search</label>
                       <div class="relative w-full">
                           <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                               <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                   <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                               </svg>
                           </div>
                           <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                       </div>
                   </form>
               </div>
           </div>
           <div class="overflow-x-auto hidden md:block">
               <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                   <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
           <tr>
    <th scope="col" className="px-4 text-center py-2">יציאה</th>
    <th scope="col" className="px-4 text-center py-2">הערות</th>
    <th scope="col" className="px-4 text-center py-2">סה"כ</th>
    <th scope="col" className="px-4 text-center py-2">נוספות</th>
    <th scope="col" className="px-4 text-center py-2">רגילות</th>
    <th scope="col" className="px-4 text-center py-2">יציאה</th>
    <th scope="col" className="px-4 text-center py-2">כניסה</th>
    <th scope="col" className="px-4 text-center py-2">ת.ז</th>
    <th scope="col" className="px-4 text-center py-2">שם עובד</th>
    <th scope="col" className="px-4 text-center py-2">תאריך</th>
                       </tr>
                   </thead>
                   <tbody>
             {data?.data?.content.map((report, index) => (
   <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
       <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
         {!report.end ? (
      <>
      {!loading ? (
        <button type="button" className={`text-white ${report.end && 'hidden'} bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} onClick={()=> endShift(report.id)}>
            יציאה
        </button>
            ) : (
              <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
<svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>
Loading...
</button>
            )}
      </>
         ) : (
          <button type="button" disabled={true} className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
             הסתיים
         </button>
         )}
      </td>
   
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> reports(report.forget)}>
        <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.forget ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `} />
        </div>
    </td>
    <td scope="col" className="px-4 text-center py-2">{report.total}</td>
    <td scope="col" className="px-4 text-center py-2">{report.extraHours}</td>
    <td scope="col" className="px-4 text-center py-2">{report.regularHours}</td>
    <td scope="col" className="px-4 text-center py-2">{report.end}</td>
    <td scope="col" className="px-4 text-center py-2">{report.start}</td>
    <td scope="col" className="px-4 text-center py-2">{report.idNumber}</td>
    <td scope="col" className="px-4 text-center py-2">{report.name}</td>
    <th scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.date.substring(0, 10)}</th>
    </tr>
  ))}
             </tbody>
               </table>
           </div>
           <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {data?.data.content.map(report => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-1`}>
                <div className="p-4 blue-glassmorphism hover:bg-gray-900 shadow rounded flex flex-col space-y-1">

                <div className='flex items-center justify-end space-x-2.5 text-sm'>
                  <div className='dark:text-[#ccc] font-mono text-lg'>{report.startDate.substring(0, 10)}</div>
                  <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>תאריך</h1>
                </div>
                <div className='flex items-center justify-end space-x-2.5'>
               <div className='dark:text-[#ccc]'>{report.name}</div>
               <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>שם עובד</h1>
             </div>
             <div className='flex items-center justify-end space-x-2.5'>
               <div className='dark:text-[#ccc]'>{report.idNumber}</div>
               <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>ת.ז</h1>
             </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.start}</div>
                <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>כניסה</h1>
                </div>
                <div className='flex items-center justify-end space-x-2.5'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.end}</div>
                <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>יציאה</h1>
                </div>
                
                
                
                <div className='flex items-center justify-between relative top-1'>
                  
                <div className='flex items-center justify-center space-x-4'>
                <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1">
              {!report.end ? (
      <>
      {!loading ? (
        <button type="button" className={`text-white ${report.end && 'hidden'} bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} onClick={()=> endShift(report.id)}>
            יציאה
        </button>
            ) : (
              <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
<svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>
Loading...
</button>
            )}
      </>
         ) : (
          <button type="button" disabled={true} className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
             הסתיים
         </button>
         )}
              </div>
              
              <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> reports(report.forget)}>
          <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.forget? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
        </div>
                </div>
                <div className='flex items-center justify-end space-x-2.5'>
                  <div className='text-right font-mono dark:text-[#ccc]'>{report.total}</div>
                  <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>סה"כ <span className='hidden etc:inline'>שעות</span></h1>
                </div>
                </div>
              </div>
              ))}
            </div>
           <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
           <div className='hidden xru:flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
          
              <h1 className='font-mono '>מס' רשומות {data?.data.totalElements}</h1>
           </div>
        <Pagination
          count={data?.data.totalPages}
          page={page + 1}
          onChange={(event, value) => {setPage(value - 1)
          setTimeout(()=> {
              refetch()
          }, 250)}}
          color="primary"
          variant="outlined"
          size='medium'
          shape="rounded"
          disabled={data?.data.totalPages === 1}
          sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}
          renderItem={(item) => {
            switch (item.type) {
              case 'previous':
                return (
                  <PaginationItem
                    {...item}
                    onClick={handlePrevClick}
                    disabled={page + 1 === 1}
                    style={{ backgroundColor: globalTheme == "light" && windowWidth > 766 ? 'white' : '#3b82f6', color: globalTheme == "light" && windowWidth > 766 ? 'gray' : 'white' }}

                  />
                );
              case 'next':
                return (
                  <PaginationItem
                    {...item}
                    onClick={handleNextClick}
                    disabled={page + 1 === data?.data.totalPages}
                    style={{ backgroundColor: globalTheme == "light" && windowWidth > 766 ? 'white' : '#3b82f6', color: globalTheme == "light" && windowWidth > 766 ? 'gray' : 'white' }}

                  />
                );
              default:
                return <PaginationItem {...item} />;
            }
          }}
        />
               
           </nav>
       </div>
   </div>
        </>
      )}
           
          </div>
        )}

        <Dialog open={open}>
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>האם למחוק את הצעת המחיר</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={deleteQuote}>מחק</button>
        </div>
        {/* </DialogActions> */}
    </Dialog>

    <Snackbar open={deleteAlert} autoHideDuration={10000} onClose={handleDeleteAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleDeleteAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
                  הצעת מחיר נמחקה בהצלחה
        </Alert>
      </Snackbar>

      <Dialog open={openUpdate}>
      <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setIsOpenUpdate(false)}/>
        </div>
        <h1 className={`text-center ${hebrew ? "font-serif text-slate-600 text-3xl" : "font-mono text-amber-700 text-3xl"}`}>{hebrew ? "update quote" : "עדכן הצעת מחיר"}</h1>
        <DialogContent>
        <form id="myform" onSubmit={printValues} className='flex space-x-4 p-6'>
                <div className='flex flex-col space-y-2'>
                {hebrew ? (
                  <>
                <TextField type="text" label="product" defaultValue={quote?.item} className='bg-white rounded-md px-2 py-2' onChange={e => setItem(e.target.value)}/>

                  </>
                ) : (
                  <>
                  <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
    <div dir="rtl">
                <TextField type="text" label="מוצר" defaultValue={quote?.item} className='bg-white rounded-md px-2 py-2' onChange={e => setItem(e.target.value)}/>
                </div>
  </ThemeProvider>
</CacheProvider>
                  </>
                )}
                {/* <InputLabel id="demo-simple-select-label" className='text-right'>שם עובד/ת (לא ניתן לערוך)</InputLabel> */}
               {hebrew ? (
                <>
                <TextField type="text" label="price" defaultValue={quote?.price} className='bg-white rounded-md px-2 py-2' onChange={e => setPrice(e.target.value)}/>
              
                </>
               ) : (
                <>
                 <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
  <div dir="rtl">
                <TextField type="text" label="מחיר" defaultValue={quote?.price} className='bg-white rounded-md px-2 py-2' onChange={e => setPrice(e.target.value)}/>
                </div>
                </ThemeProvider>
                </CacheProvider>
                </>
               )}
                  {/* <InputLabel id="demo-simple-select-label" className='text-right'>שעות</InputLabel> */}
                 {hebrew ? (
                  <>
                   <TextField type="text" label="notes" defaultValue={quote?.notes} className='bg-white rounded-md px-2 py-2' onChange={e => setNotes(e.target.value)}/>

                  </>
                 ) : (
                  <>
                   <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
    <div dir="rtl">
                  <TextField type="text" label="הערות" defaultValue={quote?.notes} className='bg-white rounded-md px-2 py-2' onChange={e => setNotes(e.target.value)}/>
                  </div>
  </ThemeProvider>
</CacheProvider>
                  </>
                 )}
                  <button type='submit' className='bg-blue-200 px-2 py-2 mt-2 relative top-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>{hebrew ? "update quote" : "עדכן הצעת מחיר"}</button>
                
                </div>
              </form>
        </DialogContent>
       
    </Dialog>

    <Snackbar open={updateAlert} autoHideDuration={10000} onClose={handleUpdateAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleUpdateAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
                  הצעת מחיר עודכנה בהצלחה
        </Alert>
      </Snackbar>


      <Snackbar open={errorMode} autoHideDuration={20000} onClose={handleClose2} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose2}
          severity="error"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
        </Alert>
      </Snackbar>

      {/* <Dialog open={openAddSupplierQuote} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
      <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeAddSupplierQute}/>
        </div>
        <h1 className='text-center font-mono text-amber-700 text-3xl'>{hebrew ? "Add new Product" : "הכנס מוצר חדש"}</h1>
        {errors == 403 && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error"> יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
  <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
        </div>
        )}
        <DialogContent>
        <form id="myform" onSubmit={postSupplierQuote} className='flex space-x-4 p-6'>
                <div className='flex flex-col space-y-2'>
                 <CacheProvider value={cacheRtl}>
                 <ThemeProvider theme={theme}>
                 <div dir="rtl">
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="text" label="שם מוצר" value={item} className='bg-white rounded-md px-2 py-2 placeholder:text-right text-right' onChange={e => setItem(e.target.value)}/>
                  </div>
                  </ThemeProvider>
                  </CacheProvider>
                  <CacheProvider value={cacheRtl}>
                 <ThemeProvider theme={theme}>
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="text" label="מחיר" value={price} className='bg-white rounded-md px-2 py-2' onChange={e => setPrice(e.target.value)}/>
                  </ThemeProvider>
                  </CacheProvider>
                  <CacheProvider value={cacheRtl}>
                 <ThemeProvider theme={theme}>
                 <div dir="rtl">
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="text" label="הערות" value={notes} className='bg-white rounded-md px-2 py-2' onChange={e => setNotes(e.target.value)}/>
                  </div>
                  </ThemeProvider>
                  </CacheProvider>
                  <button type='submit' disabled={item == "" || price == ""} className='bg-blue-200 px-2 py-1 relative top-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>הכנס</button>
                </div>
              </form>
        </DialogContent>
       
    </Dialog> */}

<Dialog open={openAddSupplierQuote} aria-labelledby="responsive-dialog-title">
      
        {errors == 403 && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error"> יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
  <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
        </div>
        )}
       <div className={`${globalTheme != "light" && 'dark'}`}>
       {hebrew ? (
         <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
         <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
             <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Add new product  
             </h1>
             <form class="space-y-4 md:space-y-6" action="#">
                 <div>
                     <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                     <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                 </div>
                 <div>
                     <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                     <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                 </div>
                 <div>
                     <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                     <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                 </div>
                 <div class="flex items-start">
                     <div class="flex items-center h-5">
                       <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                     </div>
                     <div class="ml-3 text-sm">
                       <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                     </div>
                 </div>
                 <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Add new product  </button>
                 <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                     Already have an account? <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</a>
                 </p>
             </form>
         </div>
     </div>
       ) : (
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 sm:p-8">
            <div className='flex items-center justify-between px-1'>
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeAddSupplierQute}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            <h1 class="text-xl font-bold leading-tight text-gray-900 md:text-2xl dark:text-white">
                הכנס מוצר חדש  
            </h1>
            </div>
            <form class="space-y-4 md:space-y-6" onSubmit={postSupplierQuote}>
                <div>
                <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">שם מוצר</label>
                      </div>                    
                      <input type="text" value={item} name="email" id="email" class="bg-gray-50 text-right placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="מוצר" required="" onChange={e => setItem(e.target.value)}/>
                </div>
                <div>
                <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">מחיר מוצר</label>
                      </div>                    
                      <input type="text" value={price} name="password" id="password" placeholder="מחיר" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={e => setPrice(e.target.value)}/>
                </div>
                <div>
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 text-right dark:text-white">הערות</label>
                    <textarea value={notes} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="...'הוסף הערות במידת הצורך, לדוגמא: מחיר למוצר מחברה ספציפית, מחיר למינימום הזמנה וכו" onChange={(e)=> setNotes(e.target.value)}></textarea>                    
                </div>
                <div class="flex items-end">
                <div class="mr-3 text-sm">
                      <label for="terms" class="font-light text-gray-500 dark:text-gray-300"> <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">  נווט לתזכורות מחירים </a> הפעלת תזכורת </label>
                    </div>
                    <div class="flex items-center h-5">
                      <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    
                </div>
                <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">הכנס מוצר</button>
                {/* <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</a>
                </p> */}
            </form>
        </div>
    </div>
       )}
       </div>
       
    </Dialog>

    <Snackbar open={alert} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          { error }   
     </Alert>
      </Snackbar>

    <Snackbar open={alert2} autoHideDuration={10000} onClose={handleClose3} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose3}
          severity="success"
          sx={{ width: "100%" }}
        >
{hebrew ? 'successfully ended shift' : 'עובד סיים משמרת בהצלחה'}   
     </Alert>
      </Snackbar>


      <Snackbar open={alert1} autoHideDuration={10000} onClose={handleClose1} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose1}
          severity="success"
          sx={{ width: "100%" }}
        >
{hebrew ? 'successfully started shift' : 'עובד התחיל משמרת בהצלחה'}   
     </Alert>
      </Snackbar>
      <Snackbar open={totalAlert} autoHideDuration={10000} onClose={handleClose3} anchorOrigin={{vertical: 'bottom', horizontal: 'middle'}}>
        <Alert
          onClose={handleClose3}
          severity="success"
          sx={{ width: "100%" }}
        >
{hebrew ? ' total hours ' + total : ' סה"כ שעות ' + total}   
     </Alert>
      </Snackbar>

      <Dialog open={noteAlert}>
        
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">

    {/* <!-- Modal content --> */}
    <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
    {hebrew ? (
      <div>
        <div className='flex items-center justify-end p-2'>
        <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal" onClick={()=> setNoteAlert(false)}>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
        </button>        
        </div>
      <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>the worker forget to clock out</h1>
      </div>
    ) : (
      <div>
        <div className='flex items-center justify-end p-2'>
        <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal" onClick={()=> setNoteAlert(false)}>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
        </button>        </div>
      <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>העובד שכח לעשות יציאה, המערכת הוציאה אותו באופן אוטומטי</h1>
      </div>
    )}  
    {hebrew ? (
          <>
          <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this note?</p>
        <div class="flex justify-center items-center space-x-4">
            <button data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={()=> setNoteAlert(false)}>
                No, cancel
            </button>
            <button type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" >
                Yes, I'm sure
            </button>
        </div>
          </>
        ) : (
          <>
          <p class="mb-4 text-gray-500 dark:text-gray-300">?האם למחוק את ההערה</p>
        <div class="flex justify-center items-center space-x-4">
            <button data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={()=> setNoteAlert(false)}>
               לא למחוק
            </button>
            <button type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" >
                כן, למחוק
            </button>
        </div>
          </>
        )}
        
    </div>
</div>
</Dialog>

<Dialog open={openDialog}>
      <div className='w-full py-6 px-8 flex flex-col justify-center items-center'>
      {/* <div className='flex items-center justify-end p-2'> */}
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer self-end' fontSize='large' onClick={closeDialog}/>
      {/* </div> */}
        <h1 className='text-center font-mono text-amber-700 text-3xl'>הדפס דו"ח שעות</h1><br></br>
        
        <DialogContent>
        <form onSubmit={clocksByMonth} className='flex space-x-4'>
                <div className='flex flex-col space-y-1'>
                 
                    <InputLabel id="demo-simple-select-label" className='text-right w-64'>חודש</InputLabel>
                    <Select className='bg-white rounded-md px-2 text-right' 
                      onChange={handleMonths} 
                      value={month}>
            {months.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select>
                    <InputLabel id="demo-simple-select-label" className='text-right w-64' >שנה</InputLabel>
                    <Select 
                      onChange={handleYears}
                      value={year} 
                      className='bg-white rounded-md px-2 text-right'>
                    {years.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select>
              <button type='submit' disabled={(year == "" || month == "") } className='bg-blue-700 px-2 py-1 font-mono text-white hover:bg-blue-600 hover:text-gray-100 font-semibold rounded-lg mt-2 relative top-3'>הדפס דו"ח שעות</button>
                </div>
              </form>
        </DialogContent>
      </div>
      
    </Dialog>
    </section>
  )
}

export default WorkerClock