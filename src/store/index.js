
import auth from "./modules/auth.module";

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'



import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = new createStore({
plugins: [
    createPersistedState()
],
state,
getters,
mutations,
actions,
modules: {
    auth
}
})

export default store;