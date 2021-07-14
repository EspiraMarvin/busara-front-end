<template>
  <q-form @submit="submitForm">
    <q-input
      v-model="formData.username"
      outlined
      class="q-mb-md"
      type="email"
      :rules="[required('Email Address'), emailFormat()]"
      label="Email" />
    <q-input
      v-model="formData.password"
      :type="isPwd ? 'password' : 'text'"
      outlined
      class="q-mb-md"
      label="Password"
      :rules="[required('Password')]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <div class="row">
      <q-space />
      <q-btn
        type="submit"
        color="primary"
        :label="tab" />
    </div>
  </q-form>
</template>

<script>
import { http } from "boot/axios";
import {appendForm, configs } from "src/helpers/serviceConfigs";
import validations from "src/helpers/validations";
import mixins from "src/mixins/mixins";
export default {
name: "Login",
  props:[ 'tab' ],
  mixins: [mixins],
  data () {
    return {
      formData: {
        username: 'espiramarvin@gmail.com',
        password: '123secret',
      },
      isPwd: true,
      ...validations,
      validateErrors: [],
    }
  },
  methods: {
    submitForm () {
      const finalForm = this.formData
      finalForm.grant_type = configs.grant_type
      finalForm.client_id = configs.my_client_id
      finalForm.client_secret = configs.my_client_secret
      http.post('https://fullstack-role.busara.io/api/v1/oauth/token/', appendForm(finalForm))
      .then((response) => {
        this.$store.dispatch('user/loginUser', response.data).then(() => {
          this.$router.push({ name: 'Home'})
          this.notify('Login Success', 'check_circle', 'blue-5')
          this.formData= {}
        })
      }).catch(error => {
        if (error.response && error.response.status === 422) {
          this.validateErrors = error.response.data.errors;
        } else {
          this.notify('An Error Occurred, try again', 'warning', 'red-5')
        }
      })
    }}
}
</script>

<style scoped>

</style>
