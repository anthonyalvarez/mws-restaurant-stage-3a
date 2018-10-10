# mws-restaurant-stage-2a
 - JSON data driven New York City (NYC) restaurant review website.

- Shows interactive street map of 10 restaurants located with NYC's 5 boroughs.

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

* Progessive Web App (PWA)
* Service Worker
* Indexed DB (IDB)
* Fetch API
* Cache API
* JSON REST API
* Sails.js Server
* node
* npm

#### HTML
* Responsive Images
* HTML5 Landmarks
* ARIA A11y web accessibility

#### CSS

* Responsive Web Design (RWD)
* Cross Browser Testing
* Live Editing

#### Build Tools

* Grunt
* Gulp
* Yeoman Web App Generator
* Bower Components
* [Lighthouse Web Auditing](https://developers.google.com/web/tools/lighthouse/)
* ES6 / JavaScript 2015 Module bundling
* Chrome DevTools
* VS Code
* Web Server Live Reloading
* ES6 / JavaScript 2015 Transpiling
* JavaScript Source Maps
* JavaScript Linting
* File Minification
* File Uglification
* git
* github.com
* Cmder

#### Style Guide Compliance

* [HTML](http://udacity.github.io/frontend-nanodegree-styleguide/index.html)
* [CSS](http://udacity.github.io/frontend-nanodegree-styleguide/css.html)
* [JavaScript](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)
* [Git](https://udacity.github.io/git-styleguide/)

***[Back to top](#table-of-contents)***

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
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
gulp serve
```
### Local Development API Server
1. [Fork and clone the server repository](https://github.com/udacity/mws-restaurant-stage-2). You’ll use this development server to develop your project code.
1. Change the data source for your restaurant requests to pull JSON from the server, parse the response and use the response to generate the site UI.
1. Cache the JSON responses for offline use by using the IndexedDB API.

#### Get Restaurants
```
curl "http://localhost:1337/restaurants"
```
#### Get Restaurants by id
````
curl "http://localhost:1337/restaurants/{3}"
````
#### Architecture
Local server
- Node.js
- Sails.js

#### Usage
##### Start the server
```Start server
# node server
```
##### You should now have access to your API server environment
debug: Environment : development

debug: Port        : 1337

## Versioning

 Using [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/anthonyalvarez/mws-restaurant-stage-2a/tags).

For list of the changes and updates, see the [commits on this repository](https://github.com/anthonyalvarez/mws-restaurant-stage-2a/commits).

* 0.0.1
    * Work in  Need to populate Local Indexed DB with Remote JSON API server using fetch API.

***[Back to top](#table-of-contents)***

## Contributing

1. Fork it (<https://github.com/anthonyalvarez/mws-restaurant-stage-2a/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

**[Back to top](#table-of-contents)**

## License
Open source

**[Back to top](#table-of-contents)**

## Contact
If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue to [GitHub](https://github.com/anthonyalvarez/mws-restaurant-stage-2a/issues). Even better you can submit a Pull Request with a fix :)

- Anthony E. Alvarez – [My GitHub](https://github.com/anthonyalvarez/)
- Twitter: [@AnthonyEAlvarez](https://twitter.com/AnthonyEAlvarez)

**[Back to top](#table-of-contents)**
