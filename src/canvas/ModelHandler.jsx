import React  from 'react'
import { useGLTF, Wireframe } from "@react-three/drei";

const hexToRGB = hex => {
    let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0);
    if (h.length === 3) h = [...h].map(x => x + x).join('');
    else if (h.length === 8) alpha = true;
    h = parseInt(h, 16);

    return (
        (h >>> (alpha ? 24 : 16)) +
        ',' +
        ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
        ',' +
        ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0))
    )
}

/**
        <group {...props} dispose={null}>
            <mesh
            castShadow
            receiveShadow
            geometry={nodes.DEFECT_SURFACE_1.geometry}
            material={materials.Mat_1}
            />
        </group>
 */

const ModelHandler = (props) => {

    const { nodes, materials } = useGLTF(props.modelContent)

    console.log(nodes)


    const color_rgb = hexToRGB(props.color).split(",")

    materials.mat0.color.r = color_rgb[0]/255
    materials.mat0.color.g = color_rgb[1]/255
    materials.mat0.color.b = color_rgb[2]/255

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