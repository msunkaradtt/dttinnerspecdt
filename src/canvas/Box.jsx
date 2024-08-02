import React, {useRef, useState} from 'react'
import { PivotControls } from "@react-three/drei"

const Box = (props) => {

    const mesh_ref = useRef()

    const [active, setActive] = useState(false)
    const [hovered, setHovered] = useState(false)

    return (
        <PivotControls rotation={[0, -Math.PI / 2, 0]}
        anchor={[0, 0, 0]}
        scale={75}
        depthTest={false}
        fixed
        annotations
        lineWidth={2}
        visible={active}>
            <mesh {...props}
            ref={mesh_ref}
            castShadow
            receiveShadow
            scale={props.modelScale}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            position={props?.position}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : props.modelColor} />
            </mesh>
        </PivotControls>
    )
}

export default Box