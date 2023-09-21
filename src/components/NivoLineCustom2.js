import React, { useContext } from 'react';import { ResponsiveLine } from '@nivo/line'
import { ThemeContext } from "../App";


const NivoLineCustom = ({ arr }) => {
  const { hebrew } = useContext(ThemeContext)

    const data = [
        
        {
          "id": hebrew ? "not paid" : "לא שולם",
          "color": "hsl(2, 70%, 50%)",
          "data": [
            {
              "x": arr[0].name,
              "y": arr[0].לתשלום,
            },
            {
              "x": arr[1].name,
              "y": arr[1].לתשלום,
            },
            {
              "x": arr[2].name,
              "y": arr[2].לתשלום,
            },
            {
              "x": arr[3].name,
              "y": arr[3].לתשלום,
            },
            {
              "x": arr[4].name,
              "y": arr[4].לתשלום,
            },
            {
              "x": arr[5].name,
              "y": arr[5].לתשלום,
            },
            {
              "x": arr[6].name,
              "y": arr[6].לתשלום,
            },
            {
              "x": arr[7].name,
              "y": arr[7].לתשלום,
            },
            {
              "x": arr[8].name,
              "y": arr[8].לתשלום,
            },
            {
              "x": arr[9].name,
              "y": arr[9].לתשלום,
            },
            {
              "x": arr[10].name,
              "y": arr[10].לתשלום,
            },
            {
              "x": arr[11].name,
              "y": arr[11].לתשלום,
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
        colors={{ scheme: 'set1' }}
        pointSize={9}
        pointLabel="y"
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enablePointLabel={true}
        useMesh={true}
        enableArea={true}
        legends={[
            {
                anchor: 'top-right',
                direction: 'raw',
                justify: false,
                translateX: 0,
                translateY: -25,
                itemsSpacing: 0,
                itemDirection: 'right-to-left',
                itemWidth: 0,
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