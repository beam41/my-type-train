import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import styles from './App.module.scss'
import sentenceRaw from './assets/thai-sentences.txt?raw'
import InfoDashboard from './components/InfoDashboard/InfoDashboard'
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

const testTimeLength = 60000

function App() {
  const [sentenceIndex, setSentenceIndex] = useState(0)

  const [textInput, setTextInput] = useState('')

  const [incorrect, setIncorrect] = useState(0)

  const [prevSentenceIncorrect, setPrevSentenceIncorrect] = useState(0)

  const [prevSentence, setPrevSentence] = useState<PrevSentence[]>([])

  const [graphData, setGraphData] = useState<{ x: number; y: number }[]>([])

  const [typed, setTyped] = useState(0)

  const [elapsed, setElapsed] = useState(0)

  const [started, setStarted] = useState(false)

  const [ended, setEnded] = useState(false)

  const bkspPress = useRef(false)

  const textInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inp = event.target.value.replace('\n', '')

    if (inp.length === textInput.length) return

    // prevent selection delete
    if (Math.abs(inp.length - textInput.length) > 1) {
      if (bkspPress.current) {
        setTextInput((prev) => prev.slice(0, -1))
      } else {
        setTextInput((prev) => prev + inp)
      }
      return
    }

    setTextInput(inp)

    if (!started) {
      window.requestAnimationFrame(step)
      setStarted(true)
    }

    setIncorrect(
      countIncorrect(inp, sentencesArray[sentenceIndex])
    )

    if (!bkspPress.current) setTyped((prev) => prev + 1)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter') return
    // prevent submit empty
    if (textInput === '') return

    event.preventDefault()

    setPrevSentenceIncorrect(
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

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Backspace') return
    bkspPress.current = true
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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
    if (_elapsed >= testTimeLength) {
      setEnded(true)
      return
    }
    window.requestAnimationFrame(step)
  }

  return (
    <div className={styles.app}>
      <div className={styles.prevSentencePosition}>
        <PrevSentenceDisplay prevSentence={prevSentence} />
      </div>
      <div className={styles.cover}>
        <InfoDashboard
          elapsed={elapsed}
          typed={typed}
          incorrect={prevSentenceIncorrect + incorrect}
          testTimeLength={testTimeLength}
        />
        {/* <TypeSpeedGraph width={500} height={300} data={graphData} /> */}

        <SentenceDisplay sentence={sentencesArray[sentenceIndex]} />
        <SentenceInput
          disabled={ended}
          textInput={textInput}
          textInputChange={textInputChange}
          hasIncorrect={incorrect > 0}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          started={started}
        />
      </div>
    </div>
  )
}

export default App
