var library = require('../api/library');
var fs = require('fs');
var q = require('q');
var rp = require('request-promise');

describe('getBranchInfoFromURL', function() {
  it('caches the results of scraped html', function(done) {
    var url = 'http://www.torontopubliclibrary.ca/search.jsp?N=38763+37751+20206+38756';
    q(library.getBranchInfoFromURL(url)).then(function(info) {
      var agincourt = info.features.filter(function(x) {
        return x.properties.name == 'Agincourt';
      });
      expect(agincourt[0].properties.count).toBe(20);
      var info = JSON.parse(fs.readFileSync(library.makeFilename(url)));
      agincourt = info.features.filter(function(x) {
        return x.properties.name == 'Agincourt';
      });
      expect(agincourt[0].properties.count).toBe(20);
      done();
    });
  });
  /*  it('scales count', function(done) {
    var url = 'http://www.torontopubliclibrary.ca/search.jsp?N=38763+37751+20206+38756';
    console.log('DEBUG: 1', url);
    q(library.getBranchInfoFromURL(url)).then(function(info) {
      for (var i = 0; i < info.features.length; i++) {
        var f = info.features[i];
        console.log(f.properties.count, f.properties.scaledCount);
      }
      done();
    }).catch(function(err) {
      console.log('DEBUG: 3', err);
      done();
    });
  }); */
});
/*
describe('getBranchInfo', function() {
  it('works with scraped html', function(done) {
    rp.get('http://www.torontopubliclibrary.ca/search.jsp?N=38763+37751+20206+38756').then(function(a) {
      library.getBranchInfo(a).then(function(info) {
        var agincourt = info.features.filter(function(x) {
          return x.properties.name == 'Agincourt';
        });
        expect(agincourt[0].properties.count).toBe(20);
        done();
      });
    }).catch(function(err) {
      console.log('DEBUG: 4', err);
      done();
    });
  });
  it('returns the branch info as geoJSON', function(done) {
    library.getBranchInfo(fs.readFileSync(__dirname + '/../data/videos.html')).then(function(info) {
      console.log('DEBUG: 27', info);

      var agincourt = info.features.filter(function(x) {
        return x.properties.name == 'Agincourt';
      })[0];
      expect(agincourt.properties.count).toBe(1882);
      expect(agincourt.properties.href).toNotBe(null);
      done();
    });
  });
});

/*
describe('extractInfoFromRSS', function() {
  it('returns info', function(done) {
    q(library.extractInfoFromRSS(fs.readFileSync(__dirname + '/../data/rss.xml'))).then(function(data) {
      console.log(data);
      done();
    });
  });
});

describe('getBranches', function() {
  it('returns branch info', function(done) {
    q(library.getBranches()).then(function(branches) {
      expect(branches['torontoreferencelibrary'].address).toMatch(/Yonge/);
      done();
    });
  });
});

/**/
