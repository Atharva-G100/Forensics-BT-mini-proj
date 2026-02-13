import { useState } from 'react'
import styles from './VerifyForm.module.css'

const VerifyForm = ({ onBack }) => {
    const [file, setFile] = useState(null)
    const [hash, setHash] = useState('')
    const [isHashing, setIsHashing] = useState(false)
    const [status, setStatus] = useState('idle') // idle, hashing, ready, verifying, success, failure
    const [evidenceData, setEvidenceData] = useState(null)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
        setHash('')
        setStatus('idle')
        setEvidenceData(null)
    }

    const generateHash = async () => {
        if (!file) return
        setIsHashing(true)
        setStatus('hashing')

        try {
            // Delay for effect
            await new Promise(r => setTimeout(r, 800));

            const buffer = await file.arrayBuffer()
            const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
            const hashArray = Array.from(new Uint8Array(hashBuffer))
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

            setHash(hashHex)
            setStatus('ready')
        } catch (error) {
            console.error("Hashing failed", error)
        } finally {
            setIsHashing(false)
        }
    }

    const verifyEvidence = () => {
        if (!hash) return
        setStatus('verifying')

        // Mock verification logic
        setTimeout(() => {
            const isSuccess = true

            if (isSuccess) {
                setStatus('success')
                setEvidenceData({
                    officerName: 'Officer John Doe',
                    caseId: 'CCS-2026-X01',
                    timestamp: '12 Feb 2026 – 10:12 AM',
                    status: 'Immutable / Verified'
                })
            } else {
                setStatus('failure')
            }
        }, 2000)
    }

    return (
        <div className={styles.container}>
            <button onClick={onBack} className={styles.backBtn}>← Back to Dashboard</button>

            <h2 className={styles.heading}>Verify Evidence Integrity</h2>

            <div className={styles.verifyBox}>
                <div className={styles.uploadSection}>
                    <input
                        type="file"
                        id="verifyFileInput"
                        className={styles.fileInput}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="verifyFileInput" className={styles.uploadLabel}>
                        {file ? (
                            <div className={styles.filePreview}>
                                <span className={styles.fileIcon}>📄</span>
                                <div className={styles.fileName}>{file.name}</div>
                            </div>
                        ) : (
                            <>
                                <span className={styles.uploadIcon}>🔍</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>INITIATE FILE SCAN</span>
                            </>
                        )}
                    </label>
                </div>

                <div className={styles.actionSection}>
                    {!hash && (
                        <button
                            className={styles.actionBtn}
                            onClick={generateHash}
                            disabled={!file || isHashing}
                        >
                            {isHashing ? 'COMPUTING HASH...' : 'GENERATE CHECKSUM'}
                        </button>
                    )}

                    {hash && (
                        <div className={styles.hashDisplay}>
                            <label>SHA-256 Checksum:</label>
                            <div className={styles.hashValue}>{hash}</div>

                            {status !== 'success' && status !== 'failure' && (
                                <button
                                    className={`${styles.actionBtn} ${styles.verifyBtn}`}
                                    onClick={verifyEvidence}
                                    disabled={status === 'verifying'}
                                >
                                    {status === 'verifying' ? 'QUERYING BLOCKCHAIN...' : 'VERIFY INTEGRITY'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Results */}
            {status === 'success' && evidenceData && (
                <div className={`${styles.resultBox} ${styles.success}`}>
                    <div className={styles.resultHeader}>
                        <span className={styles.resultIcon}>🛡️</span>
                        <h3>INTEGRITY CONFIRMED</h3>
                    </div>
                    <div className={styles.resultDetails}>
                        <p><strong>Status:</strong> <span className={styles.tagSuccess}>{evidenceData.status}</span></p>
                        <p><strong>Registrar:</strong> {evidenceData.officerName}</p>
                        <p><strong>Case ID:</strong> {evidenceData.caseId}</p>
                        <p><strong>Timestamp:</strong> {evidenceData.timestamp}</p>
                    </div>
                </div>
            )}

            {status === 'failure' && (
                <div className={`${styles.resultBox} ${styles.failure}`}>
                    <div className={styles.resultHeader}>
                        <span className={styles.resultIcon}>❌</span>
                        <h3>INTEGRITY MISMATCH</h3>
                    </div>
                    <div className={styles.resultDetails}>
                        <p>CRITICAL ALERT: The cryptographic hash of this file does not match any record on the registry.</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VerifyForm
