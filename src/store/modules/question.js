const state = () => ({
  form: [],
  questions: []
})

const getters = ({
  form: (state) => state.form,
  questions: (state) => state.questions
})

const mutations = {
  updateForm(state, payload){
    state.form = payload
  },
  updateQuestions(state, payload){
    state.questions = payload
  }
}

const actions = {
  getQuestions(context, payload){
    context.commit('updateQuestions', payload)

  },
  getForm(context, payload) {
    console.log('questoin pal', payload)
    context.commit('updateForm', payload)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
