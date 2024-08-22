import * as THREE from 'three'
import { useFrame, useThree } from "@react-three/fiber"

export const hexToRGB = hex => {
    let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0);
    if (h.length === 3) h = [...h].map(x => x + x).join('');
    else if (h.length === 8) alpha = true;
    h = parseInt(h, 16);

    return (
        (h >>> (alpha ? 24 : 16)) +
        ',' +
        ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
        ',' +
        ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0))
    )
}

export const addColorAttribute = (childGeo, lenPositions) => {
    const defaultColor = new Float32Array(lenPositions * 3)
    defaultColor.fill(1)

    childGeo.setAttribute('color', new THREE.Float32BufferAttribute(defaultColor, 3))
}

export const addPECSensorAttribute = (childGeo, lenPositions) => {
    const defaultSensorValues = new Float32Array(lenPositions)
    defaultSensorValues.fill(0)

    childGeo.setAttribute('PECsensor', new THREE.Float32BufferAttribute(defaultSensorValues, 1))
}

const pointAngle = (x, y, z) => {
    const radians = Math.atan2(y, x);
    const degrees = (radians * 180 / Math.PI + 360) % 360;

    return Math.round(degrees);
}

export const mapPECValues = (childGeoPositions) => {
    const mappedValues = []

    for(let i = 0; i < childGeoPositions.array.length; i += 3) {
        const point = {'x': 0.0, 'y': 0.0, 'z': 0.0}
        const pointValues = {'point': [], 'angle': 0}

        const chunk = childGeoPositions.array.slice(i, i + 3)

        point.x = chunk[0]
        point.y = chunk[1]
        point.z = chunk[2]

        let getpointAngle = pointAngle(point.x, point.y, point.z)

        pointValues.point = chunk
        pointValues.angle = getpointAngle

        mappedValues.push(pointValues)
    }

    return mappedValues
}

export const pecMapping = (childGeo, sensorValues, segmentData, lut) => {
    if(!childGeo || !sensorValues) return

    const colors = childGeo.attributes.color
    const PECsensorValues = childGeo.attributes.PECsensor

    for(let i = 0; i < sensorValues.length; i++) {
        const sensorValue = sensorValues[i].angle

        let setValue = 0
        if(sensorValue >= 0 && sensorValue < 320){
            setValue = segmentData['0']
        }

        if(sensorValue >= 320 && sensorValue < 330){
            setValue = segmentData['320']
        }

        if(sensorValue >= 330 && sensorValue < 340){
            setValue = segmentData['330']
        }

        if(sensorValue >= 340 && sensorValue < 350){
            setValue = segmentData['340']
        }

        if(sensorValue >= 350){
            setValue = segmentData['350']
        }

        if(sensorValue < 0){
            setValue = segmentData['0']
        }

        const color = lut.getColor(setValue)

        PECsensorValues.setX(i, setValue)

        if(color === undefined) {
            console.error("Unable to determine color for value:", sensorValue)
        } else {
            colors.setXYZ(i, color.r, color.g, color.b)
        }
    }
}

export const MouseTracker = (props) => {
    const { camera } = useThree()

    useFrame((state) => {
        const mouse = new THREE.Vector2(state.mouse.x, state.mouse.y)
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(mouse, camera)
        const point = new THREE.Vector3()
        raycaster.ray.at(10, point)
        props.setMousePosition(point)
    })

    return null
}