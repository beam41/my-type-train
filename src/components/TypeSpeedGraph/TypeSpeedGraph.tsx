import PropTypes, { InferProps } from 'prop-types'
import React from 'react'

function toGraphLine(
  width: number,
  height: number,
  labelPad: number,
  data: { x: number; y: number }[],
  maxX: number,
  minY: number,
  maxY: number
): string {
  let line: string[] = []
  data.forEach((d, i) => {
    if (i === 0) {
      line.push(
        `M 10 ${
          height -
          labelPad -
          ((d.y - minY) / (maxY - minY)) * (height - labelPad)
        } L`
      )
      return
    }
    line.push(
      `${(d.x / maxX) * (width - labelPad) + labelPad} ${
        height - labelPad - ((d.y - minY) / (maxY - minY)) * (height - labelPad)
      }`
    )
  })
  return line.join(' ')
}

function TypeSpeedGraph({
  width,
  height,
  data,
}: InferProps<typeof TypeSpeedGraph.propTypes>) {
  const labelPad = 10
  if (data.length <= 1) {
    return <svg width={width} height={height}></svg>
  }
  const maxX = data[data.length - 1].x
  const mapY = data.map(({ y }) => y)
  const minY = Math.min(...mapY)
  const maxY = Math.max(...mapY)
  // console.log('min', minY)
  // console.log('max', maxY)
  let gridWidth = (width - labelPad) / maxX
  let gridHeight = (height - labelPad) / (maxY - minY)
  return (
    <svg width={width} height={height}>
      <defs>
        <pattern
          id="smallGrid"
          width={gridWidth}
          height={gridHeight}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M 0 0 L ${gridWidth} 0 ${gridWidth} ${gridHeight}`}
            fill="none"
            stroke="gray"
            strokeWidth="0.5"
          />
        </pattern>
        <pattern
          id="grid"
          width={gridWidth * 10}
          height={gridHeight * 10}
          patternUnits="userSpaceOnUse"
          x={labelPad}
          y={height - labelPad}
        >
          <rect
            width={gridWidth * 10}
            height={gridHeight * 10}
            fill="url(#smallGrid)"
          />
          <path
            d={`M 0 0 L ${gridWidth * 10} 0 ${gridWidth * 10} ${
              gridHeight * 10
            }`}
            fill="none"
            stroke="red"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect
        x={labelPad}
        width={width - labelPad}
        height={height - labelPad}
        fill="url(#grid)"
      />
      <path
        d={`M 10 0 L 10 ${height - labelPad} ${width} ${height - labelPad}`}
        fill="none"
        stroke="gray"
        strokeWidth="1"
      />
      <path
        d={toGraphLine(width, height, labelPad, data, maxX, minY, maxY)}
        fill="none"
        stroke="gray"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

TypeSpeedGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
}

TypeSpeedGraph.defaultProps = {
  width: 300,
  height: 200,
}

export default TypeSpeedGraph
