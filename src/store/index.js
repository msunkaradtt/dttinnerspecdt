import { proxy } from 'valtio';

const state = proxy({
    load: false,
    closeCounter: 0,
    selectedInput: "",
    slectedInputContent: "",
    pecDataLoaded: false,
    pecDataJSON: "",
    maptilerkey: "vz9DhE2ANYaSbfzjJpye",
    activeTab: "Normal"
});

export default state;