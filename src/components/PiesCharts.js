import React, { useContext } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ThemeContext } from '../App';

const PiesCharts = () => {
  const screen = window.screen.availWidth
  const { theme, setTheme, globalTheme, setGlobalTheme } = useContext(ThemeContext)

    const data = [
        {
          name: 'רבעון 1',
          כללי: 40,
          גולמי: 24,
          תפעולי: 24,
        },
        {
          name: 'רבעון 2',
          כללי: 30,
          גולמי: 13,
          תפעולי: 22,
        },
        {
          name: 'רבעון 2',
          כללי: 20,
          גולמי: 98,
          תפעולי: 22,
        },
        {
          name: 'רבעון 4',
          כללי: 27,
          גולמי: 39,
          תפעולי: 20,
        },
        {
          name: 'רבעון 3',
          כללי: 18,
          גולמי: 48,
          תפעולי: 21,
        },
        {
          name: 'Page F',
          כללי: 23,
          גולמי: 38,
          תפעולי: 25,
        },
        {
          name: 'רבעון 4',
          כללי: 34,
          גולמי: 43,
          תפעולי: 21,
        },
      ];
    
      return (
        <div>  
         
         <BarChart
          width={285}
          height={138}
          data={data}
          margin={{
            // top: 20,
            // right: 30,
            // left: 20,
            // bottom: 8,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke={`${globalTheme != "light" ? "#ffffff" : "#393e46"}`}/>
          <YAxis stroke={`${globalTheme != "light" ? "#ffffff" : "#393e46"}`}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="גולמי" stackId="a" fill="#8884d8" />
          <Bar dataKey="תפעולי" stackId="a" fill="#82ca9d" />
          <Bar dataKey="כללי" fill="#ffc658" />
        </BarChart>
     
        </div>
        
        
            
       )
 
}

export default PiesCharts