const imageToBase64 = (file, callback) => {
  if (!file) {
    console.error("No file provided");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    const base64Data = reader.result;
    callback(base64Data);
  };

  reader.readAsDataURL(file);
};

export { imageToBase64 };
