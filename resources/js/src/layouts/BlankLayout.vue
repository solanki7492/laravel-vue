<template>
  <div>
    <Loader />
    <div class="page-wrap">
      <div class="left-sidemenu collapse navbar-collapse" id="navbarSupportedContent">
        <div class="logo">
          <a href="">
            <img :src="require('../assets/images/user/uder-5.jpg')">
          </a>
        </div>
        <div class="navbarlft">
          <ul>
            <li>
              <router-link :to="{ path: '/'}"><i><img :src="require('../assets/images/business-ico.png')"></i>Users</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-wrapper cf">
        <header class="is-header-sec">
          <div class="container-fluid">
            <div class="d-flex justify-content-between cf">
              <div class="dashbaod-txt">{{activePage.name}}</div>
              <div class="right-header cf">
              </div>
            </div>
          </div>
        </header>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '../components/core/loader/Loader'
import { core } from '../config/pluginInit'
import { mapGetters } from "vuex";
export default {
  name: 'BlankLayout',
  components: {
    Loader
  },
  computed: {
    ...mapGetters({
      authUser: "Setting/authUserState",
      activePage: "Setting/activePage"
    })
  },
  mounted () {
    //core.fetchLogin();
  },
  methods: {
    signOut () {
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      this.$router.push({ name: 'website.login' })
    }
  } 
}
</script>
<style>
  @import url("../assets/css/custom.css");
  .modal-backdrop {
    opacity: .5;
  }
</style>