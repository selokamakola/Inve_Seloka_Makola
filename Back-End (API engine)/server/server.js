var express = require('express');
var bodyParser = require('body-parser');
const storage = require('node-persist');
var routes = require('./routers/events-router');

var app = express();
var port = 3000; 
storage.init({expiredInterval: 1 * 60 * 1000 });
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,recording-session");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);



app.listen(port);
console.log("Running app on port port. Visit: http://localhost:" + port + "/");

