import React, { useState } from "react"

/*
Configurations
*/
import {Nav_Config} from "./config"

/*
Components
*/
import {Navigation, Loading, Footer} from "./components"
import {CanvasMain} from "./canvas"

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "./store"

function App() {

  //<Loading />

  const snap = useSnapshot(state)

  return (
    <main className="flex flex-col h-screen">
      <Navigation comp_name="navigation" nav_config={Nav_Config} />
      <div className="flex-grow px-4 py-2">
        {snap.load && <CanvasMain />}
      </div>
      <Footer />
    </main>
  )
}

export default App
