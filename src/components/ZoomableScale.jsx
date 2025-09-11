import React, { useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const ZoomableScale = (props) => {
    const [zoom, setZoom] = useState(100)
    const { camera, gl } = useThree()

    const onWheel = (e) => {
        const newZoom = Math.max(10, zoom + e.deltaY * -0.1) // Adjust zoom sensitivity
        setZoom(newZoom)
        camera.zoom = newZoom / 100 // Scale down for camera zoom
        camera.updateProjectionMatrix()
    };

    React.useEffect(() => {
        gl.domElement.addEventListener("wheel", onWheel)
        return () => gl.domElement.removeEventListener("wheel", onWheel)
    }, [gl, zoom])

    return (
        <>
            <Html center>
            <div
                style={{
                    padding: "10px",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "14px",
                }}
            >
                Zoom: {zoom.toFixed(1)} mm
            </div>
            </Html>
        </>
    )
}

export default ZoomableScale