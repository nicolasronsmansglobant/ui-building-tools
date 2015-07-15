define(function () {
  var random = {
    itemFrom: function (array) {
      if (!array || Object.prototype.toString.call(array) !== '[object Array]'  || !array.length) {
        return;
      }

      return array[Math.floor(Math.random() * array.length)];
    },
    numberBetween: function (min, max) {
      if (typeof min !== 'number' && typeof max !== 'number') {
        return;
      }

      return typeof min !== 'number'
           ? max
           : typeof max !== 'number'
           ? min
           : min + Math.round(Math.random() * (max - min));
    },
  };

  return {
    random: random
  };
});
