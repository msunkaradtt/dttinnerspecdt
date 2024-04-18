import React from 'react'
import { folder, useControls } from "leva"

import {Source, Layer} from "react-map-gl/maplibre"


const ShowBuilding = ({SOURCE_URL}) => {
    const {showBuilding, opacityBuilding} = useControls({
        MapControls: folder({
            showBuilding: false,
            opacityBuilding: {
                value: 0.5,
                min: 0.0,
                max: 1.0,
                step: 0.1
            }
        }, {collapsed: true})
    })

    return(
        <>
            {showBuilding ? <Source id="openmaptiles" type="vector" url={SOURCE_URL}>
                <Layer id="3d-buildings"
                source="openmaptiles"
                source-layer="building"
                type="fill-extrusion"
                minzoom={15}
                paint={{
                    'fill-extrusion-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'render_height'], 0, 'lightgray', 200, 'royalblue', 400, 'lightblue'
                    ],
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        16,
                        ['get', 'render_height']
                    ],
                    'fill-extrusion-base': [
                        'case',
                        ['>=', ['get', 'zoom'], 16],
                        ['get', 'render_min_height'], 0],
                    'fill-extrusion-opacity': opacityBuilding}}
                />
            </Source> : <></>
            }
        </>
    )
}

export default ShowBuilding