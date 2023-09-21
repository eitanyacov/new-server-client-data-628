import React, { useContext } from 'react'
import Switch from '@mui/material/Switch';
import { useLocation } from 'react-router-dom'
import { ThemeContext } from '../App';


const SwitchThemeYear2 = ({xxx}) => {
    const { yearState, setYearState, setYear, year } = useContext(ThemeContext)
    const location = useLocation()

    const setYearMode = () => {
        setYearState(!yearState)
        
        if(yearState) {
          setYear(new Date().getFullYear())

        }else {
          setYear(new Date().getFullYear() -1)
        }
        // localStorage.setItem("year", !yearState)
        setTimeout(()=> {
          xxx()
        }, 300)

    }

  return (
    <>
    <div className='flex items-center justify-center space-x-[0.5px] xr:space-x-2'>
    {location.pathname == "/yearly-reports" && (
          <h1 className={`font-mono text-sm xr:text-lg ${location.pathname == '/' ? 'text-blue-700' : 'text-blue-600'} font-semibold`}>{new Date().getFullYear()}</h1>

    )}    <Switch
    checked={yearState}
    onChange={setYearMode}
    // color='success'
    color='primary'
    size='small'
    inputProps={{ 'aria-label': 'primary checkbox' }}/>
    {location.pathname == "/yearly-reports" && (
          <h1 className={`font-mono text-sm xr:text-lg ${location.pathname == '/' ? 'text-blue-700' : 'text-blue-600'} font-semibold`}>{new Date().getFullYear() -1}</h1>

    )}
    </div>
    
    </>
    
   
  )
}

export default SwitchThemeYear2