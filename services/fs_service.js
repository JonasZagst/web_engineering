function fsUploadImage(image) {
  // Move the uploaded image to our upload folder
  image.mv("public/img/upload/" + image.name);
}
