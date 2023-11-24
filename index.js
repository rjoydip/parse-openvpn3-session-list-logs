export function sanatizeString(str) {
  return str.replace(/^-+$/gm, '').trim();
}

function extractKeyVal(ele) {
  if (Array.isArray(ele)) {
    return ele.map((item) => extractKeyVal(item));
  } else {
    let match = /^([\w|\s]+):\s*([^(\n|$)]*)/g.exec(ele.trim());
    if (match !== null) {
      return {
        [match[1].trim()]: match[2].trim(),
      };
    } else ele;
  }
}

export function getKeyValuePair(str = '') {
  if (str === '') return {};

  const convertedStringToArray = sanatizeString(str)
    .split('\n\n')
    .map((i) =>
      [].concat(
        ...i
          .split('\n')
          .map((ele) =>
            !!/\s{4}\w+:/.test(ele.trim())
              ? ele.trim().split(/\s{4}/)
              : ele.trim()
          )
      )
    );

  return extractKeyVal(convertedStringToArray);
}
