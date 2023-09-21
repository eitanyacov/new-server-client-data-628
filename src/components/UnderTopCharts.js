import React, { useState, useEffect, useContext } from 'react'
import NivoLineCustomIncomeDialog2 from './NivoLineCustomIncomeDialog2';
import NivoLineCustomIncomeDialog3 from './NivoLineCustomIncomeDialog3';
import NivoLineCustomIncomeDialog4 from './NivoLineCustomIncomeDialog4';
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from "../App";
import axios from 'axios';
import { useQuery } from 'react-query'



const UnderTopCharts = () => {
   
    const [user, setUser] = useState({})

    const [i1, setI1] = useState();
    const [i2, setI2] = useState();
    const [i3, setI3] = useState();
    const [i4, setI4] = useState();
    const [i5, setI5] = useState();
    const [i6, setI6] = useState();
    const [i7, setI7] = useState();
    const [i8, setI8] = useState();
    const [i9, setI9] = useState();
    const [i10, setI10] = useState();
    const [i11, setI11] = useState();
    const [i12, setI12] = useState();
    const [i13, setI13] = useState();
    const [i14, setI14] = useState();
    const [i15, setI15] = useState();
    const [i16, setI16] = useState();
    const [i17, setI17] = useState();
    const [i18, setI18] = useState();
    const [i19, setI19] = useState();
    const [i20, setI20] = useState();
    const [i21, setI21] = useState();
    const [i22, setI22] = useState();
    const [i23, setI23] = useState();
    const [i24, setI24] = useState();
    const [i25, setI25] = useState();
    const [i26, setI26] = useState();
    const [i27, setI27] = useState();
    const [i28, setI28] = useState();
    const [i29, setI29] = useState();
    const [i30, setI30] = useState();
    const [i31, setI31] = useState();

    const [x1, setX1] = useState();
    const [x2, setX2] = useState();
    const [x3, setX3] = useState();
    const [x4, setX4] = useState();
    const [x5, setX5] = useState();
    const [x6, setX6] = useState();
    const [x7, setX7] = useState();
    const [x8, setX8] = useState();
    const [x9, setX9] = useState();
    const [x10, setX10] = useState();
    const [x11, setX11] = useState();
    const [x12, setX12] = useState();
    const [x13, setX13] = useState();
    const [x14, setX14] = useState();
    const [x15, setX15] = useState();
    const [x16, setX16] = useState();
    const [x17, setX17] = useState();
    const [x18, setX18] = useState();
    const [x19, setX19] = useState();
    const [x20, setX20] = useState();
    const [x21, setX21] = useState();
    const [x22, setX22] = useState();
    const [x23, setX23] = useState();
    const [x24, setX24] = useState();
    const [x25, setX25] = useState();
    const [x26, setX26] = useState();
    const [x27, setX27] = useState();
    const [x28, setX28] = useState();
    const [x29, setX29] = useState();
    const [x30, setX30] = useState();
    const [x31, setX31] = useState();



    const [z1, setZ1] = useState();
    const [z2, setZ2] = useState();
    const [z3, setZ3] = useState();
    const [z4, setZ4] = useState();
    const [z5, setZ5] = useState();
    const [z6, setZ6] = useState();
    const [z7, setZ7] = useState();
    const [z8, setZ8] = useState();
    const [z9, setZ9] = useState();
    const [z10, setZ10] = useState();
    const [z11, setZ11] = useState();
    const [z12, setZ12] = useState();
    const [z13, setZ13] = useState();
    const [z14, setZ14] = useState();
    const [z15, setZ15] = useState();
    const [z16, setZ16] = useState();
    const [z17, setZ17] = useState();
    const [z18, setZ18] = useState();
    const [z19, setZ19] = useState();
    const [z20, setZ20] = useState();
    const [z21, setZ21] = useState();
    const [z22, setZ22] = useState();
    const [z23, setZ23] = useState();
    const [z24, setZ24] = useState();
    const [z25, setZ25] = useState();
    const [z26, setZ26] = useState();
    const [z27, setZ27] = useState();
    const [z28, setZ28] = useState();
    const [z29, setZ29] = useState();
    const [z30, setZ30] = useState();
    const [z31, setZ31] = useState();  
    // const [isSSR, setIsSSR] = useState(true);
    const navigate = useNavigate()
    const { theme, globalTheme, hebrew, space } = useContext(ThemeContext)

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)
    

    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
      }, [])

      const getDailyIncomeDay = () => {
        const id = result?.id
        return axios.get(`https://nartina.com/api/user/daily-income-array-days/${id}/${currentYear}/${currentMonth}`)
      }
      
      const {data: incomeDayAll} = useQuery('data-day', getDailyIncomeDay,
        {
          refetchOnMount: true,
          refetchOnWindowFocus: true
         
        })

      const getOutcomeDay = () => {
         const id = result?.id
         return axios.get(`https://nartina.com/api/user/outcome-array-days/${id}/${currentYear}/${currentMonth}`)
        }
        
      const {data: outcomeDayAll} = useQuery('outcome-day', getOutcomeDay,
          {
            refetchOnMount: true,
            refetchOnWindowFocus: true
           
          })

      const getWaresDay = () => {
          const id = result?.id
          return axios.get(`https://nartina.com/api/user/wares-array-days/${id}/${currentYear}/${currentMonth}`)
          }
           
      const {data: WaresDayAll} = useQuery('wares-day', getWaresDay,
             {
               refetchOnMount: true,
               refetchOnWindowFocus: true
              
             })    


      useEffect(()=> {
        setI1(incomeDayAll?.data[0])
        setI2(incomeDayAll?.data[1])
        setI3(incomeDayAll?.data[2])
        setI4(incomeDayAll?.data[3])
        setI5(incomeDayAll?.data[4])
        setI6(incomeDayAll?.data[5])
        setI7(incomeDayAll?.data[6])
        setI8(incomeDayAll?.data[7])
        setI9(incomeDayAll?.data[8])
        setI10(incomeDayAll?.data[9])
        setI11(incomeDayAll?.data[10])
        setI12(incomeDayAll?.data[11])
        setI13(incomeDayAll?.data[12])
        setI14(incomeDayAll?.data[13])
        setI15(incomeDayAll?.data[14])
        setI16(incomeDayAll?.data[15])
        setI17(incomeDayAll?.data[16])
        setI18(incomeDayAll?.data[17])
        setI19(incomeDayAll?.data[18])
        setI20(incomeDayAll?.data[19])
        setI21(incomeDayAll?.data[20])
        setI22(incomeDayAll?.data[21])
        setI23(incomeDayAll?.data[22])
        setI24(incomeDayAll?.data[23])
        setI25(incomeDayAll?.data[24])
        setI26(incomeDayAll?.data[25])
        setI27(incomeDayAll?.data[26])
        setI28(incomeDayAll?.data[27])
        setI29(incomeDayAll?.data[28])
        setI30(incomeDayAll?.data[29])
        setI31(incomeDayAll?.data[30])

      },[incomeDayAll])

      useEffect(()=> {
        setX1(outcomeDayAll?.data[0])
        setX2(outcomeDayAll?.data[1])
        setX3(outcomeDayAll?.data[2])
        setX4(outcomeDayAll?.data[3])
        setX5(outcomeDayAll?.data[4])
        setX6(outcomeDayAll?.data[5])
        setX7(outcomeDayAll?.data[6])
        setX8(outcomeDayAll?.data[7])
        setX9(outcomeDayAll?.data[8])
        setX10(outcomeDayAll?.data[9])
        setX11(outcomeDayAll?.data[10])
        setX12(outcomeDayAll?.data[11])
        setX13(outcomeDayAll?.data[12])
        setX14(outcomeDayAll?.data[13])
        setX15(outcomeDayAll?.data[14])
        setX16(outcomeDayAll?.data[15])
        setX17(outcomeDayAll?.data[16])
        setX18(outcomeDayAll?.data[17])
        setX19(outcomeDayAll?.data[18])
        setX20(outcomeDayAll?.data[19])
        setX21(outcomeDayAll?.data[20])
        setX22(outcomeDayAll?.data[21])
        setX23(outcomeDayAll?.data[22])
        setX24(outcomeDayAll?.data[23])
        setX25(outcomeDayAll?.data[24])
        setX26(outcomeDayAll?.data[25])
        setX27(outcomeDayAll?.data[26])
        setX28(outcomeDayAll?.data[27])
        setX29(outcomeDayAll?.data[28])
        setX30(outcomeDayAll?.data[29])
        setX31(outcomeDayAll?.data[30])

      },[outcomeDayAll])



      useEffect(()=> {
        setZ1(WaresDayAll?.data[0])
        setZ2(WaresDayAll?.data[1])
        setZ3(WaresDayAll?.data[2])
        setZ4(WaresDayAll?.data[3])
        setZ5(WaresDayAll?.data[4])
        setZ6(WaresDayAll?.data[5])
        setZ7(WaresDayAll?.data[6])
        setZ8(WaresDayAll?.data[7])
        setZ9(WaresDayAll?.data[8])
        setZ10(WaresDayAll?.data[9])
        setZ11(WaresDayAll?.data[10])
        setZ12(WaresDayAll?.data[11])
        setZ13(WaresDayAll?.data[12])
        setZ14(WaresDayAll?.data[13])
        setZ15(WaresDayAll?.data[14])
        setZ16(WaresDayAll?.data[15])
        setZ17(WaresDayAll?.data[16])
        setZ18(WaresDayAll?.data[17])
        setZ19(WaresDayAll?.data[18])
        setZ20(WaresDayAll?.data[19])
        setZ21(WaresDayAll?.data[20])
        setZ22(WaresDayAll?.data[21])
        setZ23(WaresDayAll?.data[22])
        setZ24(WaresDayAll?.data[23])
        setZ25(outcomeDayAll?.data[24])
        setZ26(WaresDayAll?.data[25])
        setZ27(WaresDayAll?.data[26])
        setZ28(WaresDayAll?.data[27])
        setZ29(WaresDayAll?.data[28])
        setZ30(WaresDayAll?.data[29])
        setZ31(WaresDayAll?.data[30])

      },[WaresDayAll])  

      const demo = [
        {
          "name": currentYear + "-" + currentMonth + "-" + 1,
          "הוצאה": i1 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 2,
          "הוצאה": i2 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 3,
          "הוצאה": i3 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 4,
          "הוצאה": i4 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 5,
          "הוצאה": i5 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 6,
          "הוצאה": i6
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 7,
          "הוצאה": i7
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 8,
          "הוצאה": i8
        },{
          "name": currentYear + "-" + currentMonth + "-" + 9,
          "הוצאה": i9
        
        }
        ,{
          "name": currentYear + "-" + currentMonth + "-" + 10,
          "הוצאה": i10
    
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 11,
          "הוצאה": i11 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 12,
          "הוצאה": i12
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 13,
          "הוצאה": i13
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 14,
          "הוצאה": i14
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 15,
          "הוצאה": i15
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 16,
          "הוצאה": i16
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 17,
          "הוצאה":  i17
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 18,
          "הוצאה": i18
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 19,
          "הוצאה": i19 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 20,
          "הוצאה": i20 
        },{
          "name": currentYear + "-" + currentMonth + "-" + 21,
          "הוצאה": i21 
        
        }
        ,{
          "name": currentYear + "-" + currentMonth + "-" + 22,
          "הוצאה": i22 
    
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 23,
          "הוצאה": i23
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 24,
          "הוצאה": i24
    
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 25,
          "הוצאה": i25
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 26,
          "הוצאה": i26 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 27,
          "הוצאה": i27
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 28,
          "הוצאה": i28
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 29,
          "הוצאה": i29 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 30,
          "הוצאה":  i30
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 31 ,
          "הוצאה": i31
      
        }
    
      ]


      const demo2 = [
        {
          "name": currentYear + "-" + currentMonth + "-" + 1,
          "הוצאה": x1 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 2,
          "הוצאה": x2 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 3,
          "הוצאה": x3 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 4,
          "הוצאה": x4 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 5,
          "הוצאה": x5 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 6,
          "הוצאה": x6
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 7,
          "הוצאה": x7
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 8,
          "הוצאה": x8
        },{
          "name": currentYear + "/" + currentMonth + "/" + 9,
          "הוצאה": x9
        
        }
        ,{
          "name": currentYear + "-" + currentMonth + "-" + 10,
          "הוצאה": x10
    
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 11,
          "הוצאה": x11 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 12,
          "הוצאה": x12
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 13,
          "הוצאה": x13
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 14,
          "הוצאה": x14
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 15,
          "הוצאה": x15
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 16,
          "הוצאה": x16
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 17,
          "הוצאה":  x17
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 18,
          "הוצאה": x18
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 19,
          "הוצאה": x19 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 20,
          "הוצאה": x20 
        },{
          "name": currentYear + "-" + currentMonth + "-" + 21,
          "הוצאה": x21 
        
        }
        ,{
          "name": currentYear + "-" + currentMonth + "-" + 22,
          "הוצאה": x22 
    
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 23,
          "הוצאה": x23
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 24,
          "הוצאה": x24
    
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 25,
          "הוצאה": x25
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 26,
          "הוצאה": x26 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 27,
          "הוצאה": x27
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 28,
          "הוצאה": x28
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 29,
          "הוצאה": x29 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 30,
          "הוצאה":  x30
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 31 ,
          "הוצאה": x31
      
        }
       
    
      ]


      const demo3 = [
        {
          "name": currentYear + "-" + currentMonth + "-" + 1,
          "הוצאה": z1 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 2,
          "הוצאה": z2 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 3,
          "הוצאה": z3 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 4,
          "הוצאה": z4 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 5,
          "הוצאה": z5 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 6,
          "הוצאה": z6
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 7,
          "הוצאה": z7
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 8,
          "הוצאה": z8
        },{
          "name": currentYear + "-" + currentMonth + "-" + 9,
          "הוצאה": z9
        
        }
        ,{
          "name": currentYear + "-" + currentMonth + "-" + 10,
          "הוצאה": z10
    
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 11,
          "הוצאה": z11 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 12,
          "הוצאה": z12
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 13,
          "הוצאה": z13
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 14,
          "הוצאה": z14
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 15,
          "הוצאה": z15
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 16,
          "הוצאה": z16
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 17,
          "הוצאה":  z17
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 18,
          "הוצאה": z18
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 19,
          "הוצאה": z19 
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 20,
          "הוצאה": z20 
        },{
          "name": currentYear + "-" + currentMonth + "-" + 21,
          "הוצאה": z21 
        
        }
        ,{
          "name": currentYear + "-" + currentMonth + "-" + 22,
          "הוצאה": z22 
    
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 23,
          "הוצאה": z23
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 24,
          "הוצאה": z24
    
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 25,
          "הוצאה": z25
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 26,
          "הוצאה": z26 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 27,
          "הוצאה": z27
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 28,
          "הוצאה": z28
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 29,
          "הוצאה": z29 
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 30,
          "הוצאה":  z30
      
        },
        {
          "name": currentYear + "-" + currentMonth + "-" + 31 ,
          "הוצאה": z31
      
        }
    
      ]  


   

     
    
  return (
    <div className="w-full max-w-[1880px] mx-auto ">
    <div className={`grid grid-cols-1 xr:grid-cols-1 md:grid-cols-1 gap-[3px] mb-1 w-full ${hebrew ? "" : "airx:mr-[185px]"} md:px-2 px-4`}>
       
    {/* <div className={`flex flex-col justify-around h-[110px] items-center text-center ${globalTheme != "light" ? "border-white" : "bg-white"} w-full h-full shadow-xl border-4 border-white mmu:border-[#ccc] mt-[6px] rounded-2xl hover:scale-105 ease-out transition-all duration-125 `} >
      <NivoLineCustomIncomeDialog4 arr={demo} theme={globalTheme} lang={hebrew}/>
    </div> */}

    <div className={`flex flex-col justify-around h-[128.8px] items-center text-center ${globalTheme != "light" ? "border-white border-4 blue-glassmorphism" : (space ? "blue-glassmorphism" : "bg-white")} w-full h-full shadow-md border-[1px] hover:scale-y-110 ease-out transition-all duration-125 border-gray-300 mmu:shadow-lg mt-[6px] rounded-lg `} >
      <NivoLineCustomIncomeDialog2 arr={demo}/>
    </div>

    <div className={`flex flex-col justify-around h-[128.8px] items-center text-center ${globalTheme != "light" ? "border-white border-4 blue-glassmorphism" : (space ? "blue-glassmorphism" : "bg-white")} w-full h-full shadow-md border-[1px] hover:scale-y-110 ease-out transition-all duration-125 border-gray-300 mmu:shadow-lg mt-[6px] rounded-lg `} >
      <NivoLineCustomIncomeDialog4 arr={demo3}/>
    </div>
      
    <div className={`flex flex-col justify-around h-[128.8px] items-center text-center ${globalTheme != "light" ? "border-white border-4 blue-glassmorphism" : (space ? "blue-glassmorphism" : "bg-white")} w-full h-full shadow-md border-[1px] hover:scale-y-110 ease-out transition-all duration-125 border-gray-300 mmu:shadow-lg mt-[6px] rounded-lg `} >
      <NivoLineCustomIncomeDialog3 arr={demo2}/>
    </div>
      
    </div>
    </div>
  )
}

export default UnderTopCharts