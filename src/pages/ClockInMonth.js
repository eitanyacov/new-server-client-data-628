import React, { useState, useEffect, useContext, useRef } from 'react';
import { useQuery } from 'react-query'
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent,  Select, MenuItem, InputLabel, Snackbar, Alert } from '@mui/material'
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import ReactToPrint  from 'react-to-print';
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import CircularProgress from '@mui/material/CircularProgress';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { PaginationItem } from '@mui/material';
// import { styled } from '@mui/material/styles';
import { ThemeContext } from "../App";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';


const ClockInMonth = () => {
    const [flag, setFlag] = useState(false);
    const [action, setAction] = useState(false);
    const [page, setPage] = useState(0);
    const [isSSR, setIsSSR] = useState(true);
    const [errorRes, setErrorRes] = useState([]);
    const [errors, setErrors] = useState()
    const [error, setError] = useState("")
    const [workers, setWorkers] = useState([]);
    // const [clocks, setClocks] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [loading, setLoading] = useState(false)
    const [workerFullName, setWorkerFullName] = useState("")
    const [alert1, setAlert1] = useState(false)
    const [alert2, setAlert2] = useState(false)
    const [workerId, setWorkerId] = useState();
    const [total, setTotal] = useState();
    const [totalAlert, setTotalAlert] = useState(false);
    const [monthNumber, setMonthNumber] = useState(0);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [dialog, setDialog] = useState(false)
    const [dateMode, setDateMode] = useState(false)
    // const [totalElements, setTotalElemnts] = useState();
    // const [totalPages, setTotalPages] = useState();
    const [alert, setAlert] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [noteAlert, setNoteAlert] = useState(false)


    const { hebrew, globalTheme } = useContext(ThemeContext)

    const componentRef = useRef();

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1;

  const lastYear = new Date().getFullYear() -1
  const lastTwoYear = new Date().getFullYear() -2

  const years = [currentYear, lastYear, lastTwoYear]  

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    console.log(window.innerHeight)
    console.log(window.innerWidth)
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);  
  }, [windowHeight, window.innerHeight, windowWidth, window.innerWidth]);

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
  
      const getData = () => {
        const id = result?.id
        return axios.get(`https://nartina.com/api/user/get-user-clocks-by-month/${id}/${page}/10/date/${currentMonth}/${currentYear}`)
      }
      
      const {data, refetch} = useQuery('clocks-in', ()=> getData(),
        {
          // enabled: !!supplier?.name,
          // staleTime: 300000
          refetchOnMount: false,
          refetchOnWindowFocus:false
     
        })
        


        const handleMonths = (e) => {
          setMonth(e.target.value)
          getMonthInHebrew(e.target.value)
        }

        const handleYears = (e) => {
          setYear(e.target.value)
          }

        
    const getWorkers = () => {
        axios.get(`https://nartina.com/api/user/all-workers/${result?.id}`)
        .then(res => setWorkers(res.data))
        .catch(err => console.log(err))
      }

      const totalHours = (e) => {
        e.preventDefault();
        axios.get(`https://nartina.com/api/user/parse-sum/${workerId}`)
        .then(res => {setTotal(res.data)
          setOpenDialog2(false)
          setWorkerFullName("")
          setTotalAlert(true)
        console.log(res.data)})
        .catch(err => console.log(err))
        .finally(setOpenDialog2(false))
        setWorkerFullName("")

        
      }

      const handleChangeRoster = (e) => {
        console.log("the value is: " + e.target.value);
        setWorkerFullName(e.target.value)
        const selectedOption = e.target.options[e.target.selectedIndex];
        const myValue = selectedOption.getAttribute("data-my-value");
        setWorkerId(myValue)
        console.log("Selected value: " + myValue);
        
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

      const openForm = () => {
        getWorkers()
        setTimeout(()=> {
          setOpenDialog(true)
        }, 300)
      }


      const closeFormValidation = () => {
        setOpenDialog2(false)
        setOpenDialog(false)
        setWorkerFullName("")
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
          setOpenDialog(false)
          setAlert1(true)
          setWorkerFullName("")
          refetch()})
        .catch(err => {console.log(err.response.data)
        setError(err.response.data)})
        .finally(setLoading(false))
        setWorkerFullName("")

      }

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

      const handleClose = () => {
        setAlert(false)
      }

      const handleClose1 = () => {
          setAlert1(false)
      }

      const handleClose2 = () => {
        setAlert2(false)
      }

      const handleClose3 = () => {
        setTotalAlert(false)
      }

      const closeDialog = () => {
        setDialog(false)
        // setMonth("")
        // setYear("")
        // setMonthNumber(0)
      }

      // const getByDate = (e) => {
      //   e.preventDefault();
      //   axios.get(`https://nartina.com/api/user/get-user-clocks-by-month/${result?.id}/${page}/1/date/${monthNumber}/${year}/`)
      //   .then(res => {console.log(res.data)
      //     setClocks(res.data.content)
      //     setTotalElemnts(res.data.totalElements)
      //     setTotalPages(res.data.totalPages)
      //     setDateMode(true)
      //    closeDialog()})
      //   .catch(err => console.log(err.response.data))
      // }

      const getDataByDate = () => {
        const id = result?.id
        return axios.get(`https://nartina.com/api/user/get-user-clocks-by-month/${id}/${page}/10/date/${monthNumber}/${year}`)
      }
      
      const {data: date, refetch: refDate} = useQuery('clocks-date', ()=> getDataByDate(),
        {
          // enabled: !!supplier?.name,
          enabled: false,
          // staleTime: 300000
          refetchOnMount: false,
          refetchOnWindowFocus:false
     
        }) 


        const getByDate = (e) => {
          e.preventDefault();
          refDate()
          setDateMode(true)
          setDialog(false)
          setAction(false)
        }

        const handlePrevClick1 = () => {
          setPage((prevPage) => prevPage - 1);
          setTimeout(()=> {
            refDate()
          }, 250)
        };
        
        const handleNextClick1 = () => {
          setPage((prevPage) => prevPage + 1);
          setTimeout(()=> {
            refDate()
          }, 250)
        };

       const goBack = () => {
          setDateMode(false)
          setMonth("")
          setYear("")
          setMonthNumber(0)
       }

       const reports = (bool) => {
          if(bool) {
            setNoteAlert(true)
          }
       }
      
  return (
    <section class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${globalTheme != "light" && "bg-gray-700 dark"}`}>

{flag && (
  <>
  <div className='flex justify-between items-center p-1'>
  <div></div>
   <ReactToPrint
    trigger={() => {
      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
      // to the root node of the returned component as it will be overwritten.
      return <a href="#">
              <div className="flex items-center justify-center">
              <div className="flex items-center justify-center space-x-1 bg-blue-200 hover:bg-blue-300 rounded-md px-2 py-[2px] w-fit" onClick={()=> setFlag(false)}>
              <h1 className="font-mono text-blue-600 font-semibold">{hebrew ? "Print" : "הדפס"}</h1>
              <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-4'/> 
              </div>
              </div>
      </a>;
    }}
    content={() => componentRef.current}
    documentTitle='הצעת מחיר'
  />
  <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={()=> setFlag(false)}>
      <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600'/>
    </div>
    </div>
  <div className='overflow-y-scroll scrollbar max-h-[500px]'>
  <table  ref={componentRef} className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
<thead className="bg-gray-50">
  <tr>
  <th scope="col" className="px-4 text-center py-2">סה"כ</th>
        <th scope="col" className="px-4 text-center py-2">יציאה</th>
        <th scope="col" className="px-4 text-center py-2">כניסה</th>
        <th scope="col" className="px-4 text-center py-2">ת.ז</th>
        <th scope="col" className="px-4 text-center py-2">שם עובד</th>
        <th scope="col" className="px-4 text-center py-2">תאריך</th>
  </tr>
</thead>
<tbody className="divide-y divide-gray-200">
{date?.data?.content.map((report, index) => (
   <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} dark:text-[#ccc] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
    <td scope="col" className="px-4 text-center py-2">{report.total}</td>
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
  </>
)}
  {isSSR ? (
    <LinearProgress />
  ) : (
    <>
  {hebrew ? (
      <>
      <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">

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
                  alert()}}>
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
              <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> alert(true)}>
              
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
        <div className="inline-flex text-xs leading-5 bg-blue-200 hover:bg-blue-300 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> alert(report.id)}>
         <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
        </div>
      </td>
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className="inline-flex text-xs leading-5 bg-red-200 hover:bg-red-300 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> alert(report.id)}>
         <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
        </div>
      </td>
    </tr>
  ))}
              </tbody>
          </table>
      </div>
      <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
     <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
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
  {!dateMode ? (
    <>
    <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">
 
 <div class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
     <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
         
         <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
             <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={openForm}>
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
                      </div> */}
                      <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setDialog(true)}>
                       <CalendarMonthIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                       <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
                     </div>
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

                 <div className='relative top-1 right-2' onClick={()=> {setDialog(true)
                setFlag(!flag)}}>
                   <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-5 -mt-2'/>
                 </div>
                 <CalendarMonthIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 relative top-[1px] right-2' onClick={()=> {setOpenDialog2(true)
                getWorkers()}}/>
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
   
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap" >
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
          <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.forget ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
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
     <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
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
  ) : (
    <>
    <div class={`mx-auto ${flag && 'hidden'} max-w-screen-5xl px-4 lg:px-2 h-4/5`}>
 
 <div class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
     <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
         
         <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
             <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={goBack}>
                 חזרה 
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
                      </div> */}
                      <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> {setDialog(true)
                      setAction(false)}}>
                       <CalendarMonthIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                       <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
                     </div>
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

                 <div className='relative top-1 right-2' onClick={()=> setFlag(!flag)}>
                   <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-5 -mt-2'/>
                 </div>
                 <CalendarMonthIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 relative top-[1px] right-2' onClick={()=> {setOpenDialog2(true)
                getWorkers()}}/>
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
     <div class="overflow-x-auto">
         <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
             <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
     <tr>
    <th scope="col" className="px-4 text-center py-2">יציאה</th>
    <th scope="col" className="px-4 text-center py-2">הערות</th>
    <th scope="col" className="px-4 text-center py-2">סה"כ</th>
    <th scope="col" className="px-4 text-center py-2">יציאה</th>
    <th scope="col" className="px-4 text-center py-2">כניסה</th>
    <th scope="col" className="px-4 text-center py-2">ת.ז</th>
    <th scope="col" className="px-4 text-center py-2">שם עובד</th>
    <th scope="col" className="px-4 text-center py-2">תאריך</th>
                 </tr>
             </thead>
             <tbody>
             {date?.data.content.map((report, index) => (
   <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
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
        <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> alert(report.id)}>
          <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${"" != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
        </div>
    </td>
    <td scope="col" className="px-4 text-center py-2">{report.total}</td>
    <td scope="col" className="px-4 text-center py-2">{report.end}</td>
    <td scope="col" className="px-4 text-center py-2">{report.start}</td>
    <td scope="col" className="px-4 text-center py-2">{report.name}</td>
    <td scope="col" className="px-4 text-center py-2">{report.idNumber}</td>
    <th scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.date.substring(0, 10)}</th>
    </tr>
  ))}
             </tbody>
         </table>
     </div>
     <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
     <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
        <h1 className='font-mono '>מס' רשומות {date?.data.totalElements}</h1>
     </div>
  <Pagination
    count={date?.data.totalPages}
    page={page + 1}
    onChange={(event, value) => {setPage(value - 1)
    setTimeout(()=> {
      refDate()
    }, 250)}}
    color="primary"
    variant="outlined"
    size='medium'
    shape="rounded"
    disabled={date?.data.totalPages === 1}
    sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}
    renderItem={(item) => {
      switch (item.type) {
        case 'previous':
          return (
            <PaginationItem
              {...item}
              onClick={handlePrevClick1}
              disabled={page + 1 === 1}
              style={{ backgroundColor: globalTheme == "light" ? 'white' : '#3b82f6', color: globalTheme == "light" ? 'gray' : 'white' }}

            />
          );
        case 'next':
          return (
            <PaginationItem
              {...item}
              onClick={handleNextClick1}
              disabled={page + 1 === date?.data.totalPages}
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
  )}
  </>
)}
    </>
  )}

<Dialog open={openDialog}>
    <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full `}>

    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeFormValidation}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                       כניסה
                </h3>
                </div>
            </div>
            {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}</Alert>
          <CloseIcon className='text-red-500 cursor-pointer hover:scale-125 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/>
        </div>}
        {errors == 403 && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">יש לעשות יציאה ולהרשם שוב מטעמי בטיחות  
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>

</Alert>
        </div>}
            <form onSubmit={startShift}>
                <div class="grid gap-4 mb-4 grid-cols-1">
                
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר עובד</label>
                      </div>     
                      <select value={workerFullName} name='type' onChange={handleChangeRoster} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">בחר עובד</option>
                              {workers.map(worker => (
                              <option className='text-right' value={worker.fullName} data-my-value={worker.id}>{worker.active && worker.fullName}</option>
                              ))}
                          </select>
                    </div>
                  
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeFormValidation}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                   כניסה 
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
                </div>
            </form>
        </div>
    </div>
</div>
</Dialog>

<Dialog open={openDialog2}>
<div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full `}>

<div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeFormValidation}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div className='flex items-center justify-end space-x-1'>
                    
            <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                   חישוב סה"כ שעות
            </h3>
            </div>
        </div>
        {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
      <Alert severity="error">{errorRes}</Alert>
      <CloseIcon className='text-red-500 cursor-pointer hover:scale-125 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/>
    </div>}
    {errors == 403 && <div className='flex items-center justify-center text-center'>
      <Alert severity="error">יש לעשות יציאה ולהרשם שוב מטעמי בטיחות  
      
        <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>

</Alert>
    </div>}
        <form onSubmit={totalHours}>
            <div class="grid gap-4 mb-4 grid-cols-1">
            
                <div>
                <div className='flex justify-end items-center space-x-1'>
                    <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                    <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר עובד</label>
                  </div>     
                  <select value={workerFullName} name='type' onChange={handleChangeRoster} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option selected="">בחר עובד</option>
                          {workers.map(worker => (
                          <option className='text-right' value={worker.fullName} data-my-value={worker.id}>{worker.active && worker.fullName}</option>
                          ))}
                      </select>
                </div>
              
            </div>
            <div className='flex w-full items-center justify-end space-x-4'>
            <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeFormValidation}>
                    <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                    בטל
            </div>
            {!loading ? (
          <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               חישוב 
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
            </div>
        </form>
    </div>
</div>
</div>
</Dialog>


<Dialog open={dialog}>
      <div className='w-full py-6 px-10 flex flex-col justify-center items-center'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer self-end relative left-4 bottom-1' fontSize='large' onClick={closeDialog}/>
      <h1 className={`text-center sm:text-3xl ${hebrew ? "font-serif text-slate-600 text-2xl" : "text-gray-700 font-medium text-2xl"} px-2`}>{hebrew ? "select month and a year" : "בחר חודש ושנה"}</h1>
        <DialogContent>
        <form onSubmit={getByDate} className='flex space-x-4'>
                <div className='flex flex-col space-y-1'>
          
                    <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"} w-64`}>{hebrew ? "month" : "חודש"}</InputLabel>
                    <Select className='bg-white text-right rounded-md px-2' 
                      onChange={handleMonths} 
                      value={month}>
            {months.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select>
                    <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"} w-64`} >{hebrew ? "year" : "שנה"}</InputLabel>
                    <Select 
                      onChange={handleYears}
                      value={year} 
                      className='bg-white text-right rounded-md px-2'>
                    {years.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select>
                    
                  <button type='submit' disabled={month == "" || year == ""} className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg relative top-4'>{hebrew ? "check amount" : "בדוק סכום"}</button>
                  
                </div>
              </form>
        </DialogContent>
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


<Snackbar open={alert1} autoHideDuration={10000} onClose={handleClose1} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose1}
          severity="success"
          sx={{ width: "100%" }}
        >
{hebrew ? 'successfully started shift' : 'עובד התחיל משמרת בהצלחה'}   
     </Alert>
      </Snackbar>


      <Snackbar open={alert2} autoHideDuration={10000} onClose={handleClose2} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose2}
          severity="success"
          sx={{ width: "100%" }}
        >
{hebrew ? 'successfully ended shift' : 'עובד סיים משמרת בהצלחה'}   
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
            {/* {note != "" && (
              <>
              <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal" onClick={()=> setNoteAlert(false)}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            {hebrew ? (
              <>
              <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this note?</p>
            <div class="flex justify-center items-center space-x-4">
                <button data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={()=> setNoteAlert(false)}>
                    No, cancel
                </button>
                <button type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={deleteNotes}>
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
                <button type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={deleteNotes}>
                    כן, למחוק
                </button>
            </div>
              </>
            )}
              </>
            )} */}
        </div>
    </div>
    </Dialog>
    </section>
  )
}

export default ClockInMonth