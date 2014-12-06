# justinmasse Front-End Boilerplate
Utilizes the following
### Bower

> A package manager for the web

It offers a generic, unopinionated solution to the problem of **front-end package management**, while exposing the package dependency model via an API that can be consumed by a more opinionated build stack. There are no system wide dependencies, no dependencies are shared between different apps, and the dependency tree is flat.

Bower runs over Git, and is package-agnostic. A packaged component can be made up of any type of asset, and use any type of transport (e.g., AMD, CommonJS, etc.).

[View all packages available through Bower's registry](http://bower.io/search/).

### Grunt: The JavaScript Task Runner

[![Build Status: Linux](https://secure.travis-ci.org/gruntjs/grunt.png?branch=master)](http://travis-ci.org/gruntjs/grunt)
<a href="https://ci.appveyor.com/project/gruntjs/grunt"><img src="https://ci.appveyor.com/api/projects/status/32r7s2skrgm9ubva/branch/master" alt="Build Status: Windows" height="18" /></a>
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

### Sass 

**Sass makes CSS fun again**. Sass is an extension of CSS3,
adding nested rules, variables, mixins, selector inheritance, and more.
It's translated to well-formatted, standard CSS
using the command line tool or a web-framework plugin.

Sass has two syntaxes. The new main syntax (as of Sass 3)
is known as "SCSS" (for "Sassy CSS"),
and is a superset of CSS3's syntax.
This means that every valid CSS3 stylesheet is valid SCSS as well.
SCSS files use the extension `.scss`.

The second, older syntax is known as the indented syntax (or just "Sass").
Inspired by Haml's terseness, it's intended for people
who prefer conciseness over similarity to CSS.
Instead of brackets and semicolons,
it uses the indentation of lines to specify blocks.
Although no longer the primary syntax,
the indented syntax will continue to be supported.
Files in the indented syntax use the extension `.sass`.

# Getting Started - Installation

## Install Node.js & npm

http://nodejs.org/

```sh
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get -y install nodejs
```

## Install Grunt

Grunt and Grunt plugins are installed and managed via npm, the Node.js package manager. Grunt 0.4.x requires stable Node.js versions >= 0.8.0. Odd version numbers of Node.js are considered unstable development versions.

Before setting up Grunt ensure that your npm is up-to-date by running npm update -g npm (this might require sudo on certain systems).

http://gruntjs.com/installing-grunt

```sh
sudo npm install -g grunt-cli
```
###Tip
If you get the error:

Node: No such file or directory

When trying to run grunt, then also run the following in cmd to symlink it.

```ssh
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

## Install Ruby

```ssh
sudo apt-get -y install ruby
```

## Install Compass && SASS

```ssh
sudo apt-get -y install ruby-compass
sudo gem install compass
sudo gem install sass
```

#	Getting Started - A New Project

## Init

All development work is done in the frontend folder, the compiled version of the project will be placed in the public folder.

### Javascript

1. Open `/frontend/bower.json`
2. Remove or add any additional libraries you would like bower to fetch. DO NOT LEAVE LIBRARIES IN THE JS FOLDER THAT YOU DO NOT WANT IN THE PROJECT, THEY WILL BE COMPILED AND CONCATINATED.
3. In terminal navigate to `/frontend/`
4. Type `grunt init`
5. Place any additional libaries you are importing without grunt in the libs folder.

### Templating

Templating allows you to load in a client's template to wrap around your codebase. This will give you an accurate(relativly) view of how your code base will work in the clients CMS.

Templates live in `/frontend/templates/**/*`

Template asset files such as CSS, Javascript, and images are copied over to the public directory, however these files do not need to be upladed to the CMS

You are welcome to make any changes to the template files on a project basis. There is a scripts.html and styles.html files within all templates for ease.

#### Changing Templates

1. Open `/frontend/package.json`
2. Modify client value, by default client is set to 'default'. Ensure lowercase and that the template exists.

## Development

Typing `grunt` while in the `/frontend/` folder will initilize grunt to build the development version of your project. Front `/public/` folder will never and SHOULD never be pushed to github, this folder can always be gained by compiling the `/frontend/` folder.

All SASS files are combine	d during this process, however not optimized to leave the developer the ability to debug freely. 

The same can be said for all JS files. 

Images are flattened in this stage.

## Production

Typing `grunt build` while in the `/frontend/` folder will intiilize the production build of your code. During this process your images will be optimized, javascript merged, variabled optimized and minified, and SASS compiled and minified.
