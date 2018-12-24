const fs = require('fs');
const request = require('request');

const ImageManipulationService = {
  apply: (filters, clone) => {
    filters.forEach((item) => {
      clone[item.apply](...item.value);
    });
  },
  read_dir: function (dir) {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  create_zip: function (name, zip) {
    return new Promise((resolve, reject) => {
      fs.writeFile(name, zip, 'base64', (err) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  },
  query: function (url, formdata) {
    return new Promise((resolve, reject) => {
      request.post({
        url: url,
        formData: formdata
      }, (err, httpResponse, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      });
    });
  }
};

module.exports = ImageManipulationService;
