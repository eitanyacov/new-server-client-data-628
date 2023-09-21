import React, { useState, useEffect, useContext } from 'react';
// import TextareaAutosize from '@mui/base/TextareaAutosize';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
// import { Snackbar, Alert } from "@mui/material";
import { Dialog, DialogContent, TextField, Snackbar, Alert,  Select, MenuItem, DialogTitle, Typography, InputLabel } from '@mui/material'
// import { Select, MenuItem } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import { styled } from '@mui/material/styles';
import { PaginationItem } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
// import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import MailIcon from '@mui/icons-material/Mail';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeContext } from "../App";
import axios from 'axios';
import rtlPlugin from 'stylis-plugin-rtl';
// import { CacheProvider } from '@emotion/react';
// import ContactsIcon from '@mui/icons-material/Contacts';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { createTheme } from '@mui/material/styles';
import { useQuery } from 'react-query'
import AssessmentIcon from '@mui/icons-material/Assessment';
import Swal from 'sweetalert2'




// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});



  function Suppliers() {
  const [isSSRE, setIsSSRE] = useState(true);
  const [isSSR, setIsSSR] = useState(true);
  const [ide, setIde] = useState();
  const [supplier, setSupplier] = useState({})
  const [errors, setErrors] = useState()
  
  const [active, setActive] = useState();
  const [type, setType] = useState("");
  const [prefix, setPrefix] = useState("050");
  const [prefix2, setPrefix2] = useState("03");
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState("")
  const [agentPhone, setAgentPhone] = useState("");
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [open, setIsOpen] = useState(false)
  const [openMail, setOpenMail] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [emailSupplier, setEmailSupplier] = useState("")
  const [error, setError] = useState("")

  const [errorMode, setErrorMode] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [xxx, setXxx] = useState(false)
  const [openAddSupplier, setOpenAddSupplier] = useState(false)
  const [errorRes, setErrorRes] = useState([]);
  const [openSuppliersReport, setOpenSuppliersReport] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [supplierNameForReport, setSupplierNameForReport] = useState("");
  const [reportAmount, setReportAmount] = useState();
  const [monthNumber, setMonthNumber] = useState(0);
  const [loading, setLoading] = useState(false)
  const [action, setAction] = useState(false)
  const [suppliers, setSuppliers] = useState([]);


//paging
const [page, setPage] = useState(0);



  const { hebrew, globalTheme } = useContext(ThemeContext)

  
  const navigate = useNavigate()

  
  const arr = ["משתנה", "קבוע", "סחורה"];
  const phones = ["050", "052", "053", "054", "055", "056", "057", "058", "059", "072", "073"];
  const phones2 = ["02", "03", "04", "08", "09"];
  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
  const currentYear = new Date().getFullYear()
  const lastYear = new Date().getFullYear() -1
  const lastTwoYear = new Date().getFullYear() -2

  const years = [currentYear, lastYear, lastTwoYear]  

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };



  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 300)
    
  }, [isSSR]);



  const getSupps = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/all-suppliers-paging/${id}/${page}/10/name`)
    
  }
  
  const {data, refetch} = useQuery('supps', ()=> getSupps(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: false,
      refetchOnWindowFocus:false
 
    })


    useEffect(()=> {
      setTimeout(()=> {
        localStorage.setItem('supplier', false)
      }, 2000)
    })

    useEffect(() => {
      setTimeout(()=> {
        setXxx(true)
      }, 1000)
    })

    

  useEffect(() => {
    resizeWindow();
    console.log(window.innerHeight)
    console.log(window.innerWidth)
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);  
  }, [windowHeight, window.innerHeight]);



  useEffect(() => {
    setTimeout(() => {
      setIsSSRE(false);
    }, 1200)
    
  }, [isSSRE]);

  useEffect(() => {
    if(errors == 403) {
      setErrorMode(true)
    }
    
  }, [errorMode, errors]);

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
      text: "!לא ניתן יהיה לשחזר את הספק",
      icon: 'אזהרה',
      showCancelButton: true,
      confirmButtonText: '!כן מחק',
      cancelButtonText: '!לא למחוק',
      reverseButtons: true
    }).then((results) => {
      if (results.isConfirmed) {
        axios.delete("https://nartina.com/api/user/delete-supplier-no-invoices/" + id, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        })
        .then(res => {
        console.log(res.data)
          refetch()
          swalWithBootstrapButtons.fire(
            '!נמחק',
            'ספק נמחק בהצלחה.',
            'success'
          )
          localStorage.setItem('income', true)}).
        catch(err => {console.log(err.response.data)
          swalWithBootstrapButtons.fire(
            'פעולה נכשלה',
           err.response.data,
            'error'
          )
          setError(err.response.status)})
      } else if (
        /* Read more about handling dismissals below */
        results.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'בוטל',
          'פעולה בוטלה ספק לא נמחק :)',
          'error'
        )
      }
    })
  }



const handleClose2 = () => {
  setErrorMode(false)
  setError("")
}



  const addEmailToDb = () => {
    axios.post("https://nartina.com/email/add-email-supplier/" + ide, {
      subject: emailSubject,
      body: emailBody
    }).then(res => {console.log(res.data)
      setOpenMail(false)
      setEmailBody("")
      setEmailSubject("")
      setEmailSupplier("")
      setIde("")
    })
    .catch(err => {console.log(err.response.data)
      setIde("")})
  }

  const closeEmailForm = () => {
    setEmailBody("")
    setEmailSubject("")
    setEmailSupplier("")
    setOpenMail(false)
  }

  const sendMail = (e) => {
    e.preventDefault();
    axios.get("https://nartina.com/api/user/email-test/" + emailSupplier + "/" + result?.email + "/" + emailBody + "/" + emailSubject,)
    .then(res => {console.log(res.data)
      Swal.fire("!נשלח", '! אימייל נשלח בהצלחה', "success")
      // setMailAlert(true)
      closeEmailForm()
      addEmailToDb()})
    .catch(err => {console.log(err.response.data)
      Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error")})
    
  }

  

  const getSuppliers = () => {
    axios.get(`https://nartina.com/api/user/get-suppliers-by-user/${result?.id}`)
    .then(res => setSuppliers(res.data))
    .catch(err => console.log(err))
  }

  const getSupplier = async (id) => {
    const res = await fetch(`https://nartina.com/api/user/supplier-by-id/${id}`);
    const result = await res.json();
    setSupplier(result)
    setIsOpen(true)
}

const resetFields = () => {
  setName("")
  setAddress("")
  setDescription("")
  setEmail("")
  setAddress("")
  setType("")
  setAgentPhone("")
  setPhoneNumber("")
  setError("")
  setPrefix("050")
  setPrefix2("03")
}

const postData2 = (e) => {
  setLoading(true)
  e.preventDefault();
    if(type == "" || name == "") {
      setLoading(false)
      setErrorRes("חסרים שדות חובה")
      return
    }
    if(type == "בחר סוג ספק") {
      setLoading(false)
      setErrorRes("יש לבחור סוג ספק")
      return
    }
    
    axios.post("https://nartina.com/api/user/add-supplier/" + result?.id, {
      name,
      email,
      address,
      type,
      agentPhone: agentPhone != "" ? prefix + agentPhone : agentPhone,
      phoneNumber: phoneNumber != "" ? prefix2 + phoneNumber : phoneNumber,
      description,
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {
      // setReload(true)
      refetch()
      setLoading(false)
      setErrorRes([])
      // localStorage.setItem('supplier', true)
      Swal.fire("!הצלחה", '! ספק הוכנס בהצלחה', "success");
       setOpenAddSupplier(false)
       resetFields()
   
       })
    .catch(error => {setError(error.response.data.agentPhone)
      Swal.fire("מצטערים", ' קרתה תקלה, ספק לא עודכן' + " " + error.response.data , "error")
      setOpenAddSupplier(false)
      setLoading(false)
      resetFields()
     
      console.log(error.response.data.agentPhone)
    setErrors(error.response.status)})
    
 
}

  
  
 
  const printValues = (e)=> {
    e.preventDefault()
    axios.post("https://nartina.com/api/user/update-supplier/" + ide, {
      name: name != "" ? name : supplier.name,
      email: email != "" ? email : supplier.email,
      phoneNumber: phoneNumber != "" ? phoneNumber : supplier.phoneNumber,
      agentPhone: agentPhone != "" ? agentPhone : supplier.agentPhone,
      address: address != "" ? address : supplier.address,
      type: type != "" ? type : supplier.type,
      description: description != "" ? description : supplier.description,
      active: active != null ? active : supplier.active
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {
        refetch()
        setIsOpen(false) 
        resetFields()
        Swal.fire("!הצלחה", '! ספק עודכן בהצלחה', "success");
        // setIsOpenAlertAdd(true)
        console.log(res.data)
        })
    .catch(err => {console.log(err.code)
      resetFields()
      Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error");
      setError(err.response.status)})
  }



  const editSupplier = (id) => {
    setIde(id)
    getSupplier(id)
  }

  const changeActive = (id) => {
    axios.get('https://nartina.com/api/user/update-supplier-active/' + id)
    .then(refetch)
    .catch(err => console.log(err))
  
  }
    
  

  const sendWhatsApp2 = (phone) => {
    if(!phone) {
      Swal.fire("מצטערים", ' קרתה תקלה, לא ניתן לשלוח ווטסאפ לעובד, מכיוון שלא מוגדר מספר טלפון לעובד' , "error")
      return
    }
      window.location.href = "https://wa.me/972" + phone
    
  }

 
  const sendEmailToSupplier2 = (email, id) => {
    if(email) {
      setIde(id)
      setEmailSupplier(email)
      setOpenMail(true)
      return
    }
    Swal.fire("מצטערים", ' קרתה תקלה, לא ניתן לשלוח אימייל לספק, מכיוון שלא מוגדרת כתובת אימייל', "error" )
    
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
  
 

  const closeSuppliersReport = () => {
    setOpenSuppliersReport(false)
    setMonth("")
    setSupplierNameForReport("")
    setYear("")
    setReportAmount("")
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

  const handleYears = (e) => {
    setYear(e.target.value)
    }

    const handleChangeSupplierReport = (e) => {
      setSupplierNameForReport(e.target.value)
    }

    const getAmount = (e) => {
      e.preventDefault();
      setLoading(true)
      axios.get("https://nartina.com/api/user/supplier-outcome-by-month3/" + result?.id + "/" + monthNumber + "/" + year + "/" + supplierNameForReport)
      .then(res => {setReportAmount(res.data)
      setLoading(false)})
      .catch(err => console.log(err))
      
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

    const closeAddSupplier = () => {
      setOpenAddSupplier(false)
      setEmail("")
      setType("")
      setDescription("")
      setPhoneNumber("")
      setAgentPhone("")
      setAddress("")
      setName("")
      setErrorRes("")
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
                    <button type="button" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
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
                            <th scope="col" class="px-1 py-3 text-center">Supllier Name</th>
                            <th scope="col" class="px-1 py-3 text-center">Type</th>
                            <th scope="col" class="px-1 py-3 text-center">Description</th>
                            <th scope="col" class="px-1 py-3 text-center">Phone</th>
                            {/* <th scope="col" class="px-1 py-3 text-center">Email</th> */}
                            <th scope="col" class="px-1 py-3 text-center">Active</th>
                            <th scope="col" class="px-1 py-3 text-center">Mail</th>
                            <th scope="col" class="px-1 py-3 text-center">Message</th>
                            <th scope="col" class="px-1 py-3 text-center">Edit</th>
                            <th scope="col" class="px-1 py-3 text-center">Delete</th>
                            <th scope="col" class="px-1 py-3 text-center">Card</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        
                            {data?.data.content.map((supplier, index) => (
                                    <tr class="border-b dark:border-gray-700">
                                      <th class="px-4 py-3 whitespace-nowrap text-center dark:text-[#ccc]">{supplier?.name}</th>
                                      <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
                                      <div className={`${supplier.type == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 dark:text-gray-900 tracking-wide" : supplier?.type == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : supplier?.type == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
                                        {supplier.type}
                                      </div>
                                      </td>
                                      <td class="px-4 py-3 text-center">{supplier?.description.substring(0, 15)}</td>
                                      <td class="px-4 py-3 text-center">{supplier?.phoneNumber}</td>
                                      {/* <td class="px-4 py-3 text-center">{supplier?.email.substring(0, 5) + '...'}</td> */}
                                      <td scope="col" className="px-1 text-center py-1 text-xs whitespace-nowrap">
            {supplier.active ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActive(supplier.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActive(supplier.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-violet-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendEmailToSupplier2(supplier?.email, supplier?.id)}>
               <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-violet-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-green-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendWhatsApp2(supplier?.agentPhone)}>
               <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600 dark:text-green-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editSupplier(supplier?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(supplier?.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="inline-flex bg-gray-300 dark:bg-slate-600 hover:bg-gray-200 py-2 px-3 rounded-lg cursor-pointer" onClick={()=> navigate(`/supplier-card/${supplier?.id}`)}>
                <h1 className='text-blue-600 dark:text-blue-500 hover:text-blue-700 font-semibold tracking-wide text-[10px]'>CARD</h1>
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
    ) : (
      <>
      <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> setOpenAddSupplier(true)}>
                       הכנס ספק חדש
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
                            getSuppliers()}}>
                             <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                             <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
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
              <th scope="col" className="px-3 py-3 text-center">כרטיס ספק</th>
              <th scope="col" className="px-3 py-3 text-center">מחק</th>
              <th scope="col" className="px-3 py-3 text-center">ערוך</th>
              <th scope="col" className="px-3 py-3 text-center">שלח</th>
              <th scope="col" className="px-3 py-3 text-center">מייל</th>
              <th scope="col" className="px-3 py-3 text-center">פעיל</th>
              {/* <th scope="col" className="px-3 py-3 text-center">אימייל</th> */}
              <th scope="col" className="px-3 py-3 text-center">טלפון</th>
              <th scope="col" className="px-3 py-3 text-center">תיאור</th>
              <th scope="col" className="px-3 py-3 text-center">סוג</th>
              <th scope="col" className="px-3 py-3 text-center">שם ספק</th>
            </tr>
                      
                    </thead>
                    <tbody>
                    {data?.data.content.map((supplier, index) => (
           <tr key={supplier.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
           <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex bg-blue-600 dark:bg-slate-600 w-fit hover:bg-blue-700 py-2 px-3 rounded-lg cursor-pointer" onClick={()=> navigate(`/supplier-card/${supplier?.id}`)}>
                <h1 className='text-white dark:text-blue-500 font-bold tracking-wide'>כרטיס ספק</h1>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(supplier?.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editSupplier(supplier?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-green-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendWhatsApp2(supplier?.agentPhone)}>
               <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600 dark:text-green-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-violet-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendEmailToSupplier2(supplier?.email, supplier?.id)}>
               <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-violet-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-1 text-xs">
            {supplier.active ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActive(supplier.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActive(supplier.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              {/* <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">{supplier.email}</td> */}
              <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">{supplier.phoneNumber}</td>
              <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">{supplier.description.substring(0 , 15)}</td>
              <td scope="col" className="text-center py-2 whitespace-nowrap">
              <div className={`${supplier.type == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 dark:text-gray-900 tracking-wider" : supplier?.type == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : supplier?.type == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] text-xs font-semibold rounded-md`}>
                  {supplier.type}
                </div>
              </td>
              <th scope="col" className="px-1 text-center py-2 whitespace-nowrap dark:text-[#ccc]">{supplier.name}</th>
              </tr>
            ))}
                    
                       
                    </tbody>
                </table>
            </div>
            <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {data?.data.content.map(supplier => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-1`}>
                <div className="p-4 blue-glassmorphism hover:bg-gray-900 shadow rounded flex flex-col space-y-1">
                <div className='flex items-center justify-end space-x-2 text-sm'>
                <div className={`${supplier.type == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 dark:text-gray-900 tracking-wider" : supplier?.type == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : supplier?.type == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-2 text-xs font-semibold rounded-md`}>
                  {supplier.type}
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{supplier.name}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>שם ספק</div>
                </div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right dark:text-[#ccc]'>{supplier.description.substring(0 , 35)}</div>
                {/* <div className='text-right text-[#333] dark:text-[#ccc]'>תיאור</div> */}
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{supplier.phoneNumber}</div>
                <div className='text-right text-[#333] font-semibold dark:text-[#ccc]'>טלפון ראשי</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{supplier.agentPhone}</div>
                <div className='text-right text-[#333] font-semibold dark:text-[#ccc]'>טלפון סוכן</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right dark:text-[#ccc]'>{supplier.email}</div>
                <div className='text-right text-[#333] font-semibold dark:text-[#ccc]'>אימייל ספק</div>
                </div>
                <div className='flex items-center justify-end space-x-1'>
                <div scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
      {supplier.active ? <>
  <Android12Switch
    checked={true}
    onChange={()=> changeActive(supplier.id)}
    color='success'
    // size='small'
    // inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  </>
  : 
  <>
  <Android12Switch
    checked={false}
    onChange={()=> changeActive(supplier.id)}
    // size='small'
    // inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  </>}
  </div>
                <div className='text-right dark:text-[#ccc]'>?פעיל</div>
                </div>
                <div className='flex items-center justify-end space-x-4 relative top-1'>
                <div className="flex justify-center items-center bg-gray-300 dark:bg-slate-600 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/supplier-card/${supplier?.id}`)}>
                <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'>כרטיס ספק</h1>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(supplier?.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editSupplier(supplier?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendWhatsApp2(supplier?.agentPhone)}>
               <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600 dark:text-green-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendEmailToSupplier2(supplier?.email, supplier?.id)}>
               <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-violet-500'/>
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
          // size={windowWidth > 650 ? 'medium' : 'small'}
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
</section>
       
          
     

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

    

<Dialog open={openMail}>
    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 max-w-full md:w-[550px]" dir='rtl'>
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center w-full pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-[#333] dark:text-white tracking-wide">
                     שליחת אימייל לספק
                </h3>
                <button type="button" onClick={closeEmailForm} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mr-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={sendMail}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">אימייל ספק</label>
                        <input type="email" name="name" id="name" value={emailSupplier} class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
                    </div>
                    <div>
                        <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">נשלח מאימייל</label>
                        <input type="email" name="brand" id="brand" value={result?.email} class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required=""/>
                    </div>
                    <div className='col-span-2'>
                        <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">נושא הודעה</label>
                        <input type="text" name="subject" id="subject" value={emailSubject} onChange={(e)=> setEmailSubject(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="נושא ההודעה" required=""/>
                    </div>
                        <div class="col-span-2">
                          <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">הודעה</label>
                          <textarea onChange={e => setEmailBody(e.target.value)}
                            value={emailBody} id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="רשום כאן את תוכן ההודעה"></textarea>                    
                        </div> 
                </div>
                       <div className='flex flex-col -space-y-0.5 relative bottom-2 right-1 mb-2'>
                         <h1 className='col-span-2 text-sm text-gray-500'>האימייל ישלח משרת ההודעות של נרטינה פתרונות תוכנה</h1>
                         <h1 className='col-span-2 text-sm text-gray-500'>אך הספק יראה שהאימייל נשלח מ-{result?.email}</h1>
                        </div>
                <div className='flex items-center justify-between w-full'>
                <button type="button" onClick={closeEmailForm} class="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                <DeleteForeverIcon fontSize='small' className='text-white relative left-1'/>
                    בטל
                </button>
                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {/* <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> */}
                    <EmailIcon fontSize='small' className='text-white relative left-2'/>
                    שלח אימייל
                </button>
                </div>
            </form>
        </div>
    </Dialog>



<Dialog open={openAddSupplier} fullScreen={fullScreen}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeAddSupplier}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                    הכנס ספק חדש
                </h3>
                </div>
            </div>
            {/* {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}</Alert>
          <CloseIcon className='text-red-500 cursor-pointer hover:scale-125 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/>
        </div>} */}
        {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500 hover:scale-105 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/>
          </Alert>
        </div>}

        {errors == 403 && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">יש לעשות יציאה ולהרשם שוב מטעמי בטיחות  
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500 ' onClick={()=> setErrorRes("")}/>

</Alert>
        </div>}

        {error != "" && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{error}
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setError("")}/>
          </Alert>
        </div>}
        
            {/* <!-- Modal body --> */}
            <form onSubmit={postData2}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                    
                      <label for='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">אימייל ספק</label>
                      {/* <input type="email" name="email" value={email} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="אימייל ספק" required="" onChange={(e)=> setEmail(e.target.value)}/> */}
                      <div class="relative">
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
  </div>
  <input type="email" id="email" value={email} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@supplier.com" onChange={(e)=> setEmail(e.target.value)}/>
</div>
                    </div>
                    <div>
                      <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:placeholder:text-[#ccc] dark:text-white text-right ">שם ספק</label>
                      </div>
                        <input type="text" name="name" value={name} class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שם ספק" required={true} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                  
                  <div className='relative bottom-1'>
                      {/* <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">פלאפון איש קשר</label>
                      <input type="text" name="agentPhone" value={agentPhone} placeholder="טלפון סוכן" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAgentPhone(e.target.value)}/> */}
                       <label for="price" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white text-right">טלפון ראשי</label>
  <div class="relative mt-2 rounded-md shadow-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      {/* <span class="text-gray-500 sm:text-sm">$</span> */}
    </div>
    <input value={phoneNumber} type="text" name="price" id="price" class="block w-full border border-gray-300 h-[42px] bg-gray-50 rounded-lg py-1.5 pl-20 pr-20 text-gray-900 placeholder:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder:text-right sm:text-sm sm:leading-6" placeholder="" onChange={(e)=> setPhoneNumber(e.target.value)}/>
    <div class="absolute inset-y-0 left-0 flex items-center">
      <label for="currency" class="sr-only">קידומת</label>
      <select onChange={(e) => setPrefix2(e.target.value)} id="currency" name="currency" class="h-full rounded-md border-0 bg-transparent py-0 pr-2 pl-3 text-gray-500 dark:text-[#ccc] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
        <option>03</option>
        {phones2.map(r => (
            <option className='text-right' value={r}>{r}</option>
          ))}
      </select>
    </div>
  </div>
                  </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">סוג ספק</label>
                      </div>     
                      <select name='type' onChange={(e) => setType(e.target.value)} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">בחר סוג ספק</option>
                              {arr.map(r => (
                              <option className='text-right' value={r}>{r}</option>
                              ))}
                          </select>
                    </div>
                    <div className='relative bottom-1'>
                      {/* <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">פלאפון איש קשר</label>
                      <input type="text" name="agentPhone" value={agentPhone} placeholder="טלפון סוכן" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAgentPhone(e.target.value)}/> */}
                       <label for="price" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white text-right">פלאפון איש קשר</label>
  <div class="relative mt-2 rounded-md shadow-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      {/* <span class="text-gray-500 sm:text-sm">$</span> */}
    </div>
    <input value={agentPhone} type="text" name="price" id="price" class="block w-full h-[42px] bg-gray-50 rounded-lg border border-gray-300 py-1.5 pl-20 pr-20 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:placeholder:text-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm sm:leading-6" placeholder="" onChange={(e)=> setAgentPhone(e.target.value)}/>
    <div class="absolute inset-y-0 left-0 flex items-center">
      <label for="currency" class="sr-only">קידומת</label>
      <select onChange={(e) => setPrefix(e.target.value)} id="currency" name="currency" class="h-full rounded-md border-0 bg-transparent py-0 pr-2 pl-3 dark:text-[#ccc] text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
        <option>050</option>
        {phones.map(r => (
            <option className='text-right' value={r}>{r}</option>
          ))}
      </select>
    </div>
  </div>
                  </div>
                  <div>
              
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">כתובת ספק</label>
                        <input type="text" name="address" value={address} placeholder="כתובת ספק" class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAddress(e.target.value)}/>

                      </div>              
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תיאור קצר</label>
                        <textarea value={description} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="הוסף תיאור קצר לגבי הספק" onChange={(e)=> setDescription(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeAddSupplier}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  הכנס ספק חדש  
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

  <Dialog open={open} fullScreen={fullScreen}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> setIsOpen(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                     עדכן פרטי ספק
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
                    
                      <label for='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">אימייל ספק</label>
                      <input type="email" name="email" defaultValue={supplier?.email} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="אימייל ספק" required="" onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div>
                      <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>לא ניתן לעדכן שם ספק</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">שם ספק</label>
                      </div>
                        <input type="text" name="name" value={supplier?.name} class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שם ספק" required="" onChange={(e)=> setName(e.target.value)}/>
                    </div>
                  <div>
                    
                      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">טלפון ראשי</label>
                      <input type="text" name="phoneNumber" defaultValue={supplier?.phoneNumber} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="טלפון ראשי" required="" onChange={(e)=> setPhoneNumber(e.target.value)}/>
                  </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">סוג ספק</label>
                      </div>     
                      <select name='type' defaultValue={supplier?.type} onChange={(e) => setType(e.target.value)} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">{supplier?.type}</option>
                              {arr.map(r => (
                              <option className='text-right' value={r}>{r}</option>
                              ))}
                          </select>
                    </div>
                    <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">פלאפון איש קשר</label>
                      <input type="text" name="agentPhone" defaultValue={supplier?.agentPhone} placeholder="טלפון סוכן" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAgentPhone(e.target.value)}/>
                  </div>
                  <div>
              
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">כתובת ספק</label>
                        <input type="text" name="address" defaultValue={supplier?.address} placeholder="כתובת ספק" class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAddress(e.target.value)}/>

                      </div>              
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תיאור קצר</label>
                        <textarea defaultValue={supplier?.description} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="הוסף תיאור קצר לגבי הספק" onChange={(e)=> setDescription(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=> setIsOpen(false)}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  עדכן פרטי ספק   
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
  );
}

export default Suppliers;

