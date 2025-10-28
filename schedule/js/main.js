let schedule = document.getElementsByClassName("row");
const startTime=new Date("2025-10-01T17:00:00-05:00");
const time = startTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
});

document.getElementById("timeStamp").innerHTML = time;

const current = new Date();
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
