export function toDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const [year, month, day] = dateString.split("-").map(Number);
  const monthName = months[month - 1];
  const ordinalSuffix = getOrdinalSuffix(day);

  return `${day}${ordinalSuffix} ${monthName} ${year}`;
}

export function toFlightTime(isoString) {
  const date = new Date(isoString);

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const day = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(day);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}${ordinalSuffix} ${month} ${year} (${hours}:${minutes})`;
}

export function toDateTime(isoString) {
  const date = new Date(isoString);

  // get hours and minutes, zero‑pad to 2 digits
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // abbreviated month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthAbbr = months[date.getMonth()];

  const year = date.getFullYear();

  return `${hours}:${minutes} ${monthAbbr} ${year}`;
}

export function toDuration(isoDuration) {
  const pattern =
    /^P(?:\d+Y)?(?:\d+M)?(?:\d+W)?(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?/;
  const match = isoDuration.match(pattern);
  if (!match) return "";

  const [, hours = "0", minutes = "0"] = match;
  const parts = [];
  if (parseInt(hours, 10) > 0) parts.push(`${hours}h`);
  if (parseInt(minutes, 10) > 0) parts.push(`${minutes}m`);

  return parts.join(" ") || "0m";
}

export function toTime(isoDateTime) {
  const [, timePart] = isoDateTime.split("T");
  return timePart.slice(0, 5);
}
