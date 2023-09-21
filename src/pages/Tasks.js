import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { Snackbar, Alert, IconButton  } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { FormControl, Input, Button, InputAdornment } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
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
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [taskStatusId, setTaskStatusId] = useState();
  const [modelOpen, setModelOpen] = useState(false);
  const [errors, setErrors] = useState()
  const [errorMode, setErrorMode] = useState(false)
  const [alert, setAlert] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  // const [windowWidth, setWindowWidth] = useState(0);
  // const [scroll, setScroll] = useState(false)
  const [colorx, setColorx] = useState("")



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

  
  const addTask = (id) => {
    // const formattedDate = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('YYYY-MM-DD');
    axios.post("https://nartina.com/api/user/addTask/" + id, {
            // date: formattedDate,
            date: new Date().toISOString().substring(0, 10),
            description,
            color: colorx == "" ? 'green' : colorx
          }, {
            headers: {
              Authorization: 'Bearer ' + result?.token,
          
             }
          }).then(res => {console.log(res.data)
            localStorage.setItem('tasksStats', true)
            refetch()
          // getData()
        })
          .catch(error => {setError(error.response.data)
            setErrors(error.response.status)})
          setDate("")
          setDescription("")
          setModelOpen(false)
          
       
  }

  const openModel = (id) => {
    console.log("section id: " + id);
    setTaskStatusId(id);
    // setModelOpen(true);
    setColorx("")
    setModelOpen(!modelOpen);
  };

  // const closeModel = () => {
  // }

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
        <div className="flex items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:scale-110 ease-out transition-all duration-125 hover:bg-sky-200 bg-blue-100" onClick={() => openModel(section.id)}>
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
        <div className="flex items-center justify-center group cursor-pointer w-8 h-8 rounded-full hover:scale-110 ease-out transition-all duration-125 hover:bg-gray-600 bg-blue-100 dark:bg-gray-700 p-1" onClick={() => openModel(section.id)}>
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
      <div className="flex items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:scale-110 ease-out transition-all duration-125 hover:bg-sky-200 bg-blue-100" onClick={() => openModel(section.id)}>
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
      <div className="flex items-center justify-center group cursor-pointer w-8 h-8 rounded-full hover:scale-110 ease-out transition-all duration-125 hover:bg-gray-600 bg-blue-100" onClick={() => openModel(section.id)}>
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
    </>
  );
};

export default Tasks;