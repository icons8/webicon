# Icon for Icons8 icons

![Preview of Flat Icons from Icons8](http://cdnd.icons8.com/download/mail/color-icons-preview.png)

## Installing Icons8 icons

You can install this package locally either with `npm`, `bower`, or `jspm`.

### npm

```shell
npm install i8-icon
```

Now you can use `require('i8-icon')` when installing with npm or jsmp and using Browserify or Webpack.

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

> Please note that i8-icon requires **Angular 1.1.x** or higher for use as Angular module.
> Please note that i8-icon requires **jQuery 1.8.x** or higher for use as jQuery plugin.


## Using the i8-icon Library

Simply include the scripts and stylesheet in your main HTML file, in the order shown in the example below. Note that npm will install the files under `/node_modules/i8-icon/` and bower will install them under `/bower_components/i8-icon/`.

### Single icon (Angular version)
```
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.js"></script>
<script type="text/javascript" src="/bower_components/i8-icon/angular-i8-icon.js"></script>

<i8-icon icon="clock"></i8-icon>
<span i8-icon="calendar"></span>
<div data-i8-icon="checkmark"></div>
<i8-icon icon="assets/icons/svg/search.svg"></i8-icon>

<script>
  angular
    .module('app', ['i8.icon'])
    .config(function($i8IconProvider) {
      $i8IconProvider
        .icon('clock', 'assets/icons/svg/clock.svg')
        .icon('calendar', 'assets/icons/svg/calendar.svg')
        .icon('checkmark', 'assets/icons/svg/checkmark.svg');
    });
</script>
```

### Single icon (jQuery version)
```
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.js"></script>
<script type="text/javascript" src="/bower_components/i8-icon/jquery-i8-icon.js"></script>

<i8-icon icon="clock"></i8-icon>
<span i8-icon="calendar"></span>
<div class="i8-icon i8-icon-checkmark"></div>
<i8-icon icon="assets/icons/svg/search.svg"></i8-icon>

<script>
  $(function() {
    $(document).i8icons({
      icons: {
        clock: 'assets/icons/svg/clock.svg',
        calendar: 'assets/icons/svg/calendar.svg',
        checkmark: 'assets/icons/svg/checkmark.svg'
      }
    });
  });
</script>
```

More demo [here](http://icons8.github.io/i8-icon/)
