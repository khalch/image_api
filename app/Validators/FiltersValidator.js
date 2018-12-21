// const FiltersValidators = {
//
// 	filters: Joi.object().keys({
// 		resize( w, h[, mode] );     // resize the image. Jimp.AUTO can be passed as one of the values.
// 		scale( f[, mode] );         // scale the image by the factor f
// 		crop( x, y, w, h );         // crop to the given region
// 		flip( horz, vert );         // flip the image horizontally or vertically
// 		mirror( horz, vert );       // an alias for flip
// 		rotate( deg[, mode] );      // rotate the image clockwise by a number of degrees. Optionally, a resize mode can be passed. If `false` is passed as the second parameter, the image width and height will not be resized.
// 		brightness( val );          // adjust the brighness by a value -1 to +1
// 		contrast( val );            // adjust the contrast by a value -1 to +1
// 		dither565();                // ordered dithering of the image and reduce color space to 16-bits (RGB565)
// 		greyscale();                // remove colour from the image
// 		invert();                   // invert the image colours
// 		normalize();                // normalize the channels in an image
// 		blur( r );                  // fast blur the image by r pixels
// 		posterize( n );             // apply a posterization effect with n level
// 		sepia();                    // apply a sepia wash to the image
// 	}),
//
// };
// module.exports = FiltersValidators;