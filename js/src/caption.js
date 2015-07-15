define(['utils'], function (utils) {
  var loremIpsum = [
        'Lorem ipsum dolor sit amet, vim summo dignissim eu, at oporteat petentium usu. In eam affert propriae, an nibh voluptua nam. Qui te dicit maiestatis philosophia. Eam meis necessitatibus ut, nam debet dolores vivendum in, malorum dolorum mea id. In tota intellegebat his, illum habemus ei nam.',
        'Mei in scripta pertinax, oporteat atomorum dignissim quo ex, ea vim tollit luptatum. An amet mnesarchum cum, per an dolore tritani, sed dolore graeco alterum eu. Per ut hinc eius, te eam cetero admodum eloquentiam. Per regione salutatus adipiscing te, ius cu veniam admodum scribentur. Regione ocurreret ad vim, mutat saperet et eos.',
        'Cu sit saperet perfecto, sed omnis ocurreret ut. Sit te eros tollit, ea laoreet maiestatis suscipiantur duo, quo propriae mediocrem et. An dico illud nostrud sea, vim choro epicuri vivendum no. Ponderum iudicabit cu sea, qui te esse fabulas adolescens, id tation vivendo percipitur qui. Mea ex atqui hendrerit, sit erant ubique fuisset at, sea vocibus phaedrum ad.',
        'Ut intellegat quaerendum vim, vel in ponderum efficiantur. Mea ea partiendo quaerendum. Duo iusto doming cu. Ei saperet appellantur voluptatibus est. Cu possit constituam disputando sed. Mea persius temporibus ad.',
        'Sea denique perpetua ullamcorper ad. Mei in essent saperet, ea consul nemore intellegebat pri, vis cu corpora delectus indoctum. Ad nam laudem delicatissimi necessitatibus, eum perpetua temporibus ei. Ea vix cibo aliquam scriptorem. His et quaeque mentitum persecuti, his legere mentitum noluisse at, nisl mediocrem consequat mea eu. In ius error feugiat senserit.'
      ],
      generate = function () {
        return utils.random.itemFrom(loremIpsum);
      };

  return {
    generate: generate
  };
});
