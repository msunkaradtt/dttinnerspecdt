import React, { useMemo, useRef, useState, useEffect } from 'react'
import { useGLTF, PivotControls } from "@react-three/drei"

import { Lut } from "three/examples/jsm/math/Lut"
import { folder, useControls } from "leva"

import Model from './Model'

import { pecDataFnc } from './modelDataFnc'

import { pecMapping, mapPECValues, addColorAttribute } from "./modelFnc"

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"

const ModelHandler = (props) => {
    const model_ref = useRef()
    const snap = useSnapshot(state)

    const [active, setActive] = useState(false)

    const [{map, cm_min, cm_max}, set] = useControls("PEC", () => ({
        "ColorMap": folder({
            showColorMap: {
                value: false,
                onChange: (v) => {
                    model_ref.current.children[0].material.vertexColors = v
                    model_ref.current.children[0].material.needsUpdate = true
                }
            },
            map: {
                value: "rainbow",
                options: ["rainbow", "cooltowarm", "blackbody", "grayscale"]
            },
            cm_min: 5,
            cm_max: 11.5,
            showMes: {
                value: false,
                onChange: (v) => {
                    model_ref.current.children[0].material.wireframe = v
                }
            }
        }, {collapsed: true})
    }), {collapsed: true})

    const lut = useMemo(() => {
        const lut = new Lut()

        lut.setColorMap(map)
        lut.setMin(cm_min)
        lut.setMax(cm_max)

        return lut
    }, [map, cm_min, cm_max])

    const { nodes } = useGLTF(props.modelContent)

    useEffect(() => {
        /*
         * Process the recieved PEC data
        */
        if(snap.pecDataLoaded){
            const {segmentData, max, min} = pecDataFnc(snap.pecDataJSON)
            set({cm_min: min, cm_max: max})

            delete segmentData['segment_8'] // Please remove it later

            const childrenMesh = model_ref.current.children

            childrenMesh.map((childMesh) => {
                let childGeo = childMesh.geometry

                addColorAttribute(childGeo, childGeo.attributes.position.count)

                let sensorValues = mapPECValues(childGeo.attributes.position)

                pecMapping(childGeo, sensorValues, segmentData[childMesh.name], lut)
            })
        }
    }, [snap.pecDataLoaded, snap.pecDataJSON, lut])

    const childComponents = nodes.world.children.map((child, index) => (
        <Model key={index}
        modelIndex={index}
        modelGeo={child.geometry}
        modelMat={child.material}
        modelScale={props.modelScale} modelColor={props.modelColor} />
    ))

    return(
        <PivotControls rotation={[0, -Math.PI / 2, 0]}
        anchor={[0, 0, 0]}
        scale={75}
        depthTest={false}
        fixed
        annotations
        lineWidth={2}
        visible={active}>
            <group {...props}
            ref={model_ref}
            dispose={null}
            onClick={() => setActive(!active)}>
                {childComponents}
            </group>
        </PivotControls>
    )

}

export default ModelHandler