import getStylishTree from './stylish.js';

export const FormaterTypes = {
  STYLISH: 'stylish',
};

export default function formater(tree, formatType) {
  const formatTreeTo = {
    stylish: getStylishTree,
  };

  return formatTreeTo[formatType](tree);
}
