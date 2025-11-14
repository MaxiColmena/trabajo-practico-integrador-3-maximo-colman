import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Routes, Route } from "react-router"
import { AppRouter } from "./router/AppRouter"

export const App = () => {

  return (
    <AppRouter>
    <main className="h-screen grid grid-rows-[auto_1fr_auto]">
      <Navbar/>
        desde cero
      <Footer/>
    </main>
    </AppRouter>
  )
}
