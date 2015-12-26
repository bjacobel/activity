String.prototype.titleCase = function () {  // eslint-disable-line no-extend-native
  return this.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
