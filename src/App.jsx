import React from "react"

/*
Configurations
*/
import {Nav_Config} from "./config"

/*
Components
*/
import {Navigation} from "./components";

function App() {

  return (
    <main>
      <Navigation comp_name="navigation" nav_config={Nav_Config} />
    </main>
  )
}

export default App
