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

import { useToastify } from "../providers"

/**
 *
 * Temoporary
*/
const DesignTabParams = [
    { label: "Design pressure", value: "740", units: "Psi", type: "text"},
    { label: "Design temperature", value: "212", units: "F", type: "text"},
    { label: "External diameter", value: "6", units: "in", type: "text"},
    { label: "Nominal thickness used", value: "0.4", units: "in", type: "text"},
    { label: "Mechanical plus corrosion and erosion allowances", value: "0.6", units: "in", type: "text"},
    { label: "Longitudinal Efficiency", value: "1", units: "", type: "text"},
    { label: "Under tolerance allowance", value: "0.125", units: "", type: "text"},
]

const MaterialTabParams = [
    { label: "Material", value: "", units: "", type: "dropdown"},
    { label: "Minimum yield strength", value: "350000", units: "Psi", type: "text"},
    { label: "Allowable stress value for material", value: "21700", units: "Psi", type: "text"},
    { label: "Coefficient", value: "0.4", units: "", type: "text"},
    { label: "Weld joint reduction factor", value: "1", units: "", type: "text"},
]

const ModelModal = ({open, handleOpen, modelName}) => {

    const notifier = useToastify()

    const handleRun = async () => {
        try {
            const endpoint = "http://localhost:8001/calculate-thickness-pec"
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
            let bodyContent = JSON.stringify({
                "t": 0.4,
                "c": 0.6,
                "UTP": 0.125,
                "D": 6,
                "P": 740,
                "S": 21700,
                "E": 1,
                "W": 1,
                "Y": 0.4,
                "measurement_data": [
                    {"Location": 0, "1030mm": 11, "1035mm": 10.3, "1040mm": 11, "1045mm": 10.6, "1050mm": 11, "1055mm": 11, "1060mm": 11, "1065mm": 11, "1070mm": 10.8},
                    {"Location": 350, "1030mm": 11, "1035mm": 10.85,"1040mm": 10.8, "1045mm": 11, "1050mm": 8.5, "1055mm": 5.6, "1060mm": 8.7, "1065mm": 10.5, "1070mm": 10.8},
                    {"Location": 340, "1030mm": 10.65,"1035mm": 11, "1040mm": 11, "1045mm": 10.9, "1050mm": 9, "1055mm": 6, "1060mm": 9.9, "1065mm": 9, "1070mm": 11},
                    {"Location": 330, "1030mm": 11, "1035mm": 10.97, "1040mm": 10.97, "1045mm": 11, "1050mm": 11, "1055mm": 10.6, "1060mm": 11, "1065mm": 10.94, "1070mm": 11},
                    {"Location": 320, "1030mm": 11, "1035mm": 11, "1040mm": 11, "1045mm": 10.4, "1050mm": 11, "1055mm": 11, "1060mm": 11, "1065mm": 11, "1070mm": 11}
                ]
            })

            let response = await fetch(endpoint, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            })

            let data = await response.json()
            let msg1 = "Message: " + data.message
            let msg2 = "tmin: " + data.tmin

            handleOpen()

            notifier.notifyInfo(msg1)
            notifier.notifyInfo(msg2)
        } catch (error) {
            handleOpen()
            notifier.notifyError(error)
        }
    }

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
                    <Button color="blue-gray-900" onClick={handleRun}>Run</Button>
                </div>
        </DialogFooter>
        </Dialog>
    </Html>
    )
}

export default ModelModal