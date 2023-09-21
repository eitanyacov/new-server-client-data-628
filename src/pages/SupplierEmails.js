import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Snackbar, Alert } from "@mui/material";
// import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { ThemeContext } from "../App";
import DescriptionIcon from '@mui/icons-material/Description';

import { useQuery } from 'react-query'



const SupplierEmails = () => {

    const [emails, setEmails] = useState([])
    const [isSSR, setIsSSR] = useState(true);
    const [isSSRE, setIsSSRE] = useState(true);
    const [alert, setAlert] = useState(false);
    const [open, setIsOpen] = useState(false)
    const [ide, setIde] = useState();
    const [openAlertIncomeDelete, setIsOpenAlertIncomeDelete] = useState(false)
    const [error, setError] = useState("")
    const [errorMode, setErrorMode] = useState(false)
    const [windowHeight, setWindowHeight] = useState(0);
    const [xxx, setXxx] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [date, setDate] = useState("")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")

    const { suppid } = useParams()

    const { hebrew } = useContext(ThemeContext)

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

    const screen = window.screen.availWidth


    let resizeWindow = () => {
      // setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
  
    useEffect(() => {
      resizeWindow();
      console.log(window.innerHeight)
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);  
    }, [windowHeight, window.innerHeight]);

    const getSuppEmails = () => {
      return axios.get('https://nartina.com/api/user/get-supplier-emails/' + suppid)
    }
    
    const {data, refetch} = useQuery('supplier-emails', ()=> getSuppEmails(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: true,
        refetchOnWindowFocus:false
   
      }) 
  
      useEffect(() => {
        setTimeout(() => {
          setIsSSR(false);
        }, 300)
        
      }, [isSSR]);

    useEffect(() => {
      setTimeout(()=> {
        setXxx(true)
      }, 1000)
    })
  
  //   useEffect(()=> {
  //     setEmails(data?.data)
  // }, [data?.data])

    useEffect(() => {
      setTimeout(() => {
        setIsSSRE(false);
      }, 1200)
    }, [isSSRE]);

    useEffect(() => {
      setAlert(true);
    }, []);

    useEffect(() => {
      if(error == 403) {
        setErrorMode(true)
      }
      
    }, [errorMode, error]);

    const getEmails = () => {
      axios.get('https://nartina.com/api/user/get-supplier-emails/' + suppid)
        .then(res => {setEmails(res.data)
          setIsOpenAlertIncomeDelete(true)})
        .catch(err => console.log(err))
    }

    const deleteEmail = () => {
      axios.delete("https://nartina.com/api/user/delete-supplier-email/" + ide, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
      .then(res => {refetch()
        setIsOpenAlertIncomeDelete(true)
      }).
      catch(err => {console.log(err.response.data)
        setError(err.response.status)})
      setIsOpen(false)
     
      
  
    }

   

    const deleteTheEmail = (id) => {
      setIde(id)
      setIsOpen(true)
    }


    

      const handleCloseAlert = () => {
        setAlert(false)
      }


      const handleClose2 = () => {
        setIsOpenAlertIncomeDelete(false)
      }

      const handleClose3 = () => {
        setErrorMode(false)
        setError("")
      }

      const handleEmail = (date, subject, body) => {
        setDate(date)
        setSubject(subject)
        setBody(body)
        setDialog(true)
    }

    const closeDialog = () => {
      setDialog(false)
    }

  return (
    <div class={`bg-gray-50 ${hebrew ? 'airx:ml-[261px]' : 'airx:mr-64 ml-2'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14`}>

 {isSSR ? (
          <LinearProgress />
        ) : (
          <>
         {hebrew ? (
           <div className="pr-1"> 
           <table className="min-w-full divide-y divide-gray-200 border-[#ccc] border-b-2">
            <thead className="bg-sky-700 sticky top-0 z-50">
              <tr>
                <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
                <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">date</th>
                <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
                <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">subject</th>
                <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
                <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">message</th>
                <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
                <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">delete</th>
                <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              </tr>
            </thead>
  
              <>
              <tbody className="divide-y divide-gray-200">
              {data?.data.map((email, index) => (
                <tr key={email.id} className={`border ${index % 2 === 0 ? '' : ''} hover:bg-sky-50`}>
                <td scope="col" className="px-1 text-center py-2"></td>
                <td scope="col" className="px-1 text-center py-2 text-sm text-gray-800  font-bold font-mono">{email.date}</td>
                <td scope="col" className="px-1 text-center py-2"></td>
                <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{email.subject}</td>
                <td scope="col" className="px-1 text-center py-2"></td>
                <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{email.body}</td>
                <td scope="col" className="px-1 text-center py-2"></td>
                <td scope="col" className="px-1 text-center py-2 text-xs">
                <div className="flex justify-center items-center bg-red-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> deleteTheEmail(email.id)}>
                 <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
                </div>
              </td>
              <td scope="col" className="px-1 text-center py-2"></td>

                </tr>
              ))}
            </tbody>
              </>
          </table>
           </div>
         ) : (
          <div className="pr-1"> 
          <table className="min-w-full divide-y divide-gray-200 border-[#ccc] border-b-2">
           <thead className="bg-sky-700 sticky top-0 z-50">
             <tr>
               <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
               <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הודעה</th>
               <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
               <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מחק</th>
               <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
               <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הודעה</th>
               <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
               <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">נושא</th>
               <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
               <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך</th>
               <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
             </tr>
           </thead>
 
             <>
             <tbody className="divide-y divide-gray-200">
             {data?.data.map((email, index) => (
               <tr key={email.id} className={`border ${index % 2 === 0 ? '' : ''} hover:bg-sky-50`}>
                    <td scope="col" className="px-1 text-center py-2"></td>
             <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
               <div className="inline-flex leading-5 bg-blue-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleEmail(email.date, email.subject, email.body)}>
                <DescriptionIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
               </div>
             </td>
               <td scope="col" className="px-1 text-center py-2"></td>
             <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
               <div className="inline-flex leading-5 bg-red-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> deleteTheEmail(email.id)}>
                <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
               </div>
             </td>
             
               <td scope="col" className="px-1 text-center py-2"></td>
               <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{email.body}</td>
               <td scope="col" className="px-1 text-center py-2"></td>
               <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{email.subject}</td>
               <td scope="col" className="px-1 text-center py-2"></td>
               <td scope="col" className="px-1 text-center py-2 text-sm text-gray-800  font-bold font-mono">{email.date}</td>
               <td scope="col" className="px-1 text-center py-2"></td>
               </tr>
             ))}
           </tbody>
             </>
         </table>
          </div>
         )}
          </>
        )}       

        <Dialog open={open}>
        <DialogTitle></DialogTitle>
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>האם למחוק את האימייל </Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={deleteEmail}>מחק</button>
        </div>
        {/* </DialogActions> */}
    </Dialog>

    <Snackbar open={openAlertIncomeDelete} autoHideDuration={10000} onClose={handleClose2} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleClose2}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? <>
          email was deleted successfully
          </> : <>
          אימייל נמחק בהצלחה
          </>}
        </Alert>
      </Snackbar>

      <Snackbar open={errorMode} autoHideDuration={20000} onClose={handleClose2} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose3}
          severity="error"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
        </Alert>
      </Snackbar>

      <Snackbar open={alert} autoHideDuration={10000} onClose={handleCloseAlert} anchorOrigin={{vertical: 'buttom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleCloseAlert}
          severity="info"
          sx={{ width: '100%','& .MuiAlert-message':{textAlign:"right", width:"inherit"} }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? <>
              emails that you sent to the supplier
          </> :
          <>
                    רשימת אימיילים שנשלחו לספק

          </>}
        </Alert>
      </Snackbar>

      <Dialog open={dialog}>
    <div id="readProductModal" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:h-full">
    <div class="relative p-4 w-full max-w-xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5">
                {/* <!-- Modal header --> */}
                <div class="flex justify-center items-center mb-4 rounded-t sm:mb-5">
                    {/* <div>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal" onClick={closeDialog}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div> */}
          
                    <div class="text-lg text-gray-900 md:text-xl dark:text-white">
                        {/* <h3 class="font-bold text-center">
                          תאריך
                        </h3> */}
                        <p class="font-bold text-gray-700 text-center">
                          {date}
                        </p>
                        <h3 class="font-bold text-center">
                          נושא
                        </h3>
                        <p class="font-bold text-gray-500 text-center">
                          {subject}
                        </p>
                        <h3 class="font-bold text-center">
                          הודעה
                        </h3>
                        <p class="font-bold text-gray-500 text-center">
                          {body}
                        </p>
                    </div>
                </div>
                
                <div class="flex justify-center items-center min-w-[230px]">
                    {/* <div class="flex items-center space-x-3 sm:space-x-4">
                        <button type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                            <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                           דירוג 
                        </button>               
                    </div>               */}
                    <button type="button" class="inline-flex items-center tracking-wider font-semibold text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeDialog}>
                        {/* <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg> */}
                        סגור
                    </button>
                </div>
                </div>
            </div>
        </div>
        </Dialog>
        
    </div>
  )
}

export default SupplierEmails