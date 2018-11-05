var CONSOLE_LOG_ID = '[DB-HELPER]';

/**
 * Common database helper functions.
 */

const dbPromise = idb.open('udacity-mws', 4, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('restaurants', {keyPath: 'id'});
      const reviewStorage = upgradeDB. createObjectStore('reviews', {keyPath: 'id'});
      reviewStorage.createIndex('restaurant_id', 'restaurant_id', {unique:false} );
      break;
    }
  });


class DBHelper {

   static get REMOTE_DATABASE_URL() {
    const port = 1337; // Change this to your server port
    return `http://localhost:${port}/restaurants`;

  }

  static get REMOTE_REVIEWS_DB_URL() {
    const port = 1337; // Change this to your server port
    return `http://localhost:${port}/reviews`;

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
      console.log(FUCNTION_ID, FUCNTION_DESC,'#2', 'restaurants');
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
   * @params - Three (3): database name, object store name
   * @returns -  none
   * @description - Read Data
   */

  static fetchReviewsByResturantId(id, callback) {
    dbPromise.then (function(db){
      var tx = db.transaction(['reviews'], 'readonly');
      var store = tx.objectStore('reviews');
      return store.get('id');
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
    if (restaurant.photograph) {
      return (`/img/${restaurant.photograph}`);
    }
    return `/img/${restaurant.id}`;
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
  }

static addReviewsIdb() {
  // debugger;
  // Fetch data from remote server
  // Put data into an array or object
  fetch(DBHelper.REMOTE_REVIEWS_DB_URL).then(response => {
    userReviews =response.json(); 
    // return response.json(); 
    return userReviews;
  }).then(reviews => {
    console.trace('[addReviewsIdb Trace]', reviews);
      dbPromise.then(function(db) {
      const tx = db.transaction('reviews', 'readwrite');
      const myStorage = tx.objectStore('reviews');
      for ( let i = 0; i < reviews.length; i++) {
        myStorage.put(reviews[i]);
    }
      return tx.complete;
    });
  })
  .catch (error => {
    console.trace('[addReviewsIdb Trace Error]', error);
  });
}


}

/* TODO: Use comments to explain code: What does it cover, what purpose does it serve, and why is the respective solution used or preferred? Try JSDoc. */
