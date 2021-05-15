import formatToJson from './json.js';
import formatToPlain from './plain.js';
import formatToStylish from './stylish.js';

export const FORMATER_TYPE = {
  STYLISH: 'stylish',
  PLAIN: 'plain',
  JSON: 'json',
};

const formatTreeTo = {
  stylish: formatToStylish,
  plain: formatToPlain,
  json: formatToJson,
};

export default function format(tree, formatType) {
  return formatTreeTo[formatType](tree);
}
