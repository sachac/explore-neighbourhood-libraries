var map;
var data;

function initialize() {
  var mapOptions = {
    zoom: 12,
    center: {lng: -79.38676296296297, lat: 43.671737037037005},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map'),
                            mapOptions);
  map.data.setStyle(function(feature) {
    var numItems = feature.getProperty('count');
    var branch = feature.getProperty('name');
    return {
      icon: getCircle(feature)
    };
  });
  var query = location.href.match(/\?url=(.*)/);
  var infowindow = new google.maps.InfoWindow({
    content: '',
  });
  map.data.loadGeoJson('/api/branchinfo?url=' + encodeURIComponent(query ? query[1] : ''));
  map.data.addListener('mouseover', function(event) {
    var branch = event.feature.getProperty('name');
    var count = event.feature.getProperty('count');
    var address = event.feature.getProperty('info').address;
    var href = event.feature.getProperty('href');
    infowindow.setPosition(event.latLng);

    infowindow.setContent(
      '<strong>' + count + (count == 1 ? ' item' : ' items')
        + '</strong> at ' + branch + '<br />' + address + '<br/>'
        + '<a href="http://www.torontopubliclibrary.ca' + href + '">View search results</a>');
    infowindow.open(map);
  });
  map.data.addListener('click', function(event) {
    var branch = event.feature.getProperty('name');
    var count = event.feature.getProperty('count');
    var address = event.feature.getProperty('info').address;
    var href = event.feature.getProperty('href');
    window.location.href = 'http://www.torontopubliclibrary.ca' + href;
  });
}


function getCircle(item) {
  if (item.getProperty('count') > 0) {
    var circle = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'orange',
      fillOpacity: Math.log10(item.getProperty('count')) / 6,
      // scale: item.getProperty('scaledCount') * 5,
      scale: item.getProperty('scaledCount') * 15 + 2,
      // scale: Math.log(item.getProperty('count')) + 1
      strokeColor: 'red',
      strokeWeight: 1
    };
    return circle;
  }
}


// Call the initialize function after the page has finished loading
google.maps.event.addDomListener(window, 'load', initialize);

