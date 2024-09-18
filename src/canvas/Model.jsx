import {hexToRGB} from "./modelFnc"

import { useRef, useEffect, useState, useMemo } from 'react'
import { Helper } from "@react-three/drei"
import { MeshBVHHelper } from 'three-mesh-bvh'

import * as THREE from 'three'

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"



const Model = (props) => {
    const snap = useSnapshot(state)

    const color_rgb = hexToRGB(props.modelColor).split(",")

    const segmentName = "segment_" + props.modelIndex

    props.modelMat.color.r = color_rgb[0]/255
    props.modelMat.color.g = color_rgb[1]/255
    props.modelMat.color.b = color_rgb[2]/255

    const mesh_ref = useRef()
    const sphere_ref = useRef()

    const [vertices, setVertices] = useState([])

    useMemo(() => {
        const positions = props.modelGeo.attributes.position
        let vertices = []

        for(let i = 0; i < positions.count; i++){
            const vertex = new THREE.Vector3().fromBufferAttribute(positions, i)
            vertices.push(vertex)
        }

        setVertices(vertices)
    }, [props.modelGeo])

    const findNearestVertex = (point) => {
        const {x: x0, y: y0, z: z0} = point
        let minDistance = Infinity
        let nearestVertexIndex = -1
        let position = new THREE.Vector3()

        for(let i = 0; i < vertices.length; i++){
            const vertex = vertices[i]
            const {x: x1, y: y1, z: z1} = vertex
            const distance = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2) + Math.pow(z1 - z0, 2))

            if(distance < minDistance){
                minDistance = distance
                nearestVertexIndex = i
            }
        }

        try{
            position = new THREE.Vector3(
                vertices[nearestVertexIndex].x,
                vertices[nearestVertexIndex].y,
                vertices[nearestVertexIndex].z
            )
        } catch (err) {
            console.log(err)
        }

        return {
            position,
            index: nearestVertexIndex
        }
    }

    return(
        <>
        <mesh
        ref={mesh_ref}
        {...props}
        name={segmentName}
        castShadow
        receiveShadow
        geometry={props.modelGeo}
        material={props.modelMat}
        scale={props.modelScale}
        onPointerMove={(e) => {
        let mesh_pos_copy = mesh_ref.current.worldToLocal(e.point)
        state.labelPos = mesh_pos_copy
        sphere_ref.current.position.copy(mesh_pos_copy)
        if(mesh_ref.current.geometry.attributes.PECsensor !== undefined) {
            const pecSensorData = mesh_ref.current.geometry.attributes.PECsensor.array
            const {position, index} = findNearestVertex(e.point)
            state.labelValue = pecSensorData[index]
        }
        }}
        onPointerOver={() => {
            sphere_ref.current.visible = true
            state.labelVis = true
        }}
        onPointerOut={() => {
            sphere_ref.current.visible = false
            state.labelVis = false
        }}
        >
            <mesh raycast={() => null} ref={sphere_ref} visible={false}>
                <sphereGeometry args={[0.0020]} />
                <meshBasicMaterial color="red" toneMapped={false} />
            </mesh>
        </mesh>
        </>
    )
}

export default Model

/*
TODO:
<Helper type={MeshBVHHelper} args={[0, 0, false, false]} />
*/