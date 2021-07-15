<template>
  <q-card flat class="q-px-md">
    <FormWizard ref="wizard" color="#e67e22">
      <p class="text-weight-bold" style="font-size: 18px" slot="title">Complete this Survey</p>
      <TabContent
        title="Personal details" icon="eva-person-outline" class="q-my-xl full-width">
          <q-form>
            <q-input
              filled
              type="text"
              v-model="formData.ans[0].q_ans"
              label="First Name"
              class="q-my-md"
              :rules="[ val => val && val.length > 0 || questions[0].error_message, hasWhiteSpacesOnly]"
            />
            <q-input
              filled
              type="text"
              v-model="formData.ans[1].q_ans"
              label="Last Name"
              class="q-my-md"
              :rules="[ val => val && val.length > 0 || questions[1].error_message, hasWhiteSpacesOnly]"
            />
            <q-input
              filled
              type="number"
              v-model="formData.ans[2].q_ans"
              label="Phone Number (e.g. +25471234567)"
              class="q-my-md"
              :rules="[ val => val && val.length > 0 || questions[2].error_message , phoneValid]"
            />
        </q-form>
      </TabContent>
      <TabContent title="Location Info" icon="ti-settings" class="q-my-xl" :before-change="beforeTabSwitch">
        <q-form>
          <q-select
            filled
            v-model="formData.ans[3].q_ans"
            :options="countryOptions"
            label="Select country"
            class="q-my-md" />
          <q-select
            filled
            v-model="formData.ans[4].q_ans"
            :options="countyOptions"
            label="Select county"
            class="q-my-md" />
          <q-select
            filled
            v-model="formData.ans[5].q_ans"
            :options="constituencyOptions"
            label="Select constituency"
            class="q-my-md" />
          <q-select
            filled
            v-model="formData.ans[6].q_ans"
            :options="wardOptions"
            label="Select ward"
            class="q-my-md" />
        </q-form>
      </TabContent>
      <TabContent title="Additional Info" icon="ti-check" class="q-my-xl">
        <q-form>
          <q-input
            filled
            type="text"
            v-model="formData.ans[7].q_ans"
            :label="getHighestLevelofEducation"
            class="q-my-md"
            :rules="[ val => val && val.length > 0 || 'Enter highest level of education', hasWhiteSpacesOnly]"
          />
          <div class="q-gutter-sm">
            <p class="q-ml-sm">
             {{ genderDescription }}
              <br>
            </p>
            <q-radio v-model="formData.ans[8].q_ans" val="male" label="Male" />
            <q-radio v-model="formData.ans[8].q_ans" val="female" label="Female" />
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
import moment from 'moment';

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
      this.formData.start_time = this.getStartTime
      this.formData.survey_id = this.getFormId
  },
  data () {
  return {
    formData: {
      ans: [
        {
          "q_id": "1",
          "q_ans": "",
          "column_match": "first_name"
        },
        {
          "q_id": "2",
          "q_ans": "",
          "column_match": "last_name"
        },
        {
          "q_id": "3",
          "q_ans": "",
          "column_match": "contact"
        },
        {
          "q_id": "4",
          "q_ans": "",
          "column_match": "country"
        },
        {
          "q_id": "5",
          "q_ans": "",
          "column_match": "county"
        },
        {
          "q_id": "6",
          "q_ans": "",
          "column_match": "constituency"
        },
        {
          "q_id": "7",
          "q_ans": "",
          "column_match": "ward"
        },
        {
          "q_id": "8",
          "q_ans": "",
          "column_match": "education"
        },
        {
          "q_id": "9",
          "q_ans": "",
          "column_match": "gender"
        }
      ],
      survey_id: '',
      start_time: '',
      end_time: '',
      user: this.currentUser.id,
      local_id: 7,
      location: {
        'accuracy': 0,
        'lat': 0.0,
        'lon': 0.0
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
    getFormId() {
      const forms = this.$store.getters['question/form']
      let formId;
      for (const prop in forms){
        if (prop === 'forms') {
          formId = forms[prop][0].id
        }
      }
      return formId
    },
    isDisabled () {
      return !this.formData.ans[0].q_ans.replace(/\s/g, '').length
        || !this.formData.ans[1].q_ans.replace(/\s/g, '').length
        || !this.formData.ans[2].q_ans.replace(/\s/g, '').length
        || phone(this.formData.ans[2].q_ans, {country: 'KE'}).isValid === false
    },
    isDisabledFinal () {
      return !(!this.formData.ans[7].q_ans.replace(/\s/g, '').length
        || !this.formData.ans[8].q_ans.replace(/\s/g, '').length);
    }
  },
  methods: {
    beforeTabSwitch () {
      if(!this.formData.ans[3].q_ans.replace(/\s/g, '').length
        || !this.formData.ans[4].q_ans.replace(/\s/g, '').length
        || !this.formData.ans[5].q_ans.replace(/\s/g, '').length
        || !this.formData.ans[6].q_ans.replace(/\s/g, '').length
      ) {
        this.notify('Ensure to Select All Fields', 'warning', 'red-5')
        return false
      }
      return true
    },
    submitForm () {
      if (!this.formData.ans[7].q_ans.replace(/\s/g, '').length ||
        !this.formData.ans[8].q_ans.replace(/\s/g, '').length) {
        this.notify('All fields are required', 'warning','red-5')
        return
      }
      this.formData.end_time = moment().format('YYYY-MM-DD HH:mm Z')
      setTimeout(() => {
        this.$store.dispatch('question/saveData', this.formData)
        this.notify(`Survey ended at ${this.formData.end_time}`, 'check_circle', 'blue-5')
      }, 1000)
    },
    isLastStep() {
      if (this.$refs.wizard) {
        return this.$refs.wizard.isLastStep
      }
      return false
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
