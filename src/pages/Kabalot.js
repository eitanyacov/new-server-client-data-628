import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PrintIcon from '@mui/icons-material/Print';
import fileDownload from 'js-file-download';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import { Select, MenuItem, InputLabel, TextField} from '@mui/material'
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';

import { ThemeContext } from "../App";
import axios from 'axios';
import { useQuery } from 'react-query'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';




const Receipts = () => {
  const [user, setUser] = useState({})
  const [kabalot, setKabalot] = useState([]);
  const [isSSRE, setIsSSRE] = useState(true);
  const [isSSR, setIsSSR] = useState(true);
  const [id, setId] = useState();
  const [ide, setIde] = useState();
  const [receipt, setReceipt] = useState({})
  const [errorRes, setErrorRes] = useState([]);
  const [supplierType, setSupplierType] = useState("")
  const [receiptId, setReceiptId] = useState("")
  const [amount, setAmount] = useState()
  const [paidOrNo, setPaidOrNo] = useState("")
  const [date, setDate] = useState("")
  const [paid, setPaid] = useState("")
  const [field, setField] = useState("")
  const [tazrim, setTazrim] = useState()
  const [errors, setErrors] = useState()

  const [paymentMethod, setPaymentMethod] = useState("")
  const [receipts, setReceipts] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [open, setIsOpen] = useState(false)
  const [openAlertPayment, setOpenAlertPayment] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [openCancelReceipt, setOpenCancelReceipt] = useState(false)
  const [openReceiptAlert, setOpenReceiptAlert] = useState(false)
  const [isPaid, setIsPaid] = useState("")
  const [currentMonthTaxInvoicesIsTazrim, setCurrentMonthTaxInvoicesIsTazrim] = useState()
  const [totalAmount, setTotalAmount] = useState(false)
  const [error, setError] = useState("")
  const [errorMode, setErrorMode] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0);
  const [scroll, setScroll] = useState(false)
  const [openAddCustomerKabala, setOpenAddCustomerKabala] = useState(false)
  const [kabalaAmount, setKabalaAmount] = useState();
  const [kabalaDate, setKabalaDate] = useState("");
  const [receiptNumber, setReceiptNumber] = useState();
  const [receiptCheckNumber, setReceiptCheckNumber] = useState("");
  const [receiptCheckDate, setReceiptCheckDate] = useState("");
  const [customerDealerLicensed, setCustomerDealerLicensed] = useState("");
  const [customerNameKabala, setCustomerNameKabala] = useState("");
  const [receiptPaymentMethod, setReceiptPaymentMethod] = useState("");



  const { customerId } = useParams();
  const { reload, setCustId, hebrew, globalTheme, custId} = useContext(ThemeContext)

  const navigate = useNavigate()
  const theme = useTheme();
  const themes = createTheme({
    direction: 'rtl',
  });

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const currentMonth = new Date().getMonth() + 1;

  const arr2 = ["מזומן", "צ'ק", "כרטיס אשראי", "העברה בנקאית", "ביט", "אחר", "-"];

  const arr = ["True", "False"];
  const arr3 = ["משתנה", "קבוע", "סחורה"];
  const arr5 = ["מזומן", "צ'ק", "הוראת קבע", "כרטיס אשראי", "העברה בנקאית", "ביט", "אחר", "ארנק דיגיטלי"];

  const screen = window.screen.availWidth
  // const screenHeight = window.screen.availHeight

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)

  let resizeWindow = () => {
    // setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  const getData = () => {
    const id = result?.id
    return axios.get('https://nartina.com/api/user/get-all-customer-kabalot/' + customerId)
  }
  
  const {data, refetch} = useQuery('kabalot', ()=> getData(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: true,
      refetchOnWindowFocus:false
 
    }) 

  useEffect(()=> {
    if(reload) {
      refetch()
    }
}, [reload])

useEffect(() => {
  setTimeout(() => {
    setIsSSR(false);
  }, 200)
  
}, []);

  useEffect(()=> {
    setCustId(customerId)
  }, [customerId])

  useEffect(() => {
    resizeWindow();
    console.log(window.innerHeight)
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);  
  }, [windowHeight, window.innerHeight]);

  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
      // getInvoices()
  }, [user?.id])

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


  const getKabalot = () => {
    axios.get(`https://nartina.com/api/user/get-receipts-by-supplier-per-user/${customerId}`)
    .then(res => {console.log(res.data)
    setKabalot(res.data)})
    .catch(err => console.log(err.response.data))
    .finally(setOpenAddCustomerKabala(true))
  }

  // const getReceipts = () => {
  //   axios.get('https://nartina.com/api/user/get-all-user-kabalot/' + user?.id)
  //   .then(res => setReceipts(res.data))
  //   .catch(err => console.log(err))
  // }



 

  const cancelReceipt = () => {
    axios.get("https://nartina.com/api/user/cancel-kabala/" + ide)
    .then(res => {console.log(res.data)
    setOpenCancelReceipt(false)
    // getReceipts()
    refetch()
    setOpenReceiptAlert(true)})
    .catch(err => console.log(err.response.data))
  }


//   const cellClick = (e) => {
//     if(e.field == 'action') {
//     navigate("/kabala/" + e.id)
//     }

//     if(e.field == 'action3') {
//       setIde(e.id)
//       setOpenCancelReceipt(true)
//     }

const handleCancel = (id) => {
  setIde(id)
  setOpenCancelReceipt(true)
}

 
//     if(e.field == 'action2') {
//       // setIde(e.id)
//       let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
//       axios.get("https://nartina.com/api/file/pdf/generate/kabala/" + e.id + "/" + user?.id, {
//           responseType: 'blob',
//         }).then(res => {
//           fileDownload(res.data, filename + ".pdf");
//         });
     
//   }
    
// }

const print = (id) => {
  // setIde(e.id)
  let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
      axios.get("https://nartina.com/api/file/pdf/generate/kabala/" + id + "/" + user?.id, {
          responseType: 'blob',
        }).then(res => {
          fileDownload(res.data, filename + ".pdf");
        });
     
  }


const handleClose = () => {
  setOpenAlertPayment(false)
}

const handleCloseRecieptAlert = () => {
  setOpenReceiptAlert(false)
}



  const handleCloseAmount = () => {
    setTotalAmount(false)
  }

  const handleClose2 = () => {
    setErrorMode(false)
    setError("")
  }

  const handleChange8 = (e) => {
    console.log("the value is: " + e.target.value);
    setReceiptNumber(e.target.value)
    axios.get("https://nartina.com/api/user/get-receipt/" + custId + "/" + e.target.value)
    .then(res => {console.log(res.data)
    setReceipt(res.data)
    setCustomerDealerLicensed(res.data.customerDealerLicensed)
    setCustomerNameKabala(res.data.customerName)
    setKabalaAmount(res.data.amount)})
    .catch(err => console.log(err.response.data))
  
  }
  
  const handleChange9 = (e) => {
    console.log("the value is: " + e.target.value);
    setReceiptPaymentMethod(e.target.value)
  
  }


  const closeAddCustomerKabala = () => {
    setOpenAddCustomerKabala(false)
    setKabalaAmount("")
    setReceiptNumber("")
    setReceiptCheckDate("")
    setReceiptCheckNumber("")
    setCustomerDealerLicensed("")
    setCustomerNameKabala("")
    setKabalaDate("")
    setReceiptPaymentMethod("")
    setKabalaDate("")
    setErrorRes("")
   
  }

  const postKabala = (e) => {
    e.preventDefault();
    axios.post("https://nartina.com/api/user/add-kabala-to-user/" + result?.id + "/" + custId, {
     amount: kabalaAmount,
     date: kabalaDate,
     customerName: customerNameKabala,
     customerDealerLicensed,
     paymentMethod: receiptPaymentMethod,
     userAddress: user?.address,
     userAddressNumber: user?.addressNumber,
     userAddressCity: user?.city,
     checkNumber: receiptCheckNumber,
     checkDate: receiptCheckDate,
     receiptNumber
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {
      // setReload(true)
      setOpenAddCustomerKabala(false)
      refetch()
      console.log(res.data)
      // setItemQuoteAlert(true)
      // allSupplierQuotes()
    // setOpenIncomeAlert(true)
    closeAddCustomerKabala()
    
    })
    .catch(error => {setErrorRes(error.response.data)
      console.log(error.response.data)
      setErrors(error.response.status)})
    // setReload(false)
  }

  

  return (
    <>
    <section class={`bg-gray-50 ${hebrew ? 'airx:ml-[261px]' : 'airx:mr-64 ml-2'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14`}>
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
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        {/* <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg> */}
                        Add product
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
              <th scope="col" className="px-1 text-center py-2">licensed Dealer</th>
              <th scope="col" className="px-1 text-center py-2">date</th>
              <th scope="col" className="px-1 text-center py-2">receipt number</th>
              <th scope="col" className="px-1 text-center py-2">payment method</th>
              <th scope="col" className="px-1 text-center py-2">amount</th>
              <th scope="col" className="px-1 text-center py-2">canceled</th>
              <th scope="col" className="px-1 text-center py-2">print</th>
              <th scope="col" className="px-1 text-center py-2">cancel</th>
              <th scope="col" className="px-1 text-center py-2">details</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data?.map((report, index) => (
              <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
              <td scope="col" className="px-1 text-center py-2">{report.customerName}</td>
              <td scope="col" className="px-1 text-center py-2">{report.customerDealerLicensed}</td>
              <td scope="col" className="px-1 text-center py-2">{report.date}</td>
              <td scope="col" className="px-1 text-center py-2">{report.kabalaNumber}</td>
              <td scope="col" className="px-1 text-center py-2">{report.paymentMethod}</td>
              <td scope="col" className="px-1 text-center py-2">{report.amount}</td>
              <td scope="col" className="px-1 text-center py-2">{report.isCancel}</td>
              <td scope="col" className="px-1 text-center py-2">
            <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> print(report.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
            <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleCancel(report?.id)}>
               <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 dark:text-red-500'/>
              </div>
            </td>
            
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 py-2 px-1 rounded-lg cursor-pointer" onClick={()=> navigate(`/kabala/${report?.id}`)}>
               <h1 className='text-blue-600 hover:text-blue-700 font-semibold text-[10px]'>receipt details</h1>
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
        <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">
        {/* <!-- Start coding here --> */}
        <div class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={getKabalot}>
                        {/* <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg> */}
                        הכנס קבלה
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
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>     
          <th scope="col" className="px-1 text-center py-2">פרטי קבלה</th>
          <th scope="col" className="px-1 text-center py-2">בטל קבלה</th>
          <th scope="col" className="px-1 text-center py-2">הדפס קבלה</th>
          <th scope="col" className="px-1 text-center py-2">מבוטל</th>
          <th scope="col" className="px-1 text-center py-2">צורת תשלום</th>
          <th scope="col" className="px-1 text-center py-2">סכום קבלה</th>
          <th scope="col" className="px-1 text-center py-2">מספר קבלה</th>
          <th scope="col" className="px-1 text-center py-2">תאריך קבלה</th>
          <th scope="col" className="px-1 text-center py-2">מס' חברה</th>
          <th scope="col" className="px-1 text-center py-2">שם לקוח</th>
        </tr>
                            
                    </thead>
                    <tbody>
                    {data?.data?.map((report, index) => (
           <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
           <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 dark:bg-slate-600 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/kabala/${report?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'>פרטי קבלה</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 font-semibold text-[12px]'>פרטים</h1>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
            <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleCancel(report?.id)}>
               <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 dark:text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
            <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> print(report.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
          <td scope="col" className="px-1 text-center py-2 text-xs text-red-600 font-semibold font-mono">{report.isCancel}</td>
          <td scope="col" className="px-1 text-center py-2">{report.paymentMethod}</td>
          <td scope="col" className="px-1 text-center py-2">{Number(report.amount).toLocaleString()}</td>
          <td scope="col" className="px-1 text-center py-2">{report.kabalaNumber}</td>
          <td scope="col" className="px-1 text-center py-2">{report.date}</td>
          <td scope="col" className="px-1 text-center py-2">{report.customerDealerLicensed}</td>
          <td scope="col" className="px-1 text-center py-2 ">{report.customerName}</td>
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
    )}
    </section>
    {/* <div class={`pl-2 pr-2 mt-1 airx:pr-[1px] grid grid-cols-1 w-full airx:w-[81.5%] xlu:w-[81%] 2xl:w-[80%] 3xl:w-[79%] 4xl:w-[80%] 5xl:w-[81%]  ${hebrew ? 'airx:ml-[243px]' : 'airx:mr-[225px]'} overflow-y-scroll ${scroll ? 'scrollbar' : 'scrollbar-none'} ml-1 h-4/5 lg:h-5/6 fixed`}>

    {isSSR ? (
        <LinearProgress />
      ) : (
        <>
        <div className='overflow-y-scroll scrollbar pr-[6px] overflow-x-auto h-full'>
        {hebrew ? (
          <table className="min-w-full divide-y border-[#ccc] border-b-2 divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
          <thead className="bg-sky-700 sticky top-0 z-50">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">customer name</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">licensed Dealer</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">date</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">receipt number</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">payment method</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">amount</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">canceled</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">print</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">cancel</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">details</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-xs text-white font-mono">|</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.data?.map((report, index) => (
              <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''} hover:bg-blue-50`}>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-md font-semibold text-[#333] font-mono">{report.customerName}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono font-semibold text-blue-800">{report.customerDealerLicensed}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono">{report.date}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono">{report.kabalaNumber}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono">{report.paymentMethod}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono">{report.amount}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm text-red-600 font-semibold font-mono">{report.isCancel}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 rounded-lg cursor-pointer py-1" onClick={()=> alert(report.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
              </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-red-200 rounded-lg cursor-pointer py-1" onClick={()=> alert(report.id)}>
                <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/kabala/${report?.id}`)}>
               <h1 className='text-blue-600 hover:text-blue-700 font-semibold text-[10px]'>receipt details</h1>
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
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">פרטי קבלה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">בטל קבלה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הדפס קבלה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מבוטל</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">צורת תשלום</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סכום קבלה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מספר קבלה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך קבלה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מס' חברה</th>
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
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/kabala/${report?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[10px]'>פרטי קבלה</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 font-semibold text-[12px]'>פרטים</h1>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
             <td scope="col" className="px-1 text-center py-2">
              <div className="flex justify-center items-center bg-red-200 hover:bg-red-300 rounded-lg cursor-pointer py-1" onClick={()=> handleCancel(report.id)}>
               <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2">
              <div className="flex justify-center items-center bg-blue-200 hover:bg-blue-300 rounded-lg cursor-pointer py-1" onClick={()=> print(report.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
          <td scope="col" className="px-1 text-center py-2"></td>
          <td scope="col" className="px-1 text-center py-2 text-xs text-red-600 font-semibold font-mono">{report.isCancel}</td>
          <td scope="col" className="px-1 text-center py-2"></td>
          <td scope="col" className="px-1 text-center py-2 text-xs font-mono">{report.paymentMethod}</td>
          <td scope="col" className="px-1 text-center py-2"></td>
          <td scope="col" className="px-1 text-center py-2 text-sm text-green-600 font-mono">{Number(report.amount).toLocaleString()}</td>
          <td scope="col" className="px-1 text-center py-2"></td>
          <td scope="col" className="px-1 text-center py-2 text-sm font-mono">{report.kabalaNumber}</td>
          <td scope="col" className="px-1 text-center py-2"></td>
          <td scope="col" className="px-1 text-center py-2 text-sm font-mono">{report.date}</td>
          <td scope="col" className="px-1 text-center py-2"></td>
          <td scope="col" className="px-1 text-center py-2 text-sm font-mono font-semibold text-[#333]">{report.customerDealerLicensed}</td>
          <td scope="col" className="px-1 text-center py-2"></td>         
          <td scope="col" className="px-1 text-center py-2 text-md font-mono font-semibold text-blue-800">{report.customerName}</td>
          <td scope="col" className="px-1 text-center py-2"></td>
          </tr>
        ))}
      </tbody>
    </table>
        )}
    </div>
        </>
      )}
    
    </div> */}
     

    <Dialog open={openCancelReceipt}>
        {/* <DialogTitle variant='h6'>מחיקת חשבונית</DialogTitle> */}
        <DialogContent>
            <Typography className='text-center' variant='subtitle1'>ביטול הקבלה לא ימחק אותה, אלא ירשם על גבי הקבלה -מבוטל- על מנת לשמור על רצף מספרי</Typography>
            <Typography className='text-center font-mono' variant='h6'>האם לבטל את הקבלה</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setOpenCancelReceipt(false)}>אל תבטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={cancelReceipt}>בטל קבלה</button>
        </div>
        {/* </DialogActions> */}
    </Dialog>

    <Snackbar open={openAlertPayment} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            חשבונית עודכנה בהצלחה
        </Alert>
      </Snackbar>
      <Snackbar open={openReceiptAlert} autoHideDuration={10000} onClose={handleCloseRecieptAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleCloseRecieptAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            קבלה בוטלה בהצלחה
        </Alert>
      </Snackbar>

      <Snackbar open={totalAmount} autoHideDuration={20000} onClose={handleCloseAmount} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleCloseAmount}
          severity="info"
          sx={{ width: "100%" }}
        >
          <h1>סה"כ חשבוניות חודש נוכחי<span className='text-blue-700 font-semibold'> {Number(currentMonthTaxInvoicesIsTazrim).toLocaleString()}</span> ש"ח
          </h1>
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

      <Dialog open={openAddCustomerKabala} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
      <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeAddCustomerKabala}/>
        </div>
        <h1 className='text-center font-mono text-amber-700 text-3xl'>הכן קבלה ללקוח</h1>
        {errorRes[0] != null && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes} <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
          {/* <CloseIcon className='text-red-500 cursor-pointer hover:scale-125 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/> */}
        </div>
        )}
        {errors == 403 && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error"> יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
  <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
          {/* <CloseIcon className='text-red-500 cursor-pointer hover:scale-125 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/> */}
        </div>
        )}
        <DialogContent>
        <form id="myform" onSubmit={postKabala} className='flex space-x-4 px-6'>
                <div className='flex flex-col space-y-2'>
                <InputLabel id="demo-simple-select-label" className='text-right'>אמצעי תשלום</InputLabel>
        <Select onChange={handleChange9} className='bg-white text-right focus:outline-none focus:ring focus:border-blue-500 mt-1' value={receiptPaymentMethod} label="Is Paid?">
        
        {arr5?.map(a => (
            <MenuItem value={a}>{a}</MenuItem>
        ))}
     </Select>
     {receiptPaymentMethod == "צ'ק" && (
                        <>
                        <InputLabel id="demo-simple-select-label" className='text-right'>מספר צ'ק</InputLabel>
                        <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={themes}>
                        <TextField InputLabelProps={{
        shrink: true,
      }} type="text" label="מספר צ'ק" value={receiptCheckNumber} className='bg-white rounded-md px-2 py-2' onChange={e => setReceiptCheckNumber(e.target.value)}/>
                        </ThemeProvider>
                        </CacheProvider>
                        {/* <InputLabel id="demo-simple-select-label" className='text-right'>תאריך פרעון צ'ק</InputLabel> */}
                        <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={themes}>
                        <TextField InputLabelProps={{
        shrink: true,
      }} type="date" label="תאריך פרעון צ'ק" value={receiptCheckDate} className='bg-white rounded-md px-2 py-2' onChange={e => setReceiptCheckDate(e.target.value)}/>
                        </ThemeProvider>
                        </CacheProvider>
                        </>

     )}
     {receiptPaymentMethod != "צ'ק" &&<InputLabel id="demo-simple-select-label" className='text-right'>סכום קבלה</InputLabel>}

                         <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={themes}>
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="text" label="סכום קבלה" value={kabalaAmount} className='bg-white rounded-md px-2 py-2' />
                  </ThemeProvider>
                        </CacheProvider>
     </div>
     <div className='flex flex-col space-y-2'>
     <InputLabel id="demo-simple-select-label" className='text-right'>תאריך קבלה</InputLabel>
                  <TextField type="date" value={kabalaDate} className='bg-white rounded-md px-2 py-2 placeholder:text-right text-right' onChange={e => setKabalaDate(e.target.value)}/>
     
     {/* {receiptPaymentMethod == "צ'ק" && (
                        <>
                        <TextField type="text" label="מספר צ'ק" value={receiptCheckNumber} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setReceiptCheckNumber(e.target.value)}/>
                        <InputLabel id="demo-simple-select-label" className='text-right'>תאריך פרעון</InputLabel>
                        <TextField type="date" value={receiptCheckDate} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setReceiptCheckDate(e.target.value)}/>
                        </>

     )} */}
     <InputLabel id="demo-simple-select-label" className='text-right'>עבור חשבונית</InputLabel>
        <Select onChange={handleChange8} className='bg-white focus:outline-none focus:ring focus:border-blue-500 mt-1' value={receiptNumber} label="Is Paid?">
        
        {kabalot?.map(a => (
            <MenuItem value={a.taxId}>{a.isCancel ? a.taxId + " * מבוטל *" : a.taxId}</MenuItem>
        ))}
     </Select>
     {/* <InputLabel id="demo-simple-select-label" className='text-right'>שם לקוח</InputLabel> */}
     <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={themes}>
    <div dir="rtl">
     <TextField InputLabelProps={{
        shrink: true,
      }} type="text" label="שם לקוח" value={customerNameKabala} className='bg-white rounded-md px-2 py-2'/>
     </div>
  </ThemeProvider>
</CacheProvider>
     {/* <InputLabel id="demo-simple-select-label" className='text-right'>מס' ע.מ / חברה לקוח</InputLabel> */}
     <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={themes}>
    <div dir="rtl">
     <TextField InputLabelProps={{
        shrink: true,
      }} type="text" label="מס' ע.מ / חברה לקוח" value={customerDealerLicensed} className='bg-white rounded-md px-2 py-2'/>
     </div>
  </ThemeProvider>
</CacheProvider>
<button type='submit' className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>הכנס קבלה</button>

                  {/* <button type='submit' disabled={kabalaDate == "" || receiptNumber == "" || receiptPaymentMethod == ""} className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>הכנס קבלה</button> */}
                </div>
              </form>
        </DialogContent>
       
    </Dialog>
    </>
  )
}

export default Receipts