define(['image', 'caption', 'author'], function (image, caption, author) {
  var generate = function () {
    return {
      image: image.generate(),
      caption: caption.generate(),
      author: author.generate()
    };
  };

  return {
    generate: generate
  };
});
