import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Select, MenuItem, InputLabel} from '@mui/material'
import { PaginationItem } from '@mui/material';
import { Snackbar, Alert } from "@mui/material";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Dialog, DialogContent, TextField, Typography, DialogActions, DialogTitle } from '@mui/material'
// import CircularProgress from '@mui/material/CircularProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import EditIcon from '@mui/icons-material/Edit';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import CloseIcon from '@mui/icons-material/Close';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
// import FilterListIcon from '@mui/icons-material/FilterList';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckIcon from '@mui/icons-material/Check';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import LinearProgress from '@mui/material/LinearProgress';
import { ThemeContext } from "../App";
import axios from 'axios';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useQuery } from 'react-query'
import jsPDF from 'jspdf'
// import autoTable from 'jspdf-autotable'
import ReactToPrint  from 'react-to-print';
import useMediaQuery from '@mui/material/useMediaQuery';
import Swal from 'sweetalert2'
import AssessmentIcon from '@mui/icons-material/Assessment';




// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});


const doc = new jsPDF()


const NewInvoices = () => {

  const [isSSRE, setIsSSRE] = useState(true);
  const [isSSR, setIsSSR] = useState(true);
  const [ide, setIde] = useState();
  const [invoice, setInvoice] = useState({})
  const [supplierType, setSupplierType] = useState("")
  const [invoiceId, setInvoiceId] = useState("")
  const [amount, setAmount] = useState("")
  const [paidOrNo, setPaidOrNo] = useState("")
  const [date, setDate] = useState("")
  const [checkDate, setCheckDate] = useState("")
  const [checkNumber, setCheckNumber] = useState("")
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("")
  const [invoices, setInvoices] = useState([])
  const [openForm, setIsOpenForm] = useState(false)
  const [openAlert, setIsOpenAlert] = useState(false)
  const [refundInvice, setRefundInvice] = useState(false);
  const [checked, setChecked] = useState(invoice?.vat)
  const [checkedRefund, setCheckedRefund] = useState(invoice?.refund)
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [meeting, setMeeting] = useState(false)
  const [error, setError] = useState()
  const [errorMode, setErrorMode] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [flag, setFlag] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [monthNumber, setMonthNumber] = useState(0);
  const [loading, setLoading] = useState(false)
  const [flag2, setFlag2] = useState(false)
  const [page, setPage] = useState(0);
  const [supplierNameForReport, setSupplierNameForReport] = useState("");

//   const [page2, setPage2] = useState(0);
//   const [paging, setPaging] = useState([]);
//   const [number, setNumber] = useState();
//   const [number2, setNumber2] = useState(0);
//   const [pages, setPages] = useState();
//   const [pages2, setPages2] = useState(0);
//   const [pageNumber, setPageNumber] = useState();
//   const [filter, setFilter] = useState(false)
//   const [filterMode, setFilterMode] = useState(false)
  // const [fetchFlag, setFetchFlag] = useState(false)
  const [dates, setDates] = useState(false)
  const [date1, setDate1] = useState("")
  const [date2, setDate2] = useState("")
  const [dateMode, setDateMode] = useState(false)
  const [vvv, setVvv] = useState(false)
  const [rrr, setRrr] = useState(false)
  // const [openInvoiceAlert, setOpenInvoiceAlert] = useState(false)
  const [noVatInvoice, setNoVatInvoice] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [errorRes, setErrorRes] = useState([]);
  const [supplierId, setSupplierId] = useState();
  const [errors, setErrors] = useState()
  const [suppliers, setSuppliers] = useState([]);
//   const [scroll, setScroll] = useState(false)
  const [openCollectiveDialog, setOpenCollectiveDialog] = useState(false);
  const [part2, setPart2] = useState(false);
  const [reportAmount, setReportAmount] = useState();
  const [action, setAction] = useState(false)
  const [filterBar, setFilterBar] = useState(false)
  

  const [mode, setMode] = useState(true);
  const [total, setTotal] = useState();
  const [totalPages, setTotalPages] = useState();
  const [test, setTset] = useState();
  const [deleteNoteAlert, setDeleteNoteAlert] = useState(false);
  const [records, setRecords] = useState();

  const [openSuppliersReport, setOpenSuppliersReport] = useState(false);





  const navigate = useNavigate()

  const { hebrew, globalTheme } = useContext(ThemeContext)
  const componentRef = useRef();


  // const screen = window.screen.availWidth
  // const screenHeight = window.screen.availHeight

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)

  // const inv = JSON.parse(localStorage.getItem('invoice'));
  const def = JSON.parse(localStorage.getItem('deffrreal'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const arr2 = ["מזומן", "צ'ק", "כרטיס אשראי", "הוראת קבע", "העברה בנקאית", "ביט", "אחר", "-"];
  const arr1 = ["שולם", "לא שולם"];

  const arr = ["שולם", "לא שולם"];
  const arr3 = ["משתנה", "קבוע", "סחורה"];

  const arr4 = ["ללא מע''מ", "-"];

  const arr5 = ["זיכוי", "-"];

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
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/all-invoices-paging/${id}/${page}/100/date`)
  }
  
  const {data, refetch} = useQuery('invoices', ()=> getData(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: false,
      refetchOnWindowFocus:false
 
    }) 

    const getDataByType = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/all-invoices-paging-type/${id}/${page}/100/date/${supplierType}`)
    }
    
    const {data: type, refetch: refType} = useQuery('invoices-type', ()=> getDataByType(),
      {
        // enabled: !!supplier?.name,
        enabled: false,
        // staleTime: 300000
        refetchOnMount: false,
        refetchOnWindowFocus:false
   
      }) 

    

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
        text: "!לא ניתן יהיה לשחזר את החשבונית",
        icon: 'אזהרה',
        showCancelButton: true,
        confirmButtonText: '!כן מחק',
        cancelButtonText: '!לא למחוק',
        reverseButtons: true
      }).then((results) => {
        if (results.isConfirmed) {
          axios.delete("https://nartina.com/api/user/delete-invoice/" + id, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
            }
        })
          .then(res => {
          console.log(res.data)
            refetch()
            swalWithBootstrapButtons.fire(
              '!נמחק',
              'החשבונית נמחקה בהצלחה.',
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
            'פעולה בוטלה החשבונית לא נמחקה :)',
            'error'
          )
        }
      })
    }


    const getAmounts = (e) => {
      e.preventDefault();
      // const d = new Date(checkDate).getTime()
      axios.get("https://nartina.com/api/user/supplier-outcome-by-month3/" + result?.id + "/" + monthNumber + "/" + year + "/" + supplierName)
      .then(res => {setReportAmount(res.data)
      console.log(res.data)})
      .catch(err => console.log(err))
      // setMonth("")
      // setSupplierName("")
      // setYear("")
    }


   
    const getUnpaid = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/get-unpaid-invoices/${id}`)
    }
    
    const {data: unpaidInvoices} = useQuery('unpaid-invoices', ()=> getUnpaid(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: def,
        refetchOnWindowFocus:false
   
      }) 

  useEffect(() => {
    resizeWindow();
    console.log(window.innerHeight)
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);  
  }, [windowHeight, window.innerHeight]);



useEffect(() => {
  if(error == 403) {
    setErrorMode(true)
  }
  
}, [errorMode, error]);

useEffect(()=> {
  if(unpaidInvoices?.data > 0) {
    setMeeting(true)
  }
}, [unpaidInvoices?.data])


  useEffect(() => {
    setTimeout(() => {
      setIsSSRE(false);
    }, 1200)
    
  }, [isSSRE]);

  const dddd = (data) => {
    console.log("type-------> " + data)
    switch(data) {
      case "סחורה":
        localStorage.setItem('wares', true)
        console.log("---> wares")
        break;
      case "קבוע":
        localStorage.setItem('permanent', true)
        console.log("---> permanent")
        break;
      case "משתנה":
        localStorage.setItem('changeable', true)
        console.log("---> changeable")
        break;
      case "זיכוי":
        localStorage.setItem('refund', true)
        console.log("---> refund")
        break;
     
    }
    // setInvoiceType("")
}



  const addInvoice = (e) => {
    setLoading(true)
    e.preventDefault()
    if(date == "" || supplierName == "" || amount == "") {
      setErrorRes("שדות חובה חסרים")
      setLoading(false)
      return;
    }
    if(paidOrNo == "?האם שולם" || paidOrNo == "") {
      setErrorRes("יש לציין האם החשבונית שולמה או לא")
      setLoading(false)
      return;
    }

    if(paidOrNo == "שולם") {
      if(paymentMethod == "צורת תשלום" || paymentMethod == "") {
        setErrorRes("יש לציין צורת תשלום")
        setLoading(false)
        return;
      }
    }

    

    if(supplierName == "בחר ספק") {
      setErrorRes("יש לציין את שם הספק")
      setLoading(false)
      return;
    }
   
      axios.post("https://nartina.com/api/user/add-invoice-to-user/" + result?.id + "/" + supplierId , {
      paidOrNo: refundInvice == true ? "-" : paidOrNo,
      date,
      notes: notes != "" ? notes : "",
      // noVat: noVatInvoice == true ? "ללא מע''מ" : "-",
      vat: noVatInvoice == true ? false : true,
      // noRefund: refundInvice == true ? "זיכוי" : "-",
      refund: refundInvice == true ? true : false,
      supplierName,
      checkNumber,
      invoiceId,
      amount,
      checkDate,
      paymentMethod: refundInvice == true ? "-" : paymentMethod,
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {
      // setReload(true)
      // console.log("invoice-type---------> " + res.data)
      // setInvoiceType(res.data)
      setLoading(false)
      setErrorRes([])
      localStorage.setItem('invoice', true)
      console.log(res.data)
      // setOpenAddInvoice(false)
      setTset(false)
      Swal.fire("!הצלחה", '! חשבונית הוכנסה בהצלחה', "success")
      // setOpenInvoiceAlert(true)
      setRefundInvice(false)
      setNoVatInvoice(false)
      refetch()
      // console.log("invoice-type2---------> " + invoiceType)
      dddd(res.data)
    }) 
      .catch(err => {setErrorRes(err.response.data)
        Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error")
        setLoading(false)
        setErrors(err.response.status)})
        .finally(setRefundInvice(false),
        setNoVatInvoice(false),
        setLoading(false))
      
    //  if(checkDate != "" && errorRes != "") {
      if(checkDate != "") {
      const d = new Date(checkDate).getTime() + Math.random()*60000
      axios.post("https://nartina.com/api/user/add-deferral-payment/" + result?.id, {
        title: amount,
        invoice: "true",
        startDate: new Date(checkDate).toISOString(),
        endDate: new Date(d).toISOString(),
        notes: " שם ספק - " + supplierName + "\n" + " תאריך חשבונית - " + date + "\n " + " מס' חשבונית - " + invoiceId + "\n "  + " מספר צ'ק - " + checkNumber
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {console.log(res)
        Swal.fire("!הצלחה", '! חשבונית הוכנסה בהצלחה', "success")
      // navigate('/invoices')
      // setReload(true)
      refetch()
      setLoading(false)
      localStorage.setItem('invoice', true)
      localStorage.setItem('deffrreal', true)
      setTset(false)
      // setOpenInvoiceAlert(true)
    }) 
      .catch(err => {console.log(err)
        Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error")
        setLoading(false)
        setErrors(err.response.status)})
     }
      setRefundInvice(false)
      setNoVatInvoice(false)
      setDate("");
      setAmount("");
      setErrorRes("")
      setCheckDate("")
      // setSupplier({});
      setSupplierName("");
      setPaidOrNo("")
      setInvoiceId("")
      setPaymentMethod("")
      setCheckNumber("")
      setNotes("")
      // setReload(false)
      // setSubmit(false)
  
     
  }

 

  const closeInvoice = () => {
    setDate("");
      setAmount("");
      setCheckDate("")
      // setSupplier({});
      setSupplierName("");
      setPaidOrNo("")
      setInvoiceId("")
      setCheckNumber("")
      setPaymentMethod("")
      setNotes("")
      // setSubmit(false)
  
    // setOpenAddInvoice(false)
    setTset(false)
  }



  const printValues = (e)=> {
    e.preventDefault()
    if(checkedRefund) {
      setPaidOrNo("")
      setPaymentMethod("")
    }

    if(checkDate != ""){
      const d = new Date(checkDate).getTime() + Math.random()*60000
      axios.post("https://nartina.com/api/user/add-deferral-payment/" + result?.id, {
        title: invoice.amount,
        invoice: "true",
        startDate: new Date(checkDate).toISOString(),
        endDate: new Date(d).toISOString(),
        notes: " :שם ספק " + invoice.supplierName + "\n" + " :תאריך חשבונית " + invoice.date + "\n " + " :מס' חשבונית " + invoice.invoiceId + "\n " + " :מס' צ'ק " + checkNumber
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {
        Swal.fire("!הצלחה", '! חשבונית עודכנה בהצלחה', "success")
        // setIsOpenAlertAdd(true)
        localStorage.setItem('deffrreal', true)
        localStorage.setItem('invoice', true)
        refetch()}) 
      .catch(err=> {console.log(err)
        setError(err.response.status)})
    }
    
    axios.post("https://nartina.com/api/user/update-invoice/" + ide, {
      amount: amount != "" ? amount : invoice.amount,
      date: date != "" ? date : invoice.date,
      // noVat: noVat != "" ? noVat : invoice.noVat,
      // noRefund: noRefund != "" ? noRefund : invoice.noRefund,
      // noVat: noVat != "" ? noVat : invoice.noVat,
      // noVat: checked == undefined ? invoice.noVat : (checked == true ? "ללא מע''מ" : "-"),
      // noRefund: checkedRefund == undefined ? invoice.noRefund : (checkedRefund == true ? "זיכוי" : "-"),
      // supplierType: checkedRefund == undefined ? invoice.supplierType : (checkedRefund == true ? "זיכוי" : "-"),
      supplierType: invoice.supplierType,
      checkDate: checkDate != "" ? checkDate : invoice.checkDate,
      invoiceId: invoiceId != "" ? invoiceId : invoice.invoiceId,
      notes: notes != "" ? notes : invoice.notes,  
      paidOrNo: paidOrNo != "" ? paidOrNo : invoice.paidOrNo,
      paymentMethod: paymentMethod != "" ? paymentMethod : invoice.paymentMethod,
      refund: checkedRefund,
      vat: !checked
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {
      // setIsOpenAlertAdd(true)
      Swal.fire("!הצלחה", '! חשבונית עודכנה בהצלחה', "success")
      localStorage.setItem('invoice', true)
        setIsOpenForm(false)
        refetch()
        })
    .catch(err => {console.log(err)
      Swal.fire("מצטערים", 'קרתה תקלה, חשבונית לא עודכנה', "error")
      setError(err.response.status)})
    
  }

 

  const handleChange1 = (e) => {
    console.log("the value is: " + e.target.value);
    setPaidOrNo(e.target.value)
    
  }
  

  const getInvoice = async (id) => {
    const res = await fetch(`https://nartina.com/api/user/get-invoice-by-id/${id}`);
    const result = await res.json();
    setInvoice(result)
    setIsOpenForm(true)
}

const getInvoice2 = async (id) => {
  const res = await fetch(`https://nartina.com/api/user/get-invoice-by-id/${id}`);
  const result = await res.json();
  setInvoice(result)
  setOpenNoteDialog(true)
}

  const handleClose = () => {
    setIsOpenAlert(false)
  }

  // const handleClose2 = () => {
  //   setIsOpenAlertAdd(false)
  // }



  const handleCloseMeeting = () => {
    setMeeting(false)
  }

  const handleClose3 = () => {
    setErrorMode(false)
    setError("")
  }

  const deleteNotes = async () => {
    axios.get("https://nartina.com/api/user/delete-invoice-notes/" + ide)
    .then(res => {setOpenNoteDialog(false)
      setNotes("")
      setDeleteNoteAlert(true)
      refetch()
    // getInvoices()
  }).catch(err => console.log(err.response.data))
    
  }

  

  const handleYears = (e) => {
    setYear(e.target.value)
    }

    const handleType = (e) => {
      setSupplierType(e.target.value)
      
    }

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
    .then(res => {setInvoices(res.data.sortedInvoices)
      setRecords(res.data.numberOfRecords)
    console.log([res.data])})     
    .catch(err => console.log(err))
  }

  const getExcel = (e) => {
    e.preventDefault();
    getInvoicesForPdf()
    setFlag2(true)
    closeDialog()
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

  const handleRefund = () => {
    setRefundInvice(!refundInvice)
  }


  const editInvoice = (id) => {
    setIde(id)
    getInvoice(id)
  }

  const getNotes = (id) => {
    setIde(id)
    getInvoice2(id)
  }


const getDates = (e) => {
  e.preventDefault()
  axios.get("https://nartina.com/api/user/invoices-between/" + result?.id + "/date/0/50/" + date1 + "/" + date2)
  .then(res => {console.log(res.data)
    setDateMode(true)
    setVvv(false)
    setRrr(true)
    setTotal(res.data.totalElements)
    setTotalPages(res.data.totalPages)
    setInvoices(res.data.content)
   
  setDates(false)})
  .catch(err => console.log(err.response.data))
}

const getDates2 = (qqq) => {

  axios.get("https://nartina.com/api/user/invoices-between/" + result?.id + "/date/" + qqq +  "/50/" + date1 + "/" + date2)
  .then(res => {console.log(res.data)
    setDateMode(true)
    setVvv(false)
    // setRrr(true)
    setTotal(res.data.totalElements)
    setTotalPages(res.data.totalPages)
    setInvoices(res.data.content)
   
  setDates(false)})
  .catch(err => console.log(err.response.data))
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


  const handlePrevClick1 = () => {
    setPage((prevPage) => prevPage - 1);
    setTimeout(()=> {
        refType()
    }, 250)
  };
  
  const handleNextClick1 = () => {
    setPage((prevPage) => prevPage + 1);
    setTimeout(()=> {
      refType()
    }, 250)
  };

  const handlePrevClick2 = () => {
      setPage((prevPage) => prevPage - 1);
    setTimeout(()=> {
       getDates2(page - 1)
    }, 250)
  };
  
  const handleNextClick2 = () => {
      setPage((prevPage) => prevPage + 1);
    setTimeout(()=> {
      getDates2(page + 1)
    }, 250)
  };

const saveSupplierId = event => {
  const { myValue } = event.currentTarget.dataset;
  console.log(myValue) // --> 123
  const x = parseInt(myValue)
  setSupplierId(myValue)

}

const handleChangeInvoice = (e) => {
  console.log("the value is: " + e.target.value);
  setSupplierName(e.target.value)
  const selectedOption = e.target.options[e.target.selectedIndex];
  const myValue = selectedOption.getAttribute("data-my-value");
  setSupplierId(myValue)
  console.log("Selected value: " + myValue);
  
}

const handleChange3 = (e) => {
  console.log("the value is: " + e.target.value);
  setPaymentMethod(e.target.value)

}


const getSuppliers = () => {
  axios.get(`https://nartina.com/api/user/get-suppliers-by-user/${result?.id}`)
  .then(res => setSuppliers(res.data))
  .catch(err => console.log(err))
}

const collectInvoices = () => {
  getSuppliers()
  setOpenCollectiveDialog(true)
}


// const handleClose6 = () => {
//   setOpenInvoiceAlert(false)
// }

const handleClose9 = () => {
  setDeleteNoteAlert(false)
}

const getAmount2 = () => {
  const d = new Date(checkDate).getTime()
  axios.get("https://nartina.com/api/user/supplier-outcome-by-month2/" + result?.id + "/" + monthNumber + "/" + year + "/" + supplierName + "/" + d)
  .then(res => setAmount(res.data))
  .catch(err => console.log(err))
  // setMonth("")
  // setSupplierName("")
  // setYear("")
}

const closeCollectivy = () => {
  setYear("")
  setMonth("")
  setMonthNumber("")
  setSupplierName("")
  setReportAmount("")
  setPaymentMethod("")
  setCheckDate("")
  setCheckNumber("")
  setPart2(false)
  setOpenCollectiveDialog(false)
}

const addCollectiveyInvoice = () => {
  const d = new Date(checkDate).getTime() + Math.random()*60000
  axios.post("https://nartina.com/api/user/add-deferral-payment/" + result?.id, {
  title: reportAmount,
  invoice: "true",
  startDate: new Date(checkDate).toISOString(),
  endDate: new Date(d).toISOString(),
  notes: " שם ספק - " + supplierName + "\n" + " עבור" + " - " + new Date(checkDate).getFullYear()+ " " + "/" + " " + monthNumber + "\n " + " אמצעי תשלום - " + paymentMethod + "\n " + " מספר צ'ק - " + checkNumber
}, {
  headers: {
    Authorization: 'Bearer ' + result?.token,

   }
}).then(res => {console.log(res.data)
  getAmount2()
  localStorage.setItem('deffrreal', true)
  navigate("/reports")}) 
.catch(err=> {console.log(err)
  setError(err.response.status)})
  // getAmount2()
 .finally(closeCollectivy())
  
}


const handleChangeWares = () => {
  setSupplierType("סחורה")
  setMode(false)
  setFilterBar(false)
  setTimeout(()=> {
    refType()
  }, 150)
}

const handleChangeChange = () => {
  setSupplierType("משתנה")
  setMode(false)
  setFilterBar(false)
  setTimeout(()=> {
    refType()
  }, 150)
}

const handleChangePer = () => {
  setSupplierType("קבוע")
  setMode(false)
  setFilterBar(false)
  setTimeout(()=> {
    refType()
  }, 150)
}

const handleBackChange = () => {
  setSupplierType("")
  setMode(true)
  setFilterBar(false)
  setDateMode(false)
  // setTimeout(()=> {
    refetch()
  // }, 300)
  setTimeout(()=> {
    setRrr(false)
  }, 200)
}

const handleChangeSupplierReport = (e) => {
  setSupplierNameForReport(e.target.value)
}

const closeSuppliersReport = () => {
  setOpenSuppliersReport(false)
  setMonth("")
  setSupplierNameForReport("")
  setYear("")
  setReportAmount("")
}

const getAmount = (e) => {
  e.preventDefault();
  setLoading(true)
  axios.get("https://nartina.com/api/user/supplier-outcome-by-month3/" + result?.id + "/" + monthNumber + "/" + year + "/" + supplierNameForReport)
  .then(res => {setReportAmount(res.data)
  setLoading(false)})
  .catch(err => console.log(err))
  
}

  return (
    <>
    {mode ? (
        <section class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${(globalTheme != "light" && !flag2) && "bg-gray-700 dark"}`}>
      {hebrew ? (
          <>
          {flag2 ? (
            <>
             <div className='flex justify-between items-center py-1 px-5'>
          {/* <div></div> */}
          <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={printPdf2}>
              <CloseIcon className='hover:text-red-600 text-red-500'/>
            </div>
           <ReactToPrint
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return <a href="#">
                      <div className="flex items-center justify-center">
                      <div className="flex items-center justify-center space-x-1 bg-blue-200 hover:bg-blue-300 rounded-md px-2 py-[2px] w-fit" onClick={()=> setFlag(false)}> 
                      <h1 className="font-mono text-blue-600 font-semibold">הדפס</h1>
                      <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-4'/> 
                      </div>
                      </div>
              </a>;
            }}
            content={() => componentRef.current}
            documentTitle='חשבוניות'
          />
           {/* <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={printPdf2}>
              <CloseIcon className='hover:text-red-600 text-red-500'/>
            </div> */}
          </div>
          <div className=''>
          {hebrew ? (
            <table ref={componentRef} className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]" >
            <thead className="bg-gray-50">
              <tr>
              <th scope="col" className="px-1 py-3 text-center">date</th>
                <th scope="col" className="px-1 py-3 text-center">supplier</th>
                <th scope="col" className="px-1 py-3 text-center">invoice id</th>
                <th scope="col" className="px-1 py-3 text-center">due net</th>
                <th scope="col" className="px-1 py-3 text-center">type</th>
                <th scope="col" className="px-1 py-3 text-center">pay method</th>
                <th scope="col" className="px-1 py-3 text-center">refund?</th>
                <th scope="col" className="px-1 py-3 text-center">is paid?</th>
                <th scope="col" className="px-1 py-3 text-center">vat?</th>
                <th scope="col" className="px-1 py-3 text-center">amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices?.map((report, index) => (
                 <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm text-gray-600 dark:text-gray-300 font-semibold">{report.date}</td>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.supplierName}</td>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.invoiceId}</td>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.checkDate}</td>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">
                 <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-slate-600 text-red-600 dark:text-red-500 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
                   {report.supplierType}
                 </div>
                 </td>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.paymentMethod}</td>
                 <td scope="col" className="px-4 py-3 text-center">{`${report.refund ? "זיכוי" : "-"}`}</td>
                 <td scope="col" className={`px-4 py-3 text-center ${report.paidOrNo == "שולם" && 'line-through'}`}>{report.paidOrNo}</td>
   
                 <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>
                 {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
                 </td>
                 <td scope="col" className="px-1 text-center py-2 text-md font-semibold text-green-600 dark:text-green-500">{Number(report.amount).toLocaleString()}</td>
                 
                 </tr>
              ))}
            </tbody>
          </table>
          ) : (
            <table ref={componentRef} className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
        <thead className="bg-gray-50">
          <tr>
           <th scope="col" className="px-3 py-3 text-center">סכום</th>
           <th scope="col" className="px-3 py-3 text-center">מע"מ</th>
           <th scope="col" className="px-3 py-3 text-center">שולם</th>
           <th scope="col" className="px-3 py-3 text-center">זיכוי</th>
           <th scope="col" className="px-3 py-3 text-center">אמצעי תשלום</th>
           <th scope="col" className="px-3 py-3 text-center">סוג</th>
           <th scope="col" className="px-3 py-3 text-center">מועד פרעון</th>
           <th scope="col" className="px-3 py-3 text-center">מס' חשבונית</th>
           <th scope="col" className="px-3 py-3 text-center">שם ספק</th>
           <th scope="col" className="px-3 py-3 text-center">תאריך</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices?.map((report, index) => (
            <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
            
              <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-bold">{Number(report.amount).toLocaleString()}</td>
   
              <td scope="col" className={`px-4 py-3 text-center`}>
               {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
                </td>
            <td scope="col" className={`px-4 py-3 text-center text-sm ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" && <CheckIcon className='text-green-500' fontSize='small'/>}</span></td>
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
      </table>
          )}
      </div>
            </>
          ) : (
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
                     
                     <div class="flex items-center space-x-3 w-full md:w-auto">
                         <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                             <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                 <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                             </svg>
                             Actions
                         </button>
                         <div class={`${!action && 'hidden'} p-4 z-10 w-44 absolute top-10 flex flex-col space-y-1 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                             <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                 <li className='cursor-pointer' onClick={()=> setFlag(!flag)}>
                                   <div className='flex items-center rounded space-x-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:pl-2'>
                                     <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                                     <h1 class="block py-2 ">Print</h1>
                                   </div>
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
                     <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> {setTset(true)
                   getSuppliers()}}>
                         Add Invoice
                     </button>
                 </div>
                 
             </div>
             <div class="overflow-x-auto">
                 <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
                     <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                         <tr>
               <th scope="col" className="px-1 py-3 text-center">date</th>
               <th scope="col" className="px-1 py-3 text-center">supplier</th>
               <th scope="col" className="px-1 py-3 text-center">invoice id</th>
               <th scope="col" className="px-1 py-3 text-center">due net</th>
               <th scope="col" className="px-1 py-3 text-center">type</th>
               <th scope="col" className="px-1 py-3 text-center">pay method</th>
               <th scope="col" className="px-1 py-3 text-center">refund?</th>
               <th scope="col" className="px-1 py-3 text-center">is paid?</th>
               <th scope="col" className="px-1 py-3 text-center">vat?</th>
               <th scope="col" className="px-1 py-3 text-center">amount</th>
               <th scope="col" className="px-1 py-3 text-center">notes</th>
               <th scope="col" className="px-1 py-3 text-center">edit</th>
               <th scope="col" className="px-1 py-3 text-center">delete</th>
                         </tr>
                     </thead>
                     <tbody>
                     {data?.data.content.map((report, index) => (
               <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm text-gray-600 dark:text-gray-300 font-semibold">{report.date}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.supplierName}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.invoiceId}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.checkDate}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">
               <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
                 {report.supplierType}
               </div>
               </td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.paymentMethod}</td>
               <td scope="col" className="px-4 py-3 text-center">{`${report.refund ? "זיכוי" : "-"}`}</td>
               <td scope="col" className={`px-4 py-3 text-center ${report.paidOrNo == "שולם" && 'line-through'}`}>{report.paidOrNo}</td>
  
               <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>
               {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
               </td>
             
               <td scope="col" className="px-1 text-center py-2 text-md font-semibold text-green-600 dark:text-green-500">{Number(report.amount).toLocaleString()}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
               <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> getNotes(report.id)}>
               <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
              </div>
             </td>
               <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
               <div className="inline-flex text-xs leading-5 px-1 py-1 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer " onClick={()=> editInvoice(report.id)}>
                <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
               </div>
             </td>
             <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
             <div className="inline-flex text-xs leading-5 px-1 py-1 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer " onClick={()=> handleAlert(report.id)}>
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
          )}
         
          </>
      ) : (
          <>
          {flag2 ? (
            <>
             <div className='flex justify-between items-center py-1 px-8'>
          {/* <div></div> */}
          <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={printPdf2}>
              <CloseIcon className='hover:text-red-600 text-red-500'/>
            </div>
           <ReactToPrint
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return <a href="#">
                      <div className="flex items-center justify-center">
                      <div className="flex items-center justify-center space-x-1 bg-blue-200 hover:bg-blue-300 rounded-md px-2 py-[2px] w-fit" onClick={()=> setFlag(false)}> 
                      <h1 className="font-mono text-blue-600 font-semibold">הדפס</h1>
                      <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-4'/> 
                      </div>
                      </div>
              </a>;
            }}
            content={() => componentRef.current}
            documentTitle='חשבוניות'
          />
           {/* <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={printPdf2}>
              <CloseIcon className='hover:text-red-600 text-red-500'/>
            </div> */}
          </div>
          <div className=''>
          {hebrew ? (
            <table ref={componentRef} className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]" >
            <thead className="bg-gray-50">
              <tr>
              <th scope="col" className="px-1 py-3 text-center">date</th>
                <th scope="col" className="px-1 py-3 text-center">supplier</th>
                <th scope="col" className="px-1 py-3 text-center">invoice id</th>
                <th scope="col" className="px-1 py-3 text-center">due net</th>
                <th scope="col" className="px-1 py-3 text-center">type</th>
                <th scope="col" className="px-1 py-3 text-center">pay method</th>
                <th scope="col" className="px-1 py-3 text-center">refund?</th>
                <th scope="col" className="px-1 py-3 text-center">is paid?</th>
                <th scope="col" className="px-1 py-3 text-center">vat?</th>
                <th scope="col" className="px-1 py-3 text-center">amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices?.map((report, index) => (
                 <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm text-gray-600 dark:text-gray-300 font-semibold">{report.date}</td>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.supplierName}</td>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.invoiceId}</td>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.checkDate}</td>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">
                 <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-slate-600 text-red-600 dark:text-red-500 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
                   {report.supplierType}
                 </div>
                 </td>
                 <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.paymentMethod}</td>
                 <td scope="col" className="px-4 py-3 text-center">{`${report.refund ? "זיכוי" : "-"}`}</td>
                 <td scope="col" className={`px-4 py-3 text-center ${report.paidOrNo == "שולם" && 'line-through'}`}>{report.paidOrNo}</td>
   
                 <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>
                 {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
                 </td>
                 <td scope="col" className="px-1 text-center py-2 text-md font-semibold text-green-600 dark:text-green-500">{Number(report.amount).toLocaleString()}</td>
                 
                 </tr>
              ))}
            </tbody>
          </table>
          ) : (
           <div ref={componentRef}>
             <table className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
        <thead className="bg-gray-50">
          <tr>
           <th scope="col" className="px-3 py-3 text-center">סכום</th>
           <th scope="col" className="px-3 py-3 text-center">מע"מ</th>
           <th scope="col" className="px-3 py-3 text-center">שולם</th>
           <th scope="col" className="px-3 py-3 text-center">זיכוי</th>
           <th scope="col" className="px-3 py-3 text-center">אמצעי תשלום</th>
           <th scope="col" className="px-3 py-3 text-center">סוג</th>
           <th scope="col" className="px-3 py-3 text-center">מועד פרעון</th>
           <th scope="col" className="px-3 py-3 text-center">מס' חשבונית</th>
           <th scope="col" className="px-3 py-3 text-center">שם ספק</th>
           <th scope="col" className="px-3 py-3 text-center">תאריך</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices?.map((report, index) => (
            <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
            
              <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-bold">{Number(report.amount).toLocaleString()}</td>
   
              <td scope="col" className={`px-4 py-3 text-center`}>
               {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
                </td>
            <td scope="col" className={`px-4 py-3 text-center text-sm ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" && <CheckIcon className='text-green-500' fontSize='small'/>}</span></td>
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
      </table>
      <nav class="flex flex-col md:flex-row justify-between items-start md:items-center mr-12 space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
    <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
       <h1 className='font-mono '> {records} מס' דו"חות</h1>
    </div>
    {/* <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(totalSum)).toLocaleString()} סכום דו"חות</h1> */}
    </nav>
           </div>
          )}
      </div>
            </>
          ) : (
            <>
            <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">
         
         <div class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
             <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                 
                 <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                     {/* <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> {setOpenAddInvoice(true)
                    getSuppliers()}}>
                         הכנס חשבונית 
                     </button> */}
                          <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> {setTset(true)
                    getSuppliers()}}>
                         הכנס חשבונית 
                     </button>
                     <div class="flex items-center space-x-3 w-full md:w-auto relative">
                         <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                             <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                 <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                             </svg>
                             אפשרויות
                         </button>
                         <div class={`${!action && 'hidden'} p-4 z-10 w-44 absolute top-10 right-4 flex flex-col space-y-1 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                              <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> {setFlag(!flag)
                              setAction(!action)}}>
                                <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                                <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Print</h1>
                              </div>
                              <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> {setOpenSuppliersReport(true)
                              setAction(!action)
                                getSuppliers()}}>
                             <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                             <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
                           </div>
                             {/* <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setOpenAddInvoice(true)}> */}
                               <button className='bg-blue-500 rounded text-white px-2 text-sm hover:bg-blue-400 tracking-wide relative top-1' onClick={collectInvoices}>תשלום מרוכז</button>
                      
  
                         </div>
                         <button className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setFilterBar(!filterBar)}>
                             <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                 <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                             </svg>
                             פילטר
                             <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                 <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                             </svg>
                         </button>
                         <div class={`${!filterBar && 'hidden'} z-10 absolute top-10 left-7 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}>
                             <h6 class="mb-3 text-sm font-medium text-right text-gray-900 dark:text-white">בחר סוג חשבונית</h6>
                             {/* <ul class="space-y-2 text-sm flex flex-col items-end justify-end" >
                                 <li class="flex items-center">
                                     <label for="apple" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">סחורה</label>
                                     <input id="apple" type="checkbox" 
          onChange={(e) => setCheckedWares(e.target.checked)} value={checkedWares} class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                 <li class="flex items-center">
                                     <label for="fitbit" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">משתנות</label>
                                     <input id="fitbit" type="checkbox" 
          onChange={(e) => setCheckedChange(e.target.checked)} value={checkedChange} class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                 <li class="flex items-center">
                                     <label for="razor" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">קבועות</label>
                                     <input id="razor" type="checkbox" 
          onChange={(e) => setCheckedPer(e.target.checked)} value={checkedPer} class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                 <div className='bg-gray-300 h-[0.2px] w-4/5'/>
                                 <li class="flex items-center">
                                     <label for="apple" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">לא שולמו</label>
                                     <input id="apple" type="checkbox" 
           value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                 <li class="flex items-center">
                                     <label for="fitbit" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">שולמו</label>
                                     <input id="fitbit" type="checkbox" 
           value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                 <li class="flex items-center">
                                     <label for="razor" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">זיכוי</label>
                                     <input id="razor" type="checkbox" 
           value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                
                             </ul> */}

                                  <ul class="space-y-2 text-sm flex flex-col items-end justify-end" >
                                 <li class="flex items-center">
                                  <button className='text-[#333] dark:text-[#ccc]' onClick={()=> handleChangeWares()}>סחורה</button>
                                 </li>
                                 <li class="flex items-center">
                                  <button className='text-[#333] dark:text-[#ccc]' onClick={()=> handleChangeChange()}>משתנה</button>
                                 </li>
                                 <li class="flex items-center">
                                  <button className='text-[#333] dark:text-[#ccc]' onClick={()=> handleChangePer()}>קבוע</button>
                                 </li>
                                 <div className='bg-gray-300 h-[0.2px] w-4/5'/>
                                 <li class="flex items-center">
                                     <label for="apple" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">לא שולמו</label>
                                     <input id="apple" type="checkbox" 
                                        value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                 <li class="flex items-center">
                                     <label for="fitbit" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">שולמו</label>
                                     <input id="fitbit" type="checkbox" 
           value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                 <li class="flex items-center">
                                     <label for="razor" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">זיכוי</label>
                                     <input id="razor" type="checkbox" 
           value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                
                             </ul>
                             
                         </div>
                         
          <div className='relative left-1.5'>
            {rrr ? (
              <EventBusyIcon onClick={handleBackChange} className='text-sky-800 cursor-pointer hover:scale-110'/>
            ) : (
             <CalendarMonthIcon onClick={()=> setDates(true)} className='text-sky-800 cursor-pointer hover:scale-110'/>
            )}
          </div>
                         {/* <div className='relative top-1 right-2' onClick={()=> setFlag(!flag)}>
                           <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-5 -mt-2'/>
                         </div>
                         <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 relative top-[1px] right-2' onClick={()=> setOpenDailyIncomeReport(true)}/> */}
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
           <th scope="col" className="px-3 py-3 text-center">סכום</th>
           <th scope="col" className="px-3 py-3 text-center">מע"מ</th>
           <th scope="col" className="px-3 py-3 text-center">שולם</th>
           <th scope="col" className="px-3 py-3 text-center">זיכוי</th>
           <th scope="col" className="px-3 py-3 text-center">אמצעי תשלום</th>
           <th scope="col" className="px-3 py-3 text-center">סוג</th>
           <th scope="col" className="px-3 py-3 text-center">מועד פרעון</th>
           <th scope="col" className="px-3 py-3 text-center">מס' חשבונית</th>
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
               <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
                 </div>
               </td>
               <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-bold">{Number(report.amount).toLocaleString()}</td>
    
               <td scope="col" className={`px-4 py-3 text-center`}>
                {/* {`${report.vat ? "כן" : 'ללא'}`} */}{report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
              </td>
               
             <td scope="col" className={`px-4 py-3 text-center text-sm ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" && <CheckIcon className='text-green-500' fontSize='small'/>}</span></td>
             {/* <td scope="col" className={`px-4 py-3 text-center ${report.paidOrNo == "שולם" && 'line-through'}`}>{report.paidOrNo}</td> */}
             <td scope="col" className={`px-4 py-3 text-center ${report.refund && "text-green-500 font-bold"}`}>{`${report.refund ? "זיכוי" : "-"}`}</td>
             <td scope="col" className="px-4 py-3 text-center">{report.paymentMethod}</td>
             <td scope="col" className="px-4 py-3 text-center text-xs">
             <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
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
                 <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
                </div>
              </td>
              <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-bold">{Number(report.amount).toLocaleString()}</td>
   
              {/* <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>{`${report.vat ? "כן" : 'ללא'}`}</td> */}
              <td scope="col" className={`px-4 py-3 text-center`}>
                {/* {`${report.vat ? "כן" : 'ללא'}`} */}{report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
                </td>
            <td scope="col" className={`px-4 py-3 text-center text-sm ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" && <CheckIcon className='text-green-500' fontSize='small'/>}</span></td>
            {/* <td scope="col" className={`px-4 py-3 text-center ${report.paidOrNo == "שולם" && 'line-through'}`}>{report.paidOrNo}</td> */}
            <td scope="col" className={`px-4 py-3 text-center ${report.refund && "text-green-500 font-bold"}`}>{`${report.refund ? "זיכוי" : "-"}`}</td>
            <td scope="col" className="px-4 py-3 text-center">{report.paymentMethod}</td>
            <td scope="col" className="px-4 py-3 text-center text-xs">
            <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
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
                    )}
                 </table>
             </div>
             <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {data?.data.content.map(report => (
                // <div className={`p-4 ${globalTheme == "light" ? 'white-glassmorphism shadow rounded-lg ' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-0.5`}>
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
                <div className='text-right font-mono dark:text-[#ccc]'>{report.invoiceId}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>מס' חשבונית</div>
                </div>

                <div className={`flex items-center justify-end ${report.paidOrNo == "שולם" ? 'space-x-2' : 'space-x-0'}`}>
                <div scope="col" className={`px-2 py-1 text-end text-lg dark:text-[#ccc] tracking-wide ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-600 dark:text-red-500' fontSize='small'/>}</span></div>
                <div className='text-right dark:text-[#ccc]'>?האם שולם</div>
                </div>
                <div className={`flex items-center justify-end space-x-2 ${report.paidOrNo == "שולם" ? 'block' : 'hidden'}`}>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.paymentMethod}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>אמצעי תשלום</div>
                </div>
                <div className={`flex items-center justify-end space-x-2`}>
                <div scope="col" className={`px-2 py-1 text-center ${report.refund ? "text-green-500 font-bold dark:text-green-500" : "dark:text-[#ccc]"}`}>{`${report.refund ? "זיכוי" : "-"}`}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>זיכוי</div>
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
             {dateMode ? (
              <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
             
                 <h1 className='font-mono '>מס' רשומות {total}</h1>
              </div>
           <Pagination
             count={totalPages}
             page={page + 1}
             onChange={(event, value) => {setPage(value - 1)
             setTimeout(()=> {
                 getDates2(value - 1)
             }, 250)}}
             color="primary"
             variant="outlined"
             size='medium'
             shape="rounded"
             disabled={totalPages === 1}
             sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}
             renderItem={(item) => {
               switch (item.type) {
                 case 'previous':
                   return (
                     <PaginationItem
                       {...item}
                       onClick={handlePrevClick2}
                       disabled={page + 1 === 1}
                       style={{ backgroundColor: globalTheme == "light" && windowWidth > 766 ? 'white' : '#3b82f6', color: globalTheme == "light" && windowWidth > 766 ? 'gray' : 'white' }}

                     />
                   );
                 case 'next':
                   return (
                     <PaginationItem
                       {...item}
                       onClick={handleNextClick2}
                       disabled={page + 1 === totalPages}
                       style={{ backgroundColor: globalTheme == "light" && windowWidth > 766 ? 'white' : '#3b82f6', color: globalTheme == "light" && windowWidth > 766 ? 'gray' : 'white' }}

                     />
                   );
                 default:
                   return <PaginationItem {...item} />;
               }
             }}
           />
                  
              </nav>
             ) : (
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
             )}
         </div>
     </div>
            </>
          )}
          </>
      )}
      </section>
    ) : (
      <section class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[97%] overflow-y-auto scrollbar-none ${globalTheme != "light" && "bg-gray-700 dark"}`}>
    {hebrew ? (
        <>
        {flag2 ? (
          <>
           <div className='flex justify-between items-center py-1 pr-3'>
        {/* <div></div> */}
        <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={printPdf2}>
            <CloseIcon className='hover:text-red-600 text-red-500'/>
          </div>
         <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">
                    <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center space-x-1 bg-blue-200 hover:bg-blue-300 rounded-md px-2 py-[2px] w-fit" onClick={()=> setFlag(false)}> 
                    <h1 className="font-mono text-blue-600 font-semibold">הדפס</h1>
                    <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-4'/> 
                    </div>
                    </div>
            </a>;
          }}
          content={() => componentRef.current}
          documentTitle='חשבוניות'
        />
         {/* <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={printPdf2}>
            <CloseIcon className='hover:text-red-600 text-red-500'/>
          </div> */}
        </div>
        <div className=''>
        {hebrew ? (
          <table ref={componentRef} className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]" >
          <thead className="bg-gray-50">
            <tr>
            <th scope="col" className="px-1 py-3 text-center">date</th>
              <th scope="col" className="px-1 py-3 text-center">supplier</th>
              <th scope="col" className="px-1 py-3 text-center">invoice id</th>
              <th scope="col" className="px-1 py-3 text-center">due net</th>
              <th scope="col" className="px-1 py-3 text-center">type</th>
              <th scope="col" className="px-1 py-3 text-center">pay method</th>
              <th scope="col" className="px-1 py-3 text-center">refund?</th>
              <th scope="col" className="px-1 py-3 text-center">is paid?</th>
              <th scope="col" className="px-1 py-3 text-center">vat?</th>
              <th scope="col" className="px-1 py-3 text-center">amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices?.map((report, index) => (
               <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm text-gray-600 dark:text-gray-300 font-semibold">{report.date}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.supplierName}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.invoiceId}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.checkDate}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">
               <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
                 {report.supplierType}
               </div>
               </td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.paymentMethod}</td>
               <td scope="col" className="px-4 py-3 text-center">{`${report.refund ? "זיכוי" : "-"}`}</td>
               <td scope="col" className={`px-4 py-3 text-center ${report.paidOrNo == "שולם" && 'line-through'}`}>{report.paidOrNo}</td>
 
               <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>
               {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
               </td>
               <td scope="col" className="px-1 text-center py-2 text-md font-semibold text-green-600 dark:text-green-500">{Number(report.amount).toLocaleString()}</td>
               
               </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <table ref={componentRef} className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
      <thead className="bg-gray-50">
        <tr>
         <th scope="col" className="px-3 py-3 text-center">סכום</th>
         <th scope="col" className="px-3 py-3 text-center">מע"מ</th>
         <th scope="col" className="px-3 py-3 text-center">שולם</th>
         <th scope="col" className="px-3 py-3 text-center">זיכוי</th>
         <th scope="col" className="px-3 py-3 text-center">אמצעי תשלום</th>
         <th scope="col" className="px-3 py-3 text-center">סוג</th>
         <th scope="col" className="px-3 py-3 text-center">מועד פרעון</th>
         <th scope="col" className="px-3 py-3 text-center">מס' חשבונית</th>
         <th scope="col" className="px-3 py-3 text-center">שם ספק</th>
         <th scope="col" className="px-3 py-3 text-center">תאריך</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {invoices?.map((report, index) => (
          <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
          
            <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-bold">{Number(report.amount).toLocaleString()}</td>
 
            <td scope="col" className={`px-4 py-3 text-center`}>
             {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
              </td>
          <td scope="col" className={`px-4 py-3 text-center text-sm ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" && <CheckIcon className='text-green-500' fontSize='small'/>}</span></td>
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
    </table>
        )}
    </div>
          </>
        ) : (
          <>
           <div class="mx-auto w-full px-4 lg:px-2 h-[90vh] mt-14">
       
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
                       <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                           <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                           Actions
                       </button>
                       <div class={`${!action && 'hidden'} p-4 z-10 w-44 absolute top-10 flex flex-col space-y-1 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                           <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                               <li className='cursor-pointer' onClick={()=> setFlag(!flag)}>
                                 <div className='flex items-center rounded space-x-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:pl-2'>
                                   <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                                   <h1 class="block py-2 ">Print</h1>
                                 </div>
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
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> {setTset(true)
                 getSuppliers()}}>
                       Add Invoice
                   </button>
               </div>
               
           </div>
           <div class="overflow-x-auto">
               <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
                   <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                       <tr>
             <th scope="col" className="px-1 py-3 text-center">date</th>
             <th scope="col" className="px-1 py-3 text-center">supplier</th>
             <th scope="col" className="px-1 py-3 text-center">invoice id</th>
             <th scope="col" className="px-1 py-3 text-center">due net</th>
             <th scope="col" className="px-1 py-3 text-center">type</th>
             <th scope="col" className="px-1 py-3 text-center">pay method</th>
             <th scope="col" className="px-1 py-3 text-center">refund?</th>
             <th scope="col" className="px-1 py-3 text-center">is paid?</th>
             <th scope="col" className="px-1 py-3 text-center">vat?</th>
             <th scope="col" className="px-1 py-3 text-center">amount</th>
             <th scope="col" className="px-1 py-3 text-center">notes</th>
             <th scope="col" className="px-1 py-3 text-center">edit</th>
             <th scope="col" className="px-1 py-3 text-center">delete</th>
                       </tr>
                   </thead>
                   <tbody>
                   {type?.data.content.map((report, index) => (
             <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
             <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm text-gray-600 dark:text-gray-300 font-semibold">{report.date}</td>
             <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.supplierName}</td>
             <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.invoiceId}</td>
             <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.checkDate}</td>
             <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">
             <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
               {report.supplierType}
             </div>
             </td>
             <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.paymentMethod}</td>
             <td scope="col" className="px-4 py-3 text-center">{`${report.refund ? "זיכוי" : "-"}`}</td>
             <td scope="col" className={`px-4 py-3 text-center ${report.paidOrNo == "שולם" && 'line-through'}`}>{report.paidOrNo}</td>

             <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>
             {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
             </td>
           
             <td scope="col" className="px-1 text-center py-2 text-md font-semibold text-green-600 dark:text-green-500">{Number(report.amount).toLocaleString()}</td>
             <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
             <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> getNotes(report.id)}>
             <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
            </div>
           </td>
             <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
             <div className="inline-flex text-xs leading-5 px-1 py-1 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer " onClick={()=> editInvoice(report.id)}>
              <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
             </div>
           </td>
           <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
           <div className="inline-flex text-xs leading-5 px-1 py-1 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer " onClick={()=> handleAlert(report.id)}>
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
          
              <h1 className='font-mono '>record numbers {type?.data.totalElements}</h1>
           </div>
        <Pagination
          count={type?.data.totalPages}
          page={page + 1}
          onChange={(event, value) => {setPage(value - 1)
          setTimeout(()=> {
              refType()
          }, 250)}}
          color="primary"
          variant="outlined"
          size={windowWidth > 650 ? 'medium' : 'small'}
          shape="rounded"
          disabled={type?.data.totalPages === 1}
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
                    disabled={page + 1 === type?.data.totalPages}
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
    ) : (
        <>
        {flag2 ? (
          <>
           <div className='flex justify-between items-center py-1 pr-3'>
        {/* <div></div> */}
        <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={printPdf2}>
            <CloseIcon className='hover:text-red-600 text-red-500'/>
          </div>
         <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">
                    <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center space-x-1 bg-blue-200 hover:bg-blue-300 rounded-md px-2 py-[2px] w-fit" onClick={()=> setFlag(false)}> 
                    <h1 className="font-mono text-blue-600 font-semibold">הדפס</h1>
                    <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-4'/> 
                    </div>
                    </div>
            </a>;
          }}
          content={() => componentRef.current}
          documentTitle='חשבוניות'
        />
         {/* <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={printPdf2}>
            <CloseIcon className='hover:text-red-600 text-red-500'/>
          </div> */}
        </div>
        <div className=''>
        {hebrew ? (
          <table ref={componentRef} className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]" >
          <thead className="bg-gray-50">
            <tr>
            <th scope="col" className="px-1 py-3 text-center">date</th>
              <th scope="col" className="px-1 py-3 text-center">supplier</th>
              <th scope="col" className="px-1 py-3 text-center">invoice id</th>
              <th scope="col" className="px-1 py-3 text-center">due net</th>
              <th scope="col" className="px-1 py-3 text-center">type</th>
              <th scope="col" className="px-1 py-3 text-center">pay method</th>
              <th scope="col" className="px-1 py-3 text-center">refund?</th>
              <th scope="col" className="px-1 py-3 text-center">is paid?</th>
              <th scope="col" className="px-1 py-3 text-center">vat?</th>
              <th scope="col" className="px-1 py-3 text-center">amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices?.map((report, index) => (
               <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm text-gray-600 dark:text-gray-300 font-semibold">{report.date}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.supplierName}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.invoiceId}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.checkDate}</td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">
               <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
                 {report.supplierType}
               </div>
               </td>
               <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{report.paymentMethod}</td>
               <td scope="col" className="px-4 py-3 text-center">{`${report.refund ? "זיכוי" : "-"}`}</td>
               <td scope="col" className={`px-4 py-3 text-center ${report.paidOrNo == "שולם" && 'line-through'}`}>{report.paidOrNo}</td>
 
               <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>
               {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
               </td>
               <td scope="col" className="px-1 text-center py-2 text-md font-semibold text-green-600 dark:text-green-500">{Number(report.amount).toLocaleString()}</td>
               
               </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <table ref={componentRef} className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
      <thead className="bg-gray-50">
        <tr>
         <th scope="col" className="px-3 py-3 text-center">סכום</th>
         <th scope="col" className="px-3 py-3 text-center">מע"מ</th>
         <th scope="col" className="px-3 py-3 text-center">שולם</th>
         <th scope="col" className="px-3 py-3 text-center">זיכוי</th>
         <th scope="col" className="px-3 py-3 text-center">אמצעי תשלום</th>
         <th scope="col" className="px-3 py-3 text-center">סוג</th>
         <th scope="col" className="px-3 py-3 text-center">מועד פרעון</th>
         <th scope="col" className="px-3 py-3 text-center">מס' חשבונית</th>
         <th scope="col" className="px-3 py-3 text-center">שם ספק</th>
         <th scope="col" className="px-3 py-3 text-center">תאריך</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {invoices?.map((report, index) => (
          <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
          
            <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-bold">{Number(report.amount).toLocaleString()}</td>
 
            <td scope="col" className={`px-4 py-3 text-center`}>
             {report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
              </td>
          <td scope="col" className={`px-4 py-3 text-center text-sm ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" && <CheckIcon className='text-green-500' fontSize='small'/>}</span></td>
          <td scope="col" className={`px-4 py-3 text-center ${report.refund && "text-green-500 font-bold"}`}>{`${report.refund ? "זיכוי" : "-"}`}</td>
          <td scope="col" className="px-4 py-3 text-center">{report.paymentMethod}</td>
          <td scope="col" className="px-4 py-3 text-center text-xs">
          <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-600 text-red-600 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
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
    </table>
        )}
    </div>
          </>
        ) : (
          <>
          <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5 mt-14">
       
       <div class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
           <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
               
               <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> {setTset(true)
                  getSuppliers()}}>
                       הכנס חשבונית 
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
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> {setOpenSuppliersReport(true)
                            setAction(!action)
                            getSuppliers()}}>
                             <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                             <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
                           </div>
                           {/* <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setOpenAddInvoice(true)}> */}
                             <button className='bg-blue-500 rounded text-white px-2 text-sm hover:bg-blue-400 tracking-wide relative top-1' onClick={collectInvoices}>תשלום מרוכז</button>
                    {/* </div> */}

                       </div>
                       <button className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setFilterBar(!filterBar)}>
                           <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                               <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                           </svg>
                           פילטר
                           <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                       </button>
                       <div class={`${!filterBar && 'hidden'} z-10 absolute top-10 left-7 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}>
                           <h6 class="mb-3 text-sm font-medium text-right text-gray-900 dark:text-white">בחר סוג חשבונית</h6>
                           <ul class="space-y-2 text-sm flex flex-col items-end justify-end" >
                                 <li class="flex items-center">
                                  <button onClick={()=> handleChangeWares()}>סחורה</button>
                                 </li>
                                 <li class="flex items-center">
                                  <button onClick={()=> handleChangeChange()}>משתנה</button>
                                 </li>
                                 <li class="flex items-center">
                                  <button onClick={()=> handleChangePer()}>קבוע</button>
                                 </li>
                                 <div className='bg-gray-300 h-[0.2px] w-4/5'/>
                                 <li class="flex items-center">
                                     <label for="apple" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">לא שולמו</label>
                                     <input id="apple" type="checkbox" 
           value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                 <li class="flex items-center">
                                     <label for="fitbit" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">שולמו</label>
                                     <input id="fitbit" type="checkbox" 
           value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                 <li class="flex items-center">
                                     <label for="razor" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100">זיכוי</label>
                                     <input id="razor" type="checkbox" 
           value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                 </li>
                                
                             </ul>
                           
                       </div>
                       <div className="relative left-1.5">       
          <FilterListOffIcon className='text-gray-500 cursor-pointer hover:scale-110' onClick={handleBackChange} />
        </div>
        
        
                       {/* <div className='relative top-1 right-2' onClick={()=> setFlag(!flag)}>
                         <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-5 -mt-2'/>
                       </div>
                       <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 relative top-[1px] right-2' onClick={()=> setOpenDailyIncomeReport(true)}/> */}
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
           <div class="overflow-x-auto">
               <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                   <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
           <tr>
           <th scope="col" className="px-3 py-3 text-center">מחק</th>
           <th scope="col" className="px-3 py-3 text-center">ערוך</th>
           <th scope="col" className="px-3 py-3 text-center">הערות</th>
         <th scope="col" className="px-3 py-3 text-center">סכום</th>
         <th scope="col" className="px-3 py-3 text-center">מע"מ</th>
         <th scope="col" className="px-3 py-3 text-center">שולם</th>
         <th scope="col" className="px-3 py-3 text-center">זיכוי</th>
         <th scope="col" className="px-3 py-3 text-center">אמצעי תשלום</th>
         <th scope="col" className="px-3 py-3 text-center">סוג</th>
         <th scope="col" className="px-3 py-3 text-center">מועד פרעון</th>
         <th scope="col" className="px-3 py-3 text-center">מס' חשבונית</th>
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
             <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
               </div>
             </td>
             <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-bold">{Number(report.amount).toLocaleString()}</td>
  
             <td scope="col" className={`px-4 py-3 text-center`}>
              {/* {`${report.vat ? "כן" : 'ללא'}`} */}{report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
            </td>
             
           <td scope="col" className={`px-4 py-3 text-center text-sm ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" && <CheckIcon className='text-green-500' fontSize='small'/>}</span></td>
           {/* <td scope="col" className={`px-4 py-3 text-center ${report.paidOrNo == "שולם" && 'line-through'}`}>{report.paidOrNo}</td> */}
           <td scope="col" className={`px-4 py-3 text-center ${report.refund && "text-green-500 font-bold"}`}>{`${report.refund ? "זיכוי" : "-"}`}</td>
           <td scope="col" className="px-4 py-3 text-center">{report.paymentMethod}</td>
           <td scope="col" className="px-4 py-3 text-center text-xs">
           <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
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
                    {type?.data.content.map((report, index) => (
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
               <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
              </div>
            </td>
            <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-bold">{Number(report.amount).toLocaleString()}</td>
 
            {/* <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>{`${report.vat ? "כן" : 'ללא'}`}</td> */}
            <td scope="col" className={`px-4 py-3 text-center`}>
              {/* {`${report.vat ? "כן" : 'ללא'}`} */}{report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
              </td>
          <td scope="col" className={`px-4 py-3 text-center text-sm ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" && <CheckIcon className='text-green-500' fontSize='small'/>}</span></td>
          {/* <td scope="col" className={`px-4 py-3 text-center ${report.paidOrNo == "שולם" && 'line-through'}`}>{report.paidOrNo}</td> */}
          <td scope="col" className={`px-4 py-3 text-center ${report.refund && "text-green-500 font-bold"}`}>{`${report.refund ? "זיכוי" : "-"}`}</td>
          <td scope="col" className="px-4 py-3 text-center">{report.paymentMethod}</td>
          <td scope="col" className="px-4 py-3 text-center text-xs">
          <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
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
                  )}
               </table>
           </div>
           <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
           <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
          
              <h1 className='font-mono '>מס' רשומות {type?.data.totalElements}</h1>
           </div>
        <Pagination
          count={type?.data.totalPages}
          page={page + 1}
          onChange={(event, value) => {setPage(value - 1)
          setTimeout(()=> {
              refType()
          }, 250)}}
          color="primary"
          variant="outlined"
          size={windowWidth > 650 ? 'medium' : 'small'}
          shape="rounded"
          disabled={type?.data.totalPages === 1}
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
                    disabled={page + 1 === type?.data.totalPages}
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
    </section>
    )}



    <Snackbar open={openAlert} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? <>
          invoice deleted successfully
          </> : <>
          חשבונית נמחקה בהצלחה
          </>}
        </Alert>
      </Snackbar>



<Dialog open={openNoteDialog}>
        
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">

        {/* <!-- Modal content --> */}
        <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        {hebrew ? (
          <div>
            <div className='flex items-center justify-end p-2'>
            <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal" onClick={()=> setOpenNoteDialog(false)}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>        </div>
          <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{invoice?.notes != "" ? invoice?.notes : "no notes"}</h1>
          </div>
        ) : (
          <div>
            <div className='flex items-center justify-end p-2'>
            <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal" onClick={()=> setOpenNoteDialog(false)}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>        </div>
          <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{invoice?.notes != "" ? invoice?.notes : "אין הערות"}</h1>
          </div>
        )}  
            {invoice?.notes != "" && (
              <>
              <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal" onClick={()=> setOpenNoteDialog(false)}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            {hebrew ? (
              <>
              <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this note?</p>
            <div class="flex justify-center items-center space-x-4">
                <button data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={()=> setOpenNoteDialog(false)}>
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
                <button data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={()=> setOpenNoteDialog(false)}>
                   לא למחוק
                </button>
                <button type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={deleteNotes}>
                    כן, למחוק
                </button>
            </div>
              </>
            )}
              </>
            )}
        </div>
    </div>
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
                  <button type='submit' disabled={(year == "" || month == "") } className='bg-blue-600 px-2 py-1 font-mono text-white hover:bg-blue-700 hover:text-gray-100 font-semibold rounded-lg mt-2 relative top-3'>הדפס חשבוניות</button>
                  <div className='flex items-center justify-center space-x-1 relative top-2'>
                    {(month != "" || year == "") && <h1 className='text-center text-blue-700 text-xl font-mono'>{year} - {month}</h1>}
                  </div>
                </div>
              </form>
        </DialogContent>
      </div>
      
    </Dialog>

    <Snackbar open={meeting} autoHideDuration={15000} onClose={handleCloseMeeting} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleCloseMeeting}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {hebrew ? <> {unpaidInvoices?.data} invoices not paid
</> : <>

לא שולמו {unpaidInvoices?.data} חשבוניות
</>}
        </Alert>
      </Snackbar>

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



    <Dialog open={openCollectiveDialog} aria-labelledby="responsive-dialog-title">
    {/* <Dialog open={openCollectiveDialog} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title"> */}
      {!part2 ? (
        <>
        <div className='flex items-center justify-end px-2 py-1'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeCollectivy}/>
        </div>
        <h1 className={`text-center sm:text-3xl ${hebrew ? "font-serif text-slate-600 text-2xl" : "font-mono text-gray-700 text-2xl font-semibold"} px-3`}>{hebrew ? "select supplier month and a year" : "בחר ספק חודש ושנה"}</h1>
        {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}<CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
        </Alert>
          {/* <CloseIcon className='text-red-500 cursor-pointer hover:scale-125 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/> */}
        </div>}
        {errors == 403 && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error"> יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
  <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
        </div>
        )}
        <DialogContent>
        <form id="myform" onSubmit={getAmounts} className='flex items-center justify-center space-x-2'>
                
                <div className='flex flex-col space-y-2 py-1 px-6'>
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left w-64" : "text-right w-64"}`}>{hebrew ? "supplier" : "ספק"}</InputLabel>
                 <Select
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    className='bg-white focus:outline-none text-right focus:ring focus:border-blue-500 mt-1'
                    value={supplierName}
                    onChange={handleChangeInvoice}
                  >
                    {suppliers.map((supplier)=> (
                        <MenuItem value={supplier.name} data-my-value={supplier.id} onClick={saveSupplierId}>{supplier.active && supplier.name}</MenuItem>
                      ))}
                  </Select>
                  <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left w-64" : "text-right w-64"}`}>{hebrew ? "select a month" : "עבור חודש"}</InputLabel>
                    <Select onChange={handleMonths} className='bg-white text-right rounded-md px-2'>
            {months.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select>
                    <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left w-64" : "text-right w-64"}`}>{hebrew ? "select a year" : "עבור שנה"}</InputLabel>
                    <Select onChange={handleYears} className='bg-white text-right rounded-md px-2'>
            {years.map(year => (
                <MenuItem value={year}>{year}</MenuItem>
            ))}
                    </Select>  
                    <button type='submit' disabled={supplierName == "" || year == "" || monthNumber == ""} className='bg-blue-200 px-2 py-[6.5px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg relative top-2'>{hebrew ? "check amount" : "בדוק סכום"}</button>
                    <div className='flex items-center justify-center space-x-1'>
                    {reportAmount && (
                     <>
                      {loading ? <CircularProgress color="primary" size={30}/> :
                        <>
                        
                          <h1 className='text-center text-blue-700 text-xl font-mono'>ש"ח</h1>
                          <h1 className='text-center text-blue-700 text-xl font-mono'>{reportAmount}</h1>
                        
                        </>
                      }
                     </>
                    )}
                    
                  </div>
                  {reportAmount > 0 && (
                    <button onClick={()=> setPart2(true)} disabled={supplierName == "" || year == "" || monthNumber == ""} className='bg-blue-200 px-2 py-[6.5px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>{hebrew ? "continue to payment" : "המשך לתשלום"}</button>
                    )}
                </div>
              </form>
        </DialogContent>
        </>
      ) : (
        <div>
          <div className='flex items-center justify-end px-2 py-1'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeCollectivy}/>
        </div>
        <h1 className='text-center font-mono text-gray-800 text-2xl sm:text-3xl px-4 font-semibold'>{hebrew ? "choose payment method" : "בחר אמצעי תשלום"}</h1>
        <h1 className='text-center font-mono text-gray-700 text-lg sm:text-xl px-4'>{supplierName + ' ' + reportAmount + 'ש"ח' + " " + month + '-' + year}</h1>
        <DialogContent>
          <form onSubmit={addCollectiveyInvoice} className='flex flex-col items-center justify-center space-x-2'>
          <div className='flex flex-col space-y-2 py-1 px-6'>
         <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left w-64" : "text-right w-64"}`} >{hebrew ? "payment method" : "המשך לתשלום"}</InputLabel>
  <Select
    className='bg-white text-right focus:outline-none focus:ring focus:border-blue-500 mt-1'
    value={paymentMethod}
    onChange={handleChange3}
  >
    {arr2.map((pay)=> (
        <MenuItem value={pay}>{pay}</MenuItem>
    ))}
  </Select>
         <label className={`${hebrew ? "flex justify-start text-blue-500 font-mono" : "flex justify-end text-blue-500 font-mono"}`}>{hebrew ? "payment date" : "תאריך תשלום"}</label>
         <TextField type='date' className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' value={checkDate} placeholder='add date' onChange={e => setCheckDate(e.target.value)}/>
         {paymentMethod == "צ'ק" &&
          <>
            <label className={`${hebrew ? "flex justify-start text-blue-500 font-mono" : "flex justify-end text-blue-500 font-mono"}`}>{hebrew ? "cheque number" : "מספר צ'ק"}</label>
            {hebrew ? (
              <>
            <TextField InputLabelProps={{
        shrink: true,
      }} type='text' className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' value={checkNumber} label="cheque number" onChange={e => setCheckNumber(e.target.value)}/>
           
              </>
            ) : (
              <>
              <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
            <TextField InputLabelProps={{
        shrink: true,
      }} type='text' className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' value={checkNumber} label="מספר צ'ק" onChange={e => setCheckNumber(e.target.value)}/>
            </ThemeProvider>
            </CacheProvider>
              </>
            )}
          </>
         }
         </div>
         <button type='submit' className='bg-blue-500 text-xs mmu:sm px-16 py-2 mt-4 rounded-full text-white font-semibold hover:bg-blue-400'>{hebrew ? "add payment to cost flow" : "הכנס תשלום לתזרים"}</button>

         </form>
         </DialogContent>
        </div>
      )}
       
    </Dialog>



    <Dialog open={test} fullScreen={fullScreen}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeInvoice}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    הכנס חשבונית חדשה
                </h3>
                </div>
            </div>
            {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}
          <CloseIcon className='text-red-500 cursor-pointer hover:scale-105 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/>
          </Alert>
        </div>}
        {errors == 403 && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">יש לעשות יציאה ולהרשם שוב מטעמי בטיחות  
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>

</Alert>
        </div>}
            {/* <!-- Modal body --> */}
            <form onSubmit={addInvoice}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <label for='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">מספר חשבונית</label>
                      <input type="text" name="email" value={invoiceId} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="מספר חשבונית" required="" onChange={(e)=> setInvoiceId(e.target.value)}/>
                    </div>
                    <div>
                      <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">תאריך חשבונית</label>
                      </div>
                        <input type="date" name="name" value={date} class="bg-gray-50 text-right border h-[40px] min-w-max placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="תאריך חשבונית" required={true} onChange={(e)=> setDate(e.target.value)}/>
                    </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">?האם שולם</label>
                      </div>     
                      <select name='type' onChange={(e) => setPaidOrNo(e.target.value)} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">?האם שולם</option>
                              {arr.map(r => (
                              <option className='text-right' value={r}>{r}</option>
                              ))}
                          </select>
                    </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר ספק</label>
                      </div>     
                      <select value={supplierName} name='type' onChange={handleChangeInvoice} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">בחר ספק</option>
                              {suppliers.map(supplier => (
                              <option className='text-right' value={supplier.name} data-my-value={supplier.id}>{supplier.active && supplier.name}</option>
                              ))}
                          </select>
                    </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        {/* <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1> */}
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">צורת תשלום</label>
                      </div>     
                      <select disabled={paidOrNo != "שולם" || refundInvice} name='type' onChange={(e) => setPaymentMethod(e.target.value)} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">צורת תשלום</option>
                              {arr2.map(r => (
                              <option className='text-right' value={r}>{r}</option>
                              ))}
                          </select>
                    </div>
                  <div>
                  <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">סכום חשבונית</label>
                      </div>                      <input type="text" name="address" value={amount} placeholder="סכום חשבונית" class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} onChange={(e)=> setAmount(e.target.value)}/>
                  </div>    

                 {paymentMethod == "צ'ק" && (
                  <>
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
                  </>
                 )}
                 
                  <div class="flex items-center justify-end space-x-2">
                                  <label htmlFor='refund' class="text-[#333] dark:text-[#ccc]">חשבונית זיכוי</label>
                                  <input type="checkbox" checked={refundInvice} onChange={handleRefund} class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue-400 checked:bg-blue-600 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-blue-400 dark:checked:bg-blue-600 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" />
                              </div>
                              <div class="flex items-center justify-end space-x-2">
                                  <label class="text-[#333] dark:text-[#ccc]">ללא מע"מ</label>
                                  <input type="checkbox" checked={noVatInvoice} onChange={()=> setNoVatInvoice(!noVatInvoice)} class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue-400 checked:bg-blue-600 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-blue-400 dark:checked:bg-blue-600 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" />
                              </div>          
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">הערות</label>
                        <textarea value={notes} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="...'הוסף הערות במידת הצורך, לדוגמא: חוסר מוצרים, טעות בחשבון, מחירים שונים מהצעת המחיר וכו" onChange={(e)=> setNotes(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeInvoice}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button disabled={supplierName == "" || amount == "" || date == ""} type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  הכנס חשבונית  
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


  <Dialog open={openForm}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> setIsOpenForm(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                     עדכן פרטי חשבונית 
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
            {/* <!-- Modal body --> */}
            <form onSubmit={printValues}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <label for='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">מספר חשבונית</label>
                      <input type="text" name="email" defaultValue={invoice?.invoiceId} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="מספר חשבונית" required="" onChange={(e)=> setInvoiceId(e.target.value)}/>
                    </div>
                    <div>
                      <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">תאריך חשבונית</label>
                      </div>
                        <input type="date" name="name" defaultValue={invoice?.date} class="bg-gray-50 h-[40px] min-w-full text-right border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="תאריך חשבונית" required="" onChange={(e)=> setDate(e.target.value)}/>
                    </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">?האם שולם</label>
                      </div>     
                      <select name='type' onChange={(e) => setPaidOrNo(e.target.value)} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">{invoice?.paidOrNo}</option>
                              {arr.map(r => (
                              <option className='text-right' value={r}>{r}</option>
                              ))}
                          </select>
                    </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר ספק</label>
                      </div>     
                      <select value={supplierName} name='type' onChange={handleChangeInvoice} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">{invoice?.supplierName}</option>
                              {suppliers.map(supplier => (
                              <option className='text-right' value={supplier.name} data-my-value={supplier.id}>{supplier.active && supplier.name}</option>
                              ))}
                          </select>
                    </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">צורת תשלום</label>
                      </div>     
                      <select disabled={paidOrNo != "שולם" || refundInvice} name='type' onChange={(e) => setPaymentMethod(e.target.value)} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">{invoice?.paymentMethod}</option>
                              {arr2.map(r => (
                              <option className='text-right' value={r}>{r}</option>
                              ))}
                          </select>
                    </div>
                  <div>
                      <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">סכום חשבונית</label>
                      <input type="text" name="address" defaultValue={invoice?.amount} placeholder="סכום חשבונית" class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAmount(e.target.value)}/>
                  </div>    

                 {paymentMethod == "צ'ק" && (
                  <>
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
                  </>
                 )}
                 
                  <div class="flex items-center justify-end space-x-2">
                                  <label for="checkbox-all" class="text-[#333] dark:text-[#ccc]">חשבונית זיכוי</label>
                                  <input type="checkbox" defaultChecked={invoice?.refund} onChange={(e)=> setCheckedRefund(e.target.checked)} class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue-400 checked:bg-blue-600 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-blue-400 dark:checked:bg-blue-600 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" />
                              </div>
                              <div class="flex items-center justify-end space-x-2">
                                  <label for="checkbox-all" class="text-[#333] dark:text-[#ccc]">ללא מע"מ</label>
                                  <input type="checkbox" defaultChecked={!invoice?.vat} onChange={(e)=> setChecked(e.target.checked)} class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue-400 checked:bg-blue-600 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-blue-400 dark:checked:bg-blue-600 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" />
                              </div>          
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">הערות</label>
                        <textarea defaultValue={invoice?.notes} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="...'הוסף הערות במידת הצורך, לדוגמא: חוסר מוצרים, טעות בחשבון, מחירים שונים מהצעת המחיר וכו" onChange={(e)=> setNotes(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center cursor-pointer text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=> setIsOpenForm(false)}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  עדכן חשבונית  
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


      <Snackbar open={deleteNoteAlert} autoHideDuration={10000} onClose={handleClose9} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose9}
          severity="success"
          sx={{ width: "100%" }}
        >
{hebrew ? 'successfully deleted the note' : 'הערה נמחקה בהצלחה'}   
     </Alert>
      </Snackbar>
      
      <Dialog open={openSuppliersReport}>
      <div className='w-full py-6 px-10 flex flex-col justify-center items-center'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer self-end relative left-4 bottom-1' fontSize='large' onClick={closeSuppliersReport}/>
      <h1 className={`text-center sm:text-3xl ${hebrew ? "font-serif text-slate-600 text-2xl" : "text-gray-700 font-medium text-2xl"} px-2`}>{hebrew ? "select supplier month and a year" : "בחר ספק חודש ושנה"}</h1>
        <DialogContent>
        <form onSubmit={getAmount} className='flex space-x-4'>
                <div className='flex flex-col space-y-1'>
                  <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"} w-64`}>{hebrew ? "supplier name" : "שם ספק"}</InputLabel>
                    <Select 
                    value={supplierNameForReport}
                    onChange={handleChangeSupplierReport}
                    className='bg-white rounded-md px-2 text-right'>
            {suppliers.map(supplier => (
                <MenuItem value={supplier?.name}>{supplier?.name}</MenuItem>
            ))}
                    </Select>
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
                    
                  <button type='submit' disabled={supplierNameForReport == "" || month == "" || year == ""} className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg relative top-3'>{hebrew ? "check amount" : "בדוק סכום"}</button>
                  <div className='flex items-center justify-center space-x-1 relative top-4'>
                    {reportAmount && (
                     <>
                      {loading ? <CircularProgress color="primary" size={30}/> :
                        <>
                        
                          <h1 className='text-center text-blue-700 text-xl font-mono'>ש"ח</h1>
                          <h1 className='text-center text-blue-700 text-xl font-mono'>{reportAmount}</h1>
                        
                        </>
                      }
                     </>
                    )}
                    
                  </div>
                </div>
              </form>
        </DialogContent>
      </div>
      
    </Dialog>
    </>
  )
}

export default NewInvoices