import React from 'react'
import { OrbitControls, Environment, PivotControls } from "@react-three/drei";

import ModelHandler from './ModelHandler';

const Experience = ({modelContent}) => {

    return(
        <>
        <ambientLight intensity={0.5} />
        <Environment preset='lobby' background blur={0.5} />
        {modelContent !== "" ?
        (
        <PivotControls rotation={[0, -Math.PI / 2, 0]}
        anchor={[0, 0, 0]}
        scale={75}
        depthTest={false}
        fixed
        annotations
        lineWidth={2}>
            <ModelHandler modelContent={modelContent} scale={[0.1, 0.1, 0.1]} />
        </PivotControls>) :
        (
        <PivotControls rotation={[0, -Math.PI / 2, 0]}
        anchor={[0, 0, 0]}
        scale={75}
        depthTest={false}
        fixed
        annotations
        lineWidth={2}>
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial attach="material" color="#6be092" />
            </mesh>
        </PivotControls>
        )}
        <OrbitControls makeDefault />
        </>
    )
}

export default Experience