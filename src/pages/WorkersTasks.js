import React, { useState, useEffect, useContext } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Dialog } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import { ThemeContext } from "../App";
import { Snackbar, Alert } from "@mui/material";
// import { useTheme } from '@mui/material/styles';
import { PaginationItem } from '@mui/material';
import Pagination from '@mui/material/Pagination';
// import { prefixer } from 'stylis';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import axios from 'axios';





const WorkersTasks = () => {
    const { hebrew, globalTheme } = useContext(ThemeContext)
    const [task, setTask] = useState({})
    const [task1, setTask1] = useState("")
    const [editTask, setEditTask] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [dialog2, setDialog2] = useState(false)
    const [dialog3, setDialog3] = useState(false)
    const [workerTask, setWorkerTask] = useState("")
    const [workerFullTask, setWorkerFullTask] = useState({})
    const [errorRes, setErrorRes] = useState([]);
    const [priority, setPriority] = useState("")
    const [priorityHebrew, setPriorityHebrew] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [status, setStatus] = useState("")
    const [statusHebrew, setStatusHebrew] = useState("")
    const [errors, setErrors] = useState()
    const [workerId, setWorkerId] = useState();
    const [workerFullName, setWorkerFullName] = useState("")
    const [openTask, setOpenTask] = useState(false);
    const [workers, setWorkers] = useState([]);
    const [ide, setIde] = useState("");
    const [workerEmail, setWorkerEmail] = useState("")
    const [workerPhone, setWorkerPhone] = useState("")
    const [workerName, setWorkerName] = useState("")
    const [rate, setRate] = useState(false)
    const [error, setError] = useState()
    const [action, setAction] = useState(false)
    const [page, setPage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [openAlertIncome, setIsOpenAlertIncome] = useState(false)
    const [openAddAlert, setOpenAddAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [rateAlert, setRateAlert] = useState(false)
    const [rating, setRating] = useState("")



    const hebrewStatuses = ["התחלה", "בתהליך", "בדיקה", "הסתיים"]
    const hebrewPriorities = ["לא דחוף", "דחוף", "דחוף מאוד", "קריטי"]

    

    // const api = `https://cbot.live/api/send.php?number=972${workerPhone.substring(1)}&type=text&message=${workerTask}&instance_id=640D8E5F4D7C0&access_token=8616d8381676900e2305ff935529d49d`

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
      // setWindowHeight(window.innerHeight);
    };
  
    useEffect(() => {
      resizeWindow();
      console.log(window.innerHeight)
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);  
    }, [windowWidth, window.innerWidth]);

    const getTasks = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/all-workers-tasks-paging/${id}/${page}/50/startDate`)
    }
    
    const {data, refetch} = useQuery('all-user-worker-tasks', ()=> getTasks(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: true,
        refetchOnWindowFocus:false
   
      }) 


    const getWorkers = () => {
      axios.get(`https://nartina.com/api/user/all-workers/${result?.id}`)
      .then(res => setWorkers(res.data))
      .catch(err => console.log(err))
    }


    const getTask = (id) => {
      axios.get("https://nartina.com/api/user/get-worker-task/" + id)
      .then(res => {setTask(res.data)
        setIde(id)
      // setStartDate(start)
      // setEndDate(end)
      // setWorkerName(name)
    })
      .catch(err => console.log(err.response.data))
      setDialog(true)
    }

    const closeFormValidation = () => {
      setOpenTask(false)
      setWorkerFullName("");
      setStartDate("");
      setEndDate("")
      setStatusHebrew("")
      setStatus("")
      setPriority("")
      setPriorityHebrew("")
      setWorkerId("")
      setTask1("")
      setErrorRes("")
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
        text: "!לא ניתן יהיה לשחזר את המשימה",
        icon: 'אזהרה',
        showCancelButton: true,
        confirmButtonText: '!כן מחק',
        cancelButtonText: '!לא למחוק',
        reverseButtons: true
      }).then((results) => {
        if (results.isConfirmed) {
          axios.delete("https://nartina.com/api/user/delete-worker-task/" + id, {
            headers: {
              Authorization: 'Bearer ' + result?.token,
          
             }
          })
          .then(res => {
          console.log(res.data)
          localStorage.setItem('workersTasks', true)
            refetch()
            swalWithBootstrapButtons.fire(
              '!נמחק',
              'המשימה נמחקה בהצלחה.',
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
            'הפעולה בוטלה המשימה לא נמחקה :)',
            'error'
          )
        }
      })
    }

    const postWorkerTask = (e) => {
      e.preventDefault();
      if(task1 == "" || startDate == "" || endDate == "" || status == "" || priority == "" || workerFullName == "") {
        alert("חסרים שדות חובה")
        return
      }
      axios.post("https://nartina.com/api/user/add-worker-task/" + result?.id + "/" + workerId , {
          status,
          task: task1,
          workerName: workerFullName,
          priority,
          startDate,
          endDate
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
      .then(res => {console.log(res.data)
        localStorage.setItem('workersTasks', true)
        Swal.fire("!הצלחה", '! משימה הוכנסה בהצלחה', "success");
        setOpenAddAlert(true)
        closeFormValidation()
      refetch()
      setOpenTask(false)})
      .catch(err => {console.log(err.response.data)
        Swal.fire("מצטערים", 'קרתה תקלה, משימה לא נכנסה', "error")
      })
      .finally(closeFormValidation())
      // closeFormValidation()
    }

    const getWorkerTask = async (id) => {
      const res = await fetch(`https://nartina.com/api/user/get-worker-task/${id}`);
      const result = await res.json();
      setWorkerFullTask(result)
      setEditTask(true)
  }


  const sendWhatsApp = () => {
    const message = `תאריך סיום  ${endDate}, משימה - ${workerTask} , לחץ  על הלינק לאישור קבלת הודעה - https://nartina.com/api/user/confirm-task/${ide}`
    const api = `https://cbot.live/api/send.php?number=972${workerPhone.substring(1)}&type=text&message=${message}&instance_id=640D8E5F4D7C0&access_token=8616d8381676900e2305ff935529d49d`
    axios.post(api, {
      
    })
    .then(res => {console.log(res)
    console.log("OK!!!!!!!")})
    .catch(err => {console.log(err)
    console.log("ERORR!!!!!!!!!!!!!!")})
    // window.location.href = `https://wa.me/972${workerPhone}?text=${encodeURIComponent(message)}`;
    setDialog3(false)
    closeDialog3()
  }


  const sendWhatsApp2 = () => {
        const message = `תאריך סיום  ${endDate}, משימה - ${workerTask} , לחץ  על הלינק לאישור קבלת הודעה - https://nartina.com/api/user/confirm-task/${ide}`
        window.location.href = `https://wa.me/972${workerPhone}?text=${encodeURIComponent(message)}`;
        setDialog3(false)
        closeDialog3()
  }


  const sendMail = () => {
    const emailBody = " תאריך סיום " + endDate + " משימה " + workerTask + " , לחץ על הלינק לאישור קבלת הודעה - " +  "https://nartina.com/api/user/confirm-task/" + ide
    axios.get("https://nartina.com/api/user/email-test-link", {
    params: {
        to: workerEmail,
        from: result?.email,
        text: emailBody,
        subject: "משימה"
    }
})
    .then(res => {console.log(res.data)
      Swal.fire("!נשלח", '! אימייל נשלח בהצלחה', "success");
      // setMailAlert(true)
      setDialog2(false)
      closeDialog2()})
    .catch(err => {console.log(err.response.data)
      Swal.fire("מצטערים", 'קרתה תקלה, אימייל לא נשלח', "error")})
  
  }

  const getTask2 = (id, mail, start, end, name) => {
    if(!mail) {
      Swal.fire("מצטערים", ' קרתה תקלה, לא ניתן לשלוח אימייל, מכיוון שלא מוגדרת לעובד כתובת אימייל', "error" )
      return
    }
    axios.get("https://nartina.com/api/user/worker-task/" + id)
    .then(res => {setWorkerTask(res.data)
      setWorkerEmail(mail)
      setIde(id)
      setWorkerName(name)
      setStartDate(start)
      setEndDate(end)})
    .catch(err => console.log(err.response.data))
    setDialog2(true)
    // .finally(sendMail(mail, workerTask))
  }

  const getTask3 = (id, phone, start, end, name) => {
    if(!phone) {
      Swal.fire("מצטערים", ' קרתה תקלה, לא ניתן לשלוח ווטסאפ לעובד, מכיוון שלא מוגדר מספר טלפון לעובד' , "error")
      return
    }
    axios.get("https://nartina.com/api/user/worker-task/" + id)
    .then(res => {setWorkerTask(res.data)
      setWorkerPhone(phone)
      setIde(id)
      setWorkerName(name)
      setStartDate(start)
      setEndDate(end)})
    .catch(err => console.log(err.response.data))
    setDialog3(true)
    // .finally(sendMail(mail, workerTask))
  }
  

    const updateWorkerTask = (e) => {
      e.preventDefault();
      axios.post("https://nartina.com/api/user/update-worker-task/" + ide , {
          status: status != "" ? status : workerFullTask?.status,
          task: task1 != "" ? task1 : workerFullTask?.task,
          workerName: workerFullName != "" ? workerFullName : workerFullTask.workerName,
          priority: priority != "" ? priority : workerFullTask?.priority,
          startDate: startDate != "" ? startDate : workerFullTask?.startDate,
          endDate: endDate != "" ? endDate : workerFullTask?.endDate
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
      .then(res => {console.log(res.data)
      // setReload(true)
      localStorage.setItem('workersTasks', true)
      refetch()
      setIsOpenAlertIncome(true)
      setEditTask(false)})
      .catch(err => console.log(err.response.data))
      // .finally(setReload(false))
      
    }

    const closeDialog = () => {
      setWorkerTask("")
      setDialog(false)
    }

    const closeDialog2 = () => {
      setWorkerTask("")
      setWorkerEmail("")
      setDialog2(false)
    }

    const closeDialog3 = () => {
      setWorkerTask("")
      setWorkerPhone("")
      setDialog3(false)
    }

  //   const saveWorkerId = event => {
  //     const { myValue } = event.currentTarget.dataset;
  //     console.log(myValue) // --> 123
  //     const x = parseInt(myValue)
  //     setWorkerId(myValue)
  
  // }

  // const handleChangeWorkerName = (e) => {
  //   console.log("the value is: " + e.target.value);
  //   // setWorkerFullname(e.target.value)
  //   setWorkerFullName(e.target.value)
  
  // }


  const handleChangeStatusHebrew = (e) => {
    console.log("the value is: " + e.target.value);
    setStatusHebrew(e.target.value)
    switch (e.target.value) {
      case  "התחלה":
        setStatus("START")
        break;
      case  "בתהליך":
        setStatus("PROCESS")
        break;
      case  "בדיקה":
        setStatus("PENDING")
        break;
      case  "הסתיים":
        setStatus("END")
        break;
     
    }
  }
  

  const handleChangePriorityHebrew = (e) => {
    console.log("the value is: " + e.target.value);
    setPriorityHebrew(e.target.value)
    switch (e.target.value) {
      case  "לא דחוף":
        setPriority("VERY_LOW")
        break;
      case  "דחוף":
        setPriority("LOW")
        break;
      case  "דחוף מאוד":
        setPriority("HIGH")
        break;
      case  "קריטי":
        setPriority("VERY_HIGH")
        break;
     
    }
  }

  // const closeTasks = () => {
  //   setWorkerFullName("")
  //   setStartDate("")
  //   setEndDate("")
  //   setTask("")
  //   setStatus("")
  //   setStatusHebrew("")
  //   setPriorityHebrew("")
  //   setPriority("")
  //   setOpenTask(false)
  // }

  const editTheTask = (id) => {
    setIde(id)
    getWorkers()
    getWorkerTask(id)
    
  }

  const updateFinishTask = (id) => {
    axios.get("https://nartina.com/api/user/set-task-finished/" + id)
    .then(res => {console.log(res.data)
      localStorage.setItem('workersTasks', true)
    refetch()})
    .catch(err => console.log(err.response.data))
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

      const handleClose = () => {
        setIsOpenAlertIncome(false)
      }

      const handleClose2 = () => {
        setOpenAddAlert(false)
      }

      const handleClose5 = () => {
        setRateAlert(false)
      }

      const handleChangeSalary = (e) => {
        console.log("the value is: " + e.target.value);
        setWorkerFullName(e.target.value)
        const selectedOption = e.target.options[e.target.selectedIndex];
        const myValue = selectedOption.getAttribute("data-my-value");
        setWorkerId(myValue)
        console.log("Selected value: " + myValue);
        
      }

      const closeRate = () => {
        setRate(false)
        setRating("")
      }

      const postRate = () => {
        axios.get("https://nartina.com/api/user/rate-worker-task/" + ide + "/" + rating)
    .then(res => {console.log(res.data)
      setTask(res.data)
      // localStorage.setItem('workersTasks', true)
      setRateAlert(true)
      closeRate()
    refetch()})
    .catch(err => console.log(err.response.data))
      }

      
  return (
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
                <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> {setOpenTask(true)
                    getWorkers()}}>
                         add new task
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
                        <th scope="col" className="px-1 text-center py-2">worker name</th>
                        <th scope="col" className="px-1 text-center py-2">start date</th>
                        <th scope="col" className="px-1 text-center py-2">status</th>
                        <th scope="col" className="px-1 text-center py-2">priority</th>
                        <th scope="col" className="px-1 text-center py-2">end date</th>
                        <th scope="col" className="px-1 text-center py-2">finished?</th>
                        <th scope="col" className="px-1 text-center py-2">email</th>
                        <th scope="col" className="px-1 text-center py-2">message</th>
                        <th scope="col" className="px-1 text-center py-2">edit</th>
                        <th scope="col" className="px-1 text-center py-2">delete</th>
                        <th scope="col" className="px-1 text-center py-2">task</th>

                        </tr>
                    </thead>
                    <tbody>
                    {data?.data.content.map((supplier, index) => (
                <tr key={supplier.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
                  <td scope="col" className={`px-1 text-center py-2`}>{supplier.workerName}</td>
                  <td scope="col" className="px-1 text-center py-2">{supplier.startDate}</td>
                  <td scope="col" className="px-1 text-center text-xs font-semibold font-mono ">
              
                 {supplier.status == "START" && (
    <div>
      <h1 className="font-mono text-xs text-gray-500 text-left dark:text-neutral-300">START</h1>
    <div className="flex items-center justify-start bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-yellow-500 h-full rounded-full w-1/5"></div>
    </div>
    </div>
    )}
    {supplier.status == "END" && (
      <div>
        <h1 className="font-mono text-xs text-gray-500 text-left dark:text-neutral-300">END</h1>
        <div className="flex items-center justify-start bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-green-500 h-full rounded-full w-[100%]"></div>
    </div>
      </div>
    )}
    {supplier.status == "PROCESS" && (
      <div>
         <h1 className="font-mono text-xs text-gray-500 text-left dark:text-neutral-300">PROCESS</h1>
      <div className="flex items-center justify-start bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-purple-500 h-full rounded-full w-2/5"></div>
    </div>
      </div>
    )}
    {supplier.status == "PENDING" && (
      <div>
        <h1 className="font-mono text-xs text-gray-500 text-left dark:text-neutral-300">PENDING</h1>
        <div className="flex items-center justify-start bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-pink-500 h-full rounded-full w-3/5"></div>
    </div>
      </div>
    )}
              </td>
              <td scope="col" className="flex items-center justify-center px-1 py-3 mt-1 text-center text-xs">
          <div className={`flex items-center justify-center ${supplier.priority == "FINISHED" ? "bg-green-500 text-white" : supplier.priority == "VERY_LOW" ? "bg-blue-300 text-blue-600" : supplier?.priority == "VERY_HIGH" ? "bg-red-300 text-red-600 " : supplier?.priority == "HIGH" ? "bg-red-200 text-red-600" : supplier?.priority == "LOW" ? "bg-yellow-300 text-[#333]" : "bg-gray-400"} ${supplier.priority == "VERY_HIGH" && 'animate-pulse'} py-[1px] px-2 w-fit text-xs font-semibold rounded-md`}>
          {supplier.priority == "VERY_HIGH" && <NotificationImportantOutlinedIcon className='animate-pulse' style={{fontSize: '15px'}} fontSize="small"/>}{supplier.priority}
            </div>
          </td>
          <td scope="col" className="px-1 text-center py-2">{supplier.endDate}</td>
          <td scope="col" className="px-1 text-center py-1 text-xs">
            {supplier?.finished ? <>
         <Android12Switch
          checked={supplier?.finished}
          onChange={()=> updateFinishTask(supplier.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> updateFinishTask(supplier.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> getTask2(supplier.id, supplier?.workerEmail, supplier?.startDate, supplier?.endDate, supplier.workerName)}>
                <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-purple-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-green-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> getTask3(supplier.id, supplier?.workerPhone, supplier?.startDate, supplier?.endDate, supplier.workerName)}>
               <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600 dark:text-green-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editTheTask(supplier?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(supplier.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>

              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> getTask(supplier.id, supplier?.startDate, supplier?.endDate, supplier.workerName)}>
                <h1 className='text-blue-600 hover:text-blue-700 font-semibold text-[10px] dark:text-blue-500 tracking-wide'>TASK</h1>
              </div>
            </td>
            
              </tr>
            ))}
                       
                    </tbody>
                </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
           <div className='hidden xru:flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
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
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> {setOpenTask(true)
                    getWorkers()}}>
                       הכנס משימה חדשה
                   </button>
                   <div class="flex items-center space-x-3 w-full md:w-auto relative">
                       <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                           <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                           אפשרויות
                       </button>
                       {/* <div class={`${!action && 'hidden'} p-4 z-10 w-44 absolute top-10 flex flex-col space-y-1 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setFlag(!flag)}>
                              <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                              <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Print</h1>
                            </div>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setOpenDailyIncomeReport(true)}>
                             <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                             <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
                           </div>
                       </div> */}
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
                       {/* <a href="https://tofes101.co.il/assets/forms/tofes-101.pdf" target="_blank">
                  <div className='bg-blue-500 hover:bg-blue-400 dark:bg-blue-600 rounded px-2 py-[1px] text-white text-sm'>
                    <h1 className='text-white font-mono tracking-wide'>טופס 101</h1>
                  </div>
                 </a> */}
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
              <th scope="col" className="px-1 text-center py-2">משימה</th>
              <th scope="col" className="px-1 text-center py-2">מחק</th>
              <th scope="col" className="px-1 text-center py-2">ערוך</th>
              <th scope="col" className="px-1 text-center py-2">הודעה</th>
              <th scope="col" className="px-1 text-center py-2">מייל</th>
              <th scope="col" className="px-1 text-center py-2">?התקבל</th>
              <th scope="col" className="px-1 text-center py-2">הסתיים</th>
              <th scope="col" className="px-1 text-center py-2">יעד סיום</th>
              <th scope="col" className="px-1 text-center py-2">דחיפות</th>
              <th scope="col" className="px-1 text-center py-2">סטטוס</th>
              <th scope="col" className="px-1 text-center py-2">תאריך משימה</th>
              <th scope="col" className="px-1 text-center py-2">שם עובד</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {data?.data.content.map((supplier, index) => (
                <tr key={supplier.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
              <td scope="col" className="px-1 text-center py-1 text-xs">
              <div className="flex justify-center items-center bg-blue-700 hover:bg-blue-800 dark:bg-slate-600 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> getTask(supplier.id)}>
                <h1 className='text-white font-semibold tracking-wide my-1 text-[10.5px] dark:text-blue-500'>משימה</h1>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              {/* <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(supplier.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div> */}
              <button type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=> handleAlert(supplier.id)}>
                  <svg aria-hidden="true" className="w-5 h-5 -mr-2.5 -ml-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              </button>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              {/* <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editTheTask(supplier?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div> */}
               <button type="button" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=> editTheTask(supplier?.id)}>
                  <svg aria-hidden="true" className="-mr-2.5 -ml-2.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
              </button>         
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              {/* <div className="inline-flex text-xs leading-5 bg-green-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> getTask3(supplier.id, supplier?.workerPhone, supplier?.startDate, supplier?.endDate, supplier.workerName)}>
               <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600 dark:text-green-500'/>
              </div> */}
              <button type="button" className="text-white inline-flex items-center bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-green-700 dark:focus:ring-blue-800" onClick={()=> getTask3(supplier.id, supplier?.workerPhone, supplier?.startDate, supplier?.endDate, supplier.workerName)}>
                  <WhatsAppIcon className='-mr-3 -ml-3 -my-0.5 text-white dark:text-green-500'/>
              </button>  
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              {/* <div className="inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> getTask2(supplier.id, supplier?.workerEmail, supplier?.startDate, supplier?.endDate, supplier.workerName)}>
                <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-purple-500'/>
              </div> */}
              <button type="button" className="text-white flex justify-center items-center relative left-1.5 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-purple-700 dark:focus:ring-blue-800" onClick={()=> getTask2(supplier.id, supplier?.workerEmail, supplier?.startDate, supplier?.endDate, supplier.workerName)}>
                  {/* <MailIcon fontSize='small' className='-mr-2.5 -ml-2.5 text-white dark:text-purple-600'/> */}
                  <svg class="w-[18px] h-[18px] my-[1px] -mr-3 -ml-3 text-white dark:text-violet-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                  </svg>
              </button>   
            </td>
            <td scope="col" className="px-1 text-center py-1 text-xs">
            {/* {supplier?.confirm ? <> */}
         <Android12Switch
          checked={supplier?.confirm}
          // onChange={()=> updateFinishTask(supplier.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
      
      
       
            </td>
            <td scope="col" className="px-1 text-center py-1 text-xs">
            {supplier?.finished ? <>
         <Android12Switch
          checked={supplier?.finished}
          onChange={()=> updateFinishTask(supplier.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> updateFinishTask(supplier.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              <td scope="col" className="px-1 text-center py-2">{supplier.endDate}</td>
               
              <td scope="col" className="flex items-center justify-center px-1 py-3 mt-1 text-center text-xs">
          <div className={`flex items-center justify-center ${supplier.priority == "FINISHED" ? "bg-green-500 text-white" : supplier.priority == "VERY_LOW" ? "bg-blue-300 text-blue-600" : supplier?.priority == "VERY_HIGH" ? "bg-red-300 text-red-600 " : supplier?.priority == "HIGH" ? "bg-red-200 text-red-600" : supplier?.priority == "LOW" ? "bg-yellow-300 text-[#333]" : "bg-gray-400"} ${supplier.priority == "VERY_HIGH" && 'animate-pulse'} py-[2px] px-2 w-fit text-xs font-semibold rounded-md`}>
          {supplier.priority == "VERY_HIGH" && <NotificationImportantOutlinedIcon className='animate-pulse' style={{fontSize: '15px'}} fontSize="small"/>}{supplier.priority == "FINISHED" ? "הסתיים" : supplier.priority == "LOW" ? "דחוף" : supplier.priority == "VERY_LOW" ? "לא דחוף" : supplier.priority == "HIGH" ? "דחוף מאוד" : supplier.priority == "VERY_HIGH" ? "קריטי" : "-"}
            </div>
          </td>
              <td scope="col" className="px-1 text-center text-xs font-semibold font-mono ">
              
                 {supplier.status == "START" && (
    <div>
      <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">התחלה</h1>
    <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-yellow-500 h-full rounded-full w-1/5"></div>
    </div>
    </div>
    )}
    {supplier.status == "END" && (
      <div>
        <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">הסתיים</h1>
        <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-green-500 h-full rounded-full w-[100%]"></div>
    </div>
      </div>
    )}
    {supplier.status == "PROCESS" && (
      <div>
         <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">בתהליך</h1>
      <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-purple-500 h-full rounded-full w-2/5"></div>
    </div>
      </div>
    )}
    {supplier.status == "PENDING" && (
      <div>
        <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">בדיקה</h1>
        <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-pink-500 h-full rounded-full w-3/5"></div>
    </div>
      </div>
    )}
              </td>
              <td scope="col" className="px-1 text-center py-2">{supplier.startDate}</td>
              <td scope="col" className={`px-1 text-center py-2 font-semibold`}>{supplier.workerName}</td>
              </tr>
            ))}
                            
                
                    </tbody>
                </table>
            </div>
            <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {data?.data.content.map(supplier => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-2`}>
                <div className="p-4 blue-glassmorphism hover:bg-gray-900 shadow rounded flex flex-col space-y-1">

                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{supplier.workerName}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>שם עובד</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{supplier.startDate}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>תאריך משימה</div>
                </div>
               
                <div className='flex items-center justify-end space-x-4'>
            <div className={`flex items-center justify-center ${supplier.priority == "FINISHED" ? "bg-green-500 text-white" : supplier.priority == "VERY_LOW" ? "bg-blue-300 text-blue-600" : supplier?.priority == "VERY_HIGH" ? "bg-red-300 text-red-600 " : supplier?.priority == "HIGH" ? "bg-red-200 text-red-600" : supplier?.priority == "LOW" ? "bg-yellow-300 text-[#333]" : "bg-gray-400"} ${supplier.priority == "VERY_HIGH" && 'animate-pulse'} py-[2.5px] px-2 w-fit text-xs font-semibold rounded-md`}>
              {supplier.priority == "VERY_HIGH" && <NotificationImportantOutlinedIcon className='animate-pulse' style={{fontSize: '15px'}} fontSize="small"/>}{supplier.priority == "FINISHED" ? "הסתיים" : supplier.priority == "LOW" ? "דחוף" : supplier.priority == "VERY_LOW" ? "לא דחוף" : supplier.priority == "HIGH" ? "דחוף מאוד" : supplier.priority == "VERY_HIGH" ? "קריטי" : "-"}
            </div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>דחיפות</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{supplier.endDate}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>יעד סיום</div>
                </div>
                <div className='flex items-center justify-end space-x-1'>
                <div scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
                {supplier?.finished ? <>
         <Android12Switch
          checked={supplier?.finished}
          onChange={()=> updateFinishTask(supplier.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> updateFinishTask(supplier.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
  </div>
                <div className='text-right dark:text-[#ccc]'>?הסתיים</div>
                </div>
                <div className='flex items-center justify-end space-x-1 relative bottom-4'>
                <div scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
                <Android12Switch
          checked={supplier?.confirm}
          // onChange={()=> updateFinishTask(supplier.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
  </div>
                <div className='text-right dark:text-[#ccc]'>?התקבל</div>
                </div>
                <div className='flex items-center justify-end space-x-4 relative bottom-4'>
                <div className='text-right font-mono dark:text-[#ccc]'>
                {supplier.status == "START" && (
    <div className=''>
      <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">התחלה</h1>
    <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-yellow-500 h-full rounded-full w-1/5"></div>
    </div>
    </div>
    )}
    {supplier.status == "END" && (
      <div>
        <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">הסתיים</h1>
        <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-green-500 h-full rounded-full w-[100%]"></div>
    </div>
      </div>
    )}
    {supplier.status == "PROCESS" && (
      <div>
         <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">בתהליך</h1>
      <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-purple-500 h-full rounded-full w-2/5"></div>
    </div>
      </div>
    )}
    {supplier.status == "PENDING" && (
      <div>
        <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">בדיקה</h1>
        <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-pink-500 h-full rounded-full w-3/5"></div>
    </div>
      </div>
    )}
                </div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>סטטוס</div>
                </div>
                <div className='flex items-center justify-end -space-x-2 relative bottom-1'>
                <div class="px-6 py-3 text-center whitespace-nowrap">
                {supplier?.rating == "ONE" && (
     <label for="one-star" class="flex items-center ml-2">
     <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>First star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Second star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
 </label>
  )}
  {supplier?.rating == "TWO" && (
     <label for="two-stars" class="flex items-center ml-2">
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
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
 </label>
  )}
  {supplier?.rating == "THREE" && (
    <label for="three-stars" class="flex items-center ml-2">
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
</label>
  )}
  {supplier?.rating == "FOUR" && (
    <label for="four-stars" class="flex items-center ml-2">
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
</label>
  )}
  {supplier?.rating == "FIVE" && (
    <label for="five-stars" class="flex items-center ml-2">
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
</label>
  )}
</div>
                <div className='text-right dark:text-[#ccc]'>דירוג</div>
                </div>
                <div className='flex items-center justify-end space-x-4 relative top-1'>
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> getTask(supplier.id, supplier?.startDate, supplier?.endDate, supplier.workerName)}>
                <h1 className='text-blue-600 hover:text-blue-700 font-semibold text-[10px] dark:text-blue-500'>משימה</h1>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(true)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editTheTask(supplier?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> getTask3(supplier.id, supplier?.workerPhone, supplier?.startDate, supplier?.endDate, supplier.workerName)}>
               <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600 dark:text-green-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> getTask2(supplier.id, supplier?.workerEmail, supplier?.startDate, supplier?.endDate, supplier.workerName)}>
               <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-violet-500'/>
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
   
         

<Dialog open={editTask}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> setEditTask(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                    עדכן משימת עובדים 
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
            <form onSubmit={updateWorkerTask}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                
                    <div className='col-span-1 sm:col-span-2'>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר עובד</label>
                      </div>     
                      {/* <select value={workerFullName} name='type' onChange={handleChangeSalary} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">בחר עובד</option>
                              {workers.map(worker => (
                              <option className='text-right' value={worker.fullName} data-my-value={worker.id}>{worker.active && worker.fullName}</option>
                              ))}
                          </select> */}
                           <select value={workerFullName} name='type' onChange={handleChangeSalary} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">{workerFullTask?.workerName}</option>
                              {workers.map(worker => (
                              <option className='text-right' value={worker.fullName} data-my-value={worker.id}>{worker.active && worker.fullName}</option>
                              ))}
                          </select>
                    </div>
                  <div>
                      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תאריך סיום</label>
                      <input type="date" name="phoneNumber" defaultValue={workerFullTask?.endDate} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" onChange={(e)=> setEndDate(e.target.value)}/>
                  </div>
                  <div>
                    <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תאריך התחלה</label>
                    <input type="date" name="phoneNumber" defaultValue={workerFullTask?.startDate} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" onChange={(e)=> setStartDate(e.target.value)}/>
                </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר עדיפות</label>
                      </div>     
                      <select name='type' onChange={handleChangePriorityHebrew} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">{workerFullTask?.priority}</option>
                              {hebrewPriorities.map(m => (
                              <option className='text-right' value={m}>{m}</option>
                              ))}
                          </select>
                    </div>
                    {/* <div>
                     <div className='flex justify-end items-center space-x-1'>
                      <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">סכום ברוטו</label>
                     </div>
                      <input type="text" name="agentPhone" placeholder="סכום ברוטו" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> alert(e.target.value)}/>
                  </div> */}
                  <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר סטטוס</label>
                      </div>     
                      <select name='type' onChange={handleChangeStatusHebrew} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">{workerFullTask?.status}</option>
                              {hebrewStatuses.map(y => (
                              <option className='text-right' value={y}>{y}</option>
                              ))}
                          </select>
                    </div>          
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">משימה</label>
                        <textarea defaultValue={workerFullTask?.task} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="הכנס פרטי משימה" onChange={(e)=> setTask1(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeFormValidation}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  הכנס משימה 
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

    <Dialog open={dialog2}>
    <div id="readProductModal" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:h-full">
    <div class="relative p-4 w-full max-w-xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5">
                {/* <!-- Modal header --> */}
                <div class="flex justify-between mb-4 rounded-t sm:mb-5">
                    <div>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal" onClick={closeDialog2}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="text-lg text-gray-900 md:text-xl dark:text-white">
                        <h3 class="font-bold text-right">
                           משימה
                        </h3>
                        <p class="font-bold text-gray-500 text-right">
                          {workerName}
                        </p>
                        <p class="font-bold text-gray-500 text-right font-mono tracking-wide">
                          {workerEmail}
                        </p>
                    </div>
                </div>
                <dl>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">פרטים</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{workerTask}</dd>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">תאריך התחלה</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{startDate}</dd>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">תאריך סיום</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{endDate}</dd>
                </dl>
                <div class="flex justify-between items-center min-w-[230px]">
                    <div class="flex items-center space-x-3 sm:space-x-4">
                        <button type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={sendMail}>
                            <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                            שלח משימה
                        </button>               
                        {/* <button type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Preview
                        </button> */}
                    </div>              
                    <button type="button" class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeDialog2}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        סגור
                    </button>
                </div>
                </div>
            </div>
        </div>
        </Dialog>

        <Dialog open={dialog3}>
    <div id="readProductModal" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:h-full">
    <div class="relative p-4 w-full max-w-xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5">
                {/* <!-- Modal header --> */}
                <div class="flex justify-between mb-4 rounded-t sm:mb-5">
                    <div>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal" onClick={closeDialog3}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="text-lg text-gray-900 md:text-xl dark:text-white">
                        <h3 class="font-bold text-right">
                           משימה
                        </h3>
                        <p class="font-bold text-gray-500 text-right">
                          {workerName}
                        </p>
                        <p class="font-bold text-gray-500 text-right font-mono tracking-wide">
                          {workerPhone}
                        </p>
                    </div>
                </div>
                <dl>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">פרטים</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{workerTask}</dd>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">תאריך התחלה</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{startDate}</dd>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">תאריך סיום</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{endDate}</dd>
                </dl>
                <div class="flex flex-col space-y-3 min-w-[230px]">
                    <div class="flex items-center justify-between space-x-3 sm:space-x-4">
                        <button type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={sendWhatsApp}>
                            <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                            שלח משימה
                        </button>               
                        <button type="button" class="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={sendWhatsApp2}>
                             <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                            ווטסאפ אישי
                        </button>
                    </div>              
                    <button type="button" class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeDialog3}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                       <h1 className='text-right self-end'> סגור</h1>
                    </button>
                </div>
                </div>
            </div>
        </div>
        </Dialog>

        <Dialog open={dialog}>
    <div id="readProductModal" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:h-full">
    <div class="relative p-4 w-full max-w-xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5">
                {/* <!-- Modal header --> */}
                <div class="flex justify-between mb-4 rounded-t sm:mb-5">
                    <div>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal" onClick={closeDialog}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="text-lg text-gray-900 md:text-xl dark:text-white">
                        <h3 class="font-bold text-right">
                           שם עובד/ת
                        </h3>
                        <p class="font-bold text-gray-500 text-right">
                          {workerName}
                        </p>
                        {/* <p class="font-bold text-gray-500 text-right font-mono tracking-wide">
                          {workerEmail}
                        </p> */}
                    </div>
                </div>
                <dl>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">פרטים</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{task?.task}</dd>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">תאריך התחלה</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{task?.startDate}</dd>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">תאריך סיום</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{task?.endDate}</dd>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">דירוג</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right flex justify-end">
                    {task?.rating == "ONE" && (
     <label for="one-star" class="flex items-center ml-2">
     <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>First star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Second star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
 </label>
  )}
  {task?.rating == "TWO" && (
     <label for="two-stars" class="flex items-center ml-2">
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
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
 </label>
  )}
  {task?.rating == "THREE" && (
    <label for="three-stars" class="flex items-center ml-2">
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
</label>
  )}
  {task?.rating == "FOUR" && (
    <label for="four-stars" class="flex items-center ml-2">
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
</label>
  )}
  {task?.rating == "FIVE" && (
    <label for="five-stars" class="flex items-center ml-2">
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
</label>
  )}
                    </dd>
                </dl>
                <div class="flex flex-col justify-end items-end space-y-2 min-w-[230px]">
                    <div class="flex items-center space-x-3 sm:space-x-4">
                        <button type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=> setRate(true)}>
                            <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                           דירוג 
                        </button>               
                        {/* <button type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Preview
                        </button> */}
                    </div>              
                    <button type="button" class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeDialog}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        סגור
                    </button>
                </div>
                </div>
            </div>
        </div>
        </Dialog>


    <Dialog open={rate} aria-labelledby="responsive-dialog-title">
    <div class="space-y-2 px-10 pb-8 pt-5">
                <h6 class="text-base text-right font-medium text-black dark:text-white">
                    דרג ביצוע משימה
                </h6>

                <div class="flex items-center mb-4">
                    <input id="five-stars" type="radio" value="" name="rating"
                        class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setRating('FIVE')}/>
                    <label for="five-stars" class="flex items-center ml-2">
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
                    </label>
                </div>

                <div class="flex items-center">
                    <input id="four-stars" type="radio" value="" name="rating" 
                        class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setRating('FOUR')}/>
                    <label for="four-stars" class="flex items-center ml-2">
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
                    </label>
                </div>

                <div class="flex items-center">
                    <input id="three-stars" type="radio" value="" name="rating"
                        class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setRating('THREE')}/>
                    <label for="three-stars" class="flex items-center ml-2">
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
                    </label>
                </div>

                <div class="flex items-center">
                    <input id="two-stars" type="radio" value="" name="rating"
                        class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setRating('TWO')}/>
                    <label for="two-stars" class="flex items-center ml-2">
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
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
                    </label>
                </div>

                <div class="flex items-center">
                    <input id="one-star" type="radio" value="" name="rating"
                        class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setRating('ONE')}/>
                    <label for="one-star" class="flex items-center ml-2">
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>First star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Second star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
                    </label>
                </div>
                <button className='flex justify-center items-center mx-auto mt-2 bg-blue-500 text-white px-3 py-[1px] rounded hover:bg-blue-400 transition-all duration-300' onClick={closeRate}>סגור</button>
                <button className='flex justify-center items-center mx-auto mt-2 bg-blue-500 text-white px-3 py-[1px] rounded hover:bg-blue-400 transition-all duration-300' onClick={postRate}>דרג משימה</button>

            </div>
    </Dialog>

    <Dialog open={openTask}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeFormValidation}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                    הכנס משימת עובדים חדשה
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
            <form onSubmit={postWorkerTask}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                
                    <div className='col-span-1 sm:col-span-2'>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר עובד</label>
                      </div>     
                      <select value={workerFullName} name='type' onChange={handleChangeSalary} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">בחר עובד</option>
                              {workers.map(worker => (
                              <option className='text-right' value={worker.fullName} data-my-value={worker.id}>{worker.active && worker.fullName}</option>
                              ))}
                          </select>
                    </div>
                  <div>
                      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תאריך סיום</label>
                      <input type="date" name="phoneNumber" value={endDate} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" onChange={(e)=> setEndDate(e.target.value)}/>
                  </div>
                  <div>
                    <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תאריך התחלה</label>
                    <input type="date" name="phoneNumber" value={startDate} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" onChange={(e)=> setStartDate(e.target.value)}/>
                </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר עדיפות</label>
                      </div>     
                      <select name='type' onChange={handleChangePriorityHebrew} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">בחר עדיפות</option>
                              {hebrewPriorities.map(m => (
                              <option className='text-right' value={m}>{m}</option>
                              ))}
                          </select>
                    </div>
                    
                  <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר סטטוס</label>
                      </div>     
                      <select name='type' onChange={handleChangeStatusHebrew} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">בחר סטטוס</option>
                              {hebrewStatuses.map(y => (
                              <option className='text-right' value={y}>{y}</option>
                              ))}
                          </select>
                    </div>          
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">משימה</label>
                        <textarea value={task1} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="הכנס פרטי משימה" onChange={(e)=> setTask1(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeFormValidation}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button disabled={task1 == "" || startDate == "" || endDate == "" || status == "" || priority == "" || workerFullName == ""} type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  הכנס משימה 
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
          {hebrew ? 'successfully update the task' : 'משימה עודכנה בהצלחה'}     
             </Alert>
      </Snackbar>

      <Snackbar open={openAddAlert} autoHideDuration={10000} onClose={handleClose2} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose2}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? 'successfully added the task' : 'משימה הוכנסה בהצלחה'}     
             </Alert>
      </Snackbar>

      <Snackbar open={rateAlert} autoHideDuration={10000} onClose={handleClose5} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose5}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? 'successfully rated the task' : 'משימה דורגה בהצלחה'}     
             </Alert>
      </Snackbar>

      
    </section>
  )
}

export default WorkersTasks