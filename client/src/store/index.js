
/**
 * @author Sascha Dobschal <s.dobschal@tdsoftware.de>
 * date 07/16/2018
 * Store and retrieve values from app global store object.
 * https://www.youtube.com/watch?v=2CSr2vBApSI
 */

import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({

    state,
    mutations,
    getters,
    actions,

    //  Make store to be persisted in the local storage :)
    //  On app start the last stored values are still available.
    //  A store mutation may overwrite the old entries then...
    plugins: [createPersistedState()]
});