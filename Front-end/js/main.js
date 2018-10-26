let currentTemperatures= {}
/**
  * On window load.
  */
$(function(){
  loadData();
})

function loadData() {
  const currentTime = new Date($.now());
  const parsedTime = currentTime.getFullYear() + "-" + (currentTime.getMonth()+1) + "-" + currentTime.getDate() + "%20"
                + currentTime.getHours() + ":"
                + currentTime.getMinutes() + ":"
                + currentTime.getSeconds();
  const parsedTimeShort = currentTime.getFullYear() + "-" + (currentTime.getMonth()+1) + "-" + currentTime.getDate() + "%20"
                + currentTime.getHours() + ":"
                + (currentTime.getMinutes() - 1) + ":"
                + currentTime.getSeconds();
  const postUrl = "http://192.168.1.32:3000/data/" + parsedTimeShort + "&" + parsedTime;

  console.log(parsedTimeShort, parsedTime, postUrl)
  // $.post("192.168.1.32:3000/data/")
}

var vm = new Vue({
  data: currentTemperatures
})
