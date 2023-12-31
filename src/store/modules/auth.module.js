import axios from 'axios'
import { intersection } from 'lodash'
// import constants from '../../constants'see
import api from '../../utils/utility'
import Toast from '../../Helper/Toast'
import router from '../../router/index'

const state = {
  authenticated: false,
  staffId: null,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    name: null,
    email: null,
    admin: null,
    location: null,
    roles: null,
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
  branchId(state) {
    return state.branchId
  },
  userEmail(state) {
    return state.userEmail
  },
  accessToken(state) {
    return state.accessToken
  },
  userIsInRoles: (state) => (roles) => {
    const user = state.user
    // console.log('user', user.roles)
    if (!user || !roles?.length) return false
    if (user.username === 'admin') return true

    if (intersection(user.roles, roles).length) return true
    return false
  },
  staffId(state){
    return state.staffId;
  }
}
const mutations = {
  SET_AUTH_USER(state, value) {
    state.user = value
    // console.log('status', state)
  },
  SET_AUTH_EMAIL(state, value) {
    state.userEmail = value
    // console.log('set email', value)
  },
  SET_AUTH_TOKEN(state, payload) {
    state.accessToken = payload.token
    // state.refreshToken = token.refresh_token
  },
  SET_BRANCH_ID(state, value) {
    // console.log('state', value)
    state.branchId = value
  },
  SET_AUTHENTICATED(state, value) {
    state.authenticated = value
  },
  SET_STAFFID(state, value){
    // console.log('value', value);
    state.staffId = value
  },
  REMOVE_AUTH_TOKEN(state) {
    state.accessToken = null
    // console.log('remove token')
  },
  REMOVE_STAFFID(state) {
    state.staffId = null
    // console.log('remove token')
  },
  REMOVE_AUTH_USER(state) {
    state.user = {}
    // console.log('remove user')
  },
  REMOVE_BRANCH_ID(state) {
    state.branchId = {}
    // console.log('remove branch')
  }, 
  REMOVE_AUTH_EMAIL(state) {
    console.log('rmove email', state.userEmail);
    state.userEmail = {}
    // console.log('remove branch')
  },
}

const actions = {
  login({ commit }, credential) {
    // console.log(credential);
    return new Promise((resolve, reject) => {
      api
        .post('http://localhost:5001/api/auth/login', credential)
        .then((response) => {
          // console.log('respone', response)
          commit('SET_AUTHENTICATED', true)
          commit('SET_AUTH_EMAIL', response.data.user.email)
          commit('SET_AUTH_TOKEN', response.data)
          commit('SET_AUTH_USER', response.data.user)
          commit('SET_STAFFID', response.data.user.staffId)
          commit('SET_BRANCH_ID', response.data.user.allowedBranch)
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
    commit('REMOVE_BRANCH_ID')
    commit('REMOVE_AUTH_EMAIL')
    commit('REMOVE_STAFFID')
    router.push({ name: 'login' })
    // router.replace({ name: 'login' })
  },
  unauthorized({ commit }, state) {
    return new Promise((resolve, reject) => {
      commit('SET_AUTHENTICATED', false)
      commit('REMOVE_AUTH_TOKEN')
      commit('REMOVE_BRANCH_ID')
      commit('REMOVE_AUTH_EMAIL')
      commit('REMOVE_STAFFID')
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
