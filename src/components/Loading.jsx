import React from "react"
import { useProgress } from "@react-three/drei"
import { Spinner, Typography } from "@material-tailwind/react";

const Loading = ({ started, onStarted }) => {
    const { progress } = useProgress()

    return(
        <div className="flex justify-center items-center w-full h-full">
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