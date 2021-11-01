export const normalizeValue = (value) => {
  const punctuationRegex = /[\W_]/gi;
  const emojiRegex = /[\u{1F600}-\u{1F64F}]/gu;
  const normalizedValue = value
    .toLowerCase()
    .replace(punctuationRegex, '')
    .replace(emojiRegex, '');
  return normalizedValue;
};
