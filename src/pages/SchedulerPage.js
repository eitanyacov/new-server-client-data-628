import React, { useState, useEffect, useContext } from 'react';
// import { DragDropProvider, DateNavigator, TodayButton, Toolbar } from "@devexpress/dx-react-scheduler-material-ui";
import { Snackbar, Alert } from "@mui/material";
import axios from 'axios'
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DragDropProvider,
  AppointmentTooltip,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
  Toolbar,
  // DayView,
  MonthView,
  Appointments,
  WeekView,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ThemeContext } from "../App";
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'



const SchedulerPage = () => {
  // const [open, setOpen] = useState(false);
  // const [openUpdate, setOpenUpdate] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState()
  // const [user, setUser] = useState({})
  const [date, setDate] = useState(new Date());
  const [schedulers, setSchedulers] = useState([])
  const [isSSR, setIsSSR] = useState(true);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState()
  const [errorMode, setErrorMode] = useState(false)
  const { setReload, hebrew } = useContext(ThemeContext) 

  
  // const navigate = useNavigate()

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)

  // const scheduler = JSON.parse(localStorage.getItem('scheduler'));



  const getData = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/schedulers-by-user/${id}`)
  }
  
  const {data, refetch} = useQuery('schedulers', getData,
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: false,
      refetchOnWindowFocus:false
 
    }) 

  
  useEffect(() => {
    setIsSSR(false);
  }, []);

  useEffect(() => {
    setAlert(true);
  }, []);


  useEffect(()=> {
    setSchedulers(data?.data)
}, [data?.data])



  // useEffect(()=> {
  //   setTimeout(()=> {
  //     localStorage.setItem('scheduler', false)
  //   }, 2000)
  // })



  useEffect(() => {
    if(error == 403) {
      setErrorMode(true)
    }
    
  }, [errorMode, error]);

  // useEffect(()=> {
  //   const id = result?.id;
  //   axios.get(`https://nartina.com/api/user/schedulers-by-user/${id}`)
  //   .then(res => {setSchedulers(res.data)
  //        console.log(res.data)})
  //   .catch(err => console.log(err))
  // }, [result?.id])
 
  const dragDisableIds = new Set([3, 8, 10, 12]);

  const getSchdulers = () => {
    const id = result?.id;
    axios.get(`https://nartina.com/api/user/schedulers-by-user/${id}`)
    .then(res => {setSchedulers(res.data)
         console.log(res.data)})
    .catch(err => console.log(err))
  }

  const allowDrag = ({ id }) => !dragDisableIds.has(id);

  const handleCloseAlert = () => {
    setAlert(false)
  }

  const handleClose3 = () => {
    setErrorMode(false)
    setError("")
  }

  const appointmentComponent = (props) => {
    if (allowDrag(props.data)) {
      return <Appointments.Appointment {...props} />;
    }
    return (
      <Appointments.Appointment
        {...props}
        style={{ ...props.style, cursor: "not-allowed" }}
      />
    );
  };

  // const deletePost = useMutation((id) => {
  //   return axios.delete("https://nartina.com/api/user/delete-scheduler/" + id, {
  //     headers: {
  //       Authorization: 'Bearer ' + result?.token,
    
  //      },
       
  //   }).then(setReload(true))
  // }, {
  //   onSuccess: () => {
  //     refetch();
  //   },
  // });


  // const addPost = useMutation((ooo) => {
  //   return axios.post("https://nartina.com/api/user/add-scheduler/" + user?.id, {
  //     title: ooo.title,
  //     startDate: ooo.startDate,
  //     endDate: ooo.endDate,
  //     notes: ooo.notes
  //   }, {
  //     headers: {
  //       Authorization: 'Bearer ' + result?.token,
    
  //      }
  //   }).then(setReload(true))
  // }, {
  //   onSuccess: () => {
  //     refetch();
  //   },
  // });




  // const commitChanges = (data) => {
  //   console.log(data)
  //   setOpen(true)
  // }
  // const commitChanges = ({ added }) => {
  //   console.log(added)
  //   setOpen(true)
  // }

  // const commitChanges = ({ deleted }) => {
  //   console.log("------------------------")
  //   console.log("deleted: ")
  //   console.log(deleted)
  //   console.log("------------------------")
  //   setOpen(true)
  // }
  const commitChanges = ({ added, deleted, changed }) => {
    // console.log(added?.startDate)
    // console.log(added?.endDate)
    // console.log(added?.title)
    // console.log(added?.notes)
    // setTitle(added?.title)
    // setStartDate(added?.startDate)
    // setEndDate(added?.endDate)
    // setNotes(added?.notes)
    // console.log("title: " + title + "notes: " + notes)
    // console.log(title, startDate, endDate, notes)
    // console.log("changed: " + changed)

    // if(changed) {
    //   setChanged(changed);
    //   schedulers.map(s => {
    //     if(changed[s.id]){
    //       console.log(s.id)
    //       setId(s.id)
    //       // console.log(changed[id]?.startDate)
    //       // console.log(changed[id]?.endDate)
   
         if(changed) {
          // setUpdate(changed)
          schedulers.map(s => {
            if(changed[s.id]) {
              setId(s?.id)
              console.log(changed[s.id]?.title ? changed[s.id]?.title : s.title)
              axios.post("https://nartina.com/api/user/update-scheduler/" + s?.id, {
              title: changed[s.id]?.title ? changed[s.id]?.title : s?.title,
              notes: changed[s.id]?.notes ? changed[s.id]?.notes : s?.notes
            }, {
              headers: {
                Authorization: 'Bearer ' + result?.token,
            
               }
            }
          ).then(res => {console.log(res.data)
            localStorage.setItem('scheduler', true)
            refetch()
            // getSchdulers()
            Swal.fire("!עודכן", '! פגישה עודכנה בהצלחה', "success")
            // setOpenUpdate(true)
          })
          // .catch(error => setError(error.response.data))
          .catch(error => {console.log(error.response.data)
            Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error")
            setError(error.response.status)})
            .finally(
              // getSchdulers()
            )
          //  window.location.reload()
           return
            }
           
          })
         
         }
          
 
    // console.log("deleted: ? " + deleted)
    if(deleted) {
      axios.delete("https://nartina.com/api/user/delete-scheduler/" + deleted, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
      .then(res => {console.log(res.data)
        localStorage.setItem('tasksStats', true)
      // getSchdulers()
      Swal.fire("!נמחק", '! פגישה נמחקה בהצלחה', "success")
      refetch()
      // setOpenDelete(true)
      setReload(true)
    })
      .catch(err => {console.log(err)
        Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error")
        setError(err.response.status)})
        .finally(
          // getSchdulers()
        )
      //  setOpen(true)
      //  window.location.reload()
      // deletePost.mutate(deleted)
    }

   if(added) {
    axios.post("https://nartina.com/api/user/add-scheduler/" + result?.id, {
      title: added?.title,
      startDate: added?.startDate,
      endDate: added?.endDate,
      notes: added?.notes
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {console.log(res.data)
      localStorage.setItem('tasksStats', true)
      refetch()
      // getSchdulers()
      Swal.fire("!הצלחה", '! פגישה הוכנסה בהצלחה', "success")
      // setOpen(true)
      setReload(true)})
    .catch(error => {console.log(error.response.data)
      Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error")
      setError(error.response.status)})
      .finally(
        // getSchdulers()
      )
      
    // const ooo = {
    //   title: added?.title,
    //   startDate: added?.startDate,
    //   endDate: added?.endDate,
    //   notes: added?.notes
    // }
    // addPost.mutate(ooo)
   }
        //  setObj(update[parseInt(id)])
  }

  const currentDateChange = (currentDate) => {
        setDate(currentDate)
  }

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleCloseUpdate = () => {
  //   setOpenUpdate(false);
  // };

  // const handleCloseDelete = () => {
  //   setOpenDelete(false);
  // };

  
  
  
  // console.log(update[parseInt(id)])
  // console.log("id: " + parseInt(id))
  // console.log("title: " + title)
  return (
    <>
      {/* <div className="w-[83.7%] mt-1"> */}
      {/* <div className="w-[98%] md:w-[78%] lg:w-[85%] mt-2 min-h-screen fixed overflow-hidden"> */}
      <div className={`w-[98%] md:[78%] lg:w-[98%] ${hebrew ? "airx:ml-64" : "mr-64"} airx:w-[79.5%] 2xl:w-[79%] mt-14 min-h-screen overflow-hidden`}>

        {!isSSR && (
          <Paper>
          <Scheduler data={data?.data}>
            <ViewState currentDate={date} onCurrentDateChange={currentDateChange}/>
            {/* <EditingState onCommitChanges={(paramas)=> console.log(paramas)}/> */}
            {/* <EditingState onCommitChanges={() => setOpen(true)} /> */}
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <WeekView startDayHour={7.5} endDayHour={22}/>
            <MonthView />
            {/* <DayView
        startDayHour={9}
        endDayHour={14}
      /> */}
            <Toolbar/>
            <ViewSwitcher />
            <DateNavigator/>
            <TodayButton />
            <Appointments appointmentComponent={appointmentComponent} />
            <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
          />
            <AppointmentForm />
            <DragDropProvider allowDrag={allowDrag} />
          </Scheduler>
        </Paper>
        )}
        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {hebrew ? <>
              successfully add an Appointment
            </> : <>
            פגישה הוכנסה בהצלחה
            </>}
          </Alert>
        </Snackbar> */}

        {/* <Snackbar open={openDelete} autoHideDuration={6000} onClose={handleCloseDelete} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}> 
          <Alert
            onClose={handleCloseDelete}
            severity="success"
            sx={{ width: "100%" }}
          >
             {hebrew ? <>
              successfully deleted an Appointment
            </> : <>
            פגישה נמחקה בהצלחה
            </>}
          </Alert>
        </Snackbar> */}

        {/* <Snackbar open={openUpdate} autoHideDuration={6000} onClose={handleCloseUpdate} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
          <Alert
            onClose={handleCloseUpdate}
            severity="success"
            sx={{ width: "100%" }}
          >
             {hebrew ? <>
              successfully edit an Appointment
            </> : <>
            פגישה עודכנה בהצלחה
            </>}
          </Alert>
        </Snackbar> */}
       
      </div>
      <Snackbar open={alert} autoHideDuration={10000} onClose={handleCloseAlert} anchorOrigin={{vertical: 'buttom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: '100%','& .MuiAlert-message':{textAlign:"right", width:"inherit"} }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? <>
                          double click to set Appointment
          </> : 
          <>
                    לחיצה כפולה על יום ושעה לקביעת פגישה

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
    </>
  );
};

export default SchedulerPage;