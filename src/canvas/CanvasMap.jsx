import React, { Suspense } from 'react'

import MapLibre from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import Map, {NavigationControl, ScaleControl} from "react-map-gl/maplibre"
import { Canvas } from "react-three-map/maplibre"

import ShowBuilding from './map/showBuilding'

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"


const CanvasMap = () => {
    const snap = useSnapshot(state)

    const mapStyle = `https://api.maptiler.com/maps/basic-v2/style.json?key=${snap.maptilerkey}`
    const SOURCE_URL = `https://api.maptiler.com/tiles/v3/tiles.json?key=${snap.maptilerkey}`

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
            </Canvas>
        </Map>
    )
}

export default CanvasMap;