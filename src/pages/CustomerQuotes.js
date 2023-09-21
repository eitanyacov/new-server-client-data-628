import React, { useState, useEffect, useContext} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Snackbar, Alert} from '@mui/material'
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PrintIcon from '@mui/icons-material/Print';
import fileDownload from 'js-file-download';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { ThemeContext } from "../App";
import axios from 'axios';
import { useQuery } from 'react-query'




const CustomerQuotes = () => {
    const [user, setUser] = useState({})
    const [isSSRE, setIsSSRE] = useState(true);
    const [isSSR, setIsSSR] = useState(true);
    const [open, setIsOpen] = useState(false)
    const [id, setId] = useState();
    const [ide, setIde] = useState();
    const [alert, setAlert] = useState(false);
    const [pdfFile, setPdfFile]=useState(null);
    const [customer, setCustomer] = useState({})
    const [customerName, setCustomerName] = useState()
    // const [isPermanentModel, setIsPermanentModel] = useState();
    const [active, setActive] = useState();
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")  
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [customers, setCustomers] = useState([])
    const [field, setField] = useState("")
    const [windowHeight, setWindowHeight] = useState(0);
    const [xxx, setXxx] = useState(false)
    const [scroll, setScroll] = useState(false)




    const { customerId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const { hebrew } = useContext(ThemeContext)


    const screen = window.screen.availWidth
    // const screenHeight = window.screen.availHeight

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

    let resizeWindow = () => {
      // setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
      setAlert(true);
    }, []);

    useEffect(() => {
      setTimeout(() => {
        setIsSSR(false);
      }, 200)
      
    }, []);


    // const getCustomerQuotes = () => {
    //   const id = result?.id
    //   return axios.get("https://nartina.com/api/file/all-quotes-per-customer/" + result?.id + "/" + customer?.name)
    // }
    
    // const {data, refetch} = useQuery('customer-quotes', ()=> getCustomerQuotes(),
    //   {
    //     // enabled: !!supplier?.name,
    //     enabled: !!customer?.name,
    //     // staleTime: 300000
    //     refetchOnMount: false,
    //     refetchOnWindowFocus:false
   
    //   }) 

      const getCustomerQuotes = () => {
        
        return axios.get("https://nartina.com/api/user/get-customer-quotes/" + customerId)
      }
      
      const {data, refetch} = useQuery('customer-quotes', ()=> getCustomerQuotes(),
        {
          // enabled: !!supplier?.name,
          // enabled: !!customer?.name,
          // staleTime: 300000
          refetchOnMount: true,
          refetchOnWindowFocus:false
     
        }) 

    useEffect(() => {
      setTimeout(()=> {
        setXxx(true)
      }, 1000)
    })

    useEffect(()=> {
      setCustomers(data?.data)
  }, [data?.data])
  
    useEffect(() => {
      resizeWindow();
      console.log(window.innerHeight)
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);  
    }, [windowHeight, window.innerHeight]);

    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
        // getSuppliers()
        
    }, [])

    useEffect(() => {
      setTimeout(() => {
        setIsSSRE(false);
      }, 1200)
      
    }, [isSSRE]);
  

    useEffect(()=> {
        axios.get("https://nartina.com/api/user/customer-by-id/" + customerId)
        .then(res => setCustomer(res.data))   
        .catch(err => console.log(err))
         
     }, [customerId])



      const deleteInvoice = () => {
        axios.delete("https://nartina.com/api/file/delete-quote/" + id)
          .then(res => {console.log(res.data)
          window.location.reload()})
          .catch(err => console.log(err))
      }

      const printQuote = (id) => {
        let filename = new Date().toLocaleDateString().concat("-" + Math.floor((Math.random() * 1000)).toString())
        axios.get("https://nartina.com/api/file/pdf/generate/" + id + "/" + user?.id, {
            responseType: 'blob',
          }).then(res => {
            fileDownload(res.data, filename + ".pdf");
          });
      }

      const deleteQuote = (id) => {
        setId(id)
        setIsOpen(true)
      }
     
      const handleCloseAlert = () => {
        setAlert(false)
      }

  return (
    // <div className={`w-[99%] md:[78%] lg:w-[99%] air:w-[99%] airx:w-[85%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%] ${hebrew ? "airx:ml-[185px]" : "ml-[6px]"} mt-[6px] overflow-y-scroll scrollbar h-4/5 lg:h-5/6 fixed `} > 
    <div class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14`}>

        {isSSR ? (
        <LinearProgress />
      ) : (
        <>
        <div className='overflow-y-scroll scrollbar pr-[6px] overflow-x-auto h-full hidden md:block'>
        {hebrew ? (
          <table className="min-w-full divide-y border-[#ccc] border-b-2 divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
          <thead className="bg-sky-700 sticky top-0 z-50">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">customer name</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">quote date</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">quote number</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">quote amount</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">print quote</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">delete quote</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.data?.map((report, index) => (
              <tr key={report.id} className={`border ${index % 2 === 0 ? 'bg-gray-100' : ''} hover:bg-blue-50`}>
              <td scope="col" className="px-1 text-center py-2 text-md font-semibold text-[#333] font-mono">{report.companyName}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono font-semibold text-blue-800">{report.date}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono">{report.quoteId}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs md:text-sm font-mono">{report.amount}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-blue-200 w-8 h-8 rounded-lg cursor-pointer ml-2 xs:ml-0 sm:ml-3 md:ml-6 lg:ml-12 airx:ml-8" onClick={()=> alert(report.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
              </td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-red-200 w-8 h-8 rounded-lg cursor-pointer ml-2 xs:ml-0 sm:ml-3 md:ml-6 lg:ml-12 airx:ml-8" onClick={()=> alert(report.id)}>
                <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              </td>
              <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 py-2 px-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/quotes/${report?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[10px]'>quote details</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 font-semibold text-[12px]'>details</h1>
              </div>
            </td>             
            
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <table className="min-w-full divide-y border-[#ccc] border-b-2 divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
      <thead className="bg-sky-700 sticky top-0 z-50">
        <tr>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">פרטי הצעת מחיר</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מחק הצעה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הדפס הצעה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סכום הצעה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מספר הצעת מחיר</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">תאריך הצעה</th>
          <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שם לקוח</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
       
        {data?.data?.map((report, index) => (
                <tr key={customer.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
                <td scope="col" className="px-1 text-center py-2 text-xs">
              <div className="flex justify-center items-center bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 py-2 px-0 rounded-lg cursor-pointer" onClick={()=> navigate(`/quotes/${report?.id}`)}>
               <h1 className='hidden ipad:inline-flex text-blue-600 hover:text-blue-700 font-semibold text-[10px]'>פרטי הצעה</h1>
               <h1 className='ipad:hidden text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[12px]'>פרטים</h1>
              </div>
            </td>
             <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> deleteQuote(report.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> printQuote(report.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
          <td scope="col" className="px-1 text-center py-2 text-md font-mono">{Number(report.amount).toLocaleString()}</td>
          <td scope="col" className="px-1 text-center py-2 text-md font-mono">{report.quoteId}</td>
          <td scope="col" className="px-1 text-center py-2 text-md font-mono">{report.date}</td>
          <td scope="col" className="px-1 text-center py-2 text-md font-mono font-semibold text-gray-600 dark:text-[#ccc]">{report.customerName}</td>
          </tr>
        ))}
      </tbody>
    </table>
        )}
    </div>
    <div className='grid grid-cols-1 gap-3 md:hidden px-4 py-2 dark'>
              {data?.data.map(receipt => (
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
                <div className='text-right text-[#333] text-lg dark:text-[#ccc]'>תאריך הצעה</div>
                </div>
                </div>
                
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{receipt.quoteId}</div>
                <div className='text-right dark:text-[#ccc]'>מספר הצעה</div>
                </div>
                
                <div className='flex items-center justify-between space-x-4 relative top-1'>
                <div className='flex items-center justify-center space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(receipt.amount).toLocaleString()}</h1>
                  <h1 className='text-[#333] dark:text-[#ccc]'>סכום</h1>
                </div>
                <div className='flex items-center justify-center space-x-5'>
              <div className="flex justify-center items-center bg-gray-300 dark:bg-slate-600 hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer" onClick={()=> navigate(`/quotes/${receipt?.id}`)}>
                <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px] xs:hidden'>פרטי הצעה</h1>
                <h1 className='text-blue-600 hover:text-blue-700 dark:text-blue-500 font-semibold text-[10px] hidden xs:inline'>פרטי הצעת מחיר</h1>
              </div>
              
            <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> deleteQuote(receipt.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 dark:text-red-500'/>
              </div>
            <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> printQuote(receipt?.id)}>
               <PrintIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-500'/>
              </div>
                </div>
              
                </div>
              </div>
              ))}
            </div>
        </>
      )}
       
        <Dialog open={open}>
        {/* <DialogTitle variant='h6'>מחיקת חשבונית</DialogTitle> */}
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>האם למחוק את ההצעה ?</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={deleteInvoice}>מחק</button>
        </div>
        {/* </DialogActions> */}
    </Dialog>

    <Snackbar open={alert} autoHideDuration={10000} onClose={handleCloseAlert} anchorOrigin={{vertical: 'buttom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleCloseAlert}
          severity="info"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? <>
          customer quotes  
          </> : <>
          הצעות מחיר שנשלחו ללקוח
          </>}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CustomerQuotes