import React, { useState, useEffect, useContext, useRef } from 'react'
import AssignmentIcon from '@mui/icons-material/Assignment';
import CircularProgress from '@mui/material/CircularProgress';

import { Snackbar, Alert } from "@mui/material";
import { Dialog, DialogContent } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Select, MenuItem, InputLabel} from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language';

import CloseIcon from '@mui/icons-material/Close';

import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

import ContactsIcon from '@mui/icons-material/Contacts';

import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';

import MenuIcon from '@mui/icons-material/Menu';
// import AddCardIcon from '@mui/icons-material/AddCard';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { SiMicrosoftexcel } from 'react-icons/si';
import axios from 'axios';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom'
import { ThemeContext } from "../App";
import fileDownload from 'js-file-download';

import { useQuery } from 'react-query'
// import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Dropdown from '../components/Dropdown'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

import SwitchTheme2 from './SwitchTheme2';
// import SwitchTheme from './SwitchTheme';
import NivoPie from './NivoPie';

import logo from '../assets/nartina6.png'
import Swal from 'sweetalert2'




const Header = () => {
    const location = useLocation()
    const ref = useRef(null)
    const { reload, setReload, suppId, globalTheme, toogleMenu, setToogleMenu, spins, setSpins, color, setColor, custId, hebrew, setTopBox, topBox, setHebrew, setReloadSalary, space, setSpace, setDashMode, dashMode } = useContext(ThemeContext)
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [arrow, setArrow] = useState(false)
    const [openx, setIsOpenx] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
 
    // const [openAddRestaurant, setOpenAddRestaurant] = useState(false)
   
    // const [error, setError] = useState([]);  
    const [loading, setLoading] = useState(false)
    const [openNivo, setOpenNivo] = useState(false)
    const [clali, setClali] = useState(false)
    const [allResturants, setAllResturants] = useState(false)
  
    const [meeting, setMeeting] = useState(false)
    // const [errorRes, setErrorRes] = useState([]);

    const [excel, setExcel] = useState(false)
    const [errors, setErrors] = useState()
    const [errorMode, setErrorMode] = useState(false)
    
    const [openW, setOpenW] = useState(false)

    // add worker
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [dob, setDob] = useState("");
    // const [startedAt, setStarttedAt] = useState("");
    // const [salaryPerHour, setSalaryPerHour] = useState("");
    // const [address, setAddress] = useState("");
    // const [idNumber, setIdNumber] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState("");

    //add deferral payment list
    const [reports, setReports] = useState(false)
    const [deferralPaymentsList, setDeferralPaymentsList] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");


    //addInvoice

  // const [suppliers, setSuppliers] = useState([]);
  
  
  // const [supplierId, setSupplierId] = useState();
 

   //add restaurant-report
   const [dateRest, setDateRest] = useState("");
   const [cibus, setCibus] = useState();
   const [tenBis, setTenBis] = useState();
   const [wallt, setWallt] = useState();
   const [mishloha, setMishloha] = useState();
   const [otherIncome, setOtherIncome] = useState();
   const [other2, setOther2] = useState();
   const [goodi, setGoodi] = useState();

   //suppliers-Reports
  
   const [openRestaurantReport, setOpenRestaurantReport] = useState(false);
   const [month, setMonth] = useState("");
   const [year, setYear] = useState("");
   const [monthNumber, setMonthNumber] = useState(0);
   const [reportAmount, setReportAmount] = useState();


   //restaurant-reports
   const [paymentMethodIncomeRestaurant, setPaymentMethodIncomeRestaurant] = useState("");
   const [paymentIncomeRestaurant, setPaymentIncomeRestaurant] = useState("");


   //print excel
   const [category, setCategory] = useState("");

  
  const theme = useTheme();


    const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]

    const currentYear = new Date().getFullYear()
    const lastYear = new Date().getFullYear() -1
    const lastTwoYear = new Date().getFullYear() -2
    const currentMonth = new Date().getMonth() + 1;

    const years = [currentYear, lastYear, lastTwoYear]  

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

 
  const arr4 = ["סיבוס", "תן ביס", "וולט", "מישלוחה", "גודי", "אחר", "2אחר", "כללי"];
  const categories = ["דו''ח יומי", "חשבוניות ספקים", "חשבוניות ספקים סחורה", "חשבוניות לקוחות", "דו''ח מסעדות", "משכורות", "ניהול מלאי"]


  const solutions = [
    {
      name: 'Insights',
      description: 'Measure actions your users take',
      href: '##',
      icon: IconOne,
    },
    {
      name: 'Automations',
      description: 'Create your own targeted content',
      href: '##',
      icon: IconTwo,
    },
    {
      name: 'Reports',
      description: 'Keep track of your growth',
      href: '/stats',
      icon: IconThree,
    },
    {
      name: 'Insights',
      description: 'Measure actions your users take',
      href: '##',
      icon: IconOne,
    },
    {
      name: 'Automations',
      description: 'Create your own targeted content',
      href: '##',
      icon: IconTwo,
    },
    {
      name: 'Reports',
      description: 'Keep track of your growth',
      href: 'stats',
      icon: IconThree,
    },
  ]

  function IconOne() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  function IconTwo() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  function IconThree() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
        <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
        <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
        <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
        <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
        <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
      </svg>
    )
  
  
 
  }
  

  useEffect(() => {
    if(errors == 403) {
      setErrorMode(true)
      setTimeout(() => {
        localStorage.removeItem("user")
        window.location.replace('/login')
        // navigate('/login')
        // window.location.reload() 
      }, 3000)
    }
    
  }, [errorMode, errors]);


  useEffect(() => {
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setVisible(false)
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [ref]);



  const getNumsOfSchedulers = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/schedulers-by-user-from-today-and-above/${id}`)
  }
  
  const {data: numsOfSchedulers, refetch: hhh} = useQuery('numsOfSchedulers', ()=> getNumsOfSchedulers(),
    {
     
      // refetchOnMount: xxx,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    })


    const getUrgentsTasks = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/count-user-urgent-tasks/${id}`)
    }
    
    const {data: urgentTasks, refetch: rrr} = useQuery('urgentTasks', ()=> getUrgentsTasks(),
      {
       
        // refetchOnMount: xxx,
        refetchOnMount: false,
        refetchOnWindowFocus: false
      })
  
  
  useEffect(()=> {
    if(numsOfSchedulers?.data > 0) {
      setMeeting(true)
    }
  }, [numsOfSchedulers?.data])

  

  useEffect(()=> {
    if(reload) {
      // getUrgentTasks() 
      hhh()
      rrr()
      // getSchedulers()
      setReload(false)
    }
}, [reload])



    
    
    useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
    }, [user?.id])


    const handleClose9 = () => {
      setErrorMode(false)
      setErrors("")
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

const getMonthInEnglish = (e) => {
  let month = "";
    switch (e) {
      case 1:
          month = "january"
        break;
        case 2:
          month = "february"
          break;
          case 3:
              month = "march"
            break;
            case 4:
              month = "april"
              break;
              case 5:
                  month = "may"
              break;
              case 6:
                  month = "june"
              break;
              case 7:
                month = "july"
              break;
              case 8:
                  month = "august"
              break;
              case 9:
                  month = "september"
              break;
              case 10:
                month = "october"
              break;
              case 11:
                  month = "november"
              break;
              case 12:
                  month = "december"
              break;
      // default:
      //   month = new Date().getMonth().toLocaleString()
      //   break;
    }
    // setMonthNumber(monthNum)
    return month;
  //   return monthNum;
}

const handleCloseMeeting = () => {
  setMeeting(false)
}

const handleYears = (e) => {
  setYear(e.target.value)
  }

 

  // const handleCategory = (e) => {
  //   setCategory(e.target.value)
  //   handleChangeCategory(e.target.value)

  // }

  const getExcelNoMonth = () => {
      let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
    switch(category) {
      case "דו''ח יומי":
        // if(year == "" || month == "") return
        axios.get(`https://nartina.com/api/excel/export-daily-income-by-year/${user?.id}/${year}/${hebrew ? 2 : 1}` ,{
      responseType: 'blob',
    })
    .then(res => {
      fileDownload(res.data, filename + ".xlsx");
    });
    setExcel(false)
    setCategory("")
    setMonth("")
    setYear("")
          break;
        case "חשבוניות ספקים":
          axios.get(`https://nartina.com/api/excel/export-all-invoices-by-year/${user?.id}/${year}/${hebrew ? 2 : 1}` ,{
      responseType: 'blob',
    })
    .then(res => {
      fileDownload(res.data, filename + ".xlsx");
    });
    setExcel(false)
    setCategory("")
    setMonth("")
    setYear("")
          break;
        case "חשבוניות לקוחות":
          axios.get(`https://nartina.com/api/excel/export-all-customers-invoices-by-year/${user?.id}/${year}/${hebrew ? 2 : 1}` ,{   
            responseType: 'blob',    
          })
          .then(res => {
            fileDownload(res.data, filename + ".xlsx");
          });
          setExcel(false)
          setCategory("")
          setMonth("")
          setYear("")
          break;
        case "משכורות":
          axios.get(`https://nartina.com/api/excel/export-all-salaries-by-year/${user?.id}/${year}/${hebrew ? 2 : 1}` ,{   
            responseType: 'blob',
          })
          .then(res => {
            fileDownload(res.data, filename + ".xlsx");
          });
          setExcel(false)
          setCategory("")
          setMonth("")
          setYear("")
          break;
          case "דו''ח מסעדות":
            axios.get(`https://nartina.com/api/excel/export-all-restaurant-reports-by-year/${user?.id}/${year}/${hebrew ? 2 : 1}` ,{
              responseType: 'blob',
            })
            .then(res => {
              fileDownload(res.data, filename + ".xlsx");
            });
            setExcel(false)
            setCategory("")
            setMonth("")
            setYear("")
          break;
        case "ניהול מלאי":
          axios.get(`https://nartina.com/api/excel/export-all-inventories-by-year/${user?.id}/${year}/${hebrew ? 2 : 1}` ,{
            responseType: 'blob',
          })
          .then(res => {
            fileDownload(res.data, filename + ".xlsx");
          });
          setExcel(false)
          setCategory("")
          setMonth("")
          setYear("")
          break;
          case "חשבוניות ספקים סחורה":
            axios.get(`https://nartina.com/api/excel/export-all-wares-invoices-by-year/${user?.id}/${year}/${hebrew ? 2 : 1}` ,{
      responseType: 'blob',
    })
    .then(res => {
      fileDownload(res.data, filename + ".xlsx");
    });
    setExcel(false)
    setCategory("")
    setMonth("")
    setYear("")
          break;
  
    }
  }

  const getExcelAll = () => {
      let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
    switch(category) {
      case "דו''ח יומי":
        // if(year == "" || month == "") return
    // let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
    axios.get(`https://nartina.com/api/excel/export-daily-income-all/${user?.id}/${hebrew ? 2 : 1}` ,{
      responseType: 'blob',
    })
    .then(res => {
      fileDownload(res.data, filename + ".xlsx");
    });
    setExcel(false)
    setCategory("")
    setMonth("")
    setYear("")
          break;
        case "חשבוניות ספקים":
          axios.get(`https://nartina.com/api/excel/export-invoices-all/${user?.id}/${hebrew ? 2 : 1}` ,{
      responseType: 'blob',
    })
    .then(res => {
      fileDownload(res.data, filename + ".xlsx");
    });
    setExcel(false)
    setCategory("")
    setMonth("")
    setYear("")
          break;
        case "חשבוניות לקוחות":
          axios.get(`https://nartina.com/api/excel/export-customers-all/${user?.id}/${hebrew ? 2 : 1}` ,{
            responseType: 'blob',
          })
          .then(res => {
            fileDownload(res.data, filename + ".xlsx");
          });
          setExcel(false)
          setCategory("")
          setMonth("")
          setYear("")
          break;
        case "משכורות":
          axios.get(`https://nartina.com/api/excel/export-salaries-all/${user?.id}/${hebrew ? 2 : 1}` ,{
            responseType: 'blob',
          })
          .then(res => {
            fileDownload(res.data, filename + ".xlsx");
          });
          setExcel(false)
          setCategory("")
          setMonth("")
          setYear("")
          break;
          case "דו''ח מסעדות":
            axios.get(`https://nartina.com/api/excel/export-restaurant-reports-all/${user?.id}/${hebrew ? 2 : 1}` ,{
              responseType: 'blob',
            })
            .then(res => {
              fileDownload(res.data, filename + ".xlsx");
            });
            setExcel(false)
            setCategory("")
            setMonth("")
            setYear("")
          break;
        case "ניהול מלאי":
          axios.get(`https://nartina.com/api/excel/export-inventories-all/${user?.id}/${hebrew ? 2 : 1}` ,{
            responseType: 'blob',
          })
          .then(res => {
            fileDownload(res.data, filename + ".xlsx");
          });
          setExcel(false)
          setCategory("")
          setMonth("")
          setYear("")
          break;
        case "חשבוניות ספקים סחורה":
          axios.get(`https://nartina.com/api/excel/export-wares-invoices-all/${user?.id}/${hebrew ? 2 : 1}` ,{
            responseType: 'blob',
          })
          .then(res => {
            fileDownload(res.data, filename + ".xlsx");
          });
          setExcel(false)
          setCategory("")
          setMonth("")
          setYear("")
          break;
  
    }
  }

  const getExcel = (e) => {
    e.preventDefault();
    if(month == "" && year == "") {
      getExcelAll()
      return
    }
    if(month == "") {
      getExcelNoMonth()
      return
    }
    let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())

    switch(category) {
      case "דו''ח יומי":
        // if(year == "" || month == "") return
    // let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
    axios.get(`https://nartina.com/api/excel/export-daily-income-by-month/${user?.id}/${monthNumber}/${year}/${hebrew ? 2 : 1}` ,{
      responseType: 'blob',
    })
    .then(res => {
      fileDownload(res.data, filename + ".xlsx");
    });
    setExcel(false)
    setCategory("")
    setMonth("")
    setYear("")
          break;
        case "חשבוניות ספקים":
          axios.get(`https://nartina.com/api/excel/export-all-invoices-by-month/${user?.id}/${monthNumber}/${year}/${hebrew ? 2 : 1}` ,{
      responseType: 'blob',
    })
    .then(res => {
      fileDownload(res.data, filename + ".xlsx");
    });
    setExcel(false)
    setCategory("")
    setMonth("")
    setYear("")
          break;
        case "חשבוניות לקוחות":
          axios.get(`https://nartina.com/api/excel/export-all-customers-invoices-by-month/${user?.id}/${monthNumber}/${year}/${hebrew ? 2 : 1}` ,{
      responseType: 'blob',
    })
    .then(res => {
      fileDownload(res.data, filename + ".xlsx");
    });
    setExcel(false)
    setCategory("")
    setMonth("")
    setYear("")
          break;
        case "משכורות":
          axios.get(`https://nartina.com/api/excel/export-all-salaries-by-month/${user?.id}/${month}/${year}/${hebrew ? 2 : 1}` ,{
            responseType: 'blob',
          })
          .then(res => {
            fileDownload(res.data, filename + ".xlsx");
          });
          setExcel(false)
          setCategory("")
          setMonth("")
          setYear("")
          break;
          case "דו''ח מסעדות":
            axios.get(`https://nartina.com/api/excel/export-all-restaurant-reports-by-month/${user?.id}/${monthNumber}/${year}/${hebrew ? 2 : 1}` ,{
              responseType: 'blob',            
            })
            .then(res => {
              fileDownload(res.data, filename + ".xlsx");
            });
            setExcel(false)
            setCategory("")
            setMonth("")
            setYear("")
          break;
          case "ניהול מלאי":
            axios.get(`https://nartina.com/api/excel/export-all-inventories-by-month/${user?.id}/${month}/${year}/${hebrew ? 2 : 1}` ,{
            responseType: 'blob',
          })
          .then(res => {
            fileDownload(res.data, filename + ".xlsx");
          });
          setExcel(false)
          setCategory("")
          setMonth("")
          setYear("")
          break;
          case "חשבוניות ספקים סחורה":
            axios.get(`https://nartina.com/api/excel/export-all-wares-invoices-by-month/${user?.id}/${monthNumber}/${year}/${hebrew ? 2 : 1}` ,{
              responseType: 'blob',
    })
    .then(res => {
      fileDownload(res.data, filename + ".xlsx");
    });
    setExcel(false)
    setCategory("")
    setMonth("")
    setYear("")
          break;
  
    }
  }

  const handleChangeCategory = (e) => {
    switch(e.target.value) {
      case "דו''ח יומי":
       setCategory(e.target.value)
          break;
        case "חשבוניות ספקים":
          setCategory(e.target.value)
          break;
          case "חשבוניות ספקים סחורה":
          setCategory(e.target.value)
          break;
        case "חשבוניות לקוחות":
          setCategory(e.target.value)
          break;
        case "משכורות":
          setCategory(e.target.value)
          break;
          case "דו''ח מסעדות":
            setCategory(e.target.value)
          break;
          case "ניהול מלאי":
            setCategory(e.target.value)
          break;
  
    }
    
  }

 

  const handleChangeRestaurantReport = (e) => {
    setPaymentIncomeRestaurant(e.target.value)
    switch(e.target.value) {
      case "סיבוס":
        setPaymentMethodIncomeRestaurant("cibus");
          break;
        case "תן ביס":
          setPaymentMethodIncomeRestaurant("tenBis");
          break;
        case "וולט":
          setPaymentMethodIncomeRestaurant("wallt");
          break;
        case "מישלוחה":
          setPaymentMethodIncomeRestaurant("mishloha");
          break;
          case "גודי":
            setPaymentMethodIncomeRestaurant("goodi");
            break;
        case "אחר":
          setPaymentMethodIncomeRestaurant("other");
          break;
          case "2אחר":
          setPaymentMethodIncomeRestaurant("other2");
          break;
        case "כללי":
          setAllResturants(true);
        //   break;
          
    }
    
  }

  const getRestaurantReports = () => {
    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + monthNumber + "/" + year + "/" + "cibus")
    .then(res => {console.log(res.data)
    setCibus(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + monthNumber + "/" + year + "/" + "tenBis")
    .then(res => {console.log(res.data)
    setTenBis(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + monthNumber + "/" + year + "/" + "mishloha")
    .then(res => {console.log(res.data)
    setMishloha(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + monthNumber + "/" + year + "/" + "wallt")
    .then(res => {console.log(res.data)
    setWallt(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + monthNumber + "/" + year + "/" + "other")
    .then(res => {console.log(res.data)
    setOtherIncome(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + monthNumber + "/" + year + "/" + "other2")
    .then(res => {console.log(res.data)
    setOther2(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + monthNumber + "/" + year + "/" + "goodi")
    .then(res => {console.log(res.data)
    setGoodi(res.data)})
    .catch(err => console.log(err))

 
      
  }


  const getRestaurantReport = () => {
    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + currentMonth + "/" + new Date().getFullYear() + "/" + "cibus")
    .then(res => {console.log(res.data)
    setCibus(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + currentMonth + "/" + new Date().getFullYear() + "/" + "tenBis")
    .then(res => {console.log(res.data)
    setTenBis(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + currentMonth + "/" + new Date().getFullYear() + "/" + "mishloha")
    .then(res => {console.log(res.data)
    setMishloha(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + currentMonth + "/" + new Date().getFullYear() + "/" + "wallt")
    .then(res => {console.log(res.data)
    setWallt(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + currentMonth + "/" + new Date().getFullYear() + "/" + "goodi")
    .then(res => {console.log(res.data)
    setGoodi(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + currentMonth + "/" + new Date().getFullYear() + "/" + "other")
    .then(res => {console.log(res.data)
    setOtherIncome(res.data)})
    .catch(err => console.log(err))

    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + currentMonth + "/" + new Date().getFullYear() + "/" + "other2")
    .then(res => {console.log(res.data)
    setOther2(res.data)})
    .catch(err => console.log(err))
    
  }

  

  const getAmountForRestaurantReport = (e) => {
    e.preventDefault();
    if(allResturants) {
        getRestaurantReports(monthNumber, year)
        setClali(true)
      return;
    }
    // alert(monthNumber + " " + year + " " + paymentMethodIncome)
    setLoading(true)
    axios.get("https://nartina.com/api/user/get-restaurant-report/" + user?.id + "/" + monthNumber + "/" + year + "/" + paymentMethodIncomeRestaurant)
    .then(res => {setReportAmount(res.data)
    setLoading(false)})
    .catch(err => console.log(err))
  } 

 

  const closeRestaurantReport = () => {
    setOpenRestaurantReport(false)
    setMonth("")
    setPaymentMethodIncomeRestaurant("")
    setYear("")
    setReportAmount("")
    setPaymentIncomeRestaurant("")
    setWallt("")
    setCibus("")
    setMishloha("")
    setTenBis("")
    setOtherIncome("")
    
  }

  const closeRestaurantReports = () => {
    setClali(false)
    setAllResturants(false)
    setMonth("")
    setPaymentMethodIncomeRestaurant("")
    setYear("")
    setReportAmount("")
    setPaymentIncomeRestaurant("")
    
  }
  

const closeNivo = () => {
  setOpenNivo(false)
  setCibus("")
  setTenBis("")
  setMishloha("")
  setWallt("")
  setOther2("")
  setGoodi("")
  setOtherIncome("")
}


// const closeRestaurantForm = () => {
//   setOpenAddRestaurant(false)
//   setWallt("")
//   setCibus("")
//   setOther2("")
//   setGoodi("")
//   setMishloha("")
//   setTenBis("")
//   setOtherIncome("")
//   setDateRest("")
//   setErrorRes("")
// }


// const closeWorkerForm = () => {
//   setIsOpenx(false)
//   setIdNumber("")
//   setAddress("")
//   setSalaryPerHour("")
//   setDob("")
//   setFirstName("")
//   setLastName("")
//   setPhoneNumber("")
//   setStarttedAt("")
//   setErrorRes("")
// }



const closeExcel = () => {
    setExcel(false)
    setCategory("")
    setMonth("")
    setYear("")
}


const clearForm = () => {
  setNotes("")
  setTitle("")
  setStartDate("")
  setDeferralPaymentsList([])

}




const addDeferralList = (e) => {
  e.preventDefault()
  
  
  fetch(`https://nartina.com/api/user/add-deferral-list/${result?.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + result?.token,
    },
    body: JSON.stringify(deferralPaymentsList),
  })
    .then((response) => {response.json()
      // setPayAlert(true)
      Swal.fire("!הצלחה", '! תשלום הוכנס בהצלחה', "success");
      clearForm()
      setReload(true)
      setReports(false)})
    .then((data) => {
      console.log(data); // Success message from the backend
      // setPayAlert(true)
      setReports(false)
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

  

  const addPayment = (e) => {
    e.preventDefault();
    const d = new Date(startDate).getTime() + Math.random()*60000
    const newPayment = {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(d).toISOString(),
      title: title,
      notes: notes,
    };

    setDeferralPaymentsList([...deferralPaymentsList, newPayment]);

    // Clear form inputs after submission
    setStartDate("");
    setEndDate("");
    // setTitle("");
    // setNotes("");
  };

  const deleteItem = (index) => {
    const updatedList = deferralPaymentsList.filter((_, i) => i !== index);
    setDeferralPaymentsList(updatedList);
  };

 

  return (
    <div className={`shadow ${(location.pathname.startsWith('/workers-page') || location.pathname.startsWith('/workers-rosters') || result?.role == "ROLE_WORKER") && 'hidden'} ${globalTheme != 'light' && 'dark'} ${color == "light" ? 'bg-[#3F6AD8]' : color == "purple" ? 'bg-indigo-500' : color == "orange" ? 'bg-yellow-500' : color == "white" ? 'bg-white' : color == "red" ? 'bg-violet-500' : color == "blue" ? 'bg-blue-500' : color == "green" ? 'bg-green-600' : 'bg-indigo-500'} fixed top-0 ${hebrew ? 'right-0 left-0 airx:left-64' : 'left-0 right-0 airx:right-64'} z-50 `}>
    <div className={`flex justify-between h-14 mx-auto pl-4 pr-[1px] lg:pr-2 airx:pr-5 xl:px-8`}>
       
      
           
          {user?.role == "ROLE_WORKER" ? (
             <div className='flex items-center justify-center group space-x-1 w-24 mt-0 cursor-pointer' onClick={()=> navigate('/dashboard')}>
             {/* <img 
             src={logo}
            // src="https://upload.wikimedia.org/wikipedia/en/c/c5/Logo_of_Garena_Free_Fire.png"
            // width={180}
            // height={150}
            /> */}
            
             </div>
          ) : (
            <div className='flex items-center justify-center group space-x-1 w-44 relative top-[1px] mt-0 cursor-pointer' onClick={()=> navigate('/')}>
            <img 
            // src={logo}
            // src={logo}
           src={logo}
           // width={180}
           // height={150}
           />
           
            </div>
          )}
         
       
      <div className="flex items-center justify-center ">
        
     
          <div className='flex items-center justify-center space-x-4'>
         
         
         {location.pathname == '/' && (
            user?.email == 'mike@com' && (
              <div className='flex items-center justify-center w-fit h-fit bg-gray-400 rounded-full p-[6px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate('/admin-page')}>
                <ContactsIcon className='text-blue-700'/>
                </div>
            )
          )}


          </div>
          

          {location.pathname == '/receipts-month' && (
              <div>
                <div className={`flex items-center justify-center w-fit h-fit opacity-80 mr-4 rounded-full ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} px-3 py-[5px] cursor-pointer hover:bg-[#B1B7BB]`} onClick={()=> navigate(-1)}>
                <ArrowBackIcon className='text-white'/>
                </div>
                </div>
          )}

{location.pathname == '/month-daily-income' && (
              <div>
                <div className={`flex items-center justify-center w-fit h-fit opacity-80 mr-4 rounded-full ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} px-3 py-[5px] cursor-pointer hover:bg-[#B1B7BB]`} onClick={()=> navigate(-1)}>
                <ArrowBackIcon className='text-white'/>
                </div>
                </div>
          )}

{location.pathname == '/waybills-month' && (
              <div>
                <div className={`flex items-center justify-center w-fit h-fit opacity-80 mr-4 rounded-full ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} px-3 py-[5px] cursor-pointer hover:bg-[#B1B7BB]`} onClick={()=> navigate(-1)}>
                <ArrowBackIcon className='text-white'/>
                </div>
                </div>
          )}

{location.pathname == '/month-wares-invoices' && (
              <div>
                <div className={`flex items-center justify-center w-fit h-fit opacity-80 mr-4 rounded-full ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} px-3 py-[5px] cursor-pointer hover:bg-[#B1B7BB]`} onClick={()=> navigate(-1)}>
                <ArrowBackIcon className='text-white'/>
                </div>
                </div>
          )}

{location.pathname == '/month-invoices' && (
              <div>
                <div className={`flex items-center justify-center w-fit h-fit opacity-80 mr-4 rounded-full ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} px-3 py-[5px] cursor-pointer hover:bg-[#B1B7BB]`} onClick={()=> navigate(-1)}>
                <ArrowBackIcon className='text-white'/>
                </div>
                </div>
          )}

{location.pathname == '/clock-month' && (
              <div>
                <div className={`flex items-center justify-center w-fit h-fit opacity-80 mr-4 rounded-full ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} px-3 py-[5px] cursor-pointer hover:bg-[#B1B7BB]`} onClick={()=> navigate(-1)}>
                <ArrowBackIcon className='text-white'/>
                </div>
                </div>
          )}

{location.pathname == '/restaurant-month' && (
              <div>
                <div className={`flex items-center justify-center w-fit h-fit opacity-80 mr-4 rounded-full ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} px-3 py-[5px] cursor-pointer hover:bg-[#B1B7BB]`} onClick={()=> navigate(-1)}>
                <ArrowBackIcon className='text-white'/>
                </div>
                </div>
          )}

{location.pathname == '/reports' && (
              <div>
                <div className={`flex items-center justify-center w-fit h-fit opacity-80 mr-4 rounded-full ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} px-3 py-[5px] cursor-pointer hover:bg-[#B1B7BB]`} onClick={()=> setReports(true)}>
                <LanguageIcon className='text-white'/>
                </div>
                </div>
          )}
          

          {location.pathname == '/add-receipt' && (
            // !isSSR && (
              <div className='flex items-center justify-center w-fit h-fit space-x-1 bg-gray-400 opacity-80 rounded-full px-3 py-[5px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate('/receipts')}>
                <DescriptionIcon className='text-blue-700'/>
                  <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back" : "לחשבוניות"}</h1>
                  <h1 className='text-blue-700 font-semibold text-md font-mono'>{hebrew ? "to invoices" : "חזרה"}</h1>
                </div>
            // )
          )}

          {location.pathname.startsWith('/supplier-quotes') && (
            // !isSSR && (
              <div className='-mr-3 flex items-center justify-center w-fit h-fit space-x-1 bg-gray-400 opacity-80 rounded-full px-2 mmu:px-3 py-[5px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
                <ContactsIcon className='text-blue-700'/>
                  {/* <h1 className='hidden sm:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back" : "לכרטיס ספק"}</h1> */}
                  <h1 className='hidden mmu:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "Back" : "חזרה"}</h1>
                </div>
            // )
          )}

          {location.pathname == '/add-quote' && (
            // !isSSR && (
              <div className='flex items-center justify-center w-fit h-fit space-x-1 bg-gray-400 opacity-80 rounded-full px-3 py-[5px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
                <ReceiptIcon className='text-blue-700'/>
                  <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back" : "להצעות מחיר"}</h1>
                  <h1 className='text-blue-700 font-semibold text-md font-mono'>{hebrew ? "to quotes" : "חזרה"}</h1>
                </div>
            // )
          )}

          {location.pathname == '/chat2' && (
            // !isSSR && (
              <div className='flex items-center justify-center w-fit h-fit space-x-1 bg-gray-400 opacity-80 rounded-full px-3 py-[5px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
                <h1 className='text-blue-700 font-semibold text-md font-mono'>{hebrew ? "Back" : "חזרה"}</h1>
                </div>
            // )
          )}

          {location.pathname == '/chat3' && (
            // !isSSR && (
              <div className='flex items-center justify-center w-fit h-fit space-x-1 bg-gray-400 opacity-80 rounded-full px-3 py-[5px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
                <h1 className='text-blue-700 font-semibold text-md font-mono'>{hebrew ? "Back" : "חזרה"}</h1>
              </div>
            // )
          )}
          
          
           <div className="flex space-x-4 items-center">
               

              {location.pathname == "/restaurant" && (
              // <div className="flex items-center space-x-2" onClick={()=> setOpenRestaurantReport(true)}>
              <div className="flex items-center space-x-2">
                 <div className={`flex items-center justify-center ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} w-fit h-fit bg-gray-400 opacity-80 rounded-full p-[6px] cursor-pointer hover:bg-gray-300`} onClick={()=> setOpenRestaurantReport(true)}>
                    <AssessmentIcon className='text-white'/> 
                 </div>
                 <div className={`flex items-center justify-center ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} w-fit h-fit bg-gray-400 opacity-80 rounded-full p-[6px] cursor-pointer hover:bg-gray-300`} onClick={()=> {setOpenNivo(true)
              getRestaurantReport()
              }}>
                    <DonutSmallIcon className='text-white'/>
                </div>

                
              </div>
               )}


                {location.pathname.startsWith("/quotes/")  && (
              <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate('/quotes')}>
              <ReceiptIcon className='text-blue-700'/>
                <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "להצעות מחיר"}</h1>
                <h1 className='text-blue-700 font-semibold text-md font-mono'>{hebrew ? "quotes" : "חזרה"}</h1>
            </div>
               )}

            {location.pathname.startsWith("/supplier-emails/")  && (
              <div className='-mr-3 flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-2 mmu:px-3 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
              <ContactsIcon className='text-blue-700'/>
                {/* <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "לכרטיס ספק"}</h1> */}
                <h1 className='hidden mmu:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "Back" : "חזרה"}</h1>
            </div>
               )}

           {location.pathname.startsWith("/customer-emails/")  && (
              <div className='-mr-3 flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-2 mmp:px-3 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
              <ContactsIcon className='text-blue-700'/>
                <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "לכרטיס לקוח"}</h1>
                <h1 className='hidden sm:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "customer info" : "חזרה"}</h1>
            </div>
               )}

            {location.pathname.startsWith("/kabalot/")  && (
              <div className='-mr-3 flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-2 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
              <ContactsIcon className='text-blue-700'/>
                <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "לכרטיס לקוח"}</h1>
                <h1 className='hidden mmp:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "customer info" : "חזרה"}</h1>
            </div>
               )}

            {location.pathname.startsWith("/kabala/")  && (
              <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
              <ContactsIcon className='text-blue-700'/>
                <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "לקבלות לקוח"}</h1>
                <h1 className='text-blue-700 font-semibold text-md font-mono'>{hebrew ? "customer receipt" : "חזרה"}</h1>
            </div>
               )}

           {location.pathname.startsWith("/customer-reports/")  && (
              <div className='-mr-3 flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-2 mmp:px-3 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
              <ContactsIcon className='text-blue-700'/>
                <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "לכרטיס לקוח"}</h1>
                <h1 className='hidden mmp:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "customer info" : "חזרה"}</h1>
            </div>
               )}

            {location.pathname.startsWith("/supplier-reports/")  && (
              <div className='-mr-4 flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full relative right-1 px-2 mmu:px-3 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
              <ContactsIcon className='text-blue-700'/>
                {/* <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "לכרטיס ספק"}</h1> */}
                <h1 className='hidden mmp:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "supplier info" : "חזרה"}</h1>
            </div>
               )}

          {location.pathname.startsWith("/customer-quotes/")  && (
              <div className='-mr-3 flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-2 mmp:px-3 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
              <ContactsIcon className='text-blue-700'/>
                <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "לכרטיס לקוח"}</h1>
                <h1 className='hidden mmp:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "customer info" : "חזרה"}</h1>
            </div>
               )}

      
            {location.pathname.startsWith("/receipts/")  && (
              <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
              <DescriptionIcon className='text-blue-700' />
                <h1 className='hidden md:inline text-blue-700 font-semibold font-mono text-md'>{hebrew ? "back to" : "לחשבוניות"}</h1>
                <h1 className='text-blue-700 font-semibold font-mono text-md'>{hebrew ? "invoices" : "חזרה"}</h1>
            </div>
               )}


            {location.pathname.startsWith("/customers/")  && (
              <div className='-mr-3 flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-2 mmp:px-3 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate('/customers')}>
              <ContactsIcon className='text-blue-700' />
                <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "ללקוחות"}</h1>
                <h1 className='hidden mmp:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "customers" : "חזרה"}</h1>
            </div>
               )}

            {location.pathname.startsWith("/customer-card/")  && (
              <div className='-mr-3 flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-2 mmp:px-3 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate('/customers')}>
              <ContactsIcon className='text-blue-700' />
                <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "ללקוחות"}</h1>
                <h1 className='hidden mmp:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "customers" : "חזרה"}</h1>
            </div>
               )}

           {location.pathname.startsWith("/collectively-invoices")  && (
              <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-300' onClick={()=> navigate('/invoices')}>
              <DescriptionIcon className='text-blue-700' />
                <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>לחשבוניות</h1>
                <h1 className='text-blue-700 font-semibold text-md font-mono'>חזרה</h1>
            </div>
               )}

          {location.pathname.startsWith("/supplier-card/") && (
                <div className='-mr-3'>
              <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-2 mmp:px-3 md:px-4 py-[5px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate('/suppliers')}>
                <ContactsIcon className='text-blue-700'/>
                  <h1 className='hidden md:inline text-blue-800 font-semibold text-md font-mono'>{hebrew ? "back to" : "לספקים"}</h1>
                  <h1 className='hidden mmp:inline text-blue-800 font-semibold text-md font-mono'>{hebrew ? "suppliers" : "חזרה"}</h1>
                </div>
                </div>
               )}

              {location.pathname == "/quotes" && (
                <div className='mr-4'>
              <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-3 md:px-4 py-[5px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate('/customers')}>
                <ContactsIcon className='text-blue-700'/>
                  <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "ללקוחות"}</h1>
                  <h1 className='text-blue-700 font-semibold text-md font-mono'>{hebrew ? "customers" : "חזרה"}</h1>
                </div>
                </div>
               )}

             {location.pathname == "/workers" && (
                <div className='flex items-center space-x-4'>
                
              </div>
               )}
              

               {location.pathname.startsWith("/workers/") && (
                 <div className='-mr-3'>
                 <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-1 xr:px-4 py-[4px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
                 <ContactsIcon className='text-blue-700'/>
                     {/* <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'back' : 'לכרטיס עובד'}</h1> */}
                     <h1 className='hidden xr:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'Back' : 'חזרה'}</h1>
                   </div>
                   </div>
               )}

            {location.pathname.startsWith("/worker-card/") && (
                <div className='-mr-3'>
              <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-2 mmu:px-3 py-[4px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate('/workers')}>
              <ContactsIcon className='text-blue-700'/>
                  <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'back' : 'לעובדים'}</h1>
                  <h1 className='hidden mmu:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'to workers' : 'חזרה'}</h1>
                </div>
                </div>
               )}

             {location.pathname.startsWith("/suppliers/") && (
                <div className='-mr-3'>
              <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-2 mmu:px-3 py-[4px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
              <ContactsIcon className='text-blue-700'/>
                  {/* <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'back' : 'לספקים'}</h1> */}
                  <h1 className='hidden mmu:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'Back' : 'חזרה'}</h1>
                </div>
                </div>
               )}

             {location.pathname.startsWith("/workers-tasks/") && (
                <div className='-mr-3'>
                <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-1 xr:px-4 py-[4px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
                <ContactsIcon className='text-blue-700'/>
                    {/* <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'back' : 'לכרטיס עובד'}</h1> */}
                    <h1 className='hidden xr:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'Back' : 'חזרה'}</h1>
                  </div>
                  </div>
               )}

              {location.pathname.startsWith("/worker-roster/") && (
                <div className='-mr-3'>
              <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-1 xr:px-4 py-[4px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
              <ContactsIcon className='text-blue-700'/>
                  {/* <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'back' : 'לכרטיס עובד'}</h1> */}
                  <h1 className='hidden xr:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'Back' : 'חזרה'}</h1>
                </div>
                </div>
               )}

              {location.pathname.startsWith("/worker-clock/") && (
                 <div className='-mr-3'>
                 <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-1 xr:px-4 py-[4px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate(-1)}>
                 <ContactsIcon className='text-blue-700'/>
                     {/* <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'back' : 'לכרטיס עובד'}</h1> */}
                     <h1 className='hidden xr:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? 'Back' : 'חזרה'}</h1>
                   </div>
                   </div>
               )}


              {location.pathname == "/receipts" && (
                <div className=''>
              <div className='flex items-center justify-center space-x-2 w-fit h-fit bg-gray-400 opacity-80 rounded-full px-3 md:px-4 py-[5px] cursor-pointer hover:bg-gray-300' onClick={()=> navigate('/customers')}>
                <ContactsIcon className='text-blue-700'/>
                  <h1 className='hidden md:inline text-blue-700 font-semibold text-md font-mono'>{hebrew ? "back to" : "ללקוחות"}</h1>
                  <h1 className='text-blue-700 font-semibold text-md font-mono'>{hebrew ? "customers" : "חזרה"}</h1>
                </div>
                </div>
               )}

          <div className={`hidden sm:block relative right-10 airx:right-2`}>
            {user?.role == "ROLE_ADMIN" && (
              <SupervisedUserCircleIcon fontSize='large' className={`relative left-10 cursor-pointer ${color == "purple" ? 'text-indigo-400' : color == "orange" ? 'text-yellow-300' : color == "light" ? 'text-blue-500' : color == "red" ? 'text-violet-400' : color == "blue" ? 'text-blue-400' : color == "green" ? 'text-green-500' : 'text-indigo-400'}`} onClick={()=> navigate('/admin-page')}/>
            )}
            {user?.role == "ROLE_ADMIN" && (
              <CircleNotificationsIcon fontSize='large' className={`relative left-10 cursor-pointer ${color == "purple" ? 'text-indigo-400' : color == "orange" ? 'text-yellow-300' : color == "light" ? 'text-blue-500' : color == "red" ? 'text-violet-400' : color == "blue" ? 'text-blue-400' : color == "green" ? 'text-green-500' : 'text-indigo-400'}`} onClick={()=> navigate('/chat4')}/>
            )}
          </div>
          </div>
        
        <div className="flex items-center space-x-4 sm:space-x-3 lg:space-x-4 cursor-pointer relative left-4 airx:left-8">
       
            <div className={`${(location.pathname != '/' || hebrew || user?.role == "ROLE_ADMIN") ? 'hidden' : 'hidden xr:inline-block'} fixed top-2 -right-4 sm:-right-4 md:right-8 lg:right-16 ${user?.role == "ROLE_ADMIN" ? "airx:right-[280px]" : "airx:right-[228px]"} w-full max-w-sm px-4`}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md ${(location.pathname != '/' || hebrew) && 'hidden'} px-3 py-2 text-base font-medium text-[#ccc] hover:text-gray-400 hover:text-opacity-100 focus:outline-none ring-transparent focus:ring-0`}
            >
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  mr-2 h-5 w-5 text-white relative top-[2px] left-1.5 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
              <span className='font-mono text-white'>דו"חות</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className={`absolute z-10 mt-3 left-20 sm:left-1/4 lg:left-0 w-[600px] max-w-sm -translate-x-1/2 transform px-4 sm:px-4 md:max-w-3xl`}>
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 md:grid-cols-2">
                    {solutions.map((item) => (
                      <div
                        key={item.name}
                        // href={item.href}
                        onClick={()=> navigate(item?.href)}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4">
                    <a
                      href="##"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Documentation
                        </span>
                      </span>
                      <span className="block text-sm text-gray-500">
                        Start integrating products and tools
                      </span>
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
        
          <div className={`flex items-center justify-center space-x-4 relative ${hebrew ? 'airx:right-2' : 'airx:-right-1'} right-4`}>
          <div className={`relative right-2`}>
          {/* {user?.role == "ROLE_ADMIN" && (
              <SupervisedUserCircleIcon fontSize='large' className={`relative right-3 ${color == "purple" ? 'text-indigo-400' : color == "orange" ? 'text-yellow-300' : color == "light" ? 'text-blue-500' : color == "red" ? 'text-violet-400' : color == "blue" ? 'text-blue-400' : color == "green" ? 'text-green-500' : 'text-indigo-400'}`} onClick={()=> navigate('/admin-page')}/>
            )}
            {user?.role == "ROLE_ADMIN" && (
              <CircleNotificationsIcon fontSize='large' className={`relative right-2 ${color == "purple" ? 'text-indigo-400' : color == "orange" ? 'text-yellow-300' : color == "light" ? 'text-blue-500' : color == "red" ? 'text-violet-400' : color == "blue" ? 'text-blue-400' : color == "green" ? 'text-green-500' : 'text-indigo-400'}`} onClick={()=> navigate('/chat4')}/>
            )} */}
            <SwitchTheme2 />
          </div>
         
          <Dropdown
          button={
        <button type="button" class={`${location.pathname != "/" ? 'hidden' : 'inline-flex'} relative right-2 items-center pl-1 pr-2 py-1.5 text-sm font-medium text-center text-white ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:focus:ring-blue-800`} onClick={()=> setOpenW(!openW)}>
          <span class="sr-only">Notifications</span>
  <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" ></path></svg>

  <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white animate-pulse bg-blue-500 border-2 border-white rounded-full -top-2 -right-2 ">8</div>
</button>
          }
          children={
            <div className="flex h-max w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-[0_20px_25px_-5px] shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="mt-3 ml-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Hey, {user?.firstName}
                  </p>{" "}
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
     
              <div className="mt-3 ml-4 flex flex-col">
                <a
                  href=" "
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Profile Settings
                </a>
                <a
                  href=" "
                  className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Newsletter Settings
                </a>
                <a
                  href=" "
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                >
                  Log Out
                </a>
              </div>
            </div>
          }
          classNames={"py-2 top-4 -left-[180px] w-max"}
        />
        
      
          {user?.id &&
            <div onClick={()=> navigate('/tasks')}>
           
           
                <button type="button" class={`relative right-2 inline-flex items-center pl-1 pr-2 py-1.5 text-sm font-medium text-center text-white ${color == "purple" ? 'bg-indigo-400' : color == "orange" ? 'bg-yellow-300' : color == "light" ? 'bg-blue-500' : color == "red" ? 'bg-violet-400' : color == "blue" ? 'bg-blue-400' : color == "green" ? 'bg-green-500' : 'bg-indigo-400'} rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 `}>
                <span class="sr-only">Notifications</span>
                {/* משימות */}
                <AssignmentIcon fontSize='small' className='text-white relative ml-1'/>
               
                <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full animate-pulse -top-2 -right-2">{urgentTasks?.data}</div>
              </button>
 
          </div>
          
          }
           <span class="relative inline-block right-3 md:right-2" onClick={()=> setVisible2(!visible)}>
        <div className={`relative ${globalTheme != 'light' && 'dark'}`}>
	<svg class="w-6 h-6 text-purple-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
	  <path d="M447.1 .0041h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.99c0 9.75 11.25 15.45 19.12 9.7l124.9-93.69h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 .0041 447.1 .0041zM320 112c17.75 0 31.1 14.25 31.1 32s-14.25 31.1-32 31.1S288 161.8 288 144S302.3 112 320 112zM192 112c17.75 0 31.1 14.25 31.1 32S209.8 175.1 192 175.1S160 161.8 160 144S174.3 112 192 112zM362.3 271.3c-26.5 31-65.14 48.74-106.3 48.74c-41.12 0-79.72-17.74-106.2-48.74c-8.5-10-7.5-25.12 2.625-33.75c9.998-8.5 25.25-7.375 33.87 2.75C203.5 260.4 228.9 272 256 272c27.12 0 52.49-11.62 69.74-31.75c8.623-10.12 23.75-11.38 33.74-2.75C369.6 246.1 370.8 261.3 362.3 271.3z"/>
	</svg>
  {/* notafication dropdown */}
  </div>
	<span class="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-purple-600 animate-pulse border-2 border-white rounded-full">99</span>
  </span>
  <div
    onMouseLeave={()=> setVisible2(false)}
    class={`${!visible2 && 'hidden'} absolute w-80 top-8 -right-6 mmu:right-8 h-[520px] overflow-y-auto scrollbar-none z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700`}
          >
            <div
              class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-800/50 dark:text-gray-300"
            >
              Notifications
            </div>
            <div>
              <a
                href="#"
                class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                <div class="flex-shrink-0">
                  <img
                    class="w-11 h-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                    alt="Bonnie Green avatar"
                  />
                  <div
                    class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-blue-700 dark:border-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                      ></path>
                      <path
                        d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="pl-3 w-full">
                  <div
                    class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  >
                    New message from
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >Bonnie Green
                    </span>: "Hey, what's up? All set for the presentation?"
                  </div>
                  <div
                    class="text-xs font-medium text-blue-600 dark:text-blue-500"
                  >
                    a few moments ago
                  </div>
                </div>
              </a>
              <a
                href="#"
                class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                <div class="flex-shrink-0">
                  <img
                    class="w-11 h-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    alt="Jese Leos avatar"
                  />
                  <div
                    class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="pl-3 w-full">
                  <div
                    class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  >
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >Jese leos
                    </span>
                    and
                    <span class="font-medium text-gray-900 dark:text-white"
                      >5 others
                    </span>
                    started following you.
                  </div>
                  <div
                    class="text-xs font-medium text-blue-600 dark:text-blue-500"
                  >
                    10 minutes ago
                  </div>
                </div>
              </a>
              <a
                href="#"
                class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                <div class="flex-shrink-0">
                  <img
                    class="w-11 h-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                    alt="Joseph McFall avatar"
                  />
                  <div
                    class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="pl-3 w-full">
                  <div
                    class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  >
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >Joseph Mcfall
                    </span>
                    and
                    <span class="font-medium text-gray-900 dark:text-white"
                      >141 others
                    </span>
                    love your story. See it and view more stories.
                  </div>
                  <div
                    class="text-xs font-medium text-blue-600 dark:text-blue-500"
                  >
                    44 minutes ago
                  </div>
                </div>
              </a>
              <a
                href="#"
                class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                <div class="flex-shrink-0">
                  <img
                    class="w-11 h-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                    alt="Roberta Casas image"
                  />
                  <div
                    class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="pl-3 w-full">
                  <div
                    class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  >
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >Leslie Livingston
                    </span>
                    mentioned you in a comment:
                    <span
                      class="font-medium text-blue-600 dark:text-blue-500"
                      >@bonnie.green
                    </span>
                    what do you say?
                  </div>
                  <div
                    class="text-xs font-medium text-blue-600 dark:text-blue-500"
                  >
                    1 hour ago
                  </div>
                </div>
              </a>
              <a
                href="#"
                class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex-shrink-0">
                  <img
                    class="w-11 h-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png"
                    alt="Robert image"
                  />
                  <div
                    class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="pl-3 w-full">
                  <div
                    class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  >
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >Robert Brown
                    </span>
                    posted a new video: Glassmorphism - learn how to implement
                    the new design trend.
                  </div>
                  <div
                    class="text-xs font-medium text-blue-600 dark:text-blue-500"
                  >
                    3 hours ago
                  </div>
                </div>
              </a>
            </div>
            <a
              href="#"
              class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
            >
              <div class="inline-flex items-center">
                <svg
                  aria-hidden="true"
                  class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                View all
              </div>
            </a>
          </div>       

  <div className={`relative ${globalTheme != 'light' && 'dark'}`}>
          <div className='hidden md:inline-block' onClick={()=> setVisible(!visible)}>
            <SettingsIcon style={{fontSize: '22px'}} className={`${color != "orange" ? 'text-[#B1B7BB]' : 'text-gray-400'} hover:rotate-45 duration-300 hover:text-gray-400 relative right-[2px] ${location.pathname != '/' && 'hidden'}`} />
          </div>
          <div
            class={`${!visible && 'hidden'} ${!hebrew && 'text-right'} absolute top-7 right-0 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-200 shadow dark:bg-gray-700 dark:divide-gray-600`}
            ref={ref}
            onMouseLeave={()=> setVisible(false)}
          >
            <div class="py-3 px-4">
              <span
                class="block text-sm font-semibold text-gray-800 dark:text-white"
                >{user?.companyName}
              </span>
              <span
                class="block text-sm text-gray-500 truncate dark:text-gray-100"
                >{user?.email}
              </span>
            </div>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <div
                  onClick={()=> navigate('/settings')}
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >{hebrew ? 'My profile' : 'הפרופיל שלי'}
                </div>
              </li>
              <li>
                <div
                  onClick={()=> navigate('/settings')}
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >{hebrew ? 'Account settings' : 'הגדרות חשבון'}
                </div>
              </li>
            </ul>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                {hebrew ? (
                  <div
                  onClick={()=> {setHebrew(!hebrew)}}
                  class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <LanguageIcon fontSize='small' className='text-gray-400 mr-2'/>
                  ENG / HE
                  </div>
                ) : (
                  <div
                  onClick={()=> {setHebrew(!hebrew)}}
                  class={`flex items-center ${!hebrew && 'justify-end'} py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                  >
                  ENG / HE
                  <LanguageIcon fontSize='small' className='text-gray-400 ml-2'/>
                  </div>
                )}
              </li>
              <li>
                {hebrew ? (
                  <div
                  onClick={()=> {setExcel(true)}}
                  class="flex items-center space-x-2 py-2 px-5 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <SiMicrosoftexcel size={19} className='text-gray-400 relative right-1.5 group-hover:scale-110 transition-all duration-300 ease-out cursor-pointer' />
                    <h1 className='text-md relative right-[2.5px]'>Excel</h1>
                  </div>
                ) : (
                  <div
                  onClick={()=> {setExcel(true)}}
                  class={`flex items-center ${!hebrew && 'justify-end'} space-x-2 py-2 px-5 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                  >
                    <h1 className='text-md'>אקסל</h1>
                    <SiMicrosoftexcel size={19} className='text-gray-400 group-hover:scale-110 transition-all duration-300 ease-out cursor-pointer' />
                  </div>
                )}
              </li>
              <li>
               {hebrew ? (
                 <div
                 onClick={()=> {setTopBox(!topBox)}}
                 class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                 ><svg
                   class="mr-2 w-5 h-5 text-gray-400"
                   fill="currentColor"
                   viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                   ></path>
                 </svg>
                 מצב נתונים
                 </div>
               ) : (
                <div
                onClick={()=> {setTopBox(!topBox)}}
                class={`flex items-center ${!hebrew && 'justify-end'} py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                >
                מצב נתונים
                <svg
                  class="ml-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                  ></path>
                </svg>
                </div>
               )}
              </li>
              <li className='relative' onMouseOver={()=> setArrow(true)} onMouseOut={()=> setArrow(false)}>
                <a
                  href="#"
                  class="flex justify-between items-center py-2 px-4 text-sm group hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {hebrew ? (
                    <>
                    <span class="flex items-center">
                    <svg
                      aria-hidden="true"
                      class="mr-2 w-5 h-5 text-blue-600 dark:text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Pro version
                  </span>
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                    </>
                  ) : (
                    <>
                    
                    <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-400 -rotate-180 group-hover:rotate-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  
                  <span class="flex items-center justify-end ">
                  Pro version
                  <svg
                      aria-hidden="true"
                      class="ml-2 w-5 h-5 text-blue-600 dark:text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    </span>
                  
                    </>
                  )}
                </a>
                {arrow && (
                <div className='mt-8 w-fit h-fit absolute left-0 -top-[9px] rounded-full shadow-xl blue-glassmorphism px-2 py-1 z-50'>
                <div className='flex flex-col space-y-2 mt-1 mb-[11px]'>
                <div className='flex items-center justify-center space-x-2'>
                <div className='flex items-center justify-end mt-2 p-2 rounded-full bg-blue-500 hover:scale-105 ease-out transition-all duration-125 hover:bg-blue-500' onClick={()=> {setVisible(false) 
                   setArrow(false)
                   setColor("blue")}}>  
                </div>
                <div className='flex items-center justify-end mt-2 p-2 rounded-full bg-red-400 hover:scale-105 ease-out transition-all duration-125 hover:bg-red-500' onClick={()=> {setVisible(false)
                  setArrow(false)
                  setColor("red")}}>
                </div>
                <div className='flex items-center justify-end mt-2 p-2 rounded-full bg-purple-400 hover:scale-105 ease-out transition-all duration-125 hover:bg-purple-500' onClick={()=> {setVisible(false)
                  setArrow(false)
                  setColor("purple")}}>
                </div>
                </div>
                <div className='flex items-center justify-center space-x-2'>
                <div className='flex items-center justify-end mt-2 p-2 rounded-full bg-green-400 hover:scale-105 ease-out transition-all duration-125 hover:bg-green-500' onClick={()=> {setVisible(false) 
                   setArrow(false)
                   setColor("green")}}>  
                </div>
                <div className='flex items-center justify-end mt-2 p-2 rounded-full bg-orange-400 hover:scale-105 ease-out transition-all duration-125 hover:bg-orange-500' onClick={()=> {setVisible(false)
                  setArrow(false)
                  setColor("orange")}}>
                </div>
                <div className='flex items-center justify-end mt-2 p-2 rounded-full bg-[#3F6AD8] hover:scale-105 ease-out transition-all duration-125 hover:bg-sky-500' onClick={()=> {setVisible(false)
                  setArrow(false)
                  setColor("light")}}>
                </div>
                </div>
                
                </div>
                </div>
              )}
              </li>

            </ul>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              
              <li onClick={()=> {localStorage.removeItem("user")}}>
                <a
                  href="/login"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >{hebrew ? 'Sign out' : 'יציאה'}
                </a>
              </li>
            </ul>
          </div>
          </div>
          
            
          </div>

          <div className='hidden md:flex relative left-2'>
             
          </div>
          <div className='inline-block airx:hidden'>
          {toogleMenu ? (
            <CloseIcon className='cursor-pointer z-50 relative right-6 md:right-8 text-gray-400' fontSize='large' onClick={()=> setToogleMenu(false)}/>
          ) : (
            <MenuIcon className='cursor-pointer z-50 relative right-6 md:right-8 text-gray-400' fontSize='large' onClick={()=> setToogleMenu(true)}/>
          )}
          
          </div>
        </div>
        
      </div>
    </div>
   


    <Dialog open={openRestaurantReport}>
      <div className='w-full px-8 py-2 flex flex-col justify-center items-center'>
          {!clali ? (
            <>
            <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer self-end' fontSize='large' onClick={closeRestaurantReport}/>
        <h1 className={`text-center ${hebrew ? "font-serif text-slate-600" : "font-mono text-amber-700"} text-3xl`}>{hebrew ? "select payment method month and a year" : "בחר אמצעי מסעדה חודש ושנה"}</h1>
        <DialogContent>
        <form onSubmit={getAmountForRestaurantReport} className='flex space-x-4'>
                <div className='flex flex-col space-y-1'>
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"} w-64`} >{hebrew ? "payment method" : "אמצעי תשלום"}</InputLabel>
                    <Select 
                    value={paymentIncomeRestaurant}
                    onChange={handleChangeRestaurantReport}
                    className='bg-white text-right rounded-md px-2'>
            {arr4?.map(a => (
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
                    
                  <button type='submit' disabled={paymentIncomeRestaurant == "" || month == "" || year == ""} className='bg-blue-200 relative top-2 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg mt-2'>{hebrew ? "check amount" : "בדוק סכום"}</button>
                  <div className='flex items-center justify-center space-x-1 relative top-2'>
                    {reportAmount && (
                     <>
                      {loading ? <CircularProgress color="primary" size={30}/> :
                        <>
                        
                          <h1 className='text-center text-blue-700'>₪</h1>
                          <h1 className='text-center text-blue-700 text-xl font-mono'>{Number(reportAmount).toLocaleString()}</h1>
                        
                        </>
                      }
                     </>
                    )}
                    
                  </div>
                </div>
              </form>
        </DialogContent>
            </>
          ) : (
            <>
            {/* <div className='flex items-end justify-end px-8'> */}
              <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer relative left-28 mmu:left-44' fontSize='large' onClick={closeRestaurantReports}/>
            {/* </div> */}
            <div className='w-full flex flex-col items-center justify-center overflow-x-hidden'>  
            {/* <div className='flex items-end justify-end px-8'> */}
            {/* <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeRestaurantReports}/> */}
            {/* </div>      */}
        <h1 className='text-center font-mono text-amber-700 text-3xl'>דו"ח מסעדות</h1>
            <div className='flex items-center justify-center space-x-2'>
                <h1 className='font-mono text-lg text-[#333333]'>{year}</h1>
                <h1 className='font-mono text-lg text-[#333333]'>{month}</h1> 
            </div>
          <div className='h-[300px] w-[300px] mmu:w-96 mmu:h-96'>
        <NivoPie cibus={cibus} tenBis={tenBis} wallt={wallt} mishloha={mishloha} other={otherIncome} other2={other2} goodi={goodi}/>
        </div>
        <div className='flex items-center justify-center space-x-1 relative bottom-14'>
          <h1 className='text-gray-600 font-mono font-semibold'>ש"ח</h1>
          <h1 className='font-mono text-2xl text-gray-700 font-semibold'>{Number(cibus + tenBis + wallt + mishloha + otherIncome + other2 + goodi).toLocaleString()}</h1>
        </div>
        </div>
            </>
          )}
      </div>
      
    </Dialog>


    <Dialog open={openNivo} >
        {/* <div className='flex items-center justify-end py-1 px-8 relative top-3 left-1'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeNivo}/>
        </div>      */}
      <div className='w-full items-center justify-center overflow-x-hidden'>
         <div className='w-full flex items-center justify-between'>
          <div className='w-8 h-8'></div>
        <div className='relative top-5'>
        <h1 className={`text-center font-mono text-amber-700 text-3xl`}>{hebrew ? 'restaurants report' : 'דו"ח מסעדות'}</h1>
          {hebrew ? (
            <>
            <div className='flex items-center justify-center space-x-2'>
              <h1 className='font-mono text-xl text-[#333333]'>{getMonthInEnglish(new Date().getMonth() + 1)}</h1> 
              <h1 className='font-mono text-xl text-[#333333]'>{new Date().getFullYear()}</h1>
            </div>
            </>
          ) : (
            <>
            <div className='flex items-center justify-center space-x-2'>
                <h1 className='font-mono text-lg text-[#333333]'>{new Date().getFullYear()}</h1>
                <h1 className='font-mono text-lg text-[#333333]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
            </div>
            </>
          )}
        </div>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer relative right-4' fontSize='large' onClick={closeNivo}/>
        </div>
        <div className='h-80 w-80 mmu:w-96 mmu:h-96'>
          <NivoPie cibus={cibus} tenBis={tenBis} wallt={wallt} mishloha={mishloha} other={otherIncome} other2={other2} goodi={goodi}/>
        </div>
        <div className='flex items-center justify-center space-x-1 relative bottom-14'>
          <h1 className='text-gray-600 font-mono font-semibold'>ש"ח</h1>
          <h1 className='font-mono text-2xl text-gray-700 font-semibold'>{Number(cibus + tenBis + wallt + mishloha + otherIncome + other2 + goodi).toLocaleString()}</h1>
        </div>
      </div>
    </Dialog>

    

    <Snackbar open={meeting} autoHideDuration={10000} onClose={handleCloseMeeting} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleCloseMeeting}
          severity="info"
          sx={{ width: "100%" }}
        >
          יש לך {numsOfSchedulers?.data} פגישות
        </Alert>
      </Snackbar>


      <Dialog open={excel}>
      <div className='w-full py-6 px-14 flex flex-col justify-center items-center'>
      {/* <div className='flex items-center justify-end p-2'> */}
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer self-end' fontSize='large' onClick={closeExcel}/>
      {/* </div> */}
        <h1 className='text-center font-mono text-amber-700 text-3xl'>בחר קטגוריה חודש ושנה</h1><br></br>
        <h1 className='text-center font-mono text-amber-600 text-lg'>ניתן לבחור רק שנה ללא חודש</h1>
        <h1 className='text-center font-mono text-amber-600 text-lg'>ניתן לבחור רק  קטגוריה ללא חודש או שנה</h1>
        <DialogContent>
        <form onSubmit={getExcel} className='flex space-x-4'>
                <div className='flex flex-col space-y-1'>
                  <InputLabel id="demo-simple-select-label" className='text-right w-64'>קטגוריה</InputLabel>
                    <Select 
                    value={category}
                    onChange={handleChangeCategory}
                    className='bg-white rounded-md px-2 text-right'>
            {categories?.map(c => (
                <MenuItem value={c}>{c}</MenuItem>
            ))}
                    </Select>
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
                  <button type='submit' disabled={(year == "" && month != "") || category == ""} className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg mt-2 relative top-4'>הורד דו"ח אקסל</button>

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
                </div>
              </form>
        </DialogContent>
      </div>
      
    </Dialog>

   

    <Snackbar open={errorMode} autoHideDuration={20000} onClose={handleClose9} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose9}
          severity="error"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
             יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
        </Alert>
      </Snackbar>


    <Dialog open={reports}>
    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto" dir='rtl'>
        {/* <!-- Modal content --> */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center w-full pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    הכנס תשלום קבוע
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mr-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> setReports(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={addDeferralList}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">עבור</label>
                        <input type="text" value={notes} name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="עבור מי החיוב" required="" onChange={(e)=> setNotes(e.target.value)}/>
                    </div>
                    <div>
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">סכום</label>
                        <input type="text" value={title} name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="סכום חיוב" required="" onChange={(e)=> setTitle(e.target.value)}/>
                    </div>
                    <div className='sm:col-span-2'>
                        <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">תאריך חיוב</label>
                        <input type="date" name="date" value={startDate} id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="תאריך" required="" onChange={(e)=> setStartDate(e.target.value)}/>
                    </div>
                    
                    <div>
        
        {deferralPaymentsList.length > 0 && <table className="border p-3 w-[430px]">
              <thead className="bg-gray-300 text-sm text-center">
                <th>תאריך</th>
                <th>עבור</th>
                <th>סכום</th>
                <th>מחק</th>
              </thead>
                <tbody>
                {deferralPaymentsList.map((payment, index) => (
                 <tr key={index} className='bg-white border-b hover:bg-gray-100 text-center'>
                  <td className="text-sm">{payment.startDate.substring(0, 10)}</td>
                  <td className="text-sm">{payment.notes}</td>
                  <td className="text-sm">{payment.title}</td>
                        <td class="p-2">
                                <div class="flex justify-center" onClick={()=> deleteItem(index)}>
                                    <button>
                                        <svg class="w-6 h-6 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 p-1"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                        </td>
                 </tr>
                ))}
          
                </tbody>
               </table>}
      </div>
                </div>
                <div className='flex items-center justify-between px-[1px] w-full'>
                <button type="button" className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={()=> setReports(false)}>
                    {/* <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> */}
                בטל פעולה
                </button>
                <button disabled={startDate == "" || notes == "" || title == ""} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addPayment}>
                    {/* <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> */}
                    הכנס תאריך לחיוב
                </button>
                <button disabled={deferralPaymentsList.length == 0} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {/* <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> */}
                     שלח 
                </button>
                
                </div>
            </form>
        </div>
    </div>
    </Dialog>


  </div>

  

  )
}

export default Header