import React, { useMemo, useRef, useState, useEffect } from 'react'
import { useGLTF, PivotControls, Bvh } from "@react-three/drei"

import { Lut } from "three/examples/jsm/math/Lut"
import { folder, useControls } from "leva"

import Model from './Model'

import { pecDataFnc } from './modelDataFnc'

import {mapPECValues, addColorAttribute, addPECSensorAttribute, mapPECSegments, pecMapping, applyPECData } from "./modelFnc"

import ToolTipCursor from "./ToolTipCursor"
import { ModelModal } from "../components"

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"
import { m } from 'framer-motion'

const ModelHandler = (props) => {
    const model_ref = useRef()
    const snap = useSnapshot(state)

    const [active, setActive] = useState(false)
    const [showContextMenu, setShowContextMenu] = useState(false)

    const [{map, cm_min, cm_max, showLabels}, set, get] = useControls("PEC", () => ({
        "ColorMap": folder({
            showColorMap: {
                value: false,
                onChange: (v) => {
                    model_ref.current.children[0].material.vertexColors = v
                    model_ref.current.children[0].material.needsUpdate = true
                },
                disabled: snap.pecDataLoaded ? false : true
            },
            showLabels: {
                value: false,
                disabled: snap.pecDataLoaded ? false : true
            },
            map: {
                value: "rainbow",
                options: ["rainbow", "cooltowarm", "blackbody", "grayscale"],
            },
            cm_min: {
                value: 5,
            },
            cm_max: {
                value: 11.5,
            },
            showMesh: {
                value: false,
                onChange: (v) => {
                    model_ref.current.children[0].material.wireframe = v
                }
            }
        }, {collapsed: true})
    }), {collapsed: true}, [snap.pecDataLoaded])

    const lut = useMemo(() => {
        const lut = new Lut()

        lut.setColorMap(map)
        lut.setMin(cm_min)
        lut.setMax(cm_max)

        return lut
    }, [map, cm_min, cm_max])

    const { nodes } = useGLTF(props.modelContent)

    const modelMesh = useMemo(() => {
        return nodes.Created_by_Gmsh
    }, [nodes])

    const modelGeo = useMemo(() => {
        return modelMesh.geometry
    }, [modelMesh])

    useEffect(() => {
        if(snap.pecDataLoaded){
            const {segmentData, max, min} = pecDataFnc(snap.pecDataJSON)
            set({cm_min: min, cm_max: max})

            addColorAttribute(modelGeo, modelGeo.attributes.position.count)
            addPECSensorAttribute(modelGeo, modelGeo.attributes.position.count)

            let segmentObj = mapPECSegments(modelGeo.attributes.position, Object.keys(segmentData).length)

            let sensorValues = mapPECValues(modelGeo.attributes.position)

            let {colorList, sensorValueList} = pecMapping(sensorValues, segmentData, segmentObj, lut)

            applyPECData(modelGeo, colorList, sensorValueList)
        }
    }, [snap.pecDataLoaded, snap.pecDataJSON, lut])

    return(
        <>
        <PivotControls rotation={[0, -Math.PI / 2, 0]}
        anchor={[0, 0, 0]}
        scale={75}
        depthTest={false}
        fixed
        annotations
        lineWidth={2}
        visible={active}>
            <Bvh firstHitOnly enabled={true}>
                <group {...props}
                ref={model_ref}
                dispose={null}
                onClick={() => setActive(!active)}
                onContextMenu={() => setShowContextMenu(!showContextMenu)}>
                    <Model modelGeo={modelGeo} modelMat={modelMesh.material} modelScale={props.modelScale} modelColor={props.modelColor} />
                </group>
            </Bvh>
            {showLabels ? <ToolTipCursor /> : null}
            {showContextMenu ? <ModelModal open={showContextMenu} handleOpen={() => setShowContextMenu(!showContextMenu)} modelName={"Pipe_1"} /> : null}
        </PivotControls>
        </>
    )
}

export default ModelHandler