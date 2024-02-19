import React, { Suspense } from 'react'
import { Canvas } from "@react-three/fiber"
import { Stats } from "@react-three/drei"

import Experience from './Experience'


const CanvasMain = () => {
    return(
        <>
        <Canvas shadows camera={{ position: [-5, 1, 6], fov: 25 }}>
            <Suspense fallback={null}>
                <Experience />
            </Suspense>
            <gridHelper />
            <Stats />
        </Canvas>
        </>
    )
}

export default CanvasMain;