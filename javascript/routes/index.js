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

  let stateID = `ocd-division/country:us/state:${userAddress.state}`
  let cityID = `ocd-division/country:us/state:${userAddress.state}/place:${userAddress.city}`

  let apiURL = `https://api.turbovote.org/elections/upcoming?district-divisions=${stateID}${cityID}`

  console.log('BODY', userAddress)

  try {
    let response = await axios.get(`${apiURL}`, {
      headers: {
        Accept: 'application/json'
      }
    })

    console.log('DATA', response.data[0].date)

    res.render('search')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
