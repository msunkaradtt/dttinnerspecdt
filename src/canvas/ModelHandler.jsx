import React from 'react'
import { useGLTF } from "@react-three/drei";

const ModelHandler = (props) => {

    const { nodes, materials } = useGLTF(props.modelContent)

    return(
        <group {...props} dispose={null}>
            <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0.geometry}
            material={materials.mat0}
            />
        </group>
    )

}

export default ModelHandler