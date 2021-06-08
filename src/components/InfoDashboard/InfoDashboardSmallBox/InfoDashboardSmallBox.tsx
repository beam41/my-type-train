import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import styles from './InfoDashboardSmallBox.module.scss'

function InfoDashboardSmallBox({
  label,
  children,
}: InferProps<typeof InfoDashboardSmallBox.propTypes>) {
  return (
    <div className={styles.infoDashboardSmallBox}>
      <div className={styles.label}>{label}</div>
      <div className={styles.children}>{children}</div>
    </div>
  )
}

InfoDashboardSmallBox.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default InfoDashboardSmallBox
