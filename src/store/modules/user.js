const TOKEN ='real-token'
const USER = 'real-user'

const state = () => ({
  token: localStorage.getItem(TOKEN) || '',
  currentUser: JSON.parse(localStorage.getItem(USER)) || []
})

const getters = ({
  isAuthenticated: state => !!state.token,
  currentUser: state => state.currentUser,
  token: state => state.token
})

const mutations = {
  updateUser(state) {
    state.token = localStorage.getItem(TOKEN) || ''
    state.currentUser = JSON.parse(localStorage.getItem(USER)) || []
  }
}

const actions = {
  loginUser(context, payload) {
    console.log('user payload', payload)
    // localStorage.setItem(TOKEN, payload)
    // localStorage.setItem(USER, JSON.stringify(payload.user))
    // context.commit('updateUser')
  }
}

export default  {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
