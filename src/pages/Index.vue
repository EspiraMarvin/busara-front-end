<template>
  <q-page class="q-px-lg q-py-xl">
    <q-btn label="Here" color="primary" @click="clickToGetUser" />
    Welcome to surveyor. Help us carry out the survey below.
    Click &nbsp;
    <q-btn label="Here" color="primary" @click="openSurvey" />
    &nbsp; to open and start the survey
      <q-card class="q-mt-md" v-if="disable">
        <Surveyor />
      </q-card>
<!--    <q-btn  @click="getCurrentUser" />-->
  </q-page>
</template>

<script>
import Surveyor from "components/Surveyor";
import {http} from "boot/axios";
// import { mapState, mapGetters } from 'vuex'
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
    user () {
      return this.$store.state['user/currentUser']
    },
    // user() {
    //   return this.$store.getters['user/getCurrentUser'];
    // }
  },
  mounted() {
    this.getCurrentUser()
  },
  methods: {
    getCurrentUser() {
      http.get('http://fullstack-role.busara.io/api/v1/users/current-user')
      .then((response) => {
        this.$store.dispatch('user/getUser', response.data)
      }).catch(error => error)
    },
    clickToGetUser () {
      this.user = this.userDetailss
    },
    openSurvey() {
      this.disable = !this.disable
    }
  }
}
</script>

