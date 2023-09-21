import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import fileDownload from 'js-file-download';
import { useParams, useNavigate } from "react-router-dom";
// import { Worker } from "@react-pdf-viewer/core";
// Import the main Viewer component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ThemeContext } from "../App";




const Quote = () => {
  const [user, setUser] = useState({});
  const [customer, setCustomer] = useState({});
  const [res, setRes] = useState();
  const [resv, setResv] = useState();
  const [items, setItems] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const { hebrew } = useContext(ThemeContext)


//   useEffect(()=> {
//       if(!window.location.hash) {
//           window.location = window.location + '#loaded';
//           window.location.reload();
//       }
 
// }, [])

// useEffect(()=> {
//   addAmountToQuote()
// }, [items, res, quoteId])

// useEffect(()=> {
//   axios.post("http://nartina.eu-central-1.elasticbeanstalk.com/api/user/add-quote-amount/" + quoteId + "/" + resv, {
//   })
//   .then(res => console.log(res))
//    .catch(err => console.log(err))
// }, [items, res, quoteId])

  useEffect(() => {
    const res = localStorage.getItem("user");
    const result = JSON.parse(res);
    setUser(result);
  }, []);

  // useEffect(() => {
  //   getQuotes();
    
  // }, []);

  useEffect(()=> {
    let total = 0;
    items.map(item => {
        total += item.total
    })
    setRes(total / 1.17)
    setResv(total)
  }, [items])

  // useEffect(() => {
  //   getItems();
    
  // }, [items]);
  useEffect(() => {
    getItems();
    
  }, [quoteId]);

  
  useEffect(() => {
    axios.get("https://nartina.com/api/file/get-quote/" + quoteId)
    .then(res => setCustomer(res.data))
    .catch(err => console.log(err))
  }, [quoteId]);



  // const addAmountToQuote = () => {
  //     axios.post("http://nartina.eu-central-1.elasticbeanstalk.com/api/user/add-quote-amount/" + quoteId + "/" + res * 1.17, {
  //     })
  //     .then(res => console.log(res))
  //      .catch(err => console.log(err))
  //    }


  const getItems = () => {
    axios
      .get("https://nartina.com/api/file/all-quotes-with-items/" + quoteId)
      .then(res => setItems(res.data))
        // const encodedString = Buffer.from(res.data).toString('base64')
      .catch((err) => console.log(err));
  };

  // const getQuotes = () => {
  //   axios
  //     .get("http://businessnartinaapp-env.eba-cqgg9mpb.eu-central-1.elasticbeanstalk.com/api/file/pdf/generate/11/12")
  //     .then(res => setPdfFile(res.data))
  //       // const encodedString = Buffer.from(res.data).toString('base64')
  //     .catch((err) => console.log(err));
  // };

  const allowedFiles = ['application/pdf'];
  const handleFile = (e) =>{
    // let selectedFile = e.target.files[0];
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if(selectedFile){
      if(selectedFile&&allowedFiles.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend=(e)=>{
         
          setPdfFile(e.target.result);
        }
      }
    }
    else{
      console.log('please select a PDF');
    }
  }

  function download(url, filename) {
    axios.get(url, {
      responseType: 'blob',
    }).then(res => {
      fileDownload(res.data, filename);
    });
  }

  const xxx = () => {
    download("https://nartina.com/api/file/pdf/generate/" + quoteId + "/" + user?.id, "xxx.pdf")
    // download("http://localhost:5000/api/file/pdf/generate/11/12", "xxx.pdf")
  }

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  
  // console.log(pdfFile);
  console.log(quoteId);
  return (
   
    <div className={`flex items-center justify-center w-full mt-14 `}>
      <div className={`w-[350px] etc:w-[370px] xr:w-[387px] xxq:w-[390px] sm:w-[410px] md:w-[500px] h-[650px] xr:h-[700px] bg-white shadow-lg `}>
      <div className="flex justify-between px-4 py-6">
        <div className="flex space-x-1">
        <h1 className="text-sm text-gray-900">
          {user?.dealerlicensed}
          </h1>
          <h1 className="text-sm text-gray-900">-</h1>
          <h1 className="text-sm text-gray-900">מס' ע.מ / חברה</h1> 
        </div>
        <div className="flex flex-col justify-center items-end">
        <h1 className="text-sm text-gray-900s font-bold">{user?.companyName}</h1>
        <div className='flex space-x-1'>
            <h1 className='text-[#333] text-md font-mono'>{user?.addressNumber}</h1>
            <h1 className='text-[#333] text-md font-mono'>{user?.address}</h1>
            <h1 className='text-[#333] text-md font-mono'>{user?.city}</h1>
        </div>
        <h1 className="text-sm">{user?.emailForReceipt}</h1>
        <h1 className="text-sm">{user?.phoneForReceipt}</h1>
        {/* <h1 className="text-sm">{user?.address}</h1> */}
        </div>
      </div>
        <div className="flex justify-center mt-1">
            <h1 className="text-4xl text-gray-800 font-bold font-mono">
                הצעת מחיר
            </h1>
        </div>
        <div className="flex justify-between px-4">
          <h1 className="font-mono text-gray-800 italic text-md relative top-12">{customer?.date}</h1>
          <div className="flex flex-col">
          <h1 className="text-md text-gray-800 font-semibold flex justify-end font-serif text-lg">לכבוד</h1>
          <h1 className="text-sm text-gray-800 flex justify-end">
                {customer?.customerName}
          </h1>
          <div className="flex items-center justify-end space-x-1.5">
          <h1 className="text-sm text-gray-800 font-mono tracking-wide">
                {customer?.customerDealerLicensed}
          </h1>
          <h1 className="text-sm text-gray-700 flex justify-end font-sans">מס' חברה</h1>
          </div>
          </div>
        </div>
        {/* <h1 className="text-center relative top-10">הצעת מחיר מס' {(Math.random() * 10000).toFixed(0)}</h1> */}
        <h1 className="text-center relative top-10">הצעת מחיר מס' {customer?.quoteId}</h1>
       <div className="flex justify-center relative top-14">
       {/* <table className="border border-gray-900 p-3 w-[480px] mt-2"> */}
       <table className="border border-gray-900 p-3 w-[369px] sm:w-[385px] md:w-[480px] mt-2">
 <thead className="bg-gray-300">
    <th>סה"כ</th>
    <th>מחיר</th>
    <th>יחידות</th>
    <th>תיאור השירות / מוצר</th>
 </thead>
 <tbody>
 {items.map(item => (
  <tr key={item.id}>
   <td className="text-center text-md mmu:text-sm">{item?.total.toFixed(2)}</td>
   <td className="text-center text-sm mmu:text-sm">{item?.unitPrice}</td>
   <td className="text-center text-sm mmu:text-sm">{item?.unit}</td>
   <td className="text-center text-sm mmu:text-sm">{item?.description}</td>
  </tr>
 ))}
  {items && (
  <tr className="bg-gray-300 text-black font-bold">
    <td className="text-center">{res?.toFixed(2)}</td>
    <td className="text-center">סה"כ</td>
    <td></td>
    <td></td>
  </tr>
 )}
  {items && (
  <tr className="bg-gray-200 text-black font-bold">
    <td className="text-center">{((res * 1.17) - res).toFixed(2)}</td>
    <td className="text-center">מע"מ 17%</td>
    <td></td>
    <td></td>
  </tr>
 )}
 {items && (
  <tr className="bg-blue-600 text-white">
    <td className="text-center">{(res * 1.17).toFixed(2)}</td>
    <td></td>
    <td></td>
    <td className="text-center">סה"כ לתשלום</td>
  </tr>
 )}
 
 </tbody>
</table>
       </div>
       
       <div className="flex flex-col mt-16 p-3">
       <h1 className="flex justify-end text-red-600 font-bold">הערות</h1>
       <h1 className="flex justify-end text-xs"> תוקף ההצעה הינה שבועיים מיום הוצאת ההזמנה -</h1>
       <h1 className="flex justify-end text-xs">כל המחירים הינם בש"ח וכוללים מע"מ -</h1>
       <h1 className="flex justify-end text-xs">חברתנו רשאית לבטל את ההצעה בכל עת -</h1>
       <h1 className="flex justify-end text-xs">לשאלות ובירורים ניתן ליצור קשר בטלפון / אימייל שמופיעים למעלה -</h1>
       </div>
       <img src="https://www.comsigntrust.com/wp-content/uploads/2018/10/English-White-300x288.png" alt="" className="w-20 h-20 relative top-8 mr-2" />
        <div className="">
          <h1 className="font-mono mr-4 font-semibold text-right text-sm">מסמך ממוחשב חתום דיגיטלית</h1>
          <h1 className="text-xs mr-4 font-semibold text-right mmu:text-md">חתום דיגיטלית ע"י נרטינה פתרונות תוכנה</h1>
        </div>
       <div></div>
      </div>
      
      <div>
      
      </div>
      
    </div>
  );
};

export default Quote;
