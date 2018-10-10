var CONSOLE_LOG_ID = '[DB-HELPER]';
/**
 * Common database helper functions.
 */

// import idb from 'idb';

const dbPromise = idb.open('udacity-mws', 1, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('restaurants', {keyPath: 'id'});
      break;
  }
});


class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 9000; // Change this to your server port
    return `http://localhost:${port}/data/restaurants.json`;

  }

  static get REMOTE_DATABASE_URL() {
    const port = 1337; // Change this to your server port
    return `http://localhost:${port}/restaurants`;

  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    let FUCNTION_ID = ' id #1 ';
    let FUCNTION_DESC = 'fetchRestaurants';
    fetch(DBHelper.REMOTE_DATABASE_URL)
      .then(response => {
        return response.json(); 
      })
      .then(restaurants => {
          console.log(FUCNTION_ID, FUCNTION_DESC, '#1', restaurants);
          callback(null, restaurants);  
        })
      .catch (error => {
          console.log(FUCNTION_ID, FUCNTION_DESC, error);
        });
      console.log(FUCNTION_ID, FUCNTION_DESC,'#2', restaurants);
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants;
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`/img/${restaurant.photograph}`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    // https://leafletjs.com/reference-1.3.0.html#marker
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng], {
      title: restaurant.name,
      alt: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant)
    });
    marker.addTo(newMap);
    return marker;
  }

  static addRestaurantsIdb() {
    // Fetch data from remote server
    // Put data into an array or object
    fetch(DBHelper.REMOTE_DATABASE_URL).then(response => {return response.json(); }).then(restaurants => {
      console.trace('[addRestaurantsIdb Trace]', restaurants);
       dbPromise.then(function(db) {
        var transaction = db.transaction('restaurants', 'readwrite');
        var objstore = transaction.objectStore('restaurants');
        for ( let i = 0; i < restaurants.length; i++) {
          objstore.put(restaurants[i]);
      }
        return transaction.complete;
      });
    })
    .catch (error => {
      console.trace('[addRestaurantsIdb Trace Error]', error);
    });

/*     var remoteData = restaurants;
    console.log('[remoteData]', remoteData);
    console.log('[remoteData]', restaurants);
 */
    // Create transaction
    // go through data and place in IDB
  }

  /* static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  } */
}
/* TODO: check for Conditional Ternary Operator http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#ternary-operator */

/* TODO: Use comments to explain code: What does it cover, what purpose does it serve, and why is the respective solution used or preferred? Try JSDoc. */
