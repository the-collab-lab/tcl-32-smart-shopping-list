export const normalizeValue = (value) => {
  const punctuationRegex = /[\W_]/gi;
  const emojiRegex = /[\u{1F600}-\u{1F64F}]/gu;
  const normalizedValue = value
    .toLowerCase()
    .replace(punctuationRegex, '')
    .replace(emojiRegex, '');
  return normalizedValue;
};

export const calculateDaysSincePurchased = (lastPurchased) => {
  if (lastPurchased) {
    const lastPurchasedSeconds = lastPurchased.seconds;
    const dateNowSeconds = Date.now() / 1000;
    const differenceInSeconds = dateNowSeconds - lastPurchasedSeconds;

    return differenceInSeconds / 86400;
  }
};
