# Explore Neighbourhood Libraries

Quick prototype for the Toronto Public Library hackathon on Nov 14-15, 2015.
Sacha Chua (sacha@sachachua.com). Yay, it won!

Update 2015-11-18: I've updated insert-visualize-link.user.js so that
it can do everything, no local server needed. I've removed the
unneeded files, but if you're curious, you can always look at the
history.

Update 2015-11-15: This visualizes the number of search results by
branch on a map so that you can see which libraries you might want to
browse through. Right now, it requires a NodeJS server, but it should
be possible to make this entirely client-side (maybe a Chrome
extension or user script?) so that people can play with it more
easily. I'm looking forward to tinkering with this some more. Follow
this repository or get in touch for more updates!

![Screenshot](screenshot.png)

Notes: http://sachachua.com/blog/2015/11/exploring-neighbourhood-libraries-and-other-notes-from-the-toronto-public-library-hackathon/

Released under the MIT License - have fun!

## Getting Started

You'll need either [TamperMonkey](http://tampermonkey.net/) (Chrome)
or
[Greasemonkey](https://addons.mozilla.org/en-us/firefox/addon/greasemonkey/)
(Firefox). 

Then you should be able to open [insert-visualize-link.js](https://github.com/sachac/explore-neighbourhood-libraries/raw/master/insert-visualize-link.user.js) in your
browser and install it as a user script. 

Once that's there, you should see a `(Visualize)` link next to the
library branch options on the left side of the Toronto Public Library search results. For example, here's a search for [new regular print books from the past 7 days](http://www.torontopubliclibrary.ca/search.jsp?N=37918+38758).

## Regenerating the branch information

`insert-visualize-link-user.js' has a hard-coded list of library branches and coordinates
in order to avoid running into geolocation limits. To recreate this list if the library adds new branches, get the 
[KML for the branch locations](http://www.torontopubliclibrary.ca/data/library-data.kml) and run something similar to the Javsacript below.

    var fs = require('fs'), cheerio = require('cheerio');
    function makeBranchID(name) {
      return name.toLowerCase().replace(/[^A-Za-z]/g, '');
    }
    function convertBranchKMLToGeoJSON(filename) {
      var list = [];
      var data = fs.readFileSync(filename);
      var $ = cheerio.load(data);
      $('Placemark').each(function() {
        var info = {
          key: makeBranchID($(this).find('name').text()),
          name: $(this).find('name').text(),
          address: $(this).find('address').text(),
          phone:  $(this).find('phoneNumber').text(),
          id: $(this).attr('id')
        };
        list.push({type: 'Feature',
                   geometry: {
                     type: 'Point',
                     coordinates: $(this).find('coordinates').text().split(/,/).map(
                       function(x) {
                         return x && parseFloat(x);
                       })
                   },
                   properties: info
                  });
      });
      return {type: 'FeatureCollection', features: list};
    }

## Testing

1. `npm install bower -g` to install bower system-wide.
2. `bower install` to install Jasmine.
3. Open `spec_runner.html` in your browser.

## Released under the MIT license

Copyright (c) 2015 Sacha Chua

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

