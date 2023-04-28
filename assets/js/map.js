jQuery(function ($) {
    // Asynchronously Load the map API
    var script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
  });
  
  function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {

      mapTypeId: 'roadmap'

    };
  
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
  
    // Multiple Markers
    var markers = [  ["Location 1", 11.2464, 76.3425],
    ["Location 2",10.823044, 77.019425],
    ["Location 3",10.823342, 77.019320],
    ["Location 4",10.823736, 77.018904],
    ["Location 5",10.823621, 77.018706],
    ["Location 6",10.823078, 77.019661],
    ["Location 7",10.823457, 77.019543]
  ];
  
    // Info Window Content
    var infoWindowContent = [
      [
        '<div class="info_content">' +
          "<h3>Stall 1</h3>" +
          "<p>Stall name:</p>" +
          "<p>recipes:</p>" +
          "<p>Vist: <a href='pay.html'>Click here</a></p>" +
        "</div>"
      ],
      [
        '<div class="info_content">' +
          "<h3>Stall 2</h3>" +
          "<p>Stall name:</p>" +
          "<p>recipes:</p>" +
          "<p>owner name:</p>" +
          "</div>"
      ],
      [
        '<div class="info_content">' +
          "<h3>Stall 3</h3>" +
          "<p>Name</p>" +
          "<p>recipes:</p>" +
          "<p>owner name:</p>" +
          "</div>"
      ],
      [
        '<div class="info_content">' +
          "<h3>Stall 4</h3>" +
          "<p>Stall name:</p>" +
          "<p>recipes:</p>" +
          "<p>owner name:</p>" +
          "</div>"
      ],
      [
        '<div class="info_content">' +
          "<h3>Stall 5</h3>" +
          "<p>Stall name:</p>" +
          "<p>recipes:</p>" +
          "<p>owner name:</p>" +
          "</div>"
      ],
      [
        '<div class="info_content">' +
          "<h3>Stall 6</h3>" +
          "<p>Stall name:</p>" +
          "<p>recipes:</p>" +
          "<p>owner name:</p>" +
          "</div>"
      ],
      [
        '<div class="info_content">' +
          "<h3>Stall 7</h3>" +
          "<p>Stall name:</p>" +
          "<p>recipes:</p>" +
          "<p>owner name:</p>" +
          "</div>"
      ]
    ];
  
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(),
      marker,
      i;
  
    // Loop through our array of markers & place each one on the map
    for (i = 0; i < markers.length; i++) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0]
      });
  
      // Allow each marker to have an info window
      google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
          return function () {
            infoWindow.setContent(infoWindowContent[i][0]);
            infoWindow.open(map, marker);
          };
        })(marker, i)
      );
  
      // Automatically center the map fitting all markers on the screen
      map.fitBounds(bounds);
    }
  
    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener(
      map,
      "bounds_changed",
      function (event) {
        this.setZoom(7);
        google.maps.event.removeListener(boundsListener);
      }
    );
  }
  