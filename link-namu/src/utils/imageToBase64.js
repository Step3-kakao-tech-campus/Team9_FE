const imageToBase64 = (file, callback) => {
  if (!file) {
    console.error("No file provided");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    const base64Data = reader.result;
    const imageData = base64Data.split(";base64,").pop();
    callback(imageData);
  };

  reader.readAsDataURL(file);
};

export { imageToBase64 };
