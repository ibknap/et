const capitalize = (string) => {
  return string
    .toLowerCase()
    .replace(/(^|\s)(\S)/g, (match, preceding, letter) => {
      return preceding + letter.toUpperCase();
    });
};

export default capitalize;
