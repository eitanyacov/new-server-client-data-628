import React, { useContext } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { ThemeContext } from "../App";


const NivoLineCustomIncomeDialog = ({ arr }) => {
  const { chart, hebrew } = useContext(ThemeContext)

    const data = [
        {
          "id": hebrew ? "buying" : "קנייה",
          "color": "hsl(71, 70%, 50%)",
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
        margin={{ top: 25, right: 20, bottom: 50, left: 50 }}
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
        // axisBottom={{
        //     orient: 'bottom',
        //     tickSize: 5,
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
            // legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'dark2' }}
        pointSize={7}
        pointLabel="y"
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enablePointLabel={chart}
        enableArea={true}
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

export default NivoLineCustomIncomeDialog