import React, { useState, useEffect, useContext } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogContent, TextField, Typography } from '@mui/material'
import { Select, MenuItem, InputLabel} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar, Alert } from "@mui/material";
// import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { ThemeContext } from "../App";
// import LinearProgress from '@mui/material/LinearProgress';

import axios from 'axios';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useQuery } from 'react-query'



// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});



const Inventory = () => {
    // const [user, setUser] = useState({})
    const [isSSRE, setIsSSRE] = useState(true);
    const [isSSR, setIsSSR] = useState(true);
    // const [inventories, setInventories] = useState([])
    const [inventory, setInventory] = useState({})
    const [ide, setIde] = useState();
    const [open, setIsOpen] = useState(false)
    const [deleteAlert, setDeleteAlert] = useState(false)
    const [openUpdate, setIsOpenUpdate] = useState(false)
    const [updateAlert, setUpdateAlert] = useState(false)
    const [error, setError] = useState()
    const [errorMode, setErrorMode] = useState(false)
    const [windowHeight, setWindowHeight] = useState(0);
    // const [xxx, setXxx] = useState(false)
    const [openInventoryDialog, setOpenInventoryDialog] = useState(false);
    const [errorRes, setErrorRes] = useState([]);
    const [errors, setErrors] = useState()
    const [inventoryMonth, setInventoryMonth] = useState();
    const [inventoryYear, setInventoryYear] = useState();
    const [action, setAction] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0);


    //update
    const [openInventory, setOpenInventory] = useState();
    const [closeInventory, setCloseInventory] = useState();
    const [stock, setStock] = useState();
    const [income, setIncome] = useState();
    const [month, setMonth] = useState("");
    const [year, setYear] = useState();

    const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
    const currentYear = new Date().getFullYear()
    const lastYear = new Date().getFullYear() -1
    const lastTwoYear = new Date().getFullYear() -2
    // const currentMonth = new Date().getMonth() + 1;

    const years = [currentYear, lastYear, lastTwoYear]

    const { hebrew, globalTheme } = useContext(ThemeContext)


    const invent = JSON.parse(localStorage.getItem('invent'));

  
  const res = localStorage.getItem("user")
  const result = JSON.parse(res)


  const getInventor = () => {
    const id = result?.id
    return axios.get('https://nartina.com/api/user/all-inventories/' + id)
  }
  
  const {data, refetch} = useQuery('inventory', ()=> getInventor(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: invent,
      refetchOnWindowFocus:false
 
    }) 

    

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

  

    useEffect(()=> {
      setTimeout(()=> {
        localStorage.setItem('invent', false)
      }, 2000)
    })



    useEffect(() => {
      if(error == 403) {
        setErrorMode(true)
      }
      
    }, [errorMode, error]);

    useEffect(() => {
      setTimeout(() => {
        setIsSSRE(false);
      }, 800)
      
    }, [isSSRE]);

  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 300)
    
  }, [isSSR]);

   
      const getInventory = async (id) => {
        const res = await fetch(`https://nartina.com/api/user/get-inventory/${id}`);
        const result = await res.json();
        setInventory(result)
        setIsOpenUpdate(true)
        
    }


    const updateInventory = (e) => {
        e.preventDefault()
        axios.post("https://nartina.com/api/user/update-inventory/" + ide, {
          openInventory: openInventory != null ? openInventory : inventory.openInventory,
          closeInventory: closeInventory != null ? closeInventory : inventory.closeInventory,
          income: income != null ? income : inventory.income,
          stock: stock != null ? stock : inventory.stock,
          year: year != null ? year : inventory.year,
          month: month != "" ? month : inventory.month,
        }, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        }).then(res => {setIsOpenUpdate(false)
            refetch()
            setUpdateAlert(true)})
        .catch(err => {console.log(err)
          setError(err.response.status)}
        )
    }


    const addInventory = (e) => {
      e.preventDefault();
      axios.post("https://nartina.com/api/user/add-inventory/" + result?.id ,{
        month,
        year,
        income,
        stock,
        openInventory,
        closeInventory
      }, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      }).then(res => {closeInventoryDialog()
        refetch()
        localStorage.setItem('invent', true)}) 
        .catch(err=> {console.log(err)
          setErrors(err.response.status)})
          
    }

    const handleDeleteAlert = () => {
        setDeleteAlert(false)
      }

    const deleteInventory = () => {
        axios.delete("https://nartina.com/api/user/delete-inventory/" + ide, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        })
        .then(res => {refetch()
          setDeleteAlert(true)})
        .catch(err => {console.log(err.response.data)
          setError(err.response.status)})
          setIsOpen(false)
        // setIsOpenAlertIncomeDelete(true)
      }

      const handleInventoryYear = (e) => {
        setYear(e.target.value)
      }
      
      const handleInventoryMonth = (e) => {
        setMonth(e.target.value)
      }

      const handleUpdateAlert = () => {
        setUpdateAlert(false)
      }

      const handleClose3 = () => {
        setErrorMode(false)
        setError("")
      }


    const editInventory = (id) => {
      setIde(id)
      getInventory(id)
    }

    const closeInventoryDialog = () => {
      setOpenInventoryDialog(false)
      setInventoryMonth("")
      setInventoryYear("")
      setIncome("")
      setOpenInventory("")
      setCloseInventory("")
      setStock("")
      setErrorRes("")
    }

    

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
              <th scope="col" className="px-1 text-center py-2">month</th>
              <th scope="col" className="px-1 text-center py-2">year</th>
              <th scope="col" className="px-1 text-center py-2">open inventory</th>
              <th scope="col" className="px-1 text-center py-2">Commodity</th>
              <th scope="col" className="px-1 text-center py-2">close inventory</th>
              <th scope="col" className="px-1 text-center py-2">final Commodity</th>
              <th scope="col" className="px-1 text-center py-2">income</th>
              <th scope="col" className="px-1 text-center py-2">gross profit</th>
              <th scope="col" className="px-1 text-center py-2">edit</th>
              <th scope="col" className="px-1 text-center py-2">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data.map((inv, index) => (
            <tr key={inv.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
              <th scope="col" className="px-1 text-center py-2 text-gray-600 dark:text-[#ccc]">{inv.month}</th>
              <td scope="col" className="px-1 text-center py-2">{inv.year}</td>
              <td scope="col" className="px-1 text-center py-2">{Number(inv.openInventory).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2">{Number(inv.stock).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2">{Number(inv.closeInventory).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2">{Number(inv.realStock).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2">{Number(inv.income).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2">{inv.profit + "%"}</td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 items-center justify-center bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editInventory(inv.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
              <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 items-center justify-center bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert()}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
              </tr>
            ))}
                    </tbody>
                </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
                    of
                    <span class="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>
                <ul class="inline-flex items-stretch -space-x-px">
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Next</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul>
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
                   <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> setOpenInventoryDialog(true)}>
                       הכנס ניהול מלאי
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
                       {/* <a href="https://tofes101.co.il/assets/forms/tofes-101.pdf" target="_blank">
                  <div className='bg-blue-500 hover:bg-blue-400 dark:bg-blue-600 rounded px-2 py-[1px] text-white text-sm'>
                    <h1 className='text-white font-mono tracking-wide'>טופס 101</h1>
                  </div>
                 </a> */}
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
              <th scope="col" className="px-1 text-center py-2">מחק</th>
              <th scope="col" className="px-1 text-center py-2">ערוך</th>
              <th scope="col" className="px-1 text-center py-2">רווח גולמי</th>
              <th scope="col" className="px-1 text-center py-2">הכנסה</th>
              <th scope="col" className="px-1 text-center py-2">סחורה סופי</th>
              <th scope="col" className="px-1 text-center py-2">מלאי סגירה</th>
              <th scope="col" className="px-1 text-center py-2">סחורה</th>
              <th scope="col" className="px-1 text-center py-2">מלאי פתיחה</th>
              <th scope="col" className="px-1 text-center py-2">שנה</th>
              <th scope="col" className="px-1 text-center py-2">חודש</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.data.map((inv, index) => (
            <tr key={inv.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900`}>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 items-center justify-center bg-red-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert()}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 items-center justify-center bg-blue-200 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editInventory(inv.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
              <td scope="col" className="px-1 text-center py-2">{inv.profit + "%"}</td>
              <td scope="col" className="px-1 text-center py-2">{Number(inv.income).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2">{Number(inv.realStock).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2">{Number(inv.closeInventory).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2">{Number(inv.stock).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2">{Number(inv.openInventory).toLocaleString()}</td>
              <td scope="col" className="px-1 text-center py-2">{inv.year}</td>
              <th scope="col" className="px-1 text-center py-2 text-gray-600 dark:text-[#ccc] font-semibold">{inv.month}</th>
              </tr>
            ))}
                    </tbody>
                </table>
            </div>
            <div className='grid grid-cols-1 gap-3 md:hidden px-4 dark'>
              {data?.data.map(inv => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-1`}>
                <div className="p-4 blue-glassmorphism hover:bg-gray-900 shadow rounded flex flex-col space-y-1">

                <div className='flex items-center justify-end space-x-2 text-sm'>
                
                  <div className='dark:text-[#ccc] font-mono text-lg'>
                    {inv.date}
                    </div>
                </div>
                <div className='flex items-center justify-end space-x-4'>
                <div className='text-right font-mono dark:text-[#ccc]'>{inv.year}</div>
                <div className='text-right font-mono dark:text-[#ccc]'>{inv.month}</div>
                <div className='text-right dark:text-[#ccc]'>תאריך</div>
                </div>
                <div className={`flex items-center justify-end space-x-2 `}>
                <div className='text-right font-mono dark:text-[#ccc]'><span className='font-sans text-sm'>₪</span>{Number(inv.openInventory).toLocaleString()}</div>
                <div className='text-right dark:text-[#ccc]'>מלאי פתיחה</div>
                </div>
                <div className={`flex items-center justify-end space-x-2`}>
                <div className='text-right font-mono dark:text-[#ccc]'><span className='font-sans text-sm'>₪</span>{Number(inv.stock).toLocaleString()}</div>
                <div className='text-right dark:text-[#ccc]'>סחורה</div>
                </div>
                <div className={`flex items-center justify-end space-x-2 `}>
                <div className='text-right font-mono dark:text-[#ccc]'><span className='font-sans text-sm'>₪</span>{Number(inv.closeInventory).toLocaleString()}</div>
                <div className='text-right dark:text-[#ccc]'>מלאי סגירה</div>
                </div>
                <div className='flex items-center justify-end space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(inv.realStock).toLocaleString()}</h1>
                  <h1 className='dark:text-[#ccc]'>סחורה סופי</h1>
                </div>
                <div className='flex items-center justify-end space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'><span className='font-sans text-sm'>₪</span>{Number(inv.income).toLocaleString()}</h1>
                  <h1 className='dark:text-[#ccc]'>הכנסה</h1>
                </div>
                <div className='flex items-center justify-end space-x-1.5'>
                  <h1 className='dark:text-[#ccc] font-mono text-xl'>{inv.profit + "%"}</h1>
                  <h1 className='dark:text-[#ccc]'>רווח גולמי</h1>
                </div>
                <div className='flex items-center justify-end space-x-4 relative top-1'>
                
              <div className='flex items-center justify-center space-x-4'>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert(inv.id)}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
              <div className="inline-flex text-xs leading-5 dark:bg-slate-600 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editInventory(inv.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
             
              </div>
          
                </div>
              </div>
              ))}
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
                    of
                    <span class="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>
                <ul class="inline-flex items-stretch -space-x-px">
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Next</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
          </>
        )}

      </section>
    {/* {isSSR ? (
          <LinearProgress />
        ) : (
          <>
          <div className="pr-1"> 
          <div className='flex items-center justify-between bg-white px-4 z-10 sticky top-0 py-1'>
          <button
        type="button"
        class="inline-block rounded bg-blue-500 px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init
        data-te-ripple-color="light"
        onClick={()=> setOpenInventoryDialog(true)}>
         הכנס מלאי
      </button>
            <div className='flex flex-col items-end '>
              <h1 className='font-bold text-[#373D3F] text-xl tracking-wide'>ניהול מלאי</h1>
              <h1 className='text-gray-500 text-sm tracking-wide'>ניתן להכניס / לערוך מלאי</h1>
            </div>
          </div>
         <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-sky-700 sticky top-0 z-50">
            <tr>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מחק</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">ערוך</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">רווח גולמי</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">הכנסה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סחורה סופי</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מלאי סגירה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">סחורה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">מלאי פתיחה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">שנה</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">חודש</th>
              <th scope="col" className="px-1 text-center py-2 text-[11px] sm:text-xs md:text-sm text-white font-mono">|</th>
            </tr>
          </thead>

            <>
            <tbody className="divide-y divide-gray-200">
            {data?.data.map((inv, index) => (
              <tr key={inv.id} className={`border ${index % 2 === 0 ? '' : ''}`}>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 items-center justify-center bg-red-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> alert()}>
               <DeleteForeverIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-500'/>
              </div>
            </td>
            <td scope="col" className="px-1 text-center py-2"></td>
            <td scope="col" className="px-1 text-center py-2 text-xs whitespace-nowrap">
              <div className="inline-flex text-xs leading-5 items-center justify-center bg-blue-200 rounded-lg cursor-pointer py-1 px-1" onClick={()=> editInventory(inv.id)}>
               <EditIcon className='hover:scale-125 transition-all duration-150 ease-out text-blue-600'/>
              </div>
            </td>
           
           
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{inv.profit}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{inv.income}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{inv.realStock}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{inv.closeInventory}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{inv.stock}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800 font-semibold font-mono">{inv.openInventory}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-xs text-gray-800  font-semibold font-mono">{inv.year}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              <td scope="col" className="px-1 text-center py-2 text-sm text-gray-800  font-bold font-mono">{inv.month}</td>
              <td scope="col" className="px-1 text-center py-2"></td>
              </tr>
            ))}
          </tbody>
            </>
        </table>
         </div>
          </>
        )} */}


         <Dialog open={open}>
        <DialogContent>
            <Typography className='text-center font-mono' variant='h6'>האם למחוק את ניהול המלאי</Typography>
            <Typography className='text-center' variant='subtitle1'>בחר אחת מהאפשרויות</Typography>
        </DialogContent>
        {/* <DialogActions className='flex justify-between items-center'> */}
        <div className='flex justify-around items-center pb-2'>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={()=> setIsOpen(false)}>בטל</button>
        <button className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg' onClick={deleteInventory}>מחק</button>
        </div>
        {/* </DialogActions> */}
    </Dialog>

    <Snackbar open={deleteAlert} autoHideDuration={10000} onClose={handleDeleteAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleDeleteAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? 'successfully deleted the inventory' : 'מלאי נמחק בהצלחה'}   
                  </Alert>
      </Snackbar>

      <Dialog open={openUpdate}>
      <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setIsOpenUpdate(false)}/>
        </div>
        <h1 className={`text-center ${hebrew ? "font-serif text-slate-600" : "font-mono text-amber-700"} text-3xl`}>{hebrew ? "update inventory" : "עדכן ניהול מלאי"}</h1>
        <DialogContent>
        <form id="myform" onSubmit={updateInventory} className='flex space-x-4'>
                <div className='flex flex-col space-y-2'>
                
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "select year" : "עבור שנה"}</InputLabel>
                    <Select onChange={handleInventoryYear} className='bg-white rounded-md px-2' defaultValue={inventory?.year}>
            {years.map(year => (
                <MenuItem value={year}>{year}</MenuItem>
            ))}
                    </Select>
                   {hebrew ? (
                    <>
                  <TextField type="number" label="ending inventory" defaultValue={inventory?.closeInventory} className='bg-white rounded-md px-2 py-2' onChange={e => setCloseInventory(e.target.value)}/>
                  
                    </>
                   ) : (
                    <>
                     <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                  <TextField type="number" label="מלאי סגירה" defaultValue={inventory?.closeInventory} className='bg-white rounded-md px-2 py-2' onChange={e => setCloseInventory(e.target.value)}/>
                  </ThemeProvider>
                  </CacheProvider>
                    </>
                   )}
                  {hebrew ? (
                    <>
                  <TextField type="number" label="monthly income" defaultValue={inventory?.income} className='bg-white rounded-md px-2 py-2' onChange={e => setIncome(e.target.value)}/>
          
                    </>
                  ) : (
                    <>
                    <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                  <TextField type="number" label="הכנסה חודשית" defaultValue={inventory?.income} className='bg-white rounded-md px-2 py-2' onChange={e => setIncome(e.target.value)}/>
                  </ThemeProvider>
                  </CacheProvider>
                    </>
                  )}
                  <button type='submit' className='bg-blue-200 px-2 py-2 mt-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>{hebrew ? "update inventory" : "עדכן ניהול מלאי"}</button>

                </div>

                <div className='flex flex-col space-y-2'>
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "select month" : "עבור חודש"}</InputLabel>
                    <Select onChange={handleInventoryMonth} className='bg-white rounded-md px-2 text-right' defaultValue={inventory?.month}>
            {months.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select>
                   {hebrew ? (
                    <>
                  <TextField type="number" label="beginning inventory" defaultValue={inventory?.openInventory} className='bg-white rounded-md px-2 py-2' onChange={e => setOpenInventory(e.target.value)}/>
                  
                    </>
                   ) : (
                    <>
                     <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                  <TextField type="number" label="מלאי פתיחה" defaultValue={inventory?.openInventory} className='bg-white rounded-md px-2 py-2' onChange={e => setOpenInventory(e.target.value)}/>
                  </ThemeProvider>
                  </CacheProvider>
                    </>
                   )}
                  {hebrew ? (
                    <>
                  <TextField type="number" label="buying commodity" defaultValue={inventory?.stock} className='bg-white rounded-md px-2 py-2' onChange={e => setStock(e.target.value)}/>
                 
                    </>
                  ) : (
                    <>
                    <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                  <TextField type="number" label="קניית סחורה" defaultValue={inventory?.stock} className='bg-white rounded-md px-2 py-2' onChange={e => setStock(e.target.value)}/>
                  </ThemeProvider>
                  </CacheProvider>
                    </>
                  )}
                  <div className='bg-blue-200 px-2 py-2 mt-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 text-center font-semibold rounded-lg' onClick={()=> setIsOpenUpdate(false)}>{hebrew ? "cancel" : "בטל"}</div>

                </div>
              </form>
        </DialogContent>
    </Dialog>
    
    <Snackbar open={updateAlert} autoHideDuration={10000} onClose={handleUpdateAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleUpdateAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
         ניהול מלאי עודכן בהצלחה
 
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

      <Dialog open={openInventoryDialog} aria-labelledby="responsive-dialog-title">
      <div className='flex items-center justify-end p-2'>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeInventoryDialog}/>
        </div>
        <h1 className={`text-center ${hebrew ? "font-mono text-slate-600 text-4xl" : "font-mono text-amber-700 text-3xl"}`}>{hebrew ? "add inventory" : "הכנס ניהול מלאי"}</h1>
        {errors == 403 && (
          <div className='flex items-center justify-center text-center'>
          <Alert severity="error"> יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
  <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
</Alert>
        </div>
        )}
        <DialogContent>
        <form id="myform" onSubmit={addInventory} className='flex space-x-4'>
                <div className='flex flex-col space-y-2'>
                
                    <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "select a year" : "עבור שנה"}</InputLabel>
                    <Select onChange={handleInventoryYear} className='bg-white rounded-md px-2'>
            {years.map(year => (
                <MenuItem value={year}>{year}</MenuItem>
            ))}
                    </Select>
                    {hebrew ? (
                      <>
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="number" label="ending inventory" value={closeInventory} className='bg-white rounded-md px-2 py-2' onChange={e => setCloseInventory(e.target.value)}/>
                   
                      </>
                    ) : (
                      <>
                      <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="number" label="מלאי סגירה" value={closeInventory} className='bg-white rounded-md px-2 py-2' onChange={e => setCloseInventory(e.target.value)}/>
                    </ThemeProvider>
                    </CacheProvider>
                      </>
                    )}
                   {hebrew ? (
                    <>
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="number" label="monthly income" value={income} className='bg-white rounded-md px-2 py-2' onChange={e => setIncome(e.target.value)}/>
                  
                    </>
                   ) : (
                    <>
                     <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="number" label="הכנסה חודשית" value={income} className='bg-white rounded-md px-2 py-2' onChange={e => setIncome(e.target.value)}/>
                   </ThemeProvider>
                    </CacheProvider>
                    </>
                   )}
                  <button type='submit' disabled={openInventory == "" || month == "" || year == ""} className='bg-blue-200 px-2 py-2 mt-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg'>{hebrew ? "add inventory" : "הכנס ניהול מלאי"}</button>

                </div>

                <div className='flex flex-col space-y-2'>
                <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"}`}>{hebrew ? "select a month" : "עבור חודש"}</InputLabel>
                    <Select onChange={handleInventoryMonth} className='bg-white text-right rounded-md px-2'>
            {months.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select>
                    {hebrew ? (
                      <>
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="number" label="beginning inventory" value={openInventory} className='bg-white rounded-md px-2 py-2' onChange={e => setOpenInventory(e.target.value)}/>
                    
                      </>
                    ) : (
                      <>
                      <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="number" label="מלאי פתיחה" value={openInventory} className='bg-white rounded-md px-2 py-2' onChange={e => setOpenInventory(e.target.value)}/>
                    </ThemeProvider>
                    </CacheProvider>
                      </>
                    )}
                    {hebrew ? (
                      <>
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="number" label="buying commodity" value={stock} className='bg-white rounded-md px-2 py-2' onChange={e => setStock(e.target.value)}/>
                  
                      </>
                    ) : (
                      <>
                      <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                  <TextField InputLabelProps={{
        shrink: true,
      }} type="number" label="קניית סחורה" value={stock} className='bg-white rounded-md px-2 py-2' onChange={e => setStock(e.target.value)}/>
                    </ThemeProvider>
                    </CacheProvider>
                      </>
                    )}
                  <div className='bg-blue-200 px-2 py-2 mt-2 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 text-center font-semibold rounded-lg' onClick={closeInventoryDialog}>{hebrew ? "cancel" : "בטל"}</div>

                </div>
              </form>
        </DialogContent>
       
    </Dialog>
    </>
        
  )
  
}

export default Inventory