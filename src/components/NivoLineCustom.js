import React, { useContext } from 'react';import { ResponsiveLine } from '@nivo/line'
import { ThemeContext } from "../App";


const NivoLineCustom = ({ arr }) => {
  const { hebrew } = useContext(ThemeContext)

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
            }
          ]
        },
    
      ]
  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 25, bottom: 50, left: 60 }}
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
        colors={{ scheme: 'dark2' }}
        pointSize={9}
        pointLabel="y"
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enablePointLabel={true}
        enableArea={true}
        useMesh={true}
        legends={[
            {
                anchor: 'top-right',
                direction: 'raw',
                justify: false,
                translateX: 0,
                translateY: -25,
                itemsSpacing: 0,
                itemDirection: 'right-to-left',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 20,
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
    />
  )
}

export default NivoLineCustom