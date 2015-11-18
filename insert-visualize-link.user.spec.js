describe('getBranchInfo', function() {
  it('should return branch coordinates as GeoJSON', function() {
    // expect(getBranchInfo('Agincourt').coordinates).toNotBe(null);
    var info = getBranchInfo('Agincourt', getBranches());
    expect(info.properties.name).toBe('Agincourt');
    expect(info.geometry.coordinates.length).toBe(2);
  });
});
describe('extractBranchResults', function() {
  it('should create a GeoJSON with the number of results', function() {
    var info = getBranchInfo('North York Central Library', extractBranchResults());
    expect(info.properties.count).toBe(35);
    expect(info.properties.scaledCount).toBe(1);
     info = getBranchInfo('Annette Street', extractBranchResults());
    expect(info.properties.count).toBe(23);
    expect(info.properties.scaledCount).toBeLessThan(1);
  });
});
describe('addMap', function() {
  it('should create the map', function(done) {
    var waitForInit = function() {
      var w = window;
      if (typeof w.google == 'undefined' || typeof w.google.maps == 'undefined') {
        window.setTimeout(waitForInit, 100);
      } else {
        window.setTimeout(function() {
          expect(document.querySelector('#map').children.length).toBeGreaterThan(0);
          done();
        }, 500);
      }
    };
    addMap();
    waitForInit();
  });
});
