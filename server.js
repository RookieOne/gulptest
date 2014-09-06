var connect = require("connect");
var serveStatic = require('serve-static');

var app = connect();

function logger(req, res, next) {
  console.log("%s %s", req.method, req.url);
  next();
}

function errorHandler(err, req, res, next) {
  console.log("Error!");
  res.statusCode = 500;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(err));
}

app.use(logger);
app.use(serveStatic(__dirname + "/build"))
app.use(errorHandler);
app.listen(3000);

// var publicDir = path.join(__dirname, 'public')
//
// app.configure(function() {
//   app.set('port', process.env.PORT || 3000)
//   app.use(express.logger('dev'))
//   app.use(express.bodyParser()) //parses json, multi-part (file), url-encoded
//   app.use(app.router) //need to be explicit, (automatically adds it if you forget)
//   app.use(express.static(publicDir)) //should cache static assets
// })
//
// app.get('/', function(req, res) {
//   res.sendfile(path.join(publicDir, 'index.html'))
// })
//
// var server = http.createServer(app)
//
// //reload code here
// reload(server, app)
//
// server.listen("3000", function(){
//   console.log("Web server listening on port 3000");
// });
