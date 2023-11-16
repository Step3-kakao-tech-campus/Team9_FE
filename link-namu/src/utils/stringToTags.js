const stringToTags = (tagText) => {
  const trimmedText = tagText.trim();
  if (trimmedText === "") return [];

  const words = trimmedText.split(/\s+/);
  return words;
};

export { stringToTags };
