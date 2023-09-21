import React, { useContext } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { ThemeContext } from "../App";


const MainNivoLineMobile = ({ arr, width, year }) => {
  const { hebrew, globalTheme, area, chart2, mainChart} = useContext(ThemeContext)


  // let year = new Date().getFullYear()
//   let name = ` הכנסות / הוצאות - ${ year} `
//   let name2 = ` income / outcome -  ${ year} `
//   let name3 = ` הכנסות / סחורה - ${ year} `
//   let name4 = ` income / commodity -  ${ year} `

    const data =[
        {
          "id": "הכנסות",
          // "color": "hsl(277, 70%, 50%)",
          "data": [
            {
              "x": "ינואר",
              "y": arr[0]?.הכנסה
            },
            {
              "x": "'פבר",
              "y": arr[1]?.הכנסה
            },
            {
              "x": "מרץ",
              "y": arr[2]?.הכנסה
            },
            {
              "x": "'אפר",
              "y": arr[3]?.הכנסה
            },
            {
              "x": "מאי",
              "y": arr[4]?.הכנסה
            },
            {
              "x": "יוני",
              "y": arr[5]?.הכנסה
            },
            {
              "x": "יולי",
              "y": arr[6]?.הכנסה
            },
            {
              "x": "'אוג",
              "y": arr[7]?.הכנסה
            },
            {
              "x": "'ספט",
              "y": arr[8]?.הכנסה
            },
            {
              "x": "'אוק",
              "y": arr[9]?.הכנסה
            },
            {
              "x": "'נוב",
              "y": arr[10]?.הכנסה
            },
            {
              "x": "'דצמ",
              "y": arr[11]?.הכנסה
            }
          ]
        },
       
        {
          "id": "הוצאות",
          // "color": "hsl(40, 70%, 50%)",
          "data": [
            {
              "x": "ינואר",
              "y": arr[0]?.הוצאות
            },
            {
              "x": "'פבר",
              "y": arr[1]?.הוצאות
            },
            {
              "x": "מרץ",
              "y": arr[2]?.הוצאות
            },
            {
              "x": "'אפר",
              "y": arr[3]?.הוצאות
            },
            {
              "x": "מאי",
              "y": arr[4]?.הוצאות
            },
            {
              "x": "יוני",
              "y": arr[5]?.הוצאות
            },
            {
              "x": "יולי",
              "y": arr[6]?.הוצאות
            },
            {
              "x": "'אוג",
              "y": arr[7]?.הוצאות
            },
            {
              "x": "'ספט",
              "y": arr[8]?.הוצאות
            },
            {
              "x": "'אוק",
              "y": arr[9]?.הוצאות
            },
            {
              "x": "'נוב",
              "y": arr[10]?.הוצאות
            },
            {
              "x": "'דצמ",
              "y": arr[11]?.הוצאות
            }
          ]
        },
      
      ]


      const datas =[
        {
          "id": "הכנסות",
          // "color": "hsl(277, 70%, 50%)",
          "data": [
            {
              "x": "1",
              "y": arr[0]?.הכנסה
            },
            {
              "x": "2",
              "y": arr[1]?.הכנסה
            },
            {
              "x": "3",
              "y": arr[2]?.הכנסה
            },
            {
              "x": "4",
              "y": arr[3]?.הכנסה
            },
            {
              "x": "5",
              "y": arr[4]?.הכנסה
            },
            {
              "x": "6",
              "y": arr[5]?.הכנסה
            },
            {
              "x": "7",
              "y": arr[6]?.הכנסה
            },
            {
              "x": "8",
              "y": arr[7]?.הכנסה
            },
            {
              "x": "9",
              "y": arr[8]?.הכנסה
            },
            {
              "x": "10",
              "y": arr[9]?.הכנסה
            },
            {
              "x": "11",
              "y": arr[10]?.הכנסה
            },
            {
              "x": "12",
              "y": arr[11]?.הכנסה
            }
          ]
        },
       
        {
          "id": "הוצאות",
          // "color": "hsl(40, 70%, 50%)",
          "data": [
            {
              "x": "1",
              "y": arr[0]?.הוצאות
            },
            {
              "x": "2",
              "y": arr[1]?.הוצאות
            },
            {
              "x": "3",
              "y": arr[2]?.הוצאות
            },
            {
              "x": "4",
              "y": arr[3]?.הוצאות
            },
            {
              "x": "5",
              "y": arr[4]?.הוצאות
            },
            {
              "x": "6",
              "y": arr[5]?.הוצאות
            },
            {
              "x": "7",
              "y": arr[6]?.הוצאות
            },
            {
              "x": "8",
              "y": arr[7]?.הוצאות
            },
            {
              "x": "9",
              "y": arr[8]?.הוצאות
            },
            {
              "x": "10",
              "y": arr[9]?.הוצאות
            },
            {
              "x": "11",
              "y": arr[10]?.הוצאות
            },
            {
              "x": "12",
              "y": arr[11]?.הוצאות
            }
          ]
        },
      
      ]

      const data3 =[
        {
          "id": "הכנסות",
          // "color": "hsl(277, 70%, 50%)",
          "data": [
            {
              "x": "ינואר",
              "y": arr[0]?.הכנסות
            },
            {
              "x": "פברואר",
              "y": arr[1]?.הכנסות
            },
            {
              "x": "מרץ",
              "y": arr[2]?.הכנסות
            },
            {
              "x": "אפריל",
              "y": arr[3]?.הכנסות
            },
            {
              "x": "מאי",
              "y": arr[4]?.הכנסות
            },
            {
              "x": "יוני",
              "y": arr[5]?.הכנסות
            },
            {
              "x": "יולי",
              "y": arr[6]?.הכנסות
            },
            {
              "x": "אוגוסט",
              "y": arr[7]?.הכנסות
            },
            {
              "x": "'ספט",
              "y": arr[8]?.הכנסות
            },
            {
              "x": "'אוק",
              "y": arr[9]?.הכנסות
            },
            {
              "x": "'נוב",
              "y": arr[10]?.הכנסות
            },
            {
              "x": "דצמבר",
              "y": arr[11]?.הכנסות
            }
          ]
        },
       
        {
          "id": "סחורה",
          // "color": "hsl(40, 70%, 50%)",
          "data": [
            {
              "x": "ינואר",
              "y": arr[0]?.סחורה
            },
            {
              "x": "פברואר",
              "y": arr[1]?.סחורה
            },
            {
              "x": "מרץ",
              "y": arr[2]?.סחורה
            },
            {
              "x": "אפריל",
              "y": arr[3]?.סחורה
            },
            {
              "x": "מאי",
              "y": arr[4]?.סחורה
            },
            {
              "x": "יוני",
              "y": arr[5]?.סחורה
            },
            {
              "x": "יולי",
              "y": arr[6]?.סחורה
            },
            {
              "x": "אוגוסט",
              "y": arr[7]?.סחורה
            },
            {
              "x": "'ספט",
              "y": arr[8]?.סחורה
            },
            {
              "x": "'אוק",
              "y": arr[9]?.סחורה
            },
            {
              "x": "'נוב",
              "y": arr[10]?.סחורה
            },
            {
              "x": "דצמבר",
              "y": arr[11]?.סחורה
            }
          ]
        },
      
      ]


     
  return (
    <ResponsiveLine
    // data={width > 720 ? data : datas}
    data={mainChart  == "שנתי" ? data : data3}
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
                      "fontSize": 14,
                      "fill": globalTheme == "light" ? "#333333" : "white"
                  }
              },
              "ticks": {
                  "line": {
                      "stroke": "#777777",
                      "strokeWidth": 1
                  },
                  "text": {
                      "fontSize": 11,
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
          // hebrew ? 'commodities' :'סחורה',
          // hebrew ? 'changeable' :'משתנה',
          // hebrew ? 'permanent' :'קבוע',
          hebrew ? 'salaries' : 'הוצאות',  
          hebrew ? 'income' : 'הכנסות'
          // 'fries',
          // 'donut'
      ]}
        margin={{ top: 18, right: 20, bottom: 40, left: 50 }}
        // axisBottom={null}
        // xScale={{ type: 'point' }}
        // yScale={{
        //     type: 'linear',
        //     min: 'auto',
        //     max: 'auto',
        //     stacked: true,
        //     reverse: false
        // }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        yFormat=" >-.2f"
        // axisTop={null}
        axisRight={null}
        // curve="monotoneX"
        // axisBottom={null}
       
        axisLeft={{
            // orient: 'top',
            tickSize: 4,
            tickPadding: 2,
            tickRotation: 0,
            // legend: (hebrew && mainChart == "שנתי") ? name2 : (hebrew && mainChart == "גולמי")  ? name4 : (!hebrew && mainChart == "שנתי") ? name : (!hebrew && mainChart == "גולמי") ? name3 : name, 
            // legend: hebrew ? name2 : name,
            legendOffset: -60,
            // legendPosition: 'top'
        }}
        // colors={{ scheme: 'set1' }}
        colors={['#15803d', '#dc2626']}
        pointSize={7}
        enablePoints={true}
        lineWidth={2.5}
        pointLabel="y"
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-4}
        enablePointLabel={chart2}
        enableArea={area}
        areaOpacity={globalTheme == "light" ? "0.3" : "0.5"}
        useMesh={true}
    //     legends={[
    //       {
    //           anchor: 'bottom-right',
    //           direction: 'column',
    //           justify: false,
    //           translateX: 59,
    //           translateY: -13,
    //           itemsSpacing: 20,
    //           itemDirection: 'right-to-left',
    //           itemWidth: 48,
    //           itemHeight: 5,
    //           itemOpacity: 0.75,
    //           symbolSize: 14,
    //           symbolShape: 'square',
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
       
    />
    
  )
}

export default MainNivoLineMobile