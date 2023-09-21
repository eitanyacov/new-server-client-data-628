import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
// import Dashboard from './pages/Dashboard';
import SideBarPage from './components/SideBarPage';
import ErrorPage from './pages/ErrorPage';
import Suppliers from './pages/Suppliers';
import Supplier from './pages/Supplier';
import DailyIncomeReports from './pages/DailyIncomeReports';
import Workers from './pages/Workers';
import Worker from './pages/Worker';
import Salaries from './pages/Salaries';
import SchedulerPage from './pages/SchedulerPage';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Customers from './pages/Customers';
import Customer from './pages/Customer'
import Reports from './pages/Reports';
import UpcomingPayments from './pages/UpcomingPayments';
import Receipts from './pages/Receipt';
import Quotes from './pages/Quotes';
import Quote from './pages/Quote';
import TaxInvoice from './pages/TaxInvoice';
import YearlyReports from './pages/YearlyReports';
import Restaurant from './pages/Restaurant';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import SupplierEmails from './pages/SupplierEmails';
import CustomerEmails from './pages/CustomerEmails';
import CurrentMonthInvoices from './pages/CurrentMonthInvoices';
import CurrentWaresMonthInvoices from './pages/CurrentMonthWaresInvices'
import DailyIncomeMonth from './pages/DailyIncomeMonth';
import ReceiptMonth from './pages/ReceiptsMonth';
import SupplierReports from './pages/SupplierReports';
import CustomerReports from './pages/CustomerReports';
import CustomerQuotes from './pages/CustomerQuotes';
import Inventory from './pages/Inventory';
import SupplierQuotes from './pages/SupplierQuotes';
import Kabalot from './pages/Kabalot';
import Kabala from './pages/Kabala';
import PdfPage from './pages/PdfPage';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import WorkersTasks from './pages/WorkersTasks';
import Contact from './pages/Contact'
import WorkerTasks from './pages/WorkerTasks';
import WayBill from './pages/WayBill';
import NewPage from './pages/NewPage';
import SupplierCard from './pages/SupplierCard';
import NewRegister from './pages/NewRegister';
import Dnd from './pages/Dnd';
import CustomerCard from './pages/CustomerCard';
import WorkerCard from './pages/WorkerCard';
import Chat from './pages/Chat';
import Chat2 from './pages/Chat2';
import Chat3 from './pages/Chat3';
import Dash from './pages/Dash';
import Chat4 from './pages/Chat4';
import LandingPage from './pages/LandingPage';
import Checkout1 from './pages/checkout1';
import Checkout2 from './pages/checkout2';
import Checkout3 from './pages/checkout3';
import NewReceipt from './pages/NewReceipt';
import Blog from './pages/Blog';
import NewBlog from './pages/NewBlog';
import OpenAi from './pages/OpenAi';
import AllKabalot from './pages/AllKabalot';
import NewInvoices from './pages/NewInvoices';
// import StatsReports from './pages/StatsReports';
import SubUser from './pages/SubUser';
import WorkerRole from './pages/WorkerRole';
import Roster from './pages/Roster';
import ClockIn from './pages/ClockIn';
import WorkerClock from './pages/WorkerClock';
import WorkerRoster from './pages/WorkerRoster';
import NewQuote2 from './pages/NewQuote2';
import WorkersDashboard from './pages/WorkersDashboard';
import WorkersRosters from './pages/WorkersRosters';
import RestaurantMonth from './pages/RestaurantMonth';
import Settings2 from './pages/Settings2';
import WorkersReports from './pages/WorkersReports';
import ClockInMonth from './pages/ClockInMonth';
import SuccessPage from './pages/SuccessPage';
import Payment1 from './pages/Payment1';
import WorkerEmails from './pages/WorkerEmails';
import SupplierWaybills from './pages/SupplierWaybills';
import WayBillsMonth from './pages/WayBillsMonth';


const queryClient = new QueryClient();

export const ThemeContext = React.createContext()

function App() {
  const [user, setUser] = useState({});
  const [isSSR, setIsSSR] = useState(true);
  const [theme, setTheme] = useState("light");
  const [taskState, setTaskState] = useState(false);
  const [spins, setSpins] = useState(false);
  const [yearState, setYearState] = useState(false);
  const [hebrew, setHebrew] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [globalTheme, setGlobalTheme] = useState("light");
  const [supplierIdForemails, setSupplierIdForemails] = useState("");
  const [suppId, setSuppId] = useState();
  const [custId, setCustId] = useState();
  const [reload, setReload] = useState(false);
  const [menu, setMenu] = useState(false);
  const [reloadSalary, setReloadSalary] = useState(false);
  const [chart, setChart] = useState(true);
  const [chart2, setChart2] = useState(false);
  const [dashMode, setDashMode] = useState(true);
  const [area, setArea] = useState(true);
  const [topBox, setTopBox] = useState(false);
  const [mainChart, setMainChart] = useState("שנתי")
  const [color, setColor] = useState("purple")
  const [label, setLabel] = useState(false)
  const [schedulerMode, setSchedulerMode] = useState(false)
  const [tableMode, setTableMode] = useState(false)
  const [toogleMenu, setToogleMenu] = useState(false)


  // const res = localStorage.getItem("user")
  // const result = JSON.parse(res)


  useEffect(() => {
    setIsSSR(false);
  }, []);

  useEffect(()=> {
    const res = localStorage.getItem("user")
    const result = JSON.parse(res)
    setUser(result)
    
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeContext.Provider value={{reloadSalary, setReloadSalary, toogleMenu, setToogleMenu, color, tableMode, setTableMode, schedulerMode, setSchedulerMode, label, setLabel, setColor, menu, topBox, setTopBox, dashMode, mainChart, setMainChart, setDashMode, setMenu, theme, setTheme, suppId, setSuppId, year, setYear, globalTheme, yearState, setYearState, setGlobalTheme, taskState, setTaskState, supplierIdForemails, setSupplierIdForemails, chart2, setChart2, reload, setReload, spins, setSpins, custId, setCustId, hebrew, setHebrew, chart, setChart, area, setArea}}>
    <BrowserRouter>
    {user?.id && <SideBarPage />}
      {user?.id && <Header />}
      
      <Routes>
        {!isSSR && (
          // <Route path="/" element={user?.id ? <HomePage /> : <Navigate to='/login'/>} />
          <>
          <Route path="/" element={(user?.id && user?.role != "ROLE_WORKER") ? <HomePage /> : <Navigate to='/land'/>} />
          <Route path="/workers-page" element={(user?.id &&  user?.role == "ROLE_WORKER") ? <WorkersDashboard /> : <Navigate to='/land'/>} />
          </>
        )}
        {!user?.id &&<Route path="/login" element={<Login />} />}
        {!user?.id &&<Route path="/dash" element={<Dash />} />}
        {!user?.id &&<Route path="/checkout1" element={<Checkout1 />} />}
        {!user?.id &&<Route path="/checkout2" element={<Checkout2 />} />}
        {!user?.id &&<Route path="/checkout3" element={<Checkout3 />} />}
        {!user?.id &&<Route path="/land" element={<LandingPage />} />}
        {!user?.id &&<Route path="/success-pay" element={<Payment1 />} />}
        {!user?.id &&<Route path="/success-page" element={<SuccessPage />} />}
        {!user?.id &&<Route path="/register-app" element={<NewRegister />} />}
        {!user?.id &&<Route path="/register" element={<Register />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/tutorials" element={<Home />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/contact" element={<Contact />} />}
        {(user?.id && user?.role != "ROLE_WORKER") && <Route path="/suppliers" element={<Suppliers />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/yearly-reports" element={<YearlyReports />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/workers" element={<Workers />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/worker-clock/:workerId" element={<WorkerClock />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/worker-emails/:workerId" element={<WorkerEmails/>} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/worker-roster/:workerId" element={<WorkerRoster />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/open-ai" element={<OpenAi />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/workers-tasks" element={<WorkersTasks />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/salaries" element={<Salaries />} />}
        {user?.id &&<Route path="/workers-page" element={<WorkersDashboard />} />}
        {user?.id &&<Route path="/workers-rosters" element={<WorkersRosters />} />}
        {user?.id &&<Route path="/workers-reports" element={<WorkersReports />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/dnd" element={<Dnd />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/roster" element={<Roster />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/add-receipt" element={<NewReceipt />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/add-quote" element={<NewQuote2 />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/receipts" element={<Receipts />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/way-bills" element={<WayBill />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/receipts-month" element={<ReceiptMonth />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/all-receipts" element={<AllKabalot />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/chat" element={<Chat />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/chat2" element={<Chat2 />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/chat3" element={<Chat3 />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/chat4" element={<Chat4 />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/blog" element={<Blog />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/blog2" element={<NewBlog />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/restaurant" element={<Restaurant />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/restaurant-month" element={<RestaurantMonth />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/supplier-card/:suppid" element={<SupplierCard />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/customer-card/:customerid" element={<CustomerCard />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/worker-card/:workerid" element={<WorkerCard />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/settings" element={<Settings2 />} />}

        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/workers/:workerid" element={<Worker />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/workers-tasks/:taskid" element={<WorkerTasks />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/suppliers/:supplierid" element={<Supplier />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/waybills/:supplierid" element={<SupplierWaybills />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/customers/:customerid" element={<Customer />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/invoices" element={<NewInvoices />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/customers" element={<Customers />} />}
        {!user?.id &&<Route path="/new" element={ <NewPage />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/kabalot/:customerId" element={<Kabalot />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/kabala/:kabalaId" element={<Kabala />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/tasks" element={<Tasks />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/dashboard" element={<WorkerRole />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/new-user" element={<SubUser />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/profile" element={<Profile />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/reports" element={<Reports />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/payments" element={<UpcomingPayments />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/quotes" element={<Quotes />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/quotes/:quoteId" element={<Quote />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/receipts/:invoiceTaxId" element={<TaxInvoice />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/scheduler" element={<SchedulerPage />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/daily-income" element={<DailyIncomeReports />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/inventory" element={<Inventory />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/clock-in" element={<ClockIn />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/clock-month" element={<ClockInMonth />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/waybills-month" element={<WayBillsMonth />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/month-invoices" element={<CurrentMonthInvoices />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/month-daily-income" element={<DailyIncomeMonth />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/editor" element={<PdfPage />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/month-wares-invoices" element={<CurrentWaresMonthInvoices />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/supplier-emails/:suppid" element={<SupplierEmails />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/supplier-quotes/:suppid" element={<SupplierQuotes />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/supplier-reports/:suppid" element={<SupplierReports />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/customer-emails/:custid" element={<CustomerEmails />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/customer-reports/:custid" element={<CustomerReports />} />}
        {(user?.id && user?.role != "ROLE_WORKER") &&<Route path="/customer-quotes/:customerId" element={<CustomerQuotes />} />}
        
        {user?.role == "ROLE_ADMIN" &&<Route path="/admin-page" element={<AdminPage />} />}
        {!isSSR &&(
         <>
          {user?.role == "ROLE_WORKER" && <Route path="*" element={<WorkersDashboard />} />}
          <Route path="*" element={<ErrorPage />} />
         </>
        )}
      </Routes>
    </BrowserRouter>
    </ThemeContext.Provider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}


export default App;
