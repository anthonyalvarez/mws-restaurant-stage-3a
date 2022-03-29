# New York City Restaurant Reviews PWA Web App

![Desktop View](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/desktop-view.png)

## Features

* The application uses **Responsive Web Design** with **Flexbox** mostly, **CSS Grid** sparingly and **Media Queries** heavily. 

* Responsive design is carried out keeping content in mind. Breakpoints are set according to content look as per screen starting from the smallest 300px device-width.

* **Accessibility** techniques such as use of **semantic HTML**, **roles**, **ARIA** attributes, **managing focus** have been carried out throughout the application along with **skip links** for both the pages as well. Care was taken to make sure most of the interactive elements used were native HTML elements.

* The 10 images in the first page are lazily loaded with the help of **Intersection Observer**.

* For performance optimization, the styles were loaded asynchronously with the help of **media** and **onload** attributes of link tag. This will prevent render blocking.

* **Service Worker** has been used extensively to cache different types of files such as **HTML**, **CSS**, **JavaScript**, **json**, **mapbox files**, **images** and places them accordingly into static or dynamic caches.

* Shows interactive street map of 10 restaurants located with NYC's 5 boroughs. For getting data related to restaurants and reviews through separate calls, for performance, if the user is online the data for both are fetched as **network then cache** strategy otherwise, the fallback strategy **cache then network** is used. This technique helps to revalidate the cache with latest content in the client's offline storage. 

* **IndexedDB** is used with the help of Jake Archibald's **idb** library. Kudos to Jake!

* The "Review Form submission" and "Favourite a restaurant" features are built with custom **Background sync**. Even if user enters data while offline, The data is stored into IndexedDB while offline and then it goes to server. Online and Offline events were tracked carefully! **Progressive Web Application (PWA)** 

* A generic Toast class was created from scratch alongwith css for informing users when they are online or offline. If user comes back online from offline state, the **background sync** for the specific tasks which user did are run and a toast message is shown in the app when the tasks finish syncing with the server.

* The **Gulp** build tasks have been written from scratch with custom requirements kept in mind. Delete old build from dist folder, Minification, bundling, support for latest ES6 syntax including import and export, css browser compatibility, WebP image generation from JPG images, gzipping, serving cached files with max-age set to 1 year via **gulp serve**, all have been carried out to bring out the most optimal performance of the application. Use **gulp build** to build the app.

* API driven website. All data is stored as JSON objects on remote database server. 


## Table of Contents

1. [About](#About)
1. [Requirements](#Requirements)
1. [Technology](#Technology)
1. [Getting Started](#Getting-Started)
1. [Versioning](#Versioning)
1. [License](#license)
1. [Contact](#Contact)
2. [Screenshots](#Screenshots)

## About

Uses the fetch() API to make requests to the remote database server to populate the content of this Restaurant Reviews app.

For the Restaurant Reviews, it is a a mobile-ready web application featuring a responsive, accessible design connected to an external JSON REST API server.

1. Use asynchronous JavaScript to request JSON data from the server.

2. Store data received from the server in an offline database using IndexedDB, which will create an app shell architecture.

3. Finally, the site has been optimized to meet performance benchmarks, using Lighthouse testing tool.

***[Back to top](#table-of-contents)***

## Requirements

Uses remote server API data instead of local memory. Instead of all the restaurant data stored in the local application web server, the site is now pulling all of the data from a remote database server instead, and using the response data to generate the restaurant information on the home page and the detail page of the web app. 

Use of IndexedDB to cache JSON responses. For offline use, the JavaScript service worker stores the JSON received by get requests using the IndexedDB API. All web pages that has been visited by the user are   available for offline browsing, since the data is pulled from the users local web-based IndexedDB database instead of over the network. 

The website meets minimum performance requirements as an offline app. This app has been verified by Google Lighthouse performance metrics in three areas.

1. Progressive Web App score is 90 or better.
2. Performance score should is 70 or better.
3. Accessibility score should is 90 or better.

This site's performance can be verified with Google Lighthouse by using the Audit tab of Chrome Dev Tools.

### Technology

#### JavaScript

- Progressive Web App (PWA)
- Service Worker
- Indexed DB (IDB with Promises)
- Fetch API
- Cache API
- JSON REST API 
- Sails.js Database server
- node
- npm

#### HTML

- Responsive Images
- HTML5 Landmarks
- ARIA A11y web accessibility

#### CSS

- Responsive Web Design (RWD)
- Cross Browser Testing
- Live Editing

#### Build Tools

- Grunt
- Gulp
- Yeoman Web App Generator
- Bower Components
- [Lighthouse Web Auditing](https://developers.google.com/web/tools/lighthouse/)
- ES6 / JavaScript 2015 Module bundling
- Chrome DevTools
- VS Code
- Web Server Live Reloading
- ES6 / JavaScript 2015 Transpiling
- JavaScript Source Maps
- JavaScript Linting
- File Minification
- File Uglification
- git
- github.com
- Cmder

#### Style Guide Compliance

- [HTML](http://udacity.github.io/frontend-nanodegree-styleguide/index.html)
- [CSS](http://udacity.github.io/frontend-nanodegree-styleguide/css.html)
- [JavaScript](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)
- [Git](https://udacity.github.io/git-styleguide/)
- [JsDoc3](http://usejsdoc.org/)

#### Testing

- JavaScript Unit Testing 
- JSON API Endpoint Testing
- JavaScript Profiling
- Web Performance testing

***[Back to top](#table-of-contents)***

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```sh
node
npm
git
```

### Dependencies
Refer to /package.json

### Development Setup

```sh
npm install
bower install
gulp build
gulp serve
```

The application will be running at http://localhost:9000/ . 

### Local Development API Server

1. [Fork and clone the server repository](https://github.com/udacity/mws-restaurant-stage-2). You’ll use this development server to develop your project code.
1. Change the data source for your restaurant requests to pull JSON from the server, parse the response and use the response to generate the site UI.
1. Cache the JSON responses for offline use by using the IndexedDB API.

#### Get Restaurants

```sh
curl "http://localhost:1337/restaurants"
```

#### Get Restaurants by id

````sh
curl "http://localhost:1337/restaurants/{3}"
````

#### Architecture
Local server

- Node.js
- Sails.js

#### Usage

##### Start the server

```sh
# node server
```

##### You should now have access to your API server environment

debug: Environment : development

debug: Port        : 1337

## Versioning

 Using [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/anthonyalvarez/mws-restaurant-stage-2a/tags).

For list of the changes and updates, see the [commits on this repository](https://github.com/anthonyalvarez/mws-restaurant-stage-2a/commits).

- 0.0.1

- Pull reviews data from new remote JSON API server endpoint


## Contributing

1. Fork it (<https://github.com/anthonyalvarez/mws-restaurant-stage-2a/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Open source


## Contact

If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue to [GitHub](https://github.com/anthonyalvarez/mws-restaurant-stage-2a/issues). Even better you can submit a Pull Request with a fix :)

- Anthony E. Alvarez – [My GitHub](https://github.com/anthonyalvarez/)
- Twitter: [@AnthonyEAlvarez](https://twitter.com/AnthonyEAlvarez)

**[Back to top](#table-of-contents)**

## Screenshots

For screenshots of some of the applciation features, refer the section below.

### Lighthouse Audit Score was carried out in Chrome's incognito mode under localhost without HTTPS configuration.
![Audit](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/lighthouse-audit.png)



The screenshots give a brief overview of the application features.

### iPhone 5SE View (Restaurants)
![iPhone 5SE View](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/iPhone-view.png)

### iPad View (Restaurants)
![iPad View](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/iPad-view.png)

### Desktop View (Restaurants)
![iPad View](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/desktop-view.png)

### iPhone 5SE View (Reviews)
![iPhone 5SE View](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/iPhone-view-2.png)

### iPad View (Reviews)
![iPad View](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/iPad-view-2.png)

### Desktop View (Reviews)
![Desktop View](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/desktop-view-2.png)

### Offline Restaurants & Favourite Feature With IndexedDB
![Offline Favourite](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/offline-favourite.png)

### Offline Reviews With IndexedDB
![Offline Reviews](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/offline-reviews.png)

### Background Sync Favourite Toast
![Background Sync Favourite](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/background-sync-favourite.png)

### Background Sync Reviews Toast
![Background Sync Reviews](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/background-sync-reviews.png)

### Gulp Build
![Gulp Build](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/gulp-build.png)

**[Back to top](#table-of-contents)**