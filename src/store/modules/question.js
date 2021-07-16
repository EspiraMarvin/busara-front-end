import {http} from "boot/axios";
import {appendForm} from "src/helpers/serviceConfigs";
import {Notify} from "quasar";

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
    http.get('https://fullstack-role.busara.io/api/v1/questions')
      .then((response) => {
        context.commit('updateQuestions', response.data.results)
      }).catch(err => err)

  },
  getForm(context) {
    http.get('https://fullstack-role.busara.io/api/v1/recruitment/forms/?node_type=Both')
      .then((response) => {
        context.commit('updateForm', response.data)
      }).catch(err => err)
  },
  saveData(context, form) {
    let arr = []
    arr.push(form)
    http.post('https://fullstack-role.busara.io/api/v1/recruitment/answers/submit/', JSON.stringify(arr))
      .then((response) => {
        Notify.create({
          message: 'Success',
          position: 'bottom',
          icon: 'check_circle',
          color: 'blue-5'
        })
        console.log(response)
      })
      .catch(err => {
        console.log(err)
        Notify.create({
          message: `${err}` ,
          position: 'bottom',
          icon: 'warning',
          color: 'red-5'
        })
      })
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
