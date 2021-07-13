<template>
  <q-page class="q-px-lg q-py-xl">
    Welcome {{ currentUser.name | capitalize }} to surveyor. Help us carry out the survey below.
    <br>
    Click &nbsp;
    <q-btn label="Here" color="primary" @click="openSurvey" />
    &nbsp; to open and start the survey
      <q-card class="q-mt-md" v-if="disable">
        <Surveyor :questions="questions" />
      </q-card>
  </q-page>
</template>

<script>
import Surveyor from "components/Surveyor";
import {http} from "boot/axios";
export default {
  name: 'PageIndex',
  components: { Surveyor },
  data () {
    return {
      disable: false,
      userDetailss: []
    }
  },
  computed: {
    // ...mapGetters('user', ['currentUser']),
    currentUser() {
      return this.$store.getters['user/currentUser'];
    },
    questions() {
      return this.$store.getters['question/questions']
    }
  },
  mounted() {
    this.getCurrentUser()
    this.getSurveyForm()
    this.getSurveyQuestions()
  },
  methods: {
    getCurrentUser() {
      http.get('http://fullstack-role.busara.io/api/v1/users/current-user')
      .then((response) => {
        this.$store.dispatch('user/getUser', response.data)
      }).catch(error => error)
    },
    getSurveyQuestions () {
      http.get('http://fullstack-role.busara.io/api/v1/questions')
      .then((response) => {
        this.$store.dispatch('question/getQuestions', response.data)
      }).catch(err => err)
    },
    getSurveyForm () {
      http.get('http://fullstack-role.busara.io/api/v1/recruitment/forms/?node_type=Both')
      .then((response) => {
        this.$store.dispatch('question/getForm', response.data)
      }).catch(err => err)
    },
    openSurvey() {
      this.disable = !this.disable
    }
  },
  filters: {
    capitalize (val) {
      return val.toUpperCase()
    }
  }
}
</script>

