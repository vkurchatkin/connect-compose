var compose = require('./')

describe('compose', function () {
  it('should work', function (done) {
    var arr = []
    var middleware = [1, 2, 3, 4, 5].map(create)

    function create (value) {
      return function (req, res, next) {
        arr.push(value)
        next()
      }
    }

    compose(middleware)(null, null, function () {
      arr.should.eql([1, 2, 3, 4, 5])
      done()
    })
  })

  it('should yield errors', function (done) {
    var arr = []
    var middleware  = []

    middleware.push(function (req, res, next) {
      arr.push(1)
      next()
    })

    middleware.push(function (req, res, next) {
      arr.push(2)
      next(new Error)
    })

    middleware.push(function (req, res, next) {
      arr.push(3)
      next()
    })

    compose(middleware)(null, null, function (err) {
      err.should.be.ok
      arr.should.eql([1, 2])
      done()
    })
  })

  it('should not call next more then once', function () {
    var count = 0
    var middleware  = []

    middleware.push(function (req, res, next) {
      next()
    })

    middleware.push(function (req, res, next) {
      next()
      next()
    })

    middleware.push(function (req, res, next) {
      next()
    })

    compose(middleware)(null, null, function () {
      count ++
    })

    count.should.equal(1)
  })
})