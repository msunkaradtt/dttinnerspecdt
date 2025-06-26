import { proxy } from 'valtio'
import * as THREE from 'three'

const state = proxy({
    load: false,
    closeCounter: 0,
    selectedInput: "",
    slectedInputContent: "",
    pecDataLoaded: false,
    pecDataJSON: "",
    lrutDataLoaded: false,
    lrutDataJSON: "",
    maptilerkey: "vz9DhE2ANYaSbfzjJpye",
    activeTab: "Normal",
    labelValue: 0.0,
    labelPos: new THREE.Vector3(),
    labelVis: false,
    conversion_srv_res: {},
    isChecking: false,
    showAIModal: false,
    isLocal: true /** Remove later */
});

export default state;