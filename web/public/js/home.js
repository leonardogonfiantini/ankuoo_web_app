var url = "mongodb://localhost:27017/";

var ONOFF = document.getElementById("ONOFF");

let f = 0;

const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
  f = this.responseText;
  if (f > 0) {
    $(ONOFF).css("background-image","url(../img/power-on.png)")

    var oldtime = f;

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
    document.getElementById("timer").innerHTML = "0d 0h 0m 0s";
  }
}
xhttp.open("GET", "/api/onoff/find", true);
xhttp.send();

var timer;

ONOFF.onclick = () => {
  if (f == 0) {

    f = Date.now();

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      console.log(this.responseText);
    }
    xhttp.open("GET", "/api/onoff/update?status="+f, true);
    xhttp.send();

    $(ONOFF).css("background-image","url(../img/power-on.png)")
    
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

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      console.log(this.responseText);
    }
    xhttp.open("GET", "/api/onoff/update?status="+"0", true);
    xhttp.send();

  }
}

function create_object_timer(time, status) {
  const div = document.createElement("div");
  div.setAttribute('class', 'form-check form-switch');

  const input = document.createElement('input');
  input.setAttribute('class', 'form-check-input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('role', 'switch');
  input.setAttribute('id', 'input-'+time);
  input.value = status;

  if (status > 0) {
    input.checked = true;
  }

  input.onclick = () => {

    if (input.value <= 0) input.value = Date.now();
    else input.value = 0;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      console.log(this.responseText);
    }
    xhttp.open("GET", "/api/timer/update?timer="+time+"&status="+input.value, true);
    xhttp.send();

  }


  const label = document.createElement('label');
  label.setAttribute('class', 'form-check-label');
  label.setAttribute('for', 'flexSwitchCheckDefault');
  label.setAttribute('id', 'label-'+time);
  label.textContent = time;

  const deletebtn = document.createElement('input');
  deletebtn.setAttribute('class', 'delete-btn');
  deletebtn.setAttribute('id', 'delete-'+time);
  deletebtn.setAttribute('type', 'button');


  deletebtn.onclick = () => {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      console.log(this.responseText);
    }
    xhttp.open("GET", "/api/timer/delete?timer="+time, true);
    xhttp.send();

    var maindiv = document.getElementById('bot-right');
    maindiv.removeChild(div);

  }

  div.appendChild(input);
  div.appendChild(label);
  div.appendChild(deletebtn);

  return div;
}

$.ajax({
  url: '/api/timer/find_all',
  type: "GET",
  dataType: "json",
  success: function (data) {
    var timer_div = document.getElementById('bot-right')
    for (let i = 0; i < data.length; i++) {
      timer_div.appendChild(create_object_timer(data[i].timer, data[i].status))
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

  var timer_div = document.getElementById('bot-right');
  timer_div.appendChild(create_object_timer(data, 0));

}



var time_table_hour_display = document.getElementById("time_table-hour");

var time_table_hour_up = document.getElementById("time_table-hour-up");
time_table_hour_up.onclick = () => {
  time_table_hour_display.value = ("00"+(parseInt(time_table_hour_display.value) + 1)).slice(-2);
}

var time_table_hour_down = document.getElementById("time_table-hour-down");
time_table_hour_down.onclick = () => {
  if(time_table_hour_display.value != 0) {
    time_table_hour_display.value = ("00"+(parseInt(time_table_hour_display.value) - 1)).slice(-2);
  }
}

var time_table_minutes_display = document.getElementById("time_table-minutes");


var time_table_minutes_up = document.getElementById("time_table-minutes-up");
time_table_minutes_up.onclick = () => {
  if(time_table_minutes_display.value == 59) {
    time_table_hour_display.value = ("00"+(parseInt(time_table_hour_display.value) + 1)).slice(-2);
    time_table_minutes_display.value = 0;
  } else {
    time_table_minutes_display.value = ("00"+(parseInt(time_table_minutes_display.value) + 1)).slice(-2);
  }
}

var time_table_minutes_down = document.getElementById("time_table-minutes-down");
time_table_minutes_down.onclick = () => {
  if(time_table_minutes_display.value != 0) {
    time_table_minutes_display.value = ("00"+(parseInt(time_table_minutes_display.value) - 1)).slice(-2);
  } else {
    time_table_minutes_display.value = 59;
  }
}

var buttons_week = document.getElementsByClassName("week-day");
for (let i = 0; i < buttons_week.length; i++) {
  buttons_week[i].onclick = () => {
    if (!buttons_week[i].classList.contains("activate")) {
      $(buttons_week[i]).css("background-color", "rgb(34, 196, 245)");
      $(buttons_week[i]).css("color", "white");
      buttons_week[i].classList.add("activate");
    } else {
      $(buttons_week[i]).css("background-color", "white");
      $(buttons_week[i]).css("color", "black");
      buttons_week[i].classList.remove("activate");
    }
  }
}

var submit_time_table = document.getElementById("submit-time_table");
submit_time_table.onclick = () => {
  var url = "/api/time_schedule/insert?time="+time_table_hour_display.value+":"+time_table_minutes_display.value;
  for (let i = 0; i < buttons_week.length; i++) {
    if(buttons_week[i].classList.contains("activate")) {
      url += "&" + buttons_week[i].id + "=1";  
    }
  }


  console.log(url);
}