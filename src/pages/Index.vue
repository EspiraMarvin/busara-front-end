<template>
  <q-page class="q-px-lg q-py-xl">
    Welcome {{ currentUser.name.toUpperCase() }} to surveyor. Help us carry out the survey below.
    <br>
    Click &nbsp;
    <q-btn label="Here" color="primary" @click="openSurvey" />
    &nbsp; to open and start the survey
      <q-card class="q-mt-md">
        <Surveyor class="block" :questions="questions" />
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
  created() {
    this.$store.dispatch('user/getUser')
    this.$store.dispatch('question/getQuestions')
    this.$store.dispatch('question/getForm')
  },
  methods: {
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

