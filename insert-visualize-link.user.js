// ==UserScript==
// @name         Insert Visualize link
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a visualize link to the branch search results
// @author       Sacha Chua
// @match        http://www.torontopubliclibrary.ca/search.jsp*
// ==/UserScript==
/* jshint -W097 */
'use strict';

// You need to have the server from
// https://github.com/sachac/explore-neighbourhood-libraries running
// in development mode on your local computer. Someday we'll change
// this so that the mapping happens entirely in the browser, with no
// server required. =)

document.querySelector('#refinements-library_branch').parentNode.querySelector('h3').innerHTML = 'Library Branch <a target="_blank" style="color: white; text-decoration: underline" href="http://localhost:9000/viz.html?url=' + encodeURIComponent(location.href) + '">(Visualize)</a>';
