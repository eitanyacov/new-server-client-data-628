import React, { useState, useEffect, useContext, useRef } from 'react';
import { useQuery } from 'react-query'
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, TextField, DialogActions, DialogTitle, Alert, Snackbar } from '@mui/material'
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import ReactToPrint  from 'react-to-print';
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { PaginationItem } from '@mui/material';
// import { styled } from '@mui/material/styles';
import { ThemeContext } from "../App";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Swal from 'sweetalert2'



const Roster = () => {
    const [workers, setWorkers] = useState([]);
    const [error, setError] = useState([]);
    const [isSSR, setIsSSR] = useState(true);
    const [errorRes, setErrorRes] = useState([]);
    const [errors, setErrors] = useState()
    const [workerId, setWorkerId] = useState();
    const [workerFullName, setWorkerFullName] = useState("")
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [name, setName] = useState("")
    const [date1, setDate1] = useState("")
    const [date2, setDate2] = useState("")
    const [date3, setDate3] = useState("")
    const [date4, setDate4] = useState("")
    const [date5, setDate5] = useState("")
    const [date6, setDate6] = useState("")
    const [date7, setDate7] = useState("")
    const [mapState, setMapState] = useState(new Map());
    const [mapState2, setMapState2] = useState(new Map());
    const [openDates, setOpenDates] = useState(false);
    const [openDates2, setOpenDates2] = useState(false);
    const [flag, setFlag] = useState(false);
    const [action, setAction] = useState(false);
    const [page, setPage] = useState(0);
    // const [windowWidth, setWindowWidth] = useState(0);
    const [mode, setMode] = useState(false);
    const [spin, setSpin] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [rosters, setRosters] = useState([])
    const [ide, setIde] = useState();
    // const [addAlert, setAddAlert] = useState(false)
    const [dialog, setDialog] = useState(false)


    const { hebrew, globalTheme } = useContext(ThemeContext)
    const componentRef = useRef();

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

    useEffect(()=> {
      const id = result?.id
      axios.get(`https://nartina.com/api/user/workers-rosters/${id}`)
      .then(res => setMapState(res.data))
      .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      setTimeout(() => {
        setIsSSR(false);
      }, 200)
      
    }, []);

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

    const getData = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/get-user-rosters/${id}/${page}/150/startDate`)
    }
    
    const {data, refetch} = useQuery('rosters-map', ()=> getData(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: false,
        refetchOnWindowFocus:false
   
      })

      const getDates = (e) => {
        e.preventDefault();
        axios.get("https://nartina.com/api/user/rosters-between/" + result?.id + "/startDate/0/150/" + date1 + "/" + date2)
        .then(res => {console.log(res.data)
        setRosters(res.data)
        setFlag(true)
        setOpenDates(false)})
        .catch(err => console.log(err))
      }

      const getDates2 = (e) => {
        e.preventDefault();
        axios.get("https://nartina.com/api/user/workers-rosters-2/" + result?.id + "/" + date1 + "/" + date2 + "/" + date3 + "/" + date4 + "/" + date5 + "/" + date6 + "/" + date7)
        .then(res => {setMapState2(res.data)
        setMode(true)})
        .catch(err => console.log(err))
        .finally(setOpenDates2(false))
        
      }


    const getWorkers = () => {
        axios.get(`https://nartina.com/api/user/all-workers/${result?.id}`)
        .then(res => setWorkers(res.data))
        .catch(err => console.log(err))
      }

      const handleChangeRoster = (e) => {
        console.log("the value is: " + e.target.value);
        setWorkerFullName(e.target.value)
        const selectedOption = e.target.options[e.target.selectedIndex];
        const myValue = selectedOption.getAttribute("data-my-value");
        setWorkerId(myValue)
        console.log("Selected value: " + myValue);
        
      }

      const openForm = () => {
        getWorkers()
        setTimeout(()=> {
          setOpenDialog(true)
        }, 300)
      }

      const closeFormValidation = () => {
        setName("")
        setWorkerFullName("")
        setStartDate("")
        setEndDate("")
        setOpenDialog(false)
      }


      const handleAlert = (id) => {
        // setIde(id)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: '?אתם בטוחים',
      text: "!לא ניתן יהיה לשחזר את הדו''ח",
      icon: 'אזהרה',
      showCancelButton: true,
      confirmButtonText: '!כן מחק',
      cancelButtonText: '!לא למחוק',
      reverseButtons: true
    }).then((results) => {
      if (results.isConfirmed) {
        axios.delete("https://nartina.com/api/user/delete-roster/" + id, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        })
        .then(res => {
        console.log(res.data)
          refetch()
          swalWithBootstrapButtons.fire(
            '!נמחק',
            'הדו"ח נמחק בהצלחה.',
            'success'
          )
          // localStorage.setItem('restaurant', true)
        })
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
          'פעולה בוטלה הדו"ח לא נמחק :)',
          'error'
        )
      }
    })
  }

      // const closeFormValidation2 = () => {
      //   setDate1("")
      //   setDate2("")
      //   setOpenDates(false)
      // }

      const addRoster = (e) => {
        e.preventDefault();
        setLoading(true)
        // if(workerFullName == "" || date == "" || start == "" || end == ""){
        //   setErrorRes("שדות חובה חסרים")
        //   return
        // }
          axios.post("https://nartina.com/api/user/add-roster/" + result?.id + "/" + workerId , {
          startDate,
          endDate,
          name: workerFullName,
          
        }, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        }).then(res => {
            refetch()
            setOpenDialog(false)
            Swal.fire("!הצלחה", '! סידור עבודה הוכנס בהצלחה', "success")
            closeFormValidation()
            setLoading(false)
            // setAddAlert(true)
           }) 
         
          .catch(err => {setErrorRes(err.response.data)
            setOpenDialog(false)
            Swal.fire("מצטערים", ' קרתה תקלה, ' + err.response.data, "error")
            console.log(err)
            setErrors(err.response.status)})
            .finally(setLoading(false))
    
    
      }

      const handlePrevClick = () => {
        setPage((prevPage) => prevPage - 1);
        setTimeout(()=> {
            refetch()
        }, 250)
      };
      
      const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);
        setTimeout(()=> {
            refetch()
        }, 250)
      };

      const scheduleMode = () => {
        setMode(true)
      }

      const getDates3 = (e) => {
        e.preventDefault();
        axios.get("https://nartina.com/api/user/rosters-between-2/" + workerId + "/startDate/0/10/" + date1 + "/" + date2)
        .then(res => {console.log(res.data)
        setRosters(res.data)
        setFlag(true)
        setDialog(false)})
        .catch(err => console.log(err))
      }

      // const mapObject = {
      //   "אמג'ד חליל": [
      //     {
      //       "id": 5,
      //       "name": "אמג'ד חליל",
      //       "startHour": null,
      //       "endHour": null,
      //       "date": "2023-07-04",
      //       "start": "08:00:00",
      //       "end": "16:30:00"
      //     },
      //     {
      //       "id": 6,
      //       "name": "אמג'ד חליל",
      //       "startHour": null,
      //       "endHour": null,
      //       "date": "2023-07-05",
      //       "start": "08:30:00",
      //       "end": "16:30:00"
      //     }
      //   ],
      //   "לאה כהן": [],
      //   "אביגיל שטרית": [],
      //   "יעקב  חודרוקובסקי": [
      //     {
      //       "id": 7,
      //       "name": "יעקב  חודרוקובסקי",
      //       "startHour": null,
      //       "endHour": null,
      //       "date": "2023-07-04",
      //       "start": "07:26:00",
      //       "end": "14:30:00"
      //     }
      //   ],
      //   "שימי אילוז": []
      // };

      // const mapArray = Object.entries(mapState);
      const mapArray = Object.entries(mapState2);

      const generatePdf = () => {
        setSpin(true)
        const input = document.getElementById("xxx")
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
          const marginY = (pageHeight - canvasHeight) / 12;
          doc.addImage(imgData, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
          // const imgWidth = 210;
          // const imgHeight = canvas.height * imgWidth / canvas.width
          // var imgData = canvas.toDataURL("image/png");
          // doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          
          doc.save("סידור_עבודה.pdf");
          setSpin(false)
      
        })
      }

      // const handleClose = () => {
      //   setAddAlert(false)
      // }

  return (
    <>
      {/* <button className='relative top-20' onClick={openForm}>OPEN1</button>
      <button className='relative top-28' onClick={()=> setOpenDates(true)}>OPEN2</button>
      <button className='relative top-36' onClick={()=> setOpenDates2(true)}>OPEN3</button>
      <div className='mt-12 flex justify-end space-x-4 airx:mr-[270px] border-b-8 border-b-white'>
      {mapArray.map(([key, value]) => (
        <div key={key}>
            <h3 className='text-center'>{key}</h3>
          {value.map((item) => (
            <div className='bg-blue-100 rounded mt-2 p-4' key={item.id}>
              <p>Name: {item.name}</p>
              <p>Start: {item.start}</p>
              <p>End: {item.end}</p>
            </div>
          ))}
        </div>
      ))}
    </div> */}
    {!mode ? (
      <>
       <section class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${globalTheme != "light" && "bg-gray-700 dark"}`}>

{flag && (
  <>
  <div className='flex justify-between items-center py-1 px-4'>
  <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={()=> setFlag(false)}>
      <CloseIcon className='hover:animate-spin-fast transition-all duration-150 ease-out text-red-600'/>
    </div>
   <ReactToPrint
    trigger={() => {
      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
      // to the root node of the returned component as it will be overwritten.
      return <a href="#">
              <div className="flex items-center justify-center">
              <div className="flex items-center justify-center space-x-1 bg-blue-700 hover:bg-blue-600 rounded-md px-2 py-[2px] w-fit" onClick={()=> setFlag(false)}>
              <h1 className="font-mono text-white font-semibold">{hebrew ? "Print" : "הדפס"}</h1>
              <LocalPrintshopIcon className='text-white cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-4'/> 
              </div>
              </div>
      </a>;
    }}
    content={() => componentRef.current}
    documentTitle='הצעת מחיר'
  />
    {/* <div className="flex justify-center cursor-pointer items-center bg-red-100 p-1 rounded-lg" onClick={()=> setFlag(false)}>
      <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600'/>
    </div> */}
    </div>
  <div className='overflow-y-scroll scrollbar max-h-[500px]'>
  <table  ref={componentRef} className="min-w-full divide-y divide-gray-200 w-[98%] md:w-[78%] lg:w-[98%] airx:w-[88%] uuu:w-[86%] uur:w-[86.5%] 2xl:w-[87%] 4xl:w-[88%] 5xl:w-[89.5%]">
  <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
     <tr>
    {/* <th scope="col" className="px-4 text-center py-2">מחק</th>
    <th scope="col" className="px-4 text-center py-2">ערוך</th>
    <th scope="col" className="px-4 text-center py-2">הערות</th> */}
    <th scope="col" className="px-4 text-center py-2">משמרת</th>
    <th scope="col" className="px-4 text-center py-2">סה"כ</th>
    <th scope="col" className="px-4 text-center py-2">סוף משמרת</th>
    <th scope="col" className="px-4 text-center py-2">תחילת משמרת</th>
    <th scope="col" className="px-4 text-center py-2">שם עובד</th>
    <th scope="col" className="px-4 text-center py-2">תאריך</th>
                 </tr>
             </thead>
             <tbody>
             {rosters?.content.map((report, index) => (
   <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `}>
        {report.mode == "בוקר" && (
                  <LightModeIcon className='text-yellow-500'/>
                ) }
                {report.mode == "ערב" && (
                  <NightlightIcon className='text-gray-700 dark:text-gray-800 -rotate-45'/>
                ) }
        </div>
    </td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.total}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.endDate.substring(11)}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.startDate.substring(11)}</td>
    <td scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.name}</td>
    <th scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.startDate.substring(0, 10)}</th>
    </tr>
  ))}
    </tbody>
</table>
</div>
  </>
)}
  {isSSR ? (
    <LinearProgress />
  ) : (
    <div className={`${flag && 'hidden'}`}>
  {hebrew ? (
      <>
      <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">

  <div class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="w-full md:w-1/2">
              <form class="flex items-center">
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                          </svg>
                      </div>
                      <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                  </div>
              </form>
          </div>
          <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 relative right-4">
          <div className='relative top-1 right-2' onClick={()=> {setFlag(!flag)
                  alert()}}>
              <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-5 -mt-2'/>
          </div>
              <div class="flex items-center space-x-3 w-full md:w-auto">
                  <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                      <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                      Actions
                  </button>
                  <div id="actionsDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                          <li>
                              <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                          </li>
                      </ul>
                      <div class="py-1">
                          <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                      </div>
                  </div>
                  <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                      </svg>
                      Filter
                      <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                  </button>
                  <div id="filterDropdown" class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                      <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                      <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                          <li class="flex items-center">
                              <input id="apple" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                              <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                          </li>
                          <li class="flex items-center">
                              <input id="fitbit" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                              <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                          </li>
                          <li class="flex items-center">
                              <input id="razor" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                              <label for="razor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                          </li>
                          <li class="flex items-center">
                              <input id="nikon" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                              <label for="nikon" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                          </li>
                          <li class="flex items-center">
                              <input id="benq" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                              <label for="benq" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                          </li>
                      </ul>
                  </div>
              </div>
              <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> alert(true)}>
              
                  Add product
              </button>
          </div>
          
      </div>
      <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
        <th scope="col" className="px-4 text-center py-2">product</th>
        <th scope="col" className="px-4 text-center py-2">unit price</th>
        <th scope="col" className="px-4 text-center py-2">notes</th>
        <th scope="col" className="px-4 text-center py-2">edit</th>
        <th scope="col" className="px-4 text-center py-2">delete</th>
                  </tr>
              </thead>
              <tbody>
              {data?.data?.content.map((report, index) => (
   <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
       
    <th scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.item}</th>
    <td scope="col" className="px-4 text-center py-2">{report.price}</td>
    <td scope="col" className="px-4 text-center py-2">{report.notes}</td>
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className="inline-flex text-xs leading-5 bg-blue-200 hover:bg-blue-300 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> alert(report.id)}>
         <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
        </div>
      </td>
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className="inline-flex text-xs leading-5 bg-red-200 hover:bg-red-300 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> alert(report.id)}>
         <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
        </div>
      </td>
    </tr>
  ))}
              </tbody>
          </table>
      </div>
      <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
     <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
        <h1 className='font-mono '>record numbers {data?.data.totalElements}</h1>
     </div>
  <Pagination
    count={data?.data.totalPages}
    page={page + 1}
    onChange={(event, value) => {setPage(value - 1)
    setTimeout(()=> {
        refetch()
    }, 250)}}
    color="primary"
    variant="outlined"
    size='medium'
    shape="rounded"
    disabled={data?.data.totalPages === 1}
    sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}
    renderItem={(item) => {
      switch (item.type) {
        case 'previous':
          return (
            <PaginationItem
              {...item}
              onClick={handlePrevClick}
              disabled={page + 1 === 1}
              style={{ backgroundColor: globalTheme == "light" ? 'white' : '#3b82f6', color: globalTheme == "light" ? 'gray' : 'white' }}

            />
          );
        case 'next':
          return (
            <PaginationItem
              {...item}
              onClick={handleNextClick}
              disabled={page + 1 === data?.data.totalPages}
              style={{ backgroundColor: globalTheme == "light" ? 'white' : '#3b82f6', color: globalTheme == "light" ? 'gray' : 'white' }}

            />
          );
        default:
          return <PaginationItem {...item} />;
      }
    }}
  />
         
     </nav>
  </div>
</div>
      </>
) : (
  <>
  <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">
 
 <div class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
     <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
         
         <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
             <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={openForm}>
                 הכנס עובד למשמרת
             </button>
             <div class="flex items-center space-x-3 w-full md:w-auto relative">
                 <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                     <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                         <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                     </svg>
                     אפשרויות
                 </button>
                 <div class={`${!action && 'hidden'} p-4 z-10 w-44 absolute top-10 flex flex-col space-y-1 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                      {/* <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setFlag(!flag)}>
                        <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                        <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Print</h1>
                      </div>
                      <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setOpenDailyIncomeReport(true)}>
                       <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                       <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
                     </div> */}
                     <div className='flex items-center space-x-2 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> {setDialog(true)
                      getWorkers()
                      setAction(!action)}}>
                       <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                       <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">דו"ח לפי עובד/ת</h1>
                     </div>
                 </div>
                 <button className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                     <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                         <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                     </svg>
                     פילטר
                     <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                         <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                     </svg>
                 </button>
                 <div class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                     <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                     <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                         <li class="flex items-center">
                             <input id="apple" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                             <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                         </li>
                         <li class="flex items-center">
                             <input id="fitbit" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                             <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                         </li>
                         <li class="flex items-center">
                             <input id="razor" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                             <label for="razor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                         </li>
                         <li class="flex items-center">
                             <input id="nikon" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                             <label for="nikon" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                         </li>
                         <li class="flex items-center">
                             <input id="benq" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                             <label for="benq" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                         </li>
                     </ul>
                 </div>

                 <div className='relative top-1 right-2' onClick={()=> {
                  setOpenDates(true)}}>
                   <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 ml-5 -mt-2'/>
                 </div>
                 <CalendarMonthIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125 relative top-[1px] right-2' onClick={()=> setOpenDates2(true)}/>
             </div>
         </div>
         <div class="w-full md:w-1/2">
             <form class="flex items-center">
                 <label for="simple-search" class="sr-only">Search</label>
                 <div class="relative w-full">
                     <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                         <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                             <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                         </svg>
                     </div>
                     <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                 </div>
             </form>
         </div>
     </div>
     <div class="overflow-x-auto hidden md:block">
         <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
             <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
     <tr>
    <th scope="col" className="px-4 text-center py-2">מחק</th>
    <th scope="col" className="px-4 text-center py-2">ערוך</th>
    <th scope="col" className="px-4 text-center py-2">הערות</th>
    <th scope="col" className="px-4 text-center py-2">משמרת</th>
    <th scope="col" className="px-4 text-center py-2">סה"כ</th>
    <th scope="col" className="px-4 text-center py-2">סוף משמרת</th>
    <th scope="col" className="px-4 text-center py-2">תחילת משמרת</th>
    <th scope="col" className="px-4 text-center py-2">שם עובד</th>
    <th scope="col" className="px-4 text-center py-2">תאריך</th>
                 </tr>
             </thead>
             <tbody>
             {data?.data?.content.map((report, index) => (
   <tr key={report.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
       <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className="inline-flex text-xs leading-5 bg-red-200 hover:bg-red-300 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> handleAlert(report.id)}>
         <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
        </div>
      </td>
      <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className="inline-flex text-xs leading-5 bg-blue-200 hover:bg-blue-300 dark:bg-slate-600 rounded-lg cursor-pointer px-1 py-1" onClick={()=> alert(report.id)}>
         <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
        </div>
      </td>
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> alert(report.id)}>
          <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${"" != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
        </div>
    </td>
    <td scope="col" className="px-1 text-center py-2 whitespace-nowrap">
        <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `}>
        {report.mode == "בוקר" && (
                  <LightModeIcon className='text-yellow-500'/>
                ) }
                {report.mode == "ערב" && (
                  <NightlightIcon className='text-gray-700 dark:text-gray-800 -rotate-45'/>
                ) }
        </div>
    </td>
    <td scope="col" className="px-4 text-center py-2">{report.total}</td>
    <td scope="col" className="px-4 text-center py-2">{report.endDate.substring(11)}</td>
    <td scope="col" className="px-4 text-center py-2">{report.startDate.substring(11)}</td>
    <td scope="col" className="px-4 text-center py-2">{report.name}</td>
    <th scope="col" className="px-4 text-center py-2 dark:text-[#ccc]">{report.startDate.substring(0, 10)}</th>
    </tr>
  ))}
             </tbody>
         </table>
     </div>
     <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {data?.data.content.map(report => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-1`}>
                <div className="p-4 blue-glassmorphism hover:bg-gray-900 shadow rounded flex flex-col space-y-1">

                <div className='flex items-center justify-end space-x-2.5 text-sm'>
                  <div className='dark:text-[#ccc]'>{report.startDate.substring(0, 10)}</div>
                  <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>תאריך</h1>
                </div>
                <div className='flex items-center justify-end space-x-2.5'>
               <div className='dark:text-[#ccc]'>{report.name}</div>
               <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>שם עובד</h1>
             </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.startDate.substring(11)}</div>
                <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>התחלת משמרת</h1>
                </div>
                <div className='flex items-center justify-end space-x-2.5'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.endDate.substring(11)}</div>
                <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>סוף משמרת</h1>
                </div>
                <div className='flex items-center justify-end space-x-2.5'>
                <div className='text-right font-mono dark:text-[#ccc]'>{report.total}</div>
                <h1 className='text-lg text-gray-800 dark:text-[#ccc] font-semibold'>סה"כ שעות</h1>
                </div>
                
                <div className='flex items-center justify-end space-x-1'>
                
              
                </div>
                <div className='flex items-center justify-end space-x-4 relative top-1'>
                
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(true)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(report?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
              <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `} onClick={()=> alert(report.id)}>
          <DescriptionIcon className={`hover:scale-125 transition-all duration-150 ${"" != "" ? "text-red-500 animate-pulse transition-all duration-300 ease-out"  : "text-purple-600"}  `}/>
        </div>
              <div className={`inline-flex text-xs leading-5 bg-purple-200 dark:bg-slate-600 p-1 rounded-lg cursor-pointer `}>
        {report.mode == "בוקר" && (
                  <LightModeIcon className='text-yellow-500'/>
                ) }
                {report.mode == "ערב" && (
                  <NightlightIcon className='text-gray-700 dark:text-gray-800 -rotate-45'/>
                ) }
        </div>
                </div>
              </div>
              ))}
            </div>
     <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
     <div className='flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
        <h1 className='font-mono '>מס' רשומות {data?.data.totalElements}</h1>
     </div>
  <Pagination
    count={data?.data.totalPages}
    page={page + 1}
    onChange={(event, value) => {setPage(value - 1)
    setTimeout(()=> {
        refetch()
    }, 250)}}
    color="primary"
    variant="outlined"
    size='medium'
    shape="rounded"
    disabled={data?.data.totalPages === 1}
    sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}
    renderItem={(item) => {
      switch (item.type) {
        case 'previous':
          return (
            <PaginationItem
              {...item}
              onClick={handlePrevClick}
              disabled={page + 1 === 1}
              style={{ backgroundColor: globalTheme == "light" && windowWidth > 766 ? 'white' : '#3b82f6', color: globalTheme == "light" && windowWidth > 766 ? 'gray' : 'white' }}

            />
          );
        case 'next':
          return (
            <PaginationItem
              {...item}
              onClick={handleNextClick}
              disabled={page + 1 === data?.data.totalPages}
              style={{ backgroundColor: globalTheme == "light" && windowWidth > 766 ? 'white' : '#3b82f6', color: globalTheme == "light" && windowWidth > 766 ? 'gray' : 'white' }}

            />
          );
        default:
          return <PaginationItem {...item} />;
      }
    }}
  />
         
     </nav>
 </div>
</div>
  </>
)}
    </div>
  )}
    </section>
      </>
    ) : (
      <>
      <div className='flex items-center justify-center w-full space-x-2 mt-2 relative airx:right-28 group'>
        <button className='relative top-20 bg-red-600 group-hover:bg-red-700 rounded text-white px-4 py-1 tracking-wide' onClick={()=> setMode(!mode)}>חזור</button>        
        <button className='relative top-20 bg-blue-700 group-hover:bg-blue-600 rounded text-white px-4 py-1 tracking-wide' onClick={generatePdf}>הדפס</button>        
      </div>
      
      {spin ? (
        <div className='flex items-center justify-center w-full mt-48 relative airx:right-28' >
         <AutorenewIcon style={{fontSize: '100px'}} className="animate-spin text-sky-800"/>
        </div>
      ) : (
        <div id='xxx' className='mt-20 grid grid-cols-1 mmu:grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 space-x-4 px-4 airx:mr-[270px] border-b-8 border-b-white ' >
      {mapArray.map(([key, value]) => (
        <div key={key} className=''>
            <h3 className='text-center font-mono font-semibold text-xl text-gray-900 '>{key}</h3>
          {value.map((item) => (
            <div className='bg-blue-100 rounded-lg mt-2 p-2 flex flex-col items-center justify-center space-y-1 ' key={item.id}>
              <p className='text-center font-bold text-[#333]'>{item.name.substring(0, 12)}</p>
              <div className={`text-center`}>
                {item.mode == "בוקר" && (
                  <LightModeIcon className='text-yellow-500'/>
                ) }
                {item.mode == "ערב" && (
                  <NightlightIcon fontSize='small' className='text-gray-700 -rotate-45'/>
                ) }
              </div>
              {/* <div className='flex flex-col items-end'> */}
               <p className='text-gray-600 text-xs'>{item.startDate.substring(11)} :התחלה</p>
               <p className='text-gray-600 text-xs'>{item.endDate.substring(11)} :סיום</p>
              {/* </div> */}
            </div>
          ))}
        </div>
      ))}
    </div>
      )}
      </>
    )}

        
    <Dialog open={openDialog}>
    <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full `}>

    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeFormValidation}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                    הכנס משמרת חדשה
                </h3>
                </div>
            </div>
            {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}</Alert>
          <CloseIcon className='text-red-500 cursor-pointer hover:scale-125 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/>
        </div>}
        {errors == 403 && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">יש לעשות יציאה ולהרשם שוב מטעמי בטיחות  
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>

</Alert>
        </div>}
            <form onSubmit={addRoster}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                
                    <div className='sm:col-span-2'>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר עובד</label>
                      </div>     
                      <select value={workerFullName} name='type' onChange={handleChangeRoster} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">בחר עובד</option>
                              {workers.map(worker => (
                              <option className='text-right' value={worker.fullName} data-my-value={worker.id}>{worker.active && worker.fullName}</option>
                              ))}
                          </select>
                    </div>
                  <div>
                    
                      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">סוף משמרת</label>
                      <input type="datetime-local" name="phoneNumber"  class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שעות נוספות" required={true} onChange={e => setEndDate(e.target.value)}/>
                  </div>
                  <div>
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">התחלת משמרת</label>
                    <input type="datetime-local" name="phone" class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שעות רגילות" required={true} onChange={e => setStartDate(e.target.value)}/>
                </div>
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">הערות</label>
                        <textarea rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="הוסף הערות בקשר למשמרת במידה ויש משהו להוסיף" ></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeFormValidation}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  הכנס משמרת 
              </button>
                ) : (
                  <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    Loading...
</button>
                )}
                </div>
            </form>
        </div>
    </div>
</div>
</Dialog>

{/* <Dialog open={openDates}>
    <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full `}>

    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeFormValidation2}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                       
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                    הכנס משמרת חדשה
                </h3>
                </div>
            </div>
            {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}</Alert>
          <CloseIcon className='text-red-500 cursor-pointer hover:scale-125 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/>
        </div>}
        {errors == 403 && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">יש לעשות יציאה ולהרשם שוב מטעמי בטיחות  
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>

</Alert>
        </div>}
            <form onSubmit={dates}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
               
                  <div>
                      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">סוף משמרת</label>
                      <input type="date" name="phoneNumber" value={date1} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שעות נוספות" required={true} onChange={e => setDate1(e.target.value)}/>
                  </div>
                  <div>
                    
                    <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תאריך משמרת</label>
                    <input type="date" name="phoneNumber" value={date2} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שעות נוספות" required={true} onChange={e => setDate2(e.target.value)}/>
                </div>

                    
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">הערות</label>
                        <textarea rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="הוסף הערות בקשר למשמרת במידה ויש משהו להוסיף" ></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeFormValidation2}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  הכנס משמרת 
              </button>
                ) : (
                  <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    Loading...
</button>
                )}
                </div>
            </form>
        </div>
    </div>
</div>
</Dialog> */}

<Dialog open={openDates}>
      <div className='flex flex-col justify-center items-center'>
      <DialogActions className='flex justify-between items-center'>
        <DialogTitle className='text-center font-mono' variant='h6'>בחר טווח תאריכים</DialogTitle>
      </DialogActions>
      <form onSubmit={getDates} className='flex flex-col items-center justify-center space-y-4 pb-2 px-4'>
       <TextField onChange={e => setDate1(e.target.value)} type='date' className='h-14 w-36'/>
       <TextField onChange={e => setDate2(e.target.value)} type='date' className='h-14 w-36'/>
       <div className='flex items-center justify-center space-x-8'>
         <button type='submit' className='bg-blue-200 px-4 py-[2px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' >שלח</button>
         <button className='bg-blue-200 px-4 py-[2px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setOpenDates(false)}>בטל</button>
       </div>
      </form>
      </div>
    
    <div className='flex justify-around items-center pb-2'>
    </div>
</Dialog>

<Dialog open={openDates2}>
      
      <div className='flex flex-col justify-center items-center'>
      <DialogActions className='flex justify-between items-center'>
        <DialogTitle className='text-center font-mono' variant='h6'>בחר טווח תאריכים</DialogTitle>
      </DialogActions>
      <form onSubmit={getDates2} className='space-y-4 pb-2 px-4 grid grid-cols-2 gap-4'>
       <TextField onChange={e => setDate1(e.target.value)} type='date' className='h-14 relative top-4'/>
       <TextField onChange={e => setDate2(e.target.value)} type='date' className='h-14'/>
       <TextField onChange={e => setDate3(e.target.value)} type='date' className='h-14'/>
       <TextField onChange={e => setDate4(e.target.value)} type='date' className='h-14'/>
       <TextField onChange={e => setDate5(e.target.value)} type='date' className='h-14'/>
       <TextField onChange={e => setDate6(e.target.value)} type='date' className='h-14'/>
       <div className='flex items-center justify-center space-x-8'>
         <button type='submit' className='bg-blue-700 px-5 py-1 text-white hover:bg-blue-300 hover:text-blue-600 rounded-lg' >שלח</button>
         <button className='bg-red-600 px-5 py-1 text-white hover:bg-blue-300 hover:text-blue-600 rounded-lg' onClick={()=> setOpenDates2(false)}>בטל</button>
       </div>
       <TextField onChange={e => setDate7(e.target.value)} type='date' className='h-14'/>
       
      </form>
      </div>
    
    <div className='flex justify-around items-center pb-2'>
    </div>
</Dialog>

{/* <Snackbar open={addAlert} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
{hebrew ? 'successfully added new roster' : 'סידור עבודה הוכנס בהצלחה'}     
   </Alert>
      </Snackbar> */}

      <Dialog open={dialog}>
      <div className='flex flex-col justify-center items-center'>
      <DialogActions className='flex justify-between items-center'>
        <DialogTitle className='text-center font-mono' variant='h6'>בחר טווח תאריכים ועובד/ת</DialogTitle>
      </DialogActions>
      <form onSubmit={getDates3} className='flex flex-col items-center justify-center space-y-4 pb-2 px-4'>
      <select value={workerFullName} name='type' onChange={handleChangeRoster} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected="">בחר עובד</option>
              {workers.map(worker => (
          <option className='text-right' value={worker.fullName} data-my-value={worker.id}>{worker.active && worker.fullName}</option>
              ))}
      </select>
       <TextField onChange={e => setDate1(e.target.value)} type='date' className='h-14 w-36'/>
       <TextField onChange={e => setDate2(e.target.value)} type='date' className='h-14 w-36'/>
       <div className='flex items-center justify-center space-x-8'>
         <button type='submit' className='bg-blue-200 px-4 py-[2px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' >שלח</button>
         <button className='bg-blue-200 px-4 py-[2px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setDialog(false)}>בטל</button>
       </div>
      </form>
      </div>
    
    <div className='flex justify-around items-center pb-2'>
    </div>
</Dialog>
    </>
  )
}

export default Roster