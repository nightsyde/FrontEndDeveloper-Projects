#Udacity Front End Developer Project 5- Travel App

## Overview
Supposed 'Capstone' project to bring together everything that was allegedly taught during the course, but definitely demonstrating the student's ability to perform. Application will take user input for location and date, evaluate the data, then update the page with weather data and a picture of the location.

## Dependencies
"dotenv": "^8.2.0",
"express": "^4.17.1",
"minimist": "^1.2.5",
"mkdir": "^0.0.2",
"webpack": "^4.44.1",
"webpack-cli": "^3.3.12"

## Running webpack
Webpack build configurations are included for both Windows ("C:\user\documents\folders") and Unix ("/usr/home/file/") based file systems. for both development and production modes. To compile, run one of the following commands in a shell window, based on the environment:
Windows based production: npm run build-prod-win (webpack.prod-win.js)
Windows based development: npm run build-dev-win (webpack.dev-win.js)
Unix based production: npm run build-prod-unix (webpack.prod-unix.js)
Unix based development: npm run build-dev-unix (webpack.dev-unix.js)

## Resource Information
= API information from GeoNames, Pixabay, and WeatherBit used
= Added "generic" picture for obscure locations.
