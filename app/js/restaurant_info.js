let restaurant, userComments;
let remoteURL = 'http://localhost:1337/reviews?restaurant_id=';
var newMap;

/**
 * Initialize map as soon as the page is loaded.
 * @param {string} DOM mutation event - event type to listen for
 * @param {string} listener - The object which receives a notification
 */
document.addEventListener('DOMContentLoaded', (event) => {
  // const DEBUG_MODE = false;
  // if (DEBUG_MODE){
    // console.log('DOM fully loaded and parsed');
  // }
    initMap();
    // console.log('DOMContentLoaded, restaurant= ', restaurant);

});

/**
 * @description Initialize leaflet map
 * @param {null}
 * @returns {object} Restaurant data and map
 */
initMap = () => {
    if (!self.restaurant) {
      fetchRestaurantFromURL(restaurant)
      .then((restaurant) => {
          self.newMap = L.map('map', {
          center: [restaurant.latlng.lat, restaurant.latlng.lng],
          zoom: 16,
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
        fillBreadcrumb();
        DBHelper.mapMarkerForRestaurant(self.restaurant, self.newMap);
      });
      // .catch((err) => {
        // console.log('restaurant=', restaurant);
        // console.log('Typeof=', (typeof restaurant));
        // throw new Error('initMap() error ' + err.statusText);
      // });
    } else {
      // console.log('self.restaurant=', self.restaurant);
      // console.log('Typeof=', (typeof self.restaurant));
      // throw new Error('initMap() error ' + err.statusText);
    }
  };

/**
 * @description Get current restaurant from page URL
 * @param {null}
 * @returns {object} a Restaurant
 */
fetchRestaurantFromURL = () => {
  // console.log('entering fetchRestaurantFromURL, self.restaurant= ', self.restaurant);

  if (self.restaurant) { // restaurant already fetched!
    // console.log('self.restaurant found', self.restaurant);
    Promise.resolve(self.restaurant);
  }

  const id = getParameterByName('id');
  console.log('entering fetchRestaurantFromURL, const id = ', id);

  if (!id) { // no id found in URL
    error = 'No restaurant id in URL';
    console.log(error);
    Promise.resolve(self.restaurant);
  } else {
      return DBHelper.fetchRestaurantById(id)
      .then((response) => {
        self.restaurant = response;
        restaurant = self.restaurant;
        fillRestaurantHTML();
        console.log('response found', self.restaurant);
        return response;
      });
  }
};


/**
 * Create restaurant HTML and add it to the webpage
 * @param {object} restaurant - From restuarant.json data file
 * @returns {object} name - from restaurant.name
 * @returns {object} address - from restaurant.address
 * @returns {object} image - from restaurant
 * @returns {object} cuisine - from restaurant.cuisine_type
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  // console.log('Entering fillRestaurantHTML function, restaurant=', restaurant);
  const name = document.getElementById('restaurant-name');

  name.innerHTML = restaurant.name;

  createFavoriteToggleHTML(restaurant);

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img';
  // image.src = DBHelper.imageUrlForRestaurant(restaurant);
  const FILENAME = DBHelper.imageUrlForRestaurant(restaurant);
  // let fileName = FILENAME.slice (0, -4);
  let fileSmall = FILENAME + '-sm.jpg 270w';
  let fileMedium = FILENAME + '-med.jpg 540w, ';
  let fileLarge = FILENAME + '.jpg' ;
  let sourceSet = fileLarge + ' 800w, ' + fileMedium + fileSmall;
  // console.log('srcset' + sourceSet);

  image.src = FILENAME + '-sm.jpg';
  image.setAttribute('srcset', sourceSet);
  image.alt = restaurant.name;

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
      fillRestaurantHoursHTML();
  }

  if (!self.restaurant.review) {
    DBHelper.addReviewsIdb(self.restaurant.id)
    // DBHelper.getIdbRestaurantReviews(self.restaurant.id)
    .then((response) =>{
      userComments = response;
      self.restaurant.reviews = userComments;
      fillReviewsHTML();
    });
  } else {

    // if online:
    // fetch from API
    // save to IDB
    // save in RAM at self.restaurant.reviews and userComments

    // if offline:
    // check IDB
    // save in RAM at self.restaurant.reviews and userComments

  }

  // .then((response) => {

  //   console.log('My userComments=', userComments);
  //   return userComments = response;
  // });
  // // .then( response => {
  //   self.restaurant.review = response;
  //   console.log('self.restaurant.review = ', self.restaurant.review);
  //   fillReviewsHTML;
  // })
  // .then(createReviewFormHTML())
  // .catch(error => {
  //   console.log('Return val from getIdbRestaurantReviews', userComments);
  // });

  // console.log('fillRestaurantHTMLvalue of self.restaurant.reviews = ',self.restaurant.reviews);

  // fill reviews
// fillReviewsHTML();
// createReviewFormHTML();

// Read from IDB
/*   const output = DBHelper.fetchReviewsByResturantId(self.restaurant.id);
console.log(output);
*/
/*   let idbReviews =  DBHelper.getIdbRestaurantReviews(self.restaurant.id);
console.log ('L135, idbReviews = ', idbReviews);
*/
// fetch(remoteURL + self.restaurant.id)
/*   DBHelper.getIdbRestaurantReviews(self.restaurant.id)
  .then(console.log('L136 output: ',self.restaurant.reviews))
  .then(response => response.json())
  .then(json =>{
    console.log(json);
    userComments = json;
    self.restaurant.reviews =userComments;
  })
  .then(console.log('L142 output: ',self.restaurant.reviews))
  .then(fillReviewsHTML())
  .catch(function(error){
    console.log('Fetch failed',error);
  });
*/

};

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 * @param  {object} operatingHours - From restuarant.json data file
 * @returns {string} day - print on restaurant details page.
 * @returns {string} time - print on restaurant details page.
 * @returns {string} hours - print on restaurant details page.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
};

/**
 * Create all reviews HTML and add them to the webpage.
 * @param {object} reviews - From restuarant.json data file
 * @returns {object} title - prints out using createReviewHTML or prints "no reviews"
 * @returns {object} noReviews - prints "no reviews"
 */
 fillReviewsHTML = (reviews = self.restaurant.reviews) => {
/*    console.log('entering fillReviewsHTML reviews = , ',reviews);
   console.log('entering fillReviewsHTML self.restaurant.reviews = , ',self.restaurant.reviews);
 */
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!self.restaurant.reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
    reviews.forEach(review => {
      ul.appendChild(createReviewHTML(review));
  });

  container.appendChild(ul);

  // Add specific reviews to IDB

  dbPromise.then (function(db){

    var transaction = db.transaction(['reviews'], 'readwrite');
    var store = transaction.objectStore('reviews');

    for (let i =0; i < reviews.length; i++){
      store.put(reviews[i]);
    }

    return transaction.complete;
  });

};

/**
 * Create review HTML and add it to the webpage.
 * @param {object} review - from fillReviewsHTML()
 * @returns {object} name -print on restaurant details page
 * @returns {object} date -print on restaurant details page
 * @returns {object} rating -print on restaurant details page
 * @returns {object} comments -print on restaurant details page
 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('p');
  const reviewDate = new Date(review.updatedAt);
  date.innerHTML = reviewDate.toLocaleString();
  li.appendChild(date);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
};

/**
 * Add restaurant name to the breadcrumb navigation menu
 * @param {object} restaurant - From restuarant.json data file
 * @returns {string} breadcrumb - Update Restaurant page DOM element from JSON data object
 */
fillBreadcrumb = (restaurant = self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
};

/**
 * Get a parameter by name from page URL.
 * @param {string} name of URL query parameter
 * @param {string} url - web address
 * @returns {string} results - Unencoded version of an encoded component of URI
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

function toggleFavoriteStatus () {

  const ICON_NOT_FAVORITE = '&#x2661';
  const ICON_FAVORITE = '&#x1F9E1';
  const buttonElement = document.getElementById('restaurant-favorite-button');
  const buttonState = buttonElement.getAttribute('aria-pressed');
  let buttonToggleState = Boolean(buttonElement.hasAttribute('favorite-toggle'));
  let buttonMessage = buttonElement.innerText;
  const RESTAURANT_ID = self.restaurant.id;

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'}
  };

  if (!buttonToggleState){

    self.restaurant.is_favorite = true;
    buttonElement.setAttribute('aria-pressed', true);
    buttonMessage = 'Unfavorite this restaurant ' + ICON_FAVORITE;
    buttonElement.setAttribute('favorite-toggle', 'true');
    const IS_FAVORITE = true;
    const queryStr = 'is_favorite=' + IS_FAVORITE;
    const usp = new URLSearchParams(queryStr);
    const myName = usp.get('is_favorite');
    // console.log('Query String parameter', myName);
    // console.log('Query String values', usp.toString());
    const endpoint = DBHelper.REMOTE_DATABASE_URL + '/' + RESTAURANT_ID + '/' +'?' + usp.toString();
    // console.log('Endpoint URL', endpoint);
    const requestFavoriteTrue = new Request(endpoint, options);
    // console.log('requestFavoriteTrue =', requestFavoriteTrue);
     fetch(requestFavoriteTrue)
      .then(response => response.json())
      .then(res => console.log(res))
      .then(()=>{
        return dbPromise.then(db => {
          const temp = self.restaurant;
          temp.is_favorite = true;
          const tx = db.transaction(['restaurants'], 'readwrite');
          const store = tx.objectStore('restaurants');
          store.put(temp);
          return tx.complete;
        });
       })
      .catch(error => console.log(`Error: ${error}`));

  } else {
    self.restaurant.is_favorite = false;
    buttonElement.setAttribute('aria-pressed', false);
    buttonMessage = 'Favorite this restaurant ' + ICON_NOT_FAVORITE;
    buttonElement.removeAttribute('favorite-toggle');
    const queryStrFalse = 'is_favorite=false';
    const usp = new URLSearchParams(queryStrFalse);
    const myName = usp.get('is_favorite');
    // console.log('Query String parameter', myName);
    // console.log('Query String values', usp.toString());
    const endpoint = DBHelper.REMOTE_DATABASE_URL + '/' + RESTAURANT_ID + '/' +'?' + usp.toString();
    // console.log('Endpoint URL', endpoint);
    const requestFavoriteFalse = new Request(endpoint, options);
    // console.log('requestFavoriteFalse =', requestFavoriteFalse);
    fetch(requestFavoriteFalse)
     .then(response => response.json())
     .then(res => console.log(res))
     .then(()=>{
      return dbPromise.then(db => {
        const temp = self.restaurant;
        temp.is_favorite = false;
        const tx = db.transaction(['restaurants'], 'readwrite');
        const store = tx.objectStore('restaurants');
        store.put(temp);
        return tx.complete;
      });
     })
     .catch(error => console.log(`Error: ${error}`));

  }
  buttonElement.innerHTML =  buttonMessage ;
  // console.log('button clicked');
  // console.log('ARIA Pressed Value',buttonState);
}


/**
 * @description Adds Review form to current page
 * @param {null} requires self.restauramt
 * @returns {null} updates DOM
 */
userInputDataReviewForm = () => {
   DBHelper.fetchRestaurantById(id, (error, restaurant) => {
    self.restaurant = restaurant;
    if (!restaurant) {
      console.error(error);
      return;
    }
    fillRestaurantHTML();
    callback(null, restaurant);
  });

  console.log('Funtion: userInputDataReviewForm', restaurant);
  const FORM = document.getElementById('userInputForm');
  const RESTAURANT_ID = self.restaurant.id;
  const INPUT_NAME = document.getElementById('name');
  const INPUT_RATING = document.getElementById('rating');
  const INPUT_COMMENT = document.getElementById('comments');

  FORM.addEventListener('submit',(e) => {
    // e.preventDefault;
    const DATA_NAME = INPUT_NAME.value;
    const DATA_RATING = parseInt(INPUT_RATING.value);
    const DATA_COMMENT = INPUT_COMMENT.value;
    const DATA_CURRENT_TIME = Math.round(new Date().getTime()/1000.0);

    let  formdata = new FormData();
    formdata.append('restaurant_id', RESTAURANT_ID);
    formdata.append('name', DATA_NAME);
    formdata.append('rating', DATA_RATING);
    formdata.append('comments', DATA_COMMENT);
    formdata.append('createdAt', DATA_CURRENT_TIME);
    formdata.append('updatedAt', DATA_CURRENT_TIME);
  })
}

createFavoriteToggleHTML = (restaurant = self.restaurant) => {

  // console.log('Inside createFavoriteToggleHTML');

  const BUTTON = document.getElementById('restaurant-favorite-button');

  BUTTON.setAttribute('onclick', 'toggleFavoriteStatus()');
  // BUTTON.id = 'restaurant-favorite-button';
  BUTTON.setAttribute('aria-label', `${self.restaurant.name} is a favorite? ${self.restaurant.is_favorite}`);
  BUTTON.setAttribute('aria-pressed', 'false');
  BUTTON.setAttribute('aria-disabled', 'false');
  BUTTON.style = 'display: block;';

  let favoriteStatus;
  // console.log('createFavoriteToggleHTML(): typeof self.restaurant.is_favorite= ',typeof self.restaurant.is_favorite);

  if (self.restaurant.is_favorite == false || self.restaurant.is_favorite == 'false' || self.restaurant.is_favorite == undefined ) {
    favoriteStatus = 'Not a Favorite';
    const ICON_NOT_FAVORITE = '&#x2661';
    self.restaurant.favIcon = ICON_NOT_FAVORITE;

  } else {
    favoriteStatus = 'Is a Favorite';
    const ICON_FAVORITE = '&#x1F9E1';
    self.restaurant.favIcon = ICON_FAVORITE;
    BUTTON.setAttribute('favorite-toggle',true);
  }

  const SPACER = ' ';
  const FAVORITE_MESSAGE = self.restaurant.favIcon + SPACER +  favoriteStatus;
  BUTTON.innerHTML = FAVORITE_MESSAGE;
  return;
}

createReviewFormHTML = (restaurant = self.restaurant) => {

  console.log('Inside createReviewFormHTML()');
  const FORM = document.getElementById('restaurant-id');
  FORM.value = parseInt(self.restaurant.id);

  return;
}
