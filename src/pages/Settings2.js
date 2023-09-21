import React, { useState, useEffect, useContext, useRef} from 'react';
import { ThemeContext } from "../App";
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import StoreIcon from '@mui/icons-material/Store';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Alert } from '@mui/material'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CircularProgress from '@mui/material/CircularProgress';


import axios from 'axios';
import Swal from 'sweetalert2'



const Settings2 = () => {
    const [active1, setActive1] = useState(true)
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)
    const [active4, setActive4] = useState(false)
    const [active5, setActive5] = useState(false)
    const [passwordMode, setPasswordMode] = useState(false)
    const [image, setImage] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [errors, setErrors] = useState()
    const [error, setError] = useState()

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    // const [address, setAddress] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    // const [city, setCity] = useState("");
    const [dealerlicensed, setDealerlicensed] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(false);
    const [mode1, setMode1] = useState(false);
    const [debtMode, setDebtMode] = useState();
    const [mfaMode, setMfaMode] = useState();

    const [emailForReceipt, setEmailForReceipt] = useState("");
    const [phoneForReceipt, setPhoneForReceipt] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [addressNumber, setAddressNumber] = useState("");

    const [subUser, setSubUser] = useState(false);
    const [errorRes, setErrorRes] = useState([]);
    const [otpMode, setOtpMode] = useState(false);
    const [error2, setError2] = useState("");
    const [responseOtp, setResponseOtp] = useState("");
    const [regexAlert, setRegexAlert] = useState(false);
    const [errorOtp, setErrorOtp] = useState("");
    const [xxx, setXxx] = useState(false);
    const [regex, setRegex] = useState("");
    const [updatePasswordResponse, setUpdatePasswordResponse] = useState("");
    const [updatePasswordResponseError, setUpdatePasswordResponseError] = useState("");
    const [updatePasswordConfirm, setUpdatePasswordConfirm] = useState("");
    const [updatePassword, setUpdatePassword] = useState("");
    const [message, setMessage] = useState("");
    const [otp, setOtp] = useState();
    const [msg, setMsg] = useState(false);


    const [inputValues, setInputValues] = useState({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
    });

    const { hebrew, globalTheme } = useContext(ThemeContext) 
    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

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


    useEffect(()=> {
      axios.get('https://nartina.com/api/user/get-user-debt/' + result?.id)
      .then(res => setDebtMode(res.data))
      .catch(err => console.log(err))
    }, [debtMode])

    useEffect(()=> {
      axios.get('https://nartina.com/api/user/get-user-mfa/' + result?.id)
      .then(res => setMfaMode(res.data))
      .catch(err => console.log(err))
    }, [mfaMode])

    // const getUserDebt = () => {
    //   axios.get('https://nartina.com/api/user/get-user-debt/' + result?.id)
    //   .then(res => setDebtMode(res.data))
    //   .catch(err => console.log(err))
    // }

    const handleActive1 = () => {
        setActive1(true)
        setActive2(false)
        setActive3(false)
        setActive4(false)
        setActive5(false)
      }
      const handleActive2 = () => {
        setActive1(false)
        setActive2(true)
        setActive3(false)
        setActive4(false)
        setActive5(false)
      }
      const handleActive3 = () => {
        setActive1(false)
        setActive2(false)
        setActive3(true)
        setActive4(false)
        setActive5(false)
      }
      const handleActive4 = () => {
        setActive1(false)
        setActive2(false)
        setActive3(false)
        setActive4(true)
        setActive5(false)
      }
      const handleActive5 = () => {
        setActive1(false)
        setActive2(false)
        setActive3(false)
        setActive4(false)
        setActive5(true)
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

      const changeActive = () => {
        setMode(!mode)
      }

      const userDetails = (e) => {
        e.preventDefault();
        axios.post("https://nartina.com/api/user/update-user-details/" + result?.id + "/" + emailForReceipt + "/" + phoneForReceipt + "/" + city + "/" + address + "/" + addressNumber, {
          // emailForReceipt,
          // phoneForReceipt,
          // city,
          // address
        }, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        }).then(res => {
            console.log(res.data)
            Swal.fire("!עודכן", '! פרטים עודכנו בהצלחה', "success");
            setOpenForm(false)
            setEmailForReceipt("")
            setPhoneForReceipt("")
            setCity("")
            setAddress("")
            setAddressNumber("")
           }).catch(err => {
            console.log(err)
            Swal.fire("מצטערים", 'קרתה תקלה, פרטים לא עודכנו', "error");
            // setLoading(false)
            setErrors(err.response.status)})
        // alert("-------------->") 
         
          
      }

      const updatePasswordFunction = (e) => {
        e.preventDefault();
        if(updatePassword == updatePasswordConfirm) {
         const test = checkPasswordValidation(updatePassword);
         if(test == null) {
          axios.get("https://nartina.com/api/v1/auth/update-user-password/" + result?.workersLogin + "/" + updatePassword)
          .then(res => {setUpdatePasswordResponse(res.data)
          setResponseOtp("")
          setMode1(false)
        setMessage("סיסמא עודכנה בהצלחה")
        Swal.fire("!עודכן", '! סיסמא עודכנה בהצלחה', "success");
        setOtpMode(false)
        setRegexAlert(false)
        setMode(false)
        setMsg(true)
        // setEmailForgetPassword("")
        setInputValues({})
        // navigate('/login')
       })
          .catch(res => {console.log(res.response.data)
            Swal.fire("מצטערים", 'קרתה תקלה, פרטים לא עודכנו', "error");})
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


      const changeDebtMode = () => {
        setLoading(true)
        axios.get('https://nartina.com/api/user/update-user-debt/' + result?.id)
        .then(res => {console.log(res.data)
        setDebtMode(res.data)},
        setLoading(false))
        .catch(err => console.log(err))
        .finally(setLoading(false))
      }

      const changeMfaMode = () => {
        setLoading(true)
        axios.get('https://nartina.com/api/user/update-user-mfa/' + result?.id)
        .then(res => {console.log(res.data)
        setMfaMode(res.data)},
        setLoading(false))
        .catch(err => console.log(err))
        .finally(setLoading(false))
      }

      const addSubUser = (e) => {
        setLoading(true)
        e.preventDefault();
        if(email == "" || password == "" || confirmPassword == "") {
          alert("חסרים שדות חובה")
          return
        }
        if(password != confirmPassword) {
            alert("סיסמאות לא תואמות")
            return
          }
          axios.post("https://nartina.com/api/v1/auth/add-workers-user/" + result?.id, {
            email,
            password,
            companyName: result?.companyName,
            phoneNumber: result?.phoneNumber
          }).then(res => {
            console.log(res.data)
            Swal.fire("!הצלחה", '! משתמש חדש הוכנס בהצלחה', "success");
            setLoading(false)
            setSubUser(false)
            localStorage.setItem('subsUsers', true)
            localStorage.setItem('sub', true)

            })
          .catch(err => {setError(err.response.data)
            setSubUser(false)
            Swal.fire("מצטערים", ' ,קרתה תקלה, לא הוכנס משתמש חדש' + err.response.data, "error")})
          .finally(setLoading(false))
          setEmail("")
          setPassword("")
          setConfirmPassword("")
         
        
    }

    const handleSubmit2 = (e) => {
      e.preventDefault();
      setLoading(true)
      axios.get("https://nartina.com/api/v1/auth/get-otp/" + result?.email)
      .then(res => {
      setOtpMode(true)
      setLoading(false)})
      .catch(err => {
        setError2(err.response.data)
        setLoading(false)})
      setError2("")
      
    }

    const goBack = () => {
      setResponseOtp("")
      setOtpMode(false)
      setRegexAlert(false)
      setMode(false)
      // setEmailForgetPassword("")
      setInputValues({})
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

  const sendOtp = (e) => {
    e.preventDefault();
    const concatenatedValue =
  inputValues.input1 +
  inputValues.input2 +
  inputValues.input3 +
  inputValues.input4 +
  inputValues.input5 +
  inputValues.input6;
    axios.get("https://nartina.com/api/v1/auth/validate-otp/" + concatenatedValue + "/" + result?.email)
    .then(res => {setResponseOtp(res.data)
    setOtp("")
    setRegexAlert(true)})
    .catch(err => {setErrorOtp(err.response.data)
    setInputValues({})})
    setOtp("")
  }

  const changePassword = () => {
    axios.get("https://nartina.com/api/user/get-user-workers-login/" + result?.id)
    .then(res => {
      setMode1(true)})
    .catch(err => {
      Swal.fire("מצטערים", ' ,קרתה תקלה, לא הוכנס משתמש חדש' + err.response.data, "error")
    })
    
  }

  return (
   <>
   {!hebrew ? (
    <div class="mx-4 min-h-screen max-w-screen-5xl mdf:mx-2 airx:mr-64 mt-14 sm:mt-28 p-2" dir="rtl">
    {/* <div class="relative my-4 w-56 block sm:hidden">
        <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
        <label for="select-1" class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
        <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white" onClick={handleActive1}>פרטי עסק</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white" onClick={handleActive2}>פרטי חשבון</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white" onClick={handleActive3}>התחברות</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white" onClick={handleActive4}>אמצעי תשלום</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white" onClick={handleActive5}>כללי</li>
        </ul>
      </div> */}
      
      {/* <div className="hidden sm:flex items-center bg-white opacity-80 text-gray-800 sticky top-16 z-50">
      <a rel="noopener noreferrer" href="#" className={`px-5 py-1 border-b-2 ${active1 && 'border-violet-600 text-violet-600'}`} onClick={handleActive1}>פרטי עסק</a>
      <a rel="noopener noreferrer" href="#" className={`px-5 py-1 border-b-2 ${active2 && 'border-violet-600 text-violet-600'}`} onClick={handleActive2}>פרטי חשבון</a>
      <a rel="noopener noreferrer" href="#" className={`px-5 py-1 border-b-2 ${active3 && 'border-violet-600 text-violet-600'}`} onClick={handleActive3}>התחברות</a>
      <a rel="noopener noreferrer" href="#" className={`px-5 py-1 border-b-2 ${active4 && 'border-violet-600 text-violet-600'}`} onClick={handleActive4}>אמצעי תשלום</a>
      <a rel="noopener noreferrer" href="#" className={`px-5 py-1 border-b-2 ${active5 && 'border-violet-600 text-violet-600'}`} onClick={handleActive5}>כללי</a>
      </div> */}
      <div>
  <div class="sm:hidden">
    <label for="Tab" class="sr-only">Tab</label>

    <select id="Tab" class="w-full rounded-lg border-gray-200 h-10">
      <option>Settings</option>
      <option>Messages</option>
      <option>Archive</option>
      <option select>Notifications</option>
    </select>
  </div>

  <div class="hidden sm:block p-4 bg-white opacity-80 text-gray-800 fixed top-16 z-50">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex gap-6" aria-label="Tabs">
        <div
          onClick={handleActive1}
          class={`inline-flex shrink-0 cursor-pointer items-center gap-2 border-b-2 ${active1 && 'border-blue-500 text-blue-600'} px-1 pb-4 text-sm font-medium`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          Settings
        </div>

        <div
          onClick={handleActive2}
          class={`inline-flex shrink-0 cursor-pointer items-center gap-2 border-b-2 ${active2 && 'border-blue-500 text-blue-600'} px-1 pb-4 text-sm font-medium`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
            />
          </svg>

          Messages
        </div>

        <div
          onClick={handleActive3}
          class={`inline-flex shrink-0 cursor-pointer items-center gap-2 border-b-2 ${active3 && 'border-blue-500 text-blue-600'} px-1 pb-4 text-sm font-medium`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>

          Archive
        </div>

        <div
          onClick={handleActive4}
          class={`inline-flex shrink-0 cursor-pointer items-center gap-2 border-b-2 ${active4 && 'border-blue-500 text-blue-600'} px-1 pb-4 text-sm font-medium`}
          aria-current="page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
            />
          </svg>

          Notifications
        </div>
      </nav>
    </div>
  </div>
</div>
  {active1 && (
      <div class="grid grid-cols-8 pt-3">
 
      <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 mdf:px-8 mdf:shadow">
        <div class="pt-4">
          <h1 class="py-2 text-2xl font-semibold">הגדרות חשבון</h1>
          <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> 
        </div>
        <hr class="mt-4 mb-8" />
        <p class="py-2 text-xl font-semibold">אימייל הרשמה</p>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p class="text-gray-600">כתובת האימייל הרשמה שלך <strong>{result?.email}</strong></p>
          <button class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">שינוי</button>
        </div>
        <hr class="mt-4 mb-8" />
        <p class="py-2 text-xl font-semibold">סיסמא</p>
        <div class="flex items-center">
          <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <label for="login-password">
              <span class="text-sm text-gray-500">סיסמא נוכחית</span>
              <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
              </div>
            </label>
            <label for="login-password" className='relative right-2.5'>
              <span class="text-sm text-gray-500">סיסמא חדשה</span>
              <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
              </div>
            </label>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </div>
        <p class="mt-2">לא זוכר את הסיסמא הנוכחית?<a class="text-sm font-semibold text-blue-600 underline decoration-2" href="#">איפוס סיסמא</a></p>
        <button class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">שמור סיסמא</button>
        <hr class="mt-4 mb-8" />
  
        <div class="mb-10">
          <p class="py-2 text-xl font-semibold">מחיקת חשבון</p>
          <p class="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Proceed with caution
          </p>
          <p class="mt-2">Make sure you have taken backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
          <button class="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continue with deletion</button>
        </div>
      </div>
    </div>
  )}
  
  {active2 && (
     <>
     <form className='p-8' dir='rtl'>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">פרופיל משתמש</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
          זהו פרופיל המשתמש שלכם במערכת. לצורך עדכון הגדרות המשתמש, <br/> ניתן ללחוץ על עדכון הגדרות בסרגל המערכת, לחיצה על "פרופיל" תוביל אל הגדרות פרטי המשתמש.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                שם בית עסק
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pr-2 text-gray-500 sm:text-sm"><StoreIcon fontSize='small'/></span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    value={result?.companyName}
                    className="block flex-1 p-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    // placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            {/* <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                 תיאור בית העסק
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600 mr-1"> ניתן לרשום תיאור לגבי בית העסק.</p>
            </div> */}

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                תמונת פרופיל
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={()=> setImage(true)}
                >
                  שינוי תמונה
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                לוגו בית העסק
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-100 relative bottom-2">
        <div className="space-y-2 col-span-full lg:col-span-1">
          <p className="font-semibold text-lg text-[#333]">פרטי הרשמה</p>
          <p className="text-sm text-gray-600">שינוי פרטים אישיים לאחר ההרשמה הראשונית, יתבצע דרך דף הגדרות, ניתן לשנות כתובת, מספר טלפון ומייל.</p>
        </div>
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <label for="firstname" className="text-sm mr-1">שם פרטי</label>
            <input id="firstname" type="text" value={firstName} placeholder="שם פרטי" className="py-2 px-3 block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setFirstName(e.target.value)}/>
          </div>
          <div className="col-span-full sm:col-span-3">
            <label for="lastname" className="text-sm mr-1">שם משפחה</label>
            <input id="lastname" type="text" value={lastName} placeholder="שם משפחה" className="py-2 px-3 block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setLastName(e.target.value)}/>
          </div>
          <div className="col-span-full sm:col-span-3">
            <label for="lastname" className="text-sm mr-1">שם בית עסק</label>
            <input id="lastname" type="text" value={companyName} placeholder="שם עסק" className="py-2 px-3 block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setCompanyName(e.target.value)}/>
          </div>
          <div className="col-span-full sm:col-span-3">
            <label for="email" className="text-sm mr-1">כתובת אימייל</label>
            <input id="email" type="email" value={email} placeholder="כתובת אימייל" className="py-2 px-3 text-left block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 placeholder:text-right focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <div className="col-span-full">
            <label for="address" className="text-sm mr-1">כתובת</label>
            <input id="address" value={address} type="text" placeholder="כתובת" className="py-2 px-3 block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setAddress(e.target.value)}/>
          </div>
          <div className="col-span-full sm:col-span-2">
            <label for="city" className="text-sm mr-1">עיר</label>
            <input id="city" value={city} type="text" placeholder="עיר" className="py-2 px-3 block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setCity(e.target.value)}/>
          </div>
          <div className="col-span-full sm:col-span-2">
            <label for="state" className="text-sm mr-1">מספר ע.מ / חברה</label>
            <input id="state" type="text" value={dealerlicensed} placeholder="מספר ע.מ / חברה" className="py-2 px-3 text-left placeholder:text-right block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setDealerlicensed(e.target.value)}/>
          </div>
          <div className="col-span-full sm:col-span-2">
            <label for="zip" className="text-sm mr-1">מספר טלפון</label>
            <input id="zip" type="text" value={phoneNumber} placeholder="מספר טלפון" className="py-2 px-3 text-left placeholder:text-right block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setPhoneNumber(e.target.value)}/>
          </div>
        </div>
      </fieldset>

      <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-100 relative bottom-7">
        <div className="space-y-2 col-span-full lg:col-span-1">
          <p className="font-semibold text-lg text-[#333]">פרטי התחברות</p>
          <p className="text-sm text-gray-600">האימייל והסיסמא שתזין ישמשו אותך להתחברות למערכת.</p>
        </div>
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <label for="username" className="text-sm mr-1">אימייל התחברות למערכת</label>
            <input id="username" value={email} type="email" placeholder="youremail@io.com" className="py-2 text-left px-3 block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <div className="col-span-full sm:col-span-3">
            <label for="website" className="text-sm mr-1">וידוא אימייל להתחברות</label>
            <input id="website" value={confirmEmail} type="email" placeholder="youremail@io.com" className="py-2 text-left px-3 block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setConfirmEmail(e.target.value)}/>
          </div>
          <div className="col-span-full sm:col-span-3">
            <label for="pass" className="text-sm mr-1">סיסמא</label>
            <input id="pass" value={password} type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" className="py-2 px-3 block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <div className="col-span-full sm:col-span-3">
            <label for="website" className="text-sm mr-1">וידוא סיסמא</label>
            <input id="website" value={confirmPassword} type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" className="py-2 px-3 block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e)=> setConfirmPassword(e.target.value)}/>
          </div>
          {/* <div className="col-span-full">
            <label for="bio" className="text-sm">Bio</label>
            <textarea id="bio" placeholder="" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"></textarea>
          </div> */}
          <div className="col-span-full flex justify-end relative bottom-2"> 
            {!loading ? (
              <div className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 rounded-lg relative top-2 px-4">
              <button type='button' className="px-3 py-2 text-white tracking-wide" onClick={changePassword}>שינוי סיסמא</button>
            </div>
            ) : (
              <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              Loading...
          </button>
            )}
            <div className="flex items-center space-x-2 relative right-2 bg-blue-700 hover:bg-blue-600 rounded-lg top-2 px-4">
              <button type='button' className="px-3 py-2 text-white tracking-wide" onClick={()=> setSubUser(true)}>הרשמה</button>
            </div>
          </div>
        </div>
      </fieldset>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">התראות והודעות</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">דרך אימייל</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">הודעות מערכת</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                    No push notifications
                  </label>
                </div>
                <button
                  type="button"
                  className="rounded-md relative top-2 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={()=> setPasswordMode(true)}
                >
                  Change Password
                </button>
              </div>
            </fieldset>
           
            <div class="container mx-auto mt-10 rounded-md bg-gray-100 dark:bg-gray-700 xl:w-full">
           <div class="xl:w-full py-5 px-8">
               <div class="flex items-center mx-auto">
                   <div class="container mx-auto">
                       <div class="mx-auto xl:w-full">
                           <p class="text-lg text-gray-800 dark:text-gray-100 font-bold">הודעות והתראות</p>
                           <p class="text-sm text-gray-600 dark:text-gray-400 pt-1">ניתן להגדיר שליחת וקבלת הודעות והתראות במגוון דרכים</p>
                       </div>
                   </div>
               </div>
           </div>
           <div class="container mx-auto pb-6">
               <div class="flex items-center pb-4 border-b border-gray-300 dark:border-gray-700 px-8 text-gray-800 dark:text-gray-100">
                   <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                       <path stroke="none" d="M0 0h24v24H0z" />
                       <rect x="3" y="5" width="18" height="14" rx="2" />
                       <polyline points="3 7 12 13 21 7" />
                   </svg>
                   <p class="text-sm font-bold ml-2 text-gray-800 dark:text-gray-100">דרך אימייל</p>
               </div>
               <div class="px-8">
                   <div class="flex justify-between items-center mb-8 mt-4">
                       <div class="w-9/12">
                           <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">Comments</p>
                           <p id="cb1" class="text-sm text-gray-600 dark:text-gray-400">Get notified when a post or comment is made</p>
                       </div>
                       {/* <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                           <input tabindex="0" aria-labelledby="cb1" type="checkbox" name="email_comments" id="toggle1" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                           <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                       </div> */}
                       <div className='relative right-1.5'>
                       <Android12Switch
                        checked={mode}
                        onChange={changeActive}
                        color='primary'
                        // size='small'
                        // inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </div>
                   </div>
                   <div class="flex justify-between items-center mb-8">
                       <div class="w-9/12">
                           <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">אימות דו שלבי</p>
                           <p id="cb2" class="text-sm text-gray-600 dark:text-gray-400">ניתן לבצע אימות דו שלבי ע"י קבלת קוד סודי לאחר כניסה למערכת</p>
                       </div>
                       {/* <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                           <input aria-labelledby="cb2" tabindex="0" type="checkbox" name="email_job_application" id="toggle2" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                           <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                       </div> */}
                      <div className='relative right-1.5'>
                      {loading ? (
                        <AutorenewIcon className="animate-spin text-blue-600" />
                       ) : (
                        <Android12Switch
                        checked={mfaMode}
                        onChange={changeMfaMode}
                        color='success'
                        // size='small'
                        // inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                       )}
                      </div>
                   </div>
                   <div class="flex justify-between items-center mb-8">
                       <div class="w-9/12">
                           <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">התראות תשלום</p>
                           <p id="cb3" class="text-sm text-gray-600 dark:text-gray-400">ניתן להגדיר שליחת התראות חוב ללקוחות חייבים</p>
                       </div>
                       {/* <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                           <input aria-labelledby="cb3" tabindex="0" type="checkbox" name="email_product_update" id="toggle3" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                           <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                       </div> */}
                       <div className='relative right-1.5'>
                       {loading ? (
                        <AutorenewIcon className="animate-spin text-blue-600" />
                       ) : (
                        <Android12Switch
                        checked={debtMode}
                        onChange={changeDebtMode}
                        color='success'
                        // size='small'
                        // inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                       )}
                      </div>
                   </div>
               </div>
               <div class="pb-4 border-b border-gray-300 dark:border-gray-700 px-8">
                   <div class="flex items-center text-gray-800 dark:text-gray-100">
                       <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                           <path stroke="none" d="M0 0h24v24H0z" />
                           <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                           <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                       </svg>
                       <p class="text-sm font-bold ml-2 text-gray-800 dark:text-gray-100">הודעות מערכת</p>
                   </div>
               </div>
               <div class="px-8">
                   <div class="flex justify-between items-center mb-8 mt-4">
                       <div class="w-9/12">
                           <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">Comments</p>
                           <p id="cb4" class="text-sm text-gray-600 dark:text-gray-400">Get notified when a post or comment is made</p>
                       </div>
                       {/* <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                           <input aria-labelledby="cb4" tabindex="0" type="checkbox" name="notification_comment" id="toggle4" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                           <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                       </div> */}
                       <div className='relative right-1.5'>
                       <Android12Switch
                        checked={mode}
                        onChange={changeActive}
                        color='primary'
                        // size='small'
                        // inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </div>
                   </div>
                   <div class="flex justify-between items-center mb-8">
                       <div class="w-9/12">
                           <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">Job Applications</p>
                           <p id="cb5" class="text-sm text-gray-600 dark:text-gray-400">Get notified when a candidate applies to a job posting</p>
                       </div>
                       {/* <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                           <input aria-labelledby="cb5" tabindex="0" type="checkbox" name="notification_application" id="toggle5" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                           <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                       </div> */}
                       <div className='relative right-1.5'>
                       <Android12Switch
                        checked={mode}
                        onChange={changeActive}
                        color='success'
                        // size='small'
                        // inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </div>
                   </div>
                   <div class="flex justify-between items-center mb-8">
                       <div class="w-9/12">
                           <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">Product Updates</p>
                           <p id="cb6" class="text-sm text-gray-600 dark:text-gray-400">Get notifitied when there is a new product feature or upgrades</p>
                       </div>
                       {/* <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                           <input aria-labelledby="cb6" tabindex="0" type="checkbox" name="notification_updates" id="toggle6" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                           <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                       </div> */}
                       <div className='relative right-1.5'>
                       <Android12Switch
                        checked={mode}
                        onChange={changeActive}
                        color='primary'
                        // size='small'
                        // inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </div>
                   </div>
               </div>
           </div>
       </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm tracking-wide font-semibold leading-6 text-gray-900" onClick={()=> setOpenForm(true)}>
          ביטול
        </button>
        <button
          onClick={()=> setOpenForm(true)}
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm tracking-wide font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          שמירה
        </button>
      </div>
    </form>
     </>
  )}
 
  {active3 && (
     <>
      <div class="flex flex-col items-center justify-center min-h-screen flex-auto flex-shrink-0">
   <div class="relative h-56 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg w-96 overflow-hidden">
     <svg viewBox="0 0 220 192" width="220" height="192" fill="none" class="absolute -left-10 -top-16 text-blue-900 opacity-50">
       <defs>
         <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
           <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
         </pattern>
       </defs>
       <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
     </svg>
     <svg viewBox="0 0 220 192" width="220" height="192" fill="none" class="absolute -right-20 -bottom-32 text-blue-900 opacity-50">
       <defs>
         <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
           <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
         </pattern>
       </defs>
       <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
     </svg>
     <img src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png" alt="" srcset="" class="absolute right-4 bottom-2 h-24"/>
     <div class="absolute top-10 left-8 h-12 w-16 bg-gradient-to-r from-yellow-400 to-yellow-200 opacity-90 rounded-lg overflow-hidden">
       <span class="flex absolute top-1/2 left-1 h-full w-10 bg-opacity-50 rounded-lg transform -translate-y-1/2 -translate-x-1/2 border border-gray-400"></span>
       <span class="flex absolute top-1/2 right-1 h-full w-10 bg-opacity-50 rounded-lg transform -translate-y-1/2 translate-x-1/2 border border-gray-400"></span>
       <span class="flex absolute top-1.5 right-0 w-full h-5 bg-opacity-50 rounded-full transform -translate-y-1/2 border border-gray-400"></span>
       <span class="flex absolute bottom-1.5 right-0 w-full h-5 bg-opacity-50 rounded-full transform translate-y-1/2 border border-gray-400"></span>
     </div>
     <div class="absolute bottom-20 left-8 text-white font-semibold text-2xl space-x-1.5">
       <span>****</span>
       <span>****</span>
       <span>****</span>
       <span>8237</span>
     </div>
     <div class="absolute bottom-16 left-8 text-gray-200 font-semibold text-base">
       <span>10</span>
       <span>/</span>
       <span>22</span>
     </div>
     <div class="absolute bottom-6 left-8 text-gray-200 font-semibold text-xl uppercase">
       <span>John Doe</span>
     </div>
   </div>
 </div>
     </>
  )}
  {active4 && (
    <>
  {/* <div className="flex flex-col items-end px-4 sm:px-8">
    <h3 className="text-base font-semibold leading-7 text-gray-900">פרטי ספק</h3>
    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">.ניתן לערוך את הפרטים מעמוד הספקים</p>
  </div> */}
  <div className="flex flex-col items-start px-4 sm:px-8 -space-y-1 relative top-1.5"> 
    <h3 className="text-base font-semibold leading-7 text-gray-900">פרטי משתמש</h3>
    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">ניתן לערוך את הפרטים מעמוד הגדרות</p>
</div>
  {/* </div> */}
  <div className="mt-6 p-8" dir="rtl">
<dl className="divide-y divide-gray-100 justify-end relative bottom-10">
<div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-t border-t-gray-100">
  <dt className="text-sm font-medium leading-6 text-gray-900 text-right">שם ספק</dt>
  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">אריזות ירושלים</dd>
</div>
<div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <dt className="text-sm font-medium leading-6 text-gray-900 text-right">סוג ספק</dt>
  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">סחורה</dd>
</div>
<div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <dt className="text-sm font-medium leading-6 text-gray-900 text-right">כתובת אימייל</dt>
  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">eitanyacov@gmail.com</dd>
</div>
<div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <dt className="text-sm font-medium leading-6 text-gray-900 text-right">מספר טלפון</dt>
  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">0549877632</dd>
</div>
<div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <dt className="text-sm font-medium leading-6 text-gray-900 text-right">טלפון סוכן</dt>
  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">09-5498733</dd>
</div>
<div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <dt className="text-sm font-medium leading-6 text-gray-900 text-right">תיאור</dt>
  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
  תיאור ממש נחמד
  </dd>
</div>
<div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <dt className="text-sm font-medium leading-6 text-gray-900 text-right">פעיל ?</dt>
  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
    <h1>כן</h1>
  </dd>
</div>
<div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <dt className="text-sm font-medium leading-6 text-gray-900 text-right">פרטים</dt>
  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
    qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
    pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
  </dd>
</div>
<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
              <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon className="h-5 w-5 flex-shrink-0 ml-1 text-gray-400" aria-hidden="true" />
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                  <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                  <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  הדפס חשבוניות
                </a>
              </div>
            </li>
            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
              <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon className="h-5 w-5 flex-shrink-0 ml-1 text-gray-400" aria-hidden="true" />
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                  <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                  <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                הדפס חשבוניות
                </a>
              </div>
            </li>
          </ul>
        </dd>
      </div>
</dl>
</div>
    </>
  )}
 </div>
   ) : (
    <>
    <div class="mx-4 min-h-screen max-w-screen-5xl mdf:mx-2 airx:ml-64 mt-14 p-2">
    <div class="relative my-4 w-56 block sm:hidden">
        <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
        <label for="select-1" class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
        <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white" onClick={handleActive1}>Accounts</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white" onClick={handleActive2}>Team</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white" onClick={handleActive3}>Others</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white" onClick={handleActive4}>Others</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white" onClick={handleActive5}>Payments</li>
        </ul>
      </div>
      
      <div className="hidden sm:flex items-center bg-white opacity-80 text-gray-800 sticky top-16 z-50">
      <a rel="noopener noreferrer" href="#" className={`px-5 py-1 border-b-2 ${active1 && 'border-violet-600 text-violet-600'}`} onClick={handleActive1}>Architecto</a>
      <a rel="noopener noreferrer" href="#" className={`px-5 py-1 border-b-2 ${active2 && 'border-violet-600 text-violet-600'}`} onClick={handleActive2}>Corrupti</a>
      <a rel="noopener noreferrer" href="#" className={`px-5 py-1 border-b-2 ${active3 && 'border-violet-600 text-violet-600'}`} onClick={handleActive3}>Excepturi</a>
      <a rel="noopener noreferrer" href="#" className={`px-5 py-1 border-b-2 ${active4 && 'border-violet-600 text-violet-600'}`} onClick={handleActive4}>Consectetur</a>
      <a rel="noopener noreferrer" href="#" className={`px-5 py-1 border-b-2 ${active5 && 'border-violet-600 text-violet-600'}`} onClick={handleActive5}>Payments</a>
      </div>
      {active1 && (
      <div class="grid grid-cols-8 pt-3">
 
      <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 mdf:px-8 mdf:shadow">
        <div class="pt-4">
          <h1 class="py-2 text-2xl font-semibold">Account settings</h1>
          <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> 
        </div>
        <hr class="mt-4 mb-8" />
        <p class="py-2 text-xl font-semibold">Email Address</p>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p class="text-gray-600">Your email address is <strong>john.doe@company.com</strong></p>
          <button class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
        </div>
        <hr class="mt-4 mb-8" />
        <p class="py-2 text-xl font-semibold">Password</p>
        <div class="flex items-center">
          <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <label for="login-password">
              <span class="text-sm text-gray-500">Current Password</span>
              <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
              </div>
            </label>
            <label for="login-password">
              <span class="text-sm text-gray-500">New Password</span>
              <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
              </div>
            </label>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </div>
        <p class="mt-2">Can't remember your current password. <a class="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recover Account</a></p>
        <button class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password</button>
        <hr class="mt-4 mb-8" />
  
        <div class="mb-10">
          <p class="py-2 text-xl font-semibold">Delete Account</p>
          <p class="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Proceed with caution
          </p>
          <p class="mt-2">Make sure you have taken backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
          <button class="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continue with deletion</button>
        </div>
      </div>
    </div>
  )}
                         {active2 && (
                    //  <div className='max-h-[580px] overflow-y-auto scrollbar'>
                      <div className='pb-8 pt-4'>
                     <div className="px-6 ">
                       <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                       <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
                     </div>
                     <div className="mt-4 border-t border-gray-100 px-6">
                       <dl className="divide-y divide-gray-100">
                         <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                           <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                         </div>
                         <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                           <dt className="text-sm font-medium leading-6 text-gray-900">Application for</dt>
                           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                         </div>
                         <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                           <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                         </div>
                         <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                           <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
                           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                         </div>
                         <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                           <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
                           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                             Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                             qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                             pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                           </dd>
                         </div>
                         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                           <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                           <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                             <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                               <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                 <div className="flex w-0 flex-1 items-center">
                                   <PhoneEnabledIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                   <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                     <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                     <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                   </div>
                                 </div>
                                 <div className="ml-4 flex-shrink-0">
                                   <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                     Download
                                   </a>
                                 </div>
                               </li>
                               <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                 <div className="flex w-0 flex-1 items-center">
                                   <PhoneEnabledIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                   <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                     <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                                     <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                                   </div>
                                 </div>
                                 <div className="ml-4 flex-shrink-0">
                                   <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                     Download
                                   </a>
                                 </div>
                               </li>
                             </ul>
                           </dd>
                         </div>
                       </dl>
                     </div>
                   </div>
                  )}
                  {active3 && (
                    <>
                    <form className='pl-6 pb-14 pt-4 w-full'>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={()=> setImage(true)}>
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                    No push notifications
                  </label>
                </div>
              </div>
              <button
                  type="button"
                  className="rounded-md relative top-6 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={()=> setPasswordMode(true)}
                >
                  Change Password
                </button>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 pr-5">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
                 
                    </>
                  )}
                  {active4 && (
                    <>
                     <form id="login">
                <div class="bg-white dark:bg-gray-800 px-4 pb-8">
                    <div class=" mx-auto bg-white dark:bg-gray-800 rounded">
                        <div class="border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
                            <div class="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                                <p class="text-lg text-gray-800 dark:text-gray-100 font-bold">Profile</p>
                                <div class="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                        <path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="mx-auto">
                            <div class="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
                                <div class="rounded relative mt-8 h-48">
                                    <img src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg" alt="" class="w-full h-full object-cover rounded absolute shadow" />
                                    <div class="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded"></div>
                                    <div class="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
                                        <p class="text-xs text-gray-100">Change Cover Photo</p>
                                        <div class="ml-2 text-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                                <line x1="16" y1="5" x2="19" y2="8" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                                        <img src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg" alt="" class="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0" />
                                        <div class="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0"></div>
                                        <div class="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                                <line x1="16" y1="5" x2="19" y2="8" />
                                            </svg>
                                            <p class="text-xs text-gray-100">Edit Picture</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-16 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
                                    <label for="username" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Username</label>
                                    <input tabindex="0" type="text" id="username" name="username" required class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="@example" />
                                </div>
                                <div class="mt-8 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full">
                                    <label for="about" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">About</label>
                                    <textarea id="about" name="about" required class="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="Let the world know who you are" rows="5"></textarea>
                                    <p class="w-full text-right text-xs pt-1 text-gray-600 dark:text-gray-400">Character Limit: 200</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
                        <div class="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                            <div class="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                                <p class="text-lg text-gray-800 dark:text-gray-100 font-bold">Personal Information</p>
                                <div class="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                        <path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="mx-auto pt-4">
                            <div class="container mx-auto">
                                <form class="my-6 w-11/12 mx-auto xl:w-full xl:mx-0">
                                    <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <label for="FirstName" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">First Name</label>
                                        <input tabindex="0" type="text" id="FirstName" name="firstName" required class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="" />
                                    </div>
                                    <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <label for="LastName" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Last Name</label>
                                        <input tabindex="0" type="text" id="LastName" name="lastName" required class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="" />
                                    </div>
                                    <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <label for="Email" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Email</label>
                                        <div class="border border-green-400 shadow-sm rounded flex">
                                            <div tabindex="0" class="focus:outline-none px-4 py-3 dark:text-gray-100 flex items-center border-r border-green-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                                    <polyline points="3 7 12 13 21 7" />
                                                </svg>
                                            </div>
                                            <input tabindex="0" type="text" id="Email" name="email" required class="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-600 dark:text-gray-400" placeholder="example@gmail.com" />
                                        </div>
                                        <div class="flex justify-between items-center pt-1 text-green-700">
                                            <p class="text-xs">Email submission success!</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                                <path
                                                    class="heroicon-ui"
                                                    d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0
                                            0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                                                    stroke="currentColor"
                                                    stroke-width="0.25"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <label for="StreetAddress" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Street Address</label>
                                        <input tabindex="0" type="text" id="StreetAddress" name="streetAddress" required class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="" />
                                    </div>
                                    <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <label for="City" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">City</label>
                                        <div class="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex">
                                            <input tabindex="0" type="text" id="City" name="city" required class="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-indigo-700 bg-transparent rounded placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="Los Angeles" />
                                            <div class="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-600 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-up" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="6 15 12 9 18 15" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <label for="State/Province" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">State/Province</label>
                                        <input tabindex="0" type="text" id="State/Province" name="state" required class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="California" />
                                    </div>
                                    <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <label for="Country" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Country</label>
                                        <input tabindex="0" type="text" id="Country" name="country" required class="border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="United States" />
                                    </div>
                                    <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <div class="flex items-center pb-2">
                                            <label for="ZIP" class="text-sm font-bold text-gray-800 dark:text-gray-100">ZIP/Postal Code</label>
                                            <div class="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                                    <path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input tabindex="0" type="text" name="zip" required id="ZIP" class="bg-transparent border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="86745" />
                                        <div class="flex justify-between items-center pt-1 text-red-700">
                                            <p class="text-xs">Incorrect Zip Code</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                                <line x1="9" y1="9" x2="15" y2="15"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="container mx-auto mt-10 rounded bg-gray-100 dark:bg-gray-700 w-11/12 xl:w-full">
                        <div class="xl:w-full py-5 px-8">
                            <div class="flex items-center mx-auto">
                                <div class="container mx-auto">
                                    <div class="mx-auto xl:w-full">
                                        <p class="text-lg text-gray-800 dark:text-gray-100 font-bold">Alerts</p>
                                        <p class="text-sm text-gray-600 dark:text-gray-400 pt-1">Get updates of any new activity or features. Turn on/off your preferences</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container mx-auto pb-6">
                            <div class="flex items-center pb-4 border-b border-gray-300 dark:border-gray-700 px-8 text-gray-800 dark:text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <polyline points="3 7 12 13 21 7" />
                                </svg>
                                <p class="text-sm font-bold ml-2 text-gray-800 dark:text-gray-100">Via Email</p>
                            </div>
                            <div class="px-8">
                                <div class="flex justify-between items-center mb-8 mt-4">
                                    <div class="w-9/12">
                                        <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">Comments</p>
                                        <p id="cb1" class="text-sm text-gray-600 dark:text-gray-400">Get notified when a post or comment is made</p>
                                    </div>
                                    <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                        <input tabindex="0" aria-labelledby="cb1" type="checkbox" name="email_comments" id="toggle1" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                        <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center mb-8">
                                    <div class="w-9/12">
                                        <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">Job Applications</p>
                                        <p id="cb2" class="text-sm text-gray-600 dark:text-gray-400">Get notified when a candidate applies to a job posting</p>
                                    </div>
                                    <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                        <input aria-labelledby="cb2" tabindex="0" type="checkbox" name="email_job_application" id="toggle2" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                        <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center mb-8">
                                    <div class="w-9/12">
                                        <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">Product Updates</p>
                                        <p id="cb3" class="text-sm text-gray-600 dark:text-gray-400">Get notifitied when there is a new product feature or upgrades</p>
                                    </div>
                                    <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                        <input aria-labelledby="cb3" tabindex="0" type="checkbox" name="email_product_update" id="toggle3" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                        <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="pb-4 border-b border-gray-300 dark:border-gray-700 px-8">
                                <div class="flex items-center text-gray-800 dark:text-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                    </svg>
                                    <p class="text-sm font-bold ml-2 text-gray-800 dark:text-gray-100">Push Notifications</p>
                                </div>
                            </div>
                            <div class="px-8">
                                <div class="flex justify-between items-center mb-8 mt-4">
                                    <div class="w-9/12">
                                        <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">Comments</p>
                                        <p id="cb4" class="text-sm text-gray-600 dark:text-gray-400">Get notified when a post or comment is made</p>
                                    </div>
                                    <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                        <input aria-labelledby="cb4" tabindex="0" type="checkbox" name="notification_comment" id="toggle4" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                        <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center mb-8">
                                    <div class="w-9/12">
                                        <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">Job Applications</p>
                                        <p id="cb5" class="text-sm text-gray-600 dark:text-gray-400">Get notified when a candidate applies to a job posting</p>
                                    </div>
                                    <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                        <input aria-labelledby="cb5" tabindex="0" type="checkbox" name="notification_application" id="toggle5" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                        <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center mb-8">
                                    <div class="w-9/12">
                                        <p class="text-sm text-gray-800 dark:text-gray-100 pb-1">Product Updates</p>
                                        <p id="cb6" class="text-sm text-gray-600 dark:text-gray-400">Get notifitied when there is a new product feature or upgrades</p>
                                    </div>
                                    <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                        <input aria-labelledby="cb6" tabindex="0" type="checkbox" name="notification_updates" id="toggle6" class="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                        <label class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container mx-auto w-11/12 xl:w-full">
                        <div class="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
                            <button role="button" aria-label="cancel form" class="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">Cancel</button>
                            <button role="button" aria-label="Save form" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm" type="submit">Save</button>
                        </div>
                    </div>
                </div>
            </form>
                    </>
                  )}

      </div>

    </>
   )}

{active5 && (
     <>
      <div class={`${!hebrew && 'hidden'} flex flex-col items-center justify-center flex-auto flex-shrink-0 relative bottom-96`}>
   <div class="relative h-56 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg w-96 overflow-hidden">
     <svg viewBox="0 0 220 192" width="220" height="192" fill="none" class="absolute -left-10 -top-16 text-blue-900 opacity-50">
       <defs>
         <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
           <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
         </pattern>
       </defs>
       <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
     </svg>
     <svg viewBox="0 0 220 192" width="220" height="192" fill="none" class="absolute -right-20 -bottom-32 text-blue-900 opacity-50">
       <defs>
         <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
           <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
         </pattern>
       </defs>
       <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
     </svg>
     <img src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png" alt="" srcset="" class="absolute right-4 bottom-2 h-24"/>
     <div class="absolute top-10 left-8 h-12 w-16 bg-gradient-to-r from-yellow-400 to-yellow-200 opacity-90 rounded-lg overflow-hidden">
       <span class="flex absolute top-1/2 left-1 h-full w-10 bg-opacity-50 rounded-lg transform -translate-y-1/2 -translate-x-1/2 border border-gray-400"></span>
       <span class="flex absolute top-1/2 right-1 h-full w-10 bg-opacity-50 rounded-lg transform -translate-y-1/2 translate-x-1/2 border border-gray-400"></span>
       <span class="flex absolute top-1.5 right-0 w-full h-5 bg-opacity-50 rounded-full transform -translate-y-1/2 border border-gray-400"></span>
       <span class="flex absolute bottom-1.5 right-0 w-full h-5 bg-opacity-50 rounded-full transform translate-y-1/2 border border-gray-400"></span>
     </div>
     <div class="absolute bottom-20 left-8 text-white font-semibold text-2xl space-x-1.5">
       <span>****</span>
       <span>****</span>
       <span>****</span>
       <span>8237</span>
     </div>
     <div class="absolute bottom-16 left-8 text-gray-200 font-semibold text-base">
       <span>10</span>
       <span>/</span>
       <span>22</span>
     </div>
     <div class="absolute bottom-6 left-8 text-gray-200 font-semibold text-xl uppercase">
       <span>John Doe</span>
     </div>
   </div>
 </div>
     </>
  )}

<Dialog open={passwordMode}>
    <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setPasswordMode(false)}/>
        </div>
    <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
          </h2>
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" >
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
              </div>
              <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
              </div>
              <div>
                  <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
              </div>
              <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="newsletter" aria-describedby="newsletter" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="newsletter" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
              </div>
              <button class="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primblueary-700 dark:focus:ring-blue-800">Reset passwod</button>
          </form>
      </div>
    </Dialog>

    <Dialog open={image}>
    <>
              <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
	<div class="sm:max-w-lg w-full py-2 px-8 bg-white rounded-xl z-10">
    
		<div class="text-center">
			<h2 class="mt-5 text-3xl font-bold text-gray-900">
				File Upload!
			</h2>
			<p class="mt-2 text-sm text-gray-400">Lorem ipsum is placeholder text.</p>
		</div>
        <form class="mt-8 space-y-3" action="#" method="POST">
                    {/* <div class="grid grid-cols-1 space-y-2">
                        <label class="text-sm font-bold text-gray-500 tracking-wide">Title</label>
                            <input class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="mail@gmail.com"/>
                    </div> */}
                    <div class="grid grid-cols-1 space-y-2">
                                    <label class="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                        <div class="flex items-center justify-center w-full">
                            <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div class="h-full w-full text-center flex flex-col justify-center items-center  ">
                                    
                                    <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    <img class="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image"/>
                                    </div>
                                    <p class="pointer-none text-gray-500 "><span class="text-sm">Drag and drop</span> files here <br /> or <a href="" class="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                </div>
                                <input type="file" class="hidden"/>
                            </label>
                        </div>
                    </div>
                            <p class="text-sm text-gray-300">
                                <span>File type: doc,pdf,types of images</span>
                            </p>
                    <div>
                        <button type="button" class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300" onClick={()=> setImage(false)}>
                        Upload
                    </button>
                    </div>
        </form>
	</div>
              </>
    </Dialog>

    <Dialog open={openForm} aria-labelledby="responsive-dialog-title">
      
        {/* {errors == 403 && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error"> יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
  <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
        </div>
        )} */}
       <div className={`${globalTheme != "light" && 'dark'}`}>
       {hebrew ? (
         <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
         <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
             <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Add new product  
             </h1>
             <form class="space-y-4 md:space-y-6" action="#">
                 <div>
                     <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                     <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                 </div>
                 <div>
                     <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                     <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                 </div>
                 <div>
                     <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                     <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                 </div>
                 <div class="flex items-start">
                     <div class="flex items-center h-5">
                       <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                     </div>
                     <div class="ml-3 text-sm">
                       <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                     </div>
                 </div>
                 <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Add new product  </button>
                 <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                     Already have an account? <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</a>
                 </p>
             </form>
         </div>
     </div>
       ) : (
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 sm:p-8">
            <div className='flex items-center justify-between px-1'>
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> setOpenForm(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            <h1 class="text-xl font-bold leading-tight text-gray-900 md:text-2xl dark:text-white">
                  פרטי בית עסק  
            </h1>
            </div>
            <form onSubmit={userDetails} class="space-y-4 md:space-y-6" dir='rtl'>
                 <div>
                     <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">עיר בית עסק</label>
                     <input type="text" value={city} name="city" id="city" placeholder="עיר בית עסק" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={e => setCity(e.target.value)}/>
                 </div>
                 <div>
                     <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">כתובת בית עסק</label>
                     <input type="text" value={address} name="address" id="address" placeholder="כתובת בית עסק" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={e => setAddress(e.target.value)}/>
                 </div>
                 <div>
                     <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">מספר רחוב</label>
                     <input type="text" value={addressNumber} name="number" id="number" placeholder="כתובת בית עסק" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={e => setAddressNumber(e.target.value)}/>
                 </div>
                 <div>
                     <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">אימייל בית עסק</label>
                     <input type="email" value={emailForReceipt} name="email" id="email" class="bg-gray-50 text-left border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={e => setEmailForReceipt(e.target.value)}/>
                 </div>
                 <div>
                     <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">טלפון בית עסק</label>
                     <input type="text" value={phoneForReceipt} name="phone" id="phone" placeholder="טלפון בית עסק" class="bg-gray-50 placeholder:text-right text-left border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={e => setPhoneForReceipt(e.target.value)} />
                 </div>
                 
                 <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Add new product  </button>
                 <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                     פרטים שיופיעו על גבי חשבוניות והצעות מחיר ללקוחות שלך <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">לחץ לדוגמא</a>
                 </p>
             </form>
        </div>
    </div>
       )}
       </div>
       
    </Dialog>

    <Dialog open={subUser} aria-labelledby="responsive-dialog-title">
      
        {errors == 403 && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error"> יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
  <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
        </div>
        )}
       <div className={`${globalTheme != "light" && 'dark'}`}>
       {hebrew ? (
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
        </h2>
        <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
            </div>
            <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
            </div>
            <div>
                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
            </div>
            <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="newsletter" aria-describedby="newsletter" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required=""/>
                </div>
                <div class="ml-3 text-sm">
                  <label for="newsletter" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                </div>
            </div>
            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Reset passwod</button>
        </form>
    </div>
       ) : (
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8" dir='rtl'>
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              הכנס משתמש חדש
          </h2>
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={addSubUser}>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">שם משתמש</label>
                  <input value={email} type="text" name="email" id="email" class="bg-gray-50 border text-left border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} onChange={e => setEmail(e.target.value)}/>
              </div>
              <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">סיסמא</label>
                  <input value={password} type="password" name="password" id="סיסמא" placeholder="••••••••" class="bg-gray-50 border text-left border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} onChange={e => setPassword(e.target.value)}/>
              </div>
              <div>
                  <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">וידוא סיסמא</label>
                  <input value={confirmPassword} type="password" name="confirm-password" id="וידוא סיסמא" placeholder="••••••••" class="bg-gray-50 text-left border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} onChange={e => setConfirmPassword(e.target.value)} />
              </div>
              <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="newsletter" aria-describedby="newsletter" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required=""/>
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="newsletter" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                  </div>
              </div>
              <button disabled={email == "" || password == "" || confirmPassword == ""} type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">הכנס משתשמש חדש</button>
          </form>
      </div>
       )}
       </div>
       
    </Dialog>


    <Dialog open={mode1} aria-labelledby="responsive-dialog-title">
      
        {errors == 403 && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error"> יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
  <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
        </div>
        )}
       <div className={`${globalTheme != "light" && 'dark'}`}>
       {/* <main id="content" role="main" class={` w-full max-w-md mx-auto p-6`}> */}
       <main id="content" role="main" class={`${otpMode && 'hidden'} w-full max-w-md mx-auto p-6`}>
    <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?
            <h1 class="text-blue-600 decoration-2 hover:underline font-medium cursor-pointer" onClick={()=> setMode1(false)} >
              Login here
            </h1>
          </p>
        </div>

        <div class="mt-5">
          <form>
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                <div class="relative">
                <input value={result?.email} type="text" id="email" name="email" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />

                  {/* <input value={emailForgetPassword} type="email" id="email" name="email" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" onChange={(e)=> setEmailForgetPassword(e.target.value)}/> */}
                </div>
                <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
              </div>
              {loading ? (
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center" onClick={handleSubmit2}>
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Loading...
            </button>
              ) : (
                <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={handleSubmit2}>Reset password</button>
                // <button disabled={emailForgetPassword == ""} type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={handleSubmit2}>Reset password</button>
              )}
            </div>
          {/* {true && (
             <>
             {error2 &&<h1 className='text-red-500 text-center mt-2'>{error2}</h1>}
            </>
          )} */}
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
  {otpMode && (
         <div class="relative flex flex-col justify-center overflow-hidden bg-gray-50 py-12">
          {responseOtp != "ok" && xxx == false ? (
            <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
           <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
             <div class="flex flex-col items-center justify-center text-center space-y-2">
               <div class="font-semibold text-3xl">
                 <p>Email Verification</p>
               </div>
               <div class="flex flex-row text-sm font-medium text-gray-400">
                 <p>We have sent a code to your email {result?.email}</p>
               </div>
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
            // <>
            // <form onSubmit={updatePasswordFunction} className='flex flex-col items-center'>
            //       <input type="password" value={updatePassword} placeholder='הכנס סיסמא חדשה' className='bg-white shadow-md focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72 placeholder:text-right placeholder:font-mono placeholder:text-gray-700' onChange={(e) => setUpdatePassword(e.target.value)}/>
            //       <input type="password" value={updatePasswordConfirm} placeholder='וידוא סיסמא חדשה' className='bg-white shadow-md focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-2 w-72 placeholder:text-right placeholder:font-mono placeholder:text-gray-700' onChange={(e) => setUpdatePasswordConfirm(e.target.value)}/>
            //       <button type='submit' className='bg-blue-500 px-10 py-2 mt-4 w-72 rounded-full text-center text-white font-semibold hover:bg-blue-400 tracking-wider cursor-pointer'>עדכן סיסמא</button>
            //     </form>
            //     {updatePasswordResponseError != "" && <h1 className='text-center text-red-600'>{updatePasswordResponseError}</h1>}
            //     {regex != "" && <h1 className='text-center text-red-600'>{regex}</h1>}
            // </>
            <>
            <section class="">
  <div class="container max-h-full px-6 py-8 overflow-y-hidden scrollbar-none">
    <div
      class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between scrollbar-none">
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
       
    </Dialog>
   </>
  )
}

export default Settings2