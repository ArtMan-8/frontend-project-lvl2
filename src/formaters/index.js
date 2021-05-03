import getJsonTree from './json.js';
import getPlainTree from './plain.js';
import getStylishTree from './stylish.js';

export const FormaterTypes = {
  STYLISH: 'stylish',
  PLAIN: 'plain',
  JSON: 'json',
};

const formatTreeTo = {
  stylish: getStylishTree,
  plain: getPlainTree,
  json: getJsonTree,
};

export default function formater(tree, formatType) {
  return formatTreeTo[formatType](tree);
}
