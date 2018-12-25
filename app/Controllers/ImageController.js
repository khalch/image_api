const parseFormdata = require('parse-formdata');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const Zip = require('node-zip');
const zip = new Zip();
const ImageManipulation = require('../Services/ImageManipulationService');
const Joi = require('joi');
const FiltersValidator = require('../Validators/FiltersValidator');

const ImageController = {
  update_img(req, res) {
    parseFormdata(req, async (err, data) => {
      if (err) throw err;
      const file = data.parts[0];
      const captures = JSON.parse(data.fields.captures);
      Joi.validate(captures, FiltersValidator, (err, Captures) => {
        if(err) {
          res.send({error: err})
        } else {
          const date = Date.now().toString();
          const dir = `./public/${req.auth.user._id.toString()}/${date.toString()}`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          const finalPath = path.join(dir, file.filename);
          const outStream = fs.createWriteStream(finalPath);
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
                ImageManipulation.read_dir(dir).then(data => {
                  for (const image of data) {
                    const filetozip = fs.readFileSync(`${dir}/${image}`, 'base64');
                    zip_images.file(image, filetozip, { base64: true });
                  }
                  const zipData = zip_images.generate({ base64: true, compression: 'DEFLATE' });
                  ImageManipulation.create_zip(`${dir}/${date}.zip`, zipData,).then(() => {
                    for (const image of data) {
                      fs.unlinkSync(`${dir}/${image}`);
                    }
                    const formdata = {
                      zip: fs.createReadStream(`${dir}/${date}.zip`)
                    };
                    ImageManipulation.query(req.auth.app.query_url, formdata).then(body => {
                      if (body === 'success') {
                        fs.unlinkSync(`${dir}/${date}.zip`);
                        fs.rmdirSync(`${dir}`);
                      }
                    }).catch(err => {
                      res.send(err);
                    });
                  }).catch(err => {
                    res.send(err);
                  });
                }).catch(err => {
                  res.send(err);
                });
              } else {
                res.send(err);
              }
            });
          });
        }
      });
    });
  },
};
module.exports = ImageController;
