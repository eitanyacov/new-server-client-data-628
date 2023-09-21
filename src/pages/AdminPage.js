import React, { useState, useEffect, useContext } from 'react';
import Switch from '@mui/material/Switch';
import { ThemeContext } from "../App";
// import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';

const AdminPage = () => {
    const [users, setUsers] = useState([])

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)
    const { hebrew } = useContext(ThemeContext)


    // const screen = window.screen.availWidth
    // const screenHeight = window.screen.availHeight
    
    // const location = useLocation()
    // const navigate = useNavigate()
  
  
   
    useEffect(()=> {
        axios.get('https://nartina.com/api/admin/all-users', {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        })
        .then(res => {setUsers(res.data)
        console.log(res.data)})
        .catch(err => console.log(err))
    }, [])
  

    

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
  
    
    return (
      <>
      <div class={`bg-gray-50 ${hebrew ? 'airx:ml-[261px]' : 'airx:mr-[265px] ml-2'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14`}>
         <div className='overflow-y-scroll scrollbar max-h-[500px]'>
         <table className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
          <thead className="bg-blue-300 sticky top-0 z-50">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-xs">פעיל</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">מחק</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">ערוך</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">אימייל</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">טלפון</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">מס' חברה</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">תאריך הצטרפות</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">שם פרטי</th>
              <th scope="col" className="px-1 text-center py-2 text-xs">שם חברה</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user, index) => (
              <tr key={user.id} className={`border ${index % 2 === 0 ? 'bg-sky-100' : ''}`}>
                <td scope="col" className="px-1 text-center py-2 text-xs">
            <Android12Switch
            checked={user?.active}
            // onChange={cellClick}
            // size='small'
            inputProps={{ 'aria-label': 'primary checkbox' }}/></td>
             <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-red-200 w-8 h-8 rounded-lg cursor-pointer md:ml-2 lg:ml-6" onClick={()=> alert("id:---> " + user?.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-400'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 w-8 h-8 rounded-lg cursor-pointer md:ml-2 lg:ml-6">
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-900 font-semibold">{user.email}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-900 font-semibold">{user.phoneNumber}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-900 font-semibold">{user.dealerlicensed}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-900 font-semibold">{user.joinDate}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-900 font-semibold">{user.firstName}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-900 font-semibold">{user.companyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
         </div>
            
        
        </div>
    
      </>
    );
  }

export default AdminPage