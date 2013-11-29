var compose = require('./')
  , _bytes = require('bytes')

var count = 3000

var middleware = Array.apply(null, Array(count)).map(create)


function bytes (b) {
  if (b < 0) return '-' + _bytes(-b)
  return _bytes(b)
}

function create () {
  return function (req, res, next) {
    for (var i = 0; i < 1000000; i++);
    next()
  }
}

function noop () {}

var time
  , memory

function before (title) {
  time = + new Date
  gc()
  memory = process.memoryUsage().heapUsed
}

function after (title) {
  gc()
  memory = process.memoryUsage().heapUsed - memory
  time = + new Date - time

  console.log(title)
  console.log('total time: %sms', time)
  console.log('total memory: %s' , bytes(memory))
  console.log()
}


before('creation')
var composed = compose(middleware)
after('creation')

before('execution')
composed(null, null, noop)
after('execution')