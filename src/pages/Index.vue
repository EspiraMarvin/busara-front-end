<template>
  <q-page class="q-px-lg q-py-xl">
    Welcome <span class="text-uppercase">{{ currentUser.name }}</span>. <br>
    Help us carry out the survey below.
    Click &nbsp;
    <q-btn label="Here" color="primary" @click="openSurvey" :disable="this.$store.getters['question/startTime'] !== ''" />
    &nbsp; to open and start the survey.
      <q-card class="q-mt-md">
        <Surveyor class="block" :questions="questions" :currentUser="currentUser" v-if="disable"/>
      </q-card>
  </q-page>
</template>

<script>
import Surveyor from "components/Surveyor";
import moment from 'moment';
import mixins from "src/mixins/mixins";
export default {
  name: 'PageIndex',
  mixins: [mixins],
  components: { Surveyor },
  data () {
    return {
      disable: false,
      time: '',
      forms: []
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser'];
    },
    questions() {
      return this.$store.getters['question/questions']
    }
  },
  created() {
    this.$store.dispatch('user/getUser')
    this.$store.dispatch('question/getQuestions')
    this.$store.dispatch('question/getForm')
  },
  methods: {
    openSurvey() {
      this.disable = !this.disable
      let CurrentDate = moment().format('YYYY-MM-DD HH:mm Z');
      this.$store.dispatch('question/setStartTime', CurrentDate)
      this.notify(`You have started survey at ${CurrentDate}`, 'check_circle', 'blue-5')
    }
  },
  filters: {
    capitalize (val) {
      return val.toUpperCase()
    }
  }
}
</script>

