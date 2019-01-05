<template>
<section id="footer">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12">
        <ul class="list-unstyled list-inline social text-center">
          <li class="list-inline-item"><a href="https://www.facebook.com/tijmen.stor" target="_blank"><i class="fa fa-facebook"></i></a></li>
          <li class="list-inline-item"><a href="https://www.linkedin.com/in/tijmen-stor/" target="_blank"><i class="fa fa-linkedin"></i></a></li>
          <li class="list-inline-item"><a href="https://www.instagram.com/tijmen_075" target="_blank"><i class="fa fa-instagram"></i></a></li>
          <li class="list-inline-item"><a href="mailto:tm.stor@outlook.com" target="_top"><i class="fa fa-envelope"></i></a></li>
        </ul>
      </div>
      </hr>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 text-center text-white">
        <p class="h6">Made by<a class="text-green ml-2" href="https://www.tijmenstor.nl" target="_blank">Tijmen Stor</a></p>
      </div>
      </hr>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
section {
  padding: 10px;
}

section .section-title {
  text-align: center;
  color: #343a40;
  margin-bottom: 50px;
  text-transform: uppercase;
}

#footer {
  background: #343a40 !important;
}

#footer a {
  color: #ffffff;
  text-decoration: none !important;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}

#footer .social {
  margin-bottom: 7px;
}

#footer ul.social li {
  padding: 3px 0;
}

#footer ul.social li a i {
  margin-right: 5px;
  font-size: 25px;
  -webkit-transition: .5s all ease;
  -moz-transition: .5s all ease;
  transition: .5s all ease;
}

#footer ul.social li:hover a i {
  font-size: 30px;
  margin-top: -10px;
}

#footer ul.social li a {
  color: #ffffff;
}

#footer ul.social li a:hover {
  color: #eeeeee;
}
</style>
