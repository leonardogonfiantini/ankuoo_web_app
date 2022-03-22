var ONOFF = document.getElementById("ONOFF");
let f = 0;

if (f == 1) {
  $(ONOFF).css("background-image","url(../img/power-on.png)")
} else {
  $(ONOFF).css("background-image","url(../img/power-off.png)")
  document.getElementById("timer").innerHTML = "0d 0h 0m 0s";
}

var timer;

ONOFF.onclick = () => {
  if (f == 0) {

    $(ONOFF).css("background-image","url(../img/power-on.png)")
    f = 1
    
    var oldtime = new Date().getTime();

    timer = setInterval(function() {

      var now = new Date().getTime();
    
      var distance = now - oldtime;
    
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      document.getElementById("timer").innerHTML = days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
    
    }, 1000);

  } else {

    $(ONOFF).css("background-image","url(../img/power-off.png)")
    f = 0;

    clearInterval(timer)
    document.getElementById("timer").innerHTML = "0d 0h 0m 0s";


  }
}

var timer_hour_display = document.getElementById("timer-hour");

var timer_hour_up = document.getElementById("timer-hour-up");
timer_hour_up.onclick = () => {
  timer_hour_display.value = parseInt(timer_hour_display.value) + 1;
}

var timer_hour_down = document.getElementById("timer-hour-down");
timer_hour_down.onclick = () => {
  if(timer_hour_display.value != 0) {
    timer_hour_display.value = parseInt(timer_hour_display.value) - 1;
  }
}

var timer_minutes_display = document.getElementById("timer-minutes");


var timer_minutes_up = document.getElementById("timer-minutes-up");
timer_minutes_up.onclick = () => {
  if(timer_minutes_display.value == 59) {
    timer_hour_display.value = parseInt(timer_hour_display.value) + 1;
    timer_minutes_display.value = 0;
  } else {
    timer_minutes_display.value = parseInt(timer_minutes_display.value) + 1;
  }
}

var timer_minutes_down = document.getElementById("timer-minutes-down");
timer_minutes_down.onclick = () => {
  if(timer_minutes_display.value != 0) {
    timer_minutes_display.value = parseInt(timer_minutes_display.value) - 1;
  }
}

var submit_timer = document.getElementById("submit-timer");
submit_timer.onclick = () => {

  console.log(timer_hour_display.value);
  console.log(timer_minutes_display.value);

  timer_hour_display.value = 0;
  timer_minutes_display.value = 0;

}



