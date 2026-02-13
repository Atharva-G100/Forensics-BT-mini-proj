import { useState } from 'react'
import styles from './RegisterForm.module.css'

const RegisterForm = ({ onBack }) => {
    const [file, setFile] = useState(null)
    const [hash, setHash] = useState('')
    const [isHashing, setIsHashing] = useState(false)
    const [formData, setFormData] = useState({
        caseId: '',
        officerName: '',
        evidenceType: 'Digital',
        notes: ''
    })
    const [status, setStatus] = useState('idle') // idle, hashing, ready, registering, success
    const [txDetails, setTxDetails] = useState(null)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
        setHash('')
        setStatus('idle')
    }

    const generateHash = async () => {
        if (!file) return
        setIsHashing(true)
        setStatus('hashing')

        try {
            // Simulate "Working" delay for effect
            await new Promise(r => setTimeout(r, 1000));

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

    const registerEvidence = () => {
        if (!hash) return
        setStatus('registering')

        // Mock blockchain transaction
        setTimeout(() => {
            setStatus('success')
            setTxDetails({
                txHash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                blockNumber: Math.floor(Math.random() * 1000000) + 5000000,
                timestamp: new Date().toISOString()
            })
        }, 2000)
    }

    return (
        <div className={styles.container}>
            <button onClick={onBack} className={styles.backBtn}>← Back to Dashboard</button>

            <h2 className={styles.heading}>Register New Evidence</h2>

            <div className={styles.grid}>
                {/* Left Column: File Upload */}
                <div className={styles.leftCol}>
                    <div className={styles.uploadBox}>
                        <div className={styles.scanLine}></div>
                        <input
                            type="file"
                            id="fileInput"
                            className={styles.fileInput}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="fileInput" className={styles.uploadLabel}>
                            {file ? (
                                <div className={styles.filePreview}>
                                    <span className={styles.fileIcon}>📄</span>
                                    <span className={styles.fileName}>{file.name}</span>
                                    <span className={styles.fileSize}>{(file.size / 1024).toFixed(2)} KB</span>
                                </div>
                            ) : (
                                <>
                                    <span className={styles.uploadIcon}>☁️</span>
                                    <span>Drag & Drop or Click to Upload</span>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                {/* Right Column: Metadata */}
                <div className={styles.rightCol}>
                    <div className={styles.formGroup}>
                        <label>Case ID</label>
                        <input
                            type="text"
                            placeholder="e.g. CCS-2026-X01"
                            value={formData.caseId}
                            onChange={e => setFormData({ ...formData, caseId: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Officer Name</label>
                        <input
                            type="text"
                            placeholder="Officer Name"
                            value={formData.officerName}
                            onChange={e => setFormData({ ...formData, officerName: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Evidence Type</label>
                        <select
                            value={formData.evidenceType}
                            onChange={e => setFormData({ ...formData, evidenceType: e.target.value })}
                        >
                            <option>Digital Forensics</option>
                            <option>Physical (Photo)</option>
                            <option>Document Scan</option>
                            <option>Audio/Video Log</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Chain of Custody Notes</label>
                        <textarea
                            rows="3"
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                {!hash && (
                    <button
                        className={styles.actionBtn}
                        onClick={generateHash}
                        disabled={!file || isHashing}
                    >
                        {isHashing ? 'Computing Cryptographic Hash...' : 'Generate SHA-256 Digest'}
                    </button>
                )}

                {hash && (
                    <div className={styles.hashResult}>
                        <label>Computed SHA-256 Digest:</label>
                        <div className={styles.hashBox}>{hash}</div>

                        {status !== 'success' && (
                            <button
                                className={`${styles.actionBtn} ${styles.registerBtn}`}
                                onClick={registerEvidence}
                                disabled={status === 'registering'}
                            >
                                {status === 'registering' ? 'Broadcasting to Network...' : 'Commit to Blockchain'}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Success State */}
            {status === 'success' && txDetails && (
                <div className={styles.successBox}>
                    <h3>✅ Evidence Secured on Blockchain</h3>
                    <div className={styles.txInfo}>
                        <p><strong>TX Hash:</strong> {txDetails.txHash}</p>
                        <p><strong>Block Height:</strong> {txDetails.blockNumber}</p>
                        <p><strong>Timestamp:</strong> {txDetails.timestamp}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RegisterForm
