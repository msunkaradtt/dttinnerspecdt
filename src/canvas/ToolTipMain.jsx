import React from 'react'
import { Html } from '@react-three/drei'

import {
    Card,
    CardBody,
    Typography,} from "@material-tailwind/react"

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"

const ToolTipMain = (props) => {
    const snap = useSnapshot(state)

    return(
        <Html as='div'
        position={props.pos}
        pointerEvents='none'
        >
            <div>
                <Card className="mt-6 w-96 bg-indigo-50">
                    <CardBody>
                        <Typography variant="h6" color="blue-gray" className="mb-1 flex items-center justify-center">
                            LRUT
                        </Typography>
                        <Typography variant="h6" color="blue-gray" className="mb-1">
                            Axial location: {props.axloc}
                        </Typography>
                        <Typography variant="h6" color="blue-gray" className="mb-1">
                            Indication: {props.ind}
                        </Typography>
                        <Typography variant="h6" color="blue-gray" className="mb-1">
                        Circumferential location: {props.ciclo}
                        </Typography>
                    </CardBody>
                </Card>
            </div>
        </Html>
    )
}

export default ToolTipMain