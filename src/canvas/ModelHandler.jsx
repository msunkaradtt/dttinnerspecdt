import React, { useMemo, useRef } from 'react'
import { useGLTF } from "@react-three/drei"
import { Float32BufferAttribute } from "three"

import { Lut } from "three/examples/jsm/math/Lut"
import { folder, useControls } from "leva"

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

const randBetween = (min, max) => {
    let delta = max - min
    return Math.round(min + Math.random() * delta)
}

const ModelHandler = (props) => {
    const model_ref = useRef()

    const {map, cm_min, cm_max} = useControls({
        ColorMap: folder({
            showColorMap: {
                value: false,
                onChange: (v) => {
                    model_ref.current.material.vertexColors = v
                    model_ref.current.material.needsUpdate = true
                }
            },
            map: {
                value: "rainbow",
                options: ["rainbow", "cooltowarm", "blackbody", "grayscale"]
            },
            cm_min: 0,
            cm_max: 2000,
            showMesh: {
                value: false,
                onChange: (v) => {
                    model_ref.current.material.wireframe = v
                }
            }
        })
    })

    const lut = useMemo(() => {
        const lut = new Lut()

        lut.setColorMap(map)
        lut.setMin(cm_min)
        lut.setMax(cm_max)

        return lut
    }, [map, cm_min, cm_max])

    const { nodes, materials } = useGLTF(props.modelContent)

    const tempValues = []
    if(tempValues.length === 0){
        for(let j = 0; j < 8790; j++) {
            tempValues.push(randBetween(0, 2000))
        }
    }

    const loadedGeo = nodes.mesh_0.geometry

    const coloredGeo = useMemo(() => {
        if(!loadedGeo) return
        loadedGeo.center()
        loadedGeo.computeVertexNormals()

        const defaultColor = []
        for (let i = 0, n = loadedGeo.attributes.position.count; i < n; ++i) {
            defaultColor.push(1, 1, 1)
        }

        loadedGeo.setAttribute("color", new Float32BufferAttribute(defaultColor, 3))

        const colors = loadedGeo.attributes.color

        for (let i = 0; i < tempValues.length; i++) {
            const sensorValue = tempValues[i]

            const color = lut.getColor(sensorValue)

            if (color === undefined) {
                console.log("Unable to determine color for value:", sensorValue)
            } else {
                colors.setXYZ(i, color.r, color.g, color.b)
            }
        }

        return loadedGeo
    }, [loadedGeo, lut])


    const color_rgb = hexToRGB(props.color).split(",")

    materials.mat0.color.r = color_rgb[0]/255
    materials.mat0.color.g = color_rgb[1]/255
    materials.mat0.color.b = color_rgb[2]/255

    //materials.mat0.wireframe = props.showMesh

    return(
        <group {...props} dispose={null}>
            <mesh
            castShadow
            receiveShadow
            geometry={coloredGeo}
            material={materials.mat0}
            ref={model_ref}
            />
        </group>
    )

}

export default ModelHandler