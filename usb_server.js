const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const USB_PATH = '../';

app.use('/files', express.static(USB_PATH)); // Serve static files from USB_PATH

// get directory contents
const getDirectoryContents = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        return reject('Unable to read USB contents');
      }

      const contents = files.map(file => ({
        name: file.name,
        isDirectory: file.isDirectory(),
        path: path.join(dirPath, file.name).replace(USB_PATH, '').replace(/\\/g, '/')
      }));

      resolve(contents);
    });
  });
};

app.get('/api/usb-contents', async (req, res) => {
  const { dir } = req.query;
  const targetPath = path.join(USB_PATH, dir || '');

  try {
    const contents = await getDirectoryContents(targetPath);
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

