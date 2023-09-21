import React, { useContext } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import { ThemeContext } from "../App";


const NivoBar2 = ({ arr, theme, lang }) => {
  
  const { hebrew, globalTheme, chart } = useContext(ThemeContext)

    const data = [
        {
          "country": arr[0].name,
          "סחורה": arr[0].סחורה,
          "סחורהColor": "hsl(211, 70%, 50%)",
          "הכנסה": arr[0].הכנסות,
          "הכנסהColor": "hsl(197, 70%, 50%)",
         
        },
        {
          "country": arr[1].name,
          "סחורה": arr[1].סחורה,
          "סחורהColor": "hsl(211, 70%, 50%)",
          "הכנסה": arr[1].הכנסות,
          "הכנסהColor": "hsl(197, 70%, 50%)",
         
        },
        {
          "country": arr[2].name,
          "סחורה": arr[2].סחורה,
          "סחורהColor": "hsl(211, 70%, 50%)",
          "הכנסה": arr[2].הכנסות,
          "הכנסהColor": "hsl(197, 70%, 50%)",
         
        },
        {
          "country": arr[3].name,
          "סחורה": arr[3].סחורה,
          "סחורהColor": "hsl(211, 70%, 50%)",
          "הכנסה": arr[3].הכנסות,
          "הכנסהColor": "hsl(197, 70%, 50%)",
          
        },
        {
          "country": arr[4].name,
          "סחורה": arr[4].סחורה,
          "סחורהColor": "hsl(211, 70%, 50%)",
          "הכנסה": arr[4].הכנסות,
          "הכנסהColor": "hsl(197, 70%, 50%)",
    
        },
        {
          "country": arr[5].name,
          "סחורה": arr[5].סחורה,
          "סחורהColor": "hsl(211, 70%, 50%)",
          "הכנסה": arr[5].הכנסות,
          "הכנסהColor": "hsl(197, 70%, 50%)",
          
        },
        {
          "country": arr[6].name,
          "סחורה": arr[6].סחורה,
          "סחורהColor": "hsl(211, 70%, 50%)",
          "הכנסה": arr[6].הכנסות,
          "הכנסהColor": "hsl(197, 70%, 50%)",
         
        },
        {
            "country": arr[7].name,
            "סחורה": arr[7].סחורה,
            "סחורהColor": "hsl(211, 70%, 50%)",
            "הכנסה": arr[7].הכנסות,
            "הכנסהColor": "hsl(197, 70%, 50%)",
           
          },
          {
            "country": arr[8].name,
            "סחורה": arr[8].סחורה,
            "סחורהColor": "hsl(211, 70%, 50%)",
            "הכנסה": arr[8].הכנסות,
            "הכנסהColor": "hsl(197, 70%, 50%)",
           
          },
          {
            "country": arr[9].name,
            "סחורה": arr[9].סחורה,
            "סחורהColor": "hsl(211, 70%, 50%)",
            "הכנסה": arr[9].הכנסות,
            "הכנסהColor": "hsl(197, 70%, 50%)",
            
          },
          {
            "country": arr[10].name,
            "סחורה": arr[10].סחורה,
            "סחורהColor": "hsl(211, 70%, 50%)",
            "הכנסה": arr[10].הכנסות,
            "הכנסהColor": "hsl(197, 70%, 50%)",
           
          },
          {
            "country": arr[11].name,
            "סחורה": arr[11].סחורה,
            "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
            "הכנסה": arr[11].הכנסות,
            "הכנסהColor": "hsl(197, 70%, 50%)",
           
          }
      ]

      const datas = [
        {
          "country": arr[0].חודש,
          "commodities": arr[0].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[0].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          
        },
        {
            "country": arr[1].חודש,
            "commodities": arr[1].סחורה,
            "commoditiesColor": "hsl(211, 70%, 50%)",
            "changeable": arr[1].משתנות,
            "changeableColor": "hsl(214, 70%, 50%)",
            
        },
        {
          "country": arr[2].חודש,
          "commodities": arr[2].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[2].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          
        },
        {
            "country": arr[3].חודש,
            "commodities": arr[3].סחורה,
            "commoditiesColor": "hsl(211, 70%, 50%)",
            "changeable": arr[3].משתנות,
            "changeableColor": "hsl(214, 70%, 50%)",
            
        },
        {
          "country": arr[4].חודש,
          "commodities": arr[4].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[4].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
         
        },
        {
            "country": arr[5].חודש,
            "commodities": arr[5].סחורה,
            "commoditiesColor": "hsl(211, 70%, 50%)",
            "changeable": arr[5].משתנות,
            "changeableColor": "hsl(214, 70%, 50%)",
            
        },
        {
            "country": arr[6].חודש,
            "commodities": arr[6].סחורה,
            "commoditiesColor": "hsl(211, 70%, 50%)",
            "changeable": arr[6].משתנות,
            "changeableColor": "hsl(214, 70%, 50%)",
           
        },
        {
            "country": arr[7].חודש,
            "commodities": arr[7].סחורה,
            "commoditiesColor": "hsl(211, 70%, 50%)",
            "changeable": arr[7].משתנות,
            "changeableColor": "hsl(214, 70%, 50%)",
           
          },
          {
            "country": arr[8].חודש,
          "commodities": arr[8].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[8].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          
          },
          {
            "country": arr[9].חודש,
          "commodities": arr[9].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[9].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          
          },
          {
            "country": arr[10].חודש,
          "commodities": arr[10].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[10].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          },
          {
            "country": arr[11].חודש,
          "commodities": arr[11].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[11].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
         
          }
      ]
  return (
    <ResponsiveBar
        data={lang ? datas : data}
        theme={
          {
            // "background": "#ffffff",
            "textColor": "#333333",
            "fontSize": 11,
            "axis": {
                "domain": {
                    "line": {
                        "stroke": "#777777",
                        "strokeWidth": 1
                    }
                },
                "legend": {
                    "text": {
                        "fontSize": 12,
                        "fill": "#333333"
                    }
                },
                "ticks": {
                    "line": {
                        "stroke": "#ffffff",
                        "strokeWidth": 1
                    },
                    "text": {
                        "fontSize": 11,
                        "fill": theme == "light" ? "#333333" : "white"
                    }
                }
            },
            "grid": {
                "line": {
                    "stroke": "#dddddd",
                    "strokeWidth": 1
                }
            },
            "legends": {
                "title": {
                    "text": {
                        "fontSize": 11,
                        "fill": "#333333"
                    }
                },
                "text": {
                    "fontSize": 11,
                    "fill": theme == "light" ? "#333333" : "white"
                },
                "ticks": {
                    "line": {},
                    "text": {
                        "fontSize": 10,
                        "fill": "#333333"
                    }
                }
            },
            "annotations": {
                "text": {
                    "fontSize": 13,
                    "fill": "#333333",
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "link": {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "outline": {
                    "stroke": "#000000",
                    "strokeWidth": 2,
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "symbol": {
                    "fill": "#000000",
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                }
            },
            "tooltip": {
                "container": {
                    "background": "#ffffff",
                    "color": "#333333",
                    "fontSize": 12
                },
                "basic": {},
                "chip": {},
                "table": {},
                "tableCell": {},
                "tableCellValue": {}
            }
        }
        }
        keys={[
            lang ? 'commodities' :'סחורה',
            lang ? 'changeable' :'הכנסה',
           
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.4}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        // colors={{ scheme: 'category10' }}
        colors={['#ef4444', '#22c55e']}
    
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        borderRadius={3}
        // borderWidth={2}
        innerPadding={1.5}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: 'טבלת הוצאות שנתית',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        enableLabel={chart}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    4
                ]
            ]
        }}
        
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'הכנסה'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'סחורה'
                },
                id: 'lines'
            },
           
        ]}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
  )
}

export default NivoBar2