import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dialog, DialogContent, InputLabel, Select, MenuItem } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { Snackbar, Alert } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Pagination from '@mui/material/Pagination';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import CloseIcon from '@mui/icons-material/Close';
import { PaginationItem } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { ThemeContext } from "../App";
import axios from 'axios'

import { useQuery } from 'react-query'
import ReactToPrint  from 'react-to-print';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Swal from 'sweetalert2'




const DailyIncomeReports = () => {
  const [isSSRE, setIsSSRE] = useState(true);
  const [isSSR, setIsSSR] = useState(true);
  const [dailyIncomes, setDailyIncomes] = useState([])
  const [dailyIncome, setDailyIncome] = useState({})
  const [ide, setIde] = useState();
  const [cashMoney, setCashMoney] = useState("");
  const [debt, setDebt] = useState("");
  const [bit, setBit] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [notes, setNotes] = useState("");
  const [plus, setPlus] = useState("");
  const [minus, setMinus] = useState("");
  const [cheque, setCheque] = useState("");
  const [total, setTotal] = useState("");
  const [digital, setDigital] = useState();
  const [date, setDate] = useState("");
  const [openAlertIncome, setIsOpenAlertIncome] = useState(false)
  const [openAlertIncomeDelete, setIsOpenAlertIncomeDelete] = useState(false)
  const [openUpdate, setIsOpenUpdate] = useState(false)
  const [totalAmount, setTotalAmount] = useState(true)
  const [error, setError] = useState()
  const [errorMode, setErrorMode] = useState(false)
  const [xxx, setXxx] = useState(false)
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false)
  const [month, setMonth] = useState("");
  const [monthNumber, setMonthNumber] = useState(0);
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false)
  const [reportAmount, setReportAmount] = useState();
  const [openAddIncome, setOpenAddIncome] = useState(false)
  const [errorRes, setErrorRes] = useState([]);

  const [errors, setErrors] = useState()

  const [openDailyIncomeReport, setOpenDailyIncomeReport] = useState(false);
  const [paymentMethodIncome, setPaymentMethodIncome] = useState("");
  const [paymentIncome, setPaymentIncome] = useState("");
  const [action, setAction] = useState(false)
  const [noteAlert, setNoteAlert] = useState(false)
  const [note, setNote] = useState("");
  const [deleteNoteAlert, setDeleteNoteAlert] = useState(false);
  const [records, setRecords] = useState();
  const [totalSum, setTotalSum] = useState();
  const [cash, setCash] = useState(0);
  const [credit, setCredit] = useState(0);
  const [cheques, setCheques] = useState(0);
  const [totalBit, setTotalBit] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalMinus, setTotalMinus] = useState(0);
  const [totalPlus, setTotalPlus] = useState(0);

  //paging
  const [page, setPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const [low, setLow] = useState();
  // const [medium, setMedium] = useState();
  const [high, setHigh] = useState();
  const [open, setOpen] = useState(false);

  // const [pages, setPages] = useState();
  // const [windowWidth, setWindowWidth] = useState(0);
  // const [paging, setPaging] = useState([]);
  // const [number, setNumber] = useState();



  const arr3 = ["מזומן", "כרטיס אשראי", "צ'קים", "ביט", "לקוחות חוב", "ארנק דיגיטלי", "עודף בקופה", "חוסר בקופה"];
  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
  const currentYear = new Date().getFullYear()
  const lastYear = new Date().getFullYear() -1
  const lastTwoYear = new Date().getFullYear() -2

  const years = [currentYear, lastYear, lastTwoYear]  

  const componentRef = useRef();



  const { hebrew, globalTheme } = useContext(ThemeContext)


  const currentMonth = new Date().getMonth() + 1;

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)
 

  const getIncome = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/all-daily-incomes-paging/${id}/${page}/65/date`)
    // .then(res => setPage(res.data.pageable.pageNumber))
    //  .then(res => {console.log(res.data)
    // setPaging(res.data.content)
    // setNumber(res.data.totalElements)
    // setPages(res.data.totalPages)
    // setPage(res.data.pageable.pageNumber)})
    // .catch(err => console.log(err))
  }
  
  const {data, refetch} = useQuery('income', ()=> getIncome(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: false,
      refetchOnWindowFocus:false
 
    }) 

    
    useEffect(() => {
      setTimeout(() => {
        setIsSSR(false);
      }, 200)
      
    }, []);


    const printPdf2 = () => {
      localStorage.setItem('income', true)
      setFlag2(false)
      getDailyIncomes()

    }

   
    const getAmount = () => {
      const id = result?.id
      return axios.get("https://nartina.com/api/user/monthly-income/" + id + "/" + currentMonth + "/" + currentYear)
    }
    
    const {data: monthlyIncomeForGolmiProfit, refetch: www} = useQuery('amount', ()=> getAmount(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: false,
        refetchOnWindowFocus:false
   
      }) 

      const getAvrage = () => {
        const id = result?.id
        return axios.get("https://nartina.com/api/user/get-user-incomes/" + id)
      }
      
      const {data: avrage, refetch: avrages} = useQuery('avrage-incomes', ()=> getAvrage(),
        {
          // enabled: !!supplier?.name,
          // staleTime: 300000
          refetchOnMount: false,
          refetchOnWindowFocus:false
     
        }) 
  


  const handleChangeDailyIncomeReport = (e) => {
    setPaymentIncome(e.target.value)
    switch(e.target.value) {
      case "מזומן":
        setPaymentMethodIncome("cashMoney");
          break;
        case "כרטיס אשראי":
          setPaymentMethodIncome("creditCard");
          break;
        case "צ'קים":
          setPaymentMethodIncome("cheque");
          break;
        case "ביט":
          setPaymentMethodIncome("bit");
          break;
        case "עודף בקופה":
          setPaymentMethodIncome("plus");
          break;
        case "חוסר בקופה":
          setPaymentMethodIncome("minus");
          break;
        case "ארנק דיגיטלי":
          setPaymentMethodIncome("digital");
          break;
        case "לקוחות חוב":
          setPaymentMethodIncome("debt");
          break;
    }
    
  }


  const [windowHeight, setWindowHeight] = useState(0);
  let resizeWindow = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);

  };

  useEffect(() => {
    resizeWindow();
    console.log(window.innerHeight)
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, [windowHeight, window.innerHeight, windowWidth, window.innerWidth]);

  useEffect(() => {
    if(error == 403) {
      setErrorMode(true)
    }
    
  }, [errorMode, error]);


  useEffect(() => {
    setTimeout(()=> {
      setXxx(true)
    }, 1000)
  })



  useEffect(() => {
    setTimeout(() => {
      setIsSSRE(false);
    }, 1000)
    
  }, [isSSRE]);

  const getAmountForDailyIncomeReport = (e) => {
    e.preventDefault();
    // alert(monthNumber + " " + year + " " + paymentMethodIncome)
    setLoading(true)
    axios.get("https://nartina.com/api/user/get-daily-income-report/" + result?.id + "/" + monthNumber + "/" + year + "/" + paymentMethodIncome)
    .then(res => {setReportAmount(res.data)
    setLoading(false)})
    .catch(err => console.log(err))
    .finally(()=> setAction(false))
  } 

  
  const getDailyIncomesForPdf = () => {
    const id = result?.id
    axios.get("https://nartina.com/api/user/get-daily-income-by-month-3/" + id + "/" + monthNumber + "/" + year)
    .then(res => {setDailyIncomes(res.data.sortedIncomes)
      setRecords(res.data.numberOfRecords)
      setTotalSum(res.data.totalDailyIncomes)
      setCheques(res.data.cheques)
      setTotalBit(res.data.totalBit)
      setTotalDebt(res.data.totalDebt)
      setCash(res.data.totalCash)
      setCredit(res.data.totalCreditCard)
      setTotalMinus(res.data.totalMinus)
      setTotalPlus(res.data.totalPlus)
    console.log(res.data.sortedIncomes)})     
    .catch(err => console.log(err))
    .finally(()=> setAction(false))
  }

  const getDailyIncomes = () => {
    axios.get("https://nartina.com/api/user/get-daily-income-by-user/" + result?.id)
    .then(res => setDailyIncomes(res.data))
    .catch(err => console.log(err))
  }

  

  const printValues = (e)=> {
    e.preventDefault()
    axios.post("https://nartina.com/api/user/update-daily-income/" + ide, {
      cashMoney: cashMoney != "" ? cashMoney : dailyIncome.cashMoney,
      creditCard: creditCard != "" ? creditCard : dailyIncome.creditCard,
      // wallt: wallt != null ? wallt : dailyIncome.wallt,
      // cibus: cibus != null ? cibus : dailyIncome.cibus,
      bit: bit != "" ? bit : dailyIncome.bit,
      plus: plus != "" ? plus : dailyIncome.plus,
      minus: minus != "" ? minus : dailyIncome.minus,
      notes: notes != "" ? notes : dailyIncome.notes,
      debt: debt != "" ? debt : dailyIncome.debt,
      // tenBis: tenBis != null ? tenBis : dailyIncome.tenBis,
      digital: digital != "" ? digital : dailyIncome.digital,
      date: date != "" ? date : dailyIncome.date,
      total: total != "" ? total : dailyIncome.total,
      cheque: cheque != "" ? cheque : dailyIncome.cheque,
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {console.log(res.data)
          setIsOpenUpdate(false)
          getDailyIncomes()
          refetch()
          localStorage.setItem('income', true)
          // setIsOpenAlertIncome(true)
          Swal.fire("!עודכן", '!דו"ח יומי עודכן בהצלחה', "success");
        })
    .catch(err => {console.log(err)
      setIsOpenUpdate(false)
      Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error");
      setError(err.response.status)})
  }

 const options = () => {
  setFlag(true)
  setAction(!action)
 }

 const options2 = () => {
  setOpenDailyIncomeReport(true)
  setAction(!action)
 }
  
  const getDailyIncome = async (id) => {
    const res = await fetch(`https://nartina.com/api/user/daily-income-by-id/${id}`);
    const result = await res.json();
    setDailyIncome(result)
    setIsOpenUpdate(true)
    
}


  const handleCloseAmount = () => {
    setTotalAmount(false)
  }
 
  


  const handleClose = () => {
    setIsOpenAlertIncome(false)
  }

  const handleClose2 = () => {
    setIsOpenAlertIncomeDelete(false)
  }

  const handleClose3 = () => {
    setErrorMode(false)
    setError("")
  }

  
  const handleYears = (e) => {
    setYear(e.target.value)
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

  const getExcel = (e) => {
    e.preventDefault();
    getDailyIncomesForPdf()
    setFlag2(true)
    closeDialog()
  }

  const closeDialog = () => {
    setMonth("")
    setYear("")
    setFlag(false)
  }


  
  const editReport = (id) => {
    setIde(id)
    getDailyIncome(id)
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
      text: "!לא ניתן יהיה לשחזר את הדו''ח",
      icon: 'אזהרה',
      showCancelButton: true,
      confirmButtonText: '!כן מחק',
      cancelButtonText: '!לא למחוק',
      reverseButtons: true
    }).then((results) => {
      if (results.isConfirmed) {
        axios.delete("https://nartina.com/api/user/delete-income-by-id/" + id, {
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
          localStorage.setItem('income', true)}).
        catch(err => {console.log(err.response.data)
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

  const postDataIncomeDaily = (e) => {
    e.preventDefault();
    setLoading(true)
    if(date == "" || total == "") {
      setErrorRes("חסרים שדות חובה")
      setLoading(false)
      return
    }
      axios.post("https://nartina.com/api/user/add-daily-income-to-user/" + result?.id, {
        date,
        creditCard,
        cashMoney,
        cheque,
        bit,
        total,
        plus,
        minus,
        notes,
        debt,
        // digital
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {refetch()
        www()
        setLoading(false)
        localStorage.setItem('income', true)
      setOpenAddIncome(false)
      // setOpenIncomeAlert(true)
      Swal.fire("!הצלחה", '! דו"ח יומי הוכנס בהצלחה', "success")
      // window.location.reload()
      })
      .catch(error => {setErrorRes(error.response.data)
        setOpenAddIncome(false)
        Swal.fire("מצטערים", ' קרתה תקלה, דו"ח לא עודכן' + error.response.data , "error")
        setLoading(false)
        setErrors(error.response.status)})
      setCashMoney("")
      setCheque("")
      setBit("")
      setDebt("")
      setCreditCard("")
      setDate("")
      setNotes("")
      setPlus("")
      setMinus("")
      setTotal("")
      setError("")
      // navigate('/daily-income')
      // window.location.reload()
  }

  const sendAvrage = (e) => {
    e.preventDefault();
    setLoading(true)
    if(low == "" || high == "") {
      setErrorRes("חסרים שדות חובה")
      setLoading(false)
      return
    }
    axios.post("https://nartina.com/api/user/set-user-income/" + result?.id + "/" + low + "/" + high, {
        
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {
        setLoading(false)
        avrages()
        setOpen(false)
        refetch()
        Swal.fire("!הצלחה", '!הכנסה מממוצעת הוכנסה בהצלחה', "success")
      // window.location.reload()
      })
      .catch(error => {setErrorRes(error.response.data)
        setOpen(false)
        Swal.fire("מצטערים", '  קרתה תקלה הכנסה ממוצעת לא נכנסה', "error")
        setLoading(false)
        setErrors(error.response.status)})
  }

  const closeAddDailyIncome = () => {
    setOpenAddIncome(false)
    setDebt("")
    setBit("")
    setNotes("")
    setPlus("")
    setMinus("")
    setTotal("")
    setCashMoney("")
    setCheque("")
    setCreditCard("")
    setDate("")
    setErrorRes("")
  }


  const handleClose9 = () => {
    setDeleteNoteAlert(false)
  }

  const getNote = (id) => {
    axios.get("https://nartina.com/api/user/get-income-note/" + id)
    .then(res => {setNote(res.data)
    setNoteAlert(true)})
    .catch(err => console.log(err.response.data))
  }

  const deleteNotes = async () => {
    axios.get("https://nartina.com/api/user/delete-income-notes/" + ide)
    .then(res => {setNoteAlert(false)
      setNote("")
      setNotes("")
      setDeleteNoteAlert(true)
      refetch()
    // getInvoices()
  }).catch(err => console.log(err.response.data))
    
  }

  const getNotes = (id) => {
    setIde(id)
    getNote(id)
  }

  const closeDailyIncomeReport = () => {
    setOpenDailyIncomeReport(false)
    setMonth("")
    setPaymentMethodIncome("")
    setYear("")
    setReportAmount("")
    setPaymentIncome("")
    
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
    <>
        <section class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${(globalTheme != "light" && !flag2) && "bg-gray-700 dark"}`}>
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
                        <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                            <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                            Actions
                        </button>
                        {/* <div id="actionsDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                <li>
                                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                </li>
                            </ul>
                            <div class="py-1">
                                <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                            </div>
                        </div> */}
                        <div class={`${!action && 'hidden'} p-4 z-10 w-44 absolute top-10 flex flex-col space-y-1 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={options}>
                              <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                              <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Print</h1>
                            </div>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setOpenDailyIncomeReport(true)}>
                             <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                             <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
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
              <th scope="col" className="px-4 py-3">date</th>
              <th scope="col" className="px-4 py-3">cash</th>
              <th scope="col" className="px-4 py-3">credit card</th>
              <th scope="col" className="px-4 py-3">cheques</th>
              <th scope="col" className="px-4 py-3">debt customers</th>
              <th scope="col" className="px-4 py-3">bit</th>
              <th scope="col" className="px-4 py-3">digital wallet</th>
              <th scope="col" className="px-4 py-3">total</th>
              <th scope="col" className="px-4 py-3">edit</th>
              <th scope="col" className="px-4 py-3">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data?.content.map((report, index) => (
              <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm text-gray-600 dark:text-gray-300 font-semibold">{report.date}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{Number(report.cashMoney).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{Number(report.creditCard).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{Number(report.cheque).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{Number(report.debt).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{Number(report.bit).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm dark:text-gray-300">{Number(report.digital).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2 text-md font-semibold text-green-600 dark:text-green-500">{Number(report.total).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 px-1 py-1 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer " onClick={()=> editReport(report.id)}>
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
        {flag2 ? (
          <>
           <div className='flex justify-between items-center py-1 pr-3 px-4'>
           <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={printPdf2}>
            <CloseIcon className='hover:text-red-600 hover:animate-spin text-red-500'/>
          </div>
        {/* <div></div> */}
         <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">
                    <div className="flex items-center justify-center relative right-2">
                    <div className="flex items-center justify-center space-x-1 bg-blue-200 hover:bg-blue-300 rounded-md px-2 py-[2px] w-fit" onClick={()=> setFlag(false)}> 
                    <h1 className="font-mono text-blue-600 font-semibold">הדפס</h1>
                    <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-4'/> 
                    </div>
                    </div>
            </a>;
          }}
          content={() => componentRef.current}
          documentTitle='דו"ח שנתי'
        />
         {/* <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={printPdf2}>
            <CloseIcon className='hover:text-red-600 text-red-500'/>
          </div> */}
        </div>
        <div className=''>
        {hebrew ? (
          <div ref={componentRef}>
            <table className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]" >
          <thead className="bg-gray-50">
            <tr>
             <th scope="col" className="px-1 text-center py-2 text-xs">date</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">cash</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">credit card</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">cheques</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">debt customers</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">bit</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">digital wallet</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dailyIncomes?.map((report, index) => (
              <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
              <td scope="col" className="px-1 text-center py-2 text-xs font-semibold text-blue-800">{report.date}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{Number(report.cashMoney).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{Number(report.creditCard).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.cheque}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.debt}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.bit}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.digital}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{Number(report.total).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
    <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
       {/* <h1 className='text-lg font-semibold font-mono '>{(number2 > 0 && !vvv) ? number2 : number}</h1> */}
       {/* <h1 className='font-mono '>מס' חשבוניות {data?.data.totalElements}</h1> */}
       <h1 className='font-mono '>records {records}</h1>
    </div>
    <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(totalSum)).toLocaleString()} total amount</h1>
    </nav>
    <div className='flex items-center justify-end space-x-2 mr-16 relative bottom-2'>
    {cash > 0  && <h1 className='font-mono'><span className='text-sm font-sans'>₪</span> {Number(Math.round(cash)).toLocaleString()} cash</h1>}
    {credit > 0  && <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(credit)).toLocaleString()} credit card</h1>}
    {cheques > 0  && <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(cheques)).toLocaleString()} cheques</h1>}
    {totalBit > 0  && <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(totalBit)).toLocaleString()} bit</h1>}
    {totalDebt > 0  && <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(totalDebt)).toLocaleString()} debt</h1>}
    </div>
    <div className='flex items-center justify-end space-x-2 mr-16 relative bottom-2'>
    {totalMinus > 0  && <h1 className='font-mono'><span className='text-sm font-sans'>₪</span> {Number(Math.round(totalMinus)).toLocaleString()} minus</h1>}
    {totalPlus > 0  && <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(totalPlus)).toLocaleString()} plus</h1>}
    </div>
          </div>
        ) : (
          <div ref={componentRef}>
          <table className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-1 text-center py-2 text-xs">סה"כ</th>
          <th scope="col" className="px-1 text-center py-2 text-xs">ארנק דיגיטלי</th>
          <th scope="col" className="px-1 text-center py-2 text-xs">ביט</th>
          <th scope="col" className="px-1 text-center py-2 text-xs">לקוחות חוב</th>
          <th scope="col" className="px-1 text-center py-2 text-xs">צ'קים</th>
          <th scope="col" className="px-1 text-center py-2 text-xs">אשראי</th>
          <th scope="col" className="px-1 text-center py-2 text-xs">מזומן</th>
          <th scope="col" className="px-1 text-center py-2 text-xs">תאריך</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {dailyIncomes?.map((report, index) => (
          <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
          <td scope="col" className="px-1 text-center py-2 text-xs">{Number(report.total).toLocaleString()}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.digital}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.bit}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.debt}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.cheque}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{Number(report.creditCard).toLocaleString()}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{Number(report.cashMoney).toLocaleString()}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs font-semibold text-blue-800">{report.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <nav class="flex flex-col md:flex-row justify-between items-start md:items-center mr-12 space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
    <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
       {/* <h1 className='text-lg font-semibold font-mono '>{(number2 > 0 && !vvv) ? number2 : number}</h1> */}
       {/* <h1 className='font-mono '>מס' חשבוניות {data?.data.totalElements}</h1> */}
       <h1 className='font-mono '> {records} מס' דו"חות</h1>
    </div>
    <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(totalSum)).toLocaleString()} סכום דו"חות</h1>
    </nav>
    <div className='flex items-center justify-end space-x-2 mr-16 relative bottom-2'>
    {cash > 0  && <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(cash)).toLocaleString()} מזומן</h1>}
    {credit > 0  && <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(credit)).toLocaleString()} אשראי</h1>}
    {cheques > 0  && <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(cheques)).toLocaleString()} צ'קים</h1>}
    {totalBit > 0  && <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(totalBit)).toLocaleString()} ביט</h1>}
    {totalDebt > 0  && <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(totalDebt)).toLocaleString()} לקוחות חוב</h1>}
    </div>
    <div className='flex items-center justify-end space-x-2 mr-16 relative bottom-2'>
    {totalMinus > 0  && <h1 className='font-mono'><span className='text-sm font-sans'>₪</span> {Number(Math.round(totalMinus)).toLocaleString()} חוסר בקופה</h1>}
    {totalPlus > 0  && <h1 className='font-mono '><span className='text-sm font-sans'>₪</span> {Number(Math.round(totalPlus)).toLocaleString()} עודף בקופה</h1>}
    </div>
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
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> setOpenAddIncome(true)}>
                       הכנס דו"ח יומי
                   </button>
                   <div class="flex items-center space-x-3 w-full md:w-auto relative">
                       <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                           <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                           אפשרויות
                       </button>
                       <div class={`${!action && 'hidden'} p-4 z-10 w-44 absolute top-10 flex flex-col space-y-1 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={options}>
                              <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                              <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Print</h1>
                            </div>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={options2}>
                             <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                             <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
                           </div>
                           <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> {setOpen(true)
                              setAction(!action)}}>
                             <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                             <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Avrage</h1>
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
                       {/* <div className='relative top-1 right-2' onClick={()=> setFlag(!flag)}>
                         <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-5 -mt-2'/>
                       </div>
                       <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 relative top-[1px] right-2' onClick={()=> setOpenDailyIncomeReport(true)}/> */}
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
         <th scope="col" className="px-4 py-3 text-center">מחק</th>
         <th scope="col" className="px-4 py-3 text-center">ערוך</th>
         <th scope="col" className="px-4 py-3 text-center">הערות</th>
         <th scope="col" className="px-4 py-3 text-center">דירוג</th>
         <th scope="col" className="px-4 py-3 text-center">סה"כ</th>
         <th scope="col" className="px-4 py-3 text-center">ביט</th>
         <th scope="col" className="px-4 py-3 text-center">לקוחות חוב</th>
         <th scope="col" className="px-4 py-3 text-center">צ'קים</th>
         <th scope="col" className="px-4 py-3 text-center">אשראי</th>
         <th scope="col" className="px-4 py-3 text-center">מזומן</th>
         <th scope="col" className="px-4 py-3 text-center">תאריך</th>
                       </tr>
                   </thead>
                   <tbody>
                   {data?.data.content.map((report, index) => (
         <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
           
                              <td scope="col" className="px-1 text-center py-2 whitespace-nowrap ">
                                <div class="inline-flex text-xs leading-5 bg-rose-200 dark:bg-slate-600 relative top-[1.5px] items-center justify-center rounded-lg cursor-pointer p-0.5" onClick={()=> handleAlert(report.id)}>
                                        <svg class="w-7 h-7 text-red-600 dark:text-red-500 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                </div>
                              </td>
           <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
             <div className="inline-flex text-xs leading-5 bg-blue-100 dark:bg-slate-600 items-center justify-center rounded-lg cursor-pointer p-1.5" onClick={()=> editReport(report.id)}>
          <svg width="15" height="15" fill="currentColor" class="w-5 h-5 cursor-pointer hover:rotate-12 text-blue-600 dark:text-blue-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path stroke-width="2" d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
          </path>
          </svg>
          </div>
           </td>
           <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
             <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> getNotes(report.id)}>
              <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600 dark:text-purple-500"}  `}/>
             </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
            {report?.total < avrage?.data.low && (
              <div class="flex items-center inline-flex">
             <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
          </div>
            )}
            {(report?.total >= avrage?.data.low && report?.total <= avrage?.data.high) && (
              <div class="flex items-center inline-flex">
              <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>First star</title>
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
              </svg>
              <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Second star</title>
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
              </svg>
              <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Third star</title>
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
              </svg>
              <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Fourth star</title>
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
              </svg>
              <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Fifth star</title>
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
              </svg>
          </div>
            )}
            {(report?.total > avrage?.data.high) && (
              <div class="flex items-center inline-flex">
              <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
          </div>
            )}
            </td>
         <td scope="col" className="px-4 py-3 text-center text-green-600 dark:text-green-500 font-semibold">{Number(report.total).toLocaleString()}</td>
         <td scope="col" className="px-4 py-3 text-center">{Number(report.bit).toLocaleString()}</td>
         <td scope="col" className="px-4 py-3 text-center">{Number(report.debt).toLocaleString()}</td>
         <td scope="col" className="px-4 py-3 text-center">{Number(report.cheque).toLocaleString()}</td>
         <td scope="col" className="px-4 py-3 text-center">{Number(report.creditCard).toLocaleString()}</td>
         <td scope="col" className="px-4 py-3 text-center">{Number(report.cashMoney).toLocaleString()}</td>
         <th scope="col" className="px-4 py-3 text-center text-blue-500 dark:text-[#ccc]">{report.date}</th>
         </tr>
       ))}
                   </tbody>
               </table>
           </div>
           <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {data?.data.content.map(report => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-1`}>
                <div className="p-4 blue-glassmorphism hover:bg-gray-900 shadow rounded flex flex-col space-y-1">

                <div className='flex items-center justify-end space-x-2 text-sm'>
                  
                  <div className='dark:text-[#ccc] font-mono text-lg'>
                    {report.date}
                    </div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'><span className='font-sans text-sm'>₪</span>{Number(report.cashMoney).toLocaleString()}</div>
                <div className='text-right dark:text-[#ccc]'>מזומן</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'><span className='font-sans text-sm'>₪</span>{Number(report.creditCard).toLocaleString()}</div>
                <div className='text-right dark:text-[#ccc]'>אשראי</div>
                </div>
                <div className={`flex items-center justify-end space-x-2 ${report.cheque == 0 && 'hidden'}`}>
                <div className='text-right font-mono dark:text-[#ccc]'><span className='font-sans text-sm'>₪</span>{Number(report.cheque).toLocaleString()}</div>
                <div className='text-right dark:text-[#ccc]'>צ'קים</div>
                </div>
                <div className={`flex items-center justify-end space-x-2 ${report.debt == 0 && 'hidden'}`}>
                <div className='text-right font-mono dark:text-[#ccc]'><span className='font-sans text-sm'>₪</span>{Number(report.debt).toLocaleString()}</div>
                <div className='text-right dark:text-[#ccc]'>לקוחות חוב</div>
                </div>
                <div className={`flex items-center justify-end space-x-2 ${report.bit == 0 && 'hidden'}`}>
                <div className='text-right font-mono dark:text-[#ccc]'><span className='font-sans text-sm'>₪</span>{Number(report.bit).toLocaleString()}</div>
                <div className='text-right dark:text-[#ccc]'>ביט</div>
                </div>
                <div>
                <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
            {report?.total < avrage?.data.low && (
              <div class="flex items-center inline-flex">
             <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
          </div>
            )}
            {(report?.total >= avrage?.data.low && report?.total <= avrage?.data.high) && (
              <div class="flex items-center inline-flex">
              <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>First star</title>
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
              </svg>
              <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Second star</title>
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
              </svg>
              <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Third star</title>
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
              </svg>
              <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Fourth star</title>
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
              </svg>
              <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Fifth star</title>
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
              </svg>
          </div>
            )}
            {(report?.total >= avrage?.data.high) && (
              <div class="flex items-center inline-flex">
              <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
          </div>
            )}
            </td>
                </div>
                <div className='flex items-center justify-between space-x-4 relative top-1'>
                <div className='flex items-center justify-center space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(report.total).toLocaleString()}</h1>
                  <h1 className='dark:text-[#ccc]'>סה"כ</h1>
                </div>
              <div className='flex items-center justify-center space-x-4'>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editReport(report.id)}>
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
        </>
    )}
    </section>
       

<Dialog open={openUpdate}>
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> setIsOpenUpdate(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                    עדכן דו"ח יומי 
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
                    <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">צ'קים</label>
                    <input type="text" name="agentPhone" defaultValue={dailyIncome?.cheque} placeholder="צ'קים" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setCheque(e.target.value)}/>
                  </div>
                  <div>
                  <div className='flex justify-end items-center space-x-1'>
                    <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">תאריך דו"ח</label>
                  </div>       
                    <input type="date" name="date" defaultValue={dailyIncome?.date} placeholder='תאריך דו"ח' class="bg-gray-50 h-[40px] min-w-max text-right border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setDate(e.target.value)}/>
                  </div>  
                    <div>
                      <label for="debt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">לקוחות חוב</label>
                      <input type="text" name="debt" defaultValue={dailyIncome?.debt} placeholder="לקוחות חוב" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setDebt(e.target.value)}/>
                  </div>
                  <div>
                      <label for="cash" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">מזומן</label>
                      <input type="text" name="cash" defaultValue={dailyIncome?.cashMoney} placeholder="מזומן" class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setCashMoney(e.target.value)}/>
                  </div>  
                  <div>
                      <label for="bit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">ביט</label>
                      <input type="text" name="bit" defaultValue={dailyIncome?.bit} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ביט" required="" onChange={(e)=> setBit(e.target.value)}/>
                  </div>
                  <div>
                      <label for="creditCard" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">אשראי</label>
                      <input type="text" name="creditCard" defaultValue={dailyIncome?.creditCard} placeholder="אשראי" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setCreditCard(e.target.value)}/>
                  </div>
                  <div>
                  <div className='flex justify-end items-center space-x-1'>
                    <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                    <label for="total" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">סה"כ</label>
                  </div>      
                      <input type="text" name="total" defaultValue={dailyIncome?.total} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='סה"כ' required="" onChange={(e)=> setTotal(e.target.value)}/>
                  </div>
                  <div className='flex justify-center items-center space-x-2'>
                      <div>
                      <label for="minus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">חוסר בקופה</label>
                      <input type="number" name="minus" defaultValue={dailyIncome?.minus} placeholder="חוסר" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setMinus(e.target.value)}/>
                      </div>
                      <div>
                      <label for="plus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">עודף בקופה</label>
                      <input type="number" name="plus" defaultValue={dailyIncome?.plus} placeholder="עודף" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setPlus(e.target.value)}/>
                      </div>
                  </div>            
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">הערות</label>
                        <textarea defaultValue={dailyIncome?.notes} rows="2" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='...הערות לגבי הדו"ח, לדוגמא: חוסר או עודף בקופה, לקוחות שלא שילמו וכו' onChange={(e)=> setNotes(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center cursor-pointer text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=> setIsOpenUpdate(false)}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  עדכן דו"ח   
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


    <Snackbar open={openAlertIncome} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? 'successfully update the report' : 'דו"ח יומי עודכן בהצלחה'}     
             </Alert>
      </Snackbar>

      <Snackbar open={openAlertIncomeDelete} autoHideDuration={10000} onClose={handleClose2} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose2}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? 'successfully deleted the report' : 'דו"ח יומי נמחק בהצלחה'}    
              </Alert>
      </Snackbar>
      <Snackbar open={totalAmount} autoHideDuration={20000} onClose={handleCloseAmount} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleCloseAmount}
          severity="info"
          sx={{ width: "100%" }}
        >
          {hebrew ? <h1>total -Z- income<span className='text-blue-800 font-semibold'> {Number(Math.round(monthlyIncomeForGolmiProfit?.data)).toLocaleString()}</span> NIS
          </h1> : <h1>סה"כ דוח יומי חודש נוכחי<span className='text-blue-800 font-semibold'> {Number(Math.round(monthlyIncomeForGolmiProfit?.data)).toLocaleString()}</span> ש"ח
          </h1>}
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

      <Dialog open={flag}>
      <div className='w-full py-6 px-8 flex flex-col justify-center items-center'>
      {/* <div className='flex items-center justify-end p-2'> */}
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer self-end' fontSize='large' onClick={closeDialog}/>
      {/* </div> */}
        <h1 className='text-center font-mono text-amber-700 text-3xl'>הדפס דו"ח יומי</h1><br></br>
        <h1 className='text-center font-mono text-amber-600 text-lg'>ניתן לבחור חודש ושנה </h1>
        <h1 className='text-center font-mono text-amber-600 text-lg'>ניתן לבחור רק שנה</h1>
        <DialogContent>
        <form onSubmit={getExcel} className='flex space-x-4'>
                <div className='flex flex-col space-y-1'>
                  {/* <InputLabel id="demo-simple-select-label" className='text-right w-64'>קטגוריה</InputLabel>
                    <Select 
                    value={category}
                    onChange={handleChangeCategory}
                    className='bg-white shadow-xl rounded-md px-2 text-right'>
            {categories?.map(c => (
                <MenuItem value={c}>{c}</MenuItem>
            ))}
                    </Select> */}
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
                    
                  {/* <button type='submit' disabled={supplierNameForReport == "" || month == "" || year == ""} className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg mt-2'>הורד דו"ח אקסל</button> */}
                  <button type='submit' disabled={(year == "" || month == "") } className='bg-blue-700 px-2 py-1 font-mono text-white hover:bg-blue-600 hover:text-gray-100 font-semibold rounded-lg mt-2 relative top-3'>הדפס דו"ח יומי</button>

                  <div className='flex items-center justify-center space-x-1 relative top-3'>
                  {(month != "" && year != "") && <h1 className='text-center text-blue-700 text-xl font-mono'>{year} - {month}</h1>}
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

  
<Dialog open={openAddIncome}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeAddDailyIncome}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                    הכנס דו"ח יומי חדש
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
            <form onSubmit={postDataIncomeDaily}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                    <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">צ'קים</label>
                    <input type="text" name="agentPhone" value={cheque} placeholder="צ'קים" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setCheque(e.target.value)}/>
                  </div>
                  <div>
                  <div className='flex justify-end items-center space-x-1'>
                    <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">תאריך דו"ח</label>
                  </div>       
                    <input type="date" name="date" value={date} placeholder='תאריך דו"ח' class="bg-gray-50 block text-right border placeholder:text-right h-[40px] min-w-max w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setDate(e.target.value)}/>
                  </div>  
                    <div>
                      <label for="debt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">לקוחות חוב</label>
                      <input type="text" name="debt" value={debt} placeholder="לקוחות חוב" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setDebt(e.target.value)}/>
                  </div>
                  <div>
                      <label for="cash" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">מזומן</label>
                      <input type="text" name="cash" value={cashMoney} placeholder="מזומן" class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setCashMoney(e.target.value)}/>
                  </div>  
                  <div>
                      <label for="bit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">ביט</label>
                      <input type="text" name="bit" value={bit} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ביט" required="" onChange={(e)=> setBit(e.target.value)}/>
                  </div>
                  <div>
                      <label for="creditCard" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">אשראי</label>
                      <input type="text" name="creditCard" value={creditCard} placeholder="אשראי" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setCreditCard(e.target.value)}/>
                  </div>
                  <div>
                  <div className='flex justify-end items-center space-x-1'>
                    <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">סה"כ</label>
                  </div>      
                      <input type="text" name="toal" value={total} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='סה"כ' required="" onChange={(e)=> setTotal(e.target.value)}/>
                  </div>
                  <div className='flex justify-center items-center space-x-2'>
                      <div>
                      <label for="creditCard" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">חוסר בקופה</label>
                      <input type="text" name="creditCard" value={minus} placeholder="חוסר" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setMinus(e.target.value)}/>
                      </div>
                      <div>
                      <label for="creditCard" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">עודף בקופה</label>
                      <input type="text" name="creditCard" value={plus} placeholder="עודף" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setPlus(e.target.value)}/>
                      </div>
                  </div>            
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">הערות</label>
                        <textarea value={notes} rows="2" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='...הערות לגבי הדו"ח, לדוגמא: חוסר או עודף בקופה, לקוחות שלא שילמו וכו' onChange={(e)=> setNotes(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center cursor-pointer text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeAddDailyIncome}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  הכנס דו"ח חדש  
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

    <Dialog open={openDailyIncomeReport}>
      <div className='w-full p-4 flex flex-col justify-center items-center'>
      {/* <div className='flex items-center justify-end p-2'> */}
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer self-end' fontSize='large' onClick={closeDailyIncomeReport}/>
      {/* </div> */}
        <h1 className={`text-center ${hebrew ? "font-serif text-slate-600" : "text-gray-700"} text-3xl`}>{hebrew ? "select payment method month and a year" : "בחר אמצעי תשלום חודש ושנה"}</h1>
        <DialogContent>
        <form onSubmit={getAmountForDailyIncomeReport} className='flex space-x-4'>
                <div className='flex flex-col space-y-1'>
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"} w-64`} >{hebrew ? "payment method" : "אמצעי תשלום"}</InputLabel>
                    <Select 
                    value={paymentIncome}
                    onChange={handleChangeDailyIncomeReport}
                    className='bg-white text-right rounded-md px-2'>
            {arr3?.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
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
                   
                  <button type='submit' disabled={paymentIncome == "" || month == "" || year == ""} className='bg-blue-700 px-2 py-1 font-mono text-white hover:bg-blue-600 hover:text-gray-100 font-semibold rounded-lg relative top-3'>{hebrew ? "check amount" : "בדוק סכום"}</button>
                  <div className='flex items-center justify-center space-x-0.5 relative top-3'>
                    {reportAmount && (
                     <>
                      {loading ? <CircularProgress color="primary" size={30}/> :
                        <>
                        
                          <h1 className='text-center text-blue-600 text-xl font-mono'>₪</h1>
                          <h1 className='text-center text-blue-600 text-2xl font-mono'>{Number(reportAmount).toLocaleString()}</h1>
                        
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
            </button>        </div>
          <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{note != "" ? note : "no notes"}</h1>
          </div>
        ) : (
          <div>
            <div className='flex items-center justify-end p-2'>
            <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal" onClick={()=> setNoteAlert(false)}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>        </div>
          <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{note != "" ? note : "אין הערות"}</h1>
          </div>
        )}  
            {note != "" && (
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
            )}
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

      <Dialog open={open} aria-labelledby="responsive-dialog-title">
      
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
            <div className='flex items-center justify-between'>
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> setOpen(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            <h1 class="text-lg font-bold leading-tight text-gray-900 md:text-2xl dark:text-white">
                הכנס הכנסה ממוצעת  
            </h1>
            </div>
            <form class="space-y-4 md:space-y-6" onSubmit={sendAvrage}>
                <div>
                <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">הכנסה מינימלית</label>
                      </div>                    
                      <input type="text" value={low} name="email" id="email" class="bg-gray-50 text-left placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="מינימום" required="" onChange={e => setLow(e.target.value)}/>
                </div>
                {/* <div>
                <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">הכנסה רגילה</label>
                      </div>                    
                      <input type="text" value={medium} name="email" id="email" class="bg-gray-50 text-right placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="רגיל" required="" onChange={e => setMedium(e.target.value)}/>
                </div> */}
                <div>
                <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">הכנסה גבוהה מהרגיל</label>
                      </div>                    
                      <input type="text" value={high} name="password" id="password" placeholder="גבוה מהרגיל" class="bg-gray-50 placeholder:text-right text-left border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={e => setHigh(e.target.value)}/>
                </div>
                
                
                <div class="flex items-end">
                <div class="mr-3 text-sm">
                      <label for="terms" class="font-light text-gray-500 dark:text-gray-300"> <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">  נווט לתזכורות מחירים </a> הפעלת תזכורת </label>
                    </div>
                    <div class="flex items-center h-5">
                      <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    
                </div>
                <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">הכנס</button>
                {/* <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</a>
                </p> */}
            </form>
        </div>
    </div>
       )}
       </div>
       
    </Dialog>

    {/* <Snackbar open={openIncomeAlert} autoHideDuration={10000} onClose={handleClose5} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose5}
          severity="success"
          sx={{ width: "100%" }}
        >
          {hebrew ? 'successfully added new report' : 'דו"ח יומי הוכנס בהצלחה'}
        </Alert>
      </Snackbar> */}
    </>
  )
}

export default DailyIncomeReports