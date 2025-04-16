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
