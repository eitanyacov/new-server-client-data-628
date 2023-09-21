import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const NivoPaiHome = ({ theme, salaries, stock, changeable, permanent, income, space }) => {
    const data = [
        {
          "id": "משכורות",
          "label": "משכורות",
          "value": salaries,
          "color": "hsl(321, 70%, 50%)"
        },
        {
          "id": "הכנסות",
          "label": "הכנסות",
          "value": income,
          "color": "hsl(153, 70%, 50%)"
        },
        {
          "id": "סחורה",
          "label": "סחורה",
          "value": stock,
          "color": "hsl(48, 70%, 50%)"
        },
        {
          "id": "קבועות",
          "label": "קבועות",
          "value": permanent,
          "color": "hsl(160, 70%, 50%)"
        },
        {
          "id": "משתנות",
          "label": "משתנות",
          "value": changeable,
          "color": "hsl(98, 70%, 50%)"
        }
      ]
      const chartTheme = {
        legends: {
          text: {
            fill: theme != "light" ? "white" : "#4b5563", // Change this color to your desired color
          },
        },
      };
  return (
    <ResponsivePie
        data={data}
        theme={chartTheme}
        sortByValue={true}
        margin={{ top: 35, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.40}
        padAngle={2}
        cornerRadius={7}
        activeOuterRadiusOffset={8}
        borderWidth={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        colors={{ scheme: 'nivo' }}
        arcLinkLabelsSkipAngle={5}
        enableArcLinkLabels={false}
        arcLinkLabelsTextOffset={5}
        arcLinkLabelsStraightLength={11}
        enableArcLabels={false}
        arcLinkLabelsDiagonalLength={8}
        arcLinkLabelsTextColor={theme != "light" ? "white" : "#4b5563"}
        arcLinkLabelsThickness={7}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '3'
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
                    id: 'סחורה'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'הכנסות'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: "קבועות"
                },
                id: 'dots'
            },
            {
                match: {
                    id: "משתנות"
                },
                id: 'lines'
            },
            {
                match: {
                    id: "משכורות"
                },
                id: 'lines'
            },
            // {
            //     match: {
            //         id: 'elixir'
            //     },
            //     id: 'lines'
            // },
            // {
            //     match: {
            //         id: 'javascript'
            //     },
            //     id: 'lines'
            // }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: true,
                translateX: 3,
                translateY: 47,
                itemsSpacing: 5,
                itemDirection: 'bottom-to-top',
                itemWidth: 55,
                itemHeight: -2,
                itemOpacity: 0.75,
                symbolSize: 24,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .08)',
                            itemOpacity: 4
                        }
                    }
                ]
            }
        ]}
    />
  )
}

export default NivoPaiHome