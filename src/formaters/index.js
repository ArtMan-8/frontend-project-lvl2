import getPlainTree from './plain.js';
import getStylishTree from './stylish.js';

export const FormaterTypes = {
  STYLISH: 'stylish',
  PLAIN: 'plain',
};

export default function formater(tree, formatType) {
  const formatTreeTo = {
    stylish: getStylishTree,
    plain: getPlainTree,
  };

  return formatTreeTo[formatType](tree);
}
