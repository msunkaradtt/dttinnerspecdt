import React, { useEffect } from "react"
import { useProgress } from "@react-three/drei"
import { Spinner, Typography } from "@material-tailwind/react";

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"

const Loading = () => {

    const snap = useSnapshot(state)

    const { progress, total, loaded, item } = useProgress()

    useEffect(() => {
        if(progress === 100){

            setTimeout(() => {
                state.load = true
            }, 1000)
        }

    }, [progress, total, loaded, item])

    return(
        <div className={`fixed top-0 w-full h-full z-50 pointer-events-none flex justify-center items-center bg-indigo-50 ${snap.load ? "opacity-0" : "opacity-100"}`}>
            <div className="grid gap-2">
                <div className="flex items-center justify-center ">
                    <Spinner color="blue-gray" className="h-12 w-12" />
                </div>
                <div className="flex items-center justify-center ">
                    <Typography variant="h5" color="blue-gray">Loading...</Typography>
                </div>
            </div>
        </div>
    )
}

export default Loading