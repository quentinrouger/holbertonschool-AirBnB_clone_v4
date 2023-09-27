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

// Make the POST request to the API
fetch('http://127.0.0.1:5001/api/v1/places_search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({}) // Send an empty JSON object
})
  .then((response) => response.json())
  .then((data) => {
    const placesSection = document.querySelector('.places');

    // Loop through the list of Place objects
    data.forEach((place) => {
      // Create an <article> tag for each Place
      const article = document.createElement('article');

      // Populate the <article> tag with Place information
      article.innerHTML = `
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${
        place.max_guest !== 1 ? 's' : ''
      }</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${
        place.number_rooms !== 1 ? 's' : ''
      }</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
        place.number_bathrooms !== 1 ? 's' : ''
      }</div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      `;

      // Append the <article> tag to the places section
      placesSection.appendChild(article);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
