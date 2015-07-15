define(['template', 'card'], function (template, card) {
  var generate = function (quantity) {
    var cards = [];

    if (typeof quantity !== 'number') {
      return '';
    }

    for (var i = 0; i < quantity; i++) {
      cards.push(card.generate());
    }

    return template.cards({
      cards: cards
    });
  };

  return {
    generate: generate
  };
});
