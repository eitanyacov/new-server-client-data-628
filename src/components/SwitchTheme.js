import React, { useContext } from 'react'
import Switch from '@mui/material/Switch';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeContext } from '../App';


const SwitchTheme = () => {
    const { theme, setTheme, globalTheme, setGlobalTheme } = useContext(ThemeContext)

const themeMode = () => {
    setTheme(theme == "light" ? "dark" : "light")
}

const themeMode2 = () => {
  setGlobalTheme(globalTheme == "light" ? "dark" : "light")
}


  return (
    <>
    <div className='flex items-center justify-center'>
    <WbSunnyIcon className='text-yellow-400 mr-1' fontSize='small'/>
    <Switch
    checked={globalTheme == "light" ? false : true}
    onChange={themeMode2}
    color='success'
    size='small'
    inputProps={{ 'aria-label': 'primary checkbox' }}/>
    <DarkModeIcon className='text-gray-400'  fontSize='18px'/>
    </div>
    
    {/* <Switch
    checked={theme == "light" ? false : true}
    onChange={themeMode}
    color='primary'
    size='small'
    inputProps={{ 'aria-label': 'primary checkbox' }}/> */}
    
    </>
    
   
  )
}

export default SwitchTheme