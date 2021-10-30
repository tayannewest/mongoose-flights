import { Flight } from '../models/flight.js'

function index(req, res) {
  Flight.find({}, function(error, flights) {
    res.render('flights/index', {
      flights,
      error
    })
  })
}

function newFlight(req, res) {
  res.render('flights/new')
}

function create(req, res) {
  
}

export {
  index,
  newFlight as new,
  create
}