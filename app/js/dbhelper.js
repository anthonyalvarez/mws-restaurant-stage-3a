var CONSOLE_LOG_ID = '[DB-HELPER]';

/**
 * Common database helper functions.
 */

const dbPromise = idb.open('udacity-mws', 1, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 0:

    console.log('Case 1: creating restaurant IDB');
    upgradeDB.createObjectStore('restaurants', {keyPath: 'id'});

    console.log('Case 2: creating reviews IDB');
    const reviewStorage = upgradeDB.createObjectStore('reviews', {keyPath: 'id', autoIncrement: true});
    reviewStorage.createIndex('restaurant_id', 'restaurant_id', {unique:false} );

    console.log('Case 3: Creating Offline reviews IDB');
    upgradeDB.createObjectStore('offline-reviews', {keyPath: 'id', autoIncrement: true});

/*    case 1:
       console.log('Case 1: creating restaurant IDB');
      upgradeDB.createObjectStore('restaurants', {keyPath: 'id'});
    case 2:
      console.log('Case 2: creating restaurant IDB');
      const reviewStorage = upgradeDB.createObjectStore('reviews', {keyPath: 'id'});
      reviewStorage.createIndex('restaurant_id', 'restaurant_id', {unique:false} );
    case 3:
      console.log('Case 3: Creating Offline reviews IDB');
      const offlineReviewsStore = upgradeDB.createObjectStore('offline-reviews', {keyPath: 'id'});
 */

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
/*    let FUCNTION_ID = ' id #1 ';
    let FUCNTION_DESC = 'fetchRestaurants';
     fetch(DBHelper.REMOTE_DATABASE_URL)
      .then(response => {
        return response.json();
      })

      dbPromise.then (function(db){
        var tx = db.transaction(['restaurants'], 'readonly');
        var store = tx.objectStore('restaurants');
        /* tx.addEventListener('success', function(event){
          restaurants = this.result;  // store results in global variable
        });
        return store.getAll();
        })
       .then(restaurants => {
          console.log(FUCNTION_ID, FUCNTION_DESC, '#1', restaurants);
          callback(null, restaurants);
        })
      .catch (error => {
          callback('L56 error', null);
          console.log(FUCNTION_ID, FUCNTION_DESC, error);
        }); */
      // console.log(FUCNTION_ID, FUCNTION_DESC,'#2', 'restaurants');
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
        // console.log(FUCNTION_ID, FUCNTION_DESC,'#2', restaurants);

  }

/**
 * @description - read all restaturants from IDB
 * @param - none
 * @returns - {Array} of restaurant objects
 */
  static idbFetchRestaurants(){
    const DEBUG_MODE = false;
    return dbPromise.then (function(db){
      var tx = db.transaction(['restaurants'], 'readonly');
      var store = tx.objectStore('restaurants');

      if (DEBUG_MODE){
        console.log('idbFetchRestaurants output= ', store.getAll());
      }

      return store.getAll();
    });
  }

  /**
   * Fetch a restaurant by its ID.
   * @description Fetch a restaurant by its ID number
   * @param {number} Restaurant ID
   * @returns {object} Restaurant Object
   */
  static fetchRestaurantById(id) {
    const DEBUG_MODE = false;
    // fetch all restaurants with proper error handling.
    return DBHelper.idbFetchRestaurants()
    .then((response)=>{
      if (DEBUG_MODE){
      console.log('idbFetchRestaurants', response);
      }
      const restaurant = response.find(r => r.id == id);
      if (restaurant){
        return restaurant;
      } else {
        return null;
      }
    })
    .catch ((err)=>{
      throw new Error('DBHelper.fetchRestaurantById(id)' + err.message + '& restaurant=', restaurant);
    });
  }


  /**
   * @params {number} Restaurant ID
   * @returns {object} Reviews
   * @description Searches Reviews from IDB index.
   */

  static fetchReviewsByResturantId(id) {
    console.log('Function: fetchReviewsByResturantId and parameter ID', id);
    dbPromise.then (function(db){
      var tx = db.transaction(['reviews'], 'readonly');
      var store = tx.objectStore('reviews');
      var index = store.index('restaurant_id');
      // let restaurantReviews = index.getAll(id);
      // console.log( 'L95 These are reviews sent back', restaurantReviews);
      return index.getAll(id);
      // return restaurantReviews;
    })
    // .then(reviews => {
      // console.log( 'L94 These are reviews sent back', reviews);
      // console.log('reviews', reviews);
      // return reviews;
      // callback(null, reviews);
    // })
    .catch (error => {
        console.log( 'L98 this is error' , error);
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
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
    // Fetch all restaurants
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
    }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods() {
    // Fetch all restaurants
    return DBHelper.idbFetchRestaurants()
    .then(function(restaurants){
      const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
      // Remove duplicates from neighborhoods
      const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);
      console.log('fetchNeighborhoods returns =',uniqueNeighborhoods);
      return uniqueNeighborhoods;
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines() {
    // Fetch all restaurants
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
 * @summary Used in DBHeler.js only
 * @param {null}
 * @returns {array} of saved restaurant objects to IDB
 */
  static addRestaurantsIdb() {
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

/**
 * @description Get Reviews from API and save to IDB
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
          // console.log('addReviewsIdb: adding reviews to IDB', reviews);
          userComments = reviews;
          self.restaurant.reviews = userComments;
          if (reviews) {
            console.log('addReviewsIdb:userComments=', reviews);
            return reviews;
          }

          dbPromise.then(function(db) {
            const tx = db.transaction(['reviews'], 'readwrite');
            const myStorage = tx.objectStore('reviews');

            for ( let i = 0; i < reviews.length; i++) {
              // console.log('Reviews length=',reviews.length);
              // console.log('Reviews data=',reviews[i] );
              myStorage.put(reviews[i]);
              }
            tx.complete;
            // return reviews;
            })
/*         .then((reviews) =>{
          userComments = reviews;
          self.restaurant.reviews = reviews;
          return reviews;
        })
 */        // .catch((err) => {
        //   // tx.abort();
        //   console.log('IDB put fail: ', err);
        //   throw new Error('Cannot return review array. ' + err.message);
        // })
      // .then(reviews => {
        // console.trace('[addReviewsIdb Trace]', reviews);
        // return reviews;
      })
      // .then(DBHelper.getIdbRestaurantReviews(restaurant_id))
      .catch(err => {
        console.trace( 'addReviewsIdb error: ', error);
        throw new Error('Cannot save reviews to IDB. ' + err.message);
      });


      //   dbPromise.then(function(db) {
      //   const tx = db.transaction('reviews', 'readwrite');
      //   const myStorage = tx.objectStore('reviews');

      //   for ( let i = 0; i < reviews.length; i++) {
      //     console.log('putIdbReviews',reviews[i] );
      //     myStorage.put(reviews[i]);
      //   }
      //   return tx.complete;
      // })

    // })
    // .then(function() {

    // })
    // .catch (error => {
    //   console.trace('[addReviewsIdb Trace Error]', error);
    // });
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
    console.log('Inside Function: getIdbRestaurantReviews, value of ID is: ', id);
     dbPromise.then(db => {
      const transaction = db.transaction(['reviews'], 'readonly');
      const objStore = transaction.objectStore('reviews');
      const storeIndex = objStore.index('restaurant_id');
      // console.log('Store Index', storeIndex);
      // convert to JSON: storeIndex.getAll(Number(id));
      const RESTAURANT_ID = Number(id);
      return storeIndex.getAll(RESTAURANT_ID)
      .then(function(response) {
        userComments = response;
        // self.restaurants[RESTAURANT_ID].reviews = userComments;
        if (response.length === 0) {
          console.log('no reviews found in IDB');
          // Review not found in IDB
          // Fetch review from API and save in IDB
          console.log('Calling addReviewsIdb with: ', RESTAURANT_ID);
          return DBHelper.addReviewsIdb(RESTAURANT_ID);
          // return review JSON back to caller

/*             return DBHelper.fetchReviewsByIdFromNetwork(id)
                .then((response) => {
                    DBHelper.addReviewsToIndexDB(response);
                    return response;
                })
                .catch(DBHelper.logError);
 */        } else {
   console.log('exiting getIdbRestaurantReviews: userComments= ', userComments );
              self.restaurant.reviews = userComments;
              return userComments;
          }
        console.log('exiting getIdbRestaurantReviews', response);
        return response;
      });
  });
}


}
