import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, TextField } from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import { Select, MenuItem, InputLabel} from '@mui/material'
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PrintIcon from '@mui/icons-material/Print';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useParams, useNavigate } from 'react-router-dom'
import NivoLineCustom from '../components/NivoLineCustom';
import CloseIcon from '@mui/icons-material/Close';
import NivoLineCustom2 from '../components/NivoLineCustom2';
// import Pagination from '@mui/material/Pagination';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import fileDownload from 'js-file-download';
import { ThemeContext } from "../App";
import axios from "axios";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import SwitchThemeYear2 from '../components/SwitchThemeYear2';
import { useQuery } from 'react-query'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
// import Card from '../components/Card';
// import image2 from '../assets/customers2.jpg'
import image2 from '../assets/customers.jpg'




// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});



const CustomerReports = () => {
    const thisYear = new Date().getFullYear()
    const [customer, setCustomer] = useState({})
    const [receipt, setReceipt] = useState({})
    const [isSSRE, setIsSSRE] = useState(true);
    const [isSSR, setIsSSR] = useState(true);
    const [ide, setIde] = useState();
    const [user, setUser] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [receipts, setReceipts] = useState([])
    const [currentMonthTaxInvoicesIsTazrim, setCurrentMonthTaxInvoicesIsTazrim] = useState()
    const [receiptsCurrentMonth, setReceiptsCurrentMonth] = useState([])
    // const [yearState, setYearState] = useState(true);
    const [notPaid, setNotPaid] = useState();
    const [isPaid, setIsPaid] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [open, setIsOpen] = useState(false)
    const [yearTotal, setYearTotal] = useState();
    const [openCancelReceipt, setOpenCancelReceipt] = useState(false)
    const [openReceiptAlert, setOpenReceiptAlert] = useState(false)
    const [openAlertPayment, setOpenAlertPayment] = useState(false)
    const [openInput, setOpenInput] = useState(false)
    const [cashNumber, setCashNumber] = useState("")
    const [incomeALert, setIncomeAlert] = useState(false)
    const [roll, setRoll] = useState(false)
    const [incomeYear, setIncomeYear] = useState(thisYear)
    const [spin, setSpin] = useState(false)


    const { custid } = useParams()

    const [januarAmount, setJanuarAmount] = useState();
    const [februaryAmount, setFebruaryAmount] = useState();
    const [marchAmount, setMarchAmount] = useState();
    const [aprilAmount, setAprilAmount] = useState();
    const [mayAmount, setMayAmount] = useState();
    const [juneAmount, setJuneAmount] = useState();
    const [julyAmount, setJulyAmount] = useState();
    const [augustAmount, setAugustAmount] = useState();
    const [septemberAmount, setSeptemberAmount] = useState();
    const [octoberAmount, setOctoberAmount] = useState();
    const [novemberAmount, setNovemberAmount] = useState();
    const [decemberAmount, setDecemberAmount] = useState();


  const [januarAmountNotPaid, setJanuarAmountNotPaid] = useState();
  const [februaryAmountNotPaid, setFebruaryAmountNotPaid] = useState();
  const [marchAmountNotPaid, setMarchAmountNotPaid] = useState();
  const [aprilAmountNotPaid, setAprilAmountNotPaid] = useState();
  const [mayAmountNotPaid, setMayAmountNotPaid] = useState();
  const [juneAmountNotPaid, setJuneAmountNotPaid] = useState();
  const [julyAmountNotPaid, setJulyAmountNotPaid] = useState();
  const [augustAmountNotPaid, setAugustAmountNotPaid] = useState();
  const [septemberAmountNotPaid, setSeptemberAmountNotPaid] = useState();
  const [octoberAmountNotPaid, setOctoberAmountNotPaid] = useState();
  const [novemberAmountNotPaid, setNovemberAmountNotPaid] = useState();
  const [decemberAmountNotPaid, setDecemberAmountNotPaid] = useState();

    //for upcoming-payment
    const [checkDate, setCheckDate] = useState("")
    const [checkNumber, setCheckNumber] = useState("")
    // const screen = window.screen.availWidth
    // const screenHeight = window.screen.availHeight
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    // const currentYearMinus = new Date().getFullYear() -1;
    const lastYear = new Date().getFullYear() -1
    const lastTwoYear = new Date().getFullYear() -2

  const years = [currentYear, lastYear, lastTwoYear] 

    const navigate = useNavigate()
    const { hebrew, year } = useContext(ThemeContext)

    const arr2 = ["מזומן", "צ'ק", "כרטיס אשראי", "העברה בנקאית", "ביט", "אחר", "-"];

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)


    useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
     
  }, [user?.id])

  useEffect(()=> {
      setTimeout(()=> {
        setRoll(true)
      }, 500)
  }, [roll])

  useEffect(()=> {
    setIncomeAlert(true)
  }, [incomeALert])

  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 300)
    
  }, [isSSR]);

  useEffect(()=> {
    if(isPaid == "שולם"){
      setOpenDialog(true)
    }
  }, [isPaid])

  useEffect(()=> {
    if(isPaid == "לא שולם"){
      updatePaymentMethod2("-")
    }
  }, [isPaid])


  useEffect(() => {
    setTimeout(() => {
      setIsSSRE(false);
    }, 1200)
  }, [isSSRE]);

  const getCustomerAmount = () => {
    // const id = result?.id
    return axios.get(`https://nartina.com/api/user/customer-outcome-by-month-array/${custid}/${incomeYear}`)
  }
  
  const {data: customerAmounts, refetch: yyy} = useQuery('customer-amounts', ()=> getCustomerAmount(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: true,
      refetchOnWindowFocus:false
 
    }) 

    const getCustomerAmountNotPaid = () => {
      // const id = result?.id
      return axios.get(`https://nartina.com/api/user/get-receipts-not-paid-amount-array/${custid}/${incomeYear}`)
    }
    
    const {data: customerAmountsNotPaid, refetch: sss} = useQuery('customer-amounts-not-paid', ()=> getCustomerAmountNotPaid(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: true,
        refetchOnWindowFocus:false
   
      }) 

    useEffect(()=> {
      setJanuarAmount(customerAmounts?.data[0])
      setFebruaryAmount(customerAmounts?.data[1])
      setMarchAmount(customerAmounts?.data[2])
      setAprilAmount(customerAmounts?.data[3])
      setMayAmount(customerAmounts?.data[4])
      setJuneAmount(customerAmounts?.data[5])
      setJulyAmount(customerAmounts?.data[6])
      setAugustAmount(customerAmounts?.data[7])
      setSeptemberAmount(customerAmounts?.data[8])
      setOctoberAmount(customerAmounts?.data[9])
      setNovemberAmount(customerAmounts?.data[10])
      setDecemberAmount(customerAmounts?.data[11])
    },[customerAmounts, incomeYear, setIncomeYear])

    useEffect(()=> {
      setJanuarAmountNotPaid(customerAmountsNotPaid?.data[0])
      setFebruaryAmountNotPaid(customerAmountsNotPaid?.data[1])
      setMarchAmountNotPaid(customerAmountsNotPaid?.data[2])
      setAprilAmountNotPaid(customerAmountsNotPaid?.data[3])
      setMayAmountNotPaid(customerAmountsNotPaid?.data[4])
      setJuneAmountNotPaid(customerAmountsNotPaid?.data[5])
      setJulyAmountNotPaid(customerAmountsNotPaid?.data[6])
      setAugustAmountNotPaid(customerAmountsNotPaid?.data[7])
      setSeptemberAmountNotPaid(customerAmountsNotPaid?.data[8])
      setOctoberAmountNotPaid(customerAmountsNotPaid?.data[9])
      setNovemberAmountNotPaid(customerAmountsNotPaid?.data[10])
      setDecemberAmountNotPaid(customerAmountsNotPaid?.data[11])
    },[customerAmountsNotPaid, incomeYear, setIncomeYear])

    // useEffect(()=> {
    //   axios.get('https://nartina.com/api/user/get-receipts-by-supplier-per-user-not-paid/' + custid)
    //   .then(res => setReceipts(res.data))
    //   .catch(err => console.log(err))
    // }, [custid])

    // useEffect(()=> {
    //   axios.get('https://nartina.com/api/user/get-receipts-by-supplier-per-user-current-month/' + custid + "/" + currentMonth + "/" + currentYear)
    //   .then(res => setReceiptsCurrentMonth(res.data))
    //   .catch(err => console.log(err))
    // }, [custid])


    const getDataNotPaid = () => {
      return axios.get('https://nartina.com/api/user/get-receipts-by-supplier-per-user-not-paid/' + custid)
    }
    
    const {data: invoicesNotPaid, refetch: mmm} = useQuery('customers-invoices-not-paid', ()=> getDataNotPaid(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: true,
        refetchOnWindowFocus:false
   
      }) 


    const getDataCurrentMonth = () => {
      return axios.get('https://nartina.com/api/user/get-receipts-by-supplier-per-user-current-month/' + custid + "/" + currentMonth + "/" + currentYear)
    }
    
    const {data: current, refetch: ppp} = useQuery('customers-invoices-current-month', ()=> getDataCurrentMonth(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: true,
        refetchOnWindowFocus:false
   
      }) 

    useEffect(()=> {
      getCustomerInfo()
  }, [custid])

  const getCustomerInfo = async () => {
      const res = await fetch(`https://nartina.com/api/user/customer-by-id/${custid}`);
      const result = await res.json();
      setCustomer(result)
  }

  // const getReceiptsCurrentMonth = () => {
  //   axios.get('https://nartina.com/api/user/get-receipts-by-supplier-per-user-current-month/' + custid + "/" + currentMonth + "/" + currentYear)
  //     .then(res => setReceiptsCurrentMonth(res.data))
  //     .catch(err => console.log(err))
  // }

  // const getReceiptsCurrentMonthNotPaid = () => {
  //   axios.get('https://nartina.com/api/user/get-receipts-by-supplier-per-user-not-paid/' + custid)
  //     .then(res => setReceipts(res.data))
  //     .catch(err => console.log(err))
  // }

  useEffect(()=> {
    axios.get('https://nartina.com/api/user/get-receipts-not-paid-amount/' + custid)
    .then(res => setNotPaid(res.data))
    .catch(err => console.log(err))
  }, [custid])

  useEffect(()=> {
    getYearTotal()
  }, [incomeYear, custid])

  const getYearTotal= async () => {
    const response = await fetch(`https://nartina.com/api/user/get-receipts-yearly-amount/${custid}/${incomeYear}`);
    const data = await response.json();
    setYearTotal(data)
  }


 

  const getReceiptById = async (id) => {
    const res = await fetch(`https://nartina.com/api/user/get-receipt-by-id/${id}`);
    const result = await res.json();
    setReceipt(result)
    
}

const updatePaymentMethod2 = (s) => {
  axios.get("https://nartina.com/api/user/update-receipt-payment-method/" + ide + "/" + s)
  .then(res => {yyy()
    sss()
    mmm()
    ppp()
    setOpenAlertPayment(true)
    // window.location.reload()
  })
  .catch(err => console.log(err.response.data))
}

  
  const printCancel = () => {
    if(receipt?.isCancel == "מבוטל") {
      printOriginal()
    }else {
      printOriginalNotCancel()
    }
  }
  
  const printCancelCopy = () => {
    if(receipt?.isCancel == "מבוטל") {
      printCopy()
    }else {
      printCopyNotCancel()
    }
  }

  const printOriginal = () => {
    // let filename = new Date().toLocaleDateString()
    let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
        axios.get("https://nartina.com/api/file/pdf/generate/invoice/" + ide + "/" + user?.id, {
            responseType: 'blob',
          }).then(res => {
            fileDownload(res.data, filename + ".pdf");
          });
          setIsOpen(false)
  }
  
  const printOriginalNotCancel = () => {
    // let filename = new Date().toLocaleDateString()
    let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
        axios.get("https://nartina.com/api/file/pdf/generate/invoice/not-cancel/" + ide + "/" + user?.id, {
            responseType: 'blob',
          }).then(res => {
            fileDownload(res.data, filename + ".pdf");
          });
          setIsOpen(false)
  }

  const printCopy = () => {
    // let filename = new Date().toLocaleDateString()
    let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
        axios.get("https://nartina.com/api/file/pdf/generate/invoice-copy/" + ide + "/" + user?.id, {
            responseType: 'blob',
          }).then(res => {
            fileDownload(res.data, filename + ".pdf");
          });
          setIsOpen(false)
  }
  
  const printCopyNotCancel = () => {
    // let filename = new Date().toLocaleDateString()
    let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
        axios.get("https://nartina.com/api/file/pdf/generate/invoice-copy-not-cancel/" + ide + "/" + user?.id, {
            responseType: 'blob',
          }).then(res => {
            fileDownload(res.data, filename + ".pdf");
          });
          setIsOpen(false)
  }

  const cancelReceipt = () => {
    axios.get("https://nartina.com/api/user/cancel-receipt/" + ide)
    .then(res => {console.log(res.data)
    setOpenCancelReceipt(false)
    setOpenReceiptAlert(true)
    yyy()
    mmm()
    ppp()
    sss()
    })
    .catch(err => console.log(err.response.data))
  }

  const handleCloseRecieptAlert = () => {
    setOpenReceiptAlert(false)
  }


  const zzz = () => {
    // if(checkDate != "") {
      const d = new Date(checkDate).getTime() + Math.random()*60000
      axios.post("https://nartina.com/api/user/add-coming-payment/" + result?.id, {
        title: receipt?.amount,
        startDate: new Date(checkDate).toISOString(),
        endDate: new Date(d).toISOString(),
        notes: " שם לקוח - " + receipt?.customerName  + "\n" + " תאריך חשבונית - " + receipt?.date + "\n " + " מספר חשבונית " + receipt?.taxId + "\n " + " מספר צ'ק - " + checkNumber
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {console.log(res)
      setCheckDate("")
      setOpenAlertPayment(true)
      // setSum("")
      // setDate("");
      setCheckNumber("")})
    // }
  }

  const upcomingPayment = () => {
    if(checkDate != "") {
      zzz()
    }
}

  const updatePaymentMethod = () => {
    axios.get("https://nartina.com/api/user/update-receipt-payment-method/" + ide + "/" + paymentMethod)
    .then(res => {console.log(res.data)
      setOpenDialog(false)
      upcomingPayment()
      // getReceiptsCurrentMonth()
      // getReceiptsCurrentMonthNotPaid()
      yyy()
      mmm()
      ppp()
      sss()
      setOpenAlertPayment(true)})
    .catch(err => console.log(err.response.data))
  }

  const handleChange2 = (e) => {
    console.log("the value is: " + e.target.value);
    setPaymentMethod(e.target.value)
    
  }

 

  const addPrint = () => {
    setOpenInput(true)
 }

 const closeForm = () => {
  setOpenInput(false)
  setCashNumber("")
}

const getReceipts = () => {
  axios.get('https://nartina.com/api/user/get-receipts-per-user/' + user?.id)
  .then(res => setReceipts(res.data))
  .catch(err => console.log(err))
}

const textReceipt = () => {
  axios.get("https://nartina.com/api/user/print-text-receipt/" + ide + "/" + cashNumber)
  .then(res => {console.log(res.data)
  setOpenCancelReceipt(false)
  setCashNumber("")
  setOpenInput(false)
  getReceipts()
  setOpenReceiptAlert(true)})
  .catch(err => console.log(err.response.data))
}



  const data = [
    { name: hebrew ? "january": "ינואר", הוצאה: januarAmount, לתשלום: januarAmountNotPaid },
    { name: hebrew ? "feb" : "'פבר", הוצאה: februaryAmount, לתשלום: februaryAmountNotPaid },
    { name: hebrew ? "march" : "מרץ", הוצאה: marchAmount, לתשלום:  marchAmountNotPaid},
    { name: hebrew ? "april" : "אפריל", הוצאה: aprilAmount, לתשלום: aprilAmountNotPaid },
    { name: hebrew ? "may" : "מאי", הוצאה: mayAmount, לתשלום:  mayAmountNotPaid},
    { name: hebrew ? "june" : "יוני", הוצאה: juneAmount, לתשלום: juneAmountNotPaid },
    { name: hebrew ? "july" : "יולי", הוצאה: julyAmount, לתשלום: julyAmountNotPaid },
    { name: hebrew ? "august" : "'אוג", הוצאה: augustAmount, לתשלום: augustAmountNotPaid },
    { name: hebrew ? "sep" : "'ספט", הוצאה: septemberAmount, לתשלום: septemberAmountNotPaid},
    { name: hebrew ? "oct" : "'אוק", הוצאה: octoberAmount, לתשלום: octoberAmountNotPaid },
    { name: hebrew ? "november" : "נובמבר", הוצאה: novemberAmount, לתשלום: novemberAmountNotPaid },
    { name: hebrew ? "dec" : "'דצמ", הוצאה: decemberAmount, לתשלום: decemberAmountNotPaid},
    
  ] 

  const data2 = [
    { name: 1, הוצאה: januarAmount, לתשלום: januarAmountNotPaid },
    { name: 2, הוצאה: februaryAmount, לתשלום: februaryAmountNotPaid },
    { name: 3, הוצאה: marchAmount, לתשלום:  marchAmountNotPaid},
    { name: 4, הוצאה: aprilAmount, לתשלום: aprilAmountNotPaid },
    { name: 5, הוצאה: mayAmount, לתשלום:  mayAmountNotPaid},
    { name: 6, הוצאה: juneAmount, לתשלום: juneAmountNotPaid },
    { name: 7, הוצאה: julyAmount, לתשלום: julyAmountNotPaid },
    { name: 8, הוצאה: augustAmount, לתשלום: augustAmountNotPaid },
    { name: 9, הוצאה: septemberAmount, לתשלום: septemberAmountNotPaid},
    { name: 10, הוצאה: octoberAmount, לתשלום: octoberAmountNotPaid },
    { name: 11, הוצאה: novemberAmount, לתשלום: novemberAmountNotPaid },
    { name: 12, הוצאה: decemberAmount, לתשלום: decemberAmountNotPaid},  
    
  ] 

  const handleIncomeYears = (e) => {
    setIncomeYear(e.target.value)
    console.log("--------------> " + incomeYear)
    setTimeout(()=> {
      yyy()
    }, 400)
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
        doc.addImage(imgData, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
      // const imgWidth = 210;
      // const imgHeight = canvas.height * imgWidth / canvas.width
      // var imgData = canvas.toDataURL("image/png");
      // doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      // Create a new Date object representing the current date and time
const currentDate = new Date();

// Get the individual components
const year = currentDate.getFullYear();   // e.g., 2023
const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1 to get the correct month (1-12)
const day = currentDate.getDate();        // e.g., 19 (day of the month)
const hours = currentDate.getHours();     // e.g., 10 (24-hour format)
const minutes = currentDate.getMinutes(); // e.g., 30
const seconds = currentDate.getSeconds(); // e.g., 45

// Creating a formatted date string
const fullDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

console.log(fullDateTime); // Output will be something like: "2023-07-19 10:30:45"
        doc.save(`customer-report-${fullDateTime}.pdf`)
      // doc.save("hebrew.pdf");
      setSpin(false)
    })
  }

  const generatePdf2 = () => {
    setSpin(true)
    const input = document.getElementById("yyy")
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
        doc.addImage(imgData, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
      // const imgWidth = 210;
      // const imgHeight = canvas.height * imgWidth / canvas.width
      // var imgData = canvas.toDataURL("image/png");
      // doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save("hebrew.pdf");
      setSpin(false)
    })
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

  const getCurrentMonthTaxInvoicesIsTazrim = () => {
    axios.get('https://nartina.com/api/user/get-receipts-per-user-tazrim/'+ user?.id + "/" + currentMonth)
    .then(res => setCurrentMonthTaxInvoicesIsTazrim(res.data))
    .catch(err => console.log(err)) 
  }

  const changeActiveTazrim = (id) => {
    axios.get('https://nartina.com/api/user/get-receipt-by-id-change-tazrim/' + id)
      .then(res => {getReceipts()
      getCurrentMonthTaxInvoicesIsTazrim()
      localStorage.setItem('taxInvoice', true)
      ppp()
      mmm()})
      .catch(err => console.log(err))
  }
  
  const changeActivePaid = (id) => {
          setIde(id)
          axios.get('https://nartina.com/api/user/change-receipt-is-paid/' + id)
          .then(res => {setIsPaid(res.data.paidOrNo)
            setReceipt(res.data.receipt)
            yyy()
            mmm()
            ppp()
            sss()
              })
  }
  
  const print = (id) => {
    setIde(id)
    getReceiptById(id)
    setIsOpen(true)
  }
  
  const cancel = (id) => {
    setIde(id)
    setOpenCancelReceipt(true)
  }

  const handleClose = () => {
    setOpenAlertPayment(false)
  }
    
  return (
    <div className={`max-w-[1840px] min-h-screen mt-14 py-2 ${hebrew ? "mr-0 airx:ml-64" : "mr-0 airx:mr-64"}`}>
      <div class="w-full bg-white shadow rounded-2xl dark:bg-gray-800 mt-2 px-4">
    <div alt="profil" style={{ backgroundImage: `url(${image2})`}} class="w-full mb-4 rounded-xl bg-cover bg-center h-32"/>
    <div class="flex flex-col items-center justify-center p-4 -mt-16">
        <div class="relative h-[87px] w-[87px] rounded-full bg-green-600 border-[4px] border-white flex items-center justify-center">
        <span class={`top-0 right-2 absolute  w-3.5 h-3.5 ${customer?.active ? "bg-green-500" : "bg-red-500"} border-2 border-white dark:border-gray-800 rounded-full`}></span>
        <h1 className='font-mono text-white text-4xl font-semibold'>{customer && customer.name && customer.name.charAt(0)}</h1>
        </div>
        <p class="mt-2 text-xl font-medium text-gray-800 dark:text-white">
          {customer?.name}
        </p>
        <p class="flex items-center text-xs text-gray-400">
            <svg width="10" height="10" fill="currentColor" class="w-4 h-4 mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                </path>
            </svg>
            ערוך
        </p>
        <p class="text-xs text-gray-400">
        </p>
        
        <div className='flex items-center justify-center space-x-6'>
        <div className="flex flex-col items-center justify-center">
          <h1 className='text-gray-700 font-extrabold text-lg dark:text-[#ccc]'>₪{Number(isFinite(yearTotal) ? yearTotal : 0).toLocaleString()}</h1>
          <p className="text-md font-normal text-gray-500 dark:text-white">קניות-<span className='font-mono'>{incomeYear}</span></p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className='flex items-center justify-center space-x-1 '>
            <h1 className='text-gray-700 font-extrabold text-lg dark:text-[#ccc]'>₪{Number(isFinite(notPaid) ? notPaid : 0).toLocaleString()}</h1>
            {notPaid > 0 && <div className='bg-red-600 h-2 w-2 rounded-full animate-pulse duration-500'/>}
          </div>
          <div>
            <p className="text-md font-normal text-gray-500 dark:text-white">יתרת חובה</p>
          </div>
        </div>
        </div>
    </div>
</div>
    
     {hebrew ? (
      <>
       <div className="h-fit mt-[5px] ml-1 py-1 overflow-y-hidden overflow-x-auto xl:overflow-x-hidden">
  <div className='flex items-center justify-between px-3'>
      
      
  <div className='hidden ttr:flex items-center justify-center space-x-3'>
        {/* {roll ? <h1 className={`${customer?.active ? "text-green-700" : "text-red-600"} text-md xrc:text-lg sm:text-xl font-mono font-semibold`}>{customer?.active && !hebrew ? "פעיל" : !customer?.active && !hebrew ? "לא פעיל" : customer?.active && hebrew ? "active" : !customer?.active && hebrew ? "not active" : ""}</h1> : <CircularProgress color="success" size={15}/>} */}
        {spin ? (
              <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                ) : (
                  <svg class="w-6 h-6 text-blue-700 dark:text-white cursor-pointer hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" onClick={generatePdf}>
    <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"/>
    <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"/>
  </svg>
          // <LocalPrintshopIcon className='text-blue-600 cursor-pointer hover:scale-110 hover:text-blue-500 transition-all duration-150 ease-out' onClick={generatePdf}/>
        )}
      </div>
      <div className='flex ttr:hidden items-center justify-center space-x-3'>
        {/* {roll ? <h1 className={`${customer?.active ? "text-green-700" : "text-red-600"} text-md xrc:text-lg sm:text-xl font-mono font-semibold`}>{customer?.active && !hebrew ? "פעיל" : !customer?.active && !hebrew ? "לא פעיל" : customer?.active && hebrew ? "active" : !customer?.active && hebrew ? "not active" : ""}</h1> : <CircularProgress color="success" size={15}/>} */}
        {spin ? (
            <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                ) : (
                  <svg class="w-5 h-5 text-blue-700 dark:text-white cursor-pointer hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" onClick={generatePdf2}>
    <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"/>
    <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"/>
  </svg>
          // <LocalPrintshopIcon className='text-blue-600 cursor-pointer hover:scale-110 hover:text-blue-500 transition-all duration-150 ease-out' onClick={generatePdf2}/>
        )}      </div>
     <div className='flex items-center justify-center'>
      
    <Select onChange={handleIncomeYears} value={incomeYear} className='bg-white rounded-md text-center w-24 h-7'>
            {years.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select> 
     </div>
     
      </div>
      </div>
      </>
     ) : (
      <>
       <div className="h-fit mt-[5px] ml-1 py-1 overflow-y-hidden overflow-x-auto xl:overflow-x-hidden">
  <div className='flex items-center justify-between px-3'>
      <div className='flex items-center justify-center'>
      
    <Select onChange={handleIncomeYears} value={incomeYear} className='bg-white rounded-md text-center w-24 h-7'>
            {years.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select> 
     </div>
     <div className='hidden ttr:flex items-center justify-center space-x-3'>
        {/* {roll ? <h1 className={`${customer?.active ? "text-green-700" : "text-red-600"} text-md xrc:text-lg sm:text-xl font-mono font-semibold`}>{customer?.active && !hebrew ? "פעיל" : !customer?.active && !hebrew ? "לא פעיל" : customer?.active && hebrew ? "active" : !customer?.active && hebrew ? "not active" : ""}</h1> : <CircularProgress color="success" size={15}/>} */}
        {spin ? (
              <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                ) : (
                  <svg class="w-5 h-5 text-blue-700 dark:text-white cursor-pointer hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" onClick={generatePdf}>
    <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"/>
    <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"/>
  </svg>
          // <LocalPrintshopIcon className='text-blue-600 cursor-pointer hover:scale-110 hover:text-blue-500 transition-all duration-150 ease-out' onClick={generatePdf}/>
        )}      </div>
      <div className='flex ttr:hidden items-center justify-center space-x-3'>
        {/* {roll ? <h1 className={`${customer?.active ? "text-green-700" : "text-red-600"} text-md xrc:text-lg sm:text-xl font-mono font-semibold`}>{customer?.active && !hebrew ? "פעיל" : !customer?.active && !hebrew ? "לא פעיל" : customer?.active && hebrew ? "active" : !customer?.active && hebrew ? "not active" : ""}</h1> : <CircularProgress color="success" size={15}/>} */}
        {spin ? (
              <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                ) : (
                  <svg class="w-5 h-5 text-blue-700 dark:text-white cursor-pointer hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" onClick={generatePdf2}>
    <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"/>
    <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"/>
  </svg>
          // <LocalPrintshopIcon className='text-blue-600 cursor-pointer hover:scale-110 hover:text-blue-500 transition-all duration-150 ease-out' onClick={generatePdf2}/>
        )}      </div>
     
      </div>
      </div>
      </>
     )}

      <div id='xxx' className='hidden ttr:block w-full mt-4'>
        <div className="h-80 w-full mx-auto rounded-sm bg-gray-[#cccccc] mr-0 lg:mr-[185px]">
          <NivoLineCustom arr={data}/>
        </div>
        <div className="h-80 w-full bg-gray-[#cccccc] rounded-sm mr-0 lg:mr-[185px] ">
          <NivoLineCustom2 arr={data}/>
        </div>
      </div>
      <div id='yyy' className='block ttr:hidden w-full '>
        <div className="h-80 w-full mx-auto rounded-sm bg-gray-[#cccccc] mr-0 lg:mr-[185px]">
          <NivoLineCustom arr={data2}/>
        </div>
        <div className="h-80 w-full bg-gray-[#cccccc] rounded-sm  mr-0 lg:mr-[185px] ">
          <NivoLineCustom2 arr={data2}/>
        </div>
      </div>

      <h1 className='text-center font-mono text-blue-600 font-semibold mt-8 text-2xl mb-2'>{hebrew ? "current month invoices" : "חשבוניות חודש נוכחי"}</h1>
      <div className="w-full px-2 h-[380px] ml-1 mt-2 overflow-y-auto overflow-x-auto lg:overflow-hidden">
      {/* receiptsCurrentMonth table here */}
      {isSSR ? (
          <LinearProgress />
        ) : (
          <>
          <div className="pr-1 hidden md:block"> 
         <table className="min-w-full divide-y divide-gray-200 border-[#ccc] border-b-2">
          <thead className="bg-sky-700 sticky top-0 z-50">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="hidden lge:flex px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">פרטי חשבונית</th>
              <th scope="col" className="lge:hidden px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">פרטים</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">בטל</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הדפס</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מבוטל</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הוסף</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">?שולם</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סכום</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מס' חשבונית</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">צורת תשלום</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך חשבונית</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם לקוח</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
            </tr>
          </thead>

            <>
            <tbody className="divide-y divide-gray-200">
            {current?.data.map((receipt, index) => (
              <tr key={receipt.id} className={`border ${index % 2 === 0 ? '' : ''}`}>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/receipts/${receipt?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[10px]'>פרטי חשבונית</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 font-semibold text-[12px]'>פרטים</h1>
              </div>
            </td>
            
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-red-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> cancel(receipt?.id)}>
               <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> print(receipt?.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className={`px-1 text-center py-2 text-xs ${receipt.isCancel == "מבוטל" ? "text-red-600" : "text-gray-800"} font-semibold font-mono`}>{receipt.isCancel}</td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-1 text-xs">
            {receipt.tazrim ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActiveTazrim(receipt.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActiveTazrim(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-1 text-xs">
            {receipt.paidOrNo == "שולם" ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActivePaid(receipt.id)}
          color='success'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActivePaid(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-green-600 font-semibold font-mono">{receipt.amount}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{receipt.taxId}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{receipt.paymentMethod}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{receipt.date}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-sm text-gray-800  font-bold font-mono">{receipt.customerName}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              </tr>
            ))}
          </tbody>
            </>
        </table>
         </div>
         <div className='grid grid-cols-1 gap-3 md:hidden px-4 py-2 dark '>
              {current?.data.map(receipt => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} p-2 flex flex-col space-y-1`}>
                <div className="p-4 bg-gray-900 hover:bg-gray-800 shadow rounded-xl flex flex-col space-y-1">

                <div className='flex items-center justify-end space-x-2 text-sm'>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.customerName}</div>
                <div className='text-right text-[#333] text-lg dark:text-[#ccc]'>שם לקוח</div>
                </div>
                </div>
                <div className='flex items-center justify-end space-x-2 text-sm'>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.date}</div>
                <div className='text-right text-[#333] text-lg dark:text-[#ccc]'>תאריך חשבונית</div>
                </div>
                </div>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.taxId}</div>
                <div className='text-right dark:text-[#ccc]'>מספר חשבונית</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.paymentMethod}</div>
                <div className='text-right dark:text-[#ccc]'>צורת תשלום</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className={`px-1 text-center py-2 text-xs ${receipt.isCancel == "מבוטל" ? "text-red-600 dark:text-red-500" : "text-gray-800 dark:text-[#ccc]"} font-semibold font-mono`}>{receipt.isCancel}</div>
                <div className='text-right dark:text-[#ccc]'>?מבוטל</div>
                </div>
                
                <div className='flex items-center justify-end space-x-1'>
                <div scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
                {receipt.paidOrNo == "שולם" ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActivePaid(receipt.id)}
          color='success'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActivePaid(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
  </div>
                <div className='text-right dark:text-[#ccc]'>?שולם</div>
                </div>
                <div className='flex items-center justify-end space-x-1'>
                <div scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
                {receipt.tazrim ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActiveTazrim(receipt.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActiveTazrim(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
  </div>
                <div className='text-right dark:text-[#ccc]'>?תזרים</div>
                </div>
                
                <div className='flex items-center justify-between space-x-4 relative top-1'>
                <div className='flex items-center justify-center space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(receipt.amount).toLocaleString()}</h1>
                  <h1 className='text-[#333] dark:text-[#ccc]'>סכום</h1>
                </div>
                <div className='flex items-center justify-center space-x-5'>
                <div className="flex justify-center items-center bg-gray-300 dark:bg-slate-600 hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer" onClick={()=> navigate(`/receipts/${receipt?.id}`)}>
                <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'><span className='hidden xxq:inline'>פרטי</span> חשבונית</h1>
              </div>
              
            <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> cancel(receipt?.id)}>
               <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 dark:text-red-500'/>
              </div>
            <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> print(receipt?.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
                </div>
              
                </div>
              </div>
              ))}
            </div>
          </>
        )}
     
      </div>

      <h1 className='text-center font-mono text-red-600 font-semibold text-2xl mt-4 mb-2'>{hebrew ? "unpaid invoices" : "חשבוניות שלא שולמו"}</h1>
      <div className="w-full px-2 h-[380px] ml-1 mt-2 overflow-y-auto overflow-x-auto lg:overflow-hidden">
      {/* receipts table here maybe not paid */}
      {isSSR ? (
          <LinearProgress />
        ) : (
          <>
          <div className="pr-1 hidden md:block"> 
         <table className="min-w-full divide-y divide-gray-200 border-[#ccc] border-b-2">
          <thead className="bg-sky-700 sticky top-0 z-50">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="hidden lge:flex px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">פרטי חשבונית</th>
              <th scope="col" className="lge:hidden px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">פרטים</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">בטל</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הדפס</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מבוטל</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הוסף</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">?שולם</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סכום</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מס' חשבונית</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">צורת תשלום</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך חשבונית</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם לקוח</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
            </tr>
          </thead>

            <>
            <tbody className="divide-y divide-gray-200">
            {invoicesNotPaid?.data.map((receipt, index) => (
              <tr key={receipt.id} className={`border ${index % 2 === 0 ? '' : ''}`}>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/receipts/${receipt?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[10px]'>פרטי חשבונית</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 font-semibold text-[12px]'>פרטים</h1>
              </div>
            </td>
            
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-red-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> cancel(receipt?.id)}>
               <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> print(receipt?.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className={`px-1 text-center py-2 text-xs ${receipt.isCancel == "מבוטל" ? "text-red-600" : "text-gray-800"} font-semibold font-mono`}>{receipt.isCancel}</td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-1 text-xs">
            {receipt.tazrim ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActiveTazrim(receipt.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActiveTazrim(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-1 text-xs">
            {receipt.paidOrNo == "שולם" ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActivePaid(receipt.id)}
          color='success'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActivePaid(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
            </td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-green-600 font-semibold font-mono">{receipt.amount}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{receipt.taxId}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{receipt.paymentMethod}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{receipt.date}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-sm text-gray-800  font-bold font-mono">{receipt.customerName}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              </tr>
            ))}
          </tbody>
            </>
        </table>
         </div>
         <div className='grid grid-cols-1 gap-3 md:hidden px-4 py-2 dark'>
              {invoicesNotPaid?.data.map(receipt => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} p-2 flex flex-col space-y-1`}>
                <div className="p-4 bg-gray-900 hover:bg-gray-800 shadow rounded-xl flex flex-col space-y-1">

                <div className='flex items-center justify-end space-x-2 text-sm'>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.customerName}</div>
                <div className='text-right text-[#333] text-lg dark:text-[#ccc]'>שם לקוח</div>
                </div>
                </div>
                <div className='flex items-center justify-end space-x-2 text-sm'>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.date}</div>
                <div className='text-right text-[#333] text-lg dark:text-[#ccc]'>תאריך חשבונית</div>
                </div>
                </div>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.taxId}</div>
                <div className='text-right dark:text-[#ccc]'>מספר חשבונית</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.paymentMethod}</div>
                <div className='text-right dark:text-[#ccc]'>צורת תשלום</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className={`px-1 text-center py-2 text-xs ${receipt.isCancel == "מבוטל" ? "text-red-600 dark:text-red-500" : "text-gray-800 dark:text-[#ccc]"} font-semibold font-mono`}>{receipt.isCancel}</div>
                <div className='text-right dark:text-[#ccc]'>?מבוטל</div>
                </div>
                
                <div className='flex items-center justify-end space-x-1'>
                <div scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
                {receipt.paidOrNo == "שולם" ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActivePaid(receipt.id)}
          color='success'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActivePaid(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
  </div>
                <div className='text-right dark:text-[#ccc]'>?שולם</div>
                </div>
                <div className='flex items-center justify-end space-x-1'>
                <div scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
                {receipt.tazrim ? <>
        <Android12Switch
          checked={true}
          onChange={()=> changeActiveTazrim(receipt.id)}
          color='primary'
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
        : 
        <>
        <Android12Switch
          checked={false}
          onChange={()=> changeActiveTazrim(receipt.id)}
          // size='small'
          // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>}
  </div>
                <div className='text-right dark:text-[#ccc]'>?תזרים</div>
                </div>
                
                <div className='flex items-center justify-between space-x-4 relative top-1'>
                <div className='flex items-center justify-center space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(receipt.amount).toLocaleString()}</h1>
                  <h1 className='text-[#333] dark:text-[#ccc]'>סכום</h1>
                </div>
                <div className='flex items-center justify-center space-x-5'>
                <div className="flex justify-center items-center bg-gray-300 dark:bg-slate-600 hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer" onClick={()=> navigate(`/receipts/${receipt?.id}`)}>
                <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px]'><span className='hidden xxq:inline'>פרטי</span> חשבונית</h1>
              </div>
              
            <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> cancel(receipt?.id)}>
               <EventBusyIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 dark:text-red-500'/>
              </div>
            <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> print(receipt?.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
                </div>
              
                </div>
              </div>
              ))}
            </div>
          </>
        )}

      
      </div>
      <Dialog open={open}>
        <DialogTitle></DialogTitle>
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>אם אתה בוחר להדפיס את החשבונית עלייך להגישה למס הכנסה ע''פי חוק, מס' החשבונית הראשונה יהיה 3001, וימשיך בסדר עולה</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-between md:justify-around items-center p-2 space-x-2 pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל הדפסה</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={printCancelCopy}>העתק/נאמן למקור</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={printCancel}>הדפס מקור</button> 
        </div>
        {/* </DialogActions> */}
    </Dialog>

    <Dialog open={openCancelReceipt}>
        {!openInput && (
          <>
          <DialogContent>
            <Typography className='text-center' variant='subtitle1'>ביטול החשבונית לא ימחק אותה, אלא ירשם על גבי החשבונית -מבוטל- על מנת לשמור על רצף מספרי</Typography>
            <Typography className='text-center font-mono' variant='h6'>האם לבטל את החשבונית</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setOpenCancelReceipt(false)}>אל תבטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={addPrint}>הודפס בקופה רושמת</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={cancelReceipt}>בטל חשבונית</button>
        </div>
          </>
        )}
        {openInput && (
          <>
          <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeForm}/>
        </div>
          <div className='flex flex-col items-center justify-center px-8 pb-8 pt-1'>
                                <h1 className='text-sm'>יצויין על גבי החשבונית</h1>
                                <h1 className='text-sm font-semibold'>הודפס בקופה רושמת</h1>
                                <h1 className='text-sm mb-4'>בתוספת מס' סרט הקופה</h1>
                                <CacheProvider value={cacheRtl}>
                                <ThemeProvider theme={theme}>
                                  <TextField InputLabelProps={{
        shrink: true,
      }} type="text" value={cashNumber} label="מספר סרט קופה"  className='bg-white shadow-md focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-md px-2 py-1 w-36 placeholder:text-right placeholder:font-mono placeholder:text-gray-700' onChange={(e)=> setCashNumber(e.target.value)}/>
                                </ThemeProvider>
                                </CacheProvider>
                            <button disabled={cashNumber == ""} className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg mt-4' onClick={textReceipt}>עדכן חשבונית</button>
          </div>
          </>
        )}
    </Dialog>

    <Snackbar open={openReceiptAlert} autoHideDuration={10000} onClose={handleCloseRecieptAlert} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Alert
          onClose={handleCloseRecieptAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            חשבונית בוטלה בהצלחה
        </Alert>
      </Snackbar>

      <Dialog open={openDialog}>
        <DialogTitle className='text-center'>בחר צורת תשלום</DialogTitle>
        <DialogContent>

        <InputLabel id="demo-simple-select-label" className='text-right'>צורת תשלום</InputLabel>
        <Select onChange={handleChange2} className='bg-white w-52 focus:outline-none focus:ring focus:border-blue-500 mt-1'>
        
        {arr2.map(a => (
            <MenuItem value={a}>{a}</MenuItem>
        ))}
     </Select>
        </DialogContent>
        {paymentMethod == "צ'ק" && (
                  <div className='px-4 relative bottom-3.5'>
                 <div>
                   <label for='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">מספר צ'ק</label>
                   <input type="text" name="email" value={checkNumber} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="מספר צ'ק" required="" onChange={(e)=> setCheckNumber(e.target.value)}/>
                 </div>
                 <div>
                   <div className='flex justify-end items-center space-x-1'>
                     <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                     <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">תאריך צ'ק</label>
                   </div>
                     <input disabled={paymentMethod != "צ'ק"} type="date" name="name" value={checkDate} class="bg-gray-50 text-right border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="תאריך צ'ק" required="" onChange={(e)=> setCheckDate(e.target.value)}/>
                 </div>
                  </div>
                 )}
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setOpenDialog(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={updatePaymentMethod}>עדכן</button>
        
        </div>
        {/* </DialogActions> */}
    </Dialog>
    <Snackbar open={incomeALert} autoHideDuration={90000} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}>
    {/* <Snackbar open={incomeALert} autoHideDuration={90000} onClose={handleClose4} anchorOrigin={{vertical: 'bottom', horizontal: hebrew ? 'right' : 'left'}}> */}
        <Alert
          // onClose={handleClose4}
          severity="success"
          sx={{ width: "100%" }}
        >
         
      {hebrew ? (
        <>
        <h1 className='hidden md:inline font-mono text-sm md:text-md text-gray-700 font-semibold'>total buying-</h1>
      <h1 className='hidden md:inline text-blue-700 font-mono'>{incomeYear}</h1>

      <div className='flex justify-center items-center space-x-1'>
        <h1 className='text-green-600 font-mono text-lg'>{yearTotal}</h1>
        <h1 className='font-mono text-sm text-[#333333]'>NIS</h1>
      </div>
        </>
      ) : (
        <>
       
        <div className='flex items-center justify-center space-x-1'>
          <h1 className='hidden md:inline text-blue-700 font-mono'>{incomeYear}</h1>
          <h1 className='hidden md:inline font-mono text-sm md:text-md text-gray-700 font-semibold'>קניות שנת</h1>
        </div>
        <div className='flex items-center justify-center space-x-1'>
          <h1 className='font-mono text-sm text-[#333333]'>ש"ח</h1>
          <h1 className='text-green-600 font-mono text-lg'>{yearTotal}</h1>
        </div>

        </>
      )}
      
        </Alert>
      </Snackbar>

    <Snackbar open={openReceiptAlert} autoHideDuration={10000} onClose={handleCloseRecieptAlert} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Alert
          onClose={handleCloseRecieptAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            חשבונית בוטלה בהצלחה
        </Alert>
      </Snackbar>

      <Snackbar open={openAlertPayment} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            חשבונית עודכנה בהצלחה
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CustomerReports