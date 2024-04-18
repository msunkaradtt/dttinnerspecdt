import React, { Suspense } from 'react'
import { Canvas as GridMapCanvas } from "@react-three/fiber"
import { GizmoHelper, GizmoViewport } from "@react-three/drei"
import { Perf } from 'r3f-perf'
import { folder, useControls } from "leva"

import MapLibre from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import Map, {NavigationControl, ScaleControl} from "react-map-gl/maplibre"
import { Canvas } from "react-three-map/maplibre"

import Experience from './Experience'
import ShowBuilding from './map/showBuilding'

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"


const CanvasMain = () => {
    const snap = useSnapshot(state)

    const {showMap, showStats} = useControls({
        Stats: folder({
            showStats: false
        }, {collapsed: true}),
        Map: folder({
            showMap: false
        }, {collapsed: true})
    })

    return(
        <>
        {
            showMap ? <MapCanvas store={snap} showStats={showStats} /> : <GridCanvas store={snap} showStats={showStats} />
        }
        </>
    )
}

const GridCanvas = ({store, showStats}) => {
    return(
    <GridMapCanvas shadows raycaster={{ params: { Line: { threshold: 0.15 } } }} camera={{ position: [-5, 1, 6], fov: 25 }}>
        <Suspense fallback={null}>
            <Experience modelContent={store.slectedInputContent} />
        </Suspense>
        <gridHelper />
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
        {showStats ? <Perf position="bottom-left" /> : <></>}
    </GridMapCanvas>)
}

const MapCanvas = ({store, showStats}) => {

    const mapStyle = `https://api.maptiler.com/maps/basic-v2/style.json?key=${store.maptilerkey}`
    const SOURCE_URL = `https://api.maptiler.com/tiles/v3/tiles.json?key=${store.maptilerkey}`

    const modelOrigin = [148.9819, -35.39847]

    return(
        <Map
        mapLib={MapLibre}
        antialias
        initialViewState={{
            latitude: modelOrigin[1],
            longitude: modelOrigin[0],
            zoom: 18,
            pitch: 60
        }}
        mapStyle={mapStyle}>
            <ShowBuilding SOURCE_URL={SOURCE_URL} />
            <NavigationControl position='top-left' />
            <ScaleControl />
            <Canvas latitude={modelOrigin[1]} longitude={modelOrigin[0]}>
                <hemisphereLight args={["#ffffff", "#60666C"]} position={[1, 4.5, 3]} />
                <Suspense fallback={null}>
                    <mesh castShadow receiveShadow >
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshStandardMaterial attach="material" color="red" />
                    </mesh>
                </Suspense>
                {showStats ? <Perf position="bottom-left" /> : <></>}
            </Canvas>
        </Map>
    )
}

export default CanvasMain;