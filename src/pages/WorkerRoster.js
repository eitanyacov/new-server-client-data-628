import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import LinearProgress from '@mui/material/LinearProgress';
import { Dialog, DialogContent, TextField, DialogActions, DialogTitle, } from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
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
import useMediaQuery from '@mui/material/useMediaQuery';
import Swal from 'sweetalert2'



// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});




const WorkerRoster = () => {

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
    const [error, setError] = useState()
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
    const [openDates, setOpenDates] = useState(false);
    const [date1, setDate1] = useState("")
    const [date2, setDate2] = useState("")
    const [rosters, setRosters] = useState([])

    const { workerId } = useParams()
    // const navigate = useNavigate()
    // const screen = window.screen.availWidth
    // const screenHeight = window.screen.availHeight
    const componentRef = useRef();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


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
      resizeWindow();
      console.log(window.innerHeight)
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);  
    }, [windowHeight, window.innerHeight, windowWidth, window.innerWidth]);


    const getWorkerRosters = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/worker-rosters-paging/${workerId}/${page}/10/startDate`)
    }
    
    const {data, refetch} = useQuery('worker-rosters', ()=> getWorkerRosters(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: true,
        refetchOnWindowFocus:false
   
      }) 

  
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

      const getDates = (e) => {
        e.preventDefault();
        axios.get("https://nartina.com/api/user/rosters-between-2/" + workerId + "/startDate/0/10/" + date1 + "/" + date2)
        .then(res => {console.log(res.data)
        setRosters(res.data)
        setFlag(true)
        setOpenDates(false)})
        .catch(err => console.log(err))
      }
     
 

  const handleAlert = (id) => {
    setIde(id)
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: true
})

swalWithBootstrapButtons.fire({
  title: '?אתם בטוחים',
  text: "!לא ניצן יהיה לשחזר את הדו''ח",
  icon: 'אזהרה',
  showCancelButton: true,
  confirmButtonText: '!כן מחק',
  cancelButtonText: '!לא למחוק',
  reverseButtons: true
}).then((results) => {
  if (results.isConfirmed) {
    axios.delete("https://nartina.com/api/user/delete-roster/" + ide, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    })
    .then(res => {
    console.log(res.data)
      refetch()
      swalWithBootstrapButtons.fire(
        '!נמחק',
        'הדו"ח נמחק בהצלחה.',
        'success'
      )
      // localStorage.setItem('restaurant', true)
    })
      .catch(err => {console.log(err.response.data)
      swalWithBootstrapButtons.fire(
        'פעולה נכשלה',
        'מצטערים קרתה תקלה יש לנסות שוב :)',
        'error'
      )
      setError(err.response.status)})
  } else if (
    /* Read more about handling dismissals below */
    results.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'בוטל',
      'פעולה בוטלה הדו"ח לא נמחק :)',
      'error'
    )
  }
})
}

    const handleDeleteAlert = () => {
      setDeleteAlert(false)
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

    
    const totalHours = (e) => {
        e.preventDefault();
        axios.get(`https://nartina.com/api/user/parse-sum-roster/${workerId}`)
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

    const handleClose1 = () => {
        setAlert1(false)
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

  return (
    <section class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${globalTheme != "light" && "bg-gray-700 dark"}`}>

      {flag && (
        <>
        <div className='flex justify-between items-center py-1 px-4'>
        <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={()=> setFlag(false)}>
      <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600'/>
    </div>
         <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">
                    <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center space-x-1 bg-blue-700 hover:bg-blue-300 rounded-md px-2 py-[2px] w-fit" onClick={()=> setFlag(false)}>
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
        <div className='overflow-y-scroll scrollbar scrollbar-none max-h-full'>
        <table ref={componentRef} className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
     <tr>
    {/* <th scope="col" className="px-4 text-center py-2">מחק</th>
    <th scope="col" className="px-4 text-center py-2">ערוך</th>
    <th scope="col" className="px-4 text-center py-2">הערות</th> */}
    <th scope="col" className="px-4 text-center py-2">משמרת</th>
    <th scope="col" className="px-4 text-center py-2">סה"כ</th>
    <th scope="col" className="px-4 text-center py-2">סוף משמרת</th>
    <th scope="col" className="px-4 text-center py-2">תחילת משמרת</th>
    <th scope="col" className="px-4 text-center py-2">שם עובד</th>
    <th scope="col" className="px-4 text-center py-2">תאריך</th>
                 </tr>
             </thead>
             <tbody>
             {rosters?.content.map((report, index) => (
   <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `}>
        {report.mode == "בוקר" && (
                  <LightModeIcon className='text-yellow-500'/>
                ) }
                {report.mode == "ערב" && (
                  <NightlightIcon className='text-gray-700 dark:text-gray-800 -rotate-45'/>
                ) }
        </div>
    </td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.total}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.endDate.substring(11)}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.startDate.substring(11)}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.name}</td>
    <th scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.startDate.substring(0, 10)}</th>
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
                        }}>
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
                   {/* <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={startShift}>
                         כניסה
                   </button> */}
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

                       <div className='relative top-1 right-2' onClick={()=> setOpenDates(true)}>
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
    <th scope="col" className="px-4 text-center py-2">מחק</th>
    <th scope="col" className="px-4 text-center py-2">ערוך</th>
    <th scope="col" className="px-4 text-center py-2">הערות</th>
    <th scope="col" className="px-4 text-center py-2">משמרת</th>
    <th scope="col" className="px-4 text-center py-2">סה"כ</th>
    <th scope="col" className="px-4 text-center py-2">סוף משמרת</th>
    <th scope="col" className="px-4 text-center py-2">תחילת משמרת</th>
    <th scope="col" className="px-4 text-center py-2">שם עובד</th>
    <th scope="col" className="px-4 text-center py-2">תאריך</th>
       </tr>
                   </thead>
                   <tbody>
                   {data?.data?.content.map((report, index) => (
   <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
       <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className="inline-flex text-xs leading-5 bg-red-200 hover:bg-red-300 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> handleAlert(report.id)}>
         <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
        </div>
      </td>
      <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className="inline-flex text-xs leading-5 bg-blue-200 hover:bg-blue-300 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> alert(report.id)}>
         <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
        </div>
      </td>
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> alert(report.id)}>
          <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${"" != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
        </div>
    </td>
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `}>
        {report.mode == "בוקר" && (
                  <LightModeIcon className='text-yellow-500'/>
                ) }
                {report.mode == "ערב" && (
                  <NightlightIcon className='text-gray-700 dark:text-gray-800 -rotate-45'/>
                ) }
        </div>
    </td>
    <td scope="col" className="px-4 text-center py-2">{report.total}</td>
    <td scope="col" className="px-4 text-center py-2">{report.endDate.substring(11)}</td>
    <td scope="col" className="px-4 text-center py-2">{report.startDate.substring(11)}</td>
    <td scope="col" className="px-4 text-center py-2">{report.name}</td>
    <th scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.startDate.substring(0, 10)}</th>
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
                  <div className='dark:text-[#ccc]'>{report.startDate.substring(0, 10)}</div>
                  <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>תאריך</h1>
                </div>
                <div className='flex items-center justify-end space-x-2.5'>
               <div className='dark:text-[#ccc]'>{report.name}</div>
               <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>שם עובד</h1>
             </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.startDate.substring(11)}</div>
                <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>התחלת משמרת</h1>
                </div>
                <div className='flex items-center justify-end space-x-2.5'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.endDate.substring(11)}</div>
                <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>סוף משמרת</h1>
                </div>
                <div className='flex items-center justify-end space-x-2.5'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.total}</div>
                <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>סה"כ שעות</h1>
                </div>
                
                <div className='flex items-center justify-end space-x-1'>
                
              
                </div>
                <div className='flex items-center justify-end space-x-4 relative top-1'>
                
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(true)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(report?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
              <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> alert(report.id)}>
          <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${"" != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
        </div>
              <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `}>
        {report.mode == "בוקר" && (
                  <LightModeIcon className='text-yellow-500'/>
                ) }
                {report.mode == "ערב" && (
                  <NightlightIcon className='text-gray-700 dark:text-gray-800 -rotate-45'/>
                ) }
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

        {/* <Dialog open={open}>
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>האם למחוק את הצעת המחיר</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={deleteQuote}>מחק</button>
        </div>
    </Dialog> */}

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

    


    <Dialog open={openDates}>
      
      <div className='flex flex-col justify-center items-center'>
      <DialogActions className='flex justify-between items-center'>
        <DialogTitle className='text-center font-mono' variant='h6'>בחר טווח תאריכים</DialogTitle>
      </DialogActions>
      <form onSubmit={getDates} className='flex flex-col items-center justify-center space-y-4 pb-2 px-4'>
       <TextField onChange={e => setDate1(e.target.value)} type='date' className='h-14'/>
       <TextField onChange={e => setDate2(e.target.value)} type='date' className='h-14'/>
       <div className='flex items-center justify-center space-x-8'>
         <button type='submit' className='bg-blue-200 px-4 py-[2px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' >שלח</button>
         <button className='bg-blue-200 px-4 py-[2px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setOpenDates(false)}>בטל</button>
       </div>
      </form>
      </div>
    
    <div className='flex justify-around items-center pb-2'>
    </div>
</Dialog>

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
    </section>
  )
}

export default WorkerRoster