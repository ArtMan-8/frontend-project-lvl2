import yaml from 'js-yaml';

const convertFrom = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default function parseData(data, extension) {
  return convertFrom[extension](data);
}
