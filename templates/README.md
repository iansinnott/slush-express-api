# Express API Project Base

_A starting point for building a REST API with Express._

Not to be confused with my `express-isinn` project slush generator which is for building Express-based web apps.

What's included:

* Gulp (obviously)
* Express
* Jshint
* Logging via Morgan
* Auto-restart of dev server via Nodemon

What's **NOT** included:

* A view engine
* Client-side code

## Development Quick Start

```
gulp
```

This starts a server running on `localhost:8888`. All JS files will be watched for changes and the server will be automatically restarted. Note: If you're accessing your API via the browser it will not reload the window for you.

## Project Structure

Write this...

## Gulp tasks

The gulp structure for this project may be different that what you're used to. It's built in a modular fashion to avoid one large, unmaintainable Gulpfile. For more information on this specific implementation see [this great blogpost][blogpost].

[blogpost]: http://viget.com/extend/gulp-browserify-starter-faq

## TODO

* **Testing**
