import './App.css'
import Ascuas from './Ascuas'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Ascuas />
    </ThemeProvider>
  )
}

export default App
