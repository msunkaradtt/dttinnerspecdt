import React from "react"

import { Card, Input } from "@material-tailwind/react"

const ModalTable = () => {
    return(
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <tbody>
                    <tr key="value1">
                        <td className="flex flex-row p-4 border-b border-blue-gray-50">
                            <Input id="ro1" defaultValue={0.0} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{className: "before:content-none after:content-none",}} containerProps={{className: "min-w-0",}} />
                            <Input id="ro2" defaultValue={0.5} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{className: "before:content-none after:content-none",}} containerProps={{className: "min-w-0",}} />
                            <Input id="ro3" defaultValue={0.0} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{className: "before:content-none after:content-none",}} containerProps={{className: "min-w-0",}} />
                        </td>
                    </tr>
                    <tr key="value2">
                        <td className="flex flex-row p-4 border-b border-blue-gray-50">
                            <Input id="ro11" defaultValue={0.0} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{className: "before:content-none after:content-none",}} containerProps={{className: "min-w-0",}} />
                            <Input id="ro12" defaultValue={0.5} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{className: "before:content-none after:content-none",}} containerProps={{className: "min-w-0",}} />
                            <Input id="ro13" defaultValue={0.5} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{className: "before:content-none after:content-none",}} containerProps={{className: "min-w-0",}}/>
                        </td>
                    </tr>
                    <tr key="value3">
                        <td className="flex flex-row p-4 border-b border-blue-gray-50">
                            <Input id="ro21" defaultValue={0.9} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{className: "before:content-none after:content-none",}} containerProps={{className: "min-w-0",}} />
                            <Input id="ro22" defaultValue={1.5} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{className: "before:content-none after:content-none",}} containerProps={{className: "min-w-0",}} />
                            <Input id="ro23" defaultValue={2.5} className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{className: "before:content-none after:content-none",}} containerProps={{className: "min-w-0",}}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    )
}

export default ModalTable