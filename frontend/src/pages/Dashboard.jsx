import styles from './Dashboard.module.css'

const Dashboard = ({ onNavigate }) => {
    return (
        <div className={styles.dashboard}>
            <h2 className={styles.title}>Welcome back, Officer.</h2>
            <p className={styles.subtitle}>SECURE TERMINAL ACCESS GRANTED</p>

            <div className={styles.cardContainer}>
                {/* Register Card */}
                <div
                    className={`${styles.card} ${styles.registerCard}`}
                    onClick={() => onNavigate('register')}
                >
                    <div className={styles.cornerTopLeft}></div>
                    <div className={styles.cornerBottomRight}></div>

                    <div className={styles.iconContainer}>
                        <span className={styles.techIcon}>📂</span> {/* Using high contrast emoji for now, or SVG later */}
                    </div>
                    <h3>REGISTER EVIDENCE</h3>
                    <p>Securely upload and hash new digital evidence to the immutable registry.</p>
                </div>

                {/* Verify Card */}
                <div
                    className={`${styles.card} ${styles.verifyCard}`}
                    onClick={() => onNavigate('verify')}
                >
                    <div className={styles.cornerTopLeft}></div>
                    <div className={styles.cornerBottomRight}></div>

                    <div className={styles.iconContainer}>
                        <span className={styles.techIcon}>🔍</span>
                    </div>
                    <h3>VERIFY INTEGRITY</h3>
                    <p>Cross-reference file hashes against the blockchain to detect tampering.</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
