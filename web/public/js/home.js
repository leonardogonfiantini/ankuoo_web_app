var url = "mongodb://localhost:27017/";

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

function create_object_timer(time, status) {
  const div = document.createElement("div");
  div.setAttribute('class', 'form-check form-switch');

  const input = document.createElement('input');
  input.setAttribute('class', 'form-check-input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('role', 'switch');
  input.setAttribute('id', 'input'+time);

  const label = document.createElement('label');
  label.setAttribute('class', 'form-check-label');
  label.setAttribute('for', 'flexSwitchCheckDefault');
  label.setAttribute('id', 'label'+time);
  label.textContent = time;

  div.appendChild(input);
  div.appendChild(label);

  return div;
}

$.ajax({
  url: '/api/timer/find_all',
  type: "GET",
  dataType: "json",
  success: function (data) {
    console.log(data)
    var timer_div = document.getElementById('bot-right')
    for (let i = 0; i < data.length; i++) {
      timer_div.appendChild(create_object_timer(data[i].timer, data[i].value))
    }
  }
});


var timer_hour_display = document.getElementById("timer-hour");

var timer_hour_up = document.getElementById("timer-hour-up");
timer_hour_up.onclick = () => {
  timer_hour_display.value = ("00"+(parseInt(timer_hour_display.value) + 1)).slice(-2);
}

var timer_hour_down = document.getElementById("timer-hour-down");
timer_hour_down.onclick = () => {
  if(timer_hour_display.value != 0) {
    timer_hour_display.value = ("00"+(parseInt(timer_hour_display.value) - 1)).slice(-2);
  }
}

var timer_minutes_display = document.getElementById("timer-minutes");


var timer_minutes_up = document.getElementById("timer-minutes-up");
timer_minutes_up.onclick = () => {
  if(timer_minutes_display.value == 59) {
    timer_hour_display.value = ("00"+(parseInt(timer_hour_display.value) + 1)).slice(-2);
    timer_minutes_display.value = 0;
  } else {
    timer_minutes_display.value = ("00"+(parseInt(timer_minutes_display.value) + 1)).slice(-2);
  }
}

var timer_minutes_down = document.getElementById("timer-minutes-down");
timer_minutes_down.onclick = () => {
  if(timer_minutes_display.value != 0) {
    timer_minutes_display.value = ("00"+(parseInt(timer_minutes_display.value) - 1)).slice(-2);
  } else {
    timer_minutes_display.value = 59;
  }
}

var submit_timer = document.getElementById("submit-timer");
submit_timer.onclick = () => {

  var data = timer_hour_display.value+":"+timer_minutes_display.value;

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    console.log(this.responseText);
  }
  xhttp.open("GET", "/api/timer/insert?timer="+data, true);
  xhttp.send();

  timer_hour_display.value = "00";
  timer_minutes_display.value = "00";

}



