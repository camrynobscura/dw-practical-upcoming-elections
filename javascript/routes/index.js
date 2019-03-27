var express = require('express')
var router = express.Router()
var us_states = require('../us_state.js')
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find My Election', states: us_states })
})

// router.get('/search', function (req, res) {
//   res.render('search');
// });
router.post('/search', async function(req, res) {
  // grabs the address data entered into the form by the user
  let body = req.body
  let userAddress = {
    street: body.street,
    street2: body['street-2'],
    city: body.city
      .toLowerCase()
      .split(' ')
      .join('_'),
    state: body.state.toLowerCase(),
    zip: body.zip
  }

  let stateOCDID = `ocd-division/country:us/state:${userAddress.state}`
  let placeOCDID = `ocd-division/country:us/state:${userAddress.state}/place:${
    userAddress.city
  }`

  // combines state OCD-ID and place OCD-ID to create the URL we will use to make our API request
  let apiURL = `https://api.turbovote.org/elections/upcoming?district-divisions=${stateOCDID},${placeOCDID}`

  // console.log('BODY', userAddress)

  try {
    // use axios to grab election data (in json) based on apiURL
    let response = await axios.get(`${apiURL}`, {
      headers: {
        Accept: 'application/json'
      }
    })

    // check if there are any elections for that address
    if (!response.data.length) {
      res.render('noResults')
    } else {
      // extract website, description, polling place, and date from json
      let { website, description, date } = response.data[0]
      let pollingPlace = response.data[0]['polling-place-url']

      // convert date to more readable format
      let readableDate = new Date(date).toDateString()
      res.render('search', { description, readableDate, website, pollingPlace })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
