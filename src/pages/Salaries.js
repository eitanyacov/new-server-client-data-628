import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom'
// import { Select, MenuItem, InputLabel, Box} from '@mui/material'
import { Dialog } from '@mui/material'
import { Snackbar, Alert } from "@mui/material";
// import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import { PaginationItem } from '@mui/material';
import axios from 'axios';
// import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
// import LinearProgress from '@mui/material/LinearProgress';
import Pagination from '@mui/material/Pagination';
import { ThemeContext } from "../App";
// import rtlPlugin from 'stylis-plugin-rtl';
// import { CacheProvider } from '@emotion/react';
// import createCache from '@emotion/cache';
// import { prefixer } from 'stylis';
// import { createTheme } from '@mui/material/styles';
import { useQuery } from 'react-query'
// import useMediaQuery from '@mui/material/useMediaQuery';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
// import { m } from 'framer-motion';
import Swal from 'sweetalert2'



// Create rtl cache
// const cacheRtl = createCache({
//   key: 'muirtl',
//   stylisPlugins: [prefixer, rtlPlugin],
// });

// const theme = createTheme({
//   direction: 'rtl',
// });



const Salaries = () => {
    // const [user, setUser] = useState({})
    const [isSSRE, setIsSSRE] = useState(true);
    const [isSSR, setIsSSR] = useState(true);
    // const [salaries, setSaleries] = useState([])
    const [workers, setWorkers] = useState([]);
    // const [id, setId] = useState();
    const [ide, setIde] = useState();
    const [amount, setAmount] = useState("")
    const [month, setMonth] = useState("")
    const [hours, setHours] = useState("")
    const [year, setYear] = useState();
    const [extraHours, setExtraHours] = useState("")
    const [workerFullName, setWorkerFullName] = useState("")
    const [salary, setSalary] = useState({})
    // const [field, setField] = useState("")
    const [workerId, setWorkerId] = useState();
    // const [editMode, setEditMode] = useState(false)
    // const [open, setIsOpen] = useState(false)
    const [openUpdate, setIsOpenUpdate] = useState(false)
    const [deleteAlert, setDeleteAlert] = useState(false)
    // const [updateAlert, setUpdateAlert] = useState(false)
    const [error, setError] = useState()
    const [errorMode, setErrorMode] = useState(false)
    const [windowHeight, setWindowHeight] = useState(0);
    // const [xxx, setXxx] = useState(false)
    const [openAddSalary, setOpenAddSalary] = useState(false)
    const [salaryAlert, setSalaryAlert] = useState(false)
    const [errorRes, setErrorRes] = useState([]);
    const [errors, setErrors] = useState()
    const [action, setAction] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0);
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(0);




    // const navigate = useNavigate()

    // const screen = window.screen.availWidth
    // const screenHeight = window.screen.availHeight

    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

    const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]

    const currentYear = new Date().getFullYear()
    const lastYear = new Date().getFullYear() -1
    const lastTwoYear = new Date().getFullYear() -2

    const { hebrew, globalTheme } = useContext(ThemeContext)

    // const sal = JSON.parse(localStorage.getItem('salary'));


    const years = [currentYear, lastYear, lastTwoYear]

    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    const getData = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/all-salaries-paging/${id}/${page}/50/workerFullName`)
    }
    
    const {data, refetch} = useQuery('salaries', ()=> getData(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: false,
        refetchOnWindowFocus:false
   
      }) 


      useEffect(() => {
        setTimeout(() => {
          setIsSSR(false);
        }, 300)
        
      }, [isSSR]);
  
    useEffect(() => {
      resizeWindow();
      console.log(window.innerHeight)
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);  
    }, [windowHeight, window.innerHeight, windowWidth, window.innerWidth]);

    

    useEffect(() => {
      if(error == 403) {
        setErrorMode(true)
      }
      
    }, [errorMode, error]);


    useEffect(() => {
      setTimeout(() => {
        setIsSSRE(false);
      }, 1200)
      
    }, [isSSRE]);


 

  const getSalary = async (id) => {
    const res = await fetch(`https://nartina.com/api/user/get-salary-by-id/${id}`);
    const result = await res.json();
    setSalary(result)
    setIsOpenUpdate(true)
    
}


    // const deleteRestaurantIncome = () => {
    //   axios.delete("https://nartina.com/api/user/delete-salary-by-id/" + ide, {
    //     headers: {
    //       Authorization: 'Bearer ' + result?.token,
      
    //      }
    //   })
    //   .then(res => {
    //     refetch()
    //     localStorage.setItem('salary', true)
    //     setDeleteAlert(true)})
    //   .catch(err => {console.log(err.response.data)
    //     setError(err.response.status)})
    //     setIsOpen(false)
        
    // }



    //  const handleChangeWorkerName = (e) => {
    //   console.log("the value is: " + e.target.value);
    //   setWorkerFullName(e.target.value)
    //   // setVal(e.target.value);
  
    // }

  //    const saveWorkerId = event => {
  //     const { myValue } = event.currentTarget.dataset;
  //     console.log(myValue) // --> 123
  //     const x = parseInt(myValue)
  //     setWorkerId(myValue)
  
  // }

  const handleChangeSalary = (e) => {
    console.log("the value is: " + e.target.value);
    setWorkerFullName(e.target.value)
    const selectedOption = e.target.options[e.target.selectedIndex];
    const myValue = selectedOption.getAttribute("data-my-value");
    setWorkerId(myValue)
    console.log("Selected value: " + myValue);
    
  }

  const handleDeleteAlert = () => {
    setDeleteAlert(false)
  }

  // const handleUpdateAlert = () => {
  //   setUpdateAlert(false)
  // }

  const handleClose3 = () => {
    setErrorMode(false)
    setError("")
  }

  const getWorkers = () => {
    axios.get(`https://nartina.com/api/user/all-workers/${result?.id}`)
    .then(res => setWorkers(res.data))
    .catch(err => console.log(err))
  }

    const printValues = (e)=> {
      e.preventDefault()
      axios.post("https://nartina.com/api/user/update-salary/" + ide, {
        amount: amount != "" ? amount : salary.amount,
        hours: hours != "" ? hours : salary.hours,
        year: year != null ? year : salary.year,
        extraHours: extraHours != "" ? extraHours : salary.extraHours,
        workerFullName: workerFullName != "" ? workerFullName : salary.workerFullName,
        month: month != "" ? month : salary.month,
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {refetch()
         setIsOpenUpdate(false)
         localStorage.setItem('salary', true)
         refetch()
         Swal.fire("!עודכן", '! משכורת עודכנה בהצלחה', "success");
          // setUpdateAlert(true)
        })
      .catch(err => {console.log(err)
        Swal.fire("מצטערים", 'קרתה תקלה, דו"ח לא עודכן', "error");
        setError(err.response.status)})
        
    }

    const addSalary = (e) => {
      e.preventDefault();
      setLoading(true)
      if(workerFullName == "" || month == "" || year == "" || amount == ""){
        setErrorRes("שדות חובה חסרים")
        setLoading(false)
        return
      }
      if(workerFullName == "בחר עובד"){
        setErrorRes("יש לבחור עובד")
        setLoading(false)
        return
      }
      if(month == "בחר חודש" || year == "בחר שנה"){
        setErrorRes("יש לציין שנה וחודש")
        setLoading(false)
        return
      }
        axios.post("https://nartina.com/api/user/add-salary-to-user/" + result?.id + "/" + workerId , {
        workerFullName,
        hours,
        extraHours,
        month,
        amount,
        year
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {refetch()
        localStorage.setItem('salary', true)
          setOpenAddSalary(false)
          setSalaryAlert(true)
          closeFormValidation()
          setLoading(false)
         }) 
       
        .catch(err => {setErrorRes(err.response.data)
          console.log(err)
          setLoading(false)
          setErrors(err.response.status)})
  
  
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
        text: "!לא ניתן יהיה לשחזר את הדו''ח",
        icon: 'אזהרה',
        showCancelButton: true,
        confirmButtonText: '!כן מחק',
        cancelButtonText: '!לא למחוק',
        reverseButtons: true
      }).then((results) => {
        if (results.isConfirmed) {
          axios.delete("https://nartina.com/api/user/delete-salary-by-id/" + id, {
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
            localStorage.setItem('income', true)}).
          catch(err => {console.log(err.response.data)
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

   
// const deleteSalary = (id) => {
//   setIde(id)
//   setIsOpen(true)
// }   

const editSalary = (id) => {
  setIde(id)
  getSalary(id)
}  

const handleClose10 = () => {
  setSalaryAlert(false)
}

// const handleSalaryMonths = (e) => {
//   setSalaryMonth(e.target.value)
// }

// const handleSalaryYear = (e) => {
//   setSalaryYear(e.target.value)
// }

const closeFormValidation = () => {
  setOpenAddSalary(false)
  setWorkerFullName("");
  setHours("");
  setExtraHours("")
  setMonth("")
  setAmount("")
  setYear("")
  setErrorRes("")
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
      

  return (
    <>
        <section class={`bg-gray-50 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'} dark:bg-gray-900 pt-1 h-[90vh] overflow-y-auto scrollbar-none mt-14 ${windowWidth < 766 && 'bg-gray-700 dark'} ${globalTheme != "light" && "bg-gray-700 dark"}`}>
        {hebrew ? (
          <>
          <div class="mx-auto max-w-screen-5xl px-4 lg:px-2 h-4/5">

        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
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
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button type="button" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add product
                    </button>
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
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
              <th scope="col" className="px-0 py-3 text-center">worker name</th>
              <th scope="col" className="px-0 py-3 text-center">id</th>
              <th scope="col" className="px-0 py-3 text-center">month</th>
              <th scope="col" className="px-0 py-3 text-center">year</th>
              <th scope="col" className="px-0 py-3 text-center">hours</th>
              <th scope="col" className="px-0 py-3 text-center">extra hours</th>
              <th scope="col" className="px-0 py-3 text-center">bruto salary</th>
              <th scope="col" className="px-0 py-3 text-center">edit</th>
              <th scope="col" className="px-0 py-3 text-center">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data.content.map((salary, index) => (
                <tr key={salary.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
                <th scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap text-gray-600 dark:text-[#ccc]">{salary.workerFullName}</th>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{salary.workerIdentification}</td>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{salary.month}</td>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{salary.year}</td>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{salary.hours}</td>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{salary.extraHours}</td>
                <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">{salary.amount}</td>
                
                <td scope="col" className="px-0 text-center py-2 text-xs whitespace-nowrap">
                <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editSalary(salary?.id)}>
                 <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
                </div>
              </td>
                <td scope="col" className="px-0 text-center py-2 text-xs whitespace-nowrap">
               <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(salary?.id)}>
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
          
              <h1 className='font-mono '> {data?.data.totalElements} records</h1>
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

        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> {setOpenAddSalary(true)
                  getWorkers()}}>
                   הכנס משכורת חדשה                   
                   </button>
                   <div class="flex items-center space-x-3 w-full md:w-auto relative">
                       <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={()=> setAction(!action)}>
                           <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                               <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                           אפשרויות
                       </button>
                       {/* <div class={`${!action && 'hidden'} p-4 z-10 w-44 absolute top-10 flex flex-col space-y-1 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setFlag(!flag)}>
                              <LocalPrintshopIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                              <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Print</h1>
                            </div>
                            <div className='flex items-center space-x-1.5 hover:bg-gray-100 rounded p-2 dark:hover:bg-gray-500 cursor-pointer' onClick={()=> setOpenDailyIncomeReport(true)}>
                             <AssessmentIcon className='text-[#005792] cursor-pointer hover:scale-110 ease-out transition-all duration-125' />
                             <h1 className="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">Report</h1>
                           </div>
                       </div> */}
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
                       <a href="https://tofes101.co.il/assets/forms/tofes-101.pdf" target="_blank">
                       <div className='bg-blue-500 hover:bg-blue-400 dark:bg-blue-600 flex items-center justify-center space-x-1 rounded px-2 py-[1px] text-white text-sm'>
                          <h1 className='text-white font-mono tracking-wide'>101</h1>
                          <h1 className='text-white font-mono tracking-wide hidden mmu:inline'>טופס</h1>
                       </div>
                 </a>
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
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
              <th scope="col" className="px-3 py-3 text-center">מחק</th>
              <th scope="col" className="px-3 py-3 text-center">ערוך</th>
              <th scope="col" className="px-3 py-3 text-center">משכורת ברוטו</th>
              <th scope="col" className="px-3 py-3 text-center">שעות נוספות</th>
              <th scope="col" className="px-3 py-3 text-center">מס' שעות</th>
              <th scope="col" className="px-3 py-3 text-center">שנה</th>
              <th scope="col" className="px-3 py-3 text-center">חודש</th>
              <th scope="col" className="px-3 py-3 text-center">ת.ז</th>
              <th scope="col" className="px-3 py-3 text-center">שם מלא</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {data?.data.content.map((salary, index) => (
                <tr key={salary.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
                
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
               <div className="inline-flex text-xs leading-5 bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(salary?.id)}>
                 <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
                </div>
              </td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
                <div className="inline-flex text-xs leading-5 bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editSalary(salary?.id)}>
                 <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
                </div>
              </td>
             
                <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{salary.amount}</td>
                <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{salary.extraHours}</td>
                <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{salary.hours}</td>
                <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{salary.year}</td>
                <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{salary.month}</td>
                <td scope="col" className="px-1 text-center py-2 text-sm whitespace-nowrap">{salary.workerIdentification}</td>
                <th scope="col" className="px-1 text-center py-2 whitespace-nowrap dark:text-[#ccc]">{salary.workerFullName}</th>
                </tr>
              ))}
                            
                
                    </tbody>
                </table>
            </div>
            <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {data?.data.content.map(salary => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-1`}>
                <div className="p-4 blue-glassmorphism hover:bg-gray-900 shadow rounded flex flex-col space-y-1">
                <div className='flex items-center justify-end space-x-2 text-sm'>
              
                  <div className='dark:text-[#ccc] font-mono text-lg'>
                    {salary.date}
                    </div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{salary.workerFullName}</div>
                <div className='text-right dark:text-[#ccc]'>שם עובד</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono dark:text-[#ccc]'>{salary.workerIdentification}</div>
                <div className='text-right dark:text-[#ccc]'>אשראי</div>
                </div>
                <div className={`flex items-center justify-end space-x-2`}>
                <div className='text-right font-mono dark:text-[#ccc]'>{salary.month}</div>
                <div className='text-right dark:text-[#ccc]'>עבור חודש</div>
                </div>
                <div className={`flex items-center justify-end space-x-2`}>
                <div className='text-right font-mono dark:text-[#ccc]'>{salary.year}</div>
                <div className='text-right dark:text-[#ccc]'>עבור שנה</div>
                </div>
                <div className={`flex items-center justify-end space-x-2`}>
                <div className='text-right font-mono dark:text-[#ccc]'>{salary.hours}</div>
                <div className='text-right dark:text-[#ccc]'>שעות</div>
                </div>
                <div className='flex items-center justify-end space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'>{salary.extraHours}</h1>
                  <h1 className='dark:text-[#ccc]'>שעות נוספות</h1>
                </div>
                <div className='flex items-center justify-between space-x-4 relative top-1'>
                
                <div className='flex items-center justify-center space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(salary.amount).toLocaleString()}</h1>
                  <h1 className='dark:text-[#ccc]'>סה"כ ברוטו</h1>
                </div>
              <div className='flex items-center justify-center space-x-4'>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> handleAlert(salary?.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editSalary(salary?.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
             
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

      </section>


      {/* <Dialog open={open}>
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>האם למחוק את המשכורת</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={deleteRestaurantIncome}>מחק</button>
        </div>
    </Dialog> */}


<Dialog open={openUpdate}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> setIsOpenUpdate(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                עדכן פרטי משכורת 
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
            {/* <!-- Modal body --> */}
            <form onSubmit={printValues}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                    
                    <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">שעות רגילות</label>
                    <input type="text" name="phoneNumber" defaultValue={salary?.hours} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שעות רגילות" required="" onChange={(e)=> setHours(e.target.value)}/>
                </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר עובד</label>
                      </div>     
                      <select value={workerFullName} name='type' onChange={handleChangeSalary} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">{salary?.workerFullName}</option>
                              {workers.map(worker => (
                              <option className='text-right' value={worker.fullName} data-my-value={worker.id}>{worker.active && worker.fullName}</option>
                              ))}
                          </select>
                    </div>
                  <div>
                    
                      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">שעות נוספות</label>
                      <input type="text" name="phoneNumber" defaultValue={salary?.extraHours} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שעות נוספות" required="" onChange={(e)=> setExtraHours(e.target.value)}/>
                  </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר חודש</label>
                      </div>     
                      <select name='type' onChange={(e) => setMonth(e.target.value)} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">{salary?.month}</option>
                              {months.map(m => (
                              <option className='text-right' value={m}>{m}</option>
                              ))}
                          </select>
                    </div>
                    <div>
                     <div className='flex justify-end items-center space-x-1'>
                      <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">סכום ברוטו</label>
                     </div>
                      <input type="text" name="agentPhone" defaultValue={salary?.amount} placeholder="סכום ברוטו" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAmount(e.target.value)}/>
                  </div>
                  <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר שנה</label>
                      </div>     
                      <select name='type' onChange={(e) => setYear(e.target.value)} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">{salary?.year}</option>
                              {years.map(y => (
                              <option className='text-right' value={y}>{y}</option>
                              ))}
                          </select>
                    </div>          
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">הערות</label>
                        <textarea rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="הוסף הערות בקשר למשכורת במידה ויש משהו להוסיף" onChange={(e)=> setWorkerId(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=> setIsOpenUpdate(false)}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  עדכן משכורת 
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


    {/* <Snackbar open={updateAlert} autoHideDuration={10000} onClose={handleUpdateAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleUpdateAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
                  משכורת עודכנה בהצלחה
        </Alert>
      </Snackbar> */}
    
      <Snackbar open={deleteAlert} autoHideDuration={10000} onClose={handleDeleteAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleDeleteAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
                  משכורת נמחקה בהצלחה
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

      <Dialog open={openAddSalary}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeFormValidation}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className='flex items-center justify-end space-x-1'>
                        <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        />
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                    הכנס משכורת חדשה
                </h3>
                </div>
            </div>
            {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}
          <CloseIcon className='text-red-500 cursor-pointer hover:scale-105 transition-all duration-150 ease-out' onClick={()=> setErrorRes("")}/>
          </Alert>
        </div>}
        {errors == 403 && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">יש לעשות יציאה ולהרשם שוב מטעמי בטיחות  
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>

</Alert>
        </div>}
            {/* <!-- Modal body --> */}
            <form onSubmit={addSalary}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                    
                    <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">שעות רגילות</label>
                    <input type="text" name="phoneNumber" value={hours} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שעות רגילות" required="" onChange={(e)=> setHours(e.target.value)}/>
                </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר עובד</label>
                      </div>     
                      <select value={workerFullName} name='type' onChange={handleChangeSalary} className="bg-gray-50 h-[42px] text-right relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">בחר עובד</option>
                              {workers.map(worker => (
                              <option className='text-right' value={worker.fullName} data-my-value={worker.id}>{worker.active && worker.fullName}</option>
                              ))}
                          </select>
                    </div>
                  <div>
                    
                      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">שעות נוספות</label>
                      <input type="text" name="phoneNumber" value={extraHours} class="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שעות נוספות" required="" onChange={(e)=> setExtraHours(e.target.value)}/>
                  </div>
                    <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר חודש</label>
                      </div>     
                      <select name='type' onChange={(e) => setMonth(e.target.value)} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">בחר חודש</option>
                              {months.map(m => (
                              <option className='text-right' value={m}>{m}</option>
                              ))}
                          </select>
                    </div>
                    <div>
                     <div className='flex justify-end items-center space-x-1'>
                      <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">סכום ברוטו</label>
                     </div>
                      <input type="text" name="agentPhone" value={amount} placeholder="סכום ברוטו" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setAmount(e.target.value)}/>
                  </div>
                  <div>
                    <div className='flex justify-end items-center space-x-1'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5 right-1'>שדה חובה</h1>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right ">בחר שנה</label>
                      </div>     
                      <select name='type' onChange={(e) => setYear(e.target.value)} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">בחר שנה</option>
                              {years.map(y => (
                              <option className='text-right' value={y}>{y}</option>
                              ))}
                          </select>
                    </div>          
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">הערות</label>
                        <textarea rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="הוסף הערות בקשר למשכורת במידה ויש משהו להוסיף" onChange={(e)=> setWorkerId(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-end space-x-4'>
                <div class="inline-flex items-center text-white cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeFormValidation}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  הכנס משכורת 
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


    <Snackbar open={salaryAlert} autoHideDuration={10000} onClose={handleClose10} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose10}
          severity="success"
          sx={{ width: "100%" }}
        >
{hebrew ? 'successfully added new salary' : 'משכורת הוכנסה בהצלחה'}        
</Alert>
      </Snackbar>
    </>
  )
}

export default Salaries