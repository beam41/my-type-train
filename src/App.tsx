import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import styles from './App.module.scss'
import sentenceRaw from './assets/thai-sentences.txt?raw'
import PrevSentenceDisplay from './components/PrevSentenceDisplay/PrevSentenceDisplay'
import SentenceDisplay from './components/SentenceDisplay/SentenceDisplay'
import SentenceInput from './components/SentenceInput/SentenceInput'
import { PrevSentence } from './interfaces/PrevSentence'

const sentencesArray = sentenceRaw
  .split('\n')
  .sort((a, b) => a.length - b.length)

const invalidKey = [
  'Control',
  'Shift',
  'Tab',
  'Backspace',
  'Alt',
  'ContextMenu',
  'Meta',
  'CapsLock',
]

function countIncorrect(baseSentence: string, compareSentence: string) {
  let ic = 0
  for (let i = 0; i < baseSentence.length; ++i) {
    if (baseSentence[i] !== compareSentence[i]) ++ic
  }
  return ic
}

function App() {
  const [sentenceIndex, setSentenceIndex] = useState(0)

  const [textInput, setTextInput] = useState('')

  const [incorrect, setIncorrect] = useState(0)

  const [prevWordIncorrect, setPrevWordIncorrect] = useState(0)

  const [prevSentence, setPrevSentence] = useState<PrevSentence[]>([])

  const [graphData, setGraphData] = useState<{ x: number; y: number }[]>([])

  const [typed, setTyped] = useState(0)

  const [elapsed, setElapsed] = useState(0)

  const [start, setStart] = useState(false)

  const [ended, setEnded] = useState(false)

  const bkspPress = useRef(false)

  const textInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // prevent selection delete
    if (Math.abs(event.target.value.length - textInput.length) > 1) {
      if (bkspPress.current) {
        setTextInput((prev) => prev.slice(0, -1))
      } else {
        setTextInput((prev) => prev + event.target.value)
      }
      return
    }

    setTextInput(event.target.value)

    if (!start) {
      window.requestAnimationFrame(step)
      setStart(true)
    }

    setIncorrect(
      countIncorrect(event.target.value, sentencesArray[sentenceIndex])
    )

    setTyped((prev) => prev + 1)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    // prevent submit empty
    if (textInput === '') return

    event.preventDefault()

    setPrevWordIncorrect(
      (prev) =>
        prev +
        Math.max(
          countIncorrect(textInput, sentencesArray[sentenceIndex]),
          countIncorrect(sentencesArray[sentenceIndex], textInput)
        )
    )
    setPrevSentence([
      ...prevSentence,
      {
        sentence: sentencesArray[sentenceIndex],
        inputSentence: textInput,
        incorrectCount: incorrect,
      },
    ])

    setIncorrect(0)
    setSentenceIndex((prev) => prev + 1)
    setTextInput('')

    console.table(prevSentence)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Backspace') return
    bkspPress.current = true
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Backspace') return
    bkspPress.current = false
  }

  const startTime = useRef<number>()
  const step = (timestamp: number) => {
    if (startTime.current === undefined) startTime.current = timestamp
    const _elapsed = timestamp - startTime.current
    // setGraphData((prevData) => [
    //   ...prevData,
    //   {
    //     x: _elapsed / 1000,
    //     y: 30 + Math.random(),
    //   },
    // ])
    setElapsed(_elapsed)
    if (_elapsed >= 60000) {
      setEnded(true)
      return
    }
    window.requestAnimationFrame(step)
  }

  const timeMin = elapsed / 60000
  const allIncorrect = prevWordIncorrect + incorrect

  const cpm = typed / timeMin
  // gross word per min
  const gWpm = cpm / 5
  // net word per min
  const nWpm = Math.max(0, gWpm - allIncorrect / timeMin)

  return (
    <div className={styles.app}>
      <div className={styles.prevSentencePosition}>
        <PrevSentenceDisplay prevSentence={prevSentence} />
      </div>
      Time {timeMin.toFixed(2)}
      <br />
      gross cpm: {cpm.toFixed(2)}
      <br />
      gross wpm: {gWpm.toFixed(2)}
      <br />
      net wpm: {nWpm.toFixed(2)}
      <br />
      incorrect: {incorrect}
      <br />
      allIncorrect: {allIncorrect}
      {/* <TypeSpeedGraph width={500} height={300} data={graphData} /> */}
      <div className={styles.cover}>
        <SentenceDisplay sentence={sentencesArray[sentenceIndex]} />
        <SentenceInput
          disabled={ended}
          textInput={textInput}
          textInputChange={textInputChange}
          hasIncorrect={incorrect > 0}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      </div>
    </div>
  )
}

export default App
