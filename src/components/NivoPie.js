import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const NivoPie = ({ theme, cibus, tenBis, wallt, mishloha, other, other2, goodi }) => {
    const data = [
        {
          "id": "סיבוס",
          "label": "סיבוס",
          "value": cibus,
          "color": "hsl(321, 70%, 50%)"
        },
        {
          "id": "תן ביס",
          "label": "תן ביס",
          "value": tenBis,
          "color": "hsl(153, 70%, 50%)"
        },
        {
          "id": "וולט",
          "label": "וולט",
          "value": wallt,
          "color": "hsl(48, 70%, 50%)"
        },
        {
          "id": "מישלוחה",
          "label": "מישלוחה",
          "value": mishloha,
          "color": "hsl(160, 70%, 50%)"
        },
        {
            "id": "גודי",
            "label": "גודי",
            "value": goodi,
            "color": "hsl(130, 70%, 50%)"
          },
        {
          "id": "אחר",
          "label": "אחר",
          "value": other,
          "color": "hsl(98, 70%, 50%)"
        },
        {
            "id": "2אחר",
            "label": "2אחר",
            "value": other2,
            "color": "hsl(75, 70%, 50%)"
          }
      ]
  return (
    <ResponsivePie
        data={data}
        sortByValue={true}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.45}
        padAngle={1}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsStraightLength={13}
        arcLinkLabelsDiagonalLength={13}
        arcLinkLabelsTextColor={theme != "light" ? "#000000" : "#ffffff"}
        arcLinkLabelsThickness={4}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
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
                    id: 'סיבוס'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'תן ביס'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'וולט'
                },
                id: 'dots'
            },
            {
                match: {
                    id: "מישלוחה"
                },
                id: 'lines'
            },
            {
                match: {
                    id: "אחר"
                },
                id: 'lines'
            },
            {
                match: {
                    id: "2אחר"
                },
                id: 'dots'
            },
            {
                match: {
                    id: "גודי"
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            // {
            //     anchor: 'bottom',
            //     direction: 'row',
            //     justify: false,
            //     translateX: 0,
            //     translateY: 56,
            //     itemsSpacing: 0,
            //     itemWidth: 100,
            //     itemHeight: 18,
            //     itemTextColor: '#999',
            //     itemDirection: 'left-to-right',
            //     itemOpacity: 1,
            //     symbolSize: 18,
            //     symbolShape: 'circle',
            //     effects: [
            //         {
            //             on: 'hover',
            //             style: {
            //                 itemTextColor: '#000'
            //             }
            //         }
            //     ]
            // }
        ]}
    />
  )
}

export default NivoPie