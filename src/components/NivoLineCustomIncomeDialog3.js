import React, { useContext } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { ThemeContext } from "../App";


const NivoLineCustomIncomeDialog3 = ({ arr }) => {
  const { hebrew, globalTheme, space } = useContext(ThemeContext)
  let month = new Date().getMonth() + 1

    const data = [
        {
          "id": hebrew ? "buying" : "קנייה",
          "color": "hsl(2, 70%, 50%)",
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
    
      ]

      
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
                        "fontSize": 12,
                        "fill": globalTheme != "light" || space ? "white" : "#6b7280"
                    }
                },
                "ticks": {
                    "line": {
                        "stroke": "#777777",
                        "strokeWidth": 1
                    },
                    "text": {
                        "fontSize": 9,
                        "fill": globalTheme != "light" || space ? "white" : "#6b7280"
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
                    "fill": globalTheme != "light" || space ? "white" : "#6b7280"
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
        margin={{ top: 10, right: 10, bottom: 10, left: 55 }}
        // axisBottom={null}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
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
            legend: ' הוצאות חודש' + " " + month,
            legendOffset: -46,
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

export default NivoLineCustomIncomeDialog3