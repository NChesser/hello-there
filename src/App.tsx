import './App.css'
import CozyQuestApp from './cozy-quest-app'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <CozyQuestApp />
    </ThemeProvider>
  )
}

export default App
