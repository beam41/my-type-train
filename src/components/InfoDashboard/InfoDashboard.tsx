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
  accuracy,
}: InferProps<typeof InfoDashboard.propTypes>) {
  const timeMin = elapsed / 60000

  const cpm = typed / timeMin
  // gross word per min
  const gWpm = cpm / 5
  // net word per min
  const nWpm = Math.max(0, gWpm - incorrect / timeMin)

  const elapMsec = Math.max(0, testTimeLength - elapsed)
  const elap = elapMsec / 1000
  const elapDispMin = Math.trunc(elap / 60)
  const elapDispSec = Math.trunc(elap % 60)

  let tl: string = ''
  if (elapDispMin > 0) tl += `${elapDispMin}m `
  if (elapDispSec > 0) tl += `${elapDispSec}s`
  if (elap < 1) tl += `${Math.trunc(elapMsec % 1000)}ms`

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
        <InfoDashboardSmallBox label="Accuracy">
          {!isNaN(accuracy) ? Math.round(accuracy * 100) : 100}%
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
  accuracy: PropTypes.number.isRequired,
}

export default InfoDashboard
