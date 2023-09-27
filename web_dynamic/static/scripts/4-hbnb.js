$(document).ready(function () {
  const selectedAmenities = {};

  // Listen for changes on input checkboxes
  $('input[type=checkbox]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if (this.checked) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    $('#selected_amenities').text(Object.values(selectedAmenities).join(', '));
  });

  const apiUrlStatus = 'http://127.0.0.1:5001/api/v1/status/';

  const updateApiStatus = () => {
    fetch(apiUrlStatus)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      })
      .catch(() => {
        $('#api_status').removeClass('available');
      });
  };

  const apiUrlPlacesSearch = 'http://127.0.0.1:5001/api/v1/places_search/';

  const updatePlaces = (amenities) => {
    fetch(apiUrlPlacesSearch, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amenities: Object.keys(amenities) })
    })
      .then((response) => response.json())
      .then((data) => {
        // Triez le tableau 'data' par ordre alphabétique en fonction du nom de chaque place
        data.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        displayPlaces(data);
      })
      .catch(() => {
        console.error('Error loading places.');
      });
  };

  const displayPlaces = (places) => {
    const placesSection = $('.places');
    placesSection.empty();
    places.forEach((place) => {
      const article = $('<article></article>');
      article.append(`<div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                      </div>
                      <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                      </div>
                      <div class="description">${place.description}</div>`);
      placesSection.append(article);
    });
  };

  updateApiStatus();
  updatePlaces(selectedAmenities);

  $('button').click(() => {
    updatePlaces(selectedAmenities);
  });
});
