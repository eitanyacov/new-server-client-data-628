import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const pricingData = [
    {
      mainTitle: "",
      price: "",
      infoNote: "",
      "Basic Feature": "Basic Feature",
      Users: "Users",
      "Individual data": "Individual data",
      Support: "Support",
      Analytics: "Analytics",
      "Export Reports": "Export Reports",
      titleRow1: "Overview",
      titleRow5: "Reporting And Analytics",
      "Api Access": "Api Access",
    },
    {
      mainTitle: "בסיס",
      popular: true,
      price: {
        month: "₪350",
        year: "₪3850",
      },
      infoNote: "Basic features for up to 10 employees with everything you need.",
      "Basic Feature": true,
      Users: 10,
      "Individual data": "20GB",
      Support: true,
      Analytics: "Basic",
      "Export Reports": true,
      "Api Access": false,
    },
    {
      mainTitle: "עסקי",
      price: {
        month: "₪390",
        year: "₪4290",
      },
      infoNote:
        "Advanced features and reporting better workflows and automation.",
      "Basic Feature": true,
      Users: 20,
      "Individual data": "40GB",
      Support: true,
      Analytics: "Advanced",
      "Export Reports": true,
      "Api Access": true,
    },
    {
      mainTitle: "פרימיום",
      price: {
        month: "₪450",
        year: "₪4950",
      },
      infoNote: "Personalised service and enterprise security for large teams.",
      "Basic Feature": true,
      Users: "Unlimited",
      "Individual data": "Unlimited",
      Support: true,
      Analytics: "Advanced",
      "Export Reports": true,
      "Api Access": true,
    },
  ];
  const LineIcon = ({ bgcolor }) => {
    return (
      <svg
        className="w-5 h-5 mt-1 fill-current"
        width="12"
        height="1"
        viewBox="0 0 12 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0.5C0 0.367392 0.0526785 0.240215 0.146447 0.146447C0.240215 0.0526785 0.367392 0 0.5 0H11.5C11.6326 0 11.7598 0.0526785 11.8536 0.146447C11.9473 0.240215 12 0.367392 12 0.5C12 0.632608 11.9473 0.759786 11.8536 0.853554C11.7598 0.947322 11.6326 1 11.5 1H0.5C0.367392 1 0.240215 0.947322 0.146447 0.853554C0.0526785 0.759786 0 0.632608 0 0.5Z"
          fill={bgcolor}
        />
      </svg>
    );
  };
  const RightIcon = ({ bgcolor }) => {
    return (
      <svg
        className="w-5 h-5 mt-1"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.8267 26.817L24.3485 36.3763L42.6482 18.1795"
          stroke={bgcolor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="28" r="26" stroke={bgcolor} strokeWidth="4" />
      </svg>
    );
  };

const Pricing = () => {
    const [monthprice, setMonthPrice] = useState(true);
    const navigate = useNavigate()

  return (
    <section name='home' class="bg-gray-900">
    <div class="py-8 px-6 mx-auto max-w-screen-xl lg:py-20 lg:px-8">
        <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-indigo-500">Designed for business teams like yours</h2>
            <p class="mb-5 font-light text-gray-400 sm:text-xl ">מכל מקום, בכל זמן, באמצעות כל מכשיר חכם (סמרטפון, טבלט, מחשב נייד או נייח) תוכל להתחבר לנתוני הארגון שלך שיוצגו און ליין עם כל העדכונים האחרונים</p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {/* <!-- Pricing Card --> */}
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 class="mb-4 text-2xl font-semibold">Starter</h3>
                <p class="font-light text-gray-400 sm:text-lg">Best option for personal use & for your next project.</p>
                <div class="flex justify-center items-baseline my-8 space-x-1">
                {/* <span class="text-gray-500 dark:text-gray-400">חודש/ </span> */}
                    <span class="text-gray-500 dark:text-gray-400">חודש/</span>
                    <span class="mr-2 text-5xl font-extrabold">₪290</span>
                    
                </div>
                {/* <!-- List --> */}
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Individual configuration</span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>No setup, or hidden fees</span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Team size: <span class="font-semibold">1 developer</span></span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Premium support: <span class="font-semibold">6 months</span></span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Free updates: <span class="font-semibold">6 months</span></span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                </ul>
                {/* <div class="bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white cursor-pointer" onClick={()=> navigate('/payment-1')}>Get started</div> */}
                <a href='https://secure.cardcom.solutions/EA/EA5/eh99WsV0GMe6HUUZxgug/Order' class="bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white cursor-pointer">Get started</a>
            </div>
            {/* <!-- Pricing Card --> */}
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 class="mb-4 text-2xl font-semibold">Company</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
                <div class="flex justify-center items-baseline my-8 space-x-1">
                {/* <span class="text-gray-500 dark:text-gray-400">חודש/ </span> */}
                    <span class="text-gray-500 dark:text-gray-400">חודש/</span>
                    <span class="mr-2 text-5xl font-extrabold">₪399</span>
                    
                </div>
                {/* <!-- List --> */}
                <ul role="list" class="mb-8 space-y-4 text-right">
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Individual configuration</span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
  
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>No setup, or hidden fees</span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Team size: <span class="font-semibold">10 developers</span></span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Premium support: <span class="font-semibold">24 months</span></span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Free updates: <span class="font-semibold">24 months</span></span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                </ul>
                <a href='https://secure.cardcom.solutions/EA/EA5/eh99WsV0GMe6HUUZxgug/Order' class="bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white cursor-pointer" >Get started</a>
            </div>
            {/* <!-- Pricing Card --> */}
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 class="mb-4 text-2xl font-semibold">Enterprise</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
                <div class="flex justify-center items-baseline my-8 space-x-1">
                {/* <span class="text-gray-500 dark:text-gray-400">חודש/ </span> */}
                    <span class="text-gray-500 dark:text-gray-400">חודש/</span>
                    <span class="mr-2 text-5xl font-extrabold">₪450</span>
                    
                </div>
                {/* <!-- List --> */}
                <ul role="list" class="mb-8 space-y-4 text-right">
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Individual configuration</span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>No setup, or hidden fees</span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Team size: <span class="font-semibold">100+ developers</span></span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Premium support: <span class="font-semibold">36 months</span></span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                    <li class="flex items-center justify-end space-x-3">
                        {/* <!-- Icon --> */}
                        <span>Free updates: <span class="font-semibold">36 months</span></span>
  
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </li>
                </ul>
                <a href='https://secure.cardcom.solutions/EA/EA5/eh99WsV0GMe6HUUZxgug/Order' class="bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white cursor-pointer" >Get started</a>
            </div>
        </div>
        <section className="bg-gray-100 text-gray-800 rounded-lg mt-8" >
	<div className="container mx-auto p-6 overflow-x-auto">
		<table className="w-full" dir="rtl">
			<caption className="sr-only">Pricing plan comparison</caption>
			<thead>
				<tr>
					<th></th>
					<th scope="col">
						<h2 className="px-2 text-lg font-medium">Starter</h2>
						<p className="mb-3">
							<span className="text-2xl font-bold sm:text-4xl text-gray-900">0€</span>
							<span className="font-medium text-gray-600">/mo</span>
						</p>
					</th>
					<th scope="col">
						<h2 className="px-2 text-lg font-medium">Standard</h2>
						<p className="mb-3">
							<span className="text-2xl font-bold sm:text-4xl text-gray-900">19€</span>
							<span className="font-medium text-gray-600">/mo</span>
						</p>
					</th>
					<th scope="col">
						<h2 className="px-2 text-lg font-medium">Premium</h2>
						<p className="mb-3">
							<span className="text-2xl font-bold sm:text-4xl text-gray-900">49€</span>
							<span className="font-medium text-gray-600">/mo</span>
						</p>
					</th>
				</tr>
			</thead>
			<tbody className="space-y-6 text-center divide-y divide-gray-300">
				<tr>
					<th scope="row" className="text-right">
						<h3 className="py-3">Euismod</h3>
					</th>
					<td>
						<span className="block text-sm">1</span>
					</td>
					<td>
						<span className="block text-sm">10</span>
					</td>
					<td>
						<span className="block text-sm">100</span>
					</td>
				</tr>
				<tr>
					<th scope="row" className="text-right">
						<h3 className="py-3">Principes et</h3>
					</th>
					<td>
						<span className="block text-sm">0,5 GB</span>
					</td>
					<td>
						<span className="block text-sm">5 GB</span>
					</td>
					<td>
						<span className="block text-sm">500 GB</span>
					</td>
				</tr>
				<tr>
					<th scope="row" className="text-right">
						<h3 className="py-3">Et mel porro</h3>
					</th>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Included in Free plan" className="w-5 h-5 mx-auto text-violet-600">
							<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
						</svg>
					</td>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Included in Standard plan" className="w-5 h-5 mx-auto text-violet-600">
							<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
						</svg>
					</td>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Included in Premium plan" className="w-5 h-5 mx-auto text-violet-600">
							<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
						</svg>
					</td>
				</tr>
				<tr>
					<th scope="row" className="text-right">
						<h3 className="py-3">Veniam suscipiantur</h3>
					</th>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Not included in Free plan" className="w-5 h-5 mx-auto text-gray-400">
							<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
						</svg>
					</td>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Included in Standard plan" className="w-5 h-5 mx-auto text-violet-600">
							<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
						</svg>
					</td>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Included in Premium plan" className="w-5 h-5 mx-auto text-violet-600">
							<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
						</svg>
					</td>
				</tr>
				<tr>
					<th scope="row" className="text-right">
						<h3 className="py-3">Ornatus tacimates</h3>
					</th>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Not included in Free plan" className="w-5 h-5 mx-auto text-gray-400">
							<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
						</svg>
					</td>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Not included in Standard plan" className="w-5 h-5 mx-auto text-gray-400">
							<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
						</svg>
					</td>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Included in Premium plan" className="w-5 h-5 mx-auto text-violet-600">
							<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
						</svg>
					</td>
				</tr>
				<tr>
					<th scope="row" className="text-right">
						<h3 className="py-3">Aliquam fastidii in mei</h3>
					</th>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Not included in Free plan" className="w-5 h-5 mx-auto text-gray-400">
							<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
						</svg>
					</td>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Not included in Standard plan" className="w-5 h-5 mx-auto text-gray-400">
							<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
						</svg>
					</td>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Included in Premium plan" className="w-5 h-5 mx-auto text-violet-600">
							<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
						</svg>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</section>
        <div className="bg-gray-900 min-h-[100vh] flex items-center justify-center">
      <div className="mx-5 pb-10">
        <div className="py-8 lg:py-14 flex flex-col items-center">
          <span
            className="text-indigo-500 text-base"
          >
            Pricing
          </span>
          <span className="font-semibold text-[#ccc] text-center text-4xl sm:text-5xl mt-3 mb-6">
            Compare our plans and find yours
          </span>
          <span className="sm:text-xl text-gray-500 text-center text-lg font-light">
            Simple, transparent pricing that grows with you. Try any plan free
            for 30 days.
          </span>
          {/* billing type div */}
          <div className="px-2 py-2 bg-[#F2F4F7] m-auto mt-5 md:mt-10 space-x-1 flex justify-center items-center rounded-lg">
            <button
              onClick={() => setMonthPrice(true)}
              className={`py-2 px-2 md:px-1.5 sm:px-3.5 drop-shadow-md hover:bg-white text-[#667085] hover:text-black rounded-md
                ${
                  monthprice && "bg-white border-[#94a3b8] border text-black "
                }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setMonthPrice(false)}
              className={`ml-1 py-2 px-2 md:px-1.5 sm:px-3.5 border-[#94a3b8] drop-shadow-md hover:bg-white text-[#667085]  hover:text-black rounded-md
                ${!monthprice && "bg-white border-[#94a3b8] border text-black"}
              `}
            >
              Annual billing
            </button>
          </div>
        </div>
        <div className="lg:max-w-[1200px] max-w-[450px] mx-auto bg-white rounded-xl" dir="rtl">
          <table className="w-full text-start border-spacing-5 border-separate flex flex-col lg:flex-row p-5 lg:p-0">
            {pricingData.map((data, index) => (
              <tbody
                key={index}
                className={
                  index === 0
                    ? "hidden lg:block"
                    : "border-2 lg:border-none mb-10 lg:mb-0 rounded-lg"
                }
              >
                <tr>
                  <td>
                    <div className="flex items-center justify-center w-full font-semibold text-xl text-center text-[#101828] h-7">
                      <h1>{data.mainTitle}</h1>
                      {data.popular && (
                        <h1
                          className="text-sm font-medium relative right-1.5 text-[#365CCE] px-2.5 py-0.5 bg-[#F9F5FF] rounded-2xl ml-2"
                        >
                          פופולרי
                        </h1>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="h-[50px] text-center">
                    <div className="flex items-center justify-center">    
                      <span className="font-semibold text-5xl text-center">
                        {monthprice ? data.price?.month : data.price?.year}
                      </span>
                      {data.price && (
                        <span className="text-[#475467] font-normal ml-1">
                          {monthprice ? "/חודש" : "/שנה"}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="h-[50px] lg:h-[70px] xl:h-[50px] text-center">
                    <span className="text-[#475467] text-sm font-normal">
                      {data.infoNote}
                    </span>
                  </td>
                </tr>
                <tr>
                  {index === 0 ? (
                    <td className="h-[50px]"></td>
                  ) : (
                    <td>
                      <button
                        className="w-full bg-[#365CCE] text-white rounded-lg py-3 font-semibold"
                      >
                        Get Started
                      </button>
                    </td>
                  )}
                </tr>
                {/* portion after first title */}
                <tr>
                  <td
                    className="h-5 text-sm font-semibold text-[#365CCE]"
                    colSpan={2}
                  >
                    {data.titleRow1}
                    <span className="lg:hidden ">
                      {pricingData[0]["titleRow1"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    className={
                      index === 0
                        ? ""
                        : "h-7 flex justify-between lg:justify-center flex-row-reverse "
                    }
                  >
                    <span className="text-sm font-semibold text-[#60a5fa]">
                      {data["Basic Feature"] === true ? (
                        <>
                          <RightIcon bgcolor={`#365CCE`} />
                        </>
                      ) : (
                        <span className="font-medium text-sm text-[#101828] ">
                          Basic Feature
                        </span>
                      )}
                    </span>
                    <span className="lg:hidden">
                      {pricingData[0]["Basic Feature"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    className={
                      index === 0
                        ? "h-5"
                        : "h-6 text-center flex justify-between lg:justify-center flex-row-reverse"
                    }
                  >
                    <span className="font-medium text-sm text-[#101828]">
                      {data.Users}
                    </span>
                    <span className="lg:hidden">{pricingData[0]["Users"]}</span>
                  </td>
                </tr>
                <tr>
                  <td
                    className={
                      index === 0
                        ? "h-5"
                        : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"
                    }
                  >
                    <span className="font-medium text-sm text-[#101828]">
                      {data["Individual data"]}
                    </span>
                    <span className="lg:hidden">
                      {pricingData[0]["Individual data"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    className={
                      index === 0
                        ? "h-7"
                        : "h-7 flex justify-between lg:justify-center flex-row-reverse"
                    }
                  >
                    {data.Support === true ? (
                      <>
                        <RightIcon bgcolor={`#365CCE`} />
                      </>
                    ) : (
                      <span className="font-medium text-sm text-[#101828]">
                        Support
                      </span>
                    )}
                    <span className="lg:hidden">
                      {pricingData[0]["Support"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <hr />
                  </td>
                </tr>
                {/* portion after second title */}
                <tr>
                  <td
                    className="h-5 text-sm font-semibold text-[#365CCE] whitespace-nowrap"
                  >
                    {data.titleRow5}
                    <span className="lg:hidden">
                      {pricingData[0]["titleRow5"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    className={
                      index === 0
                        ? "h-5"
                        : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"
                    }
                  >
                    <span>{data.Analytics}</span>
                    <span className="lg:hidden">
                      {pricingData[0]["Analytics"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    className={
                      index === 0
                        ? "h-5"
                        : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"
                    }
                  >
                    {data["Export Reports"] === true ? (
                      <RightIcon bgcolor={`#365CCE`} />
                    ) : (
                      <span className="font-medium text-sm text-[#101828]">
                        Export reports
                      </span>
                    )}
                    <span className="lg:hidden">
                      {pricingData[0]["Export Reports"]}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    className={
                      index === 0
                        ? "h-5"
                        : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"
                    }
                  >
                    {data["Api Access"] === true ? (
                      <RightIcon bgcolor={`#365CCE`} />
                    ) : data["Api Access"] === false ? (
                      <LineIcon bgcolor={`#365CCE`} />
                    ) : (
                      data["Api Access"]
                    )}
                    <span className="lg:hidden">
                      {pricingData[0]["Api Access"]}
                    </span>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
    </div>
    <div class="bg-white pb-8 pt-20">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    {/* <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">Trusted by the world’s most innovative teams</h2> */}
    <h2 class="text-center text-xl font-semibold leading-8 text-gray-900">אנו מתאימים את עצמנו ואת תהליכי הפיתוח שאנו מציעים לכל ארגון ע"פ צרכיו</h2>
    <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
      <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg" alt="Transistor" width="158" height="48"/>
      <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg" alt="Reform" width="158" height="48"/>
      <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg" alt="Tuple" width="158" height="48"/>
      <img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg" alt="SavvyCal" width="158" height="48"/>
      <img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg" alt="Statamic" width="158" height="48"/>
    </div>
  </div>
</div>
  </section>
  )
}

export default Pricing