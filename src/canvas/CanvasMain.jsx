import React, { Suspense } from 'react'
import { Canvas } from "@react-three/fiber"
import { Stats, GizmoHelper, GizmoViewport } from "@react-three/drei"

import Experience from './Experience'

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"


const CanvasMain = () => {
    const snap = useSnapshot(state)

    return(
        <>
        <Canvas shadows raycaster={{ params: { Line: { threshold: 0.15 } } }} camera={{ position: [-5, 1, 6], fov: 25 }}>
            <Suspense fallback={null}>
                <Experience modelContent={snap.slectedInputContent} />
            </Suspense>
            <gridHelper />
            <Stats />
            <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
                <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
        </Canvas>
        </>
    )
}

export default CanvasMain;