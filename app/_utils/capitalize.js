const capitalize = (string) => {
  if (string === undefined || string === null) {
    return string;
  } else {
    return string
      .toString()
      .toLowerCase()
      .replace(/(^|\s)(\S)/g, (match, preceding, letter) => {
        return preceding + letter.toUpperCase();
      });
  }
};

export default capitalize;
