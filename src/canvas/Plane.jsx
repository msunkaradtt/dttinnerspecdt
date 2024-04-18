import React, {useRef} from 'react'
import {usePlane} from '@react-three/cannon'

const Plane = (props) => {
    const [ref] = usePlane(() => ({ mass: 0, ...props }), useRef())
    return (
    <mesh ref={ref} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial />
    </mesh>)
}

export default Plane