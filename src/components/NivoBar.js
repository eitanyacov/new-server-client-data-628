import React, { useContext } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import { ThemeContext } from "../App";


const NivoBar = ({ arr, theme, lang }) => {
  
  const { hebrew, globalTheme, chart, space } = useContext(ThemeContext)

    const data = [
        {
          "country": arr[0].חודש,
          "הוצאות סחורה": arr[0].סחורה,
          "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
          "הוצאות משתנות": arr[0].משתנות,
          "הוצאות משתנותColor": "hsl(214, 70%, 50%)",
          "הוצאות קבועות": arr[0].קבועות,
          "הוצאות קבועותColor": "hsl(102, 70%, 50%)",
          "משכורות": arr[0].משכורת,
          "משכורותColor": "hsl(262, 70%, 50%)"
        //   "fries": 114,
        //   "friesColor": "hsl(340, 70%, 50%)",
        //   "donut": 147,
        //   "donutColor": "hsl(149, 70%, 50%)"
        },
        {
          "country": arr[1].חודש,
          "הוצאות סחורה": arr[1].סחורה,
          "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
          "הוצאות משתנות": arr[1].משתנות,
          "הוצאות משתנותColor": "hsl(308, 70%, 50%)",
          "הוצאות קבועות": arr[1].קבועות,
          "הוצאות קבועותColor": "hsl(221, 70%, 50%)",
          "משכורות": arr[1].משכורת,
          "משכורותColor": "hsl(151, 70%, 50%)"
        //   "fries": 167,
        //   "friesColor": "hsl(131, 70%, 50%)",
        //   "donut": 184,
        //   "donutColor": "hsl(38, 70%, 50%)"
        },
        {
          "country": arr[2].חודש,
          "הוצאות סחורה": arr[2].סחורה,
          "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
          "הוצאות משתנות": arr[2].משתנות,
          "הוצאות משתנותColor": "hsl(69, 70%, 50%)",
          "הוצאות קבועות": arr[2].קבועות,
          "הוצאות קבועותColor": "hsl(256, 70%, 50%)",
          "משכורות": arr[2].משכורת,
          "משכורותColor": "hsl(209, 70%, 50%)"
        //   "fries": 197,
        //   "friesColor": "hsl(183, 70%, 50%)",
        //   "donut": 24,
        //   "donutColor": "hsl(275, 70%, 50%)"
        },
        {
          "country": arr[3].חודש,
          "הוצאות סחורה": arr[3].סחורה,
          "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
          "הוצאות משתנות": arr[3].משתנות,
          "הוצאות משתנותColor": "hsl(103, 70%, 50%)",
          "הוצאות קבועות": arr[3].קבועות,
          "הוצאות קבועותColor": "hsl(220, 70%, 50%)",
          "משכורות": arr[3].משכורת,
          "משכורותColor": "hsl(346, 70%, 50%)"
        //   "fries": 154,
        //   "friesColor": "hsl(99, 70%, 50%)",
        //   "donut": 73,
        //   "donutColor": "hsl(101, 70%, 50%)"
        },
        {
          "country": arr[4].חודש,
          "הוצאות סחורה": arr[4].סחורה,
          "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
          "הוצאות משתנות": arr[4].משתנות,
          "הוצאות משתנותColor": "hsl(285, 70%, 50%)",
          "הוצאות קבועות": arr[4].קבועות,
          "הוצאות קבועותColor": "hsl(209, 70%, 50%)",
          "משכורות": arr[4].משכורת,
          "משכורותColor": "hsl(30, 70%, 50%)"
        //   "fries": 104,
        //   "friesColor": "hsl(302, 70%, 50%)",
        //   "donut": 80,
        //   "donutColor": "hsl(54, 70%, 50%)"
        },
        {
          "country": arr[5].חודש,
          "הוצאות סחורה": arr[5].סחורה,
          "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
          "הוצאות משתנות": arr[5].משתנות,
          "הוצאות משתנותColor": "hsl(29, 70%, 50%)",
          "הוצאות קבועות": arr[5].קבועות,
          "הוצאות קבועותColor": "hsl(205, 70%, 50%)",
          "משכורות": arr[5].משכורת,
          "משכורותColor": "hsl(341, 70%, 50%)"
        //   "fries": 179,
        //   "friesColor": "hsl(115, 70%, 50%)",
        //   "donut": 76,
        //   "donutColor": "hsl(102, 70%, 50%)"
        },
        {
          "country": arr[6].חודש,
          "הוצאות סחורה": arr[6].סחורה,
          "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
          "הוצאות משתנות": arr[6].משתנות,
          "הוצאות משתנותColor": "hsl(197, 70%, 50%)",
          "הוצאות קבועות": arr[6].קבועות,
          "הוצאות קבועותColor": "hsl(275, 70%, 50%)",
          "משכורות": arr[6].משכורת,
          "משכורותColor": "hsl(6, 70%, 50%)"
        //   "fries": 135,
        //   "friesColor": "hsl(168, 70%, 50%)",
        //   "donut": 116,
        //   "donutColor": "hsl(333, 70%, 50%)"
        },
        {
            "country": arr[7].חודש,
            "הוצאות סחורה": arr[7].סחורה,
            "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
            "הוצאות משתנות": arr[7].משתנות,
            "הוצאות משתנותColor": "hsl(197, 70%, 50%)",
            "הוצאות קבועות": arr[7].קבועות,
            "הוצאות קבועותColor": "hsl(275, 70%, 50%)",
            "משכורות": arr[7].משכורת,
            "משכורותColor": "hsl(6, 70%, 50%)"
            // "fries": 135,
            // "friesColor": "hsl(168, 70%, 50%)",
            // "donut": 116,
            // "donutColor": "hsl(333, 70%, 50%)"
          },
          {
            "country": arr[8].חודש,
            "הוצאות סחורה": arr[8].סחורה,
            "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
            "הוצאות משתנות": arr[8].משתנות,
            "הוצאות משתנותColor": "hsl(197, 70%, 50%)",
            "הוצאות קבועות": arr[8].קבועות,
            "הוצאות קבועותColor": "hsl(275, 70%, 50%)",
            "משכורות": arr[8].משכורת,
            "משכורותColor": "hsl(6, 70%, 50%)"
            // "fries": 135,
            // "friesColor": "hsl(168, 70%, 50%)",
            // "donut": 116,
            // "donutColor": "hsl(333, 70%, 50%)"
          },
          {
            "country": arr[9].חודש,
            "הוצאות סחורה": arr[9].סחורה,
            "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
            "הוצאות משתנות": arr[9].משתנות,
            "הוצאות משתנותColor": "hsl(197, 70%, 50%)",
            "הוצאות קבועות": arr[9].קבועות,
            "הוצאות קבועותColor": "hsl(275, 70%, 50%)",
            "משכורות": arr[9].משכורת,
            "משכורותColor": "hsl(6, 70%, 50%)"
            // "fries": 135,
            // "friesColor": "hsl(168, 70%, 50%)",
            // "donut": 116,
            // "donutColor": "hsl(333, 70%, 50%)"
          },
          {
            "country": arr[10].חודש,
            "הוצאות סחורה": arr[10].סחורה,
            "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
            "הוצאות משתנות": arr[10].משתנות,
            "הוצאות משתנותColor": "hsl(197, 70%, 50%)",
            "הוצאות קבועות": arr[10].קבועות,
            "הוצאות קבועותColor": "hsl(275, 70%, 50%)",
            "משכורות": arr[10].משכורת,
            "משכורותColor": "hsl(6, 70%, 50%)"
            // "fries": 135,
            // "friesColor": "hsl(168, 70%, 50%)",
            // "donut": 116,
            // "donutColor": "hsl(333, 70%, 50%)"
          },
          {
            "country": arr[11].חודש,
            "הוצאות סחורה": arr[11].סחורה,
            "הוצאות סחורהColor": "hsl(211, 70%, 50%)",
            "הוצאות משתנות": arr[11].משתנות,
            "הוצאות משתנותColor": "hsl(197, 70%, 50%)",
            "הוצאות קבועות": arr[11].קבועות,
            "הוצאות קבועותColor": "hsl(275, 70%, 50%)",
            "משכורות": arr[11].משכורת,
            "משכורותColor": "hsl(6, 70%, 50%)"
            // "fries": 135,
            // "friesColor": "hsl(168, 70%, 50%)",
            // "donut": 116,
            // "donutColor": "hsl(333, 70%, 50%)"
          }
      ]

      const datas = [
        {
          "country": arr[0].חודש,
          "commodities": arr[0].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[0].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          "permanent": arr[0].קבועות,
          "permanentColor": "hsl(102, 70%, 50%)",
          "salaries": arr[0].משכורת,
          "salariesColor": "hsl(262, 70%, 50%)"
        //   "fries": 114,
        //   "friesColor": "hsl(340, 70%, 50%)",
        //   "donut": 147,
        //   "donutColor": "hsl(149, 70%, 50%)"
        },
        {
            "country": arr[1].חודש,
            "commodities": arr[1].סחורה,
            "commoditiesColor": "hsl(211, 70%, 50%)",
            "changeable": arr[1].משתנות,
            "changeableColor": "hsl(214, 70%, 50%)",
            "permanent": arr[1].קבועות,
            "permanentColor": "hsl(102, 70%, 50%)",
            "salaries": arr[1].משכורת,
            "salariesColor": "hsl(262, 70%, 50%)"
        //   "fries": 167,
        //   "friesColor": "hsl(131, 70%, 50%)",
        //   "donut": 184,
        //   "donutColor": "hsl(38, 70%, 50%)"
        },
        {
          "country": arr[2].חודש,
          "commodities": arr[2].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[2].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          "permanent": arr[2].קבועות,
          "permanentColor": "hsl(102, 70%, 50%)",
          "salaries": arr[2].משכורת,
          "salariesColor": "hsl(262, 70%, 50%)"
        //   "fries": 197,
        //   "friesColor": "hsl(183, 70%, 50%)",
        //   "donut": 24,
        //   "donutColor": "hsl(275, 70%, 50%)"
        },
        {
            "country": arr[3].חודש,
            "commodities": arr[3].סחורה,
            "commoditiesColor": "hsl(211, 70%, 50%)",
            "changeable": arr[3].משתנות,
            "changeableColor": "hsl(214, 70%, 50%)",
            "permanent": arr[3].קבועות,
            "permanentColor": "hsl(102, 70%, 50%)",
            "salaries": arr[3].משכורת,
            "salariesColor": "hsl(262, 70%, 50%)"
        //   "fries": 154,
        //   "friesColor": "hsl(99, 70%, 50%)",
        //   "donut": 73,
        //   "donutColor": "hsl(101, 70%, 50%)"
        },
        {
          "country": arr[4].חודש,
          "commodities": arr[4].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[4].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          "permanent": arr[4].קבועות,
          "permanentColor": "hsl(102, 70%, 50%)",
          "salaries": arr[4].משכורת,
          "salariesColor": "hsl(262, 70%, 50%)"
        //   "fries": 104,
        //   "friesColor": "hsl(302, 70%, 50%)",
        //   "donut": 80,
        //   "donutColor": "hsl(54, 70%, 50%)"
        },
        {
            "country": arr[5].חודש,
            "commodities": arr[5].סחורה,
            "commoditiesColor": "hsl(211, 70%, 50%)",
            "changeable": arr[5].משתנות,
            "changeableColor": "hsl(214, 70%, 50%)",
            "permanent": arr[5].קבועות,
            "permanentColor": "hsl(102, 70%, 50%)",
            "salaries": arr[5].משכורת,
            "salariesColor": "hsl(262, 70%, 50%)"
        //   "fries": 179,
        //   "friesColor": "hsl(115, 70%, 50%)",
        //   "donut": 76,
        //   "donutColor": "hsl(102, 70%, 50%)"
        },
        {
            "country": arr[6].חודש,
            "commodities": arr[6].סחורה,
            "commoditiesColor": "hsl(211, 70%, 50%)",
            "changeable": arr[6].משתנות,
            "changeableColor": "hsl(214, 70%, 50%)",
            "permanent": arr[6].קבועות,
            "permanentColor": "hsl(102, 70%, 50%)",
            "salaries": arr[6].משכורת,
            "salariesColor": "hsl(262, 70%, 50%)"
        //   "fries": 135,
        //   "friesColor": "hsl(168, 70%, 50%)",
        //   "donut": 116,
        //   "donutColor": "hsl(333, 70%, 50%)"
        },
        {
            "country": arr[7].חודש,
            "commodities": arr[7].סחורה,
            "commoditiesColor": "hsl(211, 70%, 50%)",
            "changeable": arr[7].משתנות,
            "changeableColor": "hsl(214, 70%, 50%)",
            "permanent": arr[7].קבועות,
            "permanentColor": "hsl(102, 70%, 50%)",
            "salaries": arr[7].משכורת,
            "salariesColor": "hsl(262, 70%, 50%)"
            // "fries": 135,
            // "friesColor": "hsl(168, 70%, 50%)",
            // "donut": 116,
            // "donutColor": "hsl(333, 70%, 50%)"
          },
          {
            "country": arr[8].חודש,
          "commodities": arr[8].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[8].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          "permanent": arr[8].קבועות,
          "permanentColor": "hsl(102, 70%, 50%)",
          "salaries": arr[8].משכורת,
          "salariesColor": "hsl(262, 70%, 50%)"
            // "fries": 135,
            // "friesColor": "hsl(168, 70%, 50%)",
            // "donut": 116,
            // "donutColor": "hsl(333, 70%, 50%)"
          },
          {
            "country": arr[9].חודש,
          "commodities": arr[9].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[9].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          "permanent": arr[9].קבועות,
          "permanentColor": "hsl(102, 70%, 50%)",
          "salaries": arr[9].משכורת,
          "salariesColor": "hsl(262, 70%, 50%)"
            // "fries": 135,
            // "friesColor": "hsl(168, 70%, 50%)",
            // "donut": 116,
            // "donutColor": "hsl(333, 70%, 50%)"
          },
          {
            "country": arr[10].חודש,
          "commodities": arr[10].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[10].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          "permanent": arr[10].קבועות,
          "permanentColor": "hsl(102, 70%, 50%)",
          "salaries": arr[10].משכורת,
          "salariesColor": "hsl(262, 70%, 50%)"
            // "fries": 135,
            // "friesColor": "hsl(168, 70%, 50%)",
            // "donut": 116,
            // "donutColor": "hsl(333, 70%, 50%)"
          },
          {
            "country": arr[11].חודש,
          "commodities": arr[11].סחורה,
          "commoditiesColor": "hsl(211, 70%, 50%)",
          "changeable": arr[11].משתנות,
          "changeableColor": "hsl(214, 70%, 50%)",
          "permanent": arr[11].קבועות,
          "permanentColor": "hsl(102, 70%, 50%)",
          "salaries": arr[11].משכורת,
          "salariesColor": "hsl(262, 70%, 50%)"
            // "fries": 135,
            // "friesColor": "hsl(168, 70%, 50%)",
            // "donut": 116,
            // "donutColor": "hsl(333, 70%, 50%)"
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
                        "fill": theme != "light" || space ? "white" : "#4b5563"
                    }
                },
                "ticks": {
                    "line": {
                        "stroke": "#777777",
                        "strokeWidth": 1
                    },
                    "text": {
                        "fontSize": 11,
                        "fill": theme != "light" || space ? "white" : "#4b5563"
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
                        "fill": theme != "light" || space ? "white" : "#4b5563"
                    }
                },
                "text": {
                    "fontSize": 11,
                    "fill": theme != "light" || space ? "white" : "#4b5563"
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
            lang ? 'commodities' :'הוצאות סחורה',
            lang ? 'changeable' :'הוצאות משתנות',
            lang ? 'permanent' :'הוצאות קבועות',
            lang ? 'salaries' : 'משכורות'   
            // 'fries',
            // 'donut'
        ]}
        indexBy="country"
        margin={{ top: 15, right: 30, bottom: 40, left: 70 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
       
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        // borderRadius={4}
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
            legend: hebrew ? "annual outcome" : "הוצאות שנתיות",
            legendPosition: 'middle',
            legendOffset: -55
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
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom',
                direction: 'raw',
                justify: true,
                translateX: 0,
                translateY: 0,
                itemsSpacing: 30,
                itemWidth: 50,
                itemHeight: 10,
                itemDirection: 'bottom-to-top',
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

export default NivoBar