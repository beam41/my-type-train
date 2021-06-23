import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import styles from './App.module.scss'
import sentenceRaw from './assets/thai-sentences.txt?raw'
import InfoDashboard from './components/InfoDashboard/InfoDashboard'
import PrevSentenceDisplay from './components/PrevSentenceDisplay/PrevSentenceDisplay'
import ResetButton from './components/ResetButton/ResetButton'
import SentenceDisplay from './components/SentenceDisplay/SentenceDisplay'
import SentenceInput from './components/SentenceInput/SentenceInput'
import TimeSelector from './components/TimeSelector/TimeSelector'
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

  const [prevSentenceIncorrect, setPrevSentenceIncorrect] = useState(0)

  const [prevSentence, setPrevSentence] = useState<PrevSentence[]>([])

  // const [graphData, setGraphData] = useState<{ x: number; y: number }[]>([])

  const [typed, setTyped] = useState(0)

  const [allTyped, setAllTyped] = useState(0)

  const [allMissed, setAllMissed] = useState(0)

  const [elapsed, setElapsed] = useState(0)

  const [started, setStarted] = useState(false)

  const [ended, setEnded] = useState(false)

  const testTimeLengthTemp = useRef(60000)

  const [testTimeLength, setTestTimeLength] = useState(60000)

  const bkspPress = useRef(false)

  const textInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inp = event.target.value.replace('\n', '')

    if (inp.length === textInput.length) return

    let nt: string;
    // prevent selection delete
    if (Math.abs(inp.length - textInput.length) > 1) {
      if (bkspPress.current) {
        nt = textInput.slice(0, -1)

        setTyped((prev) => prev - 1)
      } else {
        nt = textInput + inp

        setTyped((prev) => prev + 1)
        setAllTyped((prev) => prev + 1)
      }
      setTextInput(nt)
    } else {
      if (textInput.length < inp.length) {
        setTyped((prev) => prev + 1)
        setAllTyped((prev) => prev + 1)
      } else {
        setTyped((prev) => prev - 1)
      }

      setTextInput(inp)

      if (!started) {
        window.requestAnimationFrame(step)
        setStarted(true)
      }

      nt = inp
    }
    const currIncorrect = countIncorrect(nt, sentencesArray[sentenceIndex])
    if (currIncorrect > incorrect) setAllMissed(prev => prev+1)
    setIncorrect(currIncorrect)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key !== 'Enter' ||
      textInput === '' ||
      sentencesArray[sentenceIndex].length !== textInput.length
    ) {
      return
    }

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
        inputSentence: textInput.replaceAll(' ', '\xa0'),
        incorrectCount: incorrect,
      },
    ])

    setIncorrect(0)
    setSentenceIndex((prev) => prev + 1)
    if (sentenceIndex >= sentencesArray.length - 1) {
      setEnded(true)
    }
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

    let end = false
    // simply using ended doesn't work lol
    setEnded((prev) => {
      end = prev
      return prev
    })
    if (_elapsed >= testTimeLengthTemp.current || end) {
      setEnded(true)
      return
    }
    window.requestAnimationFrame(step)
  }

  const setTestTime = (time: number) => {
    testTimeLengthTemp.current = time * 1000
    setTestTimeLength(testTimeLengthTemp.current)
  }

  const reset = () => {
    setSentenceIndex(0)
    setTextInput('')
    setIncorrect(0)
    setPrevSentenceIncorrect(0)
    setPrevSentence([])
    // setGraphData([])
    setTyped(0)
    setAllTyped(0)
    setAllMissed(0)
    setElapsed(0)
    setStarted(false)
    setEnded(false)
    setTestTimeLength(testTimeLengthTemp.current)
    startTime.current = undefined
  }

  return (
    <div className={styles.app}>
      <div className={styles.absolutePosition}>
        <TimeSelector onChange={setTestTime} hidden={started} />
        <PrevSentenceDisplay prevSentence={prevSentence} />
      </div>
      <div className={styles.cover}>
        <InfoDashboard
          elapsed={elapsed}
          typed={typed}
          incorrect={prevSentenceIncorrect + incorrect}
          testTimeLength={testTimeLength}
          accuracy={(allTyped - allMissed) / allTyped}
        />
        {/* <TypeSpeedGraph width={500} height={300} data={graphData} /> */}

        <SentenceDisplay sentence={sentencesArray[sentenceIndex] ?? ''} />
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
      <div className={styles.absolutePosition}>
        <div className={styles.lengthDisplay}>{textInput.length}/{sentencesArray[sentenceIndex].length}</div>
        <ResetButton onClick={reset} hidden={!ended} />
      </div>
    </div>
  )
}

export default App
