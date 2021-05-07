import yaml from 'js-yaml';

export default function parseData({ data, extension }) {
  const convertFrom = {
    json: JSON.parse,
    yml: yaml.load,
    yaml: yaml.load,
  };

  return convertFrom[extension](data);
}
