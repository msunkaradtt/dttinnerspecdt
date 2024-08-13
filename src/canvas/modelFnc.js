import { Float32BufferAttribute } from "three"

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

    childGeo.setAttribute('color', new Float32BufferAttribute(defaultColor, 3))
}

const pointAngle = (x, y, z) => {
    const radians = Math.atan2(y, x);
    const degrees = (radians * 180 / Math.PI + 360) % 360;

    return Math.round(degrees);
}

export const pecMapping = (childGeo, segmentData) => {
    console.log(childGeo)
}