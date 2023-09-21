import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from "../App";
import axios from 'axios';
import { Dialog } from '@mui/material'
import { useQuery } from 'react-query'
import SwitchTheme2 from '../components/SwitchTheme2';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CheckIcon from '@mui/icons-material/Check';
import DoneIcon from '@mui/icons-material/Done';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Swal from 'sweetalert2'
import Chart from 'react-apexcharts';
import moment from 'moment'



const WorkerRole = () => {
    const [tooltipStatus2, setTooltipStatus2] = useState(0);
    const [arrow, setArrow] = useState(false)
    const [open, setOpen] = useState(true)
    const [openx, setOpenx] = useState(false)
    const [open1, setOpen1] = useState(true)
    const [colorx, setColorx] = useState("")
    const [description, setDescription] = useState("");
    const [taskDialog, setTaskDialog] = useState(false)
    const [toggle1, setToggle1] = useState(true)
    const [toggle2, setToggle2] = useState(true)
    const [toggle3, setToggle3] = useState(true)
    const [drawer, setDrawer] = useState(false)



    const navigate = useNavigate()
    const { globalTheme, hebrew, setHebrew } = useContext(ThemeContext)

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

    const radar = {
      series: [117995, 63432, 41987, 37223, 84256],
              options: {
                chart: {
                  type: 'polarArea',
                  foreColor: '#a3a3a3',
                  toolbar: {
                    offsetX: 0,
                    offsetY: 0,
                    // offsetY: hebrew ? -8 : -5,
                    show: true, // Show the toolbar
                    tools: {
                      menu: true, // Show only the Menu button
                      download: true,
                      zoom: false,
                      zoomin: true,
                      zoomout: true,
                      pan: false,
                      reset: false
                    }
                  },
                },
                dataLabels: {
                  enabled: true,
                },
                labels: ['הכנסות', 'סחורה', 'קבועות', 'משתנות', 'משכורות'],
                stroke: {
                  colors: ['#fff']
                },
                fill: {
                  opacity: 0.8
                },
                // responsive: [{
                //   breakpoint: 480,
                //   options: {
                //     chart: {
                //       width: 200
                //     },
                //     legend: {
                //       position: 'bottom'
                //     }
                //   }
                // }],
                legend: {
                  // horizontalAlign: hebrew ? 'left' : 'right',
                  // offsetX: 40,
                  // offsetY: windowWidth > 580 ? 10 : 0
                  
                  position: 'bottom',
                  horizontalAlign: 'center',
  
                }
              },
            
    }

    const chart = {
      series: [
        {
          name: 'Actual',
          data: [
            {
              x: 'ראשון',
              y: 1292,
              goals: [
                {
                  name: 'Expected',
                  value: 1400,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'שני',
              y: 4432,
              goals: [
                {
                  name: 'Expected',
                  value: 5400,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'שלישי',
              y: 5423,
              goals: [
                {
                  name: 'Expected',
                  value: 5200,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'רביעי',
              y: 6653,
              goals: [
                {
                  name: 'Expected',
                  value: 6500,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'חמישי',
              y: 8133,
              goals: [
                {
                  name: 'Expected',
                  value: 6600,
                  strokeHeight: 13,
                  strokeWidth: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'שישי',
              y: 7132,
              goals: [
                {
                  name: 'Expected',
                  value: 7500,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'שבת',
              y: 7332,
              goals: [
                {
                  name: 'Expected',
                  value: 8700,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            
          ]
        }
      ],
      options: {
        chart: {
          height: 350,
          foreColor: '#a3a3a3',
          type: 'bar'
        },
        plotOptions: {
          bar: {
            columnWidth: '60%'
          }
        },
        colors: ['#00E396'],
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['הכנסה', 'יעד'],
          markers: {
            fillColors: ['#00E396', '#775DD0']
          }
        }
      },
    }

    const time = {
      series: [
        {
          data: [
            {
              x: 'Analysis',
              y: [
                new Date('2019-02-27').getTime(),
                new Date('2019-03-04').getTime()
              ],
              fillColor: '#008FFB'
            },
            {
              x: 'Design',
              y: [
                new Date('2019-03-04').getTime(),
                new Date('2019-03-08').getTime()
              ],
              fillColor: '#00E396'
            },
            {
              x: 'Coding',
              y: [
                new Date('2019-03-07').getTime(),
                new Date('2019-03-10').getTime()
              ],
              fillColor: '#775DD0'
            },
            {
              x: 'Testing',
              y: [
                new Date('2019-03-08').getTime(),
                new Date('2019-03-12').getTime()
              ],
              fillColor: '#FEB019'
            },
            {
              x: 'Deployment',
              y: [
                new Date('2019-03-12').getTime(),
                new Date('2019-03-17').getTime()
              ],
              fillColor: '#FF4560'
            }
          ]
        }
      ],
      options: {
        chart: {
          height: 350,
          foreColor: '#a3a3a3',
          type: 'rangeBar'
        },
        
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            dataLabels: {
              hideOverflowingLabels: false
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val, opts) {
            var label = opts.w.globals.labels[opts.dataPointIndex]
            var a = moment(val[0])
            var b = moment(val[1])
            var diff = b.diff(a, 'days')
            return label + ': ' + diff + (diff > 1 ? ' days' : ' day')
          },
          style: {
            colors: ['#f3f4f5', '#fff']
          }
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          show: false
        },
        grid: {
          row: {
            colors: ['#f3f4f5', '#fff'],
            opacity: 1
          }
        }
      },
      
    }

    const getWorkerDashTasks = () => {
      const id = result?.id
      return axios.get('https://nartina.com/api/worker/all-dash-tasks/' + id, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
    }
    
    const {data: dashTasks, refetch: qqq} = useQuery('worker-dash-tasks', ()=> getWorkerDashTasks(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: false,
        refetchOnWindowFocus:false
    
      }) 

      const closeTasksColor = () => {
        setTimeout(()=> {
          setArrow(false)
        }, 600)
      }

      const addDashTask = (e) => {
        e.preventDefault();
        const id = result?.id
        axios.post("https://nartina.com/api/worker/add-dashtask/" + id, {
           description,
           color: colorx,
           date: new Date().toISOString().substring(0, 10)
        }, {
         headers: {
           Authorization: 'Bearer ' + result?.token,
       
          }
       })
        .then(res => {console.log(res.data)
        //  aaa()
         qqq()})
        .catch(err => console.log(err.response.data))
        .finally(()=> {setTaskDialog(false)
         setDescription("")
         setArrow(false)
         setColorx("")})
     }

      function handleOnDragEnd(results) {
        const id = result?.id;
        if (!results.destination) return;
      
        console.log(results)
        axios.get('https://nartina.com/api/worker/swap-dash-tasks2/' + id + "/" + results.source.index  + "/" + results.destination.index, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        })
        .then(res => {console.log(res.data)
        qqq()})
        .catch(err => console.log(err.response.data))
        // const items = Array.from(characters);
        // const [reorderedItem] = items.splice(result.source.index, 1);
        // items.splice(result.destination.index, 0, reorderedItem);
      
        // updateCharacters(items);
      }

      const finishTask = (id) => {
        axios.get("https://nartina.com/api/worker/finish-dash-task/" + id, {
          headers: {
            Authorization: 'Bearer ' + result?.token,
        
           }
        })
        .then(res => {console.log(res.data)
          qqq()})
        .catch(err => console.log(err.response.data))
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
          text: "!לא ניתן יהיה לשחזר את המשימה",
          icon: 'אזהרה',
          showCancelButton: true,
          confirmButtonText: '!כן מחק',
          cancelButtonText: '!לא למחוק',
          reverseButtons: true
        }).then((results) => {
          if (results.isConfirmed) {
            axios.delete("https://nartina.com/api/worker/delete-dash-task/" + id, {
              headers: {
                Authorization: 'Bearer ' + result?.token,
            
               }
            })
            .then(res => {
            console.log(res.data)
            // aaa()
            qqq()
            // setIde("")
              swalWithBootstrapButtons.fire(
                '!נמחק',
                'המשימה נמחקה בהצלחה.',
                'success'
              )
              }).
            catch(err => {console.log(err.response.data)
              swalWithBootstrapButtons.fire(
                'פעולה נכשלה',
                'מצטערים קרתה תקלה יש לנסות שוב :)',
                'error'
              )
              // setError(err.response.status)
            })
          } 
          else if (
            /* Read more about handling dismissals below */
            results.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'בוטל',
              'פעולה בוטלה המשימה לא נמחקה :)',
              'error'
            )
          }
        })
      }

  return (
    <>
    <div class={`antialiased bg-gray-50 dark:bg-gray-900 ${globalTheme == "light" && "dark"}`}>
    <div className='dark'>
    <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div class="flex flex-wrap justify-between items-center relative">
        <div class="flex justify-start items-center">
          <button
            onClick={()=> setDrawer(!drawer)}
            class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer airx:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Toggle sidebar</span>
          </button>
          <div class="flex items-center justify-between mr-4 cursor-pointer">
            <img
              src="https://flowbite.s3.amazonaws.com/logo.svg"
              class="mr-3 h-8"
              alt="Flowbite Logo"
            />
            <span class="hidden mmu:inline self-center text-2xl font-semibold whitespace-nowrap font-mono dark:text-white text-[#333]">Nartina</span>
          </div>
          <form action="#" method="GET" class="hidden md:block md:pl-2">
            <label for="topbar-search" class="sr-only">Search</label>
            <div class="relative md:w-64 md:w-96">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                name="email"
                id="topbar-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
              />
            </div>
          </form>
          
        </div>
        <div class="flex items-center lg:order-2">
          {/* <button
            type="button"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            class="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Toggle search</span>
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
              <path clip-rule="evenodd" fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
            </svg>
          </button> */}
          <div className='cursor-pointer relative right-2.5 bottom-0.5'>
            <SwitchTheme2 />
          </div>
          {/* <!-- Notifications --> */}
          <button
            type="button"
            onClick={()=> setToggle1(!toggle1)}
            class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span class="sr-only">View notifications</span>
            {/* <!-- Bell icon --> */}
            <svg
              aria-hidden="true"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
              ></path>
            </svg>
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            class={`${toggle1 && 'hidden'} absolute top-10 right-8 overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl`}
          >
            <div
              class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
            >
              Notifications
            </div>
            <div>
              <a
                href="#"
                class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                <div class="flex-shrink-0">
                  <img
                    class="w-11 h-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                    alt="Bonnie Green avatar"
                  />
                  <div
                    class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-blue-700 dark:border-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                      ></path>
                      <path
                        d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="pl-3 w-full">
                  <div
                    class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  >
                    New message from
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >Bonnie Green
                    </span>: "Hey, what's up? All set for the presentation?"
                  </div>
                  <div
                    class="text-xs font-medium text-blue-600 dark:text-blue-500"
                  >
                    a few moments ago
                  </div>
                </div>
              </a>
              <a
                href="#"
                class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                <div class="flex-shrink-0">
                  <img
                    class="w-11 h-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    alt="Jese Leos avatar"
                  />
                  <div
                    class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="pl-3 w-full">
                  <div
                    class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  >
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >Jese leos
                    </span>
                    and
                    <span class="font-medium text-gray-900 dark:text-white"
                      >5 others
                    </span>
                    started following you.
                  </div>
                  <div
                    class="text-xs font-medium text-blue-600 dark:text-blue-500"
                  >
                    10 minutes ago
                  </div>
                </div>
              </a>
              <a
                href="#"
                class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                <div class="flex-shrink-0">
                  <img
                    class="w-11 h-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                    alt="Joseph McFall avatar"
                  />
                  <div
                    class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="pl-3 w-full">
                  <div
                    class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  >
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >Joseph Mcfall
                    </span>
                    and
                    <span class="font-medium text-gray-900 dark:text-white"
                      >141 others
                    </span>
                    love your story. See it and view more stories.
                  </div>
                  <div
                    class="text-xs font-medium text-blue-600 dark:text-blue-500"
                  >
                    44 minutes ago
                  </div>
                </div>
              </a>
              <a
                href="#"
                class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                <div class="flex-shrink-0">
                  <img
                    class="w-11 h-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                    alt="Roberta Casas image"
                  />
                  <div
                    class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="pl-3 w-full">
                  <div
                    class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  >
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >Leslie Livingston
                    </span>
                    mentioned you in a comment:
                    <span
                      class="font-medium text-blue-600 dark:text-blue-500"
                      >@bonnie.green
                    </span>
                    what do you say?
                  </div>
                  <div
                    class="text-xs font-medium text-blue-600 dark:text-blue-500"
                  >
                    1 hour ago
                  </div>
                </div>
              </a>
              <a
                href="#"
                class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex-shrink-0">
                  <img
                    class="w-11 h-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png"
                    alt="Robert image"
                  />
                  <div
                    class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="pl-3 w-full">
                  <div
                    class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  >
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >Robert Brown
                    </span>
                    posted a new video: Glassmorphism - learn how to implement
                    the new design trend.
                  </div>
                  <div
                    class="text-xs font-medium text-blue-600 dark:text-blue-500"
                  >
                    3 hours ago
                  </div>
                </div>
              </a>
            </div>
            <a
              href="#"
              class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
            >
              <div class="inline-flex items-center">
                <svg
                  aria-hidden="true"
                  class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                View all
              </div>
            </a>
          </div>
          {/* <!-- Apps --> */}
          <button
            type="button"
            onClick={()=> setToggle2(!toggle2)}
            class="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span class="sr-only">View notifications</span>
            {/* <!-- Icon --> */}
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            class={`${toggle2 && 'hidden'} absolute top-8 right-4 overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}
          >
            <div
              class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
            >
              Apps
            </div>
            <div class="grid grid-cols-3 gap-4 p-4">
              <a
                href="#"
                class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              >
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div class="text-sm text-gray-900 dark:text-white">Sales</div>
              </a>
              <a
                href="#"
                class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              >
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                  ></path>
                </svg>
                <div class="text-sm text-gray-900 dark:text-white">Users</div>
              </a>
              <a
                href="#"
                class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              >
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div class="text-sm text-gray-900 dark:text-white">Inbox</div>
              </a>
              <a
                href="#"
                class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              >
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div class="text-sm text-gray-900 dark:text-white">
                  Profile
                </div>
              </a>
              <a
                href="#"
                class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              >
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div class="text-sm text-gray-900 dark:text-white">
                  Settings
                </div>
              </a>
              <a
                href="#"
                class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              >
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div class="text-sm text-gray-900 dark:text-white">
                  Products
                </div>
              </a>
              <a
                href="#"
                class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              >
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div class="text-sm text-gray-900 dark:text-white">
                  Pricing
                </div>
              </a>
              <a
                href="#"
                class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              >
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div class="text-sm text-gray-900 dark:text-white">
                  Billing
                </div>
              </a>
              <a
                href="#"
                class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              >
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  ></path>
                </svg>
                <div class="text-sm text-gray-900 dark:text-white">
                  Logout
                </div>
              </a>
            </div>
          </div>
          <button
            type="button"
            class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={()=> setToggle3(!toggle3)}
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
              alt="user photo"
            />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            class={`${toggle3 && 'hidden'} absolute top-8 right-1 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}
            id="dropdown"
          >
            <div class="py-3 px-4">
              <span
                class="block text-sm font-semibold text-gray-900 dark:text-white"
                >Neil Sims
              </span>
              <span
                class="block text-sm text-gray-900 truncate dark:text-white"
                >name@flowbite.com
              </span>
            </div>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >My profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >Account settings
                </a>
              </li>
            </ul>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  ><svg
                    class="mr-2 w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  My likes
                  </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  ><svg
                    class="mr-2 w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                    ></path>
                  </svg>
                  Collections
                  </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <span class="flex items-center">
                    <svg
                      aria-hidden="true"
                      class="mr-2 w-5 h-5 text-blue-600 dark:text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Pro version
                  </span>
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    </div>

    {/* <!-- Sidebar --> */}

   {!hebrew ? (
    <>
     <aside
          class={`fixed top-0 shadow ${!drawer ? 'right-0 translate-x-full' : ''} dark z-40 w-64 h-screen pt-14 transition-transform airx:translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}

    >
     <div class="overflow-y-auto scrollbar py-5 px-3 h-full bg-white dark:bg-gray-800">
        <form action="#" method="GET" class="md:hidden mb-2">
          <label for="sidebar-search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="sidebar-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
            />
          </div>
        </form>
        <ul class="space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center justify-end p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700 group"
            >
                <span class="mr-3">דף הבית</span>
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
            </a>
          </li>

          <li>
             <li>  
            <div
              class="flex items-center justify-between p-2 cursor-pointer text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={()=> setOpen1(!open1)}
            >
                 <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
                <div className='flex items-center justify-center space-x-1'>
                <h1 class="mr-3">דף הבית</h1>
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
                </div>
            </div>

          </li>
            <ul class={`py-2 space-y-2 ${open1 && 'hidden'}`}>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-end p-2 pr-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >דו"חות
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-end p-2 pr-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >משימות
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-end p-2 pr-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >פגישות
                </a>
              </li>
            </ul>
          </li>

          <li>
             <li>  
            <div
              class="flex items-center justify-between p-2 cursor-pointer text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={()=> setOpen(!open)}
            >
                 <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
                <div className='flex items-center justify-center space-x-1'>
                <h1 class="mr-3">דף הבית</h1>
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
                </div>
            </div>

          </li>
            <ul class={`py-2 space-y-2 ${open && 'hidden'}`}>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Kanban
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Calendar
                </a>
              </li>
            </ul>
          </li>

          <li>
             <li>  
            <div
              class="flex items-center justify-between p-2 cursor-pointer text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={()=> setOpen(!open)}
            >
                 <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
                <div className='flex items-center justify-center space-x-1'>
                <h1 class="mr-3">דף הבית</h1>
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
                </div>
            </div>

          </li>
            <ul class={`py-2 space-y-2 ${open && 'hidden'}`}>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Kanban
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Calendar
                </a>
              </li>
            </ul>
          </li>

          <li>
             <li>  
            <div
              class="flex items-center justify-between p-2 cursor-pointer text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={()=> setOpen(!open)}
            >
                 <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
                <div className='flex items-center justify-center space-x-1'>
                <h1 class="mr-3">דף הבית</h1>
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
                </div>
            </div>

          </li>
            <ul class={`py-2 space-y-2 ${open && 'hidden'}`}>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Kanban
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Calendar
                </a>
              </li>
            </ul>
          </li>
                {/* <div className='h-[0.3px] w-full bg-gray-500'/> */}
          <li>
             <li>  
            <div
              class="flex items-center justify-between p-2 cursor-pointer text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={()=> setOpen(!open)}
            >
                 <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
                <div className='flex items-center justify-center space-x-1'>
                <h1 class="mr-3">דף הבית</h1>
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
                </div>
            </div>

          </li>
            <ul class={`py-2 space-y-2 ${open && 'hidden'}`}>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Kanban
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Calendar
                </a>
              </li>
            </ul>
          </li>
         
          <li>
             <li>  
            <div
              class="flex items-center justify-between p-2 cursor-pointer text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={()=> setOpen(!open)}
            >
                 <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
                <div className='flex items-center justify-center space-x-1'>
                <h1 class="mr-3">דף הבית</h1>
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
                </div>
            </div>

          </li>
            <ul class={`py-2 space-y-2 ${open && 'hidden'}`}>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Kanban
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Calendar
                </a>
              </li>
            </ul>
          </li>
         
          <div className='h-[0.1px] w-full bg-gray-500'/>
          <li>
             <li>  
            <div
              class="flex items-center justify-between p-2 cursor-pointer text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={()=> setOpen(!open)}
            >
                 <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
                <div className='flex items-center justify-center space-x-1'>
                <h1 class="mr-3">דף הבית</h1>
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
                </div>
            </div>

          </li>
            <ul class={`py-2 space-y-2 ${open && 'hidden'}`}>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Kanban
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Calendar
                </a>
              </li>
            </ul>
          </li>
          <div className='h-[0.1px] w-full bg-gray-500'/>
          <li>
             <li>  
            <div
              class="flex items-center justify-between p-2 cursor-pointer text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={()=> setOpen(!open)}
            >
                 <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
                <div className='flex items-center justify-center space-x-1'>
                <h1 class="mr-3">דף הבית</h1>
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
                </div>
            </div>

          </li>
            <ul class={`py-2 space-y-2 ${open && 'hidden'}`}>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Kanban
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Calendar
                </a>
              </li>
            </ul>
          </li>
          
          
        </ul>
      </div>
      <div
        class="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20"
      >
        <a
          href="#"
          class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            aria-hidden="true"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
            ></path>
          </svg>
        </a>
        <a
          href="#"
          data-tooltip-target="tooltip-settings"
          class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            aria-hidden="true"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
        <div
          id="tooltip-settings"
          role="tooltip"
          class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
        >
          Settings page
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          type="button"
          data-dropdown-toggle="language-dropdown"
          class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:hover:text-white dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={()=> setHebrew(!hebrew)}
        >
          <svg
            aria-hidden="true"
            class="h-5 w-5 rounded-full mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 3900 3900"
          >
            <path fill="#b22234" d="M0 0h7410v3900H0z" />
            <path
              d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
              stroke="#fff"
              stroke-width="300"
            />
            <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
            <g fill="#fff">
              <g id="d">
                <g id="c">
                  <g id="e">
                    <g id="b">
                      <path
                        id="a"
                        d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                      />
                      {/* <use xlink:href="#a" y="420" /> */}
                      {/* <use xlink:href="#a" y="840" /> */}
                      {/* <use xlink:href="#a" y="1260" /> */}
                    </g>
                    {/* <use xlink:href="#a" y="1680" /> */}
                  </g>
                  {/* <use xlink:href="#b" x="247" y="210" /> */}
                </g>
                {/* <use xlink:href="#c" x="494" /> */}
              </g>
              {/* <use xlink:href="#d" x="988" /> */}
              {/* <use xlink:href="#c" x="1976" /> */}
              {/* <use xlink:href="#e" x="2470" /> */}
            </g>
          </svg>
        </button>
        {/* <!-- Dropdown --> */}
        <div
          class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          id="language-dropdown"
        >
          <ul class="py-1" role="none">
            <li>
              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-us"
                    viewBox="0 0 512 512"
                  >
                    <g fill-rule="evenodd">
                      <g stroke-width="1pt">
                        <path
                          fill="#bd3d44"
                          d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                          transform="scale(3.9385)"
                        />
                        <path
                          fill="#fff"
                          d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                          transform="scale(3.9385)"
                        />
                      </g>
                      <path
                        fill="#192f5d"
                        d="M0 0h98.8v70H0z"
                        transform="scale(3.9385)"
                      />
                      <path
                        fill="#fff"
                        d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                        transform="scale(3.9385)"
                      />
                    </g>
                  </svg>
                  English (US)
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-de"
                    viewBox="0 0 512 512"
                  >
                    <path fill="#ffce00" d="M0 341.3h512V512H0z" />
                    <path d="M0 0h512v170.7H0z" />
                    <path fill="#d00" d="M0 170.7h512v170.6H0z" />
                  </svg>
                  Deutsch
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-it"
                    viewBox="0 0 512 512"
                  >
                    <g fill-rule="evenodd" stroke-width="1pt">
                      <path fill="#fff" d="M0 0h512v512H0z" />
                      <path fill="#009246" d="M0 0h170.7v512H0z" />
                      <path fill="#ce2b37" d="M341.3 0H512v512H341.3z" />
                    </g>
                  </svg>
                  Italiano
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    id="flag-icon-css-cn"
                    viewBox="0 0 512 512"
                  >
                    <defs>
                      <path
                        id="a"
                        fill="#ffde00"
                        d="M1-.3L-.7.8 0-1 .6.8-1-.3z"
                      />
                    </defs>
                    <path fill="#de2910" d="M0 0h512v512H0z" />
                    <use
                      width="30"
                      height="20"
                      transform="matrix(76.8 0 0 76.8 128 128)"
                    //   xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-121 142.6 -47) scale(25.5827)"
                    //   xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-98.1 198 -82) scale(25.6)"
                    //   xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-74 272.4 -114) scale(25.6137)"
                    //   xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="matrix(16 -19.968 19.968 16 256 230.4)"
                    //   xlink:href="#a"
                    />
                  </svg>
                  中文 (繁體)
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    </>
   ) : (
    <>
     <aside
          // class={`fixed top-0 ${!hebrew ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'} z-40 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 airx:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          class={`fixed top-0 left-0 ${!drawer ? 'left-0 -translate-x-full' : ''} z-40 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 airx:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}

      aria-label="Sidenav"
      id="drawer-navigation"
    >
     <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <form action="#" method="GET" class="md:hidden mb-2">
          <label for="sidebar-search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="sidebar-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
            />
          </div>
        </form>
        <ul class="space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span class="ml-3">Overview</span>
            </a>
          </li>
          <li>
            <button
              type="button"
              class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-pages"
              data-collapse-toggle="dropdown-pages"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 text-left whitespace-nowrap"
                >Pages
              </span>
              <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <ul id="dropdown-pages" class="hidden py-2 space-y-2">
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Kanban
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Calendar
                </a>
              </li>
            </ul>
          </li>
          <li>
            <button
              type="button"
              class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-sales"
              data-collapse-toggle="dropdown-sales"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 text-left whitespace-nowrap"
                >Sales
              </span>
              <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <ul id="dropdown-sales" class="hidden py-2 space-y-2">
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Billing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Invoice
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                ></path>
                <path
                  d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Messages</span>
              <span
                class="inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full text-blue-800 bg-blue-100 dark:bg-blue-200 dark:text-blue-800"
              >
                4
              </span>
            </a>
          </li>
          <li>
            <button
              type="button"
              class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-authentication"
              data-collapse-toggle="dropdown-authentication"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 text-left whitespace-nowrap"
                >Authentication
              </span>
              <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <ul id="dropdown-authentication" class="hidden py-2 space-y-2">
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Sign In
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Sign Up
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >Forgot Password
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <ul
          class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
        >
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fill-rule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-3">Docs</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                ></path>
              </svg>
              <span class="ml-3">Components</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-3">Help</span>
            </a>
          </li>
        </ul>
      </div>
      <div
        class="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20"
      >
        <a
          href="#"
          class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            aria-hidden="true"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
            ></path>
          </svg>
        </a>
        <a
          href="#"
          data-tooltip-target="tooltip-settings"
          class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            aria-hidden="true"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
        <div
          id="tooltip-settings"
          role="tooltip"
          class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
        >
          Settings page
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          type="button"
          data-dropdown-toggle="language-dropdown"
          class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:hover:text-white dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={()=> setHebrew(!hebrew)}
        >
          <svg
            aria-hidden="true"
            class="h-5 w-5 rounded-full mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 3900 3900"
          >
            <path fill="#b22234" d="M0 0h7410v3900H0z" />
            <path
              d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
              stroke="#fff"
              stroke-width="300"
            />
            <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
            <g fill="#fff">
              <g id="d">
                <g id="c">
                  <g id="e">
                    <g id="b">
                      <path
                        id="a"
                        d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                      />
                      {/* <use xlink:href="#a" y="420" /> */}
                      {/* <use xlink:href="#a" y="840" /> */}
                      {/* <use xlink:href="#a" y="1260" /> */}
                    </g>
                    {/* <use xlink:href="#a" y="1680" /> */}
                  </g>
                  {/* <use xlink:href="#b" x="247" y="210" /> */}
                </g>
                {/* <use xlink:href="#c" x="494" /> */}
              </g>
              {/* <use xlink:href="#d" x="988" /> */}
              {/* <use xlink:href="#c" x="1976" /> */}
              {/* <use xlink:href="#e" x="2470" /> */}
            </g>
          </svg>
        </button>
        {/* <!-- Dropdown --> */}
        <div
          class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          id="language-dropdown"
        >
          <ul class="py-1" role="none">
            <li>
              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-us"
                    viewBox="0 0 512 512"
                  >
                    <g fill-rule="evenodd">
                      <g stroke-width="1pt">
                        <path
                          fill="#bd3d44"
                          d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                          transform="scale(3.9385)"
                        />
                        <path
                          fill="#fff"
                          d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                          transform="scale(3.9385)"
                        />
                      </g>
                      <path
                        fill="#192f5d"
                        d="M0 0h98.8v70H0z"
                        transform="scale(3.9385)"
                      />
                      <path
                        fill="#fff"
                        d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                        transform="scale(3.9385)"
                      />
                    </g>
                  </svg>
                  English (US)
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-de"
                    viewBox="0 0 512 512"
                  >
                    <path fill="#ffce00" d="M0 341.3h512V512H0z" />
                    <path d="M0 0h512v170.7H0z" />
                    <path fill="#d00" d="M0 170.7h512v170.6H0z" />
                  </svg>
                  Deutsch
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-it"
                    viewBox="0 0 512 512"
                  >
                    <g fill-rule="evenodd" stroke-width="1pt">
                      <path fill="#fff" d="M0 0h512v512H0z" />
                      <path fill="#009246" d="M0 0h170.7v512H0z" />
                      <path fill="#ce2b37" d="M341.3 0H512v512H341.3z" />
                    </g>
                  </svg>
                  Italiano
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div class="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    id="flag-icon-css-cn"
                    viewBox="0 0 512 512"
                  >
                    <defs>
                      <path
                        id="a"
                        fill="#ffde00"
                        d="M1-.3L-.7.8 0-1 .6.8-1-.3z"
                      />
                    </defs>
                    <path fill="#de2910" d="M0 0h512v512H0z" />
                    <use
                      width="30"
                      height="20"
                      transform="matrix(76.8 0 0 76.8 128 128)"
                    //   xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-121 142.6 -47) scale(25.5827)"
                    //   xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-98.1 198 -82) scale(25.6)"
                    //   xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-74 272.4 -114) scale(25.6137)"
                    //   xlink:href="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="matrix(16 -19.968 19.968 16 256 230.4)"
                    //   xlink:href="#a"
                    />
                  </svg>
                  中文 (繁體)
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    </>
   )}

    <main class={`p-4 h-auto pt-20 bg-gray-100 dark:bg-gray-700 ${!hebrew ? 'airx:mr-64' : 'airx:ml-64'}`}>
    {hebrew ? (
         <div class={`flex items-center justify-between bg-white mb-4 dark:bg-gray-600 rounded-lg shadow px-8 py-2 relative bottom-1`} >
           
          <div class="flex flex-col items-start justify-start ">
            <h1 class="text-sm font-medium text-gray-900 dark:text-gray-100">Hi {result?.firstName}</h1>
            <h1 class="text-sm text-gray-500 dark:text-neutral-300">welcome to the system, have a nice day!🚀</h1>
          </div>
         <div className="flex items-center justify-center space-x-14">
         <h1 class="hidden sm:inline px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-300">April 5, 2023</h1>
         <h1 class="px-2 text-xs font-semibold rounded-full py-[3px] bg-yellow-500 cursor-pointer hover:bg-yellow-400" onClick={()=> navigate('/chat')}>
         Success
         </h1>
         </div>
    
         </div>
       ) : (
        <div class={`flex items-center justify-between bg-white mb-4 dark:bg-gray-600 shadow px-8 py-2 rounded-lg relative bottom-1`} >
        <div className="flex items-center justify-center space-x-14">
        <h1 class="px-4 text-xs font-semibold rounded-full py-[3px] bg-yellow-500 cursor-pointer hover:bg-yellow-400" onClick={()=> navigate('/chat')}>
        כניסה
        {/* {windowWidth} */}
        </h1>
        <div></div>
        <h1 class="hidden sm:inline py-4 whitespace-nowrap text-sm text-gray-500 relative right-10 dark:text-neutral-300">April 5, 2023</h1>
        </div>
        <div class="flex flex-col items-end justify-end relative xlu:right-7 uuu:right-0">
            <h1 class="text-sm font-medium text-[#373D3F] tracking-wide dark:text-gray-100">!ברוכים הבאים <span className="font-bold text-gray-800 dark:text-neutral-300">{result?.firstName}</span></h1>
            <h1 class="text-xs md:text-sm text-gray-500 dark:text-neutral-300 text-right">🚀. שיהיה לך יום קסום</h1>
          </div>
         
        </div>
       )}
      <div class="grid grid-cols-1 sm:grid-cols-2 mdx:grid-cols-4 gap-4 mb-8">
      <div class="w-full p-6 overflow-hidden bg-blue-500 dark:bg-gray-800 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס ספק חדש
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                  עידכון 
            </p>
            <p class="text-sm text-blue-200">
                עידכון פרטי ספק
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> setOpenx(true)}>
            הכנס
        </button>
    </div>
</div>
<div class="w-full p-6 overflow-hidden bg-blue-500 dark:bg-gray-800 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס דו"ח יומי
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                 עידכון  
            </p>
            <p class="text-sm text-blue-200">
            עידכון דו"ח
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> setOpenx(true)}>
            הכנס
        </button>
    </div>
</div>
<div class="w-full p-6 overflow-hidden bg-blue-500 dark:bg-gray-800 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס דו"ח מסעדות
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                עידכון
            </p>
            <p class="text-sm text-blue-200">
                עידכון דו"ח 
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> setOpenx(true)}>
            הכנס
        </button>
    </div>
</div>
<div class="w-full p-6 overflow-hidden bg-blue-500 dark:bg-gray-800 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס חשבונית
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                    עידכון    
            </p>
            <p class="text-sm text-blue-200">
                 עידכון חשבונית
            </p>
        </div>
        <span class="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> setOpenx(true)}>
            הכנס
        </button>
    </div>
</div>


{/* <div class="w-full p-6 overflow-hidden bg-blue-500 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס משתמש
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                100% עד
            </p>
            <p class="text-sm text-blue-200">
                הכנסת מסמכים
            </p>
        </div>
        <span class="p-2 bg-white rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> navigate("/new-user")}>
            הכנס
        </button>
    </div>
</div>
<div class="w-full p-6 overflow-hidden bg-blue-500 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס משתמש
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                100% עד
            </p>
            <p class="text-sm text-blue-200">
                הכנסת מסמכים
            </p>
        </div>
        <span class="p-2 bg-white rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> navigate("/new-user")}>
            הכנס
        </button>
    </div>
</div>
<div class="w-full p-6 overflow-hidden bg-blue-500 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס משתמש
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                100% עד
            </p>
            <p class="text-sm text-blue-200">
                הכנסת מסמכים
            </p>
        </div>
        <span class="p-2 bg-white rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> navigate("/new-user")}>
            הכנס
        </button>
    </div>
</div>
<div class="w-full p-6 overflow-hidden bg-blue-500 shadow-lg rounded-xl">
    <p class="text-xl text-white text-right">
        הכנס משתמש
    </p>
    <div class="flex items-center justify-between my-4 text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class=" text-white">
               ניהול מרחוק
            </p>
            <p class="text-sm text-blue-200">
                בחירת הרשאות
            </p>
        </div>
        <span class="p-2 bg-white rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                </path>
            </svg>
        </span>
    </div>
    <div class="flex items-center justify-between text-blue-500 rounded">
        <div class="flex flex-col items-end w-full mr-2 justify-evenly">
            <p class="text-lg text-white">
                100% עד
            </p>
            <p class="text-sm text-blue-200">
                הכנסת מסמכים
            </p>
        </div>
        <span class="p-2 bg-white rounded-lg">
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                </path>
            </svg>
        </span>
    </div>
    <div class="mt-4">
        <button type="button" class="w-full px-4 py-2 text-base tracking-wide font-semibold text-center text-white transition duration-200 ease-in bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=> navigate("/new-user")}>
            הכנס
        </button>
    </div>
</div> */}

      </div>
      
      {hebrew ? (
        <div class="rounded-lg h-96 overflow-auto scrollbar-none" >
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-900/50 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Color
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">
                        Silver
                    </td>
                    <td class="px-6 py-4">
                        Laptop
                    </td>
                    <td class="px-6 py-4">
                        $2999
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Microsoft Surface Pro
                    </th>
                    <td class="px-6 py-4">
                        White
                    </td>
                    <td class="px-6 py-4">
                        Laptop PC
                    </td>
                    <td class="px-6 py-4">
                        $1999
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Magic Mouse 2
                    </th>
                    <td class="px-6 py-4">
                        Black
                    </td>
                    <td class="px-6 py-4">
                        Accessories
                    </td>
                    <td class="px-6 py-4">
                        $99
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">
                        Silver
                    </td>
                    <td class="px-6 py-4">
                        Laptop
                    </td>
                    <td class="px-6 py-4">
                        $2999
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Microsoft Surface Pro
                    </th>
                    <td class="px-6 py-4">
                        White
                    </td>
                    <td class="px-6 py-4">
                        Laptop PC
                    </td>
                    <td class="px-6 py-4">
                        $1999
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Magic Mouse 2
                    </th>
                    <td class="px-6 py-4">
                        Black
                    </td>
                    <td class="px-6 py-4">
                        Accessories
                    </td>
                    <td class="px-6 py-4">
                        $99
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
    
         </div>
      ) : (
        <div class="rounded-lg h-96 overflow-auto scrollbar-none mb-4" >
    <table class="w-full text-sm text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-900 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 text-md sm:text-lg">
                    ערוך
                </th>
                <th scope="col" class="px-6 py-3 text-md sm:text-lg">
                    סכום  
                </th>
                <th scope="col" class="px-6 py-3 text-md sm:text-lg">
                    שם ספק
                </th>
                <th scope="col" class="px-6 py-3 text-md sm:text-lg">
                    תאריך
                </th>
                <th scope="col" class="px-6 py-3 text-md sm:text-lg">
                    מספר דו"ח
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   3,788
                </th>
                <td class="px-6 py-4">
                אריזות ירושלים
                </td>
                <td class="px-6 py-4">
                17/2/2023
                </td>
                <td class="px-6 py-4">
                   1587#
                </td>
                
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    2,389
                </th>
                <td class="px-6 py-4">
                    קופילנד
                </td>
                <td class="px-6 py-4">
                15/2/2023
                </td>
                <td class="px-6 py-4">
                    2546#
                </td>
               
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1,247
                </th>
                <td class="px-6 py-4">
                    פעמית
                </td>
                <td class="px-6 py-4">
                19/2/2023
                </td>
                <td class="px-6 py-4">
                   4738#
                </td>
                
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    877
                </th>
                <td class="px-6 py-4">
                    תנובה
                </td>
                <td class="px-6 py-4">
                11/2/2023
                </td>
                <td class="px-6 py-4">
                    1347#
                </td>
               
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1,760
                </th>
                <td class="px-6 py-4">
                    קוקה קולה
                </td>
                <td class="px-6 py-4">
                26/2/2023
                </td>
                <td class="px-6 py-4">
                    4352#
                </td>
                
            </tr>
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">עריכה</a>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    540
                </th>
                <td class="px-6 py-4">
                    טרה
                </td>
                <td class="px-6 py-4">
                8/2/2023
                </td>
                <td class="px-6 py-4">
                   1632#
                </td>
                
            </tr>
        </tbody>
    </table>

     </div>
      )}


<div className={`grid grid-cols-1 mdx:grid-cols-2 gap-8 mdx:gap-4 mb-8 mt-2`}>

 
 <div class={`w-full bg-white relative py-2 px-3 border h-[400px] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
 <div className='flex flex-col items-end max-h-[370px] overflow-y-auto scrollbar-none p-4 dark:p-5'>
<ol class="relative border-r border-gray-200 dark:border-gray-700"> 
  <li class="mb-10 mr-6"> 
    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -right-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"> 
      <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
      </svg>
    </span>
    <h3 class="flex items-center justify-end mb-1 text-lg font-semibold text-gray-900 dark:text-white"><span
  class="inline-flex items-center justify-center rounded-full mr-2 bg-amber-100 px-2.5 py-0.5 text-amber-700"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="-ms-1 me-1.5 h-4 w-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
    />
  </svg>

  <p class="whitespace-nowrap text-sm">עדכון</p>
</span> עודכן דו"ח יומי </h3> 
    <time class="block mb-2 text-sm text-right font-normal leading-none text-gray-400 dark:text-gray-500"><span className='font-mono'>14:36</span> ינואר 13 , 2022 בוצע</time>
    <p className='mb-2 text-base text-right font-normal text-gray-500 dark:text-gray-400'>פרטי דו"ח 22-06-2023, סכום: ₪7698</p>
<div className='flex items-center justify-end space-x-2'>
<img alt="" className="self-center flex-shrink-0 w-8 h-8 bg-center bg-cover rounded-full bg-gray-500" src={`https://source.unsplash.com/100x100/?portrait?${Math.floor(Math.random() * 100) + 1}`} />
<h1 className='text-gray-900 dark:text-gray-500'>רוני גייגו</h1>
<h1 className='font-bold text-[#333] dark:text-[#ccc]'>ביצוע פעולה</h1>
</div>
    {/* <p class="mb-4 text-base text-right font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p> */}
    </li>

    <li class="mb-10 mr-6"> 
    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -right-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"> 
      <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
      </svg>
    </span>
    <h3 class="flex items-center justify-end mb-1 text-lg font-semibold text-gray-900 dark:text-white"><span
  class="inline-flex items-center justify-center rounded-full bg-emerald-100 mr-2 px-2.5 py-0.5 text-emerald-700"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="-ms-1 me-1.5 h-4 w-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>

  <p class="whitespace-nowrap text-sm">הוכנס</p>
</span> הוכנס דו"ח מסעדות </h3> 
<time class="block mb-2 text-sm text-right font-normal leading-none text-gray-400 dark:text-gray-500"><span className='font-mono'>14:36</span> ינואר 13 , 2022 בוצע</time>
    <p className='mb-2 text-base text-right font-normal text-gray-500 dark:text-gray-400'>פרטי דו"ח 22-06-2023, סכום: ₪8928</p>
    <div className='flex items-center justify-end space-x-2'>
<img alt="" className="self-center flex-shrink-0 w-8 h-8 bg-center bg-cover rounded-full bg-gray-500" src={`https://source.unsplash.com/100x100/?portrait?${Math.floor(Math.random() * 100) + 1}`} />
<h1 className='text-gray-900 dark:text-gray-500'>לאה רושפלד</h1>
<h1 className='font-bold text-[#333] dark:text-[#ccc]'>ביצוע פעולה</h1>
</div>
    </li>

    <li class="mb-10 mr-6"> 
    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -right-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"> 
      <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
      </svg>
    </span>
    <h3 class="flex items-center justify-end mb-1 text-lg font-semibold text-gray-900 dark:text-white"><span
  class="inline-flex items-center justify-center rounded-full bg-red-100 mr-3 px-2.5 py-0.5 text-red-700"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="-ms-1 me-1.5 h-4 w-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>

  <p class="whitespace-nowrap text-sm">מחיקה</p>
</span> מחיקת חשבונית מס </h3> 
<time class="block mb-2 text-sm text-right font-normal leading-none text-gray-400 dark:text-gray-500"><span className='font-mono'>20:17</span> ינואר 13 , 2022 בוצע</time>
    <p className='mb-2 text-base text-right font-normal text-gray-500 dark:text-gray-400'>פרטי חשבונית 16-06-2023, סכום: ₪1923</p>
    <div className='flex items-center justify-end space-x-2'>
<img alt="" className="self-center flex-shrink-0 w-8 h-8 bg-center bg-cover rounded-full bg-gray-500" src={`https://source.unsplash.com/100x100/?portrait?${Math.floor(Math.random() * 100) + 1}`} />
<h1 className='text-gray-900 dark:text-gray-500'>רוני גייגו</h1>
<h1 className='font-bold text-[#333] dark:text-[#ccc]'>ביצוע פעולה</h1>
</div>
    </li>
    </ol>
</div>
 
 </div>
 
     <div class="w-full relative bg-white border h-[400px] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
   <div className="flex items-center justify-between p-4 relative bottom-1">
    
     { (dashTasks?.data && dashTasks?.data.length) ? (<div className="flex justify-center space-x-1 text-gray-800">
 
   <div class="inline-flex mt-2 xs:mt-0">
       <button class="px-4 py-1 text-sm font-medium text-white bg-gray-700 rounded-l-md hover:bg-gray-900 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
           Prev
       </button>
       <button class="px-4 py-1 text-sm font-medium text-white bg-sky-700 border-0 border-l border-gray-700 rounded-r-md hover:bg-sky-800 dark:bg-sky-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-sky-800 dark:hover:text-white">
           Next
       </button>
   </div>
 
 </div>) : (
       <div></div>
     ) }   
     <div className="flex items-center justify-center space-x-1">
         <button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
         
         <div onMouseOver={() => setTooltipStatus2(1)} onMouseOut={() => setTooltipStatus2(0)}>
         <InformationCircleIcon 
         strokeWidth={2} 
         className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
       />
         </div>
       {tooltipStatus2 == 1 && (
                         <div role="tooltip" className="z-50 w-64 absolute left-0 ml-52 transition duration-150 ease-in-out shadow-lg bg-white p-4 rounded">
                            
                             <p className="text-sm font-bold text-gray-800 pb-1">Keep track of follow ups</p>
                             <p className="text-xs leading-4 text-gray-600 pb-3">Reach out to more prospects at the right moment.</p>
                             <div className="flex justify-between">
                                 <div className="flex items-center">
                                     <span className="text-xs font-bold text-indigo-700">Step 1 of 4</span>
                                 </div>
                                 <div className="flex items-center">
                                     <span className="text-xs text-gray-600 underline mr-2 cursor-pointer">Skip Tour</span>
                                     <button className="focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-5 py-1 text-xs">Next</button>
                                 </div>
                             </div>
                         </div>
                     )}
         </button>
       <h1 className={`font-sans font-bold text-lg text-[#495057] dark:text-gray-300`}>מטלות קצרות</h1>
       <AddTaskIcon className="text-[#ccc]"/>
     </div>
   </div>
         {(dashTasks?.data && dashTasks?.data.length) ? (
           <>
           <div className="w-full h-[0.5px] bg-gray-200 relative bottom-2"/>
           <div className={`h-[280px] overflow-y-auto pb-3 scrollbar-none`}>
   <DragDropContext onDragEnd={handleOnDragEnd}>
           <Droppable droppableId="characters">
             {(provided) => (
               <div className={`flex flex-col px-4 space-y-0.5 dark:space-y-1`} {...provided.droppableProps} ref={provided.innerRef}>
                 {dashTasks?.data.map(({id, description, finish, number, color}, index) => {
                   return (
                     <Draggable key={number} draggableId={number.toString()} index={number}>
                       {(provided) => (
                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                           <div className={`flex items-center justify-between pl-4 h-11 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-900/50 dark:hover:bg-[#343A40] dark:rounded w-full border-r-[3px] border-r-gray-300 dark:border-r-4 dark:border-r-gray-400`}>
       <div className='flex items-center justify-center'>
       <div className='cursor-pointer' onClick={()=> handleAlert(id)}>
           <svg class="w-8 h-8 text-gray-500 hover:text-blue-600 dark:text-gray-400  dark:hover:text-blue-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-200 p-1"
               fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
               </path>
           </svg>
       </div>
       
       </div>
     <div className='flex items-center justify-center'>
     <div className={`flex items-center justify-center ${finish ? 'bg-pink-400 text-white' : (color == "red" ? 'text-white bg-red-500' : color == "yellow" ? 'text-[#343A40] bg-yellow-500' : color == "green" ? 'text-white bg-green-500' : color == "blue" ? 'text-white bg-blue-500' : 'text-white bg-blue-500')} space-x-[2px] h-4 w-fit px-1 py-[1px] mr-5 rounded-md`}>
       {finish ? (
         <h1 className={`text-[9px] font-semibold`}>הסתיים</h1>
       ) : (
         <h1 className={`text-[9px] font-semibold`}>{`${color == "red" ? 'חשוב מאוד' : color == "yellow" ? 'חשוב' : color == "green" ? 'לא חשוב' : color == "blue" ? 'קצת חשוב' : 'אין דירוג'}`}</h1>
       )}
         <AccessTimeIcon style={{fontSize: '12px'}} className="text-white"/>
     </div>
     <h1 className={`font-sans font-medium text-sm text-gray-500 dark:text-neutral-300 mr-2 ${finish && 'line-through'} relative right-1`}>{description}</h1>
     <div className="flex items-center justify-center -space-x-2">
     {finish ? (
       <div className="flex items-center justify-center mr-2 h-5 w-5 bg-blue-500 cursor-pointer" onClick={()=> finishTask(id)}>
       <DoneIcon fontSize="small" className="text-white"/>
       </div>
     ) : (
     <div className="flex items-center justify-center mr-2 h-5 w-5 bg-white dark:bg-gray-300 border-4 border-blue-500 cursor-pointer" onClick={()=> finishTask(id)}>
     </div>
     )}
     <div className="flex items-center justify-center -space-x-4 cursor-move">
       <MoreVertIcon className={`text-gray-500 dark:text-gray-100`}/>
       <MoreVertIcon className={`text-gray-500 dark:text-gray-100`}/>
     </div>
     </div>
     </div>
     
     </div>
 
                         </div>
                       )}
                     </Draggable>
                   );
                 })}
                 {provided.placeholder}
               </div>
             )}
           </Droppable>
         </DragDropContext>
         </div>
           </>
         ) : (
           <div className="px-4 pb-2 flex items-center justify-center relative bottom-4">
             <img class="block w-[340px] object-cover rounded-md mb-3" src="https://img.freepik.com/premium-vector/data-management-share-information-protect-it-from-computer-viruses_68708-2932.jpg" alt="" />
           </div>
         )}
         <div className="">
              <div className="w-full h-16 dark:bg-gray-800 absolute bottom-0.5 rounded-b-md">
          <form onSubmit={addDashTask} className='w-full flex items-center justify-end px-2 relative top-3'>
 
         <div class="flex flex-row items-center flex-1 px-2">
         <div class="flex flex-row items-center w-full border rounded-3xl bg-gray-50 dark:border-gray-500 h-10 px-4 dark:bg-gray-700">
          
           <button type="submit" disabled={description == ""} class="flex items-center justify-center h-7 w-7 rounded-full text-gray-400 ">
             <svg class="w-5 h-5 transform -rotate-90 hover:-rotate-45 transition-all duration-300 -mr-px cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
               <path stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
             </svg>
           </button>
           <div class="w-full">
             
                    <input type="text" onChange={(e) => setDescription(e.target.value)} value={description}
                    className="border border-transparent w-full bg-gray-50 dark:bg-gray-700 focus:outline-none text-sm h-8 text-right flex items-center text-gray-600 placeholder:text-right dark:text-white" placeholder="....  משימה קצרה" />
           </div>
           <div class="flex flex-row">
             
             <div class="flex items-center justify-center group relative h-10 w-8 text-gray-400 ml-1 mr-2 cursor-pointer" onClick={()=> setArrow(!arrow)}>
               
               <h1 className='text-xl group-hover:rotate-12'>🎨</h1>
             </div>
           </div>
         </div>
         
       </div>
 
           {arrow && (
                 <div className='mt-8 w-fit h-fit absolute right-4 top-2 rounded-full shadow-xl blue-glassmorphism px-2 py-1 z-50'>
                   <ul class="flex flex-row items-center justify-center">
                         <li class="mr-4 last:mr-0" onClick={()=> {setColorx("blue")
                       closeTasksColor()}}>
                             <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "blue" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                 <div class="flex items-center justify-center w-6 h-6 bg-blue-900 rounded-full">
                                     {colorx == "blue" && <CheckIcon fontSize="small" className='text-white'/>}
                                 </div>
                             </span>
                         </li>
                         <li class="mr-4 last:mr-0" onClick={()=> {setColorx("yellow")
                       closeTasksColor()}}>
                         <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "yellow" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                 <div class="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full">
                                   {colorx == "yellow" && <CheckIcon fontSize="small" className='text-white'/> }
                                 </div>
                             </span>
                         </li>
                         <li class="mr-4 last:mr-0" onClick={()=> {setColorx("red")
                       closeTasksColor()}}>
                         <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "red" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                 <div class="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full">
                                   {colorx == "red" && <CheckIcon fontSize="small" className='text-white'/>}
                                 </div>
                             </span>
                         </li>
                         <li class="mr-4 last:mr-0" onClick={()=> {setColorx("green")
                       closeTasksColor()}}>
                         <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "green" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                 <div class="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                                   {colorx == "green" && <CheckIcon fontSize="small" className='text-white'/>}
                                 </div>
                             </span>
                         </li>
                     </ul>
                
                 </div>
               )}
          </form>
 
         </div> 
       <div></div>
        
     </div>
       </div>
 
     </div>


     <div className={`grid grid-cols-1 mdx:grid-cols-2 gap-8 mdx:gap-4 mb-8 mt-2`}>
      
        {/* <div class="pt-2 rounded-lg pr-3 dark:bg-gray-800 shadow" > */}
          {true ? (
            <div class="w-full relative bg-white p-4 h-[400px] rounded-lg shadow dark:bg-gray-800 ">
            <div className="flex w-full items-center justify-between px-2 relative bottom-1">
              <h1 className="text-[#a8a29e] text-lg font-extrabold font-mono">2023</h1>
              <h1 className="text-[#a8a29e] text-lg font-bold font-mono">הכנסות/הוצאות החודש</h1>
            </div>
            <Chart options={radar.options} series={radar.series} type="polarArea" height={360}/>
          </div>
          ) : (
            <Chart options={time.options} series={time.series} type="rangeBar" height={360} />
          )}
        {/* </div> */}
        <div class="rounded-lg w-full bg-white dark:bg-gray-800 p-5 h-[400px] shadow" >
          <Chart options={chart.options} series={chart.series} type="bar" height={360} className='relative bottom-1 right-1'/>
        </div>
        
      </div>


      {/* <div
        class="rounded-lg h-96 mb-8 overflow-auto scrollbar-none"
      >
         <table class="w-full text-sm text-left text-blue-100 dark:text-blue-100">
        <thead class="text-xs text-white uppercase bg-blue-600 dark:text-white">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-blue-500 border-b border-blue-400">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-white hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-blue-500 border-b border-blue-400">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-white hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-blue-500 border-b border-blue-400">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-white hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-blue-500 border-b border-blue-400">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Google Pixel Phone
                </th>
                <td class="px-6 py-4">
                    Gray
                </td>
                <td class="px-6 py-4">
                    Phone
                </td>
                <td class="px-6 py-4">
                    $799
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-white hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-blue-500 border-blue-40">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Apple Watch 5
                </th>
                <td class="px-6 py-4">
                    Red
                </td>
                <td class="px-6 py-4">
                    Wearables
                </td>
                <td class="px-6 py-4">
                    $999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-white hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-blue-500 border-b border-blue-400">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-white hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-blue-500 border-b border-blue-400">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-white hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
      </div> */}
      
      <div class="grid grid-cols-2 gap-4">
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
      </div>
    </main>
  </div>

  <Dialog open={openx}>
  {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
  <div class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-auto mt-24 sm:mt-0">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Add Product
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> setOpenx(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <form action="#">
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type product name" required="" />
                    </div>
                    <div>
                        <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                        <input type="text" name="brand" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product brand" required="" />
                    </div>
                    <div>
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$2999" required="" />
                    </div>
                    <div>
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected="">Select category</option>
                            <option value="TV">TV/Monitors</option>
                            <option value="PC">PC</option>
                            <option value="GA">Gaming/Console</option>
                            <option value="PH">Phones</option>
                        </select>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                    </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {/* <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> */}
                    Add new product
                </button>
            </form>
        </div>
    </div>
</div>
  </Dialog>

  
    </>
  )
}

export default WorkerRole