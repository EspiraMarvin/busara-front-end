<template>
  <q-form @submit="submitForm">
    <q-input
      v-model="formData.email"
      outlined
      class="q-mb-md"
      type="email"
      label="Email" />
    <q-input
      v-model="formData.password"
      :type="isPwd ? 'password' : 'text'"
      outlined
      class="q-mb-md"
      label="Password"
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
import { mapActions } from 'vuex'
export default {
name: "Login",
  props:[ 'tab' ],
  data () {
    return {
      formData: {
        email: 'espiramarvin@gmail.com',
        password: '123secret'
      },
      isPwd: true
    }
  },
  methods: {
  ...mapActions('user',['loginUser']),
    submitForm () {
      console.log('form data', this.formData)
      this.loginUser(this.formData)
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>

</style>
