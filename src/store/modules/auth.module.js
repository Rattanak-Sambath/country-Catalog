import axios from 'axios'
import { intersection } from 'lodash'
// import constants from '../../constants'see
import api from '../../utils/utility'
import Toast from '../../Helper/Toast'
import router from '../../router/index'

const state = {
  authenticated: false,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    name: null,
    email: null,
    admin: null,
    location: null,
  },
  accessToken: null,
}

const getters = {
  authenticated(state) {
    return state.authenticated
  },
  user(state) {
    return state.user
  },
  accessToken(state) {
    return state.accessToken
  },
  userIsInRoles: (state) => (roles) => {
    const user = state.user
    if (!user || !roles?.length) return false
    if (user.name === 'admin') return true

    if (intersection(user.role, roles).length) return true
    return false
  },
}

const mutations = {
  SET_AUTH_USER(state, value) {
    state.user = value
    // console.log(state.user);
  },
  SET_AUTH_TOKEN(state, payload) {
    state.accessToken = payload.token
    // state.refreshToken = token.refresh_token
  },
  SET_AUTHENTICATED(state, value) {
    state.authenticated = value
  },
  REMOVE_AUTH_TOKEN(state) {
    state.accessToken = null
    console.log('remove token')
  },
  REMOVE_AUTH_USER(state) {
    state.user = {}
    console.log('remove user')
  },
}

const actions = {
  login({ commit }, credential) {
    // console.log(credential);
    return new Promise((resolve, reject) => {
      api
        .post('http://localhost:5001/api/auth/login', credential)
        .then((response) => {
          commit('SET_AUTHENTICATED', true)
          commit('SET_AUTH_TOKEN', response.data)
          commit('SET_AUTH_USER', response.data.user)
          resolve(response)

          router.push({ name: 'home' })
          // Toast.fire({
          //   icon:'success',
          //   title:"Logout successfully"
          // })
        })
        .catch((response) => {
          reject(response)
        })
    })
  },

  getCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .get('/auth/getCurrentUser')
        .then((response) => {
          console.log(response)
          commit('SET_AUTH_USER', response.data.user)
          // console.log('response', response);
          resolve(response)
        })
        .catch(() => {
          reject()
        })
    })
  },
  // getCurrentUser({ commit, dispatch }) {
  //   return new Promise((resolve, reject) => {
  //     api
  //       .get("/auth/getCurrentUser")
  //       .then((response) => {
  //         //   console.log(response.data, "profile");
  //         commit("SET_AUTH_USER", response.data);
  //         resolve();
  //       })
  //       .catch(() => {
  //         reject();
  //       });
  //   });
  // },

  logout({ commit }) {
    commit('SET_AUTHENTICATED', false)
    commit('REMOVE_AUTH_TOKEN')
    commit('REMOVE_AUTH_USER')
    router.push({ name: 'login' })
    // router.replace({ name: 'login' })
  },
  unauthorized({ commit }, state) {
    return new Promise((resolve, reject) => {
      commit('SET_AUTHENTICATED', false)
      commit('REMOVE_AUTH_TOKEN')
      router.push({ name: 'login' })
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
