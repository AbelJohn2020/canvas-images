import Vue from "vue";
import Vuex from "vuex";
import saintseiya from '../data/data.json';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: saintseiya,
        editImage: false,
        cutButton: false,
        saveButton: false,
        cropper: {},
        destination: {},
        image: {},
        nameButton: '',
    },
})