import classNames from 'classNames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import styles from './PrevSentenceDisplay.module.scss'

function PrevSentenceDisplay({
  prevSentence,
}: InferProps<typeof PrevSentenceDisplay.propTypes>) {
  return (
    <div className={styles.prevSentenceBox}>
      {prevSentence.map((ele) => (
        <div
          key={ele!.sentence}
          className={classNames(styles.prevSentence, {
            [styles.incorrect]: ele!.incorrectCount > 0,
          })}
        >
          <p>{ele!.sentence}</p>
          <p>&#8203;{ele!.inputSentence}</p>
          <p>{ele!.incorrectCount > 0}</p>
        </div>
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
