import classNames from 'classNames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { noop } from '../../util/noop'
import styles from './SentenceInput.module.scss'

function SentenceInput({
  textInput,
  textInputChange,
  hasIncorrect,
  onKeyPress,
  onKeyDown,
  onKeyUp,
  disabled,
}: InferProps<typeof SentenceInput.propTypes>) {
  return (
    <div>
      <input
        className={classNames(styles.inputBox, {
          [styles.incorrect]: hasIncorrect,
        })}
        value={textInput}
        onChange={textInputChange}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onPaste={(e) => e.preventDefault()}
        disabled={disabled}
      />
    </div>
  )
}

SentenceInput.propTypes = {
  textInput: PropTypes.string.isRequired,
  textInputChange: PropTypes.func.isRequired,
  hasIncorrect: PropTypes.bool.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

SentenceInput.defaultProps = {
  textInputChange: noop,
  onKeyPress: noop,
  onKeyDown: noop,
  onKeyUp: noop,
  disabled: false,
}

export default SentenceInput
