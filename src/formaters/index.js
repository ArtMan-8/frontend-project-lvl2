import getJsonTree from './json.js';
import getPlainTree from './plain.js';
import getStylishTree from './stylish.js';

export const FORMATER_TYPE = {
  STYLISH: 'stylish',
  PLAIN: 'plain',
  JSON: 'json',
};

const formatTreeTo = {
  stylish: getStylishTree,
  plain: getPlainTree,
  json: getJsonTree,
};

export default function format(tree, formatType) {
  return formatTreeTo[formatType](tree);
}
