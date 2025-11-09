let schedule = document.getElementsByClassName("row");
const startTime=new Date("2025-10-01T17:00:00-06:00");

//DO NOT USE ELSEWHERE!!!!!!!
const Sunday = new Date("2025-11-08T17:00:00-06:00");
console.log

for (var i=0; i < schedule.length; i++) {
  Sunday.setDate(Sunday.getDate() + 1);
  schedule[i].getElementsByClassName("day")[0].innerHTML = Sunday.toLocaleDateString("en-US", { weekday: "long" });
}

const time = startTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
});

document.getElementById("timeStamp").innerHTML = time;

var current = new Date();
console.log(current);
console.log(current.toLocaleString("en-US", {timeZone: 'America/Chicago'}));
console.log(Date.parse(current.toLocaleString("en-US", {timeZone: 'America/Chicago'})));
current=new Date(Date.parse(current.toLocaleString("en-US", {timeZone: 'America/Chicago'})));



for (let i=0; i < schedule.length; i++) {
    if (i<current.getDay()) {
        schedule[i].classList.add("passed");
    } else if (i==current.getDay()) {
      if (current.getHours() >= 5) {
        schedule[i].classList.add("ongoing");
      }
    }
}
