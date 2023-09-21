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
  DateNavigator,
  TodayButton,
  Toolbar,
  // DayView,
  MonthView,
  Appointments,
  // WeekView,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ThemeContext } from "../App";
import { useQuery } from 'react-query'



const Reports = () => {
  // const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState()
  // const [user, setUser] = useState({})
  // const [changed, setChanged] = useState([])
  const [date, setDate] = useState(new Date());
  const [schedulers, setSchedulers] = useState([])
  const [isSSR, setIsSSR] = useState(true);
//   const [invoicesTotalMoneyOut, setInvoicesTotalMoneyOut] = useState();
  const [allTotalMoneyOut, setAllTotalMoneyOut] = useState();
  const [totalAmount, setTotalAmount] = useState(true)
//   const [totalAmountInvoices, setTotalAmountInvoices] = useState(true)
  const [errorMode, setErrorMode] = useState(false)
  const [errors, setErrors] = useState()

  
  const { hebrew } = useContext(ThemeContext) 

  const payment = JSON.parse(localStorage.getItem('payment'));


  const res = localStorage.getItem("user")
  const result = JSON.parse(res)

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const getData = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/coming-payments/${id}`)
  }
  
  const {data} = useQuery('comming-payments', ()=> getData(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: payment,
      refetchOnWindowFocus:false
 
    }) 



  useEffect(()=> {
    setSchedulers(data?.data)
  }, [data?.data])

  useEffect(() => {
    if(errors == 403) {
      setErrorMode(true)
    }
    
  }, [errorMode, errors]);

  useEffect(()=> {
    const id = result?.id;
    axios.get(`https://nartina.com/api/user/coming-payments-total-amount-no-limit/${id}`)
    .then(res => {setAllTotalMoneyOut(res.data)
    console.log(res.data)})
    .catch(err => console.log(err))
  }, [result?.id])

//   useEffect(()=> {
//     const id = result?.id;
//     axios.get(`https://nartina.com/api/user/deferral-invoices-amount-no-limit/${id}`)
//     .then(res => {setInvoicesTotalMoneyOut(res.data)
//     console.log(res.data)})
//     .catch(err => console.log(err))
//   }, [result?.id])



// useEffect(()=> {
//     const id = result?.id;
//     axios.get(`https://nartina.com/api/user/coming-payments/${id}`)
//     .then(res => {setSchedulers(res.data)
//          console.log(res.data)})
//     .catch(err => console.log(err))
//   }, [result?.id])

  const getSchdulers = () => {
    const id = result?.id;
    axios.get(`https://nartina.com/api/user/coming-payments/${id}`)
    .then(res => {setSchedulers(res.data)
         console.log(res.data)})
    .catch(err => console.log(err))
  }
 
  const dragDisableIds = new Set([3, 8, 10, 12]);

  const allowDrag = ({ id }) => !dragDisableIds.has(id);

  

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
          axios.post("https://nartina.com/api/user/update-coming-payments/" + s?.id, {
          title: changed[s.id]?.title ? changed[s.id]?.title : s?.title,
          notes: changed[s.id]?.notes ? changed[s.id]?.notes : s?.notes
        }, {
          headers: {
            Authorization: 'Bearer ' + result?.token, 
        
           }
        }
      ).then(res => {console.log(res.data)
        setOpenUpdate(true)
        getSchdulers()})
      // .catch(error => setError(error.response.data))
      .catch(error => {
        console.log(error.response.data)
        setErrors(error.response.status)
      })  
      //  window.location.reload()
      .finally(
        getSchdulers()
      )
       return
        }
       
      })
     
     }
         
          
 
    // console.log("deleted: ? " + deleted)
    if(deleted) {
      axios.delete("https://nartina.com/api/user/delete-coming-payment/" + deleted,  {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
      .then(res => {console.log(res.data)
        setOpenDelete(true)
        getSchdulers()})
      .catch(error => {
        console.log(error)
        setErrors(error.response.status)
      }).finally(
        getSchdulers()
      )
      //  setOpen(true)
      //  window.location.reload()
    }

   if(added) {
    axios.post("https://nartina.com/api/user/add-coming-payment/" + result?.id, {
      title: added?.title,
      startDate: added?.startDate,
      endDate: added?.endDate,
      notes: added?.notes
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {console.log(res.data)
      localStorage.setItem('payment', true)
      setOpenAdd(true)
      // window.location.reload()
    getSchdulers()})
    // .catch(error => setError(error.response.data))
    .catch(error => {
      console.log(error.response.data)
      setErrors(error.response.status)
    })
    .finally(
      getSchdulers()
    )
    //  setOpen(true)
    //  window.location.reload()
   }
         
  }
  const currentDateChange = (currentDate) => {
        setDate(currentDate)
  }

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleCloseAmount = () => {
    setTotalAmount(false)
  }

//   const handleCloseAmount2 = () => {
//     setTotalAmountInvoices(false)
//   }

  const handleClose3 = () => {
    setErrorMode(false)
    setErrors("")
  }

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  
  
  return (
    <>
   {/* <div className={`mt-14 w-[98%] md:[78%] lg:w-[98%] ${hebrew && "airx:ml-[183px]"} airx:w-[80%] 2xl:w-[79%] mt-2 min-h-screen overflow-hidden`}> */}
   <div className={`w-[98%] md:[78%] lg:w-[98%] ${hebrew ? "airx:ml-64" : "mr-64"} airx:w-[79.5%] 2xl:w-[79%] mt-14 min-h-screen overflow-hidden`}>

        {!isSSR && (
          <Paper>
          <Scheduler data={schedulers}>
            <ViewState currentDate={date} onCurrentDateChange={currentDateChange}/>
            {/* <EditingState onCommitChanges={(paramas)=> console.log(paramas)}/> */}
            {/* <EditingState onCommitChanges={() => setOpen(true)} /> */}
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            {/* <WeekView startDayHour={5} endDayHour={24}/> */}
            {/* <DayView /> */}
            <MonthView />
            {/* <DayView
        startDayHour={9}
        endDayHour={14}
      /> */}
            <Toolbar />
            <DateNavigator/>
            <TodayButton />
            {/* <DayView /> */}

            <Appointments appointmentComponent={appointmentComponent} />
            <AppointmentForm />
            <DragDropProvider allowDrag={allowDrag} />
          </Scheduler>
        </Paper>
        )}
        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Addede a success message!
          </Alert>
        </Snackbar> */}

        <Snackbar open={openAdd} autoHideDuration={6000} onClose={handleCloseAdd} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
          <Alert
            onClose={handleCloseAdd}
            severity="success"
            sx={{ width: "100%" }}
          >
           {hebrew ? <>
              successfully add Payment
            </> : <>
            תשלום הוכנס בהצלחה
            </>}
          </Alert>
        </Snackbar>

        <Snackbar open={openDelete} autoHideDuration={6000} onClose={handleCloseDelete} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}> 
          <Alert
            onClose={handleCloseDelete}
            severity="success"
            sx={{ width: "100%" }}
          >
             {hebrew ? <>
              successfully delete Payment
            </> : <>
            תשלום נמחק בהצלחה
            </>}
          </Alert>
        </Snackbar>

        <Snackbar open={openUpdate} autoHideDuration={6000} onClose={handleCloseUpdate} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
          <Alert
            onClose={handleCloseUpdate}
            severity="success"
            sx={{ width: "100%" }}
          >
          {hebrew ? <>
              successfully edit Payment
            </> : <>
            תשלום עודכן בהצלחה
            </>}
          </Alert>
        </Snackbar>
        {/* <Alert severity="error">This is an error message!</Alert>
        <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert> */}
        {/* <Alert severity="success">This is a success message!</Alert> */}
      </div>
      
      {/* <Snackbar open={totalAmount} autoHideDuration={15000} onClose={handleCloseAmount} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleCloseAmount}
          severity="info"
          sx={{ width: "100%" }}
        >
          {hebrew ? <h1>upcoming payments<span className='text-blue-800 font-semibold'> {Number(isFinite(allTotalMoneyOut) ? allTotalMoneyOut : 0).toLocaleString()}</span> ש"ח
          </h1> : 
          <h1>סה"כ תשלומים נכנסים<span className='text-blue-800 font-semibold'> {Number(isFinite(allTotalMoneyOut) ? allTotalMoneyOut : 0).toLocaleString()}</span> ש"ח
          </h1>}
        </Alert>
      </Snackbar> */}

      {/* <Snackbar open={totalAmountInvoices} autoHideDuration={15000} onClose={handleCloseAmount2} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
        <Alert
          onClose={handleCloseAmount2}
          severity="error"
          sx={{ width: "100%" }}
        >
          <h1>סה"כ צ'קים ספקים דחויים<span className='text-red-700 font-semibold'> {Number(isFinite(invoicesTotalMoneyOut) ? invoicesTotalMoneyOut : 0).toLocaleString()}</span> ש"ח
          </h1>
        </Alert>
      </Snackbar> */}

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

export default Reports;