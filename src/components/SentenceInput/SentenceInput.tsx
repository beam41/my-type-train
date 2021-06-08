import classNames from 'classNames'
import PropTypes, { InferProps } from 'prop-types'
import React, { useEffect, useRef } from 'react'
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
  started,
}: InferProps<typeof SentenceInput.propTypes>) {
  const inputElement = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputElement.current?.focus()
  }, [])

  return (
    <div
      className={classNames(
        styles.sentenceInput,
        { [styles.incorrect]: hasIncorrect },
        { [styles.disabled]: disabled }
      )}
    >
      <textarea
        ref={inputElement}
        className={styles.inputBox}
        value={textInput}
        onChange={textInputChange}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onPaste={(e) => e.preventDefault()}
        disabled={disabled}
        placeholder={started ? '' : 'Type to start'}
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
  started: PropTypes.bool.isRequired,
}

SentenceInput.defaultProps = {
  textInputChange: noop,
  onKeyPress: noop,
  onKeyDown: noop,
  onKeyUp: noop,
  disabled: false,
}

export default SentenceInput
