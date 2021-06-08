import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import PrevSentenceBox from './PrevSentenceBox/PrevSentenceBox'
import styles from './PrevSentenceDisplay.module.scss'

function PrevSentenceDisplay({
  prevSentence,
}: InferProps<typeof PrevSentenceDisplay.propTypes>) {
  return (
    <div className={styles.prevSentenceDisplay}>
      <div className={styles.shadow}></div>
      {prevSentence.map((ele) => (
        <PrevSentenceBox key={ele!.sentence} prevSentence={ele} />
      ))}
    </div>
  )
}

PrevSentenceDisplay.propTypes = {
  prevSentence: PropTypes.arrayOf(
    PropTypes.shape({
      sentence: PropTypes.string.isRequired,
      inputSentence: PropTypes.string.isRequired,
      incorrectCount: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default PrevSentenceDisplay
