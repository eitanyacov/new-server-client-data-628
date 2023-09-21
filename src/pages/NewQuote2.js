import React, { useState, useEffect } from 'react';
import { Dialog, Snackbar, Alert} from '@mui/material'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';



const NewQuote2 = () => {
    const [state, setState] = useState(false)
    const [description, setDescription] = useState("")
    const [unit, setUnit] = useState("")
    const [unitPrice, setUnitPrice] = useState("")
    const [total, setTotal] = useState()
    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [date, setDate] = useState("");
    const [errors, setErrors] = useState()
    const [id, setId] = useState()
    const [open, setOpen] = useState(false)
    const [item, setItem] = useState({})
    const [items, setItems] = useState([])
    const [sum, setSum] = useState(0)
    const [amount, setAmount] = useState()
    // const [flag, setFlag] = useState(true);
    const [isSSRE, setIsSSRE] = useState(true);
    const [user, setUser] = useState({})

    const navigate = useNavigate()


    const res = localStorage.getItem("user")
    const result = JSON.parse(res)


    useEffect(()=> {
        let total = unit * unitPrice;
        if(!total == 0) {
         setTotal((unit * unitPrice).toFixed(2))
        }

     }, [unit, unitPrice])

     useEffect(() => {
      setTimeout(() => {
        setIsSSRE(false);
      }, 800)
      
    }, [isSSRE]);

    useEffect(() => {
      axios.get("https://nartina.com/api/user/details-model/" + result?.id)
        .then(res => {console.log(res.data)
          setUser(res.data)})
        .catch(err => console.log(err.response.data))
      
    }, []);

    const getCust = () => {
        const id = result?.id
        return axios.get('https://nartina.com/api/user/get-customers-by-user/' + id)
      }
      
      const {data, refetch} = useQuery('customers', ()=> getCust(),
        {
          // enabled: !!supplier?.name,
          // staleTime: 300000
          refetchOnMount: true,
          refetchOnWindowFocus:false
     
        }) 

        // const closeForm = () => {
        //     setUnit("")
        //     setUnitPrice("")
        //     setTotal("")
        //     setDescription("")
        //     setState(false)
        // }

        const addReceipt = (e) => {
            e.preventDefault();
            axios.post("https://nartina.com/api/user/add-quote-to-user/" + result?.id + "/" + customerId , {
           
            date,
          
            userCompanyName: result?.companyName,
            userDealerLicensed: result?.dealerlicensed,
            // userEmail: result?.emailForReceipt,
            // userAddress: result?.address,
            // userAddressNumber: result?.addressNumber,
            // userAddressCity: result?.city,
            // userPhoneNumber: result?.phoneForReceipt
            userEmail: user?.email,
            userAddress: user?.address,
            userAddressNumber: user?.number,
            userAddressCity: user?.city,
            userPhoneNumber: user?.phone
          }, {
            headers: {
              Authorization: 'Bearer ' + result?.token,
          
             }
          }).then(res => {setId(res.data)
            setState(true)
            localStorage.setItem('taxInvoice', true)}) 
            .catch(error => {
              setErrors(error.response.status)
            })
      
            setDate("");
           
        }

        const deleteReceipt = () => {
            axios.delete("https://nartina.com/api/user/delete-quote/" + id, {
              headers: {
                Authorization: 'Bearer ' + result?.token,
            
               }
            })
            .then(res => {console.log(res.data)
              navigate("/receipts")
              window.location.reload()})
            .catch(err => console.log(err.response.data))
            navigate("/receipts")
          }

        const addAmount = (sum) => {
            axios.get("https://nartina.com/api/user/add-amount-quote/" + id + "/" + sum)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data))
          }

        const addItemsToReceipt = (e) => {
            e.preventDefault();
            axios.post("https://nartina.com/api/file/add-item-to-quote/" + id , {
              description,
              unit,
              unitPrice,
              // total: total / 1.17
              total: total
            }).then(res => {console.log(res.data)
              // setFlag(false)
              setItems([...items, res.data])
              setSum(Number(res.data.total) + sum)
              addAmount(total)})
            .catch(err => console.log(err))
            .finally(setOpen, setDescription(""), setUnit(""), setUnitPrice(""))
            setOpen(true)
            setDescription("")
            setUnit("")
            setUnitPrice("")

            // addAmountToReceipt()
            setTotal("")
          }

       

        // const saveCustomerId = event => {
        //     const { myValue } = event.currentTarget.dataset;
        //     console.log(myValue) // --> 123
        //     const x = parseInt(myValue)
        //     setCustomerId(myValue)
        //     alert(customerId)
        
        // }


        const handleChange = (e) => {
            console.log("the value is: " + e.target.value);
            setCustomerId(e.target.value)
           
          }
         
    

          const handleClose = ()  => {
            setOpen(false)
            
          }

          const finishReceipt = () => {
            // navigate("/receipts/" + id)
            setState(false)
            // setFlag(true)
            navigate("/quotes")
          }

          const deleteItem = (itemId) => {
            items.map(i => {
              if(i.id == itemId) {
                setSum(sum - i.total)
                axios.delete("https://nartina.com/api/user/delete-quote-item/" + itemId + "/" + id + "/" + i.total, {
                  headers: {
                    Authorization: 'Bearer ' + result?.token,
                
                   }
                })
                .then(res => console.log(res.data))
                .catch(err => console.log(err.response.data))
                // setAmount(i.total)
              }
            })
            setTimeout(()=> {
              const updatedItems = items.filter(item => item.id !== itemId);
            setItems(updatedItems);
            }, 250)
           

          }
        

  return (
    <div>
       <div class="overflow-y-auto overflow-x-hidden fixed top-16 airx:right-64 z-10 flex justify-end w-full md:h-full">
        {isSSRE ? (
          <div className='w-full'>
          <LinearProgress />
          </div>
        ) : (
          <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          
              <div class="flex justify-between items-center w-full pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <button type="button" class="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1 hover:bg-gray-200 mr-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> navigate(-1)}>
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      <span class="sr-only">Close modal</span>
                  </button>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  הכן הצעת מחיר ללקוח 
                  </h3>
              </div>
              {/* <!-- Modal body --> */}
              <form onSubmit={addReceipt}>
                  <div class="grid gap-4 mb-4 sm:grid-cols-2">
                      
                      <div>
                          <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">בחר לקוח</label>
                          <select id="category" onChange={handleChange} class="bg-gray-50 border h-[40px] pr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                              <option selected="" className='text-right'>בחר לקוח</option>
                              {data?.data.map(customer => (
                                  <option value={customer.id} className='text-right'>{customer.name}</option>
                              ))}
                          </select>
                      </div>
                      
                      <div>
                          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">תאריך הצעה</label>
                          <input type="date" name="name" id="name" class="bg-gray-50 h-[40px] min-w-max border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={e => setDate(e.target.value)} required=""/>
                      </div>
                      
                      {/* <div class="sm:col-span-2">
                          <hr />
                      </div> */}
                      
                      <div class="sm:col-span-2">
                          <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">הערות</label>
                          <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-right dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="כתוב את ההערות שלך כאן"></textarea>                    
                      </div>
                      
                  </div>
                 
                  <div class="sm:col-span-2 mt-4">
                      <hr />
                  </div>
                  <div className='flex justify-between mt-5'>
                  <button type="submit" disabled={date == "" || customerId == ""} class="text-white tracking-wide inline-flex items-center bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                      הכנס הצעה
                      <svg class="ml-1 -mr-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                  </button>
                  <button class="text-white tracking-wide inline-flex items-center bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800" onClick={()=> navigate(-1)}>
                       חזור להצעות
                      {/* <svg class="ml-1 -mr-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> */}
                  </button>
                  </div>
              </form>
          </div>
      </div>
  
        )}
   </div>
        <Dialog open={state}>
        <div class={`fixed z-50 top-0 right-0 left-0 bottom-0 h-full w-full ${state ? 'block' : 'hidden'}`}>
			<div class="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-4 flex flex-col items-center gap-4">
				
       <div>
       <div class="shadow absolute right-10 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer" onClick={deleteReceipt}>
					
					<svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
					</svg>
				</div>

				<div class="shadow w-full rounded-lg bg-white overflow-hidden block p-8">
					
					<h2 class="font-bold text-2xl mb-6 text-gray-800 border-b pb-2 text-right">הכנס מוצר/שירות</h2>
                    <form onSubmit={addItemsToReceipt}>
                      
					<div class="mb-4">
						<label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide text-right">תיאור</label>
						<input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-right" id="inline-full-name" type="text" value={description} onChange={e => setDescription(e.target.value)}/>
					</div>

					<div class="flex justify-end">
						<div class="mb-4 w-32 mr-2">
							<label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide text-right">סכום</label>
							<input class="text-right mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" value={total} onChange={e => setTotal(total ? total : 0)}/>
						</div>
			
						<div class="mb-4 w-32 mr-2">
							<label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide text-right">סכום יחידה</label>
							<input class="text-right mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" value={unitPrice} onChange={e => setUnitPrice(e.target.value)}/>
						</div>

						<div class="mb-4 w-32">
							<label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide text-right">יחידות</label>
							<input class="text-right mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" value={unit} onChange={e => setUnit(e.target.value)}/>
						</div>
					</div>
			
					<div class="mb-4 w-full flex items-center justify-end"> 
						<div class="">
							<label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide text-right">מע"מ</label>
							<select class="text-gray-700 block appearance-none w-full bg-gray-200 border-2 border-gray-200 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500" >
								<option value="5" className='text-right'>מע"מ 17%</option>
								<option value="12" className='text-right'>מע"מ 12%</option>
								<option value="18" className='text-right'>מע"מ 18%</option>
								<option value="28" className='text-right'>מע"מ 28%</option>
							</select>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
								<svg class="fill-current h-4 w-4 mt-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
							</div>
						</div>
					</div>
	
					<div class="mt-8 text-right">
						<button disabled={items.length === 0} type="button" class="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm mr-2" onClick={finishReceipt}>
							סיים הצעה
						</button>	
						<button disabled={description == "" || unit == "" || unitPrice == ""} type="submit" class="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow-sm" >
							הכנס מוצר 
						</button>	
					</div>
                    </form>
				</div>
       </div>
               {items?.length && (
                <div className='h-[250px] overflow-y-auto relative bottom-10 rounded mt-2'>
                  <table className="border p-3 w-[430px]">
                <thead className="bg-gray-300 text-sm text-center">
                   <th>מחק</th>
                   <th>סה"כ</th>
                   <th>מחיר</th>
                   <th>יחידות</th>
                   <th>תיאור השירות / מוצר</th>
                </thead>
                <tbody>
                {items.map(item => (
                 <tr key={item.id} className='bg-white border-b hover:bg-gray-100 text-center'>
                  <td class="p-2">
                                <div class="flex justify-center" onClick={()=> deleteItem(item.id)}>
                                    <button>
                                        <svg class="w-6 h-6 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 p-1"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
          </td>
                  <td className="text-sm">{item?.total}</td>
                  <td className="text-sm">{item?.unitPrice}</td>
                  <td className="text-sm">{item?.unit}</td>
                  <td className="text-sm">{item?.description.substring(0, 24)}</td>
                 </tr>
                ))}
          
                </tbody>
               </table>
               <tr className="bg-gray-300 text-black font-bold w-[430px] flex justify-start space-x-2 px-3">
                   <td className="text-center">{(sum / 1.17).toFixed(2)}</td>
                   <td className="text-center">סה"כ</td>
                 </tr>
              
                 <tr className="bg-gray-200 text-black font-bold w-[430px] flex justify-start space-x-2 px-3">
                   <td className="text-center">{(sum - (sum / 1.17)).toFixed(2)}</td>
                   <td className="text-center">מע"מ 17%</td>
                 </tr>
               
               
                 <tr className="bg-blue-600 text-white w-[430px] flex justify-between px-3">
                   <td className="text-center">{sum.toFixed(2)}</td>
                   <td></td>
                   <td></td>
                   <td className="text-center">סה"כ לתשלום</td>
                 </tr>
                </div>
               )}
			</div>

		</div>
        </Dialog>
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
            <h1>הוכנס בהצלחה לחשבונית המס</h1>
        </Alert>
      </Snackbar>
    </div>
  )
}

export default NewQuote2