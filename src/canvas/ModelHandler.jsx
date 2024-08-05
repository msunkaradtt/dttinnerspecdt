import React, { useMemo, useRef, useState } from 'react'
import { useGLTF } from "@react-three/drei"
import { Float32BufferAttribute } from "three"

import { Lut } from "three/examples/jsm/math/Lut"
import { folder, useControls } from "leva"

import {ModelModal} from '../components'

import Box from './Box'
import Model from './Model'

const pointAngle = (x, y, z) => {

    const theta = Math.atan2(y, x) * (180 / Math.PI)
    const thetaDegrees = (theta + 360) % 360

    return Math.round(thetaDegrees)
}

const ModelHandler = (props) => {
    const model_ref = useRef()

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open)

    /*const {map, cm_min, cm_max} = useControls({
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
            cm_min: 5,
            cm_max: 11.5,
            showMesh: {
                value: false,
                onChange: (v) => {
                    model_ref.current.material.wireframe = v
                }
            }
        }, {collapsed: true})
    })

    const lut = useMemo(() => {
        const lut = new Lut()

        lut.setColorMap(map)
        lut.setMin(cm_min)
        lut.setMax(cm_max)

        return lut
    }, [map, cm_min, cm_max])*/

    const { nodes } = useGLTF(props.modelContent)

    //const loadedGeo = nodes.world.children[0].geometry
    //const loadedMat = nodes.world.children[0].material

    //console.log(loadedGeo.attributes.position)

    /*const sensorValues = []

    for(let i = 0; i < loadedGeo.attributes.position.array.length; i += 3){
        const point = {'x': 0.0, 'y': 0.0, 'z': 0.0}
        const pointValues = {'point': [], 'angle': 0}

        const chunk = loadedGeo.attributes.position.array.slice(i, i + 3)
        point.x = chunk[0]
        point.y = chunk[1]
        point.z = chunk[2]

        let getpointangle = pointAngle(point.x, point.y, point.z)

        pointValues.point = chunk
        pointValues.angle = getpointangle

        sensorValues.push(pointValues)
    }

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

        for (let i = 0; i < sensorValues.length; i++) {
            const sensorValue = sensorValues[i].angle

            let setValue = 11
            if(sensorValue === 340){
                setValue = 10.65
            }

            const color = lut.getColor(setValue)

            if (color === undefined) {
                console.log("Unable to determine color for value:", sensorValue)
            } else {
                colors.setXYZ(i, color.r, color.g, color.b)
            }
        }

        return loadedGeo
    }, [loadedGeo, lut])

    const color_rgb = hexToRGB(props.color).split(",")

    loadedMat.color.r = color_rgb[0]/255
    loadedMat.color.g = color_rgb[1]/255
    loadedMat.color.b = color_rgb[2]/255*/

    const childComponents = nodes.world.children.map((child, index) => (
        <Model key={index}
        modelGeo={child.geometry}
        modelMat={child.material}
        modelScale={props.modelScale} modelColor={props.modelColor} />
    ))

    return(
        <group {...props} dispose={null}>
            {childComponents}
        </group>
    )

}

export default ModelHandler