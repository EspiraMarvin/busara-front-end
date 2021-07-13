import { http, baseURL, setAccessToken, setRefreshToken, storeUserDataToLocalStorage, getUserDataFromLocalStorage } from 'boot/axios'
import { appendForm} from "src/helpers/serviceConfigs";


const TOKEN ='real-token'
const USER = 'real-user'

const state = () => ({
  token: localStorage.getItem('AccessToken') || '',
  refreshToken: localStorage.getItem('AccessToken') || '',
  currentUser: JSON.parse(localStorage.getItem('UserData')) || [],
})

const getters = ({
  isAuthenticated: state => !!state.token,
  currentUser: state => state.currentUser,
  token: state => state.token,
  refreshToken: state => state.refreshToken
});

const mutations = {
  updateCredentials (state) {
    state.token = localStorage.getItem('AccessToken') || ''
    state.refreshToken = localStorage.getItem('RefreshToken')
  },
  updateUserDetails (state) {
    state.currentUser = JSON.parse(localStorage.getItem('UserData')) || [];
  }
}

const actions = {
  loginUser(context, payload) {
    setAccessToken(payload.access_token)
    setRefreshToken(payload.refresh_token)
    context.commit('updateCredentials', payload)
  },
  logOut(context) {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    context.commit('updateUserDetails');
  },
  getUser(context, payload) {
    console.log('user payload', payload)
      storeUserDataToLocalStorage(payload)
      context.commit('updateUserDetails', payload)
    }
}

export default  {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
