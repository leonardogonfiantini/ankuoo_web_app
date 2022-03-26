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

var from_time_table_hour_display = document.getElementById("from_time_table-hour");

var from_time_table_hour_up = document.getElementById("from_time_table-hour-up");
from_time_table_hour_up.onclick = () => {
  if (from_time_table_hour_display.value == 23) {
    from_time_table_hour_display.value = "00";
  } else {
    from_time_table_hour_display.value = ("00"+(parseInt(from_time_table_hour_display.value) + 1)).slice(-2);
  }
}

var from_time_table_hour_down = document.getElementById("from_time_table-hour-down");
from_time_table_hour_down.onclick = () => {
  if(from_time_table_hour_display.value != 0) {
    from_time_table_hour_display.value = ("00"+(parseInt(from_time_table_hour_display.value) - 1)).slice(-2);
  }
}

var from_time_table_minutes_display = document.getElementById("from_time_table-minutes");


var from_time_table_minutes_up = document.getElementById("from_time_table-minutes-up");
from_time_table_minutes_up.onclick = () => {
  if(from_time_table_minutes_display.value == 59) {
    from_time_table_hour_display.value = ("00"+(parseInt(from_time_table_hour_display.value) + 1)).slice(-2);
    from_time_table_minutes_display.value = "00";
  } else {
    from_time_table_minutes_display.value = ("00"+(parseInt(from_time_table_minutes_display.value) + 1)).slice(-2);
  }
}

var from_time_table_minutes_down = document.getElementById("from_time_table-minutes-down");
from_time_table_minutes_down.onclick = () => {
  if(from_time_table_minutes_display.value != 0) {
    from_time_table_minutes_display.value = ("00"+(parseInt(from_time_table_minutes_display.value) - 1)).slice(-2);
  } else {
    from_time_table_minutes_display.value = 59;
  }
}


var to_time_table_hour_display = document.getElementById("to_time_table-hour");

var to_time_table_hour_up = document.getElementById("to_time_table-hour-up");
to_time_table_hour_up.onclick = () => {

  if (to_time_table_hour_display.value == 23) {
    to_time_table_hour_display.value = "00";
  } else {
    to_time_table_hour_display.value = ("00"+(parseInt(to_time_table_hour_display.value) + 1)).slice(-2);
  }
}

var to_time_table_hour_down = document.getElementById("to_time_table-hour-down");
to_time_table_hour_down.onclick = () => {
  if(to_time_table_hour_display.value != 0) {
    to_time_table_hour_display.value = ("00"+(parseInt(to_time_table_hour_display.value) - 1)).slice(-2);
  }
}

var to_time_table_minutes_display = document.getElementById("to_time_table-minutes");


var to_time_table_minutes_up = document.getElementById("to_time_table-minutes-up");
to_time_table_minutes_up.onclick = () => {
  if(to_time_table_minutes_display.value == 59) {
    to_time_table_hour_display.value = ("00"+(parseInt(to_time_table_hour_display.value) + 1)).slice(-2);
    to_time_table_minutes_display.value = "00";
  } else {
    to_time_table_minutes_display.value = ("00"+(parseInt(to_time_table_minutes_display.value) + 1)).slice(-2);
  }
}

var to_time_table_minutes_down = document.getElementById("to_time_table-minutes-down");
to_time_table_minutes_down.onclick = () => {
  if(to_time_table_minutes_display.value != 0) {
    to_time_table_minutes_display.value = ("00"+(parseInt(to_time_table_minutes_display.value) - 1)).slice(-2);
  } else {
    to_time_table_minutes_display.value = 59;
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

  var from = from_time_table_hour_display.value+":"+from_time_table_minutes_display.value;
  var to = to_time_table_hour_display.value+":"+to_time_table_minutes_display.value;

  var url = "/api/time_schedule/insert?from="+from+"&to="+to;
  for (let i = 0; i < buttons_week.length; i++) {
    if(buttons_week[i].classList.contains("activate")) {
      url += "&" + buttons_week[i].id + "=1";  
    } else {
      url += "&" + buttons_week[i].id + "=0";
    }
  }

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    console.log(this.responseText);
  }
  xhttp.open("GET", url, true);
  xhttp.send();
}


function create_object_time_schedule(from, to, mon, tue, wed, thu, fri, sat, sun, status) {
  const div = document.createElement("div");
  div.setAttribute('class', 'form-check form-switch');

  const input = document.createElement('input');
  input.setAttribute('class', 'form-check-input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('role', 'switch');
  input.setAttribute('id', 'input-'+from+"-"+to);
  input.value = status;

  var days = "days: ";

  if (mon==1) days += "MON/";
  if (tue==1) days += "TUE/";
  if (wed==1) days += "WED/";
  if (thu==1) days += "THU/";
  if (fri==1) days += "FRI/";
  if (sun==1) days += "SAT/";
  if (sat==1) days += "SUN/";


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
    xhttp.open("GET", "/api/time_schedule/update?from="+from+"&to="+to+"&Mon="+mon+"&Tue="+tue+"&Wed="+wed+"&Thu="+thu+"&Fri="+fri+"%Sat="+sat+"&Sun="+sun+"&status="+input.value, true);
    xhttp.send();

  }

  const label = document.createElement('label');
  label.setAttribute('class', 'form-check-label');
  label.setAttribute('for', 'flexSwitchCheckDefault');
  label.setAttribute('id', 'label-'+from+"-"+to);
  label.textContent = from+"/"+to+"    "+days;

  const deletebtn = document.createElement('input');
  deletebtn.setAttribute('class', 'delete-btn');
  deletebtn.setAttribute('id', 'delete-'+from+"-"+to);
  deletebtn.setAttribute('type', 'button');

  deletebtn.onclick = () => {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      console.log(this.responseText);
    }
    xhttp.open("GET", "/api/time_schedule/delete?from="+from+"&to="+to+"&Mon="+mon+"&Tue="+tue+"&Wed="+wed+"&Thu="+thu+"&Fri="+fri+"&Sat="+sat+"&Sun="+sun, true);
    xhttp.send();

    var maindiv = document.getElementById('botbot');
    maindiv.removeChild(div);

  }


  div.appendChild(input);
  div.appendChild(label);
  div.appendChild(deletebtn);

  return div;
}


$.ajax({
  url: '/api/time_schedule/find_all',
  type: "GET",
  dataType: "json",
  success: function (data) {
    var time_schedule_div = document.getElementById('botbot')
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      time_schedule_div.appendChild(create_object_time_schedule(data[i].from, data[i].to, data[i].mon, data[i].tue, data[i].wed, data[i].thu, data[i].fri, data[i].sat, data[i].sun, data[i].status))
    }
  }
});