<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="q-ml-md">
          Surveyor App
        </q-toolbar-title>
        <q-btn-dropdown v-if="$store.getters['user/isAuthenticated']" stretch flat>
          <template #label>
            <p class="q-mx-md gt-sm" style="margin-bottom: -1px">{{ currentUser.name }}</p>
            <q-avatar color="white" text-color="primary">{{ currentUser.name | abbreviate}}</q-avatar>
          </template>
          <q-list>
            <q-item clickable tabindex="0" @click="logout">
              <q-item-section class="tw-cursor-pointer" side>
                <q-icon name="logout" ></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label @click="logout">Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      user: []
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser'])
    // currentUser() {
    //   return this.$store.getters['user/currentUser'];
    // }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logOut').then(() => {
        this.$router.push({ name: 'Login' });
      });
    }
  },
  filters: {
    abbreviate (val) {
      return val.charAt(0).toUpperCase()
    }
  }
}
</script>
