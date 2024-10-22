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

import ModalTable from "./ModalTable"

/**
 *
 * Temoporary
*/
const DesignTabParams = [
    { label: "Design pressure", value: "", units: "Psi", type: "text"},
    { label: "Design temperature", value: "", units: "C", type: "text"},
    { label: "External diameter", value: "", units: "in", type: "text"},
    { label: "Nominal thickness used", value: "", units: "in", type: "text"},
    { label: "Mechanical plus corrosion and erosion allowances", value: "", units: "in", type: "text"},
    { label: "Longitudinal Efficiency", value: "", units: "E", type: "text"},
    { label: "Under tolerance allowance", value: "", units: "in", type: "text"},
]

const MaterialTabParams = [
    { label: "Material", value: "", units: "", type: "dropdown"},
    { label: "Minimum yield strength", value: "", units: "Psi", type: "text"},
    { label: "Allowable stress value for material", value: "", units: "Psi", type: "text"},
    { label: "Coefficient", value: "", units: "", type: "text"},
    { label: "Weld joint reduction factor", value: "", units: "", type: "text"},
]

const ModelModal = ({open, handleOpen, modelName}) => {

    return (
    <Html center>
        <Dialog size="xs" open={open} handler={handleOpen}>
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
            <DialogBody divider className="h-96 overflow-y-auto">
                <Tabs value="Normal">
                    <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className: "bg-transparent border-b-2 border-blue-gray-900 shadow-none rounded-none",
                        }}>
                        <Tab key={"Normal"} value={"Normal"} className="text-blue-gray-900">Design</Tab>
                        <Tab key={"Normal1"} value={"Normal1"} className="text-blue-gray-900">Material</Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel key={"Normal"} value={"Normal"}>
                            <ModalTable params={DesignTabParams} />
                        </TabPanel>
                        <TabPanel key={"Normal1"} value={"Normal1"}>
                            <ModalTable params={MaterialTabParams} />
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

export default ModelModal