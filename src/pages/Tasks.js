import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { Snackbar, Alert, Dialog  } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { FormControl, Input, Button, InputAdornment } from "@mui/material";
// import EventIcon from '@mui/icons-material/Event';
import TextareaAutosize from "@mui/base/TextareaAutosize";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { ThemeContext } from "../App";
// import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
// import CalendarIcon from '@mui/icons-material/CalendarToday';
// import MyCalendarIcon from './MyCalendarIcon';
import { useQuery } from 'react-query'

import Task from "../components/Task";
import axios from "axios";
// import moment from "moment";



const Tasks = () => {
  // const [data, setData] = useState([]);
  // const [user, setUser] = useState({});
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [taskStatusId, setTaskStatusId] = useState();
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);
  const [errors, setErrors] = useState()
  const [errorMode, setErrorMode] = useState(false)
  const [alert, setAlert] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  // const [windowWidth, setWindowWidth] = useState(0);
  // const [scroll, setScroll] = useState(false)
  const [colorx, setColorx] = useState("")
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [name2, setName2] = useState("")

  let resizeWindow = () => {
    setWindowHeight(Number(window.innerHeight));
  };



  useEffect(() => {
    resizeWindow();
    console.log(windowHeight)
    // console.log(y)
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, [windowHeight, window.innerHeight]);

 
  const { taskState, setTaskState, hebrew, globalTheme } = useContext(ThemeContext)

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)
  


  useEffect(() => {
    setAlert(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('salary', false)
  })

  useEffect(() => {
    if(errors == 403) {
      setErrorMode(true)
    }
    
  }, [errorMode, errors]);

  const getTasks = () => {
    const id = result?.id
    return axios.get('https://nartina.com/api/user/user-task-statuses/' + id)
  }
  
  const {data, refetch} = useQuery('user-tasks', ()=> getTasks(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: false,
      refetchOnWindowFocus:false
 
    }) 

  useEffect(()=> {
      if(taskState) {
        refetch()
        setTaskState(false)
      }
  }, [taskState])

 

  const changeColor = (colorName) => {
    if (colorName == "Backlog") {
      return "text-pink-400";
    } else if (colorName == "In Progress") {
      return "text-purple-400";
    } else if (colorName == "Review") {
      return "text-blue-400";
    } else {
      return "text-green-400";
    }
  };

  const changeColor2 = (colorName) => {
    if (colorName == "Backlog") {
      return "bg-pink-400";
    } else if (colorName == "In Progress") {
      return "bg-purple-400";
    } else if (colorName == "Review") {
      return "bg-blue-400";
    } else {
      return "bg-green-400";
    }
  };

  const changeColor3 = (colorName) => {
    if (colorName == "Backlog") {
      return "border-t-4 border-t-pink-400";
    } else if (colorName == "In Progress") {
      return "border-t-4 border-t-purple-400";
    } else if (colorName == "Review") {
      return "border-t-4 border-t-blue-400";
    } else {
      return "border-t-4 border-t-green-400";
    }
  };

  const changeSize = (size) => {
    if (size == "Backlog") {
      return "w-1/4";
    } else if (size == "In Progress") {
      return "w-2/4";
    } else if (size == "Review") {
      return "w-3/4";
    } else {
      return "w-full";
    }
  };

  const changeIcon = (iconName) => {
    if (iconName == "Backlog") {
      return AddLinkIcon;
    } else if (iconName == "In Progress") {
      return AccessTimeIcon;
    } else if (iconName == "Review") {
      return AccessAlarmsIcon;
    } else {
      return TaskAltIcon;
    }
  };

  const changeName = (name) => {
    if (name == "Backlog") {
      return "התחלה";
    } else if (name == "In Progress") {
      return "בתהליך";
    } else if (name == "Review") {
      return "בדיקה";
    } else {
      return "הסתיים";
    }
  };

 

  const handleClose3 = () => {
    setErrorMode(false)
    setErrors("")
  }

  
  // const addTask = (id) => {
  //   // const formattedDate = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('YYYY-MM-DD');
  //   setLoading(true)
  //   axios.post("https://nartina.com/api/user/addTask/" + id, {
  //           // date: formattedDate,
  //           date: new Date().toISOString().substring(0, 10),
  //           description,
  //           color: colorx == "" ? 'green' : colorx
  //         }, {
  //           headers: {
  //             Authorization: 'Bearer ' + result?.token,
          
  //            }
  //         }).then(res => {console.log(res.data)
  //           localStorage.setItem('tasksStats', true)
  //           refetch()
  //         // getData()
  //       })
  //         .catch(error => {setError(error.response.data)
  //           setErrors(error.response.status)})
  //           .finally(setLoading(false))
  //         setDate("")
  //         setDescription("")
  //         setModelOpen(false)
          
       
  // }

  const closeModel = () => {
    setColorx("")
    setDate("")
    setDescription("")
    setTaskStatusId("")
    setModelOpen2(false)
  }

  const addTask = (e) => {
    e.preventDefault();
    // const formattedDate = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('YYYY-MM-DD');
    setLoading(true)
    axios.post("https://nartina.com/api/user/addTask/" + taskStatusId, {
            // date: formattedDate,
            // date: new Date().toISOString().substring(0, 10),
            endDate,
            description,
            color: colorx == "" ? 'green' : colorx
          }, {
            headers: {
              Authorization: 'Bearer ' + result?.token,
          
             }
          }).then(res => {console.log(res.data)
            localStorage.setItem('tasksStats', true)
            closeModel()
            refetch()
          // getData()
        })
          .catch(error => {setError(error.response.data)
            setErrors(error.response.status)})
            .finally(setLoading(false))
            closeModel()
          
       
  }

  // const openModel = (id) => {
  //   console.log("section id: " + id);
  //   setTaskStatusId(id);
  //   // setModelOpen(true);
  //   setColorx("")
  //   setModelOpen(!modelOpen);
  // };

  const openModel2 = (id, name, name2) => {
    console.log("section id: " + id, "section name: " + name);
    setTaskStatusId(id);
    setName(name)
    setName2(name2)
    // setModelOpen(true);
    setColorx("")
    setModelOpen2(true);
  };

 

  const onDragEnd = (result) => {
    console.log(result);
    const { destination, source } = result;
    if (!destination) return;
    console.log(destination.droppableId);
    console.log(result.draggableId);
    // const x = parseInt(destination.droppableId)
    // const y = parseInt(result.draggableId)
    axios
      .get(
        "https://nartina.com/api/user/update-status-for-task/" +
          destination.droppableId +
          "/" +
          result.draggableId
      )
      // axios.get("http://localhost:8080/api/user/update-status-for-task/" + x + "/" + y)
      .then((res) => {console.log(res.data)
        refetch()
      // getData()
    })
      .catch((err) => console.log(err));
    // router.push('/tasks1')
    // window.location.reload();
    // getData()
  };


  const handleCloseAlert = () => {
    setAlert(false)
  }

 
  console.log(new Date().toLocaleDateString())
  // console.log(Number(h) + " -------->")
 
  return (
    <>
    <div className={`hidden xr:block bg-white mt-14 ${globalTheme != "light" && "bg-[#ccc] dark"}`}>
      <DragDropContext onDragEnd={onDragEnd}>
      
      <div className={`w-full mx-auto h-full"} `}>
        {hebrew ? (
          <>
          <div className={`grid md:grid-cols-4 xss:grid-cols-2 xss:gap-2 xr:gap-3 airx:ml-64 p-2`}>
          {data?.data.slice(0)
          .reverse().map((section) => (
            <Droppable key={section.id} droppableId={section.id.toString()}>
              {(provided) => (
                <div
                className={`border border-gray-400 border-t-[6px] rounded-lg px-2 py-1 scrollbar overflow-x-hidden overflow-y-auto h-fit ${windowHeight > 1350 ? 'max-h-[1200px]' : windowHeight > 1150 ? 'max-h-[1070px]' : windowHeight > 1050 ? 'max-h-[960px]' : windowHeight > 1000 ? 'max-h-[920px]' : windowHeight > 900 ? 'max-h-[810px]' : windowHeight > 840 ? 'max-h-[750px]' : windowHeight > 800 ? 'max-h-[725px]' : windowHeight > 780 ? 'max-h-[715px]' : windowHeight > 750 ? 'max-h-[680px]' :  windowHeight > 730 ? 'max-h-[650px]' : windowHeight > 700 ? 'max-h-[630px]' : windowHeight > 650 ? 'max-h-[585px]' : windowHeight > 590 ? 'max-h-[520px]' : windowHeight > 580 ? 'max-h-[500px]' : windowHeight > 560 ? 'max-h-[490px]' : windowHeight > 520 ? 'max-h-[440px]' : windowHeight > 500 ? 'max-h-[390px]' : windowHeight > 400 ? 'max-h-[328px]' : windowHeight > 380 ? 'max-h-[308px]' : windowHeight > 360 ? 'max-h-[290px]' : windowHeight > 350 ? 'max-h-[280px]' : windowHeight > 300 ? 'max-h-[245px]' : windowHeight > 270 ? 'max-h-[240px]' : 'max-h-[225px]'}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div
                    className={`flex items-center ${
                      section.name == "Complete"
                        ? `bg-white justify-between p-4 rounded-lg shadow-md`
                        : `bg-white justify-between p-4 rounded-lg shadow-md`
                    } w-full rounded-md p-2`}
                  >
                      <>
                      <h1 className="text-sm font-medium text-gray-500 uppercase">
                      {section.name}
                    </h1>
                   
                      {section.name == "Complete" ? (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>

                      ) : (
        <div className="flex items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:scale-110 ease-out transition-all duration-125 hover:bg-sky-200 bg-blue-100" onClick={() => openModel2(section.id, changeName(section.name), section.name)}>
        <svg
            className="w-6 h-6 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
                      )}
                      </>
                   
                  </div>
                  <div>
                    {modelOpen && section.id == taskStatusId && (
                      <div className="flex flex-col 2xl:w-[300px] justify-between md:min-w-[170px] h-[150px] mt-2 border border-gray-300 rounded-md">
                        <FormControl>
                          <Input type="date" onChange={e => setDate(e.target.value)} />
                          <TextareaAutosize
                            maxRows={2}
                            className={`bg-white shadow-xl mx-auto focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-xl px-2 py-2 w-80`}
                            aria-label="maximum height"
                            placeholder={hebrew ? "remainder" : "משימה / תזכורת"}
                            style={{ width: '100%', height: '100%' }}
                            onChange={e => setDescription(e.target.value)}
                          />
                        </FormControl>
                        <Button
                          className=""
                          onClick={() => addTask(taskStatusId)}
                        >
                          {hebrew ? "add task" : "הוסף משימה"}
                        </Button>
                      </div>
                    )}
                  </div>
                  {section?.tasks?.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging
                              ? "red"
                              : "blue",
                          }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            name={section.name}
                            title={task.description}
                            date={task.date}
                            end={task.endDate}
                            icon={changeIcon(section.name)}
                            color={changeColor(section.name)}
                            color2={changeColor2(section.name)}
                            color3={changeColor3(section.name)}
                            size={changeSize(section.name)}
                            id={task.id}
                            isChecked={task.urgent}
                            priority={task.color}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
          </>
        ) : (
          <>
          <div className={`grid md:grid-cols-4 xss:grid-cols-2 xss:gap-2 xr:gap-3 airx:gap-4 airx:mr-64 p-3`}>
          {data?.data.map((section) => (
            <Droppable key={section.id} droppableId={section.id.toString()}>
              {(provided) => (
                <div
                // className={`pt-2 bg-gray-500 rounded-3xl px-3 py-1 ${scroll ? 'scrollbar' : 'scrollbar-none'} overflow-x-hidden overflow-y-auto h-fit ${windowHeight > 1350 ? 'max-h-[1200px]' : windowHeight > 1150 ? 'max-h-[1070px]' : windowHeight > 1050 ? 'max-h-[960px]' : windowHeight > 1000 ? 'max-h-[920px]' : windowHeight > 900 ? 'max-h-[810px]' : windowHeight > 840 ? 'max-h-[750px]' : windowHeight > 800 ? 'max-h-[725px]' : windowHeight > 780 ? 'max-h-[715px]' : windowHeight > 750 ? 'max-h-[680px]' :  windowHeight > 730 ? 'max-h-[650px]' : windowHeight > 700 ? 'max-h-[630px]' : windowHeight > 650 ? 'max-h-[585px]' : windowHeight > 590 ? 'max-h-[520px]' : windowHeight > 580 ? 'max-h-[500px]' : windowHeight > 560 ? 'max-h-[490px]' : windowHeight > 520 ? 'max-h-[440px]' : windowHeight > 500 ? 'max-h-[390px]' : windowHeight > 400 ? 'max-h-[328px]' : windowHeight > 380 ? 'max-h-[308px]' : windowHeight > 360 ? 'max-h-[290px]' : windowHeight > 350 ? 'max-h-[283px]' : windowHeight > 300 ? 'max-h-[245px]' : windowHeight > 270 ? 'max-h-[240px]' : 'max-h-[225px]'}`}
                // onMouseOver={()=> setScroll(true)} onMouseOut={()=> setScroll(false)}
                className={`border border-gray-500 border-t-[6px] rounded-lg pt-2 pb-2 bg-white dark:bg-gray-700 px-2 pt-1 overflow-x-hidden scrollbar-thin overflow-y-auto h-fit ${windowHeight > 1350 ? 'max-h-[1200px]' : windowHeight > 1150 ? 'max-h-[1070px]' : windowHeight > 1050 ? 'max-h-[960px]' : windowHeight > 1000 ? 'max-h-[920px]' : windowHeight > 900 ? 'max-h-[810px]' : windowHeight > 840 ? 'max-h-[750px]' : windowHeight > 800 ? 'max-h-[725px]' : windowHeight > 780 ? 'max-h-[715px]' : windowHeight > 750 ? 'max-h-[680px]' :  windowHeight > 730 ? 'max-h-[650px]' : windowHeight > 700 ? 'max-h-[630px]' : windowHeight > 650 ? 'max-h-[585px]' : windowHeight > 590 ? 'max-h-[520px]' : windowHeight > 580 ? 'max-h-[500px]' : windowHeight > 560 ? 'max-h-[490px]' : windowHeight > 520 ? 'max-h-[440px]' : windowHeight > 500 ? 'max-h-[390px]' : windowHeight > 400 ? 'max-h-[328px]' : windowHeight > 380 ? 'max-h-[308px]' : windowHeight > 360 ? 'max-h-[290px]' : windowHeight > 350 ? 'max-h-[283px]' : windowHeight > 300 ? 'max-h-[245px]' : windowHeight > 270 ? 'max-h-[240px]' : 'max-h-[225px]'}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div
                    className={`flex items-center sticky z-10 rounded-xl top-0.5 bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 shadow ${
                      section.name == "Complete"
                        ? `justify-between p-4 rounded-lg `
                        : `justify-between p-4 rounded-lg `
                    } w-full rounded-md p-2`}
                  >
                      <>
                     
                      {section.name == "Complete" ? (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-gray-700">
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>

                      ) : (
        <div className="flex items-center justify-center group cursor-pointer w-8 h-8 rounded-full hover:scale-110 ease-out transition-all duration-125 hover:bg-gray-600 bg-blue-100 dark:bg-gray-700 p-1" onClick={() => openModel2(section.id, changeName(section.name), section.name)}>
        <svg
            className="w-6 h-6 text-yellow-500 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
                      )}
                    {/* <h1 className="text-md font-medium text-gray-500 uppercase"> */}
                    <h1 className="text-lg uuu:text-xl uux:2xl font-mono text-gray-500 dark:text-[#ccc] dark:font-semibold tracking-wide">
                      {changeName(section.name)}
                    </h1>
                      </>
                     
                  </div>
                  
                  <div>
                    {modelOpen && section.id == taskStatusId && (
                      <div className="flex flex-col 2xl:w-[300px] justify-between items-center p-1 md:min-w-[170px] h-[150px] mt-2 border border-gray-400 rounded-md">
                        <FormControl>
                        
                          <TextareaAutosize
                            maxRows={2}
                            className={`bg-gray-200 shadow mx-auto ${!hebrew && "text-right"} placeholder:text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-xl px-2 py-2 w-full`}
                            aria-label="maximum height"
                            placeholder={hebrew ? "remainder" : "משימה / תזכורת"}
                            style={{ width: '100%', height: '100%' }}
                            onChange={e => setDescription(e.target.value)}
                          />
                        </FormControl>
                       
                    <ul class="flex flex-row items-center justify-center">
                        
                        <li class="mr-4 last:mr-0" onClick={()=> setColorx("red")}>
                        <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "red" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                <div class="block w-6 h-6 bg-red-500 rounded-full">
                                {colorx == "red" && <CheckIcon fontSize="small" className='text-white'/>}
                                </div>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0" onClick={()=> setColorx("yellow")}>
                        <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "yellow" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                <div class="block w-6 h-6 bg-yellow-500 rounded-full">
                                {colorx == "yellow" && <CheckIcon fontSize="small" className='text-white'/>}
                                </div>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0" onClick={()=> setColorx("blue")}>
                            <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "blue" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                <div class="block w-6 h-6 bg-blue-900 rounded-full">
                                {colorx == "blue" && <CheckIcon fontSize="small" className='text-white'/>}
                                </div>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0" onClick={()=> setColorx("green")}>
                        <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "green" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                <div class="block w-6 h-6 bg-green-500 rounded-full">
                                {colorx == "green" && <CheckIcon fontSize="small" className='text-white'/>}
                                </div>
                            </span>
                        </li>
                    </ul>
                        <button
                          disabled={description == ""}
                          className="text-blue-400 hover:text-blue-500"
                          onClick={() => addTask(taskStatusId)}
                        >
                          {hebrew ? "add task" : "הוסף משימה"}
                        </button>
                      </div>
                    )}
                  </div>
                  {section?.tasks?.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging
                              ? "red"
                              : "blue",
                          }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            title={task.description}
                            date={task.date}
                            end={task.endDate}
                            icon={changeIcon(section.name)}
                            color={changeColor(section.name)}
                            color2={changeColor2(section.name)}
                            color3={changeColor3(section.name)}
                            size={changeSize(section.name)}
                            name={section.name}
                            id={task.id}
                            isChecked={task.urgent}
                            priority={task.color}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
          </>
        )}
        </div>
        
      </DragDropContext>
      </div>
      <div className="block xr:hidden mt-14">
      <DragDropContext onDragEnd={onDragEnd}>
      
      <div className={`w-full mx-auto h-full"} `}>
        {hebrew ? (
          <>
          <div className={`grid md:grid-cols-4 xss:grid-cols-1 xss:gap-3 xr:gap-3 p-3`}>
          {data?.data.slice(0)
          .reverse().map((section) => (
           
            <Droppable key={section.id} droppableId={section.id.toString()}>
            {(provided) => (
              <div
              className={`border border-gray-400 border-t-4 rounded-lg px-2 py-1 scrollbar overflow-x-hidden overflow-y-auto h-fit ${windowHeight > 1350 ? 'max-h-[1200px]' : windowHeight > 1150 ? 'max-h-[1070px]' : windowHeight > 1050 ? 'max-h-[960px]' : windowHeight > 1000 ? 'max-h-[920px]' : windowHeight > 900 ? 'max-h-[810px]' : windowHeight > 840 ? 'max-h-[750px]' : windowHeight > 800 ? 'max-h-[725px]' : windowHeight > 780 ? 'max-h-[715px]' : windowHeight > 750 ? 'max-h-[680px]' :  windowHeight > 730 ? 'max-h-[650px]' : windowHeight > 700 ? 'max-h-[630px]' : windowHeight > 650 ? 'max-h-[585px]' : windowHeight > 590 ? 'max-h-[520px]' : windowHeight > 580 ? 'max-h-[500px]' : windowHeight > 560 ? 'max-h-[490px]' : windowHeight > 520 ? 'max-h-[440px]' : windowHeight > 500 ? 'max-h-[390px]' : windowHeight > 400 ? 'max-h-[328px]' : windowHeight > 380 ? 'max-h-[308px]' : windowHeight > 360 ? 'max-h-[290px]' : windowHeight > 350 ? 'max-h-[280px]' : windowHeight > 300 ? 'max-h-[245px]' : windowHeight > 270 ? 'max-h-[240px]' : 'max-h-[225px]'}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div
                  className={`flex items-center ${
                    section.name == "Complete"
                      ? `bg-white justify-between p-4 rounded-lg shadow-md`
                      : `bg-white justify-between p-4 rounded-lg shadow-md`
                  } w-full rounded-md p-2`}
                >
                    <>
                    <h1 className="text-sm font-medium text-gray-500 uppercase">
                    {section.name}
                  </h1>
                 
                    {section.name == "Complete" ? (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                      <svg
                        className="w-6 h-6 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    ) : (
      <div className="flex items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:scale-110 ease-out transition-all duration-125 hover:bg-sky-200 bg-blue-100" onClick={() => openModel2(section.id, changeName(section.name), section.name)}>
      <svg
          className="w-6 h-6 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
                    )}
                    </>
                 
                </div>
                <div>
                  {modelOpen && section.id == taskStatusId && (
                    <div className="flex flex-col 2xl:w-[300px] justify-between md:min-w-[170px] h-[150px] mt-2 border border-gray-300 rounded-md">
                      <FormControl>
                        <Input type="date" onChange={e => setDate(e.target.value)} />
                        <TextareaAutosize
                          maxRows={2}
                          className={`bg-white shadow-xl mx-auto focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-xl px-2 py-2 w-80`}
                          aria-label="maximum height"
                          placeholder={hebrew ? "remainder" : "משימה / תזכורת"}
                          style={{ width: '100%', height: '100%' }}
                          onChange={e => setDescription(e.target.value)}
                        />
                      </FormControl>
                      <Button
                        className=""
                        onClick={() => addTask(taskStatusId)}
                      >
                        {hebrew ? "add task" : "הוסף משימה"}
                      </Button>
                    </div>
                  )}
                </div>
                {section?.tasks?.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        style={{
                          ...provided.draggableProps.style,
                          backgroundColor: snapshot.isDragging
                            ? "red"
                            : "blue",
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task
                          name={section.name}
                          title={task.description}
                          date={task.date}
                          end={task.endDate}
                          icon={changeIcon(section.name)}
                          color={changeColor(section.name)}
                          color2={changeColor2(section.name)}
                          color3={changeColor3(section.name)}
                          size={changeSize(section.name)}
                          id={task.id}
                          isChecked={task.urgent}
                          priority={task.color}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          ))}
        </div>
          </>
        ) : (
          <>
          <div className={`grid md:grid-cols-4 xss:grid-cols-1 xss:gap-3 xr:gap-3 ${hebrew ? "airx:ml-[183px]" : "airx:mr-[183px]"} p-3`}>
          {data?.data.slice(0)
          .reverse().map((section) => (
            
            <Droppable key={section.id} droppableId={section.id.toString()}>
            {(provided) => (
              <div
              className={`border border-gray-400 border-t-4 rounded-lg pt-2 pb-2 bg-white px-2 pt-1 overflow-x-hidden scrollbar-thin overflow-y-auto h-fit ${windowHeight > 1350 ? 'max-h-[1200px]' : windowHeight > 1150 ? 'max-h-[1070px]' : windowHeight > 1050 ? 'max-h-[960px]' : windowHeight > 1000 ? 'max-h-[920px]' : windowHeight > 900 ? 'max-h-[810px]' : windowHeight > 840 ? 'max-h-[750px]' : windowHeight > 800 ? 'max-h-[725px]' : windowHeight > 780 ? 'max-h-[715px]' : windowHeight > 750 ? 'max-h-[680px]' :  windowHeight > 730 ? 'max-h-[650px]' : windowHeight > 700 ? 'max-h-[630px]' : windowHeight > 650 ? 'max-h-[585px]' : windowHeight > 590 ? 'max-h-[520px]' : windowHeight > 580 ? 'max-h-[500px]' : windowHeight > 560 ? 'max-h-[490px]' : windowHeight > 520 ? 'max-h-[440px]' : windowHeight > 500 ? 'max-h-[390px]' : windowHeight > 400 ? 'max-h-[328px]' : windowHeight > 380 ? 'max-h-[308px]' : windowHeight > 360 ? 'max-h-[290px]' : windowHeight > 350 ? 'max-h-[283px]' : windowHeight > 300 ? 'max-h-[245px]' : windowHeight > 270 ? 'max-h-[240px]' : 'max-h-[225px]'}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div
                  className={`flex items-center sticky top-0 z-10 rounded-xl bg-white shadow ${
                    section.name == "Complete"
                      ? `justify-between p-4 rounded-lg `
                      : `justify-between p-4 rounded-lg `
                  } w-full rounded-md p-2`}
                >
                    <>
                   
                    {section.name == "Complete" ? (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                      <svg
                        className="w-6 h-6 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    ) : (
      <div className="flex items-center justify-center group cursor-pointer w-8 h-8 rounded-full hover:scale-110 ease-out transition-all duration-125 hover:bg-gray-600 bg-blue-100" onClick={() => openModel2(section.id, changeName(section.name), section.name)}>
      <svg
          className="w-6 h-6 text-yellow-500 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
                    )}
                  {/* <h1 className="text-md font-medium text-gray-500 uppercase"> */}
                  <h1 className="text-lg font-mono text-gray-500">
                    {changeName(section.name)}
                  </h1>
                    </>
                   
                </div>
               
                <div>
                  {modelOpen && section.id == taskStatusId && (
                    <div className="flex flex-col 2xl:w-[300px] justify-between p-1 md:min-w-[170px] h-[150px] mt-2 border border-gray-400 rounded-md">
                      <FormControl>
                      
                        <TextareaAutosize
                          maxRows={2}
                          className={`bg-gray-200 shadow-xl mx-auto ${!hebrew && "text-right"} placeholder:text-right focus:outline-none focus:ring focus:border-blue-500 my-1 rounded-xl px-2 py-2 w-80`}
                          aria-label="maximum height"
                          placeholder={hebrew ? "remainder" : "משימה / תזכורת"}
                          style={{ width: '100%', height: '100%' }}
                          onChange={e => setDescription(e.target.value)}
                        />
                      </FormControl>
                     
                  <ul class="flex flex-row items-center justify-center">
                      
                      <li class="mr-4 last:mr-0" onClick={()=> setColorx("red")}>
                      <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "red" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                              <div class="block w-6 h-6 bg-red-500 rounded-full">
                              {colorx == "red" && <CheckIcon fontSize="small" className='text-white'/>}
                              </div>
                          </span>
                      </li>
                      <li class="mr-4 last:mr-0" onClick={()=> setColorx("yellow")}>
                      <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "yellow" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                              <div class="block w-6 h-6 bg-yellow-500 rounded-full">
                              {colorx == "yellow" && <CheckIcon fontSize="small" className='text-white'/>}
                              </div>
                          </span>
                      </li>
                      <li class="mr-4 last:mr-0" onClick={()=> setColorx("blue")}>
                          <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "blue" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                              <div class="block w-6 h-6 bg-blue-900 rounded-full">
                              {colorx == "blue" && <CheckIcon fontSize="small" className='text-white'/>}
                              </div>
                          </span>
                      </li>
                      <li class="mr-4 last:mr-0" onClick={()=> setColorx("green")}>
                      <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "green" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                              <div class="block w-6 h-6 bg-green-500 rounded-full">
                              {colorx == "green" && <CheckIcon fontSize="small" className='text-white'/>}
                              </div>
                          </span>
                      </li>
                  </ul>
                      <button
                        disabled={description == ""}
                        className="text-blue-400 hover:text-blue-500"
                        onClick={() => addTask(taskStatusId)}
                      >
                        {hebrew ? "add task" : "הוסף משימה"}
                      </button>
                    </div>
                  )}
                </div>
                {section?.tasks?.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        style={{
                          ...provided.draggableProps.style,
                          backgroundColor: snapshot.isDragging
                            ? "red"
                            : "blue",
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task
                          title={task.description}
                          date={task.date}
                          end={task.endDate}
                          icon={changeIcon(section.name)}
                          color={changeColor(section.name)}
                          color2={changeColor2(section.name)}
                          color3={changeColor3(section.name)}
                          size={changeSize(section.name)}
                          name={section.name}
                          id={task.id}
                          isChecked={task.urgent}
                          priority={task.color}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          ))}
        </div>
          </>
        )}
        </div>
        
      </DragDropContext>
      </div>
      <Snackbar open={errorMode} autoHideDuration={20000} onClose={handleClose3} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose3}
          severity="error"
          sx={{ width: "100%" }}
        >
             יש לעשות יציאה ולהרשם שוב מטעמי בטיחות
        </Alert>
      </Snackbar>

      <Snackbar open={alert} autoHideDuration={10000} onClose={handleCloseAlert} anchorOrigin={{vertical: 'buttom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? <>
          you can drag and drop tasks
          </> :
          <>
          ניתן לגרור משימות לפי סדר החשיבות       

          </>}
 </Alert>
      </Snackbar>

      <Dialog open={modelOpen2}>

  <div class={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed z-50 sm:w-full inset-0 h-full ${globalTheme != "light" && 'dark'}`}>
    <div class="relative p-4 w-full max-w-2xl h-auto mt-72 sm:mt-0">

        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
           
           
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModel}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div className="flex flex-col items-end">
                <div className='flex items-center justify-end space-x-4'>
                        {/* <InformationCircleIcon 
                          strokeWidth={2} 
                          className="text-[#333] dark:text-[#ccc] w-5 h-5 cursor-pointer relative " 
                        /> */}
                
                <h3 class="text-lg tracking-wide font-semibold text-gray-900 dark:text-white">
                    הכנס משימה חדשה
                </h3>
                
                </div>
                <h3 class="text-lg font-mono tracking-wide text-gray-600 dark:text-white">
                  {name}
                </h3>
                <div class="w-full h-2 mb-4 bg-blue-100 rounded-full relative top-1 flex justify-end">
                    <div class={`${changeSize(name2)} h-full text-xs text-center text-white ${changeColor2(name2)} rounded-full`}>
                   </div>
                 </div>
                </div>
            </div>
            
         {/* {errorRes[0] != null && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">{errorRes}
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>
          </Alert>
        </div>} */}
        {/* {errors == 403 && <div className='flex items-center justify-center text-center'>
          <Alert severity="error">יש לעשות יציאה ולהרשם שוב מטעמי בטיחות  
          
            <CloseIcon className='text-red-600 cursor-pointer hover:text-red-500' onClick={()=> setErrorRes("")}/>

</Alert>
        </div>} */}
        
            <form onSubmit={addTask}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    
                  {/* <div className='flex items-center justify-center space-x-2'>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">שכר שעתי</label>
                      <input type="text" name="agentPhone" value={salaryPerHour} placeholder="שכר שעתי" class="bg-gray-50 placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setSalaryPerHour(e.target.value)}/>
                  </div>
                  <div>
                  <div className='flex justify-end items-center space-x-0.5'>
                        <h1 className='text-[10px] text-red-500 relative bottom-0.5'>שדה חובה</h1>
                        <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">מין העובד</label>
                      </div>
                      <select name='type' onChange={(e) => setGender(e.target.value)} className="bg-gray-50 text-right h-[42px] relative border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#ccc] dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected="">מין העובד</option>
                              {genders.map(g => (
                              <option className='text-right' value={g}>{g}</option>
                              ))}
                          </select>

                  </div>
                  </div> */}
                  {/* <div className='flex items-center justify-center space-x-2'>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תאריך לידה</label>
                      <input type="date" name="agentPhone" value={dob} placeholder="תאריך לידה" class="bg-gray-50 h-[40px] min-w-max placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setDob(e.target.value)}/>
                  </div>
                  <div>
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">התחלת עבודה</label>
                      <input type="date" name="agentPhone" value={startedAt} placeholder="התחלת עבודה" class="bg-gray-50 h-[40px] min-w-max placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setStartedAt(e.target.value)}/>
                  </div>

                  </div> */}
                  <div className="col-span-2">
                      <label for="agentPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תאריך סיום משימה</label>
                      <input type="date" name="agentPhone" value={endDate} placeholder="התחלת עבודה" class="bg-gray-50 h-[40px] w-full placeholder:text-right border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=> setEndDate(e.target.value)}/>
                  </div>
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">פרטי משימה</label>
                        <textarea value={description} rows="4" class="block text-right p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border placeholder:text-right border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="הכנס את פרטי ותיאור המשימה, ניתן גם להוסיף את חשיבות המשימה לקבוע מועד לסיום המשימה, וגם ניתן לצוות עובדים למשימה" onChange={(e)=> setDescription(e.target.value)}></textarea>                    
                    </div>
                </div>
                <div className='flex w-full items-center justify-between space-x-4'>
                <div className='flex items-center justify-center space-x-2'>
                {!loading ? (
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  הכנס משימה   
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
                <div class="inline-flex items-center cursor-pointer text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeModel}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        בטל
                </div>
                </div>
           
                   <div className="flex items-center justify-end space-x-5">
                   <ul class="flex flex-row items-center justify-center">
                      
                      <li class="mr-2.5 last:mr-0 cursor-pointer" onClick={()=> setColorx("red")}>
                      <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "red" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                              <div class="block w-6 h-6 bg-red-500 rounded-full">
                              {colorx == "red" && <CheckIcon fontSize="small" className='text-white'/>}
                              </div>
                          </span>
                      </li>
                      <li class="mr-2.5 last:mr-0 cursor-pointer" onClick={()=> setColorx("yellow")}>
                      <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "yellow" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                              <div class="block w-6 h-6 bg-yellow-500 rounded-full">
                              {colorx == "yellow" && <CheckIcon fontSize="small" className='text-white'/>}
                              </div>
                          </span>
                      </li>
                      <li class="mr-2.5 last:mr-0 cursor-pointer" onClick={()=> setColorx("blue")}>
                          <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "blue" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                              <div class="block w-6 h-6 bg-blue-900 rounded-full">
                              {colorx == "blue" && <CheckIcon fontSize="small" className='text-white'/>}
                              </div>
                          </span>
                      </li>
                      <li class="mr-2.5 last:mr-0 cursor-pointer" onClick={()=> setColorx("green")}>
                      <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "green" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                              <div class="block w-6 h-6 bg-green-500 rounded-full">
                              {colorx == "green" && <CheckIcon fontSize="small" className='text-white'/>}
                              </div>
                          </span>
                      </li>
                  </ul>
                   {true ? (
                      <div class="flex -space-x-4">
                         <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="" />
                         <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="" />
                         <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="" />
                         <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="" />
                     </div>
                    ) : (
                    <div class="relative w-10 h-10 cursor-pointer overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600" onClick={()=> alert("true")}>
                      <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                    )}
                   </div>
                
                </div>
            </form>
        </div>
    </div>
</div>
  </Dialog>
    </>
  );
};

export default Tasks;