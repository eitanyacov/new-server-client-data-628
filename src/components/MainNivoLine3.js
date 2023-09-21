import React, { useContext } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { ThemeContext } from "../App";


const MainNivoLine3 = ({ arr, arrx }) => {
    const { hebrew, globalTheme, chart2, area, space } = useContext(ThemeContext)
    let month = new Date().getMonth() + 1

    const data = [
        {
          "id": hebrew ? "income" : "הכנסה",
          // "color": "hsl(71, 70%, 50%)",
          "data": [
            {
              "x": arr[0].name,
              "y": arr[0].הוצאה,
            },
            {
              "x": arr[1].name,
              "y": arr[1].הוצאה,
            },
            {
              "x": arr[2].name,
              "y": arr[2].הוצאה,
            },
            {
              "x": arr[3].name,
              "y": arr[3].הוצאה,
            },
            {
              "x": arr[4].name,
              "y": arr[4].הוצאה,
            },
            {
              "x": arr[5].name,
              "y": arr[5].הוצאה,
            },
            {
              "x": arr[6].name,
              "y": arr[6].הוצאה,
            },
            {
              "x": arr[7].name,
              "y": arr[7].הוצאה,
            },
            {
              "x": arr[8].name,
              "y": arr[8].הוצאה,
            },
            {
              "x": arr[9].name,
              "y": arr[9].הוצאה,
            },
            {
              "x": arr[10].name,
              "y": arr[10].הוצאה,
            },
            {
              "x": arr[11].name,
              "y": arr[11].הוצאה,
            },
            {
                "x": arr[12].name,
                "y": arr[12].הוצאה,
              },
              {
                "x": arr[13].name,
                "y": arr[13].הוצאה,
              },
              {
                "x": arr[14].name,
                "y": arr[14].הוצאה,
              },
              {
                "x": arr[15].name,
                "y": arr[15].הוצאה,
              },
              {
                "x": arr[16].name,
                "y": arr[16].הוצאה,
              },
              {
                "x": arr[17].name,
                "y": arr[17].הוצאה,
              },
              {
                "x": arr[18].name,
                "y": arr[18].הוצאה,
              },
              {
                "x": arr[19].name,
                "y": arr[19].הוצאה,
              },
              {
                "x": arr[20].name,
                "y": arr[20].הוצאה,
              },
              {
                "x": arr[21].name,
                "y": arr[21].הוצאה,
              },
              {
                "x": arr[22].name,
                "y": arr[22].הוצאה,
              },
              {
                "x": arr[23].name,
                "y": arr[23].הוצאה,
              },
              {
                "x": arr[24].name,
                "y": arr[24].הוצאה,
              },
              {
                "x": arr[25].name,
                "y": arr[25].הוצאה,
              },
              {
                "x": arr[26].name,
                "y": arr[26].הוצאה,
              },
              {
                "x": arr[27].name,
                "y": arr[27].הוצאה,
              },
              {
                "x": arr[28].name,
                "y": arr[28].הוצאה,
              },
              {
                "x": arr[29].name,
                "y": arr[29].הוצאה,
              },
              {
                "x": arr[30].name,
                "y": arr[30].הוצאה,
              }
          ]
        },
        {
            "id": hebrew ? "outcome" : "הוצאה",
            // "color": "hsl(71, 70%, 50%)",
            "data": [
              {
                "x": arrx[0].name,
                "y": arrx[0].הוצאה,
              },
              {
                "x": arrx[1].name,
                "y": arrx[1].הוצאה,
              },
              {
                "x": arrx[2].name,
                "y": arrx[2].הוצאה,
              },
              {
                "x": arrx[3].name,
                "y": arrx[3].הוצאה,
              },
              {
                "x": arrx[4].name,
                "y": arrx[4].הוצאה,
              },
              {
                "x": arrx[5].name,
                "y": arrx[5].הוצאה,
              },
              {
                "x": arrx[6].name,
                "y": arrx[6].הוצאה,
              },
              {
                "x": arrx[7].name,
                "y": arrx[7].הוצאה,
              },
              {
                "x": arrx[8].name,
                "y": arrx[8].הוצאה,
              },
              {
                "x": arrx[9].name,
                "y": arrx[9].הוצאה,
              },
              {
                "x": arrx[10].name,
                "y": arrx[10].הוצאה,
              },
              {
                "x": arrx[11].name,
                "y": arrx[11].הוצאה,
              },
              {
                  "x": arrx[12].name,
                  "y": arrx[12].הוצאה,
                },
                {
                  "x": arrx[13].name,
                  "y": arrx[13].הוצאה,
                },
                {
                  "x": arrx[14].name,
                  "y": arrx[14].הוצאה,
                },
                {
                  "x": arrx[15].name,
                  "y": arrx[15].הוצאה,
                },
                {
                  "x": arrx[16].name,
                  "y": arrx[16].הוצאה,
                },
                {
                  "x": arrx[17].name,
                  "y": arrx[17].הוצאה,
                },
                {
                  "x": arrx[18].name,
                  "y": arrx[18].הוצאה,
                },
                {
                  "x": arrx[19].name,
                  "y": arrx[19].הוצאה,
                },
                {
                  "x": arrx[20].name,
                  "y": arrx[20].הוצאה,
                },
                {
                  "x": arrx[21].name,
                  "y": arrx[21].הוצאה,
                },
                {
                  "x": arrx[22].name,
                  "y": arrx[22].הוצאה,
                },
                {
                  "x": arrx[23].name,
                  "y": arrx[23].הוצאה,
                },
                {
                  "x": arrx[24].name,
                  "y": arrx[24].הוצאה,
                },
                {
                  "x": arrx[25].name,
                  "y": arrx[25].הוצאה,
                },
                {
                  "x": arrx[26].name,
                  "y": arrx[26].הוצאה,
                },
                {
                  "x": arrx[27].name,
                  "y": arrx[27].הוצאה,
                },
                {
                  "x": arrx[28].name,
                  "y": arrx[28].הוצאה,
                },
                {
                  "x": arrx[29].name,
                  "y": arrx[29].הוצאה,
                },
                {
                  "x": arrx[30].name,
                  "y": arrx[30].הוצאה,
                }
            ]
          },
    
      ]

      
  return (
    <ResponsiveLine
        data={data}
        // theme={
        //   {
        //     // "background": "#ffffff",
        //     "textColor": "#333333",
        //     "fontSize": 9,
        //     "axis": {
        //         "domain": {
        //             "line": {
        //                 "stroke": "#777777",
        //                 "strokeWidth": 1
        //             }
        //         },
        //         "legend": {
        //             "text": {
        //                 "fontSize": 14,
        //                 "fill": globalTheme == "light" ? "#333333" : "white"
        //             }
        //         },
        //         "ticks": {
        //             "line": {
        //                 "stroke": "#777777",
        //                 "strokeWidth": 1
        //             },
        //             "text": {
        //                 "fontSize": 9,
        //                 "fill": globalTheme == "light" ? "#333333" : "white"
        //             }
        //         }
        //     },
        //     "grid": {
        //         "line": {
        //             "stroke": "#dddddd",
        //             "strokeWidth": 1
        //         }
        //     },
        //     "legends": {
        //         "title": {
        //             "text": {
        //                 "fontSize": 9,
        //                 "fill": "#333333"
        //             }
        //         },
        //         "text": {
        //             "fontSize": 9,
        //             "fill": globalTheme == "light" ? "#333333" : "white"
        //         },
        //         "ticks": {
        //             "line": {},
        //             "text": {
        //                 "fontSize": 10,
        //                 "fill": "#333333"
        //             }
        //         }
        //     },
        //     "annotations": {
        //         "text": {
        //             "fontSize": 13,
        //             "fill": "#333333",
        //             "outlineWidth": 2,
        //             "outlineColor": "#ffffff",
        //             "outlineOpacity": 1
        //         },
        //         "link": {
        //             "stroke": "#000000",
        //             "strokeWidth": 1,
        //             "outlineWidth": 2,
        //             "outlineColor": "#ffffff",
        //             "outlineOpacity": 1
        //         },
        //         "outline": {
        //             "stroke": "#000000",
        //             "strokeWidth": 2,
        //             "outlineWidth": 2,
        //             "outlineColor": "#ffffff",
        //             "outlineOpacity": 1
        //         },
        //         "symbol": {
        //             "fill": "#000000",
        //             "outlineWidth": 2,
        //             "outlineColor": "#ffffff",
        //             "outlineOpacity": 1
        //         }
        //     },
        //     "tooltip": {
        //         "container": {
        //             "background": "#ffffff",
        //             "color": "#333333",
        //             "fontSize": 12
        //         },
        //         "basic": {},
        //         "chip": {},
        //         "table": {},
        //         "tableCell": {},
        //         "tableCellValue": {}
        //     }
        // }
        // }
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
                        "fontSize": 10,
                        "fill": globalTheme != "light" || space ? "white" : "black"
                    }
                },
                "ticks": {
                    "line": {
                        "stroke": "#777777",
                        "strokeWidth": 1
                    },
                    "text": {
                        "fontSize": 9,
                        "fill": globalTheme != "light" || space ? "white" : "black"
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
                    "fill": globalTheme != "light" || space ? "white" : "black"
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
          // hebrew ? 'commodities' :'סחורה',
          // hebrew ? 'changeable' :'משתנה',
          // hebrew ? 'permanent' :'קבוע',
          hebrew ? 'outcome' : 'הוצאה',  
          hebrew ? 'income' : 'הכנסה'
          // 'fries',
          // 'donut'
      ]}
        margin={{ top: 20, right: 65, bottom: 55, left: 65 }}
        axisBottom={null}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        yFormat=" >-.2f"
        // curve="monotoneX"
        axisTop={null}
        axisRight={null}
        // axisLeft={null}
        // axisBottom={{
        //     orient: 'bottom',
        //     tickSize: 3,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     // legend: 'transportation',
        //     legendOffset: 36,
        //     legendPosition: 'middle'
        // }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: ' הוצאות-הכנסות חודש' + " " + month,
            legendOffset: -46,
            legendPosition: 'middle'
        }}
        // colors={{ scheme: 'dark2' }}
        colors={['#15803d', '#dc2626']}
        pointSize={2}
        enablePoints={true}
        pointLabel="y"
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-2}
        enablePointLabel={chart2}
        enableArea={area}
        // areaBlendMode="hard-light"
        areaOpacity={globalTheme == "light" ? "0.4" : "0.6"}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 73,
                translateY: 0,
                itemsSpacing: 25,
                itemDirection: 'bottom-to-top',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 20,
                symbolShape: 'circle',
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
    />
  )
}

export default MainNivoLine3