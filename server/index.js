const express = require('express');
const path = require('path');
const fsPromise = require('fs/promises');
const fs = require('fs');
const sharp = require('sharp');
const cors = require('cors');
const { encode } = require('blurhash');
const db = require('./db.json');

const app = express();

const IMAGES_DIR_PATH = path.join(__dirname, 'images');

app.use(cors());
app.use(express.static(path.join(__dirname, 'images')));

app.get('/images', async (req, res) => {
  res.json(db);
});

// FUNCTION THAT WILL ENCODE A HUSH ON THE IMAGES
const encodeImageToBlurhash = (path) =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });

async function encodeAllImages() {
  const imagesNames = await fsPromise.readdir(IMAGES_DIR_PATH);

  const data = [];

  for (const name of imagesNames) {
    const encodedHash = await encodeImageToBlurhash(
      path.join(__dirname, 'images', name)
    );
    data.push({ name, blurhash: encodedHash });
  }

  // Save the data to db.json
  fs.writeFile('db.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
}

// encodeAllImages();
//  -------------------------------------------

app.listen(4000, () => {
  console.log('Server listening on PORT', 4000);
});
