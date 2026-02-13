import { useState } from 'react'
import styles from './WalletConnect.module.css'

const WalletConnect = () => {
    const [account, setAccount] = useState(null)

    const connectWallet = () => {
        // Mock connection
        setTimeout(() => {
            setAccount('0x71C...9A23')
        }, 500)
    }

    return (
        <button
            className={styles.connectBtn}
            onClick={connectWallet}
            disabled={!!account}
        >
            {account ? (
                <span className={styles.connected}>
                    <span className={styles.dot}></span>
                    {account}
                </span>
            ) : (
                "Connect Wallet"
            )}
        </button>
    )
}

export default WalletConnect
