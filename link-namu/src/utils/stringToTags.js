const stringToTags = (tagText) => {
  const words = tagText.trim().split(/\s+/);
  return words;
};

export { stringToTags };
