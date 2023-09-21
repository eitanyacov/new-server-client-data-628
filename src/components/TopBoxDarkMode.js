import { Icon } from "@mui/material"
import { useContext, useState, useEffect } from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeContext } from "../App";

const TopBoxDarkMode = ({ title, amount, link, icon, color, onClick, bgIcon, bgCOlor, borderTColor }) => {
  const month = new Date().getMonth().toLocaleString()
  const xxx = parseInt(month) + 1
  const year = new Date().getFullYear()
  const [isSSR, setIsSSR] = useState(true);

  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 1400)
    
  }, [isSSR]);
  
  return (
    <div className={`flex flex-col justify-between text-center ${bgCOlor} w-full h-fit shadow-xl mb-3 md:mb-0 md:ml-0 border-white border-4 ${theme != "light" && "border-4"} ${borderTColor} ${theme == "light" ? "border-t-[3px]" : "border-t-[3px]"} rounded-2xl p-1`}>
        {/* <h1 className='text-gray-700 font-mono text-2xl md:text-3xl'>{title}</h1> */}
        <h1 className={`text-gray-100 font-mono font-semibold ${title != "כל ההוצאות" && "tracking-wide"} text-3xl`}>{title}</h1>
        <h1 className={`text-[16px] font-mono ${theme != "light" ? "text-blue-800" : "text-blue-300"}`}>{`${year}-${xxx} עבור חודש`}</h1>
        <div className="flex justify-center items-center space-x-1 mr-6">
        <h1 className="flex font-mono mt-3 text-white">ש"ח</h1>
          <h1 className='text-gray-100 font-sans font-bold text-3xl md:text-3xl'>{isSSR ? <CircularProgress color="success" size={25}/> : amount}</h1>
        </div>
        
        {/* <div>

        </div> */}
            <div className='flex items-center justify-between'>
                <div className="ml-1 mb-2 cursor-pointer hover:scale-105 ease-out transition-all duration-100" onClick={onClick}>
                  {/* <h1 className='text-gray-800 text-md md:text-xl'>{link}</h1> */}
                  <h1 className='text-blue-400 text-md font-serif tracking-wide text-lg'>{link}</h1>
                  <div className='w-[100px] h-[0.5px] bg-blue-400'/>
                </div>
                {/* {title == "סחורה" && (
                  <div className="w-10 h-10 md:w-10 md:h-10">
                  <CircularProgressbar
                    value={85}
                    text="85%"
                    strokeWidth={8}
                  />
                  </div>
                )}
                {title == "כל ההוצאות" && (
                  <div className="w-10 h-10 md:w-10 md:h-10">
                  <CircularProgressbar
                    value={85}
                    text="75%"
                    strokeWidth={8}
                  />
                  </div>
                )} */}
                {/* {title == "סחורה" || title == "כל ההוצאות" ? (
                  <div className="w-12 h-12 md:w-10 md:h-10 relative right-1 bottom-2">
                  <CircularProgressbar
                    value={85}
                    text="84%"
                    strokeWidth={8}
                    styles={buildStyles({
                      // This is in units relative to the 100x100px
                      // SVG viewbox.
                      textSize: "28px"
                    })}
                  />
                  </div>
                ) : (
                  <div className={`flex items-center relative right-1 bottom-2 justify-center h-10 w-10 rounded-lg ${bgIcon} cursor-pointer`} onClick={onClick}>
                    <Icon component={icon} className={`${color}`}/>
                </div> 
                )} */}
                 <div className={`flex items-center relative right-1 bottom-1 justify-center rounded-lg cursor-pointer`} onClick={onClick}>
                    <Icon component={icon} fontSize='large' className={`${color} hover:scale-125 ease-out transition-all duration-300`}/>
                </div> 
                
            </div>
            
          
    </div>
  )
}

export default TopBoxDarkMode