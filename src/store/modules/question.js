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
    http.get('http://fullstack-role.busara.io/api/v1/questions')
      .then((response) => {
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
    // console.log('save dara form', form)
    // const f = [
      // {"ans": form.ans},{"user": form.user},{"survey_id": form.survey_id},{"location": form.location},{local_id:form.local_id},{start_time:form.start_time},{end_time: form.end_time}
    // ]
    // const final = JSON.stringify(f)
    // console.log('final', f)
    http.post('http://fullstack-role.busara.io/api/v1/recruitment/answers/submit/', JSON.stringify(form))
      .then((response) => {
        console.log(response)
        Notify.create({
          message: 'Survey Completed Successfully',
          icon: 'check_circle',
          color: 'blue-5',
          position: 'bottom',
          textColor: 'white'
        })
      })
      .catch(err => {
        Notify.create({
          message: `${err.message}-> Server Error`,
          icon: 'warning',
          color: 'red-5',
          position: 'bottom',
          textColor: 'white'
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
