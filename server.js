const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const speechToText = require('./speechToText');
const summarizeText = require('./summarizeText');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(fileUpload());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for file upload
app.post('/api/upload', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No file uploaded.');
  }

  const file = req.files.file;
  const filePath = path.join(__dirname, 'uploads', file.name);

  // Save file to the server
  file.mv(filePath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    try {
      // Process the file
      const text = await speechToText(filePath);
      const summary = await summarizeText(text);

      // Clean up the file
      fs.unlinkSync(filePath);

      res.json({ text, summary });
    } catch (error) {
      res.status(500).send('Error processing file: ' + error.message);
    }
  });
});

// Serve static files
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
