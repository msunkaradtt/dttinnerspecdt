import React from 'react'

import { OrbitControls, Environment, PivotControls, Sky } from "@react-three/drei"

import * as THREE from "three";

import { folder, useControls } from "leva"

import ModelHandler from './ModelHandler'

const Experience = ({modelContent}) => {

    const [{ position, rotation, scale, color }, set, get] = useControls("Object Controls", () => ({
        transform: folder({
            position: {
                value: [0, 0, 0],
                step: 0.01,
            },
            rotation: {
                value: [0, 0, 0],
                step: 0.01
            },
            scale: {
                value: 1,
                min: 0,
                step: 0.1
            }
        }, {collapsed: true}),
        Material: folder({
            color: "#808080"
        }, {collapsed: true})
    }), {collapsed: true})

    return(
        <>
        <ambientLight intensity={1} />
        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25}  />
        <Environment preset='warehouse' background blur={0.5} />
        {modelContent !== "" ?
        (
        <PivotControls rotation={[0, -Math.PI / 2, 0]}
        anchor={[0, 0, 0]}
        scale={75}
        depthTest={false}
        fixed
        annotations
        lineWidth={2}
        onDrag={(local, deltalocal, world, deltaworld) => {
            const position = new THREE.Vector3()
            const scale = new THREE.Vector3()
            const quaternion = new THREE.Quaternion()
            world.decompose(position, quaternion, scale)
            const rotation = new THREE.Euler().setFromQuaternion(quaternion)

            set({
                position: position.toArray(),
                rotation: [rotation.x, rotation.y, rotation.z]
            })
        }}>
            <ModelHandler modelContent={modelContent}
            position={position}
            rotation={rotation}
            scale={scale}
            color={color}/>
        </PivotControls>) :
        (
        <PivotControls rotation={[0, -Math.PI / 2, 0]}
        anchor={[0, 0, 0]}
        scale={75}
        depthTest={false}
        fixed
        annotations
        lineWidth={2}
        onDrag={(local, deltalocal, world, deltaworld) => {
            const position = new THREE.Vector3()
            const scale = new THREE.Vector3()
            const quaternion = new THREE.Quaternion()
            world.decompose(position, quaternion, scale)
            const rotation = new THREE.Euler().setFromQuaternion(quaternion)

            set({
                position: position.toArray(),
                rotation: [rotation.x, rotation.y, rotation.z]
            })
        }}>
            <mesh castShadow receiveShadow position={position} rotation={rotation} scale={scale} >
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial attach="material" color={color} />
            </mesh>
        </PivotControls>
        )}
        <OrbitControls makeDefault />
        </>
    )
}

export default Experience