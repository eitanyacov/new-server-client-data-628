import React, { useState } from 'react'
import axios from 'axios'
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const Register = () => {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [sucssesRegister, setSucssesRegister] = useState("");
    const [address, setAddress] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dealerlicensed, setDealerlicensed] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    const [emailForReceipt, setEmailForReceipt] = useState("")
    const [phoneForReceipt, setPhoneForReceipt] = useState("")  
    const [open, setOpen] = useState(false);
    const [error, setError] = useState([]);

    const navigate = useNavigate()

    const postData = (e) => {
        e.preventDefault();
        if(dealerlicensed == "" || email == "" || password == "" || companyName == "" || phoneNumber == "") {
          alert("חסרים שדות חובה")
          return
        }
          axios.post("https://nartina.com/api/v1/auth/add-user", {
            firstName,
            lastName,
            email,
            city,
            addressNumber,
            address,
            companyName,
            phoneNumber,
            dealerlicensed,
            emailForReceipt,
            phoneForReceipt,
            password
          }).then(res => {setSucssesRegister("Welcome " + res.data.email +" go to login page")
            window.location.href("/")})
          .catch(err => setError(err.response.data))
          setFirstName("")
          setAddress("")
          setCompanyName("")
          setLastName("")
          setDealerlicensed("")
          setEmail("")
          setPhoneNumber("")
          setPassword("")
          // setError("")
          // navigate('/login')
        
    }

    const handleClose = () => {
      setOpen(false)
    }
   
  return (
    <div className='flex flex-col mx-auto h-fit items-center mt-5 w-fit'>
         <form onSubmit={postData} className='flex space-x-2 border-t-4 bg-white shadow-xl first-letter: border px-5 py-3 rounded-lg'>
           <div className='flex flex-col'>
              <h1 className='text-xs font-semibold'>פרטים שיופיעו על גבי חשבוניות וקבלות שיוצאו ללקוחות</h1>
              <input type="text" value={dealerlicensed} placeholder='מס ע.מ/חברה' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setDealerlicensed(e.target.value)}/>
              <h1 className='text-xs font-semibold text-center'>כתובת</h1>
              <input type="text" value={city} placeholder='עיר' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setCity(e.target.value)}/>
              <input type="text" value={address} placeholder=' שם רחוב (ללא מספר רחוב)' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setAddress(e.target.value)}/>
              <input type="text" value={addressNumber} placeholder='מספר רחוב' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setAddressNumber(e.target.value)}/>
              <h1 className='text-xs font-semibold text-center'>פרטי התקשרות ללקוחות שלכם</h1>
              <input type="text" value={emailForReceipt} placeholder='אימייל על גבי חשבוניות' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setEmailForReceipt(e.target.value)}/>
              <input type="text" value={phoneForReceipt} placeholder='טלפון על גבי חשבוניות' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setPhoneForReceipt(e.target.value)}/>
              <h1 className='text-xs font-semibold text-center'>סיסמא</h1>
              <input type="password" value={password} placeholder='סיסמא' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setPassword(e.target.value)}/>
              <button type='submit' disabled={dealerlicensed == "" || email == "" || password == "" || companyName == "" || phoneNumber == ""} className='bg-blue-500 px-4 font-mono py-1 mt-4 rounded-md text-white font-semibold hover:bg-blue-400'>הרשמה לתוכנה</button>
           </div>
           <div className='flex flex-col'>
              <h1 className='text-xs font-semibold text-center'>פרטים אישיים שישמשו את נרטינה ליצירת קשר איתכם</h1>
              <input type="text" value={firstName} placeholder='שם פרטי' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setFirstName(e.target.value)}/>
              <input type="text" value={lastName} placeholder='שם משפחה' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setLastName(e.target.value)}/>
              <input type="text" value={companyName} placeholder='שם חברה' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setCompanyName(e.target.value)}/>
              <input type="email" value={email} placeholder='אימייל להתקשרות' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setEmail(e.target.value)}/>
              <input type="text" value={phoneNumber} placeholder='טלפון להתקשרות' className='bg-white shadow-xl placeholder:text-right text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72' onChange={(e)=> setPhoneNumber(e.target.value)}/>
           </div>
         </form>
         <button onClick={()=> navigate('/login')} className='bg-green-400 rounded-full px-4 hover:bg-green-300'>GO TO LOGIN PAGE</button>
         {error != "" && <Alert severity="error" >{error}</Alert>}
         {sucssesRegister != "" && <div className='flex space-x-8'>
         <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
         <Alert severity="success" onClose={handleClose}>{sucssesRegister}</Alert>
         </Snackbar>
         </div>}
      </div> 
  )
}

export default Register