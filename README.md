# Explore Neighbourhood Libraries

Quick prototype for the Toronto Public Library hackathon on Nov 14-15, 2015.
Sacha Chua (sacha@sachachua.com)

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and NPM](nodejs.org) >= v0.12.0
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [SQLite](https://www.sqlite.org/quickstart.html)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Tampermonkey script for injection

    document.querySelector('#refinements-library_branch').parentNode.querySelector('h3').innerHTML = 'Library Branch <a target="_blank" style="color: white; text-decoration: underline" href="http://localhost:9000/viz.html?url=' + encodeURIComponent(location.href) + '">(Visualize)</a>';
