let schedule = document.getElementsByClassName("row");
const startTime=new Date();
startTime.setUTCHours(22);
startTime.setUTCMinutes(0);
const time = startTime.toLocaleTimeString('timezone', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
});

document.getElementById("timeStamp").innerHTML = time;

var current = new Date();
var TZ='America/Chicago'; //Target timezone from server
current=new Date(Date.parse(current.toLocaleString("en-US", {timeZone: TZ})));

for (let i=0; i < schedule.length; i++) {
    if (i<current.getDay()) {
        schedule[i].classList.add("passed");
    } else if (i==current.getDay()) {
      if (current.getHours() >= 5) {
        schedule[i].classList.add("ongoing");
      }
    }
}
