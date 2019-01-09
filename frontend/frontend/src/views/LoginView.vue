<template>
<section class="container-fluid" id="login-view">
  <div class="row justify-content-center">
    <div class="col-xs-3 rounded border shadow p-3 mb-5 bg-white " id="col-Login">
      <p class="text-center"><strong>ArduinoWeather Login</strong></p>
      <form class="login-form">
        <div class="form-group">
          <label>Username</label>
          <input type="text" v-model="input.username" name="user" class="form-control" placeholder="Username" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="input.password" name="password" placeholder="Password" required>
        </div>
        <div class="form-group" id="errorLogin">
          {{ statusMessage }}
        </div>
        <div class="form-group" id="signupFullfilled">
          {{ statusMessage }}
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary float-right" id="login-button" v-on:click="login()">Log in</button>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary float-right" id="signup-button" v-on:click="signup()">Sign up</button>
        </div>
      </form>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      statusMessage: ""

    }
  },
  methods: {
    login() {
      document.getElementById('errorLogin').style.display = "none";
      document.getElementById('signupFullfilled').style.display = "none";

      if (this.input.username != "" && this.input.password != "") {
        axios.post("http://rienstor.no-ip.org:3000/api/user/login", {
            username: this.input.username,
            password: this.input.password
          })
          .then(resp => {
            this.$emit("authenticated", true);
            this.$router.replace({
              name: "current"
            });
          })
          .catch(err => {
            this.statusMessage = err.message
            document.getElementById('errorLogin').style.display = "block";
          })
      } else {
        this.statusMessage = "A username and password must be specified";
        document.getElementById('errorLogin').style.display = "block";
      }
    },
    signup() {
      document.getElementById('errorLogin').style.display = "none";
      document.getElementById('signupFullfilled').style.display = "none";

      if (this.input.username != "" && this.input.password != "") {
        axios.post("http://rienstor.no-ip.org:3000/api/user/signup", {
            username: this.input.username,
            password: this.input.password
          })
          .then(resp => {
            this.statusMessage = "User successfully created."
            document.getElementById('signupFullfilled').style.display = "block";
          })
          .catch(err => {
            this.statusMessage = err.message
            document.getElementById('errorLogin').style.display = "block";
          })
      } else {
        this.statusMessage = "A username and password must be specified";
        document.getElementById('errorLogin').style.display = "block";
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

#signup-button {
  margin-right: 6px;
}

#signupFullfilled {
  color: green;
  display: block;
}

#errorLogin {
  color: red;
  display: none;
}
</style>
