<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
    <a class="navbar-brand"> <img class="logo" src="../assets/image/smile-icon-1.png" height="40"><a style="color: ghostwhite;"> ArduinoWeather</a></a>
    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#screen-collapse" aria-controls="screen-collapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse collapse" id="screen-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link to="/">
            <a class="nav-link" data-toggle="collapse" data-target="#screen-collapse">Home</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/graph">
            <a class="nav-link" data-toggle="collapse" data-target="#screen-collapse">Graph</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/average">
            <a class="nav-link" data-toggle="collapse" data-target="#screen-collapse">Average</a>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderNavBar'
}
</script>

<style>
#brand-link.router-link-active {
  text-decoration: none;
}

.router-link-exact-active {
  color: white;
}
</style>
