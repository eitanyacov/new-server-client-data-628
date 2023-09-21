import React, { useState, useEffect, useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles, ChangingProgressProvider } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BarChartIcon from '@mui/icons-material/BarChart';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { PaginationItem } from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import ChangeCircleTwoToneIcon from '@mui/icons-material/ChangeCircleTwoTone';
import QuizTwoToneIcon from '@mui/icons-material/QuizTwoTone';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { SiMicrosoftexcel } from 'react-icons/si';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone';
import NivoLineCustomIncomeDialog from '../components/NivoLineCustomIncomeDialog';
import NivoLineCustomOutcomeDialog from '../components/NivoLineCustomOutcomeDialog';

import Pagination from '@mui/material/Pagination';
import DoneIcon from '@mui/icons-material/Done';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import RadialSeparators from "./RadialSeparators";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chart from 'react-apexcharts';

import axios from "axios";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { useNavigate } from 'react-router-dom'
import "react-circular-progressbar/dist/styles.css";

import CloseIcon from '@mui/icons-material/Close';
import { Snackbar, Alert, Dialog, Select, MenuItem, TextareaAutosize } from "@mui/material";
import Footer2 from "../components/Footer2";
import { ThemeContext } from "../App";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

import ScoreIcon from '@mui/icons-material/Score';
import { useQuery } from 'react-query'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';

import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import InsightsIcon from '@mui/icons-material/Insights';
import { Fragment } from 'react'
import ChatEngine from "../components/ChatEngine";
import Swal from 'sweetalert2'
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DragDropProvider,
  DateNavigator,
  TodayButton,
  Toolbar,
  // ViewSwitcher,
  // DayView,
  MonthView,
  Appointments,
  // WeekView,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import UnderTopBoxes from "../components/UnderTopBoxes";

import FooterHebrew from "../components/FooterHebrew";

import {
  
  ShoppingBagIcon,
  HomeIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";



const Dashboard = () => {

  const navigate = useNavigate();

  const y = new Date().getFullYear()
  

  const [date, setDate] = useState(new Date());
  const [meeting, setMeeting] = useState(false)
  const [isSSRE, setIsSSRE] = useState(true);
  const [isSSREx, setIsSSREx] = useState(true);
  const [errors, setErrors] = useState()
  const [errorMode, setErrorMode] = useState(false)

  const [spin, setSpin] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [workerTask, setWorkerTask] = useState("")
  const [chartDots, setChartDots] = useState(true)
  const [task, setTask] = useState({})
  const [rating, setRating] = useState("")
  const [rate, setRate] = useState(false)
  const [ide, setIde] = useState("");
  const [rateAlert, setRateAlert] = useState(false)


  const [back, setBack] = useState(false)
  const [chatMode, setChatMode] = useState(false)
  const [tooltipStatus, setTooltipStatus] = useState(0);
  const [tooltipStatus2, setTooltipStatus2] = useState(0);
  const [menu, setMenu] = useState(false)
  const [chats, setChats] = useState(false)
  const [download, setDownload] = useState(false)
  const [share, setShare] = useState(false)
  const [prints, setPrints] = useState(false)

  const [arrow, setArrow] = useState(false)
  const [table, setTable] = useState(false)
  const [scheduler, setScheduler] = useState(false)

  const [suppMonth, setSuppMonth] = useState("1")

  const [toggle, setToggle] = useState(true)
  const [toggle2, setToggle2] = useState(false);
  const [battery, setBattery] = useState(true)

  const [item, setItem] = useState("1")
  const [item2, setItem2] = useState("0")

 


  const [urgentTasks, setUrgentTasks] = useState()
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [pay, setPay] = useState(false)

  const [colorx, setColorx] = useState("")
  const [faq, setFaq] = useState(false)
  const [barAmount, setBarAmount] = useState(true)


  const [incomeMonth, setIncomeMonth] = useState("");
  const [incomeYear, setIncomeYear] = useState(0)
  const [dateFlag, setDateFlag] = useState(false)
  const [monthNumber, setMonthNumber] = useState(0);
  const [incomeCurrentYear, setIncomeCurrentYear] = useState(y)
  const [scroll, setScroll] = useState(false)
  const [taskDialog, setTaskDialog] = useState(false)
  const [description, setDescription] = useState("");
  const [stateChart, setStateChart] = useState(0)
  const [taskChart, setTaskChart] = useState(false)
  const [page, setPage] = useState(0);


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

  const [currentMonthChangeableOutcome, setCurrentMonthChangeableOutcome] = useState()
  const [currentMonthPermanentOutcome, setCurrentMonthPermanentOutcome] = useState()
  const [currentMonthWaresOutcome, setCurrentWaresOutcome] = useState()

  const [lastMonthChangeableOutcome, setLastMonthChangeableOutcome] = useState()
  const [lastMonthPermanentOutcome, setLastMonthPermanentOutcome] = useState()
  const [lastMonthWaresOutcome, setLastWaresOutcome] = useState()

  
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

  const [totalIncome, setTotalIncome] = useState();
  const [totalReceipt, setTotalReceipt] = useState();
  const [totalWares, setTotalWares] = useState();
  const [totalPermanent, setTotalPermanent] = useState();
  const [totalChangeable, setTotalChangeable] = useState();
  const [totalSal, setTotalSal] = useState();

  const [avrageDay, setAvrageDay] = useState();
  const [totalDay, setTotalDay] = useState();
  const [totalCount, setTotalCount] = useState();


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


  const [open, setOpen] = useState(false)
  const [openx, setOpenx] = useState(false)
  const [incomeFlag, setIncomeFlag] = useState(false)
  const [waresFlag, setWaresFlag] = useState(false)
  const [allOutcomeFlag, setAllOutcomeFlag] = useState(false)

  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)


  const tasksStats = JSON.parse(localStorage.getItem('tasksStats'));
  const salary = JSON.parse(localStorage.getItem('salary'));
  const income = JSON.parse(localStorage.getItem('income'));
  const invoice = JSON.parse(localStorage.getItem('invoice'));
  const wares = JSON.parse(localStorage.getItem('wares'));
  const permanent = JSON.parse(localStorage.getItem('permanent'));
  const changeable = JSON.parse(localStorage.getItem('changeable'));
  const refund = JSON.parse(localStorage.getItem('refund'));
  const taxInvoice = JSON.parse(localStorage.getItem('taxInvoice'));
  const rest = JSON.parse(localStorage.getItem('restaurant'));
  const workersTasks = JSON.parse(localStorage.getItem('workersTasks'));
  const customer = JSON.parse(localStorage.getItem('customer'));
  const clocks = JSON.parse(localStorage.getItem('clocks'));
  
  

  const { schedulerMode, setSchedulerMode, globalTheme, color, tableMode, setTableMode, setSpins, hebrew, setChart, label, setLabel, setDashMode, chart, dashMode, chart2, setChart2, topBox, reload, setReload } = useContext(ThemeContext)

 

  useEffect(()=> {
    setTimeout(()=> {
      setChart(!chart)
    }, 800)
  }, [])

  
  const colors = [{ bg: "bg-[#2563EB]", ring: "ring-[#2563EB]" }, { bg: "bg-[#8B5CF6]", ring: "ring-[#8B5CF6]" }, { bg: "bg-[#DB2777]", ring: "ring-[#DB2777]" }, { bg: "bg-[#475569]", ring: "ring-[#475569]" }, { bg: "bg-[#EA580C]", ring: "ring-[#EA580C]" }]


  const radar = {
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

   const state11111 = {
          
    series: [{
      name: hebrew ? 'Commodity' : "סחורה",
      type: 'column',
      data: [Math.round(januarSupplierWaresOutcomex), Math.round(februarySupplierWaresOutcomex), Math.round(marchSupplierWaresOutcomex), Math.round(aprilSupplierWaresOutcomex), Math.round(maySupplierWaresOutcomex), Math.round(juneSupplierWaresOutcomex), Math.round(julySupplierWaresOutcomex), Math.round(augustSupplierWaresOutcomex), Math.round(septemberSupplierWaresOutcomex), Math.round(octoberSupplierWaresOutcomex), Math.round(novemberSupplierWaresOutcomex), Math.round(decemberSupplierWaresOutcomex)]
    }, {
      name: hebrew ? 'Salaries' : "משכורות",
      type: 'column',
      data: [januarSalariesx, februarySalariesx, marchSalariesx, aprilSalariesx, maySalariesx, juneSalariesx, julySalariesx, augustSalariesx, septemberSalariesx, octoberSalariesx, novemberSalariesx, decemberSalariesx]
    }, {
      name: hebrew ? 'Incomes' : "הכנסות",
      type: 'line',
      data: [Math.round(januarIncomex + januarMonthTaxInvoicesIsTazrim), Math.round(februaryIncomex + februaryMonthTaxInvoicesIsTazrim), Math.round(marchIncomex + marchMonthTaxInvoicesIsTazrim), Math.round(aprilIncomex + aprilMonthTaxInvoicesIsTazrim), Math.round(mayIncomex + mayMonthTaxInvoicesIsTazrim), Math.round(juneIncomex + juneMonthTaxInvoicesIsTazrim), Math.round(julyIncomex + julyMonthTaxInvoicesIsTazrim), Math.round(augustIncomex + augustrMonthTaxInvoicesIsTazrim), Math.round(septemberIncomex + septemberMonthTaxInvoicesIsTazrim), Math.round(octoberIncomex + octoberMonthTaxInvoicesIsTazrim), Math.round(novemberIncomex + novemberMonthTaxInvoicesIsTazrim), Math.round(decemberIncomex + decemberMonthTaxInvoicesIsTazrim)]
    }],
    options: {
      chart: {
        height: 340,
        foreColor: '#a3a3a3',
        type: 'line',
        stacked: false,
        toolbar: {
          offsetX: hebrew ? -13 : -5,
          offsetY: hebrew ? -8 : -5,
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
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      
      xaxis: {
        categories: hebrew ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]  : ['ינואר', 'פבר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ']
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            }
          },
          title: {
            text: hebrew ? "Commodity (thousand crores)" : "סחורה (thousand crores)",
            style: {
              color: '#008FFB',
              fontWeight: 'bold',
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: hebrew ? 'Commodity' : "סחורה",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              colors: '#00E396',
            }
          },
          title: {
            text: hebrew ? "Salaries (thousand crores)" : "משכורות (thousand crores)",
            style: {
              color: '#00E396',
              fontWeight: 'bold',
            }
          },
        },
        {
          seriesName: hebrew ? 'Incomes' : "הכנסות",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
          },
          title: {
            text: hebrew ? "Incomes (thousand crores)" : "הכנסות (thousand crores)",
            style: {
              color: '#FEB019',
              fontWeight: 'bold',
            }
          }
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: hebrew ? 'left' : 'right',
        offsetX: 40,
        offsetY: windowWidth > 580 ? 10 : 0
      }
    },
  

  }


  const state22222 = {
          
    series: [{
      name: hebrew ? 'Commodity' : "סחורה",
      type: 'column',
      data: [Math.round(januarSupplierWaresOutcomex), Math.round(februarySupplierWaresOutcomex), Math.round(marchSupplierWaresOutcomex), Math.round(aprilSupplierWaresOutcomex), Math.round(maySupplierWaresOutcomex), Math.round(juneSupplierWaresOutcomex), Math.round(julySupplierWaresOutcomex), Math.round(augustSupplierWaresOutcomex), Math.round(septemberSupplierWaresOutcomex), Math.round(octoberSupplierWaresOutcomex), Math.round(novemberSupplierWaresOutcomex), Math.round(decemberSupplierWaresOutcomex)]
    }, {
      name: hebrew ? 'Salaries' : "משכורות",
      type: 'column',
      data: [januarSalariesx, februarySalariesx, marchSalariesx, aprilSalariesx, maySalariesx, juneSalariesx, julySalariesx, augustSalariesx, septemberSalariesx, octoberSalariesx, novemberSalariesx, decemberSalariesx]
    }, {
      name: hebrew ? 'Incomes' : "הכנסות",
      type: 'line',
      data: [Math.round(januarIncomex + januarMonthTaxInvoicesIsTazrim), Math.round(februaryIncomex + februaryMonthTaxInvoicesIsTazrim), Math.round(marchIncomex + marchMonthTaxInvoicesIsTazrim), Math.round(aprilIncomex + aprilMonthTaxInvoicesIsTazrim), Math.round(mayIncomex + mayMonthTaxInvoicesIsTazrim), Math.round(juneIncomex + juneMonthTaxInvoicesIsTazrim), Math.round(julyIncomex + julyMonthTaxInvoicesIsTazrim), Math.round(augustIncomex + augustrMonthTaxInvoicesIsTazrim), Math.round(septemberIncomex + septemberMonthTaxInvoicesIsTazrim), Math.round(octoberIncomex + octoberMonthTaxInvoicesIsTazrim), Math.round(novemberIncomex + novemberMonthTaxInvoicesIsTazrim), Math.round(decemberIncomex + decemberMonthTaxInvoicesIsTazrim)]
    }],
    options: {
      chart: {
        height: 340,
        foreColor: '#a3a3a3',
        type: 'line',
        stacked: false,
        toolbar: {
          offsetX: hebrew ? -13 : -5,
          offsetY: hebrew ? -8 : -5,
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
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      
      xaxis: {
        categories: ["1", "2", "3", "4", "5", "6", "7","8", "9", "10", "11", "12"]
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            }
          },
          title: {
            text: hebrew ? "Commodity (thousand crores)" : "סחורה (thousand crores)",
            style: {
              color: '#008FFB',
              fontWeight: 'bold',
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: hebrew ? 'Commodity' : "סחורה",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              colors: '#00E396',
            }
          },
          title: {
            text: hebrew ? "Salaries (thousand crores)" : "משכורות (thousand crores)",
            style: {
              color: '#00E396',
              fontWeight: 'bold',
            }
          },
        },
        {
          seriesName: hebrew ? 'Incomes' : "הכנסות",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
          },
          title: {
            text: hebrew ? "Incomes (thousand crores)" : "הכנסות (thousand crores)",
            style: {
              color: '#FEB019',
              fontWeight: 'bold',
            }
          }
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: hebrew ? 'left' : 'right',
        offsetX: 40,
        offsetY: windowWidth > 580 ? 10 : 0
      }
    },
  

  }


  const state0 = {
    series: [
      {
        name: 'Actual',
        data: [
          {
            x: 'ינואר',
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
            x: 'פברואר',
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
            x: 'מרץ',
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
            x: 'אפריל',
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
            x: 'מאי',
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
            x: 'יוני',
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
            x: 'יולי',
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
          {
            x: 'אוגוסט',
            y: 6553,
            goals: [
              {
                name: 'Expected',
                value: 7300,
                strokeHeight: 2,
                strokeDashArray: 2,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'ספטמבר',
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
            x: 'אוקטובר',
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
            x: 'נובמבר',
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
            x: 'דצמבר',
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
        ]
      }
    ],
    options: {
      chart: {
        height: 350,
        foreColor: '#a3a3a3',
        type: 'bar',
        toolbar: {
          offsetX: hebrew ? -13 : 0,
          offsetY: hebrew ? -8 : 10,
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
     
      plotOptions: {
        bar: {
          columnWidth: '60%'
        }
      },
      
      colors: ['#00E396'],
      dataLabels: {
        enabled: false
      },
      // legend: {
      //   show: true,
      //   showForSingleSeries: true,
      //   customLegendItems: ['יעד', 'הכנסה'],
      //   markers: {
      //     fillColors: ['#775DD0', '#00E396']
      //   }
      // },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
        offsetY: -8,
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['יעד', 'הכנסה'],
        markers: {
          fillColors: ['#775DD0', '#00E396']
        }
      },
      
      yaxis: {
        title: {
          text: hebrew ? ' Incomes vs targets - ' + incomeCurrentYear  : ' טבלת הכנסות מול יעדים ' + incomeCurrentYear,
          offsetX: -8,
          style: {
            fontSize: '15px',
            // fontWeight: 'bold' 
          }
        },
        min: 0
      },
    },
  }



  const state1 = {
          
    options: {
      chart: {
        type: 'bar',
        foreColor: '#a3a3a3',
        height: 350,
        stacked: true,
        toolbar: {
          offsetX: hebrew ? 0 : 3,
          show: true, // Show the toolbar
          tools: {
            menu: false, // Show only the Menu button
            download: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: false
          }
        },
       
      },
      
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: 0,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          columnWidth: '65%',
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: barAmount,
              style: {
                fontSize: '13px',
                fontWeight: 900,
                color: '#a1a1aa'
              }
            }
          }
        },
      },
      xaxis: {
        type: 'months',
        categories: hebrew ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]  : ['ינואר', 'פברואר', 'מרץ', 'אפריל',
        'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר',
        'נובמבר', 'דצמבר'
      ],
      },
      yaxis: {
        title: {
          text: hebrew ? ' Yearly outcome chart - ' + incomeCurrentYear  : ' טבלת הוצאות שנתית ' + incomeCurrentYear,
          offsetX: -8,
          style: {
            fontSize: '16px',
            fontWeight: 'bold' // set the font size here
          }
        },
        min: 0
      },
      legend: {
        position: 'bottom',
        offsetY: windowWidth > 628 ? 5 : -10,
      },
      fill: {
        opacity: 0.8
      }
    },
  
  }



const bar = {
  options: {
    chart: {
      height: 350,
      type: 'bar',
      foreColor: '#a8a29e',
    },
    
    plotOptions: {
      bar: {
        columnWidth: '60%',
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900,
              color: '#a1a1aa'
            }
          }
        }
      },
    },
    dataLabels: {
      enabled: label
    },
    // colors: ['#00E396'],
    colors: ['#3b82f6'],
    // dataLabels: {
    //   enabled: false
    // },
    xaxis: {
      categories: hebrew ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] : ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    },
    // legend: {
    //   show: false,
    //   showForSingleSeries: true,
    //   customLegendItems: ['Actual', 'Expected'],
    //   markers: {
    //     fillColors: ['#00E396', '#775DD0']
    //   }
    // }
    legend: {
      offsetY: 3,
      offsetX: 10,
      position: "bottom",
      horizontalAlign: "right",
      labels: {
        colors: '#f3f4f6'
    }
    }
  },
}


const state62 = {
  series: [{
    name: 'סחורה',
    data: [44, 55, 41, 37, 22, 43, 21]
  }, {
    name: 'קבועות',
    data: [53, 32, 33, 52, 13, 43, 32]
  }, {
    name: 'משתנות',
    data: [12, 17, 11, 9, 15, 11, 20]
  }, {
    name: 'משכורות',
    data: [9, 7, 5, 8, 6, 9, 4]
  }, {
    name: 'הלוואות',
    data: [25, 12, 19, 32, 25, 24, 10]
  }],
  options: {
    chart: {
      type: 'bar',
      foreColor: '#a8a29e',
      height: 350,
      stacked: true,
      toolbar: {
        offsetX: hebrew ? 0 : 3,
        offsetY: hebrew ? 0 : -1,
        show: true, // Show the toolbar
        tools: {
          menu: false, // Show only the Menu button
          download: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: false
        }
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900,
              color: globalTheme == "light" ? '#495057' : '#a1a1aa'
            }
          }
        }
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
   
    xaxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      labels: {
        formatter: function (val) {
          return val + "K"
        }
      }
    },
    
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "K"
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetX: 40,
      offsetY: 15
    }
  },
}


const state60 = {
  series: [{
    name: 'משכורות',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  }, {
    name: 'הכנסות',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  }, {
    name: 'סחורה',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }],
  options: {
    chart: {
      height: 350,
      type: 'line',
      foreColor: '#a8a29e',
      stacked: false,
      toolbar: {
        show: true, // Show the toolbar
        offsetX: hebrew ? 0 : 3,
        offsetY: hebrew ? 0 : -5,
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
    
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
      '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
    ],
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: incomeCurrentYear,
        style: {
          fontSize: '14px',
          fontWeight: 'bold' // set the font size here
        }
      },
      min: 0
    },
    legend: {
      position: 'top',
      offsetY: 10,
    //   labels: {
    //     colors: '#f3f4f6'
    // }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
    
        }
      }
    }
  },

}


const state59 = {
          
  series: [{
    name: 'הכנסות',
    type: 'column',
    data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
  }, {
    name: 'קניית סחורה',
    type: 'line',
    data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
  }],
  options: {
    chart: {
      height: 350,
      type: 'bar',
      foreColor: '#a8a29e',
      toolbar: {
        show: true, // Show the toolbar
        offsetX: hebrew ? 0 : 3,
        offsetY: hebrew ? 0 : -5,
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
    stroke: {
      width: [0, 4],
      curve: 'straight'
    },
    dataLabels: {
      enabled: label
    },
    stroke: {
      width: [0, 4]
    },
   
    labels: ['ינואר', 'פבר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
    xaxis: {
      type: 'month',
      labels: {
        rotate: -45
      },
    },
    legend: {
      position: 'top',
      offsetY: 10,
    //   labels: {
    //     colors: '#f3f4f6'
    // }
    },
    yaxis: [{
      title: {
        text: ' טבלת פוד קוסט' + " " + incomeCurrentYear ,
        offsetX: -10,
        style: {
          fontSize: '16px',
          fontWeight: 'bold' // set the font size here
        }
      },
    
    }, {
      opposite: true,
      // title: {
      //   text: 'Social Media'
      // }
    }]
  },

}


const state599 = {
          
  series: [{
    name: 'הכנסות',
    type: 'column',
    data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
  }],
  options: {
    chart: {
      height: 350,
      type: 'bar',
      foreColor: '#a8a29e',
      toolbar: {
        offsetX: hebrew ? -13 : -10,
        offsetY: hebrew ? -8 : -20,
        show: true, // Show the toolbar
        tools: {
          menu: true, // Show only the Menu button
          download: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
    },
    stroke: {
      width: [0, 4],
      curve: 'straight'
    },
    dataLabels: {
      enabled: label
    },
    stroke: {
      width: [0, 4]
    },
    
    labels: ['ינואר', 'פבר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
    xaxis: {
      type: 'month',
      labels: {
        rotate: -45
      },
    },
    legend: {
      position: 'top',
      offsetY: 1,
    //   labels: {
    //     colors: '#f3f4f6'
    // }
    },
    yaxis: [{
      title: {
        text: item2 == 1 ? ' טבלת הכנסות' + "  " + incomeCurrentYear : item2 == 2 ? ' קניית סחורה' + "  " + incomeCurrentYear : item2 == 3 ? ' טבלת משכורות' + "  " + incomeCurrentYear : item2 == 4  ? ' טבלת הוצאות קבועות' + "  " + incomeCurrentYear : item2 == 5 ? ' טבלת הוצאות משתנות' + "  " + incomeCurrentYear : item2 == 6 ? ' טבלת הוצאות כללי' + "  " + incomeCurrentYear : '',
        offsetX: -10,
        style: {
          fontSize: '16px',
          fontWeight: 'bold' // set the font size here
        }
      },
    
    }, {
      opposite: true,
      // title: {
      //   text: 'Social Media'
      // }
    }]
  },

}


  const state22 = {
          
    options: {
      chart: {
        height: 350,
        type: 'area',
        // background: '#FFFFFF', 
        foreColor: '#a8a29e', // default label color
        toolbar: {
          offsetX: -7,
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
        exporting: {
          enabled: true,
          chartOptions: {
            legend: {
              show: true, // Show the legend in the downloaded image
            },
          },
        },
      },
      
      dataLabels: {
        enabled: label
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'months',
        categories: hebrew && windowWidth > 420 ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]  : hebrew && windowWidth < 420 ? ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] : !hebrew && windowWidth > 420 ? ["ינואר", "'פבר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "'אוג'", "'ספט", "'אוק", "'נוב", "'דצמ"] : !hebrew && windowWidth < 420 ? ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        labels: {
         
      },
      yaxis: {
        labels: {
            style: {
                colors: '#f3f4f6'
            }
        },
        title: {
          text: incomeCurrentYear,
        },
        min: 0
    },
      },
      legend: {
        position: 'bottom',
        offsetY: windowWidth > 420 ? 0 : 5,
      //   labels: {
      //     colors: '#f3f4f6'
      // }
      // show: windowWidth > 499 ? true : false,
      },
     
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
                fontWeight: 900,
                
              }
            }
          }
        },
      },
      
  
  }

 
  const state4 = {
          
    options: {
      chart: {
        type: 'area',
        height: 350,
        foreColor: '#a3a3a3',
        toolbar: {
          offsetX: -7,
          show: true, // Show the toolbar
          tools: {
            menu: true, // Show only the Menu button
            download: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: label
      },
      stroke: {
        curve: 'straight',
      },
      
      xaxis: {
        // labels: {
        //   show: false
        // },
        type: 'months',
        categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        labels: {
          // style: {
          //     colors: ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#FF5733', '#FFC300',]
          // }
        //   style: {
        //     colors: ['#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6']
        // }
      },
      },
      yaxis: {
        // opposite: true,  // move the yaxis labels from right to left
        
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "₪" + val + ""
          }
        }
      },
      legend: {
        offsetY: -1,
        // offsetX: 10,
        // position: "top",
        // horizontalAlign: "center",
      //   labels: {
      //     colors: '#f3f4f6'
      // }
      }
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
              fontWeight: 900,
              
            }
          }
        }
      },
    },
  
  }


const state11 = {
          
  options: {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '55%', // adjust the donut size as per your requirement
        },
      },
    },
    yaxis: {
      opposite: true, // set the opposite property to true to move the y-axis labels to the right
    },
    labels: hebrew ? ["income", "permanent", "changed", "wares", "salaries"] : ["הכנסות", "קבועות", "משתנות", "סחורה", "משכורות"],

    legend: {
      position: 'bottom',
      orientation: 'horizontal',
      offsetY: 15,
      itemMargin: {
        horizontal: 3, // Increase this value to create space between legend items
      },
      itemWidth: 100,
      itemWrap: true, 
      labels: {
        colors: '#a3a3a3'
    }
    },
    responsive: [{
      breakpoint: 900,
      options: {
        chart: {
          width: 280
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },

}

const state111 = {
          
  series: [44, 55, 41, 17, 15],
  options: {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '55%', // adjust the donut size as per your requirement
        },
      },
    },
    yaxis: {
      opposite: true, // set the opposite property to true to move the y-axis labels to the right
    },
    // labels: ["הכנסות", "קבועות", "משתנות", "סחורה", "משכורות"],
    labels: hebrew ? ["income", "permanent", "changed", "wares", "salaries"] : ["הכנסות", "קבועות", "משתנות", "סחורה", "משכורות"],
    legend: {
      position: 'bottom',
      orientation: 'horizontal',
      offsetY: 8,
      labels: {
        colors: '#a3a3a3'
    }
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
    // }]
  },

}


  const getTasks = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/all-workers-tasks-paging/${id}/${page}/8/startDate`)
  }
  
  const {data: tasks, refetch: fetch} = useQuery('user-worker-tasks', ()=> getTasks(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: workersTasks,
      refetchOnWindowFocus:false
 
    }) 

    

  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]


  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const lastYear = new Date().getFullYear() -1
  const lastTwoYear = new Date().getFullYear() -2

  const years = [currentYear, lastYear, lastTwoYear]  

  const res = localStorage.getItem("user")
  const result = JSON.parse(res)


  const getSuppliersMonth = () => {
    const id = result?.id
    return axios.get('https://nartina.com/api/user/suppliers-month-2/' + id + "/" + currentMonth + "/" + currentYear)
  }
  
  const {data: suppliersMonth, refetch: lll} = useQuery('suppliers-month', ()=> getSuppliersMonth(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: invoice,
      refetchOnWindowFocus:false
  
    }) 


  const getSuppReportLastMonth = () => {
    const id = result?.id
   if(currentMonth == 1) {
    axios.get('https://nartina.com/api/user/suppliers-month-2/' + id + "/" + 12 + "/" + lastYear)
    .then(res => {console.log(res.data)
      setSuppliers(res.data)})
    .catch(err => console.log(err.response.data))
   }else {
    const lastMonth = currentMonth - 1
    axios.get('https://nartina.com/api/user/suppliers-month-2/' + id + "/" + lastMonth + "/" + currentYear)
    .then(res => {console.log(res.data)
      setSuppliers(res.data)})
    .catch(err => console.log(err.response.data))
   }
  }


  const getSuppReportThisMonth = () => {
    const id = result?.id
    axios.get('https://nartina.com/api/user/suppliers-month-2/' + id + "/" + currentMonth + "/" + currentYear)
    .then(res => {console.log(res.data)
      setSuppliers(res.data)})
    .catch(err => console.log(err.response.data))
  }

  // yearly outcome with not vat invoices to calc yearly vat
  const getYearlyOutcomeNoVat = () => {
    const id = result?.id
    return axios.get('https://nartina.com/api/user/get-yearly-outcome-no-vat/' + id)
  }
  
  const {data: outcomeNoVat} = useQuery('outcome-year-no-vat', ()=> getYearlyOutcomeNoVat(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: invoice || income,
      refetchOnWindowFocus:false
  
    }) 


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
      localStorage.setItem('workersTasks', false)
      localStorage.setItem('tasksStats', false)
      localStorage.setItem('subsUsers', false)
      localStorage.setItem('clocks', false)
      localStorage.setItem('customer', false)


    }, 3000)
  })



  useEffect(()=> {
    setSpins(true)
       setTimeout(() => {
       setSpins(false)
      }, 1400)
  }, [])



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

useEffect(()=> {
  document.body.onmousemove = e => {
    for(const date of document.getElementsByClassName("box")) {
      const rect = date.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

      date.style.setProperty("--mouse-x", `${x}px`);
      date.style.setProperty("--mouse-y", `${y}px`);
    };
  }
}, [])

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


const getDashTasks = () => {
  const id = result?.id
  return axios.get('https://nartina.com/api/user/all-dash-tasks/' + id)
}

const {data: dashTasks, refetch: qqq} = useQuery('user-dash-tasks', ()=> getDashTasks(),
  {
    // enabled: !!supplier?.name,
    // staleTime: 300000
    refetchOnMount: false,
    refetchOnWindowFocus:false

  }) 

  const getIncomeDayAvrage = () => {
    const id = result?.id
    return axios.get('https://nartina.com/api/user/by-days/' + id + "/" + incomeCurrentYear)
  }
  
  const {data: avrage, refetch: byDay} = useQuery('income-avrage', ()=> getIncomeDayAvrage(),
    {
      // enabled: !!supplier?.name,
      // staleTime: 300000
      refetchOnMount: income,
      refetchOnWindowFocus:false
  
    }) 

    const getWaybillsAmount = () => {
      const id = result?.id
      return axios.get('https://nartina.com/api/user/monthly-waybills-tazrim/' + id)
    }
    
    const {data: waybills, refetch: waybill} = useQuery('waybills-amount', ()=> getWaybillsAmount(),
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: true,
        refetchOnWindowFocus:false
    
      }) 

      const getWaybillsAmountVat = () => {
        const id = result?.id
        return axios.get('https://nartina.com/api/user/monthly-waybills-tazrim-vat/' + id)
      }
      
      const {data: waybillsVat, refetch: waybillVat} = useQuery('waybills-amount-vat', ()=> getWaybillsAmountVat(),
        {
          // enabled: !!supplier?.name,
          // staleTime: 300000
          refetchOnMount: true,
          refetchOnWindowFocus:false
      
        }) 



    const getInvoiceCount = () => {
      const id = result?.id
      return axios.get(`https://nartina.com/api/user/count-invoices/${id}`)
    }
    
    const {data: counts} = useQuery('invoices-count', getInvoiceCount,
      {
        // enabled: !!supplier?.name,
        // staleTime: 300000
        refetchOnMount: invoice,
        refetchOnWindowFocus:false
    
      }) 



const getScedulers = () => {
  const id = result?.id
  return axios.get(`https://nartina.com/api/user/schedulers-by-user/${id}`)
}

const {data: schedulers} = useQuery('schedulers', getScedulers,
  {
    // enabled: !!supplier?.name,
    // staleTime: 300000
    refetchOnMount: false,
    refetchOnWindowFocus:false

  }) 



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
    
    // const {data: waresAll, refetch: rrr} = useQuery('wares-data-all', getWaresData,
    const {data: waresAll, refetch: ooo} = useQuery('wares-data-all', getWaresData,
      {
        // refetchOnMount: wares || invoice,
        refetchOnMount: wares,
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
                // enabled: false,
                refetchOnMount: true,
                refetchOnWindowFocus:false
               
              })

              const getOutcomeDay = () => {
                const id = result?.id
                return axios.get(`https://nartina.com/api/user/outcome-array-days/${id}/${incomeMonth == "" ? currentYear : incomeYear}/${incomeMonth == "" ? currentMonth : monthNumber}`)
               }
               
             const {data: outcomeDayAll, refetch: mmm} = useQuery('outcome-day', getOutcomeDay,
                 {
                  //  enabled: false,
                   refetchOnMount: true,
                   refetchOnWindowFocus:false
                  
                 })


            const getWaresDay = () => {
                const id = result?.id
                return axios.get(`https://nartina.com/api/user/wares-array-days/${id}/${incomeMonth == "" ? currentYear : incomeYear}/${incomeMonth == "" ? currentMonth : monthNumber}`)
                }
                 
            const {data: WaresDayAll, refetch: nnn} = useQuery('wares-day', getWaresDay,
                   {
                    enabled: false,
                    refetchOnMount: false,
                    refetchOnWindowFocus:false
                    
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
                      setZ25(WaresDayAll?.data[24])
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

              },[incomeDayAll, incomeCurrentYear])    

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


  useEffect(()=> {
    let count = 0;
    let total = 0;
    let result = 0;
    for(let i = 0; i < incomeDayAll?.data.length; i++){
      if(incomeDayAll?.data[i] > 0) {
        total += incomeDayAll?.data[i]
        count++
        console.log("---" + incomeDayAll?.data[i])
      }
        
    }
    result = total / count;
    console.log("---> count is: " + count)
    console.log("---> total is: " + total)
    console.log("---> result is: " + Math.round(result).toLocaleString())
    setAvrageDay(result)
    setTotalDay(total)
    setTotalCount(count)
  })

  useEffect(()=> {
    // setTimeout(()=> {
      setTotalIncome(incomesAll?.data[0] + incomesAll?.data[1] + incomesAll?.data[2] + incomesAll?.data[3] + incomesAll?.data[4] + incomesAll?.data[5] + incomesAll?.data[6] + 
        incomesAll?.data[7] + incomesAll?.data[8] + incomesAll?.data[9] + incomesAll?.data[10] + incomesAll?.data[11])
      // setTotalSal(januarSalariesx + februarySalariesx + marchSalariesx + aprilSalariesx + maySalariesx + juneSalariesx + julySalariesx)
    // }, 500)
  }, [incomeCurrentYear, totalIncome, setIncomeCurrentYear, incomesAll])

  useEffect(()=> {
    // setTimeout(()=> {
      setTotalReceipt(receiptsAll?.data[0] + receiptsAll?.data[1] + receiptsAll?.data[2] + receiptsAll?.data[3] + receiptsAll?.data[4] + receiptsAll?.data[5] + receiptsAll?.data[6] + 
        receiptsAll?.data[7] + receiptsAll?.data[8] + receiptsAll?.data[9] + receiptsAll?.data[10] + receiptsAll?.data[11])
      // setTotalSal(januarSalariesx + februarySalariesx + marchSalariesx + aprilSalariesx + maySalariesx + juneSalariesx + julySalariesx)
    // }, 500)
  }, [incomeCurrentYear, totalReceipt, setIncomeCurrentYear, receiptsAll])

  useEffect(()=> {
    // setTimeout(()=> {
      setTotalWares(waresAll?.data[0] + waresAll?.data[1] + waresAll?.data[2] + waresAll?.data[3] + waresAll?.data[4] + waresAll?.data[5] + waresAll?.data[6] + 
        waresAll?.data[7] + waresAll?.data[8] + waresAll?.data[9] + waresAll?.data[10] + waresAll?.data[11])
      // setTotalSal(januarSalariesx + februarySalariesx + marchSalariesx + aprilSalariesx + maySalariesx + juneSalariesx + julySalariesx)
    // }, 500)
  }, [incomeCurrentYear, totalWares, setIncomeCurrentYear, waresAll])

  useEffect(()=> {
    // setTimeout(()=> {
      setTotalPermanent(permanentAll?.data[0] + permanentAll?.data[1] + permanentAll?.data[2] + permanentAll?.data[3] + permanentAll?.data[4] + permanentAll?.data[5] + permanentAll?.data[6] + 
        permanentAll?.data[7] + permanentAll?.data[8] + permanentAll?.data[9] + permanentAll?.data[10] + permanentAll?.data[11])
      // setTotalSal(januarSalariesx + februarySalariesx + marchSalariesx + aprilSalariesx + maySalariesx + juneSalariesx + julySalariesx)
    // }, 500)
  }, [incomeCurrentYear, totalPermanent, setIncomeCurrentYear, permanentAll])

  useEffect(()=> {
    // setTimeout(()=> {
      setTotalChangeable(changableAll?.data[0] + changableAll?.data[1] + changableAll?.data[2] + changableAll?.data[3] + changableAll?.data[4] + changableAll?.data[5] + changableAll?.data[6] + 
        changableAll?.data[7] + changableAll?.data[8] + changableAll?.data[9] + changableAll?.data[10] + changableAll?.data[11])
      // setTotalSal(januarSalariesx + februarySalariesx + marchSalariesx + aprilSalariesx + maySalariesx + juneSalariesx + julySalariesx)
    // }, 500)
  }, [incomeCurrentYear, totalChangeable, setIncomeCurrentYear, changableAll])

  useEffect(()=> {
    // setTimeout(()=> {
      setTotalSal(salariesAll?.data[0] + salariesAll?.data[1] + salariesAll?.data[2] + salariesAll?.data[3] + salariesAll?.data[4] + salariesAll?.data[5] + salariesAll?.data[6] + 
        salariesAll?.data[7] + salariesAll?.data[8] + salariesAll?.data[9] + salariesAll?.data[10] + salariesAll?.data[11])
      // setTotalSal(januarSalariesx + februarySalariesx + marchSalariesx + aprilSalariesx + maySalariesx + juneSalariesx + julySalariesx)
    // }, 500)
  }, [incomeCurrentYear, totalSal, setIncomeCurrentYear, salariesAll])


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

const handleBlur = () => {
  setBack(false);
};




const {data: jwt} = useQuery('jwt', ()=> getJwt(),
  {
    // enabled: !!supplier?.name,
    staleTime: 50000,
    onSuccess,
    onError
    // refetchOnMount: true,
    // refetchOnWindowFocus: true
  })


  const monthClocks = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/parse-sum-total/${id}`)
  }
  
  const {data: clocksSum} = useQuery('month-clocks', ()=> monthClocks(),
    {
     
      refetchOnMount: clocks,
      refetchOnWindowFocus: false
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


  const getTasksStats = () => {
    const id = result?.id
    return axios.get(`https://nartina.com/api/user/stats/${id}`)
  }
  
  const {data: stats, refetch: aaa} = useQuery('tasks-stats', ()=> getTasksStats(),
    {
     
      refetchOnMount: tasksStats || workersTasks || customer,
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

  const getLastMonthOutcomeByType = () => {
    const id = result?.id
    return axios.get("https://nartina.com/api/user/outcome-type-last-month-array/" + id + "/" + currentMonth + "/" + currentYear)
  }
  
  const {data: lastMonthOutcomeType} = useQuery('last-outcome-type', ()=> getLastMonthOutcomeByType(),
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

  useEffect(()=> {
    setLastWaresOutcome(lastMonthOutcomeType?.data[0])
    setLastMonthPermanentOutcome(lastMonthOutcomeType?.data[1])
    setLastMonthChangeableOutcome(lastMonthOutcomeType?.data[2])
  
  },[lastMonthOutcomeType, currentMonth, currentYear])



  const allMonthSalaries = () => {

    return axios.get(`https://nartina.com/api/user/sum-by-workers-month/${result?.id}`)
  }
  
  const {data: monthSalaries} = useQuery('all-month-sal', ()=> allMonthSalaries(),
    {
      refetchOnMount: clocks,
      refetchOnWindowFocus: false
    })


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


  const series8 = [currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data, currentMonthPermanentOutcome, currentMonthChangeableOutcome, currentMonthWaresOutcome, Math.round(currentMonthSallries?.data + (isFinite(monthSalaries?.data) ? monthSalaries?.data : 0)) ]

  const radarSeries = [Math.round(isFinite(totalIncome + totalReceipt) ? (totalIncome + totalReceipt) : 0), Math.round(isFinite(totalWares) ? totalWares : 0), Math.round(isFinite(totalPermanent) ? totalPermanent : 0), Math.round(isFinite(totalChangeable) ? totalChangeable : 0), Math.round(isFinite(totalSal) ? totalSal : 0)]

  const forVat = Math.round((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data))
  const forVat2 = Math.round(MonthlyOutcomeForVat?.data + waybillsVat?.data)
  const forVat3 = Math.round(forVat - forVat2)
  const vat = Math.round(forVat3 * 17 / 117)
  

  const monthlyIncomeToString = Number(isNaN(currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) ? 0 : Math.round(currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data)).toLocaleString()
  const monthlyWaresOutcomeToString = Number(isNaN(currentMonthWaresOutcome + waybills?.data) ? 0 : Math.round(currentMonthWaresOutcome + waybills?.data)).toLocaleString()
  const monthlyTotalOutcomeToString = Number(isNaN(currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data + waybills?.data + (isFinite(monthSalaries?.data) ? monthSalaries?.data : 0)) ? 0 : Math.round(currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data + (isFinite(monthSalaries?.data) ? monthSalaries?.data : 0) + waybills?.data)).toLocaleString()
  const balanceToString = Number(isNaN((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - (currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data + (isFinite(monthSalaries?.data) ? monthSalaries?.data : 0) + waybills?.data + vat )) ? 0 : Math.round((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - (currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data + (isFinite(monthSalaries?.data) ? monthSalaries?.data : 0) + waybills?.data + vat))).toLocaleString()

  const monthlyTotalOutcomeToString2 = Number(isNaN(currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome) ? 0 : Math.round(currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome)).toLocaleString()
  const lastMonthTotalOutcomeToString = Number(isNaN(lastMonthWaresOutcome + lastMonthPermanentOutcome + lastMonthChangeableOutcome) ? 0 : Math.round(lastMonthWaresOutcome + lastMonthPermanentOutcome + lastMonthChangeableOutcome)).toLocaleString()

  const waresPercentage = Math.round(((currentMonthWaresOutcome + waybills?.data) / (currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data)) * 100)     
  const outcomePercentage = Math.round(((currentMonthWaresOutcome + waybills?.data + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data + (isFinite(monthSalaries?.data) ? monthSalaries?.data : 0)) / (currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data)) * 100)     
  const balancePercentage = Math.round((((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - (currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data + (isFinite(monthSalaries?.data) ? monthSalaries?.data : 0) + waybills?.data + vat)) / (currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data)) * 100)
  
  const yearlyVat = Math.round(((totalIncome + totalReceipt) - outcomeNoVat?.data) * 17 / 117)

  const days = [{
    name: hebrew ? 'day' : 'יום בשבוע',
    data: [avrage?.data.SUNDAY ? Math.round(avrage?.data.SUNDAY) : 0, avrage?.data.MONDAY ? Math.round(avrage?.data.MONDAY) : 0, avrage?.data.TUESDAY ? Math.round(avrage?.data.TUESDAY) : 0, avrage?.data.WEDNESDAY ? Math.round(avrage?.data.WEDNESDAY) : 0, avrage?.data.THURSDAY ? Math.round(avrage?.data.THURSDAY) : 0, avrage?.data.FRIDAY ? Math.round(avrage?.data.FRIDAY) : 0, avrage?.data.SATURDAY ? Math.round(avrage?.data.SATURDAY) : 0]
  }]



  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=> {
    if(((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - (currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data + (isFinite(monthSalaries?.data) ? monthSalaries?.data : 0) + vat)) < 0){
      setOpen(true)
    }
  }, [currentMonthDailyIncome?.data, currentMonthWaresOutcome, currentMonthPermanentOutcome, currentMonthChangeableOutcome, currentMonthSallries?.data, currentMonthTaxInvoicesIsTazrim?.data, currentMonthRestaurantAmount?.data + (isFinite(monthSalaries?.data) ? monthSalaries?.data : 0) + vat])
  
  

  useEffect(() => {
    setTimeout(() => {
      setIsSSRE(false);
    }, 800)
    
  }, [isSSRE]);

  
  
  useEffect(()=> {
    setGolmiProfit(((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - (currentMonthWaresOutcome + waybills?.data)) / (currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) )
  }, [currentMonthDailyIncome?.data, currentMonthWaresOutcome, currentMonthTaxInvoicesIsTazrim?.data, currentMonthRestaurantAmount?.data, + waybills?.data])




  useEffect(()=> {
    setTifuliProfit(((currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data) - (currentMonthWaresOutcome + currentMonthPermanentOutcome + currentMonthChangeableOutcome + currentMonthSallries?.data + (isFinite(monthSalaries?.data) ? monthSalaries?.data : 0) + waybills?.data)) / (currentMonthDailyIncome?.data + currentMonthTaxInvoicesIsTazrim?.data + currentMonthRestaurantAmount?.data))
}, [currentMonthDailyIncome?.data, currentMonthWaresOutcome, currentMonthPermanentOutcome, currentMonthChangeableOutcome, currentMonthSallries?.data, tifuliProfit, currentMonthTaxInvoicesIsTazrim?.data, currentMonthRestaurantAmount?.data, + waybills?.data])
  


  const handleCloseMeeting = () => {
    setMeeting(false)
  }

  const handleClose9 = () => {
    setErrorMode(false)
    setErrors("")
  }



  const series2 = [
    {
      name: hebrew ? "outcome" : "הוצאות",
      data: [Math.round(januarSupplierWaresOutcomex + januarSupplierChangeableOutcomex + januarSupplierPermanentOutcomex + januarSalariesx), Math.round(februarySupplierWaresOutcomex + februarySupplierChangeableOutcomex + februarySupplierPermanentOutcomex + februarySalariesx), Math.round(marchSupplierWaresOutcomex + marchSupplierChangeableOutcomex + marchSupplierPermanentOutcomex + marchSalariesx), Math.round(aprilSupplierWaresOutcomex + aprilSupplierChangeableOutcomex + aprilSupplierPermanentOutcomex + aprilSalariesx), Math.round(maySupplierWaresOutcomex + maySupplierChangeableOutcomex + maySupplierPermanentOutcomex + maySalariesx), Math.round(juneSupplierWaresOutcomex + juneSupplierChangeableOutcomex + juneSupplierPermanentOutcomex + juneSalariesx), Math.round(julySupplierWaresOutcomex + julySupplierChangeableOutcomex + julySupplierPermanentOutcomex + julySalariesx), Math.round(augustSupplierWaresOutcomex + augustSupplierChangeableOutcomex + augustSupplierPermanentOutcomex + augustSalariesx), Math.round(septemberSupplierWaresOutcomex + septemberSupplierChangeableOutcomex + septemberSupplierPermanentOutcomex + septemberSalariesx), Math.round(octoberSupplierWaresOutcomex + octoberSupplierChangeableOutcomex + octoberSupplierPermanentOutcomex + octoberSalariesx), Math.round(novemberSupplierWaresOutcomex + novemberSupplierChangeableOutcomex + novemberSupplierPermanentOutcomex + novemberSalariesx), Math.round(decemberSupplierWaresOutcomex + decemberSupplierChangeableOutcomex + decemberSupplierPermanentOutcomex + decemberSalariesx)],
      // type: 'column',
    },
    {
      name: hebrew ? "income" : "הכנסות",
      data: [Math.round(januarIncomex + januarMonthTaxInvoicesIsTazrim), Math.round(februaryIncomex + februaryMonthTaxInvoicesIsTazrim), Math.round(marchIncomex + marchMonthTaxInvoicesIsTazrim), Math.round(aprilIncomex + aprilMonthTaxInvoicesIsTazrim), Math.round(mayIncomex + mayMonthTaxInvoicesIsTazrim), Math.round(juneIncomex + juneMonthTaxInvoicesIsTazrim), Math.round(julyIncomex + julyMonthTaxInvoicesIsTazrim), Math.round(augustIncomex + augustrMonthTaxInvoicesIsTazrim), Math.round(septemberIncomex + septemberMonthTaxInvoicesIsTazrim), Math.round(octoberIncomex + octoberMonthTaxInvoicesIsTazrim), Math.round(novemberIncomex + novemberMonthTaxInvoicesIsTazrim), Math.round(decemberIncomex + decemberMonthTaxInvoicesIsTazrim)],
      // type: 'area',
    },
   
  ]


  const series222 = [
    {
      name: hebrew ? "outcome" : "הוצאות",
      data: [Math.round(januarSupplierWaresOutcomex), Math.round(februarySupplierWaresOutcomex), Math.round(marchSupplierWaresOutcomex), Math.round(aprilSupplierWaresOutcomex), Math.round(maySupplierWaresOutcomex), Math.round(juneSupplierWaresOutcomex), Math.round(julySupplierWaresOutcomex), Math.round(augustSupplierWaresOutcomex), Math.round(septemberSupplierWaresOutcomex), Math.round(octoberSupplierWaresOutcomex), Math.round(novemberSupplierWaresOutcomex), Math.round(decemberSupplierWaresOutcomex)]
    },
    {
      name: hebrew ? "income" : "הכנסות",
      data: [Math.round(januarIncomex + januarMonthTaxInvoicesIsTazrim), Math.round(februaryIncomex + februaryMonthTaxInvoicesIsTazrim), Math.round(marchIncomex + marchMonthTaxInvoicesIsTazrim), Math.round(aprilIncomex + aprilMonthTaxInvoicesIsTazrim), Math.round(mayIncomex + mayMonthTaxInvoicesIsTazrim), Math.round(juneIncomex + juneMonthTaxInvoicesIsTazrim), Math.round(julyIncomex + julyMonthTaxInvoicesIsTazrim), Math.round(augustIncomex + augustrMonthTaxInvoicesIsTazrim), Math.round(septemberIncomex + septemberMonthTaxInvoicesIsTazrim), Math.round(octoberIncomex + octoberMonthTaxInvoicesIsTazrim), Math.round(novemberIncomex + novemberMonthTaxInvoicesIsTazrim), Math.round(decemberIncomex + decemberMonthTaxInvoicesIsTazrim)]
    },
   
  ]
  
  const series223 = [
    {
      name: hebrew ? "outcome" : "משכורות",
      data: [Math.round(salariesAll?.data[0]), Math.round(salariesAll?.data[1]), Math.round(salariesAll?.data[2]), Math.round(salariesAll?.data[3]), Math.round(salariesAll?.data[4]), Math.round(salariesAll?.data[5]), Math.round(salariesAll?.data[6]), Math.round(salariesAll?.data[7]), Math.round(salariesAll?.data[8]), Math.round(salariesAll?.data[9]), Math.round(salariesAll?.data[10]), Math.round(salariesAll?.data[11])]
    },
    {
      name: hebrew ? "income" : "הכנסות",
      data: [Math.round(januarIncomex + januarMonthTaxInvoicesIsTazrim), Math.round(februaryIncomex + februaryMonthTaxInvoicesIsTazrim), Math.round(marchIncomex + marchMonthTaxInvoicesIsTazrim), Math.round(aprilIncomex + aprilMonthTaxInvoicesIsTazrim), Math.round(mayIncomex + mayMonthTaxInvoicesIsTazrim), Math.round(juneIncomex + juneMonthTaxInvoicesIsTazrim), Math.round(julyIncomex + julyMonthTaxInvoicesIsTazrim), Math.round(augustIncomex + augustrMonthTaxInvoicesIsTazrim), Math.round(septemberIncomex + septemberMonthTaxInvoicesIsTazrim), Math.round(octoberIncomex + octoberMonthTaxInvoicesIsTazrim), Math.round(novemberIncomex + novemberMonthTaxInvoicesIsTazrim), Math.round(decemberIncomex + decemberMonthTaxInvoicesIsTazrim)]
    },
   
  ]

  const series224 = [
    {
      name: hebrew ? "outcome" : "הוצאות קבועות",
      data: [Math.round(permanentAll?.data[0]), Math.round(permanentAll?.data[1]), Math.round(permanentAll?.data[2]), Math.round(permanentAll?.data[3]), Math.round(permanentAll?.data[4]), Math.round(permanentAll?.data[5]), Math.round(permanentAll?.data[6]), Math.round(permanentAll?.data[7]), Math.round(permanentAll?.data[8]), Math.round(permanentAll?.data[9]), Math.round(permanentAll?.data[10]), Math.round(permanentAll?.data[11])]
    },
    {
      name: hebrew ? "income" : "הכנסות",
      data: [Math.round(januarIncomex + januarMonthTaxInvoicesIsTazrim), Math.round(februaryIncomex + februaryMonthTaxInvoicesIsTazrim), Math.round(marchIncomex + marchMonthTaxInvoicesIsTazrim), Math.round(aprilIncomex + aprilMonthTaxInvoicesIsTazrim), Math.round(mayIncomex + mayMonthTaxInvoicesIsTazrim), Math.round(juneIncomex + juneMonthTaxInvoicesIsTazrim), Math.round(julyIncomex + julyMonthTaxInvoicesIsTazrim), Math.round(augustIncomex + augustrMonthTaxInvoicesIsTazrim), Math.round(septemberIncomex + septemberMonthTaxInvoicesIsTazrim), Math.round(octoberIncomex + octoberMonthTaxInvoicesIsTazrim), Math.round(novemberIncomex + novemberMonthTaxInvoicesIsTazrim), Math.round(decemberIncomex + decemberMonthTaxInvoicesIsTazrim)]
    },
   
  ]

  const series225 = [
    {
      name: hebrew ? "outcome" : "הוצאות משתנות",
      data: [Math.round(changableAll?.data[0]), Math.round(changableAll?.data[1]), Math.round(changableAll?.data[2]), Math.round(changableAll?.data[3]), Math.round(changableAll?.data[4]), Math.round(changableAll?.data[5]), Math.round(changableAll?.data[6]), Math.round(changableAll?.data[7]), Math.round(changableAll?.data[8]), Math.round(changableAll?.data[9]), Math.round(changableAll?.data[10]), Math.round(changableAll?.data[11])]
    },
    {
      name: hebrew ? "income" : "הכנסות",
      data: [Math.round(januarIncomex + januarMonthTaxInvoicesIsTazrim), Math.round(februaryIncomex + februaryMonthTaxInvoicesIsTazrim), Math.round(marchIncomex + marchMonthTaxInvoicesIsTazrim), Math.round(aprilIncomex + aprilMonthTaxInvoicesIsTazrim), Math.round(mayIncomex + mayMonthTaxInvoicesIsTazrim), Math.round(juneIncomex + juneMonthTaxInvoicesIsTazrim), Math.round(julyIncomex + julyMonthTaxInvoicesIsTazrim), Math.round(augustIncomex + augustrMonthTaxInvoicesIsTazrim), Math.round(septemberIncomex + septemberMonthTaxInvoicesIsTazrim), Math.round(octoberIncomex + octoberMonthTaxInvoicesIsTazrim), Math.round(novemberIncomex + novemberMonthTaxInvoicesIsTazrim), Math.round(decemberIncomex + decemberMonthTaxInvoicesIsTazrim)]
    },
   
  ]

  const tabs1 = [{
    name: 'הכנסות',
    type: 'column',
    data: [Math.round(januarIncomex + januarMonthTaxInvoicesIsTazrim), Math.round(februaryIncomex + februaryMonthTaxInvoicesIsTazrim), Math.round(marchIncomex + marchMonthTaxInvoicesIsTazrim), Math.round(aprilIncomex + aprilMonthTaxInvoicesIsTazrim), Math.round(mayIncomex + mayMonthTaxInvoicesIsTazrim), Math.round(juneIncomex + juneMonthTaxInvoicesIsTazrim), Math.round(julyIncomex + julyMonthTaxInvoicesIsTazrim), Math.round(augustIncomex + augustrMonthTaxInvoicesIsTazrim), Math.round(septemberIncomex + septemberMonthTaxInvoicesIsTazrim), Math.round(octoberIncomex + octoberMonthTaxInvoicesIsTazrim), Math.round(novemberIncomex + novemberMonthTaxInvoicesIsTazrim), Math.round(decemberIncomex + decemberMonthTaxInvoicesIsTazrim)]
  }]

  const tabs2 = [{
    name: 'קניית סחורה',
    type: 'column',
    data: [Math.round(waresAll?.data[0]), Math.round(waresAll?.data[1]), Math.round(waresAll?.data[2]), Math.round(waresAll?.data[3]), Math.round(waresAll?.data[4]), Math.round(waresAll?.data[5]), Math.round(waresAll?.data[6]), Math.round(waresAll?.data[7]), Math.round(waresAll?.data[8]), Math.round(waresAll?.data[9]), Math.round(waresAll?.data[10]), Math.round(waresAll?.data[11])]
  }]

  const tabs3 = [{
    name: 'משכורות',
    type: 'column',
    data: [Math.round(salariesAll?.data[0]), Math.round(salariesAll?.data[1]), Math.round(salariesAll?.data[2]), Math.round(salariesAll?.data[3]), Math.round(salariesAll?.data[4]), Math.round(salariesAll?.data[5]), Math.round(salariesAll?.data[6]), Math.round(salariesAll?.data[7]), Math.round(salariesAll?.data[8]), Math.round(salariesAll?.data[9]), Math.round(salariesAll?.data[10]), Math.round(salariesAll?.data[11])]
  }]

  const tabs4 = [{
    name: 'הוצאות קבועות',
    type: 'column',
    data: [Math.round(permanentAll?.data[0]), Math.round(permanentAll?.data[1]), Math.round(permanentAll?.data[2]), Math.round(permanentAll?.data[3]), Math.round(permanentAll?.data[4]), Math.round(permanentAll?.data[5]), Math.round(permanentAll?.data[6]), Math.round(permanentAll?.data[7]), Math.round(permanentAll?.data[8]), Math.round(permanentAll?.data[9]), Math.round(permanentAll?.data[10]), Math.round(permanentAll?.data[11])]
  }]

  const tabs5 = [{
    name: 'הוצאות משתנות',
    type: 'column',
    data: [Math.round(changableAll?.data[0]), Math.round(changableAll?.data[1]), Math.round(changableAll?.data[2]), Math.round(changableAll?.data[3]), Math.round(changableAll?.data[4]), Math.round(changableAll?.data[5]), Math.round(changableAll?.data[6]), Math.round(changableAll?.data[7]), Math.round(changableAll?.data[8]), Math.round(changableAll?.data[9]), Math.round(changableAll?.data[10]), Math.round(changableAll?.data[11])]
  }]

  
  const tabs6 = [{
    name: 'הוצאות כללי',
    type: 'column',
    data: [Math.round(changableAll?.data[0] + permanentAll?.data[0] + salariesAll?.data[0] + waresAll?.data[0]), Math.round(changableAll?.data[1] + permanentAll?.data[1] + salariesAll?.data[1] + waresAll?.data[1]), Math.round(changableAll?.data[2] + permanentAll?.data[2] + salariesAll?.data[2] + waresAll?.data[2]), Math.round(changableAll?.data[3] + permanentAll?.data[3] + salariesAll?.data[3] + waresAll?.data[3]), Math.round(changableAll?.data[4] + permanentAll?.data[4] + salariesAll?.data[4] + waresAll?.data[4]), Math.round(changableAll?.data[5] + permanentAll?.data[5] + salariesAll?.data[5] + waresAll?.data[5]), Math.round(changableAll?.data[6] + permanentAll?.data[6] + salariesAll?.data[6] + waresAll?.data[6]), Math.round(changableAll?.data[7] + permanentAll?.data[7] + salariesAll?.data[7] + waresAll?.data[7]), Math.round(changableAll?.data[8] + permanentAll?.data[8] + salariesAll?.data[8] + waresAll?.data[8]), Math.round(changableAll?.data[9] + permanentAll?.data[9] + salariesAll?.data[9] + waresAll?.data[9]), Math.round(changableAll?.data[10] + permanentAll?.data[10] + salariesAll?.data[10] + waresAll?.data[10]), Math.round(changableAll?.data[11] + permanentAll?.data[11] + salariesAll?.data[11] + waresAll?.data[11])]
  }]

  

  const series10 = [
    {name: hebrew ? "income" : "הכנסות",
    data: [Math.round(i1), Math.round(i2), Math.round(i3), Math.round(i4), Math.round(i5), Math.round(i6), Math.round(i7), Math.round(i8), Math.round(i9), Math.round(i10),
      Math.round(i11), Math.round(i12), Math.round(i13), Math.round(i14), Math.round(i15), Math.round(i16), Math.round(i17), Math.round(i18), Math.round(i19), Math.round(i20),
      Math.round(i21), Math.round(i22), Math.round(i23), Math.round(i24), Math.round(i25), Math.round(i26), Math.round(i27), Math.round(i28), Math.round(i29), Math.round(i30) , Math.round(i31)]
  },
  {name: hebrew ? "outcome" : "הוצאות",
  data: [Math.round(x1), Math.round(x2), Math.round(x3), Math.round(x4), Math.round(x5), Math.round(x6), Math.round(x7), Math.round(x8), Math.round(x9), Math.round(x10),
    Math.round(x11), Math.round(x12), Math.round(x13), Math.round(x14), Math.round(x15), Math.round(x16), Math.round(x17), Math.round(x18), Math.round(x19), Math.round(x20),
    Math.round(x21), Math.round(x22), Math.round(x23), Math.round(x24), Math.round(x25), Math.round(x26), Math.round(x27), Math.round(x28), Math.round(x29), Math.round(x30) , Math.round(x31)]
  }

  ]

  

  const series = [
    {
      name: hebrew ? "Commodity" : "סחורה",
      data: [Math.round(januarSupplierWaresOutcomex), Math.round(februarySupplierWaresOutcomex), Math.round(marchSupplierWaresOutcomex), Math.round(aprilSupplierWaresOutcomex), Math.round(maySupplierWaresOutcomex), Math.round(juneSupplierWaresOutcomex), Math.round(julySupplierWaresOutcomex), Math.round(augustSupplierWaresOutcomex), Math.round(septemberSupplierWaresOutcomex), Math.round(octoberSupplierWaresOutcomex), Math.round(novemberSupplierWaresOutcomex), Math.round(decemberSupplierWaresOutcomex)]
    },
    {
      name: hebrew ? "Permanent" : "קבועות",
      data: [Math.round(januarSupplierPermanentOutcomex), Math.round(februarySupplierPermanentOutcomex), Math.round(marchSupplierPermanentOutcomex), Math.round(aprilSupplierPermanentOutcomex), Math.round(maySupplierPermanentOutcomex), Math.round(juneSupplierPermanentOutcomex), Math.round(julySupplierPermanentOutcomex), Math.round(augustSupplierPermanentOutcomex), Math.round(septemberSupplierPermanentOutcomex), Math.round(octoberSupplierPermanentOutcomex), Math.round(novemberSupplierPermanentOutcomex), Math.round(decemberSupplierPermanentOutcomex)]
    },
    {
      name: hebrew ? "Changeable" : "משתנות",
      data: [Math.round(januarSupplierChangeableOutcomex), Math.round(februarySupplierChangeableOutcomex), Math.round(marchSupplierChangeableOutcomex), Math.round(aprilSupplierChangeableOutcomex), Math.round(maySupplierChangeableOutcomex), Math.round(juneSupplierChangeableOutcomex), Math.round(julySupplierChangeableOutcomex), Math.round(augustSupplierChangeableOutcomex), Math.round(septemberSupplierChangeableOutcomex), Math.round(octoberSupplierChangeableOutcomex), Math.round(novemberSupplierChangeableOutcomex), Math.round(decemberSupplierChangeableOutcomex)]
    },
    {
      name: hebrew ? "Salaries" : "משכורות",
      data: [januarSalariesx, februarySalariesx, marchSalariesx, aprilSalariesx, maySalariesx, juneSalariesx, julySalariesx, augustSalariesx, septemberSalariesx, octoberSalariesx, novemberSalariesx, decemberSalariesx]
    },

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

    const getMonthInHebrew3 = (e) => {
      let month = "";
        switch (e) {
          case 1:
            month = "דצמבר"
            break;
          case 2:
              month = "ינואר"
            break;
            case 3:
              month = "פברואר"
              break;
              case 4:
                  month = "מרץ"
                break;
                case 5:
                  month = "אפריל"
                  break;
                  case 6:
                      month = "מאי"
                  break;
                  case 7:
                      month = "יוני"
                  break;
                  case 8:
                    month = "יולי"
                  break;
                  case 9:
                      month = "אוגוסט"
                  break;
                  case 10:
                      month = "ספטמבר"
                  break;
                  case 11:
                    month = "אוקטובר"
                  break;
                  case 12:
                      month = "נובמבר"
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
  const input = document.getElementById("www")
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
    doc.save("טבלה.pdf");
    setSpin(false)
    // setPrint(false)
    // setChartDots(!chartDots)

  })
}

const generatePdfMulti = () => {
  setSpin(true)
  const input = document.getElementById("multi")
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
    doc.save("טבלה.pdf");
    setSpin(false)
    // setPrint(false)
    // setChartDots(!chartDots)

  })
}

const generatePdfDayOfWeek = () => {
  setSpin(true)
  const input = document.getElementById("week")
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
    doc.save("טבלה.pdf");
    setSpin(false)
    // setPrint(false)
    // setChartDots(!chartDots)

  })
}

const generatePdfMainChart = () => {
  setSpin(true)
  const input = document.getElementById("main")
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
    doc.save("טבלה.pdf");
    setSpin(false)
    // setPrint(false)
    // setChartDots(!chartDots)

  })
}


const generatePdfdailyZChart = () => {
  setSpin(true)
  const input = document.getElementById("zzz")
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
    doc.save("טבלה.pdf");
    setSpin(false)
    // setPrint(false)
    // setChartDots(!chartDots)

  })
}


const generatePdf1 = () => {
  setSpin(true)
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
        
    doc.save(`הכנסות-${fullDateTime}.pdf`)
    setSpin(false)

  })
}

const generatePdf2 = () => {
  setSpin(true)
  const input = document.getElementById("wares")
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
    
doc.save(`סחורה-${fullDateTime}.pdf`)
    setSpin(false)

  })
}

const generatePdf3 = () => {
  setSpin(true)
  const input = document.getElementById("outcome")
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
        
    doc.save(`הוצאות-${fullDateTime}.pdf`)
    setSpin(false)

  })
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
      axios.delete("https://nartina.com/api/user/delete-dash-task/" + id, {
        headers: {
          Authorization: 'Bearer ' + result?.token,
      
         }
      })
      .then(res => {
      console.log(res.data)
      aaa()
      qqq()
      // setIde("")
        swalWithBootstrapButtons.fire(
          '!נמחק',
          'המשימה נמחקה בהצלחה.',
          'success'
        )
        localStorage.setItem('income', true)}).
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
    "הוצאה": x17
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

}



const handleIncomeYears = () => {
  // setIncomeCurrentYear(2022)
  if(new Date().getFullYear() == incomeCurrentYear) {
    setIncomeCurrentYear(new Date().getFullYear() - 1)
  }else {
    setIncomeCurrentYear(new Date().getFullYear())
  }
  setTimeout(()=> {
    www()
    sss()
    ooo()
    ppp()
    fff()
    ttt()
    byDay()
  }, 300)
}

const getTask = (id) => {
  axios.get("https://nartina.com/api/user/worker-task/" + id)
  .then(res => setWorkerTask(res.data))
  .catch(err => console.log(err.response.data))
  setDialog(true)
}

const getWorkerTask = (id) => {
  axios.get("https://nartina.com/api/user/get-worker-task/" + id)
  .then(res => {setTask(res.data)
    setIde(id)
  console.log(res.data)})
  .catch(err => console.log(err.response.data))
  setDialog(true)
}



const openIncome = () => {
  // refetchAll2()
  vvv()
  ttt()
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


const currentDateChange = (currentDate) => {
  setDate(currentDate)
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



const addDashTask = (e) => {
   e.preventDefault();
   const id = result?.id
   axios.post("https://nartina.com/api/user/add-dashtask/" + id, {
      description,
      color: colorx,
      date: new Date().toISOString().substring(0, 10)
   }, {
    headers: {
      Authorization: 'Bearer ' + result?.token,
  
     }
  })
   .then(res => {console.log(res.data)
    Swal.fire("!הצלחה", '! מטלה קצרה הוכנסה בהצלחה', "success");
    aaa()
    qqq()})
   .catch(err => {console.log(err.response.data)
    Swal.fire("מצטערים", ' קרתה תקלה, ' + err.response.data, "error")})
   .finally(()=> {setTaskDialog(false)
    setDescription("")
    setArrow(false)
    setColorx("")})
}



const solutions = [
  {
    name: 'Insights',
    description: 'Measure actions your users take',
    href: '##',
    icon: IconOne,
  },
  {
    name: 'Automations',
    description: 'Create your own targeted content',
    href: '##',
    icon: IconTwo,
  },
  {
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '##',
    icon: IconThree,
  },
]

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}


const dragDisableIds = new Set([3, 8, 10, 12]);
const allowDrag = ({ id }) => !dragDisableIds.has(id);

const appointmentComponent = (props) => {
  if (allowDrag(props.data)) {
    // return <Appointments.Appointment {...props} style={{ backgroundColor: "green" }}/>;
    return <Appointments.Appointment {...props} />;
  }
  return (
    <Appointments.Appointment
      {...props}
      style={{ ...props.style, cursor: "not-allowed" }}
    />
  );
};

function handleOnDragEnd(results) {
  const id = result?.id;
  if (!results.destination) return;

  console.log(results)
  axios.get('https://nartina.com/api/user/swap-dash-tasks2/' + id + "/" + results.source.index  + "/" + results.destination.index)
  .then(res => {console.log(res.data)
  qqq()})
  .catch(err => console.log(err.response.data))
  // const items = Array.from(characters);
  // const [reorderedItem] = items.splice(result.source.index, 1);
  // items.splice(result.destination.index, 0, reorderedItem);

  // updateCharacters(items);
}



const finishTask = (id) => {
  axios.get("https://nartina.com/api/user/finish-dash-task/" + id)
  .then(res => {console.log(res.data)
    qqq()})
  .catch(err => console.log(err.response.data))
}

function getOrCreateUser(callback) {
  axios.put(
      'https://api.chatengine.io/users/',
      {username: result?.email, email: result?.email, secret: result?.email},
      {headers: {"Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY}}
  )
  .then(r => callback(r.data))
  .catch(e => console.log('Get or create user error', e))
}

function getOrCreateChat(callback) {
  axios.put(
      'https://api.chatengine.io/chats/',
      {usernames: ['nartina', result?.email], is_direct_chat: true},
      {headers: {
          "Project-ID": process.env.REACT_APP_CE_PROJECT_ID,
          "User-Name": result?.email,
          "User-Secret": result?.email,
      }}
  )
  .then(r => callback(r.data))
  .catch(e => console.log('Get or create chat error', e))
}

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("sending email--> ", result?.email)

  getOrCreateUser(
    user => {
      setUser(user)
        // props.setUser && props.setUser(user)
        getOrCreateChat(
          chat => setChat(chat)
        )
    }
)
}

const lastMonth = () => {
  setSuppMonth("2")
  getSuppReportLastMonth()
}

const thisMonth = () => {
  setSuppMonth("1")
  getSuppReportThisMonth()
}


const handlePrevClick = () => {
  setPage((prevPage) => prevPage - 1);
  setTimeout(()=> {
    fetch()
  }, 250)
};

const handleNextClick = () => {
  setPage((prevPage) => prevPage + 1);
  setTimeout(()=> {
    fetch()
  }, 250)
};


const getColor2 = () => {
  
    switch(color) {
      case "blue":
        return "bg-blue-500"
        break;
      case "purple":
        return "bg-indigo-500"
        break;
        case "green":
        return "bg-green-600"
        break;
        case "red":
        return "bg-violet-500"
        break;
        case "light":
        return "bg-[#3F6AD8]"
        break;
        case "orange":
        return "bg-yellow-500"
        break;
      default:
        return "bg-indigo-500"
  }
  
}



const closeTasksColor = () => {
  setTimeout(()=> {
    setArrow(false)
  }, 600)
}

const closeRate = () => {
  setRate(false)
  setRating("")
}

const postRate = () => {
  axios.get("https://nartina.com/api/user/rate-worker-task/" + ide + "/" + rating)
.then(res => {console.log(res.data)
  setTask(res.data)
// localStorage.setItem('workersTasks', true)
setRateAlert(true)
closeRate()
fetch()})
.catch(err => console.log(err.response.data))
}

const handleClose5 = () => {
  setRateAlert(false)
}


const handleCharts = () => {
  if(stateChart == 0) {
    setStateChart(1)
  }else if(stateChart == 1) {
    setStateChart(2)
  }else if(stateChart == 2) {
    setStateChart(3)
  }else if(stateChart == 3) {
    setStateChart(4)
  }else {
    setStateChart(0)
  }
 
}

const changesTabs = () => {
  setItem("5")
  if(item2 == 0) {
    setItem2(1)
  }else if(item2 == 1) {
    setItem2(2)
  }else if(item2 == 2) {
    setItem2(3)
  }else if(item2 == 3) {
    setItem2(4)
  }else if(item2 == 4) {
    setItem2(5)
  }else if(item2 == 5) {
    setItem2(6)
  }
  else if(item2 == 6) {
    setItem2(1)
  }
  else {
    setItem2(1)
  }
 
}



  return (
    <>
    <div className={`w-full mx-auto overflow-x-hidden bg-gray-100 mt-14 ${globalTheme != "light" && "bg-gray-700 dark"}`}>
      
      <div className={`max-w-[1920px] mx-auto overflow-x-hidden ${hebrew ? 'airx:ml-64' : 'airx:mr-64'}`}>
 

      {hebrew ? (
         <div class={`flex items-center justify-between bg-white dark:bg-gray-600 shadow px-8 py-3 sm:py-2`} >
           
          <div class="flex flex-col items-start justify-start relative left-[120px]">
            <h1 class="text-sm font-medium text-gray-900 dark:text-gray-100">Hi {user?.firstName}</h1>
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
        <div class={`flex items-center justify-between bg-white dark:bg-gray-600 shadow px-8 py-2 `} >
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
            <h1 class="text-xs md:text-sm text-gray-500 dark:text-neutral-300 text-right">🚀.נתוני הרווח לחודש אפריל והם משתנים בהתאם לחומר שהוזן למערכת</h1>
          </div>
         
        </div>
       )}

  <div className="grid grid-cols-1 mmu:grid-cols-2 mdf:grid-cols-4 gap-y-8 gap-x-4 p-4 mb-2 relative top-1">
    
  <div class={`${(topBox && globalTheme == 'light') ? 'bg-indigo-400' : 'bg-white'} w-full dark:bg-gray-800 h-[170px] uuu:h-[185px] rounded-2xl shadow group`}>
      <div className='p-4'>
      <div className='flex justify-between items-center relative bottom-1 w-full'>
      
    
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 relative top-0.5 text-gray-500 dark:text-[#ccc] animate-spin-slow">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
      <h3 className={`${(topBox && globalTheme == 'light') ? 'text-[#495057]' : 'text-gray-500'} text-2xl uuu:text-3xl dark:text-gray-300 font-mono font-semibold`}>מאזן</h3>
       
      </div>
      <h2 className="text-[#495057] text-3xl uuu:text-4xl font-extrabold tracking-wide dark:text-[#ccc]"><span className='text-2xl'>₪</span>{balanceToString}</h2>
  
      </div>
  
      <div className="flex flex-col relative bottom-1.5">
      <div className="flex items-center justify-between w-full relative bottom-3 uuu:bottom-1.5 px-2">
      <div className='flex items-center space-x-1'>
        <DateRangeOutlinedIcon fontSize='small' className='text-[#ccc] relative bottom-[1px]'/>
        <h1 className={`text-xs uppercase tracking-wide font-medium ${(topBox && globalTheme == 'light') ? 'text-gray-600 font-bold' : 'text-gray-500'} dark:text-neutral-300`}>{new Date().toLocaleDateString()}</h1>
       </div> 
       <div class="flex items-center cursor-pointer group" onClick={openOutcome}>
        
       <svg class={`h-6 w-6 text-green-500 group-hover:-translate-x-1 mr-1 leading-normal transition-all duration-200 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
       </svg>
      
       <BarChartIcon fontSize="large" className={`text-gray-400 relative bottom-1`}/>
     </div>
       </div>
       
         {isSSRE ? (
          <div className='w-full'>
          <LinearProgress />
          </div>
        ) : ( 
        <div class="w-[94%] bg-gray-200 rounded-full dark:bg-gray-700 mx-2 relative bottom-[18px] dark:bottom-2.5 uuu:bottom-2 dark:uuu:bottom-0">
         <div class={`bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`} style={{ width: `${balancePercentage}%` }}>{isFinite(balancePercentage) ? balancePercentage : 0}%</div>
       </div>
        )}
         <h1 className='hidden dark:inline text-xs uuu:text-sm text-gray-500 text-center dark:text-[#ccc] group-hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer tracking-wide relative top-0 uuu:top-[5px] group-hover:text-blue-500 dark:group-hover:text-blue-500' onClick={()=> navigate('/month-invoices')}>דו"ח מאזן חודשי</h1>

       <div className={`dark:hidden ${(topBox && globalTheme == 'light') ? 'blue-glassmorphism' : 'bg-indigo-500'} ${isSSRE && 'relative top-0.5 uuu:top-0'} flex items-center justify-center dark:bg-gray-900 shadow-md h-10 uuu:h-12 w-full rounded-b-2xl relative bottom-3.5 uuu:bottom-0`} onClick={()=> navigate('/month-invoices')}>
       <h1 className={`text-xs uuu:text-sm font-bold ${(topBox && globalTheme == 'light') ? 'text-[#495057]' : 'text-white'}  dark:text-blue-500 group-hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer tracking-wider`}>דו"ח הכנסות חודשי</h1>
      </div>
      </div>
    </div>
  
  
    <div class={`${(topBox && globalTheme == 'light') ? 'bg-rose-400' : 'bg-white'} w-full dark:bg-gray-800 h-[170px] uuu:h-[185px] rounded-2xl shadow group`}>
      <div className='p-4'>
      <div className='flex justify-between items-center relative bottom-1 w-full'>
     
         <div
      class="inline-flex gap-2 self-end rounded px-1 py-[1px] relative bottom-1.5 text-emerald-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
  
      <span class="text-xs font-medium"> 44% </span>
    </div>
      <h3 className={`${(topBox && globalTheme == 'light') ? 'text-[#495057]' : 'text-gray-500'} text-2xl uuu:text-3xl dark:text-gray-300 font-mono font-semibold`}>הוצאות</h3>
       
      </div>
      <h2 className="text-[#495057] text-3xl uuu:text-4xl font-extrabold tracking-wide dark:text-[#ccc]"><span className='text-2xl'>₪</span>{monthlyTotalOutcomeToString}</h2>
  
      </div>
  
      <div className="flex flex-col relative bottom-1.5">
      <div className="flex items-center justify-between w-full relative bottom-3 uuu:bottom-1.5 px-2">
      <div className='flex items-center space-x-1'>
        <DateRangeOutlinedIcon fontSize='small' className='text-[#ccc] relative bottom-[1px]'/>
        <h1 className={`text-xs uppercase tracking-wide font-medium ${(topBox && globalTheme == 'light') ? 'text-gray-600 font-bold' : 'text-gray-500'} dark:text-neutral-300`}>{new Date().toLocaleDateString()}</h1>
       </div> 
       <div class="flex items-center cursor-pointer group" onClick={openOutcome}>
        
        <svg class={`h-6 w-6 text-green-500 group-hover:-translate-x-1 mr-1 leading-normal transition-all duration-200 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
       </svg>
      
       <BarChartIcon fontSize="large" className={`text-gray-400 relative bottom-1`}/>
     </div>
       </div>
       
         {isSSRE ? (
          <div className='w-full'>
          <LinearProgress />
          </div>
        ) : ( 
        <div class="w-[94%] bg-gray-200 rounded-full dark:bg-gray-700 mx-2 relative bottom-[18px] dark:bottom-2.5 uuu:bottom-2 dark:uuu:bottom-0">
         <div class={`bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`} style={{ width: `${outcomePercentage}%` }}>{isFinite(outcomePercentage) ? outcomePercentage : 0}%</div>
       </div>
        )}
         <h1 className='hidden dark:inline text-xs uuu:text-sm text-gray-500 text-center dark:text-[#ccc] group-hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer tracking-wide relative top-0 uuu:top-[5px] group-hover:text-blue-500 dark:group-hover:text-blue-500' onClick={()=> navigate('/month-invoices')}>דו"ח הוצאות חודשי</h1>
       <div className={`dark:hidden ${(topBox && globalTheme == 'light') ? 'blue-glassmorphism' : 'bg-red-500'} ${isSSRE && 'relative top-0.5 uuu:top-0'} flex items-center justify-center dark:bg-gray-900 shadow-md h-10 uuu:h-12 w-full rounded-b-2xl relative bottom-3.5 uuu:bottom-0`} onClick={()=> navigate('/month-invoices')}>
       <h1 className={`text-xs uuu:text-sm font-bold ${(topBox && globalTheme == 'light') ? 'text-[#495057]' : 'text-white'}  dark:text-blue-500 group-hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer tracking-wider`}>דו"ח הכנסות חודשי</h1>
      </div>
      </div>
    </div>
  
  
    <div class={`${(topBox && globalTheme == 'light') ? 'bg-amber-300' : 'bg-white'} w-full dark:bg-gray-800 h-[170px] uuu:h-[185px] rounded-2xl shadow group`}>
      <div className='p-4'>
      <div className="flex items-center justify-end relative bottom-1">
      <div className='flex justify-between items-center w-full'>
       
        <div class="inline-flex gap-2 self-end rounded px-1 py-[1px] relative bottom-1.5 text-red-600 dark:text-red-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
        />
      </svg>
  
      <span class="text-xs font-medium"> 67% </span>
    </div>
      <h3 className={`${(topBox && globalTheme == 'light') ? 'text-[#495057]' : 'text-gray-500'} text-2xl uuu:text-3xl dark:text-gray-300 font-mono font-semibold`}>סחורה</h3>
        </div>
  
      </div>
      <h2 className="text-[#495057] text-3xl uuu:text-4xl font-extrabold tracking-wide dark:text-[#ccc] "><span className='text-2xl'>₪</span>{monthlyWaresOutcomeToString}</h2>
  
      </div>
  
      <div className="flex flex-col relative bottom-1.5">
      <div className="flex items-center justify-between w-full relative bottom-3 uuu:bottom-1.5 px-2">
      <div className='flex items-center space-x-1'>
        <DateRangeOutlinedIcon fontSize='small' className='text-[#ccc] relative bottom-[1px]'/>
        <h1 className={`text-xs uppercase tracking-wide font-medium ${(topBox && globalTheme == 'light') ? 'text-gray-600 font-bold' : 'text-gray-500'} dark:text-neutral-300`}>{new Date().toLocaleDateString()}</h1>
       </div> 
       <div class="flex items-center cursor-pointer group" onClick={openWares}>
        
        <svg class={`h-6 w-6 text-green-500 group-hover:-translate-x-1 mr-1 leading-normal transition-all duration-200 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
       </svg>
      
       <BarChartIcon fontSize="large" className={`text-gray-400 relative bottom-1`}/>
     </div>
       </div>
       {isSSRE ? (
          <div className='w-full'>
          <LinearProgress />
          </div>
        ) : ( 
        <div class="w-[94%] bg-gray-200 rounded-full dark:bg-gray-700 mx-2 relative bottom-[18px] dark:bottom-2.5 uuu:bottom-2 dark:uuu:bottom-0">
         <div class={`bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`} style={{ width: `${waresPercentage}%` }}>{isFinite(waresPercentage) ? waresPercentage : 0}%</div>
       </div>
        )}
       
         <h1 className='hidden dark:inline text-xs uuu:text-sm text-gray-500 text-center dark:text-[#ccc] group-hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer tracking-wide relative top-0 uuu:top-[5px] group-hover:text-blue-500 dark:group-hover:text-blue-500' onClick={()=> navigate('/month-wares-invoices')}>דו"ח סחורה חודשי</h1>

       <div className={`dark:hidden ${(topBox && globalTheme == 'light') ? 'blue-glassmorphism' : 'bg-[#eab308]'} ${isSSRE && 'relative top-0.5 uuu:top-0'} flex items-center justify-center dark:bg-gray-900 shadow-md h-10 uuu:h-12 w-full rounded-b-2xl relative bottom-3.5 uuu:bottom-0`} onClick={()=> navigate('/month-wares-invoices')}>
       <h1 className={`text-xs uuu:text-sm font-bold ${(topBox && globalTheme == 'light') ? 'text-[#495057]' : 'text-white'}  dark:text-blue-500 group-hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer tracking-wider`}>דו"ח הכנסות חודשי</h1>
      </div>    
      </div>
    </div>
  
  
    <div class={`${(topBox && globalTheme == 'light') ? 'bg-emerald-500' : 'bg-white'} w-full dark:bg-gray-800 h-[170px] uuu:h-[185px] rounded-2xl shadow group`}>
      <div className='p-4'>
      <div className="flex items-center justify-end relative bottom-1">
      <div className='flex justify-between items-center w-full'>
       
         <div
      class="inline-flex gap-2 self-end rounded px-1 py-[1px] relative bottom-1.5 text-green-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
  
      <span class="text-xs font-medium"> 29% </span>
    </div>
    <div className='flex items-center justify-center space-x-1.5'>
      <div className="flex items-center justify-center space-x-1.5">
        <h3 className={`${(topBox && globalTheme == 'light') ? 'text-[#495057]' : 'text-gray-500'} text-2xl uuu:text-3xl dark:text-gray-300 font-mono font-semibold`}>הכנסות</h3>
      </div>
      <span class="relative p-4 bg-purple-200 dark:bg-gray-900 rounded-xl hidden dark:inline">
          <svg width="40" fill="currentColor" height="40" class="absolute h-4 text-purple-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z">
            </path>
          </svg>
        </span>
      </div>
      </div>
          
      </div>
      <h2 class="text-[#495057] text-3xl uuu:text-4xl font-extrabold tracking-wide dark:text-[#ccc]"><span className='text-2xl'>₪</span>{monthlyIncomeToString}</h2>
  
      </div>
  
      <div className="flex flex-col relative bottom-1.5">
      <div className="flex items-center justify-between w-full relative bottom-3 uuu:bottom-1.5 px-2">
      <div className='flex items-center space-x-1'>
        <DateRangeOutlinedIcon fontSize='small' className='text-[#ccc] relative bottom-[1px]'/>
        <h1 className={`text-xs uppercase tracking-wide font-medium ${(topBox && globalTheme == 'light') ? 'text-gray-600 font-bold' : 'text-gray-500'} dark:text-neutral-300`}>{new Date().toLocaleDateString()}</h1>
       </div> 
       <div class="flex items-center cursor-pointer group" onClick={openIncome}>
        
        <svg class={`h-6 w-6 text-green-500 group-hover:-translate-x-1 mr-1 leading-normal transition-all duration-200 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
       </svg>
      
       <BarChartIcon fontSize="large" className={`text-gray-400 relative bottom-1`}/>
     </div>
       </div>
       
         {isSSRE ? (
          <div className='w-full'>
          <LinearProgress />
          </div>
        ) : ( 
        <div class="w-[94%] bg-gray-200 rounded-full dark:bg-gray-700 mx-2 relative bottom-[18px] dark:bottom-2.5 uuu:bottom-2 dark:uuu:bottom-0">
         <div class={`bg-blue-600 text-xs w-[100%] font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}> 100%</div>
       </div>
        )}
         <h1 className='hidden dark:inline text-xs uuu:text-sm text-gray-500 text-center dark:text-[#ccc] group-hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer tracking-wide relative top-0 uuu:top-[5px] group-hover:text-blue-500 dark:group-hover:text-blue-500' onClick={()=> navigate('/month-daily-income')}>דו"ח הכנסות חודשי</h1>

       <div className={`dark:hidden ${(topBox && globalTheme == 'light') ? 'blue-glassmorphism' : 'bg-[#059669]'} ${isSSRE && 'relative top-0.5 uuu:top-0'} flex items-center justify-center dark:bg-gray-900 shadow-md h-10 uuu:h-12 w-full rounded-b-2xl relative bottom-3.5 uuu:bottom-0`} onClick={()=> navigate('/month-daily-income')}>
        <h1 className={`text-xs uuu:text-sm font-bold ${(topBox && globalTheme == 'light') ? 'text-[#495057]' : 'text-white'}  dark:text-blue-500 group-hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer tracking-wider`}>דו"ח הכנסות חודשי</h1>
      </div>
      </div>
    </div>
    </div>


      
      
    <div className={`grid grid-cols-3 gap-4 p-4 relative bottom-2 uuu:-bottom-1 dark:bottom-2`}>
      
  <div className={`flex flex-col items-center justify-between max-h-[480px] w-full bg-white dark:bg-gray-800 shadow rounded-2xl ${hebrew ? 'order-2' : 'order-1'} col-span-3 lg:col-span-1`}>
  
 {chartDots ? (
  <>
   <div className="flex flex-col space-y-1 w-full pt-[14px] px-2">
 {hebrew ? (
   <div className="flex items-center justify-between w-full px-1">
    <h1 className=" text-[#495057] font-sans font-bold text-right dark:text-gray-100">Monthly Chart</h1>
   
 </div>
 ) : (
  <div className="flex items-center justify-between w-full px-3.5">
    
<span class="hidden xxss:flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer relative top-2" onClick={()=> setChartDots(!chartDots)}>
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
</span>
<div className='flex items-center justify-center space-x-1'>
<div className='flex items-center justify-center space-x-1.5 relative right-1'>
    <h1 className='font-mono font-semibold text-xl text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
    <h1 className='font-mono text-lg text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
</div>
<h1 className=" text-[#495057] font-sans text-lg font-bold text-right tracking-wide dark:text-gray-100">טבלה חודשית</h1>
</div>
</div>
 )}
 {hebrew ? (
    <h1 className="flex justify-start font-extralight text-gray-500 text-xs relative bottom-1 left-1 dark:text-gray-50">Monthly income VS Outcome types</h1>

 ) : (
  <h1 className="flex justify-end font-extralight text-gray-500 text-sm tracking-wide relative bottom-2 right-3.5 dark:text-gray-50">.הכנסה חודשית מול סוגי ההוצאות</h1>

 )}
  <div className="w-[95.5%] bg-gray-200 relative top-0 left-[9px] dark:bg-gray-500 h-[0.5px] dark:hidden"/> 

  </div>
  <div className={`w-[92%] flex items-center justify-around mx-auto px-4 border-b border-b-gray-200 dark:bg-gray-900 dark:rounded-2xl dark:border-none relative bottom-4 lmt:bottom-[20.5px] dark:lmt:bottom-5 h-20 ${!chartDots && 'top-3'}`}>
  <div className="flex flex-col items-center justify-center -space-y-1">
      <div className='flex items-center justify-center space-x-1'>
        <h1 className='text-2xl font-extrabold text-[#495057] dark:text-[#ccc]'><span className='font-sans text-[15px] font-bold relative right-0.5'>₪</span>{monthlyTotalOutcomeToString}</h1>
        
        <AutorenewIcon fontSize='small' className='text-blue-500 animate-spin-fast'/>
      </div>
      <div className='flex items-center justify-center space-x-1'>
        <h1 className='text-gray-500 font-sans tracking-wide dark:text-gray-400'>הוצאות</h1>
        <div className='flex items-center justify-center'>
          <ArrowDropUpIcon className='text-green-500'/>
          <span class="text-green-400">54%</span>
        </div>
      </div>
      </div>
      <div className='h-8 w-[0.5px] bg-gray-300 dark:bg-gray-500'/>
      <div className="flex flex-col items-center justify-center -space-y-1">
      <div className='flex items-center justify-center space-x-1'>
        <h1 className='text-2xl font-extrabold text-[#495057] dark:text-[#ccc]'><span className='font-sans text-[15px] font-bold relative right-0.5'>₪</span>{monthlyIncomeToString}</h1>
        
        <AutorenewIcon fontSize='small' className='text-emerald-500 animate-spin-slow'/>
      </div>
      <div className='flex items-center justify-center space-x-1'>
        <h1 className='text-gray-500 font-sans tracking-wide dark:text-gray-400'>הכנסות</h1>
        <div className='flex items-center justify-center'>
          <ArrowDropUpIcon className='text-orange-400 rotate-180'/>
          <span class="text-orange-400">27%</span>
        </div>
      </div>
      </div>
  </div>
 
   <div className="hidden lmt:block relative mdf:bottom-7 ">
    <Chart options={state11.options} series={series8} type="donut" width={380}/>
  </div>
  <div className="block lmt:hidden relative bottom-5">
    <Chart options={state111.options} series={series8} type="donut" width={395}/>
  </div>
  </>
 ) : (
  <>
  
  </>
 )}
  
  </div>

  <div id="main" class={`bg-white dark:bg-gray-800 shadow rounded-2xl max-h-[480px] px-4 relative col-span-3 lg:col-span-2 pt-2 ${hebrew ? 'order-1' : 'order-2'} `}>
  
  {hebrew ? (
    <div className="w-full flex items-center justify-between px-2">
  
     <div className="flex items-center justify-center space-x-1.5 relative mr-2">
     
    {stateChart == 0 && (
      <h1 className="text-[#495057] font-bold dark:text-gray-100">Icome / Outcome Chart {incomeCurrentYear}</h1>
   
    )}
     {stateChart == 1 && (
     
      <h1 className="text-[#495057] font-bold dark:text-gray-100">Current Month In / Out Chart</h1>
    )}
     {stateChart == 2 && (
      <h1 className="text-[#495057] font-bold dark:text-gray-100">Icome / Commodity Chart {incomeCurrentYear}</h1>
   
    )}
      {label ? (
     <ToggleOffIcon className={`text-[#059669] hover:text-[#10b981] dark:text-gray-100 relative top-1 cursor-pointer`} onClick={()=> setLabel(!label)}/>
   ) : (
     <ToggleOnIcon className={`text-[#059669] hover:text-[#10b981] dark:text-gray-100 relative top-1 cursor-pointer`} onClick={()=> setLabel(!label)}/>
   )}
     </div>
     <div class="flex gap-2 relative top-2">
                    <span class="flex items-center justify-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 text-blue-400 cursor-pointer rounded-full" onClick={generatePdfMainChart}>
                    {spin ? (
                      <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                    ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      )}
                    </span>
                    <span class="hidden xxss:flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setChart(!chart)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setLabel(!label)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                    </span>
                </div>
    </div>
  ) : (

<></>
  )}
 {hebrew ? (
  <div className="relative md:bottom-2">
  <h1 className="flex justify-start font-extralight text-gray-500 text-xs relative left-2 dark:text-white">you can switch between chart types using the buttons.</h1>
  <h1 className="flex justify-start font-extralight text-gray-500 text-xs relative left-2 dark:text-white">the chart will update automatically when you enter new information.</h1>
 </div>
 ) : (
  <>
 
  <div className="relative bottom-2 block xrc:hidden">
  <h1 className="hidden etc:flex justify-end font-extralight text-gray-500 text-xs relative right-1.5 bottom-2 dark:text-white">.הטבלה משתנה בהתאם לנתונים</h1>
  <h1 className="flex etc:hidden justify-end font-extralight text-gray-500 text-xs relative right-2.5 font-mono bottom-1.5 dark:text-white">{incomeCurrentYear}</h1>

  </div>
  </>
 )}
 {/* <div className="h-[1.5px] w-full bg-[#E8E8E8] dark:bg-gray-500 relative bottom-1.5"/>  */}
  {(stateChart == 0 || stateChart == 1 || stateChart == 2 || stateChart == 3 || stateChart == 4) && (
    <>
        <div className="flex flex-col col-span-full xl:col-span-8 bg-white dark:bg-gray-800 dark:rounded-2xl ">
    <header className={`${hebrew && 'hidden'} px-2 py-2 border-b-[1px] border-gray-200 dark:border-gray-400 dark:bg-gray-800 dark:rounded-2xl dark:border-none flex items-center justify-between`}>
            
              <div className="flex gap-2 relative bottom-0.5">
                    <span class="flex items-center justify-center transition ease-out group relative duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 text-blue-400 cursor-pointer rounded-full" onClick={generatePdfMainChart}>
                    {spin ? (
                      <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                    ) : (
                      <>
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      <span class="group-hover:opacity-100 transition-opacity bg-gray-700 dark:bg-gray-900 px-1 text-sm z-50 text-gray-100 rounded-md absolute left-1/2 
                      -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">הדפס</span>
                      </>
                      )}
                    </span>
                    <span className="hidden xxss:flex items-center transition ease-out group duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={handleCharts}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span class="group-hover:opacity-100 transition-opacity bg-gray-700 dark:bg-gray-900 px-1 z-50 text-sm text-gray-100 rounded-md absolute left-1/2 
                            -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto w-fit">החלף-טבלה</span>
                        </span>
                    <span className="flex items-center transition ease-out group relative duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setLabel(!label)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                        <span class="group-hover:opacity-100 transition-opacity bg-gray-700 dark:bg-gray-900 px-1 z-50 text-sm text-gray-100 rounded-md absolute left-1/2 
                            -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">סכומים</span>
                        </span>
                </div>
              <div className='flex flex-col relative bottom-0.5'>
              <div className='flex items-center justify-center space-x-1.5 relative '>
    
        <div className='flex flex-col items-end justify-center'>
          <div className='flex items-center justify-center spae-x-2'>
         
     <button className="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 relative right-0.5 top-[0.3px]">
        <div onMouseOver={() => setTooltipStatus(1)} onMouseOut={() => setTooltipStatus(0)}>
        <InformationCircleIcon 
        strokeWidth={2} 
        className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
      />
        </div>
      {tooltipStatus == 1 && (
                        <div role="tooltip" className="z-50 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow bg-white p-4 rounded">
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
        {stateChart == 0 && <h1 className="text-[#495057] text-right font-bold dark:text-gray-100 text-lg tracking-wide relative left-4.5">טבלת הכנסות הוצאות <span className='hidden mmp:inline font-mono relative top-[0.3px]'>{incomeCurrentYear}</span></h1>}
        {stateChart == 1 && <h1 className="text-[#495057] text-right font-bold dark:text-gray-100 text-lg tracking-wide relative left-4.5">טבלת הכנסות סחורה <span className='hidden mmp:inline font-mono relative top-[0.3px]'>{incomeCurrentYear}</span></h1>}
        {stateChart == 2 && <h1 className="text-[#495057] text-right font-bold dark:text-gray-100 text-lg tracking-wide relative left-4.5">טבלת הכנסות משכורות <span className='hidden mmp:inline font-mono relative top-[0.3px]'>{incomeCurrentYear}</span></h1>}
        {stateChart == 3 && <h1 className="text-[#495057] text-right font-bold dark:text-gray-100 text-lg tracking-wide relative left-4.5">טבלת הכנסות הוצ' קבועות <span className='hidden mmp:inline font-mono relative top-[0.3px]'>{incomeCurrentYear}</span></h1>}
        {stateChart == 4 && <h1 className="text-[#495057] text-right font-bold dark:text-gray-100 text-lg tracking-wide relative left-4.5">טבלת הכנסות הוצ' משתנות <span className='hidden mmp:inline font-mono relative top-[0.3px]'>{incomeCurrentYear}</span></h1>}

          </div>
          <h1 className="hidden xru:flex justify-end font-extralight text-gray-500 text-sm relative right-0.5 bottom-0.5 dark:text-white">.הטבלה משתנה בהתאם לחומר שהוזן למערכת</h1>
        </div>

              </div>
              </div>
            </header>
            <div class="px-5 py-1 dark:bg-gray-900 dark:rounded-2xl border-b border-b-gray-200 dark:border-none">
                <div class="flex items-center justify-center">
                    {/* <!-- Unique Visitors --> */}
                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center">
                                <div class="text-3xl font-bold text-[#495057] dark:text-[#ccc] mr-2 text-center">{isFinite((totalIncome + totalReceipt) - (totalWares + totalPermanent + totalChangeable + totalSal + yearlyVat)) ? Number(Math.trunc(((totalIncome + totalReceipt) - (totalWares + totalPermanent + totalChangeable + totalSal + yearlyVat)))).toLocaleString() : <AutorenewIcon className="animate-spin text-blue-600" />}</div>
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 text-center">מאזן שנתי <span className="text-sm font-medium text-green-500">+49%</span></div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>
                    {/* <!-- Total Pageviews --> */}
                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center">
                                {stateChart == 0 && <div class="text-3xl font-bold text-[#495057] dark:text-[#ccc] mr-2">{isFinite(totalWares + totalPermanent + totalChangeable + totalSal) ? Number(Math.trunc((totalWares + totalPermanent + totalChangeable + totalSal))).toLocaleString() : <AutorenewIcon className="animate-spin text-blue-600" />}</div>}
                                {stateChart == 1 && <div class="text-3xl font-bold text-[#495057] dark:text-[#ccc] mr-2">{isFinite(totalWares) ? Number(Math.trunc((totalWares))).toLocaleString() : <AutorenewIcon className="animate-spin text-blue-600" />}</div>}
                                {stateChart == 2 && <div class="text-3xl font-bold text-[#495057] dark:text-[#ccc] mr-2">{isFinite(totalSal) ? Number(Math.trunc((totalSal))).toLocaleString() : <AutorenewIcon className="animate-spin text-blue-600" />}</div>}
                                {stateChart == 3 && <div class="text-3xl font-bold text-[#495057] dark:text-[#ccc] mr-2">{isFinite(totalPermanent) ? Number(Math.trunc((totalPermanent))).toLocaleString() : <AutorenewIcon className="animate-spin text-blue-600" />}</div>}
                                {stateChart == 4 && <div class="text-3xl font-bold text-[#495057] dark:text-[#ccc] mr-2">{isFinite(totalChangeable) ? Number(Math.trunc((totalChangeable))).toLocaleString() : <AutorenewIcon className="animate-spin text-blue-600" />}</div>}

                            </div>
                            {stateChart == 0 && <div class="text-sm text-gray-500 dark:text-gray-400 text-center">הוצאה שנתית <span className="text-sm font-medium text-green-500">+17%</span></div>}
                            {stateChart == 1 && <div class="text-sm text-gray-500 dark:text-gray-400 text-center">סחורה שנתי <span className="text-sm font-medium text-green-500">+17%</span></div>}
                            {stateChart == 2 && <div class="text-sm text-gray-500 dark:text-gray-400 text-center">משכורות שנתי <span className="text-sm font-medium text-green-500">+17%</span></div>}
                            {stateChart == 3 && <div class="text-sm text-gray-500 dark:text-gray-400 text-center">קבועות שנתי <span className="text-sm font-medium text-green-500">+17%</span></div>}
                            {stateChart == 4 && <div class="text-sm text-gray-500 dark:text-gray-400 text-center">משתנות שנתי <span className="text-sm font-medium text-green-500">+17%</span></div>}

                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>
                    {/* <!-- Bounce Rate --> */}
                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center">
                                <div class="text-3xl font-bold text-[#495057] dark:text-[#ccc] text-center mr-2">{isFinite(totalIncome + totalReceipt) ? Number(Math.trunc((totalIncome + totalReceipt))).toLocaleString() : <AutorenewIcon className="animate-spin text-blue-600" />}</div>
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 text-center">הכנסה שנתית <span className="text-sm font-medium text-yellow-500">-8%</span></div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>
                    {/* <!-- Visit Duration--> */}
                    <div class="flex items-center">
                        <div>
                            <div class="flex items-center justify-center space-x-1">
                                <div class="text-3xl font-bold text-[#495057] dark:text-[#ccc] mr-2">{isFinite(yearlyVat) ? Number(yearlyVat).toLocaleString() : <AutorenewIcon className="animate-spin text-blue-600" />}</div>
                               
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 relative left-1.5">מע"מ שנתי</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </>
  )}
  
 
  {/* <div className="h-[1.5px] w-full bg-[#E8E8E8] "/>  */}
{stateChart == 0 && (
      <div className='relative top-2'>
        {/* <Chart options={state22.options} series={series2} type="area" height={chartDots ? 310 : 485}/> */}
        <Chart options={state22.options} series={series2} type="area" height={chartDots ? 310 : 265}/>
      </div>
    )}
    {stateChart == 1 && (
        <Chart options={state22.options} series={series222} type="area" height={chartDots ? 310 : 265}/>

    )}
    {stateChart == 2 && (
        <Chart options={state22.options} series={series223} type="area" height={chartDots ? 310 : 265}/>

    )}


{stateChart == 3 && (
   <Chart options={state22.options} series={series224} type="area" height={chartDots ? 310 : 265}/>
    )}
    {stateChart == 4 && (
   <Chart options={state22.options} series={series225} type="area" height={chartDots ? 310 : 265}/>
    )}
 
  </div>
</div>

    

{hebrew ? (
  <div class={`${chart2 && 'bg-white shadow'} dark:bg-gray-800 grid grid-col-1 h-72 px-4 rounded-xl ml-4 mr-4 my-3`}>
  <div class="flex justify-between items-center w-full px-4 pt-2">
  <h1 className='text-gray-500 dark:text-[#ccc]'>
    Portfolio Performance
  </h1>
  <div className="flex items-center justify-center space-x-2">
    <SettingsBrightnessOutlinedIcon className="text-gray-400 dark:text-[#ccc] cursor-pointer hover:text-[#ccc]" onClick={()=> setChart2(!chart2)}/>
    <SettingsBrightnessOutlinedIcon className="text-gray-400 dark:text-[#ccc] cursor-pointer hover:text-[#ccc]" onClick={()=> setDashMode(!dashMode)}/>
  </div>
  </div>
  
  <div className="w-full h-[0.5px] bg-gray-300 relative top-1"/>
  
  <div class="flex w-full justify-between items-center px-4">
  
  
  <div className='flex items-center justify-center space-x-3'>
    {/* <div className='bg-red-400 h-14 w-14 rounded-full'>
    </div> */}
    {(dashMode && globalTheme == "light") ? (
  <>
  {!(isFinite(golmiProfit?.toFixed(2) * 100)) ? (
                  <div className="w-12 h-12 border-8 border-dashed rounded-full animate-spin border-blue-600" />
                ) : (
                  <div className="w-[75px] h-[75px]">
                  
                  <CircularProgressbarWithChildren
        value={isFinite(golmiProfit?.toFixed(2) * 100) ? golmiProfit?.toFixed(2) * 100 : 0}
        text={`${isFinite(Math.round(golmiProfit?.toFixed(2) * 100)) ? Math.round(golmiProfit?.toFixed(2) * 100) : 0}%`}
        strokeWidth={14}
        styles={buildStyles({
          strokeLinecap: "butt"
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: "#fff",
            width: "2px",
            // This needs to be equal to props.strokeWidth
            height: `${14}%`
          }}
        />
      </CircularProgressbarWithChildren>
                </div>
                )}
  </>
) : (
  <div className="w-[75px] h-[75px]">
  <CircularProgressbar
value={isFinite(golmiProfit?.toFixed(2) * 100) ? golmiProfit?.toFixed(2) * 100 : 0}
text={`${isFinite(Math.round(golmiProfit?.toFixed(2) * 100)) ? Math.round(golmiProfit?.toFixed(2) * 100) : 0}%`}
background
backgroundPadding={6}
styles={buildStyles({
backgroundColor: "#3e98c7",
textColor: "#fff",
pathColor: "#fff",
trailColor: "transparent"
})}
/>

</div>
)}
  <div class="flex flex-col space-y-2">
  <div class="text-gray-400 text-sm">Gross Profit</div>
  <div class="text-[#495057] dark:text-[#ccc] text-5xl font-extrabold">{`${isFinite(Math.round(golmiProfit?.toFixed(2) * 100)) ? Math.round(golmiProfit?.toFixed(2) * 100) : 0}%`}</div>
  <div class="widget-description opacity-8 text-focus">
  <div class="flex items-center justify-center space-x-2">
  <span class="pl-1 text-red-400">54.1%</span>
  <h1 className='text-gray-500 dark:text-gray-100'>less earnings</h1>
  </div>
  </div>
  </div>
  </div>
  
  <div className='flex items-center justify-center space-x-3'>
    {/* <div className='bg-orange-400 h-14 w-14 rounded-full'>
    </div> */}
    {(dashMode && globalTheme == "light") ? (
  <>
  {!(isFinite(tifuliProfit?.toFixed(2) * 100)) ? (
                  <div className="w-12 h-12 border-8 border-dashed rounded-full animate-spin border-blue-600" />
                ) : (
                  <div className="w-[75px] h-[75px]">
                 
                  <CircularProgressbarWithChildren
        value={isFinite(tifuliProfit?.toFixed(2) * 100) ? tifuliProfit?.toFixed(2) * 100 : 0}
        text={`${isFinite(Math.round(tifuliProfit?.toFixed(2) * 100)) ? Math.round(tifuliProfit?.toFixed(2) * 100) : 0}%`}
        strokeWidth={14}
        styles={buildStyles({
          strokeLinecap: "butt",
          // pathColor: "#3b82f6",
          trailColor: "#ccc",
          // textColor: "red"
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: "#fff",
            width: "2px",
            // This needs to be equal to props.strokeWidth
            height: `${14}%`
          }}
        />
      </CircularProgressbarWithChildren>
                </div>
                 )}
  </>
) : (
  <div className="w-[75px] h-[75px]">
  <CircularProgressbar
 value={isFinite(tifuliProfit?.toFixed(2) * 100) ? tifuliProfit?.toFixed(2) * 100 : 0}
 text={`${isFinite(Math.round(tifuliProfit?.toFixed(2) * 100)) ? Math.round(tifuliProfit?.toFixed(2) * 100) : 0}%`}
background
backgroundPadding={6}
styles={buildStyles({
backgroundColor: "#3e98c7",
textColor: "#fff",
pathColor: "#fff",
trailColor: "transparent"
})}
/>

</div>
)}
    <div class="flex flex-col space-y-2">
  <div class="text-gray-400 text-sm">Operating Profit</div>
  <div class="text-[#495057] dark:text-[#ccc] text-5xl font-extrabold">{`${isFinite(Math.round(tifuliProfit?.toFixed(2) * 100)) ? Math.round(tifuliProfit?.toFixed(2) * 100) : 0}%`}</div>
  <div class="widget-description opacity-8 text-focus">
  <div class="flex items-center justify-center">
  <h1 className='text-gray-500 dark:text-gray-100'>Grow Rate:</h1>
  <ArrowDropUpIcon className='text-green-500'/>
  <span class="text-green-400">54.1%</span>
  </div>
  </div>
  </div>
    </div>
  
  
    <div className='flex items-center justify-center space-x-3'>
    <div className={`bg-red-400 shadow-xl p-1.5 rounded-full flex items-center justify-center border-8 border-dashed dark:border-gray-800 dark:shadow animate-spin-slow`}>
  <MonetizationOnIcon fontSize='large' className='text-white'/>
  </div>
    <div class="flex flex-col space-y-2">
  <div class="text-gray-400 text-sm">Vat to pay</div>
  <div class="text-[#495057] dark:text-[#ccc] text-5xl font-extrabold text-left">₪{isFinite(vat) ? Number(Math.round(vat)).toLocaleString() : <div className="w-12 h-12 border-8 border-dashed rounded-full animate-spin border-blue-600" />}</div>
  <div class="widget-description opacity-8 text-focus">
  <div class="flex items-center justify-center">
  <h1 className='text-gray-500 dark:text-gray-100'>Increased by:</h1>
  <ArrowDropUpIcon className='text-orange-400 rotate-180'/>
  <span class="text-orange-400">54.1%</span>
  </div>
  </div>
  </div>
    </div>
  
  </div>
  
  <div className="w-full h-[0.5px] bg-gray-300 relative top-3"/>
  
  <div class='flex items-center justify-center relative top-1'>
  <button type='button'
      class='flex break-inside bg-[#2ea44f] hover:bg-green-500 text-white border-2 border-transparent rounded-3xl px-6 py-1 mb-4 w-[280px]' onClick={()=> navigate('/yearly-reports')}>
      <div class='m-auto'>
        <div class='flex items-center justify-start flex-1 space-x-4'>
          
          <AssessmentOutlinedIcon className="text-white"/>
          <span class='font-medium tracking-wide'>Full Reports</span>
        </div>
      </div>
</button>
  </div>
  
  </div>
) : (
 <>
  <div class={`${chart2 && 'bg-white shadow'} hidden dark:bg-gray-800 md:grid grid-col-1 h-72 px-4 rounded-xl ml-4 mr-4 my-3 relative -bottom-1 dark:bottom-0.5`}>
<div class="flex justify-between items-center w-full px-4 pt-2">
  <div className="flex items-center justify-center space-x-2">
    {/* <SettingsBrightnessOutlinedIcon className="hidden text-gray-400 dark:text-[#ccc] cursor-pointer hover:text-[#ccc]" onClick={()=> setChart2(!chart2)}/> */}
    <SettingsBrightnessOutlinedIcon className="text-gray-400 dark:text-[#ccc] cursor-pointer hover:text-[#ccc]" onClick={()=> setDashMode(!dashMode)}/>
  </div>

  <div className='flex items-center justify-center space-x-1'>
  <button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 relative top-0.5">
        <div onMouseOver={() => setTooltipStatus(1)} onMouseOut={() => setTooltipStatus(0)}>
        <InformationCircleIcon 
        strokeWidth={2} 
        className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
      />
        </div>
      {tooltipStatus == 6 && (
                        <div role="tooltip" className="z-50 w-64 absolute transition duration-150 ease-in-out right-2 mr-2 shadow bg-white p-4 rounded">
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
<h1 className='text-gray-500 text-lg tracking-wide font-mono dark:text-[#ccc]'>
  תוצאות חודשיות 
</h1>
  </div>
</div>

<div className="w-full h-[0.5px] bg-gray-300 dark:bg-gray-500 relative top-1"/>

<div class="flex w-full justify-between items-center px-4">


<div className='flex items-center justify-center space-x-3'>
<div class="flex flex-col space-y-2">
<div class="text-gray-400 text-lg text-right">מע"מ לתשלום</div>
<div class="text-[#495057] dark:text-[#ccc] text-5xl font-extrabold text-right">₪{isFinite(vat) ? Number(Math.round(vat)).toLocaleString() : <span className="w-12 h-12 border-8 border-dashed rounded-full animate-spin border-blue-600" />}</div>
<div class="widget-description opacity-8 text-focus">
<div class="flex items-center justify-center space-x-2">
<span class="pl-1 text-red-400">54.1%</span>
<h1 className='text-gray-500 dark:text-gray-100'>less earnings</h1>
</div>
</div>
</div>
<div className={`bg-red-400 shadow-xl p-1.5 rounded-full flex items-center justify-center border-8 border-dashed dark:border-gray-800 dark:shadow animate-spin-slow`}>
  <MonetizationOnIcon fontSize='large' className='text-white'/>
</div>
</div>

<div className='flex items-center justify-center space-x-3'>
  
  <div class="flex flex-col space-y-2">
<div class="text-gray-400 text-right text-lg">רווח תפעולי</div>
<div class="text-[#495057] dark:text-[#ccc] text-5xl font-extrabold text-right">{`${isFinite(Math.round(tifuliProfit?.toFixed(2) * 100)) ? Math.round(tifuliProfit?.toFixed(2) * 100) : 0}%`}</div>
<div class="widget-description opacity-8 text-focus">
<div class="flex items-center justify-center space-x-1">
<h1 className='text-gray-500 dark:text-gray-100'>Grow Rate:</h1>
<div className='flex items-center justify-center -space-x-1.5'>
<ArrowDropUpIcon className='text-green-500'/>
<span class="pl-1 text-green-400">54.1%</span>
</div>
</div>
</div>
</div>
{(!dashMode && globalTheme == "light") ? (
  <>
  {!(isFinite(tifuliProfit?.toFixed(2) * 100)) ? (
                  // <div className="w-12 h-12 border-8 border-dashed rounded-full animate-spin border-blue-600" />
                  <AutorenewIcon fontSize='large' className='text-blue-500 animate-spin'/>
                ) : (
                  <div className="w-[75px] h-[75px]">
                 
                  <CircularProgressbarWithChildren
        value={isFinite(tifuliProfit?.toFixed(2) * 100) ? tifuliProfit?.toFixed(2) * 100 : 0}
        text={`${isFinite(Math.round(tifuliProfit?.toFixed(2) * 100)) ? Math.round(tifuliProfit?.toFixed(2) * 100) : 0}%`}
        strokeWidth={14}
        styles={buildStyles({
          strokeLinecap: "butt",
          // pathColor: "#3b82f6",
          trailColor: "#ccc",
          // textColor: "red"
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: "#fff",
            width: "2px",
            // This needs to be equal to props.strokeWidth
            height: `${14}%`
          }}
        />
      </CircularProgressbarWithChildren>
                </div>
                 )}
  </>
) : (
  <div className="w-[75px] h-[75px]">
  <CircularProgressbar
 value={isFinite(tifuliProfit?.toFixed(2) * 100) ? tifuliProfit?.toFixed(2) * 100 : 0}
 text={`${isFinite(Math.round(tifuliProfit?.toFixed(2) * 100)) ? Math.round(tifuliProfit?.toFixed(2) * 100) : 0}%`}
background
backgroundPadding={6}
styles={buildStyles({
backgroundColor: "#3e98c7",
textColor: "#fff",
pathColor: "#fff",
trailColor: "transparent"
})}
/>

</div>
)}
                
  </div>


  <div className='flex items-center justify-center space-x-3'>
  
  <div class="flex flex-col space-y-2">
<div class="text-gray-400 tracking-wide text-right text-lg">רווח גולמי</div>
<div class="text-[#495057] dark:text-[#ccc] text-5xl font-extrabold text-right">{`${isFinite(Math.round(golmiProfit?.toFixed(2) * 100)) ? Math.round(golmiProfit?.toFixed(2) * 100) : 0}%`}</div>
<div class="widget-description opacity-8 text-focus">
<div class="flex items-center justify-center space-x-1">
<h1 className='text-gray-500 dark:text-gray-100'>Increased by:</h1>
<div className='flex items-center justify-center -space-x-1.5'>
<ArrowDropUpIcon className='text-orange-400 rotate-180'/>
<span class="pl-1 text-orange-400">54.1%</span>
</div>
</div>
</div>
</div>
{(!dashMode && globalTheme == "light") ? (
  <>
  {!(isFinite(golmiProfit?.toFixed(2) * 100)) ? (
                  // <div className="w-12 h-12 border-8 border-dashed rounded-full animate-spin border-blue-600" />
                  <AutorenewIcon fontSize='large' className='text-blue-500 animate-spin'/>
                ) : (
                  <div className="w-[75px] h-[75px]">
                  
                  <CircularProgressbarWithChildren
        value={isFinite(golmiProfit?.toFixed(2) * 100) ? golmiProfit?.toFixed(2) * 100 : 0}
        text={`${isFinite(Math.round(golmiProfit?.toFixed(2) * 100)) ? Math.round(golmiProfit?.toFixed(2) * 100) : 0}%`}
        strokeWidth={14}
        styles={buildStyles({
          strokeLinecap: "butt"
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: "#fff",
            width: "2px",
            // This needs to be equal to props.strokeWidth
            height: `${14}%`
          }}
        />
      </CircularProgressbarWithChildren>
                </div>
                )}
  </>
) : (
  <div className="w-[75px] h-[75px]">
  <CircularProgressbar
value={isFinite(golmiProfit?.toFixed(2) * 100) ? golmiProfit?.toFixed(2) * 100 : 0}
text={`${isFinite(Math.round(golmiProfit?.toFixed(2) * 100)) ? Math.round(golmiProfit?.toFixed(2) * 100) : 0}%`}
background
backgroundPadding={6}
styles={buildStyles({
backgroundColor: "#3e98c7",
textColor: "#fff",
pathColor: "#fff",
trailColor: "transparent"
})}
/>

</div>
)}
  </div>

</div>

<div className="w-full h-[0.5px] bg-gray-300 dark:bg-gray-500 relative top-3"/>

<div class='flex items-center justify-center relative top-1'>
<button type='button'
      class='flex break-inside bg-[#2ea44f] hover:bg-green-500 text-white border-2 border-transparent rounded-3xl px-6 py-1 mb-4 w-[280px]' onClick={()=> navigate('/yearly-reports')}>
      <div class='m-auto'>
        <div class='flex items-center justify-start flex-1 space-x-4'>
          
          <AssessmentOutlinedIcon className="text-white"/>
          <span class='font-medium tracking-wide'>דו"חות מלאים</span>
        </div>
      </div>
</button>
</div>

</div>


<div class={`${chart2 && 'bg-white shadow'} dark:bg-gray-800 grid grid-col-1 md:hidden h-fit py-4 px-4 rounded-xl ml-4 mr-4 my-3`}>
<div class="flex justify-between items-center w-full px-4 pt-2 relative bottom-2">
  <div className="flex items-center justify-center space-x-2">
    <SettingsBrightnessOutlinedIcon className="text-gray-400 dark:text-[#ccc] cursor-pointer hover:text-[#ccc]" onClick={()=> setChart2(!chart2)}/>
    <SettingsBrightnessOutlinedIcon className="text-gray-400 dark:text-[#ccc] cursor-pointer hover:text-[#ccc]" onClick={()=> setDashMode(!dashMode)}/>
  </div>

<h1 className='text-gray-500 text-lg tracking-wide font-mono dark:text-[#ccc]'>
  תוצאות חודשיות 
</h1>
</div>

<div className="w-full h-[0.5px] bg-gray-300 relative bottom-1"/>

<div class="flex-col w-full justify-between space-y-2 items-center px-4">


<div className='flex items-center justify-center space-x-3'>
<div class="flex flex-col space-y-2">
<div class="text-gray-400 text-lg text-right">מע"מ לתשלום</div>
<div class="text-[#495057] dark:text-[#ccc] text-5xl font-extrabold text-right">₪{isFinite(vat) ? Number(Math.round(vat)).toLocaleString() : <span className="w-12 h-12 border-8 border-dashed rounded-full animate-spin border-blue-600" />}</div>
<div class="widget-description opacity-8 text-focus">
<div class="flex items-center justify-center space-x-2">
<span class="pl-1 text-red-400">54.1%</span>
<h1 className='text-gray-500 dark:text-gray-100'>less earnings</h1>
</div>
</div>
</div>
<div className={`bg-red-400 shadow-xl p-1.5 rounded-full flex items-center justify-center border-8 border-dashed dark:border-gray-800 dark:shadow animate-spin-slow`}>
  <MonetizationOnIcon fontSize='large' className='text-white'/>
  </div>
</div>

<div className='flex items-center justify-center space-x-3'>
  
  <div class="flex flex-col space-y-2">
<div class="text-gray-400 text-right text-lg">רווח תפעולי</div>
<div class="text-[#495057] dark:text-[#ccc] text-5xl font-extrabold text-right">{`${isFinite(Math.round(tifuliProfit?.toFixed(2) * 100)) ? Math.round(tifuliProfit?.toFixed(2) * 100) : 0}%`}</div>
<div class="widget-description opacity-8 text-focus">
<div class="flex items-center justify-center space-x-1">
<h1 className='text-gray-500 dark:text-gray-100'>Grow Rate:</h1>
<div className='flex items-center justify-center -space-x-1.5'>
<ArrowDropUpIcon className='text-green-500'/>
<span class="pl-1 text-green-400">54.1%</span>
</div>
</div>
</div>
</div>
{(dashMode && globalTheme == "light") ? (
  <>
  {!(isFinite(tifuliProfit?.toFixed(2) * 100)) ? (
                  <div className="w-12 h-12 border-8 border-dashed rounded-full animate-spin border-blue-600" />
                ) : (
                  <div className="w-[75px] h-[75px]">
                 
                  <CircularProgressbarWithChildren
        value={isFinite(tifuliProfit?.toFixed(2) * 100) ? tifuliProfit?.toFixed(2) * 100 : 0}
        text={`${isFinite(Math.round(tifuliProfit?.toFixed(2) * 100)) ? Math.round(tifuliProfit?.toFixed(2) * 100) : 0}%`}
        strokeWidth={14}
        styles={buildStyles({
          strokeLinecap: "butt",
          // pathColor: "#3b82f6",
          trailColor: "#ccc",
          // textColor: "red"
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: "#fff",
            width: "2px",
            // This needs to be equal to props.strokeWidth
            height: `${14}%`
          }}
        />
      </CircularProgressbarWithChildren>
                </div>
                 )}
  </>
) : (
  <div className="w-[75px] h-[75px]">
  <CircularProgressbar
 value={isFinite(tifuliProfit?.toFixed(2) * 100) ? tifuliProfit?.toFixed(2) * 100 : 0}
 text={`${isFinite(Math.round(tifuliProfit?.toFixed(2) * 100)) ? Math.round(tifuliProfit?.toFixed(2) * 100) : 0}%`}
background
backgroundPadding={6}
styles={buildStyles({
backgroundColor: "#3e98c7",
textColor: "#fff",
pathColor: "#fff",
trailColor: "transparent"
})}
/>

</div>
)}
                
  </div>


  <div className='flex items-center justify-center space-x-3'>
  
  <div class="flex flex-col space-y-2">
<div class="text-gray-400 tracking-wide text-right text-lg">רווח גולמי</div>
<div class="text-[#495057] dark:text-[#ccc] text-5xl font-extrabold text-right">{`${isFinite(Math.round(golmiProfit?.toFixed(2) * 100)) ? Math.round(golmiProfit?.toFixed(2) * 100) : 0}%`}</div>
<div class="widget-description opacity-8 text-focus">
<div class="flex items-center justify-center space-x-1">
<h1 className='text-gray-500 dark:text-gray-100'>Increased -:</h1>
<div className='flex items-center justify-center -space-x-1.5'>
<ArrowDropUpIcon className='text-orange-400 rotate-180'/>
<span class="pl-1 text-orange-400">54.1%</span>
</div>
</div>
</div>
</div>
{(dashMode && globalTheme == "light") ? (
  <>
  {!(isFinite(golmiProfit?.toFixed(2) * 100)) ? (
                  <div className="w-12 h-12 border-8 border-dashed rounded-full animate-spin border-blue-600" />
                ) : (
                  <div className="w-[75px] h-[75px]">
                  
                  <CircularProgressbarWithChildren
        value={isFinite(golmiProfit?.toFixed(2) * 100) ? golmiProfit?.toFixed(2) * 100 : 0}
        text={`${isFinite(Math.round(golmiProfit?.toFixed(2) * 100)) ? Math.round(golmiProfit?.toFixed(2) * 100) : 0}%`}
        strokeWidth={14}
        styles={buildStyles({
          strokeLinecap: "butt"
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: "#fff",
            width: "2px",
            // This needs to be equal to props.strokeWidth
            height: `${14}%`
          }}
        />
      </CircularProgressbarWithChildren>
                </div>
                )}
  </>
) : (
  <div className="w-[75px] h-[75px]">
  <CircularProgressbar
value={isFinite(golmiProfit?.toFixed(2) * 100) ? golmiProfit?.toFixed(2) * 100 : 0}
text={`${isFinite(Math.round(golmiProfit?.toFixed(2) * 100)) ? Math.round(golmiProfit?.toFixed(2) * 100) : 0}%`}
background
backgroundPadding={6}
styles={buildStyles({
backgroundColor: "#3e98c7",
textColor: "#fff",
pathColor: "#fff",
trailColor: "transparent"
})}
/>

</div>
)}
  </div>

</div>

<div className="w-full h-[0.5px] bg-gray-300 relative top-3"/>

<div class='flex items-center justify-center relative top-5'>
<button type='button'
      class='flex break-inside bg-[#2ea44f] hover:bg-green-500 text-white border-2 border-transparent rounded-3xl px-6 py-1 mb-4 w-[280px]' onClick={()=> navigate('/yearly-reports')}>
      <div class='m-auto'>
        <div class='flex items-center justify-start flex-1 space-x-4'>
          
          <AssessmentOutlinedIcon className="text-white"/>
          <span class='font-medium tracking-wide'>דו"חות מלאים</span>
        </div>
      </div>
</button>
</div>

</div>
 </>
)}


<div className={`grid grid-cols-3 gap-8 mdx:gap-4 mr-4 ml-4 mt-8 mb-6`}>
      <div id='week' className="col-span-3 mdx:col-span-2 rounded-2xl shadow bg-white dark:bg-gray-800 h-[400px] p-4">
      {hebrew ? (
        <header class="px-2 py-4 flex items-center justify-between dark:bg-gray-800 relative bottom-4">
          <div className='flex flex-col items-start justify-center'>
        <div className='flex items-center justify-center space-x-2'>
        
        <h2 className="font-semibold text-[#495057] tracking-wider text-lg dark:text-[#ccc]">Avrage income by day of the week</h2>
        <div className='flex items-center justify-center space-x-2'>
          <h1 className='font-mono font-semibold text-xl text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
          {/* <h1 className='font-mono text-lg text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1>  */}
        </div>
        </div>
        <h1 className="text-gray-500 tracking-wider dark:text-[#ccc] text-sm">.הטבלה משתנה בהתאם לחומר שהוזן למערכת</h1>
        </div>
        <div class="flex gap-2">
                <span class="flex items-center justify-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 text-blue-400 cursor-pointer rounded-full" onClick={generatePdfDayOfWeek}>
                {spin ? (
                  <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                ) : (
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  )}
                </span>
                <span class="hidden xxss:flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setChart(!chart)}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </span>
                <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setBarAmount(!barAmount)}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                </span>
            </div>
        
        </header>
      ) : (
        <header class="px-2 py-4 flex items-center justify-between dark:bg-gray-800 relative bottom-4">
            <div class="flex gap-2">
                    <span class="flex items-center justify-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 text-blue-400 cursor-pointer rounded-full" onClick={generatePdfDayOfWeek}>
                    {spin ? (
                      <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                    ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      )}
                    </span>
                    <span class="hidden xxss:flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setChart(!chart)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setBarAmount(!barAmount)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                    </span>
                </div>
            <div className='flex flex-col items-end justify-center'>
            <div className='flex items-center justify-center space-x-2'>
            <div className='flex items-center justify-center space-x-2'>
              <h1 className='font-mono font-semibold text-xl text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
              {/* <h1 className='font-mono text-lg text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1>  */}
            </div>
            <h2 className="font-semibold text-[#495057] tracking-wider text-lg dark:text-[#ccc]">הכנסה ממוצעת לפי יום בשבוע</h2>
            </div>
            <h1 className="text-gray-500 tracking-wider dark:text-[#ccc] text-sm">.הטבלה משתנה בהתאם לחומר שהוזן למערכת</h1>
            </div>
            </header>
      )}
        
        <div className='relative bottom-5'>
          <Chart options={bar.options} series={days} type="bar" height={310} />
        </div>
        {/* <Chart options={state0.options} series={state0.series} type="bar" height={325} /> */}
      </div>

    <div className={`flex flex-col col-span-3 mdx:col-span-1 space-y-2 h-[400px] relative bg-white dark:bg-gray-800 pb-9 shadow px-1 rounded-2xl overflow-x-hidden `} >
        <div className="flex items-center justify-between pt-3 py-[6px] px-4 sticky top-0 z-10">
          <h1 className="text-blue-600 text-sm cursor-pointer dark:text-blue-500 hover:text-blue-500 relative left-0.5" onClick={()=> navigate("/month-invoices")}>לצפייה</h1>
        <div className='flex flex-col items-end justify-center -space-y-0.5 relative top-0.5 right-0.5'>
        <div className='flex items-center justify-center space-x-1.5'>
        <button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
        <div onMouseOver={() => setTooltipStatus(1)} onMouseOut={() => setTooltipStatus(0)}>
        <InformationCircleIcon 
        strokeWidth={2} 
        className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
      />
        </div>
      {tooltipStatus == 1 && (
                        <div role="tooltip" className="z-50 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow bg-white p-4 rounded">
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
            <h1 className={`font-sans font-bold text-[#495057] mr-[2px] relative right-1 dark:text-[#ccc] tracking-wide `}>דו"ח ספקים חודשי</h1>
            </div>
        {suppMonth == "1" && (
          <div className='flex items-center justify-end space-x-1.5 relative right-1 bottom-[1px]'>
          <h1 className='font-mono text-gray-500 dark:text-[#ccc] relative top-[1.5px]'>{new Date().getFullYear()}</h1>
          <h1 className='font-mono text-lg text-gray-500 dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
        </div>
        )}
        {suppMonth == "2" && (
          <div className='flex items-center justify-end space-x-1.5 relative right-1 bottom-[1px]'>
          <h1 className='font-mono text-gray-500 dark:text-[#ccc] relative top-[1.5px]'>{getMonthInHebrew3(new Date().getMonth() + 1) == "1" ? new Date().getFullYear() -1 : new Date().getFullYear()}</h1>
          <h1 className='font-mono text-lg text-gray-500 dark:text-[#ccc]'>{getMonthInHebrew3(new Date().getMonth() + 1)}</h1> 
        </div>
        )}

        </div>
        </div>
        
       
         <div class="grid grid-cols-2 gap-2 rounded-xl bg-gray-200 dark:bg-gray-900 p-1.5 mx-3 relative bottom-2.5">
        
        <div>
            <input type="radio" name="option" id="2" value="חודש קודם" class="peer hidden" checked={suppMonth == "2"}/>
            <label for="2" class="block cursor-pointer select-none text-gray-600 dark:text-[#ccc] font-semibold rounded-xl px-2 py-1 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white" onClick={lastMonth}>חודש קודם</label>
        </div>
        <div>
            <input type="radio" name="option" id="1" value="חודש נוכחי" class="peer hidden" checked={suppMonth == "1"} />
            <label for="1" class="block cursor-pointer select-none text-gray-600 dark:text-[#ccc] font-semibold rounded-xl px-2 py-1 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white" onClick={thisMonth}>חודש נוכחי</label>
        </div>
        
    </div>
    
        {(suppMonth == "2") ? (
         <>
         {(suppliers && suppliers.length) ? <>
          <div className={`h-[300px] divide-y divide-gray-200 pb-2 px-2 overflow-x-hidden overflow-y-auto scrollbar-none`} >
        {suppliers?.map(s => (
          <div className="flex items-center justify-between my-[6px] py-[2px] h-[51px] w-full p-4 cursor-pointer hover:scale-105 ease-out transition-all duration-300 hover:rounded dark:hover:bg-gray-600 hover:bg-sky-100" onClick={()=> navigate(`/suppliers/${s?.id}`)}>
              
              <h1 className={`font-sans ${s.total > 0 ? 'text-gray-500 dark:bg-gray-900 dark:text-blue-500 dark:font-semibold dark:font-mono dark:rounded-full ' : 'text-red-600 bg-red-100 dark:bg-gray-900 dark:text-red-500'} rounded-xl tracking-wide py-[2px] px-2`}><span className='text-sm font-sans'>₪</span>{Number(Math.round(s.total)).toLocaleString()}</h1>

                <div className="flex items-center justify-center space-x-2">
                <div className="flex flex-col items-center justify-center -space-y-0.5">
                  <h1 className={`text-sm font-semibold font-sans tracking-wide ${globalTheme != "light" ? "text-gray-300" : "text-gray-500"}`}>{s.name}</h1>
                  <h1 className="text-sm font-mono text-gray-500 self-end dark:text-white">{s.type}</h1>
                </div>
               
                <div className={`flex items-center justify-center ${s.type == "סחורה" ? "bg-pink-100" : s.type == "משתנה" ? "bg-sky-100" : s.type == "קבוע" ? "bg-emerald-100" : "bg-gray-100" } dark:bg-gray-900 h-9 w-9 rounded-lg`}>
                     {s.type == "סחורה" && (
                        <ShoppingBagIcon width={19} height={19} className="text-pink-600 dark:text-indigo-500"/>
                     )}
                     {s.type == "משתנה" && (
                        <TruckIcon width={19} height={19} className="text-sky-600 dark:text-indigo-500"/>
                     )}
                     {s.type == "קבוע" && (
                        <HomeIcon width={19} height={19} className="text-emerald-600 dark:text-indigo-500"/>
                     )}
                   </div>
                </div>
          </div>
        ))}
        <div className="flex items-center justify-start absolute bottom-[7px] left-4 z-10 group space-x-1 cursor-pointer" onClick={()=> navigate("/month-invoices")}>
      <svg class={`h-6 w-6 text-green-500 group-hover:-translate-x-1 mr-1 leading-normal transition-all duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
      <h2 class="text-sm font-semibold tracking-wide text-blue-400 group-hover:text-blue-300 dark:text-gray-100">חשבוניות החודש</h2>
        </div>
        </div>
          </> : (
            <>
            <div className="px-4 flex items-center justify-center relative bottom-1 overflow-y-hidden scrollbar-none">
            <img class="block h-64 object-cover rounded-md mb-3" src="https://www.gitaa.in/img/NoRecordFound.png" alt="" />
            {/* <h1 className="text-center font-bold font-mono text-2xl tracking-wide dark:text-gray-100 text-[#373D3F]">אין נתונים להציג</h1> */}
          </div>
            </>
          )}
         </>
        ) : (
          <>
          {(suppliersMonth?.data && suppliersMonth?.data.length) ? (
             <>
              <div className={`h-[300px] divide-y divide-gray-200 pb-2 px-1 overflow-x-hidden overflow-y-auto scrollbar-none`}>
             {/* <div className={`h-[300px] divide-y divide-gray-200 mt-1 pb-2 px-1 overflow-x-hidden overflow-y-auto ${scroll ? 'scrollbar' : 'scrollbar-none'}`} onMouseOver={()=> setScroll(true)} onMouseOut={()=> setScroll(false)}> */}
           {suppliersMonth?.data.map(s => (
             <div className="flex items-center justify-between my-[6px] py-[2px] h-[51px] w-full p-4 cursor-pointer hover:scale-105 ease-out transition-all duration-300 hover:rounded dark:hover:bg-gray-600 hover:bg-sky-100" onClick={()=> navigate(`/suppliers/${s?.id}`)}>
                 
                   {/* <h1 className={`font-mono font-semibold ${s.total > 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'} text-sm rounded-xl py-[2px] px-2`}>₪{Number(s.total).toLocaleString()}</h1> */}
                   <h1 className={`font-sans ${s.total > 0 ? 'text-gray-500 dark:bg-gray-900 dark:text-blue-500 dark:font-semibold dark:font-mono dark:rounded-full ' : 'text-red-600 bg-red-100 dark:bg-gray-900 dark:text-red-500'} rounded-xl tracking-wide py-[2px] px-2`}><span className='text-sm font-sans'>₪</span>{Number(s.total).toLocaleString()}</h1>
                   <div className="flex items-center justify-center space-x-2">
                    <div className="flex flex-col items-center justify-center -space-y-0.5">
                    <h1 className={`text-sm font-semibold font-sans tracking-wide ${globalTheme != "light" ? "text-gray-300" : "text-gray-500"}`}>{s.name}</h1>
                    <h1 className="text-sm font-mono text-gray-500 self-end dark:text-white">{s.type}</h1>
                    </div>
                  
                   <div className={`flex items-center justify-center ${s.type == "סחורה" ? "bg-pink-100" : s.type == "משתנה" ? "bg-sky-100" : s.type == "קבוע" ? "bg-emerald-100" : "bg-gray-100" } dark:bg-gray-900 h-9 w-9 rounded-lg`}>
                     {s.type == "סחורה" && (
                        <ShoppingBagIcon width={19} height={19} className="text-pink-600 dark:text-indigo-500"/>
                     )}
                     {s.type == "משתנה" && (
                        <TruckIcon width={19} height={19} className="text-sky-600 dark:text-indigo-500"/>
                     )}
                     {s.type == "קבוע" && (
                        <HomeIcon width={19} height={19} className="text-emerald-600 dark:text-indigo-500"/>
                     )}
                   </div>
                   </div>
             </div>
           ))}
           <div className="flex items-center justify-start absolute bottom-[7px] left-4 z-10 group space-x-1 cursor-pointer" onClick={()=> navigate("/month-invoices")}>
        
         <h2 class="text-sm font-semibold tracking-wide text-blue-500 group-hover:text-blue-400 dark:text-blue-400">חשבוניות החודש</h2>
         <svg class={`h-6 w-6 text-blue-600 group-hover:-translate-x-1 mr-1 leading-normal transition-all duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
         </svg>
           </div>
           </div>
             </>
          ) : (
            <div className="px-4 flex items-center justify-center relative bottom-1 overflow-y-hidden scrollbar-none">
            <img class="block h-64 object-cover rounded-md mb-3" src="https://www.gitaa.in/img/NoRecordFound.png" alt="" />
            {/* <h1 className="text-center font-bold font-mono text-2xl tracking-wide dark:text-gray-100 text-[#373D3F]">אין נתונים להציג</h1> */}
          </div>
          )}
          </>
        )}
              
        </div>
       
    </div>

        {hebrew ? (
          <div class={`dark:bg-gray-800 mb-2 mt-3 ml-4 mr-4 rounded-2xl h-auto py-5 flex flex-row justify-between divide-x divide-solid divide-gray-400`}>
          <div class="relative flex-1 flex flex-col gap-2 px-4">
              <label class="text-gray-500 dark:text-gray-400 font-extrabold text-xl tracking-wider">Total Visitor</label>
              <label class="text-[#495057] dark:text-[#ccc] text-4xl font-bold">14K</label>
              <div class="absolute bg-red-400 rounded-md font-semibold text-xs text-gray-100 p-2 right-4 bottom-0">
                  - 5%
              </div>
          </div>
          <div class="relative flex-1 flex flex-col gap-2 px-4">
              <label class="text-gray-500 dark:text-gray-400 font-extrabold text-xl tracking-wider">Total Click</label>
              <label class="text-[#495057] dark:text-[#ccc] text-4xl font-bold">6K</label>
              <div class="absolute bg-green-400 rounded-md font-semibold text-xs text-gray-100 p-2 right-4 bottom-0">
                  + 10%
              </div>
          </div>
          <div class="relative flex-1 flex flex-col gap-2 px-4">
              <label class="text-gray-500 dark:text-gray-400 font-extrabold text-xl tracking-wider">Total Profit</label>
              <label class="text-[#495057] dark:text-[#ccc] text-4xl font-bold">$1.2M</label>
              <div class="absolute bg-green-400 rounded-md font-semibold text-xs text-gray-100 p-2 right-4 bottom-0">
                  + 5%
              </div>
          </div>
      </div>
        ) : (
         <>
         {toggle ? (
 <div class={`shadow hidden smxy:flex bg-white dark:bg-gray-800 py-5 mb-2 mt-3 mr-4 ml-4 rounded-2xl h-auto px-2 flex flex-row justify-between divide-x divide-solid divide-gray-400`}>
 <div class="relative flex-1 flex flex-col gap-2 px-4">
     <div className='flex items-center justify-between w-full'>
      <div className='relative bottom-1' onClick={()=> setToggle(!toggle)}>
        <ToggleOffIcon fontSize="large" className='text-blue-600 cursor-pointer hover:text-blue-500'/>
      </div>
     <label class="text-gray-500 dark:text-gray-400 font-medium text-xl tracking-wider text-right relative bottom-1">סה"כ הכנסות </label>

     </div>
     <div className='w-full items-center justify-between px-4'>
     
     <div
    class="inline-flex gap-2 self-end rounded bg-green-100 dark:bg-gray-900/50 p-1 relative right-3 dark:text-green-500 text-green-600"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>

    <span class="text-xs font-medium"> 81% </span>
  </div>
     <label class="text-[#495057] dark:text-[#ccc] text-2xl mdxw:text-3xl font-extrabold absolute right-4 bottom-0"><span className='text-lg lg:text-2xl'>₪</span>{lastMonthTotalOutcomeToString}</label>
     </div>
    
 </div>
 <div class="relative flex-1 flex flex-col gap-2 px-4">
 <label class="text-gray-500 dark:text-gray-400 font-medium text-xl tracking-wider text-right relative bottom-1">הוצאות ספקים חודש קודם</label>
     <div className='w-full items-center justify-between px-4'>
    
     <div
    class="inline-flex gap-2 self-end rounded bg-green-100 dark:bg-gray-900/50 p-1 relative top-1.5 right-3 dark:text-green-500 text-green-600"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>

    <span class="text-xs font-medium"> 81% </span>
  </div>
     <label class="text-[#495057] dark:text-[#ccc] text-2xl mdxw:text-3xl font-extrabold absolute right-4 bottom-0"><span className='text-lg lg:text-2xl'>₪</span>{lastMonthTotalOutcomeToString}</label>
     </div>
 </div>
 <div class="relative flex flex-col gap-2 px-4 flex-1">
     <label class="text-gray-500 dark:text-gray-400 font-medium text-xl tracking-wider text-right relative bottom-1">הוצאות ספקים החודש</label>
     <div className='w-full items-center justify-between px-4'>
    
     <div class="inline-flex gap-2 self-end rounded bg-red-100 dark:bg-gray-900/50 p-1 relative top-1.5 right-3 text-red-600 dark:text-red-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
      />
    </svg>

    <span class="text-xs font-medium"> 67% </span>
  </div>
     <label class="text-[#495057] dark:text-[#ccc] text-2xl mdxw:text-3xl font-extrabold absolute right-4 bottom-0"><span className='text-lg lg:text-2xl'>₪</span>{monthlyTotalOutcomeToString2}</label>
     </div>
 </div>
</div>
         ) : (
          <div class={`shadow hidden smxy:flex bg-white dark:bg-gray-800 py-5 mb-2 mt-3 mr-4 ml-4 rounded-2xl h-auto px-2 flex flex-row justify-between divide-x divide-solid divide-gray-400`}>
          <div class="relative flex-1 flex flex-col gap-2 px-4">
              <div className='flex items-center justify-between w-full'>
               <div className='relative bottom-1' onClick={()=> setToggle(!toggle)}>
                 <ToggleOnIcon fontSize="large" className='text-blue-600 cursor-pointer hover:text-blue-500'/>
               </div>
              <label class="text-gray-500 dark:text-gray-400 font-medium text-xl tracking-wider text-right relative bottom-1">סה"כ הכנסות </label>

              </div>
              <div class="bg-green-400 w-12 rounded-md font-semibold text-xs text-gray-100 p-2 ">
                  - 5%
              </div>
              <label class="text-[#495057] dark:text-[#ccc] text-2xl mfg:text-3xl font-extrabold absolute right-4 bottom-0"><span className='text-lg lg:text-2xl'>₪</span>{monthlyIncomeToString}</label>
          </div>
          <div class="relative flex-1 flex flex-col gap-2 px-4">
          <label class="text-gray-500 dark:text-gray-400 font-medium text-xl tracking-wider text-right relative bottom-1"> סחורה חודש קודם</label>
              <div className='w-full items-center justify-between px-4'>
              <div class="absolute bg-red-400 rounded-md font-semibold text-xs text-gray-100 p-2 left-4 bottom-0">
                  - 9%
              </div>
              <label class="text-[#495057] dark:text-[#ccc] text-2xl mfg:text-3xl font-extrabold absolute right-4 bottom-0"><span className='text-lg lg:text-2xl'>₪</span>{Number(lastMonthWaresOutcome).toLocaleString()}</label>
              </div>
          </div>
          <div class="relative flex flex-col gap-2 px-4 flex-1">
              <label class="text-gray-500 dark:text-gray-400 font-medium text-xl tracking-wider text-right relative bottom-1">הוצאות סחורה החודש</label>
              <div className='w-full items-center justify-between px-4'>
              <div class="absolute bg-red-400 rounded-md font-semibold text-xs text-gray-100 p-2 left-4 bottom-0">
                  + 5%
              </div>
              <label class="text-[#495057] dark:text-[#ccc] text-2xl mfg:text-3xl font-extrabold absolute right-4 bottom-0"><span className='text-lg lg:text-2xl'>₪</span>{monthlyWaresOutcomeToString}</label>
              </div>
          </div>
      </div>
         )}
         </>
        )}



<div className={`grid grid-cols-1 mdw:grid-cols-3 gap-x-0 gap-8 mdw:gap-4 p-4`}>
  
  <div id="multi" className="col-span-2 row-span-2 rounded-2xl shadow relative bg-white dark:bg-gray-800 h-[400px] p-4">
  <div class="flex gap-2 z-50">
                    <span class="flex items-center justify-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 text-blue-400 cursor-pointer rounded-full" onClick={generatePdfMulti}>
                    {spin ? (
                      <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                    ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      )}
                    </span>
                    <span class="hidden xxss:flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setChart(!chart)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setBarAmount(!barAmount)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                    </span>
                </div>
      
  <>
<div class="mt-3">
{(item2 == 1 && item == 5) && (
  <div className='relative bottom-6'>
    <Chart options={state599.options} series={tabs1} type="line" height={305} />
  </div>
  )}
  {(item2 == 2 && item == 5) && (
  <div className='relative bottom-6'>
    <Chart options={state599.options} series={tabs2} type="line" height={305} />
  </div>
  )}
  {(item2 == 3 && item == 5) && (
  <div className='relative bottom-6'>
    <Chart options={state599.options} series={tabs3} type="line" height={305} />
  </div>
  )}
  {(item2 == 4 && item == 5) && (
  <div className='relative bottom-6'>
    <Chart options={state599.options} series={tabs4} type="line" height={305} />
  </div>
  )}
  {(item2 == 5 && item == 5) && (
  <div className='relative bottom-6'>
    <Chart options={state599.options} series={tabs5} type="line" height={305} />
  </div>
  )}
  {(item2 == 6 && item == 5) && (
  <div className='relative bottom-6'>
    <Chart options={state599.options} series={tabs6} type="line" height={305} />
  </div>
  )}
{item == "4" && (
  <div className='relative bottom-14'>
     <div className='flex items-center justify-end space-x-1'>
        <button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-[#a8a29e] dark:hover:text-blue-400 hover:text-blue-500 relative top-[11px] right-[2.5px]">

<div onMouseOver={() => setTooltipStatus2(1)} onMouseOut={() => setTooltipStatus2(0)}>
<InformationCircleIcon 
strokeWidth={2} 
className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
/>
</div>
{tooltipStatus2 == 1 && (
               <div role="tooltip" className="z-50 w-64 absolute left-48 ml-0 mr-12 transition duration-150 ease-in-out shadow-lg bg-white p-4 rounded">
                  
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
<h1 className='text-right text-gray-600 dark:text-[#775DD0] text-xl relative top-2.5 right-1'>טבלת הכנסות / יעד</h1>
        </div>
    {/* <h1 className='text-right text-gray-600 dark:text-[#775DD0] text-xl relative top-2.5 right-1'>טבלת הכנסות / יעד</h1> */}
    <Chart options={state0.options} series={state0.series} type="bar" height={310} />
  </div>
  )}
  {item == "3" && (
  <div className='relative bottom-10'>
    <Chart options={state59.options} series={state59.series} type="line" height={325} />
  </div>
  )}
  {item == "2" && (
    <div className='relative bottom-10'>
      <Chart options={state60.options} series={state60.series} type="line" height={317} />
    </div>
    )}
  {item == "1" && (
    // <Chart options={state61.options} series={state61.series} type="radialBar" height={330} />
    <div className='relative bottom-12'>
      <Chart options={state62.options} series={state62.series} type="bar" height={335} />
    </div>

  )}
  
  <nav class="absolute bottom-2.5 left-2 w-[97%] z-0 flex border rounded-xl overflow-hidden dark:border-gray-700">
  <button type="button" class="relative min-w-0 flex-1 bg-white first:border-l-0 border-l py-3 px-4 text-gray-500 dark:text-[#ccc] hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 dark:bg-gray-800 dark:border-l-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-400" onClick={changesTabs}>
    Tab 1
  </button>
  <button type="button" class="relative min-w-0 flex-1 bg-white first:border-l-0 border-l py-3 px-4 text-gray-500 dark:text-[#ccc] hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 dark:bg-gray-800 dark:border-l-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-400" onClick={()=> setItem("4")}>
    Tab 2
  </button>
  <button type="button" class="relative min-w-0 flex-1 bg-white first:border-l-0 border-l py-3 px-4 text-gray-500 dark:text-[#ccc] hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 dark:bg-gray-800 dark:border-l-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-400" onClick={()=> setItem("3")}>
    Tab 3
  </button>
  <button type="button" class="relative min-w-0 flex-1 bg-white first:border-l-0 border-l py-3 px-4 text-gray-500 dark:text-[#ccc] hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 dark:bg-gray-800 dark:border-l-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-400" onClick={()=> setItem("2")}>
    Tab 4
  </button>
  <button type="button" class="relative min-w-0 flex-1 bg-white first:border-l-0 border-l py-3 px-4 text-gray-500 dark:text-[#ccc] hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 dark:bg-gray-800 dark:border-l-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-400" onClick={()=> setItem("1")}>
    Tab 5
  </button>
</nav>
</div>

  </>
  
</div>

          {hebrew ? (
            <div className={`flex flex-col col-span-3 md:col-span-1 space-y-2 h-[400px] relative bg-white dark:bg-gray-800 pb-1 shadow px-1 rounded-2xl overflow-x-hidden`} >
       
            <div>
           <div class="p-4 border-0 flex items-center justify-between">
             <div className='flex items-center justify-center space-x-1'>
              <h4 class="font-medium text-gray-800 dark:text-gray-100">Tasks Stats</h4>
              <button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
        <div onMouseOver={() => setTooltipStatus(1)} onMouseOut={() => setTooltipStatus(0)}>
        <InformationCircleIcon 
        strokeWidth={2} 
        className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
      />
        </div>
      {tooltipStatus == 1 && (
                        <div role="tooltip" className="z-50 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow bg-white p-4 rounded">
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
             </div>
             <span class="text-white text-xs bg-indigo-600 rounded-full px-3 py-[2px]">32 Total</span>
           </div>
           <div class="px-4 mb-1 -mt-2 divide-y divide-gray-200 card-body">
             <div class="flex items-center justify-between py-3 text-sm">
               <div class="flex items-center space-x-2 text-gray-700 dark:text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-none w-5 h-5">
                   <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                   <path
                     fill-rule="evenodd"
                     d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                     clip-rule="evenodd"
                   />
                 </svg>
                 <span>Unique Views</span>
               </div>
               <span class="font-mono text-gray-900 dark:text-gray-100">132</span>
             </div>
             <div class="flex items-center justify-between py-3 text-sm">
               <div class="flex items-center space-x-2 text-gray-700 dark:text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-none w-5 h-5">
                   <path
                     fill-rule="evenodd"
                     d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                     clip-rule="evenodd"
                   />
                 </svg>
                 <span>Comments</span>
               </div>
               <span class="font-mono text-gray-900 dark:text-gray-100">32,422</span>
             </div>
             <div class="flex items-center justify-between py-3 text-sm">
               <div class="flex items-center space-x-2 text-gray-700 dark:text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-none w-5 h-5">
                   <path
                     fill-rule="evenodd"
                     d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                     clip-rule="evenodd"
                   />
                 </svg>
                 <span>Activities</span>
               </div>
               <span class="font-mono text-gray-900 dark:text-gray-100">0</span>
             </div>
             <div class="flex items-center justify-between py-3 text-sm">
               <div class="flex items-center space-x-2 text-gray-700 dark:text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-none w-5 h-5">
                   <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                 </svg>
                 <span>Completed</span>
               </div>
               <span class="font-mono text-green-800 bg-green-200 rounded-full px-3 text-xs py-[2px]">12</span>
             </div>
             <div class="flex items-center justify-between py-3 text-sm">
               <div class="flex items-center space-x-2 text-gray-700 dark:text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-none w-5 h-5">
                   <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd" />
                 </svg>
                 <span>Closed</span>
               </div>
               <span class="font-mono text-red-700 bg-red-200 rounded-full px-3 text-xs py-[2px]">32</span>
             </div>
           </div>
           <a href="#" class="px-4 py-3 text-sm font-medium text-purple-700 hover:text-purple-900 dark:text-purple-500">More Information</a>
         </div>
        
         <div class="mx-4">
             <div>
                 <span class="inline-block text-sm text-gray-500 dark:text-gray-100">
                     Task done :
                     <span class="font-bold text-gray-700 dark:text-white">
                         25
                     </span>
                     /50
                 </span>
             </div>
             <div class="w-full h-2 mt-2 bg-gray-200 rounded-full">
                 <div class="w-1/2 h-full text-xs text-center text-white bg-purple-500 rounded-full">
                 </div>
             </div>
         </div>
          <div class="flex items-center justify-between mb-4 w-full px-4 relative top-1">
             <span class="flex items-center px-2 py-1 text-[10px] mdxw:text-xs font-semibold text-green-700 rounded-md bg-green-50">
                 COMPLETED
             </span>
             <span class="flex items-center px-2 py-1 text-[10px] mdxw:text-xs font-semibold text-green-600 bg-white border border-green-600 rounded-md">
                 MEDIUM PRIORITY
             </span>
         </div>
                   
             </div>
          ) : (
            <div className={`flex flex-col col-span-3 md:col-span-1 space-y-2 h-[400px] relative bg-white dark:bg-gray-800 pb-1 shadow px-1 rounded-2xl overflow-x-hidden`} >
       
       <div>
      <div class="p-4 border-0 flex items-center justify-between">
      <span class="text-white text-xs bg-indigo-600 rounded-full px-3 py-[2px]">32 Total</span>
        <div className='flex items-center justify-center space-x-1'>
        <button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
        <div onMouseOver={() => setTooltipStatus(1)} onMouseOut={() => setTooltipStatus(0)}>
        <InformationCircleIcon 
        strokeWidth={2} 
        className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
      />
        </div>
      {tooltipStatus == 1 && (
                        <div role="tooltip" className="z-50 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow bg-white p-4 rounded">
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
          <h4 class="font-medium text-gray-800 dark:text-gray-100 tracking-wide">מנהל המשימות</h4>
        </div>
      </div>
      <div class="px-4 mb-1 -mt-2 divide-y divide-gray-200 card-body">
        <div class="flex items-center justify-between py-3 text-sm">
        <span class="font-mono text-gray-900 dark:text-gray-100">{stats?.data.scheduler}</span>
          <div class="flex items-center space-x-2 text-gray-700 dark:text-white">
            <span>פגישות עתידיות</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-none w-5 h-5">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          
        </div>
        <div class="flex items-center justify-between py-3 text-sm">
        <span class="font-mono text-gray-900 dark:text-gray-100">{stats?.data.tasks}</span>
          <div class="flex items-center space-x-2 text-gray-700 dark:text-white">
          <span>משימות מנהל</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-none w-5 h-5">
              <path
                fill-rule="evenodd"
                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
           
          </div>
          
        </div>
        <div class="flex items-center justify-between py-3 text-sm">
        <span class="font-mono text-gray-900 dark:text-gray-100">{stats?.data.workerTasks}</span>
          <div class="flex items-center space-x-2 text-gray-700 dark:text-white">
          <span>משימות עובדים / הסתיימו</span>
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-none w-5 h-5">
              <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd" />
            </svg>
            
          </div>
         
        </div>
        <div class="flex items-center justify-between py-3 text-sm">
        <span class="font-mono text-green-800 bg-green-200 rounded-full px-3 text-xs py-[2px]">{stats?.data.dashTasks}</span>
          <div class="flex items-center space-x-2 text-gray-700 dark:text-white">
          <span>משימות קצרות</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-none w-5 h-5">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
           
          </div>
          
        </div>
        <div class="flex items-center justify-between py-3 text-sm">
        <span class="font-mono text-red-700 bg-red-200 rounded-full px-3 text-xs py-[2px]">{stats?.data.urgent}</span>
          <div class="flex items-center space-x-2 text-gray-700 dark:text-white">
          <span>משימות חשובות</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-none w-5 h-5">
              <path
                fill-rule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clip-rule="evenodd"
              />
            </svg>
            
          </div>
          
        </div>
      </div>
      <h1 class="px-4 py-1 text-sm font-medium cursor-pointer text-right text-purple-700 hover:text-purple-800 dark:text-purple-500">More Information</h1>
    </div>
    
    <div class="mx-4">
        <div className="flex justify-end">
            <span class="inline-block text-sm text-gray-500 dark:text-gray-100">
                Task done :
                <span class="font-bold text-gray-700 dark:text-white">
                    25
                </span>
                /50
            </span>
        </div>
        <div class="w-full h-2 mt-2 bg-gray-200 rounded-full">
            <div class="w-1/2 h-full text-xs text-center text-white bg-purple-500 rounded-full">
            </div>
        </div>
    </div>
     <div class="flex items-center justify-between mb-4 w-full px-4 relative top-0.5" onClick={()=> setBattery(!battery)}>
        <span class="flex items-center cursor-pointer px-2 py-1 text-[10px] mdxw:text-xs font-semibold text-green-700 rounded-md bg-green-50">
            COMPLETED
        </span>
        <span class="flex items-center cursor-pointer px-2 py-1 text-[10px] mdxw:text-xs font-semibold text-green-600 bg-white border border-green-600 rounded-md">
            MEDIUM PRIORITY
        </span>
    </div>
              
        </div>
          )}

  </div>

  <div id="www" className={`hidden mmu:grid mmu:grid-cols-1 bg-white shadow dark:bg-gray-800 max-h-[650px] uuu:max-h-[700px] mb-6 ml-4 mr-4 my-3 pb-2 rounded-2xl p-4 relative bottom-2`}>
  <div className="">
          {hebrew ? (
            <>
                 <div className="flex items-center justify-between w-full pr-1">
                  <div className='flex flex-col relative left-1.5'>
                    <h1 className=" text-[#495057] font-sans font-extrabold text-left dark:text-gray-100">Yearly outcome chart - {incomeCurrentYear} </h1>
                    <h1 className="flex text-gray-500 text-xs dark:text-neutral-300">all yearly outcome data by types.</h1>
                  </div>
                    <div class="flex gap-2">
                    <span class="flex items-center justify-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={generatePdf}>
                    {spin ? (
                      <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                    ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      )}
                    </span>
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setChart(!chart)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setBarAmount(!barAmount)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                    </span>
                </div>
              </div>

            </>
          ) : (
            <>
           
      
  <div class="flex flex-col col-span-full xl:col-span-8 bg-white rounded-sm dark:bg-gray-800">
            <header class="px-3 py-4 border-b-[1px] border-gray-300 dark:border-gray-500 flex items-center justify-between dark:bg-gray-800 rounded-t-xl -space-y-0.5 relative bottom-3.5">
           
            <div class="flex gap-2">
                    <span class="flex items-center justify-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 text-blue-400 cursor-pointer rounded-full" onClick={generatePdf}>
                    {spin ? (
                      <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                    ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      )}
                    </span>
                    <span class="hidden xxss:flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setChart(!chart)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setBarAmount(!barAmount)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                    </span>
                </div>
            <div className='flex flex-col items-end justify-center'>
            <div className='flex items-center justify-center space-x-2'>
            <div className='flex items-center justify-center space-x-2'>
              <h1 className='font-mono font-semibold text-xl text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
              {/* <h1 className='font-mono text-lg text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1>  */}
            </div>
            <h2 className="font-semibold text-[#495057] tracking-wider text-xl dark:text-[#ccc]">טבלת הוצאות שנתית</h2>
            </div>
            <h1 className="text-gray-500 tracking-wider dark:text-[#ccc] relative bottom-0.5">.הטבלה משתנה בהתאם לחומר שהוזן למערכת</h1>
            </div>
            </header>
            <div class="px-5 py-1 dark:bg-gray-900 rounded-2xl relative dark:bottom-1">
                <div class="flex items-center justify-center">
                    {/* <!-- Unique Visitors --> */}
                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center">
                            <div class="text-3xl font-extrabold text-[#495057] mr-2 dark:text-[#ccc]"><span className='font-sans text-xl font-bold relative right-0.5'>₪</span>{isFinite(totalWares) ? Number(Math.round(totalWares)).toLocaleString() : <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-emerald-600" />}</div>
                                {/* <div class="text-sm font-medium text-green-500">+49%</div> */}
                                <div className="w-[35px] h-[35px]">
                                  <CircularProgressbar
                                value={isFinite(Math.round((totalWares / (totalIncome + totalReceipt)) * 100)) ? Math.round((totalWares / (totalIncome + totalReceipt)) * 100) : 0}
                                text={`${isFinite(Math.round((totalWares / (totalIncome + totalReceipt)) * 100)) ? Math.round((totalWares / (totalIncome + totalReceipt)) * 100) : 0}%`}
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                backgroundColor: "#3e98c7",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                                })}
                                />

                                </div>
                            </div>
                            <div class="text-sm text-gray-500 text-center">קניית סחורה</div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>
                    {/* <!-- Total Pageviews --> */}
                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center">
                            <div class="text-3xl font-extrabold text-[#495057] mr-2 dark:text-[#ccc]"><span className='font-sans text-xl font-bold relative right-0.5'>₪</span>{isFinite(totalPermanent) ? Number(Math.round(totalPermanent)).toLocaleString() : <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-emerald-600" />}</div>
                                {/* <div class="text-sm font-medium text-green-500">+7%</div> */}
                                <div className="w-[35px] h-[35px]">
                                  <CircularProgressbar
                                value={isFinite(Math.round((totalPermanent / (totalIncome + totalReceipt)) * 100)) ? Math.round((totalPermanent / (totalIncome + totalReceipt)) * 100) : 0}
                                text={`${isFinite(Math.round((totalPermanent / (totalIncome + totalReceipt)) * 100)) ? Math.round((totalPermanent / (totalIncome + totalReceipt)) * 100) : 0}%`}
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                backgroundColor: "#3e98c7",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                                })}
                                />

                                </div>
                            </div>
                            <div class="text-sm text-gray-500 text-center">הוצאות קבועות</div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>
                    {/* <!-- Bounce Rate --> */}
                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center">
                            <div class="text-3xl font-extrabold text-[#495057] mr-2 dark:text-[#ccc]"><span className='font-sans text-xl font-bold relative right-0.5'>₪</span>{isFinite(totalChangeable) ? Number(Math.round(totalChangeable)).toLocaleString() : <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-emerald-600" />}</div>
                                {/* <div class="text-sm font-medium text-yellow-500">-7%</div> */}
                                <div className="w-[35px] h-[35px]">
                                  <CircularProgressbar
                               value={isFinite(Math.round((totalChangeable / (totalIncome + totalReceipt)) * 100)) ? Math.round((totalChangeable / (totalIncome + totalReceipt)) * 100) : 0}
                               text={`${isFinite(Math.round((totalChangeable / (totalIncome + totalReceipt)) * 100)) ? Math.round((totalChangeable / (totalIncome + totalReceipt)) * 100) : 0}%`}
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                backgroundColor: "#3e98c7",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                                })}
                                />

                                </div>
                            </div>
                            <div class="text-sm text-gray-500 text-center">הוצאות משתנות</div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>
                    {/* <!-- Visit Duration--> */}
                    <div class="flex items-center">
                        <div>
                            <div class="flex items-center">
                            <div class="text-3xl font-extrabold text-[#495057] mr-2 dark:text-[#ccc]"><span className='font-sans text-xl font-bold relative right-0.5'>₪</span>{isFinite(totalSal) ? Number(Math.round(totalSal)).toLocaleString() : <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-emerald-600" />}</div>
                                {/* <div class="text-sm font-medium text-yellow-500">+7%</div> */} 
                                <div className="w-[35px] h-[35px]">
                                  <CircularProgressbar
                                value={isFinite(Math.round((totalSal / (totalIncome + totalReceipt)) * 100)) ? Math.round((totalSal / (totalIncome + totalReceipt)) * 100) : 0}
                                text={`${isFinite(Math.round((totalSal / (totalIncome + totalReceipt)) * 100)) ? Math.round((totalSal / (totalIncome + totalReceipt)) * 100) : 0}%`}
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                backgroundColor: "#3e98c7",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                                })}
                                />

                                </div>
                            </div>
                            <div class="text-sm text-gray-500 text-center">משכורות עובדים</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </>
          )}
      <div>
        {chart ? (
            <Chart options={state1.options} series={series} type="bar" height={330} />
        ) : (
            <Chart options={state1.options} series={series} type="bar" height={327} />  
             )}
      </div>
      </div>
  </div>

  <section className={`hidden smx:grid grid-cols-5 ${!battery && 'hidden'} hidden smx:grid relative bottom-2.5 shadow bg-gray-200 dark:bg-gray-800 rounded-lg py-4 pl-20 mx-4`}>
<div class="w-48">                    
  <div class="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
    <div
         class="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div>
    <div
         class="cursor-default bg-green-400 w-full text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
         >
      <div class="absolute left-0 mx-8 text-gray-700 dark:text-gray-500">100%</div>
    </div>
  </div>
</div>

<div class="w-48">                    
  <div class="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
    <div
         class="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div>
    <div
         class="cursor-default bg-green-400 w-3/4 text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
         >
      <div class="absolute left-0 mx-8 text-gray-700 dark:text-gray-500">75%</div>
    </div>
  </div>
</div>

<div class="w-48">                    
  <div class="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
    <div
         class="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div>
    <div
         class="cursor-default bg-yellow-400 w-2/4 text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
         >
      <div class="absolute left-0 mx-8 text-gray-700 dark:text-gray-500">50%</div>
    </div>
  </div>
</div>

<div class="w-48">                    
  <div class="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
    <div
         class="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div>
    <div
         class="cursor-default bg-gray-400 w-1/4 text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
         >
      <div class="absolute left-0 mx-8 text-gray-700 dark:text-gray-400">25%</div>
    </div>
  </div>
</div>

<div class="w-48">                    
  <div class="shadow w-1/2 rounded border-2 animate-pulse border-gray-400 flex my-1 relative">
    <div
         class="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div>
    <div
         class="cursor-default bg-red-400 w-[10%] text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
        >
      <div class="absolute left-0 mx-8 text-red-400"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path></svg></div>
    </div>
  </div>
</div>

</section>

<div id="zzz" className={`${toggle2 ? 'hidden' : 'mmu:grid mmu:grid-cols-1'} bg-white shadow dark:bg-gray-800 max-h-[630px] uuu:max-h-[630px] mb-6 ml-4 mr-4 my-3 pb-2 rounded-2xl p-4 relative -bottom-0.5`}>
  <div class="flex flex-col col-span-full xl:col-span-8 bg-white rounded-sm dark:bg-gray-800">
            <header class="px-3 py-4 border-b-[1px] border-gray-300 dark:border-gray-500 flex items-center justify-between dark:bg-gray-800 rounded-t-xl -space-y-0.5 relative bottom-2.5">
            
            <div class="flex gap-2">
                    <span class="flex items-center justify-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 text-blue-400 cursor-pointer rounded-full" onClick={generatePdfdailyZChart}>
                    {spin ? (
                      <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                    ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      )}
                    </span>
                    <span class="hidden xxss:flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setToggle2(!toggle2)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setLabel(!label)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                    </span>
                </div>
            <div className='flex flex-col items-end justify-center'>
            <div className='flex items-center justify-center space-x-2'>
            <button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 relative left-1 ">
        <div onMouseOver={() => setTooltipStatus(1)} onMouseOut={() => setTooltipStatus(0)}>
        <InformationCircleIcon 
        strokeWidth={2} 
        className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
      />
        </div>
      {tooltipStatus == 1 && (
                        <div role="tooltip" className="z-50 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow bg-white p-4 rounded">
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
            <div className='flex items-center justify-center space-x-2'>
              <h1 className='font-mono font-semibold text-xl text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
              <h1 className='font-mono text-lg text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
            </div>
            <h2 className="font-semibold text-[#495057] tracking-wider text-xl dark:text-[#ccc]">דו"ח הכנסות\הוצאות יומי</h2>
            </div>
            <h1 className="text-gray-500 tracking-wider dark:text-[#ccc]">.הטבלה משתנה בהתאם לחומר שהוזן למערכת</h1>
            </div>
            </header>
            <div class="px-5 py-1 dark:bg-gray-900 rounded-2xl">
                <div class="flex justify-center items-center h-20">

                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center">
                            <div class="text-3xl font-bold text-[#495057] mr-2 dark:text-[#ccc]"><span className='text-lg lg:text-2xl'>₪</span>{Math.round(totalDay).toLocaleString()}</div>
                                <div class="text-sm font-medium text-green-500">+49%</div>
                            </div>

                            <div class="text-sm text-gray-500 text-center">סה"כ דו"ח יומי</div>

                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>

                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center">
                                <div class="text-3xl font-bold text-[#495057] mr-2 dark:text-[#ccc]"><span className='text-lg lg:text-2xl'>₪</span>{Math.round(isFinite(avrageDay) ? avrageDay : 0).toLocaleString()}</div>
                                <div class="text-sm font-medium text-green-500">+7%</div>
                            </div>
                            <div class="text-sm text-gray-500 text-center">ממוצע דו"ח יומי</div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>

                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center justify-center">
                                <div class="text-3xl font-bold text-[#495057] mr-2 dark:text-[#ccc]">{totalCount}</div>
                                <div class="text-sm font-medium text-yellow-500">-7%</div>
                            </div>
                            <div class="text-sm text-gray-500 text-center">מספר דוח"ות </div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>

                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center">
                                <div class="text-3xl font-bold text-[#495057] mr-2 dark:text-[#ccc]"><span className='text-lg lg:text-2xl'>₪</span>{monthlyTotalOutcomeToString}</div>
                                <div class="text-sm font-medium text-green-500">+7%</div>
                            </div>
                            <div class="text-sm text-gray-500 text-center">סה"כ הוצאות</div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>

                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center justify-center">
                                <div class="text-3xl font-bold text-[#495057] mr-2 dark:text-[#ccc]">{counts?.data}</div>
                                <div class="text-sm font-medium text-yellow-500">-7%</div>
                            </div>
                            <div class="text-sm text-gray-500 text-center">מספר חשבוניות</div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>

                    <div class="flex items-center">
                        <div>
                            <div class="flex items-center">
                                <div class="text-3xl font-bold text-[#495057] mr-2 dark:text-[#ccc]">2m 56s</div>
                                <div class="text-sm font-medium text-yellow-500">+7%</div>
                            </div>
                            <div class="text-sm text-gray-500">Visit Duration</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
  <div className='relative top-4'>
    <Chart options={state4.options} series={series10} type="area" height={300}/>
  </div>
</div>

  <div id="sss" className={`${toggle2 ? 'mmu:grid mmu:grid-cols-1' : 'hidden'} bg-white shadow dark:bg-gray-800 max-h-[550px] uuu:max-h-[600px] mb-6 ml-4 mr-4 my-3 pb-2 rounded-2xl p-4 relative top-0.5`}>
  {hebrew ?(
    <div className="w-full flex items-center justify-between px-2 mt-2">
      <div>
    <div className="flex items-center justify-center space-x-2 relative bottom-2 left-1">
      <h1 className="text-[#495057] font-bold dark:text-gray-100">Commodity - Salaries VS Income Chart {incomeCurrentYear}</h1>
      <ScoreIcon className="text-blue-400 cursor-pointer hover:scale-110 hover:text-blue-400" onClick={()=> setLabel(!label)} />
    </div>
    
    <div className="relative md:bottom-2">
    <h1 className="flex justify-start font-extralight text-gray-500 text-xs relative left-2 dark:text-white">you can switch between chart types using the buttons.</h1>
    <h1 className="flex justify-start font-extralight text-gray-500 text-xs relative left-2 dark:text-white">the chart will update automatically when you enter new information.</h1>
   </div>
  
    </div>
    <div class="flex gap-2">
                    <span class="flex items-center justify-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 text-blue-400 cursor-pointer rounded-full" onClick={generatePdfdailyZChart}>
                    {spin ? (
                      <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                    ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      )}
                    </span>
                    <span class="hidden xxss:flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setChart(!chart)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setBarAmount(!barAmount)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                    </span>
                </div>
    
    </div>
  ) : (
   <>
   <div class="flex flex-col col-span-full xl:col-span-8 bg-white rounded-sm dark:bg-gray-800">
            <header class="px-3 py-4 border-b border-gray-300 dark:border-gray-500 dark:border-b-[1px] flex items-center justify-between dark:bg-gray-800 rounded-t-xl -space-y-0.5 relative bottom-3.5">
           
            <div class="flex gap-2">
                    <span class="flex items-center justify-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 text-blue-400 cursor-pointer rounded-full" onClick={generatePdfdailyZChart}>
                    {spin ? (
                      <AutorenewIcon fontSize="small" className="animate-spin text-blue-400" />
                    ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      )}
                    </span>
                    <span class="hidden xxss:flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setToggle2(!toggle2)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer" onClick={()=> setBarAmount(!barAmount)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                    </span>
                </div>
            <div className='flex flex-col items-end justify-center'>
            <div className='flex items-center justify-center space-x-2'>
            <div className='flex items-center justify-center space-x-2'>
              <h1 className='font-mono font-semibold text-xl text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
              {/* <h1 className='font-mono text-lg text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1>  */}
            </div>
            <h2 className="font-semibold text-[#495057] tracking-wider text-xl dark:text-[#ccc]">טבלת הכנסות/סחורה/משכורות</h2>
            </div>
            <h1 className="text-gray-500 tracking-wider dark:text-[#ccc] relative bottom-0.5 right-0.5">.הטבלה משתנה בהתאם לחומר שהוזן למערכת</h1>
            </div>
            </header>
            <div class="px-5 py-1 dark:bg-gray-900 rounded-2xl relative dark:bottom-1 ">
                <div class="flex items-center justify-center">
                    {/* <!-- Unique Visitors --> */}
                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center">
                            <div class="text-3xl font-extrabold text-[#495057] mr-2 dark:text-[#ccc]"><span className='font-sans text-xl font-bold relative right-0.5'>₪</span>{isFinite(totalWares) ? Number(Math.round(totalWares)).toLocaleString() : <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-emerald-600" />}</div>
                                <div class="text-sm font-medium text-green-500">+49%</div>
                            </div>
                            <div class="text-sm text-gray-500 text-center">קניית סחורה</div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>
                    {/* <!-- Bounce Rate --> */}
                    <div class="flex items-center py-2">
                        <div class="mr-5">
                            <div class="flex items-center">
                            <div class="text-3xl font-extrabold text-[#495057] mr-2 dark:text-[#ccc]"><span className='font-sans text-xl font-bold relative right-0.5'>₪</span>{isFinite(totalSal) ? Number(Math.round(totalSal)).toLocaleString() : <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-emerald-600" />}</div>
                                <div class="text-sm font-medium text-yellow-500">-7%</div>
                            </div>
                            <div class="text-sm text-gray-500 text-center">משכורות עובדים</div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-500 mr-5" aria-hidden="true"></div>
                    </div>
                    {/* <!-- Visit Duration--> */}
                    <div class="flex items-center">
                        <div>
                            <div class="flex items-center">
                            <div class="text-3xl font-extrabold text-[#495057] mr-2 dark:text-[#ccc]"><span className='font-sans text-xl font-bold relative right-0.5'>₪</span>{isFinite(totalIncome + totalReceipt) ? Number(Math.round(totalIncome + totalReceipt)).toLocaleString() : <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-emerald-600" />}</div>
                                <div class="text-sm font-medium text-yellow-500">+7%</div>
                            </div>
                            <div class="text-sm text-gray-500 text-center">הכנסות</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
   </>
  )}
  <div className='hidden sm:block'>
    <Chart options={state11111.options} series={state11111.series} type="line" height={350} />
  </div>
  <div className='block sm:hidden'>
    <Chart options={state22222.options} series={state22222.series} type="line" height={350} />
  </div>
</div>

 


{hebrew ? (
  <section className={`p-6 mt-6 mb-6 rounded-xl dark:bg-gray-800 dark:text-gray-100 mx-4`}>
	<div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-[#333] dark:bg-gray-900 dark:text-gray-100">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-800">
					<polygon points="160 96.039 160 128.039 464 128.039 464 191.384 428.5 304.039 149.932 304.039 109.932 16 16 16 16 48 82.068 48 122.068 336.039 451.968 336.039 496 196.306 496 96.039 160 96.039"></polygon>
					<path d="M176.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,176.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,176.984,464.344Z"></path>
					<path d="M400.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,400.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,400.984,464.344Z"></path>
				</svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">200</p>
				<p className="capitalize">Orders</p>
			</div>
		</div>
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-[#333] dark:bg-gray-900 dark:text-gray-100">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-800">
					<path d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
					<path d="M256,384A104,104,0,0,0,360,280H152A104,104,0,0,0,256,384Z"></path>
					<polygon points="205.757 228.292 226.243 203.708 168 155.173 109.757 203.708 130.243 228.292 168 196.827 205.757 228.292"></polygon>
					<polygon points="285.757 203.708 306.243 228.292 344 196.827 381.757 228.292 402.243 203.708 344 155.173 285.757 203.708"></polygon>
				</svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">7500</p>
				<p className="capitalize">Customers</p>
			</div>
		</div>
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-[#333] dark:bg-gray-900 dark:text-gray-100">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-800">
					<path d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"></path>
					<rect width="32" height="32" x="80" y="264"></rect>
					<rect width="32" height="32" x="240" y="128"></rect>
					<rect width="32" height="32" x="136" y="168"></rect>
					<rect width="32" height="32" x="400" y="264"></rect>
					<path d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"></path>
				</svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">172%</p>
				<p className="capitalize">Growth</p>
			</div>
		</div>
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-[#333] dark:bg-gray-900 dark:text-gray-100">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-800">
					<path d="M454.423,278.957,328,243.839v-8.185a116,116,0,1,0-104,0V312H199.582l-18.494-22.6a90.414,90.414,0,0,0-126.43-13.367,20.862,20.862,0,0,0-8.026,33.47L215.084,496H472V302.08A24.067,24.067,0,0,0,454.423,278.957ZM192,132a84,84,0,1,1,136,65.9V132a52,52,0,0,0-104,0v65.9A83.866,83.866,0,0,1,192,132ZM440,464H229.3L79.141,297.75a58.438,58.438,0,0,1,77.181,11.91l28.1,34.34H256V132a20,20,0,0,1,40,0V268.161l144,40Z"></path>
				</svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">17%</p>
				<p className="capitalize">Bounce rate</p>
			</div>
		</div>
	</div>
</section>

) : (
  <section className={`p-6 mt-7 mb-4 rounded-xl bg-zinc-200 dark:bg-slate-800/50 dark:text-gray-100 mx-4`}>

	<div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
  
		
		<div className="flex justify-between p-4 space-x-4 rounded-lg md:space-x-4 text-[#333] shadow blue-glassmorphism dark:bg-gray-800 dark:text-gray-100">
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none text-[#ccc] dark:text-[#ccc]">17%</p>
				<p className="text-[#333] dark:text-[#ccc] text-lg">קצב צמיחה</p>
            <div className='flex items-center justify-center space-x-1.5'>
              <h1 className='font-mono font-semibold text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
              <h1 className='font-mono text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
            </div>
			</div>
      <div className={`flex justify-center p-2 align-middle rounded-lg sm:p-4 text-gray-600 ${getColor2()}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-700">
					<path d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"></path>
					<rect width="32" height="32" x="80" y="264"></rect>
					<rect width="32" height="32" x="240" y="128"></rect>
					<rect width="32" height="32" x="136" y="168"></rect>
					<rect width="32" height="32" x="400" y="264"></rect>
					<path d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"></path>
				</svg>
			</div>
		</div>
    <div className="flex justify-between p-4 space-x-4 rounded-lg md:space-x-4 text-[#333] shadow blue-glassmorphism dark:bg-gray-800 dark:text-gray-100">
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none text-[#ccc] dark:text-[#ccc]">{stats?.data.customersSum}</p>
				<p className="capitalize text-[#333] dark:text-[#ccc] text-lg">לקוחות חדשים</p>
            <div className='flex items-center justify-center space-x-1.5'>
              <h1 className='font-mono font-semibold text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
              <h1 className='font-mono text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
            </div>
			</div>
      <div className={`flex justify-center p-2 align-middle rounded-lg sm:p-4 text-gray-600 ${getColor2()}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-700">
					<path d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
					<path d="M256,384A104,104,0,0,0,360,280H152A104,104,0,0,0,256,384Z"></path>
					<polygon points="205.757 228.292 226.243 203.708 168 155.173 109.757 203.708 130.243 228.292 168 196.827 205.757 228.292"></polygon>
					<polygon points="285.757 203.708 306.243 228.292 344 196.827 381.757 228.292 402.243 203.708 344 155.173 285.757 203.708"></polygon>
				</svg>
			</div>
		</div>
    <div className={`flex justify-between p-4 space-x-4 rounded-lg md:space-x-4 text-[#333] shadow blue-glassmorphism dark:bg-gray-800 dark:text-gray-100`}>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none text-[#ccc] dark:text-[#ccc]"><span className='text-sm font-sans'>₪</span>{Number(isFinite(Math.round(monthSalaries?.data)) ? Math.round(monthSalaries?.data) : 0).toLocaleString()}</p>
				<p className="capitalize text-[#333] dark:text-[#ccc] text-lg">שכר עובדים</p>
            <div className='flex items-center justify-center space-x-1.5'>
              <h1 className='font-mono font-semibold text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
              <h1 className='font-mono text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
            </div>
			</div>
      <div className={`flex justify-center p-2 align-middle rounded-lg sm:p-4 text-gray-600 ${getColor2()}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-700">
					<polygon points="160 96.039 160 128.039 464 128.039 464 191.384 428.5 304.039 149.932 304.039 109.932 16 16 16 16 48 82.068 48 122.068 336.039 451.968 336.039 496 196.306 496 96.039 160 96.039"></polygon>
					<path d="M176.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,176.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,176.984,464.344Z"></path>
					<path d="M400.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,400.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,400.984,464.344Z"></path>
				</svg>
			</div>
		</div>
		<div className="flex justify-between p-4 space-x-4 rounded-lg md:space-x-4 text-[#333] shadow blue-glassmorphism dark:bg-gray-800 dark:text-gray-100">
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none text-[#ccc] dark:text-[#ccc]">{clocksSum?.data.substring(0, 5)}</p>
				<p className="text-[#333] text-lg dark:text-[#ccc]">שעות עובדים</p>
            <div className='flex items-center justify-center space-x-1.5'>
              <h1 className='font-mono font-semibold text-[#495057] dark:text-[#ccc]'>{new Date().getFullYear()}</h1>
              <h1 className='font-mono text-[#333333] dark:text-[#ccc]'>{getMonthInHebrew2(new Date().getMonth() + 1)}</h1> 
            </div>
			</div>
      <div className={`flex justify-center p-2 align-middle rounded-lg sm:p-4 text-gray-600 ${getColor2()}`}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-700">
					<path d="M454.423,278.957,328,243.839v-8.185a116,116,0,1,0-104,0V312H199.582l-18.494-22.6a90.414,90.414,0,0,0-126.43-13.367,20.862,20.862,0,0,0-8.026,33.47L215.084,496H472V302.08A24.067,24.067,0,0,0,454.423,278.957ZM192,132a84,84,0,1,1,136,65.9V132a52,52,0,0,0-104,0v65.9A83.866,83.866,0,0,1,192,132ZM440,464H229.3L79.141,297.75a58.438,58.438,0,0,1,77.181,11.91l28.1,34.34H256V132a20,20,0,0,1,40,0V268.161l144,40Z"></path>
				</svg>
			</div>
		</div>
	</div>
</section>

)}


  <UnderTopBoxes />
  
  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mr-4 ml-4 mt-2 mb-5`}>
 

<div class="w-full bg-white border p-4 h-[400px] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative top-2 md:top-0">
      <div className="flex w-full items-center justify-between px-2">
        <h1 className="text-[#495057] dark:text-[#ccc] text-lg font-extrabold font-mono">{incomeCurrentYear}</h1>
        <h1 className="text-[#495057] dark:text-[#ccc] tracking-wide text-lg font-bold">טבלת הכנסות/הוצאות שנתית</h1>
      </div>
      {(totalWares + totalPermanent + totalChangeable + totalSal) > 0 ? (
        <div className='relative top-2.5'>
        <Chart options={radar.options} series={radarSeries} type="polarArea" height={360}/>
      </div>
      ) : (
        <div className="px-4 pb-2 flex items-center justify-center relative -bottom-5">
          <img class="block h-72 object-cover rounded-md " src="https://www.gitaa.in/img/NoRecordFound.png" alt="" />
        </div>
      )}
      
    </div>

    <div class="w-full relative bg-white h-[400px] rounded-xl shadow dark:bg-gray-800 top-2.5 md:top-0">
  <div className="flex items-center justify-between p-4 relative bottom-[3px]">
   
    { (dashTasks?.data && dashTasks?.data.length) ? (<div className="flex justify-center space-x-1 text-gray-800">

  <div class="inline-flex mt-2 xs:mt-0 relative left-1">
      <div class="px-[3px] py-[3px] text-sm font-medium text-white bg-gray-700 rounded-l-md hover:bg-gray-900 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
          <KeyboardBackspaceIcon />
      </div>
      <div class="px-[3px] py-[3px] text-sm font-medium text-white bg-sky-700 border-0 border-l border-gray-700 rounded-r-md hover:bg-sky-800 dark:bg-sky-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-sky-800 dark:hover:text-white">
          <KeyboardBackspaceIcon className='rotate-180'/>
      </div>
  </div>

</div>) : (
      <div></div>
    ) }   
   <div className='flex flex-col items-end -space-y-1'>
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
      {/* <AddTaskIcon className="text-[#ccc]"/> */}
      <svg className='relative top-[1px]' width="24" height="24" viewBox="0 0 38 38" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.10714 0C3.75264 0 2.45362 0.538072 1.49585 1.49585C0.538072 2.45362 0 3.75264 0 5.10714V29.4643C0 30.8188 0.538072 32.1178 1.49585 33.0756C2.45362 34.0334 3.75264 34.5714 5.10714 34.5714H18.0714C17.5227 33.8418 17.0607 33.0508 16.6949 32.2143H5.10714C4.3778 32.2143 3.67832 31.9246 3.1626 31.4088C2.64687 30.8931 2.35714 30.1936 2.35714 29.4643V5.10714C2.35714 3.58914 3.58914 2.35714 5.10714 2.35714H29.4643C30.9823 2.35714 32.2143 3.58914 32.2143 5.10714V16.6949C33.0507 17.0602 33.8417 17.5216 34.5714 18.0699V5.10714C34.5714 3.75264 34.0334 2.45362 33.0756 1.49585C32.1178 0.538072 30.8188 0 29.4643 0H5.10714ZM8.64286 10.989C7.60094 10.989 6.60169 11.4029 5.86494 12.1397C5.12819 12.8764 4.71429 13.8757 4.71429 14.9176C4.71429 15.9595 5.12819 16.9587 5.86494 17.6955C6.60169 18.4322 7.60094 18.8461 8.64286 18.8461C9.68478 18.8461 10.684 18.4322 11.4208 17.6955C12.1575 16.9587 12.5714 15.9595 12.5714 14.9176C12.5714 13.8757 12.1575 12.8764 11.4208 12.1397C10.684 11.4029 9.68478 10.989 8.64286 10.989ZM7.07143 14.9176C7.07143 14.5008 7.23699 14.1011 7.53169 13.8064C7.82639 13.5117 8.22609 13.3461 8.64286 13.3461C9.05963 13.3461 9.45933 13.5117 9.75403 13.8064C10.0487 14.1011 10.2143 14.5008 10.2143 14.9176C10.2143 15.3343 10.0487 15.734 9.75403 16.0287C9.45933 16.3234 9.05963 16.489 8.64286 16.489C8.22609 16.489 7.82639 16.3234 7.53169 16.0287C7.23699 15.734 7.07143 15.3343 7.07143 14.9176ZM4.71429 25.9239C4.71429 24.8819 5.12819 23.8827 5.86494 23.1459C6.60169 22.4092 7.60094 21.9953 8.64286 21.9953C9.68478 21.9953 10.684 22.4092 11.4208 23.1459C12.1575 23.8827 12.5714 24.8819 12.5714 25.9239C12.5714 26.9658 12.1575 27.965 11.4208 28.7018C10.684 29.4385 9.68478 29.8524 8.64286 29.8524C7.60094 29.8524 6.60169 29.4385 5.86494 28.7018C5.12819 27.965 4.71429 26.9658 4.71429 25.9239ZM8.64286 24.3524C8.22609 24.3524 7.82639 24.518 7.53169 24.8127C7.23699 25.1074 7.07143 25.5071 7.07143 25.9239C7.07143 26.3406 7.23699 26.7403 7.53169 27.035C7.82639 27.3297 8.22609 27.4953 8.64286 27.4953C9.05963 27.4953 9.45933 27.3297 9.75403 27.035C10.0487 26.7403 10.2143 26.3406 10.2143 25.9239C10.2143 25.5071 10.0487 25.1074 9.75403 24.8127C9.45933 24.518 9.05963 24.3524 8.64286 24.3524ZM15.3214 12.5714C15.0089 12.5714 14.7091 12.6956 14.4881 12.9166C14.267 13.1377 14.1429 13.4374 14.1429 13.75C14.1429 14.0626 14.267 14.3624 14.4881 14.5834C14.7091 14.8044 15.0089 14.9286 15.3214 14.9286H28.6786C28.9912 14.9286 29.2909 14.8044 29.5119 14.5834C29.733 14.3624 29.8571 14.0626 29.8571 13.75C29.8571 13.4374 29.733 13.1377 29.5119 12.9166C29.2909 12.6956 28.9912 12.5714 28.6786 12.5714H15.3214ZM27.5 37.7143C30.209 37.7143 32.807 36.6381 34.7226 34.7226C36.6381 32.807 37.7143 30.209 37.7143 27.5C37.7143 24.791 36.6381 22.193 34.7226 20.2774C32.807 18.3619 30.209 17.2857 27.5 17.2857C24.791 17.2857 22.193 18.3619 20.2774 20.2774C18.3619 22.193 17.2857 24.791 17.2857 27.5C17.2857 30.209 18.3619 32.807 20.2774 34.7226C22.193 36.6381 24.791 37.7143 27.5 37.7143V37.7143ZM27.5 20.4286C27.7084 20.4286 27.9082 20.5114 28.0556 20.6587C28.2029 20.8061 28.2857 21.0059 28.2857 21.2143V26.7143H33.7857C33.9941 26.7143 34.194 26.7971 34.3413 26.9444C34.4887 27.0918 34.5714 27.2916 34.5714 27.5C34.5714 27.7084 34.4887 27.9082 34.3413 28.0556C34.194 28.2029 33.9941 28.2857 33.7857 28.2857H28.2857V33.7857C28.2857 33.9941 28.2029 34.194 28.0556 34.3413C27.9082 34.4887 27.7084 34.5714 27.5 34.5714C27.2916 34.5714 27.0918 34.4887 26.9444 34.3413C26.7971 34.194 26.7143 33.9941 26.7143 33.7857V28.2857H21.2143C21.0059 28.2857 20.8061 28.2029 20.6587 28.0556C20.5114 27.9082 20.4286 27.7084 20.4286 27.5C20.4286 27.2916 20.5114 27.0918 20.6587 26.9444C20.8061 26.7971 21.0059 26.7143 21.2143 26.7143H26.7143V21.2143C26.7143 21.0059 26.7971 20.8061 26.9444 20.6587C27.0918 20.5114 27.2916 20.4286 27.5 20.4286V20.4286ZM5.89286 4.71429C5.58028 4.71429 5.28051 4.83846 5.05948 5.05948C4.83846 5.28051 4.71429 5.58028 4.71429 5.89286C4.71429 6.20543 4.83846 6.50521 5.05948 6.72623C5.28051 6.94726 5.58028 7.07143 5.89286 7.07143H28.6786C28.9912 7.07143 29.2909 6.94726 29.5119 6.72623C29.733 6.50521 29.8571 6.20543 29.8571 5.89286C29.8571 5.58028 29.733 5.28051 29.5119 5.05948C29.2909 4.83846 28.9912 4.71429 28.6786 4.71429H5.89286Z"
          fill="#ccc"></path>
      </svg>
    </div>
    <div className='flex items-center justify-center space-x-1' >
    <h1 className="text-gray-500 font-extrabold font-mono dark:text-gray-50 text-sm">מטלות</h1>
    <h1 className="text-gray-500 font-extrabold font-mono dark:text-gray-50">{dashTasks?.data.length}</h1>
    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
        </svg>
  </div>
  </div>
  
   </div>
        {(dashTasks?.data && dashTasks?.data.length) ? (
          <>
          <div className="h-[0.5px] bg-gray-300 dark:bg-gray-500 relative bottom-2 mx-4"/>
          <div className={`h-[280px] overflow-y-auto pb-3 scrollbar-none`}>
  {/* <div className={`h-[280px] overflow-y-auto pb-3 ${scroll ? 'scrollbar' : 'scrollbar-none'}`} onMouseOver={()=> setScroll(true)} onMouseOut={()=> setScroll(false)}> */}
  <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <div className={`flex flex-col px-4 space-y-1`} {...provided.droppableProps} ref={provided.innerRef}>
                {dashTasks?.data.map(({id, description, finish, number, color}, index) => {
                  return (
                    <Draggable key={number} draggableId={number.toString()} index={number}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className={`flex items-center justify-between pl-4 h-fit py-[1px] rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-900/50 dark:hover:bg-[#343A40] dark:rounded w-full border-r-[3px] border-r-gray-300 dark:border-r-4 dark:border-r-gray-400`}>
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
      {/* <RemoveCircleOutlineOutlinedIcon className="text-gray-500 hover:text-red-400 dark:text-blue-500 hover:rotate-90 transition-all duration-300 dark:hover:text-rose-400 cursor-pointer" onClick={()=> handleAlert(id)}/> */}
      {/* <svg width="15" height="15" fill="currentColor" class="w-5 h-5 cursor-pointer hover:rotate-12 mr-2 text-red-500 dark:text-[#ccc]" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg" onClick={()=> handleAlert(id)}>
          <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
          </path>
      </svg> */}
      </div>
    <div className='flex items-center justify-center'>
    <div className={`flex items-center justify-center ${finish ? 'bg-pink-400 text-white' : (color == "red" ? 'text-white bg-red-500' : color == "yellow" ? 'text-[#343A40] bg-yellow-500' : color == "green" ? 'text-white bg-green-500' : color == "blue" ? 'text-white bg-blue-500' : 'text-white bg-blue-500')} space-x-[2px] w-fit h-fit px-1 py-[1px] mr-5 rounded-md`}>
      {finish ? (
        <h1 className={`text-[9px] font-semibold`}>הסתיים</h1>
      ) : (
        <h1 className={`text-[9px] font-semibold`}>{`${color == "red" ? 'חשוב מאוד' : color == "yellow" ? 'חשוב' : color == "green" ? 'לא חשוב' : color == "blue" ? 'קצת חשוב' : 'אין דירוג'}`}</h1>
      )}
        {/* <AccessTimeIcon style={{fontSize: '12px'}} className="text-white"/> */}
    </div>
    <h1 className={`font-sans font-medium text-right text-[10px] xxss:text-xs mmu:text-sm text-gray-500 dark:text-neutral-300 mr-2 ${finish && 'line-through'} relative right-1`}>{description}</h1>
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
          <div className="px-4 pb-2 flex items-center justify-center relative bottom-6">
            <img class="block h-64 object-cover rounded-md mb-3" src="https://www.gitaa.in/img/NoRecordFound.png" alt="" />
            {/* <h1 className="text-center font-bold font-mono text-2xl tracking-wide dark:text-gray-100 text-[#373D3F]">אין נתונים להציג</h1> */}
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
            {/* <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} onKeyDown={handleKeyPress}
                   className="border border-transparent w-full bg-gray-50 dark:bg-gray-700 focus:outline-none text-sm h-8 text-right flex items-center text-gray-600 placeholder:text-right dark:text-white" placeholder=".... תרשום משהו" /> */}
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
        {/* { (dashTasks && dashTasks.length) ? <Pagination className="relative top-3 left-3" shape="rounded"  variant="outlined" count={3} color="primary" /> : (
      <div></div>
    ) }           */}
    </div>
      </div>

    </div>




 {hebrew ? (
   <div class={`${tableMode && 'hidden'} col-span-2 px-3 grid grid-cols-1 gap-2 ml-1 mt-6 mb-10`}>
   <div class="relative flex min-w-0 flex-col break-words rounded-2xl shadow border-0 border-solid bg-white dark:bg-gray-800 bg-clip-border">
     <div class="flex justify-between items-center mb-0 rounded-t-2xl border-b-0 border-solid bg-white dark:bg-gray-800 p-6 pb-0">
     <div className='relative bottom-1'>
<div className='flex items-center justify-center relative space-x-1'>

<div className='flex items-center space-x-1'>
<PendingActionsOutlinedIcon className='text-[#ccc]'/>

<h2 class="text-xl font-sans text-gray-600 font-bold dark:text-[#ccc]">Employee Management table</h2>
<button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">

<div onMouseOver={() => setTooltipStatus2(1)} onMouseOut={() => setTooltipStatus2(0)}>
<InformationCircleIcon 
strokeWidth={2} 
className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
/>
</div>
{tooltipStatus2 == 1 && (
               <div role="tooltip" className="z-50 w-64 absolute left-48 ml-0 mr-12 transition duration-150 ease-in-out shadow-lg bg-white p-4 rounded">
                  
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
</div>
</div>

<h2 class="text-sm text-gray-500 text-left dark:text-neutral-300 relative left-1">Employee Management table</h2>
<div className="flex items-center justify-start space-x-1">
<svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
</svg>
<h1 className="text-gray-500 font-extrabold font-mono dark:text-gray-50">13</h1>

<h1 className="text-gray-500 font-semibold text-sm dark:text-gray-50">Tasks</h1>

</div>
</div>

<div>
<label className="inline-flex items-center relative right-1.5 p-2 rounded-md cursor-pointer text-gray-100">
<input type="checkbox" className="hidden peer" />
<span className="hidden xru:inline px-4 py-2 rounded-l-md bg-sky-600 peer-checked:bg-gray-700">{hebrew ? "All Tasks" : "כל המשימות"}</span>
<span className="hidden xru:inline px-4 py-2 rounded-r-md bg-gray-700 peer-checked:bg-sky-600">{hebrew ? "Not finished" : "שלא הסתיימו"}</span>
<div class="relative left-4 p-3 bg-purple-200 group hover:bg-purple-100 transition ease-in duration-200 rounded-xl" onClick={()=> setTaskChart(true)}>
   <InsightsIcon className="text-purple-500 group-hover:scale-110 transition ease-in duration-200"/>
</div>
</label>
<div className="flex items-center justify-end relative top-1 group space-x-1 cursor-pointer" onClick={()=> navigate("/workers-tasks")}>
<svg class={`h-6 w-6 text-green-500 group-hover:-translate-x-1 mr-1 leading-normal transition-all duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
</svg>
<h2 class="text-sm font-medium text-red-300 group-hover:text-red-400">manage tasks</h2>
</div>
</div>


     </div>
     <div class="flex-auto pb-2">
       <div class={`overflow-x-auto h-fit max-h-[450px] pt-6 px-4 overflow-y-scroll ${scroll ? 'scrollbar' : 'scrollbar-none'}`} onMouseOver={()=> setScroll(true)}  onMouseOut={()=> setScroll(false)}>
         <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
           <thead class="align-bottom sticky top-0 bg-white opacity-70 dark:bg-gray-800">
           

<tr className="border-b-[1px] border-b-gray-300">
<th class="px-6 py-3 text-left text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">Employee</th>
<th class="px-6 py-3 text-center text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">End Date</th>
<th class="px-6 py-3 text-center text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">Status</th>
<th class="px-6 py-3 text-center text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">Priority</th>
<th class="px-6 py-3 text-center text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">Rating</th>
<th class="px-6 py-3 text-center text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">Task</th>
</tr>
</thead>
<tbody class="bg-white divide-y divide-gray-200">

{tasks?.data.content.map((task, index) => (
<tr key={task.id} className="dark:bg-gray-800">

<td class="px-6 py-3 whitespace-nowrap">
<div class="flex items-center justify-start space-x-2">
<div>
<img alt="" className="self-center flex-shrink-0 w-9 h-9 bg-center bg-cover rounded-full bg-gray-500" src={`https://source.unsplash.com/100x100/?portrait?${index}`} />
</div>
<div class="mr-4 flex flex-col items-start">

<div class="text-sm font-medium text-gray-900 dark:text-gray-100">{task.workerName}</div>
<div class="text-sm text-gray-500 dark:text-neutral-300">{task.task.substring(0, 45)}</div>
</div>

</div>

</td>

<td class={`px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-center dark:text-neutral-300 ${new Date(task.endDate) <= new Date() && 'text-gray-500 line-through dark:text-neutral-300'}`}><svg className={`${new Date(task.endDate) <= new Date() ? 'inline-block text-red-500' : 'hidden'} w-3 h-3 self-center relative bottom-[2px] right-1.5`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
     </svg>
     {task.endDate}</td>


<td class="px-6 py-3 text-center whitespace-nowrap relative" >

{task.status == "START" && (
<div>
<h1 className="font-mono text-xs text-gray-500 text-left dark:text-neutral-300">START</h1>
<div className="flex items-center justify-start bg-gray-100 h-2 rounded-full mt-2">
<div className="bg-yellow-500 h-full rounded-full w-1/5"></div>
</div>
</div>
)}
{task.status == "END" && (
<div>
<h1 className="font-mono text-xs text-gray-500 text-left dark:text-neutral-300">END</h1>
<div className="flex items-center justify-start bg-gray-100 h-2 rounded-full mt-2">
<div className="bg-green-500 h-full rounded-full w-[100%]"></div>
</div>
</div>
)}
{task.status == "PROCESS" && (
<div>
<h1 className="font-mono text-xs text-gray-500 text-left dark:text-neutral-300">PROCESS</h1>
<div className="flex items-center justify-start bg-gray-100 h-2 rounded-full mt-2">
<div className="bg-purple-500 h-full rounded-full w-2/5"></div>
</div>
</div>
)}
{task.status == "PENDING" && (
<div>
<h1 className="font-mono text-xs text-gray-500 text-left dark:text-neutral-300">PENDING</h1>
<div className="flex items-center justify-start bg-gray-100 h-2 rounded-full mt-2">
<div className="bg-pink-500 h-full rounded-full w-3/5"></div>
</div>
</div>
)}
</td>
<td className="flex items-center justify-center mt-5 text-center text-xs">
 <div className={`flex items-center justify-center ${task.priority == "FINISHED" ? "bg-green-500 text-white" : task.priority == "VERY_LOW" ? "bg-blue-300 text-blue-600" : task?.priority == "VERY_HIGH" ? "bg-red-300 text-red-600 " : task?.priority == "HIGH" ? "bg-red-200 text-red-600" : task?.priority == "LOW" ? "bg-yellow-300 text-[#333]" : "bg-gray-400"} ${task.priority == "VERY_HIGH" && 'animate-pulse'} py-[1px] px-2 w-fit text-xs font-semibold rounded-md`}>
 {task.priority == "VERY_HIGH" && <NotificationImportantOutlinedIcon className='animate-pulse' style={{fontSize: '15px'}} fontSize="small"/>}{task.priority}
   </div>
 </td>
<td class="px-6 py-3 text-center whitespace-nowrap">
<ul class="flex justify-center">
<li>
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="currentColor"
class="mr-1 h-4 w-4 text-yellow-500">
<path
fill-rule="evenodd"
d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
clip-rule="evenodd" />
</svg>
</li>
<li>
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="currentColor"
class="mr-1 h-4 w-4 text-yellow-500">
<path
fill-rule="evenodd"
d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
clip-rule="evenodd" />
</svg>
</li>
<li>
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="currentColor"
class="mr-1 h-4 w-4 text-yellow-500">
<path
fill-rule="evenodd"
d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
clip-rule="evenodd" />
</svg>
</li>
<li>
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="currentColor"
class="mr-1 h-4 w-4 text-yellow-500">
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
</li>
<li>
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="currentColor"
class="mr-1 h-4 w-4 text-yellow-500">
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
</li>
</ul>    
</td>

     <td class="px-6 py-3 text-center whitespace-nowrap">
<div class="text-center px-3 py-[2px] text-xs leading-5 cursor-pointer inline-flex w-fit items-center justify-center rounded-md bg-blue-100 dark:bg-slate-600 text-blue-500" onClick={()=> getTask(task.id)}>
<h1 className='tracking-wide font-semibold'>TASK</h1>
</div>
</td>

</tr>
))}


</tbody>
</table>
       </div>
       <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
           <div className='hidden xru:flex items-center justify-center space-x-1 text-gray-700 dark:text-[#ccc]'>
              <h1 className='font-mono '> {tasks?.data.totalElements} records</h1>
           </div>
        <Pagination
          count={tasks?.data.totalPages}
          page={page + 1}
          onChange={(event, value) => {setPage(value - 1)
          setTimeout(()=> {
            fetch()
          }, 250)}}
          color="primary"
          variant="outlined"
          size={windowWidth > 650 ? 'medium' : 'small'}
          shape="rounded"
          disabled={tasks?.data.totalPages === 1}
          sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}
          renderItem={(item) => {
            switch (item.type) {
              case 'previous':
                return (
                  <PaginationItem
                    {...item}
                    onClick={handlePrevClick}
                    disabled={page + 1 === 1}
                  />
                );
              case 'next':
                return (
                  <PaginationItem
                    {...item}
                    onClick={handleNextClick}
                    disabled={page + 1 === tasks?.data.totalPages}
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
 </div>
 ) : (
  <div class={`${tableMode && 'hidden'} col-span-2 px-3 pb-2 grid grid-cols-1 gap-2 ml-1 mt-8 mb-8`}>
  <div class="relative flex min-w-0 flex-col break-words rounded-2xl shadow border-0 border-solid bg-white dark:bg-gray-800 bg-clip-border">
    <div class="flex justify-between items-center mb-0 rounded-t-2xl border-b-0 border-solid bg-white dark:bg-gray-800 px-6 pt-6 pb-0">
   
<div>

<label className="inline-flex items-center relative right-1.5 p-2 rounded-md cursor-pointer text-gray-100">
<input type="checkbox" className="hidden peer" />
<span className="hidden xru:inline px-4 py-2 rounded-l-md bg-sky-600 peer-checked:bg-gray-700">{hebrew ? "All Tasks" : "כל המשימות"}</span>
<span className="hidden xru:inline px-4 py-2 rounded-r-md bg-gray-700 peer-checked:bg-sky-600">{hebrew ? "Not finished" : "שלא הסתיימו"}</span>

</label>

</div>

<div className='relative bottom-1'>
<div className='flex items-center justify-center relative space-x-1'>
<button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">

<div onMouseOver={() => setTooltipStatus2(1)} onMouseOut={() => setTooltipStatus2(0)}>
<InformationCircleIcon 
strokeWidth={2} 
className="text-blue-gray-500 w-5 h-5 cursor-pointer relative" 
/>
</div>
{tooltipStatus2 == 1 && (
              <div role="tooltip" className="z-50 w-64 absolute left-0 ml-0 mr-12 transition duration-150 ease-in-out shadow-lg bg-white p-4 rounded">
                 
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
<div className='flex items-center space-x-1'>
<h2 class="text-xl font-sans text-gray-600 font-bold dark:text-[#ccc]">טבלת משימות עובדים</h2>
<PendingActionsOutlinedIcon className='text-[#ccc]'/>
</div>
</div>
{/* <h2 class="text-sm text-gray-500 text-right dark:text-neutral-300">טבלת משימות עובדים</h2> */}
<div className="flex items-center justify-end space-x-1">
<QueryStatsIcon className="text-purple-500 cursor-pointer hover:scale-110 transition ease-in duration-200 relative right-2" onClick={()=> setTaskChart(true)}/>
<h1 className="text-gray-500 font-semibold text-sm dark:text-gray-50">משימות</h1>
<h1 className="text-gray-500 font-extrabold font-mono dark:text-gray-50">{tasks?.data.totalElements}</h1>
<svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
</svg>
</div>
</div>
    </div>
    <div class="flex-auto pb-2">
    <div class={`overflow-x-auto h-fit max-h-[450px] pt-2 px-4 overflow-y-scroll scrollbar-none hidden md:block`} >
      {/* <div class={`overflow-x-auto h-fit max-h-[450px] pt-6 px-4 overflow-y-scroll ${scroll ? 'scrollbar' : 'scrollbar-none'}`} onMouseOver={()=> setScroll(true)}  onMouseOut={()=> setScroll(false)}> */}
        <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
          <thead class="align-bottom sticky top-0 bg-white opacity-70 dark:bg-gray-800">
          

<tr className="border-b-[1px] border-b-gray-300">
<th class="px-6 py-3 text-center text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">משימה</th>
<th class="px-6 py-3 text-center text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">דירוג</th>
<th class="px-6 py-3 text-center text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">דחיפות</th>
<th class="px-6 py-3 text-center text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">סטטוס</th>
<th class="px-6 py-3 text-center text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">תאריך סיום</th>
<th class="px-6 py-3 text-right text-md font-bold text-gray-900 dark:text-gray-100 tracking-wider">שם עובד/ת</th>
</tr>
</thead>
<tbody class="bg-white divide-y divide-gray-200 dark:divide-[#ccc]">

{tasks?.data.content.map((task, index) => (
<tr key={task.id} className="dark:bg-gray-800">
<td class="px-6 py-3 text-center whitespace-nowrap">
<div class="text-center px-3 py-[2px] text-xs leading-5 cursor-pointer inline-flex w-fit items-center justify-center rounded-md bg-blue-100 dark:bg-slate-600 text-blue-500" onClick={()=> getWorkerTask(task.id)}>
<h1>משימה</h1>
</div>
</td>
<td class="px-6 py-3 text-center whitespace-nowrap">
  {task.rating == "ONE" && (
     <label for="one-star" class="flex items-center ml-2">
     <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>First star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Second star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Third star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fourth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fifth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
 </label>
  )}
  {task.rating == "TWO" && (
     <label for="two-stars" class="flex items-center ml-2">
     <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>First star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Second star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Third star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fourth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fifth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
 </label>
  )}
  {task.rating == "THREE" && (
    <label for="three-stars" class="flex items-center ml-2">
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
</label>
  )}
  {task.rating == "FOUR" && (
    <label for="four-stars" class="flex items-center ml-2">
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
</label>
  )}
  {task.rating == "FIVE" && (
    <label for="five-stars" class="flex items-center ml-2">
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
</label>
  )}

</td>

<td className="flex items-center justify-center mt-5 text-center text-xs">
<div className={`flex items-center justify-center ${task.priority == "FINISHED" ? "bg-green-500 text-white" : task.priority == "VERY_LOW" ? "bg-blue-300 text-blue-600" : task?.priority == "VERY_HIGH" ? "bg-red-300 text-red-600 " : task?.priority == "HIGH" ? "bg-red-200 text-red-600" : task?.priority == "LOW" ? "bg-yellow-300 text-[#333]" : "bg-gray-400"} ${task.priority == "VERY_HIGH" && 'animate-pulse'} py-[1px] px-2 w-fit text-xs font-semibold rounded-md`}>
{task.priority == "VERY_HIGH" && <NotificationImportantOutlinedIcon className='animate-pulse' style={{fontSize: '15px'}} fontSize="small"/>}{task.priority == "FINISHED" ? "הסתיים" : task.priority == "LOW" ? "דחוף" : task.priority == "VERY_LOW" ? "לא דחוף" : task.priority == "HIGH" ? "דחוף מאוד" : task.priority == "VERY_HIGH" ? "קריטי" : "-"}
  </div>
</td>
<td class="px-6 py-3 text-center whitespace-nowrap relative" >

{task.status == "START" && (
<div>
<h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">התחלה</h1>
<div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
<div className="bg-yellow-500 h-full rounded-full w-1/5"></div>
</div>
</div>
)}
{task.status == "END" && (
<div>
<h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">הסתיים</h1>
<div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
<div className="bg-green-500 h-full rounded-full w-[100%]"></div>
</div>
</div>
)}
{task.status == "PROCESS" && (
<div>
<h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">בתהליך</h1>
<div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
<div className="bg-purple-500 h-full rounded-full w-2/5"></div>
</div>
</div>
)}
{task.status == "PENDING" && (
<div>
<h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">בדיקה</h1>
<div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
<div className="bg-pink-500 h-full rounded-full w-3/5"></div>
</div>
</div>
)}
</td>

<td class={`px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-center dark:text-neutral-300 ${new Date(task.endDate) <= new Date() && 'text-gray-500 line-through dark:text-neutral-300'}`}><svg className={`${new Date(task.endDate) <= new Date() ? 'inline-block text-red-500' : 'hidden'} w-3 h-3 self-center relative bottom-[2px] right-1.5`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>{task.endDate}</td>
<td class="px-6 py-3 whitespace-nowrap">
<div class="flex items-center justify-end">

<div class="mr-4 flex flex-col items-end">
<div class="font-semibold text-gray-700 tracking-wide dark:text-indigo-300">{task.workerName}</div>
<div class="text-sm text-gray-500 dark:text-neutral-300 hidden mdf:inline">{task.task.substring(0, 39)}</div>
</div>
<div>
<img alt="" className="self-center flex-shrink-0 w-9 h-9 bg-center bg-cover rounded-full bg-gray-500" src={task.image ? task.image : `https://source.unsplash.com/100x100/?portrait?${index}`} />
</div>
</div>
</td>
</tr>
))}


</tbody>
</table>
      </div>
      <div className='grid grid-cols-1 gap-3 md:hidden px-4 mt-2'>
              {tasks?.data.content.map(supplier => (
                // <div className={`p-4 ${globalTheme == "light" ? 'bg-white shadow rounded-lg' : 'blue-glassmorphism hover:bg-gray-900 shadow rounded'} flex flex-col space-y-2`}>
                <div className={`p-4 ${globalTheme != "light" && 'blue-glassmorphism hover:bg-gray-900'} shadow rounded-xl flex flex-col space-y-2`}>

                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono text-gray-700 dark:text-[#ccc] font-semibold'>{supplier.workerName}</div>
                <div className='text-right text-[#333] font-semibold dark:text-[#ccc]'>שם עובד</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono text-gray-700 dark:text-[#ccc]'>{supplier.startDate}</div>
                <div className='text-right text-[#333] font-semibold dark:text-[#ccc]'>תאריך משימה</div>
                </div>
               
                <div className='flex items-center justify-end space-x-4'>
            <div className={`flex items-center justify-center ${supplier.priority == "FINISHED" ? "bg-green-500 text-white" : supplier.priority == "VERY_LOW" ? "bg-blue-300 text-blue-600" : supplier?.priority == "VERY_HIGH" ? "bg-red-300 text-red-600 " : supplier?.priority == "HIGH" ? "bg-red-200 text-red-600" : supplier?.priority == "LOW" ? "bg-yellow-300 text-[#333]" : "bg-gray-400"} ${supplier.priority == "VERY_HIGH" && 'animate-pulse'} py-[2.5px] px-2 w-fit text-xs font-semibold rounded-md`}>
              {supplier.priority == "VERY_HIGH" && <NotificationImportantOutlinedIcon className='animate-pulse' style={{fontSize: '15px'}} fontSize="small"/>}{supplier.priority == "FINISHED" ? "הסתיים" : supplier.priority == "LOW" ? "דחוף" : supplier.priority == "VERY_LOW" ? "לא דחוף" : supplier.priority == "HIGH" ? "דחוף מאוד" : supplier.priority == "VERY_HIGH" ? "קריטי" : "-"}
            </div>
                <div className='text-right text-[#333] font-semibold dark:text-[#ccc]'>דחיפות</div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                <div className='text-right font-mono text-gray-700 dark:text-[#ccc]'>{supplier.endDate}</div>
                <div className='text-right text-[#333] font-semibold dark:text-[#ccc]'>יעד סיום</div>
                </div>
                

                
                <div className='flex items-center justify-end space-x-4 '>
                <div className='text-right font-mono dark:text-[#ccc]'>
                {supplier.status == "START" && (
    <div className=''>
      <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">התחלה</h1>
    <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-yellow-500 h-full rounded-full w-1/5"></div>
    </div>
    </div>
    )}
    {supplier.status == "END" && (
      <div>
        <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">הסתיים</h1>
        <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-green-500 h-full rounded-full w-[100%]"></div>
    </div>
      </div>
    )}
    {supplier.status == "PROCESS" && (
      <div>
         <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">בתהליך</h1>
      <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-purple-500 h-full rounded-full w-2/5"></div>
    </div>
      </div>
    )}
    {supplier.status == "PENDING" && (
      <div>
        <h1 className="font-mono text-xs text-gray-500 text-right dark:text-neutral-300">בדיקה</h1>
        <div className="flex items-center justify-end bg-gray-100 h-2 rounded-full mt-2">
      <div className="bg-pink-500 h-full rounded-full w-3/5"></div>
    </div>
      </div>
    )}
                </div>
                <div className='text-right text-[#333] font-semibold dark:text-[#ccc]'>סטטוס</div>
                </div>
                <div className='flex items-center justify-end -space-x-2 relative bottom-1'>
                <div class="px-6 py-3 text-center whitespace-nowrap">
                    {/* <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right flex justify-end"> */}
                    {supplier?.rating == "ONE" && (
     <label for="one-star" class="flex items-center ml-2">
     <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>First star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Second star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Third star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fourth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fifth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
 </label>
  )}
  {supplier?.rating == "TWO" && (
     <label for="two-stars" class="flex items-center ml-2">
     <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>First star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Second star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Third star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fourth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fifth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
 </label>
  )}
  {supplier?.rating == "THREE" && (
    <label for="three-stars" class="flex items-center ml-2">
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
</label>
  )}
  {supplier?.rating == "FOUR" && (
    <label for="four-stars" class="flex items-center ml-2">
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
</label>
  )}
  {supplier?.rating == "FIVE" && (
    <label for="five-stars" class="flex items-center ml-2">
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
</label>
  )}
                    {/* </dd>    */}
</div>
                <div className='text-right font-semibold text-[#333] dark:text-[#ccc]'>דירוג</div>
                </div>
                <div className='flex items-center justify-end space-x-4 relative top-1'>
             
              <button type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=> getWorkerTask(supplier.id)}>
                  <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                 משימה
              </button>
             
                </div>
              </div>
              ))}
            </div>
      <nav class="flex flex-col mmu:flex-row justify-between items-start mmu:items-center space-y-3 md:space-y-0 p-4" >
           
           <div className="flex items-center justify-start relative left-1 top-1 group space-x-1 cursor-pointer" onClick={()=> navigate("/workers-tasks")}>
             <svg class={`h-6 w-6 text-green-500 group-hover:-translate-x-1 mr-1 leading-normal transition-all duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
             </svg>
             <h2 class="text-sm font-medium bg-red-100 rounded-xl px-2 py-[1px] text-red-600 group-hover:text-red-400">ניהול משימות</h2>
           </div>
        <Pagination
          count={tasks?.data.totalPages}
          page={page + 1}
          onChange={(event, value) => {setPage(value - 1)
          setTimeout(()=> {
            fetch()
          }, 250)}}
          color="primary"
          variant="outlined"
          size={windowWidth > 480 ? 'medium' : 'small'}
          shape="rounded"
          disabled={tasks?.data.totalPages === 1}
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
                    disabled={page + 1 === tasks?.data.totalPages}
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
</div>
 )}

 
<div className={`${(schedulerMode || globalTheme != 'light') && 'hidden'} bg-white dark:bg-gray-800 rounded-lg shadow w-[97%] mt-3 mb-8 mx-auto max-h-[780px] overflow-hidden`}>

{/* <Paper> */}
    {/* <ThemeProvider theme={themex}> */}
    <Scheduler data={schedulers?.data}>
            <ViewState currentDate={date} onCurrentDateChange={currentDateChange}/>
            {/* <EditingState onCommitChanges={(paramas)=> console.log(paramas)}/> */}
            {/* <EditingState onCommitChanges={() => setOpen(true)} /> */}
            <EditingState  />
            <IntegratedEditing />
            {/* <WeekView startDayHour={7.5} endDayHour={22}/> */}
            <MonthView />
            {/* <DayView
        startDayHour={9}
        endDayHour={14}
      /> */}
            <Toolbar />
            {/* <ViewSwitcher />  select switch for month/week */}
            <DateNavigator/>
            <TodayButton />
            <Appointments appointmentComponent={appointmentComponent} />
            <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
          />
            <AppointmentForm/>
            <DragDropProvider allowDrag={allowDrag} />
          </Scheduler>
          {/* </ThemeProvider> */}
        {/* </Paper> */}


</div>

  
    {hebrew ? (
      <div className="absolute top-[4.3rem] airx:left-64 w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Solutions</span>
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-[150px] z-10 mt-3 w-[300px] -translate-x-1/2 transform px-4 sm:px-0 ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        onClick={()=> setPay(true)}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4">
                    <a
                      href="##"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Documentation
                        </span>
                      </span>
                      <span className="block text-sm text-gray-500">
                        Start integrating products and tools
                      </span>
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
    ) : (
     
      <></>
    )}
   
     

<div data-dial-init class={`fixed bottom-6 ${hebrew ? 'right-6' : 'left-6'} group z-20`} onMouseOver={()=> setMenu(true)} onMouseOut={()=> setMenu(false)}>
    <div id="speed-dial-menu-bottom-left" class={`${menu ? 'flex flex-col' : 'hidden'} items-center mb-4 space-y-2`}>
    <div className="relative">
        <button type="button" data-tooltip-target="tooltip-share" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400" onMouseOver={()=> setScheduler(true)} onMouseOut={()=> setScheduler(false)} onClick={()=> setSchedulerMode(!schedulerMode)}>
            {/* <svg aria-hidden="true" class="w-6 h-6 -ml-px " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path></svg> */}
            {schedulerMode ? (
              <EventAvailableTwoToneIcon />
            ) : (
              <EventBusyTwoToneIcon />
            )}
        </button>
           <div class={`${!scheduler ? 'hidden' : 'block'} absolute z-10 inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm ${hebrew ? 'right-14' : 'left-14'} bottom-2 dark:bg-gray-700`} >
            {schedulerMode ? (
               <h1>Add Scheduler</h1>
            ) : (
              <h1>Remove Scheduler</h1>
            )}
        </div>
        </div>
    <div className="relative">
        <button type="button" data-tooltip-target="tooltip-share" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400" onMouseOver={()=> setTable(true)} onMouseOut={()=> setTable(false)} onClick={()=> setTableMode(!tableMode)}>
            {/* <svg aria-hidden="true" class="w-6 h-6 -ml-px " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path></svg> */}
            {tableMode ? (
              <AssignmentIndTwoToneIcon />
            ) : (
              <RemoveCircleTwoToneIcon className={`${table && 'rotate-90'}`}/>
            )}
        </button>
           <div class={`${!table ? 'hidden' : 'block'} absolute z-10 inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm ${hebrew ? 'right-14' : 'left-14'} bottom-2 dark:bg-gray-700`} >
            {tableMode ? (
              <h1>Add Workers Tasks Table</h1>
            ) : (
              <h1>Remove Workers Tasks Table</h1>
            )}
        </div>
        </div>
        <div className="relative">
        <button type="button" data-tooltip-target="tooltip-share" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400" onMouseOver={()=> setShare(true)} onMouseOut={()=> setShare(false)} onClick={()=> handleIncomeYears()}>
            {/* <svg aria-hidden="true" class="w-6 h-6 -ml-px " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path></svg> */}
            <ChangeCircleTwoToneIcon className={`${share && 'rotate-90'}`}/>
        </button>
           <div class={`${!share ? 'hidden' : 'block'} absolute z-10 inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm ${hebrew ? 'right-14' : 'left-14'} bottom-2 dark:bg-gray-700`} >
            Change Year
        </div>
        </div>
        <div className="relative">
        <button type="button" data-tooltip-target="tooltip-print" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400" onClick={()=> setFaq(true)} onMouseOver={()=> setPrints(true)} onMouseOut={()=> setPrints(false)}>
            {/* <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"></path></svg> */}
            <QuizTwoToneIcon />
        </button>
        <div class={`${!prints ? 'hidden' : 'block'} absolute z-10 inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity ${hebrew ? 'right-14' : 'left-14'} bottom-2 duration-300 bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700`}>
            Faq
        
        </div>
        </div>
        <div className="relative">
        <button type="button" data-tooltip-target="tooltip-download" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400" onMouseOver={()=> setDownload(true)} onMouseOut={()=> setDownload(false)}>
            {/* <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1.586l-.293-.293a.999.999 0 10-1.414 1.414l2 2a.999.999 0 001.414 0l2-2a.999.999 0 10-1.414-1.414l-.293.293V9z" fill-rule="evenodd"></path></svg> */}
            {/* <span class="sr-only">Download</span> */}
            <SiMicrosoftexcel size={18} className='text-green-600 group-hover:scale-110 group-hover:text-green-600 transition-all duration-300 ease-out cursor-pointer' />
        </button>
        <div class={`${!download ? 'hidden' : 'block'} absolute z-10 inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm ${hebrew ? 'right-14' : 'left-14'} bottom-2 dark:bg-gray-700`}>
            Excel
        
        </div>
        </div>
       <div className="relative">
       <button type="button" data-tooltip-target="tooltip-copy" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400" onMouseOver={()=> setChats(true)} onMouseOut={()=> setChats(false)}>
            {/* <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"></path><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"></path></svg> */}
          
            <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <QuestionAnswerTwoToneIcon className="text-gray-500" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className={`absolute -bottom-3.5 ${hebrew ? '-left-28' : 'left-[160px]'} z-50 mt-3 w-[350px] -translate-x-1/2 transform px-4 sm:px-0 rounded`}>
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
                  <div className="bg-white">
                    {chatMode ? (
                      <>
                      {(user === null || chat === null) ? (
                      <form onSubmit={e => handleSubmit(e)} className="p-8 flex justify-center items-center">
                        <div className='flex flex-col space-y-4'>
                        <input value={result?.email} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
                        <button type="submit" class="px-2 py-1 font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm">
                          כניסה
                      </button>
                      </div>
                      </form>
                      ) : (
                        <div className="h-[380px] overflow-y-auto scrollbar pr-[2px]">
                          <ChatEngine chatId={chat.id} email={result?.email}/>
                        </div>
                      )}
                      </>
                    ) : (
                      <div className="h-[400px] px-5 pt-8">
                    
                    <img src="https://aspireinternetdesign.com/wp-content/uploads/2014/12/benefits-of-live-chat-on-website.jpg" className="bg-cover"/>
                    </div>
                    )}
                  </div>
                  <div className="bg-gray-50 p-4 flex items-center justify-center">
                  {chatMode ? (
                    <button type="button" class="inline-flex justify-center w-full px-8 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={()=> setChatMode(!chatMode)}>
                    סגור צ'אט
                    </button>
                  ) : (
                   <button type="button" class="inline-flex justify-center w-full px-8 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={()=> setChatMode(!chatMode)}>
                    התחל צ'אט
                   </button>
                  )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

        </button>
        <div class={`${!chats ? 'hidden' : 'block'} absolute z-10 inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 ${hebrew ? 'right-14' : 'left-14'} bottom-2 rounded-lg shadow-sm dark:bg-gray-700`}>
          Live Support
           
        </div>
       </div>
    </div>
    <button type="button" data-dial-toggle="speed-dial-menu-bottom-left" aria-controls="speed-dial-menu-bottom-left" aria-expanded="false" class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
        <svg aria-hidden="true" class="w-8 h-8 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        <span class="sr-only">Open actions menu</span>
    </button>
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
          {spin ? (
                      <AutorenewIcon className="animate-spin text-sky-800"/>
                    ) : (
                      <LocalPrintshopIcon className='text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600' onClick={generatePdf1}/>
                    )}            
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
          {spin ? (
                      <AutorenewIcon className="animate-spin text-sky-800"/>
                    ) : (
                      <LocalPrintshopIcon className='text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600' onClick={generatePdf2}/>
                    )}                
            <CalendarMonthIcon onClick={()=> setDateFlag(true)} className='text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600 transition-all duration-150 ease-out'/>
            <ScoreIcon className="text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600" onClick={()=> setChart(!chart)} />
          </div>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeIncomeDialog}/>
        </div>
      <div id="wares" className='w-full items-center justify-center text-center mx-auto scrollbar overflow-x-scroll '>
     
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
          {spin ? (
                      <AutorenewIcon className="animate-spin text-sky-800"/>
                    ) : (
                      <LocalPrintshopIcon className='text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600' onClick={generatePdf3}/>
                    )}               
            <CalendarMonthIcon onClick={()=> setDateFlag(true)} className='text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600 transition-all duration-150 ease-out'/>
            <ScoreIcon className="text-blue-700 cursor-pointer hover:scale-110 hover:text-blue-600" onClick={()=> setChart(!chart)} />
          </div>
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={closeIncomeDialog}/>
        </div>

      <div id="outcome" className='w-full items-center justify-center text-center mx-auto scrollbar overflow-x-scroll '>
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
          <Select onChange={handleIncomeMonths} className='bg-white text-right rounded-md px-2 w-36 h-10'>
            {months.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select> 
        </div>
        <div className='flex items-center justify-center space-x-1'>
          <Select onChange={handleIncomeYears2} className='bg-white text-right rounded-md px-2 w-36 h-10'>
            {years.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
                    </Select> 
        </div>
        <button type='submit' disabled={incomeMonth == "" || incomeYear == ""} className='bg-blue-200 px-8 py-[3px] font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg cursor-pointer'>{hebrew ? 'report' : 'הצג דו"ח'}</button>
       </form>
      </div>
    </Dialog>

    <Dialog open={taskDialog}>
      <div className='w-full py-6 px-14 flex flex-col justify-center items-center'>
      {/* <div className='flex items-center justify-end p-2'> */}
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer self-end' fontSize='large' onClick={()=> setTaskDialog(false)}/>
      {/* </div> */}
      <h1 className={`text-center sm:text-3xl ${hebrew ? "font-serif text-slate-600 text-2xl" : "font-mono text-amber-700 text-2xl"} px-2`}>{hebrew ? "add short task" : "הכנס מטלה קצרה"}</h1>
        <form onSubmit={addDashTask} className='flex space-x-4'>
                <div className='flex flex-col space-y-1'>
                  {/* <InputLabel id="demo-simple-select-label" className={`${hebrew ? "text-left" : "text-right"} w-64`}>{hebrew ? "supplier name" : "שם ספק"}</InputLabel> */}
                   
                  <TextareaAutosize id="demo-simple-select-label" className={`bg-gray-100 border shadow-md mx-auto focus:outline-none focus:ring focus:border-blue-500 my-1 h-14 rounded-xl px-2 py-2 w-80`} onChange={e => setDescription(e.target.value)}/>
                  <ul class="flex flex-row items-center justify-center">
                        <li class="mr-4 last:mr-0" onClick={()=> setColorx("blue")}>
                            <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "blue" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                <a href="#blue" class="block w-6 h-6 bg-blue-900 rounded-full">
                                </a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0" onClick={()=> setColorx("yellow")}>
                        <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "yellow" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                <a href="#yellow" class="block w-6 h-6 bg-yellow-500 rounded-full">
                                </a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0" onClick={()=> setColorx("red")}>
                        <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "red" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                <a href="#red" class="block w-6 h-6 bg-red-500 rounded-full">
                                </a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0" onClick={()=> setColorx("green")}>
                        <span class={`block p-1 transition duration-300 ease-in border-2 ${colorx == "green" && 'border-gray-500'} hover:border-gray-500 rounded-full`}>
                                <a href="#green" class="block w-6 h-6 bg-green-500 rounded-full">
                                </a>
                            </span>
                        </li>
                    </ul>
                    <ul className="mt-4 flex items-center justify-center space-x-2.5">
                {
                    colors.map((item, idx) => (
                        /* Color box */
                        <li key={idx} className="flex-none">
                            <label htmlFor={item.bg} className="block relative w-8 h-8">
                                <input id={item.bg} type="radio" defaultChecked={idx == 1 ? true : false} name="color" class="sr-only peer" />
                                <span className={`inline-flex justify-center items-center w-full h-full rounded-full peer-checked:ring ring-offset-2 cursor-pointer duration-150 ${item.bg} ${item.ring}`}>
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white absolute inset-0 m-auto z-0 pointer-events-none hidden peer-checked:block duration-150">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </label>
                        </li>
                    ))
                }
            </ul>
                  <button disabled={description == ""} type='submit' className='bg-blue-200 px-2 py-1 font-mono text-blue-600 hover:bg-blue-300 hover:text-blue-600 font-semibold rounded-lg mt-2'>{hebrew ? "Add task" : "הכנס"}</button>
                 
                </div>
              </form>
      </div>
      
    </Dialog>

    <Dialog open={taskChart}>
    <div class="relative p-4 overflow-hidden text-gray-700 bg-white shadow-lg rounded-xl w-60 md:w-72 dark:bg-gray-800 dark:text-gray-100">
    <a href="#" class="block w-full h-full">
        <div class="w-full px-2 pb-3">
            <div className="flex items-center justify-between">
            <p class="mb-4 text-2xl font-light text-gray-700 dark:text-white">
                Task Progress
            </p>
              <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out relative bottom-2 left-2 text-red-500 cursor-pointer' fontSize='large' onClick={()=> setTaskChart(false)}/>
            </div>
            <div class="flex items-center justify-between text-sm text-gray-400">
                <p>
                    Start
                </p>
                <p>
                    3/8
                </p>
            </div>
            <div class="w-full h-2 mb-4 bg-green-100 rounded-full">
                <div class="w-1/3 h-full text-xs text-center text-white bg-green-400 rounded-full">
                </div>
            </div>
            <div class="flex items-center justify-between text-sm text-gray-400">
                <p>
                    Pending
                </p>
                <p>
                    6/10
                </p>
            </div>
            <div class="w-full h-2 mb-4 bg-indigo-100 rounded-full">
                <div class="w-2/3 h-full text-xs text-center text-white bg-indigo-400 rounded-full">
                </div>
            </div>
            <div class="flex items-center justify-between text-sm text-gray-400">
                <p>
                    End
                </p>
                <p>
                    2/8
                </p>
            </div>
            <div class="w-full h-2 mb-4 bg-blue-100 rounded-full">
                <div class="w-1/4 h-full text-xs text-center text-white bg-blue-400 rounded-full">
                </div>
            </div>
            <div class="flex items-center justify-between text-sm text-gray-400">
                <p>
                    Process
                </p>
                <p>
                    8/8
                </p>
            </div>
            <div class="w-full h-2 bg-pink-100 rounded-full">
                <div class="w-full h-full text-xs text-center text-white bg-pink-400 rounded-full">
                </div>
            </div>
        </div>
    </a>
  
</div>

    </Dialog>


<Dialog open={dialog}>
    <div id="readProductModal" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:h-full">
    <div class="relative p-4 w-full max-w-xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5">
                {/* <!-- Modal header --> */}
                <div class="flex justify-between mb-4 rounded-t sm:mb-5">
                    <div>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal" onClick={closeDialog}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="text-lg text-gray-900 md:text-xl dark:text-white">
                        <h3 class="font-bold text-right">
                           שם עובד/ת
                        </h3>
                        <p class="font-bold text-gray-500 text-right">
                          {task?.workerName}
                        </p>
                        {/* <p class="font-bold text-gray-500 text-right font-mono tracking-wide">
                          {workerEmail}
                        </p> */}
                    </div>
                </div>
                <dl>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">פרטים</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{task?.task}</dd>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">תאריך התחלה</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{task?.startDate}</dd>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">תאריך סיום</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right">{task?.endDate}</dd>
                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white text-right">דירוג</dt>
                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-right flex justify-end">
                    {task?.rating == "ONE" && (
     <label for="one-star" class="flex items-center ml-2">
     <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>First star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Second star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Third star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fourth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fifth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
 </label>
  )}
  {task?.rating == "TWO" && (
     <label for="two-stars" class="flex items-center ml-2">
     <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>First star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Second star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Third star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fourth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
     <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <title>Fifth star</title>
         <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
         </path>
     </svg>
 </label>
  )}
  {task?.rating == "THREE" && (
    <label for="three-stars" class="flex items-center ml-2">
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
</label>
  )}
  {task?.rating == "FOUR" && (
    <label for="four-stars" class="flex items-center ml-2">
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
</label>
  )}
  {task?.rating == "FIVE" && (
    <label for="five-stars" class="flex items-center ml-2">
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>First star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Second star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Third star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fourth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Fifth star</title>
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
        </path>
    </svg>
</label>
  )}
                    </dd>
                </dl>
                <div class="flex flex-col justify-end items-end space-y-2 min-w-[230px]">
                    <div class="flex items-center space-x-3 sm:space-x-4">
                        <button type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=> setRate(true)}>
                            <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                           דירוג 
                        </button>               
                        {/* <button type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Preview
                        </button> */}
                    </div>              
                    <button type="button" class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeDialog}>
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        סגור
                    </button>
                </div>
                </div>
            </div>
        </div>
        </Dialog>

    <Dialog open={pay}>
         <div className="w-[24rem] h-full flex flex-col items-center justify-center pb-3 px-2 mx-auto" >
        {/* <div className="flex self-end" >
          <CloseIcon className='hover:scale-125 transition-all duration-150 ease-out text-red-600 cursor-pointer' fontSize='large' onClick={()=> setPay(false)}/>
        </div> */}
        <div class="flex self-end relative bottom-14 h-[100vh]">
      <div class="credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-white" x-data="creditCard">
        <header class="flex flex-col justify-center items-center">
        <Transition
        show={!back}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 transform scale-90"
        enterTo="opacity-100 transform scale-100"
        x-show={!back}
      >
          <div
          class={`relative ${back ? 'hidden' : 'block'} `}
          >
            <img class={`w-full h-auto`} src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-front.png" alt="front credit card"/>
            <div class="front bg-transparent text-lg w-full text-white px-12 absolute left-0 bottom-12">
              <p class="number mb-5 sm:text-xl" x-text="cardNumber !== '' ? cardNumber : '0000 0000 0000 0000'"></p>
              <div class="flex flex-row justify-between">
                <p x-text="cardholder !== '' ? cardholder : 'Card holder'"></p>
                <div class="">
                  <span x-text="expired.month"></span>
                  <span x-show="expired.month !== ''">/</span>
                  <span x-text="expired.year"></span>
                </div>
              </div>
            </div>
          </div>
          </Transition>
          <Transition
        show={back}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 transform scale-90"
        enterTo="opacity-100 transform scale-100"
        x-show={back}
      >
          <div
          class={`relative ${back ? 'block' : 'hidden'}`}
            
          >
            <img class="w-full h-auto" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-back.png" alt=""/>
            <div
              class="bg-transparent text-white text-xl w-full flex justify-end absolute bottom-20 px-8  sm:bottom-24 right-0 sm:px-12"
            >
              <div class="border border-white w-16 h-9 flex justify-center items-center">
                <p x-text="securityCode !== '' ? securityCode : 'code'"></p>
              </div>
            </div>
          </div>
          </Transition>
          <ul class="flex">
            <li class="mx-2">
              <img class="w-16" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/computop.png" alt="" />
            </li>
            <li class="mx-2">
              <img class="w-14" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/verified-by-visa.png" alt="" />
            </li>
            <li class="ml-5">
              <img class="w-7" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/mastercard-id-check.png" alt="" />
            </li>
          </ul>
        </header>
        <main class="mt-4 p-4">
          <h1 class="text-xl font-semibold text-gray-700 text-center">Card payment</h1>
          <div class="">
            <div class="my-3">
              <input
                type="text"
                class="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Card holder"
                maxlength="22"
                x-model="cardholder"
              />
            </div>
            <div class="my-3">
              <input
                type="text"
                class="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Card number"
                maxlength="19"
              />
            </div>
            <div class="my-3 flex flex-col">
              <div class="mb-2">
                <label for="" class="text-gray-700">Expired</label>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <select
                  name=""
                  id=""
                  class="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  x-model="expired.month"
                >
                  <option value="" selected disabled>MM</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <select
                  name=""
                  id=""
                  class="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  x-model="expired.year"
                >
                  <option value="" selected disabled>YY</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
                <input
                  type="text"
                  class="block w-full col-span-2 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none" onFocus={()=> setBack(true)}
                  placeholder="Security code"
                  maxlength="3"
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
        </main>
        <footer class="mt-1 p-4">
          <button
            class="submit-button px-4 py-3 rounded-full bg-blue-300 text-blue-900 focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
          >
            Pay now
          </button>
          <button className="flex justify-center font-mono text-red-400" onClick={()=> setPay(false)}>close form</button>
        </footer>
      </div>
      </div>
        </div>
    </Dialog>
   
    <Dialog open={rate} aria-labelledby="responsive-dialog-title">
    <div class="space-y-2 px-10 pb-8 pt-5">
                <h6 class="text-base text-right font-medium text-black dark:text-white">
                    דרג ביצוע משימה
                </h6>

                <div class="flex items-center mb-4">
                    <input id="five-stars" type="radio" value="" name="rating"
                        class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setRating('FIVE')}/>
                    <label for="five-stars" class="flex items-center ml-2">
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>First star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Second star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Third star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fourth star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fifth star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                    </label>
                </div>

                <div class="flex items-center">
                    <input id="four-stars" type="radio" value="" name="rating" 
                        class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setRating('FOUR')}/>
                    <label for="four-stars" class="flex items-center ml-2">
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>First star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Second star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Third star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fourth star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fifth star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                    </label>
                </div>

                <div class="flex items-center">
                    <input id="three-stars" type="radio" value="" name="rating"
                        class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setRating('THREE')}/>
                    <label for="three-stars" class="flex items-center ml-2">
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>First star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Second star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Third star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fourth star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fifth star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                    </label>
                </div>

                <div class="flex items-center">
                    <input id="two-stars" type="radio" value="" name="rating"
                        class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setRating('TWO')}/>
                    <label for="two-stars" class="flex items-center ml-2">
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>First star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Second star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Third star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fourth star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fifth star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                    </label>
                </div>

                <div class="flex items-center">
                    <input id="one-star" type="radio" value="" name="rating"
                        class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setRating('ONE')}/>
                    <label for="one-star" class="flex items-center ml-2">
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>First star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Second star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Third star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fourth star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fifth star</title>
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                    </label>
                </div>
                <button className='flex justify-center items-center mx-auto mt-2 bg-blue-500 text-white px-3 py-[1px] rounded hover:bg-blue-400 transition-all duration-300' onClick={closeRate}>סגור</button>
                <button className='flex justify-center items-center mx-auto mt-2 bg-blue-500 text-white px-3 py-[1px] rounded hover:bg-blue-400 transition-all duration-300' onClick={postRate}>דרג משימה</button>

            </div>
    </Dialog>

    <Snackbar open={rateAlert} autoHideDuration={10000} onClose={handleClose5} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose5}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? 'successfully rated the task' : 'משימה דורגה בהצלחה'}     
             </Alert>
      </Snackbar>

    
      <Snackbar open={!result?.active} autoHideDuration={10000} onClose={handleClose5} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose5}
          severity="info"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? 'you need to confirm your account from the email message in you email account!' : '!יש להיכנס לאימייל ההרשמה על מנת לאשר את החשבון'}     
             </Alert>
      </Snackbar>
      

      <Dialog open={faq}>
      <div class="max-w-[500px] mx-auto bg-white min-h-sceen py-5 px-9">
        <CloseIcon className="justify-end cursor-pointer" onClick={()=> setFaq(false)}/>
	<div class="flex flex-col items-center">
		<h2 class="font-bold text-5xl mt-5 tracking-tight">
			FAQ
		</h2>
		<p class="text-neutral-500 text-xl mt-3">
			Frequenty asked questions
		</p>
	</div>
	<div class="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> What is a SAAS platform?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					 SAAS platform is a cloud-based software service that allows users to access
					and use a variety of tools and functionality.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> How does  billing work?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					We offers a variety of billing options, including monthly and annual subscription plans,
					as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit
					card or other secure online payment method.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> Can I get a refund for my subscription?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					We offers a 30-day money-back guarantee for most of its subscription plans. If you are not
					satisfied with your subscription within the first 30 days, you can request a full refund. Refunds
					for subscriptions that have been active for longer than 30 days may be considered on a case-by-case
					basis.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> How do I cancel my subscription?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					To cancel your We subscription, you can log in to your account and navigate to the
					subscription management page. From there, you should be able to cancel your subscription and stop
					future billing.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> Can I try this platform for free?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					We offers a free trial of its  platform for a limited time. During the trial period,
					you will have access to a limited set of features and functionality, but you will not be charged.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> How do I access   documentation?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					  Documentation is available on the company's website and can be accessed by
					logging in to your account. The documentation provides detailed information on how to use the ,
					as well as code examples and other resources.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> How do I contact support?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					If you need help with the platform or have any other questions, you can contact the
					company's support team by submitting a support request through the website or by emailing
					support@We.com.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> Do you offer any discounts or promotions?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					We may offer discounts or promotions from time to time. To stay up-to-date on the latest
					deals and special offers, you can sign up for the company's newsletter or follow it on social media.
				</p>
			</details>
		</div>
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> How do we compare to other similar services?</span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
					 This platform is a highly reliable and feature-rich service that offers a wide range
					of tools and functionality. It is competitively priced and offers a variety of billing options to
					suit different needs and budgets.
				</p>
			</details>
		</div>
	</div>
</div>
 {/* <div className="w-96 px-4 pt-8">
 <CloseIcon className="justify-end cursor-pointer text-red-500 hover:text-red-400" onClick={()=> setFaq(false)}/>
	<div class="flex flex-col items-center mb-4">
		<h2 class="font-bold text-5xl mt-5 tracking-tight">
			FAQ
		</h2>
		<p class="text-neutral-500 text-xl mt-3">
			Frequenty asked questions
		</p>
	</div>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2 mb-4">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>What is your refund policy?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Do you offer technical support?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div> */}
      </Dialog>
      
      </div>
      {/* <Footer /> */}
      {hebrew ? (
        <Footer2 />
      ) : (
        <FooterHebrew />
      )}
   </div>
   </>
  );
};

export default Dashboard;