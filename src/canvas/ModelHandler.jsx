import React, { useMemo, useRef, useState, useEffect } from 'react'
import { useGLTF, PivotControls, Bvh } from "@react-three/drei"
import * as THREE from 'three'

import { Lut } from "three/examples/jsm/math/Lut"
import { folder, useControls } from "leva"

import Model from './Model'

import { pecDataFnc, lrutDataFnc } from './modelDataFnc'

import { mapPECValues,
    addColorAttribute,
    addPECSensorAttribute,
    divideModel, pecMappingOld, generateChildren, divideModelByZCuts, mapLRUTValues } from "./modelFnc"

import ToolTipCursor from "./ToolTipCursor"
import ToolTipMain from './ToolTipMain'
import { ModelModal } from "../components"

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"

const ModelHandler = (props) => {
    const model_ref = useRef()
    const snap = useSnapshot(state)

    const [active, setActive] = useState(false)
    const [showContextMenu, setShowContextMenu] = useState(false)
    const [childModels, setChildModels] = useState([])
    const [lRUTTag, setLRUTTag] = useState([])

    const [{map, cm_min, cm_max, showLabels, showLRUT}, set, get] = useControls("PEC", () => ({
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
            },
            showLRUT: {
                value: false,
                disabled: snap.pecDataLoaded ? false : true
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

    /*console.log(nodes)*/

    const modelMesh = useMemo(() => {
        return nodes.geometry_0
    }, [nodes])

    const modelGeo = useMemo(() => {
        return modelMesh.geometry
    }, [modelMesh])

    useEffect(() => {
        if(snap.lrutDataLoaded){
            const axialloc = parseInt(lrutDataFnc(snap.lrutDataJSON))
            let modelzero = childModels[0]
            let modelzerogeo = modelzero.props.modelGeo
            let modelzeropos = modelzerogeo.attributes.position
            let postoshow = mapLRUTValues(modelzeropos, axialloc)
            //console.log(postoshow.point)
            setLRUTTag(postoshow)
        }
    }, [snap.lrutDataLoaded, snap.lrutDataJSON])

    useEffect(() => {
        if(snap.pecDataLoaded){

            const {segmentData, max, min} = pecDataFnc(snap.pecDataJSON)
            set({cm_min: min, cm_max: max})

            //const totalSegments = Object.keys(segmentData).length

            var geo = modelGeo.clone()

            if (!geo.attributes.normal) {
                geo.computeVertexNormals()
            }

            const segmentDepths = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05]
            const groups = divideModelByZCuts(geo, segmentDepths)
            //const groups = divideModel(geo, totalSegments)

            const childGeo = generateChildren(groups)

            const generatedModels = childGeo.map((geometry, index) => (
                <Model key={index}
                segmentName={"segment_" + index}
                modelGeo={geometry}
                modelMat={modelMesh.material}
                modelScale={props.modelScale}
                modelColor={props.modelColor} />
            ))

            generatedModels.forEach((childModel) => {
                if(childModel.props.segmentName !== "segment_9"){
                    let childGeo = childModel.props.modelGeo
                    addColorAttribute(childGeo, childGeo.attributes.position.count)
                    addPECSensorAttribute(childGeo, childGeo.attributes.position.count)

                    let sensorValues = mapPECValues(childGeo.attributes.position)
                    pecMappingOld(childGeo, sensorValues, segmentData[childModel.props.segmentName], lut)
                }
            })

            setChildModels(generatedModels)
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
                    {childModels.length > 0 ? childModels :
                    <Model segmentName={"standard"} modelGeo={modelGeo} modelMat={modelMesh.material} modelScale={props.modelScale} modelColor={props.modelColor} />}
                </group>
            </Bvh>
            {showLabels ? <ToolTipCursor /> : null}
            {showLRUT ? <ToolTipMain pos={[0, 0, -1.1]} axloc={"1000mm"} ind={"ind-1"} ciclo={"315"} /> : null}
            {showLRUT ? <ToolTipMain pos={[0, 0, 0]} axloc={"2600mm"} ind={"ind-2"} ciclo={"0"} /> : null}
            {showLRUT ? <ToolTipMain pos={[0, 0, 0.9]} axloc={"2800mm"} ind={"ind-3"} ciclo={"45"} /> : null}
            {showContextMenu ? <ModelModal open={showContextMenu} handleOpen={() => setShowContextMenu(!showContextMenu)} modelName={"Culdetect_sample"} /> : null}
        </PivotControls>
        </>
    )
}

export default ModelHandler