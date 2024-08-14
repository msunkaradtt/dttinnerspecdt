import {hexToRGB} from "./modelFnc"

const Model = (props) => {
    const color_rgb = hexToRGB(props.modelColor).split(",")

    const segmentName = "segment_" + props.modelIndex

    props.modelMat.color.r = color_rgb[0]/255
    props.modelMat.color.g = color_rgb[1]/255
    props.modelMat.color.b = color_rgb[2]/255

    return(
    <mesh
    name={segmentName}
    castShadow
    receiveShadow
    geometry={props.modelGeo}
    material={props.modelMat}
    scale={props.modelScale}/>
    )
}

export default Model