import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Dialog } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import { ThemeContext } from "../App";
import { Select, MenuItem, InputLabel, TextField, DialogContent} from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
import rtlPlugin from 'stylis-plugin-rtl';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'
import axios from 'axios';


const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const themes = createTheme({
  direction: 'rtl',
});


const WorkerTasks = () => {
    const { hebrew, globalTheme } = useContext(ThemeContext)
    const [task, setTask] = useState({})
    const [editTask, setEditTask] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [dialog2, setDialog2] = useState(false)
    const [dialog3, setDialog3] = useState(false)
    const [workerTask, setWorkerTask] = useState("")
    const [workerFullTask, setWorkerFullTask] = useState({})
    const [errorRes, setErrorRes] = useState([]);
    const [priority, setPriority] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [status, setStatus] = useState("")
    const [errors, setErrors] = useState()
    // const [workerId, setWorkerId] = useState();
    const [workerFullName, setWorkerFullname] = useState("");
    const [openTask, setOpenTask] = useState(false);
    const [workers, setWorkers] = useState([]);
    const [ide, setIde] = useState("");
    // const [scroll, setScroll] = useState(false)
    const [workerEmail, setWorkerEmail] = useState(false)
    const [workerPhone, setWorkerPhone] = useState(false)
    const [error, setError] = useState()
    const [openAlertIncome, setIsOpenAlertIncome] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [rate, setRate] = useState(false)
    const [rating, setRating] = useState("")
    const [rateAlert, setRateAlert] = useState(false)
    // const [mailAlert, setMailAlert] = useState(false)
    const { taskid } = useParams()



    const statuses = ["PENDING", "START", "END", "PROCESS"]
    const priorities = ["VERY_LOW", "LOW", "HIGH", "VERY_HIGH"]

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const workersTasks = JSON.parse(localStorage.getItem('workersTasks'));

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
    }, [windowHeight, window.innerHeight, windowWidth, window.innerWidth]);

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

    const getTasks = () => {
      return axios.get('https://nartina.com/api/user/worker-tasks/' + taskid)
    }
    
    const {data, refetch} = useQuery('worker-tasks', ()=> getTasks(),
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
      console.log(res.data)})
      .catch(err => console.log(err.response.data))
      setDialog(true)
    }

    // const getWorkerTask = (id) => {
    //   axios.get("https://nartina.com/api/user/get-worker-task/" + id)
    //   .then(res => {setWorkerFullTask(res.data)
    //   console.log(res.data)})
    //   .catch(err => console.log(err.response.data))
    // }

    const getWorkerTask = async (id) => {
        const res = await fetch(`https://nartina.com/api/user/get-worker-task/${id}`);
        const result = await res.json();
        setWorkerFullTask(result)
        setEditTask(true)
    }

    const updateWorkerTask = (e) => {
      e.preventDefault();
      axios.post("https://nartina.com/api/user/update-worker-task/" + ide , {
          status: status != "" ? status : workerFullTask?.status,
          task: task != "" ? task : workerFullTask?.task,
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

  //   const saveWorkerId = event => {
  //     const { myValue } = event.currentTarget.dataset;
  //     console.log(myValue) // --> 123
  //     const x = parseInt(myValue)
  //     setWorkerId(myValue)
  
  // }

  // const handleChangeWorkerName = (e) => {
  //   console.log("the value is: " + e.target.value);
  //   setWorkerFullname(e.target.value)
  
  // }
  
  const handleChangeStatus = (e) => {
    console.log("the value is: " + e.target.value);
    setStatus(e.target.value)
  
  }
  
  const handleChangePriority = (e) => {
    console.log("the value is: " + e.target.value);
    setPriority(e.target.value)
  
  }

  const closeTasks = () => {
    setWorkerFullname("")
    setStartDate("")
    setEndDate("")
    setStatus("")
    setPriority("")
    setOpenTask(false)
  }

  const editTheTask = (id) => {
    setIde(id)
    getWorkers()
    getWorkerTask(id)
    // setEditTask(true)
  }

  const sendWhatsApp = () => {
    // axios.get("https://nartina.com/api/user/worker-phone/" + id)
    // .then(res => window.location.href = "https://wa.me/972" + res.data)
    // .catch(err => console.log(err))
    // window.location.href = "https://wa.me/972" + phone
    // const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent("xxx")}`;
    // window.location.href = whatsappLink;

    const message = `תאריך סיום  ${ startDate } משימה ${workerTask}`

    window.location.href = `https://wa.me/972${workerPhone}?text=${encodeURIComponent(message)}`;
    setDialog3(false)
    closeDialog3()
  }

  // const sendMail = () => {
  //     window.location.href = "mailto:" + workerEmail + "?subject=" + "משימה" + "&body= " + " תאריך סיום " + endDate + " משימה " + workerTask
  //     setDialog2(false)
  //     closeDialog2()
  // }

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
      // setMailAlert(true)
      Swal.fire("!נשלח", '! אימייל נשלח בהצלחה', "success")
      setDialog2(false)
      closeDialog2()})
    .catch(err => {console.log(err.response.data)
      Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error")})
  
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

  const getTask2 = (id, mail, start, end) => {
    if(!mail) {
      Swal.fire("מצטערים", ' קרתה תקלה, לא ניתן לשלוח אימייל, מכיוון שלא מוגדרת לעובד כתובת אימייל', "error" )
      return
    }
    axios.get("https://nartina.com/api/user/worker-task/" + id)
    .then(res => {setWorkerTask(res.data)
      setWorkerEmail(mail)
      setIde(id)
      setStartDate(start)
      setEndDate(end)})
    .catch(err => console.log(err.response.data))
    setDialog2(true)
    // .finally(sendMail(mail, workerTask))
  }

  const getTask3 = (id, phone, start, end) => {
    if(!phone) {
      Swal.fire("מצטערים", ' קרתה תקלה, לא ניתן לשלוח ווטסאפ לעובד, מכיוון שלא מוגדר מספר טלפון לעובד' , "error")
      return
    }
    axios.get("https://nartina.com/api/user/worker-task/" + id)
    .then(res => {setWorkerTask(res.data)
      setWorkerPhone(phone)
      setStartDate(start)
      setEndDate(end)})
    .catch(err => console.log(err.response.data))
    setDialog3(true)
    // .finally(sendMail(mail, workerTask))
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

      const handleClose = () => {
        setIsOpenAlertIncome(false)
      }

      const handleClose5 = () => {
        setRateAlert(false)
      }

      const closeRate = () => {
        setRate(false)
        setRating("")
      }

      const postRate = () => {
        axios.get("https://nartina.com/api/user/rate-worker-task/" + ide + "/" + rating)
    .then(res => {console.log(res.data)
      // localStorage.setItem('workersTasks', true)
      setRateAlert(true)
      closeRate()
    refetch()})
    .catch(err => console.log(err.response.data))
      }

      // const handleCloseMail = () => {
      //   setMailAlert(false)
      // }

  return (
    <div class={`bg-gray-50 ${hebrew ? 'airx:ml-[270px]' : 'airx:mr-[260px] ml-2'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${globalTheme != "light" && "bg-gray-700 dark"}`}>
    <div className="pr-1 hidden md:block"> 
         <table className="min-w-full divide-y border-separate border-spacing-y-1 table-auto divide-gray-200 border-[#ccc] border-b-2">
          <thead className="blue-glassmorphism sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">משימה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מחק</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">ערוך</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הודעה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מייל</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הסתיים</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">יעד סיום</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">דחיפות</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סטטוס</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך משימה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם עובד</th>
              {/* <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th> */}
            </tr>
          </thead>

            <>
            <tbody className="divide-y divide-gray-200">
            {data?.data.map((supplier, index) => (
              <tr key={supplier.id} className={`border ${index % 2 === 0 ? 'bg-blue-100 dark:bg-blue-300' : 'bg-gray-100 dark:bg-sky-300'} hover:bg-sky-200 my-2`}>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> getTask(supplier.id)}>
                <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[12px]'>משימה</h1>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(supplier.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editTheTask(supplier?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-green-300 rounded-lg cursor-pointer py-1 px-1" onClick={()=> getTask3(supplier.id, supplier?.workerPhone, supplier?.startDate, supplier?.endDate)}>
               <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="inline-flex text-xs leading-5 bg-purple-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> getTask2(supplier.id, supplier?.workerEmail, supplier?.startDate, supplier?.endDate)}>
               <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-purple-400'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
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
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{supplier.endDate}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
               <td scope="col" className="px-1 text-center text-xs font-semibold font-mono ">
                <div className={`${supplier.priority == "FINISHED" ? "bg-green-500" : supplier.priority == "VERY_LOW" ? "bg-red-300" : supplier?.priority == "VERY_HIGH" ? "bg-red-700" : supplier?.priority == "HIGH" ? "bg-red-500" : supplier?.priority == "LOW" ? "bg-red-400" : "bg-gray-400"} py-1 px-[1px] flex items-center justify-center ${supplier.priority == "VERY_HIGH" && 'animate-pulse'} rounded-full text-white`}>
                {supplier.priority == "FINISHED" ? "הסתיים" : supplier.priority == "LOW" ? "דחוף" : supplier.priority == "VERY_LOW" ? "לא דחוף" : supplier.priority == "HIGH" ? "דחוף מאוד" : supplier.priority == "VERY_HIGH" ? "קריטי" : "-"}
                </div>
              </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center text-xs font-semibold font-mono ">
                {/* <div className={`${supplier.status == "END" ? "bg-red-400" : supplier?.status == "START" ? "bg-blue-400" : supplier?.status == "PROCESS"  ? "bg-green-400" : supplier?.status == "PENDING" ? "bg-purple-500" : "bg-gray-400"} py-1 px-2 rounded-md text-white`}>
                  {supplier.status == "START" ? "התחלה" : supplier.status == "PROCESS" ? "בתהליך" : supplier.status == "PENDING" ? "בדיקה" : supplier.status == "END" ? "הסתיים" : "-"}
                </div> */}
                {supplier.status == "START" && (
    <div>
      <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-500">התחלה</h1>
    <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-yellow-500 h-full rounded-full w-1/5"></div>
    </div>
    </div>
    )}
    {supplier.status == "END" && (
      <div>
        <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-500">הסתיים</h1>
        <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-green-500 h-full rounded-full w-[100%]"></div>
    </div>
      </div>
    )}
    {supplier.status == "PROCESS" && (
      <div>
         <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-500">בתהליך</h1>
      <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-purple-500 h-full rounded-full w-2/5"></div>
    </div>
      </div>
    )}
    {supplier.status == "PENDING" && (
      <div>
        <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-500">בדיקה</h1>
        <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-pink-500 h-full rounded-full w-3/5"></div>
    </div>
      </div>
    )}
              </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{supplier.startDate}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className={`border-r-[14px] ${supplier.status == "END" ? "border-r-red-400" : supplier?.status == "START" ? "border-r-blue-400" : supplier?.status == "PROCESS" ? "border-r-green-400" : supplier?.status == "PENDING" ? "border-r-purple-500" : "border-r-gray-400"} px-1 text-center py-2 text-sm text-gray-800 hover:text-white font-bold font-mono`}>{supplier.workerName}</td>
              {/* <td scope="col" className="px-1 text-center py-2"></td> */}
              </tr>
            ))}
          </tbody>
            </>
        </table>
         </div>
         <div className='grid grid-cols-1 gap-3 md:hidden px-4 mt-2 dark'>
              {data?.data.map(supplier => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'bg-gray-800 hover:bg-gray-900 shadow rounded-lg'} flex flex-col space-y-2`}>
                <div className="p-4 bg-gray-900 hover:bg-gray-800 shadow rounded flex flex-col space-y-1">

                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{supplier.workerName}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>שם עובד</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{supplier.startDate}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>תאריך משימה</div>
                </div>
               
                <div className='flex items-center justify-end space-x-4'>
                <div className={`flex items-center justify-center ${supplier.priority == "FINISHED" ? "bg-green-500 text-white" : supplier.priority == "VERY_LOW" ? "bg-blue-300 text-blue-600" : supplier?.priority == "VERY_HIGH" ? "bg-red-300 text-red-600 " : supplier?.priority == "HIGH" ? "bg-red-200 text-red-600" : supplier?.priority == "LOW" ? "bg-yellow-300 text-[#333]" : "bg-gray-400"} ${supplier.priority == "VERY_HIGH" && 'animate-pulse'} py-[1px] px-2 w-fit text-xs font-semibold rounded-md`}>
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
         
      {/* <Dialog open={dialog}>
         <div className="w-80 h-fit flex flex-col items-center justify-center pb-3 px-2 mx-auto" >
        <div className="flex self-end pt-1" >
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeDialog}/>
        </div>
          <div className="flex items-center justify-center">
            <h1 className='text-lg font-mono text-gray-700 text-center'>{workerTask}</h1>
          </div>
        </div>
      </Dialog> */}
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
                          {task?.workerName}
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

      {/* <Dialog open={dialog2}>
         <div className="w-80 h-fit flex flex-col items-center justify-center pb-3 px-2 mx-auto" >
        <div className="flex self-end pt-1" >
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeDialog2}/>
        </div>
          <div className="flex flex-col items-center justify-center space-y-1">
            <h1 className='text-lg font-mono text-gray-700 text-center'>{workerEmail}</h1>
            <h1>תאריך התחלה</h1>
            <h1 className='text-lg font-mono text-gray-700 text-center'>{startDate}</h1>
            <h1>תאריך סיום</h1>
            <h1 className='text-lg font-mono text-gray-700 text-center'>{endDate}</h1>
            <h1 className='text-lg font-mono text-gray-700 text-center'>{workerTask}</h1>
            <button className='bg-blue-500 px-2 py-[1px] text-sm rounded text-white hover:bg-blue-400 tracking-wide' onClick={sendMail}>שלח משימה</button>
          </div>
        </div>
      </Dialog> */}

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
                        {/* <p class="font-bold text-gray-500 text-right">
                          {workerName}
                        </p> */}
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
         <div className="w-80 h-fit flex flex-col items-center justify-center pb-3 px-2 mx-auto" >
        <div className="flex self-end pt-1" >
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeDialog3}/>
        </div>
          <div className="flex flex-col items-center justify-center space-y-1">
            <h1 className='text-lg font-mono text-gray-700 text-center'>{workerPhone}</h1>
            <h1>תאריך התחלה</h1>
            <h1 className='text-lg font-mono text-gray-700 text-center'>{startDate}</h1>
            <h1>תאריך סיום</h1>
            <h1 className='text-lg font-mono text-gray-700 text-center'>{endDate}</h1>
            <h1 className='text-lg font-mono text-gray-700 text-center'>{workerTask}</h1>
            <button className='bg-blue-500 px-2 py-[1px] text-sm rounded text-white hover:bg-blue-400 tracking-wide' onClick={sendWhatsApp}>שלח משימה</button>
          </div>
        </div>
      </Dialog>

         <Dialog open={editTask} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
      <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setEditTask(false)}/>
        </div>
        <h1 className={`text-center font-mono ${hebrew ? 'text-slate-600 font-serif mb-2 text-4xl' : 'text-amber-700'} text-3xl`}>{hebrew ? "update task" : "עדכן משימה"}</h1>
        {/* {errorRes != "" &&<CloseIcon onClick={()=> setErrorRes("")}/>} */}
        {errorRes[0] != null && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes} <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
    </Alert>
        </div>
        )}
        {errors == 403 && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error"> יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
      <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
    </Alert>
        </div>
        )}
        <DialogContent>
        <form onSubmit={updateWorkerTask} className='flex space-x-4 pb-8'>
                <div className='flex flex-col space-y-2'>
              
                  {hebrew ? (
                    <>
                  <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>add task</InputLabel>
                  <TextareaAutosize style={{height: '56px'}} type="number" label="task" defaultValue={workerFullTask?.task} className='bg-white shadow-xl border-[1px] border-gray-400 rounded-md px-2 py-2' onChange={e => setTask(e.target.value)}/>
                    </>
                  ) : (
                    <>
                     <CacheProvider value={cacheRtl}>
                   <ThemeProvider theme={themes}>
                   <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>הכנס משימה</InputLabel>
                  <TextareaAutosize style={{height: '56px'}} type="number" label="משימה" defaultValue={workerFullTask?.task} className='bg-white shadow-xl border-[1px] border-gray-400 rounded-md px-2 py-2' onChange={e => setTask(e.target.value)}/>
                  </ThemeProvider>
                   </CacheProvider>
                    </>
                  )}
                  <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "status" : "סטטוס"}</InputLabel>
                    <Select 
                    onChange={handleChangeStatus}
                    defaultValue={workerFullTask?.status}
                    className='bg-white shadow-xl text-right rounded-md px-2'>
            {statuses.map(stat => (
              <MenuItem value={stat}>{stat}</MenuItem>))}
                    </Select>
                  <div className='bg-blue-200 px-2 py-2 text-center relative top-[10px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg cursor-pointer' onClick={closeTasks}>{hebrew ? "cancel" : "בטל"}</div>
                  <button type='submit' className='bg-blue-200 relative top-6 px-2 py-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>{hebrew ? "update" : "עדכן"}</button>
                </div>

                <div className='flex flex-col space-y-2'>
                {/* <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "select worker" : "בחר עובד/ת"}</InputLabel>
                    <Select 
                    onChange={handleChangeWorkerName}
                    defaultValue={workerFullTask?.workerName}
                    className='bg-white shadow-xl text-right rounded-md px-2'>
            {workers.map(worker => (
              <MenuItem value={worker.fullName} data-my-value={worker.id} onClick={saveWorkerId}>{worker.active && `${worker.fullName} ${worker.idNumber}`}</MenuItem> ))}
                    </Select> */}
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "priority" : "דחיפות"}</InputLabel>
                    <Select 
                    onChange={handleChangePriority}
                    defaultValue={workerFullTask?.priority}
                    className='bg-white shadow-xl text-right rounded-md px-2'>
            {priorities.map(prio => (
              <MenuItem value={prio}>{prio}</MenuItem>))}
                    </Select>
                    {hebrew ? (
                  <>
                  <TextField  InputLabelProps={{
        shrink: true,
      }} type='date' label="start date" className='bg-white shadow-xl focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' defaultValue={workerFullTask?.startDate} placeholder='add date' onChange={e => setStartDate(e.target.value)}/>
                  </>
                 ) : (
                  <>
                   <CacheProvider value={cacheRtl}>
                   <ThemeProvider theme={themes}>
                  <TextField  InputLabelProps={{
        shrink: true,
      }} type='date' label="תאריך התחלה" className='bg-white shadow-xl focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' defaultValue={workerFullTask?.startDate} placeholder='add date' onChange={e => setStartDate(e.target.value)}/>
                  </ThemeProvider>
                   </CacheProvider> 
                  </>
                 )} 
                 {hebrew ? (
                  <>
                  <TextField  InputLabelProps={{
        shrink: true,
      }} type='date' label="end date" className='bg-white shadow-xl focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' defaultValue={workerFullTask?.endDate} placeholder='add date' onChange={e => setEndDate(e.target.value)}/>
                  </>
                 ) : (
                  <>
                   <CacheProvider value={cacheRtl}>
                   <ThemeProvider theme={themes}>
                  <TextField  InputLabelProps={{
        shrink: true,
      }} type='date' label="יעד סיום" className='bg-white shadow-xl focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' defaultValue={workerFullTask?.endDate} placeholder='add date' onChange={e => setEndDate(e.target.value)}/>
                  </ThemeProvider>
                   </CacheProvider> 
                  </>
                 )} 
                 
                  
                  {/* <div className='bg-blue-200 px-2 py-2 text-center font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg cursor-pointer' onClick={()=> setOpenAddIncome(false)}>{hebrew ? "cancel" : "בטל"}</div> */}
                </div>
              </form>
        </DialogContent>
       
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

      {/* <Snackbar open={mailAlert} autoHideDuration={15000} onClose={handleCloseMail} anchorOrigin={{vertical: 'top', horizontal: 'left'}}>
        <Alert
          onClose={handleCloseMail}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#22c55e", color: "#333" }}
        >
          {hebrew ? 'successfully update the worker' : 'אימייל נשלח בהצלחה'}      
               </Alert>
      </Snackbar> */}
      
    </div>
  )
}

export default WorkerTasks