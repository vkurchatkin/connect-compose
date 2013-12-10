# connect-compose

Compose multiple connect middleware into single middleware.

## Example

```javascript
var connect = require('connect')
var compose = require('connect-compose')
var app = connect()

function mw1 (req, res, next) {
  req.stuff = ['mw1']
  next()
}

function mw2 (req, res, next) {
  req.stuff.push('mw2')
  next()
}

function mw3 (req, res) {
  res.end(req.stuff.join(','))
}

app.use(compose([mw1, mw2]))
app.use(mw3)

app.listen(6060)

```

## License

MIT
