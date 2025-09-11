import React from 'react'
import { OrbitControls, Environment, Sky } from "@react-three/drei"

import { folder, useControls } from "leva"

import ModelHandler from './ModelHandler'
import Box from './Box'

import {AIModal} from "../components"

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"

const Experience = ({modelContent}) => {
    const snap = useSnapshot(state)

    const { gScale, gColor } = useControls("Object",{
        "Transform": folder({
            gScale: {
                value: 1,
                step: 0.1,
                min:0.5
            }
        }, {collapsed: true}),
        "Material": folder({
            gColor: "#898989"
        }, {collapsed: true})
    }, {collapsed: true})

    return(
        <>
            <ambientLight intensity={1} />
            <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25}  />
            <Environment preset='warehouse' background blur={0.5} />
            {modelContent !== "" ?
            (
                <ModelHandler
                modelContent={modelContent}
                modelScale={gScale}
                modelColor={gColor} />
            ) :
            (
                <Box modelScale={gScale} modelColor={gColor} />
            )}
            {snap.showAIModal && <AIModal />}
            <OrbitControls makeDefault rotateSpeed={2} minPolarAngle={0} maxPolarAngle={Math.PI / 1.5} />
        </>
    )
}

export default Experience