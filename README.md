# generator-magentomodule

A [Yeoman](http://yeoman.io) generator for Magento modules.


## Getting Started

### Install Yo
If you dont have Yo installed, you have to install that first.

```
$ npm install -g yo
```

### Install generator-magentomodule
To install generator-magentomodule from npm, run:

```
$ npm install -g generator-magentomodule
```

Finally, initiate the generator from your Magento root directory:

```
$ yo magentomodule
```
Then simply answer the questions and thats it. You have a skeleton for a Magento module.

## What can it do?
The generator creates a Magento module skeleton for you to start building your module right away. We all know the pain of configuring and copying all these files before we can even start to work. Just pick what templates you need and the generator sets up the basic configuration for you.

These are the templates currently available to choose from when running the generator:

* Block
* Model
* Helper
* Frontend controller
* Frontend layout xml
* Adminhtml controller
* Adminhtml layout xml
* Widget
* Set up resource
* Setup script

*And more is on the way ...*

## Sub Generators
If you are just intressed in creating a single template, there is a thing called sub generators. You can use them like this:

```
$ yo magentomodule:widget Mywidget
```
This example will create a widget block and a widget.xml *(note that you have to call the sub generators from the module root and not the magento root)*.

### Available Sub Generators
The plan is to have sub generators for all templates. But for now the sub generators available is:

* magentomodule:frontcontroller
* magentomodule:widget

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
