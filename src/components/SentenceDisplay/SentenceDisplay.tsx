import PropTypes, { InferProps } from 'prop-types'
import React from 'react'

function SentenceDisplay({
  sentence,
}: InferProps<typeof SentenceDisplay.propTypes>) {
  return <div>{sentence}</div>
}

SentenceDisplay.propTypes = {
  sentence: PropTypes.string.isRequired,
}

export default SentenceDisplay
