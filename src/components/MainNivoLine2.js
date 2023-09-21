import React, { useContext } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { ThemeContext } from "../App";


const MainNivoLine2 = ({ arr, theme, lang, year }) => {
  const { hebrew, globalTheme } = useContext(ThemeContext)
  // let year = new Date().getFullYear()
  let name = ` הוצאות - ${ year} `
  let name2 = ` outcome -  ${ year} `

    const data =[
        // {
        //   "id": "הכנסה",
        //   "color": "hsl(277, 70%, 50%)",
        //   "data": [
        //     {
        //       "x": "ינואר",
        //       "y": 186
        //     },
        //     {
        //       "x": "פברואר",
        //       "y": 45
        //     },
        //     {
        //       "x": "מרץ",
        //       "y": 140
        //     },
        //     {
        //       "x": "אפריל",
        //       "y": 215
        //     },
        //     {
        //       "x": "מאי",
        //       "y": 289
        //     },
        //     {
        //       "x": "יוני",
        //       "y": 299
        //     },
        //     {
        //       "x": "יולי",
        //       "y": 75
        //     },
        //     {
        //       "x": "אוגוסט",
        //       "y": 263
        //     },
        //     {
        //       "x": "ספטמבר",
        //       "y": 190
        //     },
        //     {
        //       "x": "אוקטובר",
        //       "y": 129
        //     },
        //     {
        //       "x": "נובמבר",
        //       "y": 157
        //     },
        //     {
        //       "x": "דצמבר",
        //       "y": 21
        //     }
        //   ]
        // },
        {
          "id": "סחורה",
          "color": "hsl(29, 70%, 50%)",
          "data": [
            {
              "x": arr[0].חודש,
              "y": arr[0].סחורה,
            },
            {
              "x": arr[1].חודש,
              "y": arr[1].סחורה,
            },
            {
              "x": arr[2].חודש,
              "y": arr[2].סחורה,
            },
            {
              "x": arr[3].חודש,
              "y": arr[3].סחורה,
            },
            {
              "x": arr[4].חודש,
              "y": arr[4].סחורה,
            },
            {
              "x": arr[5].חודש,
              "y": arr[5].סחורה,
            },
            {
              "x": arr[6].חודש,
              "y": arr[6].סחורה,
            },
            {
              "x": arr[7].חודש,
              "y": arr[7].סחורה,
            },
            {
              "x": arr[8].חודש,
              "y": arr[8].סחורה,
            },
            {
              "x": arr[9].חודש,
              "y": arr[9].סחורה,
            },
            {
              "x": arr[10].חודש,
              "y": arr[10].סחורה,
            },
            {
              "x": arr[11].חודש,
              "y": arr[11].סחורה,
            }
          ]
        },
        {
          "id": "קבוע",
          "color": "hsl(40, 70%, 50%)",
          "data": [
            {
              "x": arr[0].חודש,
              "y": arr[0].קבועות
            },
            {
              "x": arr[1].חודש,
              "y": arr[1].קבועות
            },
            {
              "x": arr[2].חודש,
              "y": arr[2].קבועות
            },
            {
              "x": arr[3].חודש,
              "y": arr[3].קבועות
            },
            {
              "x": arr[4].חודש,
              "y": arr[4].קבועות
            },
            {
              "x": arr[5].חודש,
              "y": arr[5].קבועות
            },
            {
              "x": arr[6].חודש,
              "y": arr[6].קבועות
            },
            {
              "x": arr[7].חודש,
              "y": arr[7].קבועות
            },
            {
              "x": arr[8].חודש,
              "y": arr[8].קבועות
            },
            {
              "x": arr[9].חודש,
              "y": arr[9].קבועות
            },
            {
              "x": arr[10].חודש,
              "y": arr[10].קבועות
            },
            {
              "x": arr[11].חודש,
              "y": arr[11].קבועות
            }
          ]
        },
        {
          "id": "משתנה",
          "color": "hsl(139, 70%, 50%)",
          "data": [
            {
              "x": arr[0].חודש,
              "y": arr[0].משתנות
            },
            {
              "x": arr[1].חודש,
              "y": arr[1].משתנות
            },
            {
              "x": arr[2].חודש,
              "y": arr[2].משתנות
            },
            {
              "x": arr[3].חודש,
              "y": arr[3].משתנות
            },
            {
              "x": arr[4].חודש,
              "y": arr[4].משתנות
            },
            {
              "x": arr[5].חודש,
              "y": arr[5].משתנות
            },
            {
              "x": arr[6].חודש,
              "y": arr[6].משתנות
            },
            {
              "x": arr[7].חודש,
              "y": arr[7].משתנות
            },
            {
              "x": arr[8].חודש,
              "y": arr[8].משתנות
            },
            {
              "x": arr[9].חודש,
              "y": arr[9].משתנות
            },
            {
              "x": arr[10].חודש,
              "y": arr[10].משתנות
            },
            {
              "x": arr[11].חודש,
              "y": arr[11].משתנות
            }
          ]
        },
        {
          "id": "משכורות",
          "color": "hsl(193, 70%, 50%)",
          "data": [
            {
              "x": arr[0].חודש,
              "y": arr[0].משכורת
            },
            {
              "x": arr[1].חודש,
              "y": arr[1].משכורת
            },
            {
              "x": arr[2].חודש,
              "y": arr[2].משכורת
            },
            {
              "x": arr[3].חודש,
              "y": arr[3].משכורת
            },
            {
              "x": arr[4].חודש,
              "y": arr[4].משכורת
            },
            {
              "x": arr[5].חודש,
              "y": arr[5].משכורת
            },
            {
              "x": arr[6].חודש,
              "y": arr[6].משכורת
            },
            {
              "x": arr[7].חודש,
              "y": arr[7].משכורת
            },
            {
              "x": arr[8].חודש,
              "y": arr[8].משכורת
            },
            {
              "x": arr[9].חודש,
              "y": arr[9].משכורת
            },
            {
              "x": arr[10].חודש,
              "y": arr[10].משכורת
            },
            {
              "x": arr[11].חודש,
              "y": arr[11].משכורת
            }
          ]
        }
      ]


      // const datas =[
      //   {
      //     "id": "income",
      //     "color": "hsl(277, 70%, 50%)",
      //     "data": [
      //       {
      //         "x": "ינואר",
      //         "y": 186
      //       },
      //       {
      //         "x": "פברואר",
      //         "y": 45
      //       },
      //       {
      //         "x": "מרץ",
      //         "y": 140
      //       },
      //       {
      //         "x": "אפריל",
      //         "y": 215
      //       },
      //       {
      //         "x": "מאי",
      //         "y": 289
      //       },
      //       {
      //         "x": "יוני",
      //         "y": 299
      //       },
      //       {
      //         "x": "יולי",
      //         "y": 75
      //       },
      //       {
      //         "x": "אוגוסט",
      //         "y": 263
      //       },
      //       {
      //         "x": "ספטמבר",
      //         "y": 190
      //       },
      //       {
      //         "x": "אוקטובר",
      //         "y": 129
      //       },
      //       {
      //         "x": "נובמבר",
      //         "y": 157
      //       },
      //       {
      //         "x": "דצמבר",
      //         "y": 21
      //       }
      //     ]
      //   },
      //   {
      //     "id": "wares",
      //     "color": "hsl(29, 70%, 50%)",
      //     "data": [
      //       {
      //         "x": "ינואר",
      //         "y": 28
      //       },
      //       {
      //         "x": "פברואר",
      //         "y": 135
      //       },
      //       {
      //         "x": "מרץ",
      //         "y": 95
      //       },
      //       {
      //         "x": "אפריל",
      //         "y": 138
      //       },
      //       {
      //         "x": "מאי",
      //         "y": 173
      //       },
      //       {
      //         "x": "יוני",
      //         "y": 22
      //       },
      //       {
      //         "x": "יולי",
      //         "y": 278
      //       },
      //       {
      //         "x": "אוגוסט",
      //         "y": 42
      //       },
      //       {
      //         "x": "ספטמבר",
      //         "y": 150
      //       },
      //       {
      //         "x": "אוקטובר",
      //         "y": 290
      //       },
      //       {
      //         "x": "נובמבר",
      //         "y": 75
      //       },
      //       {
      //         "x": "דצמבר",
      //         "y": 16
      //       }
      //     ]
      //   },
      //   {
      //     "id": "perm",
      //     "color": "hsl(40, 70%, 50%)",
      //     "data": [
      //       {
      //         "x": "ינואר",
      //         "y": 59
      //       },
      //       {
      //         "x": "פברואר",
      //         "y": 41
      //       },
      //       {
      //         "x": "מרץ",
      //         "y": 295
      //       },
      //       {
      //         "x": "אפריל",
      //         "y": 123
      //       },
      //       {
      //         "x": "מאי",
      //         "y": 200
      //       },
      //       {
      //         "x": "יוני",
      //         "y": 10
      //       },
      //       {
      //         "x": "יולי",
      //         "y": 220
      //       },
      //       {
      //         "x": "אוגוסט",
      //         "y": 265
      //       },
      //       {
      //         "x": "ספטמבר",
      //         "y": 82
      //       },
      //       {
      //         "x": "אוקטובר",
      //         "y": 138
      //       },
      //       {
      //         "x": "נובמבר",
      //         "y": 259
      //       },
      //       {
      //         "x": "דצמבר",
      //         "y": 64
      //       }
      //     ]
      //   },
      //   {
      //     "id": "changed",
      //     "color": "hsl(139, 70%, 50%)",
      //     "data": [
      //       {
      //         "x": "ינואר",
      //         "y": 180
      //       },
      //       {
      //         "x": "פברואר",
      //         "y": 270
      //       },
      //       {
      //         "x": "מרץ",
      //         "y": 211
      //       },
      //       {
      //         "x": "אפריל",
      //         "y": 112
      //       },
      //       {
      //         "x": "מאי",
      //         "y": 176
      //       },
      //       {
      //         "x": "יוני",
      //         "y": 253
      //       },
      //       {
      //         "x": "יולי",
      //         "y": 157
      //       },
      //       {
      //         "x": "אוגוסט",
      //         "y": 152
      //       },
      //       {
      //         "x": "ספטמבר",
      //         "y": 264
      //       },
      //       {
      //         "x": "אוקטובר",
      //         "y": 228
      //       },
      //       {
      //         "x": "נובמבר",
      //         "y": 222
      //       },
      //       {
      //         "x": "דצמבר",
      //         "y": 21
      //       }
      //     ]
      //   },
      //   {
      //     "id": "salary",
      //     "color": "hsl(193, 70%, 50%)",
      //     "data": [
      //       {
      //         "x": "ינואר",
      //         "y": 118
      //       },
      //       {
      //         "x": "פברואר",
      //         "y": 219
      //       },
      //       {
      //         "x": "מרץ",
      //         "y": 255
      //       },
      //       {
      //         "x": "אפריל",
      //         "y": 70
      //       },
      //       {
      //         "x": "מאי",
      //         "y": 198
      //       },
      //       {
      //         "x": "יוני",
      //         "y": 242
      //       },
      //       {
      //         "x": "יולי",
      //         "y": 99
      //       },
      //       {
      //         "x": "אוגוסט",
      //         "y": 151
      //       },
      //       {
      //         "x": "ספטמבר",
      //         "y": 15
      //       },
      //       {
      //         "x": "אוקטובר",
      //         "y": 296
      //       },
      //       {
      //         "x": "נובמבר",
      //         "y": 141
      //       },
      //       {
      //         "x": "דצמבר",
      //         "y": 111
      //       }
      //     ]
      //   }
      // ]

      
  return (
    <ResponsiveLine
    data={data}
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
                        "fontSize": 11,
                        "fill": globalTheme == "light" ? "#333333" : "white"
                    }
                },
                "ticks": {
                    "line": {
                        "stroke": "#777777",
                        "strokeWidth": 1
                    },
                    "text": {
                        "fontSize": 9,
                        "fill": globalTheme == "light" ? "#333333" : "white"
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
                        "fill": globalTheme == "light" ? "#333333" : "white"
                    }
                },
                "text": {
                    "fontSize": 11,
                    "fill": globalTheme == "light" ? "#333333" : "white"
                },
                "ticks": {
                    "line": {},
                    "text": {
                        "fontSize": 10,
                        "fill": globalTheme == "light" ? "#333333" : "white"
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
          lang ? 'changeable' :'משתנה',
          lang ? 'permanent' :'קבוע',
          lang ? 'salaries' : 'משכורות',  
          lang ? 'income' : 'הכנסה'
          // 'fries',
          // 'donut'
      ]}
        margin={{ top: 18, right: 15, bottom: 20, left: 50 }}
        // axisBottom={null}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        // axisBottom={null}
        // axisLeft={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'top'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 3,
            tickPadding: 2,
            tickRotation: 0,
            legend: hebrew ? name2 : name,
            legendOffset: globalTheme == "light" ? -40 : -45,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'set1' }}
        pointSize={8}
        enablePoints={false}
        pointLabel="y"
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        // enablePointLabel={true}
        enableArea={true}
        areaOpacity={globalTheme == "light" ? "0.3" : "0.5"}
        useMesh={true}
        legends={[
          {
              anchor: 'top',
              direction: 'row',
              justify: true,
              translateX: -8,
              translateY: -24,
              itemsSpacing: 15,
              itemDirection: 'right-to-left',
              itemWidth: 55,
              itemHeight: 25,
              itemOpacity: 0.75,
              symbolSize: 8,
              symbolShape: 'square',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
    //     legends={[
    //       {
    //           anchor: 'bottom',
    //           direction: 'row',
    //           justify: true,
    //           translateX: -1,
    //           translateY: 13,
    //           itemsSpacing: lang ? 5 : 1,
    //           itemDirection: 'bottom-to-top',
    //           itemWidth: 42,
    //           itemHeight: 25,
    //           itemOpacity: 0.75,
    //           symbolSize: 10,
    //           symbolShape: 'circle',
    //           symbolBorderColor: 'rgba(0, 0, 0, .5)',
    //           effects: [
    //               {
    //                   on: 'hover',
    //                   style: {
    //                       itemBackground: 'rgba(0, 0, 0, .03)',
    //                       itemOpacity: 1
    //                   }
    //               }
    //           ]
    //       }
    //   ]}
        // legends={[
        //     {
        //         anchor: 'bottom-right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 100,
        //         translateY: 0,
        //         itemsSpacing: 0,
        //         itemDirection: 'left-to-right',
        //         itemWidth: 80,
        //         itemHeight: 20,
        //         itemOpacity: 0.75,
        //         symbolSize: 20,
        //         symbolShape: 'circle',
        //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemBackground: 'rgba(0, 0, 0, .03)',
        //                     itemOpacity: 1
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />
  )
}

export default MainNivoLine2