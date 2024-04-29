import { proxy } from 'valtio';

const state = proxy({
    load: false,
    selectedInput: "",
    slectedInputContent: "",
    maptilerkey: "vz9DhE2ANYaSbfzjJpye",
    activeTab: "Normal"
});

export default state;