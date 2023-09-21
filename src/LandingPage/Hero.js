import React from 'react'
import { useNavigate } from 'react-router-dom'
import pic from '../assets/32.png'


const Hero = () => {
	const navigate = useNavigate()

  return (
    <section className="bg-gray-100 text-gray-800">
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex items-center justify-center p-6 mt-14 lg:mt-4 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			{/* <img src='https://assets.justinmind.com/wp-content/uploads/2020/05/charts-ui-kit-dashboard-design-tips-example.png' alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" /> */}
			{/* <img src='https://docs.appian.com/suite/help/21.4/images/ux_pages/charts_dashboard.png' alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" /> */}
			<img src='https://tailus.io/sources/blocks/sass/preview/images/project.svg' alt="" className="object-contain h-[350px] sm:h-96 lg:h-[500px]" />
		</div>
		<div className="flex flex-col justify-center items-end p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-5xl font-bold leading-none sm:text-6xl text-right">הכירו את 
				<span className="text-blue-600 text-right"> התוכנה </span>המתקדמת ביותר לניהול העסק
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12 text-right">כל עסק חייב תוכנה מתקדמת ואיכותית לניהול יעיל 
				<br className="hidden md:inline lg:hidden text-right"/> של עסקים קטנים, בינונים וגדולים
			</p>
			<div className="flex sm:items-center sm:justify-center space-x-4 lg:justify-start">
				<div rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded bg-indigo-600 cursor-pointer hover:bg-indigo-500 text-gray-100 hover:text-gray-200" onClick={()=> navigate('/login')}>כניסה</div>
				<div rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded border-gray-800 cursor-pointer">הרשמה</div>
			</div>
		</div>
	</div>
</section>
  )
}

export default Hero