# Icon library

**Insert the icons in 30 seconds using the new Icon Sets technology.**

## Installing webicon

You can install this package locally either with `npm`, `bower`, or `jspm`.

### npm

```shell
npm install webicon
```

Now you can use `require('webicon/angular-webicon')` or `require('webicon/jquery-webicon')` when installing with npm or jsmp and using Browserify or Webpack.

### bower

```shell
# To get the latest stable version, use bower from the command line.
bower install webicon

# To get the most recent, last committed-to-master version use:
bower install webicon#master 

# To save the bower settings for future use:
bower install webicon --save

# Later, you can use easily update with:
bower update
```

> Please note that webicon requires **AngularJS 1.1.x** or higher for use as Angular module.
> Please note that webicon requires **jQuery 1.8.x** or higher for use as jQuery plugin.


## Using the webicon library

Simply include the scripts and stylesheet in your main HTML file in the order shown in the example below. Note that npm will install the files under `/node_modules/webicon/` and bower will install them under `/bower_components/webicon/`.


### Simple demo for AngularJS version
```html
<body ng-app="app">
  <webicon icon="material-icons:3d-rotation" alt=""></webicon>
  <webicon icon="font-awesome:home" alt="home"></webicon>
  <webicon icon="fci:checkmark"></webicon>
  <webicon icon="clock"></webicon>
  <webicon icon="//cdn.rawgit.com/icons8/flat-color-icons/v1.0.2/svg/search.svg"></webicon>
  <webicon icon="calendar"></webicon>  

  <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.js"></script>
  <script type="text/javascript" src="/bower_components/webicon/angular-webicon.js"></script>

  <script>
    angular
      .module('app', ['webicon'])
      .config(function($webiconProvider) {
        $webiconProvider
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
  <div data-webicon="material-icons:3d-rotation" data-alt=""></div>
  <div data-webicon="font-awesome:home" data-alt="home"></div>
  <div data-webicon="fci:checkmark"></div>
  <div data-webicon="clock"></div>
  <div data-webicon="//cdn.rawgit.com/icons8/flat-color-icons/v1.0.2/svg/search.svg"></div>
  <div data-webicon="calendar"></div>  

  <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.js"></script>
  <script type="text/javascript" src="/bower_components/webicon/jquery-webicon.js"></script>

  <script>
    $(function() {
      $(document).webicons({
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

More demo [here](https://icons8.github.io/webicon/)

## Features

- Available all Icons8 [open source icons](https://github.com/icons8/flat-color-icons) via our api as default source.
- The icons are stored on our CDN server (which is free forever).
- You insert the icons right into your code.
