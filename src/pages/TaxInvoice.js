import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";


const TaxInvoice = () => {
    const [user, setUser] = useState({});
    const [receipt, setReceipt] = useState({});
    const [res, setRes] = useState();
    // const [resVat, setResVat] = useState();
    const [items, setItems] = useState([]);
    const { invoiceTaxId } = useParams();
    const navigate = useNavigate();
    const { hebrew } = useContext(ThemeContext)


  //   useEffect(()=> {
  //       if(!window.location.hash) {
  //           window.location = window.location + '#loaded';
  //           window.location.reload();
  //       }
       
  // }, [])

    useEffect(() => {
        const res = localStorage.getItem("user");
        const result = JSON.parse(res);
        setUser(result);
      }, []);

      useEffect(()=> {
        let total = 0;
        items.map(item => {
            total += item.total
        })
        setRes(total / 1.17)
      }, [items])

      // useEffect(() => {
      //  setResVat(Math.round(res * 1.17))
        
      // }, [res, resVat]);

      
      useEffect(() => {
        getItems();
        
      }, [invoiceTaxId]);

      useEffect(() => {
        axios.get("https://nartina.com/api/file/get-receipt/" + invoiceTaxId)
        .then(res => setReceipt(res.data))
        .catch(err => console.log(err))
      }, [invoiceTaxId]);

      // useEffect(()=> {
      //   addAmountToReceipt()
      // }, [items, res, resVat])

      // useEffect(()=> {
      //   axios.post("http://nartina.eu-central-1.elasticbeanstalk.com/api/user/add-receipt-amount/" + invoiceTaxId + "/" + resVat, {
      //   })
      //   .then(res => console.log(res))
      //    .catch(err => console.log(err))
      // }, [invoiceTaxId, resVat])

      // const addAmountToReceipt = () => {
      //     axios.post("http://businessnartinaapp-env.eba-cqgg9mpb.eu-central-1.elasticbeanstalk.com/api/user/add-receipt-amount/" + invoiceTaxId + "/" + res * 1.17, {
      //     })
      //     .then(res => console.log(res))
      //      .catch(err => console.log(err))
      //    }

      // const addAmountToReceipt = () => {
      //   axios.post("http://localhost:5000/api/user/add-receipt-amount/" + invoiceTaxId + "/" + resVat, {
      //   })
      //   .then(res => console.log(res))
      //    .catch(err => console.log(err))
      //  }

      const getItems = () => {
        axios
          .get("https://nartina.com/api/file/receipt-items-from-service/" + invoiceTaxId)
          .then(res => setItems(res.data))
            // const encodedString = Buffer.from(res.data).toString('base64')
          .catch((err) => console.log(err));
      };



  return (
    // <div className="w-fit ml-1 md:ml-20 lg:mx-auto">
    // <div className="flex w-fit mx-auto md:ml-20 lg:mx-auto">
    <div className="flex w-fit mx-auto mt-14">

      {/* <div className="w-[400px] md:w-[500px] min-h-screen h-fit bg-white shadow-lg mx-auto"> */}
      {/* <div className="w-[387px] sm:w-[410px] md:w-[500px] min-h-screen h-fit bg-white shadow-lg mx-auto"> */}
      <div className={`w-[350px] ${hebrew ? 'airx:ml-[180px]' : 'airx:mr-[180px]'} etc:w-[370px] xr:w-[387px] xxq:w-[390px] sm:w-[410px] md:w-[500px] h-[650px] xr:h-[700px] bg-white shadow-lg mx-auto`}>
      <div className="flex justify-between px-4 py-6">
        <div className="flex space-x-1">
        <h1 className="text-sm text-gray-900">
          {receipt?.userDealerLicensed}
          </h1>
          <h1 className="text-sm text-gray-900">-</h1>
          <h1 className="text-sm text-gray-900">מס' ע.מ / חברה</h1> 
        </div>
        <div className="flex flex-col justify-center items-end">
        <h1 className="text-sm text-gray-900 font-bold">{receipt?.userCompanyName}</h1>
        <div className='flex space-x-1'>
                  <h1 className='text-[#333] text-md font-mono'>{receipt?.userAddressNumber}</h1>
                  <h1 className='text-[#333] text-md font-mono'>{receipt?.userAddress}</h1>
                  <h1 className='text-[#333] text-md font-mono'>{receipt?.userAddressCity}</h1>
        </div>
        <h1 className="text-sm">{receipt?.userEmail}</h1>
        <h1 className="text-sm">{receipt?.userPhoneNumber}</h1>
        {/* <h1 className="text-sm">{receipt?.userAddress}</h1> */}
        </div>
      </div>
        {/* <div className="flex justify-end mr-4 mt-1"> */}
        <h1 className="text-3xl font-semibold text-red-700 text-center font-mono">{receipt?.isCancel}</h1>
        <h1 className="text-xl font-semibold text-red-700 text-center font-mono">{receipt?.printText}</h1>
        {receipt?.printText != null && (
          <div className="flex justify-center items-center space-x-1">
          <h1 className="text-sm font-semibold text-gray-800 text-center font-mono mt-[2px]">{receipt?.cashNumber}</h1>
          <h1 className="text-sm font-semibold text-gray-800 text-center font-mono mt-[2px]">-</h1>
          <h1 className="text-sm font-semibold text-gray-700 text-center font-mono">מספר סרט קופה</h1>
        </div>
        )}
        <div className="flex justify-center mt-1">
            <h1 className="text-4xl text-gray-800 font-bold font-mono">
                חשבונית מס
            </h1>
            
        </div>
        <h1 className="ml-8 mt-2 text-xl font-semibold">מקור</h1>
        <div className="flex justify-between px-4">
          <h1 className="font-mono text-gray-800 italic text-md relative top-12">{receipt?.date}</h1>
          <div className="">
          <h1 className="text-md text-gray-800 font-semibold flex justify-end font-serif text-lg">לכבוד</h1>
          <h1 className="text-sm text-gray-800 font-semibold flex justify-end">
                {receipt?.customerName}
          </h1>
          {receipt.customerDealerLicensed != null && (
            <div className="flex items-end space-x-1">
            <h1 className="text-xs text-gray-800">{receipt?.customerDealerLicensed}</h1>
            <h1 className="text-sm text-gray-900">-</h1>
            <h1 className="text-xs text-gray-800">מס' ע.מ / חברה</h1>
          </div>
          )}
          </div>
        </div>
        {/* <h1 className="text-center relative top-10">חשבונית מס' {(Math.random() * 10000).toFixed(0)}</h1> */}
        <h1 className="text-center relative top-10">חשבונית מס' {receipt?.taxId}</h1>
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
   <td className="text-center text-sm">{item?.total}</td>
   <td className="text-center text-sm">{item?.unitPrice}</td>
   <td className="text-center text-sm">{item?.unit}</td>
   <td className="text-center text-sm">{item?.description}</td>
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
  {/* <tr className="text-center">
    <td className="text-center">Centro come </td>
    <td>Francisco </td>
    <td>Mexico</td>
    <td>Germany</td>
  </tr>
  <tr className="bg-blue-700 text-white text-center">
    <td>2450</td>
    <td></td>
    <td></td>
    <td>סיכום</td>
  </tr> */}
 </tbody>
</table>
       </div>
       
       {/* <div> */}
       <img src="https://www.comsigntrust.com/wp-content/uploads/2018/10/English-White-300x288.png" alt="" className="w-20 h-20 relative top-16 mr-2" />
        <div className="">
          <h1 className="font-mono mr-4 font-semibold text-right text-sm">מסמך ממוחשב חתום דיגיטלית</h1>
          <h1 className="text-xs mr-4 font-semibold text-right mmu:text-md">חתום דיגיטלית ע"י נרטינה פתרונות תוכנה</h1>
        </div>
       <div>
       

       {/* </div> */}
       </div>
        
      </div>
      
      <div>
     
      </div>
      
       {/* <button onClick={xxx}>xxx</button>
     <div>
       <form>
           <label>
             <h5>Upload PDF</h5>
         </label>
           <br></br>

           <input
             type="file"
            className="form-control"
             onChange={handleFile}
           ></input>

         </form>
         <embed src={`data:application/pdf;base64,${pdfFile}`} />
         {pdfFile && (
           <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
             <Viewer
               fileUrl={pdfFile}
             plugins={[defaultLayoutPluginInstance]}
             ></Viewer>
           </Worker>
        )}
       </div>  */}
       
    </div>
  )
}

export default TaxInvoice