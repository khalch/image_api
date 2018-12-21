const Services = {
  make_random() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 20; i++) {
    	text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },
};

module.exports = Services;
