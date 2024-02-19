import React from 'react'
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Experience = () => {
    return(
        <>
        <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={25} />
        <ambientLight intensity={0.5} />
        <color attach="background" args={['#E8E9ED']} />
        </>
    )
}

export default Experience