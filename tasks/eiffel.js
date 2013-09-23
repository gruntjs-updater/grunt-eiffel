/*
 * grunt-eiffel
 * https://github.com/oligot/grunt-eiffel
 *
 * Copyright (c) 2013 Olivier Ligot
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var _ = require('underscore');
var shell = require('shelljs');

var execute = function(grunt, name, args, callback) {
  process.env.EIFFEL_LIBRARY = path.join(process.cwd(), 'eiffel_library');
  fs.readdir(process.env.EIFFEL_LIBRARY, function(err, dirs) {
    _.each(dirs, function(dir) {
      var file = path.join(process.env.EIFFEL_LIBRARY, dir, 'system.json');
      if (grunt.file.isFile(file)) {
        var system = require(file);
        if (system.env) {
          process.env[system.env] = path.join(process.env.EIFFEL_LIBRARY, dir);
        }
      }
    });
    grunt.log.writeln('Launching ' + name + ' ' + args.join(' ') + '...');
    var command = spawn(name, args);
    command.stdout.setEncoding('utf8');
    command.stdout.on('data', function (data) {
      process.stdout.write(data);
    });
    command.stderr.setEncoding('utf8');
    command.stderr.on('data', function (data) {
      process.stdout.write(data);
    });
    command.on('exit', callback);
  });
};

module.exports = function(grunt) {

  grunt.registerTask('epm', 'Run the Eiffel Package Manager', function() {
    shell.exec('epm sync');
  });

  grunt.registerTask('estudio', 'Launch EiffelStudio', function(target) {
    var done = this.async();
    var options = this.options({
      ecf: path.basename(process.cwd()) + '.ecf'
    });
    process.env['GOBO_EIFFEL'] = process.env['gobo_eiffel'] = 'ise';
    var name = 'estudio';
    var args = [];
    if (target) {
      args.push('-target', target);
    }
    args.push('-config', options.ecf);
    execute(grunt, name, args, function(code) {
      if (code === 0) {
        grunt.log.ok();
        done();
      } else {
        done(false);
      }
    });
  });

  grunt.registerMultiTask('compile', 'Eiffel compilation', function() {
    var done = this.async();
    var options = this.options({
      compiler: 'ise',
      ecf: path.basename(process.cwd()) + '.ecf',
      workbench: false
    });
    if (options.compiler === 'ise') {
      process.env['GOBO_EIFFEL'] = process.env['gobo_eiffel'] = 'ise';
      var name = 'ec';
      var args = [];
      if (!options.workbench) {
        args.push(['-finalize']);
      }
      if (options.target) {
        args.push('-target', options.target);
      }
      args.push('-config', options.ecf, '-c_compile');
      if (options.verbose) {
        args.push('-verbose');
      }
    } else {
      process.env['GOBO_EIFFEL'] = process.env['gobo_eiffel'] = 'ge';
      var name = 'gec';
      if (options.workbench) {
        var args = [];
      } else {
        var args = ['--finalize'];
      }
      args.push('--catcall=no', options.ecf);
      if (options.verbose) {
        args.push('--verbose');
      }
    }

    execute(grunt, name, args, function(code) {
      if (code === 0) {
        grunt.log.ok();
        done();
      } else {
        done(false);
      }
    });
  });
};
