import { useState, useEffect } from 'react'
import styles from './SystemFooter.module.css'

const SystemFooter = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <footer className={styles.footer}>
            <div className={styles.section}>
                <span className={styles.label}>SYSTEM STATUS:</span>
                <span className={styles.valuePositive}>ONLINE</span>
            </div>
            <div className={styles.section}>
                <span className={styles.label}>CLEARANCE:</span>
                <span className={styles.value}>LEVEL 5 (OFFICER)</span>
            </div>
            <div className={styles.section}>
                <span className={styles.label}>IP:</span>
                <span className={styles.value}>10.24.1.88 [SECURE]</span>
            </div>
            <div className={styles.section}>
                <span className={styles.label}>ZULU:</span>
                <span className={styles.value}>{time.toISOString().split('.')[0]}Z</span>
            </div>
        </footer>
    )
}

export default SystemFooter
