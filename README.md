# UI Building Tools - Demo

## Setup
```
npm install -g yo grunt-cli intern
```


## Run
```
grunt taskName?
```


## Browser
```
npm install --save-dev grunt-contrib-connect
grunt connect
```
```
>> http://localhost:6789
```

## index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>UI Builing Tools - Exercise</title>

    <script src="node_modules/requirejs/require.js" data-main="js/app.min.js"></script>

    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/app.min.css">
  </head>
  <body>
    <div class="container-fluid">
      <div class="intro">
        <h1>Hello Fede!!</h1>
        <p>Congrats, you've just generated the UI Building Tools project.</p>
      </div>

      <div id="gallery" class="gallery row"></div>
    </div>
  </body>
</html>
```

## Javascript
```
npm install --save-dev grunt grunt-contrib-watch grunt-contrib-jshint grunt-contrib-requirejs grunt-hogan
```

## Gruntfile.js
```js
'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    less: {
      all: {
        compress: true,
        files: {
          'css/app.css': 'css/src/app.less'
        }
      }
    },

    hogan: {
      all: {
        src: 'js/src/**/*.mustache',
        dest: 'js/src/template.js',
        options: {
          binderName: 'amd'
        }
      }
    },

    requirejs: {
      all: {
        options: {
          baseUrl: 'js/src',
          name: 'main',
          out: 'js/app.min.js',
          optimize: 'uglify2',
          paths: {
            'jquery': 'empty:',
            'hogan': 'empty:'
          },
          cjsTranslate: true
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'js/src/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    csslint: {
      all: {
        src: ['css/**/*.css']
      },
      options: {
        csslintrc: '.csslintrc'
      }
    },
    
    cssmin: {
      css: {
        files: {
          'css/app.min.css': 'css/app.css'
        }
      }
    },

    watch: {
      js: {
        files: ['Gruntfile.js', 'js/src/**/*.{js,mustache}'],
        tasks: ['js'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['css/src/**/*.less'],
        tasks: ['css'],
        options: {
          livereload: true
        }
      },
      general: {
        files: ['index.html', 'tests/**/*.js'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      all: {
        options: {
          hostname: '*',
          port: process.env.PORT || '6789',
          base: '.',
          livereload: true
        }
      }
    },

    intern: {
      all: {
        options: {
          runType: 'client',
          config: 'tests/intern',
          reporters: ['console'],
          suites: ['tests/app']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-bump');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-hogan');
  grunt.loadNpmTasks('intern');

  grunt.registerTask('js', ['jshint', 'hogan', 'requirejs']);
  grunt.registerTask('css', ['less', 'csslint', 'cssmin']);
  grunt.registerTask('build', ['js', 'css']);
  grunt.registerTask('start', ['build', 'test', 'connect', 'watch']);
  grunt.registerTask('test', ['intern']);
  grunt.registerTask('default', ['start']);
};
```

## RequireJS
### js/src/main.js
```js
require.config({
  baeUrl: 'js/src',
  paths: {
    jquery: '../../node_modules/jquery/dist/jquery.min',
    hogan: '../../node_modules/hogan.js/dist/hogan-3.0.2.min.amd'
  }
});

requirejs(['jquery', 'gallery'], function ($, gallery) {
  $('#gallery').append(gallery.generate(10));
});
```
### js/src/card.js
```js
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
```
### js/src/image.js
```js
define(['utils'], function (utils) {
  var generate = function () {
    return 'http://lorempixel.com/' + utils.random.numberBetween(400, 500) + '/' + 200;
  };

  return {
    generate: generate
  };
});
```
### js/src/utils.js
```js
define(function () {
  var random = {
    itemFrom: function (array) {
      // ## Testing
      if (!array || Object.prototype.toString.call(array) !== '[object Array]'  || !array.length) {
        return;
      }

      return array[Math.floor(Math.random() * array.length)];
    },
    numberBetween: function (min, max) {
      // ## Testing
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
```
### js/src/caption.js
```js
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
```
### js/src/author.js
```js
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
```

## Mustaches
### js/src/gallery.mustache
```html
{{#cards}}
  {{> card}}
{{/cards}}
```
### js/src/card.mustache
```html
<div class="card">
  <div class="card-container">
    <div class="card-image">
      <img src="{{image}}" alt="Image from {{author}}">
    </div>
    <div class="card-desc">
      <p class="card-caption">
        {{caption}}
      </p>
      <p class="card-author">
        <strong>{{author}}</strong>
      </p>
    </div>
  </div>
</div>
```

## Less
```
npm install --save-dev lesshat csslint grunt-contrib-cssmin
```
### css/src/app.less
```css
@import '../../node_modules/lesshat/build/lesshat.less';

body {
  background: #eee;
}

.intro {
  display: none;
}

.gallery {
  margin-left: 0;
  padding: 0 0 15px;
}

.card {
  float: left;
  padding: 15px 15px 0 0;
  position: relative;
  width: 100%;
}

.card-container {
  background: #fff;
  .border-radius(3px);
  .box-shadow(0 1px 2px #aaa);
  padding: 10px;
  .transition(.25s ease-in-out);

  &:hover {
    .box-shadow(0 1px 2px #666);
  }
}

.card-image {
  height: 200px;
  margin-top: 15px;
  overflow: hidden;
  position: relative;

  img {
    bottom: -100%;
    display: inline-block;
    left: -100%;
    margin: auto;
    max-height: 100%;
    position: absolute;
    right: -100%;
    top: -100%;
    .transform(scale(1));
    .transform-origin(50% 50%);
    .transition(.25s ease-in-out);

    .card-container:hover & {
      .transform(scale(1.1));
    }
  }
}

.card-desc {
  height: 150px;
}

.card-caption {
  color: #aaa;
  display: block;
  display: -webkit-box;
  height: (20 * 4px);
  overflow: hidden;
  margin-top: 15px;
  text-overflow: ellipsis;
  .transition(.25s ease-in-out);
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  .card-container:hover & {
    color: #333;
  }
}

.card-author {
  color: #aaa;
  margin-top: 40px;
  text-align: right;
  .transition(.25s ease-in-out);

  .card-container:hover & {
    color: #333;
  }
}

@media (min-width: (480px + 1px)) {
  .card {
    width: 50%;
  }
}
@media (min-width: (768px + 1px)) {
  .card {
    width: 33.333333%;
  }
}
@media (min-width: (1024px + 1px)) {
  .card {
    width: 25%;
  }
}
@media (min-width: (1200px + 1px)) {
  .card {
    width: 20%;
  }
}
```


## Test
```
npm install --save-dev intern
grunt test
```
```
http://localhost:6789/node_modules/intern/client.html?config=tests/intern
```
### tests/intern.js
```js
define({
  useLoader: {
    'host-node': 'requirejs',
    'host-browser': '/node_modules/requirejs/require.js'
  },
  loader: {
    packages: [
      {
        name: 'hogan',
        location: 'node_modules/hogan.js/dist',
        main: 'hogan-3.0.2.min.amd'
      }
    ],
    paths: {
      'template': 'js/src/template',
      'gallery': 'js/src/gallery',
      'card': 'js/src/card',
      'image': 'js/src/image',
      'caption': 'js/src/caption',
      'author': 'js/src/author',
      'utils': 'js/src/utils'
    }
  },
  suites: ['tests/app'],
  excludeInstrumentation: /^(?:tests|node_modules)\//
});
```
### tests/app.js
```js
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
```


## GIT
```
git add .
git commit -m "My UI Building Tool Project"

grunt bump:minor

git push --tags branch repo
```
