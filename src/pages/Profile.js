import React, { useState, useEffect, useContext} from 'react';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import PersonIcon from '@mui/icons-material/Person';
import { Snackbar, Alert } from "@mui/material";
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material'
// import HomeIcon from '@mui/icons-material/Home';
import TtyIcon from '@mui/icons-material/Tty';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
// import Footer from '../components/Footer';
import axios from 'axios';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from "../App";



// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});



const Profile = () => {
  const [user, setUser] = useState({})
  const [open, setIsOpen] = useState(false)
  const [companyName, setCompanyName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [addressNumber, setAddressNumber] = useState("")
  const [city, setCity] = useState("")
  const [dealerlicensed, setDealerlicensed] = useState("")
  const [emailForReceipt, setEmailForReceipt] = useState("")
  const [phoneForReceipt, setPhoneForReceipt] = useState("")
  const [openAlertAdd, setIsOpenAlertAdd] = useState(false)
  const [error, setError] = useState()
  const [errorMode, setErrorMode] = useState(false)
  const [errorRes, setErrorRes] = useState([]);

  const { hebrew } = useContext(ThemeContext) 


  const res = localStorage.getItem("user")
  const result = JSON.parse(res)


  
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

  
  const getUser = () => {
      axios.get("https://nartina.com/api/user/user-by-id/" + user?.id)
      .then(res => localStorage.setItem("user", JSON.stringify(res.data)))
      .catch(err => console.log(err.response.data))
  }

  

  const printValues = (e)=> {
    e.preventDefault()
    
    axios.post("https://nartina.com/api/user/update-user-info/" + user?.id, {
      companyName: companyName != "" ? companyName : user.companyName,
      email: email != "" ? email : user.email,
      dealerlicensed: dealerlicensed != "" ? dealerlicensed : user.dealerlicensed,
      phoneNumber: phoneNumber != "" ? phoneNumber : user.phoneNumber,
      address: address != "" ? address : user.address,
      city: city != "" ? city : user.city,
      addressNumber: addressNumber != "" ? addressNumber : user.addressNumber,
      emailForReceipt: emailForReceipt != "" ? emailForReceipt : user.emailForReceipt,
      phoneForReceipt: phoneForReceipt != "" ? phoneForReceipt : user.phoneForReceipt,
      
      // active: active != null ? active : worker.active,
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {
            setIsOpenAlertAdd(true)
            getUser()
            setIsOpen(false)
            setTimeout(()=> {
              localStorage.removeItem("user")
              window.location.replace('/login')
            }, 5000)
          
          })
    .catch(err => {console.log(err)
      setError(err.response.status)
      setErrorRes(err.response.data)
    })
    
  }

  const handleClose = () => {
    setIsOpenAlertAdd(false)
  }

  const handleClose3 = () => {
    setErrorMode(false)
    setError("")
  }


  
  return (
    <div>
       {hebrew ? (
        <>
         <div className={`flex max-w-[1880px] bg-white min-h-fit px-3 py-2 justify-center sm:justify-start 5xl:mt-4 ${hebrew ? "airx:ml-[185px]" : "airx:mr-[185px]"} overflow-hidden`}>
              <div className='w-fit bg-white shadow-lg h-fit py-2 px-2 xsss:px-3 xr:px-6 space-y-4 rounded-sm'>
              <h1 className='text-center text-gray-700 text-sm xr:text-lg font-bold'>user info</h1>
                  <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-1'>
                     <PersonIcon color='primary'/>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>full name</h1>
                  </div>
                  <h1 className='text-[#333] text-md font-mono'>{user?.firstName}</h1>
                  </div>
                 
                  <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-1'>
                     <BusinessIcon color='primary'/>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>company name</h1>
                  </div>
                  <h1 className='text-[#333] text-md font-mono'>{user?.companyName}</h1>
                  </div>

                  <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-1'>
                    <AppRegistrationIcon color='primary'/>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>dealer license number</h1>
                  </div>
                  <h1 className='text-[#333] text-md font-mono'>{user?.dealerlicensed}</h1>
                  </div>

                  <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-1'>
                    <MarkunreadIcon color='primary' fontSize='small'/>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>user email</h1>
                  </div>
                  <h1 className='text-[#333] text-sm xr:text-md font-mono'>{user?.email}</h1>

                  </div>

                  <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-1'>
                    <PhoneIcon color='primary'/>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>contact phone</h1>
                  </div>
                  <h1 className='text-[#333] text-md font-mono'>{user?.phoneNumber}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-1'>
                    <CalendarMonthIcon color='primary'/>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>join date</h1>
                  </div>
                  <h1 className='text-[#333] text-md font-mono'>{user?.joinDate}</h1>
                  </div>
                    <h1 className='text-center text-gray-700 text-sm xr:text-lg font-bold'>details that will apear on your customer quotes</h1>
                  <div className='flex justify-between items-center'>
                 

                  <div className='flex items-center space-x-1'>
                    <HomeWorkIcon color='primary'/>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>business address</h1>
                  </div>
                  <div className='flex space-x-1'>
                  <h1 className='text-[#333] text-md font-mono'>{user?.addressNumber}</h1>
                  <h1 className='text-[#333] text-md font-mono'>{user?.address}</h1>
                  <h1 className='text-[#333] text-md font-mono'>{user?.city}</h1>
                  </div>
                  </div>

                  <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-1'>
                    <AttachEmailIcon color='primary' fontSize='small'/>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>business email</h1>
                  </div>
                  <h1 className='text-[#333] text-sm xr:text-md font-mono'>{user?.emailForReceipt}</h1>
                  </div>

                  <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-1'>
                    <TtyIcon color='primary'/>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>business phone</h1>
                  </div>
                  <h1 className='text-[#333] text-md font-mono'>{user?.phoneForReceipt}</h1>
                  </div>

                  <div className='flex justify-center'>
                    <button className='text-mono font-semibold text-white bg-blue-500 px-4 py-1 rounded-xl hover:bg-blue-400' onClick={() => setIsOpen(true)}>update details</button>
                  </div>
              </div>
              
        </div>
        </>
       ) : (
        <>
         <div className={`flex max-w-[1880px] bg-white min-h-fit px-3 py-2 justify-center sm:justify-end 5xl:mt-4 ${hebrew ? "airx:ml-[185px]" : "airx:mr-[185px]"} overflow-hidden`}>
              <div className='w-fit bg-white shadow-lg h-fit py-2 px-2 xsss:px-3 xr:px-6 space-y-4 rounded-sm'>
              <h1 className='text-center text-gray-700 text-sm xr:text-lg font-bold'>פרטי משתמש </h1>
                  <div className='flex justify-between items-center'>
                  <h1 className='text-[#333] text-md font-mono'>{user?.firstName}</h1>
                  <div className='flex items-center space-x-1'>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>שם מלא</h1>
                    <PersonIcon color='primary'/>
                  </div>
                  </div>
                 
                  <div className='flex justify-between items-center'>
                  {/* <div className='flex space-x-3 items-center'> */}
                  <h1 className='text-[#333] text-md font-mono'>{user?.companyName}</h1>
                  {/* </div> */}
                  <div className='flex items-center space-x-1'>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>שם חברה</h1>
                    <BusinessIcon color='primary'/>
                  </div>
                  </div>

                  <div className='flex justify-between items-center'>
                  {/* <div className='flex space-x-3 items-center'> */}
                  <h1 className='text-[#333] text-md font-mono'>{user?.dealerlicensed}</h1>
                  {/* </div> */}
                  <div className='flex items-center space-x-1'>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>מס' ע.מ/חברה</h1>
                    <AppRegistrationIcon color='primary'/>
                  </div>
                  </div>

                  <div className='flex justify-between items-center'>
                  {/* <div className='flex space-x-3 items-center'> */}
                  <h1 className='text-[#333] text-sm xr:text-md font-mono'>{user?.email}</h1>
                  {/* </div> */}
                  <div className='flex items-center space-x-1'>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>אימייל משתשמש</h1>
                    <MarkunreadIcon color='primary' fontSize='small'/>
                  </div>
                  </div>

                  <div className='flex justify-between items-center'>
                  {/* <div className='flex space-x-3 items-center'> */}
                  <h1 className='text-[#333] text-md font-mono'>{user?.phoneNumber}</h1>
                  {/* </div> */}
                  <div className='flex items-center space-x-1'>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>טלפון ליצירת קשר</h1>
                    <PhoneIcon color='primary'/>
                  </div>
                  </div>
                  <div className='flex justify-between items-center'>
                  {/* <div className='flex space-x-3 items-center'> */}
                  <h1 className='text-[#333] text-md font-mono'>{user?.joinDate}</h1>
                  {/* </div> */}
                  <div className='flex items-center space-x-1'>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>תאריך הצטרפות</h1>
                    <CalendarMonthIcon color='primary'/>
                  </div>
                  </div>
                    <h1 className='text-center text-gray-700 text-sm xr:text-lg font-bold'>פרטים שיופיעו על גבי חשבוניות מס והצעות מחיר</h1>
                  <div className='flex justify-between items-center'>
                  {/* <div className='flex space-x-3 items-center'> */}
                  <div className='flex space-x-1'>
                  <h1 className='text-[#333] text-md font-mono'>{user?.addressNumber}</h1>
                  <h1 className='text-[#333] text-md font-mono'>{user?.address}</h1>
                  <h1 className='text-[#333] text-md font-mono'>{user?.city}</h1>
                  </div>
                  {/* </div> */}
                  <div className='flex items-center space-x-1'>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>כתובת עסק</h1>
                    <HomeWorkIcon color='primary'/>
                  </div>
                  </div>

                  <div className='flex justify-between items-center'>
                  {/* <div className='flex space-x-3 items-center'> */}
                  <h1 className='text-[#333] text-sm xr:text-md font-mono'>{user?.emailForReceipt}</h1>
                  {/* </div> */}
                  <div className='flex items-center space-x-1'>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>אימייל עסק</h1>
                    <AttachEmailIcon color='primary' fontSize='small'/>
                  </div>
                  </div>

                  <div className='flex justify-between items-center'>
                  {/* <div className='flex space-x-3 items-center'> */}
                  <h1 className='text-[#333] text-md font-mono'>{user?.phoneForReceipt}</h1>
                  {/* </div> */}
                  <div className='flex items-center space-x-1'>
                    <h1 className='text-[#333] text-sm xr:text-lg font-mono font-bold'>טלפון עסק</h1>
                    <TtyIcon color='primary'/>
                  </div>
                  </div>

                  <div className='flex justify-center'>
                    <button className='text-mono font-semibold text-white bg-blue-500 px-4 py-1 rounded-xl hover:bg-blue-400' onClick={() => setIsOpen(true)}>עדכון פרטי משתמש</button>
                  </div>
              </div>
              
        </div>
        </>
       )}

        <Dialog open={open}>
        <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setIsOpen(false)}/>
        </div>
        {/* <DialogTitle className='text-center relative bottom-4' color='brown' variant='h4'>עדכן פרטי עובד</DialogTitle> */}
        {/* <DialogTitle className='text-center' variant='h5'>עדכן פרטי עובד</DialogTitle> */}
        <h1 className='text-center font-mono text-amber-700 text-3xl'>עדכן פרטי משתשמש</h1>
        {errorRes[0] != null && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes} <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
          {/* <CloseIcon className='text-red-500 cursor-pointer hover:scale-125 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/> */}
        </div>
        )}
        <DialogContent>
            {/* <div className='flex space-x-4'> */}
              <form onSubmit={printValues} id="myform" className='flex space-x-4'>
                <div className='flex flex-col space-y-2'>
                  <h1 className='text-center text-xs sm:text-sm font-semibold text-gray-800 mb-1'>פרטים שיראו הלקוחות שלך</h1>
                  <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
    <div dir="rtl">
                  <TextField type="text" label="עיר שתופיע על גבי חשבוניות" defaultValue={user?.city} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setCity(e.target.value)}/>
                  </div>
  </ThemeProvider>
</CacheProvider>
<CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
    <div dir="rtl">
                  <TextField type="text" label="רחוב שיופיע על גבי חשבוניות" defaultValue={user?.address} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setAddress(e.target.value)}/>
                  </div>
  </ThemeProvider>
</CacheProvider>
<CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
                  <TextField type="text" label="מס' רחוב שיופיע על גבי חשבוניות" defaultValue={user?.addressNumber} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setAddressNumber(e.target.value)}/>
                  </ThemeProvider>
</CacheProvider>
<CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
                  <TextField type="text" label="טלפון שיופיע על גבי חשבוניות" defaultValue={user?.phoneForReceipt} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setPhoneForReceipt(e.target.value)}/>
                  </ThemeProvider>
</CacheProvider>
<CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
                  <TextField type="text" label="אימייל שיופיע על גבי חשבוניות" className='bg-white shadow-xl rounded-md px-2 py-2' defaultValue={user?.emailForReceipt} onChange={e => setEmailForReceipt(e.target.value)}/>
                  </ThemeProvider>
</CacheProvider>
                  {/* <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={(e)=> {setIsOpen(false)
                  e.preventDefault()}} >בטל</button> */}
                  <button type='submit' className='bg-blue-200 px-2 py-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>עדכן</button>

                </div>

                <div className='flex flex-col space-y-2'>
                <h1 className='text-center text-xs sm:text-sm font-semibold text-gray-800 mb-1'>פרטים עבור נרטינה פתרונות תוכנה</h1>
                <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
                  <TextField type="text" label="מס' חברה/ע.מ" defaultValue={user?.dealerlicensed} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setDealerlicensed(e.target.value)}/>
                  </ThemeProvider>
</CacheProvider>
                  <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
    <div dir="rtl">
                  <TextField type="text" label="שם חברה" className='bg-white shadow-xl rounded-md px-2 py-2' defaultValue={user?.companyName} onChange={e => setCompanyName(e.target.value)}/>
                  </div>
  </ThemeProvider>
</CacheProvider>
<CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
                  <TextField type="text" label="אימייל להתחברות למערכת ויצירת קשר" className='bg-white shadow-xl rounded-md px-2 py-2' defaultValue={user?.email} onChange={e => setEmail(e.target.value)}/>
                  </ThemeProvider>
</CacheProvider>
<CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
                  <TextField type="text" label="מס' טלפון פרטי" defaultValue={user?.phoneNumber} className='bg-white shadow-xl rounded-md px-2 py-2' onChange={e => setPhoneNumber(e.target.value)}/>
                  </ThemeProvider>
</CacheProvider>
                  {/* <button type='submit' className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>עדכן</button> */}
                </div>
                {/* <Button type='submit' variant='contained' className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>עדכן</Button> */}
              </form>
        </DialogContent>
       
    </Dialog>

    <Snackbar open={openAlertAdd} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%','& .MuiAlert-message':{textAlign:"right", width:"inherit"} }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
           פרטי משתמש עודכנו בהצלחה, כעת עליך לבצע יציאה <br /> ולהתחבר מחדש על מנת שהנתונים ישתקפו במערכת
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
    </div>
    
  )
}

export default Profile