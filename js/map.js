// Map setup moved to external JS file
// Uses Leaflet and CartoDB Positron tiles (no API key)
(function () {
    // Create the map
    var map = L.map('map', {
        center: [20.0, 10.0], // initial center (worldish), will fit markers
        zoom: 0,
        minZoom: 0,
        maxZoom: 18,
        // Disable user zooming to keep markers visually static during interactions
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false,
        // keep panning (dragging) disabled so the map is static
        dragging: false,
        // keyboard navigation left enabled for accessibility (arrow keys to pan)
        keyboard: true
    });

    // CartoDB Dark Matter (dark gray) tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/attributions">Carto</a> &mdash; &copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Offices list
    var offices = [
        {
            id: 'hyderabad',
            coords: [17.4197, 78.4024],
            title: 'India (Hyderabad, Jubilee Hills)',
            address: '555A, Road No. 28, Jubilee Hills, Hyderabad'
        },
        {
            id: 'newyork',
            coords: [40.7128, -74.0060],
            title: 'USA (New York)',
            address: '123 Main Street, New York, NY 10001'
        },
        {
            id: 'dubai',
            coords: [25.2048, 55.2708],
            title: 'UAE (Dubai)',
            address: '456 Sheikh Zayed Road, Dubai'
        }
    ];

    // Create a custom DivIcon HTML for marker
    function createPinHTML(id) {
        // Accessible label includes the office id (title will be in popup)
        return '\n        <div class="custom-pin" id="pin-' + id + '" tabindex="0" aria-hidden="false">\n            <div class="pin-pulse" aria-hidden="true"></div>\n            <div class="pin-ring" aria-hidden="true"></div>\n            <div class="pin-core" aria-hidden="true"></div>\n            <div class="pin-shadow" aria-hidden="true"></div>\n        </div>';
    }

    // Add markers
    var markers = [];
    offices.forEach(function (off) {
        var icon = L.divIcon({
            className: 'custom-div-icon',
            html: createPinHTML(off.id),
            iconSize: [44, 44],
            iconAnchor: [22, 44]
        });

        var marker = L.marker(off.coords, {
            icon: icon,
            draggable: true,
            title: off.title,
            keyboard: true
        }).addTo(map);

        // Bind accessible popup with exact address
        var popupContent = '<div role="dialog" aria-label="Office address"><h4>' + off.title + '</h4><div>' + off.address + '</div></div>';
        marker.bindPopup(popupContent, { closeButton: true, offset: [0, -10] });

        // On click: open popup and smoothly center marker
        marker.on('click', function (e) {
            // Smoothly fly the map to the marker, keep current zoom
            map.flyTo(e.latlng, Math.max(map.getZoom(), 5), { duration: 0.8 });
            marker.openPopup();
        });

        // When popup opens, set focus for accessibility
        marker.on('popupopen', function () {
            var px = map.project(marker.getLatLng());
            // small pan to ensure popup is visible on small screens
            map.panTo(marker.getLatLng(), { animate: true, duration: 0.4 });

            var popupEl = document.querySelector('.leaflet-popup-content');
            if (popupEl) popupEl.setAttribute('tabindex', '-1');
            if (popupEl) popupEl.focus();
        });

        // Keep pulsing while dragging; ensure marker element stays visible while dragging
        marker.on('dragstart', function () {
            // slightly enlarge ring while dragging to give feedback
            var el = document.getElementById('pin-' + off.id);
            if (el) el.style.transform = 'translate(-50%, -100%) scale(1.05)';
        });
        marker.on('dragend', function () {
            var el = document.getElementById('pin-' + off.id);
            if (el) el.style.transform = 'translate(-50%, -100%) scale(1)';
            // recenter map gently to dropped position
            map.flyTo(marker.getLatLng(), map.getZoom(), { duration: 0.6 });
        });

        markers.push(marker);
    });

    // Fit bounds to markers with padding for small screens
    var group = L.featureGroup(markers);
    map.fitBounds(group.getBounds(), { padding: [50, 50], maxZoom: 3 });

    // Make map accessible: allow keyboard panning via default Leaflet handlers
    // (Leaflet enables keyboard controls when the map container has focus). Add a visible focus outline.
    var mapEl = document.getElementById('map');
    mapEl.tabIndex = 0;
    mapEl.style.outline = 'none';
    // Scroll-wheel zoom remains disabled to prevent accidental zooming.

})();
