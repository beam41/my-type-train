import classNames from 'classNames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { noop } from '../../util/noop'
import styles from './ResetButton.module.scss'

function ResetButton({
  onClick,
  hidden,
}: InferProps<typeof ResetButton.propTypes>) {
  return (
    <button
      className={classNames(styles.resetButton, { [styles.hidden]: hidden })}
      onClick={onClick}
    >
      RESET
    </button>
  )
}

ResetButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
}

ResetButton.defaultProps = {
  onClick: noop,
  hidden: false,
}

export default ResetButton
