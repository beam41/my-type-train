import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import styles from './SentenceInput.module.scss'

function SentenceInput({
  textInput,
  textInputChange,
  hasIncorrect,
  onKeyPress,
}: InferProps<typeof SentenceInput.propTypes>) {
  return (
    <div>
      <input
        className={hasIncorrect ? styles.incorrect : ''}
        value={textInput}
        onChange={textInputChange}
        onKeyPress={onKeyPress}
      />
    </div>
  )
}

SentenceInput.propTypes = {
  textInput: PropTypes.string.isRequired,
  textInputChange: PropTypes.func.isRequired,
  hasIncorrect: PropTypes.bool.isRequired,
  onKeyPress: PropTypes.func.isRequired,
}

export default SentenceInput
