# About
This application repository gives a starting point for node js application. 

## Installation
Run `npm install` from application root. 

## Considerations
It includes the RingCentral JS SDK. Sets up the login for it using a `.env` file (copy the `env_example` file, fill it in and rename to `.env`). 

Also included is a rotating [log4js](https://github.com/log4js-node/log4js-node) logger. It will rotate logs each day. Instead of using `console.log()`, use `logger.info()` or `logger.error()`. 
