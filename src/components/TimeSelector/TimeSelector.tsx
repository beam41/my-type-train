import classNames from 'classNames'
import PropTypes, { InferProps } from 'prop-types'
import React, { useState } from 'react'
import { noop } from '../../util/noop'
import styles from './TimeSelector.module.scss'

const selectableTime = [
  {
    time: 15,
    label: '15',
  },
  {
    time: 30,
    label: '30',
  },
  {
    time: 45,
    label: '45',
  },
  {
    time: 60,
    label: '1m',
  },
  {
    time: 120,
    label: '2m',
  },
  {
    time: 300,
    label: '5m',
  },
]

function TimeSelector({
  onChange,
  hidden,
}: InferProps<typeof TimeSelector.propTypes>) {
  const click = (index: number, time: number) => {
    setSelecting(index)
    onChange(time)
  }

  const [selecting, setSelecting] = useState(3)

  return (
    <div
      className={classNames(styles.timeSelector, { [styles.hidden]: hidden })}
    >
      {selectableTime.map((val, index) => (
        <a
          className={classNames(styles.timeSelectorTime, {
            [styles.selected]: selecting === index,
          })}
          key={val.time}
          onClick={() => click(index, val.time)}
        >
          {val.label}
        </a>
      ))}
    </div>
  )
}

TimeSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
}

TimeSelector.defaultProps = {
  onChange: noop,
  hidden: false,
}

export default TimeSelector
