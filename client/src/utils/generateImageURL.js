import axios from "axios";

const generateImageURL = async (image) => {
  const file = new FormData();
  file.append("file", image);
  file.append("upload_preset", process.env.CLOUDINARY_PRESET);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_ENV}/image/upload`,
    file
  );
  return data;
};

export default generateImageURL;
