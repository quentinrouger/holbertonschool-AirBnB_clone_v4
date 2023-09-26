$(document).ready(function() {
  // Your code will go here
  let amenityIds = [];

  // Listen for changes on input checkboxes
  $('input[type="checkbox"]').change(function() {
    // Get the data attributes from the checkbox
    let amenityId = $(this).data('id');
    let amenityName = $(this).data('name');

    // Check if the checkbox is checked or unchecked
    if ($(this).is(':checked')) {
        // Add Amenity ID to the list if checked
        amenityIds.push(amenityId);
    } else {
        // Remove Amenity ID from the list if unchecked
        let index = amenityIds.indexOf(amenityId);
        if (index !== -1) {
            amenityIds.splice(index, 1);
        }
    }

    // Update the h4 tag with the list of checked amenities
    let amenitiesText = amenityIds.map(function(id) {
        return $('input[data-id="' + id + '"]').data('name');
    }).join(', ');

    // Update the h4 tag
    $('.amenities h4').text(amenitiesText);
  });
});
