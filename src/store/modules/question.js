import {http} from "boot/axios";
import {appendForm} from "src/helpers/serviceConfigs";

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
  getQuestions(context){
    http.get('http://fullstack-role.busara.io/api/v1/questions')
      .then((response) => {
        console.log(typeof response.data.results)
        context.commit('updateQuestions', response.data.results)
      }).catch(err => err)

  },
  getForm(context) {
    http.get('http://fullstack-role.busara.io/api/v1/recruitment/forms/?node_type=Both')
      .then((response) => {
        context.commit('updateForm', response.data)
      }).catch(err => err)
  },
  saveData(context, form) {
    http.post('http://fullstack-role.busara.io/api/v1/recruitment/answers/submit', appendForm(form))
      .then((response) => console.log(response))
      .catch(err => console.log(error))
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
