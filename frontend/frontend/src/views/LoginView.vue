<template>
<section class="container-fluid" id="login-view">
  <div class="row justify-content-center">
    <div class="col-xs-3 rounded border shadow p-3 mb-5 bg-white " id="col-Login">
      <p class="text-center"><strong>ArduinoWeather Login</strong></p>
      <form class="login-form">
        <div class="form-group" id="errorLogin">
        </div>
        <div class="form-group">
          <label>Username</label>
          <input type="text" v-model="input.username" name="user" class="form-control" placeholder="username" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="input.password" name="password" placeholder="password" required>
        </div>
        <div class="form-group">
          <button type="button"class="btn btn-primary float-right" v-on:click="login()">Login</button>
        </div>
      </form>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        if (this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
          this.$emit("authenticated", true);
          this.$router.replace({
            name: "current"
          });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    }
  }
}
</script>

<style>
body {
  background: url('../assets/image/cloudy-garbage.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#login-view .row {
  margin-top: 10%;
}

#login-view p {
  font-size: 30px;
  color: black;
}

#login-view label {
  font-size: 15px;
}

</style>
