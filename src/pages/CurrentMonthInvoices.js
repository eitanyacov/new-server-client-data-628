import React, { useState, useEffect, useContext } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Select, MenuItem, InputLabel} from '@mui/material'
import { Dialog, DialogContent, TextField, Typography } from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
// import { styled } from '@mui/material/styles';
// import LinearProgress from '@mui/material/LinearProgress';
import Pagination from '@mui/material/Pagination';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import { PaginationItem } from '@mui/material';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from "../App";
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'



// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});



const CurrentMonthInvoices = () => {
    const [user, setUser] = useState({})
    const [invoices, setInvoices] = useState([])
    const [isSSRE, setIsSSRE] = useState(true);
    const [ide, setIde] = useState();
    const [date, setDate] = useState("")
    const [checkDate, setCheckDate] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [open, setIsOpen] = useState(false)
    const [openForm, setIsOpenForm] = useState(false)
    const [openAlert, setIsOpenAlert] = useState(false)
    const [openAlertAdd, setIsOpenAlertAdd] = useState(false)
    const [invoice, setInvoice] = useState({})
    const [checked, setChecked] = useState(invoice?.vat)
    const [checkedRefund, setCheckedRefund] = useState(invoice?.refund)
    const [amount, setAmount] = useState("")
    const [invoiceId, setInvoiceId] = useState("")
    const [paidOrNo, setPaidOrNo] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [refundInvice, setRefundInvice] = useState(false);
    const [checkNumber, setCheckNumber] = useState("")
    const [openNoteDialog, setOpenNoteDialog] = useState(false);
    const [notes, setNotes] = useState("");
    const [error, setError] = useState()
    const [errorMode, setErrorMode] = useState(false)
    const [windowHeight, setWindowHeight] = useState(0);
    const [xxx, setXxx] = useState(false)
    const [isSSR, setIsSSR] = useState(true);


  const [page, setPage] = useState(0);
  const [page2, setPage2] = useState(0);
  const [paging, setPaging] = useState([]);
  const [number, setNumber] = useState();
  const [number2, setNumber2] = useState(0);
  const [pages, setPages] = useState();
  const [pages2, setPages2] = useState(0);
  const [vvv, setVvv] = useState(false)
  const [dateMode, setDateMode] = useState(false)
  const [rrr, setRrr] = useState(false)
  const [pageNumber, setPageNumber] = useState();
  const [filterMode, setFilterMode] = useState(false)
  const [fetchFlag, setFetchFlag] = useState(false)
  const [supplierType, setSupplierType] = useState("")
  const [windowWidth, setWindowWidth] = useState(0);

    const { hebrew, globalTheme } = useContext(ThemeContext)
    const navigate = useNavigate()


    const inv = JSON.parse(localStorage.getItem('invoice'));


    const screen = window.screen.availWidth
    // const screenHeight = window.screen.availHeight
    const currentMonth = new Date().getMonth() + 1;

    const currentYear = new Date().getFullYear();

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)


    const arr2 = ["מזומן", "צ'ק", "כרטיס אשראי", "הוראת קבע", "העברה בנקאית", "ביט", "אחר", "-"];
    const arr1 = ["שולם", "לא שולם"];


    const getData = () => {
      const id = result?.id
      return axios.get('https://nartina.com/api/user/total-monthly-invoices/' + id + "/" + currentMonth + "/" + currentYear)
    }
    
    const {data, refetch} = useQuery('current-month-all-invoices', ()=> getData(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: inv,
        refetchOnWindowFocus:false
   
      }) 


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

    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
        // getInvoices()
    }, [])

    useEffect(() => {
      setTimeout(()=> {
        setXxx(true)
      }, 1000)
    })
  

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

    useEffect(() => {
      setTimeout(() => {
        setIsSSR(false);
      }, 300)
      
    }, [isSSR]);

    const refetchAllInvoices = () => {
      setVvv(true)
      setRrr(false)
      setFetchFlag(false)
      setFilterMode(false)
      setSupplierType("")
      setDateMode(false)
      setPages2(0)
      setPage2(0)
      const id = result?.id
      axios.get(`https://nartina.com/api/user/all-invoices-paging/${id}/${page}/25/date`)
      .then(res => {console.log(res.data)
      setPaging(res.data.content)
      setNumber(res.data.totalElements)
      setPages(res.data.totalPages)
      setPageNumber(res.data.pageable.pageNumber)})
      .catch(err => console.log(err))
    }

    
      const getInvoices = () => {
        axios.get('https://nartina.com/api/user/total-monthly-invoices/' + user?.id + "/" + currentMonth + "/" + currentYear)
        .then(res => setInvoices(res.data))
        .catch(err => console.log(err))
      }

      const deleteNotes = async () => {
        axios.get("https://nartina.com/api/user/delete-invoice-notes/" + ide)
        .then(res => {setOpenNoteDialog(false)
          setNotes("")
        refetch()}).
        catch(err => console.log(err.response.data))
      }
   

      const handleClose = () => {
        setIsOpenAlert(false)
      }
    
      const handleClose2 = () => {
        setIsOpenAlertAdd(false)
      }

      const handleChange2 = (e) => {
        console.log("the value is: " + e.target.value);
        setPaymentMethod(e.target.value)
        
      }
    
      const handleChange1 = (e) => {
        console.log("the value is: " + e.target.value);
        setPaidOrNo(e.target.value)
        
      }

      const printValues = (e)=> {
        e.preventDefault()
        // if(checkDate != "") alert("אם אתה נותן צ'ק דחוי, תעדכן ידנית בדף תשלומים דחויים")
        if(checkDate != ""){
          const d = new Date(checkDate).getTime() + Math.random()*60000
          axios.post("https://nartina.com/api/user/add-deferral-payment/" + user?.id, {
            title: invoice.amount,
            invoice: "true",
            startDate: new Date(checkDate).toISOString(),
            endDate: new Date(d).toISOString(),
            notes: " :שם ספק " + invoice.supplierName + "\n" + " :תאריך חשבונית " + invoice.date + "\n " + " :מס' חשבונית " + invoice.invoiceId + "\n " + " :מס' צ'ק " + checkNumber
          }, {
            headers: {
              Authorization: 'Bearer ' + result?.token,
          
             }
          }).then(res => {setIsOpenAlertAdd(true)
            refetch()}) 
          .catch(err=> {console.log(err)
            setError(err.response.status)})
        }
        
        axios.post("https://nartina.com/api/user/update-invoice/" + ide, {
          amount: amount != "" ? amount : invoice.amount,
          date: date != "" ? date : invoice.date,
         
          supplierType: invoice.supplierType,
          checkDate: checkDate != "" ? checkDate : invoice.checkDate,
          invoiceId: invoiceId != "" ? invoiceId : invoice.invoiceId,
          // supplierType: supplierType != "" ? supplierType : invoice.supplierType,  
          paidOrNo: paidOrNo != "" ? paidOrNo : invoice.paidOrNo,
          notes: notes != "" ? notes : invoice.notes,
          paymentMethod: paymentMethod != "" ? paymentMethod : invoice.paymentMethod,
          refund: checkedRefund,
          vat: !checked
        }, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        }).then(res => {setIsOpenAlertAdd(true)
          localStorage.setItem('invoice', true)
            setIsOpenForm(false)
             setEditMode(false) 
             refetch()
            })
        .catch(err => {console.log(err)
          setError(err.response.status)})
        
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

    const deleteInvoice = () => {
      axios.delete("https://nartina.com/api/user/delete-invoice/" + ide, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
      .then(res => {setIsOpenAlert(true)
        localStorage.setItem('invoice', true)
        getInvoices()}).
      catch(err => {console.log(err.response.data)
      setError(err.response.status)})
      setIsOpen(false)
      // window.location.reload()
      setIsOpenAlert(true)
      
    }

    // const deleteTheInvoice = (id) => {
    //   setIde(id)
    //   setIsOpen(true)
    // }
  
    const editInvoice = (id) => {
      setIde(id)
      getInvoice(id)
    }
  
    const getNotes = (id) => {
      setIde(id)
      getInvoice2(id)
    }



    const handleClose3 = () => {
      setErrorMode(false)
      setError("")
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
            refetchAllInvoices()
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

    const handlePrevClick = () => {
      setPage((prevPage) => prevPage - 1);
    };
    
    const handleNextClick = () => {
      setPage((prevPage) => prevPage + 1);
    };


    const handlePrevClick2 = () => {
      setPage2((prevPage) => prevPage - 1);
    };
    
    const handleNextClick2 = () => {
      setPage2((prevPage) => prevPage + 1);
    };


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
         <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5 ">
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
                    {data?.data.sortedInvoices.map((report, index) => (
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

              {/* <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>{`${report.vat ? "כן" : 'ללא'}`}</td> */}
              <td scope="col" className={`px-4 py-3 text-center`}>
              {/* {`${report.vat ? "כן" : 'ללא'}`} */}{report.vat ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-500' fontSize='small'/>}
              </td>
             {/* <td scope="col" className="px-1 text-center py-2"></td> */}
             {/* <td scope="col" className="px-1 text-center py-2"></td> */}
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
              <h1 className='text-lg font-semibold font-mono '>{(number2 > 0 && !vvv) ? number2 : number}</h1>
              <h1 className='font-mono '>records {data?.data.numberOfRecords}</h1>
           </div>
           {pages2 > 0 && !vvv ? (
           <Pagination
           count={pages2}
           page={page2 + 1}
           onChange={(event, value) => setPage2(value - 1)}
           color="primary"
           variant="outlined"
           size='medium'
           shape="rounded"
           disabled={pages2 === 1}
           sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}
           renderItem={(item) => {
             switch (item.type) {
               case 'previous':
                 return (
                   <PaginationItem
                     {...item}
                     onClick={handlePrevClick2}
                     disabled={page2 + 1 === 1}
                   />
                 );
               case 'next':
                 return (
                   <PaginationItem
                     {...item}
                     onClick={handleNextClick2}
                     disabled={page2 + 1 === pages2}
                   />
                 );
               default:
                 return <PaginationItem {...item} />;
             }
           }}
         />
        ) : (
          <Pagination
          count={pages}
          page={page + 1}
          onChange={(event, value) => setPage(value - 1)}
          color="primary"
          variant="outlined"
          size='medium'
          shape="rounded"
          disabled={pages === 1}
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
                    disabled={page + 1 === pages}
                  />
                );
              default:
                return <PaginationItem {...item} />;
            }
          }}
        />
        )}
            </nav>
        </div>
    </div>
        </>
      ) : (
        <>
        <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">
       
       <div class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
           <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
               
               <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0" onClick={()=> navigate("/clock-month")}>
                   <button type="button" class="flex items-center justify-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                   {<h1 className='text-white font-semibold relative right-1'> {getMonthInHebrew2(new Date().getMonth() + 1)} </h1> } שעות עובדים  
                   </button>
                   <div class="flex items-center space-x-3 w-full md:w-auto relative">
                       <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" >
                           <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                           אפשרויות
                       </button>
                      
                   </div>
               </div>
               <div>

               </div>
               <div className='flex items-center justify-center space-x-3'>
               <div className='hidden md:flex items-center justify-center space-x-2'>
                  <h1 className='font-mono font-semibold text-lg text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
                  <h1 className='font-mono text-lg text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
               </div>
                  <h1 className='hidden md:inline font-mono font-semibold text-xl text-[#495057] dark:text-[#ccc] relative bottom-[1px]'>חשבוניות</h1>
               </div>
               <div class="w-full md:w-1/4 flex-1">
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
               <h1 className='inline md:hidden text-center font-mono font-semibold text-lg text-[#333333] dark:text-[#ccc]'>חשבוניות ספקים</h1>
               <div className='flex items-center justify-center space-x-2 md:hidden'>
                      <div className='flex items-center justify-center space-x-2'>
                          <h1 className='font-mono font-semibold text-lg text-[#333333] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
                          <h1 className='font-mono text-lg text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
                      </div>
               </div>
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
  
             {/* <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>{`${report.vat ? "כן" : 'ללא'}`}</td> */}
             <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>
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
                    {xxx && data?.data.sortedInvoices.map((report, index) => (
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
            <td scope="col" className={`px-4 py-3 text-center ${report.vat ? "text-gray-500" : "text-red-500 font-semibold"}`}>
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
              {data?.data.sortedInvoices.map(report => (
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
           <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
           <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
              <h1 className='text-lg font-semibold font-mono '>{(number2 > 0 && !vvv) ? number2 : number}</h1>
              <h1 className='font-mono '>מס' חשבוניות {data?.data.numberOfRecords}</h1>
           </div>
           {pages2 > 0 && !vvv ? (
           <Pagination
           count={pages2}
           page={page2 + 1}
           onChange={(event, value) => setPage2(value - 1)}
           color="primary"
           variant="outlined"
           size='medium'
           shape="rounded"
           disabled={pages2 === 1}
           sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}
           renderItem={(item) => {
             switch (item.type) {
               case 'previous':
                 return (
                   <PaginationItem
                     {...item}
                     onClick={handlePrevClick2}
                     disabled={page2 + 1 === 1}
                   />
                 );
               case 'next':
                 return (
                   <PaginationItem
                     {...item}
                     onClick={handleNextClick2}
                     disabled={page2 + 1 === pages2}
                   />
                 );
               default:
                 return <PaginationItem {...item} />;
             }
           }}
         />
        ) : (
          <Pagination
          count={pages}
          page={page + 1}
          onChange={(event, value) => setPage(value - 1)}
          color="primary"
          variant="outlined"
          size='medium'
          shape="rounded"
          disabled={pages === 1}
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
                    disabled={page + 1 === pages}
                  />
                );
              default:
                return <PaginationItem {...item} />;
            }
          }}
        />
        )}
             
           </nav>
       </div>
   </div>
        </>
      )}

      </section>
      

        <Dialog open={open}>
        {/* <DialogTitle variant='h6'>מחיקת חשבונית</DialogTitle> */}
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>האם למחוק את החשבונית?</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={deleteInvoice}>מחק</button>
        </div>
        {/* </DialogActions> */}
    </Dialog>
    <Snackbar open={openAlert} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            חשבונית נמחקה בהצלחה
        </Alert>
      </Snackbar>
      <Snackbar open={openAlertAdd} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose2}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            חשבונית עודכנה בהצלחה
        </Alert>
      </Snackbar>


     <Dialog open={openForm}>
      <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setIsOpenForm(false)}/>
        </div>
        <h1 className={`text-center ${hebrew ? "font-serif text-slate-600 text-3xl" : "font-mono text-amber-700 text-3xl"}`}>{hebrew ? "update invoice" : "עדכן חשבונית"}</h1>
        <DialogContent>
        <form onSubmit={printValues} className='flex space-x-4'>
                <div className='flex flex-col space-y-2'>
                {/* <InputLabel id="demo-simple-select-label" className=''>?האם שולם</InputLabel>
        <Select disabled={refundInvice} onChange={handleChange2} className='bg-white shadow-xl focus:outline-none focus:ring focus:border-blue-500 mt-1' value={paidOrNo} label="Is Paid?">
        
            {arr1.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
         </Select> */}
         
         <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "payment method" : "צורת תשלום"}</InputLabel>
        <Select disabled={paidOrNo == "לא שולם" || refundInvice} onChange={handleChange2} className='bg-white w-52 focus:outline-none focus:ring focus:border-blue-500 mt-1 text-right' defaultValue={invoice?.paymentMethod}>
        
        {arr2.map(a => (
            <MenuItem value={a}>{a}</MenuItem>
        ))}
     </Select>
     
     <label className={`flex ${hebrew ? "justify-start" : "justify-end"} text-blue-500 font-mono`}>{hebrew ? "cheque date" : "תאריך צ'ק"}</label>
         <TextField disabled={paymentMethod != "צ'ק"} type='date' className='bg-white shadow-xl focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.checkDate} placeholder='add date' onChange={e => setCheckDate(e.target.value)}/>
        {hebrew ? (
           <TextField  disabled={paymentMethod != "צ'ק"} label="cheque number" type='text' className='bg-white focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.checkNumber} placeholder="מספר צ'ק" onChange={e => setCheckNumber(e.target.value)}/>
         
        ) : (
          <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
          <TextField disabled={paymentMethod != "צ'ק"} label="מספר צ'ק" type='text' className='bg-white focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.checkNumber} placeholder="מספר צ'ק" onChange={e => setCheckNumber(e.target.value)}/>
          </ThemeProvider>
          </CacheProvider>
        )}
         {/* <TextareaAutosize type='text' placeholder='הערות' className='bg-white shadow-xl text-right placeholder:text-right border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.notes} onChange={e => setNotes(e.target.value)}/> */}
         {hebrew ? (
                   <TextareaAutosize type='text' placeholder='הערות' className='bg-white border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.notes != "אין הערות" ? invoice?.notes : "no notes"} onChange={e => setNotes(e.target.value)}/>
         ) : (
          <TextareaAutosize type='text' placeholder='הערות' className='bg-white placeholder:text-right text-right border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.notes != "אין הערות" ? invoice?.notes : "אין הערות"} onChange={e => setNotes(e.target.value)}/>
         )}
        {hebrew ? (
          <>
          <div className='flex items-center space-x-1 justify-start'>
          <input type='checkbox' defaultChecked={invoice?.refund} onChange={(e)=> setCheckedRefund(e.target.checked)}/>
           <label>refund invoice</label>
        </div>
        <div className='flex items-center space-x-1 justify-start'>
        <input type='checkbox' defaultChecked={!invoice?.vat} onChange={(e)=> setChecked(e.target.checked)}/>
          <label>no vat</label>
        </div>
          </>
        ) : (
          <>
           <div className='flex items-center space-x-1 justify-end'>
          <label>חשבונית זיכוי</label>
          <input type='checkbox' defaultChecked={invoice?.refund} onChange={(e)=> setCheckedRefund(e.target.checked)}/>
        </div>
        <div className='flex items-center space-x-1 justify-end'>
          <label>ללא מע"מ</label>
          <input type='checkbox' defaultChecked={!invoice?.vat} onChange={(e)=> setChecked(e.target.checked)}/>
        </div>
          </>
        )}
         <button type='submit' className='bg-blue-200 px-2 py-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>{hebrew ? "update" : "עדכן חשבונית"}</button>
                  {/* <button type='button' className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpenx(false)} >בטל</button> */}
                </div>

                <div className='flex flex-col space-y-2'>
               
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "supllier name" : "שם ספק (לא ניתן לערוך)"}</InputLabel>
               
                {hebrew ? (
                  <>
                <TextField type='text' label='supplier name' value={invoice?.supplierName} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1'/>
               
                  </>
                ) : (
                  <>
                  <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                 <div dir="rtl">
                <TextField type='text' label='שם ספק' value={invoice?.supplierName} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1'/>
                </div>
                </ThemeProvider>
               </CacheProvider>
                  </>
                )}
<label className={`flex ${hebrew ? "justify-start" : "justify-end"} text-blue-500 font-mono`}>{hebrew ? "invoice date" : "תאריך חשבונית"}</label>
  <TextField type='date' defaultValue={invoice?.date} className='bg-white shadow-xl focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder='add date' onChange={e => setDate(e.target.value)}/>
 {hebrew ? (
   <TextField type='text' label='invoice amount' defaultValue={invoice?.amount} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder='סכום חשבונית' onChange={e => setAmount(e.target.value)}/>
  
 ) : (
  <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
  <TextField type='text' label='סכום חשבונית' defaultValue={invoice?.amount} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder='סכום חשבונית' onChange={e => setAmount(e.target.value)}/>
  </ThemeProvider>
</CacheProvider>
 )}
{hebrew ? (
  <TextField type='number' label='invoice number' defaultValue={invoice?.invoiceId} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder="מס' חשבונית" onChange={e => setInvoiceId(e.target.value)}/>
 
) : (
  <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
  <TextField type='number' label='מספר חשבונית' defaultValue={invoice?.invoiceId} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder="מס' חשבונית" onChange={e => setInvoiceId(e.target.value)}/>
  </ThemeProvider>
</CacheProvider>
)}
<InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "is paid?" : "?האם שולם"}</InputLabel>
        <Select disabled={refundInvice} onChange={handleChange1} className='bg-white shadow-xl focus:outline-none focus:ring focus:border-blue-500 mt-1 text-right' defaultValue={invoice?.paidOrNo}>
        
            {arr1.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
         </Select>

                  {/* <button type='submit' className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>הכנס חשבונית</button> */}
                </div>
              </form>
        </DialogContent>
       
    </Dialog>

    {/* <Dialog open={openNoteDialog}>
        <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setOpenNoteDialog(false)}/>
        </div>        
            <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{invoice?.notes}</h1>
            {invoice?.notes != "אין הערות" && (
              <div className='flex flex-col items-center justify-center pb-2'>
                <h1 className='font-mono text-red-600'>מחיקת הערה</h1>
                <div className="flex items-center justify-center bg-red-100 p-1 w-fit h-fit rounded-lg cursor-pointer" onClick={deleteNotes}>
                  <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
                </div>
              </div>
            )}
    </Dialog> */}

<Dialog open={openNoteDialog}>
        <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setOpenNoteDialog(false)}/>
        </div>      
        {hebrew ? (
          <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{invoice?.notes != "" ? invoice?.notes : "no notes"}</h1>
        ) : (
          <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{invoice?.notes != "" ? invoice?.notes : "אין הערות"}</h1>

        )}  
            {invoice?.notes != "" && (
              <div className='flex flex-col items-center justify-center pb-2'>
                <h1 className='font-mono text-red-600'>מחיקת הערה</h1>
                <div className="flex items-center justify-center bg-red-100 p-1 w-fit h-fit rounded-lg cursor-pointer" onClick={deleteNotes}>
                  <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
                </div>
              </div>
            )}
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
      </>
  )
}

export default CurrentMonthInvoices