<template>
<div>
  <q-card class="q-pa-sm">
    <q-form @submit="submitSurvey">
      <q-input
        v-model="formData.fName"
        outlined
        class="q-mb-md"
        type="email"
        label="Email" />
    <q-tree
      :nodes="simple"
      node-key="label"
    />
    </q-form>
  </q-card>
    <q-btn
      class="float-right q-mt-md"
      color="primary"
      label="Next Page" />
</div>
</template>

<script>
export default {
name: "Surveyor",
  data () {
  return {
    formData: {
      fName: ''
    },
    simple: [
      {
        label: 'Satisfied customers (with avatar)',
        avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        children: [
          {
            label: 'Good food (with icon)',
            icon: 'restaurant_menu',
            children: [
              { label: 'Quality ingredients' },
              { label: 'Good recipe' }
            ]
          },
          {
            label: 'Good service (disabled node with icon)',
            icon: 'room_service',
            disabled: true,
            children: [
              { label: 'Prompt attention' },
              { label: 'Professional waiter' }
            ]
          },
          {
            label: 'Pleasant surroundings (with icon)',
            icon: 'photo',
            children: [
              {
                label: 'Happy atmosphere (with image)',
                img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png'
              },
              { label: 'Good table presentation' },
              { label: 'Pleasing decor' }
            ]
          }
        ]
      }
    ]
   }
  },
  methods: {
    submitSurvey() {
      console.log()
    }
  }
}
</script>

<style scoped>

</style>
