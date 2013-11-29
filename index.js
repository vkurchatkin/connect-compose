/**
 * Compose array of middleware into a single middleware
 * @param  {Array} middleware
 * @return {Function}
 */

function compose (middleware) {
  return function (req, res, cb) {
    var done, mw, i = 0

    function _cb (err) {
      ! done ? (done = true) && cb(err) : null
    }

   ;(function next (err) {
      ((mw = middleware[i++]) && !err) ? mw(req, res, next) : _cb(err)
    }())
  }
}

module.exports = compose