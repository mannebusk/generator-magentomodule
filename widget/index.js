'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs'); 
var path = require('path'); 

var WidgetGenerator = module.exports = function WidgetGenerator(args, options, config) {
  this.baseDir = options.env.cwd;
  // Set arg to this.name
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(WidgetGenerator, yeoman.generators.NamedBase);

WidgetGenerator.prototype.files = function files() {
    // If called from main generator
    if (typeof this.name === 'object') {
        var module = this.name;
        this.codePool = module.codePool;
        this.namespace = module.namespace;
        this.moduleName = module.moduleName;
        this.modulePath = module.modulePath;
        this.etc = this.baseDir + '/' + this.modulePath + 'etc/';
        this.block = this.baseDir + '/' + this.modulePath + 'Block/';
        this.name = this.name.name;
    } else {
        // Get module information from file path
        this.codePool = path.basename(fs.realpathSync('../../'))
        this.namespace = path.basename(fs.realpathSync('../'))
        this.moduleName = path.basename(fs.realpathSync('.'))
        this.etc = 'etc/';
        this.block = 'Block/';
    }

    this.fullModuleName = this.namespace + '_' + this.moduleName;
    this.lowerModuleName = this.namespace.toLowerCase() + this.moduleName.toLowerCase();
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);

    // Create files if in module root
    if (fs.existsSync(this.etc) && fs.existsSync(this.block)) {
        this.template('widget.xml', this.etc + 'widget.xml');
        this.mkdir('Block/Widget/');
        this.template('block.php', this.block + 'Widget/' + this.name + '.php');
    } else {
        console.log('You need to call this from a module root.');
    }
};
