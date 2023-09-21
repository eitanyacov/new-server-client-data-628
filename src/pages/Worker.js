import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { Select, MenuItem, InputLabel} from '@mui/material'
import { Dialog, DialogContent, TextField, Typography } from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
// import { styled } from '@mui/material/styles';
import axios from 'axios';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from "../App";
import { useQuery } from 'react-query'
// import { DriveEtaOutlined } from '@mui/icons-material';



// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});





const Worker = () => {
    const [user, setUser] = useState({})
    const [isSSR, setIsSSR] = useState(true);
    const [isSSRE, setIsSSRE] = useState(true);
    const [salaries, setSaleries] = useState([])
    const [updateAlert, setUpdateAlert] = useState(false)
    const [id, setId] = useState();
    const [ide, setIde] = useState();
    const [salary, setSalary] = useState({})
    const [field, setField] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [amount, setAmount] = useState()
    const [month, setMonth] = useState("")
    const [hours, setHours] = useState()
    const [year, setYear] = useState();
    const [extraHours, setExtraHours] = useState()
    const [workerFullName, setWorkerFullName] = useState("")
    const [deleteAlert, setDeleteAlert] = useState(false)
    const [worker, setWorker] = useState({})
    // const [salaries, setSalaries] = useState({})
    const [open, setIsOpen] = useState(false)
    const [openUpdate, setIsOpenUpdate] = useState(false)
    const [error, setError] = useState()
    const [errorMode, setErrorMode] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);


    const { hebrew, globalTheme } = useContext(ThemeContext)

    // const navigate = useNavigate()
    const { workerid } = useParams()

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

    const screen = window.screen.availWidth
    // const screenHeight = window.screen.availHeight

    const currentYear = new Date().getFullYear()
    const lastYear = new Date().getFullYear() -1
    const lastTwoYear = new Date().getFullYear() -2

    const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
    const years = [currentYear, lastYear, lastTwoYear]

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

    const getData = () => {
      return axios.get('https://nartina.com/api/user/worker-salaries/' + workerid)
    }
    
    const {data, refetch} = useQuery('worker-salaries', ()=> getData(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: true,
        refetchOnWindowFocus:false
   
      }) 
    
    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
    }, [])

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

    useEffect(()=> {
        getWorker()
    }, [])

    // useEffect(()=> {
    //     getWorkerSalaries()
    // }, [])

    const getSalary = async (id) => {
      const res = await fetch(`https://nartina.com/api/user/get-salary-by-id/${id}`);
      const result = await res.json();
      setSalary(result)
      setIsOpenUpdate(true)
      
  }

    const getWorker = async () => {
        const res = await fetch(`https://nartina.com/api/user/get-worker-by-id/${workerid}`);
        const result = await res.json();
        setWorker(result)
    }

    // const getWorkerSalaries = async () => {
    //     const response = await fetch(`https://nartina.com/api/user/worker-salaries/${workerid}`);
    //     const data = await response.json();
    //     setSaleries(data)
    // }



  const handleMonths = (e) => {
    setMonth(e.target.value)
   }

   const handleYear = (e) => {
    setYear(e.target.value)
   }

   
    const handleUpdateAlert = () => {
      setUpdateAlert(false)
    }

    const handleClose3 = () => {
      setErrorMode(false)
      setError("")
    }

    

   
    const getSalaries = async () => {
      const id = user?.id;
      const response = await fetch(`https://nartina.com/api/user/all-workers-salaries/${id}`);
      const data = await response.json();
      setSaleries(data)
    }

    const printValues = (e)=> {
      e.preventDefault()
      axios.post("https://nartina.com/api/user/update-salary/" + ide, {
        amount: amount != null ? amount : salary.amount,
        hours: hours != null ? hours : salary.hours,
        year: year != null ? year : salary.year,
        extraHours: extraHours != null ? extraHours : salary.extraHours,
        workerFullName: workerFullName != "" ? workerFullName : salary.workerFullName,
        month: month != "" ? month : salary.month,
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {console.log(res.data)
         setIsOpenUpdate(false)
         refetch()
          setUpdateAlert(true)})
      .catch(err => {console.log(err)
        setError(err.response.status)})
    }

    const handleChange1 = (e) => {
      setMonth(e.target.value)
    }

    const handleDeleteAlert = () => {
      setDeleteAlert(false)
    }

    const editCell = (param) => {
      setId(param.id)
      if(param.field == 'workerFullName') return
      if(param.field == 'id') return
      axios.get("https://nartina.com/api/user/salary-by-id/" + param.id)
      .then(res => {setSalary(res.data)
         setEditMode(true)})
      .catch(err => console.log(err))
      setField(param.field)
      console.log(param.field)
      
    }

    const deleteRestaurantIncome = () => {
      axios.delete("https://nartina.com/api/user/delete-salary-by-id/" + ide, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
      .then(res => {console.log(res.data)
        getSalaries()
        setDeleteAlert(true)})
      .catch(err => {console.log(err.response.data)
        setError(err.response.status)})
        setIsOpen(false)
      // setIsOpenAlertIncomeDelete(true)
    }


    const deleteSalary = (id) => {
      setIde(id)
      setIsOpen(true)
    }   
    
    const editSalary = (id) => {
      setIde(id)
      getSalary(id)
    }  

    
    return (
        <>
      
       <div class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${globalTheme != "light" && "bg-gray-700 dark"}`}>

    {isSSR ? (
          <LinearProgress />
        ) : (
          <>
          <div className="pr-1 hidden md:block"> 
         <table className="min-w-full divide-y divide-gray-200 border-[#ccc] border-b-2">
          <thead className="bg-sky-700 sticky top-0 z-50">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מחק</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">ערוך</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">משכורת ברוטו</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שעות נוספות</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מספר שעות</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שנה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">חודש</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">ת.ז</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם עובד/ת</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
            </tr>
          </thead>

            <>
            <tbody className="divide-y divide-gray-200">
            {data?.data.map((salary, index) => (
              <tr key={salary.id} className={`border ${index % 2 === 0 ? '' : ''}`}>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-red-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> deleteSalary(salary?.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editSalary(salary?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{salary.amount}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{salary.extraHours}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{salary.hours}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{salary.year}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-sm text-gray-800  font-bold font-mono">{salary.month}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-sm text-gray-800  font-bold font-mono">{salary.workerIdentification}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-sm text-gray-800  font-bold font-mono">{salary.workerFullName}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              </tr>
            ))}
          </tbody>
            </>
        </table>
         </div>
         <div className='grid grid-cols-1 gap-3 md:hidden px-4 mt-2 dark'>
              {data?.data.map(salary => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'bg-gray-800  hover:bg-gray-900 shadow rounded-xl'} flex flex-col space-y-1`}>
                <div className="p-4 bg-gray-900 hover:bg-gray-800 shadow rounded-xl flex flex-col space-y-1">

                <div className='flex items-center justify-end space-x-2 text-sm'>
              
                  <div className='dark:text-[#ccc] font-mono text-lg'>
                    {salary.date}
                    </div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{salary.workerFullName}</div>
                <div className='text-right dark:text-[#ccc]'>שם עובד</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{salary.workerIdentification}</div>
                <div className='text-right dark:text-[#ccc]'>אשראי</div>
                </div>
                <div className={`flex items-center justify-end space-x-2`}>
                <div className='text-right font-mono dark:text-[#ccc]'>{salary.month}</div>
                <div className='text-right dark:text-[#ccc]'>עבור חודש</div>
                </div>
                <div className={`flex items-center justify-end space-x-2`}>
                <div className='text-right font-mono dark:text-[#ccc]'>{salary.year}</div>
                <div className='text-right dark:text-[#ccc]'>עבור שנה</div>
                </div>
                <div className={`flex items-center justify-end space-x-2`}>
                <div className='text-right font-mono dark:text-[#ccc]'>{salary.hours}</div>
                <div className='text-right dark:text-[#ccc]'>שעות</div>
                </div>
                <div className='flex items-center justify-end space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'>{salary.extraHours}</h1>
                  <h1 className='dark:text-[#ccc]'>שעות נוספות</h1>
                </div>
                <div className='flex items-center justify-between space-x-4 relative top-1'>
                
                <div className='flex items-center justify-center space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(salary.amount).toLocaleString()}</h1>
                  <h1 className='dark:text-[#ccc]'>סה"כ ברוטו</h1>
                </div>
              <div className='flex items-center justify-center space-x-4'>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> deleteSalary(salary?.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editSalary(salary?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
             
              </div>
          
                </div>
              </div>
              ))}
            </div>
          </>
        )}
      
    </div>
      <Dialog open={openUpdate}>
      <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setIsOpenUpdate(false)}/>
        </div>
        <h1 className={`text-center ${hebrew ? "font-serif text-slate-600 text-3xl" : "font-mono text-amber-700 text-3xl"}`}>{hebrew ? "update salary" : "עדכן משכורת"}</h1>
        <DialogContent>
        <form id="myform" onSubmit={printValues} className='flex space-x-4'>
                <div className='flex flex-col space-y-2'>
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "select month" : "עבור חודש"}</InputLabel>
                    <Select onChange={handleMonths} className={`bg-white shadow-xl ${hebrew ? "text-left" : "text-right"} rounded-md px-2`} defaultValue={salary?.month}>
            {months.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select>
                    <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "select year" : "עבור שנה"}</InputLabel>
                    <Select onChange={handleYear} className='bg-white shadow-xl text-right rounded-md px-2' defaultValue={salary?.year}>
            {years.map(year => (
                <MenuItem value={year}>{year}</MenuItem>
            ))}
                    </Select>
                   {hebrew ? (
                     <TextField type="number" label="gross pay" defaultValue={salary?.amount} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setAmount(e.target.value)}/>
                     
                   ) : (
                    <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                    <TextField type="number" label="סכום ברוטו" defaultValue={salary?.amount} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setAmount(e.target.value)}/>
                    </ThemeProvider>
                    </CacheProvider>
                   )}
                  {/* <button type='submit' className='bg-blue-200 px-2 py-2 mt-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>הכנס משכורת</button> */}
                  <button type='submit' className='bg-blue-200 px-2 py-2 mt-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>{hebrew ? "update salary" : "עדכן משכורת"}</button>

                  {/* <button type='button' className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpenx(false)} >בטל</button> */}
                </div>

                <div className='flex flex-col space-y-2'>
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "worker name" : "שם עובד/ת (לא ניתן לערוך)"}</InputLabel>
               {hebrew ? (
               <TextField type="text" value={salary?.workerFullName + " - " +salary?.workerIdentification} className='bg-white shadow-xl rounded-md px-2 py-2'/>
              
               ) : (
                <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div dir="rtl">
              <TextField type="text" value={salary?.workerFullName + " - " +salary?.workerIdentification} className='bg-white shadow-xl rounded-md px-2 py-2'/>
              </div>
              </ThemeProvider>
            </CacheProvider>
               )}

                    {/* <Select 
                    onChange={handleChangeWorkerName}
                    value={workerFullName}
                    label="Supplier"
                    className='bg-white shadow-xl rounded-md px-2'
                   >
            {workers.map(worker => (
              <MenuItem value={worker.fullName} data-my-value={worker.id} onClick={saveWorkerId}>{worker.active && `${worker.fullName} ${worker.idNumber}`}</MenuItem>            ))}
                    </Select> */}
                    <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "Hours" : "שעות"}</InputLabel>
                  {hours ? (
                  <TextField type="number" label="regular hours" defaultValue={salary?.hours} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setHours(e.target.value)}/>
                  
                  ) : (
                    <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                  <TextField type="number" label="שעות רגילות" defaultValue={salary?.hours} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setHours(e.target.value)}/>
                  </ThemeProvider>
                  </CacheProvider>
                  )}
                  {hebrew ? (
                  <TextField type="number" label="extra hours" defaultValue={salary?.extraHours} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setExtraHours(e.target.value)}/>
                  
                  ) : (
                    <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                  <TextField type="number" label="שעות נוספות" defaultValue={salary?.extraHours} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setExtraHours(e.target.value)}/>
                  </ThemeProvider>
                  </CacheProvider>
                  )}
                      <div className='bg-blue-200 px-2 py-2 mt-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 text-center font-semibold rounded-lg cursor-pointer' onClick={()=> setIsOpenUpdate(false)} >{hebrew ? "cancel" : "בטל"}</div>

                  {/* <button type='submit' className='bg-blue-200 px-2 py-2 mt-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>עדכן משכורת</button> */}

                </div>
              </form>
        </DialogContent>
       
    </Dialog>

    <Snackbar open={deleteAlert} autoHideDuration={10000} onClose={handleDeleteAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleDeleteAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? 'successfully deleted the salary' : 'משכורת נמחקה בהצלחה'}   
                  </Alert>
      </Snackbar>

    <Dialog open={open}>
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>האם למחוק את המשכורת</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={deleteRestaurantIncome}>מחק</button>
        </div>
        {/* </DialogActions> */}
    </Dialog>

    <Snackbar open={updateAlert} autoHideDuration={10000} onClose={handleUpdateAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleUpdateAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? 'successfully update the salary' : 'משכורת עודכנה בהצלחה'}   
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
        
    )
}

export default Worker

