import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import styles from './SentenceDisplay.module.scss'

function SentenceDisplay({
  sentence,
}: InferProps<typeof SentenceDisplay.propTypes>) {
  return <div className={styles.sentenceDisplay}>{sentence}</div>
}

SentenceDisplay.propTypes = {
  sentence: PropTypes.string.isRequired,
}

export default SentenceDisplay
