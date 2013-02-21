# grunt-eiffel

> Eiffel Grunt plugin

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-eiffel --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-eiffel');
```

## The "compile" task

### Overview
In your project's Gruntfile, add a section named `compile` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  compile: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.ecf
Type: `String`  
Default value: basename of the current working directory + .ecf

ECF file name.

#### options.target
Type: `String`  
Default value: `undefined`

Target name.

### Usage Examples

#### Default Options
In this example, the default options are used to compile an Eiffel project using EiffelStudio.

```js
grunt.initConfig({
  compile: {
    ise: {}
  }
});
```

#### Custom Options
In this example, custom options are used to compile an Eiffel project using EiffelStudio.
So if the `ecf` option has the content `project.ecf` and the `target` option has the content `fcgi`, the generated result in this case would be to compile the `fcgi` target using the ECF file `project.ecf`.

```js
grunt.initConfig({
  compile: {
    ise: {
      options: {
        ecf: 'project.ecf',
        target: 'fcgi'
      }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
