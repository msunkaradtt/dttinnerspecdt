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

export const divideModel = (fullModelGeo, segments) => {
    const positions = fullModelGeo.attributes.position.array
    const normals = fullModelGeo.attributes.normal.array

    const indices = fullModelGeo.index.array

    let minZ = Infinity
    let maxZ = -Infinity

    for (let i = 0; i < positions.length; i += 3) {
        const z = positions[i + 2]
        minZ = Math.min(minZ, z)
        maxZ = Math.max(maxZ, z)
    }

    console.log(minZ)
    console.log(maxZ)

    const zRange = maxZ - minZ
    console.log(zRange)
    const segmentDepth = zRange / segments
    console.log(segmentDepth)

    const groups = Array.from({ length: segments }, () => ({
        positions: [],
        normals: [],
        indices: [],
    }))

    const vertexMaps = groups.map(() => new Map())

    for (let i = 0; i < indices.length; i += 3) {
        const idx = [indices[i], indices[i + 1], indices[i + 2]]
        const zValues = idx.map((vertexIndex) => positions[vertexIndex * 3 + 2])

        // Instead of requiring they all match, pick a segment based on average z.
        const avgZ = (zValues[0] + zValues[1] + zValues[2]) / 3
        let groupIndex = Math.floor((avgZ - minZ) / segmentDepth)
        // Clamp to [0, segments - 1]
        groupIndex = Math.max(0, Math.min(groupIndex, segments - 1))

        const group = groups[groupIndex];
        const vertexMap = vertexMaps[groupIndex]

        const newIndices = idx.map((vertexIndex) => {
            if (!vertexMap.has(vertexIndex)) {
                const position = positions.slice(vertexIndex * 3, vertexIndex * 3 + 3);
                group.positions.push(...position)

                const normal = normals.slice(vertexIndex * 3, vertexIndex * 3 + 3)
                group.normals.push(...normal)

                const newIndex = group.positions.length / 3 - 1;
                vertexMap.set(vertexIndex, newIndex)
                return newIndex
            }
            else {
                return vertexMap.get(vertexIndex)
            }
        })

        group.indices.push(...newIndices)
    }

    return groups
}

export function divideModelByZCuts(fullModelGeo, segmentDepths) {
    const positions = fullModelGeo.attributes.position.array;
    const normals   = fullModelGeo.attributes.normal.array;
    const indices   = fullModelGeo.index.array;

    let minZ = Infinity;
    let maxZ = -Infinity;

    for (let i = 0; i < positions.length; i += 3) {
        const z = positions[i + 2];
        if (z < minZ) minZ = z;
        if (z > maxZ) maxZ = z;
    }

    const zRange = maxZ - minZ

    let depthsArray = Array.isArray(segmentDepths) ? [...segmentDepths] : [];

    if (!Array.isArray(segmentDepths)) {
        const singleDepth = segmentDepths;
        if (singleDepth <= 0) {
            throw new Error("Segment depth must be > 0.");
        }

        let sum = 0;
        while (sum + singleDepth < zRange) {
            depthsArray.push(singleDepth);
            sum += singleDepth;
        }

        // leftover if there's any
        if (sum < zRange) {
            depthsArray.push(zRange - sum);
        }
    }
    else {
        const sumOfDepths = depthsArray.reduce((acc, d) => acc + d, 0);

        if (sumOfDepths < zRange) {
            depthsArray.push(zRange - sumOfDepths);
        }

        else if (sumOfDepths > zRange) {
            // Example: clamp the last segment so total = zRange
            let running = 0;
            for (let i = 0; i < depthsArray.length; i++) {
                if (running + depthsArray[i] > zRange) {
                    // clamp
                    depthsArray[i] = zRange - running;
                    // discard subsequent segments
                    depthsArray = depthsArray.slice(0, i + 1);
                    break;
                } else {
                    running += depthsArray[i];
                }
            }
        }
    }

    const segmentCount = depthsArray.length;

    const segmentRanges = [];
    {
        let currentZ = minZ;
        for (let i = 0; i < segmentCount; i++) {
            const startZ = currentZ;
            const endZ   = currentZ + depthsArray[i];
            segmentRanges.push([startZ, endZ]);
            currentZ = endZ;
        }
    }

    const groups = Array.from({ length: segmentCount }, () => ({
        positions: [],
        normals: [],
        indices: [],
    }));

    const vertexMaps = groups.map(() => new Map());

    for (let i = 0; i < indices.length; i += 3) {
        const i0 = indices[i + 0];
        const i1 = indices[i + 1];
        const i2 = indices[i + 2];

        const z0 = positions[i0 * 3 + 2];
        const z1 = positions[i1 * 3 + 2];
        const z2 = positions[i2 * 3 + 2];

        const avgZ = (z0 + z1 + z2) / 3;

        let groupIndex = 0; // default
        for (let s = 0; s < segmentRanges.length; s++) {
            const [rangeStart, rangeEnd] = segmentRanges[s];
            if (avgZ >= rangeStart && avgZ <= rangeEnd) {
                groupIndex = s;
                break;
            }
        }

        const group = groups[groupIndex];
        const vertexMap = vertexMaps[groupIndex];

        const newIndices = [i0, i1, i2].map((origVIdx) => {
            if (!vertexMap.has(origVIdx)) {
                // push position
                const px = positions[origVIdx * 3 + 0];
                const py = positions[origVIdx * 3 + 1];
                const pz = positions[origVIdx * 3 + 2];
                group.positions.push(px, py, pz);

                // push normal
                const nx = normals[origVIdx * 3 + 0];
                const ny = normals[origVIdx * 3 + 1];
                const nz = normals[origVIdx * 3 + 2];
                group.normals.push(nx, ny, nz);

                // the new index in this group's arrays
                const newIndex = (group.positions.length / 3) - 1;
                vertexMap.set(origVIdx, newIndex);
                return newIndex;
            } else {
                // already mapped
                return vertexMap.get(origVIdx);
            }
        });

        // Push the indices for this triangle
        group.indices.push(...newIndices);
    }

    return groups;
}

export const generateChildren = (groups) => {
    const childGeo = groups.map((group) => {
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(group.positions, 3))
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(group.normals, 3))
        geometry.setIndex(group.indices)
        return geometry
    })

    return childGeo
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

export const mapLRUTValues = (lrutPositions, lookAxial) => {
    const point = {'x': 0.0, 'y': 0.0, 'z': 0.0}
    const pointValues = {'point': [], 'angle': 0}

    for(let i = 0; i < lrutPositions.array.length; i += 3) {

        const chunk = lrutPositions.array.slice(i, i + 3)

        point.x = chunk[0]
        point.y = chunk[1]
        point.z = chunk[2]

        let getpointAngle = pointAngle(point.x, point.y, point.z)

        if(getpointAngle === lookAxial){
            pointValues.point = chunk
            pointValues.angle = getpointAngle
            break
        }
    }

    return pointValues
}

export const pecMappingOld = (childGeo, sensorValues, segmentData, lut) => {
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