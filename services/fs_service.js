/** Save an uploaded image in the appropriate folder in the file system.
 * @param {Object} image
 * @returns {void} */
function fsUploadImage(image) {
  // Move the uploaded image to our upload folder
  image.mv("public/img/upload/" + image.name);
}

export default {
  fsUploadImage
}