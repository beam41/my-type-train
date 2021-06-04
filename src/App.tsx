import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import styles from './App.module.scss'
import sentenceRaw from './assets/thai-sentences.txt?raw'
import { PrevSentence } from './classes/PrevSentence'
import PrevSentenceDisplay from './components/PrevSentenceDisplay/PrevSentenceDisplay'
import SentenceDisplay from './components/SentenceDisplay/SentenceDisplay'
import SentenceInput from './components/SentenceInput/SentenceInput'

const sentencesArray = sentenceRaw
  .split('\n')
  .sort((a, b) => a.length - b.length)

function App() {
  const [sentenceIndex, setSentenceIndex] = useState(0)

  const [textInput, setTextInput] = useState('')

  const [hasIncorrect, setHasIncorrect] = useState(false)

  const [prevSentence, setPrevSentence] = useState<PrevSentence[]>([])

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const testStr = new RegExp(`^${event.target.value}`).test(
      sentencesArray[sentenceIndex]
    )
    setHasIncorrect(!testStr)
    setTextInput(event.target.value)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setPrevSentence([
        ...prevSentence,
        new PrevSentence(sentencesArray[sentenceIndex], textInput),
      ])
      setSentenceIndex(sentenceIndex + 1)
      setTextInput('')
      console.table(prevSentence)
    }
  }

  return (
    <div className={styles.app}>
      <div className={styles.prevSentencePosition}>
        <PrevSentenceDisplay prevSentence={prevSentence} />
      </div>
      <div className={styles.cover}>
        <SentenceDisplay sentence={sentencesArray[sentenceIndex]} />
        <SentenceInput
          textInput={textInput}
          textInputChange={handleTextInputChange}
          hasIncorrect={hasIncorrect}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}

export default App
