define([
  'intern!object',
  'intern/chai!assert',
  'gallery',
  'card',
  'image',
  'caption',
  'author',
  'utils'
], function (registerSuite, assert, Gallery, Card, Image, Caption, Author, Utils) {
  registerSuite({
    'name': 'App',
    'Gallery': {
      'constructor': {
        name: 'constructor',
        'returns an object': function () {
          assert.typeOf(Gallery, 'object');
        }
      },
      'Gallery.generate()': {
        name: 'Gallery.generate()',
        'is defined': function () {
          assert.isDefined(Gallery.generate);
        },
        'returns a string if passed a number > 0 as argument': function () {
          assert.notEqual(Gallery.generate(10), '');
        },
        'returns an empty string if another type or nothing is passed as param': function () {
          assert.equal(Gallery.generate(undefined), '');
          assert.equal(Gallery.generate('10'), '');
          assert.equal(Gallery.generate({}), '');
          assert.equal(Gallery.generate([]), '');
          assert.equal(Gallery.generate(function () {}), '');
          assert.equal(Gallery.generate(), '');
        }
      }
    },
    'Card': {
      'constructor': {
        name: 'constructor',
        'returns an object': function () {
          assert.typeOf(Card, 'object');
        }
      },
      'Card.generate()': {
        name: 'Card.generate()',
        'is defined': function () {
          assert.isDefined(Card.generate);
        },
        'returns an object': function () {
          assert.isObject(Card.generate());
        },
        '... which has 3 properties: "image", "caption" and "author"': function () {
          var card = Card.generate();

          assert.isDefined(card.image);
          assert.isDefined(card.caption);
          assert.isDefined(card.author);
        }
      }
    },
    'Image': {
      'constructor': {
        name: 'constructor',
        'returns an object': function () {
          assert.typeOf(Image, 'object');
        }
      },
      'Image.generate()': {
        name: 'Image.generate()',
        'is defined': function () {
          assert.isDefined(Image.generate);
        },
        'returns an string': function () {
          assert.isString(Image.generate());
        },
        '... which is a valid url': function () {
          assert.isTrue(/^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(Image.generate()));
        }
      }
    },
    'Caption': {
      'constructor': {
        name: 'constructor',
        'returns an object': function () {
          assert.typeOf(Caption, 'object');
        }
      },
      'Caption.generate()': {
        name: 'Caption.generate()',
        'is defined': function () {
          assert.isDefined(Caption.generate);
        },
        'returns an string': function () {
          assert.isString(Caption.generate());
        }
      }
    },
    'Author': {
      'constructor': {
        name: 'constructor',
        'returns an object': function () {
          assert.typeOf(Author, 'object');
        }
      },
      'Author.generate()': {
        name: 'Author.generate()',
        'is defined': function () {
          assert.isDefined(Author.generate);
        },
        'returns an string': function () {
          assert.isString(Author.generate());
        }
      }
    },
    'Utils': {
      'constructor': {
        name: 'constructor',
        'returns an object': function () {
          assert.typeOf(Utils, 'object');
        }
      },
      'Utils.random': {
        'Utils.random.itemFrom()': {
          name: 'Utils.random.itemFrom()',
          'is defined': function () {
            assert.isDefined(Utils.random.itemFrom);
          },
          'returns a random element of an array': function () {
            assert.isDefined(Utils.random.itemFrom([0, 1, 2, 3]));
            assert.isDefined(Utils.random.itemFrom([0]));
          },
          'returns nothing if the array is empty, if another type or nothing is passed as param': function () {
            assert.isUndefined(Utils.random.itemFrom(undefined));
            assert.isUndefined(Utils.random.itemFrom(10));
            assert.isUndefined(Utils.random.itemFrom('test'));
            assert.isUndefined(Utils.random.itemFrom({}));
            assert.isUndefined(Utils.random.itemFrom([]));
            assert.isUndefined(Utils.random.itemFrom(function () {}));
            assert.isUndefined(Utils.random.itemFrom());
          }
        },
        'Utils.random.numberBetween()': {
          name: 'Utils.random.numberBetween()',
          'is defined': function () {
            assert.isDefined(Utils.random.numberBetween);
          },
          'returns a random number of a 2-values range': function () {
            assert.isNumber(Utils.random.numberBetween(0, 10));
          },
          'returns one of the param if the other is NaN': function () {
            assert.equal(Utils.random.numberBetween(undefined, 10), 10);
            assert.equal(Utils.random.numberBetween(10, '11'), 10);
            assert.equal(Utils.random.numberBetween(10, {}), 10);
            assert.equal(Utils.random.numberBetween([], 10), 10);
            assert.equal(Utils.random.numberBetween(10, function () {}), 10);
          },
          'returns the first param if it is the only one passed': function () {
            assert.equal(Utils.random.numberBetween(10), 10);
          },
          'returns nothing if another type or nothing is passed as param': function () {
            assert.isUndefined(Utils.random.numberBetween(undefined));
            assert.isUndefined(Utils.random.numberBetween('test'));
            assert.isUndefined(Utils.random.numberBetween({}));
            assert.isUndefined(Utils.random.numberBetween([]));
            assert.isUndefined(Utils.random.numberBetween(function () {}));
            assert.isUndefined(Utils.random.numberBetween());
          }
        }
      }
    }
  });
});
