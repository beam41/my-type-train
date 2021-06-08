import classNames from 'classNames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import styles from './PrevSentenceBox.module.scss'

function PrevSentenceBox({
  prevSentence,
}: InferProps<typeof PrevSentenceBox.propTypes>) {
  return (
    <div
      key={prevSentence!.sentence}
      className={classNames(styles.prevSentenceBox, {
        [styles.incorrect]: prevSentence!.incorrectCount > 0,
      })}
    >
      <p className={styles.sentence}>{prevSentence!.sentence}</p>
      <p className={styles.inp}>{prevSentence!.inputSentence}</p>
    </div>
  )
}

PrevSentenceBox.propTypes = {
  prevSentence: PropTypes.shape({
    sentence: PropTypes.string.isRequired,
    inputSentence: PropTypes.string.isRequired,
    incorrectCount: PropTypes.number.isRequired,
  }),
}

export default PrevSentenceBox
