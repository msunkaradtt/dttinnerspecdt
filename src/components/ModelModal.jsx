import React from "react"
import { Html } from "@react-three/drei"
import { Typography,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    Tabs,
    TabsHeader,
    Tab,
    TabsBody,
    TabPanel} from "@material-tailwind/react"

import ModalTable from "./ModalTable"

const ModelModal = ({open, handleOpen, modelName}) => {

    return (
    <Html center>
        <Dialog size="lg" open={open} handler={handleOpen}>
            <DialogHeader className="justify-between">
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {modelName}
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
            <DialogBody>
                <Tabs value="Normal">
                    <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className: "bg-transparent border-b-2 border-blue-gray-900 shadow-none rounded-none",
                        }}>
                        <Tab key={"Normal"} value={"Normal"} className="text-blue-gray-900">Material</Tab>
                        <Tab key={"Normal1"} value={"Normal1"} className="text-blue-gray-900">Inspection</Tab>
                        <Tab key={"Normal2"} value={"Normal2"} className="text-blue-gray-900">Code</Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel key={"Normal"} value={"Normal"}>
                            <ModalTable />
                        </TabPanel>
                        <TabPanel key={"Normal1"} value={"Normal1"}>
                            <ModalTable />
                        </TabPanel>
                        <TabPanel key={"Normal2"} value={"Normal2"}>
                            <ModalTable />
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </DialogBody>
        </Dialog>
    </Html>
    )
}

export default ModelModal