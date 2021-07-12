<template>
  <q-page class="q-px-lg q-py-xl">
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
// import axios from '../boot/axios'
import axios from "axios";
import Surveyor from "components/Surveyor";
export default {
  name: 'PageIndex',
  components: { Surveyor },
  data () {
    return {
      disable: false,
      currentUserData: [],
      configss: {
        baseURL: 'http://fullstack-role.busara.io/api/v1/users/current-user',
        client_id: 'zVs3J7FZupB3TLPskQOy1xHLwYTRkzUSf2rdTDCu',
        client_secret: 'Zv19oWmm416sTyjWT5Sx2r1gRwjWrXU3P5dWledQpYjxEvavS58SPtz03M8wvsgajaVLhcimmJIUUYUDad06V6HQosmPoj3TPRNjg7bgniQlooIwyFWfz8KfkM5Tdh7R'
      }
    }
  },
  mounted() {
    this.getUser()
    const conf =this.configss
    // this.getUser('http://fullstack-role.busara.io/api/v1/users/current-user')
  },
  methods: {
    openSurvey() {
      this.disable = !this.disable
    },
    getUser() {
      // axios.get(url).then((response) => {
      //   console.log('response data for user', response.data.data)
      // })
    }
  }
  // TREE -> PAGES -> SECTIONS -> QUESTIONS
  // mounted() {
  //   console.log('mounted')
  //   axios.post('http://fullstack-role.busara.io/api/v1/oauth/token/?client_id=zVs3J7FZupB3TLPskQOy1xHLwYTRkzUSf2rdTDCu&client_secret=Zv19oWmm416sTyjWT5Sx2r1gRwjWrXU3P5dWledQpYjxEvavS58SPtz03M8wvsgajaVLhcimmJIUUYUDad06V6HQosmPoj3TPRNjg7bgniQlooIwyFWfz8KfkM5Tdh7R&grant_type=password&username=espira&password=123secret')
  //   .then(({data}) => {
  //     console.log('data', data)
  //   }).catch(error =>  {
  //     console.log('error', error)
  //     console.log('error status code', error.statusCode)
  //     console.log('error message',error.message)
  //   })
  // }
}
</script>

