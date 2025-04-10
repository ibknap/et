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
