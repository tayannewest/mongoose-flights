import { Destination } from '../models/destination.js'

function newDestination(req, res) {
  Destination.find({}, function(error, destinations) {
    res.render('destinations/new', {
      title: 'Add a Destination',
      destinations: destinations,
    })
    console.log('please')
  })
}

function create(req, res) {
  Destination.create(req.body, function(error, destination) {
    res.redirect('/destinations/new')
    console.log('make one')
  })
}

export {
  newDestination as new,
  create,
}