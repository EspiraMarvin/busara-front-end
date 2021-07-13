<template>
  <div class="bg-red-3">
    <q-card dark>
      <FormWizard @on-complete="onComplete"
                 shape="tab"
                 color="#9b59b6">
      <TabContent title="Personal details"
                   icon="ti-user" :before-change="beforeTabSwitch">
        My first tab content
      </TabContent>
      <TabContent title="Additional Info"
                   icon="ti-settings">
        My second tab content
      </TabContent>
      <TabContent title="Last step"
                   icon="ti-check">
        Yuhuuu! This seems pretty damn simple
       </TabContent>
     </FormWizard>
    </q-card>
  </div>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
export default {
name: "Surveyor",
  components: {
    FormWizard,
    TabContent
  },
  props: {
    'questions': {
      type: Object,
      required: false
    }
  },
  data () {
  return {
    step: 1,
    formData: {
      username: '',
      fName: ''
    }
   }
  },
  methods: {
    onComplete: function(){
      alert('Yay. Done!');
    },
    beforeTabSwitch: function(){
      alert("This is called before switchind tabs")
      return true;
    },
    submitSurvey() {
      console.log()
    }
  }
}
</script>

<style scoped>

</style>
