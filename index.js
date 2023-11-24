export function sanitizeInputString(inputString) {
  return inputString.replace(/^-+$/gm, '').trim();
}

function extractKeyValuePairs(element) {
  if (Array.isArray(element)) {
    return element.map(item => extractKeyValuePairs(item));
  } else {
    const keyValuePattern = /^([\w\s]+):\s*([^(\n|$)]*)/g;
    const match = keyValuePattern.exec(element.trim());

    if (match !== null) {
      const [_, key, value] = match.map(part => part.trim());
      return { [key]: value };
    } else {
      return element;
    }
  }
}

export function parseKeyValueString(inputString = '') {
  if (inputString === '') return {};

  const sanitizedString = sanitizeInputString(inputString);
  const splitSections = sanitizedString.split('\n\n');

  const convertedArray = splitSections.map(section =>
    [].concat(
      ...section.split('\n').map(line =>
        /\s{4}\w+:/.test(line.trim())
          ? line.trim().split(/\s{4}/)
          : line.trim()
      )
    ).filter(Boolean)
  );

  const keyValueResult = extractKeyValuePairs(convertedArray);
  return keyValueResult.map(item => Object.assign({}, ...item));
}
