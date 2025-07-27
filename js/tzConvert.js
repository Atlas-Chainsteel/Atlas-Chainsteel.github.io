const DateTime = luxon.DateTime;
const tzAbbreviationMap = {
	// North America
	EST: "America/New_York",
	EDT: "America/New_York",
	CST: "America/Chicago",
	CDT: "America/Chicago",
	MST: "America/Denver",
	MDT: "America/Denver",
	PST: "America/Los_Angeles",
	PDT: "America/Los_Angeles",
	AKST: "America/Anchorage",
	AKDT: "America/Anchorage",
	HST: "Pacific/Honolulu",

	// Latin America
	AST: "America/Puerto_Rico",  // also used by Canada
	ECT: "America/Guayaquil",

	// Europe
	GMT: "Etc/GMT",
	UTC: "Etc/UTC",
	BST: "Europe/London",
	CET: "Europe/Paris",
	CEST: "Europe/Paris",
	EET: "Europe/Athens",
	EEST: "Europe/Athens",

	// Asia
	IST: "Asia/Kolkata",  // India
	JST: "Asia/Tokyo",
	SGT: "Asia/Singapore",
	AWST: "Australia/Perth",
	ACST: "Australia/Adelaide",
	AEST: "Australia/Sydney",
	AEDT: "Australia/Sydney",
	CST_CHINA: "Asia/Shanghai",  // CST entry for China
	HKT: "Asia/Hong_Kong",
	KST: "Asia/Seoul",

	// Middle East
	IRST: "Asia/Tehran",
	AST_SA: "Asia/Riyadh",  // separate from America AST

	// Africa
	EAT: "Africa/Nairobi",
	SAST: "Africa/Johannesburg",
	WAT: "Africa/Lagos",

	// Pacific
	NZST: "Pacific/Auckland",
	NZDT: "Pacific/Auckland",
	CHST: "Pacific/Guam"
};

function resolveTimeZoneAbbreviation(tz) {
	if (!tz || typeof tz !== 'string') return tz;

	const upper = tz.toUpperCase();
	return tzAbbreviationMap[upper] || tz; // return original if not found
	//might add an error message for when neither works
}


const tzConvert = {
	toLocalTZ: function (sourceTimeZone, timeStr) {
		if (!sourceTimeZone || !timeStr) {//using the NOT operator. so if both are not defined, it should error out
			console.error("Source timezone and time must be provided");
			return;
		}

		const resolvedSourceTZ = resolveTimeZoneAbbreviation(sourceTimeZone); //converts things like CST to America/Chicago format
		const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone; //grabs local timezone
		console.log(localZone);

		// Get today’s date in the source timezone
		const today = DateTime.now().setZone(resolvedSourceTZ).toFormat("yyyy-MM-dd");

		// Parse the given time string in the source timezone
		const parsed = DateTime.fromFormat(`${today} ${timeStr}`, "yyyy-MM-dd h:mma", { zone: resolvedSourceTZ });

		if (!parsed.isValid) {//errors out if you set an undefined time of some sort
			console.error("Invalid time format:", parsed.invalidExplanation);
			return;
		}

		// Convert to the local timezone in a quite literal manner
		const local = parsed.setZone(localZone);
		return local.toFormat("h:mm a");//returns the time in hour:minute am/pm format
	},
	toOtherTZ: function(targetTimeZone, timeStr, sourceTimeZone) { //converts time to targetzone from source timezone
		if (!targetTimeZone || !timeStr) {//errors if neither are provided
			console.error("Target timezone and time must be provided");
			return;
		}

		const resolvedSource = resolveTimeZoneAbbreviation(sourceTimeZone || Intl.DateTimeFormat().resolvedOptions().timeZone); //sets tz to either the one defined in source or the local (after converting from shorthand)
		const resolvedTarget = resolveTimeZoneAbbreviation(targetTimeZone); //sets this variable to the converted timezone from the shorthand

		const today = DateTime.now().setZone(resolvedSource).toFormat("yyyy-MM-dd");

		const parsed = DateTime.fromFormat(`${today} ${timeStr}`, "yyyy-MM-dd h:mma", { zone: resolvedSource });

		if (!parsed.isValid) {
			console.error("Invalid time format:", parsed.invalidExplanation);
			return;
		}

		const target = parsed.setZone(resolvedTarget); //sets the defined time to the target timezone
		return target.toFormat("h:mm a");
	}
};