import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import stats from '../../src/assets/stats.jpg'


const Payment1 = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // Access the parameters using the get method
  const responseCode = searchParams.get('responsecode');
  const CardOwnerName = searchParams.get('CardOwnerName');
  const UserEmail = searchParams.get('UserEmail');
  const ProdPrice = searchParams.get('ProdPrice');
  const invoicenumber = searchParams.get('invoicenumber');
  const InvMobile = searchParams.get('InvMobile');
  const intTo = searchParams.get('intTo');
  const CardMonth = searchParams.get('CardMonth');
  const CardYear = searchParams.get('CardYear');
  const responsecode = searchParams.get('responsecode');
  const OriginalApprovalNumber = searchParams.get('OriginalApprovalNumber');
  const Lest4Numbers = searchParams.get('Lest4Numbers');
  const internaldealnumber = searchParams.get('internaldealnumber');

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(UserEmail);
  const [confirmEmail, setConfirmEmail] = useState(UserEmail);
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState(intTo);
  const [phoneNumber, setPhoneNumber] = useState(InvMobile);
  const [dealerlicensed, setDealerlicensed] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  // const [emailForReceipt, setEmailForReceipt] = useState("")
  // const [phoneForReceipt, setPhoneForReceipt] = useState("")
  const [error, setError] = useState([]);
  const [mode, setMode] = useState(true);
  const [emailMode, setEmailMode] = useState(true);
  const [loading, setLoading] = useState(false);


  const postData = (e) => {
    e.preventDefault();
    if(dealerlicensed == "" || email == "" || password == "" || companyName == "" || phoneNumber == "") {
      alert("חסרים שדות חובה")
      return
    }
    if(password != confirmPassword) {
      alert("סיסמאות לא תואמות")
      return
    }
    // Basic email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
          alert("אימייל לא נכון")
          return
        }
    // if(email != confirmEmail) {
    //   alert("אימיילים לא תואמים")
    //   return
    // }
    setLoading(true)
      axios.post("https://nartina.com/api/v1/auth/add-user", {
        firstName,
        lastName,
        email,
        city,
        addressNumber,
        responsecode,
        address,
        companyName,
        // OriginalApprovalNumber,
        // CardMonth,
        // CardYear,
        phoneNumber,
        dealerlicensed,
        invoicenumber,
        internaldealnumber,
        // Lest4Numbers,
        // approvalNumber: OriginalApprovalNumber,
        type: ProdPrice,
        // emailForReceipt,
        // phoneForReceipt,
        password
      }).then(res => {console.log(res.data)
        setLoading(false)
        setEmailMode(false)})
      .catch(err => {setError(err.response.data)
      setLoading(false)})
      .finally(setLoading(false))
      setFirstName("")
      setAddress("")
      // setCompanyName("")
      setCity("")
      setLastName("")
      setDealerlicensed("")
      setEmail("")
      setConfirmEmail("")
      setPhoneNumber("")
      setPassword("")
      setConfirmPassword("")
      // setError("")
      // navigate('/login')
    
}

  return (
   <>
    {!internaldealnumber ? (
      <div className='flex items-center justify-center w-full relative top-14'>
        <div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
     <h3 class="text-2xl">404</h3>
     <div class="flex justify-center">
         
     </div>
     <p>הדף שחיפשת לא נמצא</p>
     <div class="mt-4">
        <a href="https://nartina.com/login" class="px-2 py-2 text-blue-200 bg-blue-600 rounded">חזור לדף הבית</a>
        <p class="mt-4 text-sm">If you’re having trouble clicking the "Verify Email Address" button, copy
            and
            paste
            the URL below
            into your web browser:
            <a href="https://nartina.com" class="text-blue-600">https://nartina.com</a>
        </p>
    </div>
    
 </div>
      </div>
    ) : (
      <>
      
{mode ? (
  <section className="bg-white text-gray-800 py-8 px-10 top-4 w-full fixed h-screen overflow-y-auto group">
    <header>
    <nav class="bg-gray-800 shadow border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 fixed left-0 top-0 w-full z-50">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap text-white tracking-wide">NARTINA</span>
            </div>
           
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                
            </div>
        </div>
    </nav>
</header>
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:pt-24 lg:pb-8 lg:flex-row lg:justify-between bg-gray-100 min-h-[550px]">
		<div className="flex items-center justify-center relative bottom-8 sm:top-2 p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src={stats} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
		<div className="flex flex-col justify-center items-center space-y-10 sm:space-y-1 p-6 relative bottom-14 md:bottom-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
    {/* <h1 className="text-gray-900 text-5xl font-bold leading-3 sm:text-6xl text-right">ברוכים הבאים</h1>
    <h1 className="text-violet-600 text-5xl font-bold leading-3 sm:text-6xl text-right">{intTo}</h1>
			<h1 className="text-5xl font-bold leading-3 sm:text-6xl text-center">
      {CardOwnerName}
			</h1> */}
      <div class="flex flex-col items-center justify-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 text-center w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 class="text-4xl font-bold text-center"> ! תודה רבה</h1>
          <p className='text-center'>תודה רבה! תשלום בוצע בהצלחה <span> {CardOwnerName} </span></p>
          
        </div>
			<p className="mt-6 mb-8 text-lg sm:mb-12 text-right relative top-2">​בנוסף לשליטה בסדר, בארגון ובהוצאות הלוגיסטיות של בית העסק,
				<br className="hidden md:inline lg:hidden"/>בעזרת תוכנה לניהול עסק ניתן לשלוט באופן מלא על כל מה שנעשה בחברה
			</p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start relative top-4">
				<div className="px-8 py-3 text-lg font-semibold flex items-center justify-center space-x-2 rounded bg-indigo-500 text-gray-50 cursor-pointer group-hover:bg-violet-500" onClick={()=> setMode(false)}>
        <svg class={`h-6 w-6 text-green-500 animate-bounce group-hover:-translate-x-1 mr-1 leading-normal transition-all duration-200 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
       </svg>
        <h1 className='tracking-wide'>המשך בתהליך ההרשמה</h1>
      </div>
			</div>
		</div>
	</div>
</section>
) : (
  <>
  {emailMode ? (
  <section className="bg-white w-full fixed h-screen overflow-y-auto scrollbar-none" dir='rtl'>
  <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
    <aside
      className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
    >
      <img
        alt="Pattern"
        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 relative bottom-4 lg:bottom-10"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="block text-blue-600 relative top-4">
          <span className="sr-only">Home</span>
          <svg
            className="h-8 sm:h-10"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h1
          className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
        >
          נרטינה מערכות ניהול 🦑
        </h1>

        <p className="mt-2 leading-relaxed text-gray-500">
        שינוי פרטים אישיים לאחר ההרשמה הראשונית, יתבצע דרך דף הגדרות, ניתן לשנות כתובת, מספר טלפון ומייל, 

        {/* <br /> */}
        האימייל והסיסמא שתזין ישמשו אותך להתחברות למערכת.
        </p>
        
        <form onSubmit={postData} className="mt-6 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              for="FirstName"
              className="block text-sm font-medium text-gray-700"
            >
              שם פרטי
            </label>

            <input
              type="text"
              value={firstName}
              placeholder='שם פרטי'
              onChange={(e)=> setFirstName(e.target.value)}
              required={true}
              id="FirstName"
              name="first_name"
              className="mt-1 w-full rounded-md h-10 pr-2 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label
              for="LastName"
              className="block text-sm font-medium text-gray-700"
            >
              שם משפחה
            </label>

            <input
              type="text"
              placeholder='שם משפחה'
              value={lastName}
              onChange={(e)=> setLastName(e.target.value)}
              required={true}
              id="LastName"
              name="last_name"
              className="mt-1 w-full rounded-md h-10 pr-2 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label
              for="FirstName"
              className="block text-sm font-medium text-gray-700"
            >
              שם בית עסק
            </label>

            <input
              type="text"
              placeholder='שם בית עסק'
              value={companyName}
              onChange={(e)=> setCompanyName(e.target.value)}
              required={true}
              id="FirstName"
              name="first_name"
              className="mt-1 w-full rounded-md h-10 pr-2 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label
              for="LastName"
              className="block text-sm font-medium text-gray-700"
            >
               מס' ע.מ/חברה
            </label>

            <input
              type="text"
              placeholder="מס' ע.מ/חברה"
              value={dealerlicensed}
              onChange={(e)=> setDealerlicensed(e.target.value)}
              required={true}
              id="LastName"
              name="last_name"
              className="mt-1 w-full rounded-md h-10 placeholder:text-right placeholder:pr-2 text-left pl-2 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="Email" class="block text-sm font-medium text-gray-700">
              כתובת אימייל <span className='text-sm text-gray-600'> (לכניסה למערכת)</span>
            </label>

            <input
              type="email"
              placeholder='כתובת אימייל'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              required={true}
              id="Email"
              name="email"
              className="mt-1 w-full rounded-md h-10 placeholder:text-right placeholder:pr-2 text-left pl-2 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="Email" class="block text-sm font-medium text-gray-700">
              מספר פלאפון
            </label>

            <input
              type="text"
              placeholder='מספר פלאפון'
              value={phoneNumber}
              onChange={(e)=> setPhoneNumber(e.target.value)}
              required={true}
              id="Email"
              name="email"
              className="mt-1 w-full text-left pl-2 placeholder:text-right placeholder:pr-2 rounded-md h-10 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label
              for="Password"
              className="block text-sm font-medium text-gray-700"
            >
              סיסמא
            </label>

            <input
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              required={true}
              id="Password"
              name="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              className="mt-1 w-full rounded-md h-10 text-left pl-2 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              for="PasswordConfirmation"
              className="block text-sm font-medium text-gray-700"
            >
              וידוא סיסמא
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e)=> setConfirmPassword(e.target.value)}
              required={true}
              id="PasswordConfirmation"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              name="password_confirmation"
              className="mt-1 w-full h-10 rounded-md text-left pl-2 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6">
            <label for="MarketingAccept" class="flex gap-4">
              <input
                type="checkbox"
                id="MarketingAccept"
                name="marketing_accept"
                className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
              />

              <span class="text-sm text-gray-700">
                אני מעוניין לקבל הודעות דיוור דרך תיבת הדואר לגבי עדכונים והודעות.
              </span>
            </label>
          </div>

          <div className="col-span-6">
            <p className="text-sm text-gray-500">
            ע"י יצירת חשבון אני מאשר את
              <a className="text-gray-700 underline px-2">
                תנאי השימוש
              </a>
              וקראתי את
              <a class="text-gray-700 underline px-2">תנאי הפרטיות</a>.
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            {!loading ? (
              <button
              className="inline-block tracking-wide shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              disabled={dealerlicensed == "" || email == "" || password == "" || companyName == "" || phoneNumber == "" || confirmPassword == ""}
              type='submit'
            >
              יצירת חשבון
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

            <p class="mt-4 text-sm text-gray-500 sm:mt-0">
              כבר יש לך חשבון?
                   <a class="text-gray-700 underline relative right-2">כניסה</a>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>
  ) : (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-600 min-w-screen">
       <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
    <h3 className="text-2xl">Thanks for signing up for nartina.com! <span>{companyName}</span></h3>
    <div className="flex justify-center">
        <svg className="w-32 h-32" viewBox="0 0 50 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M42.2285 0C40.3812 4.92e-05 38.7061 0.741775 37.4785 1.94141H18.4102C18.3787 1.94141 18.3493 1.94909 18.3184 1.95117C18.1298 1.94236 17.9327 1.91521 17.6641 1.97656C17.5086 2.01156 17.3074 2.10876 17.1797 2.28516C17.052 2.46106 17.0156 2.66417 17.0156 2.85547V3.20898C17.0101 3.25944 17 3.30955 17 3.36133V4.11719L17.0156 4.12695V19.9551C17.0156 20.1414 17.0477 20.3306 17.1484 20.502C17.2492 20.6734 17.4182 20.7996 17.5723 20.8613C17.8803 20.9847 18.1304 20.9551 18.3789 20.9551H45.6523C46.0097 20.9551 46.3585 20.8387 46.6152 20.5977C46.872 20.3565 47.0156 19.9997 47.0156 19.627V11.6309C48.2595 10.3975 49.0312 8.69075 49.0312 6.80469C49.0313 3.05339 45.9798 0 42.2285 0ZM42.2285 1C45.4394 1 48.0313 3.59389 48.0312 6.80469C48.0312 10.0156 45.4394 12.6074 42.2285 12.6074C39.0177 12.6074 36.4238 10.0156 36.4238 6.80469C36.4238 3.59389 39.0176 1.0001 42.2285 1ZM42.2285 1.91992C39.5376 1.91992 37.3457 4.11389 37.3457 6.80469C37.3457 9.49559 39.5377 11.6874 42.2285 11.6875C44.9194 11.6875 47.1113 9.49559 47.1113 6.80469C47.1114 4.11389 44.9194 1.91992 42.2285 1.91992ZM42.2285 2.91992C44.379 2.91992 46.1113 4.65429 46.1113 6.80469C46.1113 8.95509 44.3789 10.6875 42.2285 10.6875C40.0781 10.6874 38.3457 8.95509 38.3457 6.80469C38.3457 4.65429 40.0781 2.91992 42.2285 2.91992ZM18.3496 2.95312C18.3775 2.9531 18.3771 2.95312 18.4102 2.95312H36.625C35.8693 4.04923 35.4238 5.37598 35.4238 6.80469C35.4238 8.17802 35.8362 9.45503 36.5391 10.5254L32.2715 13.6211L32.2539 13.6387C32.1417 13.7387 32.0985 13.7439 32.0605 13.7441C32.0226 13.7443 31.9342 13.7282 31.7715 13.6094L18.043 3.61328L18.0156 3.5957V3.27734C18.0495 3.10235 18.1792 2.97857 18.3496 2.95312ZM44.6426 4.63672C44.513 4.63827 44.389 4.69009 44.2969 4.78125L41.1934 7.77148L40.1602 6.77539C40.1131 6.72883 40.0574 6.69206 39.996 6.66721C39.9347 6.64236 39.8691 6.62993 39.8029 6.63064C39.7368 6.63134 39.6714 6.64517 39.6106 6.67132C39.5498 6.69747 39.4949 6.73542 39.4489 6.78298C39.4028 6.83053 39.3667 6.88674 39.3426 6.94835C39.3185 7.00996 39.3068 7.07575 39.3083 7.1419C39.3098 7.20805 39.3244 7.27324 39.3513 7.33371C39.3782 7.39417 39.4167 7.4487 39.4648 7.49414L40.8457 8.82617C40.9389 8.91579 41.0631 8.96586 41.1924 8.96586C41.3217 8.96586 41.4459 8.91579 41.5391 8.82617L44.9902 5.5C45.0632 5.43099 45.1137 5.34161 45.1351 5.2435C45.1565 5.14539 45.1479 5.04311 45.1104 4.94995C45.0729 4.8568 45.0082 4.7771 44.9248 4.72124C44.8413 4.66537 44.743 4.63592 44.6426 4.63672V4.63672ZM18.0156 4.83203L31.1836 14.418C31.4501 14.6121 31.7434 14.7459 32.0664 14.7441C32.3894 14.7441 32.6876 14.5913 32.918 14.3867L37.1523 11.3164C38.3998 12.7173 40.2098 13.6074 42.2285 13.6074C43.6296 13.6074 44.9323 13.18 46.0156 12.4512V19.627C46.0156 19.7646 45.9788 19.8212 45.9297 19.8672C45.8806 19.9132 45.7986 19.9551 45.6523 19.9551H18.3789C18.1652 19.9551 18.0614 19.9415 18.0156 19.9375V4.83203Z"
                fill="url(#paint0_linear)" />
            <rect y="5" width="15" height="2" rx="1" fill="#3BB54A" />
            <rect y="11" width="15" height="2" rx="1" fill="#3BB54A" />
            <rect y="8" width="6" height="2" rx="1" fill="#3BB54A" />
            <rect y="15" width="6" height="2" rx="1" fill="#3BB54A" />
            <rect x="8" y="8" width="6" height="2" rx="1" fill="#3BB54A" />
            <rect x="8" y="15" width="6" height="2" rx="1" fill="#3BB54A" />
            <defs>
                <linearGradient id="paint0_linear" x1="16.9996" y1="10.4791" x2="47.0156" y2="10.4791"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#009217" />
                    <stop offset="1" stop-color="#00FF29" />
                </linearGradient>
            </defs>
        </svg>
    </div>
    <p>We're happy you're here. Let's get your email address verified:</p>
    <p>{UserEmail}</p>
    <div className="mt-4">
        <button class="px-2 py-2 text-blue-200 bg-blue-600 rounded" onClick={()=> setEmailMode(true)}>Click to Verify Email</button>
        <p class="mt-4 text-sm">If you’re having trouble clicking the "Verify Email Address" button, copy
            and
            paste
            the URL below
            into your web browser:
            <a href="https://nartina.com" class="text-blue-600">https://nartina.com</a>
        </p>
    </div>
</div>
    </div>
  )}
  </>
)}
  
      </>
    )}
   </>
  )
}

export default Payment1