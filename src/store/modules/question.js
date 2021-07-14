import {http} from "boot/axios";
import {appendForm} from "src/helpers/serviceConfigs";

const state = () => ({
  form: [],
  questions: [],
  startTime: ''
})

const getters = ({
  form: (state) => state.form,
  questions: (state) => state.questions,
  startTime: (state) => state.startTime
})

const mutations = {
  updateForm(state, payload){
    state.form = payload
  },
  updateQuestions(state, payload){
    state.questions = payload
  },
  updatedStartTime(state, payload) {
    state.startTime = payload
  }
}

const actions = {
  getQuestions(context){
    http.get('http://fullstack-role.busara.io/api/v1/questions')
      .then((response) => {
        console.log(typeof response.data)
        context.commit('updateQuestions', response.data)
      }).catch(err => err)

  },
  getForm(context) {
    http.get('http://fullstack-role.busara.io/api/v1/recruitment/forms/?node_type=Both')
      .then((response) => {
        context.commit('updateForm', response.data)
      }).catch(err => err)
  },
  saveData(context, form) {
    console.log('form', form)
    const ans = []
    http.post('http://fullstack-role.busara.io/api/v1/recruitment/answers/submit/', appendForm(form))
      .then((response) => console.log(response))
      .catch(err => console.log(err))
  },
  setStartTime(context, time) {
    context.commit('updatedStartTime',time)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
