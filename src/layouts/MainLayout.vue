<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="q-ml-md">
          Surveyor App
        </q-toolbar-title>
        <q-btn label="Logout" @click="logout" />
<!--        <q-btn-dropdown stretch flat>-->
<!--          <template #label>-->
<!--&lt;!&ndash;            <p class="tw-px-2 tw-capitalize tw-hidden lg:tw-block">{{ user.name }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;            <q-avatar color="white" text-color="primary">{{ user.name | abbreviate}}</q-avatar>&ndash;&gt;-->
<!--          </template>-->
<!--          <q-list>-->
<!--            <q-item clickable tabindex="0" @click="logout">-->
<!--              <q-item-section class="tw-cursor-pointer" side>-->
<!--                <q-icon name="logout" ></q-icon>-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                <q-item-label>Logout</q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--          </q-list>-->
<!--        </q-btn-dropdown>-->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {

    }
  },
  methods: {
    logout() {
      console.log('logout users from mainlayout')
    }
  }
}
</script>
