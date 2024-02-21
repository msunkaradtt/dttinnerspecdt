import React from "react"

/*
Configurations
*/
import {Nav_Config} from "./config"

/*
Components
*/
import {Navigation, Loading, Footer} from "./components"
import {CanvasMain} from "./canvas"

function App() {

  return (
    <main className="flex flex-col h-screen">
      <Navigation comp_name="navigation" nav_config={Nav_Config} />
      <div className="flex-grow px-4 py-2">
        <CanvasMain />
      </div>
      <Loading />
      <Footer />
    </main>
  )
}

export default App
