import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Select, MenuItem, InputLabel} from '@mui/material'
// import { LineChart, AreaChart, Area, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Dialog, DialogContent, DialogTitle, Typography, TextField } from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
import TextareaAutosize from '@mui/base/TextareaAutosize';
// import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams } from 'react-router-dom'
import axios from "axios";
// import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
// import NivoLineCustom from '../components/NivoLineCustom';
// import NivoLineCustom2 from '../components/NivoLineCustom2';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import CheckIcon from '@mui/icons-material/Check';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from "../App";
import { useQuery } from 'react-query'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import Card from '../components/Card';
import Chart from 'react-apexcharts';
import Swal from 'sweetalert2'




// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});




const SupplierReports = () => {
  const thisYear = new Date().getFullYear()
  const [user, setUser] = useState({})
  const [isSSR, setIsSSR] = useState(true);
  const [isSSRE, setIsSSRE] = useState(true);
  const [ide, setIde] = useState();
  const [invoice, setInvoice] = useState({})
  const [open, setIsOpen] = useState(false)
  const [incomeALert, setIncomeAlert] = useState(false)
  const [invoices, setInvoices] = useState([])
  const [invoicesCurrentMonth, setInvoicesCurrentMonth] = useState([])
  const [customer, setCustomer] = useState({})
  // const [supplier, setSupplier] = useState({})
  const [incomeYear, setIncomeYear] = useState(thisYear)
  const [windowWidth, setWindowWidth] = useState(0);


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


  const [yearState, setYearState] = useState(true);
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [openForm, setIsOpenForm] = useState(false)

  //update invoice
  const [paidOrNo, setPaidOrNo] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [date, setDate] = useState("")
  const [checkDate, setCheckDate] = useState("")
  const [checkNumber, setCheckNumber] = useState("")
  const [checkedRefund, setCheckedRefund] = useState(invoice?.refund)
  const [refundInvice, setRefundInvice] = useState(false);
  const [checked, setChecked] = useState(invoice?.vat)
  const [notes, setNotes] = useState("");
  const [invoiceId, setInvoiceId] = useState("")
  const [amount, setAmount] = useState("")
  const [openAlertAdd, setIsOpenAlertAdd] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [error, setError] = useState()
  const [errorMode, setErrorMode] = useState(false)
  const [roll, setRoll] = useState(false)
  const [xxx, setXxx] = useState(false)


  const [notPaid, setNotPaid] = useState();
  const [yearTotal, setYearTotal] = useState();

  const screen = window.screen.availWidth
  const screenHeight = window.screen.availHeight
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const currentYearMinus = new Date().getFullYear() - 1;

  const arr1 = ["שולם", "לא שולם"];
  const arr5 = ["מזומן", "צ'ק", "הוראת קבע", "כרטיס אשראי", "העברה בנקאית", "ביט", "אחר", "-"];

  // const currentYear = new Date().getFullYear();
  const lastYear = new Date().getFullYear() -1
  const lastTwoYear = new Date().getFullYear() -2

  const years = [currentYear, lastYear, lastTwoYear] 

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)
  
  const { hebrew, year, globalTheme } = useContext(ThemeContext)

  const invoiceFlag = JSON.parse(localStorage.getItem('invoice'));


  // const [year, setYear] = useState();
    

    const { suppid } = useParams()

    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
      // setWindowHeight(window.innerHeight);
    };
  
    useEffect(() => {
      resizeWindow();
      console.log(window.innerWidth)
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);  
    }, [windowWidth, window.innerWidth]);

    const getData = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/get-invoices-by-supplier-per-user-not-paid/${suppid}`)
    }
    
    const {data: datax, refetch: www} = useQuery('supplier-reports-invoices-not-paid', ()=> getData(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: false,
        refetchOnWindowFocus:false
   
      }) 


      const getData2 = () => {
        const id = result?.id
        return axios.get(`https://nartina.com/api/user/get-invoices-by-supplier-per-user-current-month/${suppid}/${currentMonth}/${currentYear}`)
      }
      
      const {data: dataxx, refetch: rrr} = useQuery('supplier-reports-invoices', ()=> getData2(),
        {
          // enabled: !!supplier?.name,
          // staleTime: 300000
          refetchOnMount: false,
          refetchOnWindowFocus:false
     
        }) 


        const getSupplierAmount = () => {
          const id = result?.id
          return axios.get(`https://nartina.com/api/user/supplier-outcome-by-month-array/${suppid}/${incomeYear}`)
        }
        
        const {data: supplierAmounts, refetch: yyy} = useQuery('supplier-amounts', ()=> getSupplierAmount(),
          {
            // enabled: !!supplier?.name,
            // staleTime: 300000
            refetchOnMount: true,
            refetchOnWindowFocus:false
       
          }) 

          const getSupplierAmountNotPaid = () => {
            const id = result?.id
            return axios.get(`https://nartina.com/api/user/supplier-outcome-by-month-not-paid-array/${suppid}/${incomeYear}`)
          }
          
          const {data: supplierAmountsNotPaid, refetch: sss} = useQuery('supplier-amounts-not-paid', ()=> getSupplierAmountNotPaid(),
            {
              // enabled: !!supplier?.name,
              // staleTime: 300000
              refetchOnMount: true,
              refetchOnWindowFocus:false
         
            }) 

            useEffect(()=> {
              setJanuarAmountNotPaid(supplierAmountsNotPaid?.data[0])
              setFebruaryAmountNotPaid(supplierAmountsNotPaid?.data[1])
              setMarchAmountNotPaid(supplierAmountsNotPaid?.data[2])
              setAprilAmountNotPaid(supplierAmountsNotPaid?.data[3])
              setMayAmountNotPaid(supplierAmountsNotPaid?.data[4])
              setJuneAmountNotPaid(supplierAmountsNotPaid?.data[5])
              setJulyAmountNotPaid(supplierAmountsNotPaid?.data[6])
              setAugustAmountNotPaid(supplierAmountsNotPaid?.data[7])
              setSeptemberAmountNotPaid(supplierAmountsNotPaid?.data[8])
              setOctoberAmountNotPaid(supplierAmountsNotPaid?.data[9])
              setNovemberAmountNotPaid(supplierAmountsNotPaid?.data[10])
              setDecemberAmountNotPaid(supplierAmountsNotPaid?.data[11])
            },[supplierAmountsNotPaid, incomeYear, setIncomeYear])


          useEffect(()=> {
            setJanuarAmount(supplierAmounts?.data[0])
            setFebruaryAmount(supplierAmounts?.data[1])
            setMarchAmount(supplierAmounts?.data[2])
            setAprilAmount(supplierAmounts?.data[3])
            setMayAmount(supplierAmounts?.data[4])
            setJuneAmount(supplierAmounts?.data[5])
            setJulyAmount(supplierAmounts?.data[6])
            setAugustAmount(supplierAmounts?.data[7])
            setSeptemberAmount(supplierAmounts?.data[8])
            setOctoberAmount(supplierAmounts?.data[9])
            setNovemberAmount(supplierAmounts?.data[10])
            setDecemberAmount(supplierAmounts?.data[11])
          },[supplierAmounts, incomeYear, setIncomeYear])

    useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
  
  }, [user?.id])

    const supplierInfo = () => {

    return axios.get(`https://nartina.com/api/user/supplier-by-id/${suppid}`)
  }
  
  const {data: supplier} = useQuery('supplier-info', ()=> supplierInfo(),
    {
     
      refetchOnMount: true,
      refetchOnWindowFocus: false
    })

  useEffect(()=> {
    setTimeout(()=> {
      setRoll(true)
    }, 500)
}, [roll])

useEffect(() => {
  setTimeout(()=> {
    setXxx(true)
  }, 1000)
})

useEffect(()=> {
  setInvoices(datax?.data)
}, [datax?.data])

useEffect(()=> {
  setInvoicesCurrentMonth(dataxx?.data)
}, [dataxx?.data])

  useEffect(()=> {
    setIncomeAlert(true)
  }, [incomeALert])

  useEffect(() => {
    if(error == 403) {
      setErrorMode(true)
    }
    
  }, [errorMode, error]);

  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 300)
    
  }, [isSSR]);

  useEffect(() => {
    setTimeout(() => {
      setIsSSRE(false);
    }, 1200)
  }, [isSSRE]);

  //   useEffect(()=> {
  //     getSupplierInfo()
  // }, [suppid])



useEffect(()=> {
  getNotPaidAmount()
}, [])

useEffect(()=> {
  getYearTotal()
}, [incomeYear])



const state2 = {
          
  options: {
    chart: {
      height: 350,
      type: 'area',
      foreColor: '#a3a3a3',
      toolbar: {
        show: false, // Show the toolbar
        
      }
    },
    
    // title: {
    //   // text: new Date().getFullYear().toString(),
    //   // text: 'Fundamental Analysis of Stocks',
    //   text: 'קניות מהספק שנת ' + "  " + new Date().getFullYear().toString(),
    //   align: 'right'
    // },
    // subtitle: {
    //   text: 'גרף סכום קנייה מהספק שנת' + " " + new Date().getFullYear().toString(),
    //   align: 'right'
    // },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'straight', // Options: 'smooth', 'straight', 'stepline'
    },
    xaxis: {
      type: 'months',
      categories: ["ינואר", "'פבר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "'אוג'", "'ספט", "'אוק", "'נוב", "'דצמ"]
    },
    legend: {
      position: 'bottom',
      offsetY: 10
    },
    // annotations: {
    //   xaxis: [{
    //     x: 'מרץ',
    //     borderColor: '#999',
    //     label: {
    //       borderColor: '#999',
    //       style: {
    //         color: '#fff',
    //         background: '#999',
    //         cursor: 'pointer',
    //       },
    //       text: '<button>Click Me</button>',
    //       onClick: function(event, chartContext, { seriesIndex, dataPointIndex, w }) {
    //         console.log('Button clicked!');
    //       },
    //     }
    //   }]
    // },
    // toolbar: {
    //   show: false
    // },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  },

    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'top',
          offsetX: 0,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },

    
    
    
  //   xaxis: {
  //     type: 'months',
  //     categories: ['ינואר', 'פברואר', 'מרץ', 'אפריל',
  //       'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר',
  //       'נובמבר', 'דצמבר'
  //     ],
  //   },
  //   legend: {
  //     position: 'top',
  //     offsetY: 10
  //   },
  //   fill: {
  //     opacity: 0.8
  //   }
  // },


}

const state3 = {
          
  options: {
    chart: {
      height: 350,
      type: 'area',
      foreColor: '#a3a3a3',
      toolbar: {
        show: false, // Show the toolbar
        
      }
    },
    
    // title: {
    //   // text: new Date().getFullYear().toString(),
    //   // text: 'Fundamental Analysis of Stocks',
    //   text: 'קניות מהספק שנת ' + "  " + new Date().getFullYear().toString(),
    //   align: 'right'
    // },
    // subtitle: {
    //   text: 'גרף סכום קנייה מהספק שנת' + " " + new Date().getFullYear().toString(),
    //   align: 'right'
    // },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'months',
      categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    },
    legend: {
      position: 'bottom',
      offsetY: 10
    },
    // annotations: {
    //   xaxis: [{
    //     x: 'מרץ',
    //     borderColor: '#999',
    //     label: {
    //       borderColor: '#999',
    //       style: {
    //         color: '#fff',
    //         background: '#999',
    //         cursor: 'pointer',
    //       },
    //       text: '<button>Click Me</button>',
    //       onClick: function(event, chartContext, { seriesIndex, dataPointIndex, w }) {
    //         console.log('Button clicked!');
    //       },
    //     }
    //   }]
    // },
    // toolbar: {
    //   show: false
    // },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  },

    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'top',
          offsetX: 0,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },

    
    
    
  //   xaxis: {
  //     type: 'months',
  //     categories: ['ינואר', 'פברואר', 'מרץ', 'אפריל',
  //       'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר',
  //       'נובמבר', 'דצמבר'
  //     ],
  //   },
  //   legend: {
  //     position: 'top',
  //     offsetY: 10
  //   },
  //   fill: {
  //     opacity: 0.8
  //   }
  // },


}



const handleAlert = (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })
  
  swalWithBootstrapButtons.fire({
    title: '?אתם בטוחים',
    text: "!לא ניתן יהיה לשחזר את החשבונית",
    icon: 'אזהרה',
    showCancelButton: true,
    confirmButtonText: '!כן מחק',
    cancelButtonText: '!לא למחוק',
    reverseButtons: true
  }).then((results) => {
    if (results.isConfirmed) {
      axios.delete("https://nartina.com/api/user/delete-invoice/" + id, {
  headers: {
    Authorization: 'Bearer ' + result?.token,

        }
    })
      .then(res => {
      console.log(res.data)
        rrr()
        www()
        swalWithBootstrapButtons.fire(
          '!נמחק',
          'החשבונית נמחקה בהצלחה.',
          'success'
        )
        localStorage.setItem('invoice', true)})
        .catch(err => {console.log(err.response.data)
        swalWithBootstrapButtons.fire(
          'פעולה נכשלה',
          'מצטערים קרתה תקלה יש לנסות שוב :)',
          'error'
        )
        setError(err.response.status)})
    } else if (
      /* Read more about handling dismissals below */
      results.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'בוטל',
        'פעולה בוטלה החשבונית לא נמחקה :)',
        'error'
      )
    }
  })
}


  const deleteInvoice = () => {
    axios.delete("https://nartina.com/api/user/delete-invoice/" + ide, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    })
    .then(res => {www()
    rrr()}).
    catch(err => {console.log(err.response.data)
      setError(err.response.status)})
    setIsOpen(false)
    getInvoicesCurrentMonth()
    // setIsOpenAlert(true)
    // window.location.reload()
  }


  

  const getInvoices = async () => {
    const response = await fetch(`https://nartina.com/api/user/get-invoices-by-supplier-per-user-not-paid/${suppid}`);
    const data = await response.json();
    setInvoices(data)
  }
  

  const getInvoicesCurrentMonth = async () => {
    const response = await fetch(`https://nartina.com/api/user/get-invoices-by-supplier-per-user-current-month/${suppid}/${currentMonth}/${currentYear}`);
    const data = await response.json();
    setInvoicesCurrentMonth(data)
  }

  const getNotPaidAmount= async () => {
    const response = await fetch(`https://nartina.com/api/user/get-invoices-by-supplier-per-user-not-paid-amount/${suppid}`);
    const data = await response.json();
    setNotPaid(data)
  }

  const getYearTotal= async () => {
    const response = await fetch(`https://nartina.com/api/user/get-invoices-by-supplier-per-user-year-total/${suppid}/${incomeYear}`);
    // const response = await fetch(`https://nartina.com/api/user/get-invoices-by-supplier-per-user-year-total/${suppid}/${yearState ? currentYear : currentYearMinus}`);
    const data = await response.json();
    setYearTotal(data)
  }



const printValues = (e)=> {
  e.preventDefault()
  // if(checkDate != "") alert("אם אתה נותן צ'ק דחוי, תעדכן ידנית בדף תשלומים דחויים")
  if(checkDate != ""){
    const d = new Date(checkDate).getTime() + Math.random()*60000
    axios.post("https://nartina.com/api/user/add-deferral-payment/" + user?.id, {
      title: invoice.amount,
      invoice: "true",
      startDate: new Date(checkDate).toISOString(),
      endDate: new Date(d).toISOString(),
      notes: " :שם ספק " + invoice.supplierName + "\n" + " :תאריך חשבונית " + invoice.date + "\n " + " :מס' חשבונית " + invoice.invoiceId + "\n " + " :מס' צ'ק " + checkNumber
    }, {
      headers: {
        Authorization: 'Bearer ' + result?.token,
    
       }
    }).then(res => {setIsOpenAlertAdd(true)
      www()
      rrr()}) 
    .catch(err=> {console.log(err)
      setError(err.response.status)})
  }
  
  axios.post("https://nartina.com/api/user/update-invoice/" + ide, {
    amount: amount != "" ? amount : invoice.amount,
    date: date != "" ? date : invoice.date,
    // noVat: noVat != "" ? noVat : invoice.noVat,
    // noRefund: noRefund != "" ? noRefund : invoice.noRefund,
    // noVat: noVat != "" ? noVat : invoice.noVat,
    // noVat: checked == undefined ? invoice.noVat : (checked == true ? "ללא מע''מ" : "-"),
    // noRefund: checkedRefund == undefined ? invoice.noRefund : (checkedRefund == true ? "זיכוי" : "-"),
    supplierType: invoice.supplierType,
    checkDate: checkDate != "" ? checkDate : invoice.checkDate,
    invoiceId: invoiceId != "" ? invoiceId : invoice.invoiceId,
    notes: notes != "" ? notes : invoice.notes,
    // supplierType: supplierType != "" ? supplierType : invoice.supplierType,  
    paidOrNo: paidOrNo != "" ? paidOrNo : invoice.paidOrNo,
    paymentMethod: paymentMethod != "" ? paymentMethod : invoice.paymentMethod,
    paymentMethod: paymentMethod != "" ? paymentMethod : invoice.paymentMethod,
    refund: checkedRefund,
    vat: !checked
  }, {
    headers: {
      Authorization: 'Bearer ' + result?.token,
  
     }
  }).then(res => {setIsOpenAlertAdd(true)
      setIsOpenForm(false)
       www()
       rrr()
      })
  .catch(err => {console.log(err)
    setError(err.response.status)})
  
}


const handleChange2 = (e) => {
  console.log("the value is: " + e.target.value);
  setPaymentMethod(e.target.value)
  
}

const handleChange1 = (e) => {
  console.log("the value is: " + e.target.value);
  setPaidOrNo(e.target.value)
  
}

const handleClose2 = () => {
  setIsOpenAlertAdd(false)
}

const handleClose3 = () => {
  setErrorMode(false)
  setError("")
}



const getInvoice = async (id) => {
  const res = await fetch(`https://nartina.com/api/user/get-invoice-by-id/${id}`);
  const result = await res.json();
  setInvoice(result)
  setIsOpenForm(true)
}

const getInvoice2 = async (id) => {
const res = await fetch(`https://nartina.com/api/user/get-invoice-by-id/${id}`);
const result = await res.json();
setInvoice(result)
setOpenNoteDialog(true)
}

const deleteNotes = async () => {
  axios.get("https://nartina.com/api/user/delete-invoice-notes/" + ide)
  .then(res => {setOpenNoteDialog(false)
    setNotes("")
    www()
    rrr()
    getInvoices()}).
  catch(err => console.log(err.response.data))
}

const handleIncomeYears = (e) => {
  setIncomeYear(e.target.value)
  console.log("--------------> " + incomeYear)
  setTimeout(()=> {
    yyy()
    sss()
  }, 400)
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

  

  const generatePdf = () => {
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
      doc.save("hebrew.pdf");

    })
  }


  const generatePdf2 = () => {
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

    })
  }

  const deleteTheInvoice = (id) => {
    setIde(id)
    setIsOpen(true)
  }

  const editInvoice = (id) => {
    setIde(id)
    getInvoice(id)
  }

  const getNotes = (id) => {
    setIde(id)
    getInvoice2(id)
  }


  const series2 = [
    {
      name: "קנייה",
      data: [Math.round(januarAmount), Math.round(februaryAmount), Math.round(marchAmount), Math.round(aprilAmount), Math.round(mayAmount), Math.round(juneAmount), Math.round(julyAmount), Math.round(augustAmount), Math.round(septemberAmount), Math.round(octoberAmount), Math.round(novemberAmount), Math.round(decemberAmount)]
    }
   
  ]

  const series3 = [
    {
      name: "לא שולם",
      data: [Math.round(januarAmountNotPaid), Math.round(februaryAmountNotPaid), Math.round(marchAmountNotPaid), Math.round(aprilAmountNotPaid), Math.round(mayAmountNotPaid), Math.round(juneAmountNotPaid), Math.round(julyAmountNotPaid), Math.round(augustAmountNotPaid), Math.round(septemberAmountNotPaid), Math.round(octoberAmountNotPaid), Math.round(novemberAmountNotPaid), Math.round(decemberAmountNotPaid)]
    }
   
  ]

  const image = "https://www.constellationenergy.com/content/dam/constellationenergy/hero-banner-image/Suppliers-Banner.png"


  return (
    <div className={`max-w-[1740px] mt-14 min-h-screen bg-gray-100 px-4 ${globalTheme != "light" && "bg-gray-700 dark"} ${hebrew ? "mr-0 airx:ml-64" : "mr-0 airx:mr-64"}`}>
      <Card extra={"items-center flex-col w-full h-full p-[16px] bg-cover dark:bg-gray-800 relative dark:top-2"}>
      {/* Background and profile */}
      <div
        // className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover bg-gradient-to-r from-cyan-500 to-blue-500"
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}  >
        <div className={`dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white ${supplier?.data?.type == "סחורה" ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' : supplier?.data?.type == "קבוע" ? 'bg-gradient-to-r from-blue-500 to-green-500' : supplier?.data?.type == "משתנה" ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-red-200'}`}>
          {/* <img
            className="h-full w-full rounded-full"
            src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png"
            alt=""
          /> */}
          <span class={`top-0 right-2 absolute  w-3.5 h-3.5 ${supplier?.data.active ? "bg-green-500" : "bg-red-500"} border-2 border-white dark:border-gray-800 rounded-full`}></span>
          <h1 className='font-mono text-white text-4xl font-semibold'>{supplier?.data.name.substring(0, 1)}</h1>
        </div>

      </div>
 
      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-[#373D3F] text-3xl font-bold dark:text-white">
        {supplier?.data.name}
        </h4>
        <h5 className="text-lg font-normal text-gray-500 dark:text-[#ccc] relative bottom-1">{supplier?.data.type}</h5>
        <Select onChange={handleIncomeYears} value={incomeYear} style={{ color: globalTheme == "light" ? '#374151' : 'white', fontWeight: 'bold', fontSize: '12px', textAlign: 'center', paddingTop: '11px', paddingBottom: '10px', backgroundColor: globalTheme == "light" ? 'white' : '#475569', border: '1px solid white'}} className='bg-white rounded-md text-center w-20 h-6 relative top-0.5 dark:top-1'>
            {years.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
          </Select> 
        {/* {roll ? <h1 className={`${supplier?.data.active ? "text-green-600" : "text-red-600"} text-xl font-mono font-semibold`}>{supplier?.data.active && !hebrew ? "פעיל" : !supplier?.data.active && !hebrew ? "לא פעיל" : supplier?.data.active && hebrew ? "active" : !supplier?.data.active && hebrew ? "not active" : ""}</h1> : <CircularProgress color="success" size={15}/>} */}
      </div>
 
      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14 relative bottom-2">
        {/* <div className="flex flex-col items-center justify-center relative top-1">
           <Select onChange={handleIncomeYears} value={incomeYear} style={{ color: '#374151', fontWeight: 'bold', fontSize: '12px', textAlign: 'center', paddingTop: '11px', paddingBottom: '10px', backgroundColor: 'white', border: '1px solid white'}} className='bg-white shadow-xl rounded-md text-center w-20 h-6'>
            {years.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
          </Select> 
          <p className="text-md font-normal text-gray-500">החלף שנה</p>
        </div> */}
        {/* <div className="flex flex-col items-center justify-center">
          <h1 className='text-gray-700 font-extrabold text-lg'>₪{Number(yearTotal).toLocaleString()}</h1>
          <p className="text-md font-normal text-gray-500">קניות החודש</p>
        </div> */}
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
    </Card>
    
      
      <div id='xxx' className='w-full mt-4 mx-auto sm:pl-4 sm:pr-3'>
        <div className="h-[395px] w-full mx-auto rounded-2xl bg-white dark:bg-gray-800 shadow mr-0 lg:mr-[185px] p-2 relative top-4">
          <div className='items-center justify-end w-full'>
          <div className='flex items-center justify-end space-x-2 relative right-4'>
              <h1 className='text-blue-500 font-mono font-semibold'>קניות</h1>
              <h1 className="text-[#373D3F] dark:text-[#ccc] flex justify-end font-bold ">{`${supplier?.data.name}`}</h1>
            </div>
          <h1 className="flex justify-end font-extralight text-gray-500 dark:text-gray-400 text-xs relative right-4">.טבלת קניות לפי חודשים מהספק</h1>
          <h1 className="flex justify-end font-extralight text-gray-500 dark:text-gray-400 text-xs relative right-4">.הטבלה משתנה בהתאם לחומר שהוזן למערכת</h1>
          </div>
          <div className='hidden mmu:block'>
            <Chart options={state2.options} series={series2} type="line" height={310} />
          </div>
          <div className='block mmu:hidden p-1'>
            <Chart options={state3.options} series={series2} type="line" height={310} />
          </div>
        </div>

        <div className="h-[395px] w-full mx-auto rounded-2xl bg-white dark:bg-gray-800 shadow mr-0 lg:mr-[185px] p-2 mt-14">
          {/* <NivoLineCustom arr={data}/> */}
          <div className='items-center justify-end w-full'>
            <div className='flex items-center justify-end space-x-2 relative right-4'>
              <h1 className='text-red-500 font-mono font-semibold'>לא שולם</h1>
              <h1 className="text-[#373D3F] dark:text-[#ccc] flex justify-end font-bold ">{`${supplier?.data.name}`}</h1>
            </div>
          {/* <h1 className="flex justify-end font-semibold relative right-4 text-red-600">לא שולם</h1> */}
          <h1 className="flex justify-end font-extralight text-gray-500 dark:text-gray-400 text-xs relative right-4">.טבלת חשבוניות שלא שולמו לספק לפי חודשים </h1>
          <h1 className="flex justify-end font-extralight text-gray-500 dark:text-gray-400 text-xs relative right-4">.הטבלה משתנה בהתאם לחומר שהוזן למערכת</h1>
          </div>
          <div className='hidden mmu:block'>
            <Chart options={state2.options} series={series3} type="line" height={310} />
          </div>
          <div className='block mmu:hidden p-1'>
            <Chart options={state3.options} series={series3} type="line" height={310} />
          </div>
        </div>
      </div>
      
      
      <h1 className='text-center font-mono text-blue-600 font-semibold mt-14 text-2xl mb-2'>{hebrew ? "current month invoices" : "חשבוניות חודש נוכחי"}</h1>

      <div className="w-full h-[380px] ml-1 mt-2 overflow-y-auto overflow-x-auto lg:overflow-hidden pr-4 pl-3 hidden md:block">
              {/* // chart goes here // invoicesCurrentMonth */}
              {isSSR ? (
               <LinearProgress />
            ) : (
              <>
              {hebrew ? (
          <table className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[87%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
          <thead className="bg-sky-700 sticky top-0 z-50">
            <tr>
            {/* <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">supplier name</th> */}
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">date</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">type</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">cheque date</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">invoice id</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">refund?</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">paid?</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">payment method</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">vat?</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">amount</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">notes</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">edit</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dataxx?.data.map((report, index) => (
              <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-blue-100' : ''}`}>
              {/* <td scope="col" className="px-1 text-center py-2 text-xs">{report.supplierName}</td> */}
              <td scope="col" className="px-1 text-center py-2 text-xs font-semibold text-blue-800">{report.date}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.supplierType}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.checkDate}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.invoiceId}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs font-semibold">{`${report.refund ? "refund" : "-"}`}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.paidOrNo}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.paymentMethod}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs font-semibold">{`${report.vat ? "yes" : "no vat"}`}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.amount}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className={`inline-flex text-xs leading-5 bg-purple-200 p-1 rounded-lg cursor-pointer `} onClick={()=> getNotes(report.id)}>
               <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 w-8 h-8 rounded-lg cursor-pointer md:ml-2 lg:ml-4" onClick={()=> editInvoice(report.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
            <div className="flex justify-center items-center bg-red-200 w-8 h-8 rounded-lg cursor-pointer md:ml-2 lg:ml-4" onClick={()=> deleteTheInvoice(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[85%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
      <thead className="bg-sky-700 sticky top-0 z-50">
        <tr>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מחק</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">ערוך</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הערות</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סכום</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">אמצעי תשלום</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מע"מ</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">?שולם</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">זיכוי</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מספר חשבונית</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך צ'ק</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סוג</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך</th>
          {/* <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם ספק</th> */}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {dataxx?.data.map((report, index) => (
          <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-sky-100' : ''}`}>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-red-200 w-8 h-8 rounded-lg cursor-pointer md:ml-2 lg:ml-4" onClick={()=> deleteTheInvoice(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 w-8 h-8 rounded-lg cursor-pointer md:ml-2 lg:ml-4" onClick={()=> editInvoice(report.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
            <div className={`inline-flex text-xs leading-5 bg-purple-200 p-1 rounded-lg cursor-pointer `} onClick={()=> getNotes(report.id)}>
               <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
              </div>
            </td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.amount}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.paymentMethod}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs font-semibold">{`${report.vat ? "כן" : 'ללא מע"מ'}`}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.paidOrNo}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs font-semibold">{`${report.refund ? "זיכוי" : "-"}`}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.invoiceId}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.checkDate}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.supplierType}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs font-semibold text-blue-800">{report.date}</td>
          {/* <td scope="col" className="px-1 text-center py-2 text-xs">{report.supplierName}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
        )}
              </>
            )}
      </div>
      <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {dataxx?.data.map(report => (
                // <div className={`p-4 ${globalTheme == "light" ? 'white-glassmorphism shadow rounded-lg ' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-0.5`}>
                <div className="p-4 bg-gray-900 hover:bg-gray-800 shadow rounded-lg flex flex-col space-y-1">
                <div className='flex items-center justify-between space-x-2 '>
                <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 text-xl px-4 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
                  <h1 className='text-lg'>{report.supplierType}</h1>
              </div>
                  <div className='dark:text-[#ccc] font-mono text-lg'>
                    {report.date}
                    </div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.supplierName}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>שם ספק</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.invoiceId}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>מס' חשבונית</div>
                </div>

                <div className={`flex items-center justify-end ${report.paidOrNo == "שולם" ? 'space-x-2' : 'space-x-0'}`}>
                <div scope="col" className={`px-2 py-1 text-end text-lg dark:text-[#ccc] tracking-wide ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-600 dark:text-red-500' fontSize='small'/>}</span></div>
                <div className='text-right dark:text-[#ccc]'>?האם שולם</div>
                </div>
                <div className={`flex items-center justify-end space-x-2 ${report.paidOrNo == "שולם" ? 'block' : 'hidden'}`}>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.paymentMethod}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>אמצעי תשלום</div>
                </div>
                <div className={`flex items-center justify-end space-x-2`}>
                <div scope="col" className={`px-2 py-1 text-center ${report.refund ? "text-green-500 font-bold dark:text-green-500" : "dark:text-[#ccc]"}`}>{`${report.refund ? "זיכוי" : "-"}`}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>זיכוי</div>
                </div>
                <div className='flex items-center justify-between space-x-4 relative top-1'>
                <div className='flex items-center justify-center space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(report.amount).toLocaleString()}</h1>
                  <h1 className='text-[#333] dark:text-[#ccc]'>סכום</h1>
                </div>
              <div className='flex items-center justify-center space-x-4'>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editInvoice(report.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
             <div className={`inline-flex text-xs leading-5 rounded-lg cursor-pointer px-1 py-1 ${report.notes != "" ? "bg-red-500 animate-pulse transition-all duration-300 ease-out" : 'dark:bg-slate-600'}`} onClick={()=> getNotes(report.id)}>
             <svg className='relative top-[1px]' width="24" height="24" viewBox="0 0 38 38" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.10714 0C3.75264 0 2.45362 0.538072 1.49585 1.49585C0.538072 2.45362 0 3.75264 0 5.10714V29.4643C0 30.8188 0.538072 32.1178 1.49585 33.0756C2.45362 34.0334 3.75264 34.5714 5.10714 34.5714H18.0714C17.5227 33.8418 17.0607 33.0508 16.6949 32.2143H5.10714C4.3778 32.2143 3.67832 31.9246 3.1626 31.4088C2.64687 30.8931 2.35714 30.1936 2.35714 29.4643V5.10714C2.35714 3.58914 3.58914 2.35714 5.10714 2.35714H29.4643C30.9823 2.35714 32.2143 3.58914 32.2143 5.10714V16.6949C33.0507 17.0602 33.8417 17.5216 34.5714 18.0699V5.10714C34.5714 3.75264 34.0334 2.45362 33.0756 1.49585C32.1178 0.538072 30.8188 0 29.4643 0H5.10714ZM8.64286 10.989C7.60094 10.989 6.60169 11.4029 5.86494 12.1397C5.12819 12.8764 4.71429 13.8757 4.71429 14.9176C4.71429 15.9595 5.12819 16.9587 5.86494 17.6955C6.60169 18.4322 7.60094 18.8461 8.64286 18.8461C9.68478 18.8461 10.684 18.4322 11.4208 17.6955C12.1575 16.9587 12.5714 15.9595 12.5714 14.9176C12.5714 13.8757 12.1575 12.8764 11.4208 12.1397C10.684 11.4029 9.68478 10.989 8.64286 10.989ZM7.07143 14.9176C7.07143 14.5008 7.23699 14.1011 7.53169 13.8064C7.82639 13.5117 8.22609 13.3461 8.64286 13.3461C9.05963 13.3461 9.45933 13.5117 9.75403 13.8064C10.0487 14.1011 10.2143 14.5008 10.2143 14.9176C10.2143 15.3343 10.0487 15.734 9.75403 16.0287C9.45933 16.3234 9.05963 16.489 8.64286 16.489C8.22609 16.489 7.82639 16.3234 7.53169 16.0287C7.23699 15.734 7.07143 15.3343 7.07143 14.9176ZM4.71429 25.9239C4.71429 24.8819 5.12819 23.8827 5.86494 23.1459C6.60169 22.4092 7.60094 21.9953 8.64286 21.9953C9.68478 21.9953 10.684 22.4092 11.4208 23.1459C12.1575 23.8827 12.5714 24.8819 12.5714 25.9239C12.5714 26.9658 12.1575 27.965 11.4208 28.7018C10.684 29.4385 9.68478 29.8524 8.64286 29.8524C7.60094 29.8524 6.60169 29.4385 5.86494 28.7018C5.12819 27.965 4.71429 26.9658 4.71429 25.9239ZM8.64286 24.3524C8.22609 24.3524 7.82639 24.518 7.53169 24.8127C7.23699 25.1074 7.07143 25.5071 7.07143 25.9239C7.07143 26.3406 7.23699 26.7403 7.53169 27.035C7.82639 27.3297 8.22609 27.4953 8.64286 27.4953C9.05963 27.4953 9.45933 27.3297 9.75403 27.035C10.0487 26.7403 10.2143 26.3406 10.2143 25.9239C10.2143 25.5071 10.0487 25.1074 9.75403 24.8127C9.45933 24.518 9.05963 24.3524 8.64286 24.3524ZM15.3214 12.5714C15.0089 12.5714 14.7091 12.6956 14.4881 12.9166C14.267 13.1377 14.1429 13.4374 14.1429 13.75C14.1429 14.0626 14.267 14.3624 14.4881 14.5834C14.7091 14.8044 15.0089 14.9286 15.3214 14.9286H28.6786C28.9912 14.9286 29.2909 14.8044 29.5119 14.5834C29.733 14.3624 29.8571 14.0626 29.8571 13.75C29.8571 13.4374 29.733 13.1377 29.5119 12.9166C29.2909 12.6956 28.9912 12.5714 28.6786 12.5714H15.3214ZM27.5 37.7143C30.209 37.7143 32.807 36.6381 34.7226 34.7226C36.6381 32.807 37.7143 30.209 37.7143 27.5C37.7143 24.791 36.6381 22.193 34.7226 20.2774C32.807 18.3619 30.209 17.2857 27.5 17.2857C24.791 17.2857 22.193 18.3619 20.2774 20.2774C18.3619 22.193 17.2857 24.791 17.2857 27.5C17.2857 30.209 18.3619 32.807 20.2774 34.7226C22.193 36.6381 24.791 37.7143 27.5 37.7143V37.7143ZM27.5 20.4286C27.7084 20.4286 27.9082 20.5114 28.0556 20.6587C28.2029 20.8061 28.2857 21.0059 28.2857 21.2143V26.7143H33.7857C33.9941 26.7143 34.194 26.7971 34.3413 26.9444C34.4887 27.0918 34.5714 27.2916 34.5714 27.5C34.5714 27.7084 34.4887 27.9082 34.3413 28.0556C34.194 28.2029 33.9941 28.2857 33.7857 28.2857H28.2857V33.7857C28.2857 33.9941 28.2029 34.194 28.0556 34.3413C27.9082 34.4887 27.7084 34.5714 27.5 34.5714C27.2916 34.5714 27.0918 34.4887 26.9444 34.3413C26.7971 34.194 26.7143 33.9941 26.7143 33.7857V28.2857H21.2143C21.0059 28.2857 20.8061 28.2029 20.6587 28.0556C20.5114 27.9082 20.4286 27.7084 20.4286 27.5C20.4286 27.2916 20.5114 27.0918 20.6587 26.9444C20.8061 26.7971 21.0059 26.7143 21.2143 26.7143H26.7143V21.2143C26.7143 21.0059 26.7971 20.8061 26.9444 20.6587C27.0918 20.5114 27.2916 20.4286 27.5 20.4286V20.4286ZM5.89286 4.71429C5.58028 4.71429 5.28051 4.83846 5.05948 5.05948C4.83846 5.28051 4.71429 5.58028 4.71429 5.89286C4.71429 6.20543 4.83846 6.50521 5.05948 6.72623C5.28051 6.94726 5.58028 7.07143 5.89286 7.07143H28.6786C28.9912 7.07143 29.2909 6.94726 29.5119 6.72623C29.733 6.50521 29.8571 6.20543 29.8571 5.89286C29.8571 5.58028 29.733 5.28051 29.5119 5.05948C29.2909 4.83846 28.9912 4.71429 28.6786 4.71429H5.89286Z"
          fill="#9ca3af"></path>
      </svg>
          </div>
              </div>
          
                </div>
              </div>
              ))}
            </div>
      <h1 className='text-center font-mono text-red-600 font-semibold text-2xl mt-8 mb-2'>{hebrew ? "unpaid invoices" : "חשבוניות שלא שולמו"}</h1>
      <div className="w-full h-[380px] ml-1 mt-2 overflow-y-auto overflow-x-auto lg:overflow-hidden pr-4 pl-3  hidden md:block">
      {/* // chart goes here // invoices */}
      {isSSR ? (
               <LinearProgress />
            ) : (
              <>
              {hebrew ? (
          <table className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[85%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
          <thead className="bg-sky-700 sticky top-0 z-50">
            <tr>
            {/* <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">supplier name</th> */}
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">date</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">type</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">cheque date</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">invoice id</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">refund?</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">paid?</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">payment method</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">vat?</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">amount</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">notes</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">edit</th>
            <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {datax?.data?.map((report, index) => (
              <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-blue-100' : ''}`}>
              {/* <td scope="col" className="px-1 text-center py-2 text-xs">{report.supplierName}</td> */}
              <td scope="col" className="px-1 text-center py-2 text-xs font-semibold text-blue-800">{report.date}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.supplierType}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.checkDate}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.invoiceId}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs font-semibold">{`${report.refund ? "refund" : "-"}`}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.paidOrNo}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.paymentMethod}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs font-semibold">{`${report.vat ? "yes" : "no vat"}`}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">{report.amount}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className={`inline-flex text-xs leading-5 bg-purple-200 p-1 rounded-lg cursor-pointer `} onClick={()=> getNotes(report.id)}>
               <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 w-8 h-8 rounded-lg cursor-pointer md:ml-2 lg:ml-4" onClick={()=> editInvoice(report.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
            <div className="flex justify-center items-center bg-red-200 w-8 h-8 rounded-lg cursor-pointer md:ml-2 lg:ml-4" onClick={()=> deleteTheInvoice(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
      <thead className="bg-sky-700 sticky top-0 z-50">
        <tr>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מחק</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">ערוך</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הערות</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סכום</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">אמצעי תשלום</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מע"מ</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">?שולם</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">זיכוי</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מספר חשבונית</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך צ'ק</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סוג</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך</th>
          {/* <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם ספק</th> */}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {datax?.data.map((report, index) => (
          <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-sky-100' : ''}`}>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-red-200 w-8 h-8 rounded-lg cursor-pointer md:ml-2 lg:ml-4" onClick={()=> deleteTheInvoice(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 w-8 h-8 rounded-lg cursor-pointer md:ml-2 lg:ml-4" onClick={()=> editInvoice(report.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs">
            <div className={`inline-flex text-xs leading-5 bg-purple-200 p-1 rounded-lg cursor-pointer `} onClick={()=> getNotes(report.id)}>
               <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${report.notes != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
              </div>
            </td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.amount}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.paymentMethod}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs font-semibold">{`${report.vat ? "כן" : 'ללא מע"מ'}`}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.paidOrNo}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs font-semibold">{`${report.refund ? "זיכוי" : "-"}`}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.invoiceId}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.checkDate}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs">{report.supplierType}</td>
          <td scope="col" className="px-1 text-center py-2 text-xs font-semibold text-blue-800">{report.date}</td>
          {/* <td scope="col" className="px-1 text-center py-2 text-xs">{report.supplierName}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
        )}
              </>
            )}
      </div>
      <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {datax?.data.map(report => (
                // <div className={`p-4 ${globalTheme == "light" ? 'white-glassmorphism shadow rounded-lg ' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-0.5`}>
                <div className="p-4 bg-gray-900 hover:bg-gray-800 shadow rounded-lg flex flex-col space-y-1">
                <div className='flex items-center justify-between space-x-2 '>
                <div className={`${report.supplierType == "סחורה" ? "bg-red-200 dark:bg-yellow-500 text-red-600 text-xl px-4 dark:text-gray-900 tracking-wide" : report?.supplierType == "משתנה" ? "bg-blue-200 dark:bg-slate-600 text-blue-600 dark:text-blue-500" : report?.supplierType == "קבוע" ? "bg-green-200 dark:bg-slate-600 text-green-600" : "bg-gray-200 dark:bg-slate-600 text-gray-600"} py-[1px] px-1 text-xs font-semibold rounded-md`}>
                  <h1 className='text-lg'>{report.supplierType}</h1>
              </div>
                  <div className='dark:text-[#ccc] font-mono text-lg'>
                    {report.date}
                    </div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.supplierName}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>שם ספק</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.invoiceId}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>מס' חשבונית</div>
                </div>

                <div className={`flex items-center justify-end ${report.paidOrNo == "שולם" ? 'space-x-2' : 'space-x-0'}`}>
                <div scope="col" className={`px-2 py-1 text-end text-lg dark:text-[#ccc] tracking-wide ${report.paidOrNo == "שולם" && 'line-through pr-1'}`}>{report.paidOrNo}<span>{report.paidOrNo == "שולם" ? <CheckIcon className='text-green-500' fontSize='small'/> : <CloseIcon className='text-red-600 dark:text-red-500' fontSize='small'/>}</span></div>
                <div className='text-right dark:text-[#ccc]'>?האם שולם</div>
                </div>
                <div className={`flex items-center justify-end space-x-2 ${report.paidOrNo == "שולם" ? 'block' : 'hidden'}`}>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.paymentMethod}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>אמצעי תשלום</div>
                </div>
                <div className={`flex items-center justify-end space-x-2`}>
                <div scope="col" className={`px-2 py-1 text-center ${report.refund ? "text-green-500 font-bold dark:text-green-500" : "dark:text-[#ccc]"}`}>{`${report.refund ? "זיכוי" : "-"}`}</div>
                <div className='text-right text-[#333] dark:text-[#ccc]'>זיכוי</div>
                </div>
                <div className='flex items-center justify-between space-x-4 relative top-1'>
                <div className='flex items-center justify-center space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(report.amount).toLocaleString()}</h1>
                  <h1 className='text-[#333] dark:text-[#ccc]'>סכום</h1>
                </div>
              <div className='flex items-center justify-center space-x-4'>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editInvoice(report.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
             <div className={`inline-flex text-xs leading-5 rounded-lg cursor-pointer px-1 py-1 ${report.notes != "" ? "bg-red-500 animate-pulse transition-all duration-300 ease-out" : 'dark:bg-slate-600'}`} onClick={()=> getNotes(report.id)}>
             <svg className='relative top-[1px]' width="24" height="24" viewBox="0 0 38 38" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.10714 0C3.75264 0 2.45362 0.538072 1.49585 1.49585C0.538072 2.45362 0 3.75264 0 5.10714V29.4643C0 30.8188 0.538072 32.1178 1.49585 33.0756C2.45362 34.0334 3.75264 34.5714 5.10714 34.5714H18.0714C17.5227 33.8418 17.0607 33.0508 16.6949 32.2143H5.10714C4.3778 32.2143 3.67832 31.9246 3.1626 31.4088C2.64687 30.8931 2.35714 30.1936 2.35714 29.4643V5.10714C2.35714 3.58914 3.58914 2.35714 5.10714 2.35714H29.4643C30.9823 2.35714 32.2143 3.58914 32.2143 5.10714V16.6949C33.0507 17.0602 33.8417 17.5216 34.5714 18.0699V5.10714C34.5714 3.75264 34.0334 2.45362 33.0756 1.49585C32.1178 0.538072 30.8188 0 29.4643 0H5.10714ZM8.64286 10.989C7.60094 10.989 6.60169 11.4029 5.86494 12.1397C5.12819 12.8764 4.71429 13.8757 4.71429 14.9176C4.71429 15.9595 5.12819 16.9587 5.86494 17.6955C6.60169 18.4322 7.60094 18.8461 8.64286 18.8461C9.68478 18.8461 10.684 18.4322 11.4208 17.6955C12.1575 16.9587 12.5714 15.9595 12.5714 14.9176C12.5714 13.8757 12.1575 12.8764 11.4208 12.1397C10.684 11.4029 9.68478 10.989 8.64286 10.989ZM7.07143 14.9176C7.07143 14.5008 7.23699 14.1011 7.53169 13.8064C7.82639 13.5117 8.22609 13.3461 8.64286 13.3461C9.05963 13.3461 9.45933 13.5117 9.75403 13.8064C10.0487 14.1011 10.2143 14.5008 10.2143 14.9176C10.2143 15.3343 10.0487 15.734 9.75403 16.0287C9.45933 16.3234 9.05963 16.489 8.64286 16.489C8.22609 16.489 7.82639 16.3234 7.53169 16.0287C7.23699 15.734 7.07143 15.3343 7.07143 14.9176ZM4.71429 25.9239C4.71429 24.8819 5.12819 23.8827 5.86494 23.1459C6.60169 22.4092 7.60094 21.9953 8.64286 21.9953C9.68478 21.9953 10.684 22.4092 11.4208 23.1459C12.1575 23.8827 12.5714 24.8819 12.5714 25.9239C12.5714 26.9658 12.1575 27.965 11.4208 28.7018C10.684 29.4385 9.68478 29.8524 8.64286 29.8524C7.60094 29.8524 6.60169 29.4385 5.86494 28.7018C5.12819 27.965 4.71429 26.9658 4.71429 25.9239ZM8.64286 24.3524C8.22609 24.3524 7.82639 24.518 7.53169 24.8127C7.23699 25.1074 7.07143 25.5071 7.07143 25.9239C7.07143 26.3406 7.23699 26.7403 7.53169 27.035C7.82639 27.3297 8.22609 27.4953 8.64286 27.4953C9.05963 27.4953 9.45933 27.3297 9.75403 27.035C10.0487 26.7403 10.2143 26.3406 10.2143 25.9239C10.2143 25.5071 10.0487 25.1074 9.75403 24.8127C9.45933 24.518 9.05963 24.3524 8.64286 24.3524ZM15.3214 12.5714C15.0089 12.5714 14.7091 12.6956 14.4881 12.9166C14.267 13.1377 14.1429 13.4374 14.1429 13.75C14.1429 14.0626 14.267 14.3624 14.4881 14.5834C14.7091 14.8044 15.0089 14.9286 15.3214 14.9286H28.6786C28.9912 14.9286 29.2909 14.8044 29.5119 14.5834C29.733 14.3624 29.8571 14.0626 29.8571 13.75C29.8571 13.4374 29.733 13.1377 29.5119 12.9166C29.2909 12.6956 28.9912 12.5714 28.6786 12.5714H15.3214ZM27.5 37.7143C30.209 37.7143 32.807 36.6381 34.7226 34.7226C36.6381 32.807 37.7143 30.209 37.7143 27.5C37.7143 24.791 36.6381 22.193 34.7226 20.2774C32.807 18.3619 30.209 17.2857 27.5 17.2857C24.791 17.2857 22.193 18.3619 20.2774 20.2774C18.3619 22.193 17.2857 24.791 17.2857 27.5C17.2857 30.209 18.3619 32.807 20.2774 34.7226C22.193 36.6381 24.791 37.7143 27.5 37.7143V37.7143ZM27.5 20.4286C27.7084 20.4286 27.9082 20.5114 28.0556 20.6587C28.2029 20.8061 28.2857 21.0059 28.2857 21.2143V26.7143H33.7857C33.9941 26.7143 34.194 26.7971 34.3413 26.9444C34.4887 27.0918 34.5714 27.2916 34.5714 27.5C34.5714 27.7084 34.4887 27.9082 34.3413 28.0556C34.194 28.2029 33.9941 28.2857 33.7857 28.2857H28.2857V33.7857C28.2857 33.9941 28.2029 34.194 28.0556 34.3413C27.9082 34.4887 27.7084 34.5714 27.5 34.5714C27.2916 34.5714 27.0918 34.4887 26.9444 34.3413C26.7971 34.194 26.7143 33.9941 26.7143 33.7857V28.2857H21.2143C21.0059 28.2857 20.8061 28.2029 20.6587 28.0556C20.5114 27.9082 20.4286 27.7084 20.4286 27.5C20.4286 27.2916 20.5114 27.0918 20.6587 26.9444C20.8061 26.7971 21.0059 26.7143 21.2143 26.7143H26.7143V21.2143C26.7143 21.0059 26.7971 20.8061 26.9444 20.6587C27.0918 20.5114 27.2916 20.4286 27.5 20.4286V20.4286ZM5.89286 4.71429C5.58028 4.71429 5.28051 4.83846 5.05948 5.05948C4.83846 5.28051 4.71429 5.58028 4.71429 5.89286C4.71429 6.20543 4.83846 6.50521 5.05948 6.72623C5.28051 6.94726 5.58028 7.07143 5.89286 7.07143H28.6786C28.9912 7.07143 29.2909 6.94726 29.5119 6.72623C29.733 6.50521 29.8571 6.20543 29.8571 5.89286C29.8571 5.58028 29.733 5.28051 29.5119 5.05948C29.2909 4.83846 28.9912 4.71429 28.6786 4.71429H5.89286Z"
          fill="#9ca3af"></path>
      </svg>
          </div>
              </div>
          
                </div>
              </div>
              ))}
            </div>


      <Dialog open={open}>
        <DialogTitle></DialogTitle>
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>האם למחוק את החשבונית?</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={deleteInvoice}>מחק</button>
        </div>
        {/* </DialogActions> */}
    </Dialog>
    <Dialog open={openForm}>
      <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setIsOpenForm(false)}/>
        </div>
        <h1 className={`text-center ${hebrew ? "font-serif text-slate-600 text-3xl" : "font-mono text-amber-700 text-3xl"}`}>{hebrew ? "update invoice" : "עדכן חשבונית"}</h1>
        <DialogContent>
        <form onSubmit={printValues} className='flex space-x-4'>
                <div className='flex flex-col space-y-2'>
              
         <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "payment method" : "צורת תשלום"}</InputLabel>
        <Select disabled={paidOrNo == "לא שולם" || refundInvice} onChange={handleChange2} className='bg-white text-right w-52 focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.paymentMethod}>
        
        {arr5.map(a => (
            <MenuItem value={a}>{a}</MenuItem>
        ))}
     </Select>
     
     <label className={`flex ${hebrew ? "justify-start" : "justify-end"} text-blue-500 font-mono`}>{hebrew ? "cheque date" : "תאריך צ'ק"}</label>
         <TextField disabled={paymentMethod != "צ'ק"} type='date' className='bg-white focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.checkDate} placeholder='add date' onChange={e => setCheckDate(e.target.value)}/>
         {hebrew ? (
<TextField InputLabelProps={{
shrink: true,
}} disabled={paymentMethod != "צ'ק"} label="cheque number" type='text' className='bg-white focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.checkNumber} onChange={e => setCheckNumber(e.target.value)}/>

         ) : (
          <>
          <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                    <div dir="rtl">
         <TextField InputLabelProps={{
        shrink: true,
      }} disabled={paymentMethod != "צ'ק"} label="מספר צ'ק" type='text' className='bg-white focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.checkNumber} onChange={e => setCheckNumber(e.target.value)}/>
         </div>
                  </ThemeProvider>
                  </CacheProvider>
          </>
         )}
         {/* <TextareaAutosize type='text' placeholder='הערות' className='bg-white shadow-xl placeholder:text-right text-right border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.notes} onChange={e => setNotes(e.target.value)}/> */}
         {hebrew ? (
                   <TextareaAutosize type='text' placeholder='הערות' className='bg-white border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.notes != "אין הערות" ? invoice?.notes : "no notes"} onChange={e => setNotes(e.target.value)}/>
         ) : (
          <TextareaAutosize type='text' placeholder='הערות' className='bg-white placeholder:text-right text-right border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.notes != "אין הערות" ? invoice?.notes : "אין הערות"} onChange={e => setNotes(e.target.value)}/>
         )}
         {hebrew ? (
          <div className='flex items-center space-x-1 justify-start'>
         <input type='checkbox' defaultChecked={invoice?.refund} onChange={(e)=> setCheckedRefund(e.target.checked)}/>
          <label>refund invoice</label>
        </div>
         ) : (
          <div className='flex items-center space-x-1 justify-end'>
    <label>חשבונית זיכוי</label>
    <input type='checkbox' defaultChecked={invoice?.refund} onChange={(e)=> setCheckedRefund(e.target.checked)}/>
  </div>
         )}
          {hebrew ? (
            <div className='flex items-center space-x-1 justify-start'>
         <input type='checkbox' defaultChecked={!invoice?.vat} onChange={(e)=> setChecked(e.target.checked)}/>
            <label>no vat</label>
            </div>
          ) : (
            <div className='flex items-center space-x-1 justify-end'>
         <label>ללא מע"מ</label>
         <input type='checkbox' defaultChecked={!invoice?.vat} onChange={(e)=> setChecked(e.target.checked)}/>
         </div>
          )}
         <button type='submit' className='bg-blue-200 px-2 py-[7px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>{hebrew ? "update" : "עדכן חשבונית"}</button>
                  {/* <button type='button' className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpenx(false)} >בטל</button> */}
                </div>

                <div className='flex flex-col space-y-2'>
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "supllier name" : "שם ספק (לא ניתן לערוך)"}</InputLabel>
                {hebrew ? (
                  <>
                <TextField type='text' label='supplier name' value={invoice?.supplierName} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1'/>
                  </>
                ) : (
                  <>
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                    <div dir="rtl">
                <TextField type='text' label='שם ספק' value={invoice?.supplierName} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1'/>
                </div>
                  </ThemeProvider>
                  </CacheProvider>
                  </>
                )}
                  <label className={`flex ${hebrew ? "justify-start" : "justify-end"} text-blue-500 font-mono`}>{hebrew ? "invoice date" : "תאריך חשבונית"}</label>
  <TextField type='date' defaultValue={invoice?.date} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder='add date' onChange={e => setDate(e.target.value)}/>
  {hebrew? (  
<TextField type='text' label='invoice amount' defaultValue={invoice?.amount} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder='סכום חשבונית' onChange={e => setAmount(e.target.value)}/>

  ) : (
    <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                    <div dir="rtl">
  <TextField type='text' label='סכום חשבונית' defaultValue={invoice?.amount} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder='סכום חשבונית' onChange={e => setAmount(e.target.value)}/>
  </div>
                  </ThemeProvider>
                  </CacheProvider>
  )}
                 {hebrew ? (
 <TextField type='number' label='invoice number' defaultValue={invoice?.invoiceId} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder="מס' חשבונית" onChange={e => setInvoiceId(e.target.value)}/>
 
                 ) : (
                  <CacheProvider value={cacheRtl}>
                  <ThemeProvider theme={theme}>
                  <div dir="rtl">
<TextField type='number' label='מספר חשבונית' defaultValue={invoice?.invoiceId} className='bg-white focus:outline-none focus:ring focus:border-blue-500 p-2 mt-1' placeholder="מס' חשבונית" onChange={e => setInvoiceId(e.target.value)}/>
</div>
                </ThemeProvider>
                </CacheProvider>
                 )}
                  <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "is paid?" : "?האם שולם"}</InputLabel>
        <Select disabled={refundInvice} onChange={handleChange1} className='bg-white text-right focus:outline-none focus:ring focus:border-blue-500 mt-1' defaultValue={invoice?.paidOrNo}>
        
            {arr1.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
         </Select>

                  {/* <button type='submit' className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>הכנס חשבונית</button> */}
                </div>
              </form>
        </DialogContent>
       
    </Dialog>
    {/* <Dialog open={openNoteDialog}>
        <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setOpenNoteDialog(false)}/>
        </div>        
            <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{invoice?.notes}</h1>
            {invoice?.notes != "אין הערות" && (
              <div className='flex flex-col items-center justify-center pb-2'>
                <h1 className='font-mono text-red-600'>מחיקת הערה</h1>
                <div className="flex items-center justify-center bg-red-100 p-1 w-fit h-fit rounded-lg cursor-pointer" onClick={deleteNotes}>
                  <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
                </div>
              </div>
            )}
    </Dialog> */}
    <Dialog open={openNoteDialog}>
        <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setOpenNoteDialog(false)}/>
        </div>      
        {hebrew ? (
          <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{invoice?.notes != "" ? invoice?.notes : "no notes"}</h1>
        ) : (
          <h1 className='text-center text-2xl px-10 pb-6 pt-1 font-mono text-gray-800'>{invoice?.notes != "" ? invoice?.notes : "אין הערות"}</h1>

        )}  
            {invoice?.notes != "" && (
              <div className='flex flex-col items-center justify-center pb-2'>
                <h1 className='font-mono text-red-600'>מחיקת הערה</h1>
                <div className="flex items-center justify-center bg-red-100 p-1 w-fit h-fit rounded-lg cursor-pointer" onClick={deleteNotes}>
                  <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
                </div>
              </div>
            )}
    </Dialog>
    <Snackbar open={openAlertAdd} autoHideDuration={10000} onClose={handleClose2} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose2}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? 'successfully update the invoice' : 'חשבונית עודכנה בהצלחה'}   
                  </Alert>
      </Snackbar>
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
      {/* <h1 className='hidden md:inline text-blue-700 font-mono'>{yearState ? new Date().getFullYear() : new Date().getFullYear() -1}</h1> */}
      <h1 className='hidden md:inline text-blue-700 font-mono'>{incomeYear}</h1>
      <div className='flex justify-center items-center space-x-1'>
        <h1 className='text-green-600 font-mono text-lg'>{yearTotal}</h1>
        <h1 className='font-mono text-sm text-[#333333]'>NIS</h1>
      </div>
        </>
      ) : (
        <>
       
        <div className='flex items-center justify-center space-x-1'>
          {/* <h1 className='hidden md:inline text-blue-700 font-mono'>{yearState ? new Date().getFullYear() : new Date().getFullYear() -1}</h1> */}
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

      <Snackbar open={errorMode} autoHideDuration={20000} onClose={handleClose3} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose3}
          severity="error"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
             יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SupplierReports

