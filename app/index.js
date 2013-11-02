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
        message: 'What code pool are you going to stick your module in? (pardon my french ...)',
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
        name: 'global',
        message: 'Need any templates for the general stuff?',
        choices: [
            {
                name: "Template for Model",
                value: 'model'
            },
            {
                name: "Template for Block",
                value: 'block'
            },
            {
                name: "Helper",
                value: 'helper'
            }
        ],
        default: false
    },
    {
        type: 'checkbox',
        name: 'frontend',
        message: 'What frontend gadgets do you require good sir?',
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
    },
    {
        type: 'checkbox',
        name: 'adminhtml',
        message: 'What admin shizzle do you want?',
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
    },
    {
        type: 'confirm',
        name: 'setup',
        message: 'Need a setup script?',
        default: false
    },

    ];

    this.prompt(prompts, function (props) {

        console.log(props.frontend);

        this.namespace = props.namespace;
        this.moduleName = props.moduleName;
        this.codePool = props.codePool;
        this.global = props.global;
        this.frontend = props.frontend;
        this.adminhtml = props.adminhtml;
        this.setup = props.setup;


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

    // Global
    if (this.global.length) {
        // Hepler
        if (this.global.indexOf('helper') !== -1) {
            this.mkdir(modulePath + 'Helper');
            this.template('_helper.php', modulePath + 'Helper/Data.php');
        }
        // Model
        if (this.global.indexOf('model') !== -1) {
            this.mkdir(modulePath + 'Model');
            this.template('_model.php', modulePath + 'Model/Mymodel.php');
        }
        // Block
        if (this.global.indexOf('block') !== -1) {
            this.mkdir(modulePath + 'Block');
            this.template('_block.php', modulePath + 'Block/Myblock.php');
        }
    }

    // Frontend
    if (this.frontend.length) {
        // Controller
        if (this.frontend.indexOf('controller') !== -1) {
            this.mkdir(modulePath + 'controllers');
            this.template('_frontcontroller.php', modulePath + 'controllers/IndexController.php');
        }
        // layout file
        if (this.frontend.indexOf('layout') !== -1) {
            this.mkdir('app/design/frontend/base/default/layout');
            var layoutPath = 'app/design/frontend/base/default/layout/';

            this.template('_frontlayout.xml', layoutPath + this.moduleIdentifier + '.xml');
        }
    }


    // Admin
    if (this.adminhtml.length) {
        // Controller
        if (this.adminhtml.indexOf('controller') !== -1) {
            this.mkdir(modulePath + 'controllers/adminhtml');
            this.template('_adminhtmlcontroller.php', modulePath + 'controllers/adminhtml/IndexController.php');
        }
        // Layout
        if (this.adminhtml.indexOf('layout') !== -1) {
            this.mkdir('app/design/adminhtml/default/default/layout');
            var adminLayoutPath = 'app/design/adminhtml/default/default/layout/';
            this.template('_adminhtmllayout.xml', adminLayoutPath + this.moduleIdentifier + '.xml');
        }
    }
    
    // Set up script
    if (this.setup) {
        var setupPath = modulePath + 'sql/' + this.moduleIdentifier + '_setup';
        this.mkdir(setupPath);
        this.mkdir(modulePath + 'Model/Resource');
        this.template('_setup.php', setupPath + '/mysql4-install-0.1.0.php');
        this.template('_setupresource.php', modulePath + 'Model/Resource/Setup.php');
    }



    this.template('_etcmodules.xml', 'app/etc/modules/' + this.fullModuleName + '.xml');
    this.template('_config.xml', modulePath + 'etc/config.xml');
    this.copy('_package.json', 'package.json');
};

MagentomoduleGenerator.prototype.projectfiles = function projectfiles() {
    //this.copy('editorconfig', '.editorconfig');
    //this.copy('jshintrc', '.jshintrc');
};
