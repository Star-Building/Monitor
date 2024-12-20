// Requiring modules
const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const port = 8000;

// Render index.ejs file
app.get('/', function (req, res) {

	// Render page using renderFile method
	ejs.renderFile('index.ejs', {},
		{}, function (err, template) {
			if (err) {
				throw err;
			} else {
				res.end(template);
			}
		});
});
// Render index.ejs file
app.get('/favicon.ico', function (req, res) {
    const filePath = 'favicon.ico'; // Path to your video file
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
  
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'image/vnd.microsoft.icon',
      };
  
      res.writeHead(200, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'image/vnd.microsoft.icon',
      };
  
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
});
/*
// Define a route for serving the video file
app.get('/video', (req, res) => {
    const filePath = 'Data/video1.mp4'; // Path to your video file
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
  
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };
  
      res.writeHead(200, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
  
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  });
*/
app.get('/Data/video1.mp4', (req, res) => {
    const filePath = './Data/video1.mp4';
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send('Error reading file');
      } else {
        res.send(data);
      }
    });
  });

  app.get('/manifest.json', (req, res) => {
    const filePath = './manifest.json';
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send('Error reading file');
      } else {
        res.send(data);
      }
    });
  });

  app.get('/icons/192.png', (req, res) => {
    const filePath = './icons/192.png';
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send('Error reading file');
      } else {
        res.send(data);
      }
    });
  });


  app.get('/icons/512.png', (req, res) => {
    const filePath = './icons/512.png';
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send('Error reading file');
      } else {
        res.send(data);
      }
    });
  });


  // Define a route for serving the video file
  app.get('/non', (req, res) => {
      const filePath = 'Data/video1.mp4'; // Path to your video file
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;
    
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': 'video/mp4',
        };
    
        res.writeHead(200, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
    
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
      }
    });
  // Define a route for serving the video file
  app.get('/script.js', (req, res) => {
      const filePath = 'script.js'; // Path to your video file
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;
    
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': 'text/javascript',
        };
    
        res.writeHead(200, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'text/javascript',
        };
    
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
      }
    });
  
// Server setup
app.listen(port, function (error) {
	if (error)
		throw error;
	else
		console.log("Server is running at http://localhost:8000");
});
