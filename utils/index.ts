export { camel2title };

const camel2title = (str) =>
  str
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

export const isCategorySnowboard = (category) => {
  return category === 'snowboard';
};

export const isCategorySki = (category) => {
  return category === 'ski' || category === 'sci';
};
