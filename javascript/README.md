# Upcoming Elections Practical

This is a server-side web application written in JavaScript with
[Express][express] and [Handlebars][handlebars].

## Setup

    npm install

## Running

    DEBUG=js-upcoming-elections:* npm start

## Testing

    npm test

[express]: https://expressjs.com/
[handlebars]: http://handlebarsjs.com/

## About

This is my submission for Democracy Works' Software Developer position. I was able to complete most of the submission criteria, however I wasn't able to add any tests because I ran out of time--this would have been next on my list to add to the project if I had a little more time to work on it.

## Requirements

The form submits and generates state and place OCD-IDs by grabbing the address data from the request body. The API is called using an Axios request and if there are any elections for that address the user is sent to a results page that displays information about that upcoming election. If there aren't any upcoming elections the user is sent to a page that tells them there isn't any information and to check back soon.

## Dependencies

I ended up adding two dependencies. The first was Axios, which I used to perform my requests to the TurboVote API. The second was Nodemon, which I used with npm start--`nodemon DEBUG=js-upcoming-elections:* npm start`--so that the server would restart everytime I made any changes.
