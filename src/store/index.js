import { proxy } from 'valtio';

const state = proxy({
    load: true,
    selectedInput: ""
});

export default state;