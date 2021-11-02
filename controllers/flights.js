import { Flight } from '../models/flight.js'
import { Destination } from '../models/destination.js'

function index(req, res) {
  Flight.find({}, function(error, flights) {
    res.render('flights/index', {
      flights,
      error,
      title: 'All Flights'
    })
  })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add a Flight'
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key]
    }
  }  
  Flight.create(req.body, function(error, flight) {
    if(error) {
      return res.redirect('flights/new')
    }
    res.redirect('/flights')
})
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('destinations')
  .exec( function(error, flight) {
    Destination.find({_id: {$nin: flight.destinations}}, function (error, destinations) {
    res.render('flights/show', {
      title: 'Flight Details',
      flight,
      destinations
      })
    })
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(error, flight) {
    flight.tickets.push(req.body)
    flight.save(function(error) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(error, movie) {
    res.redirect('/flights')
  })
}

function addToDestinations(req, res) {
  Flight.findById(req.params.id, function(error, flight) {
    flight.destinations.push(req.body.airportId)
    flight.save(function(error) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  createTicket,
  deleteFlight as delete,
  addToDestinations
}