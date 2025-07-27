
function shortenDays() {
	const days = document.getElementsByClassName("day"); //grabs all day elements (shouldnt be more than 7)
	const shortNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //short dotw names
	const fullNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //long dotw names
	const useShort = window.innerWidth < 820; //skinny window size

	for (let i = 0; i < days.length; i++) {
		days[i].textContent = useShort ? shortNames[i] : fullNames[i]; //pretty much an if else statement. if useshort is tru then it will use short otherwise no
	}
}

window.addEventListener('load', shortenDays);
window.addEventListener('resize', shortenDays);


window.addEventListener("resize", shortenDays);
window.addEventListener('DOMContentLoaded', () => {
	const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // user's local timezone
	const sourceZone = 'America/Chicago'; // CST my timezone

	const now = luxon.DateTime.now().setZone(localZone); //sets current time for visiting user

	// Convert event start and end times from CST to local
	const eventStart = luxon.DateTime.fromObject({
		hour: 16, minute: 0,
	}, {zone: sourceZone}).setZone(localZone); //first sets the time you need, then converts it to local

	const eventEnd = luxon.DateTime.fromObject({
		hour: 22, minute: 0
	}, {zone: sourceZone}).setZone(localZone);

	const scheduleItems = document.querySelectorAll('.date');

	scheduleItems.forEach((item, index) => { //item here is the element itself while index in the position itt occurs (in this case 0-6)
		item.classList.remove('passed', 'today', 'ongoing'); //resets all classes just in case

		if (index < now.weekday % 7) {
			item.classList.add('passed');
		} else if (index === now.weekday % 7) {
			if (now >= eventStart && now < eventEnd) {
				item.classList.add('today', 'ongoing');
			} else if (now < eventStart) {
				item.classList.add('today');
			} else {
				item.classList.add('passed');
			}
		}
	});
});
document.getElementById("startTime").innerHTML = "Theater room is open at " + tzConvert.toOtherTZ(Intl.DateTimeFormat().resolvedOptions().timeZone, "5:00pm", "CST") + ` and will end roughly 4-6 hours later. <div>(This should be in YOUR timezone)</div>`;