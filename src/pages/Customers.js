import React, { useState, useEffect, useContext } from 'react';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom'
import { Snackbar, Alert } from "@mui/material";
import { Dialog } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import MailIcon from '@mui/icons-material/Mail';
import LinearProgress from '@mui/material/LinearProgress';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { ThemeContext } from "../App";
import axios from 'axios';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import EmailIcon from '@mui/icons-material/Email';
import { prefixer } from 'stylis';
import { createTheme } from '@mui/material/styles';
import { PaginationItem } from '@mui/material';
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'


// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});



  function Customers() {

  const [isSSRE, setIsSSRE] = useState(true);
  const [ide, setIde] = useState();
  const [isSSR, setIsSSR] = useState(true);

  const [customer, setCustomer] = useState({})
  const [active, setActive] = useState();
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [contactNumber, setContactNumber] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  
  const [open, setOpen] = useState(false)
 
  const [openMail, setOpenMail] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [windowWidth, setWindowWidth] = useState(0);

  const [emailCustomer, setEmailCustomer] = useState("")
  // const [debt, setDebt] = useState();
  const [isDebt, setIsDebt] = useState(false)
  const [error, setError] = useState("")
  const [errorMode, setErrorMode] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0);
  const [openAddCustomer, setOpenAddCustomer] = useState(false)
  const [errorRes, setErrorRes] = useState([]);
  const [error1, setError1] = useState("");
  const [errors, setErrors] = useState()
  const [action, setAction] = useState(false)
  const [page, setPage] = useState(0);
  const [newForm, setNewForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [prefix, setPrefix] = useState("050");
  const [prefix2, setPrefix2] = useState("03");



  const res = localStorage.getItem("user")
  const result = JSON.parse(res)

  const { hebrew, globalTheme } = useContext(ThemeContext)




  const navigate = useNavigate()

  const phones = ["050", "052", "053", "054", "055", "056", "057", "058", "059", "072", "073"];
  const phones2 = ["02", "03", "04", "08", "09"];
  

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    console.log(window.innerHeight)
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);  
  }, [windowHeight, window.innerHeight, windowWidth, window.innerWidth]);

  

  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 300)
    
  }, [isSSR]);



  const getCust = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/all-customers-paging/${id}/${page}/100/name`)
  }
  
  const {data, refetch} = useQuery('customers', ()=> getCust(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: true,
      refetchOnWindowFocus:false
 
    }) 

    const getDebt = () => {
      const id = result?.id
      return axios.get("https://nartina.com/api/user/customers-debt/" + id)
    }
    
    const {data: debt} = useQuery('customers-debt', ()=> getDebt(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: false,
        refetchOnWindowFocus:false
   
      }) 



  useEffect(() => {
    if(error == 403) {
      setErrorMode(true)
    }
    
  }, [errorMode, error]);


  useEffect(()=> {
    if(debt?.data > 0) {
      setIsDebt(true)
    }
  }, [debt?.data])

  useEffect(() => {
    setTimeout(() => {
      setIsSSRE(false);
    }, 800)
    
  }, [isSSRE]);

 

  const handleClose2 = () => {
    setErrorMode(false)
    setError("")
  }

  const closeEmailForm = () => {
    setEmailBody("")
    setEmailSubject("")
    setEmailCustomer("")
    setOpenMail(false)
  }

  const addEmailToDb = () => {
    axios.post("https://nartina.com/email/add-email-customer/" + ide, {
      subject: emailSubject,
      body: emailBody
    }).then(res => {console.log(res.data)
      setOpenMail(false)
      setEmailBody("")
      setEmailSubject("")
      setEmailCustomer("")
      setIde("")
    })
    .catch(err => console.log(err.response.data))
  }

  const sendMail = (e) => {
    e.preventDefault();
    axios.get("https://nartina.com/api/user/email-test/" + emailCustomer + "/" + result?.email + "/" + emailBody + "/" + emailSubject,)
    .then(res => {console.log(res.data)
      // setMailAlert(true)
      Swal.fire("!נשלח", '! אימייל נשלח בהצלחה', "success");
      closeEmailForm()
      addEmailToDb()})
    .catch(err => {console.log(err.response.data)
      Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error")})
  
  }

  

  const getCustomer = async (id) => {
    const res = await fetch(`https://nartina.com/api/user/customer-by-id/${id}`);
    const result = await res.json();
    setCustomer(result)
    setOpen(true)
}

  
  

  const handleCloseDebt = () => {
    setIsDebt(false)
  }


  const sendWhatsApp2 = (phone) => {
    if(!phone) {
      Swal.fire("מצטערים", ' קרתה תקלה, לא ניתן לשלוח ווטסאפ לעובד, מכיוון שלא מוגדר מספר טלפון לעובד' , "error")
      return
    }
      window.location.href = "https://wa.me/972" + phone
    
  }

  const editCustomer = (id) => {
    setIde(id)
    getCustomer(id)
  }


  const sendEmailToCustomer2 = (email, id) => {
    if(email) {
      setIde(id)
      setEmailCustomer(email)
      setOpenMail(true)
      return
    }
    Swal.fire("מצטערים", ' קרתה תקלה, לא ניתן לשלוח אימייל, מכיוון שלא מוגדרת ללקוח כתובת אימייל', "error" )
    
  }
  

 
  const printValues = (e)=> {
    e.preventDefault()
    axios.post("https://nartina.com/api/user/update-customer/" + ide, {
      name: name != "" ? name : customer.name,
      email: email != "" ? email : customer.email,
      phoneNumber: phoneNumber != "" ? phoneNumber : customer.phoneNumber,
      address: address != "" ? address : customer.address,
      contactNumber: contactNumber != "" ? contactNumber : customer.contactNumber,
      description: description != "" ? description : customer.description,
      active: active != null ? active : customer.active
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {console.log(res.data) 
        setOpen(false) 
        refetch()
        Swal.fire("!עודכן", '! לקוח עודכן בהצלחה', "success");
      // setOpenAlert(true)
    })
    .catch(err => {console.log(err)
      Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error");
      setError(err.response.status)})
    
  }

  const changeActive = (id) => {
    axios.get('https://nartina.com/api/user/update-customer-active/' + id)
    .then(refetch)
    .catch(err => console.log(err))
  
  }
  
  const resetFields = () => {
    setName("")
    setAddress("")
    setDescription("")
    setEmail("")
    setContactNumber("")
    setPhoneNumber("")
    setError("")
    setPrefix("050")
    setPrefix2("03")
  }

  const postData3 = (e) => {
    setLoading(true)
    e.preventDefault();
      if(name == "") {
        setError1("שם לקוח שדה חובה")
        setLoading(false)
        return
      }
      axios.post("https://nartina.com/api/user/add-customer/" + result?.id, {
        name,
        email,
        address,
        contactNumber: contactNumber != "" ? prefix + contactNumber : contactNumber,
        shortDescription,
        phoneNumber: phoneNumber != "" ? prefix2 + phoneNumber : phoneNumber,
        description
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {
        localStorage.setItem('customer', true)
        setOpenAddCustomer(false)
        Swal.fire("!הצלחה", '! לקוח הוכנס בהצלחה', "success");
        refetch()
        setNewForm(false)
        resetFields()
        // setOpenCustomerAlert(true)
        setLoading(false)
         })
      .catch(error => {setError(error.response.name)
        setLoading(false)
        resetFields()
        Swal.fire("מצטערים", ' קרתה תקלה, דו"ח לא עודכן' + " " + error.response.data, "error")
        setNewForm(false)
        setErrors(error.response.status)})
        .finally(setLoading(false))
     
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
      text: "!לא ניתן יהיה לשחזר את הלקוח",
      icon: 'אזהרה',
      showCancelButton: true,
      confirmButtonText: '!כן מחק',
      cancelButtonText: '!לא למחוק',
      reverseButtons: true
    }).then((results) => {
      if (results.isConfirmed) {
        axios.delete("https://nartina.com/api/user/delete-customer-no-invoices/" + id, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        })
        .then(res => {
        console.log(res.data)
          refetch()
          swalWithBootstrapButtons.fire(
            '!נמחק',
            'לקוח נמחק בהצלחה.',
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

  const closeCustomerForm = () => {
      setOpenAddCustomer(false)
      setNewForm(false)
      setDescription("")
      setEmail("")
      setPhoneNumber("")
      setShortDescription("")
      setContactNumber("")
      setName("")
      setAddress("")
      setErrorRes("")
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
      {isSSRE ? (
       <div className='w-full mt-16'>
          <LinearProgress />
       </div>
      ) : (
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
              <th scope="col" className="px-0 py-3 text-center">customer name</th>
              <th scope="col" className="px-0 py-3 text-center">Bn number</th>
              {/* <th scope="col" className="px-0 py-3 text-center">address</th> */}
              <th scope="col" className="px-0 py-3 text-center">phone</th>
              {/* <th scope="col" className="px-0 py-3 text-center">email</th> */}
              <th scope="col" className="px-0 py-3 text-center">active</th>
              <th scope="col" className="px-0 py-3 text-center">mail</th>
              <th scope="col" className="px-0 py-3 text-center">message</th>
              <th scope="col" className="px-0 py-3 text-center">edit</th>
              <th scope="col" className="px-0 py-3 text-center">delete</th>
              <th scope="col" className="px-0 py-3 text-center">card</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data.content.map((customer, index) => (
                <tr key={customer.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{customer.name}</td>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{customer.description}</td>
                {/* <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{customer.address.substring(0, 15)}</td> */}
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{customer.phoneNumber}</td>
                {/* <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{customer.email}</td> */}
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              {customer.active ? <>
          <Android12Switch
            checked={true}
            onChange={()=> changeActive(customer.id)}
            color='success'
            // size='small'
            // inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </>
          : 
          <>
          <Android12Switch
            checked={false}
            onChange={()=> changeActive(customer.id)}
            // size='small'
            // inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </>}
              </td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-violet-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendEmailToCustomer2(customer?.email, customer?.id)}>
               <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-violet-500'/>
              </div>
            </td>
            <td scope="col" className="px-0 text-center py-2 text-xs whitespace-nowrap">
                <div className="inline-flex text-xs leading-5 bg-green-300 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendWhatsApp2(customer?.contactNumber)}>
                 <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600'/>
                </div>
              </td>
                <td scope="col" className="px-0 text-center py-2 text-xs whitespace-nowrap">
                <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editCustomer(customer?.id)}>
                 <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
                </div>
              </td>
                <td scope="col" className="px-0 text-center py-2 text-xs whitespace-nowrap">
               <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(customer?.id)}>
                 <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
                </div>
              </td>
                
                <td scope="col" className="px-2 text-center py-2 text-xs">
                <div className="inline-flex bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 py-2 px-3 rounded-lg cursor-pointer" onClick={()=> navigate(`/customer-card/${customer?.id}`)}>
                 <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'>CARD</h1>
                </div>
              </td>
                </tr>
              ))}
                       
                    </tbody>
                </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
           <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
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
                   {/* <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> setOpenAddCustomer(true)}> */}
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> setNewForm(true)}>
                       הכנס לקוח חדש
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
              <th scope="col" className="px-3 py-3 text-center">כרטיס</th>
              <th scope="col" className="px-3 py-3 text-center">מחק</th>
              <th scope="col" className="px-3 py-3 text-center">ערוך</th>
              <th scope="col" className="px-3 py-3 text-center">שלח</th>
              <th scope="col" className="px-3 py-3 text-center">מייל</th>
              <th scope="col" className="px-3 py-3 text-center">פעיל</th>
              {/* <th scope="col" className="px-3 py-3 text-center">אימייל</th> */}
              <th scope="col" className="px-3 py-3 text-center">טלפון</th>
              <th scope="col" className="px-3 py-3 text-center">כתובת</th>
              <th scope="col" className="px-3 py-3 text-center">מס' חברה</th>
              <th scope="col" className="px-3 py-3 text-center">שם לקוח</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {data?.data.content.map((customer, index) => (
                <tr key={customer.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
                <td scope="col" className="px-1 text-center py-2 text-xs">
                <div className="inline-flex bg-blue-600 hover:bg-blue-700 dark:bg-slate-600 py-2 px-3 rounded-lg cursor-pointer" onClick={()=> navigate(`/customer-card/${customer?.id}`)}>
                 <h1 className='text-white dark:text-blue-500 font-semibold'>כרטיס לקוח</h1>
                </div>
              </td>
              
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
               <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(customer?.id)}>
                 <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
                </div>
              </td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
                <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editCustomer(customer?.id)}>
                 <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
                </div>
              </td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
                <div className="inline-flex text-xs leading-5 bg-green-300 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendWhatsApp2(customer?.contactNumber)}>
                 <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600'/>
                </div>
              </td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-violet-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendEmailToCustomer2(customer?.email, customer?.id)}>
               <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-violet-500'/>
              </div>
            </td>
              <td scope="col" className="px-1 text-center py-1 text-xs">
            {customer.active ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActive(customer.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActive(customer.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
                {/* <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{customer.email}</td> */}
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{customer.phoneNumber}</td>
                <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{customer.address.substring(0, 15)}</td>
                <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{customer.description}</td>
                <th scope="col" className="px-1 text-center py-2 whitespace-nowrap dark:text-[#ccc]">{customer.name}</th>
                </tr>
              ))}
                            
                
                    </tbody>
                </table>
            </div>
            <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {data?.data.content.map(customer => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-2`}>
                <div className="p-4 blue-glassmorphism hover:bg-gray-900 shadow rounded flex flex-col space-y-1">

                <div className='flex items-center justify-end space-x-2 text-sm'>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{customer.name}</div>
                <div className='text-right text-[#333] text-lg dark:text-[#ccc]'>שם לקוח</div>
                </div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{customer.phoneNumber}</div>
                <div className='text-right dark:text-[#ccc]'>מס' טלפון ראשי</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{customer.contactNumber}</div>
                <div className='text-right dark:text-[#ccc]'> טלפון איש קשר</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{customer.description}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>מס' חברה</div>
                </div>
                <div className='text-right dark:text-[#ccc] font-mono'>{customer.email}</div>
                <div className='flex items-center justify-end space-x-1'>
                <div scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
      {customer.active ? <>
  <Android12Switch
    checked={true}
    onChange={()=> changeActive(customer.id)}
    color='success'
    // size='small'
    // inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  </>
  : 
  <>
  <Android12Switch
    checked={false}
    onChange={()=> changeActive(customer.id)}
    // size='small'
    // inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  </>}
  </div>
                <div className='text-right dark:text-[#ccc]'>?פעיל</div>
                </div>
                <div className='flex items-center justify-end space-x-4 relative top-1'>
                <div className="flex justify-center items-center bg-gray-300 dark:bg-slate-600 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/customer-card/${customer?.id}`)}>
                <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'>כרטיס לקוח</h1>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(customer?.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editCustomer(customer?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendWhatsApp2(customer?.contactNumber)}>
               <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600 dark:text-green-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendEmailToCustomer2(customer?.email, customer?.id)}>
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
      )}


    
    <Dialog open={openMail}>
    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 max-w-full md:w-[550px]" dir='rtl'>
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center w-full pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-[#333] dark:text-white tracking-wide">
                     שליחת אימייל ללקוח
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
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">אימייל לקוח</label>
                        <input type="email" name="name" id="name" value={emailCustomer} class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
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
                         <h1 className='col-span-2 text-sm text-gray-500'>אך הלקוח יראה שהאימייל נשלח מ-{result?.email}</h1>
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

    <Snackbar open={isDebt} autoHideDuration={20000} onClose={handleCloseDebt} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleCloseDebt}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {hebrew ? (
            <>
                        customers debt <span className='text-red-600 font-semibold'>{Number(Math.round(debt?.data)).toLocaleString()}</span> NIS

            </>
          ) : (
            <>
                       לקוחות חייבים <span className='text-red-600 font-semibold'>{Number(Math.round(debt?.data)).toLocaleString()}</span> ש"ח

            </>
          )}
        </Alert>
      </Snackbar>


    <Dialog open={newForm}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeCustomerForm}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg font-semibold tracking-wide text-gray-900 dark:text-white">
                    הכנס לקוח חדש
                </h3>
                </div>
            </div>
            {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}
          <CloseIcon className='text-red-500 cursor-pointer hover:scale-105 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/>
          </Alert>
        </div>}
        {error != "" && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{error}
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setError("")}/>
          </Alert>
        </div>}
        {error1 != "" && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{error1}
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setError1("")}/>
          </Alert>
        </div>}
        {errors == 403 && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">יש לעשות יציאה ולהרשם שוב מטעמי בטיחות  
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>

</Alert>
        </div>}
            {/* <!-- Modal body --> */}
            <form onSubmit={postData3}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                    
                      <label for='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">אימייל לקוח</label>
                      {/* <input type="email" name="email" value={email} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="אימייל ספק" required="" onChange={(e)=> setEmail(e.target.value)}/> */}
                      <div class="relative">
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
  </div>
  <input type="email" id="email" value={email} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@customer.com" onChange={(e)=> setEmail(e.target.value)}/>
</div>
                    </div>
                    <div>
                      <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">שם לקוח</label>
                      </div>
                        <input type="text" name="name" value={name} class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שם לקוח" required={true} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                  
                  <div className='relative bottom-1'>
                      {/* <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">פלאפון איש קשר</label>
                      <input type="text" name="agentPhone" value={agentPhone} placeholder="טלפון סוכן" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAgentPhone(e.target.value)}/> */}
                       <label for="price" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white text-right">טלפון ראשי</label>
  <div class="relative mt-2 rounded-md shadow-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      {/* <span class="text-gray-500 sm:text-sm">$</span> */}
    </div>
    <input value={phoneNumber} type="text" name="price" id="price" class="block w-full h-[42px] bg-gray-50 rounded-lg border border-gray-300 py-1.5 pl-20 pr-20 text-gray-900 placeholder:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder:text-right sm:text-sm sm:leading-6" placeholder="" onChange={(e)=> setPhoneNumber(e.target.value)}/>
    <div class="absolute inset-y-0 left-0 flex items-center">
      <label for="currency" class="sr-only">קידומת</label>
      <select onChange={(e) => setPrefix2(e.target.value)} id="currency" name="currency" class="h-full rounded-md border-0 bg-transparent py-0 pr-2 pl-3 dark:text-[#ccc] text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
        <option>03</option>
        {phones2.map(r => (
            <option className='text-right' value={r}>{r}</option>
          ))}
      </select>
    </div>
  </div>
                  </div>
                    <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">מס' ע.מ/חברה</label>
                      <input type="text" name="agentPhone" value={description} placeholder="מס' ע.מ/חברה" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setDescription(e.target.value)}/>
                  </div>
                  {/* <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">פלאפון איש קשר</label>
                      <input type="text" name="agentPhone" value={contactNumber} placeholder="פלאפון איש קשר" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setContactNumber(e.target.value)}/>
                  </div> */}
                   <div className='relative bottom-1'>
                      {/* <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">פלאפון איש קשר</label>
                      <input type="text" name="agentPhone" value={agentPhone} placeholder="טלפון סוכן" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAgentPhone(e.target.value)}/> */}
                       <label for="price" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white text-right">פלאפון איש קשר</label>
  <div class="relative mt-2 rounded-md shadow-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      {/* <span class="text-gray-500 sm:text-sm">$</span> */}
    </div>
    <input value={contactNumber} type="text" name="price" id="price" class="block w-full h-[42px] bg-gray-50 rounded-lg border border-gray-300 py-1.5 pl-20 pr-20 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" onChange={(e)=> setContactNumber(e.target.value)}/>
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
              
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">כתובת לקוח</label>
                        <input type="text" name="address" value={address} placeholder="כתובת לקוח" class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAddress(e.target.value)}/>

                      </div>              
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תיאור קצר</label>
                        <textarea value={shortDescription} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="...הוסף תיאור קצר לגבי הלקוח" onChange={(e)=> setShortDescription(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center cursor-pointer text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeCustomerForm}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  הכנס לקוח חדש  
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

  <Dialog open={open}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"  onClick={()=> setOpen(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                    עדכן פרטי לקוח 
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
                    
                      <label for='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">אימייל לקוח</label>
                      {/* <input type="email" name="email" value={email} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="אימייל ספק" required="" onChange={(e)=> setEmail(e.target.value)}/> */}
                      <div class="relative">
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
  </div>
  <input type="email" id="email" defaultValue={customer?.email} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" onChange={(e)=> setEmail(e.target.value)}/>
</div>
                    </div>
                    <div>
                      <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">שם לקוח</label>
                      </div>
                        <input type="text" name="name" defaultValue={customer?.name}class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שם ספק" required="" onChange={(e)=> setName(e.target.value)}/>
                    </div>
                  <div>
                    
                      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">טלפון ראשי</label>
                      <input type="text" name="phoneNumber" defaultValue={customer?.phoneNumber} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="טלפון ראשי" required="" onChange={(e)=> setPhoneNumber(e.target.value)}/>
                  </div>
                    <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">מס' ע.מ/חברה</label>
                      <input type="text" name="agentPhone" defaultValue={customer?.description} placeholder="מס' ע.מ/חברה" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setDescription(e.target.value)}/>
                  </div>
                    <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">פלאפון איש קשר</label>
                      <input type="text" name="agentPhone" defaultValue={customer?.contactNumber} placeholder="טלפון איש קשר" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setContactNumber(e.target.value)}/>
                  </div>
                  <div>
              
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">כתובת לקוח</label>
                        <input type="text" name="address" defaultValue={customer?.address} placeholder="כתובת לקוח" class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAddress(e.target.value)}/>

                      </div>              
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תיאור קצר</label>
                        <textarea defaultValue={customer?.shortDescription} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="...הוסף תיאור קצר לגבי הלקוח" onChange={(e)=> setShortDescription(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center cursor-pointer text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=> setOpen(false)}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  עדכן לקוח  
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


    </>
  );
}

export default Customers;