let express = require('express'),
  // mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser');
  // dbConfig = require('./database/db');


// Routes to Handle Request
const userRoute = require('../backend/routes/upload.route')


// MongoDB Setup
// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, {
//   useNewUrlParser: true
// }).then(() => {
//   console.log('Database sucessfully connected')
// },
//   error => {
//     console.log('Database could not be connected: ' + error)
//   }
// )

// Setup Express.js
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());


// Make Images "Uploads" Folder Publicly Available
// app.use('/public', express.static('public'));
app.use(express.static(__dirname + "/dist/"));

app.get("/*", function(req, res, next) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});



// API Route
app.use('/api', userRoute)

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})


// Error
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});