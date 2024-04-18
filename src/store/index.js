import { proxy } from 'valtio';

const state = proxy({
    load: false,
    selectedInput: "",
    slectedInputContent: "",
    maptilerkey: "puyNhJT17nvD1p0EyJ5L"
});

export default state;