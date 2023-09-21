import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Snackbar } from '@mui/material';
import img from '../assets/stats-pic.png'
import logo from '../assets/login-logo.png'
import { Dialog } from '@mui/material'
import Swal from 'sweetalert2'
// import { set } from 'date-fns';




const Login = () => {
    const [email, setEmail] = useState("");
    // const [result, setResult] = useState("");
    const [emailForgetPassword, setEmailForgetPassword] = useState("");
    const [password, setPassword] = useState("");
    // const [status, setStatus] = useState();
    const [msg, setMsg] = useState(false);
    const [error, setError] = useState([]);
    const [error2, setError2] = useState("");
    // const [error3, setError3] = useState("");
    const [errorOtp, setErrorOtp] = useState("");
    const [responseOtp, setResponseOtp] = useState("");
    // const [user, setUser] = useState({});
    const [mode, setMode] = useState(false);
    const [mode1, setMode1] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [focus, setFocus] = useState(false);
    // const [focus2, setFocus2] = useState(false);
    const [otpMode, setOtpMode] = useState(false);
    const [otpMode2, setOtpMode2] = useState(false);
    const [otp, setOtp] = useState();
    const [updatePassword, setUpdatePassword] = useState("");
    const [updatePasswordConfirm, setUpdatePasswordConfirm] = useState("");
    const [updatePasswordResponse, setUpdatePasswordResponse] = useState("");
    const [updatePasswordResponseError, setUpdatePasswordResponseError] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [xxx, setXxx] = useState(false);
    const [regex, setRegex] = useState("");
    const [regexAlert, setRegexAlert] = useState(false);
    // const [toogleMenu, setToogleMenu] = useState(false);
    const [inputValues, setInputValues] = useState({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
    });

    // const location = useLocation()
    const navigate = useNavigate()

    const input1Ref = useRef();
    const input2Ref = useRef();
    const input3Ref = useRef();
    const input4Ref = useRef();
    const input5Ref = useRef();
    const input6Ref = useRef();


    const handleKeyUp = (event, inputRef) => {
      const maxLength = event.target.attributes.maxLength.value;
      const currentLength = event.target.value.length;
      if (currentLength >= maxLength) {
        inputRef.current.focus();
      }
    };

    // const img = new URL('../../public/graph-gc2fb33882_1920.png', import.meta.url)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email == "" || password == "") {
          alert("שדות חובה חסרים")
          return
        }
        // Basic email validation using regex
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if(!emailRegex.test(email)) {
        //   alert("אימייל לא נכון")
        //   return
        // }
        // axios.post("http://nartina.eu-central-1.elasticbeanstalk.com/api/admin/login", {
          axios.post("https://nartina.com/api/v1/auth/authenticate", {
          email,
          password
        }).then(res => {
          localStorage.setItem("user", JSON.stringify(res.data))
          // window.location.href = "/dashboard"
          console.log(res.data) 
          if(res.data == "mfa") {
            setOtpMode2(true)
            return
          }
          if(res.data.role == "ROLE_USER" || res.data.role == "ROLE_ADMIN") {
            navigate("/")
          }else if (res.data.role == "ROLE_WORKER" && res.data.subRole == "MASTER"){
            navigate("/tasks")
          } else if (res.data.role == "ROLE_WORKER" && res.data.subRole == "WORKER"){
            navigate("/workers-page")
          } else if (res.data.role == "ROLE_WORKER" && res.data.subRole == "MANGER"){
            navigate("/invoices")
          }
          
          window.location.reload()
        })
        .catch(err => {
          console.log(err.response.data)
          Swal.fire("מצטערים", 'קרתה תקלה, פרטים שגויים', "error");
          setError(err.response.data)
         
        })
        // setEmail("")
        // setPassword("")
        // setError("")
        
      }

      // const handleSubmit2 = (e) => {
      //   e.preventDefault();
      //   setLoading(false)
      //   axios.get("http://businessnartinaapp-env.eba-cqgg9mpb.eu-central-1.elasticbeanstalk.com/api/user/forget-password/" + emailForgetPassword)
      //   .then(res => setResult(res.data))
      //   .catch(err => setError2(err.response.data))
      //   setError2("")
      //   setLoading(true)
      // }

      const handleSubmit2 = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.get("https://nartina.com/api/v1/auth/get-otp/" + emailForgetPassword)
        .then(res => {
        setOtpMode(true)
        setLoading(false)})
        .catch(err => {setError2(err.response.data)
          setLoading(false)})
        setError2("")
        
        
      }

      const getPhone = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.get("https://nartina.com/api/v1/auth/get-phone/" + emailForgetPassword)
        .then(res => {
          console.log(res.data)
          setPhone(res.data)
          setLoading(false)
          setOtpMode(true)})
          .catch(err => {setError2(err.response.data)
            console.log(err.response.data)})
      }

      // const sendOtp = () => {
      //   axios.get("https://nartina.com/api/v1/auth/validate-otp/" + otp + "/" + emailForgetPassword)
      //   .then(res => {setResponseOtp(res.data)
      //   setOtp("")
      //   setRegexAlert(true)})
      //   .catch(err => setErrorOtp(err.response.data))
      //   setOtp("")
      // }

      const sendOtp2 = (e) => { 
        e.preventDefault();
        const concatenatedValue =
      inputValues.input1 +
      inputValues.input2 +
      inputValues.input3 +
      inputValues.input4 +
      inputValues.input5 +
      inputValues.input6;
      axios.post("https://nartina.com/api/v1/auth/authenticate-mfa/" + concatenatedValue, {
          email,
          password
        }).then(res => {
          localStorage.setItem("user", JSON.stringify(res.data))
          // window.location.href = "/dashboard"
          console.log(res.data) 
          // if(res.data == "mfa") {
          //   setOtpMode2(true)
          //   return
          // }
          if(res.data.role == "ROLE_USER" || res.data.role == "ROLE_ADMIN") {
            navigate("/")
          }else if (res.data.role == "ROLE_WORKER" && res.data.subRole == "MASTER"){
            navigate("/tasks")
          } else if (res.data.role == "ROLE_WORKER" && res.data.subRole == "WORKER"){
            navigate("/workers-page")
          } else if (res.data.role == "ROLE_WORKER" && res.data.subRole == "MANGER"){
            navigate("/invoices")
          }
          
          window.location.reload()
        })
        .catch(err => {
          console.log(err.response.data.error)
          setOtpMode2(false)
          setInputValues({})
          Swal.fire("מצטערים", 'קרתה תקלה, פרטים שגויים', "error");
          // setError(err.response.data)
         
        })
      }
      

      const sendOtp = (e) => {
        e.preventDefault();
        const concatenatedValue =
      inputValues.input1 +
      inputValues.input2 +
      inputValues.input3 +
      inputValues.input4 +
      inputValues.input5 +
      inputValues.input6;
        axios.get("https://nartina.com/api/v1/auth/validate-otp/" + concatenatedValue + "/" + emailForgetPassword)
        .then(res => {setResponseOtp(res.data)
        setOtp("")
        setRegexAlert(true)})
        .catch(err => setErrorOtp(err.response.data))
        setOtp("")
      }

      const goBack = () => {
        setResponseOtp("")
        setOtpMode(false)
        setRegexAlert(false)
        setMode(false)
        setEmailForgetPassword("")
        setInputValues({})
      }

      const updatePasswordFunction = (e) => {
        e.preventDefault();
        if(updatePassword == updatePasswordConfirm) {
         const test = checkPasswordValidation(updatePassword);
         if(test == null) {
          axios.get("https://nartina.com/api/v1/auth/update-user-password/" + emailForgetPassword + "/" + updatePassword)
          .then(res => {setUpdatePasswordResponse(res.data)
          setResponseOtp("")
        setMessage("סיסמא עודכנה בהצלחה")
        setOtpMode(false)
        setRegexAlert(false)
        setMode(false)
        setMsg(true)
        setEmailForgetPassword("")
        setInputValues({})
        // navigate('/login')
       })
          .catch(res => console.log(res.response.data))
         }else {
          setRegex(test)
          setUpdatePasswordResponseError("")
         }
        }else {
          setResponseOtp("ok")
          setXxx(true)
          setUpdatePasswordResponseError("סיסמאות לא תואמות")
          setResponseOtp("ok")
          setUpdatePassword("")
          setUpdatePasswordConfirm("")
        }
       
      }

      function checkPasswordValidation(value) {
        const isWhitespace = /^(?=.*\s)/;
        if (isWhitespace.test(value)) {
          return "Password must not contain Whitespaces.";
        }
    
    
        const isContainsUppercase = /^(?=.*[A-Z])/;
        if (!isContainsUppercase.test(value)) {
          return "Password must have at least one Uppercase Character.";
        }
    
    
        const isContainsLowercase = /^(?=.*[a-z])/;
        if (!isContainsLowercase.test(value)) {
          return "Password must have at least one Lowercase Character.";
        }
    
    
        const isContainsNumber = /^(?=.*[0-9])/;
        if (!isContainsNumber.test(value)) {
          return "Password must contain at least one Digit.";
        }
    
    
        const isContainsSymbol =
          /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
        if (!isContainsSymbol.test(value)) {
          return "Password must contain at least one Special Symbol.";
        }
    
    
        const isValidLength = /^.{10,16}$/;
        if (!isValidLength.test(value)) {
          return "Password must be 10-16 Characters Long.";
        }
      
      return null;
    };

    // const password1 = "weakPassword";
    // const password2 = "StrongPass@3r55";
    // const password3 = "St rongPass@3r55";
    
    
    // console.log(checkPasswordValidation(password1));  //Password must contain at least one Digit.
    // console.log(checkPasswordValidation(password2));  //null
    // console.log(checkPasswordValidation(password3));

    const handleClose = () => {
      setRegexAlert(false)
    }

    const handleCloseMsg = () => {
      setMsg(false)
    }


  return (
    <>
 
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          {/* <img src={logo} className='hidden xr:block absolute -top-14 w-72 -left-4 z-50'/> */}
          <img src={logo} className='hidden xr:block absolute top-8 w-80 z-50'/>
        {!mode ? (
          <>
          <div className='block xr:hidden'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
           <img src={logo} className='block xr:hidden w-72 z-50'/>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          {error != "" && <div className='mt-2 flex items-center justify-center'><Alert severity="error" sx={{ width: '300px','& .MuiAlert-message':{textAlign:"center", width:"inherit"} }}>{error}<CloseIcon className='text-red-500 relative left-16 cursor-pointer hover:text-red-400' onClick={()=> setError("")}/> </Alert></div>}

        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={email}
                  name="email"
                  // type="email"
                  type="email"
                  autoComplete="email"
                  required={true}
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={e => setEmail(e.target.value)}/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <h1 className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={()=> setMode(true)}>
                    Forgot password?
                  </h1>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  value={password}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={e => setPassword(e.target.value)}/>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <button href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={()=> navigate('/register-app')}>
              Start a 14 day free trial
            </button>
          </p>
        </div>
          </div>
        
  <div class="hidden xr:flex h-full p-8 w-full items-center justify-center relative">
  {/* <!-- component --> */}
<div class="bg-white lg:py-2 fixed -bottom-4">
  <div class="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-[1450px]
      xl:px-5 lg:flex-row">
    <div class="flex flex-col items-center w-full pt-5 pr-10 pb-32 2xl:pb-24 pl-10 lg:pt-20 lg:flex-row">
      <div class="w-full bg-cover relative max-w-md lg:max-w-4xl lg:w-7/12">
        <div class="flex flex-col items-center justify-center w-full h-full relative right-8">
          <img src={img} className='object-cover' />
          {/* <img src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png" class="btn-"/> */}
        </div>
      </div>
      <div class="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-[38%]" dir='rtl'>
        <div class="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10">
          <p class="w-full text-4xl font-medium text-center leading-snug font-sans text-[#333]">טופס כניסה למערכת</p>
          {error != "" && <div className='mt-2 flex items-center justify-center'><Alert severity="error" sx={{ width: '300px','& .MuiAlert-message':{textAlign:"right", width:"inherit"} }}><CloseIcon className='text-red-500 relative right-48 cursor-pointer hover:text-red-400' onClick={()=> setError("")}/>{error} </Alert></div>}
          <form onSubmit={handleSubmit} class="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
           
            <div class="relative">
              <p class="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-0 mb-0 mr-2 font-medium text-gray-600 absolute">כתובת אימייל</p>
              <input required={true} value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" type="text" class="border placeholder:text-left text-left placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"/>
            </div>
            <div class="relative">
              <p class="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-0 mb-0 mr-2 font-medium text-gray-600
                  absolute">סיסמא</p>
              <input required={true} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" class="border placeholder:text-left text-left placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"/>
            </div>
            <div class="flex items-center justify-between">
                      <div class="flex items-start relative bottom-0.5">
                          <div class="flex items-center justify-center h-5">
                            {/* <input
                              class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue-500 checked:bg-blue-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                              type="checkbox"
                              value={true}
                              id="exampleCheck2" /> */}
                              <input
                type="checkbox"
                id="MarketingAccept"
                name="marketing_accept"
                className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
              />
                          </div>
                          <div class="mr-8 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300 relative left-6">זכור אותי</label>
                          </div>
                      </div>
                      <h1 class="text-sm font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500" onClick={()=> setMode(true)}>שכחת סיסמא?</h1>
                  </div>
            <div class="relative">
              <button disabled={email == "" || password == ""} type='submit' class="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease">Submit</button>
            </div>
            <div className='flex items-center justify-start'>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
               אין לך חשבון עדיין? 
              </p>
              <h1 class="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-2 cursor-pointer hover:text-blue-500" onClick={()=> navigate("/land")}>הירשם</h1>
           </div>
          </form>
        </div>
        <svg viewbox="0 0 91 91" class="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
            fill-current"><g stroke="none" strokewidth="1" fillrule="evenodd"><g fillrule="nonzero"><g><g><circle
            cx="3.261" cy="3.445" r="2.72"/><circle cx="15.296" cy="3.445" r="2.719"/><circle cx="27.333" cy="3.445"
            r="2.72"/><circle cx="39.369" cy="3.445" r="2.72"/><circle cx="51.405" cy="3.445" r="2.72"/><circle cx="63.441"
            cy="3.445" r="2.72"/><circle cx="75.479" cy="3.445" r="2.72"/><circle cx="87.514" cy="3.445" r="2.719"/></g><g
            transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72"/><circle cx="15.296" cy="3.525"
            r="2.719"/><circle cx="27.333" cy="3.525" r="2.72"/><circle cx="39.369" cy="3.525" r="2.72"/><circle
            cx="51.405" cy="3.525" r="2.72"/><circle cx="63.441" cy="3.525" r="2.72"/><circle cx="75.479" cy="3.525"
            r="2.72"/><circle cx="87.514" cy="3.525" r="2.719"/></g><g transform="translate(0 24)"><circle cx="3.261"
            cy="3.605" r="2.72"/><circle cx="15.296" cy="3.605" r="2.719"/><circle cx="27.333" cy="3.605" r="2.72"/><circle
            cx="39.369" cy="3.605" r="2.72"/><circle cx="51.405" cy="3.605" r="2.72"/><circle cx="63.441" cy="3.605"
            r="2.72"/><circle cx="75.479" cy="3.605" r="2.72"/><circle cx="87.514" cy="3.605" r="2.719"/></g><g
            transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72"/><circle cx="15.296" cy="3.686"
            r="2.719"/><circle cx="27.333" cy="3.686" r="2.72"/><circle cx="39.369" cy="3.686" r="2.72"/><circle
            cx="51.405" cy="3.686" r="2.72"/><circle cx="63.441" cy="3.686" r="2.72"/><circle cx="75.479" cy="3.686"
            r="2.72"/><circle cx="87.514" cy="3.686" r="2.719"/></g><g transform="translate(0 49)"><circle cx="3.261"
            cy="2.767" r="2.72"/><circle cx="15.296" cy="2.767" r="2.719"/><circle cx="27.333" cy="2.767" r="2.72"/><circle
            cx="39.369" cy="2.767" r="2.72"/><circle cx="51.405" cy="2.767" r="2.72"/><circle cx="63.441" cy="2.767"
            r="2.72"/><circle cx="75.479" cy="2.767" r="2.72"/><circle cx="87.514" cy="2.767" r="2.719"/></g><g
            transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72"/><circle cx="15.296" cy="2.846"
            r="2.719"/><circle cx="27.333" cy="2.846" r="2.72"/><circle cx="39.369" cy="2.846" r="2.72"/><circle
            cx="51.405" cy="2.846" r="2.72"/><circle cx="63.441" cy="2.846" r="2.72"/><circle cx="75.479" cy="2.846"
            r="2.72"/><circle cx="87.514" cy="2.846" r="2.719"/></g><g transform="translate(0 73)"><circle cx="3.261"
            cy="2.926" r="2.72"/><circle cx="15.296" cy="2.926" r="2.719"/><circle cx="27.333" cy="2.926" r="2.72"/><circle
            cx="39.369" cy="2.926" r="2.72"/><circle cx="51.405" cy="2.926" r="2.72"/><circle cx="63.441" cy="2.926"
            r="2.72"/><circle cx="75.479" cy="2.926" r="2.72"/><circle cx="87.514" cy="2.926" r="2.719"/></g><g
            transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72"/><circle cx="15.296" cy="3.006"
            r="2.719"/><circle cx="27.333" cy="3.006" r="2.72"/><circle cx="39.369" cy="3.006" r="2.72"/><circle
            cx="51.405" cy="3.006" r="2.72"/><circle cx="63.441" cy="3.006" r="2.72"/><circle cx="75.479" cy="3.006"
            r="2.72"/><circle cx="87.514" cy="3.006" r="2.719"/></g></g></g></g></svg>
        <svg viewbox="0 0 91 91" class="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
            fill-current"><g stroke="none" strokewidth="1" fillrule="evenodd"><g fillrule="nonzero"><g><g><circle
            cx="3.261" cy="3.445" r="2.72"/><circle cx="15.296" cy="3.445" r="2.719"/><circle cx="27.333" cy="3.445"
            r="2.72"/><circle cx="39.369" cy="3.445" r="2.72"/><circle cx="51.405" cy="3.445" r="2.72"/><circle cx="63.441"
            cy="3.445" r="2.72"/><circle cx="75.479" cy="3.445" r="2.72"/><circle cx="87.514" cy="3.445" r="2.719"/></g><g
            transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72"/><circle cx="15.296" cy="3.525"
            r="2.719"/><circle cx="27.333" cy="3.525" r="2.72"/><circle cx="39.369" cy="3.525" r="2.72"/><circle
            cx="51.405" cy="3.525" r="2.72"/><circle cx="63.441" cy="3.525" r="2.72"/><circle cx="75.479" cy="3.525"
            r="2.72"/><circle cx="87.514" cy="3.525" r="2.719"/></g><g transform="translate(0 24)"><circle cx="3.261"
            cy="3.605" r="2.72"/><circle cx="15.296" cy="3.605" r="2.719"/><circle cx="27.333" cy="3.605" r="2.72"/><circle
            cx="39.369" cy="3.605" r="2.72"/><circle cx="51.405" cy="3.605" r="2.72"/><circle cx="63.441" cy="3.605"
            r="2.72"/><circle cx="75.479" cy="3.605" r="2.72"/><circle cx="87.514" cy="3.605" r="2.719"/></g><g
            transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72"/><circle cx="15.296" cy="3.686"
            r="2.719"/><circle cx="27.333" cy="3.686" r="2.72"/><circle cx="39.369" cy="3.686" r="2.72"/><circle
            cx="51.405" cy="3.686" r="2.72"/><circle cx="63.441" cy="3.686" r="2.72"/><circle cx="75.479" cy="3.686"
            r="2.72"/><circle cx="87.514" cy="3.686" r="2.719"/></g><g transform="translate(0 49)"><circle cx="3.261"
            cy="2.767" r="2.72"/><circle cx="15.296" cy="2.767" r="2.719"/><circle cx="27.333" cy="2.767" r="2.72"/><circle
            cx="39.369" cy="2.767" r="2.72"/><circle cx="51.405" cy="2.767" r="2.72"/><circle cx="63.441" cy="2.767"
            r="2.72"/><circle cx="75.479" cy="2.767" r="2.72"/><circle cx="87.514" cy="2.767" r="2.719"/></g><g
            transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72"/><circle cx="15.296" cy="2.846"
            r="2.719"/><circle cx="27.333" cy="2.846" r="2.72"/><circle cx="39.369" cy="2.846" r="2.72"/><circle
            cx="51.405" cy="2.846" r="2.72"/><circle cx="63.441" cy="2.846" r="2.72"/><circle cx="75.479" cy="2.846"
            r="2.72"/><circle cx="87.514" cy="2.846" r="2.719"/></g><g transform="translate(0 73)"><circle cx="3.261"
            cy="2.926" r="2.72"/><circle cx="15.296" cy="2.926" r="2.719"/><circle cx="27.333" cy="2.926" r="2.72"/><circle
            cx="39.369" cy="2.926" r="2.72"/><circle cx="51.405" cy="2.926" r="2.72"/><circle cx="63.441" cy="2.926"
            r="2.72"/><circle cx="75.479" cy="2.926" r="2.72"/><circle cx="87.514" cy="2.926" r="2.719"/></g><g
            transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72"/><circle cx="15.296" cy="3.006"
            r="2.719"/><circle cx="27.333" cy="3.006" r="2.72"/><circle cx="39.369" cy="3.006" r="2.72"/><circle
            cx="51.405" cy="3.006" r="2.72"/><circle cx="63.441" cy="3.006" r="2.72"/><circle cx="75.479" cy="3.006"
            r="2.72"/><circle cx="87.514" cy="3.006" r="2.719"/></g></g></g></g></svg>
      </div>
    </div>
  </div>
</div>
  
        
    <h1 className='text-center fixed bottom-2 text-gray-800'>.כל הזכויות שמורות לנרטינה פתרונות תוכנה<span className='font-mono'>&#169;</span> <span className='font-mono'>2023</span></h1>
  </div>
          </>
        ) : (
          <>
        {!mode1 ? (
             <main id="content" role="main" class={`${otpMode && 'hidden'} w-full max-w-md mx-auto p-6`}>
             <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
               <div class="p-4 sm:p-7">
                 <div class="text-center">
                   <h1 class="block text-3xl font-bold text-gray-800 dark:text-white">?שכחת סיסמא</h1>
                   <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                     ?זוכר את הסיסמא
                     <h1 class="text-blue-600 decoration-2 hover:underline font-medium cursor-pointer" onClick={()=> setMode(false)} >
                       כניסה לחשבון 
                     </h1>
                     <h1 class="text-white bg-green-600 rounded-md decoration-2 hover:bg-green-700 font-medium cursor-pointer" onClick={()=> setMode1(true)} >
                       קבלת סיסמא באמצעות סמס
                     </h1>
                   </p>
                 </div>
         
                 <div class="mt-5">
                   <form>
                     <div class="grid gap-y-4">
                       <div>
                         <label for="email" class="block text-sm text-right font-bold mr-1 mb-2 dark:text-white">כתובת אימייל</label>
                         <div class="relative">
                           <input value={emailForgetPassword} type="email" id="email" name="email" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" onChange={(e)=> setEmailForgetPassword(e.target.value)}/>
                         </div>
                         <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                       </div>
                       {loading ? (
                         <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                         <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                         </svg>
                         Loading...
                     </button>
                       ) : (
                         <button disabled={emailForgetPassword == ""} type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={handleSubmit2}>איפוס סיסמא</button>
                       )}
                     </div>
                   {true && (
                      <>
                      {error2 &&<h1 className='text-red-500 text-center mt-2'>{error2}</h1>}
                     </>
                   )}
                   </form>
                 </div>
               </div>
             </div>
         
             <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
               <a class="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#" target="_blank">
                 <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                   <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                 </svg>
                 View Github
               </a>
               <a class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">
                 
                 Contact us!
               </a>
             </p>
           </main>
        ) : (
          <main id="content" role="main" class={`${otpMode && 'hidden'} w-full max-w-md mx-auto p-6`}>
          <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="p-4 sm:p-7">
              <div class="text-center">
                <h1 class="block text-3xl font-bold text-gray-800 dark:text-white">?שכחת סיסמא</h1>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  ?זוכר את הסיסמא
                  <h1 class="text-blue-600 decoration-2 hover:underline font-medium cursor-pointer" onClick={()=> setMode(false)} >
                    כניסה לחשבון 
                  </h1>
                  {/* {phone != "" && (
                  <h1 class="text-gray-600 decoration-2 hover:underline font-medium cursor-pointer" >
                        {"********" + phone.substring(7)} סיסמא נשלחה לטלפון שמסתיים ב
                  </h1>
                  )} */}
                </p>
              </div>
      
              <div class="mt-5">
                <form>
                  <div class="grid gap-y-4">
                    <div>
                      <label for="email" class="block text-sm text-right font-bold mr-1 mb-2 dark:text-white">כתובת אימייל</label>
                      <div class="relative">
                        <input value={emailForgetPassword} type="email" id="email" name="email" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" onChange={(e)=> setEmailForgetPassword(e.target.value)}/>
                      </div>
                      <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                    </div>
                    {loading ? (
                      <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                      <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                      </svg>
                      Loading...
                  </button>
                    ) : (
                      <button disabled={emailForgetPassword == ""} type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={getPhone}>איפוס סיסמא</button>
                    )}
                  </div>
                {true && (
                   <>
                   {error2 &&<h1 className='text-red-500 text-center mt-2'>{error2}</h1>}
                  </>
                )}
                </form>
              </div>
            </div>
          </div>
      
          <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
            <a class="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#" target="_blank">
              <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View Github
            </a>
            <a class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">
              
              Contact us!
            </a>
          </p>
        </main>
        )}
          </>
        )}

      {otpMode && (
         <div class="relative flex flex-col justify-center overflow-hidden bg-gray-50 py-12">
          {responseOtp != "ok" && xxx == false ? (
            <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
           <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
             <div class="flex flex-col items-center justify-center text-center space-y-2">
               <div class="font-semibold text-3xl">
                 <p>Email Verification</p>
               </div>
               {phone != "" ? (
                  <h1 class="text-gray-600 decoration-2 hover:underline font-medium cursor-pointer" >
                        {"********" + phone.substring(7)} סיסמא נשלחה לטלפון שמסתיים ב
                  </h1>
                  ) : (
                <div class="flex flex-row text-sm font-medium text-gray-400">
                 <p>We have sent a code to your email {emailForgetPassword}</p>
               </div>
                  )}
               
                {loading && <CircularProgress color="primary" size={65}/>}
                {errorOtp && <h1 className='text-center font-mono text-red-600 text-xl'>{errorOtp}</h1>}
             </div>
       
             <div>
               <form onSubmit={sendOtp}>
                 <div class="flex flex-col space-y-16">
                   <div class="flex flex-row items-center justify-between mx-auto space-x-1 xxss:space-x-2">
                     <input
  class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
  type="text"
  name="input1"
  id="input1"
  value={inputValues.input1}
  onChange={(event) =>
    setInputValues({
      ...inputValues,
      input1: event.target.value,
    })
  }
  ref={input1Ref}
  maxLength="1"
  onKeyUp={(event) => handleKeyUp(event, input2Ref)}
/>

<input
  class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
  type="text"
  name="input2"
  id="input2"
  value={inputValues.input2}
  onChange={(event) =>
    setInputValues({
      ...inputValues,
      input2: event.target.value,
    })
  }
  ref={input2Ref}
  maxLength="1"
  onKeyUp={(event) => handleKeyUp(event, input3Ref)}
  
/>

<input
  class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
  type="text"
  name="input3"
  id="input3"
  value={inputValues.input3}
  onChange={(event) =>
    setInputValues({
      ...inputValues,
      input3: event.target.value,
    })
  }
  ref={input3Ref}
  maxLength="1"
  onKeyUp={(event) => handleKeyUp(event, input4Ref)}
/>

<input
  class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
  type="text"
  name="input4"
  id="input4"
  value={inputValues.input4}
  onChange={(event) =>
    setInputValues({
      ...inputValues,
      input4: event.target.value,
    })
  }
  ref={input4Ref}
  maxLength="1"
  onKeyUp={(event) => handleKeyUp(event, input5Ref)}
/>
<input
  class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
  type="text"
  name="input5"
  id="input5"
  value={inputValues.input5}
  onChange={(event) =>
    setInputValues({
      ...inputValues,
      input5: event.target.value,
    })
  }
  ref={input5Ref}
  maxLength="1"
  onKeyUp={(event) => handleKeyUp(event, input6Ref)}
/>
<input
  class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
  type="text"
  name="input6"
  id="input6"
  value={inputValues.input6}
  onChange={(event) =>
    setInputValues({
      ...inputValues,
      input6: event.target.value,
    })
  }
  ref={input6Ref}
  maxLength="1"
  onKeyUp={sendOtp}
/>
                   </div>
       
                   <div class="flex flex-col space-y-5">
                     <div>
                      
 <button
  class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
  type='submit'
>
  Verify Account
</button>
                     </div>
       
                     <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                       <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                     </div>
                   </div>
                 </div>
               </form>
             </div>
           </div>
         </div>
          ) : (
           
            <>
            <section class="">
  <div class="container max-h-full px-6 py-20 overflow-y-hidden">
    <div
      class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="w-full"
          alt="Phone image" />
      </div>

      <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
        <h1 className='text-center text-5xl mb-14 font-bold text-[#373D3F]'>עידכון סיסמא</h1>
        <form onSubmit={updatePasswordFunction}>
          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
              type="password"
              class="peer block min-h-[auto] border border-gray-400 w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput3"
              // placeholder='הכנס סיסמא חדשה' 
              onChange={(e) => setUpdatePassword(e.target.value)}/>
            <label
              for="exampleFormControlInput3"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >סיסמא 
            </label>
          </div>

          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
              type="password"
              class="peer block border border-gray-400 min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput33"
              // placeholder='וידוא סיסמא חדשה' 
              onChange={(e) => setUpdatePasswordConfirm(e.target.value)}/>
            <label
              for="exampleFormControlInput33"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >וידוא סיסמא
            </label>
          </div>

          <button
            type="submit"
            class="inline-block w-full rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light">
            עדכן סיסמא
          </button>

          <div
            class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
              או
            </p>
          </div>
          <button
            class="inline-block w-full rounded bg-[#3B5998] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={goBack} >
             חזור אחורה
          </button>
          <div className='mt-4'>
            {updatePasswordResponseError != "" && <h1 className='text-center text-red-600'>{updatePasswordResponseError}</h1>}
            {regex != "" && <h1 className='text-center text-red-600'>{regex}</h1>}
          </div>
          

        </form>
      </div>
    </div>
  </div>
</section>
            </>
          )} 
          {updatePasswordResponse != "" && <h1 className='text-center font-mono font-semibold text-xl text-green-600'>{updatePasswordResponse}</h1>}

       </div>
      )}

      
      </div>


<Dialog open={otpMode2}>

        <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <div class="font-semibold text-3xl">
              <p>אימות דו שלבי</p>
            </div>
            <div class="flex flex-row text-sm font-medium text-gray-400">
              <p>שלחנו לך קוד סודי לתיבת האימייל</p>
            </div>
             {loading && <CircularProgress color="primary" size={65}/>}
             {errorOtp && <h1 className='text-center font-mono text-red-600 text-xl'>{errorOtp}</h1>}
          </div>
    
          <div>
            <form onSubmit={sendOtp2}>
              <div class="flex flex-col space-y-16">
                <div class="flex flex-row items-center justify-between mx-auto space-x-1 xxss:space-x-2">
                  <input
class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
type="text"
name="input1"
id="input1"
value={inputValues.input1}
onChange={(event) =>
 setInputValues({
   ...inputValues,
   input1: event.target.value,
 })
}
ref={input1Ref}
maxLength="1"
onKeyUp={(event) => handleKeyUp(event, input2Ref)}
/>

<input
class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
type="text"
name="input2"
id="input2"
value={inputValues.input2}
onChange={(event) =>
 setInputValues({
   ...inputValues,
   input2: event.target.value,
 })
}
ref={input2Ref}
maxLength="1"
onKeyUp={(event) => handleKeyUp(event, input3Ref)}

/>

<input
class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
type="text"
name="input3"
id="input3"
value={inputValues.input3}
onChange={(event) =>
 setInputValues({
   ...inputValues,
   input3: event.target.value,
 })
}
ref={input3Ref}
maxLength="1"
onKeyUp={(event) => handleKeyUp(event, input4Ref)}
/>

<input
class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
type="text"
name="input4"
id="input4"
value={inputValues.input4}
onChange={(event) =>
 setInputValues({
   ...inputValues,
   input4: event.target.value,
 })
}
ref={input4Ref}
maxLength="1"
onKeyUp={(event) => handleKeyUp(event, input5Ref)}
/>
<input
class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
type="text"
name="input5"
id="input5"
value={inputValues.input5}
onChange={(event) =>
 setInputValues({
   ...inputValues,
   input5: event.target.value,
 })
}
ref={input5Ref}
maxLength="1"
onKeyUp={(event) => handleKeyUp(event, input6Ref)}
/>
<input
class="h-9 w-9 xxss:w-10 xxss:h-10 mmu:w-12 sm:w-14 mmu:h-12 sm:h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
type="text"
name="input6"
id="input6"
value={inputValues.input6}
onChange={(event) =>
 setInputValues({
   ...inputValues,
   input6: event.target.value,
 })
}
ref={input6Ref}
maxLength="1"
onKeyUp={sendOtp2}
/>
                </div>
    
                <div class="flex flex-col space-y-5">
                  <div>
                   
<button
class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
type='submit'
>
Verify Account
</button>
                  </div>
    
                  <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-blue-600" href="https://nartina.com" target="_blank" rel="noopener noreferrer">Resend</a>
                  </div>
                  <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>.ניתן לבטל את האימות דו שלבי מדף ההגדרות</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
     
    
</Dialog>
      <Snackbar open={regexAlert} autoHideDuration={60000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
        סיסמא חייבת להכיל 10-16 תיבות, לפחות אות אחת גדולה, אות אחת קטנה, מיספר, וסימן מיוחד
        </Alert>
      </Snackbar>

      <Snackbar open={msg} autoHideDuration={60000} onClose={handleCloseMsg} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleCloseMsg}
          severity="success"
          sx={{ width: "100%" }}
        >
          סיסמא עודכנה בהצלחה
        </Alert>
      </Snackbar>
    </>
    
  )
}

export default Login