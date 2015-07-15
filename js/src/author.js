define(['utils'], function (utils) {
  var names = [
        'Craig Sperling',
        'Milagros Noss',
        'Courtney Neff',
        'Lindsay Breese',
        'Jenifer Stayer',
        'Rebbecca Fiorentino',
        'Kraig Mccoll',
        'Georgann Shier',
        'Leeanna Cashman',
        'Alda Meachum',
        'Noreen Tait',
        'Akilah Donaldson',
        'Hiedi Joy',
        'Augustus Angles',
       ' Dean Futch',
        'Vernita Carlisle',
        'Jewell Nicholes',
        'Lila Mumme',
        'Edgardo Ruckman',
        'Lexie Wagener'
      ],
      generate = function () {
        return utils.random.itemFrom(names);
      };

  return {
    generate: generate
  };
});
