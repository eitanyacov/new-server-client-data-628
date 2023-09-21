import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { Select, MenuItem, InputLabel} from '@mui/material'
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
import Switch from '@mui/material/Switch';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PrintIcon from '@mui/icons-material/Print';
import fileDownload from 'js-file-download';
// import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { ThemeContext } from "../App";
import { useQuery } from 'react-query'




const ReceiptMonth = () => {
  const [user, setUser] = useState({})
  const [isSSRE, setIsSSRE] = useState(true);
  const [isSSR, setIsSSR] = useState(true);
  const [id, setId] = useState();
  const [ide, setIde] = useState();
  const [receipt, setReceipt] = useState({})
  const [receiptId, setReceiptId] = useState("")
  const [amount, setAmount] = useState()
  const [paidOrNo, setPaidOrNo] = useState("")
  const [date, setDate] = useState("")
  const [windowWidth, setWindowWidth] = useState(0);
  const [tazrim, setTazrim] = useState()
  const [paymentMethod, setPaymentMethod] = useState("")
  const [receipts, setReceipts] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [open, setIsOpen] = useState(false)
  const [openAlertPayment, setOpenAlertPayment] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [openCancelReceipt, setOpenCancelReceipt] = useState(false)
  const [openReceiptAlert, setOpenReceiptAlert] = useState(false)
  const [isPaid, setIsPaid] = useState("")
  const [error, setError] = useState("")
  const [errorMode, setErrorMode] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0);
  const [xxx, setXxx] = useState(false)
  const [currentMonthTaxInvoicesIsTazrim, setCurrentMonthTaxInvoicesIsTazrim] = useState()
  const [action, setAction] = useState(false)
  



  const navigate = useNavigate()
  const { hebrew, globalTheme } = useContext(ThemeContext)
  const taxInvoice = JSON.parse(localStorage.getItem('taxInvoice'));


  const arr2 = ["מזומן", "צ'ק", "כרטיס אשראי", "העברה בנקאית", "ביט", "אחר", "-"];


  // const screen = window.screen.availWidth
  // const screenHeight = window.screen.availHeight

  const currentMonth = new Date().getMonth() + 1;

  const currentYear = new Date().getFullYear();

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

useEffect(() => {
  resizeWindow();
  console.log(window.innerHeight)
  window.addEventListener("resize", resizeWindow);
  return () => window.removeEventListener("resize", resizeWindow);  
}, [windowWidth, window.innerWidth]);

  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 300)
    
  }, [isSSR]);

  const getData = () => {
    const id = result?.id
    return axios.get('https://nartina.com/api/user/get-receipts-per-month/' + id + "/" + currentMonth + "/" + currentYear)
  }
  
  const {data, refetch} = useQuery('customers-invoices-current-month', ()=> getData(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: taxInvoice,
      refetchOnWindowFocus:false
 
    }) 

    useEffect(() => {
      setTimeout(()=> {
        setXxx(true)
      }, 1000)
    })

    useEffect(()=> {
      setReceipts(data?.data)
  }, [data?.data])

 

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


  useEffect(()=> {
    if(isPaid == "שולם"){
      setOpenDialog(true)
    }
  }, [isPaid])

  useEffect(()=> {
    if(isPaid == "לא שולם"){
      updatePaymentMethod2("-")
    }
  }, [isPaid])

  useEffect(()=> {
    axios.get('https://nartina.com/api/user/get-receipts-per-user-tazrim/'+ result?.id + "/" + currentMonth + "/" + currentYear)
    .then(res => setCurrentMonthTaxInvoicesIsTazrim(res.data))
    .catch(err => console.log(err)) 
  }, [result?.id, currentMonthTaxInvoicesIsTazrim])

  const getCurrentMonthTaxInvoicesIsTazrim = () => {
    axios.get('https://nartina.com/api/user/get-receipts-per-user-tazrim/'+ user?.id + "/" + currentMonth)
    .then(res => setCurrentMonthTaxInvoicesIsTazrim(res.data))
    .catch(err => console.log(err)) 
  }

  const getReceipts = async () => {
    const id = user?.id
    const response = await fetch(`https://nartina.com/api/user/get-receipts-per-month/${id}/${currentMonth}/${currentYear}`);
    const data = await response.json();
    setReceipts(data)
  }

  

  const printValues = (e)=> {
    e.preventDefault()
    console.log(amount, date, receiptId, paidOrNo, paymentMethod)
    axios.post("https://nartina.com/api/user/update-receipt/" + id, {
      amount: amount != null ? amount : receipt.amount,
      tazrim: tazrim != null ? tazrim : receipt.tazrim,
      date: date != "" ? date : receipt.date,
      receiptId: receiptId != "" ? receiptId : receipt.invoiceId, 
      paidOrNo: paidOrNo != "" ? paidOrNo : receipt.paidOrNo,
      paymentMethod: paymentMethod != "" ? paymentMethod : receipt.paymentMethod,
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {console.log(res.data)
         setEditMode(false) 
         window.location.reload()})
    .catch(err => {console.log(err)
      setError(err.response.status)})
  }

 

  const handleChange2 = (e) => {
    console.log("the value is: " + e.target.value);
    setPaymentMethod(e.target.value)
    
  }

  const handleChange1 = (e) => {
    console.log("the value is: " + e.target.value);
    setPaidOrNo(e.target.value)
    
  }

  

  const getReceiptById = async (id) => {
    const res = await fetch(`https://nartina.com/api/user/get-receipt-by-id/${id}`);
    const result = await res.json();
    setReceipt(result)
    
}


  

  const cancelReceipt = () => {
    axios.get("https://nartina.com/api/user/cancel-receipt/" + ide)
    .then(res => {console.log(res.data)
    setOpenCancelReceipt(false)
    setOpenReceiptAlert(true)
    window.location.reload()})
    .catch(err => console.log(err.response.data))
  }

  const updatePaymentMethod = () => {
    axios.get("https://nartina.com/api/user/update-receipt-payment-method/" + ide + "/" + paymentMethod)
    .then(res => {getReceipts()
      setOpenDialog(false)
      // window.location.reload()
      setOpenAlertPayment(true)})
    .catch(err => console.log(err.response.data))
  }

  const updatePaymentMethod2 = (s) => {
    axios.get("https://nartina.com/api/user/update-receipt-payment-method/" + ide + "/" + s)
    .then(res => {getReceipts()
      setOpenAlertPayment(true)
      // window.location.reload()
    })
    .catch(err => console.log(err.response.data))
  }



const handleClose = () => {
  setOpenAlertPayment(false)
}

const handleCloseRecieptAlert = () => {
  setOpenReceiptAlert(false)
}

const handleClose2 = () => {
  setErrorMode(false)
  setError("")
}

const printCancel = () => {
  if(receipt?.isCancel == "מבוטל") {
    printOriginal()
  }else {
    printOriginalNotCancel()
  }
}

const printCancelCopy = () => {
  if(receipt?.isCancel == "מבוטל") {
    printCopy()
  }else {
    printCopyNotCancel()
  }
}

const printOriginal = () => {
  // let filename = new Date().toLocaleDateString()
  let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
      axios.get("https://nartina.com/api/file/pdf/generate/invoice/" + ide + "/" + user?.id, {
          responseType: 'blob',
        }).then(res => {
          fileDownload(res.data, filename + ".pdf");
        });
        setIsOpen(false)
}

const printOriginalNotCancel = () => {
  // let filename = new Date().toLocaleDateString()
  let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
      axios.get("https://nartina.com/api/file/pdf/generate/invoice/not-cancel/" + ide + "/" + user?.id, {
          responseType: 'blob',
        }).then(res => {
          fileDownload(res.data, filename + ".pdf");
        });
        setIsOpen(false)
}

const printCopy = () => {
  // let filename = new Date().toLocaleDateString()
  let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
      axios.get("https://nartina.com/api/file/pdf/generate/invoice-copy/" + ide + "/" + user?.id, {
          responseType: 'blob',
        }).then(res => {
          fileDownload(res.data, filename + ".pdf");
        });
        setIsOpen(false)
}

const printCopyNotCancel = () => {
  // let filename = new Date().toLocaleDateString()
  let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
      axios.get("https://nartina.com/api/file/pdf/generate/invoice-copy-not-cancel/" + ide + "/" + user?.id, {
          responseType: 'blob',
        }).then(res => {
          fileDownload(res.data, filename + ".pdf");
        });
        setIsOpen(false)
}


const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));


const changeActiveTazrim = (id) => {
  axios.get('https://nartina.com/api/user/get-receipt-by-id-change-tazrim/' + id)
    .then(res => {getReceipts()
    getCurrentMonthTaxInvoicesIsTazrim()
    localStorage.setItem('taxInvoice', true)
    refetch()})
    .catch(err => console.log(err))
}


const changeActivePaid = (id) => {
  setIde(id)
  axios.get('https://nartina.com/api/user/change-receipt-is-paid/' + id)
  .then(res => {setIsPaid(res.data)
  refetch()})
}

const print = (id) => {
setIde(id)
getReceiptById(id)
setIsOpen(true)
}

const cancel = (id) => {
setIde(id)
setOpenCancelReceipt(true)
}


const getMonthInHebrew2 = (e) => {
  let month = "";
    switch (e) {
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
      // default:
      //   month = new Date().getMonth().toLocaleString()
      //   break;
    }
    // setMonthNumber(monthNum)
    return month;
  //   return monthNum;
}

  
  return (
    <>
        <section class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${globalTheme != "light" && "bg-gray-700 dark"}`}>
      {hebrew ? (
          <>
          <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">

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
                    <button type="button" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" onClick={()=> navigate('/add-receipt')}>
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add invoice
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
              <th scope="col" className="px-1 py-3 text-center">customer name</th>
              <th scope="col" className="px-1 text-center py-2">invoice date</th>
              <th scope="col" className="px-1 text-center py-2">pay method</th>
              <th scope="col" className="px-1 text-center py-2">invoice id</th>
              <th scope="col" className="px-1 text-center py-2">amount</th>
              <th scope="col" className="px-1 text-center py-2">paid?</th>
              <th scope="col" className="px-1 text-center py-2">add</th>
              <th scope="col" className="px-1 text-center py-2">canceled?</th>
              <th scope="col" className="px-1 text-center py-2">print</th>
              <th scope="col" className="px-1 text-center py-2">cancel</th>
              <th scope="col" className="px-1 text-center py-2">details</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data.sortedInvoices.map((receipt, index) => (
              <tr key={receipt.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
              <td scope="col" className="px-1 text-center py-2">{receipt.customerName}</td>
              <td scope="col" className="px-1 text-center py-2">{receipt.date}</td>
              <td scope="col" className="px-1 text-center py-2">{receipt.paymentMethod}</td>
              <td scope="col" className="px-1 text-center py-2">{receipt.taxId}</td>
              <td scope="col" className="px-1 text-center py-2 text-green-600 font-semibold font-mono">{Number(receipt.amount).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-1 text-xs">
            {receipt.paidOrNo == "שולם" ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActivePaid(receipt.id)}
          color='success'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActivePaid(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              <td scope="col" className="px-1 text-center py-1 text-xs">
            {receipt.tazrim ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActiveTazrim(receipt.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActiveTazrim(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              <td scope="col" className={`px-1 text-center py-2 text-xs ${receipt.isCancel == "מבוטל" ? "text-red-600" : "text-gray-800"} font-semibold font-mono`}>{receipt.isCancel}</td>

              <td scope="col" className="px-1 text-center py-2 text-xs">
            <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> print(receipt?.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
            <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> cancel(receipt?.id)}>
               <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 dark:text-red-500'/>
              </div>
            </td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/receipts/${receipt?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'>פרטי חשבונית</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[12px]'>פרטים</h1>
              </div>
            </td>
              </tr>
            ))}
                    </tbody>
                </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
              <h1 className='font-mono '>number of records</h1>
              <h1 className='text-lg font-semibold font-mono '>{data?.data.numberOfRecords}</h1>
           </div>
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

        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> navigate('/add-receipt')}>
                       הכנס חשבונית חדשה
                   </button>
                   <div class="flex items-center space-x-3 w-full md:w-auto relative">
                       <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                           <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                           אפשרויות
                       </button>
                       
                       <button className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                           <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                               <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                           </svg>
                           פילטר
                           <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                       </button>
                       
                       <p class="hidden md:inline text-2xl text-[#333] dark:text-[#ccc] font-mono font-semibold relative bottom-[1px]">
                        <span className='text-lg font-sans'>₪</span>{Number(isFinite(currentMonthTaxInvoicesIsTazrim) ? currentMonthTaxInvoicesIsTazrim : 0).toLocaleString()}
                       </p>
                       <div className='hidden md:flex items-center justify-center space-x-2'>
                          <h1 className='font-mono font-semibold text-lg text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
                          <h1 className='font-mono text-lg text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
                        </div>
                        <h1 className='hidden md:inline font-mono font-semibold text-lg text-[#495057] dark:text-[#ccc]'>חשבוניות לקוחות</h1>
                      
                   </div>
               </div>
               <div class="w-full md:w-1/2 flex-1">
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
               <div className='flex flex-col space-y-1'>
               <h1 className='inline md:hidden text-center font-mono font-semibold text-lg text-[#333333] dark:text-[#ccc]'>חשבוניות לקוחות</h1>
               <div className='flex items-center justify-center space-x-2 md:hidden'>
                      <p class="text-2xl text-[#333] dark:text-[#ccc] font-mono">
                        <span className='text-lg font-sans'>₪</span>{Number(isFinite(currentMonthTaxInvoicesIsTazrim) ? currentMonthTaxInvoicesIsTazrim : 0).toLocaleString()}
                      </p>
                      <div className='flex items-center justify-center space-x-2'>
                          <h1 className='font-mono font-semibold text-lg text-[#333333] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
                          <h1 className='font-mono text-lg text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
                      </div>
               </div>
               </div>
            </div>
            <div class="overflow-x-auto hidden md:block">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
              <th scope="col" className="px-1 py-3 text-center">פרטים</th>
              <th scope="col" className="px-1 text-center py-2">בטל</th>
              <th scope="col" className="px-1 text-center py-2">הדפס</th>
              <th scope="col" className="px-1 text-center py-2">מבוטל</th>
              <th scope="col" className="px-1 text-center py-2">הוסף</th>
              <th scope="col" className="px-1 text-center py-2">?שולם</th>
              <th scope="col" className="px-1 text-center py-2">סכום</th>
              <th scope="col" className="px-1 text-center py-2">מס' חשבונית</th>
              <th scope="col" className="px-1 text-center py-2">צורת תשלום</th>
              <th scope="col" className="px-1 text-center py-2">תאריך חשבונית</th>
              <th scope="col" className="px-1 text-center py-2">שם לקוח</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data.sortedInvoices.map((receipt, index) => (
              <tr key={receipt.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/receipts/${receipt?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'>פרטי חשבונית</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[12px]'>פרטים</h1>
              </div>
            </td>
            
            <td scope="col" className="px-1 text-center py-2 text-xs">
            <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> cancel(receipt?.id)}>
               <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 dark:text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
            <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> print(receipt?.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
            <td scope="col" className={`px-1 text-center py-2 text-xs ${receipt.isCancel == "מבוטל" ? "text-red-600 " : "text-gray-800"} font-semibold font-mono`}>{receipt.isCancel}</td>
            <td scope="col" className="px-1 text-center py-1 text-xs">
            {receipt.tazrim ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActiveTazrim(receipt.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActiveTazrim(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              <td scope="col" className="px-1 text-center py-1 text-xs">
            {receipt.paidOrNo == "שולם" ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActivePaid(receipt.id)}
          color='success'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActivePaid(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              <td scope="col" className="px-1 text-center py-2 text-green-600 font-semibold font-mono">{Number(receipt.amount).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2">{receipt.taxId}</td>
              <td scope="col" className="px-1 text-center py-2">{receipt.paymentMethod}</td>
              <td scope="col" className="px-1 text-center py-2">{receipt.date}</td>
              <td scope="col" className="px-1 text-center py-2">{receipt.customerName}</td>
              </tr>
            ))}
                    </tbody>
                </table>
            </div>
            <div className='grid grid-cols-1 gap-3 md:hidden px-4 py-2'>
              {data?.data.sortedInvoices.map(receipt => (
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
                <div className='text-right text-[#333] text-lg dark:text-[#ccc]'>תאריך חשבונית</div>
                </div>
                </div>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.taxId}</div>
                <div className='text-right dark:text-[#ccc]'>מספר חשבונית</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.paymentMethod}</div>
                <div className='text-right dark:text-[#ccc]'>צורת תשלום</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className={`px-1 text-center py-2 text-xs ${receipt.isCancel == "מבוטל" ? "text-red-600 dark:text-red-500" : "text-gray-800 dark:text-[#ccc]"} font-semibold font-mono`}>{receipt.isCancel}</div>
                <div className='text-right dark:text-[#ccc]'>?מבוטל</div>
                </div>
                
                <div className='flex items-center justify-end space-x-1'>
                <div scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
                {receipt.paidOrNo == "שולם" ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActivePaid(receipt.id)}
          color='success'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActivePaid(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
  </div>
                <div className='text-right dark:text-[#ccc]'>?שולם</div>
                </div>
                <div className='flex items-center justify-end space-x-1'>
                <div scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
                {receipt.tazrim ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActiveTazrim(receipt.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActiveTazrim(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
  </div>
                <div className='text-right dark:text-[#ccc]'>?תזרים</div>
                </div>
                
                <div className='flex items-center justify-between space-x-4 relative top-1'>
                <div className='flex items-center justify-center space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(receipt.amount).toLocaleString()}</h1>
                  <h1 className='text-[#333] dark:text-[#ccc]'>סכום</h1>
                </div>
                <div className='flex items-center justify-center space-x-5'>
                <div className="flex justify-center items-center bg-gray-300 dark:bg-slate-600 hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer" onClick={()=> navigate(`/receipts/${receipt?.id}`)}>
                <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'>פרטי חשבונית</h1>
              </div>
              
            <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> cancel(receipt?.id)}>
               <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 dark:text-red-500'/>
              </div>
            <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> print(receipt?.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
                </div>
              
                </div>
              </div>
              ))}
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
              <h1 className='text-lg font-semibold font-mono '>{data?.data.numberOfRecords}</h1>
              <h1 className='font-mono '>מס' חשבוניות </h1>
           </div>
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

      <Dialog open={open}>
        <DialogTitle></DialogTitle>
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>אם אתה בוחר להדפיס את החשבונית עלייך להגישה למס הכנסה ע''פי חוק, מס' החשבונית הראשונה יהיה 3001, וימשיך בסדר עולה</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-between md:justify-around items-center p-2 space-x-2 pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל הדפסה</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={printCancelCopy}>העתק/נאמן למקור</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={printCancel}>הדפס מקור</button> 
        </div>
        {/* </DialogActions> */}
    </Dialog>

    <Dialog open={openDialog}>
        <DialogTitle className='text-center'>בחר צורת תשלום</DialogTitle>
        <DialogContent>

        <InputLabel id="demo-simple-select-label" className='text-right'>צורת תשלום</InputLabel>
        <Select onChange={handleChange2} className='bg-white shadow-xl w-52 focus:outline-none focus:ring focus:border-blue-500 mt-1'>
        
        {arr2.map(a => (
            <MenuItem value={a}>{a}</MenuItem>
        ))}
     </Select>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setOpenDialog(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={updatePaymentMethod}>עדכן</button>
        
        </div>
        {/* </DialogActions> */}
    </Dialog>

    <Dialog open={openCancelReceipt}>
        {/* <DialogTitle variant='h6'>מחיקת חשבונית</DialogTitle> */}
        <DialogContent>
            <Typography className='text-center' variant='subtitle1'>ביטול החשבונית לא ימחק אותה, אלא ירשם על גבי החשבונית -מבוטל- על מנת לשמור על רצף מספרי</Typography>
            <Typography className='text-center font-mono' variant='h6'>האם לבטל את החשבונית</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setOpenCancelReceipt(false)}>אל תבטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={cancelReceipt}>בטל חשבונית</button>
        </div>
        {/* </DialogActions> */}
    </Dialog>

    <Snackbar open={openAlertPayment} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            חשבונית עודכנה בהצלחה
        </Alert>
      </Snackbar>
      <Snackbar open={openReceiptAlert} autoHideDuration={10000} onClose={handleCloseRecieptAlert} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Alert
          onClose={handleCloseRecieptAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            חשבונית בוטלה בהצלחה
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
    </>
  )
}

export default ReceiptMonth