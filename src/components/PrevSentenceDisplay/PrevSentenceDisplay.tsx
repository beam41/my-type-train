import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { PrevSentence } from '../../classes/PrevSentence'
import styles from './PrevSentenceDisplay.module.scss'

function PrevSentenceDisplay({
  prevSentence,
}: InferProps<typeof PrevSentenceDisplay.propTypes>) {
  return (
    <div className={styles.prevSentenceBox}>
      {prevSentence.map((ele) => (
        <div
          key={ele!.sentence}
          className={[
            styles.prevSentence,
            ele!.isIncorrect ? styles.incorrect : '',
          ].join(' ')}
        >
          <p>{ele!.sentence}</p>
          <p>&#8203;{ele!.inputSentence}</p>
          <p>{ele!.isIncorrect}</p>
        </div>
      ))}
    </div>
  )
}

PrevSentenceDisplay.propTypes = {
  prevSentence: PropTypes.arrayOf(PropTypes.instanceOf(PrevSentence))
    .isRequired,
}

export default PrevSentenceDisplay
