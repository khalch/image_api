const parseFormdata = require('parse-formdata');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const request = require('request');
const Zip = require('node-zip');
const zip = new Zip();
const ImageManipulation = require('../Services/ImageManipulationService');

const ImageController = {
  update_img(req, res) {
    parseFormdata(req, async (err, data) => {
      if (err) throw err;
      const file = data.parts[0];
      const Captures = JSON.parse(data.fields.captures);
      const date = Date.now().toString();
      const dir = `./public/${req.auth._id}/${date}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const finalPath = path.join(dir, file.filename);
      const outStream = await fs.createWriteStream(finalPath);
      file.stream.pipe(outStream);
      outStream.on('error', (err) => {
        res.send(err);
      });
      outStream.on('finish', () => {
        const zip_images = zip.folder(date);
        jimp.read(finalPath, async (err, img) => {
          if (!err) {
            for (const Capture of Captures) {
              const ClonePic = img.clone();
              ImageManipulation.apply(Capture.filters, ClonePic);
              ClonePic.write(`${dir}/${Capture.name}${file.filename}`);
            }
            fs.readdir(dir, (err, data) => {
              if (err) {
                res.send(err);
              } else {
                for (const image of data) {
                  const filetozip = fs.readFileSync(`${dir}/${image}`, 'base64');
                  zip_images.file(image, filetozip, { base64: true });
                }
              }
              const zipData = zip_images.generate({ base64: true, compression: 'DEFLATE' });
              fs.writeFile(`${dir}/${date}.zip`, zipData, 'base64', (err) => {
                if (!err) {
                  for (const image of data) {
                    fs.unlinkSync(`${dir}/${image}`);
                  }
                } else {
                  res.send(err);
                }
                const formdata = {
                  zip: fs.createReadStream(`${dir}/${date}.zip`)
                };
                request.post({
                  url: req.auth.app.query_url,
                  formData: formdata
                }, (err, httpResponse, body) => {
                  if (err) {
                    return console.error('upload failed:', err);
                  }
                  if (body == 'success') {
                    fs.unlinkSync(`${dir}/${date}.zip`);
                    fs.rmdirSync(`${dir}`);
                  };
                });
              });
            });
          } else {
            res.send(err);
          }
        });
      });
    });
  },
};
module.exports = ImageController;
