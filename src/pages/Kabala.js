import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Kabala = () => {
    const [user, setUser] = useState({});
    const [kabala, setKabala] = useState({});
    const { kabalaId } = useParams();

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)


    useEffect(() => {
        const res = localStorage.getItem("user");
        const result = JSON.parse(res);
        setUser(result);
      }, []);

      useEffect(() => {
        axios.get("https://nartina.com/api/user/get-kabala/" + kabalaId)
        .then(res => setKabala(res.data))
        .catch(err => console.log(err))
      }, [kabalaId]);

  return (
    <div className="flex w-fit mx-auto">
    <div className="w-[350px] etc:w-[370px] xr:w-[387px] xxq:w-[390px] sm:w-[410px] md:w-[500px] h-[650px] xr:h-[700px] relative top-16 bg-white shadow-lg mx-auto">
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
                  <h1 className='text-[#333] text-md font-mono'>{kabala?.userAddressNumber}</h1>
                  <h1 className='text-[#333] text-md font-mono'>{kabala?.userAddress}</h1>
                  <h1 className='text-[#333] text-md font-mono'>{kabala?.userAddressCity}</h1>
      </div>
      <h1 className="text-sm">{user?.emailForReceipt}</h1>
      <h1 className="text-sm">{user?.phoneForReceipt}</h1>
      {/* <h1 className="text-sm">{user?.address}</h1> */}
      </div>
    </div>
      <div className="flex flex-col items-center mt-1">
      <h1 className="text-3xl font-semibold text-red-700 text-center font-mono">{kabala?.isCancel}</h1>
      {/* <h1 className="text-3xl font-semibold text-red-700 text-center font-mono">מבוטל</h1> */}
          <h1 className="text-5xl text-gray-900 font-bold font-mono">
               קבלה
          </h1>
          <h1 className="text-2xl text-gray-800 font-bold font-mono">
               מקור
          </h1>
      </div>
      <div className="flex justify-between px-4">
        <h1 className="font-mono text-gray-800 italic text-md relative top-12">{kabala?.date}</h1>
        <div className="">
        <h1 className="text-md text-gray-800 font-semibold flex justify-end font-serif text-lg">לכבוד</h1>
        <h1 className="text-sm text-gray-800 font-bold flex justify-end">
              {kabala?.customerName}
        </h1>
       {kabala?.customerDealerLicensed != null && <div className="flex space-x-1">
        <h1 className="text-xs text-gray-800 flex justify-end">
              {kabala?.customerDealerLicensed}
        </h1>
        <h1 className="text-xs text-gray-900">-</h1>
        <h1 className="text-xs text-gray-900">מס' ע.מ / חברה</h1> 
        </div>
       }
        </div>
      </div>
      {/* <h1 className="text-center relative top-10">הצעת מחיר מס' {(Math.random() * 10000).toFixed(0)}</h1> */}
      <h1 className="text-center relative top-10"> קבלה מס' {kabala?.kabalaNumber}</h1>
     <div className="flex justify-center relative top-14">
     {/* <table className="border border-gray-900 p-3 w-[480px] mt-2"> */}
     <table className="border border-gray-900 p-3 w-[369px] sm:w-[385px] md:w-[480px] mt-2">
<thead className="bg-gray-300">
  <th>סכום</th>
  <th>אמצעי תשלום</th>
  <th>עבור חשבונית</th>
</thead>
<tbody>

<tr className="bg-blue-600 text-white">
 <td className="text-center text-md mmu:text-sm">{kabala?.amount}</td>
 <td className="text-center text-sm mmu:text-sm">{kabala?.paymentMethod}</td>
 <td className="text-center text-sm mmu:text-sm">{kabala?.receiptNumber}</td>
</tr>


<tr className="bg-gray-200 text-gray-800 font-bold">
<td className="text-center text-sm">תאריך פרעון</td>
<td></td>
<td className="text-center text-sm">מספר צ'ק</td>
</tr>
<tr className="bg-blue-600 text-white font-bold">
  {kabala.checkDate != null ? (
    <td className="text-center text-sm font-normal">{kabala.checkDate}</td>
  ) : (
    <td className="text-center text-sm font-normal">-</td>
  )}
<td></td>
{kabala.checkNumber != null ? (
  <td className="text-center text-sm font-normal">{kabala.checkNumber}</td>
) : (
  <td className="text-center text-sm font-normal">-</td>
)}
</tr>

{/* {items && (
<tr className="bg-gray-200 text-black font-bold">
  <td className="text-center">{((res * 1.17) - res).toFixed(2)}</td>
  <td className="text-center">מע"מ 17%</td>
  <td></td>
  <td></td>
</tr>
)} */}
{/* {items && (
<tr className="bg-blue-600 text-white">
  <td className="text-center">{(res * 1.17).toFixed(2)}</td>
  <td></td>
  <td></td>
  <td className="text-center">סה"כ לתשלום</td>
</tr>
)} */}

</tbody>
</table>
     </div>
     
     <div className="flex flex-col mt-16 p-3">
     <h1 className="flex justify-end text-red-600 font-bold">הערות</h1>
     {/* <h1 className="flex justify-end text-xs"> תוקף ההצעה הינה שבועיים מיום הוצאת ההזמנה -</h1> */}
     <h1 className="flex justify-end text-xs">כל המחירים הינם כוללים מע"מ -</h1>
     <h1 className="flex justify-end text-xs">לשאלות ובירורים ניתן ליצור קשר בטלפון / אימייל שמופיעים למעלה -</h1>
     <h1 className="flex justify-end text-xs">קבלה דיגיטלית זו הופקה ע"י נרטינה פתרונות תוכנה -</h1>
     </div>
     <img src="https://www.comsigntrust.com/wp-content/uploads/2018/10/English-White-300x288.png" alt="" className="w-20 h-20 relative top-16 mr-2" />
        <div className="">
          <h1 className="font-mono mr-4 font-semibold text-right text-sm">מסמך ממוחשב חתום דיגיטלית</h1>
          <h1 className="text-xs mr-4 font-semibold text-right mmu:text-md">חתום דיגיטלית ע"י נרטינה פתרונות תוכנה</h1>
        </div>
       <div></div>
    </div>
    
    <div>
    
    </div>
    
  </div>
  )
}

export default Kabala