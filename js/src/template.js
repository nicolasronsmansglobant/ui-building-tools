define(['hogan'], function(Hogan) {
  var t = {
    /* jshint ignore:start */
    'card' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"card\">\r");t.b("\n" + i);t.b("  <div class=\"card-container\">\r");t.b("\n" + i);t.b("    <div class=\"card-image\">\r");t.b("\n" + i);t.b("      <img src=\"");t.b(t.v(t.f("image",c,p,0)));t.b("\" alt=\"Image from ");t.b(t.v(t.f("author",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b("    <div class=\"card-desc\">\r");t.b("\n" + i);t.b("      <p class=\"card-caption\">\r");t.b("\n" + i);t.b("        ");t.b(t.v(t.f("caption",c,p,0)));t.b("\r");t.b("\n" + i);t.b("      </p>\r");t.b("\n" + i);t.b("      <p class=\"card-author\">\r");t.b("\n" + i);t.b("        <strong>");t.b(t.v(t.f("author",c,p,0)));t.b("</strong>\r");t.b("\n" + i);t.b("      </p>\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b("  </div>\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }}),
    'gallery' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("cards",c,p,1),c,p,0,10,26,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<card0",c,p,"  "));});c.pop();}return t.fl(); },partials: {"<card0":{name:"card", partials: {}, subs: {  }}}, subs: {  }})
    /* jshint ignore:end */
  },
  r = function(n) {
    var tn = t[n];
    return function(c, p, i) {
      return tn.render(c, p || t, i);
    };
  };
  return {
    'card' : r('card'),
    'gallery' : r('gallery')
  };
});