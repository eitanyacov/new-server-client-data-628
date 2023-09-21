import React, { useState, useEffect, useContext, useRef } from 'react';
import { Select, MenuItem, InputLabel} from '@mui/material'
import { PaginationItem } from '@mui/material';
import { Snackbar, Alert } from "@mui/material";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { Dialog, DialogContent, TextField, DialogActions, DialogTitle } from '@mui/material'
import Pagination from '@mui/material/Pagination';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import useMediaQuery from '@mui/material/useMediaQuery';

import CloseIcon from '@mui/icons-material/Close';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import DescriptionIcon from '@mui/icons-material/Description';
import LinearProgress from '@mui/material/LinearProgress';
import { ThemeContext } from "../App";
import axios from 'axios';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useQuery } from 'react-query'
import jsPDF from 'jspdf'
import ReactToPrint  from 'react-to-print';
import Swal from 'sweetalert2'



// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});




const doc = new jsPDF()


const WayBill = () => {
  const [user, setUser] = useState({})
  const [isSSRE, setIsSSRE] = useState(true);
  const [isSSR, setIsSSR] = useState(true);
  const [ide, setIde] = useState();
  const [invoice, setInvoice] = useState({})
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  
  const [notes, setNotes] = useState("");
  
  const [invoices, setInvoices] = useState([])
 
  const [openForm, setIsOpenForm] = useState(false)
  const [openAlert, setIsOpenAlert] = useState(false)
  const [checked, setChecked] = useState(invoice?.vat)
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [error, setError] = useState()
  const [errorMode, setErrorMode] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [flag, setFlag] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [monthNumber, setMonthNumber] = useState(0);
 
  const [flag2, setFlag2] = useState(false)
  const [page, setPage] = useState(0);
  
  const [filterMode, setFilterMode] = useState(false)
  const [dates, setDates] = useState(false)
  const [date1, setDate1] = useState("")
  const [date2, setDate2] = useState("")
  const [dateMode, setDateMode] = useState(false)
  const [vvv, setVvv] = useState(false)
  const [rrr, setRrr] = useState(false)
  const [action, setAction] = useState(false)
  const [noVatInvoice, setNoVatInvoice] = useState(false);

  const [openAddInvoice, setOpenAddInvoice] = useState(false)
  const [errorRes, setErrorRes] = useState([]);
  const [errors, setErrors] = useState()
  const [suppliers, setSuppliers] = useState([]);
  const [supplierName, setSupplierName] = useState("");
  const [supplierId, setSupplierId] = useState();
  const [openInvoiceAlert, setOpenInvoiceAlert] = useState(false)
  const [wayId, setWayId] = useState("");




  const { hebrew, globalTheme } = useContext(ThemeContext)
  const componentRef = useRef();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const res = localStorage.getItem("user")
  const result = JSON.parse(res)


  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
  const currentYear = new Date().getFullYear()
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
  }, [windowHeight, window.innerHeight]);

 
  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 300)
    
  }, [isSSR]);

  const getData = () => {
    //this way were doing data?.data.content
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/all-way-bills-paging/${id}/${page}/10/date`)
    //this way were not using data?.data else paging and other states....
    // .then(res => {console.log(res.data)
    // setPaging(res.data.content)
    // setNumber(res.data.totalElements)
    // setPages(res.data.totalPages)
    // setPage(res.data.pageable.pageNumber)})
    // .catch(err => console.log(err))
  }
  
  const {data, refetch} = useQuery('way-bills', ()=> getData(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: false,
      refetchOnWindowFocus:false
 
    }) 

  


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


  const saveSupplierId = event => {
    const { myValue } = event.currentTarget.dataset;
    console.log(myValue) // --> 123
    const x = parseInt(myValue)
    setSupplierId(myValue)
  
  }


  const getInvoice = async (id) => {
    const res = await fetch(`https://nartina.com/api/user/get-waybill/${id}`);
    const result = await res.json();
    setInvoice(result)
    setIsOpenForm(true)
}



  const handleClose = () => {
    setIsOpenAlert(false)
  }


  const handleChangeInvoice = (e) => {
    console.log("the value is: " + e.target.value);
    setSupplierName(e.target.value)
    
  }
  


  const closeInvoice = () => {
    setDate("");
      setAmount("");
      // setSupplier({});
      setSupplierName("");
      setWayId("")
      setNotes("")
      // setSubmit(false)
      setNoVatInvoice(false)
    setOpenAddInvoice(false)
  }

  const addInvoice = (e) => {
    e.preventDefault()
    if(date == "" || supplierName == "" || amount == "") {
      setErrorRes("שדות חובה חסרים")
      return;
    }
   
      axios.post("https://nartina.com/api/user/add-way-bill-to-user/" + user?.id + "/" + supplierId , {
      date,
      notes: notes != "" ? notes : "",
      // noVat: noVatInvoice == true ? "ללא מע''מ" : "-",
      vat: noVatInvoice == true ? false : true,
      // noRefund: refundInvice == true ? "זיכוי" : "-",
      supplierName,
      wayId,
      amount,
     
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {
      Swal.fire("!הצלחה", '! תעודה הוכנסה בהצלחה', "success")
      // setReload(true)
      // console.log("invoice-type---------> " + res.data)
      // setInvoiceType(res.data)
      // localStorage.setItem('invoice', true)
      refetch()
      console.log(res.data)
      setOpenAddInvoice(false)
      setOpenInvoiceAlert(true)
      setNoVatInvoice(false)
      // console.log("invoice-type2---------> " + invoiceType)
    }) 
      .catch(err => {setErrorRes(err.response.data)
        setErrors(err.response.status)})
        .finally(closeInvoice())
        setDate("")
        setNotes("")
        setSupplierName("")
        setAmount("")
        setWayId("")
        setNoVatInvoice(false)
     
  }

  

  const handleClose3 = () => {
    setErrorMode(false)
    setError("")
  }

  const deleteNotes = async () => {
    axios.get("https://nartina.com/api/user/delete-waybill-notes/" + ide)
    .then(res => {setOpenNoteDialog(false)
      setNotes("")
      refetch()
    // getInvoices()
  }).catch(err => console.log(err.response.data))
    
  }

  
  const handleYears = (e) => {
    setYear(e.target.value)
    }

    // const handleType = (e) => {
    //   setSupplierType(e.target.value)
      
    // }

  const handleMonths = (e) => {
    setMonth(e.target.value)
    getMonthInHebrew(e.target.value)
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
  
  const getInvoicesForPdf = () => {
    const id = result?.id
    axios.get("https://nartina.com/api/user/invoices-by-month/" + id + "/" + monthNumber + "/" + year)
    .then(res => {setInvoices(res.data)
    console.log([res.data])})     
    .catch(err => console.log(err))
  }

  const getExcel = (e) => {
    e.preventDefault();
    getInvoicesForPdf()
    setFlag2(true)
    closeDialog()
  }

  const printPdf = () => {
    localStorage.setItem('invoice', true)
    setFlag(false)
    // getInvoices()
  }

  const printPdf2 = () => {
    localStorage.setItem('invoice', true)
    setFlag2(false)
    // getInvoices()

  }

  const closeDialog = () => {
    setMonth("")
    setYear("")
    setFlag(false)
  }

  const printValues = (e)=> {
    e.preventDefault()
    
    axios.post("https://nartina.com/api/user/update-waybill/" + ide, {
      amount: amount != "" ? amount : invoice.amount,
      date: date != "" ? date : invoice.date,
      supplierType: invoice.supplierType,
      wayId: wayId != "" ? wayId : invoice.wayId,
      notes: notes != "" ? notes : invoice.notes,  
      vat: !checked
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {
      Swal.fire("!הצלחה", '! תעודה עודכנה בהצלחה', "success")
      // localStorage.setItem('invoice', true)
        setIsOpenForm(false)
        //  setEditMode(false) 
        refetch()
        //  getInvoices()
        })
    .catch(err => {console.log(err)
      setError(err.response.status)})
    
  }

  const getSuppliers = () => {
    axios.get(`https://nartina.com/api/user/get-suppliers-by-user/${result?.id}`)
    .then(res => setSuppliers(res.data))
    .catch(err => console.log(err))
  }



  const editInvoice = (id) => {
    setIde(id)
    getInvoice(id)
  }

  const getNotes = (id) => {
    setIde(id)
    axios.get("https://nartina.com/api/user/get-waybill-notes/" + id)
    .then(res => setNotes(res.data))
    .catch(err => console.log(err.response.data))
    .finally(setOpenNoteDialog(true))

  }
// console.log(paging?.data.totalElements)



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



const getDates = (e) => {
  e.preventDefault()
  axios.get("https://nartina.com/api/user/invoices-between/" + result?.id + "/date/0/100/" + date1 + "/" + date2)
  .then(res => {console.log(res.data)
    setDateMode(true)
    setVvv(false)
    setRrr(true)
    setInvoices(res.data.content)

  setDates(false)})
  .catch(err => console.log(err.response.data))
}

const handleAlert = (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })
  
  swalWithBootstrapButtons.fire({
    title: '?אתם בטוחים',
    text: "!לא ניתן יהיה לשחזר את התעודה",
    icon: 'אזהרה',
    showCancelButton: true,
    confirmButtonText: '!כן מחק',
    cancelButtonText: '!לא למחוק',
    reverseButtons: true
  }).then((results) => {
    if (results.isConfirmed) {
      axios.delete("https://nartina.com/api/user/delete-waybill/" + id, {
  headers: {
    Authorization: 'Bearer ' + result?.token,

        }
    })
      .then(res => {
      console.log(res.data)
        refetch()
        swalWithBootstrapButtons.fire(
          '!נמחק',
          'התעודה נמחקה בהצלחה.',
          'success'
        )
        localStorage.setItem('invoice', true)})
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
        'פעולה בוטלה התעודה לא נמחקה :)',
        'error'
      )
    }
  })
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
  axios.get('https://nartina.com/api/user/get-waybill-by-id-change-tazrim/' + id)
    .then(res => {
    // getCurrentMonthTaxInvoicesIsTazrim()
    // localStorage.setItem('taxInvoice', true)
    refetch()})
    .catch(err => console.log(err))
}



  return (
    <>
        <section class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${globalTheme != "light" && "bg-gray-700 dark"}`}>
    {flag2 ? (
        <>
        <div className={`flex justify-between space-x-2 items-center py-1 pr-3 fixed bottom-1 ${hebrew ? 'left-4 airx:left-[185px]' : 'right-4 airx:right-[185px]'}`}>
        <div></div>
         <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">
                    <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center space-x-1 bg-blue-200 hover:bg-blue-300 rounded-md px-2 py-[2px] w-fit" onClick={printPdf}> 
                    <h1 className="font-mono text-blue-600 font-semibold">{hebrew ? "print" : "הדפס"}</h1>
                    <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-4'/> 
                    </div>
                    </div>
            </a>;
          }}
          contentStyle={{ "@media print": { "@page": { size: "landscape" } } }}
          content={() => componentRef.current}
          documentTitle='דו"ח שנתי'
        />
         <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={printPdf2}>
            <CloseIcon className='hover:animate-spin text-red-600 hover:text-red-500'/>
          </div>
        </div>
        <div className='overflow-y-scroll scrollbar max-h-[500px]'>
       {hebrew ? (
         <table ref={componentRef} className="min-w-full divide-y border-[#ccc] border-b-[1px] divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
          <thead className="bg-sky-700 sticky top-0 z-50">
          <tr>
           <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">date</th>
           <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">supplier name</th>
           <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">amount</th>
           <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">cheque date</th>
           <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">invoice type</th>
           <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">payment method</th>
           <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">invoice id</th>
           <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">refund?</th>
           <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">vat?</th>
           <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">paid?</th>
        </tr>
         </thead>
         <tbody className="divide-y divide-gray-200">
           {invoices?.map((report, index) => (
             <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
              <td scope="col" className="px-1 text-center py-2 text-sm font-mono font-semibold text-blue-800">{report.date}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs font-semibold text-gray-900">{report.supplierName}</td>
              <td scope="col" className="px-1 text-center py-2 text-sm font-mono font-bold text-green-600">{report.amount}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.checkDate}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.supplierType}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.paymentMethod}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.invoiceId}</td>
              <td scope="col" className={`px-1 text-center py-2 text-xs ${report.refund ? "text-green-600 font-semibold" : "text-gray-900"} font-semibold`}>{`${report.refund ? "refund" : "-"}`}</td>
              <td scope="col" className={`px-1 text-center py-2 text-xs font-semibold ${report.vat ? "text-gray-900" : "text-red-600"}`}>{`${report.vat ? "yes" : "no vat"}`}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.paidOrNo}</td>
             </tr>
           ))}
         </tbody>
       </table>
       ) : (
        <table ref={componentRef} className="min-w-full divide-y border-[#ccc] border-b-[1px] divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
         <thead className="bg-sky-700 sticky top-0 z-50">
          <tr>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">?שולם</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מע"מ</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מספר חשבונית</th>
            {/* <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">זיכוי</th> */}
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">אמצעי תשלום</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סוג חשבונית</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סכום</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם ספק</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((report, index) => (
            <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
            <td scope="col" className="px-1 text-center py-2 text-xs">{report.paidOrNo}</td>
            <td scope="col" className={`px-1 text-center py-2 text-xs font-semibold ${report.vat ? "text-gray-900" : "text-red-600"}`}>{`${report.vat ? "כן" : 'ללא מע"מ'}`}</td>
            <td scope="col" className="px-1 text-center py-2 text-xs">{report.invoiceId}</td>
            {/* <td scope="col" className={`px-1 text-center py-2 text-xs ${report.refund ? "text-green-600 font-semibold" : "text-gray-900"} font-semibold`}>{`${report.refund ? "זיכוי" : "-"}`}</td> */}
            <td scope="col" className="px-1 text-center py-2 text-xs">{report.paymentMethod}</td>
            <td scope="col" className="px-1 text-center py-2 text-xs">{report.supplierType}</td>
            <td scope="col" className="px-1 text-center py-2 text-sm font-mono font-bold text-green-600">{report.amount}</td>
            <td scope="col" className="px-1 text-center py-2 text-xs font-semibold text-gray-900">{report.supplierName}</td>
            <td scope="col" className="px-1 text-center py-2 text-lg font-mono font-bold text-blue-800">{report.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
       )}
    </div>
        </>
      ) : (
        <>
         {isSSR ? (
         <LinearProgress />
      ) : (
        <>
        <div className='overflow-y-scroll scrollbar pr-[6px] h-full'>
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
                    <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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
           <th scope="col" className="px-1 text-center py-2">date</th>
           <th scope="col" className="px-1 text-center py-2">supplier name</th>
           <th scope="col" className="px-1 text-center py-2">amount</th>
           <th scope="col" className="px-1 text-center py-2">invoice type</th>
           <th scope="col" className="px-1 text-center py-2">invoice id</th>
           <th scope="col" className="px-1 text-center py-2">vat?</th>
           <th scope="col" className="px-1 text-center py-2">notes</th>
           <th scope="col" className="px-1 text-center py-2">edit</th>
           <th scope="col" className="px-1 text-center py-2">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                       {data?.data.content.map((report, index) => (
              <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>

            <th scope="col" className={`px-1 text-center py-2 dark:text-[#ccc]`} >{report.date}</th>
            <td scope="col" className="px-1 text-center py-2">{report.supplierName}</td>
            <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-bold">{Number(report.amount).toLocaleString()}</td>
            <td scope="col" className="px-4 py-3 text-center text-xs">
          <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-slate-600 text-red-600 dark:text-red-500 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] text-xs font-semibold rounded-md`}>
                {report.supplierType}
            </div>
          </td>     
          <td scope="col" className="px-1 text-center py-2">{report.wayId}</td>
          <td scope="col" className={`px-4 py-3 text-center`}>
              {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
            </td>    
          <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
            <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> getNotes(report.id)}>
               <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes == "" ? "text-purple-600" : "text-red-500 animate-pulse transition-all duration-300 ease-out"}  `}/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> editInvoice(report.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> handleAlert(report.id)}>
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
              {/* <h1 className='text-lg font-semibold font-mono '>{(number2 > 0 && !vvv) ? number2 : number}</h1> */}
              {/* <h1 className='font-mono '>מס' חשבוניות {data?.data.totalElements}</h1> */}
              <h1 className='font-mono '> {data?.data.totalElements} records</h1>
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
          size={windowWidth > 650 ? 'medium' : 'small'}
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
                  />
                );
              case 'next':
                return (
                  <PaginationItem
                    {...item}
                    onClick={handleNextClick}
                    disabled={page + 1 === data?.data.totalPages}
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
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> {setOpenAddInvoice(true)
                  getSuppliers()}}>
                       הכנס ת. משלוח 
                   </button>
                   <div class="flex items-center space-x-3 w-full md:w-auto relative">
                       <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                           <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                           אפשרויות
                       </button>
                       <div class={`${!action && 'hidden'} p-4 z-10 w-44 absolute top-10 flex flex-col space-y-1 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setFlag(!flag)}>
                              <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                              <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Print</h1>
                            </div>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer'>
                             <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
                           </div>
                           

                       </div>
                       <button className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" >
                           <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                               <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                           </svg>
                           פילטר
                           <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                       </button>
                      
                       <div className={`${filterMode && 'hidden'} relative left-1.5`}>       
        </div>
        <div className={`${!filterMode ? 'hidden' : 'inline'} relative left-1.5` }>       
        </div>
        
                   </div>
               </div>
               <div>

               </div>
               <div class="w-full md:w-2/4">
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
           <th scope="col" className="px-3 py-3 text-center">מחק</th>
           <th scope="col" className="px-3 py-3 text-center">ערוך</th>
           <th scope="col" className="px-3 py-3 text-center">הערות</th>
           <th scope="col" className="px-3 py-3 text-center">מע"מ</th>
           <th scope="col" className="px-3 py-3 text-center">תזרים</th>
           <th scope="col" className="px-3 py-3 text-center">מס' תעודה</th>
           <th scope="col" className="px-3 py-3 text-center">סוג ספק</th>
           <th scope="col" className="px-3 py-3 text-center">סכום</th>
           <th scope="col" className="px-3 py-3 text-center">שם ספק</th>
           <th scope="col" className="px-3 py-3 text-center">תאריך</th>
                       </tr>
                   </thead>
                   {/* (dateMode && !vvv) */}
                  {(dateMode && !vvv) ? (
                     <tbody>
                     {invoices?.map((report, index) => (
           <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
            
              <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
               <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> handleAlert(report.id)}>
                 <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
               </div>
             </td>
            
             <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
               <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> editInvoice(report.id)}>
                <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
               </div>
             </td>
             <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
             <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> getNotes(report.id)}>
                <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes == "אין הערות" ? "text-purple-600" : "text-red-500 animate-pulse transition-all duration-300 ease-out"}  `}/>
               </div>
             </td>
             <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-bold">{Number(report.amount).toLocaleString()}</td>
  
             <td scope="col" className={`px-4 py-3 text-center`}>
              {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
            </td>
             
           <td scope="col" className={`px-4 py-3 text-center text-sm ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" && <CheckIcon className='text-green-500' fontSize='small'/>}</span></td>
           {/* <td scope="col" className={`px-4 py-3 text-center ${report.paidOrNo == "שולם" && 'line-through'}`}>{report.paidOrNo}</td> */}
           <td scope="col" className={`px-4 py-3 text-center ${report.refund && "text-green-500 font-bold"}`}>{`${report.refund ? "זיכוי" : "-"}`}</td>
           <td scope="col" className="px-4 py-3 text-center">{report.paymentMethod}</td>
           <td scope="col" className="px-4 py-3 text-center text-xs">
           <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-slate-600 text-red-600 dark:text-red-500 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
                {report.supplierType}
            </div>
           </td>
           <td scope="col" className="px-4 py-3 text-center">{report.checkDate}</td>
           <td scope="col" className="px-4 py-3 text-center">{report.invoiceId}</td>
           <td scope="col" className="px-4 py-3 text-center">{report.supplierName}</td>
           <td scope="col" className="px-4 py-3 text-center font-semibold">{report.date}</td>
           </tr>
         ))}
                     </tbody>
                  ) : (
                    <tbody>
                       {data?.data.content.map((report, index) => (
              <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
              <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> handleAlert(report.id)}>
                <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
           
            <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> editInvoice(report.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
            <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> getNotes(report.id)}>
               <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes == "" ? "text-purple-600" : "text-red-500 animate-pulse transition-all duration-300 ease-out"}  `}/>
              </div>
            </td>
           
            <td scope="col" className={`px-4 py-3 text-center`}>
              {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
            </td>         
            <td scope="col" className="px-1 text-center py-1 text-xs">
            {report.tazrim ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActiveTazrim(report.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActiveTazrim(report.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
            <td scope="col" className="px-1 text-center py-2">{report.wayId}</td>
            <td scope="col" className="px-4 py-3 text-center text-xs">
          <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-slate-600 text-red-600 dark:text-red-500 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] text-xs font-semibold rounded-md`}>
                {report.supplierType}
            </div>
          </td>         
             <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-bold">{Number(report.amount).toLocaleString()}</td>
             <td scope="col" className="px-1 text-center py-2">{report.supplierName}</td>
             <th scope="col" className={`px-1 text-center py-2 dark:text-[#ccc]`} >{report.date}</th>
            </tr>
       ))}
                    </tbody>
                  )}
               </table>
           </div>
           <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {data?.data.content.map(report => (
                <div className="p-4 blue-glassmorphism hover:bg-gray-900 shadow rounded flex flex-col space-y-1">
                <div className='flex items-center justify-between space-x-2 '>
                <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 text-xl px-4 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
                  <h1 className='text-lg'>{report.supplierType}</h1>
              </div>
                  <div className='dark:text-[#ccc] font-mono text-lg'>
                    {report.date}
                    </div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.supplierName}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>שם ספק</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.wayId}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>מס' תעודה</div>
                </div>

                <div className={`flex items-center justify-end space-x-2 ${report.paidOrNo == "שולם" ? 'block' : 'hidden'}`}>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.paymentMethod}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>אמצעי תשלום</div>
                </div>
                <div className={`flex items-center justify-end space-x-2`}>
                <div scope="col" className="">{report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>מע"מ</div>
                </div>
                <div className='flex items-center justify-between space-x-4 relative top-1'>
                <div className='flex items-center justify-center space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(report.amount).toLocaleString()}</h1>
                  <h1 className='text-[#333] dark:text-[#ccc]'>סכום</h1>
                </div>
              <div className='flex items-center justify-center space-x-4'>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editInvoice(report.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
             <div className={`inline-flex text-xs leading-5 rounded-lg cursor-pointer px-1 py-1 ${report.notes != "" ? "bg-red-500 animate-pulse transition-all duration-300 ease-out" : 'dark:bg-slate-600'}`} onClick={()=> getNotes(report.id)}>
             <svg className='relative top-[1px]' width="24" height="24" viewBox="0 0 38 38" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.10714 0C3.75264 0 2.45362 0.538072 1.49585 1.49585C0.538072 2.45362 0 3.75264 0 5.10714V29.4643C0 30.8188 0.538072 32.1178 1.49585 33.0756C2.45362 34.0334 3.75264 34.5714 5.10714 34.5714H18.0714C17.5227 33.8418 17.0607 33.0508 16.6949 32.2143H5.10714C4.3778 32.2143 3.67832 31.9246 3.1626 31.4088C2.64687 30.8931 2.35714 30.1936 2.35714 29.4643V5.10714C2.35714 3.58914 3.58914 2.35714 5.10714 2.35714H29.4643C30.9823 2.35714 32.2143 3.58914 32.2143 5.10714V16.6949C33.0507 17.0602 33.8417 17.5216 34.5714 18.0699V5.10714C34.5714 3.75264 34.0334 2.45362 33.0756 1.49585C32.1178 0.538072 30.8188 0 29.4643 0H5.10714ZM8.64286 10.989C7.60094 10.989 6.60169 11.4029 5.86494 12.1397C5.12819 12.8764 4.71429 13.8757 4.71429 14.9176C4.71429 15.9595 5.12819 16.9587 5.86494 17.6955C6.60169 18.4322 7.60094 18.8461 8.64286 18.8461C9.68478 18.8461 10.684 18.4322 11.4208 17.6955C12.1575 16.9587 12.5714 15.9595 12.5714 14.9176C12.5714 13.8757 12.1575 12.8764 11.4208 12.1397C10.684 11.4029 9.68478 10.989 8.64286 10.989ZM7.07143 14.9176C7.07143 14.5008 7.23699 14.1011 7.53169 13.8064C7.82639 13.5117 8.22609 13.3461 8.64286 13.3461C9.05963 13.3461 9.45933 13.5117 9.75403 13.8064C10.0487 14.1011 10.2143 14.5008 10.2143 14.9176C10.2143 15.3343 10.0487 15.734 9.75403 16.0287C9.45933 16.3234 9.05963 16.489 8.64286 16.489C8.22609 16.489 7.82639 16.3234 7.53169 16.0287C7.23699 15.734 7.07143 15.3343 7.07143 14.9176ZM4.71429 25.9239C4.71429 24.8819 5.12819 23.8827 5.86494 23.1459C6.60169 22.4092 7.60094 21.9953 8.64286 21.9953C9.68478 21.9953 10.684 22.4092 11.4208 23.1459C12.1575 23.8827 12.5714 24.8819 12.5714 25.9239C12.5714 26.9658 12.1575 27.965 11.4208 28.7018C10.684 29.4385 9.68478 29.8524 8.64286 29.8524C7.60094 29.8524 6.60169 29.4385 5.86494 28.7018C5.12819 27.965 4.71429 26.9658 4.71429 25.9239ZM8.64286 24.3524C8.22609 24.3524 7.82639 24.518 7.53169 24.8127C7.23699 25.1074 7.07143 25.5071 7.07143 25.9239C7.07143 26.3406 7.23699 26.7403 7.53169 27.035C7.82639 27.3297 8.22609 27.4953 8.64286 27.4953C9.05963 27.4953 9.45933 27.3297 9.75403 27.035C10.0487 26.7403 10.2143 26.3406 10.2143 25.9239C10.2143 25.5071 10.0487 25.1074 9.75403 24.8127C9.45933 24.518 9.05963 24.3524 8.64286 24.3524ZM15.3214 12.5714C15.0089 12.5714 14.7091 12.6956 14.4881 12.9166C14.267 13.1377 14.1429 13.4374 14.1429 13.75C14.1429 14.0626 14.267 14.3624 14.4881 14.5834C14.7091 14.8044 15.0089 14.9286 15.3214 14.9286H28.6786C28.9912 14.9286 29.2909 14.8044 29.5119 14.5834C29.733 14.3624 29.8571 14.0626 29.8571 13.75C29.8571 13.4374 29.733 13.1377 29.5119 12.9166C29.2909 12.6956 28.9912 12.5714 28.6786 12.5714H15.3214ZM27.5 37.7143C30.209 37.7143 32.807 36.6381 34.7226 34.7226C36.6381 32.807 37.7143 30.209 37.7143 27.5C37.7143 24.791 36.6381 22.193 34.7226 20.2774C32.807 18.3619 30.209 17.2857 27.5 17.2857C24.791 17.2857 22.193 18.3619 20.2774 20.2774C18.3619 22.193 17.2857 24.791 17.2857 27.5C17.2857 30.209 18.3619 32.807 20.2774 34.7226C22.193 36.6381 24.791 37.7143 27.5 37.7143V37.7143ZM27.5 20.4286C27.7084 20.4286 27.9082 20.5114 28.0556 20.6587C28.2029 20.8061 28.2857 21.0059 28.2857 21.2143V26.7143H33.7857C33.9941 26.7143 34.194 26.7971 34.3413 26.9444C34.4887 27.0918 34.5714 27.2916 34.5714 27.5C34.5714 27.7084 34.4887 27.9082 34.3413 28.0556C34.194 28.2029 33.9941 28.2857 33.7857 28.2857H28.2857V33.7857C28.2857 33.9941 28.2029 34.194 28.0556 34.3413C27.9082 34.4887 27.7084 34.5714 27.5 34.5714C27.2916 34.5714 27.0918 34.4887 26.9444 34.3413C26.7971 34.194 26.7143 33.9941 26.7143 33.7857V28.2857H21.2143C21.0059 28.2857 20.8061 28.2029 20.6587 28.0556C20.5114 27.9082 20.4286 27.7084 20.4286 27.5C20.4286 27.2916 20.5114 27.0918 20.6587 26.9444C20.8061 26.7971 21.0059 26.7143 21.2143 26.7143H26.7143V21.2143C26.7143 21.0059 26.7971 20.8061 26.9444 20.6587C27.0918 20.5114 27.2916 20.4286 27.5 20.4286V20.4286ZM5.89286 4.71429C5.58028 4.71429 5.28051 4.83846 5.05948 5.05948C4.83846 5.28051 4.71429 5.58028 4.71429 5.89286C4.71429 6.20543 4.83846 6.50521 5.05948 6.72623C5.28051 6.94726 5.58028 7.07143 5.89286 7.07143H28.6786C28.9912 7.07143 29.2909 6.94726 29.5119 6.72623C29.733 6.50521 29.8571 6.20543 29.8571 5.89286C29.8571 5.58028 29.733 5.28051 29.5119 5.05948C29.2909 4.83846 28.9912 4.71429 28.6786 4.71429H5.89286Z"
          fill="#9ca3af"></path>
      </svg>
          </div>
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
          size={windowWidth > 650 ? 'medium' : 'small'}
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
        </>
      )}
        </>
      )}
     
       
      </section>
      
      
    <Snackbar open={openAlert} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? <>
          waybill deleted successfully
          </> : <>
          התעודה נמחקה בהצלחה
          </>}
        </Alert>
      </Snackbar>
      


     <Dialog open={openForm}>
        <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setIsOpenForm(false)}/>
        </div>
        <h1 className={`text-center ${hebrew ? "font-serif text-slate-600 text-3xl" : "font-mono text-amber-700 text-3xl"}`}>{hebrew ? "update waybill" : "עדכן תעודת משלוח"}</h1>
        <DialogContent>
        <form onSubmit={printValues} className='flex space-x-4 max-h-72 pb-8 overflow-y-hidden'>
                <div className='flex flex-col space-y-2 relative top-8'>
                {hebrew ? (
   <TextField type='text' label='invoice amount' defaultValue={invoice?.amount} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder='סכום חשבונית' onChange={e => setAmount(e.target.value)}/>
   
 ) : (
  <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
  <TextField type='text' label='סכום תעודה' defaultValue={invoice?.amount} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder='סכום חשבונית' onChange={e => setAmount(e.target.value)}/>
  </ThemeProvider>
</CacheProvider>
 )}
         
         {hebrew ? (
            <TextareaAutosize type='text' placeholder='הערות' className='bg-white relative top-8 border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500' defaultValue={invoice?.notes != "אין הערות" ? invoice?.notes : "no notes"} onChange={e => setNotes(e.target.value)}/>
         ) : (
          <TextareaAutosize type='text' placeholder='הערות' className='bg-white relative top-8 placeholder:text-right text-right border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500' defaultValue={invoice?.notes != "אין הערות" ? invoice?.notes : "אין הערות"} onChange={e => setNotes(e.target.value)}/>
         )}
         {hebrew ? (
          <>
          
         <div className='flex items-center space-x-1 justify-start'>
         <input type='checkbox' defaultChecked={!invoice?.vat} onChange={(e)=> setChecked(e.target.checked)}/>
          {/* <input type='checkbox' defaultChecked={invoice?.noVat == "ללא מע''מ"} onChange={(e)=> setChecked(e.target.checked)}/> */}
          <label>no vat</label>
         </div>
          </>
         ) : (
          <>
         
         <div className='flex items-center space-x-1 justify-end relative top-7'>
          <label>ללא מע"מ</label>
          {/* <input type='checkbox' defaultChecked={invoice?.noVat == "ללא מע''מ"} onChange={(e)=> setChecked(e.target.checked)}/> */}
          <input type='checkbox' defaultChecked={!invoice?.vat} onChange={(e)=> setChecked(e.target.checked)}/>
         </div>
          </>
         )}
         <button type='submit' className='bg-blue-200 relative top-8 px-2 py-[7px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>{hebrew ? "Update Way Bill" : "עדכן תעודת משלוח"}</button>
                </div>

                <div className='flex flex-col space-y-2'>
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "supllier name" : "שם ספק (לא ניתן לערוך)"}</InputLabel>
                <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
    <div dir="rtl">
                <TextField type='text' label='שם ספק' value={invoice?.supplierName} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1'/>
                </div>
  </ThemeProvider>
</CacheProvider>
<label className={`flex ${hebrew ? "justify-start" : "justify-end"} text-blue-500 font-mono`}>{hebrew ? "invoice date" : "תאריך תעודה"}</label>
  <TextField type='date' defaultValue={invoice?.date} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder='add date' onChange={e => setDate(e.target.value)}/>

{hebrew ? (
  <TextField type='number' label='invoice number' defaultValue={invoice?.wayId} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder="מס' חשבונית" onChange={e => setWayId(e.target.value)}/>
  
) : (
  <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
  <TextField type='number' label='מספר תעודה' defaultValue={invoice?.wayId} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder="מס' חשבונית" onChange={e => setWayId(e.target.value)}/>
  </ThemeProvider>
</CacheProvider>
)}


                </div>
              </form>
        </DialogContent>
       
    </Dialog>

    <Dialog open={openNoteDialog}>
        <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setOpenNoteDialog(false)}/>
        </div>      
        {hebrew ? (
          <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{notes != "" ? notes : "no notes"}</h1>
        ) : (
          <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{notes != "" ? notes : "אין הערות"}</h1>

        )}  
            {notes != "" && (
              <div className='flex flex-col items-center justify-center pb-2'>
                <h1 className='font-mono text-red-600'>מחיקת הערה</h1>
                <div className="flex items-center justify-center bg-red-100 p-1 w-fit h-fit rounded-lg cursor-pointer" onClick={deleteNotes}>
                  <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
                </div>
              </div>
            )}
    </Dialog>

    <Dialog open={flag}>
      <div className='w-full py-6 px-8 flex flex-col justify-center items-center'>
      {/* <div className='flex items-center justify-end p-2'> */}
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer self-end' fontSize='large' onClick={closeDialog}/>
      {/* </div> */}
        <h1 className='text-center font-mono text-amber-700 text-3xl'>הדפס חשבוניות</h1><br></br>
        <h1 className='text-center font-mono text-amber-600 text-lg'>ניתן לבחור חודש ושנה </h1>
        <h1 className='text-center font-mono text-amber-600 text-lg'>ניתן לבחור רק שנה</h1>
        <DialogContent>
        <form onSubmit={getExcel} className='flex space-x-4'>
                <div className='flex flex-col space-y-1'>
                 
                    <InputLabel id="demo-simple-select-label" className='text-right w-64'>חודש</InputLabel>
                    <Select className='bg-white shadow-xl rounded-md px-2 text-right' 
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
                      className='bg-white shadow-xl rounded-md px-2 text-right'>
                    {years.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select>
                  <button type='submit' disabled={(year == "" || month == "") } className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg mt-2 relative top-2'>הדפס דו"ח יומי</button>
                  <div className='flex items-center justify-center space-x-1 relative top-2'>
                    {(month != "" && year != "") && <h1 className='text-center text-blue-700 text-xl font-mono'>{year} - {month}</h1>}
                  </div>
                </div>
              </form>
        </DialogContent>
      </div>
      
    </Dialog>

    

      <Snackbar open={errorMode} autoHideDuration={20000} onClose={handleClose3} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose3}
          severity="error"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
             יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
        </Alert>
      </Snackbar>

      

    <Dialog open={dates}>
      
          <div className='flex flex-col justify-center items-center'>
          <DialogActions className='flex justify-between items-center'>
            <DialogTitle className='text-center font-mono' variant='h6'>בחר טווח תאריכים</DialogTitle>
          </DialogActions>
          <form onSubmit={getDates} className='flex flex-col items-center justify-center space-y-4 pb-2 px-4'>
           <TextField onChange={e => setDate1(e.target.value)} type='date' className='h-14'/>
           <TextField onChange={e => setDate2(e.target.value)} type='date' className='h-14'/>
           <div className='flex items-center justify-center space-x-8'>
             <button type='submit' className='bg-blue-200 px-4 py-[2px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' >שלח</button>
             <button className='bg-blue-200 px-4 py-[2px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setDates(false)}>בטל</button>
           </div>
          </form>
          </div>
        
        <div className='flex justify-around items-center pb-2'>
        </div>
    </Dialog>

    <Dialog open={openAddInvoice} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
      <div className='flex items-center justify-end px-2 py-1'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeInvoice}/>
        </div>
        <h1 className={`text-center ${hebrew ? 'font-serif text-slate-600 text-4xl' : 'font-mono text-amber-700'} text-2xl sm:text-3xl`}>{hebrew ? "add new waybill" : "הכנס תעודת משלוח"}</h1>
        {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}<CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
        </div>}
        {errors == 403 && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error"> יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
  <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
          {/* <CloseIcon className='text-red-500 cursor-pointer hover:scale-125 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/> */}
        </div>
        )}
        <DialogContent>
        <form id="myform" onSubmit={addInvoice} className='flex items-center justify-center space-x-2'>
                <div className={`flex flex-col space-y-2`}>
    {hebrew ? (
    <>
  <TextField InputLabelProps={{
        shrink: true,
      }} type='number' label='waybill amount' value={amount} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' onChange={e => setAmount(e.target.value)}/>
 
    </>
  ) : (
    <>
    <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
  <TextField InputLabelProps={{
        shrink: true,
      }} type='number' label='סכום תעודה' value={amount} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' onChange={e => setAmount(e.target.value)}/>
  </ThemeProvider>
</CacheProvider>
    </>
  )}
        
         <TextareaAutosize placeholder={hebrew ? "notes" : "הערות"} aria-label="empty textarea" type='text' className={`bg-white rounded-md relative top-7 h-14 p-2 ${hebrew ? "placeholder:text-left text-left" : "placeholder:text-right text-right"} border-[1px] border-gray-400 focus:outline-none focus:ring focus:border-blue-500 mt-1`} value={notes} onChange={e => setNotes(e.target.value)}/>

        {hebrew ? (
          <>
          <div className='flex items-center space-x-1 justify-start relative top-5'>
         <input type='checkbox' value={noVatInvoice} onChange={(e)=> setNoVatInvoice(!noVatInvoice)}/>
         <label>no vat</label>
         </div>
          </>
        ) : (
          <>
          <div className='flex items-center space-x-1 justify-end relative top-5'>
         <label>ללא מע"מ</label>
         <input type='checkbox' value={noVatInvoice} onChange={(e)=> setNoVatInvoice(!noVatInvoice)}/>
         </div>
          </>
        )}
         <button type='submit' disabled={supplierName == "" || amount == "" || date == ""} className='bg-blue-200 relative top-7 px-2 py-[6px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>{hebrew ? "add waybill" : "הכנס תעודה"}</button>

                </div>

                <div className='flex flex-col space-y-2'>
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? 'text-left font-serif' : 'font-mono text-right'}`}>{hebrew ? "supplier" : "ספק"}</InputLabel>
                 <Select
                    className='bg-white text-right focus:outline-none focus:ring focus:border-blue-500 mt-1'
                    value={supplierName}
                    onChange={handleChangeInvoice}
                  >
                    {suppliers.map((supplier)=> (
                        <MenuItem value={supplier.name} data-my-value={supplier.id} onClick={saveSupplierId}>{supplier.active && supplier.name}</MenuItem>
                      ))}
                  </Select>
                  <label className={`flex ${hebrew ? 'justify-start' : 'justify-end'} text-blue-500 font-mono text-xs sm:text-sm md:text-md`}>{hebrew ? "invoice date" : "תאריך תעודה"}</label>
  <TextField type='date' className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' value={date} placeholder='add date' onChange={e => setDate(e.target.value)}/>
  
{hebrew ? (
  <>
  <TextField InputLabelProps={{
        shrink: true,
      }} type='number' label='waybill id' className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' value={wayId} onChange={e => setWayId(e.target.value)}/>
 
  </>
) : (
  <>
  <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
  <TextField InputLabelProps={{
        shrink: true,
      }} type='number' label='מספר תעודה' className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' value={wayId} onChange={e => setWayId(e.target.value)}/>
  </ThemeProvider>
</CacheProvider>
  </>
)}
 

                </div>
              </form>
        </DialogContent>
       
    </Dialog>
      
    </>
  )
}

export default WayBill