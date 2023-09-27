$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    const amenitiesText = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(amenitiesText);
  });

  const apiUrlStatus = 'http://127.0.0.1:5001/api/v1/status/';
  const updateApiStatus = () => {
    $.ajax({
      type: 'GET',
      url: apiUrlStatus,
      success: (data) => {
        const apiStatusElement = $('#api_status');
        if (data.status === 'OK') {
          apiStatusElement.addClass('available');
        } else {
          apiStatusElement.removeClass('available');
        }
      },
      error: () => {
        console.error('Error fetching API status.');
      }
    });
  };

  const apiUrlPlacesSearch = 'http://127.0.0.1:5001/api/v1/places_search/';
  const updatePlaces = (amenities) => {
    $.ajax({
      type: 'POST',
      url: apiUrlPlacesSearch,
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      success: (data) => {
        displayPlaces(data);
      },
      error: () => {
        console.error('Error loading places.');
      }
    });
  };

  const displayPlaces = (places) => {
    const placesSection = $('.places');
    placesSection.empty();

    places.forEach(place => {
      const article = $('<article></article>');
      article.html(`
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
        </div>
        <div class="description">${place.description}</div>
      `);
      placesSection.append(article);
    });
  };

  updateApiStatus();
  updatePlaces(selectedAmenities);

  $('button').click(function () {
    updatePlaces(selectedAmenities);
  });
});