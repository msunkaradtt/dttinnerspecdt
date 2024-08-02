import React, { useMemo, useRef, useState } from 'react'
import { PivotControls } from "@react-three/drei"

import {hexToRGB} from "./modelFnc"

const Model = (props) => {
    const mesh_ref = useRef()
    const [active, setActive] = useState(false)

    const color_rgb = hexToRGB(props.modelColor).split(",")

    props.modelMat.color.r = color_rgb[0]/255
    props.modelMat.color.g = color_rgb[1]/255
    props.modelMat.color.b = color_rgb[2]/255

    return(
        <PivotControls rotation={[0, -Math.PI / 2, 0]}
        anchor={[0, 0, 0]}
        scale={75}
        depthTest={false}
        fixed
        annotations
        lineWidth={2}
        visible={active}>
            <mesh
            ref={mesh_ref}
            castShadow
            receiveShadow
            geometry={props.modelGeo}
            material={props.modelMat}
            scale={props.modelScale}
            onClick={() => setActive(!active)}/>
        </PivotControls>
    )
}

export default Model