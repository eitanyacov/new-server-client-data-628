import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from "../App";
import { Snackbar, Alert } from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import axios from 'axios';
import img from '../assets/VNU_M737_6.png'


const OpenAi = () => {
    const { hebrew } = useContext(ThemeContext)
    const [state, setState] = useState(true)
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("")
    const [answer, setAnswer] = useState("")
    const [alert, setAlert] = useState(false);


    const [response, setResponse] = useState('');
    // const apiKey = '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'; // Replace with your actual API key
    // const model = 'gpt-3.5-turbo'; // Replace with the desired model

    // const handleSubmit = async () => {
    //   const prompt = 'what is spring boot ?';
    //   const url = 'https://api.openai.com/v1/chat/completions';
  
    //   try {
    //     const response = await axios.post(
    //       url,
    //       {
    //         messages: [
    //           {
    //             role: 'system',
    //             content: 'You are a helpful assistant.',
    //           },
    //           {
    //             role: 'user',
    //             content: prompt,
    //           },
    //         ],
    //         model: model, // Add the model parameter
    //       },
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${apiKey}`,
    //         },
    //       }
    //     );
  
    //     setResponse(response.data.choices[0].message.content);
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // };


    useEffect(() => {
        setAlert(true);
      }, []);

    const res = localStorage.getItem("user")
    const result = JSON.parse(res)

    const sendMsg = (e) => {
        e.preventDefault();
        setLoading(true)
        setState(false)
        axios.get('https://nartina.com/bot/chat?prompt=' + text, {
            headers: {
                Authorization: 'Bearer ' + result?.token,
            
                    }
        })
        .then(res => {console.log(res)
          setTimeout(()=> setLoading(false), 5000)
        setAnswer(res.data)})
        .catch(err => console.log(err))
        // .finally(setLoading(false))

    }

    const handleCloseAlert = () => {
        setAlert(false)
      }

  return (
    <>
    {state ? (
       <>
       {hebrew ? (
         <div className={`grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mt-12 mx-auto ${hebrew ? 'airx:ml-[240px]' : 'airx:mr-[240px]'} rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-gray-100 text-gray-800`}>
         <div className="flex flex-col justify-between">
             <div className="space-y-2">
                 <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Let's talk!</h2>
                 <div className="text-gray-600">Do You Have Any Questions for Me?</div>
             </div>
             <img src="https://mambaui.com/assets/svg/doodle.svg" alt="" className="p-6 h-52 md:h-64" />
         </div>
         <form onSubmit={sendMsg} className="space-y-6 mt-14">
             <div>
                 <label for="message" className="text-sm">Message</label>
                 <textarea id="message" rows="4" className="w-full p-3 rounded bg-white border" onChange={(e) => setText(e.target.value)}></textarea>
             </div>
             <button type='submit' className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-emerald-600 hover:bg-emerald-500 text-gray-50" >Send Message</button>
         </form>
     </div>
       ) : (
        <div className={`grid max-w-screen-xl grid-cols-1 gap-8 md:gap-32 px-8 py-14 md:py-16 mt-12 mx-auto ${hebrew ? 'airx:ml-[240px]' : 'airx:mr-[233px]'} rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-gray-100 text-gray-800`}>
        <form onSubmit={sendMsg} className="space-y-6 mt-14">
            <div>
                <h1 for="message" className="text-right tracking-wide mb-1 relative right-1">שלח הודעה</h1>
                <textarea id="message" rows="4" className="w-full p-3 rounded bg-white border" onChange={(e) => setText(e.target.value)}></textarea>
            </div>
            <button type='submit' className="w-full p-3 font-bold tracking-wide uppercase rounded bg-emerald-600 hover:bg-emerald-500 text-gray-50" >שלח הודעה</button>
        </form>
        <div className="flex flex-col justify-between order-first md:order-last">
            <div className="space-y-2">
                <h2 className="text-4xl font-bold leading-tight lg:text-5xl text-right">בוא נדבר!</h2>
                <div className="text-gray-600 text-right">יש לך שאלה? שאל כל דבר.</div>
            </div>
            <img src={img} alt="" className="object-cover p-6 h-64 md:h-96" />
        </div>
        {/* <h1>OpenAI Chat Example</h1>
      <button onClick={handleSubmit}>Generate Response</button>
      <div className="response">{response}</div> */}
    </div>
       )}
       </>
    ) : (
        <>
         <button className={`w-full p-3 relative top-14 text-sm font-bold tracking-wide uppercase rounded bg-emerald-600 text-gray-50 hover:bg-emerald-500 ${hebrew ? 'airx:pl-64' : 'airx:pr-64'} mt-2`} onClick={()=> {setState(!state)
         setText("")
         setLoading(false)
        //  setState(false)
         setAnswer("")}}>Back</button>
         <div className={`p-8 relative top-9 ${hebrew ? 'airx:ml-64' : 'airx:mr-64'}`}>
         {loading ? (
            <div className='flex items-center justify-center w-full '>
              <AutorenewIcon style={{fontSize: '120px'}} className='text-blue-500 animate-spin relative top-2'/>
            </div>
         ) : (
            <h1 className={`${loading && 'text-green-600'}`}>{answer}</h1>
            )} 
         </div>
        </>
    )}
    <Snackbar open={alert} autoHideDuration={10000} onClose={handleCloseAlert} anchorOrigin={{vertical: 'buttom', horizontal: hebrew ? 'right' : 'left'}}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: '100%','& .MuiAlert-message':{textAlign: hebrew ? "left" : "right", width:"inherit"} }}
        >
          {/* <AlertTitle>שים לב</AlertTitle> */}
          {hebrew ? <>
            ChatGPT is a natural language processing tool driven by AI technology that allows you to have human-like conversations <br /> The language model can answer questions and assist you with tasks.
          </> : <>
                ניתן לשאול כל שאלה בכל נושא שבעולם, במיוחד בנושא עסקים<br /> את מערכת הבינה המלאכותית שלנו, ולקבל הכוונה ויעוץ
          </>}
        </Alert>
      </Snackbar>
    </>
  )
}

export default OpenAi