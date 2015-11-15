var fs = require('fs');
var cheerio = require('cheerio');
var csv = require('fast-csv');
var q = require('q');
var rp = require('request-promise');

var cacheDir = __dirname + '/../cache/';

function makeFilename(url) {
  return cacheDir + url.replace(/[^\.+A-Za-z0-9]/g, '_');
}
exports.makeFilename = makeFilename;

function getBranchInfoFromURL(url) {
  var filename = makeFilename(url);
  try {
    // TODO: Check modification time
    return JSON.parse(fs.readFileSync(filename));
  } catch (err) {
    // Not yet cached
    if (err.code == 'ENOENT') {
      return rp({url: url, timeout: 12000}).then(function(contents) {
        return q(getBranchInfo(contents)).then(function(info) {
          // Cache information to file
          fs.writeFileSync(filename, JSON.stringify(info));
          return info;
        });
      });
    } else {
      throw err;
    }
  }
}
exports.getBranchInfoFromURL = getBranchInfoFromURL;

function getBranchInfo(contents) {
  return q(getBranches()).then(function(branches) {
    var list = [];
    var maxCount = 0;
    var $ = cheerio.load(contents);
    $('#refinements-library_branch .refinement').each(function() {
      var branch = $(this).find('.notranslate').text().replace(/^[ \t\r\n\u00a0]+|[ \t\r\n\u00a0]+$/g, '');
      var count = parseInt($(this).find('.ref-count').text().replace(/^[ \t\r\n\u00a0]+|[ \t\r\n\u00a0]+$/g, '').replace(/[,\(\)]/g, ''));

      var info = branches[makeBranchID(branch)];

      if (info) {
        var feature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: info && info.coordinates.split(/,/).map(
              function(x) {
                return x && parseFloat(x);
              })
          },
          properties: {
            name: branch,
            info: info,
            count: count,
            href: $(this).find('a').attr('href')
          }};
        if (count > maxCount) { maxCount = count; }
        list.push(feature);
      }
    });
    for (var i = 0; i < list.length; i++) {
      list[i].properties.scaledCount = list[i].properties.count * 1.0 / maxCount;
    }
    return {type: 'FeatureCollection', features: list}
  });
}
exports.getBranchInfo = getBranchInfo;

function makeBranchID(name) {
  return name.toLowerCase().replace(/[^A-Za-z]/g, '');
}

function getBranches() {
  var list = {};
  var data = fs.readFileSync(__dirname + '/../data/library-data.kml');
  var $ = cheerio.load(data);
  $('Placemark').each(function() {
    var info = {
      name: $(this).find('name').text(),
      address: $(this).find('address').text(),
      phone:  $(this).find('phoneNumber').text(),
      coordinates: $(this).find('coordinates').text()
    };
    list[makeBranchID(info.name)] = info;
  });
  return list;
}
exports.getBranches = getBranches;

// p_notes_summary, p_numCopies, p_numHolds, p_pub_date_sort, p_record_id, p_title_full, p_upc, Library Branch, Item Holdable
function extractInfoFromRSS(contents) {
  var list = [];
  var $ = cheerio.load(contents);
  $('item').each(function() {
    var item = {};
    var o = $(this);
    ['p_notes_summary', 'p_numCopies', 'p_numHolds', 'p_pub_date_sort',
     'p_record_id', 'p_title_full', 'p_upc', 'Item Holdable'].map(function(key) {
       item[key] = o.find('attr[name="' + key + '"]').text();
     });
    item.branches = [];
    o.find('attr[name="Library Branch"]').each(function() {
      item.branches.push($(this).text());
    });
    list.push(item);
  });
}
exports.extractInfoFromRSS = extractInfoFromRSS;
