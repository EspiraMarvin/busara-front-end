import { http, baseURL, setAccessToken, setRefreshToken, storeUserDataToLocalStorage, getUserDataFromLocalStorage } from 'boot/axios'

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
    getUserDataFromLocalStorage(state)
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
    localStorage.removeItem('UserData')
    context.commit('updateUserDetails');
  },
  getUser(context) {
    console.log('get user runs before which component')
    http.get('http://fullstack-role.busara.io/api/v1/users/current-user')
      .then((response) => {
        storeUserDataToLocalStorage(response.data)
        context.commit('updateUserDetails', response.data)
      }).catch(error => error)
    }
}

export default  {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
