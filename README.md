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

1. [Specification](#Specification)
1. [Requirements](#Requirements)
1. [Technology](#Technology)
1. [Getting Started](#Getting-Started)
1. [Versioning](#Versioning)
1. [License](#license)
1. [Contact](#Contact)

## Specification

You will be provided code for a Node development server and a README for getting the server up and running locally on your computer. The README will also contain the API you will need to make JSON requests to the server. Once you have the server up, you will begin the work of improving your Stage One project code.

The core functionality of the application will not change for this stage. Only the source of the data will change. You will use the fetch() API to make requests to the server to populate the content of your Restaurant Reviews app.

For the Restaurant Reviews projects, you will incrementally convert a static webpage to a mobile-ready web application. In Stage Two, you will take the responsive, accessible design you built in Stage One and connect it to an external JSON REST API server.

1. Use asynchronous JavaScript to request JSON data from the server.

2. Store data received from the server in an offline database using IndexedDB, which will create an app shell architecture.

3. Finally, you’ll work to optimize your site to meet performance benchmarks, which you’ll test using Lighthouse.

***[Back to top](#table-of-contents)***

## Requirements

Use server data instead of local memory In the first version of the application, all of the data for the restaurants was stored in the local application. You will need to change this behavior so that you are pulling all of your data from the server instead, and using the response data to generate the restaurant information on the main page and the detail page.

Use IndexedDB to cache JSON responses In order to maintain offline use with the development server you will need to update the service worker to store the JSON received by your requests using the IndexedDB API. As with Stage One, any page that has been visited by the user should be available offline, with data pulled from the shell database.

Meet the minimum performance requirements Once you have your app working with the server and working in offline mode, you’ll need to measure your site performance using Lighthouse.

Lighthouse measures performance in four areas, but your review will focus on three:

1. Progressive Web App score should be at 90 or better.
1. Performance score should be at 70 or better.
1. Accessibility score should be at 90 or better.

You can audit your site's performance with Lighthouse by using the Audit tab of Chrome Dev Tools.

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

For screenshots of some of the applciation features, refer the section below.

## Lighthouse Audit Score

### Audit was carried out in Chrome's incognito mode under localhost without HTTPS configuration.
![Audit](https://github.com/anurag-majumdar/mws-restaurant-stage-3/raw/master/screenshots/lighthouse-audit.png)

## Screenshots

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