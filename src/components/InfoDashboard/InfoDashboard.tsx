import classNames from 'classNames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import styles from './InfoDashboard.module.scss'
import InfoDashboardSmallBox from './InfoDashboardSmallBox/InfoDashboardSmallBox'

function InfoDashboard({
  elapsed,
  typed,
  incorrect,
  testTimeLength,
}: InferProps<typeof InfoDashboard.propTypes>) {
  const timeMin = elapsed / 60000

  const cpm = typed / timeMin
  // gross word per min
  const gWpm = cpm / 5
  // net word per min
  const nWpm = Math.max(0, gWpm - incorrect / timeMin)

  const elap = Math.max(0, (testTimeLength - elapsed) / 1000)
  const elapDispMin = Math.trunc(elap / 60)
  const elapDispSec = Math.trunc(elap % 60)

  let tl: string
  if (elapDispMin > 0) {
    let t = `${elapDispMin}m `
    if (elapDispSec > 0) t += `${elapDispSec}s`
    tl = t
  } else {
    tl = `${elapDispSec}s`
  }

  return (
    <div className={styles.infoDashboard}>
      <div className={styles.dashboardRow}>
        <InfoDashboardSmallBox label="Time Left">{tl}</InfoDashboardSmallBox>
        <InfoDashboardSmallBox label="Typed">{typed}</InfoDashboardSmallBox>
        <InfoDashboardSmallBox label="Incorrect">
          <span
            className={classNames(styles.incorectCount, {
              [styles.incorrect]: incorrect > 0,
            })}
          >
            {incorrect}
          </span>
        </InfoDashboardSmallBox>
      </div>
      <div className={styles.dashboardRow}>
        <InfoDashboardSmallBox label="Gross CPM">
          {cpm ? cpm.toFixed(0) : 0}
        </InfoDashboardSmallBox>
        <InfoDashboardSmallBox label="Gross WPM">
          {gWpm ? gWpm.toFixed(0) : 0}
        </InfoDashboardSmallBox>
        <InfoDashboardSmallBox label="Net WPM">
          {nWpm ? nWpm.toFixed(0) : 0}
        </InfoDashboardSmallBox>
      </div>
    </div>
  )
}

InfoDashboard.propTypes = {
  elapsed: PropTypes.number.isRequired,
  typed: PropTypes.number.isRequired,
  incorrect: PropTypes.number.isRequired,
  testTimeLength: PropTypes.number.isRequired,
}

export default InfoDashboard
