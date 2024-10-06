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

export const mapPECValues = (GeoPositions) => {
    const mappedValues = []

    for(let i = 0; i < GeoPositions.array.length; i += 3) {
        const point = {'x': 0.0, 'y': 0.0, 'z': 0.0}
        const pointValues = {'point': [], 'angle': 0}

        const chunk = GeoPositions.array.slice(i, i + 3)

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

export const mapPECSegments = (GeoPositions, segmentLen) => {

    let segValue = GeoPositions.count / segmentLen

    let segList = {}
    if(!Number.isInteger(segValue)) {
        segValue = Math.floor(segValue)
    }

    let segachValue = segValue * segmentLen
    let segTotal = GeoPositions.count
    let segEnd = segTotal - segachValue

    let count = 1

    while(count <= segmentLen) {
        let segKey = 'segment_' + (count - 1)
        segList[segKey] = segValue * count
        count++
    }

    if(segEnd > 0) {
        segList[Object.keys(segList).pop()] += segEnd
    }

    return segList
}
export const pecMapping = (sensorValues, segmentData, segmentObj, lut) => {


    let lastValue = 0

    const colorList = []
    const sensorValueList = []

    Object.entries(segmentObj).forEach(([key, value]) => {

        let segV = segmentData[key]

        let segSensorValues = sensorValues.slice(lastValue, value)

        for(let i = 0; i < segSensorValues.length; i++) {
            const sensorValue = segSensorValues[i].angle

            let setValue = 0
            if(sensorValue >= 0 && sensorValue < 320){
                setValue = segV['0']
            }

            if(sensorValue >= 320 && sensorValue < 330){
                setValue = segV['320']
            }

            if(sensorValue >= 330 && sensorValue < 340){
                setValue = segV['330']
            }

            if(sensorValue >= 340 && sensorValue < 350){
                setValue = segV['340']
            }

            if(sensorValue >= 350){
                setValue = segV['350']
            }

            if(sensorValue < 0){
                setValue = segV['0']
            }

            const color = lut.getColor(setValue)

            if(color === undefined) {
                console.error("Unable to determine color for value:", sensorValue)
            } else {
                colorList.push(color)
                sensorValueList.push(setValue)
            }
        }

        lastValue = value
    })

    return {colorList, sensorValueList}

}

export const applyPECData = (ModelGeo, colorList, sensorValueList) => {
    const colors = ModelGeo.attributes.color
    const PECsensorValues = ModelGeo.attributes.PECsensor

    for(let i = 0; i < colorList.length; i++) {
        colors.setXYZ(i, colorList[i].r, colorList[i].g, colorList[i].b)
        PECsensorValues.setX(i, sensorValueList[i])
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