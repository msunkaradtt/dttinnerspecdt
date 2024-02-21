import { proxy } from 'valtio';

const state = proxy({
    load: false,
    selectedInput: "",
    slectedInputContent: "",
});

export default state;