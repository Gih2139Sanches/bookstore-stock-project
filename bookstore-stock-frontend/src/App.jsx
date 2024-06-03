import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Tabs } from "./components/Tabs";
import { Header } from "./components/Header";
import { AppRoutes } from "./routes"

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Router>
        <Header />
        <Tabs />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  )
}
