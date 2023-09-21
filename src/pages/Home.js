import React, { useContext } from 'react';
import { ThemeContext } from "../App";

// import Footer from "../components/Footer";

const Home = () => {
  const { hebrew } = useContext(ThemeContext) 

  return (
    <>
     <div className={`${hebrew ? "airx:ml-64" : "airx:mr-64"} p-3 mt-[4px] ml-[6px] mr-[6px] bg-[#ccc] bg-opacity-60 overflow-y-hidden`}>
      <div class="aspect-w-16 aspect-h-9">
        <iframe src="https://www.youtube.com/embed/7PgcuJLamzE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
      {/* <Footer /> */}
    </div>
    <div className={`${hebrew ? "airx:ml-64" : "airx:mr-64"} p-3 mt-[4px] ml-[6px] mr-[6px] bg-[#ccc] bg-opacity-60 overflow-y-hidden`}>
    <div class="aspect-w-16 aspect-h-9">
      <iframe src="https://www.youtube.com/embed/JoLW_2PZhjM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  </div>
    </>
   
  )
}

export default Home