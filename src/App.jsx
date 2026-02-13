import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import RegisterForm from './components/RegisterForm'
import VerifyForm from './components/VerifyForm'

import SystemFooter from './components/SystemFooter'

function App() {
  const [currentView, setCurrentView] = useState('home') // home, register, verify

  const renderView = () => {
    switch (currentView) {
      case 'register':
        return <RegisterForm onBack={() => setCurrentView('home')} />
      case 'verify':
        return <VerifyForm onBack={() => setCurrentView('home')} />
      default:
        return <Dashboard onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '30px' }}>
      <Navbar />

      {/* Background Watermark/Seal */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          border: '20px solid rgba(255,255,255,0.02)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            fontSize: '10rem',
            opacity: '0.05',
            filter: 'grayscale(100%)',
            userSelect: 'none'
          }}>
            🛡️
          </div>
        </div>
      </div>

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', flex: 1, position: 'relative', zIndex: 1, width: '100%' }}>
        {renderView()}
      </main>
      <SystemFooter />
    </div>
  )
}

export default App
