$(document).ready(function () {
  // Your code will go here
  const amenityIds = [];

  // Listen for changes on input checkboxes
  $('input[type="checkbox"]').change(function () {
    // Get the data attributes from the checkbox
    const amenityId = $(this).data('id');

    // Check if the checkbox is checked or unchecked
    if ($(this).is(':checked')) {
      // Add Amenity ID to the list if checked
      amenityIds.push(amenityId);
    } else {
      // Remove Amenity ID from the list if unchecked
      const index = amenityIds.indexOf(amenityId);
      if (index !== -1) {
        amenityIds.splice(index, 1);
      }
    }

    // Update the h4 tag with the list of checked amenities
    const amenitiesText = amenityIds.map(function (id) {
      return $('input[data-id="' + id + '"]').data('name');
    }).join(', ');

    // Update the h4 tag
    $('.amenities h4').text(amenitiesText);
  });
});

function updateApiStatus () {
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
    // Check if the status is "OK"
    if (data.status === 'OK') {
      // If it's "OK", add the "available" class
      $('div#api_status').addClass('available');
    } else {
      // Otherwise, remove the "available" class
      $('div#api_status').removeClass('available');
    }
  });
}
updateApiStatus();
