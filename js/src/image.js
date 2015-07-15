define(['utils'], function (utils) {
  var generate = function () {
    return 'http://lorempixel.com/' + utils.random.numberBetween(400, 500) + '/' + 200;
  };

  return {
    generate: generate
  };
});
