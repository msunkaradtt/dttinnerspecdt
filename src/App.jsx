import React from "react"

/*
Configurations
*/
import {Nav_Config} from "./config"

/*
Components
*/
import {Navigation, Loading, Footer} from "./components"
import {CanvasMain, CanvasMap} from "./canvas"

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "./store"

import {
  Tabs,
  TabsHeader,
  Tab, TabsBody, TabPanel
} from "@material-tailwind/react"

function App() {

  const snap = useSnapshot(state)

  return (
    <main>
      <Navigation comp_name="navigation" nav_config={Nav_Config} />
      <Tabs value={snap.activeTab}>
        <TabsHeader className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className: "bg-transparent border-b-2 border-blue-gray-900 shadow-none rounded-none",
        }}>
          <Tab key={"Normal"}
          value={"Normal"}
          onClick={() => {state.activeTab = "Normal"}}
          className={snap.activeTab === "Normal" ? "text-blue-gray-900" : "text-blue-gray-400"}>Digital Twin</Tab>
          <Tab key={"Maps"}
          value={"Maps"}
          onClick={() => {state.activeTab = "Maps"}}
          className={snap.activeTab === "Maps" ? "text-blue-gray-900" : "text-blue-gray-400"}>Maps</Tab>
        </TabsHeader>
        <TabsBody className="flex flex-col h-screen">
          <TabPanel className="flex-grow" key={"Normal"} value={"Normal"}>
            <CanvasMain />
          </TabPanel>
          <TabPanel className="flex-grow" key={"Maps"} value={"Maps"}>
            <CanvasMap />
          </TabPanel>
        </TabsBody>
      </Tabs>
      <Loading />
      <Footer />
    </main>
  )
}

export default App
