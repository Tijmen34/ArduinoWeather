<template>
  <div id="app">
    <router-view @authenticated="setAuthenticated"/>
  </div>
</template>
<script>

export default {
  name: 'app',
  data() {
    return {
      authenticated: false,
      mockAccount: {
        username: "tijmen",
        password: "admin"
      }
    }
  },
  mounted() {
    if(!this.authenticated) {
      this.$router.push({name: "login"})
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
