import React, { useState, useContext, useEffect } from "react";
import { Icon } from "@mui/material"
import { ThemeContext } from "../App";
import { Snackbar, Alert } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Dialog, DialogContent, TextField, Typography } from '@mui/material'
import Switch from '@mui/material/Switch';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import axios from "axios";


const Task = ({ title, date, icon, color, id, isChecked, priority, color2, size, name, color3, end }) => {
  const [checked, setChecked] = useState(isChecked)
  // const [user, setUser] = useState({});
  const [open, setIsOpen] = useState(false)
  const [error, setError] = useState()
  const [errorMode, setErrorMode] = useState(false)

  const { setTaskState, setReload, globalTheme } = useContext(ThemeContext)

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)

  useEffect(() => {
    if(error == 403) {
      setErrorMode(true)
    }
    
  }, [errorMode, error]);


  const handleChange = () => {
    setChecked(!checked)
    console.log(id)
    axios.get("https://nartina.com/api/user/set-urgent-task/" + id)
    .then(res => {console.log(res.data)
          localStorage.setItem('tasksStats', true)
         setReload(true)})
    .catch(err => console.log(err))
    .finally(setReload(true))

  }


  const deleteTask = () => {
    axios.delete("https://nartina.com/api/user/delete-task/" + id, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    })
    .then(res => {console.log(res.data)
      setTaskState(true)
      localStorage.setItem('tasksStats', true)
    setReload(true)})
    .catch(err => {console.log(err)
      setError(err.response.status)})
      .finally(setReload(true))
    

  }

  const handleClose3 = () => {
    setErrorMode(false)
    setError("")
  }

  return (
    <div className={`${globalTheme != 'light' ? 'bg-gray-800 hover:bg-gray-900 hover:shadow-2xl' : 'bg-white'} transition duration-200 ${color3} flex flex-col justify-between w-full h-fit shadow hover:shadow-2xl mt-3 rounded-lg px-2 py-3 cursor-pointer `}>
        <div className="">
          <h1 className={`text-gray-600 font-mono text-right font-semibold tracking-wide ${globalTheme != 'light' ? 'text-white' : 'text-gray-500'}`}>{date}</h1>
        </div>
        <div className="">
          <h1 className={`text-gray-500 text-sm text-right tracking-wide ${globalTheme != 'light' ? 'text-white' : 'text-gray-500'}`}>{title}</h1>
        </div>
        
        <div className="h-1">

        </div>
            <div className='flex items-center justify-between w-full mx-auto'>
               
                <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-center h-5 w-5 cursor-pointer">
                    <Icon component={icon} className={`${color}`}/>
                </div>
                <div className="flex items-center justify-center">
        {/* <div> */}
        {name != "Complete" && (
          <Switch
          checked={checked}
          onChange={handleChange}
          size='small'
          inputProps={{ 'aria-label': 'controlled' }}/>
        )}
        {/* </div> */}
          <div onClick={()=> setIsOpen(true)}>
          <DeleteForeverIcon className="text-red-400 hover:scale-125 transition-all duration-150 ease-out" fontSize="small" /> 
          </div>
        </div>
                </div>
                
            </div>
            <div className="h-1">

              </div>
            <div className="cursor-pointer pb-[2px]" >
                  <div className="relative top-1">
                  <div className='w-[100px] h-[0.5px] bg-gray-400'/>
                 <div className="flex w-full items-center justify-between px-1">
                 <div className="flex space-x-2 relative top-1">
                 {end && (
                  <div className="flex items-center justify-center px-1.5 py-1 relative right-[2.5px] rounded space-x-1 bg-gray-200 dark:bg-slate-900">
                  <DateRangeOutlinedIcon style={{fontSize: "15px"}} className="text-blue-400"/>
                   <h1 className='text-blue-500 text-sm font-semibold font-mono md:text-xs'>{end}</h1>
                  </div>
                 )}
                  {checked && <NotificationImportantIcon fontSize="small" className="text-emerald-500 animate-side-to-side"/>}
                  </div>
                  
                  {name == "Complete" ? (
                    <h1 className={`text-[10px] font-semibold text-white px-1 py-[0.5px] tracking-wide bg-pink-400 rounded`}>הסתיים</h1>
                  ) : (
                    <div className={`flex items-center justify-center rounded px-1 relative top-0.5 [0.5px] ${priority == "green" ? 'bg-green-200 text-green-700' : priority == "blue" ? 'bg-blue-200 text-blue-700' : priority == "yellow" ? 'bg-yellow-500 text-gray-900' : priority == "red" ? 'bg-red-200 text-red-600 animate-pulse' : "bg-gray-200 text-gray-600"}`}>
                  <svg className={`${priority == "red" ? 'inline-block text-red-500' : 'hidden'} w-3 h-3 self-center relative right-[1px]`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>
                  <h1 className={`text-[10px] font-semibold`}>{priority == "green" ? 'לא דחוף' : priority == "blue" ? 'קצת דחוף ' : priority == "yellow" ? 'דחוף' : priority == "red" ? 'דחוף מאוד' : "-"}</h1>
                  </div>
                  
                  )}
                 </div>
                 <div className="h-1.5"/>

                 <div class="flex justify-end -space-x-4 relative top-1">
                         <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="" />
                         <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="" />
                         <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="" />
                         <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="" />
                     </div>
                  <div class="w-full h-2 mb-4 bg-blue-100 rounded-full flex justify-end relative top-3">
                    <div class={`${size} h-full text-xs text-center text-white ${color2} rounded-full`}>
                   </div>
                 </div>
                  </div> 
                  
                </div>

                
                <Dialog open={open}>
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>האם למחוק את המשימה</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={deleteTask}>מחק</button>
        </div>
     
    </Dialog>

    <Snackbar open={errorMode} autoHideDuration={20000} onClose={handleClose3} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose3}
          severity="error"
          sx={{ width: "100%" }}
        >
     
             יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
        </Alert>
      </Snackbar>
          
    </div>
  )
}

export default Task