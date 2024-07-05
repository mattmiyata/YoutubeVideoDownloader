# YOUTUBE VIDEO DOWNLOADER

Built using Nodejs, Express, ejs, and ytld-core

## Demo

```
https://polar-crag-30437-057b7f051c66.herokuapp.com/
```
## Installation

Clone this repository using the following command:
```
git clone https://github.com/mattmiyata/youtubevideodownloader.git
```
Navigate to the project directory:
```
cd youtubevideodownloader
```
Run the app and view in your browser:
```
npm start
```
## Code Description
[app.js](https://github.com/mattmiyata/YoutubeVideoDownloader/blob/main/app.js) - This is the "main" file for the application.  

[404.ejs](https://github.com/mattmiyata/YoutubeVideoDownloader/blob/main/views/404.ejs) - 404 page with link to homepage

[index.ejs](https://github.com/mattmiyata/YoutubeVideoDownloader/blob/main/views/index.ejs) - Homepage of application.  User will input desired url in input box.  Submiting form will create a 'post' request to /download and pass necessary info as res.

[download.ejs](https://github.com/mattmiyata/YoutubeVideoDownloader/blob/main/views/download.ejs) - Page displayed after user submits valid youtube url.  Code will populate page with links for each video format returned from ytld-core.


## Usage
  1. Copy and paste a link to the youtube video you wish to download in the input field and press 'Convert'
  2. Click on the button corresponding to your desired video/audio quality
