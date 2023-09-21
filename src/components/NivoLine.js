import React from 'react'
import { ResponsiveLine } from '@nivo/line'


const NivoLine = ({ arr }) => {
    const data = [
        {
          "id": "משכורות",
          "color": "hsl(71, 70%, 50%)",
          "data": [
            {
              "x": "ינואר",
              "y": arr[0].משכורת,
            },
            {
              "x": "פברואר",
              "y": arr[1].משכורת,
            },
            {
              "x": "מרץ",
              "y": arr[2].משכורת,
            },
            {
              "x": "אפריל",
              "y": arr[3].משכורת,
            },
            {
              "x": "מאי",
              "y": arr[4].משכורת,
            },
            {
              "x": "יוני",
              "y": arr[5].משכורת,
            },
            {
              "x": "יולי",
              "y": arr[6].משכורת,
            },
            {
              "x": "אוגוסט",
              "y": arr[7].משכורת,
            },
            {
              "x": "'ספט",
              "y": arr[8].משכורת,
            },
            {
              "x": "'אוק'",
              "y": arr[9].משכורת,
            },
            {
              "x": "'נוב'",
              "y": arr[10].משכורת,
            },
            {
              "x": "'דצמ'",
              "y": arr[11].משכורת,
            }
          ]
        },
        {
          "id": "הוצאות משתנות",
          "color": "hsl(317, 70%, 50%)",
          "data": [
            {
              "x": "ינואר",
              "y": arr[0].משתנות,
            },
            {
              "x": "פברואר",
              "y": arr[1].משתנות,
            },
            {
              "x": "מרץ",
              "y": arr[2].משתנות,
            },
            {
              "x": "אפריל",
              "y": arr[3].משתנות,
            },
            {
              "x": "מאי",
              "y": arr[4].משתנות,
            },
            {
              "x": "יוני",
              "y": arr[5].משתנות,
            },
            {
              "x": "יולי",
              "y": arr[6].משתנות,
            },
            {
              "x": "אוגוסט",
              "y": arr[7].משתנות,
            },
            {
              "x": "ספטמבר",
              "y": arr[8].משתנות,
            },
            {
              "x": "אוקטובר",
              "y": arr[9].משתנות,
            },
            {
              "x": "נובמבר",
              "y": arr[10].משתנות,
            },
            {
              "x": "דצמבר",
              "y": arr[11].משתנות,
            }
          ]
        },
        {
          "id": "הוצאות סחורה",
          "color": "hsl(133, 70%, 50%)",
          "data": [
            {
              "x": "ינואר",
              "y": arr[0].סחורה
            },
            {
              "x": "פברואר",
              "y": arr[1].סחורה,
            },
            {
              "x": "מרץ",
              "y": arr[2].סחורה,
            },
            {
              "x": "אפריל",
              "y": arr[3].סחורה,
            },
            {
              "x": "מאי",
              "y": arr[4].סחורה,
            },
            {
              "x": "יוני",
              "y": arr[5].סחורה,
            },
            {
              "x": "יולי",
              "y": arr[6].סחורה,
            },
            {
              "x": "אוגוסט",
              "y": arr[7].סחורה,
            },
            {
              "x": "ספטמבר",
              "y": arr[8].סחורה,
            },
            {
              "x": "אוקטובר",
              "y": arr[9].סחורה,
            },
            {
              "x": "נובמבר",
              "y": arr[10].סחורה,
            },
            {
              "x": "דצמבר",
              "y": arr[11].סחורה,
            }
          ]
        },
        {
            "id": "הוצאות קבועות",
            "color": "hsl(133, 70%, 50%)",
            "data": [
              {
                "x": "ינואר",
                "y": arr[0].קבועות,
              },
              {
                "x": "פברואר",
                "y": arr[1].קבועות,
              },
              {
                "x": "מרץ",
                "y": arr[2].קבועות,
              },
              {
                "x": "אפריל",
                "y": arr[3].קבועות,
              },
              {
                "x": "מאי",
                "y": arr[4].קבועות,
              },
              {
                "x": "יוני",
                "y": arr[5].קבועות,
              },
              {
                "x": "יולי",
                "y": arr[6].קבועות,
              },
              {
                "x": "אוגוסט",
                "y": arr[7].קבועות,
              },
              {
                "x": "ספטמבר",
                "y": arr[8].קבועות,
              },
              {
                "x": "אוקטובר",
                "y": arr[9].קבועות,
              },
              {
                "x": "נובמבר",
                "y": arr[10].קבועות,
              },
              {
                "x": "דצמבר",
                "y": arr[11].קבועות,
              }
            ]
          },
    
      ]
  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
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

export default NivoLine