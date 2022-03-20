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