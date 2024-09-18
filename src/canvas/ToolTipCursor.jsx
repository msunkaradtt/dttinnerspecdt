import React, { useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"

const ToolTipCursor = (props) => {
    const snap = useSnapshot(state)

    return(
        <Html as='div'
        position={snap.labelPos}
        distanceFactor={0.25}
        pointerEvents='none'
        >
            <div className={`annotation ${snap.labelVis ? "visible" : "hidden"}`}>{snap.labelValue}</div>
        </Html>
    )
}

export default ToolTipCursor