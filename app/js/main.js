let restaurants,
    userReviews,
    neighborhoods,
    cuisines;
var newMap;
var markers = [];

/**
 * @description Fetch neighborhoods and cuisines as soon as the page is loaded.
 * @summary
 * @param {object} event - A DOM mutation event type to listen for
 * @returns {null}
 */

document.addEventListener('DOMContentLoaded', (event) => {
    initMap(); // added
    fetchNeighborhoods();
    fetchCuisines();
    DBHelper.addRestaurantsIdb();

});

/**
 * @description Fetch all neighborhoods and set their HTML.
 * @summary
 * @param {null}
 * @returns {null}
 */

fetchNeighborhoods = () => {
    DBHelper.fetchNeighborhoods()
      .then ((neighborhoods) => {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    });
};

/**
 * @description Set neighborhoods HTML.
 * @summary
 * @param  {object} neighborhoods - from data file
 * @returns {object} option - populates option DOM element
 */

fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
};

/**
 * @description Fetch all cuisines and set their HTML.
 * @summary
 * @param {object} error
 * @param {object} cuisines - from data file
 * @returns {object} self.cuisines
 */

fetchCuisines = () => {
  if (!self.restaurants) {
    DBHelper.fetchCuisines()
      .then((cuisines)  => {
        console.log('Main.fetchCuisines.cuisines', cuisines);
        self.cuisines = cuisines;
        fillCuisinesHTML();
      });
  }
};

/**
 * @description Set cuisines HTML.
 * @summary
 * @param {object} cuisines
 * @returns none - Updated DOM element
 */

fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
};

/**
 * @description Initialize leaflet map, called from HTML.
 * @summary
 * @param {null}
 * @returns {object} self.newMap - Updates global variable
 */

initMap = () => {
  console.log('Entering initMap');
  self.newMap = L.map('map', {
    center: [40.722216, -73.987501],
    zoom: 12,
    scrollWheelZoom: false
  });
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
    mapboxToken: 'pk.eyJ1IjoibmF0aXZlbmV3eW9ya2VyIiwiYSI6ImNqazhzMWxxMTF0ODIzdm5jZ2NnamR3eG8ifQ.Dfx6pjS78w1T73PxRlM8Iw',
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(newMap);

updateRestaurants();

};


/**
 * @description Update page and map for current restaurants.
 * @summary
 * @param {null}
 * @returns {null}
 */

updateRestaurants = () => {
  console.log('entering updateRestaurants');
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;
console.log('updateRestaurants cuisine', cuisine);
console.log('updateRestaurants neighborhood', neighborhood);
  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood)
  .then((restaurants)  => {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
  });
};

/**
 * @description Clear current restaurants, their HTML and remove their map markers.
 * @summary
 * @param {object} restaurants - from data file
 * @returns {object} self.restaurants - Updates global variable
 */

resetRestaurants = (restaurants) => {
  // Remove all restaurants
  console.log('entering resetRestaurants function');
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  if (self.markers) {
    self.markers.forEach(marker => marker.remove());
  }
  self.markers = [];
  self.restaurants = restaurants;
};

/**
 * @description Create all restaurants HTML and add them to the webpage.
 * @summary
 * @param {object} restaurants - from data file
 * @returns {object} none - updates DOM element
 */

fillRestaurantsHTML = (restaurants = self.restaurants) => {
  console.log('entering fillRestaurantsHTML function');

  const ul = document.getElementById('restaurants-list');

  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });

  addMarkersToMap();
};

/**
 * @description Create restaurant HTML.
 * @summary
 * @param {object} restaurant - from data file
 * @returns none - Updates DOM elements
 */

createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');

  const image = document.createElement('img');
  image.className = 'restaurant-img';
  // image.src = DBHelper.imageUrlForRestaurant(restaurant);
  const FILENAME = DBHelper.imageUrlForRestaurant(restaurant);
  // let fileName = FILENAME.slice (0, -4);
  let fileSmall = FILENAME + '-sm.jpg 1x';
  let fileLarge = FILENAME + '-med.jpg 2x, ';
  let sourceSet = fileLarge + fileSmall;
  // console.log('Filenames are ' + fileSmall + ' and ' + fileLarge + 'srcset: ' + sourceSet);
  image.src = FILENAME + '-sm.jpg';
  image.setAttribute('srcset', sourceSet);
  image.alt = restaurant.name;
  li.setAttribute('role', 'listitem');
  li.append(image);

  let favoriteStatus = '';
  const SPACER = ' ';

  if (restaurant.is_favorite == false || restaurant.is_favorite == 'false' || restaurant.is_favorite == undefined ) {
    favoriteStatus = 'Not a Favorite';
    const ICON_NOT_FAVORITE = '&#x2661';
    restaurant.favIcon = ICON_NOT_FAVORITE;
  } else {
    favoriteStatus = 'Is a Favorite';
    const ICON_FAVORITE = '&#x1F9E1';
    restaurant.favIcon = ICON_FAVORITE;
  }

  const FAVORITE_MESSAGE = restaurant.favIcon + SPACER + favoriteStatus;

  const name = document.createElement('h2');

  name.innerHTML = restaurant.name + ', ' + FAVORITE_MESSAGE;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a');
  more.setAttribute('role', 'button');
  const ariaLabelText = 'View Details for the ' + restaurant.name + ' restaurant';
  more.setAttribute('aria-label', ariaLabelText);
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  li.append(more);

  return li;

};

/**
 * @description Add markers for current restaurants to the map.
 * @summary
 * @param {object} restaurants - from data file
 * @returns {object} self.markers - Updates global variable
 */

addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.newMap);
    marker.on('click', onClick);

    function onClick() {
      window.location.href = marker.options.url;
    }
    self.markers.push(marker);
  });

};
