import LoginPage from './login/page'
import { ThemeProvider } from "@/components/theme-provider"


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LoginPage/>
    </ThemeProvider>
  )
}

export default App
