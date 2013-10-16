'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MagentomoduleGenerator = module.exports = function MagentomoduleGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MagentomoduleGenerator, yeoman.generators.Base);

MagentomoduleGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
    {
        type: 'input',
            name: 'namespace',
            message: 'What is your namespace?',
        default: 'Something'
    },
    {
        type: 'input',
        name: 'moduleName',
        message: 'What is the name of your epic magento module?',
        default: 'MyModule'
    },
    {
        type: 'select',
        name: 'codePool',
        message: 'What code pool are you going to stick your module in?',
        choices: [
        {
            name: "Local Module",
            value: "local"
        },
        {
            name: "Third party module",
            value: "community"
        }
        ],
        default: 'community'
    },
    {
        type: 'checkbox',
        name: 'frontend',
        message: 'What frontend stuff do you require good sir?',
        choices: [
        {
            name: "Layout file",
            value: 'layout'
        },
        {
            name: "Controller",
            value: 'controller'
        }
        ],
        default: false
    }
    ];

    this.prompt(prompts, function (props) {

        console.log(props.frontend);

        this.namespace = props.namespace;
        this.moduleName = props.moduleName;
        this.codePool = props.codePool;
        this.frontend = props.frontend;

        this.fullModuleName = props.namespace + '_' + props.moduleName;
        this.moduleIdentifier = props.namespace.toLowerCase() + props.moduleName.toLowerCase(); 

        cb();
    }.bind(this));
};

MagentomoduleGenerator.prototype.app = function app() {
    var modulePath = 'app/code/' + this.codePool + '/' + this.namespace + '/' + this.moduleName + '/';

    this.mkdir('app');
    this.mkdir('app/etc');
    this.mkdir('app/etc/modules');
    this.mkdir('app/code');
    this.mkdir('app/code/' + this.codePool);
    this.mkdir('app/code/' + this.codePool + '/' + this.namespace);
    this.mkdir('app/code/' + this.codePool + '/' + this.namespace + '/' + this.moduleName);
    this.mkdir(modulePath + 'Block');
    this.mkdir(modulePath + 'Model');
    this.mkdir(modulePath + 'Helper');

    // Frontend
    if (this.frontend.length) {
        // Controller
        if (this.frontend.indexOf('controller') !== -1) {
            this.mkdir(modulePath + 'controllers');
            this.template('_frontcontroller.php', modulePath + 'controllers/IndexController.php');
        }
        // Controller
        if (this.frontend.indexOf('layout') !== -1) {
            this.mkdir('app/design');
            this.mkdir('app/design/frontend');
            this.mkdir('app/design/frontend/base');
            this.mkdir('app/design/frontend/base/default');
            this.mkdir('app/design/frontend/base/default/layout');
            var layoutPath = 'app/design/frontend/base/default/layout/';

            this.template('_frontlayout.xml', layoutPath + this.moduleIdentifier + '.xml');
        }
    }


    this.template('_etcmodules.xml', 'app/etc/modules/' + this.fullModulename + '.xml');
    this.template('_config.xml', modulePath + 'etc/config.xml');
    this.copy('_package.json', 'package.json');
};

MagentomoduleGenerator.prototype.projectfiles = function projectfiles() {
    //this.copy('editorconfig', '.editorconfig');
    //this.copy('jshintrc', '.jshintrc');
};
