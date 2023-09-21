import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import Switch from '@mui/material/Switch';
// import TextareaAutosize from '@mui/base/TextareaAutosize';
// import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Dialog } from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from '@mui/material';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import MailIcon from '@mui/icons-material/Mail';
import EmailIcon from '@mui/icons-material/Email';
import { ThemeContext } from "../App";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import axios from 'axios';

import { useQuery } from 'react-query'
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Swal from 'sweetalert2'




const Workers = () => {
  const [isSSR, setIsSSR] = useState(true);
  const [isSSRE, setIsSSRE] = useState(true);
  const [workers, setWorkers] = useState([])
  const [ide, setIde] = useState();
  const [worker, setWorker] = useState({})
 
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastname] = useState("")
  const [status, setStatus] = useState("")
  const [idNumber, setIdNumber] = useState("")
  const [dob, setDob] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [startedAt, setStartedAt] = useState("")
  const [active, setActive] = useState()
  const [salaryPerHour, setSalaryPerHour] = useState("")
  const [open, setIsOpen] = useState(false)
  const [error, setError] = useState()
  const [errorMode, setErrorMode] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0);
  const [openx, setIsOpenx] = useState(false)
  const [errorRes, setErrorRes] = useState([]);
  const [errors, setErrors] = useState()
  const [state, setState] = useState(true)
  const [action, setAction] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("")
  const [gender, setGender] = useState("")
  const [openMail, setOpenMail] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [prefix, setPrefix] = useState("050");
  const [emailWorker, setEmailWorker] = useState("")
  const [pic, setPic] = useState(false)
  const [picAlert, setPicAlert] = useState(false)
  const [image, setImage] = useState("")


  const { hebrew, globalTheme } = useContext(ThemeContext)

  
  const res = localStorage.getItem("user")
  const result = JSON.parse(res)


  const genders = ["MALE", "FEMALE"];
  const phones = ["050", "052", "053", "054", "055", "056", "057", "058", "059", "072", "073"];


  const navigate = useNavigate()
  

  const getWorks = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/all-workers-paging/${id}/${page}/10/firstName`)
  }
  
  const {data, refetch} = useQuery('works', ()=> getWorks(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: false,
      refetchOnWindowFocus:false
 
    }) 

    const getWorkers = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/all-workers/${id}`)
    }
    
    const {data: allWorkers, refetch: works} = useQuery('all-workers', ()=> getWorkers(),
      {
        // enabled: !!supplier?.name,
        enabled: false,
        // staleTime: 300000
        refetchOnMount: false,
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
  }, [windowHeight, window.innerHeight, windowWidth, window.innerWidth]);

  

  useEffect(()=> {
    setTimeout(()=> {
      localStorage.setItem('worker', false)
    }, 2000)
  })

  useEffect(()=> {
    setWorkers(data?.data)
}, [data?.data])

 

  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 300)
    
  }, [isSSR]);

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


  const getWorker = async (id) => {
    const res = await fetch(`https://nartina.com/api/user/get-worker-by-id/${id}`);
    const result = await res.json();
    setWorker(result)
    setIsOpen(true)
}


  const handleClose3 = () => {
    setErrorMode(false)
    setError("")
  }

  const closeWorkerForm = () => {
    setIsOpenx(false)
    setIdNumber("")
    setAddress("")
    setSalaryPerHour("")
    setEmail()
    setDob("")
    setFirstName("")
    setLastname("")
    setPhoneNumber("")
    setGender("")
    setDescription("")
    setStartedAt("")
    setErrorRes("")
    setPrefix("050")
    setImage("")
  }

  
  const printValues = (e)=> {
    e.preventDefault()
    const id = result?.id
    axios.post("https://nartina.com/api/user/update-worker/" + ide + "/" + id, {
      firstName: firstName != "" ? firstName : worker.firstName,
      lastName: lastName != "" ? lastName : worker.lastName,
      idNumber: idNumber != "" ? idNumber : worker.idNumber,
      phoneNumber: phoneNumber != "" ? phoneNumber : worker.phoneNumber,
      description: description != "" ? description : worker.description,
      email: email != "" ? email : worker.email,
      image: image != "" ? image : worker.image,
      gender: gender != "" ? gender : worker.gender,
      address: address != "" ? address : worker.address,
      dob: dob != "" ? dob : worker.dob,
      status: status != "" ? status : worker.status,
      active: active != null ? active : worker.active,
      salaryPerHour: salaryPerHour != "" ? salaryPerHour : worker.salaryPerHour,
      startedAt: startedAt != "" ? startedAt : worker.startedAt
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {
            // setIsOpenAlertAdd(true)
            setIsOpen(false)
            refetch()
            Swal.fire("!עודכן", '! עובד עודכן בהצלחה', "success");
          // setEditMode(false)
          })
    .catch(err => {
      console.log(err.response.data)
      setIsOpen(false)
      Swal.fire("מצטערים", ' קרתה תקלה, דו"ח לא עודכן' + " - " + err.response.data, "error");
      closeWorkerForm()
      setIsOpen(false)
      setError(err.response.status)})
    // getWorkers()
  }

  

  const editWorker = (id) => {
    setIde(id)
    getWorker(id)
  }


  const changeActive = (id) => {
    axios.get('https://nartina.com/api/user/update-worker-active/' + id)
    .then(refetch)
    .catch(err => console.log(err))
  
  }
    
  // const sendWhatsApp = (id) => {
  //   axios.get("https://nartina.com/api/user/worker-phone/" + id)
  //   .then(res => window.location.href = "https://wa.me/972" + res.data)
  //   .catch(err => console.log(err))
  // }

  const sendWhatsApp2 = (phone) => {
    if(!phone) {
      Swal.fire("מצטערים", ' קרתה תקלה, לא ניתן לשלוח ווטסאפ לעובד, מכיוון שלא מוגדר מספר טלפון לעובד' , "error")
      return
    }
      window.location.href = "https://wa.me/972" + phone
    
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


  const postData = (e) => {
    e.preventDefault();
    setLoading(true)
    if(firstName == "" || lastName == "" || idNumber == "" || gender == "") {
      setErrorRes("שם פרטי שם משפחה מין העובד ות.ז שדות חובה")
      setLoading(false)
      return
    }
    if(gender == "מין העובד") {
      setErrorRes("יש לציין את מין העובד")
      setLoading(false)
      return;
    }

      axios.post("https://nartina.com/api/user/add-worker/" + result?.id, {
        firstName,
        lastName,
        description,
        dob,
        gender,
        email,
        image,
        startedAt,
        idNumber,
        salaryPerHour,
        address,
        phoneNumber: phoneNumber != "" ? prefix + phoneNumber : phoneNumber,
        
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {refetch()
        // localStorage.setItem('worker', true)
         refetch()
         Swal.fire("!הצלחה", '! עובד הוכנס בהצלחה', "success");
         setIsOpenx(false)
        //  setOpenWorkerAlert(true)
         setLoading(false)
         closeWorkerForm()
         })
      .catch(error => {setErrorRes(error.response.data)
        setIsOpenx(false)
        setLoading(false)
        Swal.fire("מצטערים", ' קרתה תקלה, דו"ח לא עודכן' + " - " + error.response.data, "error")
        console.log(error.response.data)
        setErrors(error.response.status)})
        .finally(setLoading(false))
    
      
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

const closeEmailForm = () => {
  setEmailBody("")
  setEmailSubject("")
  setEmailWorker("")
  setOpenMail(false)
}


const sendEmailToWorker2 = (email, id) => {
      if(email) {
        setIde(id)
        setEmailWorker(email)
        setOpenMail(true)
        return
      }
      Swal.fire("מצטערים", ' קרתה תקלה, לא ניתן לשלוח אימייל לעובד, מכיוון שלא מוגדרת כתובת אימייל' , "error")
  
}

const addEmailToDb = () => {
  axios.post("https://nartina.com/email/add-email-worker/" + ide, {
    subject: emailSubject,
    body: emailBody
  }).then(res => {console.log(res.data)
    setOpenMail(false)
    setEmailBody("")
    setEmailSubject("")
    setEmailWorker("")
    setIde("")
  })
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
    text: "!לא ניתן יהיה לשחזר את העובד",
    icon: 'אזהרה',
    showCancelButton: true,
    confirmButtonText: '!כן מחק',
    cancelButtonText: '!לא למחוק',
    reverseButtons: true
  }).then((results) => {
    if (results.isConfirmed) {
      axios.delete("https://nartina.com/api/user/delete-worker-no-salaries/" + id, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
      .then(res => {
      console.log(res.data)
        refetch()
        swalWithBootstrapButtons.fire(
          '!נמחק',
          'עובד נמחק בהצלחה.',
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
        'פעולה בוטלה עובד לא נמחק :)',
        'error'
      )
    }
  })
}


const sendMail = (e) => {
  e.preventDefault();
  axios.get("https://nartina.com/api/user/email-test/" + emailWorker + "/" + result?.email + "/" + emailBody + "/" + emailSubject,)
  .then(res => {console.log(res.data)
    addEmailToDb()
    closeEmailForm()
    Swal.fire("!נשלח", '! אימייל נשלח בהצלחה', "success");
    // setMailAlert(true)
  })
  .catch(err => {console.log(err.response.data)
    Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error")})

}


const handleClose5 = () => {
  setPicAlert(false)
}


const closeUpdate = () => {
  setIsOpen(false)
  closeWorkerForm()
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
              <th scope="col" className="px-0 py-3 text-center">name</th>
              <th scope="col" className="px-0 py-3 text-center">pay</th>
              <th scope="col" className="px-0 py-3 text-center">id</th>
              {/* <th scope="col" className="px-0 py-3 text-center">dob</th> */}
              <th scope="col" className="px-0 py-3 text-center">address</th>
              <th scope="col" className="px-0 py-3 text-center">start date</th>
              <th scope="col" className="px-0 py-3 text-center">phone</th>
              <th scope="col" className="px-0 py-3 text-center">active</th>
              <th scope="col" className="px-0 py-3 text-center">edit</th>
              <th scope="col" className="px-0 py-3 text-center">delete</th>
              <th scope="col" className="px-0 py-3 text-center">Msg</th>
              <th scope="col" className="px-0 py-3 text-center">card</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data.content.map((worker, index) => (
                <tr key={worker.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{worker.fullName}</td>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{worker.salaryPerHour}</td>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{worker.idNumber}</td>
                {/* <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{worker.dob}</td> */}
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{worker.address}</td>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{worker.startedAt}</td>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{worker.phoneNumber}</td>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              {worker.active ? <>
          <Android12Switch
            checked={true}
            onChange={()=> changeActive(worker.id)}
            color='success'
            // size='small'
            // inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </>
          : 
          <>
          <Android12Switch
            checked={false}
            onChange={()=> changeActive(worker.id)}
            // size='small'
            // inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </>}
              </td>
                <td scope="col" className="px-0 text-center py-2 text-xs whitespace-nowrap">
                <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editWorker(worker?.id)}>
                 <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
                </div>
              </td>
                <td scope="col" className="px-0 text-center py-2 text-xs whitespace-nowrap">
               <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(worker?.id)}>
                 <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
                </div>
              </td>
                <td scope="col" className="px-0 text-center py-2 text-xs whitespace-nowrap">
                <div className="inline-flex text-xs leading-5 bg-green-300 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendWhatsApp2(worker?.phoneNumber)}>
                 <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600'/>
                </div>
              </td>
                <td scope="col" className="px-2 text-center py-2 text-xs">
                <div className="inline-flex bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 py-2 px-3 rounded-lg cursor-pointer" onClick={()=> navigate(`/worker-card/${worker?.id}`)}>
                 <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'>כרטיס עובד</h1>
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
          {state ? (
            <>
             <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">

<div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
    <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
    <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
           <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> setIsOpenx(true)}>
               הכנס עובד חדש
           </button>
           <div class="flex items-center space-x-3 w-full md:w-auto relative">
               <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                   <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                       <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                   </svg>
                   אפשרויות
               </button>
               
              <RecentActorsIcon className='text-blue-500 cursor-pointer hover:text-blue-400' onClick={()=> {works()
              setTimeout(()=> {setState(!state)}, 500)}}/>
               
               <a href="https://tofes101.co.il/assets/forms/tofes-101.pdf" target="_blank">
          <div className='bg-blue-500 hover:bg-blue-400 dark:bg-blue-600 flex items-center justify-center space-x-1 rounded px-2 py-[1px] text-white text-sm'>
            <h1 className='text-white font-mono tracking-wide'>101</h1>
            <h1 className='text-white font-mono tracking-wide hidden mmu:inline'>טופס</h1>
          </div>
         </a>
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
      <th scope="col" className="px-3 py-3 text-center">מייל</th>
      <th scope="col" className="px-3 py-3 text-center">הודעה</th>
      <th scope="col" className="px-3 py-3 text-center">פעיל</th>
      <th scope="col" className="px-3 py-3 text-center">טלפון</th>
      {/* <th scope="col" className="px-3 py-3 text-center">התחלה</th> */}
      <th scope="col" className="px-3 py-3 text-center">כתובת</th>
      {/* <th scope="col" className="px-3 py-3 text-center">ת. לידה</th> */}
      <th scope="col" className="px-3 py-3 text-center">ת.ז</th>
      <th scope="col" className="px-3 py-3 text-center">שכר</th>
      <th scope="col" className="px-3 py-3 text-center">שם מלא</th>
                </tr>
            </thead>
            <tbody>
                
                {data?.data.content.map((worker, index) => (
        <tr key={worker.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
        <td scope="col" className="px-1 text-center py-2 text-xs">
        <div className="inline-flex bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 py-2 px-3 rounded-lg cursor-pointer" onClick={()=> navigate(`/worker-card/${worker?.id}`)}>
         <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-bold '>כרטיס עובד</h1>
        </div>
      </td>
      
      <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
       <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(worker?.id)}>
         <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
        </div>
      </td>
      <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
        <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editWorker(worker?.id)}>
         <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
        </div>
      </td>
      <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
        <div className="inline-flex text-xs leading-5 bg-purple-300 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendEmailToWorker2(worker?.email, worker?.id)}>
         <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-purple-600'/>
        </div>
      </td>
      <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
        <div className="inline-flex text-xs leading-5 bg-green-300 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendWhatsApp2(worker?.phoneNumber)}>
         <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600'/>
        </div>
      </td>
      <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
      {worker.active ? <>
  <Android12Switch
    checked={true}
    onChange={()=> changeActive(worker.id)}
    color='success'
    // size='small'
    // inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  </>
  : 
  <>
  <Android12Switch
    checked={false}
    onChange={()=> changeActive(worker.id)}
    // size='small'
    // inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  </>}
      </td>
        <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{worker.phoneNumber}</td>
        {/* <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{worker.startedAt}</td> */}
        <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{worker.address}</td>
        {/* <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{worker.dob}</td> */}
        <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{worker.idNumber}</td>
        <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{worker.salaryPerHour}</td>
        <th scope="col" className="px-1 text-center py-2 whitespace-nowrap dark:text-[#ccc]">{worker.fullName}</th>
        </tr>
      ))}
                    
        
            </tbody>
        </table>
    </div>
    <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {data?.data.content.map(worker => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-1`}>
                <div className="p-4 blue-glassmorphism hover:bg-gray-900 shadow rounded flex flex-col space-y-1">
                <div className='flex items-center justify-end space-x-4 text-sm'>
                  <div className='dark:text-[#ccc] text-lg'>{worker.fullName}</div>
                </div>
                <div className='flex items-center justify-end space-x-0.5'>
                <div className='text-right font-mono dark:text-[#ccc]'>{worker.idNumber}</div>
                <div className='text-right font-mono dark:text-[#ccc]'>-</div>
                <div className='text-right dark:text-[#ccc]'>ת.ז</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{worker.phoneNumber}</div>
                {/* <div className='text-right dark:text-[#ccc]'>{worker.description}</div> */}
                </div>
                <div className='text-right font-mono dark:text-[#ccc]'>{worker.address}</div>
                
                <div className='text-right dark:text-[#ccc] font-mono'>{worker.email}</div>
                <div className='flex items-center justify-end space-x-1'>
                <div className='text-right font-mono dark:text-[#ccc]'><span className='font-sans text-sm'>₪</span>{worker.salaryPerHour}</div>
                <div className='text-right font-mono dark:text-[#ccc]'>-</div>
                <div className='text-right dark:text-[#ccc]'>שכר שעתי</div>
                </div>
                <div className='flex items-center justify-end space-x-1'>
                <div scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
      {worker.active ? <>
  <Android12Switch
    checked={true}
    onChange={()=> changeActive(worker.id)}
    color='success'
    // size='small'
    // inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  </>
  : 
  <>
  <Android12Switch
    checked={false}
    onChange={()=> changeActive(worker.id)}
    // size='small'
    // inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  </>}
  </div>
                <div className='text-right dark:text-[#ccc]'>?פעיל</div>
                </div>
                <div className='flex items-center justify-end -space-x-2 relative bottom-1'>
                <div class="px-6 py-3 text-center whitespace-nowrap">
<ul class="flex justify-center">
<li>
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="currentColor"
class="mr-1 h-4 w-4 text-yellow-500">
<path
fill-rule="evenodd"
d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
clip-rule="evenodd" />
</svg>
</li>
<li>
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="currentColor"
class="mr-1 h-4 w-4 text-yellow-500">
<path
fill-rule="evenodd"
d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
clip-rule="evenodd" />
</svg>
</li>
<li>
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="currentColor"
class="mr-1 h-4 w-4 text-yellow-500">
<path
fill-rule="evenodd"
d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
clip-rule="evenodd" />
</svg>
</li>
<li>
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="currentColor"
class="mr-1 h-4 w-4 text-yellow-500">
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
</li>
<li>
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="currentColor"
class="mr-1 h-4 w-4 text-yellow-500">
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
</li>
</ul>    
</div>
                <div className='text-right dark:text-[#ccc]'>דירוג</div>
                </div>
                <div className='flex items-center justify-end space-x-4 relative top-1'>
                <div className="flex justify-center items-center bg-gray-300 dark:bg-slate-600 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/worker-card/${worker?.id}`)}>
                <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'>כרטיס עובד</h1>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(worker?.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editWorker(worker?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendWhatsApp2(worker?.phoneNumber)}>
               <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600 dark:text-green-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> sendEmailToWorker2(worker?.email, worker?.id)}>
               <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-violet-500'/>
              </div>
                </div>
              </div>
              ))}
            </div>
    <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
   <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
      {/* <h1 className='text-lg font-semibold font-mono '>{(number2 > 0 && !vvv) ? number2 : number}</h1> */}
      {/* <h1 className='font-mono '>מס' חשבוניות {data?.data.totalElements}</h1> */}
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
          ) : (
            <>
             <section className="py-2 bg-gray-100 text-gray-800 relative bottom-2">
	<div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
    <h1 className='bg-blue-500 text-white rounded px-2 cursor-pointer relative bottom-2 hover:bg-blue-400' onClick={()=> setState(!state)}>חזרה לעובדים</h1>
		<h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">רשימת העובדים שלנו לאינטרקציה מהירה</h1>
		<div className="flex flex-row flex-wrap-reverse justify-center mt-8">
      {allWorkers?.data.map((worker, index) => (
        <>
        <div key={worker?.id} className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gray-800 text-gray-100">
				{/* <img alt="" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-500" src={`https://source.unsplash.com/100x100/?portrait?${index}`} /> */}
        {/* <img alt="" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-500" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Harley" /> */}
        <img alt="" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-500" src={worker?.image ? worker?.image : `https://source.unsplash.com/100x100/?portrait?${index}`} />
				<div className="flex-1 my-4">
					<p className="text-xl font-semibold leading-snug tracking-wide text-gray-100">{worker?.fullName}</p>
					<p className='tracking-wider'>{worker.idNumber}</p>
          <div class="flex items-center justify-center my-0.5 mb-1">
		<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
			</path>
		</svg>
		<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
			</path>
		</svg>
		<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
			</path>
		</svg>
		<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
			</path>
		</svg>
		<svg class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
			</path>
		</svg>
	</div>
          <div class="inline-flex items-center rounded-md shadow-sm relative top-1">
          <a rel="noopener noreferrer" href="#" title="ערוך" className="text-gray-600 hover:text-blue-600">
            <button class="text-slate-200 hover:text-blue-600 text-sm bg-slate-900 hover:bg-slate-900/50 border border-[#ccc] rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={()=> editWorker(worker?.id)}>
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  </span>
            </button>
            </a>
            <a rel="noopener noreferrer" href="#" title="כרטיס עובד" className="text-gray-600 hover:text-blue-600">
            <button class="text-slate-200 hover:text-blue-600 text-sm bg-slate-900 hover:bg-slate-900/50 border-y border-[#ccc] font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={()=> navigate(`/worker-card/${worker?.id}`)}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>                      
                </span>
            </button>
            </a>
            <a rel="noopener noreferrer" href="#" title="מחק עובד" className="text-gray-600 hover:text-blue-600">
            <button class="text-slate-200 hover:text-blue-600 text-sm bg-slate-900 hover:bg-slate-900/50 border border-[#ccc] rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={()=> handleAlert(worker?.id)}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  </span>
            </button>
            </a>
        </div>
				</div>
				<div className="flex items-center justify-center p-3 space-x-3 border-t-2">
					<a rel="noopener noreferrer" title="אימייל" className="text-blue-500 hover:text-blue-500">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 cursor-pointer" onClick={()=> sendEmailToWorker2(worker?.email)}>
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
						</svg>
					</a>
          <div rel="noopener noreferrer" href="#" title="ווטסאפ" className="text-gray-50 cursor-pointer hover:text-blue-600" onClick={()=> sendWhatsApp2(worker?.phoneNumber)}>
            <WhatsAppIcon className='text-blue-500 hover:text-blue-500'/>
					</div>
					<div title="משכורות" className="text-gray-50 cursor-pointer hover:text-blue-600" onClick={()=> navigate(`/workers/${worker?.id}`)}>
            <LocalAtmIcon className='text-blue-500 hover:text-blue-500'/>
					</div>
					<div title="משימות" className="text-gray-50 cursor-pointer hover:text-blue-600" onClick={()=> navigate(`/workers-tasks/${worker?.id}`)}>
            <AssignmentOutlinedIcon className='text-blue-500 hover:text-blue-500'/>
					</div>
				</div>
			</div>
        </>
      ))}
			
		</div>
	</div>
</section>
            </>
          )}
          </>
        )}

      </section>

      

<Dialog open={open}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeUpdate}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                      עדכן פרטי עובד
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
                    
                      <label for='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">כתובת אימייל</label>
                      {/* <input type="email" name="email" value={email} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="אימייל ספק" required="" onChange={(e)=> setEmail(e.target.value)}/> */}
                      <div class="relative">
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
  </div>
  <input type="email" id="email" defaultValue={worker?.email} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@supplier.com" onChange={(e)=> setEmail(e.target.value)}/>
</div>
                    </div>
                    <div>
                      <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">שם פרטי</label>
                      </div>
                        <input type="text" name="name" defaultValue={worker?.firstName} class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שם פרטי" required="" onChange={(e)=> setFirstName(e.target.value)}/>
                    </div>
                  <div>
                    
                      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">מס' פלאפון</label>
                      <input type="text" name="phoneNumber" defaultValue={worker?.phoneNumber} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="מס' פלאפון" required="" onChange={(e)=> setPhoneNumber(e.target.value)}/>
                  </div>
                    <div>
                    <div>
                      <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">שם משפחה</label>
                      </div>
                        <input type="text" name="name" defaultValue={worker?.lastName} class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שם משפחה" required="" onChange={(e)=> setLastname(e.target.value)}/>
                    </div>
                  </div>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">כתובת</label>
                      <input type="text" name="agentPhone" defaultValue={worker?.address} placeholder="כתובת" class="bg-gray-50 placeholder:text-right text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAddress(e.target.value)}/>
                  </div>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תעודת זהות</label>
                      <input type="text" name="agentPhone" defaultValue={worker?.idNumber} placeholder="ת.ז" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setIdNumber(e.target.value)}/>
                  </div>
                  <div className='flex items-center justify-center space-x-2'>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">שכר שעתי</label>
                      <input type="text" name="agentPhone" defaultValue={worker?.salaryPerHour} placeholder="שכר שעתי" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setSalaryPerHour(e.target.value)}/>
                  </div>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">מין העובד</label>
                      <select name='type' onChange={(e) => setGender(e.target.value)} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">{worker?.gender}</option>
                              {genders.map(g => (
                              <option className='text-right' value={g}>{g}</option>
                              ))}
                          </select>
                      {/* <input type="text" name="agentPhone" value={email} placeholder="מין העובד" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setEmail(e.target.value)}/> */}
                  </div>
                  </div>
                  <div className='flex items-center justify-center space-x-2'>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תאריך לידה</label>
                      <input type="date" name="agentPhone" defaultValue={worker?.dob} placeholder="תאריך לידה" class="bg-gray-50 h-[40px] min-w-max placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setDob(e.target.value)}/>
                  </div>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">התחלת עבודה</label>
                      <input type="date" name="agentPhone" defaultValue={worker?.startedAt} placeholder="התחלת עבודה" class="bg-gray-50 h-[40px] min-w-max placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setStartedAt(e.target.value)}/>
                  </div>

                  </div>
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תיאור קצר</label>
                        <textarea defaultValue={worker?.description} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" ...'הוסף תיאור קצר לגבי העובד, לדוגמא: שעות או ימים שהוא לא יוכל להגיע, אם הוא לומד במקביל מגבלות כל שהן וכו" onChange={(e)=> setDescription(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeUpdate}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  עדכן עובד   
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
                {worker?.image ? (
                          <img class="mx-auto mb-4 w-20 h-20 rounded-full cursor-pointer" src={image != "" ? image : worker?.image} alt="Leslie Avatar" onClick={()=> setPic(true)}/>
                    ) : (
                      <>
                      {image != "" ? (
                        <img class="mx-auto mb-4 w-20 h-20 rounded-full cursor-pointer" src={image} alt="Leslie Avatar" onClick={()=> setPic(true)}/>
                      ) : (
                        <div class="relative w-10 h-10 cursor-pointer overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600" onClick={()=> setPic(true)}>
                      <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                      )}
                      </>
                    )}
                </div>
            </form>
        </div>
    </div>
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


<Dialog open={openMail}>
    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 max-w-full md:w-[550px]" dir='rtl'>
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center w-full pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-[#333] dark:text-white tracking-wide">
                     שליחת אימייל לעובד
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
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">אימייל עובד</label>
                        <input type="email" name="name" id="name" value={emailWorker} class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
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
                         <h1 className='col-span-2 text-sm text-gray-500'>אך העובד יראה שהאימייל נשלח מ-{result?.email}</h1>
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

<Dialog open={openx}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeWorkerForm}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                    הכנס עובד חדש
                </h3>
                </div>
            </div>
            {/* {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}</Alert>
          <CloseIcon className='text-red-500 cursor-pointer hover:scale-125 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/>
        </div>} */}
         {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
          </Alert>
        </div>}
        {errors == 403 && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">יש לעשות יציאה ולהרשם שוב מטעמי בטיחות  
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>

</Alert>
        </div>}
            {/* <!-- Modal body --> */}
            <form onSubmit={postData}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                    
                      <label for='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">כתובת אימייל</label>
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
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">שם פרטי</label>
                      </div>
                        <input type="text" name="name" value={firstName} class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שם פרטי" required="" onChange={(e)=> setFirstName(e.target.value)}/>
                    </div>
                  {/* <div>
                      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">מס' פלאפון</label>
                      <input type="text" name="phoneNumber" value={phoneNumber} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="מס' פלאפון" required="" onChange={(e)=> setPhoneNumber(e.target.value)}/>
                  </div> */}
                   <div className='relative bottom-1'>
                      {/* <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">פלאפון איש קשר</label>
                      <input type="text" name="agentPhone" value={agentPhone} placeholder="טלפון סוכן" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAgentPhone(e.target.value)}/> */}
                       <label for="price" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white text-right">פלאפון עובד</label>
  <div class="relative mt-2 rounded-md shadow-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      {/* <span class="text-gray-500 sm:text-sm">$</span> */}
    </div>
    <input value={phoneNumber} type="text" name="price" id="price" class="block w-full h-[42px] bg-gray-50 rounded-lg py-1.5 pl-20 pr-20 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" onChange={(e)=> setPhoneNumber(e.target.value)}/>
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
                    <div>
                      <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">שם משפחה</label>
                      </div>
                        <input type="text" name="name" value={lastName} class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שם משפחה" required="" onChange={(e)=> setLastname(e.target.value)}/>
                    </div>
                  </div>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">כתובת</label>
                      <input type="text" name="agentPhone" value={address} placeholder="כתובת" class="bg-gray-50 placeholder:text-right text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAddress(e.target.value)}/>
                  </div>
                  <div>
                  <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תעודת זהות</label>
                      </div>
                      <input type="text" name="agentPhone" value={idNumber} placeholder="ת.ז" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setIdNumber(e.target.value)}/>
                  </div>
                  <div className='flex items-center justify-center space-x-2'>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">שכר שעתי</label>
                      <input type="text" name="agentPhone" value={salaryPerHour} placeholder="שכר שעתי" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setSalaryPerHour(e.target.value)}/>
                  </div>
                  <div>
                  <div className='flex justify-end items-center space-x-0.5'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5'>שדה חובה</h1>
                        <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">מין העובד</label>
                      </div>
                      <select name='type' onChange={(e) => setGender(e.target.value)} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">מין העובד</option>
                              {genders.map(g => (
                              <option className='text-right' value={g}>{g}</option>
                              ))}
                          </select>
                      {/* <input type="text" name="agentPhone" value={email} placeholder="מין העובד" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setEmail(e.target.value)}/> */}
                  </div>
                  </div>
                  <div className='flex items-center justify-center space-x-2'>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תאריך לידה</label>
                      <input type="date" name="agentPhone" value={dob} placeholder="תאריך לידה" class="bg-gray-50 h-[40px] min-w-max placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setDob(e.target.value)}/>
                  </div>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">התחלת עבודה</label>
                      <input type="date" name="agentPhone" value={startedAt} placeholder="התחלת עבודה" class="bg-gray-50 h-[40px] min-w-max placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setStartedAt(e.target.value)}/>
                  </div>

                  </div>
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תיאור קצר</label>
                        <textarea value={description} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" ...'הוסף תיאור קצר לגבי העובד, לדוגמא: שעות או ימים שהוא לא יוכל להגיע, אם הוא לומד במקביל מגבלות כל שהן וכו" onChange={(e)=> setDescription(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-between space-x-4'>
                <div className='flex items-center justify-center space-x-2'>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  הכנס עובד   
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
                <div class="inline-flex items-center cursor-pointer text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeWorkerForm}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                </div>
           
                    {image != "" ? (
                          <img class="mx-auto mb-4 w-20 h-20 rounded-full cursor-pointer" src={image} alt="Leslie Avatar" onClick={()=> setPic(true)}/>
                    ) : (
                      <div class="relative w-10 h-10 cursor-pointer overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600" onClick={()=> setPic(true)}>
                      <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                    )}
                
                </div>
            </form>
        </div>
    </div>
</div>
  </Dialog>

  <Dialog open={pic}>
    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 max-w-full md:w-[550px]" dir='rtl'>
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center w-full pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-[#333] dark:text-white tracking-wide">
                      בחר תמונה לעובד
                </h3>
                <button type="button" onClick={()=> setPic(false)} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mr-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="grid gap-8 lg:gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png")}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png")}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="Helene Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="Joseph Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png" alt="Sofia Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png" alt="Leslie Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="Michael Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png" alt="Neil Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://api.dicebear.com/7.x/avataaars/svg")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg" alt="Sofia Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka" alt="Leslie Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://api.dicebear.com/7.x/adventurer/svg?seed=Felix")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Felix" alt="Michael Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://api.dicebear.com/7.x/adventurer/svg")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://api.dicebear.com/7.x/adventurer/svg" alt="Neil Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="Sofia Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://api.dicebear.com/7.x/big-smile/svg")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://api.dicebear.com/7.x/big-smile/svg" alt="Leslie Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://api.dicebear.com/7.x/big-smile/svg?seed=Felix")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://api.dicebear.com/7.x/big-smile/svg?seed=Felix" alt="Michael Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://api.dicebear.com/7.x/big-smile/svg?seed=Aneka")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://api.dicebear.com/7.x/big-smile/svg?seed=Aneka" alt="Neil Avatar"/>
          </div>

          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://api.dicebear.com/7.x/croodles/svg?seed=Felix")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://api.dicebear.com/7.x/croodles/svg?seed=Felix" alt="Sofia Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://api.dicebear.com/7.x/micah/svg")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://api.dicebear.com/7.x/micah/svg" alt="Leslie Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://api.dicebear.com/7.x/personas/svg")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://api.dicebear.com/7.x/personas/svg" alt="Michael Avatar"/>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400 cursor-pointer" onClick={()=> {setImage("https://avatars.dicebear.com/api/open-peeps/stefan.svg")
        setPic(false)
        setPicAlert(true)}}>
              <img class="mx-auto mb-4 w-20 h-20 rounded-full" src="https://avatars.dicebear.com/api/open-peeps/stefan.svg" alt="Neil Avatar"/>
          </div>
      </div>  
        </div>
    </Dialog>
    <Snackbar open={picAlert} autoHideDuration={10000} onClose={handleClose5} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose5}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? 'successfully picked an image' : 'תמונה נבחרה בהצלחה'}     
             </Alert>
      </Snackbar>
    
    </>
  );
};

export default Workers;

