const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AppError = require('./utils/appError'); // custom Error class
const globalErrorHandler = require('./controllers/errorController'); // Error controller for dev and prod
const catchAsync = require('./utils/catchAsync'); // catch handler for async error
const path = require('path'); // require path for static files
const compression = require('compression');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // allows to parse body sent from client
app.use(cors());

app.use(express.static(path.join(__dirname, 'public'))); // set public files

// home page
app.get('/', (req, res) => {
  res.render('index'); // render homepage with input and button
});

let reqBody; //url link passed from input
let videoTitle; // used later to set name of video file
let info; // await function to get video information

//download page / get
app.post(
  '/download',
  catchAsync(async (req, res, next) => {
    reqBody = req.body.url; //get url from body

    if (req.body.url) {
      // check if body was recieved
      info = await ytdl.getInfo(req.body.url); //await
      videoTitle = info.videoDetails.title; // Set video title
      const embedVideo = info.videoDetails.embed.iframeUrl;

      // render download page
      res.render('download', {
        url: embedVideo, // passed to iframe for embeding

        info: info.formats.sort((a, b) => {
          return a.mimeType < b.mimeType; // sort table of download links by number
        }),
      });
    } else {
      res.json({
        message: 'Something went wrong',
        error: true,
      });
    }
  })
);

// used to set content disposition with file.
const contentDisposition = require('content-disposition');

// Gets file when 'download' link is clicked by user
app.get('/downloadFile', (req, res) => {
  // link to file

  // Set header to send to user
  const itag = req.query.itag; // itag determines quality of video
  const fileType = 'mp4';
  const fileName = `${videoTitle}.${fileType}`; // set filename using data videoTitle data retrieved in post request

  res.writeHead(200, { 'Content-Disposition': contentDisposition(fileName) }); // set head with video title

  // Download video and set settings
  ytdl(reqBody, {
    quality: itag, // set quality using itag passed from query
  }).pipe(res);
});

app.use(compression());

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));

  // if you pass parameter to next() express assumes error and skips other middlewares
});

app.use(globalErrorHandler);

const port = process.env.PORT || 4000;
app.listen(port);
