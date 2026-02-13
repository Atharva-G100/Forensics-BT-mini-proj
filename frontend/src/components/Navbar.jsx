import WalletConnect from './WalletConnect'
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                Immutable Evidence Registry
            </div>

            <div className={styles.actions}>
                <div className={styles.network}>
                    <span className={styles.networkDot}></span>
                    Sepolia
                </div>
                <WalletConnect />
            </div>
        </nav>
    )
}

export default Navbar
