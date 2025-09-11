import React from "react"
import { Html } from "@react-three/drei"
import { Typography,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tabs,
    TabsHeader,
    Tab,
    TabsBody,
    TabPanel, Button} from "@material-tailwind/react"

import AITable from "./AITable"
import OllamaTable from "./OllamaTable"

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"

/**
 *
 * Temoporary
*/
const AITabParams = [
    { label: "Input", type: "file"},
    { label: "Select Model", type: "text"},
]

const handleOpen = () => {
    state.showAIModal = false
}

const AIModal = (props) => {
    const snap = useSnapshot(state)

    return (
    <Html center>
        <Dialog size="md" open={snap.showAIModal} handler={handleOpen}>
            <DialogHeader className="justify-between">
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {"AI Corner"}
                    </Typography>
                </div>
                <IconButton
                color="blue-gray"
                size="sm"
                variant='text'
                className="outline-none"
                onClick={handleOpen}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </IconButton>
            </DialogHeader>
            <DialogBody divider className="h-96 overflow-y-auto">
                <Tabs value="Normal">
                    <TabsHeader className="rounded-none border-b border-blue-gray-50 bg-transparent p-0" indicatorProps={{className: "bg-transparent border-b-2 border-blue-gray-900 shadow-none rounded-none",}}>
                        <Tab key={"Normal"} value={"Normal"} className="text-blue-gray-900">
                            Preduction Modals
                        </Tab>
                        <Tab key={"Normal1"} value={"Normal1"} className="text-blue-gray-900">
                            DTT Ollama 🤖
                        </Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel key={"Normal"} value={"Normal"}>
                            <AITable />
                        </TabPanel>
                        <TabPanel key={"Normal1"} value={"Normal1"}>
                            <OllamaTable />
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </DialogBody>
            <DialogFooter>
                <div className="flex space-x-2">
                    <Button variant="outlined" onClick={handleOpen}>Cancel</Button>
                    <Button color="blue-gray-900">Update</Button>
                </div>
        </DialogFooter>
        </Dialog>
    </Html>
    )
}

export default AIModal