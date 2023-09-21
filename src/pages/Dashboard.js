import React, { useState, useEffect, useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { CircularProgressbar } from "react-circular-progressbar";
// import { LineChart, AreaChart, Area, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import NivoLineCustomIncomeDialog from '../components/NivoLineCustomIncomeDialog';
import NivoLineCustomOutcomeDialog from '../components/NivoLineCustomOutcomeDialog';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { styled } from '@mui/material/styles';
import AddchartIcon from '@mui/icons-material/Addchart';
// import {BarChart, Bar, Legend, ResponsiveContainer  } from 'recharts';
import LinearProgress from '@mui/material/LinearProgress';
import axios from "axios";
import Switch from '@mui/material/Switch';
import SideBarPage from '../components/SideBarPage'
import { useNavigate } from 'react-router-dom'
import "react-circular-progressbar/dist/styles.css";
import UnderTopBoxes from "../components/UnderTopBoxes";
import UnderTopCharts from "../components/UnderTopCharts";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CloseIcon from '@mui/icons-material/Close';
import TopBox from '../components/TopBox'
import { Snackbar, Alert, Dialog, Select, MenuItem, InputLabel } from "@mui/material";
import Footer from "../components/Footer";
import { ThemeContext } from "../App";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import NivoBar from "../components/NivoBar";
import NivoPaiHome from "../components/NivoPaiHome";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ScoreIcon from '@mui/icons-material/Score';
import { useQuery } from 'react-query'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import MainNivoLine from '../components/MainNivoLine'
// import NivoBar2 from "../components/NivoBar2";
// import MainNivoLine2 from "../components/MainNivoLine2";
import MainNivoLine3 from "../components/MainNivoLine3";
import MainNivoLineMobile from "../components/MainNivoLineMobile";
// import MainChart from "../components/MainChart";




const Dashboard = () => {

  const navigate = useNavigate();

  const y = new Date().getFullYear()
  const m = new Date().getMonth() + 1

  const [isSSR, setIsSSR] = useState(true);
  const [meeting, setMeeting] = useState(false)
  const [isSSRE, setIsSSRE] = useState(true);
  const [isSSREx, setIsSSREx] = useState(true);
  const [errors, setErrors] = useState()
  const [errorMode, setErrorMode] = useState(false)
  const [task, setTask] = useState(false)
  // const [mainChart, setMainChart] = useState("שנתי")
  const [print, setPrint] = useState(false)
  const [spin, setSpin] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [workerTask, setWorkerTask] = useState("")
  

  const [urgentTasks, setUrgentTasks] = useState()
  const [user, setUser] = useState({});

  const [qqqqq, setQqqqq] = useState([])
  const [incomeMonth, setIncomeMonth] = useState("");
  const [incomeYear, setIncomeYear] = useState(0)
  const [dateFlag, setDateFlag] = useState(false)
  const [monthNumber, setMonthNumber] = useState(0);
  const [chartMode, setChartMode] = useState(true)
  const [incomeCurrentYear, setIncomeCurrentYear] = useState(y)



  const [januarIncomex, setJanuarIncome] = useState();
  const [februaryIncomex, setFebruaryIncome] = useState();
  const [marchIncomex, setMarchIncome] = useState();
  const [aprilIncomex, setAprilIncome] = useState();
  const [mayIncomex, setMayIncome] = useState();
  const [juneIncomex, setJuneIncome] = useState();
  const [julyIncomex, setJulyIncome] = useState();
  const [augustIncomex, setAugustIncome] = useState();
  const [septemberIncomex, setSeptemberIncome] = useState();
  const [octoberIncomex, setOctoberIncome] = useState();
  const [novemberIncomex, setNovemberIncome] = useState();
  const [decemberIncomex, setDecemberIncome] = useState();

 
  const [golmiProfit, setGolmiProfit] = useState()
  const [tifuliProfit, setTifuliProfit] = useState()
  // const [dashMode, setDashMode] = useState(true)

  const [currentMonthChangeableOutcome, setCurrentMonthChangeableOutcome] = useState()
  const [currentMonthPermanentOutcome, setCurrentMonthPermanentOutcome] = useState()
  const [currentMonthWaresOutcome, setCurrentWaresOutcome] = useState()

  
  const [januarSupplierWaresOutcomex, setJanuarSupplierWaresOutcome] = useState();
  const [februarySupplierWaresOutcomex, setFebruarySupplierWaresOutcome] = useState();
  const [marchSupplierWaresOutcomex, setMarchSupplierWaresOutcome] = useState();
  const [aprilSupplierWaresOutcomex, setAprilSupplierWaresOutcome] = useState();
  const [maySupplierWaresOutcomex, setMaySupplierWaresOutcome] = useState();
  const [juneSupplierWaresOutcomex, setJuneSupplierWaresOutcome] = useState();
  const [julySupplierWaresOutcomex, setJulySupplierWaresOutcome] = useState();
  const [augustSupplierWaresOutcomex, setAugustSupplierWaresOutcome] = useState();
  const [septemberSupplierWaresOutcomex, setSeptemberSupplierWaresOutcome] = useState();
  const [octoberSupplierWaresOutcomex, setOctoberSupplierWaresOutcome] = useState();
  const [novemberSupplierWaresOutcomex, setNovemberSupplierWaresOutcome] = useState();
  const [decemberSupplierWaresOutcomex, setDecemberSupplierWaresOutcome] = useState();


  const [januarSalariesx, setJanuarSalaries] = useState();
  const [februarySalariesx, setFebruarySalaries] = useState();
  const [marchSalariesx, setMarchSalaries] = useState();
  const [aprilSalariesx, setAprilSalaries] = useState();
  const [maySalariesx, setMaySalaries] = useState();
  const [juneSalariesx, setJuneSalaries] = useState();
  const [julySalariesx, setJulySalaries] = useState();
  const [augustSalariesx, setAugustSalaries] = useState();
  const [septemberSalariesx, setSeptemberSalaries] = useState();
  const [octoberSalariesx, setOctoberSalaries] = useState();
  const [novemberSalariesx, setNovemberSalaries] = useState();
  const [decemberSalariesx, setDecemberSalaries] = useState();

  const [januarMonthTaxInvoicesIsTazrim, setJanuarMonthTaxInvoicesIsTazrim] = useState();
  const [februaryMonthTaxInvoicesIsTazrim, setFebruaryMonthTaxInvoicesIsTazrim] = useState();
  const [marchMonthTaxInvoicesIsTazrim, setMarchMonthTaxInvoicesIsTazrim] = useState();
  const [aprilMonthTaxInvoicesIsTazrim, setAprilMonthTaxInvoicesIsTazrim] = useState();
  const [mayMonthTaxInvoicesIsTazrim, setMayMonthTaxInvoicesIsTazrim] = useState();
  const [juneMonthTaxInvoicesIsTazrim, setJuneMonthTaxInvoicesIsTazrim] = useState();
  const [julyMonthTaxInvoicesIsTazrim, setJulyMonthTaxInvoicesIsTazrim] = useState();
  const [augustrMonthTaxInvoicesIsTazrim, setAugustMonthTaxInvoicesIsTazrim] = useState();
  const [septemberMonthTaxInvoicesIsTazrim, setSeptemberMonthTaxInvoicesIsTazrim] = useState();
  const [octoberMonthTaxInvoicesIsTazrim, setOctoberMonthTaxInvoicesIsTazrim] = useState();
  const [novemberMonthTaxInvoicesIsTazrim, setNovemberMonthTaxInvoicesIsTazrim] = useState();
  const [decemberMonthTaxInvoicesIsTazrim, setDecemberMonthTaxInvoicesIsTazrim] = useState();

  const [januarSupplierChangeableOutcomex, setJanuarSupplierChangeableOutcome] = useState();
  const [februarySupplierChangeableOutcomex, setFebruarySupplierChangeableOutcome] = useState();
  const [marchSupplierChangeableOutcomex, setMarchSupplierChangeableOutcome] = useState();
  const [aprilSupplierChangeableOutcomex, setAprilSupplierChangeableOutcome] = useState();
  const [maySupplierChangeableOutcomex, setMaySupplierChangeableOutcome] = useState();
  const [juneSupplierChangeableOutcomex, setJuneSupplierChangeableOutcome] = useState();
  const [julySupplierChangeableOutcomex, setJulySupplierChangeableOutcome] = useState();
  const [augustSupplierChangeableOutcomex, setAugustSupplierChangeableOutcome] = useState();
  const [septemberSupplierChangeableOutcomex, setSeptemberSupplierChangeableOutcome] = useState();
  const [octoberSupplierChangeableOutcomex, setOctoberSupplierChangeableOutcome] = useState();
  const [novemberSupplierChangeableOutcomex, setNovemberSupplierChangeableOutcome] = useState();
  const [decemberSupplierChangeableOutcomex, setDecemberSupplierChangeableOutcome] = useState();
  
  const [januarSupplierPermanentOutcomex, setJanuarSupplierPermanentOutcome] = useState();
  const [februarySupplierPermanentOutcomex, setFebruarySupplierPermanentOutcome] = useState();
  const [marchSupplierPermanentOutcomex, setMarchSupplierPermanentOutcome] = useState();
  const [aprilSupplierPermanentOutcomex, setAprilSupplierPermanentOutcome] = useState();
  const [maySupplierPermanentOutcomex, setMaySupplierPermanentOutcome] = useState();
  const [juneSupplierPermanentOutcomex, setJuneSupplierPermanentOutcome] = useState();
  const [julySupplierPermanentOutcomex, setJulySupplierPermanentOutcome] = useState();
  const [augustSupplierPermanentOutcomex, setAugustSupplierPermanentOutcome] = useState();
  const [septemberSupplierPermanentOutcomex, setSeptemberSupplierPermanentOutcome] = useState();
  const [octoberSupplierPermanentOutcomex, setOctoberSupplierPermanentOutcome] = useState();
  const [novemberSupplierPermanentOutcomex, setNovemberSupplierPermanentOutcome] = useState();
  const [decemberSupplierPermanentOutcomex, setDecemberSupplierPermanentOutcome] = useState();

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



  const [yearMode, setYearMode] = useState(true)
  const [screen, setScreen] = useState()
  const [open, setOpen] = useState(false)
  const [openx, setOpenx] = useState(false)
  const [incomeFlag, setIncomeFlag] = useState(false)
  const [waresFlag, setWaresFlag] = useState(false)
  const [allOutcomeFlag, setAllOutcomeFlag] = useState(false)
  const [outcomeFlag, setOutcomeFlag] = useState(false)
  const [outcomeWaresFlag, setOutcomeWaresFlag] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)


  const salary = JSON.parse(localStorage.getItem('salary'));
  const income = JSON.parse(localStorage.getItem('income'));
  const invoice = JSON.parse(localStorage.getItem('invoice'));
  const wares = JSON.parse(localStorage.getItem('wares'));
  const permanent = JSON.parse(localStorage.getItem('permanent'));
  const changeable = JSON.parse(localStorage.getItem('changeable'));
  const refund = JSON.parse(localStorage.getItem('refund'));
  const taxInvoice = JSON.parse(localStorage.getItem('taxInvoice'));
  const rest = JSON.parse(localStorage.getItem('restaurant'));

  const getTasks = () => {
    const id = result?.id
    return axios.get('https://nartina.com/api/user/user-worker-tasks/' + id)
  }
  
  const {data: tasks, refetch} = useQuery('user-worker-tasks', ()=> getTasks(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: true,
      refetchOnWindowFocus:false
 
    }) 

    


  const { globalTheme, setSpins, hebrew, setChart, setDashMode, chart, dashMode, area, setArea, chart2, setChart2, mainChart, setMainChart, space } = useContext(ThemeContext)

  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]

  const charts = ["שנתי", "חודשי", "גולמי"]

  const screenSize = window.screen.availWidth

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const lastYear = new Date().getFullYear() -1
  const lastTwoYear = new Date().getFullYear() -2

  const years = [currentYear, lastYear, lastTwoYear]  

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)

  useEffect(()=> {
      setScreen(screenSize)
  }, [screenSize])

 

  useEffect(()=> {
    setTimeout(()=> {
      localStorage.setItem('salary', false)
      localStorage.setItem('income', false)
      localStorage.setItem('supplier', false)
      localStorage.setItem('invoice', false)
      localStorage.setItem('worker', false)
      localStorage.setItem('customer', false)
      localStorage.setItem('wares', false)
      localStorage.setItem('permanent', false)
      localStorage.setItem('changeable', false)
      localStorage.setItem('refund', false)
      localStorage.setItem('invent', false)
      localStorage.setItem('scheduler', false)
      localStorage.setItem('deffrreal', false)
      localStorage.setItem('payment', false)
      localStorage.setItem('restaurant', false)
      localStorage.setItem('taxInvoice', false)


    }, 2000)
  })


  useEffect(()=> {
    setSpins(true)
       setTimeout(() => {
       setSpins(false)
      }, 1400)
  }, [])



  useEffect(() => {
    const res = localStorage.getItem("user");
    const result = JSON.parse(res);
    setUser(result);
  }, [user?.id]);

  useEffect(() => {
    if(errors == 403) {
      setErrorMode(true)
      setTimeout(() => {
        localStorage.removeItem("user")
        window.location.replace('/login')
        // navigate('/login')
        // window.location.reload() 
      }, 3000)
    }
    
  }, [errorMode, errors]);



let resizeWindow = () => {
  setWindowWidth(window.innerWidth);
  setWindowHeight(window.innerHeight);
};

useEffect(() => {
  resizeWindow();
  console.log(window.innerHeight)
  console.log(window.innerWidth)
  window.addEventListener("resize", resizeWindow);
  return () => window.removeEventListener("resize", resizeWindow);  
}, [windowHeight, window.innerHeight, windowWidth, window.innerWidth]);



const getIncomesData = () => {
  const id = result?.id
  return axios.get(`https://nartina.com/api/user/daily-income-by-year-array/${id}/${incomeCurrentYear}`)
}

const {data: incomesAll, refetch: www} = useQuery('incomes-data-all', getIncomesData,
  {
    refetchOnMount: income,
    refetchOnWindowFocus: false
   
  })


  const getSalariesData = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/salary-by-year-array/${id}/${incomeCurrentYear}`)
  }
  
  const {data: salariesAll, refetch: sss} = useQuery('salaries-data-all', getSalariesData,
    {
      refetchOnMount: salary,
      refetchOnWindowFocus: false
     
    })


    const getWaresData = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/wares-by-year-array/${id}/${incomeCurrentYear}`)
    }
    
    const {data: waresAll, refetch: rrr} = useQuery('wares-data-all', getWaresData,
      {
        refetchOnMount: wares || invoice,
        refetchOnWindowFocus: false
       
      })


      const getPermanentData = () => {
        const id = result?.id
        return axios.get(`https://nartina.com/api/user/permanent-by-year-array/${id}/${incomeCurrentYear}`)
      }
      
      const {data: permanentAll, refetch: ppp} = useQuery('permanent-data-all', getPermanentData,
        {
          refetchOnMount: permanent || invoice,
          refetchOnWindowFocus: false
         
        })


        const getChangeableData = () => {
          const id = result?.id
          return axios.get(`https://nartina.com/api/user/changeable-by-year-array/${id}/${incomeCurrentYear}`)
        }
        
        const {data: changableAll, refetch: fff} = useQuery('changable-data-all', getChangeableData,
          {
            refetchOnMount: changeable || invoice,
            refetchOnWindowFocus: false
           
          })

          const getReceiptsData = () => {
            const id = result?.id
            return axios.get(`https://nartina.com/api/user/receipts-by-year-array/${id}/${incomeCurrentYear}`)
          }
          
          const {data: receiptsAll, refetch: ttt} = useQuery('receipts-data-all', getReceiptsData,
            {
              refetchOnMount: taxInvoice,
              refetchOnWindowFocus: false
             
            })

            const getDailyIncomeDay = () => {
              const id = result?.id
              return axios.get(`https://nartina.com/api/user/daily-income-array-days/${id}/${incomeMonth == "" ? currentYear : incomeYear}/${incomeMonth == "" ? currentMonth : monthNumber}`)
            }
            
            const {data: incomeDayAll, refetch: vvv} = useQuery('incomes-data-day', getDailyIncomeDay,
              {
                // enabled: false
               
              })

              const getOutcomeDay = () => {
                const id = result?.id
                return axios.get(`https://nartina.com/api/user/outcome-array-days/${id}/${incomeMonth == "" ? currentYear : incomeYear}/${incomeMonth == "" ? currentMonth : monthNumber}`)
               }
               
             const {data: outcomeDayAll, refetch: mmm} = useQuery('outcome-day', getOutcomeDay,
                 {
                   enabled: false
                  
                 })
       
             const getWaresDay = () => {
                 const id = result?.id
                 return axios.get(`https://nartina.com/api/user/wares-array-days/${id}/${incomeMonth == "" ? currentYear : incomeYear}/${incomeMonth == "" ? currentMonth : monthNumber}`)
                 }
                  
             const {data: WaresDayAll, refetch: nnn} = useQuery('wares-day', getWaresDay,
                    {
                      enabled: false
                     
                    })
                    
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

              },[incomeDayAll, incomeCurrentYear, setIncomeCurrentYear])    

  useEffect(()=> {
    setJanuarIncome(incomesAll?.data[0])
    setFebruaryIncome(incomesAll?.data[1])
    setMarchIncome(incomesAll?.data[2])
    setAprilIncome(incomesAll?.data[3])
    setMayIncome(incomesAll?.data[4])
    setJuneIncome(incomesAll?.data[5])
    setJulyIncome(incomesAll?.data[6])
    setAugustIncome(incomesAll?.data[7])
    setSeptemberIncome(incomesAll?.data[8])
    setOctoberIncome(incomesAll?.data[9])
    setNovemberIncome(incomesAll?.data[10])
    setDecemberIncome(incomesAll?.data[11])
  },[incomesAll, incomeCurrentYear, setIncomeCurrentYear])

  useEffect(()=> {
    setJanuarMonthTaxInvoicesIsTazrim(receiptsAll?.data[0])
    setFebruaryMonthTaxInvoicesIsTazrim(receiptsAll?.data[1])
    setMarchMonthTaxInvoicesIsTazrim(receiptsAll?.data[2])
    setAprilMonthTaxInvoicesIsTazrim(receiptsAll?.data[3])
    setMayMonthTaxInvoicesIsTazrim(receiptsAll?.data[4])
    setJuneMonthTaxInvoicesIsTazrim(receiptsAll?.data[5])
    setJulyMonthTaxInvoicesIsTazrim(receiptsAll?.data[6])
    setAugustMonthTaxInvoicesIsTazrim(receiptsAll?.data[7])
    setSeptemberMonthTaxInvoicesIsTazrim(receiptsAll?.data[8])
    setOctoberMonthTaxInvoicesIsTazrim(receiptsAll?.data[9])
    setNovemberMonthTaxInvoicesIsTazrim(receiptsAll?.data[10])
    setDecemberMonthTaxInvoicesIsTazrim(receiptsAll?.data[11])
  },[receiptsAll, incomeCurrentYear, setIncomeCurrentYear])

  useEffect(()=> {
    setJanuarSalaries(salariesAll?.data[0])
    setFebruarySalaries(salariesAll?.data[1])
    setMarchSalaries(salariesAll?.data[2])
    setAprilSalaries(salariesAll?.data[3])
    setMaySalaries(salariesAll?.data[4])
    setJuneSalaries(salariesAll?.data[5])
    setJulySalaries(salariesAll?.data[6])
    setAugustSalaries(salariesAll?.data[7])
    setSeptemberSalaries(salariesAll?.data[8])
    setOctoberSalaries(salariesAll?.data[9])
    setNovemberSalaries(salariesAll?.data[10])
    setDecemberSalaries(salariesAll?.data[11])
  },[salariesAll, incomeCurrentYear, setIncomeCurrentYear])

  useEffect(()=> {
    setJanuarSupplierWaresOutcome(waresAll?.data[0])
    setFebruarySupplierWaresOutcome(waresAll?.data[1])
    setMarchSupplierWaresOutcome(waresAll?.data[2])
    setAprilSupplierWaresOutcome(waresAll?.data[3])
    setMaySupplierWaresOutcome(waresAll?.data[4])
    setJuneSupplierWaresOutcome(waresAll?.data[5])
    setJulySupplierWaresOutcome(waresAll?.data[6])
    setAugustSupplierWaresOutcome(waresAll?.data[7])
    setSeptemberSupplierWaresOutcome(waresAll?.data[8])
    setOctoberSupplierWaresOutcome(waresAll?.data[9])
    setNovemberSupplierWaresOutcome(waresAll?.data[10])
    setDecemberSupplierWaresOutcome(waresAll?.data[11])
  },[waresAll, incomeCurrentYear, setIncomeCurrentYear])

  useEffect(()=> {
    setJanuarSupplierPermanentOutcome(permanentAll?.data[0])
    setFebruarySupplierPermanentOutcome(permanentAll?.data[1])
    setMarchSupplierPermanentOutcome(permanentAll?.data[2])
    setAprilSupplierPermanentOutcome(permanentAll?.data[3])
    setMaySupplierPermanentOutcome(permanentAll?.data[4])
    setJuneSupplierPermanentOutcome(permanentAll?.data[5])
    setJulySupplierPermanentOutcome(permanentAll?.data[6])
    setAugustSupplierPermanentOutcome(permanentAll?.data[7])
    setSeptemberSupplierPermanentOutcome(permanentAll?.data[8])
    setOctoberSupplierPermanentOutcome(permanentAll?.data[9])
    setNovemberSupplierPermanentOutcome(permanentAll?.data[10])
    setDecemberSupplierPermanentOutcome(permanentAll?.data[11])
  },[permanentAll, incomeCurrentYear, setIncomeCurrentYear])


  useEffect(()=> {
    setJanuarSupplierChangeableOutcome(changableAll?.data[0])
    setFebruarySupplierChangeableOutcome(changableAll?.data[1])
    setMarchSupplierChangeableOutcome(changableAll?.data[2])
    setAprilSupplierChangeableOutcome(changableAll?.data[3])
    setMaySupplierChangeableOutcome(changableAll?.data[4])
    setJuneSupplierChangeableOutcome(changableAll?.data[5])
    setJulySupplierChangeableOutcome(changableAll?.data[6])
    setAugustSupplierChangeableOutcome(changableAll?.data[7])
    setSeptemberSupplierChangeableOutcome(changableAll?.data[8])
    setOctoberSupplierChangeableOutcome(changableAll?.data[9])
    setNovemberSupplierChangeableOutcome(changableAll?.data[10])
    setDecemberSupplierChangeableOutcome(changableAll?.data[11])
  },[changableAll, incomeCurrentYear, setIncomeCurrentYear])




const getJwt = () => {
  return axios.get("https://nartina.com/api/test/test-jwt", {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
}
const onSuccess = (dataxx) => {
  console.log("-------> <------- " + dataxx?.data)
}

const onError = (err) => {
  console.log("jwt-error--------> " + err.response.status)
  setErrors(err.response.status)
}




const {data: jwt} = useQuery('jwt', ()=> getJwt(),
  {
    // enabled: !!supplier?.name,
    staleTime: 50000,
    onSuccess,
    onError
    // refetchOnMount: true,
    // refetchOnWindowFocus: true
  })


   
const getNumsOfSchedulers = () => {
  const id = result?.id
  return axios.get(`https://nartina.com/api/user/schedulers-by-user-from-today-and-above/${id}`)
}

const {data: numsOfSchedulers} = useQuery('numsOfSchedulers', ()=> getNumsOfSchedulers(),
  {
   
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })


useEffect(()=> {
  if(numsOfSchedulers?.data > 0) {
    setMeeting(true)
  }
}, [numsOfSchedulers?.data])


const getMonthlyOutcomeByType = () => {
  const id = result?.id
  return axios.get("https://nartina.com/api/user/outcome-type-current-month-array/" + id + "/" + currentMonth + "/" + currentYear)
}

const {data: outcomeType} = useQuery('outcome-type', ()=> getMonthlyOutcomeByType(),
  {
    // enabled: !!supplier?.name,
    // staleTime: 300000
    refetchOnMount: invoice,
    refetchOnWindowFocus: false
  }) 

  useEffect(()=> {
    setCurrentWaresOutcome(outcomeType?.data[0])
    setCurrentMonthPermanentOutcome(outcomeType?.data[1])
    setCurrentMonthChangeableOutcome(outcomeType?.data[2])
  
  },[outcomeType, currentMonth, currentYear])


const getMonthlyOutcomeForVat = () => {
  const id = result?.id
  return axios.get("https://nartina.com/api/user/total-monthly-outcome-with-vat/" + id + "/" + currentMonth + "/" + currentYear)
}

const {data: MonthlyOutcomeForVat} = useQuery('monthlyOutcomeForVat', ()=> getMonthlyOutcomeForVat(),
  {
    // enabled: !!supplier?.name,
    // staleTime: 300000
    refetchOnMount: invoice,
    refetchOnWindowFocus: false
  }) 



  const getCurrentMonthRestaurantAmount = () => {
    const id = result?.id
    return axios.get("https://nartina.com/api/user/restaurant-month-amount/" + id + "/" + currentMonth + "/" + currentYear)
  }
  
  const {data: currentMonthRestaurantAmount} = useQuery('currentMonthRestaurantAmount', ()=> getCurrentMonthRestaurantAmount(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: rest,
      refetchOnWindowFocus: false
    }) 




  const getMonthlyDailyIncome = () => {
    const id = result?.id
    return axios.get("https://nartina.com/api/user/monthly-income/" + id + "/" + currentMonth + "/" + currentYear)
  }
  
  const {data: currentMonthDailyIncome} = useQuery('monthlyIncomeForGolmiProfit', ()=> getMonthlyDailyIncome(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: income,
      refetchOnWindowFocus: false
    }) 



    const getCurrentMonthSallries = () => {
      const id = result?.id
      return axios.get('https://nartina.com/api/user/all-salaries-by-current-month/'+ id + "/" + currentMonth + "/" + currentYear)
    }
    
    const {data: currentMonthSallries} = useQuery('currentMonthSallries', ()=> getCurrentMonthSallries(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: salary,
        refetchOnWindowFocus: false
      }) 


      const getCurrentMonthTaxInvoicesIsTazrim= () => {
        const id = result?.id
        return axios.get('https://nartina.com/api/user/get-receipts-per-user-tazrim/'+ id + "/" + currentMonth + "/" + currentYear)
      }
      
      const {data: currentMonthTaxInvoicesIsTazrim} = useQuery('currentMonthTaxInvoicesIsTazrim', ()=> getCurrentMonthTaxInvoicesIsTazrim(),
        {
          // enabled: !!supplier?.name,
          // staleTime: 300000
          refetchOnMount: taxInvoice,
          refetchOnWindowFocus: false
        }) 



  // const forVat = Math.round(MonthlyOutcomeForVat?.data - (MonthlyOutcomeForVat?.data / 1.17))
  // const forVat2 = Math.round((monthlyIncomeForGolmiProfit?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - ((monthlyIncomeForGolmiProfit?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) / 1.17))
  // const vat = Math.round(forVat2 - forVat)

  const forVat = Math.round((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data))
  const forVat2 = Math.round(MonthlyOutcomeForVat?.data)
  const forVat3 = Math.round(forVat - forVat2)
  const vat = Math.round(forVat3 * 17 / 117)
  

  const monthlyIncomeToString = Number(isNaN(currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) ? 0 : Math.round(currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data)).toLocaleString()
  const monthlyWaresOutcomeToString = Number(isNaN(currentMonthWaresOutcome) ? 0 : Math.round(currentMonthWaresOutcome)).toLocaleString()
  const monthlyTotalOutcomeToString = Number(isNaN(currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data) ? 0 : Math.round(currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data)).toLocaleString()
  const balanceToString = Number(isNaN((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - (currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data + vat)) ? 0 : Math.round((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - (currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data + vat))).toLocaleString()


  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=> {
    if(((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - (currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data + vat)) < 0){
      setOpen(true)
    }
  }, [currentMonthDailyIncome?.data, currentMonthWaresOutcome, currentMonthPermanentOutcome, currentMonthChangeableOutcome, currentMonthSallries?.data, currentMonthTaxInvoicesIsTazrim?.data, currentMonthRestaurantAmount?.data + vat])
  
  

  useEffect(() => {
    setTimeout(() => {
      setIsSSRE(false);
    }, 300)
    
  }, [isSSRE]);

  

  useEffect(() => {
    setIsSSR(false);
  }, []);




  
  useEffect(()=> {
    setGolmiProfit(((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - currentMonthWaresOutcome) / (currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) )
  }, [currentMonthDailyIncome?.data, currentMonthWaresOutcome, currentMonthTaxInvoicesIsTazrim?.data, currentMonthRestaurantAmount?.data])




  useEffect(()=> {
    setTifuliProfit(((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - (currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data)) / (currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data))
}, [currentMonthDailyIncome?.data, currentMonthWaresOutcome, currentMonthPermanentOutcome, currentMonthChangeableOutcome, currentMonthSallries?.data, tifuliProfit, currentMonthTaxInvoicesIsTazrim?.data, currentMonthRestaurantAmount?.data])
  


  const handleCloseMeeting = () => {
    setMeeting(false)
  }

  const handleClose9 = () => {
    setErrorMode(false)
    setErrors("")
  }


 
    const getMonthInHebrew = () => {
      let month = "";
        switch (new Date().getMonth() + 1) {
          case 1:
            month = "ינואר"
            break;
            case 2:
              month = "פברואר"
              break;
              case 3:
                month = "מרץ"
                break;
                case 4:
                  month = "אפריל"
                  break;
                  case 5:
                    month = "מאי"
                  break;
                  case 6:
                    month = "יוני"
                  break;
                  case 7:
                    month = "יולי"
                  break;
                  case 8:
                    month = "'אוג"
                  break;
                  case 9:
                    month = "'ספט"
                  break;
                  case 10:
                    month = "'אוק"
                  break;
                  case 11:
                    month = "'נוב"
                  break;
                  case 12:
                    month = "'דצמ"
                  break;
          default:
            month = new Date().getMonth().toLocaleString()
            break;
        }
        return month;
  }

  const month = getMonthInHebrew()

  const data = [
    { name: hebrew ? 'january' : "ינואר", הכנסה: januarIncomex + januarMonthTaxInvoicesIsTazrim, הוצאות: januarSupplierWaresOutcomex + januarSupplierChangeableOutcomex + januarSupplierPermanentOutcomex + januarSalariesx, pv: 2400, amt: 2400 },
    { name: hebrew ? 'february' : "'פבר", הכנסה: februaryIncomex + februaryMonthTaxInvoicesIsTazrim, הוצאות: februarySupplierWaresOutcomex + februarySupplierChangeableOutcomex + februarySupplierPermanentOutcomex + februarySalariesx, pv: 2400, amt: 1760 },
    { name: hebrew ? 'march' : "מרץ", הכנסה: marchIncomex + marchMonthTaxInvoicesIsTazrim, הוצאות: marchSupplierWaresOutcomex + marchSupplierChangeableOutcomex + marchSupplierPermanentOutcomex + marchSalariesx, pv: 1580, amt: 2170 },
    { name: hebrew ? 'april' : "אפריל", הכנסה: aprilIncomex + aprilMonthTaxInvoicesIsTazrim, הוצאות: aprilSupplierWaresOutcomex + aprilSupplierChangeableOutcomex + aprilSupplierPermanentOutcomex + aprilSalariesx, pv: 870, amt: 2768 },
    { name: hebrew ? 'may' : "מאי", הכנסה: mayIncomex + mayMonthTaxInvoicesIsTazrim, הוצאות: maySupplierWaresOutcomex + maySupplierChangeableOutcomex + maySupplierPermanentOutcomex + maySalariesx, pv: 980, amt: 1877 },
    { name: hebrew ? 'june' : "יוני", הכנסה: juneIncomex + juneMonthTaxInvoicesIsTazrim, הוצאות: juneSupplierWaresOutcomex + juneSupplierChangeableOutcomex + juneSupplierPermanentOutcomex + juneSalariesx, pv: 650, amt: 2768 },
    { name: hebrew ? 'july' : "יולי", הכנסה: julyIncomex + julyMonthTaxInvoicesIsTazrim, הוצאות: julySupplierWaresOutcomex + julySupplierChangeableOutcomex + julySupplierPermanentOutcomex + julySalariesx, pv: 456, amt: 2295 },
    { name: hebrew ? 'august' : "'אוג", הכנסה: augustIncomex + augustrMonthTaxInvoicesIsTazrim, הוצאות: augustSupplierWaresOutcomex + augustSupplierChangeableOutcomex + augustSupplierPermanentOutcomex + augustSalariesx, pv: 1024, amt: 2489 },
    { name: hebrew ? 'sep' : "'ספט", הכנסה: septemberIncomex + septemberMonthTaxInvoicesIsTazrim, הוצאות: septemberSupplierWaresOutcomex + septemberSupplierChangeableOutcomex + septemberSupplierPermanentOutcomex + septemberSalariesx, pv: 445, amt: 988 },
    { name: hebrew ? 'october' : "'אוק", הכנסה: octoberIncomex + octoberMonthTaxInvoicesIsTazrim, הוצאות: octoberSupplierWaresOutcomex + octoberSupplierChangeableOutcomex + octoberSupplierPermanentOutcomex + octoberSalariesx, pv: 666, amt: 1456 },
    { name: hebrew ? 'nov' : "'נוב", הכנסה: novemberIncomex + novemberMonthTaxInvoicesIsTazrim, הוצאות: novemberSupplierWaresOutcomex + novemberSupplierChangeableOutcomex + novemberSupplierPermanentOutcomex + novemberSalariesx, pv: 666, amt: 1456 },
    { name: hebrew ? 'dec' : "'דצמ", הכנסה: decemberIncomex + decemberMonthTaxInvoicesIsTazrim, הוצאות: decemberSupplierWaresOutcomex + decemberSupplierChangeableOutcomex + decemberSupplierPermanentOutcomex + decemberSalariesx, pv: 666, amt: 1456 },
    
  ];

  const data4 = [
    { name: 1, הכנסה: januarIncomex + januarMonthTaxInvoicesIsTazrim, הוצאות: januarSupplierWaresOutcomex + januarSupplierChangeableOutcomex + januarSupplierPermanentOutcomex + januarSalariesx, pv: 2400, amt: 2400 },
    { name: 2, הכנסה: februaryIncomex + februaryMonthTaxInvoicesIsTazrim, הוצאות: februarySupplierWaresOutcomex + februarySupplierChangeableOutcomex + februarySupplierPermanentOutcomex + februarySalariesx, pv: 2400, amt: 1760 },
    { name: 3, הכנסה: marchIncomex + marchMonthTaxInvoicesIsTazrim, הוצאות: marchSupplierWaresOutcomex + marchSupplierChangeableOutcomex + marchSupplierPermanentOutcomex + marchSalariesx, pv: 1580, amt: 2170 },
    { name: 4, הכנסה: aprilIncomex + aprilMonthTaxInvoicesIsTazrim, הוצאות: aprilSupplierWaresOutcomex + aprilSupplierChangeableOutcomex + aprilSupplierPermanentOutcomex + aprilSalariesx, pv: 870, amt: 2768 },
    { name: 5, הכנסה: mayIncomex + mayMonthTaxInvoicesIsTazrim, הוצאות: maySupplierWaresOutcomex + maySupplierChangeableOutcomex + maySupplierPermanentOutcomex + maySalariesx, pv: 980, amt: 1877 },
    { name: 6, הכנסה: juneIncomex + juneMonthTaxInvoicesIsTazrim, הוצאות: juneSupplierWaresOutcomex + juneSupplierChangeableOutcomex + juneSupplierPermanentOutcomex + juneSalariesx, pv: 650, amt: 2768 },
    { name: 7, הכנסה: julyIncomex + julyMonthTaxInvoicesIsTazrim, הוצאות: julySupplierWaresOutcomex + julySupplierChangeableOutcomex + julySupplierPermanentOutcomex + julySalariesx, pv: 456, amt: 2295 },
    { name: 8, הכנסה: augustIncomex + augustrMonthTaxInvoicesIsTazrim, הוצאות: augustSupplierWaresOutcomex + augustSupplierChangeableOutcomex + augustSupplierPermanentOutcomex + augustSalariesx, pv: 1024, amt: 2489 },
    { name: 9, הכנסה: septemberIncomex + septemberMonthTaxInvoicesIsTazrim, הוצאות: septemberSupplierWaresOutcomex + septemberSupplierChangeableOutcomex + septemberSupplierPermanentOutcomex + septemberSalariesx, pv: 445, amt: 988 },
    { name: 10, הכנסה: octoberIncomex + octoberMonthTaxInvoicesIsTazrim, הוצאות: octoberSupplierWaresOutcomex + octoberSupplierChangeableOutcomex + octoberSupplierPermanentOutcomex + octoberSalariesx, pv: 666, amt: 1456 },
    { name: 11, הכנסה: novemberIncomex + novemberMonthTaxInvoicesIsTazrim, הוצאות: novemberSupplierWaresOutcomex + novemberSupplierChangeableOutcomex + novemberSupplierPermanentOutcomex + novemberSalariesx, pv: 666, amt: 1456 },
    { name: 12, הכנסה: decemberIncomex + decemberMonthTaxInvoicesIsTazrim, הוצאות: decemberSupplierWaresOutcomex + decemberSupplierChangeableOutcomex + decemberSupplierPermanentOutcomex + decemberSalariesx, pv: 666, amt: 1456 },
    
  ];

  const data2 = [
    {
      "name": hebrew ? 'january' :  "ינואר",
      "הכנסות": januarIncomex + januarMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(januarSupplierWaresOutcomex),
    },
    {
      "name": hebrew ? 'february' : "'פבר",
      "הכנסות": februaryIncomex + februaryMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(februarySupplierWaresOutcomex),
    },
    {
      "name": hebrew ? 'march' : "מרץ",
      "הכנסות": marchIncomex + marchMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(marchSupplierWaresOutcomex),
    },
    {
      "name": hebrew ? 'april' : "אפריל",
      "הכנסות": aprilIncomex + aprilMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(aprilSupplierWaresOutcomex),
    },
    {
      "name": hebrew ? 'may' : "מאי",
      "הכנסות": mayIncomex + mayMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(maySupplierWaresOutcomex),
    },
    {
      "name": hebrew ? 'june' : "יוני",
      "הכנסות": juneIncomex + juneMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(juneSupplierWaresOutcomex),
    },
    {
      "name": hebrew ? 'july' : "יולי",
      "הכנסות": julyIncomex + julyMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(julySupplierWaresOutcomex),
    },
    {
      "name": hebrew ? 'august' : "'אוג",
      "הכנסות": augustIncomex + augustrMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(augustSupplierWaresOutcomex),
    },{
      "name": hebrew ? 'sep' : "'ספט",
      "הכנסות": septemberIncomex + septemberMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(septemberSupplierWaresOutcomex),
    }
    ,{
      "name": hebrew ? 'october' : "'אוק",
      "הכנסות": octoberIncomex + octoberMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(octoberSupplierWaresOutcomex),
    },
    {
      "name": hebrew ? 'november' : "'נוב",
      "הכנסות": novemberIncomex + novemberMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(novemberSupplierWaresOutcomex),
    },
    {
      "name": hebrew ? 'december' : "'דצמ",
      "הכנסות": decemberIncomex + decemberMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(decemberSupplierWaresOutcomex),
    }

  ]


  const data3 = [
    {
      "name": 1,
      "הכנסות": januarIncomex + januarMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(januarSupplierWaresOutcomex),
    },
    {
      "name": 2,
      "הכנסות": februaryIncomex + februaryMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(februarySupplierWaresOutcomex),
    },
    {
      "name": 3,
      "הכנסות": marchIncomex + marchMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(marchSupplierWaresOutcomex),
    },
    {
      "name": 4,
      "הכנסות": aprilIncomex + aprilMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(aprilSupplierWaresOutcomex),
    },
    {
      "name": 5,
      "הכנסות": mayIncomex + mayMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(maySupplierWaresOutcomex),
    },
    {
      "name": 6,
      "הכנסות": juneIncomex + juneMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(juneSupplierWaresOutcomex),
    },
    {
      "name": 7,
      "הכנסות": julyIncomex + julyMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(julySupplierWaresOutcomex),
    },
    {
      "name": 8,
      "הכנסות": augustIncomex + augustrMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(augustSupplierWaresOutcomex),
    },{
      "name": 9,
      "הכנסות": septemberIncomex + septemberMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(septemberSupplierWaresOutcomex),
    }
    ,{
      "name": 10,
      "הכנסות": octoberIncomex + octoberMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(octoberSupplierWaresOutcomex),
    },
    {
      "name": 11,
      "הכנסות": novemberIncomex + novemberMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(novemberSupplierWaresOutcomex),
    },
    {
      "name": 12,
      "הכנסות": decemberIncomex + decemberMonthTaxInvoicesIsTazrim,
      "סחורה": Math.round(decemberSupplierWaresOutcomex),
    }

  ]

  const dataNivo = [
    {
      "חודש" : hebrew ? "january": "ינואר",
      "משתנות": Math.round(januarSupplierChangeableOutcomex),
      "קבועות": Math.round(januarSupplierPermanentOutcomex),
      "סחורה": Math.round(januarSupplierWaresOutcomex),
      "משכורת": januarSalariesx
    },
    {
      "חודש" : hebrew ? "feb" : "'פבר",
      "משתנות": Math.round(februarySupplierChangeableOutcomex),
      "קבועות": Math.round(februarySupplierPermanentOutcomex),
      "סחורה": Math.round(februarySupplierWaresOutcomex),
      "משכורת": februarySalariesx
    },
    {
      "חודש" : hebrew ? "march" : "מרץ",
      "משתנות": Math.round(marchSupplierChangeableOutcomex),
      "קבועות": Math.round(marchSupplierPermanentOutcomex),
      "סחורה": Math.round(marchSupplierWaresOutcomex),
      "משכורת": marchSalariesx
    },
    {
      "חודש" : hebrew ? "april" : "אפריל",
      "משתנות": Math.round(aprilSupplierChangeableOutcomex),
      "קבועות": Math.round(aprilSupplierPermanentOutcomex),
      "סחורה": Math.round(aprilSupplierWaresOutcomex),
      "משכורת": aprilSalariesx
    },
    {
      "חודש" : hebrew ? "may" : "מאי",
      "משתנות": Math.round(maySupplierChangeableOutcomex),
      "קבועות": Math.round(maySupplierPermanentOutcomex),
      "סחורה": Math.round(maySupplierWaresOutcomex),
      "משכורת": maySalariesx
    },
    {
      "חודש" :  hebrew ? "june" : "יוני",
      "משתנות": Math.round(juneSupplierChangeableOutcomex),
      "קבועות": Math.round(juneSupplierPermanentOutcomex),
      "סחורה": Math.round(juneSupplierWaresOutcomex),
      "משכורת": juneSalariesx
    },
    {
      "חודש" : hebrew ? "july" : "יולי",
      "משתנות": Math.round(julySupplierChangeableOutcomex),
      "קבועות": Math.round(julySupplierPermanentOutcomex),
      "סחורה": Math.round(julySupplierWaresOutcomex),
      "משכורת": julySalariesx
    },
    {
      "חודש" : hebrew ? "august" : "'אוג",
      "משתנות": Math.round(augustSupplierChangeableOutcomex),
      "קבועות": Math.round(augustSupplierPermanentOutcomex),
      "סחורה": Math.round(augustSupplierWaresOutcomex),
      "משכורת": augustSalariesx
    },{
      "חודש" : hebrew ? "sep" : "'ספט",
      "משתנות": Math.round(septemberSupplierChangeableOutcomex),
      "קבועות": Math.round(septemberSupplierPermanentOutcomex),
      "סחורה": Math.round(septemberSupplierWaresOutcomex),
      "משכורת": septemberSalariesx
    }
    ,{
      "חודש" : hebrew ? "oct" : "'אוק",
      "משתנות": Math.round(octoberSupplierChangeableOutcomex),
      "קבועות": Math.round(octoberSupplierPermanentOutcomex),
      "סחורה": Math.round(octoberSupplierWaresOutcomex),
      "משכורת": octoberSalariesx
    },
    {
      "חודש" : hebrew ? "nov" : "'נוב",
      "משתנות": Math.round(novemberSupplierChangeableOutcomex),
      "קבועות": Math.round(novemberSupplierPermanentOutcomex),
      "סחורה": Math.round(novemberSupplierWaresOutcomex),
      "משכורת": novemberSalariesx
    },
    {
      "חודש" : hebrew ? "dec" : "'דצמ",
      "משתנות": Math.round(decemberSupplierChangeableOutcomex),
      "קבועות": Math.round(decemberSupplierPermanentOutcomex),
      "סחורה": Math.round(decemberSupplierWaresOutcomex),
      "משכורת": decemberSalariesx
    }

  ]


  const dataNivo2 = [
    {
      "חודש" : 1,
      "משתנות": Math.round(januarSupplierChangeableOutcomex),
      "קבועות": Math.round(januarSupplierPermanentOutcomex),
      "סחורה": Math.round(januarSupplierWaresOutcomex),
      "משכורת": januarSalariesx
    },
    {
      "חודש" : 2,
      "משתנות": Math.round(februarySupplierChangeableOutcomex),
      "קבועות": Math.round(februarySupplierPermanentOutcomex),
      "סחורה": Math.round(februarySupplierWaresOutcomex),
      "משכורת": februarySalariesx
    },
    {
      "חודש" : 3,
      "משתנות": Math.round(marchSupplierChangeableOutcomex),
      "קבועות": Math.round(marchSupplierPermanentOutcomex),
      "סחורה": Math.round(marchSupplierWaresOutcomex),
      "משכורת": marchSalariesx
    },
    {
      "חודש" : 4,
      "משתנות": Math.round(aprilSupplierChangeableOutcomex),
      "קבועות": Math.round(aprilSupplierPermanentOutcomex),
      "סחורה": Math.round(aprilSupplierWaresOutcomex),
      "משכורת": aprilSalariesx
    },
    {
      "חודש" : 5,
      "משתנות": Math.round(maySupplierChangeableOutcomex),
      "קבועות": Math.round(maySupplierPermanentOutcomex),
      "סחורה": Math.round(maySupplierWaresOutcomex),
      "משכורת": maySalariesx
    },
    {
      "חודש" : 6,
      "משתנות": Math.round(juneSupplierChangeableOutcomex),
      "קבועות": Math.round(juneSupplierPermanentOutcomex),
      "סחורה": Math.round(juneSupplierWaresOutcomex),
      "משכורת": juneSalariesx
    },
    {
      "חודש" : 7,
      "משתנות": Math.round(julySupplierChangeableOutcomex),
      "קבועות": Math.round(julySupplierPermanentOutcomex),
      "סחורה": Math.round(julySupplierWaresOutcomex),
      "משכורת": julySalariesx
    },
    {
      "חודש" : 8,
      "משתנות": Math.round(augustSupplierChangeableOutcomex),
      "קבועות": Math.round(augustSupplierPermanentOutcomex),
      "סחורה": Math.round(augustSupplierWaresOutcomex),
      "משכורת": augustSalariesx
    },{
      "חודש" : 9,
      "משתנות": Math.round(septemberSupplierChangeableOutcomex),
      "קבועות": Math.round(septemberSupplierPermanentOutcomex),
      "סחורה": Math.round(septemberSupplierWaresOutcomex),
      "משכורת": septemberSalariesx
    }
    ,{
      "חודש" : 10,
      "משתנות": Math.round(octoberSupplierChangeableOutcomex),
      "קבועות": Math.round(octoberSupplierPermanentOutcomex),
      "סחורה": Math.round(octoberSupplierWaresOutcomex),
      "משכורת": octoberSalariesx
    },
    {
      "חודש" : 11,
      "משתנות": Math.round(novemberSupplierChangeableOutcomex),
      "קבועות": Math.round(novemberSupplierPermanentOutcomex),
      "סחורה": Math.round(novemberSupplierWaresOutcomex),
      "משכורת": novemberSalariesx
    },
    {
      "חודש" : 12,
      "משתנות": Math.round(decemberSupplierChangeableOutcomex),
      "קבועות": Math.round(decemberSupplierPermanentOutcomex),
      "סחורה": Math.round(decemberSupplierWaresOutcomex),
      "משכורת": decemberSalariesx
    }

  ]


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
 


   
    const getMonthInHebrew2 = (e) => {
      let month = "";
        switch (e) {
          case 1:
              month = "ינואר"
            break;
            case 2:
              month = "פברואר"
              break;
              case 3:
                  month = "מרץ"
                break;
                case 4:
                  month = "אפריל"
                  break;
                  case 5:
                      month = "מאי"
                  break;
                  case 6:
                      month = "יוני"
                  break;
                  case 7:
                    month = "יולי"
                  break;
                  case 8:
                      month = "אוגוסט"
                  break;
                  case 9:
                      month = "ספטמבר"
                  break;
                  case 10:
                    month = "אוקטובר"
                  break;
                  case 11:
                      month = "נובמבר"
                  break;
                  case 12:
                      month = "דצמבר"
                  break;
          // default:
          //   month = new Date().getMonth().toLocaleString()
          //   break;
        }
        // setMonthNumber(monthNum)
        return month;
      //   return monthNum;
    }
    
    const getMonthInEnglish = (e) => {
      let month = "";
        switch (e) {
          case 1:
              month = "january"
            break;
            case 2:
              month = "february"
              break;
              case 3:
                  month = "march"
                break;
                case 4:
                  month = "april"
                  break;
                  case 5:
                      month = "may"
                  break;
                  case 6:
                      month = "june"
                  break;
                  case 7:
                    month = "july"
                  break;
                  case 8:
                      month = "august"
                  break;
                  case 9:
                      month = "september"
                  break;
                  case 10:
                    month = "october"
                  break;
                  case 11:
                      month = "november"
                  break;
                  case 12:
                      month = "december"
                  break;
          // default:
          //   month = new Date().getMonth().toLocaleString()
          //   break;
        }
        // setMonthNumber(monthNum)
        return month;
      //   return monthNum;
    }
       
      
       
    const handleCloses = () => {
      setOpenx(false)
    }


const generatePdf = () => {
  setSpin(true)
  const input = document.getElementById("xxx")
  html2canvas(input, { allowTaint: true,  useCORS: true, scale: 4,}).then(canvas => {
    var doc = new jsPDF({ 
        orientation: 'landscape', 
        unit: 'mm', 
        format: 'a4', 
        compress: true, 
        quality: 4 // set the quality to 1 (highest)
      });
      var imgData = canvas.toDataURL("image/png");
      const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const widthRatio = pageWidth / canvas.width;
    const heightRatio = pageHeight / canvas.height;
    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

    const canvasWidth = canvas.width * ratio;
    const canvasHeight = canvas.height * ratio;

    const marginX = (pageWidth - canvasWidth) / 2;
    const marginY = (pageHeight - canvasHeight) / 2;
    // const imgWidth = 210;
    // const imgHeight = canvas.height * imgWidth / canvas.width
    // var imgData = canvas.toDataURL("image/png");
    // doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    doc.addImage(imgData, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
    doc.save("hebrew.pdf");
    setSpin(false)
    setPrint(false)

  })
}

const generatePdf5 = () => {
  setSpin(true)
  const input = document.getElementById("aaa")
  html2canvas(input, { allowTaint: true,  useCORS: true, scale: 4,}).then(canvas => {
    var doc = new jsPDF({ 
        orientation: 'landscape', 
        unit: 'mm', 
        format: 'a4', 
        compress: true, 
        quality: 4 // set the quality to 1 (highest)
      });
      var imgData = canvas.toDataURL("image/png");
      const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const widthRatio = pageWidth / canvas.width;
    const heightRatio = pageHeight / canvas.height;
    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

    const canvasWidth = canvas.width * ratio;
    const canvasHeight = canvas.height * ratio;

    const marginX = (pageWidth - canvasWidth) / 2;
    const marginY = (pageHeight - canvasHeight) / 2;
    // const imgWidth = 210;
    // const imgHeight = canvas.height * imgWidth / canvas.width
    // var imgData = canvas.toDataURL("image/png");
    // doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    doc.addImage(imgData, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
    doc.save("hebrew.pdf");
    setSpin(false)
    setPrint(false)

  })
}

const generatePdf1 = () => {
  const input = document.getElementById("income")
  html2canvas(input, { allowTaint: true,  useCORS: true, scrollY: -window.scrollY, scale: 4,}).then(canvas => {
    var doc = new jsPDF({ 
        orientation: 'landscape', 
        unit: 'mm', 
        format: 'a4', 
        compress: true, 
        quality: 4 // set the quality to 1 (highest)
      });
       var imgData = canvas.toDataURL("image/png");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const widthRatio = pageWidth / canvas.width;
    const heightRatio = pageHeight / canvas.height;
    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

    const canvasWidth = canvas.width * ratio;
    const canvasHeight = canvas.height * ratio;

    const marginX = (pageWidth - canvasWidth) / 2;
    const marginY = (pageHeight - canvasHeight) / 2;
    doc.addImage(imgData, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
    // const imgWidth = 210;
    // const imgHeight = canvas.height * imgWidth / canvas.width
    // var imgData = canvas.toDataURL("image/png");
    // doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    doc.save("hebrew.pdf");

  })
}



const handleIncomeMonths = (e) => {
  setIncomeMonth(e.target.value)
  getMonthInHebrew5(e.target.value)
}

const getMonthInHebrew5 = (e) => {
  let monthNum = 0;
    switch (e) {
      case "ינואר":
          monthNum = 1
        break;
        case "פברואר":
          monthNum = 2
          break;
          case "מרץ":
              monthNum = 3
            break;
            case "אפריל":
              monthNum = 4
              break;
              case "מאי":
                  monthNum = 5
              break;
              case "יוני":
                  monthNum = 6
              break;
              case "יולי":
                monthNum = 7
              break;
              case "אוגוסט":
                  monthNum = 8
              break;
              case "ספטמבר":
                  monthNum = 9
              break;
              case "אוקטובר":
                monthNum = 10
              break;
              case "נובמבר":
                  monthNum = 11
              break;
              case "דצמבר":
                  monthNum = 12
              break;
      // default:
      //   month = new Date().getMonth().toLocaleString()
      //   break;
    }
    setMonthNumber(monthNum)
  //   return monthNum;
}

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
    "name": currentYear + "-" + currentMonth + "-" + 31,
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

const handleIncomeYears2 = (e) => {
  setIncomeYear(e.target.value)
  // setTimeout(()=> {
  //   refetchAll2()
  // }, 400)
}

const handleIncomeYears = (e) => {
  setIncomeCurrentYear(e.target.value)
  setTimeout(()=> {
    www()
    sss()
    rrr()
    ppp()
    fff()
    ttt()
  }, 400)
}

const getTask = (id) => {
  axios.get("https://nartina.com/api/user/worker-task/" + id)
  .then(res => setWorkerTask(res.data))
  .catch(err => console.log(err.response.data))
  setDialog(true)
}

const handleMainChart = (e) => {
  if(e.target.value) {
    mmm()
  }
  setMainChart(e.target.value)
  
}

const openIncome = () => {
  // refetchAll2()
  vvv()
  setTimeout(()=> {
    setIncomeFlag(true)
  }, 500)
  setTimeout(()=> {
    setIsSSREx(false)
  }, 1200)
}

const openWares = () => {
  // refetchAll2()
  nnn()
  setTimeout(()=> {
    setWaresFlag(true)
  }, 500)
  setTimeout(()=> {
    setIsSSREx(false)
  }, 1200)
}

const openOutcome = () => {
  // refetchAll2()
  mmm()
  setTimeout(()=> {
    setAllOutcomeFlag(true)
  }, 500)
  setTimeout(()=> {
    setIsSSREx(false)
  }, 1200)
}

const openIncome2 = () => {
  // refetchAll2()
  vvv()
  setTimeout(()=> {
    setIncomeFlag(true)
  }, 500)
  setTimeout(()=> {
    setIsSSREx(false)
  }, 1200)
}

const getMonthIncome = (e) => {
  e.preventDefault();
  if(incomeFlag) {
    vvv()
  }
  if(waresFlag) {
    nnn()
  }
  if(allOutcomeFlag) {
    mmm()
  }
  // setIsSSREx(true)
  // refetchAll2()
  setTimeout(()=> {
    setDateFlag(false)
    // setIsSSREx(false)
  }, 500)
 
}

const getMonthWares = (e) => {
  e.preventDefault();
  nnn()
  // setIsSSREx(true)
  // refetchAll2()
  setTimeout(()=> {
    setDateFlag(false)
    // setIsSSREx(false)
  }, 500)
 
}

const getMonthOutcome = (e) => {
  e.preventDefault();
  mmm()
  // setIsSSREx(true)
  // refetchAll2()
  setTimeout(()=> {
    setDateFlag(false)
    // setIsSSREx(false)
  }, 500)
 
}

const closeDialog = () => {
  setWorkerTask("")
  setDialog(false)
}

const closeIncomeDialog = () => {
  setIncomeMonth("")
  setIncomeYear("")
  setMonthNumber(0)
  setIncomeFlag(false)
  setWaresFlag(false)
  setAllOutcomeFlag(false)
}

const handleChartMode = () => {
  setChartMode(!chartMode)
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



  return (
    <>
  <SideBarPage/>
    <div className={`w-full mx-auto ${globalTheme != "light" ? "bg-gray-600" : (space ? 'bg-gray-400' : 'bg-white')}` }>
      <div className="max-w-[1880px] mx-auto">
      <div className={`grid md:grid-cols-4 xr:grid-cols-2 xr:gap-3 ${hebrew ? "airx:ml-[183px]" : "airx:mr-[183px]"} py-3 px-[14px]`}>
      {hebrew ? (
        <>
      <TopBox title={`${hebrew ? "income" : "הכנסות"}`} amount={monthlyIncomeToString} bgIcon="bg-green-100" bgCOlor={`${globalTheme == "light" ? 'bg-black' : "background-dark"}`} borderTColor={`${globalTheme == "light" ? "border-t-sky-800" : "border-t-white"}`} link="View income" icon={MonetizationOnIcon} color={`${globalTheme != "light" ? "text-blue-500" : "text-[#005792]"}`} onClick2={()=> navigate('/month-daily-income')} onClick={openIncome2}/>
      <TopBox title={`${hebrew ? "commodity" : "סחורה"}`} amount={monthlyWaresOutcomeToString} bgIcon="bg-purple-200" bgCOlor={`${globalTheme == "light" ? 'bg-black' : "background-dark"}`} borderTColor={`${globalTheme == "light" ? "border-t-sky-800" : "border-t-white"}`} link="View details" icon={ShoppingCartCheckoutIcon} color={`${globalTheme != "light" ? "text-blue-500" : "text-[#005792]"}`} onClick={openWares} onClick2={()=> navigate('/month-wares-invoices')}/>
      <TopBox title={`${hebrew ? "outcome" : "הוצאות"}`}  amount={monthlyTotalOutcomeToString} bgIcon="bg-red-200" bgCOlor={`${globalTheme == "light" ? 'bg-black' : "background-dark"}`} borderTColor={`${globalTheme == "light" ? "border-t-sky-800" : "border-t-white"}`} link="View details" icon={CreditScoreIcon} color={`${globalTheme != "light" ? "text-blue-500" : "text-[#005792]"}`} onClick={openOutcome} onClick2={()=> navigate('/month-invoices')}/>
      <TopBox title={`${hebrew ? "Balance" : "מאזן"}`}  flag={isSSRE} amount={balanceToString} bgIcon="bg-blue-100" bgCOlor={`${globalTheme == "light" ? 'bg-black' : "background-dark"}`} borderTColor={`${globalTheme == "light" ? "border-t-sky-800" : "border-t-white"}`} link="Balance" icon={CurrencyExchangeIcon} color={`${globalTheme != "light" ? "text-blue-500" : "text-[#005792]"}`}/>

        </>
      ) : (
        <>
      <TopBox title={`${hebrew ? "Balance" : "מאזן"}`} flag={isSSRE} amount={balanceToString} bgIcon="bg-blue-100" bgCOlor={`${globalTheme == "light" ? 'bg-black' : "background-dark"}`} borderTColor={`${globalTheme == "light" ? "border-t-[#0369a1]" : "border-t-white"}`} link="Balance" icon={CurrencyExchangeIcon} color={`${globalTheme != "light" ? "text-blue-500" : "text-[#005792]"}`}/>
      <TopBox title={`${hebrew ? "outcome" : "הוצאות"}`}  amount={monthlyTotalOutcomeToString} bgIcon="bg-red-200" bgCOlor={`${globalTheme == "light" ? 'bg-black' : "background-dark"}`} borderTColor={`${globalTheme == "light" ? "border-t-[#0369a1]" : "border-t-white"}`} link="View details" icon={CreditScoreIcon} color={`${globalTheme != "light" ? "text-blue-500" : "text-[#005792]"}`} onClick2={()=> navigate('/month-invoices')} onClick={openOutcome}/>
      <TopBox title={`${hebrew ? "commodities" : "סחורה"}`} amount={monthlyWaresOutcomeToString} bgIcon="bg-purple-200" bgCOlor={`${globalTheme == "light" ? 'bg-black' : "background-dark"}`} borderTColor={`${globalTheme == "light" ? "border-t-sky-700" : "border-t-white"}`} link="View details" icon={ShoppingCartCheckoutIcon} color={`${globalTheme != "light" ? "text-blue-500" : "text-[#005792]"}`} onClick={openWares} onClick2={()=> navigate('/month-wares-invoices')}/>
      <TopBox title={`${hebrew ? "income" : "הכנסות"}`} amount={monthlyIncomeToString} bgIcon="bg-green-100" bgCOlor={`${globalTheme == "light" ? 'bg-black' : "background-dark"}`} borderTColor={`${globalTheme == "light" ? "border-t-[#0369a1]" : "border-t-white"}`} link="View income" icon={MonetizationOnIcon} color={`${globalTheme != "light" ? "text-blue-500" : "text-[#005792]"}`} onClick2={()=> navigate('/month-daily-income')} onClick={openIncome}/>

        </>
      )}
  </div>
  
  <div className={`block xrc:hidden xzz:max-w-[335px] xss:max-w-[340px] xsss:max-w-[345px] etc:max-w-[355px] xs:max-w-[375px] h-[460px] shadow-md rounded-md ${globalTheme == "light" ? "" : "border-white blue-glassmorphism border-[3px]"} p-4 mx-auto`}>
            <div className="flex justify-around mt-[2px]">
              <div className="flex flex-col items-center space-y-2">
              <h1 className={`font-mono ${globalTheme == "light" ? "text-[#333333] font-semibold" : "text-white"} text-md`}>
                  רווח תפעולי
                </h1>
                {!(isFinite(tifuliProfit?.toFixed(2) * 100)) ? (
                  <CircularProgress color="primary" size={65}/>
                ) : (
                  <div className="w-[115px] h-[115px]">
                  <CircularProgressbar
                    value={isFinite(tifuliProfit?.toFixed(2) * 100) ? tifuliProfit?.toFixed(2) * 100 : 0}
                    text={`${isFinite(Math.round(tifuliProfit?.toFixed(2) * 100)) ? Math.round(tifuliProfit?.toFixed(2) * 100) : 0}%`}
                    strokeWidth={9}
          
                  />
                </div>
                )}
              </div>
              <div className="flex flex-col items-center space-y-2">
                <h1 className={`font-mono ${globalTheme == "light" ? "text-[#333333] font-semibold" : "text-white"} text-md`}>
                  רווח גולמי
                </h1>
                {!(isFinite(golmiProfit?.toFixed(2) * 100)) ? (
                  <CircularProgress color="primary" size={65}/>
                ) : (
                  <div className="w-[115px] h-[115px]">
                  <CircularProgressbar
                     value={isFinite(golmiProfit?.toFixed(2) * 100) ? golmiProfit?.toFixed(2) * 100 : 0}
                     text={`${isFinite(Math.round(golmiProfit?.toFixed(2) * 100)) ? Math.round(golmiProfit?.toFixed(2) * 100) : 0}%`}
                    strokeWidth={9}
                  />
                </div>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-3">
              <h1 className={`text-xs text-center ${globalTheme == "light" ? "text-gray-800" : "text-white"} font-mono md:text-sm md:mt-1`}>
                נתוני הרווח לחודש{" "}
                <span className="text-blue-500 font-mono font-semibold">
                {month}
                </span>{" "}
               
                והם משתנים בזמן אמת בהתאם לחומר שהוזן למערכת נכון להיום
              </h1>
              <div className="flex justify-center items-center space-x-1 relative top-1">
              <h1 className={`font-mono text-xs ${globalTheme == "light" ? "text-gray-800" : "text-white"}`}>ש"ח</h1>
              {!vat ? <CircularProgress size={15} /> : <h1 className="text-sm font-mono text-red-600">{vat}</h1>}
              <h1 className="font-mono text-blue-500"><strong>{month}</strong></h1>
              <h1 className={`flex justify-end font-mono ${globalTheme == "light" ? "text-gray-800" : "text-white"} text-md`}>מע"מ לתשלום</h1>
              
              </div>
              
                <div className="flex items-center justify-center h-[403px] w-[300px] relative bottom-[88px] left-3 mt-4">
                  <NivoPaiHome theme={globalTheme} permanent={currentMonthPermanentOutcome} income={currentMonthTaxInvoicesIsTazrim?.data + currentMonthDailyIncome?.data + currentMonthRestaurantAmount?.data} changeable={currentMonthChangeableOutcome} salaries={currentMonthSallries?.data} stock={currentMonthWaresOutcome}/>
                </div>
            </div>
          </div>
  
    <div className={`flex ${hebrew ? "airx:ml-[180px]" : "airx:mr-[180px]"} justify-between space-x-2 px-[11px] py-[8px]`}>
      {!isSSR && (
        <>

      <>
      <div className={`hidden xrc:block ml-1 pt-3 xrc:w-[280px] h-[404px] 2xl:w-[450px] 2xl:h-[440px] shadow-lg border-[1px] mmu:border-[#ccc] rounded-md ${globalTheme == "light" ? space && 'blue-glassmorphism border-[1px] border-white' : "border-white border-[4px] blue-glassmorphism pt-2 2xl:px-1"}`}>
            <div className="flex justify-around mt-[2px]">
              <div className="flex flex-col items-center space-y-2">
              <h1 className={`font-mono ${globalTheme != "light" || space ? 'text-white' : "text-gray-800 font-semibold"} ${hebrew ? "text-sm" : "text-md"} 2xl:text-lg`}>
                  {`${hebrew ? "operating" : "רווח תפעולי"}`}
                </h1>
                {!(isFinite(tifuliProfit?.toFixed(2) * 100)) ? (
                  <CircularProgress color="primary" size={65}/>
                ) : (
                  <div className="w-24 h-24 2xl:w-28 2xl:h-28">
                  <CircularProgressbar
                    value={isFinite(tifuliProfit?.toFixed(2) * 100) ? tifuliProfit?.toFixed(2) * 100 : 0}
                    text={`${isFinite(Math.round(tifuliProfit?.toFixed(2) * 100)) ? Math.round(tifuliProfit?.toFixed(2) * 100) : 0}%`}
                    strokeWidth={windowWidth > 1500 ? 9 : 8}
          
                  />
                </div>
                 )}
              </div>
              <div className="flex flex-col items-center space-y-2">
                <h1 className={`font-mono ${globalTheme != "light" || space ? 'text-white' : "text-gray-800 font-semibold"} ${hebrew ? "text-sm" : "text-md"} 2xl:text-lg`}>
                  {`${hebrew ? "gross" : "רווח גולמי"}`}
                </h1>
                {!(isFinite(golmiProfit?.toFixed(2) * 100)) ? (
                  <CircularProgress color="primary" size={65}/>
                ) : (
                  <div className="w-24 h-24 2xl:w-28 2xl:h-28">
                  
                  <CircularProgressbar
                     value={isFinite(golmiProfit?.toFixed(2) * 100) ? golmiProfit?.toFixed(2) * 100 : 0}
                     text={`${isFinite(Math.round(golmiProfit?.toFixed(2) * 100)) ? Math.round(golmiProfit?.toFixed(2) * 100) : 0}%`}
                     strokeWidth={windowWidth > 1500 ? 9 : 8}
                  />
                </div>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className={`text-sm text-center ${globalTheme == "light" ? (space ? 'text-white' : 'text-gray-800') : "text-white"} font-mono md:mt-1`}>
                נתוני הרווח לחודש{" "}
                <span className="text-blue-500 font-mono font-semibold">
                  {month}
                </span>{" "}
                והם משתנים בזמן אמת בהתאם לחומר שהוזן למערכת נכון להיום
              </h1>
              <div className="flex justify-center items-center space-x-1 relative top-1">
              <h1 className={`font-mono text-sm ${globalTheme == "light" ? (space ? 'text-white' : 'text-gray-800') : "text-white"}`}>₪</h1>
              {!vat ? <CircularProgress size={15} /> : <h1 className="text-sm font-mono text-red-600">{vat}</h1>}
              <h1 className="font-mono text-blue-500"><strong>{month}</strong></h1>
              <h1 className={`flex justify-end font-mono ${globalTheme == "light" ? (space ? 'text-white' : 'text-gray-800') : "text-white"} text-md`}>מע"מ לתשלום</h1>
              </div>
              
              <div className={`flex items-center justify-center h-[390px] w-[285px] 2xl:h-[350px] 2xl:w-[285px] relative bottom-[92px] ${globalTheme == "light" ? "right-2" : "right-1"}  2xl:-right-5 2xl:bottom-[64px]`}>
                 <NivoPaiHome theme={globalTheme} space={space} permanent={currentMonthPermanentOutcome} income={currentMonthTaxInvoicesIsTazrim?.data + currentMonthDailyIncome?.data + currentMonthRestaurantAmount?.data} changeable={currentMonthChangeableOutcome} salaries={currentMonthSallries?.data} stock={currentMonthWaresOutcome}/>
              </div>
              </div>
          </div>
      </>

      <div className="w-full hidden mmu:block">
         <UnderTopCharts />
      </div>
      
            <div className="flex mmu:hidden flex-col space-y-2 w-full max-w-[1880px] mx-auto mt-4 mmu:mt-0 -mb-1">
            <div className={`grid grid-cols-1 ${globalTheme == "light" ? "rounded-md" : ""} `}>
            <div className={`flex flex-col justify-center ${globalTheme != "light" ? "h-[397px] 2xl:h-[430px]" : "h-[404px] 2xl:h-[439px]"} w-full items-center text-center ${!dashMode && 'mmu:border-[1px] mmu:border-[#ccc]'} ${globalTheme != "light" ? "border-white" : "bg-white"} w-full h-full shadow-md rounded-md `} >
            <div className="flex items-center space-x-[2px] self-end relative top-2 right-2">
            <ScoreIcon onClick={()=> setChart2(!chart2)} className={` ${globalTheme == "light" ? "text-sky-700" : "text-blue-600"} cursor-pointer hover:scale-110 hover:text-sky-600 transition-all duration-150 ease-out`}/>
              <Switch size='small' 
               checked={area}
               onChange={()=> setArea(!area)}
               />
           {globalTheme == "light" ? (
             <Select onChange={handleMainChart} style={{ color: '#333', fontSize: '12px', textAlign: 'center', paddingTop: '10px', paddingBottom: '10px', backgroundColor: 'white', border: '1px solid white'}} defaultValue="שנתי" className='bg-white text-xs shadow-xl rounded-md text-center w-[80px] h-4'>
             {charts.map(a => (
                 <MenuItem value={a}>{a}</MenuItem>
             ))}
                     </Select> 
           ) : (
            <Select onChange={handleMainChart} style={{ color: 'white', fontSize: '12px', textAlign: 'center', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#475569', border: '1px solid white'}} defaultValue="שנתי" className='bg-white text-xs shadow-xl rounded-md text-center w-[80px] h-4'>
            {charts.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select> 
           )}
            </div>
           {mainChart == "חודשי" ? (
             <MainNivoLine3 arr={demo} arrx={demo2}/>
           ) : (
            <MainNivoLineMobile arr={mainChart  == "שנתי" ? data : mainChart  == "גולמי" ? data3 : data} width={windowWidth} year={incomeCurrentYear}/>
           )}
            </div>
            </div>
            </div>
        </>
      )}
    </div>
   {!dashMode && (
    <div className={`w-full px-2 block mmu:hidden`}>
      <UnderTopCharts />
    </div>
   )}
    <UnderTopBoxes />
              
            <div className={`hidden mmu:flex flex-col w-full max-w-[1880px] mx-auto px-3 mt-8 mmu:mt-0 -mb-1`}>
            <div className={`grid grid-cols-1 ${hebrew ? "airx:ml-[185px]" : "airx:mr-[185px]"} ${globalTheme == "light" ? "rounded-md" : "border-[4px] border-white blue-glassmorphism"} `}>
            <div className={`flex flex-col justify-center ${globalTheme != "light" ? "h-[397px] 2xl:h-[430px]" : "h-[404px] 2xl:h-[439px]"} w-full items-center text-center mmu:border-[1px] mmu:border-gray-[#ccc] ${globalTheme != "light" ? "border-white" : space ? "bg-black bg-opacity-20" : "bg-white"} w-full h-full shadow-sm rounded-md `} >
            <div className="flex items-center space-x-[2px] self-end relative top-2 right-8">
           <div className="flex items-center justify-center space-x-1">
              <AddchartIcon onClick={()=> setArea(!area)} className={` ${globalTheme == "light" ? "text-sky-700" : "text-blue-600"} cursor-pointer hover:scale-110 hover:text-sky-600 transition-all duration-150 ease-out`}/>
              <ScoreIcon onClick={()=> setChart2(!chart2)} className={` ${globalTheme == "light" ? "text-sky-700" : "text-blue-600"} cursor-pointer hover:scale-110 hover:text-sky-600 transition-all duration-150 ease-out`}/>
           </div>
             
            <ScoreIcon onClick={()=> setChart(!chart)} className={` ${globalTheme == "light" ? "text-sky-700" : "text-blue-600"} cursor-pointer hover:scale-110 hover:text-sky-600 transition-all duration-150 ease-out`}/>
           <LocalPrintshopIcon className={` ${globalTheme == "light" ? "text-sky-700" : "text-blue-600"} cursor-pointer hover:scale-110 hover:text-sky-600 transition-all duration-150 ease-out`} onClick={()=> (setPrint(true))}/>
             {globalTheme != "light" || space ? (
             <Select onChange={handleMainChart} style={{ color: 'white', fontSize: '12px', textAlign: 'center', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#0369a1', border: '1px solid white'}} defaultValue="שנתי" className='bg-white text-xs shadow-xl rounded-md text-center w-[80px] h-4'>
             {charts.map(a => (
                 <MenuItem value={a}>{a}</MenuItem>
             ))}
               </Select> 
           ) : (
            <Select onChange={handleMainChart} style={{ color: '#333', fontSize: '12px', textAlign: 'center', paddingTop: '10px', paddingBottom: '10px', border: '1px solid white'}} defaultValue="שנתי" className="text-xs shadow-xl rounded-md text-center w-[80px] h-4">
            {charts.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select> 
           
           )}

            </div>
            <div id="xxx" className="h-full w-full">
           {mainChart == "חודשי" ? (
             <MainNivoLine3 arr={demo} arrx={demo2}/>
           ) : (
            <MainNivoLine arr={mainChart  == "שנתי" ? data : mainChart  == "גולמי" ? data3 : data} width={windowWidth} year={incomeCurrentYear}/>
           )}
            </div>
            </div>
            </div>
            </div>
   
    <div>
    <div className={`w-[99%] md:[78%] lg:w-[99%] air:w-[99%] airx:w-[85%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%] ${hebrew ? "airx:ml-[185px]" : "ml-[6px]"} px-2 overflow-y-scroll scrollbar max-h-[400px] mt-16 `} > 
   
    <div className="pr-1"> 
        
         <table className="min-w-full divide-y border-separate border-spacing-y-1 table-auto divide-gray-200 border-[#ccc] border-b-2">
          <thead className="blue-glassmorphism sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">משימה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מחק</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">ערוך</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הודעה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מייל</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הסתיים</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">יעד סיום</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">דחיפות</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סטטוס</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך משימה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם עובד</th>
            </tr>
          </thead>

            <>
            <tbody className="divide-y divide-gray-200">
            {tasks?.data.map((supplier, index) => (
              <tr key={supplier.id} className={`border ${index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'} hover:bg-sky-200 my-2`}>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> getTask(supplier.id)}>
                <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[12px]'>משימה</h1>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-red-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(true)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(supplier?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-green-300 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(supplier?.id)}>
               <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-purple-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(supplier?.id)}>
               <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-purple-400'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-1 text-xs">
            {supplier?.finished ? <>
         <Android12Switch
          checked={supplier?.finished}
          onChange={()=> setTask(!task)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> setTask(!task)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{supplier.endDate}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
               <td scope="col" className="px-1 text-center text-xs font-semibold font-mono ">
                <div className={`${supplier.priority == "VERY_LOW" ? "bg-red-300" : supplier?.priority == "VERY_HIGH" ? "bg-red-700" : supplier?.priority == "HIGH" ? "bg-red-500" : supplier?.priority == "LOW" ? "bg-red-400" : "bg-gray-400"} py-1 px-[1px] flex items-center justify-center ${supplier.priority == "VERY_HIGH" && 'animate-pulse'} rounded-full text-white`}>
                  <h1 className="text-white font-bold">{supplier.priority}</h1>
                </div>
              </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center text-xs font-semibold font-mono ">
                <div className={`${supplier.status == "END" ? "bg-red-400" : supplier?.status == "START" ? "bg-blue-400" : supplier?.status == "PROCESS"  ? "bg-green-400" : supplier?.status == "PENDING" ? "bg-purple-500" : "bg-gray-400"} py-1 px-2 rounded-md text-white`}>
                  {supplier.status == "START" ? "התחלה" : supplier.status == "PROCESS" ? "בתהליך" : supplier.status == "PENDING" ? "בדיקה" : supplier.status == "END" ? "הסתיים" : "-"}
                </div>
              </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{supplier.startDate}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className={`border-r-[14px] ${supplier.status == "END" ? "border-r-red-400" : supplier?.status == "START" ? "border-r-blue-400" : supplier?.status == "PROCESS" ? "border-r-green-400" : supplier?.status == "PENDING" ? "border-r-purple-500" : "border-r-gray-400"} px-1 text-center py-2 text-sm text-gray-800 hover:text-white font-bold font-mono`}>{supplier.workerName}</td>
              </tr>
            ))}
          </tbody>
            </>
        </table>
        </div>
        </div>
      {isSSR ? (
        <div className="flex items-center justify-center mt-12">
          <LinearProgress />
        </div>
      ) : (
        <>              

        <div id="aaa" className={`hidden ttr:block h-80 mr-0 ${hebrew ? "airx:ml-[180px]" : "airx:mr-[180px]"} mt-10`}>
            
        {isSSR ? (
          <LinearProgress />
        ) : (
          <div className="h-full w-full pb-2">
            {/* <h1 className={`text-center text-2xl md:text-4xl 2xl:text-4xl relative top-2 font-semibold ${hebrew ? "font-mono tracking-wider" : "font-mono"} ${globalTheme == "light" ? "text-gray-700" : "text-white"}`}>{`${hebrew ? "annual outcome table" : "טבלת הוצאות שנתית"}`}</h1> */}
            <NivoBar arr={dataNivo} theme={globalTheme} lang={hebrew}/>
          </div>
        )}
      </div>
      
      <div className="block ttr:hidden h-80 mr-0 air:mr-[180px] mt-10">
      <div className="flex justify-between items-center w-full px-6">
         
          </div>  
          <h1 className={`text-center text-2xl md:text-3xl 2xl:text-4xl font-semibold relative top-8  ${hebrew ? "font-mono tracking-wider" : "font-mono"} ${globalTheme == "light" ? "text-gray-700" : "text-white"}`}>{`${hebrew ? "annual outcome table" : "טבלת הוצאות שנתית"}`}</h1>
        <NivoBar arr={dataNivo2} theme={globalTheme}/>
      </div>
      
        </>
      )}
    
     {/* <h1 className={`text-center font-mono text-4xl font-semibold mt-4 ${globalTheme == "light" ? "text-gray-700" : "text-white"} relative top-12 ${hebrew ? "airx:ml-[185px]" : "airx:mr-[185px] "}`}>{hebrew ? "manage tasks" : "ניהול משימות"}</h1> */}

{/* <div className={`w-[99%] md:[78%] lg:w-[99%] air:w-[99%] airx:w-[85%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%] ${hebrew ? "airx:ml-[185px]" : "ml-[6px]"} px-2 overflow-y-scroll scrollbar max-h-[400px] mt-20 `} > 
<div className="pr-1"> 
         <table className="min-w-full divide-y border-separate border-spacing-y-1 table-auto divide-gray-200 border-[#ccc] border-b-2">
          <thead className="blue-glassmorphism sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">משימה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מחק</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">ערוך</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הודעה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מייל</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הסתיים</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">יעד סיום</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">דחיפות</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סטטוס</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך משימה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם עובד</th>
            </tr>
          </thead>

            <>
            <tbody className="divide-y divide-gray-200">
            {tasks?.data.map((supplier, index) => (
              <tr key={supplier.id} className={`border ${index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'} hover:bg-sky-200 my-2`}>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> getTask(supplier.id)}>
                <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[12px]'>משימה</h1>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-red-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(true)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(supplier?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-green-300 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(supplier?.id)}>
               <WhatsAppIcon className='hover:scale-125 transition-all duration-150 ease-out text-green-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-purple-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(supplier?.id)}>
               <MailIcon className='hover:scale-125 transition-all duration-150 ease-out text-purple-400'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-1 text-xs">
            {supplier?.finished ? <>
         <Android12Switch
          checked={supplier?.finished}
          onChange={()=> setTask(!task)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> setTask(!task)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{supplier.endDate}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
               <td scope="col" className="px-1 text-center text-xs font-semibold font-mono ">
                <div className={`${supplier.priority == "VERY_LOW" ? "bg-red-300" : supplier?.priority == "VERY_HIGH" ? "bg-red-700" : supplier?.priority == "HIGH" ? "bg-red-500" : supplier?.priority == "LOW" ? "bg-red-400" : "bg-gray-400"} py-1 px-[1px] flex items-center justify-center ${supplier.priority == "VERY_HIGH" && 'animate-pulse'} rounded-full text-white`}>
                  <h1 className="text-white font-bold">{supplier.priority}</h1>
                </div>
              </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center text-xs font-semibold font-mono ">
                <div className={`${supplier.status == "END" ? "bg-red-400" : supplier?.status == "START" ? "bg-blue-400" : supplier?.status == "PROCESS"  ? "bg-green-400" : supplier?.status == "PENDING" ? "bg-purple-500" : "bg-gray-400"} py-1 px-2 rounded-md text-white`}>
                  {supplier.status == "START" ? "התחלה" : supplier.status == "PROCESS" ? "בתהליך" : supplier.status == "PENDING" ? "בדיקה" : supplier.status == "END" ? "הסתיים" : "-"}
                </div>
              </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{supplier.startDate}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className={`border-r-[14px] ${supplier.status == "END" ? "border-r-red-400" : supplier?.status == "START" ? "border-r-blue-400" : supplier?.status == "PROCESS" ? "border-r-green-400" : supplier?.status == "PENDING" ? "border-r-purple-500" : "border-r-gray-400"} px-1 text-center py-2 text-sm text-gray-800 hover:text-white font-bold font-mono`}>{supplier.workerName}</td>
              </tr>
            ))}
          </tbody>
            </>
        </table>
        </div>
        </div> */}
    </div>
    

      
    <Snackbar open={open} autoHideDuration={10000} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            !זהירות, מאזן שלילי

          </Alert>
        </Snackbar>
      
       
    <Snackbar open={meeting} autoHideDuration={10000} onClose={handleCloseMeeting} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleCloseMeeting}
          severity="info"
          sx={{ width: "100%" }}
        >
          {hebrew ? (
            <h1>you have {numsOfSchedulers?.data} future appointments</h1>
            
          ) : (
            <h1>יש לך {numsOfSchedulers?.data} פגישות</h1>
            
          )}
        </Alert>
      </Snackbar>
      <Snackbar open={errorMode} autoHideDuration={20000} onClose={handleClose9} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose9}
          severity="error"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
             יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
        </Alert>
      </Snackbar>

      <Snackbar open={openx} autoHideDuration={10000} onClose={handleCloses} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
        <Alert
          onClose={handleCloses}
          severity="error"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            {hebrew ? (
              <h1>you have {urgentTasks} urgent tasks</h1>
            ) : (
              <h1>!יש לך {urgentTasks} משימות דחופות</h1>
            )}
        </Alert>
      </Snackbar>
      <Dialog open={incomeFlag}>
      
         <div className='flex items-center justify-between p-2'>
          <div className="flex items-center justify-center space-x-2">
            <LocalPrintshopIcon onClick={generatePdf1} className='text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600 transition-all duration-150 ease-out'/>
            <CalendarMonthIcon onClick={()=> setDateFlag(true)} className='text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600 transition-all duration-150 ease-out'/>
            <ScoreIcon className="text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600" onClick={()=> setChart(!chart)} />
          </div>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeIncomeDialog}/>
        </div>
      <div id="income" className='w-full items-center justify-center text-center mx-auto scrollbar overflow-x-scroll '>
    
        <div>
        <h1 className={`text-center font-mono ${hebrew ? 'text-slate-600' : 'text-amber-700'} text-3xl`}>{hebrew ? 'daily income report' : 'דו"ח הכנסות יומי'}</h1>
          {hebrew ? (
            <>
           {incomeMonth == "" ? (
             <div className='flex items-center justify-center space-x-2'>
             <h1 className='font-mono text-xl text-[#333333]'>{getMonthInEnglish(new Date().getMonth() + 1)}</h1> 
             <h1 className='font-mono text-xl text-[#333333]'>{new Date().getFullYear()}</h1>
           </div>
           ) : (
            <div className='flex items-center justify-center space-x-2'>
            <h1 className='font-mono text-xl text-[#333333]'>{getMonthInEnglish(monthNumber)}</h1> 
            <h1 className='font-mono text-xl text-[#333333]'>{incomeYear}</h1>
          </div>
           )}
            </>
          ) : (
            <>
            {incomeMonth == "" ? (
              <div className='flex items-center justify-center space-x-2'>
              <h1 className='font-mono text-lg text-[#333333]'>{new Date().getFullYear()}</h1>
              <h1 className='font-mono text-lg text-[#333333]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
          </div>
            ) : (
              <div className='flex items-center justify-center space-x-2'>
                <h1 className='font-mono text-lg text-[#333333]'>{incomeYear}</h1>
                <h1 className='font-mono text-lg text-[#333333]'>{incomeMonth}</h1> 
            </div>
            )}
            </>
          )}
          </div>
      
        {isSSREx ? (
        <div className="flex items-center justify-center p-16">
          <CircularProgress size={"15rem"}/>
        </div> ) : (
          <div className='h-80 w-80 mmu:w-[35rem] mmu:h-96'>
          <NivoLineCustomIncomeDialog arr={demo}/>
        </div>
        )}
        
        <div className='flex items-center justify-center space-x-1 relative bottom-14'>
        </div>
      </div>
    </Dialog>

    <Dialog open={waresFlag}>
      
         <div className='flex items-center justify-between p-2'>
          <div className="flex items-center justify-center space-x-2">
            <LocalPrintshopIcon onClick={generatePdf1} className='text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600 transition-all duration-150 ease-out'/>
            <CalendarMonthIcon onClick={()=> setDateFlag(true)} className='text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600 transition-all duration-150 ease-out'/>
            <ScoreIcon className="text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600" onClick={()=> setChart(!chart)} />
          </div>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeIncomeDialog}/>
        </div>
      <div id="income" className='w-full items-center justify-center text-center mx-auto scrollbar overflow-x-scroll '>
     
        <div>
        <h1 className={`text-center font-mono ${hebrew ? 'text-slate-600' : 'text-amber-700'} text-3xl`}>{hebrew ? 'daily commodity report' : 'דו"ח קניות סחורה יומי'}</h1>
          {hebrew ? (
            <>
           {incomeMonth == "" ? (
             <div className='flex items-center justify-center space-x-2'>
             <h1 className='font-mono text-xl text-[#333333]'>{getMonthInEnglish(new Date().getMonth() + 1)}</h1> 
             <h1 className='font-mono text-xl text-[#333333]'>{new Date().getFullYear()}</h1>
           </div>
           ) : (
            <div className='flex items-center justify-center space-x-2'>
            <h1 className='font-mono text-xl text-[#333333]'>{getMonthInEnglish(monthNumber)}</h1> 
            <h1 className='font-mono text-xl text-[#333333]'>{incomeYear}</h1>
          </div>
           )}
            </>
          ) : (
            <>
            {incomeMonth == "" ? (
              <div className='flex items-center justify-center space-x-2'>
              <h1 className='font-mono text-lg text-[#333333]'>{new Date().getFullYear()}</h1>
              <h1 className='font-mono text-lg text-[#333333]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
          </div>
            ) : (
              <div className='flex items-center justify-center space-x-2'>
                <h1 className='font-mono text-lg text-[#333333]'>{incomeYear}</h1>
                <h1 className='font-mono text-lg text-[#333333]'>{incomeMonth}</h1> 
            </div>
            )}
            </>
          )}
          </div>
       
        {isSSREx ? (
        <div className="flex items-center justify-center p-16">
          <CircularProgress size={"15rem"}/>
        </div> ) : (
          <div className='h-80 w-80 mmu:w-[35rem] mmu:h-96'>
          <NivoLineCustomOutcomeDialog arr={demo3}/>
        </div>
        )}
        
        <div className='flex items-center justify-center space-x-1 relative bottom-14'>
        </div>
      </div>
    </Dialog>

    <Dialog open={allOutcomeFlag}>
       
         <div className='flex items-center justify-between p-2'>
          <div className="flex items-center justify-center space-x-2">
            <LocalPrintshopIcon onClick={generatePdf1} className='text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600 transition-all duration-150 ease-out'/>
            <CalendarMonthIcon onClick={()=> setDateFlag(true)} className='text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600 transition-all duration-150 ease-out'/>
            <ScoreIcon className="text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600" onClick={()=> setChart(!chart)} />
          </div>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeIncomeDialog}/>
        </div>
      <div id="income" className='w-full items-center justify-center text-center mx-auto scrollbar overflow-x-scroll '>
     
        <div>
        <h1 className={`text-center font-mono ${hebrew ? 'text-slate-600' : 'text-amber-700'} text-3xl`}>{hebrew ? 'daily outcome report' : 'דו"ח הוצאות יומי'}</h1>
          {hebrew ? (
            <>
           {incomeMonth == "" ? (
             <div className='flex items-center justify-center space-x-2'>
             <h1 className='font-mono text-xl text-[#333333]'>{getMonthInEnglish(new Date().getMonth() + 1)}</h1> 
             <h1 className='font-mono text-xl text-[#333333]'>{new Date().getFullYear()}</h1>
           </div>
           ) : (
            <div className='flex items-center justify-center space-x-2'>
            <h1 className='font-mono text-xl text-[#333333]'>{getMonthInEnglish(monthNumber)}</h1> 
            <h1 className='font-mono text-xl text-[#333333]'>{incomeYear}</h1>
          </div>
           )}
            </>
          ) : (
            <>
            {incomeMonth == "" ? (
              <div className='flex items-center justify-center space-x-2'>
              <h1 className='font-mono text-lg text-[#333333]'>{new Date().getFullYear()}</h1>
              <h1 className='font-mono text-lg text-[#333333]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
          </div>
            ) : (
              <div className='flex items-center justify-center space-x-2'>
                <h1 className='font-mono text-lg text-[#333333]'>{incomeYear}</h1>
                <h1 className='font-mono text-lg text-[#333333]'>{incomeMonth}</h1> 
            </div>
            )}
            </>
          )}
          </div>
        
        {isSSREx ? (
        <div className="flex items-center justify-center p-16">
          <CircularProgress size={"15rem"}/>
        </div> ) : (
          <div className='h-80 w-80 mmu:w-[35rem] mmu:h-96'>
          <NivoLineCustomOutcomeDialog arr={demo2}/>
        </div>
        )}
        
        <div className='flex items-center justify-center space-x-1 relative bottom-14'>
        </div>
      </div>
    </Dialog>

  
    <Dialog open={dateFlag} >
      
        <div className='flex items-center justify-between p-2'>
          <div></div>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setDateFlag(false)}/>
        </div>
      <div className='w-full flex flex-col space-y-2 items-center justify-center scrollbar overflow-x-scroll pb-4 px-4'>
          <h1 className={`text-center font-mono ${hebrew ? "text-slate-600" : "text-amber-700"} text-3xl`}>{hebrew ? 'select month and a year' : 'בחר חודש ושנה'}</h1>
         
       <form onSubmit={getMonthIncome} className='flex flex-col space-y-2'>
       <div className='flex items-center justify-center space-x-1'>
          <Select onChange={handleIncomeMonths} className='bg-white text-right shadow-xl rounded-md px-2 w-36 h-10'>
            {months.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select> 
        </div>
        <div className='flex items-center justify-center space-x-1'>
          <Select onChange={handleIncomeYears2} className='bg-white text-right shadow-xl rounded-md px-2 w-36 h-10'>
            {years.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select> 
        </div>
        <button type='submit' disabled={incomeMonth == "" || incomeYear == ""} className='bg-blue-200 px-8 py-[3px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg cursor-pointer'>{hebrew ? 'report' : 'הצג דו"ח'}</button>
       </form>
      </div>
    </Dialog>

    <Dialog open={print}>

        <div className={`${spin && 'p-8'} flex flex-col items-center justify-center pb-3 px-2`}>
        <div className={`${spin && 'hidden'} flex self-end pt-1`}>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setPrint(false)}/>
        </div>
        <div className={`${spin && 'p-8'} flex justify-center items-center space-x-3 pt-4 pb-2 px-4`}>
          {spin ? (
            <CircularProgress color="primary" size={90}/>
          ) : (
            <>
          <div className="flex items-center justify-center space-x-1 bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-lg">
            <LocalPrintshopIcon fontSize="small" className="text-sky-700"/>
          <button className='font-mono text-blue-600 hover:text-blue-600 font-semibold' onClick={generatePdf5}>{hebrew ? "outcome chart" : "טבלת הוצאות"}</button>
          </div>
          <div className="flex items-center justify-center space-x-1 bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-lg">
            <LocalPrintshopIcon fontSize="small" className="text-sky-700"/>
            <button className='font-mono text-blue-600 hover:text-blue-600 font-semibold' onClick={generatePdf}>{hebrew ? "main chart" : "טבלה ראשית"}</button>
          </div>
            </>
          )}
        </div>
        </div>
    </Dialog>
    <Dialog open={dialog}>
         <div className="w-80 h-fit flex flex-col items-center justify-center pb-3 px-2 mx-auto" >
        <div className="flex self-end pt-1" >
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeDialog}/>
        </div>
          <div className="flex items-center justify-center">
            <h1 className='text-lg font-mono text-gray-700 text-center'>{workerTask}</h1>
          </div>
        </div>
    </Dialog>
      </div>
      <Footer />
   </div>
   </>
  );
};

export default Dashboard;