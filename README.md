# Icon library by Icons8

**Insert the icons in 30 seconds using the new Icon Sets technology.**

## Installing i8-icon

You can install this package locally either with `npm`, `bower`, or `jspm`.

### npm

```shell
npm install i8-icon
```

Now you can use `require('i8-icon/angular-i8-icon')` or `require('i8-icon/jquery-i8-icon')` when installing with npm or jsmp and using Browserify or Webpack.

### bower

```shell
# To get the latest stable version, use bower from the command line.
bower install i8-icon

# To get the most recent, last committed-to-master version use:
bower install i8-icon#master 

# To save the bower settings for future use:
bower install i8-icon --save

# Later, you can use easily update with:
bower update
```

> Please note that i8-icon requires **AngularJS 1.1.x** or higher for use as Angular module.
> Please note that i8-icon requires **jQuery 1.8.x** or higher for use as jQuery plugin.


## Using the i8-icon library

Simply include the scripts and stylesheet in your main HTML file, in the order shown in the example below. Note that npm will install the files under `/node_modules/i8-icon/` and bower will install them under `/bower_components/i8-icon/`.


### Simple demo for AngularJS version
```html
<body ng-app="app">
  <i8-icon icon="fci:checkmark"></i8-icon>
  <i8-icon icon="clock"></i8-icon>
  <i8-icon icon="//cdn.rawgit.com/icons8/flat-color-icons/v1.0.2/svg/search.svg"></i8-icon>
  <i8-icon icon="calendar"></i8-icon>
  <i8-icon icon="md-action:3d-rotation" alt=""></i8-icon>

  <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.js"></script>
  <script type="text/javascript" src="/bower_components/i8-icon/angular-i8-icon.js"></script>

  <script>
    angular
      .module('app', ['i8.icon'])
      .config(function($i8IconProvider) {
        $i8IconProvider
          .svgSet('flat-color-icons', '//cdn.rawgit.com/icons8/flat-color-icons/v1.0.2/icon-set/icons.svg')
          .alias('flat-color-icons', 'fci')
          .icon('clock', '//cdn.rawgit.com/icons8/flat-color-icons/v1.0.2/svg/clock.svg')
      });
  </script>
</body>
```

### Simple demo for jQuery version
```html
<body>
  <div data-i8-icon="fci:checkmark"></div>
  <div data-i8-icon="clock"></div>
  <div data-i8-icon="//cdn.rawgit.com/icons8/flat-color-icons/v1.0.2/svg/search.svg"></div>
  <div data-i8-icon="calendar"></div>
  <div data-i8-icon="md-action:3d-rotation" data-alt=""></div>

  <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.js"></script>
  <script type="text/javascript" src="/bower_components/i8-icon/jquery-i8-icon.js"></script>

  <script>
    $(function() {
      $(document).i8icons({
        svgSet: {
          "flat-color-icons": '//cdn.rawgit.com/icons8/flat-color-icons/v1.0.2/icon-set/icons.svg'
        },
        alias: {
          fci: 'flat-color-icons'
        },
        icon: {
          clock: '//cdn.rawgit.com/icons8/flat-color-icons/v1.0.2/svg/clock.svg'
        }
      });
    });
  </script>
</body>
```

More demo [here](https://icons8.github.io/i8-icon/)

## Features

- Available all Icons8 [open source icons](https://github.com/icons8/flat-color-icons) via our api as default source.
- The icons are stored on our CDN server (which is free forever).
- You insert the icons right into your code.