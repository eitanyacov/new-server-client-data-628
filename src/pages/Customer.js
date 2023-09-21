import React, { useState, useEffect, useContext } from 'react';
import { Select, MenuItem, InputLabel} from '@mui/material'
import { Dialog, DialogContent, DialogTitle, Typography, TextField } from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
import Switch from '@mui/material/Switch';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import DescriptionIcon from '@mui/icons-material/Description';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import AssessmentIcon from '@mui/icons-material/Assessment';
import fileDownload from 'js-file-download';
import axios from 'axios';
// import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom'
import { ThemeContext } from "../App";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useQuery } from 'react-query'



// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});



const Supplier = () => {
    const [user, setUser] = useState({})
    const [isSSRE, setIsSSRE] = useState(true);
    const [isSSR, setIsSSR] = useState(true);
    const [receipt, setReceipt] = useState({})
    const [invoice, setInvoice] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [supplierType, setSuppliertype] = useState("")
    const [id, setId] = useState();
    const [ide, setIde] = useState();
    const [open, setIsOpen] = useState(false)
    const [invoiceId, setInvoiceId] = useState("")
    const [amount, setAmount] = useState()
    const [paidOrNo, setPaidOrNo] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [date, setDate] = useState("")
    // const [field, setField] = useState("")
    const [isPaid, setIsPaid] = useState("")
    const [receipts, setReceipts] = useState([])
    const [customer, setCustomer] = useState({})
    const [openCancelReceipt, setOpenCancelReceipt] = useState(false)
    const [openReceiptAlert, setOpenReceiptAlert] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [openAlertPayment, setOpenAlertPayment] = useState(false)
    const [error, setError] = useState("")
    const [errorMode, setErrorMode] = useState(false)
    const [windowHeight, setWindowHeight] = useState(0);
    const [alert, setAlert] = useState(false);
    const [openInput, setOpenInput] = useState(false)
    const [cashNumber, setCashNumber] = useState("")
    const [xxx, setXxx] = useState(false)
    const [currentMonthTaxInvoicesIsTazrim, setCurrentMonthTaxInvoicesIsTazrim] = useState()
    //for upcoming-payment
    const [checkDate, setCheckDate] = useState("")
    const [checkNumber, setCheckNumber] = useState("")

    const { setCustId, hebrew } = useContext(ThemeContext)

    const { customerid } = useParams() 
    
    const navigate = useNavigate()

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

    const screen = window.screen.availWidth
    // const screenHeight = window.screen.availHeight
    

    const arr = ["True", "False"];

    const arr2 = ["מזומן", "צ'ק", "כרטיס אשראי", "העברה בנקאית", "ביט", "אחר", "-"];
    const currentMonth = new Date().getMonth() + 1;

    // const arr3 = ["משתנה", "קבוע", "סחורה"];
    let resizeWindow = () => {
      // setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
      setTimeout(() => {
        setIsSSR(false);
      }, 300)
      
    }, [isSSR]);
  
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
        // getReceipts()
    }, [])

    const getCustInvoices = () => {
      return axios.get(`https://nartina.com/api/user/get-receipts-by-supplier-per-user/${customerid}`)
    }
    
    const {data, refetch} = useQuery('customer-invoices', ()=> getCustInvoices(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 30000,
        refetchOnMount: true,
        refetchOnWindowFocus:false
   
      }) 

      useEffect(() => {
        setTimeout(()=> {
          setXxx(true)
        }, 1000)
      })
    

    useEffect(() => {
      setAlert(true);
    }, []);

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
        getCustomerInfo()
    }, [])

    const getCustomerInfo = async () => {
        const res = await fetch(`https://nartina.com/api/user/customer-by-id/${customerid}`);
        const result = await res.json();
        setCustomer(result)
    }


    const getReceipts = async () => {
        const response = await fetch(`https://nartina.com/api/user/get-receipts-by-supplier-per-user/${customerid}`);
        const data = await response.json();
        setReceipts(data)
      }

      const updatePaymentMethod2 = (s) => {
        axios.get("https://nartina.com/api/user/update-receipt-payment-method/" + ide + "/" + s)
        .then(res => {getReceipts()
          setOpenAlertPayment(true)
          // window.location.reload()
        })
        .catch(err => console.log(err.response.data))
      }


      const zzz = () => {
        // if(checkDate != "") {
          const d = new Date(checkDate).getTime() + Math.random()*60000
          axios.post("https://nartina.com/api/user/add-coming-payment/" + result?.id, {
            title: receipt?.amount,
            startDate: new Date(checkDate).toISOString(),
            endDate: new Date(d).toISOString(),
            notes: " שם לקוח - " + receipt?.customerName  + "\n" + " תאריך חשבונית - " + receipt?.date + "\n " + " מספר חשבונית " + receipt?.taxId + "\n " + " מספר צ'ק - " + checkNumber
          }, {
            headers: {
              Authorization: 'Bearer ' + result?.token,
          
             }
          }).then(res => {console.log(res)
          setCheckDate("")
          setOpenAlertPayment(true)
          // setSum("")
          setDate("");
          setCheckNumber("")})
        // }
      }

      const upcomingPayment = () => {
        if(checkDate != "") {
          zzz()
        }
    }

      const updatePaymentMethod = () => {
        axios.get("https://nartina.com/api/user/update-receipt-payment-method/" + ide + "/" + paymentMethod)
        .then(res => {getReceipts()
          upcomingPayment()
          setOpenDialog(false)
          // window.location.reload()
          setOpenAlertPayment(true)})
        .catch(err => console.log(err.response.data))
      }

      const getCurrentMonthTaxInvoicesIsTazrim = () => {
        axios.get('https://nartina.com/api/user/get-receipts-per-user-tazrim/'+ user?.id + "/" + currentMonth)
        .then(res => setCurrentMonthTaxInvoicesIsTazrim(res.data))
        .catch(err => console.log(err)) 
      }


    const printValues = (e)=> {
      e.preventDefault()
      console.log(amount, date, invoiceId, paidOrNo, paymentMethod)
      axios.post("https://nartina.com/api/user/update-invoice/" + id, {
        amount: amount != null ? amount : invoice.amount,
        date: date != "" ? date : invoice.date,
        supplierType: supplierType != "" ? supplierType : invoice.supplierType,
        invoiceId: invoiceId != "" ? invoiceId : invoice.invoiceId,
        paidOrNo: paidOrNo != "" ? paidOrNo : invoice.paidOrNo,
        paymentMethod: paymentMethod != "" ? paymentMethod : invoice.paymentMethod,
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

    const getReceiptById = async (id) => {
      const res = await fetch(`https://nartina.com/api/user/get-receipt-by-id/${id}`);
      const result = await res.json();
      setReceipt(result)
      
  }

    const handleChange3 = (e) => {
      console.log("the value is: " + e.target.value);
      setSuppliertype(e.target.value)
      
    }

    const handleChange2 = (e) => {
      console.log("the value is: " + e.target.value);
      setPaymentMethod(e.target.value)
      
    }
  
    const handleChange1 = (e) => {
      console.log("the value is: " + e.target.value);
      setPaidOrNo(e.target.value)
      
    }

    const handleClose = () => {
      setOpenAlertPayment(false)
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

      const cancelReceipt = () => {
        axios.get("https://nartina.com/api/user/cancel-receipt/" + ide)
        .then(res => {console.log(res.data)
        setOpenCancelReceipt(false)
        setOpenReceiptAlert(true)
        getReceipts()})
        .catch(err => console.log(err.response.data))
      }

      const handleCloseRecieptAlert = () => {
        setOpenReceiptAlert(false)
      }

      const goToKabalot = () => {
        setCustId(customerid)
        navigate("/kabalot/" + customerid)
        
      }

      const addPrint = () => {
        setOpenInput(true)
     }

     const closeForm = () => {
      setOpenInput(false)
      setCashNumber("")
    }

     const textReceipt = () => {
      axios.get("https://nartina.com/api/user/print-text-receipt/" + ide + "/" + cashNumber)
      .then(res => {console.log(res.data)
      setOpenCancelReceipt(false)
      setCashNumber("")
      setOpenInput(false)
      getReceipts()
      setOpenReceiptAlert(true)})
      .catch(err => console.log(err.response.data))
    }

   

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
            .then(res => {setIsPaid(res.data.paidOrNo)
              setReceipt(res.data.receipt)
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
   
    

    const handleCloseAlert = () => {
      setAlert(false)
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

  
    if(!user) navigate('/')
    return (
        <>
        <div class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] mt-14 overflow-y-auto scrollbar-none`}>
      {isSSR ? (
          <LinearProgress />
        ) : (
          <>
          <div className="pr-1 hidden md:block"> 
         <table className="min-w-full divide-y divide-gray-200 border-[#ccc] border-b-2">
          <thead className="bg-sky-700 sticky top-0 z-50">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="hidden lge:flex px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">פרטי חשבונית</th>
              <th scope="col" className="lge:hidden px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">פרטים</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">בטל</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הדפס</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מבוטל</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הוסף</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">?שולם</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סכום</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מס' חשבונית</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">צורת תשלום</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך חשבונית</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם לקוח</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
            </tr>
          </thead>

            <>
            <tbody className="divide-y divide-gray-200">
            {data?.data.map((receipt, index) => (
              <tr key={receipt.id} className={`border ${index % 2 === 0 ? '' : ''}`}>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/receipts/${receipt?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[10px]'>פרטי חשבונית</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 font-semibold text-[12px]'>פרטים</h1>
              </div>
            </td>
            
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-red-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> cancel(receipt?.id)}>
               <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> print(receipt?.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className={`px-1 text-center py-2 text-xs ${receipt.isCancel == "מבוטל" ? "text-red-600" : "text-gray-800"} font-semibold font-mono`}>{receipt.isCancel}</td>
            <td scope="col" className="px-1 text-center py-2"></td>
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
              <td scope="col" className="px-1 text-center py-2"></td>
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
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-green-600 font-semibold font-mono">{receipt.amount}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{receipt.taxId}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{receipt.paymentMethod}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{receipt.date}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-sm text-gray-800  font-bold font-mono">{receipt.customerName}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              </tr>
            ))}
          </tbody>
            </>
        </table>
         </div>
         <div className='grid grid-cols-1 gap-3 md:hidden px-4 py-2 dark'>
              {data?.data.map(receipt => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} p-2 flex flex-col space-y-1`}>
                <div className="p-4 bg-gray-900 hover:bg-gray-800 shadow rounded-xl flex flex-col space-y-1">

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
                <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'><span className='hidden xs:inline'>פרטי</span> חשבונית</h1>
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
          </>
        )}
       
      </div>

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

    <Dialog open={openCancelReceipt}>
        {/* <DialogTitle variant='h6'>מחיקת חשבונית</DialogTitle> */}
        {!openInput && (
          <>
          <DialogContent>
              <Typography className='text-center' variant='subtitle1'>ביטול החשבונית לא ימחק אותה, אלא ירשם על גבי החשבונית -מבוטל- על מנת לשמור על רצף מספרי</Typography>
              <Typography className='text-center font-mono' variant='h6'>האם לבטל את החשבונית</Typography>
              <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
          </DialogContent>
          {/* <DialogActions className='flex justify-between items-center'> */}
          <div className='flex justify-around items-center pb-2'>
          <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setOpenCancelReceipt(false)}>אל תבטל</button>
          <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={addPrint}>הודפס בקופה רושמת</button>
          <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={cancelReceipt}>בטל חשבונית</button>
          </div>
          </>
        )}
         {openInput && (
          <>
          <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeForm}/>
        </div>
          <div className='flex flex-col items-center justify-center px-8 pb-8 pt-1'>
                                <h1 className='text-sm'>יצויין על גבי החשבונית</h1>
                                <h1 className='text-sm font-semibold'>הודפס בקופה רושמת</h1>
                                <h1 className='text-sm mb-4'>בתוספת מס' סרט הקופה</h1>
                                <CacheProvider value={cacheRtl}>
                                <ThemeProvider theme={theme}>
                            <TextField InputLabelProps={{
        shrink: true,
      }} type="text" value={cashNumber} label="מספר סרט קופה"  className='bg-white shadow-md focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-1 w-36 placeholder:text-right placeholder:font-mono placeholder:text-gray-700' onChange={(e)=> setCashNumber(e.target.value)}/>
                            </ThemeProvider>
                                </CacheProvider>
                            <button disabled={cashNumber == ""} className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg mt-4' onClick={textReceipt}>עדכן חשבונית</button>
          </div>
          </>
        )}
       
        {/* </DialogActions> */}
    </Dialog>

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

      <Dialog open={openDialog}>
        <DialogTitle className='text-center'>בחר צורת תשלום</DialogTitle>
        <DialogContent>

        <InputLabel id="demo-simple-select-label" className='text-right'>צורת תשלום</InputLabel>
        <Select onChange={handleChange2} className='bg-white w-52 focus:outline-none focus:ring focus:border-blue-500 mt-1'>
        
        {arr2.map(a => (
            <MenuItem value={a}>{a}</MenuItem>
        ))}
     </Select>
        </DialogContent>
        {paymentMethod == "צ'ק" && (
                  <div className='px-4 relative bottom-3.5'>
                 <div>
                   <label for='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">מספר צ'ק</label>
                   <input type="text" name="email" value={checkNumber} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="מספר צ'ק" required="" onChange={(e)=> setCheckNumber(e.target.value)}/>
                 </div>
                 <div>
                   <div className='flex justify-end items-center space-x-1'>
                     <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                     <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">תאריך צ'ק</label>
                   </div>
                     <input disabled={paymentMethod != "צ'ק"} type="date" name="name" value={checkDate} class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="תאריך צ'ק" required="" onChange={(e)=> setCheckDate(e.target.value)}/>
                 </div>
                  </div>
                 )}
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setOpenDialog(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={updatePaymentMethod}>עדכן</button>
        
        </div>
        {/* </DialogActions> */}
    </Dialog>

    <Snackbar open={openAlertPayment} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            חשבונית עודכנה בהצלחה
        </Alert>
      </Snackbar>
      <Snackbar open={openReceiptAlert} autoHideDuration={10000} onClose={handleCloseRecieptAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
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

      <Snackbar open={alert} autoHideDuration={10000} onClose={handleCloseAlert} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleCloseAlert}
          severity="info"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? <>
          all customer invoices
          </> : <>
          כל החשבוניות שהוצאו ללקוח
          </>}
        </Alert>
      </Snackbar>
        </>
        
    )
}

export default Supplier