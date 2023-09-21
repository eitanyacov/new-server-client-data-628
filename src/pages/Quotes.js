import React, { useState, useEffect, useContext } from 'react';
import { Snackbar, Alert } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom'
// import { Select, MenuItem, InputLabel} from '@mui/material'
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PrintIcon from '@mui/icons-material/Print';
import fileDownload from 'js-file-download';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import { ThemeContext } from "../App";
import axios from 'axios';
import { useQuery } from 'react-query'




const Quotes = () => {
    const [user, setUser] = useState({})
    const [isSSRE, setIsSSRE] = useState(true);
    const [isSSR, setIsSSR] = useState(true);
    const [open, setIsOpen] = useState(false)
    const [id, setId] = useState();
    const [ide, setIde] = useState();
    const [pdfFile, setPdfFile]=useState(null);
    const [customer, setCustomer] = useState({})
    // const [isPermanentModel, setIsPermanentModel] = useState();
    const [active, setActive] = useState();
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [customers, setCustomers] = useState([])
    const [field, setField] = useState("")
    const [error, setError] = useState("")
    const [errorMode, setErrorMode] = useState(false)
    const [windowHeight, setWindowHeight] = useState(0);
    const [xxx, setXxx] = useState(false)
    const [scroll, setScroll] = useState(false)
    const [action, setAction] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0);


    const location = useLocation()
    const navigate = useNavigate()

    const { hebrew, globalTheme } = useContext(ThemeContext)


    const screen = window.screen.availWidth
    // const screenHeight = window.screen.availHeight

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

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

    const getData = () => {
      const id = result?.id
      return axios.get("https://nartina.com/api/file/all-quotes/" + id)
    }
    
    const {data} = useQuery('quotes', ()=> getData(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: true,
        refetchOnWindowFocus:false
   
      }) 

      useEffect(() => {
        setTimeout(() => {
          setIsSSR(false);
        }, 200)
        
      }, []);

      useEffect(()=> {
        setCustomers(data?.data)
    }, [data?.data])

    useEffect(() => {
      setTimeout(()=> {
        setXxx(true)
      }, 1000)
    })
  

    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
        // getSuppliers()
        
    }, [])

    useEffect(() => {
      if(error == 403) {
        setErrorMode(true)
      }
      
    }, [errorMode, error]);

    useEffect(() => {
      setTimeout(() => {
        setIsSSRE(false);
      }, 1200)
      
    }, [isSSRE]);

    


      const deleteInvoice = () => {
        axios.delete("https://nartina.com/api/file/delete-quote/" + id, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        })
          .then(res => {console.log(res.data)
          window.location.reload()})
          .catch(err => {console.log(err)
            setError(err.response.status)})
      }

      const handleClose2 = () => {
        setErrorMode(false)
        setError("")
      }




      const printQuote = (id) => {
        let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
        axios.get("https://nartina.com/api/file/pdf/generate/" + id + "/" + user?.id, {
            responseType: 'blob',
          }).then(res => {
            fileDownload(res.data, filename + ".pdf");
          });
      }

      const deleteQuote = (id) => {
        setId(id)
        setIsOpen(true)
      }

   
      
  return (
         <>
        <section class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${globalTheme != "light" && "bg-gray-700 dark"}`}>
        {hebrew ? (
          <>
          <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5 ">

        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
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
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button type="button" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" onClick={()=> navigate('/add-quote')}>
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add Quote
                    </button>
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
                </div>
            </div>
            <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
              <th scope="col" className="px-1 text-center py-2">customer name</th>
              <th scope="col" className="px-1 text-center py-2">quote date</th>
              <th scope="col" className="px-1 text-center py-2">quote number</th>
              <th scope="col" className="px-1 text-center py-2">quote amount</th>
              <th scope="col" className="px-1 text-center py-2">print quote</th>
              <th scope="col" className="px-1 text-center py-2">delete quote</th>
              <th scope="col" className="px-1 text-center py-2">details</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data?.map((report, index) => (
              <tr key={customer.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
              <td scope="col" className="px-1 text-center py-2 text-md font-semibold text-[#333] dark:text-[#ccc] font-mono">{report.customerName}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono">{report.date}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono">{report.quoteId}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono">{Number(report.amount).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> printQuote(report.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
              </td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> deleteQuote(report.id)}>
                <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              </td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/quotes/${report?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'>quote details</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[12px]'>details</h1>
              </div>
            </td>             
              </tr>
            ))}
                    </tbody>
                </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                {/* <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
                    of
                    <span class="font-semibold text-gray-900 dark:text-white">1000</span>
                </span> */}
                <div></div>
                <ul class="inline-flex items-stretch -space-x-px">
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    {/* <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li> */}
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Next</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
          </>
        ) : (
          <>
        <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5 ">

        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> navigate('/add-quote')}>
                       הכנס הצעת מחיר
                   </button>
                   <div class="flex items-center space-x-3 w-full md:w-auto relative">
                       <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                           <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                           אפשרויות
                       </button>
                       {/* <div class={`${!action && 'hidden'} p-4 z-10 w-44 absolute top-10 flex flex-col space-y-1 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setFlag(!flag)}>
                              <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                              <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Print</h1>
                            </div>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setOpenDailyIncomeReport(true)}>
                             <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                             <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
                           </div>
                       </div> */}
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
                       {/* <a href="https://tofes101.co.il/assets/forms/tofes-101.pdf" target="_blank">
                  <div className='bg-blue-500 hover:bg-blue-400 dark:bg-blue-600 rounded px-2 py-[1px] text-white text-sm'>
                    <h1 className='text-white font-mono tracking-wide'>טופס 101</h1>
                  </div>
                 </a> */}
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
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
          <th scope="col" className="px-1 text-center py-2">פרטי הצעת מחיר</th>
          <th scope="col" className="px-1 text-center py-2">מחק הצעה</th>
          <th scope="col" className="px-1 text-center py-2">הדפס הצעה</th>
          <th scope="col" className="px-1 text-center py-2">סכום הצעה</th>
          <th scope="col" className="px-1 text-center py-2">מספר הצעת מחיר</th>
          <th scope="col" className="px-1 text-center py-2">תאריך הצעה</th>
          <th scope="col" className="px-1 text-center py-2">שם לקוח</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data?.map((report, index) => (
                <tr key={customer.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
                <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 py-2 px-0 rounded-lg cursor-pointer" onClick={()=> navigate(`/quotes/${report?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[10px]'>פרטי הצעה</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[12px]'>פרטים</h1>
              </div>
            </td>
             <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> deleteQuote(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> printQuote(report.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
          <td scope="col" className="px-1 text-center py-2 text-md">{Number(report.amount).toLocaleString()}</td>
          <td scope="col" className="px-1 text-center py-2 text-md">{report.quoteId}</td>
          <td scope="col" className="px-1 text-center py-2 text-md">{report.date}</td>
          <th scope="col" className="px-1 text-center py-2 dark:text-[#ccc]">{report.customerName}</th>
          </tr>
        ))}
                    </tbody>
                </table>
            </div>
            <div className='grid grid-cols-1 gap-3 md:hidden px-4 py-2 dark'>
              {data?.data.map(receipt => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} p-2 flex flex-col space-y-1`}>
                <div className="p-4 blue-glassmorphism hover:bg-gray-900 shadow rounded flex flex-col space-y-1">

                <div className='flex items-center justify-end space-x-2 text-sm'>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.customerName}</div>
                <div className='text-right text-[#333] text-lg dark:text-[#ccc]'>שם לקוח</div>
                </div>
                </div>
                <div className='flex items-center justify-end space-x-2 text-sm'>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.date}</div>
                <div className='text-right text-[#333] text-lg dark:text-[#ccc]'>תאריך הצעה</div>
                </div>
                </div>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.quoteId}</div>
                <div className='text-right dark:text-[#ccc]'>מספר הצעה</div>
                </div>
                <div className='flex items-center justify-end space-x-1.5 xxj:hidden '>
                  <h1 className='dark:text-[#ccc] font-mono text-2xl font-semibold'><span className='font-sans text-sm'>₪</span>{Number(receipt.amount).toLocaleString()}</h1>
                  <h1 className='text-[#333] dark:text-[#ccc] text-lg'>סכום</h1>
                </div>
                
                <div className='flex items-center justify-end xxj:justify-between space-x-4 relative top-1'>
                <div className='hidden xxj:flex items-center justify-center space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(receipt.amount).toLocaleString()}</h1>
                  <h1 className='text-[#333] dark:text-[#ccc]'>סכום</h1>
                </div>
                <div className='flex items-center justify-center space-x-5'>
                <div className="flex justify-center items-center bg-gray-300 dark:bg-slate-600 hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer" onClick={()=> navigate(`/quotes/${receipt?.id}`)}>
                <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'>פרטי הצעת מחיר</h1>
              </div>
              
            <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> deleteQuote(receipt.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 dark:text-red-500'/>
              </div>
            <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> printQuote(receipt?.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
                </div>
              
                </div>
              </div>
              ))}
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                {/* <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
                    of
                    <span class="font-semibold text-gray-900 dark:text-white">1000</span>
                </span> */}
                <div></div>
                <ul class="inline-flex items-stretch -space-x-px">
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    {/* <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li> */}
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Next</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
          </>
        )}

      </section>


         {/* {isSSR ? (
        <LinearProgress />
      ) : (
        <>
        
        <div className='overflow-y-scroll scrollbar pr-[6px] overflow-x-auto h-full'>
        <div className='flex items-center justify-between bg-white px-4 z-10 sticky top-0 py-1'>
          <button
        type="button"
        class="inline-block rounded bg-blue-500 px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init
        data-te-ripple-color="light"
        onClick={()=> navigate('/add-quote')}>
        הכן הצעת מחיר 
      </button>
            <div className='flex flex-col items-end'>
             
              <h1 className='font-bold text-[#373D3F] text-xl tracking-wide'>הצעות מחיר</h1>
              <h1 className='text-gray-500 text-sm tracking-wide'>ניתן להכין הצעות מחיר ללקוחות</h1>
            </div>
          </div>
        {hebrew ? (
          <table className="min-w-full divide-y border-[#ccc] border-b-2 divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
          <thead className="bg-sky-700 sticky top-0 z-50">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">customer name</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">quote date</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">quote number</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">quote amount</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">print quote</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">delete quote</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">details</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.data?.map((report, index) => (
              <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''} hover:bg-blue-50`}>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-md font-semibold text-[#333] font-mono">{report.companyName}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono font-semibold text-blue-800">{report.date}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono">{report.quoteId}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono">{report.amount}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> printQuote(report.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
              </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> deleteQuote(report.id)}>
                <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/quotes/${report?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[10px]'>quote details</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 font-semibold text-[12px]'>details</h1>
              </div>
            </td>             
            <td scope="col" className="px-1 text-center py-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <table className="min-w-full divide-y border-[#ccc] border-b-2 divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
      <thead className="bg-sky-700 sticky top-0 z-50">
        <tr>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">פרטי הצעת מחיר</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מחק הצעה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הדפס הצעה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סכום הצעה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מספר הצעת מחיר</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך הצעה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם לקוח</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data?.data?.map((report, index) => (
          <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''} hover:bg-blue-50`}>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/quotes/${report?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[10px]'>פרטי הצעה</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 font-semibold text-[12px]'>פרטים</h1>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
             <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> deleteQuote(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> printQuote(report.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
          <td scope="col" className="px-1 text-center py-2"></td>
          <td scope="col" className="px-1 text-center py-2 text-md font-mono">{Number(report.amount).toLocaleString()}</td>
          <td scope="col" className="px-1 text-center py-2"></td>
          <td scope="col" className="px-1 text-center py-2 text-md font-mono">{report.quoteId}</td>
          <td scope="col" className="px-1 text-center py-2"></td>
          <td scope="col" className="px-1 text-center py-2 text-md font-mono">{report.date}</td>
          <td scope="col" className="px-1 text-center py-2"></td>         
          <td scope="col" className="px-1 text-center py-2 text-md font-mono font-semibold text-blue-800">{report.companyName}</td>
          <td scope="col" className="px-1 text-center py-2"></td>
          </tr>
        ))}
      </tbody>
    </table>
        )}
    </div>
        </>
      )} */}
      
        <Dialog open={open}>
        {/* <DialogTitle variant='h6'>מחיקת חשבונית</DialogTitle> */}
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>האם למחוק את ההצעה ?</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={deleteInvoice}>מחק</button>
        </div>
        {/* </DialogActions> */}
    </Dialog>

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
      </>
  )
}

export default Quotes