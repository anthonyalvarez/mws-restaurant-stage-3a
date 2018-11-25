
/**
 * Common database helper functions.
 */

const dbPromise = idb.open('udacity-mws', 1, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 0:

    console.log('Case 1: creating restaurant IDB');
    upgradeDB.createObjectStore('restaurants', {keyPath: 'id'});

    console.log('Case 2: creating reviews IDB');
    const reviewStorage = upgradeDB.createObjectStore('reviews', {keyPath: 'id'});
    reviewStorage.createIndex('restaurant_id', 'restaurant_id', {unique:false} );

    console.log('Case 3: Creating Offline reviews IDB');
    upgradeDB.createObjectStore('offline-reviews', {keyPath: 'id'});

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
        .then(restaurants => {
          restaurants.json();
          callback(null, restaurants);
        })
        .catch (error => {
          console.log(FUCNTION_ID, FUCNTION_DESC, error);
          callback(error, null);
        });

  }

/**
 * @description - read all restaturants from IDB
 * @param {null}
 * @returns {Array} of restaurant objects
 * @summary
 */

static idbFetchRestaurants(){
  return dbPromise.then (function(db){
    var tx = db.transaction(['restaurants'], 'readonly');
    var store = tx.objectStore('restaurants');
    var dataSet = store.getAll();
    console.trace('idbFetchRestaurants  = ', store.getAll());
  })
  .then((response)=> {
    if (typeof response === 'undefined' || response.length === 0 ) {
      // console.log('store.getAll()=', response);
      // throw new Error('L.107 response.length === 0');
      return fetch(DBHelper.REMOTE_DATABASE_URL)
      .then((response) => {
        if (!response.ok){
          throw Error('L113 API Server' + response.statusText);
        } else {
        // save to IDB.
        return response.json();
        }
      })
      .catch((err)=> {
        throw new Error('L.110 API response.length === 0');
      })
    } else {
      return response;
    }
  })
  .catch((err)=>{
    console.log('L.114', err);
    throw new Error('idbFetchRestaurants(): IDB empty, load from API server.');
  });
}

  /**
   * Fetch a restaurant by its ID.
   * @description Fetch a restaurant by its ID number
   * @param {number} Restaurant ID
   * @returns {object} Restaurant Object
   */

static fetchRestaurantById(id) {
  // fetch all restaurants with proper error handling.
  if (!restaurant) {
    return DBHelper.idbFetchRestaurants()
    .then(function(response){
      console.log('fetchRestaurantById', response);
      const restaurant = response.find(r => r.id == id);
      if (restaurant) {
        return restaurant;
      } else {
        return null;
      }
    })
    .catch (function(error){
      console.log(error);
      return error;
    });
  }
}


  /**
   * @params {number} Restaurant ID
   * @returns {object} Reviews
   * @description Searches Reviews from IDB index.
   */

static fetchReviewsByResturantId(id, callback) {
  console.log('Function: fetchReviewsByResturantId and parameter ID', id);
  dbPromise.then (function(db){
    var tx = db.transaction(['reviews'], 'readonly');
    var store = tx.objectStore('restaurant_id');
    return store.get(id);
  })
  .then(reviews => {
    console.log( 'L94 These are reviews sent back', reviews);
    callback(null, results);
  })
  .catch (error => {
      console.log( 'L98 this is error' , error);
    });

}


  /**
   * Fetch restaurants by a cuisine type with proper error handling.
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

static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
  // Fetch all restaurants
  if (!self.restaurants) {
    return DBHelper.idbFetchRestaurants()
      .then((response) => {
        const data = response;
        let results = data;

        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }

        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }

        return results;
      })
      .catch((error)=>{
        console.log('fetchRestaurantByCuisineAndNeighborhood.DBHelper.idbFetchRestaurants', error);
        return error;
        });
    // end if
  } else {
    let results = self.restaurants;

        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }

        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }

        return results;
  }
}


  /**
   * Fetch all neighborhoods with proper error handling.
   */

   static fetchNeighborhoods() {
  // Fetch all restaurants
  return DBHelper.idbFetchRestaurants()
  .then(function(restaurants){
    // if restaurants undefined, fetch from API
    // if (typeof image_array !== 'undefined' && image_array.length > 0)
    // typeof restaurants === 'undefined' && restaurants.length = 0
    if (typeof restaurants === 'undefined') {
      console.log('restaurants=', restaurants)
      throw new Error('No restaurants. IDB empty, load from API server.');
      } else {
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);
        console.log('fetchNeighborhoods returns =',uniqueNeighborhoods);
        return uniqueNeighborhoods;
      }
  });
}


  /**
   * Fetch all cuisines with proper error handling.
   */

   static fetchCuisines() {
  // Fetch all restaurants
  if (!self.restaurants) {
    return DBHelper.idbFetchRestaurants()
    .then((response) => {
      const data = response;
      console.log('DBHelper.fetchCuisines data, ',data);
        // Get all cuisines from all restaurants
        const cuisines = data.map((v, i) => data[i].cuisine_type);
        console.log('DBHelper.fetchCuisines cuisines, ',cuisines);
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);
        console.log('DBHelper.fetchCuisines uniqueCuisines, ',uniqueCuisines);
        return uniqueCuisines;
      });
  // end if
  } else {
    const data = self.restaurants;
    console.log('DBHelper.fetchCuisines data, ',data);
    // Get all cuisines from all restaurants
    const cuisines = data.map((v, i) => data[i].cuisine_type);
    console.log('DBHelper.fetchCuisines cuisines, ',cuisines);
    // Remove duplicates from cuisines
    const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);
    console.log('DBHelper.fetchCuisines uniqueCuisines, ',uniqueCuisines);
    return uniqueCuisines;
  }
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
/**
 * @description Get all restaurant objects from API and save to IDB
 * @summary Used in DBHeler.js only. requires IDB database to exist
 * @param {null}
 * @returns {Array} of saved restaurant objects to IDB
 */

 static addRestaurantsIdb() {
    fetch(DBHelper.REMOTE_DATABASE_URL).then(response => {return response.json(); }).then(restaurants => {
      self.restaurants = restaurants;
      console.trace('[addRestaurantsIdb Trace] restaurants =', restaurants);
      console.log('self.restaurants = ', self.restaurants);
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


/**
 * @description Returns restaurant reviews from API server
 * @param {number} is a restaurant_id
 * @returns {array} of review objects from API
 */

  static addReviewsIdb(restaurant_id) {
    const ENDPOINT_REVIEWS = DBHelper.REMOTE_REVIEWS_DB_URL + '/?restaurant_id='+ restaurant_id;
    return fetch(ENDPOINT_REVIEWS)
    .then(response => {
      return response.json();
    })
    .then(reviews => {
      console.trace('[addReviewsIdb Trace]', reviews);
      return reviews;
    });
  }


/**
 * @description Save reviews to IDB
 * @summary NOT USED YET, at all
 * @param {array} of review objects
 * @returns {null}
 */
  static idbSaveReviews(reviews){
    dbPromise.then(function(db) {
    const tx = db.transaction('reviews', 'readwrite');
    const myStorage = tx.objectStore('reviews');

    for ( let i = 0; i < reviews.length; i++) {
      console.log('putIdbReviews',reviews[i] );
      myStorage.put(reviews[i]);
      }

    return tx.complete;
    });

  }

/**
 * @description get reviews from IDB
 * @summary NOT USED in restaurant_info.js, but in DBHelper.js: addReviewsIdb()
 * @param {number} of restaurant id
 * @returns {array} of reviews from IDB
 */

static getIdbRestaurantReviews(id) {
  const DEBUG_MODE = false;
  if (DEBUG_MODE) {
    console.log('Inside Function: getIdbRestaurantReviews, value of ID is: ', id);
  }
   dbPromise.then(db => {
    const transaction = db.transaction(['reviews'], 'readonly');
    const objStore = transaction.objectStore('reviews');
    const storeIndex = objStore.index('restaurant_id');
    const RESTAURANT_ID = Number(id);
    return storeIndex.getAll(RESTAURANT_ID)
    .then(function(response) {
      let userComments = response;
      if (userComments.length === 0) {
        console.log('no reviews found in IDB');
        console.log('Calling addReviewsIdb with: ', RESTAURANT_ID);
        return DBHelper.addReviewsIdb(RESTAURANT_ID);
        } else {
 console.log('exiting getIdbRestaurantReviews: userComments= ', userComments );
            return userComments;
        }
      console.log('exiting getIdbRestaurantReviews', response);
      return response;
    });
});
}

/**
 * @description Checks Reviews IDB to determine if records exist.
 * @param {Number} id
 * @returns {Boolean}
 * @summary
 */

static idbCheckReviewStatus(id) {
  const DEBUG_MODE = false;
  if (DEBUG_MODE) {
    console.log('getIdbRestaurantReviews param=: ', id);
  }
  return dbPromise.then(db => {
    const storeIndex = db.transaction('reviews').objectStore('reviews').index('restaurant_id');
    return storeIndex.getAll(id);

  })
  .then(response => {
      return response;
  })
  .catch(err => {

  });
}

// end class DBHelper
}
