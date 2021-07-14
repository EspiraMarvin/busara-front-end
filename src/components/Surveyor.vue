<template>
  <q-card flat class="q-px-md">
    <FormWizard @on-complete="onComplete" ref="wizard" color="#e67e22">
      <p class="text-weight-bold" style="font-size: 18px" slot="title">Complete this Survey</p>
      <TabContent
        title="Personal details" icon="eva-person-outline" class="q-my-xl full-width">
          <q-form>
            <q-input
              filled
              type="text"
              v-model="formData.first_name"
              label="First Name"
              class="q-my-md"
              :rules="[ val => val && val.length > 0 || questions[0].error_message, hasWhiteSpacesOnly]"
            />
            <q-input
              filled
              type="text"
              v-model="formData.last_name"
              label="Last Name"
              class="q-my-md"
              :rules="[ val => val && val.length > 0 || questions[1].error_message, hasWhiteSpacesOnly]"
            />
            <q-input
              filled
              type="number"
              v-model="formData.contact"
              label="Phone Number (e.g. +25471234567)"
              class="q-my-md"
              :rules="[ val => val && val.length > 0 || 'Enter Phone number', phoneValid]"
            />
        </q-form>
      </TabContent>
      <TabContent title="Location Info" icon="ti-settings" class="q-my-xl">
        <q-form>
          <q-select
            filled
            v-model="formData.country"
            :options="countryOptions"
            label="Select country"
            class="q-my-md" />
          <q-select
            filled
            v-model="formData.county"
            :options="countyOptions"
            label="Select county"
            class="q-my-md" />
          <q-select
            filled
            v-model="formData.constituency"
            :options="constituencyOptions"
            label="Select constituency"
            class="q-my-md" />
          <q-select
            filled
            v-model="formData.ward"
            :options="wardOptions"
            label="Select ward"
            class="q-my-md" />
        </q-form>
      </TabContent>
      <TabContent title="Last step" icon="ti-check" class="q-my-xl">
        <q-form>
          <q-input
            filled
            type="text"
            v-model="formData.education"
            label="What is your highest level of education?"
            class="q-my-md"
            :rules="[ val => val && val.length > 0 || 'Enter highest level of education', hasWhiteSpacesOnly]"
          />
          <div class="q-gutter-sm">
            <p class="q-ml-sm">
             What is your gender?
              <br>
            </p>
            <q-radio v-model="formData.gender" val="male" label="Male" />
            <q-radio v-model="formData.gender" val="female" label="Female" />
          </div>
        </q-form>
      </TabContent>
      <template slot="footer" slot-scope="props">
        <div class=wizard-footer-left>
          <q-btn @click="isLastStep"  v-if="props.activeTabIndex > 0 && !props.isLastStep" :style="props.fillButtonStyle">Previous</q-btn>
        </div>
        <div class="wizard-footer-right">
          <q-btn size="md" :disable="isDisabled" v-if="!props.isLastStep" @click="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Next</q-btn>

          <q-btn v-else @click="submitForm" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">{{props.isLastStep ? 'Done' : 'Next'}}</q-btn>
        </div>

      </template>
    </FormWizard>
  </q-card>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import mixins from '../mixins/mixins'
const {phone} = require('phone')
export default {
name: "Surveyor",
  mixins: [ mixins ],
  components: {
    FormWizard,
    TabContent
  },
  props: {
    'questions': {
      type: Array,
      required: true
    },
    'currentUser': {
      required: true
    }
  },
    mounted() {
    this.removeMd()
  },
  data () {
  return {
    formData: {
      ans: [],
      survey_id: 1,
      user: this.currentUser.id,
      first_name: '',
      last_name: '',
      contact: '',
      country: '',
      county: '',
      constituency: '',
      ward: '',
      education: '',
      gender: '',
      local_id: 7,
      location: {
        'accuracy': 0,
        'lat': 0,
        'lon': 0
      }
    },
    countryOptions: ['Kenya'],
    countyOptions: ['Nairobi', 'Kisumu', 'Nakuru', 'Mombasa', 'Uasin Gishu','Kiambu', 'Meru', 'Vihiga'],
    constituencyOptions: ['Constituency 1', 'Constituency 2', 'Constituency 3', 'Constituency 4'],
    wardOptions: ['ward One', 'Ward Two', 'Ward Three', 'ward Four']
   }
  },
  computed: {
    getStartTime() {
      return this.$store.getters['question/startTime'];
    },
    genderDescription() {
        return this.questions[8].text.slice(28, 40) + ' ' +  this.questions[8].text.slice(63, 69) + ' ' + this.questions[8].text.slice(76, 77)
    },
    getHighestLevelofEducation() {
      return this.questions[7].text.slice(28, 68)
    },
    isDisabled () {
      return !this.formData.first_name.replace(/\s/g, '').length
        || !this.formData.last_name.replace(/\s/g, '').length
        || !this.formData.contact.replace(/\s/g, '').length
        || phone(this.formData.contact, {country: 'KE'}).isValid === false
    }
  },
  methods: {
    submitForm () {
      const today = new Date();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const finalFom = this.formData
      finalFom.start_time = this.getStartTime
      finalFom.end_time = time
      this.$store.dispatch('question/saveData', finalFom)
      this.$q.notify({
        position: 'bottom',
        color: 'blue-5',
        textColor: 'white',
        icon: 'check_circle',
        message: `Survey ended at ${time}`,
      })
    },
    onComplete () {

    },
    isLastStep() {
      if (this.$refs.wizard) {
        return this.$refs.wizard.isLastStep
      }
      return false
    },
    submitSurvey() {
      console.log()
    },
    removeMd() {
      let elems = document.querySelector(".md");
        if(elems !==null){
          elems.classList.remove("md");
        }
      }
  }
}
</script>

<style scoped>
.finish-button{
  background-color:#43A047 !important;
  border-color: #43A047 !important;
}
</style>
