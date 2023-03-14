import fsService from "../services/fs_service"

function uploadImage(req, res) {
  // Get the file that was set to our field named "image"
  const { image } = req.files;
  // If no image submitted, exit
  if (!image) return res.sendStatus(400);

  try {
    fsService.uploadImage(image);
    res.sendStatus(200);
  } catch (error) {
    // Do something
  }
}

export {
  uploadImage
}
